/*
  ===========================================================
  라리가 티켓 예약 접수 (손님 → 저장소 + 사장님 카카오톡)
  -----------------------------------------------------------
  ★ 순서가 중요합니다 ★

      1. 받은 내용을 Netlify 저장소에 먼저 남깁니다
      2. 그다음에 카카오톡 "나에게 보내기" 를 시도합니다

  예전에는 카카오만 썼습니다. 그래서 카카오 토큰이 만료되면
  손님이 보낸 내용이 흔적도 없이 사라졌습니다.
  (게다가 화면에는 "접수되었습니다" 가 떴습니다)

  이제는 카카오가 막혀도 내용은 남습니다.
  대쉬보드 "문의함" 에서 확인하실 수 있습니다.

  -----------------------------------------------------------
  돌려주는 값

    ok        하나라도 성공했나 (손님에게 접수됐다고 말해도 되는가)
    saved     저장소에 남았나
    notified  카카오톡까지 갔나
    reason    안 된 쪽의 이유

  둘 다 실패했을 때만 500 을 돌려줍니다.
  그때는 손님 화면에 "직접 연락 주세요" 안내가 뜹니다.
  ===========================================================
*/

const { connectLambda, getStore } = require('@netlify/blobs');

const STORE = 'euforia-inbox';
const KIND  = 'matchday';
const SITE  = 'https://toureplus.co.kr';

/* 방문 통계와 같은 방식입니다. consistency 는 건드리지 않습니다 —
   옛 방식 함수에서 strong 을 쓰면 읽기·쓰기가 전부 막힙니다. */
function openStore(event) {
  if (!process.env.NETLIFY_BLOBS_CONTEXT) {
    try { connectLambda(event); } catch (e) { /* 지역에서 시험할 때 */ }
  }
  return getStore({ name: STORE });
}

function nowSeoul() {
  try {
    const f = new Intl.DateTimeFormat('sv-SE', {
      timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hour12: false,
    });
    return f.format(new Date()).replace(' ', 'T');   /* 2026-09-18T14:03 */
  } catch (e) {
    return new Date().toISOString().slice(0, 16);
  }
}

/* 저장 열쇠: 종류/날짜/시각-무작위 — 날짜순으로 줄 세우기 좋습니다 */
function makeKey(when) {
  const rand = Math.random().toString(36).slice(2, 8);
  return KIND + '/' + when.slice(0, 10) + '/' + when.slice(11).replace(':', '') +
         '-' + Date.now().toString(36) + rand;
}

async function keep(store, key, row) {
  await store.setJSON(key, row);
}

async function getAccessToken() {
  const res = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: process.env.KAKAO_REST_API_KEY,
      client_secret: process.env.KAKAO_CLIENT_SECRET,
      refresh_token: process.env.KAKAO_REFRESH_TOKEN,
    }),
  });
  const data = await res.json();
  if (!data.access_token) {
    /* KOE322 = 리프레시 토큰 만료. 60일마다 다시 연결해야 합니다 */
    const code = (data && data.error_code) ? ' [' + data.error_code + ']' : '';
    throw new Error('카카오 토큰 갱신 실패' + code + ': ' + (data.error_description || data.error || ''));
  }
  return data.access_token;
}

async function sendKakao(text) {
  const accessToken = await getAccessToken();
  const res = await fetch('https://kapi.kakao.com/v2/api/talk/memo/default/send', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    body: new URLSearchParams({
      template_object: JSON.stringify({
        object_type: 'text',
        text: String(text).slice(0, 190),
        link: { web_url: SITE, mobile_web_url: SITE },
      }),
    }),
  });
  const data = await res.json();
  if (data.result_code !== 0) {
    throw new Error('카카오 전송 실패: ' + JSON.stringify(data));
  }
}

function json(status, body) {
  return {
    statusCode: status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
    body: JSON.stringify(body),
  };
}

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let b;
  try { b = JSON.parse(event.body || '{}'); } catch (e) { b = {}; }

  const 여행자 = (b.travelers || [])
    .map(function (t) { return ((t.surname || '') + ' ' + (t.givenName || '')).trim() +
                               ' (' + (t.passportNo || '-') + ')'; })
    .join(', ');
  const 경기 = b.match || {};
  const 구역 = b.section || {};

  const 내용 = {
    예약번호: b.reference || '', 경기: 경기.label || '',
    일시: ((경기.date || '') + ' ' + (경기.time || '')).trim(),
    경기장: (경기.venue || '') + (경기.city ? ' (' + 경기.city + ')' : ''),
    구역: 구역.label || '', 인원: b.qty || '',
    총금액: b.totalPrice ? ('EUR ' + b.totalPrice) : '',
    수령방식: b.delivery === 'pickup' ? '현장 수령' : '모바일 티켓',
    여행자: 여행자,
  };
  const 요약 = (내용.경기 || '경기 미지정') + ' · ' + (내용.인원 || '?') + '명';

  const 문자 = [
    '⚽ 새 라리가 티켓 예약이 도착했어요',
    '',
    '예약번호: ' + (내용.예약번호 || '-'),
    '경기: ' + (내용.경기 || '-'),
    '일시: ' + (내용.일시 || '-'),
    '경기장: ' + (내용.경기장 || '-'),
    '구역: ' + (내용.구역 || '-'),
    '인원: ' + (내용.인원 || '-'),
    '총 금액: ' + (내용.총금액 || '-'),
    '수령 방식: ' + 내용.수령방식,
    '여행자: ' + (내용.여행자 || '-'),
  ].join('\n');

  const when = nowSeoul();
  const row = { kind: KIND, at: when, sent: false, 요약: 요약, 내용: 내용 };

  /* ---------- 1. 먼저 남깁니다 ---------- */
  let saved = false, savedWhy = '', store = null, key = '';
  try {
    store = openStore(event);
    key = makeKey(when);
    await keep(store, key, row);
    saved = true;
  } catch (e) {
    savedWhy = (e && e.message) || String(e);
    console.error('[matchday] 저장 실패:', savedWhy);
  }

  /* ---------- 2. 그다음 카카오 ---------- */
  let notified = false, kakaoWhy = '';
  try {
    await sendKakao(문자);
    notified = true;
  } catch (e) {
    kakaoWhy = (e && e.message) || String(e);
    console.error('[matchday] 카카오 실패:', kakaoWhy);
  }

  /* 카카오까지 갔으면 그 사실도 적어 둡니다 (대쉬보드에서 구분해 보시라고) */
  if (saved && notified) {
    try { row.sent = true; await keep(store, key, row); } catch (e) { /* 표시만 못 한 것이라 넘어갑니다 */ }
  }

  if (!saved && !notified) {
    return json(500, { ok: false, saved: false, notified: false,
                       reason: savedWhy || kakaoWhy });
  }

  return json(200, {
    ok: true, saved: saved, notified: notified,
    reason: notified ? '' : kakaoWhy,
  });
};
