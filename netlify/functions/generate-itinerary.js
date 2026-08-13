/* ============================================================
   AI 여행 일정 추천 함수
   - 예전 구글 앱스 스크립트(Code.gs)의 Gemini 프롬프트 로직을
     그대로 옮겨왔어요. 구글시트 기록 기능은 뺐어요(공개 사이트라
     불특정 다수가 쓰니, 필요하면 나중에 다시 붙일 수 있어요).
============================================================ */

const GEMINI_MODEL = 'gemini-3.5-flash';

function buildPrompt(f) {
  const days = Number(f.nights) + 1;
  return `당신은 스페인과 포르투갈 여행을 전문으로 하는 베테랑 여행 플래너입니다.
아래 조건에 맞춰 실제로 이동 가능한 동선으로 ${f.nights}박 ${days}일 여행 일정을 작성하세요.

[여행 조건]
- 출발 도시: ${f.startCity} (${f.startRegion})
- 마지막 도시: ${f.endCity} (${f.endRegion})
- 인원수: ${f.people}명
- 성별: ${f.gender}
- 연령대: ${f.age}
- 여행 스타일: ${f.style} (선택 가능 스타일: 휴양, 커플여행, 가족여행, 솔로여행, 출장, 미술관여행, 문화여행, 골프여행)

[작성 규칙]
- 출발 도시에서 시작해 마지막 도시에서 끝나는, 지리적으로 무리 없는 동선으로 구성하세요.
- 여행 스타일(${f.style})에 맞는 활동과 장소를 우선적으로 추천하세요.
- 각 일자마다 오전/오후/저녁 활동을 구체적인 장소명과 함께 제시하세요.
- 예상 경비는 1인 기준 원화로 대략적인 범위를 제시하세요.
- 반드시 아래 JSON 형식으로만 응답하고, JSON 외의 다른 텍스트(설명, 코드블록 표시 등)는 절대 포함하지 마세요.

{
  "summary": "전체 여행을 한 문장으로 요약",
  "totalEstimatedCost": "1인 기준 예상 경비 (예: 약 220만원~260만원)",
  "days": [
    {
      "day": 1,
      "city": "해당 일자의 주요 도시",
      "title": "이 날의 테마 한 줄",
      "activities": ["오전: ...", "오후: ...", "저녁: ..."],
      "meal": "추천 식당 또는 음식",
      "tip": "현지 팁 한 줄"
    }
  ]
}`;
}

function parseJsonSafely(rawText) {
  let text = rawText.trim();
  text = text.replace(/^```json\s*/i, '').replace(/^```\s*/, '').replace(/```\s*$/, '');
  try {
    return JSON.parse(text);
  } catch (e) {
    const start = text.indexOf('{');
    if (start === -1) throw new Error('AI 응답에서 JSON을 찾을 수 없습니다: ' + text.substring(0, 200));
    let depth = 0, end = -1;
    for (let i = start; i < text.length; i++) {
      if (text[i] === '{') depth++;
      if (text[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
    }
    if (end === -1) throw new Error('AI 응답의 JSON이 잘려서 파싱할 수 없습니다.');
    return JSON.parse(text.substring(start, end + 1));
  }
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ success:false, error:'Method Not Allowed' }) };
  }

  try {
    const formData = JSON.parse(event.body || '{}');
    const required = ['startCity', 'endCity', 'nights', 'people', 'gender', 'age', 'style'];
    for (const key of required) {
      if (!formData[key]) {
        return { statusCode: 400, body: JSON.stringify({ success:false, error:`필수 항목이 누락되었습니다: ${key}` }) };
      }
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const prompt = buildPrompt(formData);

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.8, responseMimeType: 'application/json', maxOutputTokens: 8192 }
      })
    });

    const json = await res.json();
    if (!res.ok) {
      const msg = json.error ? json.error.message : '알 수 없는 오류';
      return { statusCode: 500, body: JSON.stringify({ success:false, error:`Gemini API 오류: ${msg}` }) };
    }

    const text = json.candidates[0].content.parts[0].text;
    const result = parseJsonSafely(text);

    return { statusCode: 200, body: JSON.stringify({ success:true, data: result }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ success:false, error: err.message }) };
  }
};
