/*
  ===========================================================
  경기 일정 "지금 갱신하기" — 수동 실행용 창구
  -----------------------------------------------------------
  왜 이 파일이 따로 필요한가요?

    update-matches 는 netlify.toml 에서 예약(schedule) 함수로
    등록되어 있습니다. Netlify 는 예약 함수를 주소로 직접 부르면
    무조건 403 으로 막습니다. 정해진 시각에만 돌게 하려는 규칙이에요.

    그래서 갱신 코드를 복사하지 않고, 예약 함수의 handler 를
    그대로 불러다 실행하는 얇은 창구를 하나 둡니다.
    갱신 로직은 여전히 update-matches.js 한 곳에만 있습니다.

  아무나 부르지 못하도록 대쉬보드 로그인 토큰을 확인합니다.
  (admin-api 가 발급한 것과 같은 방식 — ADMIN_SECRET 공유)
  ===========================================================
*/

const crypto = require('crypto');

function json(status, body) {
  return {
    statusCode: status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
    body: JSON.stringify(body),
  };
}

function checkToken(token) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || !token || token.indexOf('.') === -1) return false;
  const [exp, sig] = token.split('.');
  if (!/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;
  const want = crypto.createHmac('sha256', secret).update(exp).digest('hex');
  if (want.length !== sig.length) return false;
  return crypto.timingSafeEqual(Buffer.from(want), Buffer.from(sig));
}

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') return json(405, { error: 'POST 만 받습니다' });

  let req;
  try { req = JSON.parse(event.body || '{}'); }
  catch (e) { return json(400, { error: '요청 형식이 올바르지 않습니다' }); }

  if (!checkToken(req.token)) {
    return json(401, { error: '로그인이 만료되었습니다. 다시 로그인해 주세요.' });
  }

  let target;
  try {
    target = require('./update-matches.js');
  } catch (e) {
    return json(500, {
      error: '갱신 함수를 찾지 못했습니다',
      detail: 'netlify/functions/update-matches.js 가 저장소에 있는지 확인해 주세요. (' + e.message + ')',
    });
  }

  if (!target || typeof target.handler !== 'function') {
    return json(500, { error: 'update-matches.js 에 handler 가 없습니다' });
  }

  try {
    /* 예약 함수의 handler 를 그대로 실행합니다 */
    const res = await target.handler({ httpMethod: 'POST', body: '{}' }, {});
    const status = (res && res.statusCode) || 500;
    let body = (res && res.body) || '';

    /* 성공했는데 본문이 비어 있으면 대쉬보드가 보여 줄 말을 채워 줍니다 */
    if (status >= 200 && status < 300 && !body) {
      body = JSON.stringify({ ok: true, message: '경기 일정을 갱신했습니다.' });
    }

    return {
      statusCode: status,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
      body: body,
    };
  } catch (e) {
    return json(500, { error: '갱신 중 오류가 발생했습니다', detail: String(e && e.message || e) });
  }
};
