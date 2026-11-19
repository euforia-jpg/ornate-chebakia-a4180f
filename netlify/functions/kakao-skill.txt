/*
  ===========================================================
  카카오톡 채널 챗봇 → 통합앱 「받은일」
  -----------------------------------------------------------
  손님이 카카오톡 채널(pf.kakao.com/_BSxggn)에 글을 남기면
  카카오 i 오픈빌더가 이 함수를 부릅니다 (스킬).

    ① 글을 Netlify Blobs 「euforia-kakao-inbox」에 저장하고
    ② 손님에게 "접수했습니다" 한 줄로 답합니다.
    ③ 통합 운영 앱이 30분마다 가져가서 「받은일」에 한 줄씩 넣습니다.

  실제 답장은 지금처럼 카카오톡 채널 관리자센터에서 사람이 합니다.

  -----------------------------------------------------------
  환경변수 (Netlify → Site configuration → Environment variables)

    KAKAO_SKILL_KEY   오픈빌더 스킬 주소 끝에 붙이는 비밀 열쇠 (아무 영문·숫자 20자 이상)
                      스킬 주소: https://toureplus.co.kr/.netlify/functions/kakao-skill?k=<열쇠>
    KAKAO_SKILL_REPLY (선택) 손님에게 보낼 접수 답 문구. 없으면 아래 기본 문구
    ADMIN_SECRET      이미 있는 값. 통합앱이 목록을 가져갈 때 출입증 확인에 씁니다

  -----------------------------------------------------------
  저장하는 것: 글 내용 · 받은 시각 · 손님 구분번호(카카오 사용자 키를 줄여 만든 6자리)
  저장하지 않는 것: 카카오 사용자 키 원본, 이름, 전화번호
  ===========================================================
*/

'use strict';

const crypto = require('crypto');
const { connectLambda, getStore } = require('@netlify/blobs');

const STORE = 'euforia-kakao-inbox';
const 보관일수 = 60;
const 하루상한 = 40;   /* 한 손님이 하루에 남길 수 있는 글 수 — 넘으면 저장하지 않고 답만 합니다 */

const 기본답 =
  '안녕하세요, 유포리아투어입니다.\n' +
  '남겨 주신 내용을 담당자에게 전달했습니다.\n' +
  '스페인 업무시간(월~금 09:00~18:00, 한국 시각 17:00~02:00)에 이 채팅으로 답변드리겠습니다.\n' +
  '급한 일은 +34 611 209 095 로 연락 주세요.';

function json(status, body) {
  return {
    statusCode: status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' },
    body: JSON.stringify(body),
  };
}

function 카카오답(text) {
  return json(200, { version: '2.0', template: { outputs: [{ simpleText: { text: text } }] } });
}

function 같다(a, b) {
  const x = Buffer.from(String(a || '')), y = Buffer.from(String(b || ''));
  return x.length > 0 && x.length === y.length && crypto.timingSafeEqual(x, y);
}

/* 관리자 출입증 — booking.js 와 같은 방식 (만료시각.HMAC) */
function checkToken(token) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || !token || String(token).indexOf('.') === -1) return false;
  const [exp, sig] = String(token).split('.');
  if (!/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;
  const want = crypto.createHmac('sha256', secret).update(exp).digest('hex');
  return 같다(want, sig);
}

function store(event) {
  try { if (event && event.blobs) connectLambda(event); } catch (e) { /* 지역 시험 */ }
  return getStore({ name: STORE });
}

function 오늘() {
  const p = {};
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit' })
    .formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
  return p.year + '-' + p.month + '-' + p.day;
}

/* ---------------------------------------------------------- 오픈빌더 스킬 */
async function 스킬(event, body, db) {
  const 답 = process.env.KAKAO_SKILL_REPLY || 기본답;
  const ur = body.userRequest || {};
  const text = String(ur.utterance || '').replace(/\u0000/g, '').trim().slice(0, 1500);
  const u = ur.user || {};
  const 원키 = (u.properties && (u.properties.plusfriendUserKey || u.properties.appUserId)) || u.id || '';
  const 손님 = 원키 ? crypto.createHash('sha256').update('euforia:' + 원키).digest('hex').slice(0, 6) : '------';

  if (!text) return 카카오답(답);

  try {
    /* 같은 손님이 하루에 너무 많이 보내면 저장만 멈춥니다 */
    const 셈키 = 'n/' + 오늘() + '/' + 손님;
    const n = Number(await db.get(셈키, { type: 'text' }) || 0);
    if (n < 하루상한) {
      await db.set(셈키, String(n + 1));
      const at = new Date().toISOString();
      const id = at.replace(/[-:.TZ]/g, '').slice(0, 17) + crypto.randomBytes(3).toString('hex');
      await db.setJSON('m/' + id, { id: id, at: at, user: 손님, text: text, block: (body.intent && body.intent.name) || '' });
    }
  } catch (e) {
    console.error('[카톡 스킬] 저장 실패:', e.message);   /* 저장이 안 돼도 손님에게는 답합니다 */
  }
  return 카카오답(답);
}

/* ---------------------------------------------------------- 통합앱이 가져가기 */
async function 목록(body, q, db) {
  const after = String(body.after || q.after || '');
  const { blobs } = await db.list({ prefix: 'm/' });
  const keys = blobs.map(function (b) { return b.key; }).sort();
  const 기한 = new Date(Date.now() - 보관일수 * 86400000).toISOString().replace(/[-:.TZ]/g, '').slice(0, 17);
  const out = [];
  for (const k of keys) {
    const id = k.slice(2);
    if (id.slice(0, 17) < 기한) { try { await db.delete(k); } catch (e) { /* 다음에 */ } continue; }
    if (after && id <= after) continue;
    if (out.length >= 100) break;
    const m = await db.get(k, { type: 'json' });
    if (m) out.push(m);
  }
  return json(200, { ok: true, items: out, last: out.length ? out[out.length - 1].id : after });
}

exports.handler = async function (event) {
  event = event || {};
  let body = {};
  try { body = JSON.parse(event.body || '{}'); } catch (e) { body = {}; }
  const q = event.queryStringParameters || {};

  let db;
  try { db = store(event); } catch (e) { return json(500, { error: '저장소를 열지 못했습니다' }); }

  try {
    /* 통합앱 (관리자 출입증) */
    if (body.token || q.token) {
      if (!checkToken(body.token || q.token)) return json(401, { error: '로그인이 필요합니다' });
      return await 목록(body, q, db);
    }
    /* 오픈빌더 스킬 (주소 끝의 열쇠) */
    if (event.httpMethod !== 'POST') return json(405, { error: 'POST 만 받습니다' });
    if (!process.env.KAKAO_SKILL_KEY || !같다(q.k, process.env.KAKAO_SKILL_KEY)) return json(403, { error: '열쇠가 맞지 않습니다' });
    return await 스킬(event, body, db);
  } catch (e) {
    console.error('[카톡 스킬]', e && e.stack || e);
    return json(500, { error: '처리하지 못했습니다' });
  }
};
