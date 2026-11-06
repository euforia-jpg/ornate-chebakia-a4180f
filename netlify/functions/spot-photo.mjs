/*
  ===========================================================
  관광지 사진 — 상품 쪽 「이런 경험을 할 수 있어요」 카드 아래에 붙는 사진
  -----------------------------------------------------------
  구글 지도(Places API New)에서 그 관광지를 찾아 사진 1장을 돌려줍니다.
  (호텔 사진 place-photo.mjs 와 같은 키 GOOGLE_PLACES_KEY 를 씁니다)

  GET /.netlify/functions/spot-photo?p=portugal-10days&i=0
      → { name:"구글에 올라 있는 장소 이름", maps:"구글 지도 주소",
          photo:{ u:"사진 주소", a:[{ n:"촬영자", u:"촬영자 주소" }] } }
      → 사진을 붙이지 않는 줄이면 { skip:true }

  - 사이트의 products.js 에 실제로 있는 상품 · 줄만 조회합니다 (키 남용 방지).
  - 검색어는 그 줄의 첫 장소 이름입니다. 예) "에보라 역사지구 (세계유산) · 뼈 예배당" → "에보라 역사지구"
  - 시각 · 환불 · 호텔 같은 안내 줄은 사진을 붙이지 않습니다.
  - 검색어를 직접 정하려면 products.js 의 그 상품 detail 에
        사진검색어: ["에보라 대성당", "", ...]
    처럼 줄 순서대로 적으면 됩니다. 빈 칸("")은 사진을 붙이지 않는다는 뜻입니다.
  - 찾는 범위는 이베리아 반도 + 남프랑스 · 모로코 북부(탕헤르 · 테투안 · 셰프샤우엔)로 묶어,
    이름이 같은 다른 나라 장소가 나오지 않게 합니다.
  - 구글이 찾은 장소 번호(ID)만 저장해 두고, 사진 주소는 매번 새로 받습니다.
  ===========================================================
*/
import { getStore } from "@netlify/blobs";
import vm from "node:vm";

