/*
  ===========================================================
  쓰레드 자동 광고 — 시간 맞춰 깨우는 역할만 합니다
  -----------------------------------------------------------
  netlify.toml 에 이 함수만 예약(schedule)으로 걸어 둡니다.

  왜 함수를 둘로 나눴나요?
    Netlify 는 예약 함수를 주소로 직접 부르면 403 으로 막습니다.
    그래서 예약은 이 얇은 파일이 맡고, 실제 일은 threads-auto.js 가 합니다.
    그러면 대쉬보드에서 "지금 시험해 보기" 로 같은 코드를 부를 수 있어요.

  매시 정각에 깨어나지만, 설정한 요일·시각이 아니면
  threads-auto 가 아무것도 하지 않고 돌아갑니다.
  ===========================================================
*/

exports.handler = async function () {
  let target;
  try {
    target = require('./threads-auto.js');
  } catch (e) {
    console.error('threads-auto.js 를 찾지 못했습니다:', e.message);
    return { statusCode: 200, body: 'threads-auto 없음' };
  }

  try {
    /* __internal 을 붙여 보내면 로그인 확인을 건너뜁니다 */
    const r = await target.handler({ __internal: true, queryStringParameters: {} });
    console.log('[쓰레드 자동] ' + (r && r.body));
    return { statusCode: 200, body: (r && r.body) || 'ok' };
  } catch (e) {
    console.error('[쓰레드 자동] 예외:', e.message);
    return { statusCode: 200, body: 'error: ' + e.message };
  }
};
