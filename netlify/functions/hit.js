/*
  ===========================================================
  방문·클릭 세기 (홈페이지 → 이 함수 → Netlify 저장소)
  -----------------------------------------------------------
  ★ GitHub 토큰을 쓰지 않습니다 ★

  홈페이지에 붙인 stats.js 가 사람이 페이지를 열 때,
  그리고 주요 버튼을 누를 때 이 함수를 조용히 부릅니다.
  이 함수는 그 횟수를 Netlify 가 무료로 주는 저장소(Blobs)에
  "날짜 하나에 꾸러미 하나" 로 쌓아 둡니다.

  -----------------------------------------------------------
  무엇을 남기고 무엇을 남기지 않는가

  남기는 것   날짜 · 어느 페이지 · 어느 버튼 · 어디서 들어왔는지(네이버/구글 등)
  남기지 않는 것   방문자 IP · 쿠키 · 이름 · 그 밖에 사람을 특정할 수 있는 어떤 것도

  "몇 명" 은 브라우저 탭 하나를 한 번으로 세는 방식입니다.
  (탭을 닫았다 다시 열면 새로 셉니다. 개인을 추적하지 않습니다.)

  -----------------------------------------------------------
  같은 순간에 여러 명이 들어오면?

  꾸러미를 읽고 → 1 을 더하고 → 다시 쓰는 사이에
  다른 사람이 먼저 써 버릴 수 있습니다.
  그래서 쓸 때마다 "내가 읽은 그대로일 때만 써라"(etag) 조건을 겁니다.
  누가 먼저 썼으면 다시 읽어서 더합니다. 최대 여섯 번까지 양보합니다.
  ===========================================================
*/

const { connectLambda, getStore } = require('@netlify/blobs');

const TZ = 'Europe/Madrid';
const STORE = 'euforia-stats';

/* 키가 끝없이 늘어나지 않도록 상한을 둡니다 */
const MAX_PAGES = 300;
const MAX_PRODUCTS = 400;
const TRIES = 6;

/* 버튼 이름은 미리 정해 둔 것만 받습니다 (아무 값이나 들어와 쌓이지 않도록) */
const CLICKS = [
  'inquiry',   // 예약문의하기
  'kakao',     // 카카오톡
  'tel',       // 전화
  'mail',      // 이메일
  'deposit',   // 입금확인
  'product',   // 상품 카드
  'match',     // 경기일정
  'concert',   // 공연
  'tour',      // 여행상품 목록
  'plan',      // 맞춤여행 만들기
  'ai',        // 유포리아 AI 상담
  'etc',
];

const REFS = ['naver', 'google', 'daum', 'sns', 'other', 'direct'];

const MAX_COUNTRIES = 60;
const MAX_REGIONS = 200;

function noBody(status) {
  return {
    statusCode: status,
    headers: { 'Cache-Control': 'no-store', 'Content-Length': '0' },
    body: '',
  };
}

/* 스페인 현지 날짜로 하루를 묶습니다 (홈페이지 갱신·발행 시각과 같은 기준) */
function todayMadrid() {
  const f = new Intl.DateTimeFormat('en-CA', {
    timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit',
  });
  const p = {};
  f.formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
  return p.year + '-' + p.month + '-' + p.day;
}

function cleanPath(v) {
  let s = String(v || '/').toLowerCase().split('?')[0].split('#')[0];
  s = s.replace(/[^a-z0-9/._-]/g, '');
  /* ../ 같은 장난 주소는 한 칸으로 몰아 둡니다 (목록이 지저분해지지 않도록) */
  if (s.indexOf('..') !== -1) return '/기타';
  s = s.replace(/\/{2,}/g, '/');
  if (!s) s = '/';
  if (s[0] !== '/') s = '/' + s;
  if (s.length > 60) s = s.slice(0, 60);
  /* /index.html 과 / 를 한 칸으로 봅니다 */
  if (s === '/index.html') s = '/';
  return s;
}

function cleanCode(v) {
  return String(v || '').replace(/[^A-Za-z0-9._-]/g, '').slice(0, 40);
}

function blank(date) {
  return {
    date: date,
    views: 0,      // 페이지를 연 횟수
    visits: 0,     // 방문(탭) 수
    pages: {},     // 페이지별 조회
    products: {},  // 상품별 조회
    clicks: {},    // 버튼별 클릭
    refs: {},      // 들어온 경로
    countries: {}, // 나라별 방문 (아이피가 아니라 나라 이름만)
    regions: {},   // 나라|지역별 방문
    geoSrc: {},    // 위치 정보를 어느 길로 받았는지
  };
}

