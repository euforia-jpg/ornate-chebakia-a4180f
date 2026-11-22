/*
  ===========================================================
  인스타그램 자동 게시 (2026-11-22 김 지시)
  -----------------------------------------------------------
  · 하루 1개. 설정 data/insta-auto.json 의 posts 를 기준일(anchor)부터 차례로 올립니다.
    (현지 정보 카드 5 · 상품 카드 2 비율로 이미 순서가 짜여 있습니다)
  · 올리는 시각: 설정의 hour (마드리드 시각). insta-cron 이 매시 정각에 이 함수를 부릅니다.
  · 사진은 홈페이지에 올라가 있는 JPEG 주소를 인스타가 직접 가져갑니다.
      현지 정보 카드  images/insta/tip-01.jpg …
      상품 카드       images/threads/…-card-….jpg (쓰레드와 같은 사진)

  공식 Instagram API (Instagram 로그인 방식) 순서
    ① POST /{IG_USER_ID}/media          image_url + caption → 상자(container) id
    ② GET  /{container}?fields=status_code   FINISHED 가 될 때까지 기다림
    ③ POST /{IG_USER_ID}/media_publish  creation_id=상자 id → 게시

  넷리파이 환경변수 (김이 직접 넣습니다 — 토큰은 대화창에 붙여 넣지 마세요)
    INSTA_USER_ID   인스타 프로페셔널 계정의 사용자 번호
    INSTA_TOKEN     장기 액세스 토큰(60일)
    INSTA_ACCOUNT   (선택) 올려야 할 계정 아이디 — 다르면 올리지 않습니다
    INSTA_API       (선택) 기본 https://graph.instagram.com

  토큰 60일 문제
    7일마다 토큰을 새로 받아(refresh_access_token) 저장소(Blobs)에 보관하고 그걸 씁니다.
    그래서 한 번 넣으면 계속 이어집니다. 단, 60일 동안 함수가 한 번도 못 돌면 끊깁니다.

  같은 글 두 번 막기
    그날 올린 기록(insta/day/날짜)을 저장소에 남깁니다. 사진 처리가 늦으면
    상자 id 만 적어 두고 다음 시각(1시간 뒤)에 이어서 게시합니다.
  ===========================================================
*/
const crypto = require('crypto');
let blobs = null;
try { blobs = require('@netlify/blobs'); } catch (e) { blobs = null; }

const TZ = 'Europe/Madrid';
const SITE = () => String(process.env.SITE_URL || 'https://toureplus.co.kr').replace(/\/+$/, '');
const API = () => String(process.env.INSTA_API || 'https://graph.instagram.com').replace(/\/+$/, '');
const uid = () => String(process.env.INSTA_USER_ID || '').trim();

function json(status, body) {
  return { statusCode: status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }, body: JSON.stringify(body) };
}
function 창고(event) {
  if (!blobs) return null;
  try { if (event && event.blobs) blobs.connectLambda(event); } catch (e) { /* 새 방식 함수 */ }
  try { return blobs.getStore({ name: 'euforia-insta' }); } catch (e) { return null; }
}
async function 읽기(st, k) { if (!st) return null; try { return await st.get(k, { type: 'json' }); } catch (e) { return null; } }
async function 쓰기(st, k, v) { if (!st) return; try { await st.setJSON(k, v); } catch (e) { console.error('[인스타 자동] 저장 실패', k, e.message); } }

function madridNow(now) {
  const f = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, hour: '2-digit', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit' });
  const p = {}; f.formatToParts(now).forEach(function (x) { p[x.type] = x.value; });
  return { hour: Number(p.hour) % 24, date: p.year + '-' + p.month + '-' + p.day };
}
function daysBetween(a, b) { return Math.round((Date.parse(b + 'T00:00:00Z') - Date.parse(a + 'T00:00:00Z')) / 86400000); }

async function ig(path, params, method, token) {
  const q = new URLSearchParams(Object.assign({ access_token: token }, params || {}));
  const res = await fetch(API() + path + '?' + q.toString(), { method: method || 'GET' });
  const text = await res.text();
  let data = null; try { data = text ? JSON.parse(text) : null; } catch (e) { data = { raw: text }; }
  if (!res.ok) { const e = new Error((data && data.error && data.error.message) || ('Instagram ' + res.status)); e.status = res.status; throw e; }
  return data;
}

/* 토큰: 저장소에 새로 받은 것이 있으면 그것, 없으면 환경변수. 7일 지나면 새로 받기 */
async function 토큰(st) {
  const env = String(process.env.INSTA_TOKEN || '').trim();
  const saved = await 읽기(st, 'insta/token');
  let tok = (saved && saved.token && saved.base === env.slice(-12)) ? saved.token : env;
  const at = saved && saved.base === env.slice(-12) ? Date.parse(saved.at) : 0;
  if (tok && Date.now() - at > 7 * 86400000) {
    try {
      const r = await fetch(API() + '/refresh_access_token?grant_type=ig_refresh_token&access_token=' + encodeURIComponent(tok));
      const j = await r.json();
      if (r.ok && j.access_token) { tok = j.access_token; await 쓰기(st, 'insta/token', { token: tok, at: new Date().toISOString(), base: env.slice(-12) }); }
      else console.error('[인스타 자동] 토큰 갱신 실패:', (j && j.error && j.error.message) || r.status);
    } catch (e) { console.error('[인스타 자동] 토큰 갱신 오류:', e.message); }
  }
  return tok;
}

