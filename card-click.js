/*
  ===========================================================
  상품 카드 클릭 수 → BEST 배지
  -----------------------------------------------------------
  POST  /.netlify/functions/card-click   { id: "spain-round" }
        손님이 메인·여행상품 화면에서 상품 카드를 누를 때 한 번 셉니다.
        (같은 기기에서 같은 상품은 6시간에 한 번만 — 화면 쪽 tour-live.js 가 거릅니다)

  GET   /.netlify/functions/card-click
        최근 30일 동안 많이 눌린 상품 순서를 돌려줍니다.
        → 화면에서 위 3개(5번 이상 눌린 것만)에 BEST 배지를 붙입니다.

  저장 위치: Netlify 저장소 "euforia-stats" 창고, 「clicks/상품id」 칸
             { days: { "2026-10-31": 12, ... } }  — 60일 지난 날짜는 저절로 지웁니다
  손님 정보(이름·IP 등)는 하나도 저장하지 않습니다. 날짜별 숫자만 남깁니다.
  ===========================================================
*/

const { connectLambda, getStore } = require('@netlify/blobs');

const STORE = 'euforia-stats';
const PREFIX = 'clicks/';
const ID_RE = /^[a-z0-9][a-z0-9-]{1,59}$/;
const KEEP_DAYS = 60;     /* 저장해 두는 기간 */
const RANK_DAYS = 30;     /* BEST 를 가르는 기간 */
const MAX_KEYS = 200;     /* 엉뚱한 id 로 칸이 끝없이 늘지 않게 */

function openStore(event) {
  try { if (event && event.blobs) connectLambda(event); } catch (e) { /* 지역 시험 */ }
  return getStore({ name: STORE });
}

function 서울날짜(일전) {
  return new Date(Date.now() + 9 * 3600 * 1000 - (일전 || 0) * 86400 * 1000).toISOString().slice(0, 10);
}

function reply(status, body, cache) {
  const h = { 'Content-Type': 'application/json; charset=utf-8' };
  if (cache) {
    h['Cache-Control'] = 'public, max-age=120';
    h['Netlify-CDN-Cache-Control'] = 'public, s-maxage=600, stale-while-revalidate=1200';
  } else {
    h['Cache-Control'] = 'no-store';
  }
  return { statusCode: status, headers: h, body: body == null ? '' : JSON.stringify(body) };
}

/* 같은 서버가 살아 있는 동안, 같은 곳에서 같은 상품을 연달아 누르는 것은 10분에 한 번만 */
const 최근 = new Map();
function 너무잦음(event, id) {
  const h = (event && event.headers) || {};
  const ip = String(h['x-nf-client-connection-ip'] || h['x-forwarded-for'] || '').split(',')[0].trim();
  if (!ip) return false;
  const k = ip + '|' + id, 지금 = Date.now();
  const 전 = 최근.get(k);
  if (전 && 지금 - 전 < 10 * 60 * 1000) return true;
  최근.set(k, 지금);
  if (최근.size > 5000) 최근.clear();
  return false;
}

exports.handler = async function (event) {
  event = event || {};
  const method = event.httpMethod || 'GET';

  let store;
  try { store = openStore(event); }
  catch (e) { return reply(200, { ok: false, 순위: [] }, false); }

  /* ---------- 한 번 세기 ---------- */
  if (method === 'POST') {
    let id = '';
    try {
      const raw = event.isBase64Encoded ? Buffer.from(event.body || '', 'base64').toString('utf8') : (event.body || '');
      id = String((JSON.parse(raw || '{}') || {}).id || '');
    } catch (e) { id = ''; }
    if (!ID_RE.test(id)) return reply(400, { ok: false }, false);
    if (너무잦음(event, id)) return reply(200, { ok: true, 셈: false }, false);

    try {
      const key = PREFIX + id;
      let row = await store.get(key, { type: 'json' });
      if (!row) {
        /* 처음 보는 id — 칸 수가 너무 많으면 새로 만들지 않습니다 */
        const res = await store.list({ prefix: PREFIX });
        if ((res && res.blobs ? res.blobs.length : 0) >= MAX_KEYS) return reply(200, { ok: true, 셈: false }, false);
        row = { days: {} };
      }
      const days = (row && typeof row.days === 'object' && row.days) ? row.days : {};
      const 오늘 = 서울날짜(0), 지울날 = 서울날짜(KEEP_DAYS);
      days[오늘] = (Number(days[오늘]) || 0) + 1;
      Object.keys(days).forEach(function (d) { if (d < 지울날) delete days[d]; });
      await store.setJSON(key, { days: days });
      return reply(200, { ok: true, 셈: true }, false);
    } catch (e) {
      console.error('[card-click] 저장 실패:', e && e.message);
      return reply(200, { ok: false }, false);
    }
  }

  if (method !== 'GET') return { statusCode: 405, body: 'Method Not Allowed' };

  /* ---------- 순위 ---------- */
  try {
    const res = await store.list({ prefix: PREFIX });
    const keys = (res && res.blobs ? res.blobs : []).map(function (b) { return b.key; }).slice(0, MAX_KEYS);
    const 기준 = 서울날짜(RANK_DAYS);
    const 순위 = [];
    await Promise.all(keys.map(async function (k) {
      try {
        const row = await store.get(k, { type: 'json' });
        const days = (row && row.days) || {};
        let n = 0;
        Object.keys(days).forEach(function (d) { if (d >= 기준) n += Number(days[d]) || 0; });
        if (n > 0) 순위.push({ id: k.slice(PREFIX.length), n: n });
      } catch (e) { /* 한 칸 못 읽어도 나머지로 셉니다 */ }
    }));
    순위.sort(function (a, b) { return b.n - a.n || (a.id < b.id ? -1 : 1); });
    return reply(200, { ok: true, 기간일: RANK_DAYS, 순위: 순위.slice(0, 10) }, true);
  } catch (e) {
    console.error('[card-click] 순위 실패:', e && e.message);
    return reply(200, { ok: false, 순위: [] }, false);
  }
};
