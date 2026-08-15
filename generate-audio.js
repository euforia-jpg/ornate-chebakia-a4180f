/* ============================================================
   오디오 가이드 음성 생성 함수
   - 구글 클라우드 TTS로 텍스트를 mp3 음성으로 변환해요
   - 기본 음성: ko-KR-Chirp3-HD-Aoede (밝고 자연스러운 여성 음성)
============================================================ */

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ success:false, error:'Method Not Allowed' }) };
  }

  try {
    const { text, voiceName } = JSON.parse(event.body || '{}');
    if (!text) {
      return { statusCode: 400, body: JSON.stringify({ success:false, error:'텍스트가 없어요.' }) };
    }

    const apiKey = process.env.GOOGLE_TTS_API_KEY;
    const voice = voiceName || 'ko-KR-Chirp3-HD-Aoede';

    const res = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: { text },
        voice: { languageCode: 'ko-KR', name: voice },
        audioConfig: { audioEncoding: 'MP3', speakingRate: 1.0, pitch: 0.0 }
      })
    });

    const json = await res.json();
    if (!res.ok) {
      const msg = json.error ? json.error.message : '알 수 없는 오류';
      return { statusCode: 500, body: JSON.stringify({ success:false, error:`TTS API 오류: ${msg}` }) };
    }

    // audioContent는 base64로 인코딩된 mp3 데이터예요
    return { statusCode: 200, body: JSON.stringify({ success:true, audioContent: json.audioContent }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ success:false, error: err.message }) };
  }
};
