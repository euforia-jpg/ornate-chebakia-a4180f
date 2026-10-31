/*
  ===========================================================
  호텔 사진 — 일정 만들기(builder.html)의 호텔 카드에 쓰는 사진
  -----------------------------------------------------------
  사진은 GitHub 저장소가 아니라 Netlify 저장소(Blobs) "euforia-hotel-photos" 에 둡니다.
    → 사진을 올릴 때마다 사이트가 다시 배포되지 않습니다 (호텔 수십 곳 × 여러 장)

  POST  { token, action:'upload', id:'h102', data:<JPEG base64> }   (관리자만)
        → { ok, src:'/.netlify/functions/hotel-photo?k=hotels/h102/xxxx.jpg' }
        관리자 화면이 미리 1600px · JPEG 로 줄여서 보냅니다.

  GET   ?k=hotels/h102/xxxx.jpg
        → 사진. 한 번 올린 사진은 이름이 바뀌지 않으므로 오래 캐시합니다.

  ※ 호텔에서 받은 공식 사진이나 직접 찍은 사진만 올려 주세요.
    다른 사이트(예약 사이트 · 호텔 홈페이지 등)의 사진을 내려받아 올리면 저작권 문제가 생깁니다.
  ※ 사진을 목록에서 빼도 저장소의 사진 파일은 지우지 않습니다 (실수로 빼도 되살릴 수 있게).
  ===========================================================
*/

const crypto = require('crypto');
const { connectLambda, getStore } = require('@netlify/blobs');

const STORE = 'euforia-hotel-photos';
const KEY_RE = /^hotels\/[A-Za-z0-9_-]{1,40}\/[a-z0-9]{6,40}\.jpg$/;
const ID_RE = /^[A-Za-z0-9_-]{1,40}$/;
const MAX_B64 = 4 * 1024 * 1024;   /* 줄인 사진은 보통 200~500KB 입니다 */

function openStore(event) {
  try { if (event && event.blobs) connectLambda(event); } catch (e) { /* 지역 시험 */ }
  return getStore({ name: STORE });
}

function json(status, body) {
  return {
    statusCode: status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
    body: JSON.stringify(body),
  };
}

/* 관리자 로그인 토큰 — admin-api 와 같은 방식 (ADMIN_SECRET 서명) */
function checkToken(token) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || !token || String(token).indexOf('.') === -1) return false;
  const [exp, sig] = String(token).split('.');
  if (!/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;
  const want = crypto.createHmac('sha256', secret).update(exp).digest('hex');
  if (!sig || want.length !== sig.length) return false;
  return crypto.timingSafeEqual(Buffer.from(want), Buffer.from(sig));
}

exports.handler = async function (event) {
  event = event || {};
  const method = event.httpMethod || 'GET';

  let store;
  try { store = openStore(event); }
  catch (e) { return json(500, { error: '사진 저장소를 열지 못했습니다' }); }

  /* ---------- 사진 보여 주기 ---------- */
  if (method === 'GET') {
    const k = String((event.queryStringParameters || {}).k || '');
    if (!KEY_RE.test(k)) return { statusCode: 404, body: 'Not Found' };
    try {
      const got = await store.get(k, { type: 'arrayBuffer' });
      if (!got) return { statusCode: 404, headers: { 'Cache-Control': 'no-store' }, body: 'Not Found' };
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=31536000, immutable',
          'Netlify-CDN-Cache-Control': 'public, max-age=31536000, immutable',
        },
        body: Buffer.from(got).toString('base64'),
        isBase64Encoded: true,
      };
    } catch (e) {
      console.error('[hotel-photo] 읽기 실패:', e && e.message);
      return { statusCode: 500, headers: { 'Cache-Control': 'no-store' }, body: 'Error' };
    }
  }

  if (method !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  /* ---------- 사진 올리기 (관리자) ---------- */
  let req;
  try { req = JSON.parse(event.body || '{}'); } catch (e) { return json(400, { error: '요청 형식이 올바르지 않습니다' }); }
  if (!checkToken(req.token)) return json(401, { error: '로그인이 만료되었습니다. 다시 로그인해 주세요.' });
  if (req.action !== 'upload') return json(400, { error: '알 수 없는 요청입니다' });

  const id = String(req.id || '');
  const b64 = String(req.data || '');
  if (!ID_RE.test(id)) return json(400, { error: '호텔 번호가 올바르지 않습니다' });
  if (!b64) return json(400, { error: '사진 내용이 비어 있습니다' });
  if (b64.length > MAX_B64) return json(413, { error: '사진이 너무 큽니다', detail: '3MB 이하로 줄여서 올려 주세요.' });

  const buf = Buffer.from(b64, 'base64');
  /* JPEG 머리(FF D8 FF)인지 확인 — 관리자 화면이 늘 JPEG 로 바꿔 보냅니다 */
  if (buf.length < 4 || buf[0] !== 0xFF || buf[1] !== 0xD8 || buf[2] !== 0xFF) {
    return json(400, { error: 'JPEG 사진만 올릴 수 있습니다' });
  }

  const k = 'hotels/' + id + '/' + Date.now().toString(36) + crypto.randomBytes(4).toString('hex') + '.jpg';
  try {
    await store.set(k, buf, { metadata: { type: 'image/jpeg', 올린때: new Date().toISOString() } });
  } catch (e) {
    console.error('[hotel-photo] 저장 실패:', e && e.message);
    return json(500, { error: '사진을 저장하지 못했습니다', detail: (e && e.message) || '' });
  }
  return json(200, { ok: true, src: '/.netlify/functions/hotel-photo?k=' + k });
};
