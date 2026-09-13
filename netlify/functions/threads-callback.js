/*
  ===========================================================
  쓰레드 제거 · 삭제 콜백 — 메타가 요구하는 필수 창구
  -----------------------------------------------------------
  메타는 앱에 리디렉션 URL 을 넣으려면 아래 두 가지도 함께
  등록하도록 요구합니다. 비워 두면 설정이 저장되지 않습니다.

    제거 콜백  누군가 우리 앱 연결을 끊었을 때 메타가 알려 줍니다
    삭제 콜백  누군가 자기 데이터를 지워 달라고 요청했을 때입니다

  우리는 쓰레드에서 받아 온 데이터를 저장하지 않습니다.
  (발행 이력도 쓰레드에서 그때그때 읽어 옵니다.)
  그래서 지울 것이 없고, 확인만 돌려주면 됩니다.

  _redirects 로 아래 두 주소에 연결됩니다.
    /threads-uninstall   제거 콜백
    /threads-delete      삭제 콜백
  ===========================================================
*/

const crypto = require('crypto');

/* 메타가 요구하는 응답 형식: 확인 코드와 진행 상황을 볼 주소 */
function deletionResponse(host, proto) {
  const code = crypto.randomBytes(8).toString('hex');
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
    body: JSON.stringify({
      url: proto + '://' + host + '/threads-delete?code=' + code,
      confirmation_code: code,
    }),
  };
}

exports.handler = async function (event) {
  const path = String(event.path || '');
  const q = event.queryStringParameters || {};
  const proto = (event.headers && event.headers['x-forwarded-proto']) || 'https';
  const host = (event.headers && (event.headers['x-forwarded-host'] || event.headers.host)) || '';
  const isDelete = /delete/.test(path);

  /* 사람이 확인 코드를 들고 들어온 경우 — 처리 결과를 보여 줍니다 */
  if (isDelete && event.httpMethod === 'GET' && q.code) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
      body: '<!doctype html><meta charset="utf-8"><title>데이터 삭제 확인</title>' +
        '<div style="font:15px/1.7 -apple-system,BlinkMacSystemFont,\'Noto Sans KR\',sans-serif;' +
        'max-width:560px;margin:60px auto;padding:0 20px;color:#1a1f36">' +
        '<h1 style="font-size:20px">데이터 삭제 요청이 처리되었습니다</h1>' +
        '<p>유포리아투어는 쓰레드에서 받아 온 개인 데이터를 <b>따로 저장하지 않습니다.</b> ' +
        '글 발행에 필요한 정보만 그때그때 쓰레드에서 읽어 오고, 요청이 끝나면 남기지 않습니다.</p>' +
        '<p>그래서 삭제할 자료가 없으며, 이 요청은 즉시 완료 처리되었습니다.</p>' +
        '<p style="color:#6b7280;font-size:13.5px">확인 코드: ' +
        String(q.code).replace(/[^a-f0-9]/gi, '').slice(0, 32) + '</p>' +
        '<p style="color:#6b7280;font-size:13.5px">문의: euforia@euforiatour.com</p></div>',
    };
  }

  if (isDelete) return deletionResponse(host, proto);

  /* 제거 콜백 — 받았다는 것만 알려 주면 됩니다 */
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
    body: JSON.stringify({ ok: true }),
  };
};
