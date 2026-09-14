/*
  ===========================================================
  쓰레드 요일별 자동 광고
  -----------------------------------------------------------
  ★ 여전히 GitHub 토큰을 쓰지 않습니다 ★

  설정은 저장소에서 읽지 않고 사이트에서 직접 받아 옵니다.
      https://toureplus.co.kr/data/threads-auto.json
  그래서 GitHub 토큰이 만료돼도 자동 발행은 계속 돌아갑니다.

  -----------------------------------------------------------
  어떻게 도는가

  이 함수는 netlify.toml 설정에 따라 매시 정각에 깨어납니다.
  깨어나면 스페인 현지 시각을 계산해서

      · 오늘이 설정한 요일인가?
      · 지금이 설정한 시각인가?

  둘 다 맞을 때만 글을 올립니다. 그 외에는 아무것도 하지 않아요.
  매시 한 번만 깨어나므로 같은 시각에 두 번 올라갈 일이 없습니다.

  -----------------------------------------------------------
  어느 상품 차례인지는 어떻게 아는가

  "마지막으로 올린 상품"을 어딘가 적어 두려면 저장소에 써야 하고,
  그러면 GitHub 토큰이 필요해집니다. 분리 원칙이 깨지죠.

  그래서 기록을 남기지 않고 날짜만으로 계산합니다.
  기준일부터 오늘까지 발행일이 몇 번 지나갔는지 세어서
  그 횟수를 상품 개수로 나눈 나머지를 차례로 씁니다.
  기록이 없어도 늘 같은 답이 나오고, 순서도 고르게 돕니다.

  Netlify 환경변수
    THREADS_USER_ID, THREADS_TOKEN   발행용
    THREADS_ACCOUNT                  올려야 할 계정 (안전장치)
    SITE_URL                         (선택) 기본값 https://toureplus.co.kr
  ===========================================================
*/

const crypto = require('crypto');

const API = 'https://graph.threads.net/v1.0';
const TZ  = 'Europe/Madrid';

const SITE = () => String(process.env.SITE_URL || 'https://toureplus.co.kr').replace(/\/+$/, '');
const tok  = () => String(process.env.THREADS_TOKEN || '').trim();
const uid  = () => String(process.env.THREADS_USER_ID || '').trim();

function json(status, body) {
  return {
    statusCode: status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
    body: JSON.stringify(body),
  };
}

async function th(path, params, method) {
  const q = new URLSearchParams(Object.assign({ access_token: tok() }, params || {}));
  const res = await fetch(API + path + '?' + q.toString(), { method: method || 'GET' });
  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch (e) { data = { raw: text }; }
  if (!res.ok) {
    const m = (data && data.error && data.error.message) || ('Threads ' + res.status);
    const err = new Error(m);
    err.status = res.status;
    throw err;
  }
  return data;
}

/* 스페인 현지 시각의 요일·시각·날짜를 구합니다 (서머타임이 알아서 반영됩니다) */
function madridNow(now) {
  const f = new Intl.DateTimeFormat('en-CA', {
    timeZone: TZ, weekday: 'short', hour: '2-digit', hour12: false,
    year: 'numeric', month: '2-digit', day: '2-digit',
  });
  const p = {};
  f.formatToParts(now).forEach(function (x) { p[x.type] = x.value; });
  const DAYS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return {
    day: DAYS[p.weekday],
    hour: Number(p.hour),
    date: p.year + '-' + p.month + '-' + p.day,
  };
}

