// 카카오 로그인 1회 인증 후, 리프레시 토큰을 화면에 보여주는 함수예요.
// 최초 설정 때 딱 한 번만 쓰고, 이후엔 다시 쓸 일 없어요.
exports.handler = async (event) => {
  const code = event.queryStringParameters && event.queryStringParameters.code;

  if (!code) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
      body: '<p>인가 코드(code)가 없어요. 카카오 로그인 인증 링크를 통해 다시 접속해주세요.</p>'
    };
  }

  const REST_API_KEY = process.env.KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;

  try {
    const res = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code: code
      })
    });
    const data = await res.json();

    if (!data.refresh_token) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
        body: `<pre>토큰 발급 실패:\n${JSON.stringify(data, null, 2)}</pre>`
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
      body: `
        <div style="font-family:sans-serif; padding:40px; max-width:600px; margin:0 auto; line-height:1.6;">
          <h2>✅ 인증 성공!</h2>
          <p>아래 값을 복사해서 Netlify 환경변수 <b>KAKAO_REFRESH_TOKEN</b> 에 붙여넣으세요.</p>
          <textarea style="width:100%; height:100px; font-size:14px; padding:10px;" readonly onclick="this.select()">${data.refresh_token}</textarea>
          <p style="color:#888; font-size:13px;">복사하신 후에는 이 탭을 닫으셔도 돼요. 이 화면을 다른 사람에게 공유하지 마세요.</p>
        </div>
      `
    };
  } catch (err) {
    return { statusCode: 500, body: '에러: ' + err.message };
  }
};