function add(obj, key, cap) {
  if (!key) return;
  if (obj[key] === undefined) {
    if (Object.keys(obj).length >= cap) return;  // 상한을 넘으면 새 칸을 만들지 않습니다
    obj[key] = 0;
  }
  obj[key]++;
}

function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

/* 헤더 이름은 대소문자가 뒤섞여 올 수 있어 전부 소문자로 맞춥니다 */
function lowerHeaders(h) {
  const out = {};
  Object.keys(h || {}).forEach(function (k) { out[String(k).toLowerCase()] = h[k]; });
  return out;
}

function pickCode(v) {
  if (!v) return '';
  const c = (typeof v === 'object') ? (v.code || v.name || '') : v;
  return String(c).replace(/[^A-Za-z0-9-]/g, '').toUpperCase().slice(0, 6);
}
function pickName(v) {
  if (!v) return '';
  const n = (typeof v === 'object') ? (v.name || v.code || '') : v;
  return String(n).replace(/[^A-Za-z0-9 .'\-]/g, '').trim().slice(0, 40);
}

/*
  방문자가 어느 나라·지역에서 왔는지.

  ★ 아이피는 읽지도, 남기지도 않습니다 ★
  Netlify 가 요청마다 "이 사람은 한국 서울에서 왔다" 정도만 알려 주는데,
  우리는 그 이름만 받아 "한국 12명" 처럼 숫자만 더합니다.
  누가 어디서 왔는지는 어디에도 남지 않습니다.

  옛 방식(람다형) 함수에서 이 정보가 어느 자리로 오는지 확실하지 않아
  세 갈래를 모두 시도하고, 어느 길이 통했는지도 함께 적어 둡니다.
  (셋 다 막혔으면 어떤 헤더가 왔는지 이름만 적어 둡니다 — 값은 적지 않습니다)
*/
function readGeo(event, context) {
  const h = lowerHeaders(event.headers);

  const g1 = (context && context.geo) ||
             (context && context.clientContext && context.clientContext.geo);
  if (g1 && (g1.country || g1.subdivision)) {
    return { src: 'context', cc: pickCode(g1.country), region: pickName(g1.subdivision) };
  }

  const raw = h['x-nf-geo'];
  if (raw) {
    try {
      const g = JSON.parse(Buffer.from(String(raw), 'base64').toString('utf8'));
      if (g && (g.country || g.subdivision)) {
        return { src: 'x-nf-geo', cc: pickCode(g.country), region: pickName(g.subdivision) };
      }
    } catch (e) { /* 모양이 다르면 다음 갈래로 */ }
  }

  const cc = h['x-country'] || h['x-nf-country'] || h['x-geo-country'] || '';
  if (cc) return { src: 'x-country', cc: pickCode(cc), region: '' };

  return {
    src: '없음', cc: '', region: '',
    seen: Object.keys(h).filter(function (k) { return k.indexOf('x-') === 0; }).sort().slice(0, 25),
  };
}

/*
  저장소 열기.

  Netlify 는 새 방식 함수에는 NETLIFY_BLOBS_CONTEXT 라는 환경값을 알아서 넣어 줍니다.
  그 안에는 캐시를 거치지 않는 주소(uncachedEdgeURL)까지 들어 있습니다.
  옛 방식(람다형) 함수에는 그 값이 없어서 connectLambda(event) 로 직접 연결해야 하는데,
  이 길로 연결하면 캐시를 거치지 않는 주소가 채워지지 않습니다.

  ★ 그래서 consistency:'strong' 을 쓰면 안 됩니다.
    읽기든 쓰기든 전부 BlobsConsistencyError 로 막혀 버립니다.
    기본값(eventual)으로 두고, 어긋나면 etag 조건부 쓰기가 다시 시도하게 합니다.
*/
function openStore(event) {
  /*
    event.blobs 안에는 "이번 요청에만 쓰는 열쇠" 가 들어 있습니다.

    예전에는 process.env.NETLIFY_BLOBS_CONTEXT 가 이미 차 있으면 건너뛰었습니다.
    그런데 함수가 살아 있는 채로 다음 손님을 받으면(웜 스타트)
    지난 요청의 열쇠가 그대로 남아 있습니다. 그 열쇠는 곧 만료되고,
    그때부터 "Failed to decode token: Token expired" 가 납니다.

    그래서 요청마다 새 열쇠로 갈아 끼웁니다.
  */
  try {
    if (event && event.blobs) connectLambda(event);
  } catch (e) { /* 새 방식 함수나 지역 시험에는 event.blobs 가 없습니다 */ }
  return getStore({ name: STORE });
}

/*
  읽고 → 고치고 → 조건부로 쓰기.
  내가 읽은 뒤에 남이 먼저 썼으면 modified:false 로 돌아오니 다시 시도합니다.
*/
async function update(store, key, mutate) {
  for (let i = 0; i < TRIES; i++) {
    let cur = null;
    try {
      cur = await store.getWithMetadata(key, { type: 'json' });
    } catch (e) { cur = null; }

    if (!cur) {
      const fresh = blank(key.slice(2));
      mutate(fresh);
      const r = await store.setJSON(key, fresh, { onlyIfNew: true });
      if (r && r.modified) return true;
    } else {
      const next = (cur.data && typeof cur.data === 'object') ? cur.data : blank(key.slice(2));
      mutate(next);
      const opts = cur.etag ? { onlyIfMatch: cur.etag } : undefined;
      const r = await store.setJSON(key, next, opts);
      if (r && r.modified) return true;
    }
    await sleep(30 + Math.floor(Math.random() * 120));
  }
  return false;
}

exports.handler = async function (event, context) {
  event = event || {};

  if (event.httpMethod === 'OPTIONS') return noBody(204);
  if (event.httpMethod !== 'POST') return noBody(405);

  /* 장난으로 큰 덩어리를 보내는 것을 막습니다 */
  const raw = String(event.body || '');
  if (raw.length > 1000) return noBody(204);

  let b;
  try { b = JSON.parse(raw); } catch (e) { return noBody(204); }
  if (!b || typeof b !== 'object') return noBody(204);

  let store;
  try {
    store = openStore(event);
  } catch (e) {
    console.error('[hit] 저장소를 열지 못했습니다:', e && e.message);
    return noBody(204);   // 저장소를 못 열어도 홈페이지에는 아무 영향이 없어야 합니다
  }

  const date = todayMadrid();
  const key = 'd/' + date;

  const kind = b.t === 'click' ? 'click' : 'view';
  const path = cleanPath(b.p);
  const prod = cleanCode(b.prod);
  const ref = REFS.indexOf(String(b.ref || '')) !== -1 ? String(b.ref) : 'direct';
  const click = CLICKS.indexOf(String(b.c || '')) !== -1 ? String(b.c) : 'etc';
  const fresh = b.n === 1 || b.n === '1';

  /* 나라·지역은 "새 방문" 일 때만 셉니다 (페이지를 여러 장 봐도 한 명은 한 명) */
  const geo = (kind === 'view' && fresh) ? readGeo(event, context) : null;

  try {
    await update(store, key, function (o) {
      if (kind === 'click') {
        add(o.clicks, click, 40);
      } else {
        o.views = (o.views || 0) + 1;
        if (fresh) {
          o.visits = (o.visits || 0) + 1;
          add(o.refs, ref, 20);
        }
        add(o.pages, path, MAX_PAGES);
        if (prod) add(o.products, prod, MAX_PRODUCTS);

        if (geo) {
          if (!o.countries) { o.countries = {}; o.regions = {}; o.geoSrc = {}; }
          add(o.geoSrc, geo.src, 8);
          add(o.countries, geo.cc || 'ZZ', MAX_COUNTRIES);
          if (geo.cc && geo.region) add(o.regions, geo.cc + '|' + geo.region, MAX_REGIONS);
          /* 위치를 못 받았을 때만, 어떤 헤더가 왔는지 이름만 한 번 적어 둡니다 */
          if (geo.seen && !o._headers) o._headers = geo.seen;
        }
      }
    });
  } catch (e) {
    /* 세는 데 실패해도 방문자에게는 아무 일도 일어나지 않습니다.
       다만 조용히 묻히지 않도록 Netlify 함수 기록에는 남깁니다. */
    console.error('[hit] 기록 실패:', e && e.message);
  }

  return noBody(204);
};
