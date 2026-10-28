/*
  ===========================================================
  문의함 — 쌓인 접수 내용 읽기 (대쉬보드 전용)
  -----------------------------------------------------------
  ★ GitHub 토큰을 쓰지 않습니다 ★

  예약문의 · 입금확인 · 경기예약 세 가지가 들어올 때마다
  Netlify 저장소에 한 건씩 쌓입니다. 그걸 모아서 돌려줍니다.

  카카오톡까지 갔는지(sent)도 같이 알려 주기 때문에,
  "카카오가 막혀 있던 동안 들어온 문의" 를 골라 보실 수 있습니다.

  대쉬보드에 로그인한 사람만 볼 수 있습니다.
  손님 개인정보가 들어 있는 곳이라 더 조심합니다.

  -----------------------------------------------------------
  지우기

  action:'delete' 로 한 건을 지웁니다. 되돌릴 수 없으니
  대쉬보드에서 한 번 더 물어본 뒤에만 부릅니다.

  실수로 지우셨을 때를 위해 action:'restore' 도 있습니다.
  대쉬보드가 화면에 들고 있던 내용을 그대로 다시 써 넣습니다.
  (화면을 새로 고치면 그 내용도 사라지므로, 그 자리에서만 됩니다)

  열쇠 모양을 꼭 확인합니다. 아무 이름이나 받아 주면
  통계 같은 다른 자료까지 지워질 수 있습니다.

  -----------------------------------------------------------
  새 문의 알림

  action:'count' 는 목록을 다 읽지 않고 열쇠만 세어 봅니다.
  대쉬보드가 1~2분마다 물어보기 때문에 가볍게 만들었습니다.

  since 에 "마지막으로 본 열쇠" 를 주시면 그보다 새것만
  골라서 몇 건인지, 무슨 내용인지(최대 5건) 돌려줍니다.

  -----------------------------------------------------------
  덤으로 카카오 상태도 봐 드립니다

  action:'kakao' 로 부르면 실제로 토큰을 갱신해 보고
  살아 있는지 알려 줍니다. 메시지를 보내지는 않습니다.
  ===========================================================
*/

const crypto = require('crypto');
const { connectLambda, getStore } = require('@netlify/blobs');

const STORE = 'euforia-inbox';
const MAX = 200;

function json(status, body) {
  return {
    statusCode: status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
    body: JSON.stringify(body),
  };
}

function checkToken(token) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || !token || token.indexOf('.') === -1) return false;
  const [exp, sig] = token.split('.');
  if (!/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;
  const want = crypto.createHmac('sha256', secret).update(exp).digest('hex');
  if (want.length !== sig.length) return false;
  return crypto.timingSafeEqual(Buffer.from(want), Buffer.from(sig));
}

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

/* ═══════════════════════════════════════════════════════════
   카카오 토큰 자동 갱신
   -----------------------------------------------------------
   이 덩어리는 네 파일에 똑같이 들어 있습니다.
     send-inquiry.js · send-deposit.js · send-matchday-booking.js · inbox.js
   하나를 고치면 넷 다 똑같이 고쳐 주세요.

   왜 필요한가요?
     카카오 리프레시 토큰은 길어야 60일이면 끝납니다.
     그런데 남은 기간이 한 달이 안 될 때 갱신하면, 카카오가
     "새 리프레시 토큰" 을 같이 내줍니다. 그걸 받아서 저장해 두면
     토큰이 계속 새것으로 이어져 다시 연결할 일이 없어집니다.

     예전에는 새 토큰이 와도 버리고, 늘 Netlify 환경변수의
     옛 토큰만 썼습니다. 그래서 60일마다 손으로 다시 이어야 했습니다.

   어디에 두나요?
     Netlify 저장소(Blobs) "euforia-kakao" 창고, "refresh-token" 칸.
     환경변수 KAKAO_REFRESH_TOKEN 은 그대로 두고, 처음 한 번 쓰는 씨앗으로만 씁니다.

   사장님이 다시 연결해서 환경변수를 바꾸셨다면?
     저장해 둔 토큰 옆에 "어떤 환경변수에서 시작했는지" 지문을 같이 적어 둡니다.
     환경변수가 바뀌면 지문이 달라지므로, 그때는 새 환경변수를 먼저 씁니다.
     (지문은 토큰을 거꾸로 알아낼 수 없는 짧은 요약값입니다)

   저장소가 안 열리면?
     예전처럼 환경변수 토큰으로만 보냅니다. 나빠지는 일은 없습니다.
   ═══════════════════════════════════════════════════════════ */
