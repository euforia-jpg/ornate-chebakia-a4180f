/*
  ===========================================================
  카카오 알림 토큰 — 매일 한 번 깨워서 이어 두기
  -----------------------------------------------------------
  netlify.toml 에 이 함수만 예약(schedule)으로 걸어 둡니다.

  왜 필요한가요?
    카카오는 리프레시 토큰을 "쓸 때" 만 새것으로 바꿔 줍니다.
    한 달 넘게 문의가 한 건도 없으면 토큰을 쓸 일이 없어서
    그대로 60일이 지나 끊길 수 있습니다.
    그래서 매일 한 번 문의함의 "카카오 확인" 을 불러 줍니다.
    확인하는 김에 새 토큰이 오면 inbox.js 가 저장소에 갈아 끼웁니다.

  왜 직접 하지 않고 문의함을 부르나요?
    저장소(Blobs) 열쇠는 주소로 들어온 요청에 확실히 붙어 옵니다.
    예약 실행에도 붙는지는 장담할 수 없어서, 확실한 길로 돌아갑니다.
    문의함은 관리자만 부를 수 있으므로, 같은 ADMIN_SECRET 으로
    5분짜리 출입증을 만들어 들고 갑니다. 출입증은 어디에도 남기지 않습니다.

  카카오에 메시지는 보내지 않습니다. 토큰만 확인합니다.
  ===========================================================
*/

const crypto = require('crypto');

exports.handler = async function () {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    console.error('[카카오 유지] ADMIN_SECRET 이 없어 건너뜁니다');
    return { statusCode: 200, body: 'ADMIN_SECRET 없음' };
  }

  /* 문의함과 똑같은 출입증 모양: 만료시각.서명 */
  const exp = String(Date.now() + 5 * 60 * 1000);
  const sig = crypto.createHmac('sha256', secret).update(exp).digest('hex');
  const base = (process.env.URL || 'https://toureplus.co.kr').replace(/\/+$/, '');

  try {
    const res = await fetch(base + '/.netlify/functions/inbox', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: exp + '.' + sig, action: 'kakao' }),
    });
    let k = {};
    try { k = await res.json(); } catch (e) { k = {}; }

    const 줄 = '[카카오 유지] ' + (k.상태 || ('HTTP ' + res.status)) +
               (k.새토큰있음 ? ' · 새 토큰 받음' : '') +
               (k.안내 ? ' · ' + k.안내 : '');
    if (k.ok) console.log(줄); else console.error(줄);
    return { statusCode: 200, body: k.상태 || String(res.status) };
  } catch (e) {
    console.error('[카카오 유지] 문의함을 부르지 못했습니다:', e.message);
    return { statusCode: 200, body: 'error: ' + e.message };
  }
};
