/*
  ===========================================================
  예약 페이지 — 손님과 사무실이 같이 보는 「내 예약」
  -----------------------------------------------------------
  ★ GitHub 토큰을 쓰지 않습니다. 손님 정보는 저장소(GitHub)에 올라가지 않습니다 ★

  두 쪽에서 부릅니다.

  ① 관리자 대쉬보드 「예약 관리」 탭 (로그인 토큰 필요)
       list · get · save · relink · lock · reply · read
       upload · docShow · docDel · file · delete

  ② 손님 전용 링크 https://toureplus.co.kr/my/<링크열쇠>  (my.html)
       view · msg · file(내려받기)

  -----------------------------------------------------------
  어디에 저장하나

    Netlify Blobs 「euforia-bookings」
      b/<예약코드>        예약 한 건(JSON)
      link/<링크열쇠>     링크열쇠 → 예약코드
    Netlify Blobs 「euforia-booking-files」
      <예약코드>/<서류id>  올린 서류(PDF·사진)

  -----------------------------------------------------------
  손님 링크 규칙

    · 링크열쇠는 24글자 무작위라 짐작해서 열 수 없습니다.
    · 「링크 새로 만들기」를 누르면 예전 링크는 바로 막힙니다.
    · 「링크 잠시 막기」 동안에는 손님이 열 수 없습니다.
    · 여행 끝난 날에서 30일이 지나면 저절로 닫힙니다.
    · 손님 쪽에는 내부 메모 · 손님 연락처를 내보내지 않습니다.

  -----------------------------------------------------------
  손님이 메시지를 남기면

    대쉬보드 「예약 관리」 탭에 빨간 숫자가 붙고,
    RESEND_API_KEY 가 있으면 NOTIFY_EMAIL(없으면 euforia@euforiatour.com)로
    메일이 갑니다. (예약문의 알림과 같은 설정을 씁니다)
  ===========================================================
*/

'use strict';

const crypto = require('crypto');
const { connectLambda, getStore } = require('@netlify/blobs');

const SITE = 'https://toureplus.co.kr';
const STORE = 'euforia-bookings';
const FILES = 'euforia-booking-files';
const 닫힘일수 = 30;                 /* 여행 끝난 뒤 며칠 지나면 링크를 닫을지 */
const 서류최대 = 4 * 1024 * 1024;    /* 4MB — 함수가 주고받을 수 있는 크기 안쪽 */
const 하루메시지 = 30;               /* 한 예약에서 손님이 하루에 남길 수 있는 메시지 수 */
const 단계 = ['문의', '확정', '잔금', '출발 준비', '여행 중', '종료'];
const 글자 = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';   /* 헷갈리는 O · 0 · I · 1 은 뺐습니다 */

/* ---------------------------------------------------------- 공통 */
function json(status, body) {
  return {
    statusCode: status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
    body: JSON.stringify(body),
  };
}

function checkToken(token) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || !token || String(token).indexOf('.') === -1) return false;
  const [exp, sig] = String(token).split('.');
  if (!/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;
  const want = crypto.createHmac('sha256', secret).update(exp).digest('hex');
  if (!sig || want.length !== sig.length) return false;
  return crypto.timingSafeEqual(Buffer.from(want), Buffer.from(sig));
}

function stores(event) {
  try { if (event && event.blobs) connectLambda(event); } catch (e) { /* 지역 시험 */ }
  return { db: getStore({ name: STORE }), files: getStore({ name: FILES }) };
}

