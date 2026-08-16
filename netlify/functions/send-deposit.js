/* ============================================================
   입금 확인 요청을 사장님 카카오톡("나에게 보내기")으로 전송하는 함수
   - 카카오 인증은 send-inquiry.js와 동일한 환경변수를 재사용해요
============================================================ */
async function getAccessToken() {
  const res = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: process.env.KAKAO_REST_API_KEY,
      client_secret: process.env.KAKAO_CLIENT_SECRET,
      refresh_token: process.env.KAKAO_REFRESH_TOKEN
    })
  });
  const data = await res.json();
  if (!data.access_token) throw new Error('토큰 갱신 실패: ' + JSON.stringify(data));
  return data.access_token;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const payload = JSON.parse(event.body || '{}');
    const { depositor, refNo, amount, depositDate, contactPhone, note } = payload;

    const text = [
      '💰 새 입금확인 요청이 도착했어요',
      '',
      `입금자명: ${depositor || '-'}`,
      `예약번호: ${refNo || '-'}`,
      `입금액: ${amount || '-'}`,
      `입금일: ${depositDate || '-'}`,
      `연락처: ${contactPhone || '-'}`,
      `메모: ${note || '-'}`
    ].join('\n');

    const accessToken = await getAccessToken();

    const sendRes = await fetch('https://kapi.kakao.com/v2/api/talk/memo/default/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      body: new URLSearchParams({
        template_object: JSON.stringify({
          object_type: 'text',
          text: text,
          link: {
            web_url: 'https://ornate-chebakia-a4180f.netlify.app',
            mobile_web_url: 'https://ornate-chebakia-a4180f.netlify.app'
          }
        })
      })
    });

    const sendData = await sendRes.json();
    if (sendData.result_code !== 0) {
      console.error('Kakao send failed', sendData);
      return { statusCode: 500, body: JSON.stringify({ ok: false, error: sendData }) };
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: err.message }) };
  }
};