function imageUrl(v) { v = String(v || '').trim(); return /^https?:\/\//i.test(v) ? v : SITE() + '/' + v.replace(/^\/+/, ''); }

function checkToken(token) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || !token || token.indexOf('.') === -1) return false;
  const [exp, sig] = token.split('.');
  if (!/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;
  const want = crypto.createHmac('sha256', secret).update(exp).digest('hex');
  if (want.length !== sig.length) return false;
  return crypto.timingSafeEqual(Buffer.from(want), Buffer.from(sig));
}

async function 기다리기(container, token, ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    const s = await ig('/' + container, { fields: 'status_code' }, 'GET', token);
    if (s && s.status_code === 'FINISHED') return 'FINISHED';
    if (s && (s.status_code === 'ERROR' || s.status_code === 'EXPIRED')) return s.status_code;
    await new Promise(function (r) { setTimeout(r, 2000); });
  }
  return 'IN_PROGRESS';
}

exports.handler = async function (event) {
  event = event || {};
  const q = event.queryStringParameters || {};
  if (!event.__internal) {
    let body = {}; try { body = JSON.parse(event.body || '{}'); } catch (e) { body = {}; }
    if (!checkToken(body.token || q.token)) return json(401, { error: '로그인이 필요합니다' });
  }
  const forced = !!q.force, dry = !!q.dry;

  let cfg;
  try {
    const r = await fetch(SITE() + '/data/insta-auto.json?t=' + Date.now(), { cache: 'no-store' });
    if (!r.ok) throw new Error('설정 파일 ' + r.status);
    cfg = await r.json();
  } catch (e) { return json(200, { skipped: '설정을 읽지 못했습니다', detail: e.message }); }
  if (!cfg || cfg.enabled === false) return json(200, { skipped: '인스타 자동 게시가 꺼져 있습니다' });

  const now = madridNow(new Date());
  const hour = Number.isInteger(Number(cfg.hour)) ? Number(cfg.hour) : 12;
  const posts = (cfg.posts || []).filter(function (p) { return p && !p.off && p.image && p.caption; });
  if (!posts.length) return json(200, { skipped: '올릴 게시물이 없습니다' });
  const n = Math.max(0, daysBetween(cfg.anchor || now.date, now.date));
  const post = posts[n % posts.length];
  const preview = { 현지: now, 차례: (n % posts.length) + 1, 전체: posts.length, 종류: post.kind, 사진: imageUrl(post.image), 캡션: post.caption.slice(0, 160) };

  if (dry) return json(200, { dryRun: true, 올릴내용: preview });
  if (!uid() || !String(process.env.INSTA_TOKEN || '').trim()) return json(200, { skipped: '인스타 열쇠(INSTA_USER_ID / INSTA_TOKEN)가 아직 없습니다', 올릴내용: preview });

  const st = 창고(event);
  const dayKey = 'insta/day/' + now.date;
  const day = await 읽기(st, dayKey);
  if (day && day.published && !forced) return json(200, { skipped: '오늘은 이미 올렸습니다', 기록: day });
  /* 정해진 시각 전이고, 이어서 올릴 상자도 없으면 쉽니다 */
  if (!forced && !(day && day.container) && now.hour !== hour) return json(200, { skipped: '아직 게시 시각이 아닙니다', 현지: now, 설정시각: hour });
  /* 같은 시각에 두 번 불린 경우: 1분 안에 이미 맡은 호출이 있으면 돌아갑니다 */
  if (day && day.lock && Date.now() - Date.parse(day.lock) < 60000 && !forced) return json(200, { skipped: '다른 호출이 처리 중입니다' });
  await 쓰기(st, dayKey, Object.assign({}, day || {}, { lock: new Date().toISOString() }));

  const token = await 토큰(st);
  try {
    const want = String(process.env.INSTA_ACCOUNT || '').trim().replace(/^@/, '');
    if (want) {
      const me = await ig('/me', { fields: 'user_id,username' }, 'GET', token);
      if (String(me.username || '').toLowerCase() !== want.toLowerCase()) {
        await 쓰기(st, dayKey, Object.assign({}, day || {}, { lock: '' }));
        return json(200, { error: '다른 계정이라 올리지 않았습니다', expected: want, actual: me.username });
      }
    }
    let container = day && day.container;
    if (!container) {
      const box = await ig('/' + uid() + '/media', { image_url: imageUrl(post.image), caption: post.caption }, 'POST', token);
      container = box && box.id;
      if (!container) throw new Error('인스타가 게시 상자를 만들어 주지 않았습니다');
      await 쓰기(st, dayKey, { container: container, post: post.id, at: new Date().toISOString(), lock: new Date().toISOString() });
    }
    const status = await 기다리기(container, token, 8000);
    if (status === 'IN_PROGRESS') {
      await 쓰기(st, dayKey, { container: container, post: post.id, at: new Date().toISOString(), lock: '' });
      return json(200, { pending: '사진 처리 중 — 다음 시각에 이어서 게시합니다', container: container, 올릴내용: preview });
    }
    if (status !== 'FINISHED') {
      await 쓰기(st, dayKey, { error: status, post: post.id, at: new Date().toISOString(), lock: '' });
      return json(200, { error: '인스타가 사진을 처리하지 못했습니다 (' + status + ')', 올릴내용: preview });
    }
    const out = await ig('/' + uid() + '/media_publish', { creation_id: container }, 'POST', token);
    await 쓰기(st, dayKey, { published: out && out.id, post: post.id, at: new Date().toISOString(), lock: '' });
    return json(200, { ok: true, id: out && out.id, 올린내용: preview });
  } catch (e) {
    await 쓰기(st, dayKey, Object.assign({}, day || {}, { lastError: e.message, lock: '' }));
    return json(200, { error: '게시에 실패했습니다', detail: e.message, 올리려던내용: preview });
  }
};