function 지금() { return new Date().toISOString(); }
function 오늘() {
  const p = {};
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit' })
    .formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
  return p.year + '-' + p.month + '-' + p.day;
}
function 날짜(s) { return /^\d{4}-\d{2}-\d{2}$/.test(String(s || '')) ? String(s) : ''; }
function 글(s, n) { return String(s == null ? '' : s).replace(/\u0000/g, '').slice(0, n || 500); }
function 링크열쇠() { return crypto.randomBytes(18).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
function 무작위(n) { let s = ''; const b = crypto.randomBytes(n); for (let i = 0; i < n; i++) s += 글자[b[i] % 글자.length]; return s; }

function 지도주소(u) {
  const v = String(u || '').trim();
  return /^https:\/\//i.test(v) ? v.slice(0, 600) : '';
}

/* 손님이 보낸 예약을 정리합니다 — 모르는 칸은 버리고, 길이를 자릅니다 */
function 다듬기(b, 예전) {
  예전 = 예전 || {};
  const o = {
    code: 예전.code || '',
    link: 예전.link || '',
    locked: !!예전.locked,
    created: 예전.created || 지금(),
    updated: 지금(),
    lastSeen: 예전.lastSeen || '',
    msgs: 예전.msgs || [],
    unread: 예전.unread || 0,
    docs: 예전.docs || [],
    msgDay: 예전.msgDay || {},
  };
  o.status = Math.max(0, Math.min(단계.length - 1, parseInt(b.status, 10) || 0));
  o.surname = 글(b.surname, 40).toUpperCase().trim();
  o.name = 글(b.name, 60).trim();
  o.people = 글(b.people, 60).trim();
  o.start = 날짜(b.start);
  o.end = 날짜(b.end) || o.start;
  o.product = 글(b.product, 120).trim();
  o.productUrl = /^\/p\/[A-Za-z0-9-]+$/.test(String(b.productUrl || '')) ? String(b.productUrl) : '';
  o.notice = 글(b.notice, 200).trim();
  o.email = 글(b.email, 120).trim();
  o.phone = 글(b.phone, 60).trim();
  o.memo = 글(b.memo, 3000);
  o.days = (Array.isArray(b.days) ? b.days : []).slice(0, 60).map(function (d) {
    return {
      date: 날짜(d && d.date),
      title: 글(d && d.title, 120).trim(),
      desc: 글(d && d.desc, 800).trim(),
      meet: 글(d && d.meet, 400).trim(),
      map: 지도주소(d && d.map),
    };
  }).filter(function (d) { return d.date || d.title || d.desc || d.meet; });
  o.pay = (Array.isArray(b.pay) ? b.pay : []).slice(0, 12).map(function (p) {
    const n = Number(String(p && p.amount || '').replace(/[^\d.]/g, ''));
    return {
      label: 글(p && p.label, 60).trim(),
      amount: isFinite(n) && n > 0 ? Math.round(n * 100) / 100 : 0,
      cur: (p && p.cur === 'KRW') ? 'KRW' : 'EUR',
      due: 날짜(p && p.due),
      paid: !!(p && p.paid),
    };
  }).filter(function (p) { return p.label || p.amount; });
  return o;
}

async function 새코드(db, start) {
  const ym = (날짜(start) || 오늘()).slice(2, 7).replace('-', '');
  for (let i = 0; i < 8; i++) {
    const c = 'EU-' + ym + '-' + 무작위(4);
    if (!(await db.get('b/' + c, { type: 'json' }))) return c;
  }
  throw new Error('예약코드를 만들지 못했습니다. 다시 눌러 주세요');
}

function 요약(b) {
  const 안냄 = (b.pay || []).filter(function (p) { return !p.paid; });
  return {
    code: b.code, surname: b.surname, name: b.name, people: b.people,
    start: b.start, end: b.end, product: b.product, status: b.status,
    unread: b.unread || 0, locked: !!b.locked, lastSeen: b.lastSeen || '',
    updated: b.updated, unpaid: 안냄.length,
  };
}

function 닫혔나(b) {
  if (b.locked) return '이 예약 페이지는 지금 잠시 닫혀 있습니다. 담당자에게 문의해 주세요.';
  const 끝 = 날짜(b.end) || 날짜(b.start);
  if (끝) {
    const t = new Date(끝 + 'T00:00:00Z').getTime() + 닫힘일수 * 86400000;
    if (Date.now() > t) return '여행이 끝난 지 ' + 닫힘일수 + '일이 지나 예약 페이지가 닫혔습니다.';
  }
  return '';
}

function 다냄(b) { return (b.pay || []).length > 0 && b.pay.every(function (p) { return p.paid; }); }

/* 손님에게 보여 줄 것만 골라 냅니다 (내부 메모 · 연락처 · 링크열쇠 제외) */
function 손님용(b) {
  const 완납 = 다냄(b);
  return {
    code: b.code, surname: b.surname, people: b.people,
    start: b.start, end: b.end, product: b.product, productUrl: b.productUrl,
    status: b.status, 단계: 단계, notice: b.notice,
    days: b.days || [],
    pay: (b.pay || []).map(function (p) { return { label: p.label, amount: p.amount, cur: p.cur, due: p.due, paid: p.paid }; }),
    docs: (b.docs || []).filter(function (d) { return d.show !== 'hidden'; }).map(function (d) {
      const 열림 = d.show === 'public' || (d.show === 'paid' && 완납);
      return { id: 열림 ? d.id : '', name: d.name, size: d.size, open: 열림, why: 열림 ? '' : '잔금 확인 후 열립니다' };
    }),
    msgs: (b.msgs || []).slice(-100).map(function (m) { return { from: m.from, text: m.text, at: m.at }; }),
  };
}

async function sendMail(제목, 문자, 답장) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const 본문 = {
    from: process.env.NOTIFY_FROM || 'Euforia 알림 <onboarding@resend.dev>',
    to: [process.env.NOTIFY_EMAIL || 'euforia@euforiatour.com'],
    subject: 제목,
    text: 문자 + '\n\n---\n대쉬보드 「예약 관리」에서 답장하기: ' + SITE + '/admin.html',
  };
  if (답장 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(답장)) 본문.reply_to = 답장;
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json' },
      body: JSON.stringify(본문),
    });
    return r.ok;
  } catch (e) {
    console.error('[예약] 메일 실패:', e.message);
    return false;
  }
}

