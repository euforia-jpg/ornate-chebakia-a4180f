/* ============================================================
   일정 만들기 — AI 코멘트 · 추천

   손님이 "AI 추천 받기" 를 누르셨을 때만 한 번 돌아갑니다.
   추천은 사장님이 대쉬보드에 넣어 두신 품목 안에서만 고르게 하고,
   그 밖의 것을 AI 가 지어내면 이 쪽에서 걸러 버립니다.
   (그래야 손님이 "담기" 를 누르면 금액이 바로 따라붙습니다)
============================================================ */

const GEMINI_MODEL = 'gemini-3.5-flash';
const 최대일수 = 25;
const 날마다최대추천 = 3;

function 글(x, 길이){
  return String(x == null ? '' : x).replace(/\s+/g, ' ').trim().slice(0, 길이);
}

function JSON읽기(raw){
  let t = String(raw || '').trim()
    .replace(/^```json\s*/i, '').replace(/^```\s*/, '').replace(/```\s*$/, '');
  try { return JSON.parse(t); } catch (e) {}
  const s = t.indexOf('{');
  if (s === -1) throw new Error('AI 응답에서 JSON 을 찾지 못했습니다');
  let 깊이 = 0, e2 = -1;
  for (let i = s; i < t.length; i++) {
    if (t[i] === '{') 깊이++;
    if (t[i] === '}') { 깊이--; if (!깊이) { e2 = i; break; } }
  }
  if (e2 === -1) throw new Error('AI 응답이 중간에 끊겼습니다');
  return JSON.parse(t.substring(s, e2 + 1));
}

function 프롬프트(입력, 입장지, 식사){
  const 날 = 입력.일정.map(d => {
    const 갈래 = d.종류 === '자유' ? '종일 자유시간'
               : d.종류 === '이동' ? '공항 ↔ 호텔 이동만 하는 날' : '관광';
    const 담음 = (d.담은곳 || []).length ? d.담은곳.join(', ') : '아직 없음';
    const 끼니 = (d.담은식사 || []).length ? d.담은식사.join(', ') : '아직 없음';
    return `${d.일차}일차 | 도시: ${d.도시 || '미정'} | ${갈래} | 고른 곳: ${담음} | 식사: ${끼니}`;
  }).join('\n');

  const 고를수있는곳 = 입장지.length
    ? 입장지.map(x => `  ${x.id} | ${x.도시} | ${x.이름}${x.설명 ? ' — ' + x.설명 : ''}`).join('\n')
    : '  (없음)';
  const 고를수있는식사 = 식사.length
    ? 식사.map(x => `  ${x.id} | ${x.이름}${x.설명 ? ' — ' + x.설명 : ''}`).join('\n')
    : '  (없음)';

  return `당신은 스페인·포르투갈 단체여행을 20년 다룬 한국인 여행 플래너입니다.
손님이 직접 짜고 계신 일정을 보고, 날마다 짧은 코멘트와 추천을 달아 주세요.

[손님이 지금까지 짜신 일정]
인원 ${입력.인원}명 · ${입력.일수}일
${날}

[추천에 쓸 수 있는 입장지 — 이 목록 밖은 절대 추천하지 마세요]
형식: id | 도시 | 이름 — 설명
${고를수있는곳}

[추천에 쓸 수 있는 식사]
${고를수있는식사}

[규칙]
- 추천하는 곳의 id 는 반드시 위 목록에 있는 id 를 그대로 쓰세요. 지어내면 버려집니다.
- 입장지는 그 날 도시와 같은 도시의 것만 추천하세요.
- 이미 "고른 곳" 에 들어 있는 곳이나, 다른 날에 이미 담은 곳은 다시 추천하지 마세요.
- 날마다 추천은 최대 ${날마다최대추천}개. 더 넣을 게 없으면 빈 배열로 두세요.
- "종일 자유시간" 인 날은 빡빡하게 채우지 말고, 쉬엄쉬엄 둘러볼 한두 곳만 권하세요.
- "공항 ↔ 호텔 이동만 하는 날" 은 추천을 비우고, 코멘트도 짐·체크인·시간 여유 쪽으로 쓰세요.
- 코멘트는 손님에게 드리는 존댓말 한 문장(40자 안팎). 뻔한 칭찬 말고 실제로 도움이 되는 말로.
- 팁은 예매 필요 여부, 휴관일, 더위·식사 시간처럼 현장에서 바로 쓸모 있는 한 문장.
- 동선조언은 도시 순서나 머무는 날 수에 대한 조언 한두 문장. 문제가 없으면 잘 짜셨다고 짧게.
- 금액이나 가격은 어디에도 쓰지 마세요.

아래 JSON 형식으로만 답하세요. 다른 말은 한 글자도 넣지 마세요.
{
  "동선조언": "한두 문장",
  "날": [
    { "일차": 1, "코멘트": "한 문장", "팁": "한 문장",
      "추천": [{ "id": "위 목록의 id", "이유": "왜 권하는지 25자 안팎" }] }
  ]
}`;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ ok:false, error:'POST 로만 받습니다' }) };
  }

  try {
    const 입력 = JSON.parse(event.body || '{}');
    const 일정 = Array.isArray(입력.일정) ? 입력.일정.slice(0, 최대일수) : [];
    const 입장지 = (Array.isArray(입력.입장지) ? 입력.입장지 : []).slice(0, 300);
    const 식사  = (Array.isArray(입력.식사)  ? 입력.식사  : []).slice(0, 60);

    if (!일정.length) {
      return { statusCode: 400, body: JSON.stringify({ ok:false, error:'일정이 비어 있습니다' }) };
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return { statusCode: 200, body: JSON.stringify({
        ok:false, 꺼짐:true,
        error:'AI 추천이 아직 켜져 있지 않습니다. 담당자에게 말씀해 주시면 바로 열어 드리겠습니다.' }) };
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      { method:'POST', headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 프롬프트({ 인원: Number(입력.인원) || 0,
                                                  일수: 일정.length, 일정 }, 입장지, 식사) }] }],
          generationConfig: { temperature: 0.7, responseMimeType: 'application/json', maxOutputTokens: 4096 }
        }) });

    const json = await res.json();
    if (!res.ok) {
      const msg = json && json.error ? json.error.message : '알 수 없는 오류';
      return { statusCode: 502, body: JSON.stringify({ ok:false, error:'AI 응답을 받지 못했습니다: ' + msg }) };
    }
    const 본문 = json.candidates && json.candidates[0] &&
                 json.candidates[0].content && json.candidates[0].content.parts[0].text;
    const 답 = JSON읽기(본문);

    /* ---- 여기서부터 걸러 내기 ---- */
    const 입장지표 = {}; 입장지.forEach(x => { if (x && x.id) 입장지표[x.id] = x; });
    const 식사표  = {}; 식사.forEach(x => { if (x && x.id) 식사표[x.id] = x; });

    /* 어느 날이든 이미 담으신 것은 다시 권하지 않습니다 */
    const 이미 = {};
    일정.forEach(d => {
      (d.담은id || []).forEach(id => { 이미[id] = true; });
      (d.담은식사id || []).forEach(id => { 이미[id] = true; });
    });

    const 받은날 = {};
    (Array.isArray(답.날) ? 답.날 : []).forEach(d => {
      const n = Number(d && d.일차);
      if (n >= 1 && n <= 일정.length) 받은날[n] = d;
    });

    const 날결과 = 일정.map((원래, i) => {
      const d = 받은날[i + 1] || {};
      const 쓴것 = {};
      const 추천 = (Array.isArray(d.추천) ? d.추천 : []).map(r => {
        const id = 글(r && r.id, 40);
        if (!id || 쓴것[id] || 이미[id]) return null;
        const 것 = 입장지표[id] || 식사표[id];
        if (!것) return null;
        /* 입장지는 그 날 도시와 맞아야 합니다 */
        if (입장지표[id] && 것.도시 && 원래.도시 && 것.도시 !== 원래.도시) return null;
        /* 공항 이동만 하는 날에는 권하지 않습니다 */
        if (원래.종류 === '이동') return null;
        쓴것[id] = true;
        return { id: id,
                 종류: 입장지표[id] ? '입장지' : '식사',
                 이름: 글(것.이름, 60),
                 이유: 글(r.이유, 60) };
      }).filter(Boolean).slice(0, 날마다최대추천);

      return { 일차: i + 1, 코멘트: 글(d.코멘트, 160), 팁: 글(d.팁, 160), 추천: 추천 };
    });

    return { statusCode: 200, body: JSON.stringify({
      ok: true,
      동선조언: 글(답.동선조언, 400),
      날: 날결과
    }) };

  } catch (err) {
    /* 자세한 까닭은 Netlify 로그에만 남기고, 손님께는 쉬운 말로 알려 드립니다 */
    console.error('builder-advice:', err);
    return { statusCode: 500, body: JSON.stringify({
      ok:false, error:'추천을 만드는 데 실패했습니다. 잠시 뒤 다시 눌러 주세요.' }) };
  }
};