const J = (o, s = 200, c = "no-store") =>
  new Response(JSON.stringify(o), { status: s, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": c } });

/* 사진을 붙이지 않는 상품 (차량 이동 · 도슨트 · 자유일정 · 골프 · 순례길 · 하이킹 · 경기) */
const 상품제외 = /^(car-|docent|matchday|golf|camino|hiking|spain-free|spain-north$|spain-month)/;
/* 사진을 붙이지 않는 줄 (시각 · 조건 · 서비스 안내) */
const 줄제외 = /\d{1,2}:\d{2}|\d\s*박|환불|호텔|파라도르|동행|배정|출발|도착|가능|상담|추천|맞춤|자유일정|요금|인원|라운드|캐디|도보|지원|여정|특식|공연|되돌아|쉬어|\bIN\b|\bOUT\b|→/;
/* 장소 이름 뒤에 붙은 활동 말은 떼고 찾습니다 (「톨레도 대성당 관람」 → 「톨레도 대성당」) */
const 꼬리말 = /\s*(관람|자유시간|골목|내부 입장|입장|탐험|보트 승선|승선|순례|야경투어|곤돌라|경유)$/;
/* 앞머리가 도시 이름뿐이거나 「나흘 · 횡단」 같은 말이면 — 뒤의 첫 장소로 찾습니다 */
const 앞머리일반 = /나흘|하루|이틀|횡단|거슬러/;

function 검색어(줄) {
  const 조각 = String(줄).split(/\s+[—–-]\s+/);
  let 앞 = 조각[0].replace(/\([^)]*\)/g, " ").trim();
  if (조각.length > 1 && (앞.length <= 6 || 앞머리일반.test(앞))) 앞 = 조각[1];
  let q = 앞.split(/\s*[·,]\s*/)[0].replace(/\([^)]*\)/g, " ").replace(/[「」『』"]/g, "").replace(/\s+/g, " ").trim();
  q = q.split(/(?<=\S)(?:와|과)\s/)[0].trim();            /* 「레온 대성당과 산티아고 순례길」 → 「레온 대성당」 */
  for (let k = 0; k < 3; k++) q = q.replace(꼬리말, "").trim();
  return q;
}

/*
  직접 정한 검색어 — 상품별로 「그 줄 글자 그대로」 → 구글에서 찾을 이름
  · 한국어 이름보다 현지 이름(스페인어 · 포르투갈어)이 구글에서 훨씬 잘 찾아집니다.
  · 줄 글자가 바뀌면(관리자에서 고치면) 그 줄은 이 표를 건너뛰고 원래 방식(자동)으로 찾습니다.
    → 틀린 사진이 붙는 일은 없고, 사진이 빠질 수는 있습니다. 그때 이 표의 글자만 맞춰 주면 됩니다.
  · 빈 칸("")은 사진을 붙이지 않는 줄입니다 (시각 · 환불 · 서비스 안내).
  · products.js 의 detail.사진검색어 가 있으면 그것이 이 표보다 먼저입니다.
*/
const 직접표 = {
 "madrid-toledo-day": {
  "09:00 마드리드 출발 · 17:00 마드리드 도착(예정)": "",
  "톨레도 대성당 관람": "Catedral Primada de Toledo",
  "산토토메 (엘 그레코 명작)": "Iglesia de Santo Tomé, Toledo",
  "톨레도 구시가지 골목 자유시간": "Mirador del Valle, Toledo",
  "최소 인원 미달 시 예약금 100% 환불": ""
 },
 "docent-museum": {
  "프라도 미술관 주요 소장품 해설": "Museo del Prado",
  "레이나소피아 · 게르니카 관람": "Museo Reina Sofía",
  "작품별 배경 스토리 설명": "",
  "자유 관람 시간 포함": ""
 },
 "portugal-round": {
  "리스본 2박 + 포르투 3박, 완전일주 5박 6일": "",
  "전 일정 4성급 호텔 · 전용차량 · 전문 가이드 동행": "",
  "신트라 페나 궁전 · 호카곶 · 카스카이스 경유": "Palácio Nacional da Pena",
  "포르투 야경투어 (동 루이스 다리 · 하베이라 항구)": "Ponte Luís I, Porto"
 },
 "spain-round": {
  "사그라다 파밀리아 · 구엘 공원 (세계유산)": "Basílica de la Sagrada Família",
  "보케리아 시장 · 람블라스 거리 · 고딕 지구": "Mercado de La Boqueria",
  "알함브라 궁전 (세계유산) · 알바이신 · 산 니콜라스 전망대": "Alhambra, Granada",
  "론다 누에보 다리 — 협곡 위에 걸린 마을": "Puente Nuevo, Ronda",
  "세비야 대성당 · 히랄다 탑 (세계유산)": "Catedral de Sevilla",
  "플라멩코 공연 (유네스코 무형문화유산)": "Museo del Baile Flamenco, Sevilla",
  "말라가 — 라리오스 거리 · 무엘레 우노 항구": "Calle Larios, Málaga"
 },
 "camino-100": {
  "투이 → 오 포리뇨 → 레돈델라 → 폰테베드라 → 칼다스 데 레이스 → 파드론 → 산티아고 데 콤포스텔라": "Catedral de Santiago de Compostela",
  "하루 평균 20km 내외, 6일간 총 약 119km 도보": "",
  "아름다운 해안길과 중세 마을 탐방": "",
  "현지 특식 & 와인으로 즐거운 여정": "",
  "전문 인솔자 전 일정 동행": ""
 },
 "basque-navarra-6days": {
  "산세바스티안 라 콘차 만 · 현지 가이드 투어": "Playa de La Concha, San Sebastián",
  "생장드뤼즈 · 앙다예 플리시 해안": "Saint-Jean-de-Luz",
  "사르 동굴 탐험 (입장료 포함)": "Grottes de Sare",
  "아이노아 · 에스플레트 붉은 고추 마을": "Ainhoa",
  "팜플로나 · 바즈탄 계곡 엘리손도": "Plaza del Castillo, Pamplona"
 },
 "portugal-8days": {
  "제로니무스 수도원 · 벨렘탑 (세계유산)": "Mosteiro dos Jerónimos",
  "신트라 페나 궁전 · 유라시아 최서단 까보 다 로카": "Palácio Nacional da Pena",
  "오비두스 · 나자레 · 알코바사 · 바탈랴 세계유산 벨트": "Óbidos, Portugal",
  "파티마 성지 순례": "Santuário de Fátima",
  "포르투 역사지구 · 동 루이스 1세 다리 · 포트와인 셀러": "Ponte Luís I, Porto",
  "브라가 · 기마랑이스 (포르투갈 건국의 도시)": "Santuário do Bom Jesus do Monte"
 },
 "portugal-10days": {
  "에보라 역사지구 (세계유산) · 뼈 예배당": "Templo Romano de Évora",
  "베나길 동굴 보트 승선 · 라구스 · 사그레스 곶": "Algar de Benagil",
  "오비두스 · 나자레 · 알코바사 · 바탈랴 세계유산 벨트": "Óbidos, Portugal",
  "파티마 성지 순례": "Santuário de Fátima",
  "포르투 역사지구 · 동 루이스 1세 다리 · 포트와인 셀러": "Ponte Luís I, Porto",
  "브라가 · 기마랑이스 (포르투갈 건국의 도시)": "Santuário do Bom Jesus do Monte"
 },
 "iberia-12days": {
  "제로니무스 수도원 · 벨렘탑 (세계유산)": "Mosteiro dos Jerónimos",
  "신트라 문화경관 · 유라시아 최서단 까보 다 로카": "Palácio Nacional da Pena",
  "에보라 역사지구 (세계유산) · 뼈 예배당": "Templo Romano de Évora",
  "세비야 대성당 · 레알 알카사르 (세계유산)": "Catedral de Sevilla",
  "카르모나·론다 파라도르(국영 고성 호텔) 3박": "Parador de Carmona",
  "프리힐리아나 백색마을 · 알함브라 궁전 (세계유산)": "Frigiliana",
  "그라나다 알바이신 · 사크로몬테 · 프라도 미술관": "Mirador de San Nicolás, Granada"
 },
 "spain-8days-barcelona": {
  "자유일정 1일 — 7일차는 가이드 없이 자유롭게 (항공으로 바르셀로나 도착 후 공항 → 호텔 차량 서비스)": "",
  "장거리는 기차 · 항공으로 — 바르셀로나 → 마드리드 기차, 그라나다 → 바르셀로나 항공 (이동 중 가이드 미동행 · 마드리드 도착역 가이드 미팅)": "",
  "사그라다 파밀리아 · 구엘 공원 (세계유산) — 입장 포함 · 카사 바트요 · 카사 밀라 외관": "Basílica de la Sagrada Família",
  "프라도 미술관 — 입장 포함 · 솔 광장 · 마요르 광장 · 산 미겔 시장": "Museo del Prado",
  "코르도바를 지나 세비야 — 스페인 광장 · 과달키비르 강변 · 트리아나 다리": "Plaza de España, Sevilla",
  "론다를 지나 그라나다 — 알바이신 지구 · 산 니콜라스 전망대": "Mirador de San Nicolás, Granada",
  "마지막 날 바르셀로나 고딕 지구 · 보케리아 시장 · 람블라스 거리": "Barrio Gótico, Barcelona"
 },
 "spain-12days-barcelona": {
  "사그라다 파밀리아 · 구엘 공원 (세계유산)": "Basílica de la Sagrada Família",
  "몬세라트 수도원 · 발렌시아 라 론하 (세계유산)": "Monasterio de Montserrat",
  "알함브라 궁전 (세계유산) · 프리힐리아나 백색마을": "Alhambra, Granada",
  "론다·카르모나 파라도르(국영 고성 호텔) 3박": "Parador de Ronda",
  "세비야 대성당 · 레알 알카사르 (세계유산)": "Catedral de Sevilla",
  "코르도바 역사지구 (세계유산)": "Mezquita-Catedral de Córdoba",
  "프라도 미술관 · 파세오 델 프라도 (세계유산)": "Museo del Prado",
  "사라고사 필라르 대성당 · 알하페리아 궁전 (세계유산)": "Basílica del Pilar, Zaragoza"
 },
 "north-cantabria-basque": {
  "부르고스 대성당 (세계유산)": "Catedral de Burgos",
  "산티야나 델 마르와 알타미라 박물관 (세계유산)": "Santillana del Mar",
  "코미야스 · 가우디의 엘 카프리초": "El Capricho de Gaudí, Comillas",
  "산토냐 안초비 · 라레도 · 카스트로 우르디알레스": "Santoña, Cantabria",
  "비스카야 다리 곤돌라 (세계유산)": "Puente de Vizcaya",
  "구겐하임 빌바오 입장": "Museo Guggenheim Bilbao",
  "게타리아 · 사라우스 · 산세바스티안 라 콘차": "Getaria"
 },
 "north-asturias-picos": {
  "레온 대성당과 산티아고 순례길 (세계유산)": "Catedral de León",
  "코바동가 성지 · 산타 쿠에바": "Santa Cueva de Covadonga",
  "피코스 데 에우로파 · 푸엔테 데 케이블카 (해발 1,823m)": "Teleférico de Fuente Dé",
  "라 에르미다 협곡과 포테스 · 산토 토리비오 수도원": "Desfiladero de La Hermida",
  "오비에도 선로마네스크 산타 마리아 델 나랑코 (세계유산)": "Santa María del Naranco, Oviedo",
  "산티야나 델 마르와 알타미라 박물관 (세계유산)": "Santillana del Mar",
  "리바데세야 · 야네스 · 코미야스 해안": "Ribadesella"
 },
 "iberia-14days-madrid": {
  "프라도 미술관 · 마드리드 왕궁": "Museo del Prado",
  "필라르 성모 대성당 · 알하페리아 궁전 (사라고사)": "Basílica del Pilar, Zaragoza",
  "사그라다 파밀리아 · 구엘 공원 (가우디의 하루)": "Basílica de la Sagrada Família",
  "예술과학도시 (발렌시아) · 알함브라 궁전 (그라나다)": "Ciudad de las Artes y las Ciencias, Valencia",
  "세비야 대성당 · 알카사르 · 스페인 광장": "Catedral de Sevilla",
  "파티마 성지 순례 · 코임브라 대학": "Santuário de Fátima",
  "포르투 역사지구 · 포트와인 셀러": "Ponte Luís I, Porto",
  "벨렝 지구 · 호카곶 (유라시아 대륙 서쪽 끝)": "Torre de Belém"
 },
 "galicia-a-marina": {
  "산티아고 데 콤포스텔라 — 대성당 내부와 성 야고보 유해 안치소, 오브라도이로 광장": "Catedral de Santiago de Compostela",
  "아 코루냐 헤라클레스의 탑 — 로마 시대에 세워져 지금도 불을 밝히는 등대 (유네스코)": "Torre de Hércules, A Coruña",
  "카보 오르테갈과 로이바 절벽 — 대서양과 칸타브리아 해가 만나는 해식 절벽": "Cabo Ortegal",
  "에스타카 데 바레스 — 이베리아 반도의 최북단": "Estaca de Bares",
  "사르가델로스 도자기 공방 — 1806년부터 이어 온 코발트 블루 도자기, 가이드 투어 포함": "Sargadelos, Cervo",
  "프라이아 다스 카테드라이스(대성당 해변) — 간조 시각에 맞춰 방문, 사전 예약 대행": "Praia das Catedrais",
  "루고 로마 성벽 — 온전히 남은 유일한 로마 성벽 2km 위를 한 바퀴 (유네스코)": "Muralla romana de Lugo"
 },
 "iberia-15days-grand": {
  "바르셀로나 — 사그라다 파밀리아 내부 입장, 구엘 공원, 고딕 지구": "Basílica de la Sagrada Família",
  "그라나다 알함브라 — 나스르 궁전 지정 시간 입장, 헤네랄리페 정원": "Alhambra, Granada",
  "안달루시아 횡단 — 네르하, 말라가, 론다 누에보 다리, 세비야 대성당과 알카사르": "Balcón de Europa, Nerja",
  "포르투갈 나흘 — 에보라 인골 예배당, 리스본 벨렝 지구, 파티마, 포르투 도루 강": "Capela dos Ossos, Évora",
  "산티아고 데 콤포스텔라 — 순례길 800km가 끝나는 오브라도이로 광장과 대성당": "Catedral de Santiago de Compostela",
  "순례길을 거슬러 — 루고 로마 성벽, 해발 1,300m 오 세브레이로, 레온 대성당": "Muralla romana de Lugo",
  "스페인 북부 — 코바동가, 산티야나 델 마르와 알타미라, 빌바오 구겐하임, 라 리오하": "Santa Cueva de Covadonga"
 },
 "portugal-north-spain-17days": {
  "리스본 IN · 마드리드 OUT — 되돌아가는 구간 없음": "",
  "산티아고 데 콤포스텔라와 땅끝 피니스테레": "Catedral de Santiago de Compostela",
  "피코스 데 에우로파 코바동가 호수": "Lagos de Covadonga",
  "가우디의 엘 카프리초와 알타미라 복제 동굴": "El Capricho de Gaudí, Comillas",
  "산 세바스티안 2박 — 하루는 온전히 쉬어 갑니다": "Playa de La Concha, San Sebastián"
 },
 "golf-spain-portugal": {
  "리스본 IN / OUT · 18홀 4라운드 (포르투갈 2회 + 스페인 2회)": "",
  "전용 차량과 한국어 쓰루 가이드가 전 일정 동행 — 체크인 · 티타임 진행 · 식당 예약 · 현장 통역": "",
  "포르투갈 · 스페인 코스는 캐디 제도가 없어 셀프 플레이 + 전동 버기가 기본입니다": "",
  "2명부터 출발 · 인원이 늘면 1인 요금이 크게 내려갑니다": ""
 },
 "spain-free-itinerary": {
  "원하는 도시 자유 조합": "",
  "이동 구간별 맞춤 설계": "",
  "숙소 위치 상담 지원": "",
  "관심사에 맞춘 명소 추천": ""
 },
 "spain-north": {
  "빌바오 구겐하임 미술관": "Museo Guggenheim Bilbao",
  "산세바스티안 핀초스 투어": "Parte Vieja, San Sebastián",
  "북부 해안 드라이브": "Flysch de Zumaia",
  "자유일정 맞춤 조정": ""
 },
 "spain-month-stay": {
  "지역별 장단점 상담": "",
  "장기 숙소 지역 추천": "",
  "체류 중 짧은 투어 연계": "",
  "생활 밀착 정보 공유": ""
 },
 "hiking-sierra-nevada": {
  "시에라네바다 국립공원 트레킹": "Parque Nacional de Sierra Nevada",
  "현지 가이드 동행": "",
  "구간별 난이도 조정": "",
  "숙소 · 이동 지원": ""
 },
 "car-madrid-puertolapice-granada": {
  "09:00 마드리드 아토차역 출발 · 18:00 그라나다역 도착(예정)": "",
  "푸에르토 라피세(돈키호테 마을) 약 2시간 자유관광": "Venta del Quijote, Puerto Lápice",
  "전 일정 한국인 기사 동행 (25인승 이상은 인솔자 동행)": "",
  "인원별 9인승 밴 · 25인승 스프린터 · 45인승 버스 배정": ""
 },
 "car-granada-cordoba-madrid": {
  "07:30 그라나다 출발 · 18:00 마드리드 도착(예정)": "",
  "꼬르도바 메스키타 대성당 관람 (유네스코 세계문화유산)": "Mezquita-Catedral de Córdoba",
  "로마 다리 · 유대인 지구(꽃의 길) 자유시간": "Puente Romano de Córdoba",
  "한국인 기사 전 일정 동행": "",
  "인원별 프라이빗 밴 · 스프린터 · 전용 버스 배정": ""
 },
 "car-bilbao-burgos-madrid": {
  "08:00 출발 · 18:00 도착(예정), 빌바오↔마드리드 양방향 운행": "",
  "부루고스 대성당 관람 (유네스코 세계문화유산, 엘 시드의 무덤)": "Catedral de Burgos",
  "산타 마리아 문 · 부루고스 성 전망대 자유시간": "Arco de Santa María, Burgos",
  "한국어 · 영어 · 스페인어 가능 기사 사전 요청 가능": "",
  "최소 인원 미달 시 예약금 100% 환불": ""
 },
 "car-madrid-burgos-bilbao": {
  "마드리드 숙소 픽업": "",
  "부르고스 경유 관광 시간": "Catedral de Burgos",
  "빌바오 목적지 드롭": "Museo Guggenheim Bilbao",
  "기사 겸 가이드 옵션 문의 가능": ""
 },
 "car-lisbon-merida-madrid": {
  "08:00 리스본 출발 · 18:00 마드리드 도착(예정)": "",
  "메리다 고고학 유적군 자유관광 (유네스코 세계문화유산)": "Teatro Romano de Mérida",
  "로마 극장 · 원형 경기장 · 다이아나 사원 · 로마 다리": "Templo de Diana, Mérida",
  "통합권으로 주요 명소 한번에 관람 가능": "Puente Romano de Mérida",
  "최소 인원 미달 시 예약금 100% 환불": ""
 },
 "car-madrid-merida-lisbon": {
  "08:00 마드리드 출발 · 18:00 리스본 도착(예정)": "",
  "메리다 고고학 유적군 자유관광 (유네스코 세계문화유산)": "Teatro Romano de Mérida",
  "로마 극장 · 원형 경기장 · 다이아나 사원 · 로마 다리": "Templo de Diana, Mérida",
  "통합권으로 주요 명소 한번에 관람 가능": "Puente Romano de Mérida",
  "최소 인원 미달 시 예약금 100% 환불": ""
 },
 "car-madrid-zaragoza-barcelona": {
  "09:00 마드리드 출발 · 19:00 바르셀로나 도착(예정)": "",
  "필라르 성모 대성당 (고야 프레스코화, 전망 타워)": "Basílica del Pilar, Zaragoza",
  "라 세오 대성당 (유네스코 세계문화유산)": "Catedral del Salvador de Zaragoza",
  "알하페리아 궁전 · 로마 유적지": "Palacio de la Aljafería",
  "최소 인원 미달 시 예약금 100% 환불": ""
 },
 "car-barcelona-zaragoza-madrid": {
  "08:00 바르셀로나 출발 · 18:00 마드리드 도착(예정)": "",
  "필라르 대성당 관광": "Basílica del Pilar, Zaragoza",
  "사라고사 자유시간 및 간단한 현지식 체험": "Plaza del Pilar, Zaragoza",
  "최소 인원 미달 시 예약금 100% 환불": ""
 },
 "car-porto-salamanca-madrid": {
  "08:00 포루투 출발 · 18:00 마드리드 도착(예정)": "",
  "살라망카 자유관광 (유네스코 세계문화유산)": "Plaza Mayor de Salamanca",
  "마요르 광장 · 살라망카 대학교 · 신·구 대성당": "Universidad de Salamanca",
  "구시가지 도보 관광으로 편리하게 이동": "Catedral Nueva de Salamanca",
  "최소 인원 미달 시 예약금 100% 환불": ""
 },
 "car-madrid-salamanca-porto": {
  "09:00 마드리드 출발 · 18:00 포루투 도착(예정)": "",
  "살라망카 2시간 자유관광 (유네스코 세계문화유산)": "Plaza Mayor de Salamanca",
  "마요르 광장 · 살라망카 대학교 · 신·구 대성당": "Universidad de Salamanca",
  "넉넉한 수납공간의 프라이빗 차량, VIP 의전 별도문의 가능": "",
  "최소 인원 미달 시 예약금 100% 환불": ""
 },
 "car-lisbon-benagil-sevilla": {
  "08:00 리스본 출발 · 18:00 세비야 도착(예정)": "",
  "베나길 동굴 전망 포인트 관람": "Algar de Benagil",
  "알가르브 해안 마을 자유시간 & 포토타임": "Praia da Marinha",
  "4인 미만은 프라이빗 투어로도 진행 가능": "",
  "최소 인원 미달 시 예약금 100% 환불": ""
 },
 "car-sevilla-benagil-lisbon": {
  "08:00 세비야 출발 · 18:00 리스본 도착(예정)": "",
  "베나길 동굴 보트 투어 & 자유시간": "Algar de Benagil",
  "알가르브 해안 마을 포토타임": "Carvoeiro, Lagoa",
  "4인 미만은 프라이빗 투어로도 진행 가능": "",
  "최소 인원 미달 시 예약금 100% 환불": ""
 },
 "car-granada-frigiliana-nerja-ronda-sevilla": {
  "07:00 그라나다 출발 · 18:00 세비야 도착(예정)": "",
  "네르하 유럽의 발코니 자유관광 1시간": "Balcón de Europa, Nerja",
  "프리힐리아나 하얀 마을 골목 자유관광 1시간": "Frigiliana",
  "론다 누에보 다리 · 투우장 자유관광 2시간": "Puente Nuevo, Ronda",
  "4인 미만은 프라이빗 투어로도 진행 가능": ""
 },
 "car-sevilla-ronda-nerja-granada": {
  "08:00 세비야 출발 · 18:00 그라나다 도착(예정)": "",
  "론다 누에보 다리 · 투우장 · 타호 절벽": "Puente Nuevo, Ronda",
  "프리힐리아나 하얀 마을 골목 산책": "Frigiliana",
  "네르하 유럽의 발코니 · 해변": "Balcón de Europa, Nerja",
  "그라나다 알함브라 외관 관람": "Alhambra, Granada",
  "최소 인원 미달 시 예약금 100% 환불": ""
 },
 "car-sevilla-cordoba-madrid": {
  "08:00 세비야 출발 · 19:00 마드리드 도착(예정)": "",
  "꼬르도바 메스키타 대성당 관람 (유네스코 세계유산)": "Mezquita-Catedral de Córdoba",
  "유대인 지구 · 로마 다리 · 꽃길 거리": "Calleja de las Flores, Córdoba",
  "최소 인원 미달 시 예약금 100% 환불": ""
 },
 "car-madrid-consuegra-sevilla": {
  "09:00 마드리드 출발 · 18:00 세비야 도착(예정)": "",
  "콘수에그라 풍차 (돈키호테 배경, 일부 내부 관람 가능)": "Molinos de Consuegra",
  "콘수에그라 성 · 스페인 광장": "Castillo de Consuegra",
  "2시간 자유관광": "",
  "최소 인원 미달 시 예약금 100% 환불": ""
 },
 "car-madrid-toledo-sevilla": {
  "08:00 마드리드 출발 · 19:00 세비야 도착(예정)": "",
  "톨레도 대성당 관람 (유네스코 세계유산 구시가지)": "Catedral Primada de Toledo",
  "산토토메 · 유대인 지구 골목 자유시간": "Iglesia de Santo Tomé, Toledo",
  "미라도르 전망대에서 보는 톨레도 전경": "Mirador del Valle, Toledo",
  "최소 인원 미달 시 예약금 100% 환불": ""
 },
 "car-madrid-segovia-avila-salamanca": {
  "08:00 마드리드 출발 · 19:00 살라망카 도착(예정)": "",
  "세고비아 로마 수도교 · 알카사르 (유네스코 세계유산)": "Acueducto de Segovia",
  "아빌라 중세 성벽 (유네스코 세계유산)": "Murallas de Ávila",
  "살라망카 마요르 광장 · 대성당 산책": "Plaza Mayor de Salamanca",
  "최소 인원 미달 시 예약금 100% 환불": ""
 },
 "car-sevilla-ronda-mijas-malaga": {
  "08:00 세비야 출발 · 18:00 말라가 도착(예정)": "",
  "론다 누에보 다리 · 협곡 전망": "Puente Nuevo, Ronda",
  "론다 구시가지 자유시간": "Plaza de Toros de Ronda",
  "미하스 하얀 마을 산책 · 지중해 전망": "Mijas Pueblo",
  "최소 인원 미달 시 예약금 100% 환불": ""
 },
 "car-valencia-cuenca-madrid": {
  "08:00 발렌시아 출발 · 18:00 마드리드 도착(예정)": "",
  "쿠엥카 매달린 집 (유네스코 세계유산 구시가지)": "Casas Colgadas, Cuenca",
  "산 파블로 다리 · 협곡 전망": "Puente de San Pablo, Cuenca",
  "쿠엥카 대성당 · 마요르 광장 자유시간": "Catedral de Cuenca",
  "최소 인원 미달 시 예약금 100% 환불": ""
 },
 "car-lisbon-obidos-nazare-fatima-porto": {
  "08:00 리스본 출발 · 19:00 포르투 도착(예정)": "",
  "오비두스 성벽 마을 · 진지냐(체리주) 골목 산책": "Óbidos, Portugal",
  "나자레 시티우 전망대 · 대서양 해변": "Miradouro do Suberco, Nazaré",
  "파티마 성모 발현 성지 (대성당 · 광장)": "Santuário de Fátima",
  "최소 인원 미달 시 예약금 100% 환불": ""
 },
 "car-porto-braga-santiago": {
  "09:00 포르투 출발 · 18:00 산티아고 데 콤포스텔라 도착(예정)": "",
  "봉 제수스 두 몬트 성지 · 바로크 계단 (유네스코 세계유산)": "Santuário do Bom Jesus do Monte",
  "브라가 대성당 · 구시가지 자유시간": "Sé de Braga",
  "산티아고 데 콤포스텔라 도착 · 대성당 광장": "Plaza del Obradoiro",
  "시각은 각 나라 현지 시각 기준 (포르투갈은 스페인보다 1시간 늦어요)": "",
  "최소 인원 미달 시 예약금 100% 환불": ""
 },
 "car-barcelona-tarragona-peniscola-valencia": {
  "08:00 바르셀로나 출발 · 19:00 발렌시아 도착(예정)": "",
  "타라고나 로마 원형경기장 · 지중해 발코니 (유네스코 세계유산)": "Anfiteatro de Tarragona",
  "페니스콜라 교황의 성 · 바다 위 구시가지": "Castillo de Peñíscola",
  "지중해 해안 드라이브": "",
  "최소 인원 미달 시 예약금 100% 환불": ""
 },
 "car-barcelona-montserrat-zaragoza-madrid": {
  "07:30 바르셀로나 출발 · 19:30 마드리드 도착(예정)": "",
  "몬세라트 수도원 · 검은 성모 · 바위산 전망": "Monasterio de Montserrat",
  "사라고사 필라르 성모 대성당 · 에브로강 다리": "Basílica del Pilar, Zaragoza",
  "사라고사 구시가지 자유시간 · 점심": "Puente de Piedra, Zaragoza",
  "최소 인원 미달 시 예약금 100% 환불": ""
 },
 "car-barcelona-zaragoza-pamplona-sansebastian": {
  "07:30 바르셀로나 출발 · 19:00 산 세바스티안 도착(예정)": "",
  "사라고사 필라르 성모 대성당 · 에브로강 다리": "Basílica del Pilar, Zaragoza",
  "팜플로나 구시가지 · 카스티요 광장 · 산 페르민 소몰이 길": "Plaza del Castillo, Pamplona",
  "산세바스티안 라 콘차 해변 도착": "Playa de La Concha, San Sebastián",
  "최소 인원 미달 시 예약금 100% 환불": ""
 },
 "car-granada-ubeda-baeza-madrid": {
  "08:00 그라나다 출발 · 19:00 마드리드 도착(예정)": "",
  "우베다 살바도르 성당 · 바스케스 데 몰리나 광장 (유네스코 세계유산)": "Sacra Capilla del Salvador, Úbeda",
  "바에사 대성당 · 산타 마리아 광장 (유네스코 세계유산)": "Catedral de Baeza",
  "하엔의 올리브 밭 풍경": "",
  "최소 인원 미달 시 예약금 100% 환불": ""
 },
 "car-malaga-antequera-granada": {
  "09:00 말라가 출발 · 17:00 그라나다 도착(예정)": "",
  "엘 토르칼 자연공원 · 기암괴석 산책로 (유네스코 세계유산)": "Torcal de Antequera",
  "안테케라 고인돌 유적지 (멩가 · 비에라 고인돌)": "Dolmen de Menga",
  "안테케라 구시가지 자유시간": "Alcazaba de Antequera",
  "최소 인원 미달 시 예약금 100% 환불": ""
 },
 "car-lisbon-evora-sevilla": {
  "08:00 리스본 출발 · 19:00 세비야 도착(예정)": "",
  "에보라 로마 신전 · 대성당 (유네스코 세계유산)": "Templo Romano de Évora",
  "뼈 예배당 (상 프란시스쿠 성당)": "Capela dos Ossos, Évora",
  "지랄두 광장 자유시간 · 알렌테주 평원 드라이브": "Praça do Giraldo, Évora",
  "시각은 각 나라 현지 시각 기준 (포르투갈은 스페인보다 1시간 늦어요)": "",
  "최소 인원 미달 시 예약금 100% 환불": ""
 },
 "car-madrid-toledo-segovia-day": {
  "08:30 마드리드 출발 · 19:30 마드리드 도착(예정)": "",
  "톨레도 대성당 · 산토토메 성당 (엘 그레코 명작)": "Catedral Primada de Toledo",
  "톨레도 구시가지 골목 · 전망대에서 보는 톨레도 전경": "Mirador del Valle, Toledo",
  "세고비아 로마 수도교 · 알카사르 (유네스코 세계유산)": "Acueducto de Segovia",
  "세고비아 대성당 · 마요르 광장 자유시간": "Catedral de Segovia",
  "최소 인원 미달 시 예약금 100% 환불": ""
 },
 "north-spain-7days-madrid": {
  "라 리오하 와이너리 — 스페인 대표 와인 산지": "Logroño, La Rioja",
  "산세바스티안 라 콘차 해변 · 구시가지 저녁 산책": "Playa de La Concha, San Sebastián",
  "빌바오 구겐하임 미술관 — 입장 포함": "Museo Guggenheim Bilbao",
  "산티야나 델 마르 중세 마을 · 코미야스 가우디의 엘 카프리초": "Santillana del Mar",
  "피코스 데 에우로파 — 푸엔테 데 케이블카 · 코바동가 성지와 호수": "Teleférico de Fuente Dé",
  "카테드랄레스 해변 (간조 때 걷는 바위 아치)": "Praia das Catedrais",
  "산티아고 데 콤포스텔라 대성당 · 땅끝 피니스테레": "Catedral de Santiago de Compostela",
  "레온 대성당 · 가우디의 카사 보티네스": "Catedral de León"
 },
 "castilla-valladolid-6days-madrid": {
  "바야돌리드 구시가지 — 마요르 광장 · 산 파블로 성당 · 국립조각미술관": "Plaza Mayor de Valladolid",
  "올메도 — 무데하르 양식 성당이 남은 성벽 마을": "Olmedo, Valladolid",
  "아리베스 델 두에로 협곡 유람선 (스페인 · 포르투갈 국경)": "Cruzeiro Ambiental Arribas do Douro, Miranda do Douro",
  "토로 와이너리 방문 · 시음 (D.O. 토로)": "Colegiata de Santa María la Mayor, Toro",
  "메디나 데 리오세코 아케이드 거리": "Calle Mayor, Medina de Rioseco"
 },
 "costa-brava-france-6days-barcelona": {
  "가로차 화산 자연공원 · 현무암 절벽 마을 카스텔폴리트 데 라 로카": "Castellfollit de la Roca",
  "베살루 — 중세 돌다리와 유대인 지구": "Pont Vell de Besalú",
  "남프랑스 나르본 — 대성당 · 로마 시대 도미티아 가도": "Cathédrale Saint-Just-et-Saint-Pasteur de Narbonne"
 },
 "galicia-costa-da-morte-6days-madrid": {
  "페롤 해군 박물관": "Museo Naval de Ferrol",
  "부뇨 도자기 마을": "Ecomuseo Forno do Forte, Buño",
  "에사로 폭포 — 바다로 떨어지는 폭포": "Fervenza do Ézaro",
  "카마리냐스 레이스 마을": "Faro de Cabo Vilán, Camariñas",
  "보르네이로 카스트로 · 돔바테 고인돌": "Castro de Borneiro",
  "빔비안소 성": "Castelo de Vimianzo"
 },
 "white-towns-morocco-6days-madrid": {
  "베헤르 데 라 프론테라 — 언덕 위 성벽 하얀 마을": "Vejer de la Frontera",
  "아르코스 데 라 프론테라 — 절벽 위 구시가지 · 파요요 치즈 시식": "Mirador de la Peña Nueva, Arcos de la Frontera",
  "메디나 시도니아 언덕 마을": "Medina-Sidonia",
  "타리파 → 탕헤르 페리로 지브롤터 해협 건너기": "Puerto de Tarifa",
  "탕헤르 카스바 · 메디나": "Kasbah Museum, Tangier",
  "테투안 메디나 (세계유산)": "Medina of Tétouan",
  "셰프샤우엔 — 푸른 골목 마을": "Plaza Outa el Hammam, Chefchaouen",
  "세우타 아프리카 성모 성당 · 왕실 성벽": "Santuario de Nuestra Señora de África, Ceuta"
 },
 "spain-football-7days-barcelona": {
  "라리가 경기 관람 — 아틀레티코 마드리드 vs 레반테 (메트로폴리타노 경기장)": "Estadio Riyadh Air Metropolitano",
  "바르셀로나 → 마드리드 고속철도(AVE) 약 2시간 30분": "",
  "제6일 바르셀로나 전일 자유시간 (체크아웃 후 짐 보관)": "Barrio Gótico, Barcelona"
 },
 "sevilla-costa-de-la-luz-7days-madrid": {
  "세비야 대성당 · 히랄다 탑 (세계유산)": "Catedral de Sevilla",
  "레알 알카사르 (세계유산) — 무데하르 양식 궁전과 정원": "Real Alcázar de Sevilla",
  "스페인 광장 · 산타 크루스 지구": "Plaza de España, Sevilla",
  "헤레스 셰리 와이너리 방문 · 시음": "Bodegas Tío Pepe, Jerez de la Frontera",
  "카디스 대성당 · 라 칼레타 해변": "Catedral de Cádiz",
  "베헤르 데 라 프론테라 — 언덕 위 하얀 마을": "Vejer de la Frontera",
  "바엘로 클라우디아 로마 유적 · 볼로니아 사구 해변": "Conjunto Arqueológico de Baelo Claudia",
  "타리파 — 유럽 대륙 최남단": "Castillo de Guzmán el Bueno, Tarifa",
  "아르코스 데 라 프론테라 — 절벽 위 하얀 마을": "Mirador de la Peña Nueva, Arcos de la Frontera",
  "론다 누에보 다리 · 투우장": "Puente Nuevo, Ronda"
 }
};

/* products.js 의 PRODUCTS 배열만 읽습니다 (10분마다 새로) */
let 상품표 = null, 읽은때 = 0;
async function 상품들(origin) {
  if (상품표 && Date.now() - 읽은때 < 10 * 60 * 1000) return 상품표;
  const code = await (await fetch(origin + "/products.js?v=" + Date.now())).text();
  const s = code.search(/(const|var|let)\s+PRODUCTS\s*=\s*\[/);
  if (s < 0) throw new Error("PRODUCTS 를 찾지 못함");
  const a = code.indexOf("[", s), e = code.indexOf("\n];", a);
  const arr = vm.runInNewContext("(" + code.slice(a, e + 2) + ")", {}, { timeout: 1000 });
  const m = new Map();
  (Array.isArray(arr) ? arr : []).forEach(p => { if (p && p.id) m.set(String(p.id), p); });
  상품표 = m; 읽은때 = Date.now();
  return m;
}

export default async (req) => {
  const key = process.env.GOOGLE_PLACES_KEY;
  if (!key) return J({ error: "nokey" }, 503);

  const u = new URL(req.url);
  const pid = u.searchParams.get("p") || "";
  const i = parseInt(u.searchParams.get("i"), 10);
  if (!/^[a-z0-9-]{1,80}$/.test(pid) || !(i >= 0 && i < 40)) return J({ error: "unknown" }, 404);

  let p;
  try { p = (await 상품들(u.origin)).get(pid); } catch (e) { return J({ error: "list" }, 502); }
  const 줄들 = p && p.detail && Array.isArray(p.detail.highlights) ? p.detail.highlights : null;
  if (!줄들 || i >= 줄들.length) return J({ error: "unknown" }, 404);

  /* 검색어 정하기 — 직접 적어 둔 것이 있으면 그것 */
  const 직접 = p.detail.사진검색어;
  let q;
  const 표 = 직접표[pid];
  if (Array.isArray(직접) && 직접[i] !== undefined && 직접[i] !== null) q = String(직접[i]).trim();
  else if (표 && Object.prototype.hasOwnProperty.call(표, 줄들[i])) q = String(표[줄들[i]]).trim();
  else q = (상품제외.test(pid) || 줄제외.test(줄들[i])) ? "" : 검색어(줄들[i]);
  if (!q || q.length < 2) return J({ skip: true }, 200, "public, max-age=3600");

  const H = { "X-Goog-Api-Key": key };
  let st = null, place = null;
  try { st = getStore("euforia-spot-place"); place = await st.get(q); } catch (e) { /* 저장소 없이도 찾기는 됩니다 */ }

  try {
    if (!place) {
      const r = await fetch("https://places.googleapis.com/v1/places:searchText", {
        method: "POST",
        headers: { ...H, "Content-Type": "application/json", "X-Goog-FieldMask": "places.id" },
        body: JSON.stringify({
          textQuery: q, languageCode: "ko", maxResultCount: 1,
          locationRestriction: { rectangle: { low: { latitude: 35.0, longitude: -9.8 }, high: { latitude: 44.2, longitude: 3.6 } } },
        }),
      });
      const d = await r.json();
      if (d && d.error) { console.error("[spot-photo] 검색 오류:", d.error.status, d.error.message); return J({ error: "google" }, 502); }
      place = d.places && d.places[0] && d.places[0].id;
      if (!place) return J({ skip: true, q }, 200, "public, max-age=3600");
      try { if (st) await st.set(q, place); } catch (e) { /* 다음에 다시 찾으면 됩니다 */ }
    }

    const r = await fetch("https://places.googleapis.com/v1/places/" + encodeURIComponent(place) + "?languageCode=ko", {
      headers: { ...H, "X-Goog-FieldMask": "displayName,googleMapsUri,photos" },
    });
    const d = await r.json();
    if (d && d.error) { console.error("[spot-photo] 상세 오류:", d.error.status, d.error.message); return J({ error: "google" }, 502); }
    const x = (d.photos || [])[0];
    if (!x) return J({ skip: true, q }, 200, "private, max-age=1800");

    const m = await fetch("https://places.googleapis.com/v1/" + x.name + "/media?maxWidthPx=1200&skipHttpRedirect=true", { headers: H });
    const j = await m.json();
    if (!j.photoUri) return J({ skip: true, q }, 200, "private, max-age=1800");

    return J({
      q,
      name: (d.displayName && d.displayName.text) || "",
      maps: d.googleMapsUri || "",
      photo: { u: j.photoUri, a: (x.authorAttributions || []).map(a => ({ n: a.displayName || "", u: a.uri || "" })) },
    }, 200, "private, max-age=1800");
  } catch (e) {
    console.error("[spot-photo] 실패:", e && e.message);
    return J({ error: "fail" }, 502);
  }
};