function 파일답(buf, d) {
  const 이름 = encodeURIComponent(d.name || 'file');
  return {
    statusCode: 200,
    headers: {
      'Content-Type': d.type || 'application/octet-stream',
      'Content-Disposition': "attachment; filename*=UTF-8''" + 이름,
      'Cache-Control': 'private, no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
    body: Buffer.from(buf).toString('base64'),
    isBase64Encoded: true,
  };
}

/* ---------------------------------------------------------- 손님 쪽 */
async function 손님(event, body, q, s) {
  const action = String(body.action || q.action || 'view');
  const t = String(body.t || q.t || '').trim();
  if (!/^[A-Za-z0-9_-]{20,40}$/.test(t)) return json(404, { error: '예약을 찾을 수 없습니다. 받으신 링크를 다시 확인해 주세요.' });

  const code = await s.db.get('link/' + t, { type: 'text' });
  const b = code ? await s.db.get('b/' + code, { type: 'json' }) : null;
  if (!b || b.link !== t) return json(404, { error: '예약을 찾을 수 없습니다. 받으신 링크를 다시 확인해 주세요.' });
  const 닫힘 = 닫혔나(b);
  if (닫힘) return json(403, { error: 닫힘 });

  if (action === 'view') {
    /* 마지막으로 연 시각 — 10분에 한 번만 적습니다 */
    if (!b.lastSeen || Date.now() - Date.parse(b.lastSeen) > 600000) {
      b.lastSeen = 지금();
      try { await s.db.setJSON('b/' + b.code, b); } catch (e) { /* 보기에는 지장 없음 */ }
    }
    return json(200, { ok: true, booking: 손님용(b), contact: { phone: '+34 611 209 095', kakao: 'losnuevos', email: 'euforia@euforiatour.com' } });
  }

  if (action === 'msg') {
    const text = 글(body.text, 1000).trim();
    if (!text) return json(400, { error: '메시지를 적어 주세요.' });
    const d = 오늘();
    b.msgDay = b.msgDay && b.msgDay.d === d ? b.msgDay : { d: d, n: 0 };
    if (b.msgDay.n >= 하루메시지) return json(429, { error: '오늘은 메시지를 더 남길 수 없습니다. 급한 일은 전화나 카카오톡으로 연락해 주세요.' });
    b.msgDay.n++;
    b.msgs = (b.msgs || []).concat([{ from: 'guest', text: text, at: 지금() }]).slice(-300);
    b.unread = (b.unread || 0) + 1;
    b.updated = 지금();
    await s.db.setJSON('b/' + b.code, b);
    const mailed = await sendMail(
      '[예약 메시지] ' + b.code + ' · ' + (b.surname || '') + ' 님',
      '예약 ' + b.code + ' (' + (b.surname || '') + ' 님 · ' + (b.product || '') + ' · ' + (b.start || '') + ')\n손님이 메시지를 남겼습니다.\n\n' + text,
      b.email
    );
    return json(200, { ok: true, mailed: mailed, msgs: 손님용(b).msgs });
  }

  if (action === 'file') {
    const id = String(q.id || body.id || '');
    const d = (b.docs || []).find(function (x) { return x.id === id; });
    const 열림 = d && (d.show === 'public' || (d.show === 'paid' && 다냄(b)));
    if (!열림) return json(404, { error: '서류를 찾을 수 없습니다.' });
    const buf = await s.files.get(b.code + '/' + d.id, { type: 'arrayBuffer' });
    if (!buf) return json(404, { error: '서류를 찾을 수 없습니다.' });
    return 파일답(buf, d);
  }

  return json(400, { error: '알 수 없는 요청입니다.' });
}

/* ---------------------------------------------------------- 관리자 쪽 */
async function 관리자(event, body, q, s) {
  const action = String(body.action || q.action || 'list');
  const code = String(body.code || q.code || '').toUpperCase();
  const 읽기 = async function () {
    if (!/^EU-\d{4}-[A-Z0-9]{4}$/.test(code)) throw Object.assign(new Error('예약코드가 올바르지 않습니다'), { status: 400 });
    const b = await s.db.get('b/' + code, { type: 'json' });
    if (!b) throw Object.assign(new Error('예약을 찾지 못했습니다'), { status: 404 });
    return b;
  };
  const 링크 = function (b) { return b.link ? SITE + '/my/' + b.link : ''; };

  if (action === 'list') {
    const out = [];
    const { blobs } = await s.db.list({ prefix: 'b/' });
    for (const x of blobs) {
      const b = await s.db.get(x.key, { type: 'json' });
      if (b) out.push(요약(b));
    }
    out.sort(function (a, c) { return String(c.start || '').localeCompare(String(a.start || '')) || String(c.updated).localeCompare(String(a.updated)); });
    return json(200, { ok: true, items: out, unread: out.reduce(function (n, b) { return n + (b.unread || 0); }, 0) });
  }

  if (action === 'save') {
    const 들어옴 = body.booking || {};
    let 예전 = null;
    if (들어옴.code) {
      예전 = await s.db.get('b/' + String(들어옴.code).toUpperCase(), { type: 'json' });
      if (!예전) return json(404, { error: '예약을 찾지 못했습니다' });
    }
    const b = 다듬기(들어옴, 예전);
    if (!b.surname) return json(400, { error: '대표자 영문 성을 넣어 주세요' });
    if (!b.code) b.code = await 새코드(s.db, b.start);
    if (!b.link) {
      b.link = 링크열쇠();
      await s.db.set('link/' + b.link, b.code);
    }
    await s.db.setJSON('b/' + b.code, b);
    return json(200, { ok: true, booking: b, url: 링크(b) });
  }

  if (action === 'get') {
    const b = await 읽기();
    return json(200, { ok: true, booking: b, url: 링크(b), 닫힘: 닫혔나(b) });
  }

  if (action === 'read') {
    const b = await 읽기();
    b.unread = 0;
    await s.db.setJSON('b/' + b.code, b);
    return json(200, { ok: true });
  }

  if (action === 'relink') {
    const b = await 읽기();
    if (b.link) { try { await s.db.delete('link/' + b.link); } catch (e) { /* 없어도 됨 */ } }
    b.link = 링크열쇠();
    await s.db.set('link/' + b.link, b.code);
    b.updated = 지금();
    await s.db.setJSON('b/' + b.code, b);
    return json(200, { ok: true, booking: b, url: 링크(b) });
  }

  if (action === 'lock') {
    const b = await 읽기();
    b.locked = !!body.locked;
    b.updated = 지금();
    await s.db.setJSON('b/' + b.code, b);
    return json(200, { ok: true, booking: b, url: 링크(b), 닫힘: 닫혔나(b) });
  }

  if (action === 'reply') {
    const b = await 읽기();
    const text = 글(body.text, 2000).trim();
    if (!text) return json(400, { error: '답장을 적어 주세요' });
    b.msgs = (b.msgs || []).concat([{ from: 'office', text: text, at: 지금() }]).slice(-300);
    b.unread = 0;
    b.updated = 지금();
    await s.db.setJSON('b/' + b.code, b);
    return json(200, { ok: true, booking: b });
  }

  if (action === 'upload') {
    const b = await 읽기();
    const name = 글(body.name, 120).replace(/[\\/:*?"<>|]/g, '_').trim() || 'file';
    const type = /^[\w.+-]+\/[\w.+-]+$/.test(String(body.type || '')) ? String(body.type) : 'application/octet-stream';
    const buf = Buffer.from(String(body.data || ''), 'base64');
    if (!buf.length) return json(400, { error: '파일이 비어 있습니다' });
    if (buf.length > 서류최대) return json(400, { error: '파일이 너무 큽니다 (4MB 까지)' });
    const id = 무작위(10).toLowerCase();
    await s.files.set(b.code + '/' + id, buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.length));
    const show = ['public', 'paid', 'hidden'].indexOf(body.show) >= 0 ? body.show : 'public';
    b.docs = (b.docs || []).concat([{ id: id, name: name, type: type, size: buf.length, show: show, at: 지금() }]);
    b.updated = 지금();
    await s.db.setJSON('b/' + b.code, b);
    return json(200, { ok: true, booking: b });
  }

  if (action === 'docShow') {
    const b = await 읽기();
    const d = (b.docs || []).find(function (x) { return x.id === body.id; });
    if (!d) return json(404, { error: '서류를 찾지 못했습니다' });
    d.show = ['public', 'paid', 'hidden'].indexOf(body.show) >= 0 ? body.show : d.show;
    b.updated = 지금();
    await s.db.setJSON('b/' + b.code, b);
    return json(200, { ok: true, booking: b });
  }

  if (action === 'docDel') {
    const b = await 읽기();
    const d = (b.docs || []).find(function (x) { return x.id === body.id; });
    if (!d) return json(404, { error: '서류를 찾지 못했습니다' });
    try { await s.files.delete(b.code + '/' + d.id); } catch (e) { /* 파일이 먼저 없어졌어도 목록은 정리 */ }
    b.docs = b.docs.filter(function (x) { return x !== d; });
    b.updated = 지금();
    await s.db.setJSON('b/' + b.code, b);
    return json(200, { ok: true, booking: b });
  }

  if (action === 'file') {
    const b = await 읽기();
    const d = (b.docs || []).find(function (x) { return x.id === (body.id || q.id); });
    if (!d) return json(404, { error: '서류를 찾지 못했습니다' });
    const buf = await s.files.get(b.code + '/' + d.id, { type: 'arrayBuffer' });
    if (!buf) return json(404, { error: '서류 파일이 없습니다' });
    return 파일답(buf, d);
  }

  if (action === 'delete') {
    const b = await 읽기();
    for (const d of (b.docs || [])) { try { await s.files.delete(b.code + '/' + d.id); } catch (e) { /* 계속 */ } }
    if (b.link) { try { await s.db.delete('link/' + b.link); } catch (e) { /* 계속 */ } }
    await s.db.delete('b/' + b.code);
    return json(200, { ok: true });
  }

  return json(400, { error: '알 수 없는 요청입니다' });
}

exports.handler = async function (event) {
  event = event || {};
  let body = {};
  try { body = JSON.parse(event.body || '{}'); } catch (e) { body = {}; }
  const q = event.queryStringParameters || {};

  let s;
  try { s = stores(event); }
  catch (e) { return json(500, { error: '저장소를 열지 못했습니다', detail: e.message }); }

  try {
    if (body.t || q.t) return await 손님(event, body, q, s);
    if (!checkToken(body.token || q.token)) return json(401, { error: '로그인이 필요합니다' });
    return await 관리자(event, body, q, s);
  } catch (e) {
    console.error('[예약]', e && e.stack || e);
    return json(e.status || 500, { error: e.message || '처리하지 못했습니다' });
  }
};
