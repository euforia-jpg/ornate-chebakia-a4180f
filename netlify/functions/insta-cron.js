/*
  인스타그램 자동 게시 — 시간 맞춰 깨우는 역할만 합니다 (쓰레드 threads-cron 과 같은 구조)
  매시 정각에 깨어나지만, 설정한 시각(data/insta-auto.json 의 hour, 마드리드)이 아니면
  insta-auto 가 아무것도 하지 않고 돌아갑니다.
*/
exports.handler = async function (event) {
  let target;
  try { target = require('./insta-auto.js'); }
  catch (e) { console.error('insta-auto.js 를 찾지 못했습니다:', e.message); return { statusCode: 200, body: 'insta-auto 없음' }; }
  try {
    const r = await target.handler({ __internal: true, queryStringParameters: {}, blobs: event && event.blobs, headers: event && event.headers });
    console.log('[인스타 자동] ' + (r && r.body));
    return { statusCode: 200, body: (r && r.body) || 'ok' };
  } catch (e) {
    console.error('[인스타 자동] 예외:', e.message);
    return { statusCode: 200, body: 'error: ' + e.message };
  }
};
