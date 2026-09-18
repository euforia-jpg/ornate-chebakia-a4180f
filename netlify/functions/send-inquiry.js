/*
  ===========================================================
  예약문의 접수 (손님 → 저장소 + 사장님 카카오톡)
  -----------------------------------------------------------
  ★ 순서가 중요합니다 ★

      1. 받은 내용을 Netlify 저장소에 먼저 남깁니다
      2. 그다음에 카카오톡 "나에게 보내기" 를 시도합니다
      3. 메일 알림을 켜 두셨으면 메일도 한 통 보냅니다

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
    mailed    메일까지 갔나
    reason    안 된 쪽의 이유

  둘 다 실패했을 때만 500 을 돌려줍니다.
  그때는 손님 화면에 "직접 연락 주세요" 안내가 뜹니다.
  ===========================================================
*/

const { connectLambda, getStore } = require('@netlify/blobs');

const STORE = 'euforia-inbox';
const KIND  = 'inquiry';
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

/* -----------------------------------------------------------
   메일 알림

   Resend 라는 메일 발송 서비스로 사장님 메일함에 한 통 보냅니다.
   카카오톡이 막혀 있어도 메일은 따로 가기 때문에,
   두 길 중 하나만 살아 있어도 놓치지 않습니다.

   RESEND_API_KEY 를 넣지 않으셨으면 아무 일도 하지 않고
   조용히 넘어갑니다. 메일을 안 쓰셔도 접수는 그대로 됩니다.
   ----------------------------------------------------------- */
const 종류이름 = { inquiry: '예약문의', deposit: '입금확인', matchday: '경기예약' };

async function sendMail(제목, 문자, 답장받을곳) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    const e = new Error('메일 알림이 아직 꺼져 있습니다');
    e.skip = true;                     /* 설정 안 하신 것이라 "실패" 로 세지 않습니다 */
    throw e;
  }
  const to   = process.env.NOTIFY_EMAIL || 'euforia@euforiatour.com';
  const from = process.env.NOTIFY_FROM  || 'Euforia 알림 <onboarding@resend.dev>';

  const 본문 = {
    from: from,
    to: [to],
    subject: 제목,
    text: 문자 + '\n\n---\n대쉬보드에서 보기: ' + SITE + '/admin.html',
  };
  /* 손님 메일 주소를 알면 "답장" 만 눌러도 바로 손님에게 가도록 해 둡니다 */
  if (답장받을곳 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(답장받을곳))) {
    본문.reply_to = String(답장받을곳);
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json' },
    body: JSON.stringify(본문),
  });
  let data = {};
  try { data = await res.json(); } catch (e) { data = {}; }
  if (!res.ok || !data.id) {
    const why = (data && (data.message || data.name)) || JSON.stringify(data);
    throw new Error('메일 전송 실패 (' + res.status + '): ' + String(why).slice(0, 200));
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

  const 내용 = {
    이름: b.name || '', 연락처: b.phone || '', 이메일: b.email || '',
    관심상품: b.interest || '', 인원: b.people || '',
    희망일: b.date || '', 메시지: b.message || '',
  };
  const 요약 = (내용.이름 || '이름 없음') + ' · ' + (내용.관심상품 || '상품 미지정');

  const 문자 = [
    '📩 새 예약문의가 도착했어요',
    '',
    '이름: ' + (내용.이름 || '-'),
    '연락처: ' + (내용.연락처 || '-'),
    '이메일: ' + (내용.이메일 || '-'),
    '관심 상품: ' + (내용.관심상품 || '-'),
    '인원: ' + (내용.인원 || '-'),
    '희망일: ' + (내용.희망일 || '-'),
    '메시지: ' + (내용.메시지 || '-'),
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
    console.error('[inquiry] 저장 실패:', savedWhy);
  }

  /* ---------- 2. 그다음 카카오 ---------- */
  let notified = false, kakaoWhy = '';
  try {
    await sendKakao(문자);
    notified = true;
  } catch (e) {
    kakaoWhy = (e && e.message) || String(e);
    console.error('[inquiry] 카카오 실패:', kakaoWhy);
  }

  /* ---------- 3. 메일도 한 통 ---------- */
  let mailed = false, mailWhy = '', mailOff = false;
  try {
    await sendMail('[유포리아 ' + (종류이름[KIND] || KIND) + '] ' + 요약, 문자, 내용.이메일);
    mailed = true;
  } catch (e) {
    mailWhy = (e && e.message) || String(e);
    mailOff = !!(e && e.skip);
    if (!mailOff) console.error('[inquiry] 메일 실패:', mailWhy);
  }

  /* 어디까지 갔는지 적어 둡니다 (대쉬보드에서 구분해 보시라고) */
  if (saved && (notified || mailed)) {
    try {
      row.sent = notified;
      row.mail = mailed;
      await keep(store, key, row);
    } catch (e) { /* 표시만 못 한 것이라 넘어갑니다 */ }
  }

  if (!saved && !notified && !mailed) {
    return json(500, { ok: false, saved: false, notified: false, mailed: false,
                       reason: savedWhy || kakaoWhy || mailWhy });
  }

  return json(200, {
    ok: true, saved: saved, notified: notified, mailed: mailed,
    reason: (notified || mailed) ? '' : kakaoWhy,
  });
};
