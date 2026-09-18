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
  if (!process.env.NETLIFY_BLOBS_CONTEXT) {
    try { connectLambda(event); } catch (e) { /* 지역 시험용 */ }
  }
  return getStore({ name: STORE });
}

/* 카카오 토큰이 아직 살아 있는지만 확인합니다 (메시지는 보내지 않습니다) */
async function kakaoHealth() {
  const key = process.env.KAKAO_REST_API_KEY;
  const sec = process.env.KAKAO_CLIENT_SECRET;
  const ref = process.env.KAKAO_REFRESH_TOKEN;
  if (!key || !ref) {
    return { ok: false, 상태: '설정 없음', 안내: 'KAKAO_REST_API_KEY / KAKAO_REFRESH_TOKEN 이 비어 있습니다' };
  }
  try {
    const res = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: key,
        client_secret: sec || '',
        refresh_token: ref,
      }),
    });
    const data = await res.json();
    if (data.access_token) {
      /* 카카오가 새 리프레시 토큰을 같이 주는 때가 있습니다. 그때는 갈아 끼워야 합니다 */
      return {
        ok: true, 상태: '정상',
        새토큰있음: !!data.refresh_token,
        안내: data.refresh_token
          ? '카카오가 새 토큰을 보내왔습니다. 아래 "새로 연결하기" 로 갱신해 두시면 더 오래 갑니다.'
          : '',
      };
    }
    const code = data.error_code || '';
    return {
      ok: false,
      상태: code === 'KOE322' ? '토큰 만료' : '연결 실패',
      코드: code,
      안내: code === 'KOE322'
        ? '카카오 리프레시 토큰이 만료됐습니다. 다시 연결해 주셔야 알림이 옵니다.'
        : (data.error_description || data.error || ''),
    };
  } catch (e) {
    return { ok: false, 상태: '확인 실패', 안내: (e && e.message) || String(e) };
  }
}

/*
  열쇠는 반드시 "종류/날짜/시각-무작위" 모양이어야 합니다.
  이 검사가 없으면 아무 이름이나 넣어 다른 자료를 지울 수 있습니다.
*/
const KEY_RE = /^(inquiry|deposit|matchday)\/\d{4}-\d{2}-\d{2}\/[A-Za-z0-9_-]{1,60}$/;

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
    return json(200, await kakaoHealth());
  }

  let store;
  try {
    store = openStore(event);
  } catch (e) {
    return json(200, { ready: false, reason: '문의함 저장소를 열지 못했습니다', detail: e.message });
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

  /* 열쇠에 날짜가 들어 있어서 이름만으로 최신순 정렬이 됩니다 */
  const kind = String(body.kind || q.kind || '');
  if (kind) keys = keys.filter(function (k) { return k.indexOf(kind + '/') === 0; });
  keys.sort().reverse();

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
        return v;
      } catch (e) { return null; }
    }));
    got.forEach(function (g) { if (g) rows.push(g); });
  }

  const 미전달 = rows.filter(function (r) { return !r.sent; }).length;

  return json(200, {
    ready: true,
    전체: total,
    보여준수: rows.length,
    카톡미전달: 미전달,
    목록: rows,
  });
};
