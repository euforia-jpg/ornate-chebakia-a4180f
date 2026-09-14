/*
  ===========================================================
  쓰레드 글 성과 읽기 (대쉬보드 전용)
  -----------------------------------------------------------
  ★ GitHub 토큰을 쓰지 않습니다 ★

  쓰레드가 직접 알려 주는 숫자를 그대로 받아 옵니다.
      · 계정 전체   조회수 · 좋아요 · 댓글 · 팔로워 수
      · 글 하나하나  조회수 · 좋아요 · 댓글 · 리포스트 · 인용

  -----------------------------------------------------------
  권한 한 가지가 더 필요합니다

  성과 숫자는 threads_manage_insights 권한이 있어야 읽힙니다.
  지금 쓰는 열쇠에 그 권한이 없으면 쓰레드가 거절하는데,
  그때는 화면에 "쓰레드 연결하기를 다시 해주세요" 라고 안내합니다.
  글 목록 자체는 권한 없이도 보이므로, 최소한 무엇을 올렸는지는 늘 나옵니다.

  Netlify 환경변수
    THREADS_USER_ID, THREADS_TOKEN
  ===========================================================
*/

const crypto = require('crypto');

const API = 'https://graph.threads.net/v1.0';

const tok = () => String(process.env.THREADS_TOKEN || '').trim();
const uid = () => String(process.env.THREADS_USER_ID || '').trim();

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

async function th(path, params) {
  const q = new URLSearchParams(Object.assign({ access_token: tok() }, params || {}));
  const res = await fetch(API + path + '?' + q.toString());
  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch (e) { data = { raw: text }; }
  if (!res.ok) {
    const e = (data && data.error) || {};
    const err = new Error(e.message || ('쓰레드 ' + res.status));
    err.status = res.status;
    err.code = e.code;
    err.sub = e.error_subcode;
    throw err;
  }
  return data;
}

/* 권한이 없어서 거절당한 것인지 가려냅니다 */
function isPermission(e) {
  const m = String((e && e.message) || '').toLowerCase();
  return e && (e.code === 10 || e.code === 200 || e.code === 803 ||
    m.indexOf('permission') !== -1 || m.indexOf('scope') !== -1 ||
    m.indexOf('insights') !== -1);
}

/* 쓰레드가 주는 모양({data:[{name, values:[{value}]}]})을 { 이름: 숫자 } 로 폅니다 */
function flatten(res) {
  const out = {};
  const list = (res && res.data) || [];
  list.forEach(function (m) {
    let v = 0;
    if (m.total_value && typeof m.total_value.value === 'number') v = m.total_value.value;
    else if (Array.isArray(m.values) && m.values.length) {
      v = m.values.reduce(function (a, x) { return a + (Number(x.value) || 0); }, 0);
    }
    out[m.name] = v;
  });
  return out;
}

function shorten(s, n) {
  const t = String(s || '').replace(/\s+/g, ' ').trim();
  return t.length > n ? t.slice(0, n) + '…' : t;
}

exports.handler = async function (event) {
  event = event || {};

  let body = {};
  try { body = JSON.parse(event.body || '{}'); } catch (e) { body = {}; }
  const q = event.queryStringParameters || {};

  if (!checkToken(body.token || q.token)) {
    return json(401, { error: '로그인이 필요합니다' });
  }

  if (!uid() || !tok()) {
    return json(200, { ready: false, reason: '쓰레드 열쇠가 아직 없습니다. 설치안내의 쓰레드 항목을 봐 주세요' });
  }

  let limit = Number(body.limit || q.limit || 12);
  if (!Number.isFinite(limit) || limit < 1) limit = 12;
  if (limit > 25) limit = 25;

  /* ---------- 1. 올린 글 목록 (권한 없이도 됩니다) ---------- */
  let posts = [];
  try {
    const r = await th('/' + uid() + '/threads', {
      fields: 'id,text,timestamp,permalink,media_type',
      limit: String(limit),
    });
    posts = (r && r.data) || [];
  } catch (e) {
    return json(200, { ready: false, reason: '쓰레드 글 목록을 읽지 못했습니다', detail: e.message });
  }

  /* ---------- 2. 계정 전체 성과 ---------- */
  let account = null;
  let needPermission = false;
  try {
    const since = Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 30;
    const until = Math.floor(Date.now() / 1000);
    const r = await th('/' + uid() + '/threads_insights', {
      metric: 'views,likes,replies,reposts,quotes,followers_count',
      since: String(since),
      until: String(until),
    });
    account = flatten(r);
  } catch (e) {
    if (isPermission(e)) needPermission = true;
    else account = { _error: e.message };
  }

  /* ---------- 3. 글 하나하나 성과 ---------- */
  const rows = [];
  for (let i = 0; i < posts.length; i += 5) {
    const chunk = posts.slice(i, i + 5);
    const got = await Promise.all(chunk.map(async function (p) {
      const base = {
        id: p.id,
        글: shorten(p.text, 60),
        올린날: String(p.timestamp || '').slice(0, 10),
        주소: p.permalink || '',
        사진: p.media_type === 'IMAGE' || p.media_type === 'CAROUSEL_ALBUM',
      };
      if (needPermission) return base;
      try {
        const r = await th('/' + p.id + '/insights', {
          metric: 'views,likes,replies,reposts,quotes',
        });
        const f = flatten(r);
        base.조회 = f.views || 0;
        base.좋아요 = f.likes || 0;
        base.댓글 = f.replies || 0;
        base.리포스트 = f.reposts || 0;
        base.인용 = f.quotes || 0;
      } catch (e) {
        if (isPermission(e)) needPermission = true;
      }
      return base;
    }));
    got.forEach(function (g) { rows.push(g); });
  }

  const sum = rows.reduce(function (a, r) {
    a.조회 += r.조회 || 0; a.좋아요 += r.좋아요 || 0; a.댓글 += r.댓글 || 0;
    return a;
  }, { 조회: 0, 좋아요: 0, 댓글: 0 });

  return json(200, {
    ready: true,
    성과권한: !needPermission,
    권한안내: needPermission
      ? '글이 몇 번 노출됐는지 보려면 권한이 하나 더 필요합니다. 쓰레드 탭에서 "쓰레드 연결하기" 를 한 번 더 해 주세요.'
      : '',
    계정: account,
    글수: rows.length,
    합계: sum,
    글: rows,
  });
};
