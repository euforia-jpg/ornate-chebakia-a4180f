/*
  ===========================================================
  입금확인 요청 접수 (손님 → 저장소 + 사장님 카카오톡)
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
const KIND  = 'deposit';
const SITE  = 'https://toureplus.co.kr';

function openStore(event) {
  /*
    event.blobs 안에는 "이번 요청에만 쓰는 열쇠" 가 들어 있습니다.

    예전에는 process.env.NETLIFY_BLOBS_CONTEXT 가 이미 차 있으면 건너뛰었습니다.
    그런데 함수가 살아 있는 채로 다음 손님을 받으면(웜 스타트)
    지난 요청의 열쇠가 그대로 남아 있습니다. 그 열쇠는 곧 만료되고,
    그때부터 "Failed to decode token: Token expired" 가 납니다.

    그래서 요청마다 새 열쇠로 갈아 끼웁니다.
  */
  try {
    if (event && event.blobs) connectLambda(event);
  } catch (e) { /* 새 방식 함수나 지역 시험에는 event.blobs 가 없습니다 */ }
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

/* ═══════════════════════════════════════════════════════════
   카카오 토큰 자동 갱신
   -----------------------------------------------------------
   이 덩어리는 네 파일에 똑같이 들어 있습니다.
     send-inquiry.js · send-deposit.js · send-matchday-booking.js · inbox.js
   하나를 고치면 넷 다 똑같이 고쳐 주세요.

   왜 필요한가요?
     카카오 리프레시 토큰은 길어야 60일이면 끝납니다.
     그런데 남은 기간이 한 달이 안 될 때 갱신하면, 카카오가
     "새 리프레시 토큰" 을 같이 내줍니다. 그걸 받아서 저장해 두면
     토큰이 계속 새것으로 이어져 다시 연결할 일이 없어집니다.

     예전에는 새 토큰이 와도 버리고, 늘 Netlify 환경변수의
     옛 토큰만 썼습니다. 그래서 60일마다 손으로 다시 이어야 했습니다.

   어디에 두나요?
     Netlify 저장소(Blobs) "euforia-kakao" 창고, "refresh-token" 칸.
     환경변수 KAKAO_REFRESH_TOKEN 은 그대로 두고, 처음 한 번 쓰는 씨앗으로만 씁니다.

   사장님이 다시 연결해서 환경변수를 바꾸셨다면?
     저장해 둔 토큰 옆에 "어떤 환경변수에서 시작했는지" 지문을 같이 적어 둡니다.
     환경변수가 바뀌면 지문이 달라지므로, 그때는 새 환경변수를 먼저 씁니다.
     (지문은 토큰을 거꾸로 알아낼 수 없는 짧은 요약값입니다)

   저장소가 안 열리면?
     예전처럼 환경변수 토큰으로만 보냅니다. 나빠지는 일은 없습니다.
   ═══════════════════════════════════════════════════════════ */
const 카카오창고 = 'euforia-kakao';
const 카카오칸   = 'refresh-token';

function 카카오지문(s) {
  return require('crypto').createHash('sha256').update(String(s || '')).digest('hex').slice(0, 16);
}

async function 카카오저장본() {
  try {
    const 창고 = getStore({ name: 카카오창고 });
    const 값 = await 창고.get(카카오칸, { type: 'json' });
    return { 창고: 창고, 값: (값 && 값.token) ? 값 : null };
  } catch (e) {
    return { 창고: null, 값: null };
  }
}

async function 카카오저장(창고, 토큰, 환경지문) {
  if (!창고 || !토큰) return false;
  try {
    await 창고.setJSON(카카오칸, { token: 토큰, 환경지문: 환경지문, 바뀐때: new Date().toISOString() });
    return true;
  } catch (e) {
    console.error('[카카오] 새 토큰 저장 실패:', e.message);
    return false;
  }
}

async function 카카오갱신요청(리프레시) {
  const res = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: process.env.KAKAO_REST_API_KEY || '',
      client_secret: process.env.KAKAO_CLIENT_SECRET || '',
      refresh_token: 리프레시,
    }),
  });
  try { return await res.json(); } catch (e) { return { error: 'HTTP ' + res.status }; }
}