const 카카오창고 = 'euforia-kakao';
const 카카오칸   = 'refresh-token';

function 카카오지문(s) {
  return require('crypto').createHash('sha256').update(String(s || '')).digest('hex').slice(0, 16);
}

async function 카카오저장본() {
  try {
    const 창고 = getStore({ name: 카카오창고 });
    const 값 = await 창고.get(카카오칸, { type: 'json' });
    return { 창고: 창고, 값: (값 && 값.token) ? 값 : null };
  } catch (e) {
    return { 창고: null, 값: null };
  }
}

async function 카카오저장(창고, 토큰, 환경지문) {
  if (!창고 || !토큰) return false;
  try {
    await 창고.setJSON(카카오칸, { token: 토큰, 환경지문: 환경지문, 바뀐때: new Date().toISOString() });
    return true;
  } catch (e) {
    console.error('[카카오] 새 토큰 저장 실패:', e.message);
    return false;
  }
}

async function 카카오갱신요청(리프레시) {
  const res = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: process.env.KAKAO_REST_API_KEY || '',
      client_secret: process.env.KAKAO_CLIENT_SECRET || '',
      refresh_token: 리프레시,
    }),
  });
  try { return await res.json(); } catch (e) { return { error: 'HTTP ' + res.status }; }
}

/*
  돌려주는 값 { access, 새토큰, 저장됨, 쓴것 }
  안 되면 Error 를 던집니다. 메시지에 [KOE322] 같은 카카오 오류 번호가 들어 있습니다.
  (토큰 값은 어디에도 찍지 않습니다)
*/
async function 카카오접근() {
  const 환경 = process.env.KAKAO_REFRESH_TOKEN || '';
  const 환경지문 = 환경 ? 카카오지문(환경) : '';
  const 저장 = await 카카오저장본();
  const 저장토큰 = 저장.값 ? 저장.값.token : '';
  const 다시연결함 = !!(저장.값 && 환경 && 저장.값.환경지문 !== 환경지문);

  /* 고를 순서: 평소엔 저장본 → 환경변수. 다시 연결하셨으면 환경변수 → 저장본 */
  const 후보 = [];
  function 넣기(어디, 토큰) {
    if (토큰 && !후보.some(function (h) { return h[1] === 토큰; })) 후보.push([어디, 토큰]);
  }
  if (다시연결함) { 넣기('환경변수', 환경); 넣기('저장본', 저장토큰); }
  else            { 넣기('저장본', 저장토큰); 넣기('환경변수', 환경); }

  if (!후보.length) {
    throw new Error('카카오 토큰 갱신 실패 [설정 없음]: KAKAO_REFRESH_TOKEN 이 비어 있습니다');
  }

  let 마지막 = null;
  for (let i = 0; i < 후보.length; i++) {
    const 어디 = 후보[i][0], 토큰 = 후보[i][1];
    const data = await 카카오갱신요청(토큰);
    if (data && data.access_token) {
      const 새것 = data.refresh_token || '';
      let 저장됨 = false;
      if (새것) {
        저장됨 = await 카카오저장(저장.창고, 새것, 환경지문);              /* 새 토큰이 왔으면 바로 갈아 끼웁니다 */
      } else if (!저장.값 || 저장토큰 !== 토큰 || 저장.값.환경지문 !== 환경지문) {
        저장됨 = await 카카오저장(저장.창고, 토큰, 환경지문);              /* 처음이거나 다시 연결한 직후 */
      }
      return { access: data.access_token, 새토큰: !!새것, 저장됨: 저장됨, 쓴것: 어디 };
    }
    마지막 = data || {};
  }

  /* KOE322 = 리프레시 토큰 만료 */
  const code = (마지막 && 마지막.error_code) ? ' [' + 마지막.error_code + ']' : '';
  throw new Error('카카오 토큰 갱신 실패' + code + ': ' +
                  ((마지막 && (마지막.error_description || 마지막.error)) || ''));
}

async function getAccessToken() {
  return (await 카카오접근()).access;
}
/* ═══ 카카오 토큰 자동 갱신 — 여기까지 ═══ */

