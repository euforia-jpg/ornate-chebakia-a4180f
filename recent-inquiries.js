/*
  ===========================================================
  최근 예약문의 (상품 카드에 띄우는 「○**님 예약문의 · 3시간 전」)
  -----------------------------------------------------------
  문의함(Netlify 저장소 "euforia-inbox")에 실제로 들어온
  예약문의만 읽어서 돌려줍니다. 지어낸 내용은 하나도 없습니다.

  손님 화면으로 나가는 것은 딱 세 가지뿐입니다.
    성     이름의 첫 글자 한 자 (화면에는 「장**님」으로 가려서 보입니다)
    상품   손님이 고른 관심 상품 이름
    at     문의가 들어온 시각 (서울 시간)
  연락처 · 이메일 · 인원 · 메시지는 절대 내보내지 않습니다.

  - 최근 30일 안의 문의만, 최대 30건
  - 이름이나 메시지에 「테스트 / test」 가 들어간 것은 뺍니다
  - 문의함에서 지운 문의는 여기서도 바로 빠집니다 (최대 5분 뒤)
  - 로그인 없이 누구나 부를 수 있으므로, 위 세 가지 말고는 담지 마세요
  ===========================================================
*/

const { connectLambda, getStore } = require('@netlify/blobs');

const STORE = 'euforia-inbox';
const KEY_RE = /^inquiry\/(\d{4}-\d{2}-\d{2})\/([A-Za-z0-9_-]{1,60})$/;
const DAYS = 30;
const MAX = 30;

function openStore(event) {
  try { if (event && event.blobs) connectLambda(event); } catch (e) { /* 지역 시험에는 없습니다 */ }
  return getStore({ name: STORE });
}

function reply(status, body, cache) {
  const h = { 'Content-Type': 'application/json; charset=utf-8' };
  if (cache) {
    h['Cache-Control'] = 'public, max-age=60';
    h['Netlify-CDN-Cache-Control'] = 'public, s-maxage=300, stale-while-revalidate=600';
  } else {
    h['Cache-Control'] = 'no-store';
  }
  return { statusCode: status, headers: h, body: JSON.stringify(body) };
}

/* 이름 → 첫 글자 한 자. 한글·영문이 아니면 비워 둡니다 (화면에는 「손님」) */
function 성만(이름) {
  const c = String(이름 || '').trim().charAt(0);
  if (/[가-힣]/.test(c)) return c;
  if (/[A-Za-z]/.test(c)) return c.toUpperCase();
  return '';
}

function 서울날짜(일전) {
  const d = new Date(Date.now() + 9 * 3600 * 1000 - 일전 * 86400 * 1000);
  return d.toISOString().slice(0, 10);
}

exports.handler = async function (event) {
  if (event && event.httpMethod && event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let store;
  try { store = openStore(event); }
  catch (e) { return reply(200, { ok: false, 목록: [] }, false); }

  let keys = [];
  try {
    const res = await store.list({ prefix: 'inquiry/' });
    keys = (res && res.blobs ? res.blobs : []).map(function (b) { return b.key; });
  } catch (e) {
    console.error('[recent-inquiries] 목록 실패:', e && e.message);
    return reply(200, { ok: false, 목록: [] }, false);
  }

  const 기준 = 서울날짜(DAYS);
  keys = keys.filter(function (k) {
    const m = KEY_RE.exec(k);
    return m && m[1] >= 기준;
  });
  /* 열쇠가 「inquiry/날짜/시각-…」 이라 글자순으로 거꾸로 세우면 최신순입니다 */
  keys.sort().reverse();
  keys = keys.slice(0, MAX);

  const 목록 = [];
  await Promise.all(keys.map(async function (k) {
    try {
      const v = await store.get(k, { type: 'json' });
      if (!v || typeof v !== 'object' || !v.내용) return;
      const 내 = v.내용;
      if (/테스트|test/i.test(String(내.이름 || '') + ' ' + String(내.메시지 || ''))) return;
      const 상품 = String(내.관심상품 || '').trim().slice(0, 120);
      if (!상품) return;
      목록.push({ 성: 성만(내.이름), 상품: 상품, at: String(v.at || '').slice(0, 16) });
    } catch (e) { /* 한 건 못 읽어도 나머지는 보여 줍니다 */ }
  }));
  목록.sort(function (a, b) { return a.at < b.at ? 1 : a.at > b.at ? -1 : 0; });

  return reply(200, { ok: true, 목록: 목록 }, true);
};
