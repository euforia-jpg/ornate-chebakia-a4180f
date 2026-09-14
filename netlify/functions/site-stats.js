/*
  ===========================================================
  홈페이지 방문·클릭 통계 읽기 (대쉬보드 전용)
  -----------------------------------------------------------
  ★ GitHub 토큰을 쓰지 않습니다 ★

  hit.js 가 날짜별로 쌓아 둔 꾸러미를 모아
  대쉬보드가 그래프로 그릴 수 있는 모양으로 돌려줍니다.

  대쉬보드에 로그인한 사람만 볼 수 있습니다.
  (다른 함수들과 같은 방식으로 로그인 토큰을 확인합니다)
  ===========================================================
*/

const crypto = require('crypto');
const { connectLambda, getStore } = require('@netlify/blobs');

const TZ = 'Europe/Madrid';
const STORE = 'euforia-stats';
const MAX_DAYS = 90;

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

function todayMadrid() {
  const f = new Intl.DateTimeFormat('en-CA', {
    timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit',
  });
  const p = {};
  f.formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
  return p.year + '-' + p.month + '-' + p.day;
}

/* 오늘부터 거꾸로 n 일치 날짜를 만듭니다 */
function lastDays(n) {
  const out = [];
  const t = new Date(todayMadrid() + 'T00:00:00Z');
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(t);
    d.setUTCDate(d.getUTCDate() - i);
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}

function blank(date) {
  return { date: date, views: 0, visits: 0, pages: {}, products: {}, clicks: {}, refs: {} };
}

function mergeInto(sum, day) {
  sum.views += day.views || 0;
  sum.visits += day.visits || 0;
  ['pages', 'products', 'clicks', 'refs'].forEach(function (k) {
    const src = day[k] || {};
    Object.keys(src).forEach(function (key) {
      sum[k][key] = (sum[k][key] || 0) + src[key];
    });
  });
}

/* { 이름: 횟수 } 를 많은 순으로 줄 세워 위에서 n 개만 */
function top(obj, n) {
  return Object.keys(obj || {})
    .map(function (k) { return { name: k, n: obj[k] }; })
    .sort(function (a, b) { return b.n - a.n; })
    .slice(0, n);
}

/* 한 번에 열 개씩만 읽습니다 (한꺼번에 90개를 부르지 않도록) */
async function readAll(store, dates) {
  const out = [];
  for (let i = 0; i < dates.length; i += 10) {
    const chunk = dates.slice(i, i + 10);
    const got = await Promise.all(chunk.map(async function (d) {
      try {
        const v = await store.get('d/' + d, { type: 'json' });
        return (v && typeof v === 'object') ? v : blank(d);
      } catch (e) {
        return blank(d);
      }
    }));
    got.forEach(function (g, j) { g.date = chunk[j]; out.push(g); });
  }
  return out;
}

exports.handler = async function (event) {
  event = event || {};

  let body = {};
  try { body = JSON.parse(event.body || '{}'); } catch (e) { body = {}; }
  const q = event.queryStringParameters || {};

  if (!checkToken(body.token || q.token)) {
    return json(401, { error: '로그인이 필요합니다' });
  }

  let days = Number(body.days || q.days || 30);
  if (!Number.isFinite(days) || days < 1) days = 30;
  if (days > MAX_DAYS) days = MAX_DAYS;

  try { connectLambda(event); } catch (e) { /* 지역 시험용 */ }

  let store;
  try {
    store = getStore({ name: STORE, consistency: 'strong' });
  } catch (e) {
    return json(200, {
      ready: false,
      reason: '아직 통계 저장소가 준비되지 않았습니다',
      detail: e.message,
    });
  }

  const dates = lastDays(days);
  let rows;
  try {
    rows = await readAll(store, dates);
  } catch (e) {
    return json(200, { ready: false, reason: '통계를 읽지 못했습니다', detail: e.message });
  }

  const sum = { views: 0, visits: 0, pages: {}, products: {}, clicks: {}, refs: {} };
  rows.forEach(function (r) { mergeInto(sum, r); });

  /* 최근 7일 / 그 앞 7일을 견줘서 늘었는지 줄었는지 보여 줍니다 */
  const tail = rows.slice(-7);
  const prev = rows.slice(-14, -7);
  const sumOf = function (list, k) {
    return list.reduce(function (a, r) { return a + (r[k] || 0); }, 0);
  };

  return json(200, {
    ready: true,
    기간: { 시작: dates[0], 끝: dates[dates.length - 1], 일수: days },
    합계: {
      조회: sum.views,
      방문: sum.visits,
    },
    최근7일: {
      조회: sumOf(tail, 'views'),
      방문: sumOf(tail, 'visits'),
      지난7일조회: sumOf(prev, 'views'),
      지난7일방문: sumOf(prev, 'visits'),
    },
    일별: rows.map(function (r) {
      return { date: r.date, views: r.views || 0, visits: r.visits || 0 };
    }),
    인기페이지: top(sum.pages, 12),
    인기상품: top(sum.products, 12),
    버튼클릭: top(sum.clicks, 12),
    유입경로: top(sum.refs, 8),
  });
};