/*
  카카오 토큰이 살아 있는지 확인합니다 (메시지는 보내지 않습니다).
  확인하는 김에 카카오가 새 토큰을 주면 저장소에 바로 갈아 끼웁니다.
  매일 한 번 kakao-keepalive 가 이걸 불러서 토큰이 끊기지 않게 합니다.
  돌려주는 모양(ok · 상태 · 안내)은 예전과 같아서 대쉬보드는 고칠 것이 없습니다.
*/
async function kakaoHealth() {
  if (!process.env.KAKAO_REST_API_KEY) {
    return { ok: false, 상태: '설정 없음', 안내: 'KAKAO_REST_API_KEY / KAKAO_REFRESH_TOKEN 이 비어 있습니다' };
  }
  try {
    const r = await 카카오접근();
    const 이어짐 = r.쓴것 === '저장본' || r.저장됨;
    let 안내 = '';
    if (r.새토큰 && r.저장됨)       안내 = '카카오가 새 토큰을 보내와 자동으로 갈아 끼웠습니다.';
    else if (r.새토큰)              안내 = '카카오가 새 토큰을 보내왔는데 저장하지 못했습니다. 잠시 뒤 다시 확인해 주세요.';
    else if (이어짐)                안내 = '토큰은 자동으로 이어집니다. 다시 연결하실 필요 없습니다.';
    return { ok: true, 상태: '정상', 새토큰있음: r.새토큰, 자동갱신: 이어짐, 안내: 안내 };
  } catch (e) {
    const m = String((e && e.message) || e);
    const code = (m.match(/\[([^\]]+)\]/) || [])[1] || '';
    if (code === '설정 없음') {
      return { ok: false, 상태: '설정 없음', 안내: 'KAKAO_REST_API_KEY / KAKAO_REFRESH_TOKEN 이 비어 있습니다' };
    }
    return {
      ok: false,
      상태: code === 'KOE322' ? '토큰 만료' : (code ? '연결 실패' : '확인 실패'),
      코드: code,
      안내: code === 'KOE322'
        ? '카카오 리프레시 토큰이 만료됐습니다. 다시 연결해 주셔야 알림이 옵니다.'
        : m.replace(/^카카오 토큰 갱신 실패\s*(\[[^\]]*\])?:?\s*/, ''),
    };
  }
}

/*
  열쇠는 반드시 "종류/날짜/시각-무작위" 모양이어야 합니다.
  이 검사가 없으면 아무 이름이나 넣어 다른 자료를 지울 수 있습니다.
*/
const KEY_RE = /^(inquiry|deposit|matchday)\/\d{4}-\d{2}-\d{2}\/[A-Za-z0-9_-]{1,60}$/;

/*
  -----------------------------------------------------------
  답변 상태와 메모

  손님이 보낸 내용은 건드리지 않고, 담당자가 적는 것만
  "meta/열쇠" 라는 다른 칸에 따로 저장합니다.
  문의 원본과 섞이지 않아, 메모를 고쳐도 접수 내용은 그대로입니다.
  -----------------------------------------------------------
*/
const 상태들 = ['미답변', '답변중', '답변완료', '예약확정', '취소'];
const META = 'meta/';

/* 손님에게 보내는 답장 — Resend 로 나갑니다 */
async function 답장보내기(받는곳, 제목, 본문) {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY 가 설정되지 않았습니다');
  const from = process.env.NOTIFY_FROM || '';
  if (!from || /resend\.dev/i.test(from)) {
    throw new Error('보내는 주소(NOTIFY_FROM)가 회사 도메인으로 확인되지 않았습니다. ' +
                    'Resend 에서 euforiatour.com 을 인증하신 뒤 NOTIFY_FROM 을 바꿔 주세요.');
  }
  const 답장받을곳 = process.env.NOTIFY_EMAIL || 'euforia@euforiatour.com';
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: from, to: [받는곳], subject: 제목, text: 본문, reply_to: 답장받을곳 }),
  });
  let data = {};
  try { data = await res.json(); } catch (e) { data = {}; }
  if (!res.ok || !data.id) {
    const why = (data && (data.message || data.name)) || JSON.stringify(data);
    throw new Error('메일 전송 실패 (' + res.status + '): ' + String(why).slice(0, 200));
  }
  return data.id;
}

/*
  열쇠는 "종류/날짜/시각-무작위" 입니다.
  그냥 글자순으로 세우면 종류 이름부터 비교해 버려서
  deposit → inquiry → matchday 순이 되고 시간이 뒤섞입니다.
  그래서 앞의 종류를 떼고 "날짜/시각" 만 가지고 줄을 세웁니다.
*/
function ord(key) {
  const p = String(key).split('/');
  return p.length >= 3 ? p[1] + '/' + p[2] : String(key);
}