/*
  돌려주는 값 { access, 새토큰, 저장됨, 쓴것 }
  안 되면 Error 를 던집니다. 메시지에 [KOE322] 같은 카카오 오류 번호가 들어 있습니다.
  (토큰 값은 어디에도 찍지 않습니다)
*/
async function 카카오접근() {
  const 환경 = process.env.KAKAO_REFRESH_TOKEN || '';
  const 환경지문 = 환경 ? 카카오지문(환경) : '';
  const 저장 = await 카카오저장본();
  const 저장토큰 = 저장.값 ? 저장.값.token : '';
  const 다시연결함 = !!(저장.값 && 환경 && 저장.값.환경지문 !== 환경지문);

  /* 고를 순서: 평소엔 저장본 → 환경변수. 다시 연결하셨으면 환경변수 → 저장본 */
  const 후보 = [];
  function 넣기(어디, 토큰) {
    if (토큰 && !후보.some(function (h) { return h[1] === 토큰; })) 후보.push([어디, 토큰]);
  }
  if (다시연결함) { 넣기('환경변수', 환경); 넣기('저장본', 저장토큰); }
  else            { 넣기('저장본', 저장토큰); 넣기('환경변수', 환경); }

  if (!후보.length) {
    throw new Error('카카오 토큰 갱신 실패 [설정 없음]: KAKAO_REFRESH_TOKEN 이 비어 있습니다');
  }

  let 마지막 = null;
  for (let i = 0; i < 후보.length; i++) {
    const 어디 = 후보[i][0], 토큰 = 후보[i][1];
    const data = await 카카오갱신요청(토큰);
    if (data && data.access_token) {
      const 새것 = data.refresh_token || '';
      let 저장됨 = false;
      if (새것) {
        저장됨 = await 카카오저장(저장.창고, 새것, 환경지문);              /* 새 토큰이 왔으면 바로 갈아 끼웁니다 */
      } else if (!저장.값 || 저장토큰 !== 토큰 || 저장.값.환경지문 !== 환경지문) {
        저장됨 = await 카카오저장(저장.창고, 토큰, 환경지문);              /* 처음이거나 다시 연결한 직후 */
      }
      return { access: data.access_token, 새토큰: !!새것, 저장됨: 저장됨, 쓴것: 어디 };
    }
    마지막 = data || {};
  }

  /* KOE322 = 리프레시 토큰 만료 */
  const code = (마지막 && 마지막.error_code) ? ' [' + 마지막.error_code + ']' : '';
  throw new Error('카카오 토큰 갱신 실패' + code + ': ' +
                  ((마지막 && (마지막.error_description || 마지막.error)) || ''));
}

async function getAccessToken() {
  return (await 카카오접근()).access;
}
/* ═══ 카카오 토큰 자동 갱신 — 여기까지 ═══ */

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
    입금자명: b.depositor || '', 예약번호: b.refNo || '',
    금액: b.amount || '', 입금일: b.depositDate || '',
    연락처: b.contactPhone || '', 남긴말: b.note || '',
  };
  const 요약 = (내용.입금자명 || '이름 없음') + ' · ' + (내용.금액 || '금액 미기재');

  const 문자 = [
    '💰 새 입금확인 요청이 도착했어요',
    '',
    '입금자명: ' + (내용.입금자명 || '-'),
    '예약번호: ' + (내용.예약번호 || '-'),
    '금액: ' + (내용.금액 || '-'),
    '입금일: ' + (내용.입금일 || '-'),
    '연락처: ' + (내용.연락처 || '-'),
    '남긴 말: ' + (내용.남긴말 || '-'),
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
    console.error('[deposit] 저장 실패:', savedWhy);
  }

  /* ---------- 2. 그다음 카카오 ---------- */
  let notified = false, kakaoWhy = '';
  try {
    await sendKakao(문자);
    notified = true;
  } catch (e) {
    kakaoWhy = (e && e.message) || String(e);
    console.error('[deposit] 카카오 실패:', kakaoWhy);
  }

  /* ---------- 3. 메일도 한 통 ---------- */
  let mailed = false, mailWhy = '', mailOff = false;
  try {
    await sendMail('[유포리아 ' + (종류이름[KIND] || KIND) + '] ' + 요약, 문자, '');
    mailed = true;
  } catch (e) {
    mailWhy = (e && e.message) || String(e);
    mailOff = !!(e && e.skip);
    if (!mailOff) console.error('[deposit] 메일 실패:', mailWhy);
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
