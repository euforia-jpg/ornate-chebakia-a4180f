/* ============================================================
   Euforia Tour AI 챗봇 함수
   - 우리 사이트 정보(FAQ, 상품, 취소·환불 규정)를 시스템 프롬프트로
     학습시켜서, 방문자 질문에 근거 있는 답변만 하도록 만들었어요.
   - 모르는 건 지어내지 말고 카카오톡/예약문의로 안내하도록 지시했어요.
============================================================ */

const GEMINI_MODEL = 'gemini-3.5-flash';

const SYSTEM_PROMPT = `당신은 유포리아투어(Euforia Tour)의 AI 상담 챗봇이에요.
스페인 마드리드에 현지 법인(Euforia Das Nuvens S.L)을 둔 스페인·포르투갈·모로코 전문 여행사예요.

[제공 서비스]
- 차량 & 기사 투어 (한국인 기사 동행, 4~30인 규모)
- 한국어 도슨트 투어 (프라도 미술관 등)
- 순례길 100km 트레킹 (투이~산티아고, 짐 이동 지원 포함)
- 포르투갈·스페인 완전일주 패키지
- 라리가(La Liga) 축구 경기 티켓 예매 (MATCHDAY)
- AI 일정 추천 (plan.html)

[자주 묻는 질문 요약]
- 차량 트랜스퍼: 기사 포함 전용 차량 이동 서비스, 공항 픽업/호텔간 이동/경유지 관광 가능
- 짐 기준: 1인당 32인치 캐리어 + 손가방 1개
- 9인승 미만은 한국인 기사, 중대형은 현지기사+한국인 인솔자 동행
- 결제: 예약 후 인보이스 발행 → 30% 예약금 선입금 → 출발 2주 전 나머지 70% 잔금
- 라리가 티켓: 여권정보 필요(경기일 기준 여권 만료일 6개월 이상 남아야 함), 클럽 카르네 필요 구역 있음, 모바일 티켓(QR) 기본 발급
- 경기 일정은 중계 편성으로 2주 전까지 변경 가능(티켓은 유효, 이메일로 안내)

[취소·환불 규정 요약]
- 해외여행 특별약관 적용, 취소 가능일은 영업일 기준으로 계산(주말·공휴일 제외)
- 영업일 17시 이후 취소는 다음 영업일 기준으로 처리
- 취소 수수료는 총 결제금액 기준 (즉시할인 상품은 할인 전 금액 기준)
- 정확한 위약금 %는 상품별로 달라서, 확답이 필요하면 반드시 예약문의로 안내

[답변 규칙]
- 항상 친절하고 간결한 한국어 존댓말로 답해요 (2~4문장 이내)
- 정확히 모르는 가격, 특정 날짜 일정, 구체적 위약금 %는 절대 지어내지 말고, "정확한 안내는 예약문의(contact.html)나 카카오톡 상담(ID: losnuevos)으로 문의해주세요"라고 안내해요
- 여행/여행사 서비스와 무관한 질문에는 정중히 답변 범위 밖임을 알리고 본연의 주제로 돌아와요
- 상품 예약을 원하는 의지가 보이면 예약문의 페이지(contact.html)로 안내해요`;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ success:false, error:'Method Not Allowed' }) };
  }

  try {
    const { message, history } = JSON.parse(event.body || '{}');
    if (!message) {
      return { statusCode: 400, body: JSON.stringify({ success:false, error:'메시지가 없어요.' }) };
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Gemini 대화 형식으로 변환 (직전 대화 최대 8턴까지만 유지해서 비용/속도 관리)
    const contents = (history || []).slice(-8).map(h => ({
      role: h.role === 'bot' ? 'model' : 'user',
      parts: [{ text: h.text }]
    }));
    contents.push({ role: 'user', parts: [{ text: message }] });

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: { temperature: 0.5, maxOutputTokens: 500 }
      })
    });

    const json = await res.json();
    if (!res.ok) {
      const msg = json.error ? json.error.message : '알 수 없는 오류';
      return { statusCode: 500, body: JSON.stringify({ success:false, error:`Gemini API 오류: ${msg}` }) };
    }

    const reply = json.candidates[0].content.parts[0].text;
    return { statusCode: 200, body: JSON.stringify({ success:true, reply }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ success:false, error: err.message }) };
  }
};