/* 메일 알림이 켜져 있는지만 봅니다 (실제로 보내 보지는 않습니다) */
function mailConfig() {
  const on = !!process.env.RESEND_API_KEY;
  return {
    설정됨: on,
    받는곳: process.env.NOTIFY_EMAIL || 'euforia@euforiatour.com',
    안내: on ? '' : '메일 알림은 아직 꺼져 있습니다. 설치안내의 “메일로 알림 받기” 를 보고 한 번만 켜 두시면 카카오가 막혀도 메일이 옵니다.',
  };
}

exports.handler = async function (event) {
  event = event || {};

  let body = {};
  try { body = JSON.parse(event.body || '{}'); } catch (e) { body = {}; }
  const q = event.queryStringParameters || {};

  if (!checkToken(body.token || q.token)) {
    return json(401, { error: '로그인이 필요합니다' });
  }

  const action = String(body.action || q.action || 'list');

  if (action === 'kakao') {
    try { if (event && event.blobs) connectLambda(event); } catch (e) { /* 저장소 없이도 확인은 됩니다 */ }
    const k = await kakaoHealth();
    k.메일 = mailConfig();
    return json(200, k);
  }

  let store;
  try {
    store = openStore(event);
  } catch (e) {
    return json(200, { ready: false, reason: '문의함 저장소를 열지 못했습니다', detail: e.message });
  }

  /* ---------- 건수만 세기 (알림용) ---------- */
  if (action === 'count') {
    let keys = [];
    try {
      const res = await store.list();
      keys = (res && res.blobs ? res.blobs : []).map(function (b) { return b.key; })
             .filter(function (k) { return KEY_RE.test(k); });
    } catch (e) {
      return json(200, { ok: false, reason: '문의함을 읽지 못했습니다', detail: e.message });
    }
    keys.sort(function (a, b) { return ord(a) < ord(b) ? 1 : ord(a) > ord(b) ? -1 : 0; });

    const since = String(body.since || q.since || '');
    const 기준 = since ? ord(since) : '';
    const 새열쇠 = 기준 ? keys.filter(function (k) { return ord(k) > 기준; }) : [];

    /* 알림에 무슨 내용인지 적어 드리려고, 새로 온 것만 최대 5건 읽습니다 */
    const 볼것 = 새열쇠.slice(0, 5);
    const 새목록 = [];
    await Promise.all(볼것.map(async function (k) {
      try {
        const v = await store.get(k, { type: 'json' });
        if (v && typeof v === 'object') {
          새목록.push({ key: k, kind: v.kind || '', 요약: v.요약 || '', at: v.at || '' });
        }
      } catch (e) { /* 한 건 못 읽어도 세는 데는 지장 없습니다 */ }
    }));
    새목록.sort(function (a, b) { return ord(a.key) < ord(b.key) ? 1 : -1; });

    return json(200, {
      ok: true,
      전체: keys.length,
      최신열쇠: keys[0] || '',
      새건수: 기준 ? 새열쇠.length : 0,
      새목록: 새목록,
      처음: !since,          /* 기준이 없으면 "지금부터" 로 잡으시라는 뜻입니다 */
    });
  }

  /* ---------- 답변 상태 · 메모 저장 ---------- */
  if (action === 'meta') {
    const key = String(body.key || '');
    if (!KEY_RE.test(key)) return json(400, { error: '알 수 없는 열쇠입니다' });
    const 상태 = String(body.상태 || '미답변');
    if (상태들.indexOf(상태) === -1) return json(400, { error: '알 수 없는 상태입니다' });
    const 메모 = String(body.메모 || '').slice(0, 2000);
    try {
      await store.setJSON(META + key, { 상태: 상태, 메모: 메모, 고친때: new Date().toISOString() });
      return json(200, { ok: true, 상태: 상태 });
    } catch (e) {
      return json(200, { ok: false, error: (e && e.message) || String(e) });
    }
  }

  /* ---------- 손님에게 답장 보내기 ---------- */
  if (action === 'reply') {
    const key = String(body.key || '');
    if (!KEY_RE.test(key)) return json(400, { error: '알 수 없는 열쇠입니다' });
    const 받는곳 = String(body.받는곳 || '').trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(받는곳)) {
      return json(400, { error: '받는 사람 메일 주소가 올바르지 않습니다' });
    }
    const 제목 = String(body.제목 || '').slice(0, 200);
    const 본문 = String(body.본문 || '').slice(0, 8000);
    if (!제목 || !본문) return json(400, { error: '제목과 내용을 적어 주세요' });
    try {
      const id = await 답장보내기(받는곳, 제목, 본문);
      /* 보낸 기록을 메모에 남기고 상태를 답변완료로 올립니다 */
      let 옛 = null;
      try { 옛 = await store.get(META + key, { type: 'json' }); } catch (e) { 옛 = null; }
      const 때 = new Date().toISOString().slice(0, 16).replace('T', ' ');
      const 메모 = ((옛 && 옛.메모) ? 옛.메모 + '\n' : '') + '[' + 때 + '] ' + 받는곳 + ' 로 메일 보냄 — ' + 제목;
      await store.setJSON(META + key, { 상태: '답변완료', 메모: 메모.slice(0, 2000), 고친때: new Date().toISOString() });
      return json(200, { ok: true, 보낸id: id, 메모: 메모.slice(0, 2000) });
    } catch (e) {
      return json(200, { ok: false, error: (e && e.message) || String(e) });
    }
  }

  /* ---------- 지우기 ---------- */
  if (action === 'delete' || action === 'restore') {
    const key = String(body.key || q.key || '');
    if (!KEY_RE.test(key)) {
      return json(400, { error: '지울 수 없는 열쇠입니다', key: key.slice(0, 80) });
    }
    try {
      if (action === 'delete') {
        await store.delete(key);
        return json(200, { ok: true, 지움: key });
      }
      const row = body.row;
      if (!row || typeof row !== 'object') {
        return json(400, { error: '되돌릴 내용이 없습니다' });
      }
      delete row.key;                      /* 저장할 때는 열쇠를 안에 넣지 않습니다 */
      await store.setJSON(key, row);
      return json(200, { ok: true, 되돌림: key });
    } catch (e) {
      return json(200, { ok: false, error: (e && e.message) || String(e) });
    }
  }

  /* ---------- 목록 ---------- */
  let keys = [];
  try {
    const res = await store.list();
    keys = (res && res.blobs ? res.blobs : []).map(function (b) { return b.key; });
  } catch (e) {
    return json(200, { ready: false, reason: '문의함을 읽지 못했습니다', detail: e.message });
  }

  keys = keys.filter(function (k) { return KEY_RE.test(k); });
  /* 종류가 섞여 있어도 시간순이 되도록 ord() 로 줄 세웁니다 */
  keys.sort(function (a, b) { return ord(a) < ord(b) ? 1 : ord(a) > ord(b) ? -1 : 0; });

  /* 종류를 골라 보시더라도 "읽음" 기준은 전체 기준이어야 하므로 먼저 챙겨 둡니다 */
  const 최신열쇠 = keys[0] || '';

  const kind = String(body.kind || q.kind || '');
  if (kind) keys = keys.filter(function (k) { return k.indexOf(kind + '/') === 0; });

  const total = keys.length;
  let limit = Number(body.limit || q.limit || 50);
  if (!Number.isFinite(limit) || limit < 1) limit = 50;
  if (limit > MAX) limit = MAX;
  keys = keys.slice(0, limit);

  const rows = [];
  for (let i = 0; i < keys.length; i += 10) {
    const chunk = keys.slice(i, i + 10);
    const got = await Promise.all(chunk.map(async function (k) {
      try {
        const v = await store.get(k, { type: 'json' });
        if (!v || typeof v !== 'object') return null;
        v.key = k;
        try {
          const m = await store.get(META + k, { type: 'json' });
          if (m && typeof m === 'object') v.메타 = { 상태: m.상태 || '미답변', 메모: m.메모 || '' };
        } catch (e2) { /* 메모가 없으면 그냥 미답변입니다 */ }
        if (!v.메타) v.메타 = { 상태: '미답변', 메모: '' };
        return v;
      } catch (e) { return null; }
    }));
    got.forEach(function (g) { if (g) rows.push(g); });
  }

  /* 카카오도 메일도 못 간 것만 셉니다. 둘 중 하나라도 갔으면 놓친 게 아닙니다 */
  const 미전달 = rows.filter(function (r) { return !(r.sent || r.mail); }).length;

  const 미답변 = rows.filter(function (r) {
    return !r.메타 || r.메타.상태 === '미답변';
  }).length;

  /* 사이트에서 손님에게 바로 메일을 보낼 수 있는 상태인지 */
  const from = process.env.NOTIFY_FROM || '';
  const 바로보내기 = !!process.env.RESEND_API_KEY && !!from && !/resend\.dev/i.test(from);

  return json(200, {
    ready: true,
    전체: total,
    최신열쇠: 최신열쇠,
    보여준수: rows.length,
    카톡미전달: 미전달,
    미답변: 미답변,
    바로보내기: 바로보내기,
    보내는곳: 바로보내기 ? from : '',
    목록: rows,
  });
};