/* 기준일부터 오늘까지, 설정한 요일이 몇 번 지나갔는지 셉니다 */
function slotsSince(anchorDate, today, days) {
  const a = new Date(anchorDate + 'T00:00:00Z');
  const t = new Date(today + 'T00:00:00Z');
  if (isNaN(a) || isNaN(t) || t < a) return 0;
  let n = 0;
  const d = new Date(a);
  while (d < t) {
    if (days.indexOf(d.getUTCDay()) !== -1) n++;
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return n;
}

/* 사진이 붙은 항목만 추려 냅니다 */
function usable(items, skipWithoutImage) {
  return (items || []).filter(function (it) {
    if (!it || it.off) return false;
    if (!String(it.text || '').trim()) return false;
    if (skipWithoutImage !== false && !String(it.image || '').trim()) return false;
    return true;
  });
}

function imageUrl(image) {
  const v = String(image || '').trim();
  if (!v) return '';
  if (/^https?:\/\//i.test(v)) return v;
  return SITE() + '/' + v.replace(/^\/+/, '');
}

/* 실제 발행 — 사진이 있으면 사진 글, 없으면 글만 */
async function publish(item) {
  const text = String(item.text || '').trim().slice(0, 500);
  const img = imageUrl(item.image);

  const boxParams = img
    ? { media_type: 'IMAGE', image_url: img, text: text }
    : { media_type: 'TEXT', text: text };

  const box = await th('/' + uid() + '/threads', boxParams, 'POST');
  if (!box || !box.id) throw new Error('쓰레드가 글 상자를 만들어 주지 않았습니다');

  /* 사진은 쓰레드 쪽에서 내려받아 처리할 시간이 필요합니다 */
  if (img) await new Promise(function (r) { setTimeout(r, 6000); });

  const out = await th('/' + uid() + '/threads_publish', { creation_id: box.id }, 'POST');
  return out && out.id;
}

/* 대쉬보드 로그인 토큰 확인 — 사람이 주소로 부를 때만 씁니다 */
function checkToken(token) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || !token || token.indexOf('.') === -1) return false;
  const [exp, sig] = token.split('.');
  if (!/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;
  const want = crypto.createHmac('sha256', secret).update(exp).digest('hex');
  if (want.length !== sig.length) return false;
  return crypto.timingSafeEqual(Buffer.from(want), Buffer.from(sig));
}

exports.handler = async function (event) {
  event = event || {};
  const q = event.queryStringParameters || {};

  /*
    두 갈래로 불립니다.
      · threads-cron 이 정해진 시각에 직접 부를 때  → __internal 표시가 붙습니다
      · 대쉬보드에서 시험 삼아 부를 때              → 로그인 토큰을 확인합니다
  */
  if (!event.__internal) {
    let body = {};
    try { body = JSON.parse(event.body || '{}'); } catch (e) { body = {}; }
    if (!checkToken(body.token || q.token)) {
      return json(401, { error: '로그인이 필요합니다' });
    }
  }

  const forced = !!q.force;
  const dry    = !!q.dry;

  if (!uid() || !tok()) {
    return json(200, { skipped: '쓰레드 열쇠(THREADS_USER_ID / THREADS_TOKEN)가 없습니다' });
  }

  /* ---------- 설정 읽기 (사이트에서 직접) ---------- */
  let cfg;
  try {
    const r = await fetch(SITE() + '/data/threads-auto.json?t=' + Date.now(), { cache: 'no-store' });
    if (!r.ok) throw new Error('설정 파일을 읽지 못했습니다 (' + r.status + ')');
    cfg = await r.json();
  } catch (e) {
    return json(200, { skipped: '설정을 읽지 못했습니다', detail: e.message });
  }

  if (!cfg || cfg.enabled === false) {
    return json(200, { skipped: '자동 발행이 꺼져 있습니다' });
  }

  const days = Array.isArray(cfg.days) && cfg.days.length ? cfg.days : [1, 3, 5];
  const hour = Number.isFinite(Number(cfg.hour)) ? Number(cfg.hour) : 10;
  const now  = madridNow(new Date());

  /* ---------- 지금이 그 시각인가 ---------- */
  if (!forced) {
    if (days.indexOf(now.day) === -1) {
      return json(200, { skipped: '오늘은 발행 요일이 아닙니다', 현지: now });
    }
    if (now.hour !== hour) {
      return json(200, { skipped: '아직 발행 시각이 아닙니다', 현지: now, 설정시각: hour });
    }
  }

  /* ---------- 어느 상품 차례인가 ---------- */
  const list = usable(cfg.items, cfg.skipWithoutImage);
  if (!list.length) {
    return json(200, { skipped: '올릴 상품이 없습니다 (사진이 붙은 항목이 하나도 없습니다)' });
  }

  const anchor = /^\d{4}-\d{2}-\d{2}$/.test(cfg.anchor || '') ? cfg.anchor : '2026-01-05';
  const idx = slotsSince(anchor, now.date, days) % list.length;
  const item = list[idx];

  /* ---------- 계정 확인 (다른 계정이면 올리지 않습니다) ---------- */
  const want = String(process.env.THREADS_ACCOUNT || '').trim().replace(/^@/, '');
  if (want) {
    let me;
    try { me = await th('/me', { fields: 'id,username' }); }
    catch (e) { return json(200, { error: '계정을 확인하지 못해 올리지 않았습니다', detail: e.message }); }
    const got = String((me && me.username) || '').replace(/^@/, '');
    if (got.toLowerCase() !== want.toLowerCase()) {
      return json(200, {
        error: '다른 계정이라 올리지 않았습니다',
        expected: want, actual: got,
      });
    }
  }

  const preview = {
    현지: now, 차례: idx + 1, 전체: list.length,
    상품: item.title || item.slug || '',
    사진: imageUrl(item.image) || '(없음)',
    본문: String(item.text || '').slice(0, 120),
  };

  if (dry) return json(200, { dryRun: true, 올릴내용: preview });

  try {
    const id = await publish(item);
    return json(200, { ok: true, id: id, 올린내용: preview });
  } catch (e) {
    return json(200, { error: '발행에 실패했습니다', detail: e.message, 올리려던내용: preview });
  }
};
