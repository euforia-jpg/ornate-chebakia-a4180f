/*
  ===========================================================
  유포리아투어 여행상품 데이터
  -----------------------------------------------------------
  이 배열의 내용만 수정하면 tours.html(상품 목록), index.html(홈 추천 상품),
  product.html(상품 상세) 화면이 자동으로 업데이트돼요.
  카드를 추가/삭제하려면 아래 객체를 복사해서 늘리거나 지우면 됩니다.
  ===========================================================
*/
const PRODUCTS = [
  {
    id: 'madrid-toledo-day',
    cats: ['spain', 'transfer'],
    topClass: 'spain',
    region: '차량 & 기사',
    days: '당일 (09:00~17:00)',
    price: '1인 80유로 (4인 이상 출발 기준)',
    minPeople: 4,
    maxPeople: 30,
    youtubeUrl: 'https://www.youtube.com/watch?v=GbQPQytLq74',
    audioGuide: [
      { name: '톨레도 대성당', url: '/audio/madrid-toledo-sample.mp3', lat: 39.8578, lng: -4.0273, yt: 'odJZqZPfMcg' },
      { name: '산토토메', url: '/audio/toledo-santotome.mp3', lat: 39.8567, lng: -4.0298, yt: '' },
      { name: '톨레도 대성당 정식판 1부 — 800년의 시간', url: '/audio/toledo-cathedral-full-1.mp3', lat: 39.8578, lng: -4.0273, yt: 'odJZqZPfMcg' },
      { name: '톨레도 대성당 정식판 2부 — 트란스파렌테의 기적', url: '/audio/toledo-cathedral-full-2.mp3', lat: 39.8578, lng: -4.0273, yt: 'odJZqZPfMcg' },
    ],
    title: '[일일차량 가이드] 마드리드 · 톨레도 · 마드리드',
    summary: '마드리드에서 출발해 유네스코 세계문화유산 도시 톨레도를 둘러보고 당일에 돌아오는 프라이빗 차량 투어예요.',
    tags: ['당일 투어', '프라이빗 차량', '한국인 기사 동행'],
    detail: {
    lead: '09:00 마드리드 아토차역 출발, 톨레도에서 약 6시간 관광 후 17:00경 마드리드로 돌아오는 프리미엄 당일 차량 투어예요.',
      description: '09:00 마드리드 아토차 기차역 출발, 유네스코 세계문화유산 도시 톨레도에서 약 4시간 동안 톨레도 대성당 관람, 산토 토메(엘 그레코 명작 감상), 톨레도 골목 자유시간을 즐겨요. 17:00경 마드리드 아토차 기차역 도착으로 일정이 마무리돼요. 중식은 자유시간 중 각자 해결하시면 돼요 (불포함). 한국인 기사가 전 일정 동행하며, 인원에 따라 프라이빗 밴(4~6인), 스프린터 차량(7~15인), 전용 버스(15~30인) 중 배정돼요. 확정일 기준 예약 인원이 4인 미만이면 예약금을 100% 환불해 드려요. 확정 안내는 일정 시작 2주 전까지 문자로 연락드리며, 미팅 장소는 미정이라 확정 후 개별 공지해 드리니 예약 시 숙박하시는 호텔 주소를 함께 알려주세요.',
      highlights: ['09:00 마드리드 출발 · 17:00 마드리드 도착(예정)', '톨레도 대성당 관람', '산토토메 (엘 그레코 명작)', '톨레도 구시가지 골목 자유시간', '최소 인원 미달 시 예약금 100% 환불'],
      includes: ['전용 차량', '유류비', '통행료', '주차비', '한국인 기사 서비스'],
      excludes: ['입장료', '식사', '가이드(옵션, 별도 문의)', '개인경비'],
      duration: '당일 (약 8시간 소요, 09:00 출발 · 17:00 도착 예정)'
    }
  },
  {
    id: 'docent-museum',
    cats: ['spain'],
    topClass: 'camino',
    region: '도슨트',
    days: '반나절',
    price: '가격 문의',
    audioGuide: [
 { name: '1부 — 그림 속의 그림, 시녀들', url: '/audio/prado-1-meninas.mp3', bg: '/audio/bg-prado-piano.mp3', lat: 40.4138, lng: -3.6921, yt: '3tUN9rq2MyU' },
{ name: '2부 — 전쟁의 참혹함, 1808년 5월 3일', url: '/audio/prado-2-tresmayo.mp3', bg: '/audio/bg-prado-piano.mp3', lat: 40.4138, lng: -3.6921, yt: 'JfLrdnL1pHM' },
{ name: '3부 — 고야의 어두운 걸작, 아들을 삼키는 사투르누스', url: '/audio/prado-3-saturno.mp3', bg: '/audio/bg-prado-piano.mp3', lat: 40.4138, lng: -3.6921, yt: 'xD7dXIzPVrc' },
{ name: '4부 — 상상력의 끝판왕, 세속적 쾌락의 동산', url: '/audio/prado-4-jardin.mp3', bg: '/audio/bg-prado-piano.mp3', lat: 40.4138, lng: -3.6921, yt: '-CHyk7gAli8' },
{ name: '5부 — 스페인 최대의 미술 스캔들, 마하 두 점', url: '/audio/prado-5-maja.mp3', bg: '/audio/bg-prado-piano.mp3', lat: 40.4138, lng: -3.6921, yt: '8CmyGenw7tQ' },
{ name: '6부 — 엘 그레코, 가슴에 손을 얹은 기사', url: '/audio/prado-6-caballero.mp3', bg: '/audio/bg-prado-piano.mp3', lat: 40.4138, lng: -3.6921, yt: '7cKbY4_mQXk' },
{ name: '7부 — 눈물의 명작, 십자가에서 내려지는 그리스도', url: '/audio/prado-7-descendimiento.mp3', bg: '/audio/bg-prado-piano.mp3', lat: 40.4138, lng: -3.6921, yt: 'KdQRjgvqxwg' },
{ name: '8부 — 왕실을 향한 우아한 조롱, 카를로스 4세의 가족', url: '/audio/prado-8-familia.mp3', bg: '/audio/bg-prado-piano.mp3', lat: 40.4138, lng: -3.6921, yt: 'eC3-4vrZP_k' },
{ name: '9부 — 독일 르네상스의 자존심, 아담과 이브', url: '/audio/prado-9-adaneva.mp3', bg: '/audio/bg-prado-piano.mp3', lat: 40.4138, lng: -3.6921, yt: '' },],
    title: '[도슨트] 프라도 & 레이나소피아 미술관',
    summary: '마드리드 프라도 미술관과 레이나소피아 미술관을 한국어 도슨트와 함께 깊이 있게 둘러보는 투어예요.',
    tags: ['한국어 도슨트', '미술관 관람'],
    detail: {
      lead: '벨라스케스와 고야부터 피카소 게르니카까지, 도슨트 설명과 함께 스페인 미술의 정수를 만나보세요.',
      description: '작품을 그냥 지나치기 아쉬운 프라도 미술관과 레이나소피아 미술관을, 배경 지식이 풍부한 전문 가이드(한국어 도슨트)와 함께 관람해요. 두 미술관 입장권도 포함되어 있어 별도로 예매하지 않으셔도 돼요. 미술사에 익숙하지 않아도 편하게 즐길 수 있도록 눈높이에 맞춰 설명해 드려요.',
      highlights: ['프라도 미술관 주요 소장품 해설', '레이나소피아 · 게르니카 관람', '작품별 배경 스토리 설명', '자유 관람 시간 포함'],
      includes: ['전문 가이드(한국어 도슨트) 동행', '입장권 (프라도 · 레이나소피아)'],
      excludes: ['교통비', '개인경비'],
      duration: '반나절 (약 3~4시간)'
    }
  },
  {
    id: 'portugal-round',
    cats: ['portugal'],
    topClass: 'portugal',
    region: 'PORTUGAL',
    youtubeUrl: 'https://www.youtube.com/watch?v=Tgze0G4HF5w',
    days: '5박 6일',
    price: '1인 1870 유로',
    title: '[포르투갈 완전일주] 리스본 2박 + 포르투 3박/ 5박 6일',
    summary: '낭만과 감성이 공존하는 포르투갈, 리스본 2박과 포르투 3박으로 완전일주하는 5박 6일 패키지예요. 전 일정 4성급 호텔, 전용차량과 전문 가이드가 함께해요.',
    tags: ['5박 6일', '전 일정 가이드 동행', '4성급 호텔'],
    detail: {
      lead: '인천에서 출발해 리스본 2박, 포르투 3박으로 포르투갈을 완전일주하는 5박 6일 코스예요. 전 일정 4성급 호텔과 전용차량, 전문 가이드가 함께해요.',
      description: '<div style="display:flex; gap:10px; margin-bottom:14px;"><strong style="flex:0 0 auto;">DAY1</strong><span>인천 국제공항 출발(KE921) 후 리스본 도착, 픽업 차량으로 호텔 이동.</span></div><div style="display:flex; gap:10px; margin-bottom:14px;"><strong style="flex:0 0 auto;">DAY2</strong><span>리스본 시내 가이드 투어 — 아우구스타 개선문 거리, 알파마 지구 도보 투어, 포르타스 두 솔 전망대, 리스본 대성당.</span></div><div style="display:flex; gap:10px; margin-bottom:14px;"><strong style="flex:0 0 auto;">DAY3</strong><span>신트라 페나 궁전, 호카곶(유라시아 대륙 서쪽 끝), 카스카이스를 거쳐 포르투로 이동.</span></div><div style="display:flex; gap:10px; margin-bottom:14px;"><strong style="flex:0 0 auto;">DAY4</strong><span>오전 자유시간 후 포르투 시내 관광 & 야경투어 — 클레리고스 성당과 타워, 렐루 서점, 카르무 성당, 상벤투 기차역, 동 루이스 1세 다리, 하베이라 항구.</span></div><div style="display:flex; gap:10px; margin-bottom:14px;"><strong style="flex:0 0 auto;">DAY5</strong><span>포르투 자유일정(상벤투 기차역 앞 산타 카타리나 쇼핑거리, 하베이라 광장).</span></div><div style="display:flex; gap:10px; margin-bottom:14px;"><strong style="flex:0 0 auto;">DAY6</strong><span>오전 자유시간 후 포르투역에서 열차로 리스본 이동(약 3시간~3시간 30분 소요), 리스본역 도착 후 픽업 차량으로 공항 이동, 저녁 리스본 출발(KE922).</span></div><div style="display:flex; gap:10px;"><strong style="flex:0 0 auto;">DAY7</strong><span>인천 국제공항 도착(19:15).</span></div>',
      highlights: ['리스본 2박 + 포르투 3박, 완전일주 5박 6일', '전 일정 4성급 호텔 · 전용차량 · 전문 가이드 동행', '신트라 페나 궁전 · 호카곶 · 카스카이스 경유', '포르투 야경투어 (동 루이스 다리 · 하베이라 항구)'],
      includes: ['전 일정 숙박 (4성급 호텔)', '전용차량 및 전용 가이드', '일정상 명시된 식사', '일정상 명시된 관광지 입장료', '가이드 & 기사 경비'],
      excludes: ['국제선 항공', '유류할증료', '개인경비', '매너팁', '여행자보험'],
      duration: '5박 6일 (2026년 출발, 최소 4인 기준 · 일정은 항공 및 현지 사정에 따라 변경될 수 있어요)'
    }
  },
  {
    id: 'spain-round',
    cats: ['spain'],
    topClass: 'spain',
    region: 'SPAIN',
    days: '5박 6일',
    price: '가격 문의',
    title: '[스페인 일주] 5박6일 바르셀로나 & 스페인남부',
    summary: '바르셀로나에서 스페인 남부까지, 대표 도시를 잇는 5박6일 일주 코스예요.',
  tags: ['5박 6일', '자유일정 가능'],
    audioGuide: [
    { name: '사그라다 파밀리아 1부 — 144년의 역사', url: '/audio/sagrada-familia-1.mp3', bg: '/audio/bg-sagrada-organ-choir.mp3', bgVolume: 0.10, lat: 41.4036, lng: 2.1744, yt: 'VCM3tho_PFQ' },
{ name: '사그라다 파밀리아 2부 — 세 개의 파사드', url: '/audio/sagrada-familia-2.mp3', bg: '/audio/bg-sagrada-organ-choir.mp3', bgVolume: 0.10, lat: 41.4036, lng: 2.1744, yt: 'KqMD2RBqUxA' },
      { name: '구엘 공원 1부 — 동화 속 공원의 탄생', url: '/audio/park-guell-1.mp3', lat: 41.4145, lng: 2.1527, yt: 'Rk9UM6Dv-0w' },
{ name: '구엘 공원 2부 — 숨겨진 정수 시스템과 벤치', url: '/audio/park-guell-2.mp3', lat: 41.4145, lng: 2.1527, yt: '' },
      { name: '알함브라 궁전 1부 — 붉은 성의 흥망성쇠', url: '/audio/alhambra-1.mp3', bg: '/audio/bg-guitar-alhambra.mp3', lat: 37.1760, lng: -3.5986, yt: '5dwYDPhM_qg' },
      { name: '알함브라 궁전 2부 — 나스르 궁전', url: '/audio/alhambra-2.mp3', bg: '/audio/bg-guitar-alhambra.mp3', lat: 37.1760, lng: -3.5986, yt: 'Ht15kRbXFsk' },
      { name: '알함브라 궁전 3부 — 헤네랄리페 정원', url: '/audio/alhambra-3.mp3', bg: '/audio/bg-guitar-alhambra.mp3', lat: 37.1760, lng: -3.5986, yt: 'tz1STsTltVc' },
      { name: '세비야 대성당 1부 — 세계에서 가장 큰 고딕 성당', url: '/audio/seville-cathedral-1.mp3', lat: 37.3860, lng: -5.9926, yt: '' },
      { name: '세비야 대성당 2부 — 콜럼버스의 무덤과 히랄다 탑', url: '/audio/seville-cathedral-2.mp3', lat: 37.3860, lng: -5.9926, yt: '' },
      { name: '마드리드 왕궁 1부 — 유럽 최대 왕궁의 탄생', url: '/audio/madrid-palace-1.mp3', lat: 40.4180, lng: -3.7143, yt: '' },
      { name: '마드리드 왕궁 2부 — 왕좌의 방과 화려함', url: '/audio/madrid-palace-2.mp3', lat: 40.4180, lng: -3.7143, yt: '' },
      { name: '마드리드 왕궁 3부 — 숨겨진 특별한 보물', url: '/audio/madrid-palace-3.mp3', lat: 40.4180, lng: -3.7143, yt: '' },
    ],
    detail: {
      lead: '가우디의 도시 바르셀로나부터 플라멩코의 본고장 남부 안달루시아까지 이어지는 코스예요.',
      description: '바르셀로나 사그라다 파밀리아·구엘 공원 관람 후 사라고사를 경유해 마드리드, 이어서 그라나다·세비야 등 스페인 남부 도시까지 둘러보는 일정이에요. 인원과 관심사에 맞춰 자유일정으로도 조정할 수 있어요.',
      highlights: ['바르셀로나 사그라다 파밀리아 · 구엘 공원', '그라나다 알함브라 궁전', '세비야 대성당 · 플라멩코 공연', '도시 간 전체 이동 지원'],
      includes: ['프라이빗 차량 및 기사', '숙소 조식', '전체 일정 사전 설계 상담'],
      excludes: ['왕복 항공권', '개인 경비', '여행자 보험'],
      duration: '5박 6일 (자유일정 옵션 가능)'
    }
  },
  {
  id: 'camino-100',
    cats: ['camino'],
    topClass: 'camino',
    region: 'CAMINO',
    days: '5박 6일',
    price: '가격 문의',
    youtubeUrl: 'https://youtu.be/ZijzHwq23qU',
    title: '[순례길 100km] 투이 → 산티아고 데 콤포스텔라',
    summary: '위로와 치유의 길, 유포리아투어와 함께 투이에서 산티아고 데 콤포스텔라까지 6일간 걷는 입문자 추천 순례길 코스예요.',
    tags: ['초보자 추천', '짐 이동 지원'],
    detail: {
      lead: '바다와 산, 마을과 사람을 만나며 삶의 속도를 내려놓고 진짜 나를 만나는 시간 — 리스본 또는 포르투에서 투이까지 이동한 뒤, 콤포스텔라 인증 최소 거리 구간을 6일 동안 함께 걸어요.',
      description: '<div style="display:flex; gap:10px; margin-bottom:14px;""><strong style="flex:0 0 auto;">DAY1</strong><span>투이(Tui) → 오 포리뇨(O Porriño) 약 16km 도보.</span></div><div style="display:flex; gap:10px; margin-bottom:14px;"><strong style="flex:0 0 auto;">DAY2</strong><span>오 포리뇨 → 레돈델라(Redondela) 약 16km 도보.</span></div><div style="display:flex; gap:10px; margin-bottom:14px;"><strong style="flex:0 0 auto;">DAY3</strong><span>레돈델라 → 폰테베드라(Pontevedra) 약 21km 도보.</span></div><div style="display:flex; gap:10px; margin-bottom:14px;"><strong style="flex:0 0 auto;">DAY4</strong><span>폰테베드라 → 칼다스 데 레이스(Caldas de Reis) 약 22km 도보.</span></div><div style="display:flex; gap:10px; margin-bottom:14px;"><strong style="flex:0 0 auto;">DAY5</strong><span>칼다스 데 레이스 → 파드론(Padrón) 약 19km 도보.</span></div><div style="display:flex; gap:10px;"><strong style="flex:0 0 auto;">DAY6</strong><span>파드론 → 산티아고 데 콤포스텔라 대성당 약 25km 도보로 완주.</span></div>',
      highlights: ['투이 → 오 포리뇨 → 레돈델라 → 폰테베드라 → 칼다스 데 레이스 → 파드론 → 산티아고 데 콤포스텔라', '하루 평균 20km 내외, 6일간 총 약 119km 도보', '아름다운 해안길과 중세 마을 탐방', '현지 특식 & 와인으로 즐거운 여정', '전문 인솔자 전 일정 동행'],
      includes: ['전 일정 인솔자 동행', '구간별 숙소 예약 지원', '매일 짐 이동 서비스',],
      excludes: ['왕복 항공권', '식비', '개인 순례 장비'],
      duration: '5박 6일 (약 119km, 하루 평균 20km 내외 도보)'
    }
  },
  {
    id: 'car-madrid-puertolapice-granada',
    cats: ['spain', 'transfer'],
    topClass: 'spain',
    region: '차량 & 기사',
    days: '편도 이동',
    price: '1인 170유로 (4인 이상 출발 기준)',
    minPeople: 4,
    maxPeople: 30,
    youtubeUrl: 'https://www.youtube.com/watch?v=ChjF3MBtIDo',
    title: '[차량 & 기사] 마드리드 – 푸에르토 라피세 – 그라나다',
    summary: '마드리드 아토차역에서 돈키호테 마을 푸에르토 라피세를 들러 그라나다까지, 프라이빗 차량과 한국인 기사가 편하게 모셔다드려요.',
    tags: ['프라이빗 차량', '돈키호테 마을 경유'],
    detail: {
      lead: '09:00 마드리드 아토차역 출발, 돈키호테 마을 푸에르토 라피세에서 2시간 자유관광 후 18:00경 그라나다 도착 — 전 일정 한국인 기사가 동행하는 프라이빗 이동 투어예요.',
      description: '마드리드 아토차역(Puerta de Atocha – Almudena Grandes)에서 출발해 라만차 지방의 작은 마을 푸에르토 라피세(Puerto Lápice)에서 약 2시간 자유관광을 즐긴 뒤, 그라나다 기차역에 도착하는 일정이에요. 푸에르토 라피세는 소설 《돈키호테》에서 주인공이 기사 작위를 받은 곳으로 유명한 문학 여행지로, 돈키호테가 묵었던 것으로 묘사된 여관(Venta de Don Quijote)과 기념품점, 돈키호테·산초 판사 관련 동상과 벽화를 볼 수 있는 소박하고 조용한 마을이에요. 전 일정 한국인 기사가 동행하며, 25인승 이상 차량 이용 시에는 한국인 인솔자도 함께해요. 인원에 따라 9인승 프라이빗 밴(4-6인), 25인승 스프린터(7-15인), 45인승 버스(15-30인) 중 배정돼요. 미팅 장소는 미정이며 확정 후 개별 공지해 드리니, 예약 시 숙박하시는 호텔 주소를 함께 알려주세요.',
      highlights: ['09:00 마드리드 아토차역 출발 · 18:00 그라나다역 도착(예정)', '푸에르토 라피세(돈키호테 마을) 약 2시간 자유관광', '전 일정 한국인 기사 동행 (25인승 이상은 인솔자 동행)', '인원별 9인승 밴 · 25인승 스프린터 · 45인승 버스 배정'],
      includes: ['차량', '기사', '유류세', '통행료'],
      excludes: ['호텔', '식사', '입장권', '개인경비'],
      duration: '약 9시간 (09:00 출발 · 18:00 도착 예정)'
    }
  },
  {
    id: 'car-granada-cordoba-madrid',
    cats: ['spain', 'transfer'],
    topClass: 'spain',
    region: '차량 & 기사',
    days: '당일 (07:30~18:00)',
    price: '1인 170유로 (4인 이상 출발 기준)',
    minPeople: 4,
    maxPeople: 30,
    title: '[차량 & 기사] 그라나다 – 꼬르도바 – 마드리드',
    summary: '그라나다에서 꼬르도바를 경유해 마드리드까지, 하루 만에 세 도시를 편안하게 둘러보는 프리미엄 당일 차량투어예요. 한국인 기사가 동행해요.',
    tags: ['프라이빗 차량', '한국인 기사 동행'],
    detail: {
      lead: '07:30 그라나다 출발, 유네스코 세계문화유산 도시 꼬르도바를 들러 18:00경 마드리드에 도착하는 프리미엄 당일 차량투어예요. 한국인 기사가 전 일정 함께해요.',
      description: '그라나다 호텔 또는 지정 장소에서 07:30 출발해, 이슬람과 기독교 문화가 공존하는 유네스코 세계문화유산 도시 꼬르도바를 들른 뒤 18:00경 마드리드에 도착하는 일정이에요. 꼬르도바에서는 850여 개의 이중 아치형 기둥이 장관을 이루는 메스키타 대성당(원래 이슬람 사원 자리에 성당이 세워진 독특한 구조)을 관람하고, 로마 다리·유대인 지구(꽃의 길) 등이 모여 있는 구시가지를 자유시간 동안 도보로 둘러볼 수 있어요. 한국인 기사가 전 일정 동행하며, 인원에 따라 프라이빗 밴(4-6인), 스프린터 차량(7-15인), 전용 버스(15-30인) 중 배정돼요. 미팅 장소는 미정이며 확정 후 개별 공지해 드리니, 예약 시 숙박하시는 호텔 주소를 함께 알려주세요.',
      highlights: ['07:30 그라나다 출발 · 18:00 마드리드 도착(예정)', '꼬르도바 메스키타 대성당 관람 (유네스코 세계문화유산)', '로마 다리 · 유대인 지구(꽃의 길) 자유시간', '한국인 기사 전 일정 동행', '인원별 프라이빗 밴 · 스프린터 · 전용 버스 배정'],
      includes: ['전용 차량', '유류비', '주차비', '한국인 기사 서비스'],
      excludes: ['입장료', '식사', '가이드(옵션, 별도 문의)', '개인경비'],
      duration: '당일 (약 10~11시간 소요, 07:30 출발 · 18:00 도착 예정)'
    }
  },
  {
    id: 'car-bilbao-burgos-madrid',
    cats: ['spain', 'transfer'],
    topClass: 'spain',
    region: '차량 & 기사',
    days: '당일 (08:00~18:00)',
    price: '1인 180유로 (4인 이상 출발 기준)',
    minPeople: 4,
    maxPeople: 30,
    title: '[차량 & 기사] 빌바오 – 부루고스 – 마드리드',
    summary: '바스크의 예술과 미식 도시 빌바오에서 천년 고도 부루고스를 들러 마드리드까지, 하루 만에 세 도시를 편안하게 둘러보는 프리미엄 당일 차량투어예요. 마드리드 ↔ 빌바오 양방향으로 운행돼요.',
    tags: ['프라이빗 차량', '한국인 기사 동행'],
    detail: {
      lead: '08:00 출발, 유네스코 세계문화유산 도시 부루고스에서 자유관광 후 18:00경 도착하는 프리미엄 당일 차량투어예요. 빌바오 → 마드리드, 마드리드 → 빌바오 양방향 모두 예약 가능해요.',
      description: '빌바오(또는 마드리드) 기차역 · 지정 장소에서 08:00 출발해, 중세의 숨결이 살아있는 고도 부루고스에서 자유관광을 즐긴 뒤 18:00경 마드리드(또는 빌바오) 목적지에 도착하는 일정이에요. 부루고스는 도시 전체에서 유일하게 단독으로 유네스코 세계문화유산에 등재된 부루고스 대성당(스페인 영웅 엘 시드의 무덤이 있는 고딕 양식 성당)이 핵심 명소이고, 대성당 바로 앞 산타 마리아 문과 언덕 위 부루고스 성 전망대까지 도보로 둘러볼 수 있어요. 한국인 기사가 전 일정 동행하며, 인원에 따라 프라이빗 밴(4-6인), 스프린터 차량(7-15인), 전용 버스(15-30인) 중 배정돼요. 한국어·영어·스페인어 가능한 기사를 사전 요청할 수 있고, 확정일 기준 예약 인원이 4인 미만이면 예약금을 100% 환불해 드려요. 확정 안내는 일정 시작 2주 전까지 문자로 연락드리며, 미팅 장소는 미정이라 확정 후 개별 공지해 드리니 예약 시 숙박하시는 호텔 주소를 함께 알려주세요.',
      highlights: ['08:00 출발 · 18:00 도착(예정), 빌바오↔마드리드 양방향 운행', '부루고스 대성당 관람 (유네스코 세계문화유산, 엘 시드의 무덤)', '산타 마리아 문 · 부루고스 성 전망대 자유시간', '한국어 · 영어 · 스페인어 가능 기사 사전 요청 가능', '최소 인원 미달 시 예약금 100% 환불'],
      includes: ['전용 차량', '유류비', '통행료', '주차비', '한국인 기사 서비스'],
      excludes: ['입장료', '식사', '가이드(옵션, 별도 문의)', '개인경비'],
      duration: '당일 (약 10시간 소요, 08:00 출발 · 18:00 도착 예정)'
    }
  },
  {
    id: 'car-madrid-burgos-bilbao',
    cats: ['spain', 'transfer'],
    topClass: 'spain',
     region: '차량 & 기사',
    days: '당일 (08:00~18:00)',
    price: '1인 180유로 (4인 이상 출발 기준)',
    minPeople: 4,
    maxPeople: 30,
    title: '[차량 & 기사] 마드리드 – 부르고스 – 빌바오',
    summary: '마드리드에서 부르고스를 경유해 빌바오까지, 프라이빗 차량과 기사가 편하게 모셔다드려요.',
    tags: ['프라이빗 차량', '경유지 관광 가능'],
    detail: {
      lead: '부르고스에 들러 짧게 둘러볼 시간도 가질 수 있는 마드리드 → 빌바오 프라이빗 이동이에요.',
      description: '짐이 많아도 환승 걱정 없이 프라이빗 차량으로 마드리드에서 빌바오까지 이동해요. 기사님이 지정된 시간과 장소로 픽업하며, 원하실 경우 경유 도시에서 짧게 관광 시간을 가질 수 있어요.',
      highlights: ['마드리드 숙소 픽업', '부르고스 경유 관광 시간', '빌바오 목적지 드롭', '기사 겸 가이드 옵션 문의 가능'],
      includes: ['프라이빗 차량 및 기사', '미팅 장소 · 시간 사전 안내'],
      excludes: ['경유지 입장료', '식비', '숙박비'],
      duration: '편도 이동 (구간에 따라 3~7시간대)'
    }
  },
  {
    id: 'car-lisbon-merida-madrid',
    cats: ['spain', 'portugal', 'transfer'],
    topClass: 'iberia',
    region: '차량 & 기사',
    days: '당일 (08:00~18:00)',
    price: '1인 193유로 (4인 이상 출발 기준)',
    minPeople: 4,
    maxPeople: 30,
    title: '[차량 & 기사] 리스본 – 메리다 – 마드리드',
    summary: '리스본에서 출발해 고대 로마 유적의 도시 메리다를 여유롭게 둘러보고 스페인의 수도 마드리드까지 편안하게 이동하는 프리미엄 당일 차량투어예요.',
    tags: ['프라이빗 차량', '한국인 기사 동행'],
    detail: {
      lead: '08:00 리스본 출발, 유네스코 세계문화유산 도시 메리다에서 로마 유적 자유관광 후 18:00경 마드리드에 도착하는 프리미엄 당일 차량투어예요.',
      description: '리스본 기차역 또는 지정 장소에서 08:00 출발해, 고대 로마 제국 루시타니아 주의 수도였던 메리다에서 로마 극장, 로마 원형 경기장, 다이아나 사원, 로마 다리 등 유네스코 세계문화유산 \'메리다 고고학 유적군\'을 자유관광한 뒤 18:00경 마드리드에 도착하는 일정이에요. 메리다는 대부분의 명소를 통합권 하나로 관람할 수 있어 편리해요. 한국인 기사가 전 일정 동행하며, 인원에 따라 프라이빗 밴(4-6인), 스프린터 차량(7-15인), 전용 버스(15-30인) 중 배정돼요. 확정일 기준 예약 인원이 4인 미만이면 예약금을 100% 환불해 드려요. 확정 안내는 일정 시작 2주 전까지 문자로 연락드리며, 미팅 장소는 미정이라 확정 후 개별 공지해 드리니 예약 시 숙박하시는 호텔 주소를 함께 알려주세요.',
      highlights: ['08:00 리스본 출발 · 18:00 마드리드 도착(예정)', '메리다 고고학 유적군 자유관광 (유네스코 세계문화유산)', '로마 극장 · 원형 경기장 · 다이아나 사원 · 로마 다리', '통합권으로 주요 명소 한번에 관람 가능', '최소 인원 미달 시 예약금 100% 환불'],
      includes: ['전용 차량', '유류비', '통행료', '주차비', '한국인 기사 서비스'],
      excludes: ['입장료', '식사', '가이드(옵션, 별도 문의)', '개인경비'],
      duration: '당일 (약 10시간 소요, 08:00 출발 · 18:00 도착 예정)'
    }
  },
  {
    id: 'car-madrid-merida-lisbon',
    cats: ['spain', 'portugal', 'transfer'],
    topClass: 'iberia',
    region: '차량 & 기사',
    days: '당일 (08:00~18:00)',
    price: '1인 193유로 (4인 이상 출발 기준)',
    minPeople: 4,
    maxPeople: 30,
    title: '[차량 & 기사] 마드리드 – 메리다 – 리스본',
    summary: '스페인의 활기찬 수도 마드리드에서 출발해 고대 로마 유적의 도시 메리다를 여유롭게 둘러보고 포르투갈의 낭만적인 수도 리스본까지 이동하는 프리미엄 당일 차량투어예요.',
    tags: ['프라이빗 차량', '한국인 기사 동행'],
    detail: {
      lead: '08:00 마드리드 출발, 유네스코 세계문화유산 도시 메리다에서 로마 유적 자유관광 후 18:00경 리스본에 도착하는 프리미엄 당일 차량투어예요.',
      description: '마드리드 호텔 또는 지정 장소에서 08:00 출발해, 고대 로마 제국 루시타니아 주의 수도였던 메리다에서 로마 극장, 로마 원형 경기장, 다이아나 사원, 로마 다리 등 유네스코 세계문화유산 \'메리다 고고학 유적군\'을 자유관광한 뒤 18:00경 리스본에 도착하는 일정이에요. 메리다는 대부분의 명소를 통합권 하나로 관람할 수 있어 편리해요. 한국인 기사가 전 일정 동행하며, 인원에 따라 프라이빗 밴(4-6인), 스프린터 차량(7-15인), 전용 버스(15-30인) 중 배정돼요. 확정일 기준 예약 인원이 4인 미만이면 예약금을 100% 환불해 드려요. 확정 안내는 일정 시작 2주 전까지 문자로 연락드리며, 미팅 장소는 미정이라 확정 후 개별 공지해 드리니 예약 시 숙박하시는 호텔 주소를 함께 알려주세요.',
      highlights: ['08:00 마드리드 출발 · 18:00 리스본 도착(예정)', '메리다 고고학 유적군 자유관광 (유네스코 세계문화유산)', '로마 극장 · 원형 경기장 · 다이아나 사원 · 로마 다리', '통합권으로 주요 명소 한번에 관람 가능', '최소 인원 미달 시 예약금 100% 환불'],
      includes: ['전용 차량', '유류비', '통행료', '주차비', '한국인 기사 서비스'],
      excludes: ['입장료', '식사', '가이드(옵션, 별도 문의)', '개인경비'],
      duration: '당일 (약 10시간 소요, 08:00 출발 · 18:00 도착 예정)'
    }
  },
  {
    id: 'car-madrid-zaragoza-barcelona',
    cats: ['spain', 'transfer'],
    topClass: 'spain',
    region: '차량 & 기사',
    days: '당일 (09:00~19:00)',
    price: '1인 170유로 (4인 이상 출발 기준)',
    minPeople: 4,
    maxPeople: 30,
    title: '[차량 & 기사] 마드리드 – 사라고사 – 바르셀로나',
    summary: '하루에 만나는 스페인의 역사와 예술, 두 도시의 매력! 마드리드에서 출발해 유서 깊은 사라고사를 경유해 바르셀로나까지 이동하는 프리미엄 당일 차량투어예요.',
    tags: ['프라이빗 차량', '한국인 기사 동행'],
    detail: {
      lead: '09:00 마드리드 아토차역 출발, 사라고사에서 2시간 자유관광 후 19:00경 바르셀로나 산츠역에 도착하는 프리미엄 당일 차량투어예요.',
      description: '마드리드 아토차역(Puerta de Atocha – Almudena Grandes)에서 09:00 출발해, 로마·이슬람·기독교 문화가 어우러진 아라곤 지방의 수도 사라고사에서 약 2시간 자유관광을 즐긴 뒤 19:00경 바르셀로나 산츠 기차역(Barcelona Sants)에 도착하는 일정이에요. 사라고사에서는 성모 마리아 전설이 깃든 필라르 대성당(고야의 프레스코화, 전망 타워), 유네스코 세계문화유산 라 세오 대성당, 11세기 이슬람 궁전 알하페리아, 고대 로마 유적 등을 둘러볼 수 있어요. 한국인 기사가 전 일정 동행하며(25인승 이상 차량은 한국인 인솔자 동행), 인원에 따라 9인승 밴(4-6인), 25인승 스프린터(7-15인), 45인승 버스(15-30인) 중 배정돼요. 확정일 기준 예약 인원이 4인 미만이면 예약금을 100% 환불해 드려요. 확정 안내는 일정 시작 2주 전까지 문자로 연락드리며, 미팅 장소는 미정이라 확정 후 개별 공지해 드리니 예약 시 숙박하시는 호텔 주소를 함께 알려주세요.',
      highlights: ['09:00 마드리드 출발 · 19:00 바르셀로나 도착(예정)', '필라르 성모 대성당 (고야 프레스코화, 전망 타워)', '라 세오 대성당 (유네스코 세계문화유산)', '알하페리아 궁전 · 로마 유적지', '최소 인원 미달 시 예약금 100% 환불'],
      includes: ['전용 차량', '유류비', '통행료', '주차비', '한국인 기사 서비스'],
      excludes: ['입장료', '식사', '가이드(옵션, 별도 문의)', '개인경비'],
      duration: '당일 (약 10시간 소요, 09:00 출발 · 19:00 도착 예정)'
    }
  },
  {
    id: 'car-barcelona-zaragoza-madrid',
    cats: ['spain', 'transfer'],
    topClass: 'spain',
    region: '차량 & 기사',
    days: '당일 (08:00~18:00)',
    price: '1인 170유로 (4인 이상 출발 기준)',
    minPeople: 4,
    maxPeople: 30,
    title: '[차량 & 기사] 바르셀로나 – 사라고사 – 마드리드',
    summary: '하루에 만나는 스페인의 역사와 문화, 두 도시의 매력! 바르셀로나에서 출발해 유서 깊은 사라고사를 경유해 마드리드까지 이동하는 프리미엄 당일 차량투어예요.',
    tags: ['프라이빗 차량', '한국인 기사 동행'],
    detail: {
      lead: '08:00 바르셀로나 기차역 출발, 사라고사에서 필라르 대성당 관광 및 자유시간을 즐긴 뒤 18:00경 마드리드에 도착하는 프리미엄 당일 차량투어예요.',
      description: '바르셀로나 시내 호텔 또는 지정 장소에서 08:00 출발해, 로마·이슬람·기독교 문화가 어우러진 아라곤 지방의 수도 사라고사를 경유해요. 성모 마리아 전설이 깃든 필라르 대성당을 관광하고, 자유시간 동안 간단한 현지식 체험도 즐길 수 있어요. 이후 18:00경 마드리드에 도착해 자유시간을 가진 뒤 해산하는 일정이에요. 한국인 기사가 전 일정 동행하며(25인승 이상 차량은 한국인 인솔자 동행), 인원에 따라 프라이빗 밴(4-6인), 스프린터 차량(7-15인), 전용 버스(15-30인) 중 배정돼요. 확정일 기준 예약 인원이 4인 미만이면 예약금을 100% 환불해 드려요. 확정 안내는 일정 시작 2주 전까지 문자로 연락드리며, 미팅 장소는 미정이라 확정 후 개별 공지해 드리니 예약 시 숙박하시는 호텔 주소를 함께 알려주세요.',
      highlights: ['08:00 바르셀로나 출발 · 18:00 마드리드 도착(예정)', '필라르 대성당 관광', '사라고사 자유시간 및 간단한 현지식 체험', '최소 인원 미달 시 예약금 100% 환불'],
      includes: ['전용 차량', '유류비', '통행료', '주차비', '한국인 기사 서비스'],
      excludes: ['입장료', '식사', '가이드(옵션, 별도 문의)', '개인경비'],
      duration: '당일 (약 10시간 소요, 08:00 출발 · 18:00 도착 예정)'
    }
  },
  {
    id: 'car-porto-salamanca-madrid',
    cats: ['spain', 'portugal', 'transfer'],
    topClass: 'iberia',
    region: '차량 & 기사',
    days: '당일 (08:00~18:00)',
    price: '1인 217유로 (4인 이상 출발 기준)',
    minPeople: 4,
    maxPeople: 30,
    title: '[차량 & 기사] 포루투 – 살라망카 – 마드리드',
    summary: '포르투갈의 낭만 도시 포루투에서 출발해 유네스코 세계문화유산 도시 살라망카를 여유롭게 둘러보고 스페인의 수도 마드리드까지 이동하는 프리미엄 당일 차량투어예요.',
    tags: ['프라이빗 차량', '한국인 기사 동행'],
    detail: {
      lead: '08:00 포루투 출발, 유네스코 세계문화유산 도시 살라망카에서 자유관광 후 18:00경 마드리드에 도착하는 프리미엄 당일 차량투어예요.',
      description: '포루투 호텔 또는 지정 장소에서 08:00 출발해, 스페인에서 가장 아름다운 대학 도시이자 유네스코 세계문화유산인 살라망카에서 마요르 광장, 살라망카 대학교, 신·구 대성당 등을 자유관광한 뒤 18:00경 마드리드에 도착하는 일정이에요. 살라망카의 주요 명소는 구시가지에 모여 있어 도보로 충분히 둘러볼 수 있어요. 한국인 기사가 전 일정 동행하며, 인원에 따라 프라이빗 밴(4-6인), 스프린터 차량(7-15인), 전용 버스(15-30인) 중 배정돼요. 확정일 기준 예약 인원이 4인 미만이면 예약금을 100% 환불해 드려요. 확정 안내는 일정 시작 2주 전까지 문자로 연락드리며, 미팅 장소는 미정이라 확정 후 개별 공지해 드리니 예약 시 숙박하시는 호텔 주소를 함께 알려주세요.',
      highlights: ['08:00 포루투 출발 · 18:00 마드리드 도착(예정)', '살라망카 자유관광 (유네스코 세계문화유산)', '마요르 광장 · 살라망카 대학교 · 신·구 대성당', '구시가지 도보 관광으로 편리하게 이동', '최소 인원 미달 시 예약금 100% 환불'],
      includes: ['전용 차량', '유류비', '통행료', '주차비', '한국인 기사 서비스'],
      excludes: ['입장료', '식사', '가이드(옵션, 별도 문의)', '개인경비'],
      duration: '당일 (약 10시간 소요, 08:00 출발 · 18:00 도착 예정)'
    }
  },
  {
    id: 'car-madrid-salamanca-porto',
    cats: ['spain', 'portugal', 'transfer'],
    topClass: 'iberia',
    region: '차량 & 기사',
    days: '당일 (09:00~18:00)',
    price: '1인 217유로 (4인 이상 출발 기준)',
    minPeople: 4,
    maxPeople: 30,
    title: '[차량 & 기사] 마드리드 – 살라망카 – 포루투',
    summary: '스페인의 수도 마드리드에서 출발해 유네스코 세계문화유산 도시 살라망카를 둘러보고 포르투갈의 아름다운 도시 포루투까지 이동하는 프리미엄 당일 차량투어예요.',
    tags: ['프라이빗 차량', '한국인 기사 동행'],
    detail: {
      lead: '09:00 마드리드 아토차역 출발, 살라망카에서 2시간 자유관광 후 18:00경 포루투 상벤투역에 도착하는 프리미엄 당일 차량투어예요.',
      description: '마드리드 아토차역(Puerta de Atocha – Almudena Grandes)에서 09:00 출발해, 스페인에서 가장 아름다운 대학 도시이자 유네스코 세계문화유산인 살라망카에서 약 2시간 자유관광을 즐긴 뒤 18:00경 포루투 상벤투역(Estação Ferroviária de Porto-São Bento)에 도착하는 일정이에요. 살라망카의 마요르 광장, 살라망카 대학교, 신·구 대성당 등 주요 명소는 구시가지에 모여 있어 도보로 충분히 둘러볼 수 있어요. 한국인 기사가 전 일정 동행하며(25인승 이상 차량은 한국인 인솔자 동행), 인원에 따라 9인승 밴(4-6인), 25인승 스프린터(7-15인), 45인승 버스(15-30인) 중 배정돼요. 확정일 기준 예약 인원이 4인 미만이면 예약금을 100% 환불해 드려요. 확정 안내는 일정 시작 2주 전까지 문자로 연락드리며, 미팅 장소는 미정이라 확정 후 개별 공지해 드리니 예약 시 숙박하시는 호텔 주소를 함께 알려주세요.',
      highlights: ['09:00 마드리드 출발 · 18:00 포루투 도착(예정)', '살라망카 2시간 자유관광 (유네스코 세계문화유산)', '마요르 광장 · 살라망카 대학교 · 신·구 대성당', '넉넉한 수납공간의 프라이빗 차량, VIP 의전 별도문의 가능', '최소 인원 미달 시 예약금 100% 환불'],
      includes: ['전용 차량', '유류비', '통행료', '주차비', '한국인 기사 서비스'],
      excludes: ['입장료', '식사', '가이드(옵션, 별도 문의)', '개인경비'],
      duration: '당일 (약 9시간 소요, 09:00 출발 · 18:00 도착 예정)'
    }
  },
  {
    id: 'car-lisbon-benagil-sevilla',
    cats: ['spain', 'portugal', 'transfer'],
    topClass: 'iberia',
    region: '차량 & 기사',
    days: '당일 (08:00~18:00)',
    price: '1인 213유로 (4인 이상 출발 기준)',
    minPeople: 4,
    maxPeople: 30,
    youtubeUrl: 'https://www.youtube.com/shorts/OqDRqN1sVoQ',
    title: '[차량 & 기사] 리스본 – 베나길 – 세비야',
    summary: '하루에 만나는 스페인의 절경과 낭만, 두 도시의 매력! 리스본에서 출발해 세계적인 해식 동굴 마을 베나길을 거쳐 세비야까지 이동하는 프리미엄 당일 차량투어예요.',
    tags: ['프라이빗 차량', '한국인 기사 동행'],
    detail: {
      lead: '08:00 리스본 출발, 알가르브 해안의 보석 베나길에서 동굴 전망과 자유시간(포토타임)을 즐긴 뒤 18:00경 세비야에 도착하는 프리미엄 당일 차량 투어예요.',
      description: '08:00 리스본 호텔 또는 지정 장소 출발, 세계에서 가장 아름다운 해식 동굴로 꼽히는 베나길 동굴(Algar de Benagil)이 있는 알가르브 해안 마을 베나길에서 동굴 전망 포인트 관람과 자유시간(포토타임)을 즐겨요. 베나길 동굴은 육로로 연결되지 않아 보트나 카약으로만 들어갈 수 있고, 천장 구멍으로 쏟아지는 햇살이 장관을 이뤄요. 18:00경 스페인 세비야 도착으로 일정이 마무리돼요. 중식은 자유시간 중 각자 해결하시면 돼요 (불포함). 한국인 기사가 전 일정 동행하며, 인원에 따라 프라이빗 밴(4~6인), 스프린터 차량(7~15인), 전용 버스(15~30인) 중 배정돼요. 4인 미만은 상담 후 프라이빗 투어로도 진행 가능해요. 확정일 기준 예약 인원이 4인 미만이면 예약금을 100% 환불해 드려요. 확정 안내는 일정 시작 2주 전까지 문자로 연락드리며, 미팅 장소는 미정이라 확정 후 개별 공지해 드리니 예약 시 숙박하시는 호텔 주소를 함께 알려주세요.',
      highlights: ['08:00 리스본 출발 · 18:00 세비야 도착(예정)', '베나길 동굴 전망 포인트 관람', '알가르브 해안 마을 자유시간 & 포토타임', '4인 미만은 프라이빗 투어로도 진행 가능', '최소 인원 미달 시 예약금 100% 환불'],
      includes: ['전용 차량', '유류비', '통행료', '주차비', '한국인 기사 서비스'],
      excludes: ['입장료', '식사', '가이드(옵션, 별도 문의)', '개인경비'],
      duration: '당일 (약 10시간 소요, 08:00 출발 · 18:00 도착 예정)'
    }
  },
  {
    id: 'car-sevilla-benagil-lisbon',
    cats: ['spain', 'portugal', 'transfer'],
    topClass: 'iberia',
    region: '차량 & 기사',
    days: '당일 (08:00~18:00)',
    price: '1인 213유로 (4인 이상 출발 기준)',
    minPeople: 4,
    maxPeople: 30,
    youtubeUrl: 'https://www.youtube.com/shorts/OqDRqN1sVoQ',
    title: '[차량 & 기사] 세비야 – 베나길 – 리스본',
    summary: '하루에 만나는 특별한 3가지 도시! 세비야에서 출발해 세계적인 해식 동굴 마을 베나길을 거쳐 리스본까지 이동하는 프리미엄 당일 차량투어예요.',
    tags: ['프라이빗 차량', '한국인 기사 동행'],
    detail: {
    lead: '08:00 세비야 출발, 알가르브 해안의 보석 베나길에서 동굴 보트 투어 & 자유시간을 즐긴 뒤 18:00경 리스본에 도착하는 프리미엄 당일 차량 투어예요.',
      description: '08:00 세비야 호텔 또는 지정 장소 출발, 세계에서 가장 아름다운 해식 동굴로 꼽히는 베나길 동굴(Algar de Benagil)이 있는 알가르브 해안 마을 베나길에서 동굴 보트 투어와 자유시간(포토타임)을 즐겨요. 베나길 동굴은 육로로 연결되지 않아 보트나 카약으로만 들어갈 수 있고, 천장 구멍으로 쏟아지는 햇살이 장관을 이뤄요. 18:00경 리스본 도착으로 일정이 마무리돼요. 중식은 자유시간 중 각자 해결하시면 돼요 (불포함). 한국인 기사가 전 일정 동행하며, 인원에 따라 프라이빗 밴(4~6인), 스프린터 차량(7~15인), 전용 버스(15~30인) 중 배정돼요. 4인 미만은 상담 후 프라이빗 투어로도 진행 가능해요. 확정일 기준 예약 인원이 4인 미만이면 예약금을 100% 환불해 드려요. 확정 안내는 일정 시작 2주 전까지 문자로 연락드리며, 미팅 장소는 미정이라 확정 후 개별 공지해 드리니 예약 시 숙박하시는 호텔 주소를 함께 알려주세요.',
      highlights: ['08:00 세비야 출발 · 18:00 리스본 도착(예정)', '베나길 동굴 보트 투어 & 자유시간', '알가르브 해안 마을 포토타임', '4인 미만은 프라이빗 투어로도 진행 가능', '최소 인원 미달 시 예약금 100% 환불'],
      includes: ['전용 차량', '유류비', '통행료', '주차비', '한국인 기사 서비스'],
      excludes: ['입장료', '식사', '가이드(옵션, 별도 문의)', '개인경비'],
      duration: '당일 (약 10시간 소요, 08:00 출발 · 18:00 도착 예정)'
    }
  },
  {
    id: 'car-granada-frigiliana-nerja-ronda-sevilla',
    cats: ['spain', 'transfer'],
    topClass: 'spain',
    region: '차량 & 기사',
    days: '당일 (07:00~18:00)',
    price: '1인 150유로 (4인 이상 출발 기준)',
    minPeople: 4,
    maxPeople: 30,
    youtubeUrl: 'https://www.youtube.com/watch?v=OfeS3n5cH4A',
    title: '[차량 & 기사] 그라나다 – 네르하 – 프리힐리아나 – 론다 – 세비야',
    summary: '하루에 만나는 안달루시아의 아름다운 5개 도시! 그라나다에서 출발해 네르하, 프리힐리아나, 론다를 거쳐 세비야까지 이동하는 프리미엄 당일 차량투어예요.',
    tags: ['프라이빗 차량', '한국인 기사 동행'],
    detail: {
      lead: '07:00 그라나다 기차역 출발, 네르하·프리힐리아나·론다를 차례로 둘러본 뒤 18:00경 세비야 산타 후스타역에 도착하는 프리미엄 당일 차량투어예요.',
      description: '그라나다 기차역(Estación de Granada)에서 07:00 출발해, 지중해 절벽 위 전망대 유럽의 발코니가 있는 네르하에서 1시간, ‘스페인에서 가장 아름다운 마을’ 중 하나인 하얀 마을 프리힐리아나에서 1시간, 100m 절벽 위 누에보 다리와 유서 깊은 투우장이 있는 론다에서 2시간 자유관광을 즐긴 뒤 18:00경 세비야 산타 후스타역에 도착하는 일정이에요. 한국인 기사가 전 일정 동행하며(25인승 이상 차량은 한국인 인솔자 동행), 인원에 따라 9인승 밴(4-6인), 25인승 스프린터(7-15인), 45인승 버스(15-30인) 중 배정돼요. 4인 미만은 상담 후 프라이빗 투어로도 진행 가능해요. 확정일 기준 예약 인원이 4인 미만이면 예약금을 100% 환불해 드려요. 확정 안내는 일정 시작 2주 전까지 문자로 연락드리며, 미팅 장소는 미정이라 확정 후 개별 공지해 드리니 예약 시 숙박하시는 호텔 주소를 함께 알려주세요.',
      highlights: ['07:00 그라나다 출발 · 18:00 세비야 도착(예정)', '네르하 유럽의 발코니 자유관광 1시간', '프리힐리아나 하얀 마을 골목 자유관광 1시간', '론다 누에보 다리 · 투우장 자유관광 2시간', '4인 미만은 프라이빗 투어로도 진행 가능'],
      includes: ['전용 차량', '유류비', '통행료', '주차비', '한국인 기사 서비스'],
      excludes: ['입장료', '식사', '가이드(옵션, 별도 문의)', '개인경비'],
      duration: '당일 (약 11시간 소요, 07:00 출발 · 18:00 도착 예정)'
    }
  },
  {
    id: 'car-sevilla-ronda-nerja-granada',
    cats: ['spain', 'transfer'],
    topClass: 'spain',
    region: '차량 & 기사',
    days: '당일 (08:00~18:00)',
    price: '1인 150유로 (4인 이상 출발 기준)',
    minPeople: 4,
    maxPeople: 30,
    youtubeUrl: 'https://www.youtube.com/watch?v=OfeS3n5cH4A',
    title: '[차량 & 기사] 세비야 – 론다 – 프리힐리아나 – 네르하 – 그라나다',
    summary: '안달루시아 핵심 명소를 하루에! 세비야에서 출발해 절벽 위 도시 론다, 하얀 마을 프리힐리아나, 해안 도시 네르하를 거쳐 그라나다까지 이동하는 프리미엄 당일 차량투어예요.',
    tags: ['프라이빗 차량', '한국인 기사 동행'],
    detail: {
      lead: '08:00 세비야 출발, 론다·프리힐리아나·네르하를 차례로 둘러본 뒤 18:00경 그라나다에 도착하는 프리미엄 당일 차량투어예요.',
      description: '세비야에서 08:00 출발해, 100m 절벽 위에 세워진 누에보 다리와 스페인에서 가장 오래된 투우장 중 하나가 있는 론다를 관광하고, ‘스페인에서 가장 아름다운 마을’ 중 하나로 꼽히는 하얀 마을 프리힐리아나의 골목을 산책한 뒤, 지중해 절벽 위 전망대 유럽의 발코니가 있는 네르하를 거쳐 18:00경 그라나다(알함브라 외관 관람)에 도착하는 일정이에요. 한국인 기사가 전 일정 동행하며, 인원에 따라 프라이빗 밴(4-6인), 스프린터 차량(7-15인), 전용 버스(15-30인) 중 배정돼요. 확정일 기준 예약 인원이 4인 미만이면 예약금을 100% 환불해 드려요. 확정 안내는 일정 시작 2주 전까지 문자로 연락드리며, 미팅 장소는 미정이라 확정 후 개별 공지해 드리니 예약 시 숙박하시는 호텔 주소를 함께 알려주세요.',
      highlights: ['08:00 세비야 출발 · 18:00 그라나다 도착(예정)', '론다 누에보 다리 · 투우장 · 타호 절벽', '프리힐리아나 하얀 마을 골목 산책', '네르하 유럽의 발코니 · 해변', '그라나다 알함브라 외관 관람', '최소 인원 미달 시 예약금 100% 환불'],
      includes: ['전용 차량', '유류비', '통행료', '주차비', '한국인 기사 서비스'],
      excludes: ['입장료', '식사', '가이드(옵션, 별도 문의)', '개인경비'],
      duration: '당일 (약 10시간 소요, 08:00 출발 · 18:00 도착 예정)'
    }
  },
  {
    id: 'car-sevilla-cordoba-madrid',
    cats: ['spain', 'transfer'],
    topClass: 'spain',
    region: '차량 & 기사',
    days: '당일 (08:00~19:00)',
    price: '1인 160유로 (4인 이상 출발 기준)',
    minPeople: 4,
    maxPeople: 30,
    youtubeUrl: 'https://www.youtube.com/shorts/8yghtXYbXhI',
    title: '[차량 & 기사] 세비야 – 꼬르도바 – 마드리드',
    summary: '세비야에서 마드리드까지, 스페인의 아름다운 도시를 하루에! 유네스코 세계유산 도시 꼬르도바를 경유해 이동하는 프리미엄 당일 차량투어예요.',
    tags: ['프라이빗 차량', '한국인 기사 동행'],
    detail: {
      lead: '08:00 세비야 출발, 유네스코 세계유산 도시 꼬르도바에서 메스키타 대성당 관람 후 19:00경 마드리드에 도착하는 프리미엄 당일 차량투어예요.',
      description: '세비야 호텔 또는 지정 장소에서 08:00 출발해, 유네스코 세계유산 목록에 네 차례나 등재된 도시 꼬르도바에서 이슬람 건축의 걸작 메스키타 대성당(모스크-대성당)을 관람하고 유대인 지구, 로마 다리, 꽃길 거리 등 역사 지구를 둘러본 뒤 19:00경 마드리드에 도착하는 일정이에요. 한국인 기사가 전 일정 동행하며, 인원에 따라 프라이빗 밴(4-6인), 스프린터 차량(7-15인), 전용 버스(15-30인) 중 배정돼요. 확정일 기준 예약 인원이 4인 미만이면 예약금을 100% 환불해 드려요. 확정 안내는 일정 시작 2주 전까지 문자로 연락드리며, 미팅 장소는 미정이라 확정 후 개별 공지해 드리니 예약 시 숙박하시는 호텔 주소를 함께 알려주세요.',
      highlights: ['08:00 세비야 출발 · 19:00 마드리드 도착(예정)', '꼬르도바 메스키타 대성당 관람 (유네스코 세계유산)', '유대인 지구 · 로마 다리 · 꽃길 거리', '최소 인원 미달 시 예약금 100% 환불'],
      includes: ['전용 차량', '유류비', '통행료', '주차비', '한국인 기사 서비스'],
      excludes: ['입장료', '식사', '가이드(옵션, 별도 문의)', '개인경비'],
      duration: '당일 (약 11시간 소요, 08:00 출발 · 19:00 도착 예정)'
    }
  },
  {
    id: 'car-madrid-consuegra-sevilla',
    cats: ['spain', 'transfer'],
    topClass: 'spain',
    region: '차량 & 기사',
    days: '당일 (09:00~18:00)',
    price: '1인 170유로 (4인 이상 출발 기준)',
    minPeople: 4,
    maxPeople: 30,
    youtubeUrl: 'https://www.youtube.com/watch?v=rpi4tyg-I1I',
    title: '[차량 & 기사] 마드리드 – 콘수에그라 – 세비야',
    summary: '스페인의 매력을 하루에! 마드리드에서 출발해 돈키호테의 풍차 마을 콘수에그라를 경유해 세비야까지 이동하는 프리미엄 당일 차량투어예요.',
    tags: ['프라이빗 차량', '한국인 기사 동행'],
    detail: {
      lead: '09:00 마드리드 아토차역 출발, 콘수에그라에서 2시간 자유관광 후 18:00경 세비야 산타 후스타역에 도착하는 프리미엄 당일 차량투어예요.',
      description: '마드리드 기차역(Estación de Atocha)에서 09:00 출발해, 소설 돈키호테의 배경인 라만차 지역 풍차 마을 콘수에그라에서 약 2시간 자유관광을 즐긴 뒤 18:00경 세비야 산타 후스타역(Santa Justa)에 도착하는 일정이에요. 콘수에그라에서는 칼데리코 언덕을 따라 늘어선 하얀 풍차(일부 내부 관람 가능), 풍차 옆 콘수에그라 성, 스페인 광장, 파로키아 데 산타 마리아 라 마요르 성당 등을 둘러볼 수 있어요. 한국인 기사가 전 일정 동행하며(25인승 이상 차량은 한국인 인솔자 동행), 인원에 따라 프라이빗 밴(4-6인), 스프린터 차량(7-15인), 전용 버스(15-30인) 중 배정돼요. 확정일 기준 예약 인원이 4인 미만이면 예약금을 100% 환불해 드려요. 확정 안내는 일정 시작 2주 전까지 문자로 연락드리며, 미팅 장소는 미정이라 확정 후 개별 공지해 드리니 예약 시 숙박하시는 호텔 주소를 함께 알려주세요.',
      highlights: ['09:00 마드리드 출발 · 18:00 세비야 도착(예정)', '콘수에그라 풍차 (돈키호테 배경, 일부 내부 관람 가능)', '콘수에그라 성 · 스페인 광장', '2시간 자유관광', '최소 인원 미달 시 예약금 100% 환불'],
      includes: ['전용 차량', '유류비', '통행료', '주차비', '한국인 기사 서비스'],
      excludes: ['입장료', '식사', '가이드(옵션, 별도 문의)', '개인경비'],
      duration: '당일 (약 9시간 소요, 09:00 출발 · 18:00 도착 예정)'
    }
  },
  {
    id: 'golf-marbella-cadiz',
    cats: ['spain'],
    topClass: 'camino',
    region: '골프투어',
    days: '2박 3일',
    price: '가격 문의',
    title: '[2박3일 골프투어] 마르베야 & 카디스',
    summary: '스페인 남부 골프 명소 마르베야와 카디스를 도는 2박3일 골프 투어예요.',
    tags: ['골프장 라운딩', '프라이빗 차량'],
    detail: {
      lead: '온화한 남부 날씨 속에서 즐기는 마르베야 · 카디스 골프 투어예요.',
      description: '코스타 델 솔의 골프 명소 마르베야와 대서양이 보이는 카디스 인근 골프장을 라운딩하는 일정이에요. 이동은 프라이빗 차량으로 편하게 진행돼요.',
      highlights: ['마르베야 골프장 라운딩', '카디스 인근 골프장 라운딩', '숙소 · 골프장 간 이동 지원', '희망 시 관광 일정 추가 가능'],
      includes: ['프라이빗 차량 및 기사', '골프장 예약 지원'],
      excludes: ['그린피 · 카트비', '숙박비', '식비'],
      duration: '2박 3일 (일정 조정 가능)'
    }
  },
  {
    id: 'spain-free-itinerary',
    cats: ['spain'],
    topClass: 'iberia',
    region: 'SPAIN',
    days: '5박 6일',
    price: '가격 문의',
    title: '[스페인일주] 5박 6일 자유일정',
    summary: '정해진 코스 대신 원하는 도시와 순서로 짜는 5박6일 자유일정 스페인 일주예요.',
    tags: ['자유일정', '맞춤 설계'],
    detail: {
      lead: '가고 싶은 도시만 골라 나만의 순서로 짜는 스페인 일주예요.',
      description: '마드리드, 바르셀로나, 그라나다, 세비야 등 원하는 도시를 원하는 순서로 조합해 5박6일 일정으로 설계해 드려요. 이동 수단과 숙소 위치까지 함께 상담해 드려요.',
      highlights: ['원하는 도시 자유 조합', '이동 구간별 맞춤 설계', '숙소 위치 상담 지원', '관심사에 맞춘 명소 추천'],
      includes: ['일정 설계 상담', '구간별 이동 방법 안내'],
      excludes: ['왕복 항공권', '숙박비', '입장료 · 식비'],
      duration: '5박 6일 (자유 조합)'
    }
  },
  {
    id: 'spain-north',
    cats: ['spain'],
    topClass: 'spain',
    region: '스페인북부',
    days: '6박 7일',
    price: '가격 문의',
    title: '[스페인북부] 6박 7일 자유일정',
    summary: '빌바오·산세바스티안 등 스페인 북부의 미식과 자연을 즐기는 6박7일 자유일정이에요.',
    tags: ['미식 여행', '자유일정'],
    detail: {
      lead: '구겐하임 미술관부터 산세바스티안 핀초스까지, 스페인 북부만의 매력을 담은 코스예요.',
      description: '빌바오, 산세바스티안 등 스페인 북부 바스크 지역을 중심으로 한 6박7일 자유일정이에요. 미식 여행과 자연 경관을 함께 즐길 수 있도록 설계해 드려요.',
      highlights: ['빌바오 구겐하임 미술관', '산세바스티안 핀초스 투어', '북부 해안 드라이브', '자유일정 맞춤 조정'],
      includes: ['일정 설계 상담', '구간별 이동 방법 안내'],
      excludes: ['왕복 항공권', '숙박비', '입장료 · 식비'],
      duration: '6박 7일 (자유 조합)'
    }
  },
  {
    id: 'spain-month-stay',
    cats: ['spain'],
    topClass: 'camino',
    region: '스페인',
    days: '한달살기',
    price: '가격 문의',
    title: '[스페인] 한달살기',
    summary: '짧은 여행으로는 부족한 분들을 위한 스페인 한달살기 준비를 도와드려요.',
    tags: ['장기 체류', '생활 밀착 정보'],
    detail: {
      lead: '관광이 아닌 \'살아보는\' 스페인을 원하는 분들을 위한 한달살기 상담이에요.',
      description: '숙소 지역 선정, 장기 체류에 필요한 생활 정보, 원데이 투어 연계까지 한달살기에 필요한 부분을 함께 상담해 드려요.',
      highlights: ['지역별 장단점 상담', '장기 숙소 지역 추천', '체류 중 짧은 투어 연계', '생활 밀착 정보 공유'],
      includes: ['체류 계획 상담', '숙소 지역 추천'],
      excludes: ['숙박비', '생활비', '왕복 항공권'],
      duration: '한달 (기간 조정 가능)'
    }
  },
  {
    id: 'hiking-sierra-nevada',
    cats: ['spain'],
    topClass: 'camino',
    region: '하이킹',
    days: '4일',
price: '가격 문의',
    youtubeUrl: 'https://youtu.be/wjNdkzuMolk',
    title: '[하이킹] 시에라네바다 4일',
    summary: '그라나다 인근 시에라네바다 산맥을 걷는 4일 하이킹 코스예요.',
    tags: ['자연 트레킹', '현지 가이드 동행'],
    detail: {
      lead: '이베리아 반도 최고봉이 있는 시에라네바다에서 즐기는 4일 트레킹이에요.',
      description: '그라나다 인근 시에라네바다 국립공원을 현지 가이드와 함께 걷는 코스예요. 체력 수준에 맞춰 구간과 난이도를 조정할 수 있어요.',
      highlights: ['시에라네바다 국립공원 트레킹', '현지 가이드 동행', '구간별 난이도 조정', '숙소 · 이동 지원'],
      includes: ['현지 가이드', '구간 이동 지원'],
      excludes: ['숙박비', '식비', '개인 트레킹 장비'],
      duration: '4일 (난이도별 구간 조정 가능)'
    }
  },
  {
    id: 'matchday',
    cats: ['matchday'],
    topClass: 'match',
    region: 'MATCHDAY',
    days: '경기 일정별',
    price: '가격 문의',
    title: '라리가 직관 연계 상품',
    summary: '여행 일정에 맞춰 마드리드·바르셀로나·세비야 등 라리가 경기 관람을 더할 수 있어요. 여권 등록과 클럽 카르네 여부까지 안내해 드려요.',
    tags: ['구장 3곳 우선 안내', '검색으로 전 구장 확인'],
    link: 'matchday.html',
    ctaLabel: '경기 일정 보기'
  },
{
    id: 'basque-navarra-6days',
    cats: ['spain'],
    topClass: 'spain',
    region: '바스크 · 나바라',
    days: '5박 6일',
    price: '가격 문의',
    title: '[바스크 & 나바라] 프랑스 바스크와 나바라 5박 6일',
    summary: '비스케이 만의 해안선을 따라 국경을 넘나드는 여정 — 산세바스티안부터 생장드뤼즈, 바즈탄 계곡까지.',
    tags: ['5박 6일', '전용버스', '인솔자 동행'],
    isNew: true,
    downloadUrl: '/docs/basque-navarra-itinerary.pdf',
    detail: {
      lead: '스페인 산세바스티안·온다리비아부터 프랑스 생장드뤼즈·아이노아, 나바라 바즈탄 계곡까지 — 하나의 바스크 문화가 두 나라에 걸쳐 이어지는 6일간의 여정이에요.',
      description: `<!-- ── Euforia Tour · 프랑스 바스크와 나바라 5박 6일 · 붙여넣기용 조각 ──
     이 블록 전체를 상세설명 HTML 칸에 그대로 붙여 넣으십시오.
     모든 스타일이 .eu-itin 안으로만 적용되므로 사이트의 기존 디자인과 부딪히지 않습니다. ── -->
<div class="eu-itin">
<style>
@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,700&family=Gowun+Batang:wght@400;700&family=IBM+Plex+Sans+KR:wght@300;400;500;600&display=swap");
/* ── 사이트 기존 테마가 이 조각 안으로 새어 들어오지 않도록 막는다 ── */
.eu-itin h1,.eu-itin h2,.eu-itin h3,.eu-itin h4,.eu-itin h5{
  color:var(--ink);font-family:inherit;margin:0;line-height:1.25;text-transform:none;
}
.eu-itin p,.eu-itin li,.eu-itin dl,.eu-itin dt,.eu-itin dd,.eu-itin span,.eu-itin div,.eu-itin strong,.eu-itin b,.eu-itin em{
  font-family:inherit;
}
.eu-itin .display{font-family:"Fraunces","Gowun Batang",Georgia,serif}
.eu-itin h1 em{color:var(--accent);font-style:normal}
.eu-itin a{color:var(--accent);text-decoration:none}
.eu-itin ul,.eu-itin ol{margin:0}
.eu-itin section,.eu-itin article,.eu-itin footer{margin:0;background:none;border:0}
.eu-itin svg{max-width:100%}
.eu-itin{background:var(--ground)}

.eu-itin{
  --ground:#FAF9F6;
  --surface:#FFFFFF;
  --surface-2:#F1EFE9;
  --ink:#1B201D;
  --ink-2:#4A524D;
  --ink-3:#7C837E;
  --line:#DCD9D0;
  --line-soft:#E9E6DE;
  --accent:#8C2B2B;
  --accent-soft:#F0E2DE;
  --pine:#1F3D34;
  --pine-soft:#E1E8E3;
  --sea:#DCE4E3;
  --shadow:0 1px 2px rgba(27,32,29,.05),0 8px 24px -14px rgba(27,32,29,.22);
}.eu-itin *{box-sizing:border-box}.eu-itin{
  margin:0;
  background:var(--ground);
  color:var(--ink);
  font-family:"IBM Plex Sans KR","IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Malgun Gothic",sans-serif;
  font-weight:400;
  font-size:16px;
  line-height:1.75;
  -webkit-font-smoothing:antialiased;
  word-break:keep-all;
}.eu-itin .wrap{max-width:1040px;margin:0 auto;padding:0 24px}.eu-itin .display{font-family:"Fraunces","Gowun Batang",Georgia,serif;font-weight:700;letter-spacing:-.01em;text-wrap:balance;line-height:1.2}.eu-itin .label{
  font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;
  color:var(--ink-3);
}.eu-itin /* ── 헤더 ── */
.masthead{
  border-bottom:1px solid var(--line);
  background:var(--surface);
}.eu-itin .masthead .wrap{
  display:flex;align-items:center;justify-content:space-between;gap:16px;
  padding-top:18px;padding-bottom:18px;flex-wrap:wrap;
}.eu-itin .brand{display:flex;align-items:baseline;gap:10px}.eu-itin .brand strong{font-family:"Fraunces",serif;font-weight:700;font-size:19px;letter-spacing:-.01em}.eu-itin .brand span{font-size:12px;color:var(--ink-3);letter-spacing:.06em}.eu-itin /* ── 히어로 ── */
.hero{padding:64px 0 0}.eu-itin .eyebrow{display:flex;align-items:center;gap:12px;margin-bottom:20px}.eu-itin .eyebrow .rule{height:1px;flex:0 0 40px;background:var(--accent)}.eu-itin h1{font-size:clamp(38px,6.4vw,64px);margin:0 0 22px}.eu-itin h1 em{font-style:normal;color:var(--accent)}.eu-itin .lede{
  font-size:clamp(17px,2.1vw,19px);color:var(--ink-2);max-width:60ch;margin:0 0 34px;
  font-weight:300;line-height:1.85;
}.eu-itin .facts{
  display:grid;gap:1px;background:var(--line);
  grid-template-columns:repeat(auto-fit,minmax(160px,1fr));
  border:1px solid var(--line);border-radius:2px;overflow:hidden;
}.eu-itin .fact{background:var(--surface);padding:18px 20px}.eu-itin .fact dt{margin:0 0 6px}.eu-itin .fact dd{margin:0;font-size:16px;font-weight:500;line-height:1.5}.eu-itin /* ── 고추 장식 ── */
.garland{margin:56px 0 0;color:var(--accent);opacity:.9}.eu-itin .garland svg{display:block;width:100%;height:34px}.eu-itin /* ── 지도 ── */
.mapsec{padding:56px 0 8px}.eu-itin .mapcard{
  background:var(--surface);border:1px solid var(--line);border-radius:2px;
  padding:26px 26px 18px;box-shadow:var(--shadow);
}.eu-itin .mapcard h2{font-size:20px;margin:0 0 4px}.eu-itin .mapcard p.note{font-size:13px;color:var(--ink-3);margin:0 0 18px}.eu-itin .mapscroll{overflow-x:auto}.eu-itin .mapscroll svg{display:block;min-width:0;width:100%;max-width:720px;margin:0 auto;height:auto}.eu-itin .mp-sea{fill:var(--sea)}.eu-itin .mp-coast{fill:none;stroke:var(--ink-3);stroke-width:.4;opacity:.55}.eu-itin .mp-border{fill:none;stroke:var(--accent);stroke-width:.45;stroke-dasharray:1.5 1.2;opacity:.85}.eu-itin .mp-dot{fill:var(--pine)}.eu-itin .mp-dot.es{fill:var(--accent)}.eu-itin .mp-base{fill:var(--surface);stroke:var(--accent);stroke-width:.7}.eu-itin .mp-t{font-size:1.9px;fill:var(--ink-2);font-family:"IBM Plex Sans KR",sans-serif;font-weight:500}.eu-itin .mp-c{font-size:1.9px;fill:var(--ink-3);font-family:"IBM Plex Sans KR",sans-serif;letter-spacing:.16em}.eu-itin .mp-n{font-size:1.7px;fill:var(--ink-3);font-family:"IBM Plex Sans KR",sans-serif}.eu-itin .maplegend{display:flex;flex-wrap:wrap;gap:18px;margin-top:14px;font-size:12.5px;color:var(--ink-2)}.eu-itin .maplegend i{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:7px;vertical-align:1px}.eu-itin /* ── 일정 ── */
.itin{padding:56px 0 0}.eu-itin .itin > h2{font-size:clamp(24px,3.4vw,30px);margin:0 0 6px}.eu-itin .itin > p.sub{color:var(--ink-3);margin:0 0 36px;font-size:14.5px}.eu-itin .day{
  display:grid;grid-template-columns:196px 1fr;gap:36px;
  padding:34px 0;border-top:1px solid var(--line);
}.eu-itin .day:last-of-type{border-bottom:1px solid var(--line)}.eu-itin .daykey{position:relative}.eu-itin .daynum{
  font-family:"Fraunces",serif;font-weight:300;font-size:52px;line-height:1;
  color:var(--accent);letter-spacing:-.03em;font-variant-numeric:tabular-nums;
}.eu-itin .daynum sub{font-size:15px;font-weight:500;vertical-align:baseline;margin-left:4px;color:var(--ink-3)}.eu-itin .places{margin:14px 0 0;padding:0;list-style:none}.eu-itin .places li{
  font-weight:500;font-size:15.5px;line-height:1.5;padding:3px 0;
}.eu-itin .places li .lat{display:block;font-family:"Fraunces",serif;font-weight:300;font-size:13px;color:var(--ink-3);letter-spacing:.01em}.eu-itin .daybody h3{font-size:19px;margin:0 0 12px;font-weight:600;letter-spacing:-.005em}.eu-itin .daybody p{margin:0 0 14px;color:var(--ink-2);max-width:62ch}.eu-itin .daybody p:last-child{margin-bottom:0}.eu-itin .daybody strong{color:var(--ink);font-weight:600}.eu-itin .meals{
  display:flex;flex-wrap:wrap;gap:8px;margin-top:18px;padding-top:16px;
  border-top:1px dashed var(--line);
}.eu-itin .meal{
  font-size:12px;font-weight:500;letter-spacing:.02em;
  padding:4px 11px;border-radius:2px;
  background:var(--pine-soft);color:var(--pine);
}.eu-itin .meal.free{background:var(--surface-2);color:var(--ink-3)}.eu-itin .meal.star{background:var(--accent-soft);color:var(--accent)}.eu-itin .tag-stay{
  display:inline-block;margin-top:14px;font-size:12.5px;color:var(--ink-3);
}.eu-itin /* ── 포함 / 불포함 ── */
.incl{padding:64px 0 0}.eu-itin .cols{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:26px}.eu-itin .card{
  border:1px solid var(--line);border-radius:2px;padding:26px 26px 28px;
  background:var(--surface);
}.eu-itin .card.no{background:var(--surface-2)}.eu-itin .card h3{font-size:17px;margin:0 0 4px;display:flex;align-items:center;gap:9px;font-weight:600}.eu-itin .card h3 .pip{width:8px;height:8px;border-radius:50%;background:var(--pine);flex:0 0 auto}.eu-itin .card.no h3 .pip{background:var(--ink-3)}.eu-itin .card ul{margin:16px 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:12px}.eu-itin .card li{
  font-size:14.5px;line-height:1.65;color:var(--ink-2);
  padding-left:16px;position:relative;
}.eu-itin .card li::before{
  content:"";position:absolute;left:0;top:.7em;
  width:6px;height:1px;background:var(--line);
}.eu-itin .card li b{color:var(--ink);font-weight:600;display:block;font-size:13px;letter-spacing:.02em}.eu-itin /* ── 안내 ── */
.notes{padding:52px 0 0}.eu-itin .notes ol{margin:18px 0 0;padding-left:20px;display:flex;flex-direction:column;gap:10px}.eu-itin .notes li{font-size:14px;color:var(--ink-2);line-height:1.7}.eu-itin /* ── 문의 ── */
.cta{margin:64px 0 0;border-top:2px solid var(--accent);background:var(--surface);padding:38px 0 44px}.eu-itin .cta .wrap{display:flex;justify-content:space-between;align-items:flex-end;gap:28px;flex-wrap:wrap}.eu-itin .cta h2{font-size:clamp(22px,3vw,28px);margin:8px 0 10px}.eu-itin .cta p{margin:0;color:var(--ink-2);font-size:15px;max-width:46ch}.eu-itin .contact{display:flex;flex-direction:column;gap:6px;font-size:15px}.eu-itin .contact a{color:var(--accent);text-decoration:none;border-bottom:1px solid var(--accent-soft);font-weight:500}.eu-itin .contact a:hover, .eu-itin .contact a:focus-visible{border-bottom-color:var(--accent)}.eu-itin footer{padding:26px 0 60px;color:var(--ink-3);font-size:12.5px}.eu-itin footer .wrap{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap}.eu-itin a:focus-visible, .eu-itin li:focus-visible{outline:2px solid var(--accent);outline-offset:3px}

@media (max-width:800px){.eu-itin .day{grid-template-columns:1fr;gap:18px}.eu-itin .daykey{display:flex;align-items:baseline;gap:20px;flex-wrap:wrap}.eu-itin .daynum{font-size:40px}.eu-itin .places{margin-top:0;display:flex;gap:18px;flex-wrap:wrap}.eu-itin .cols{grid-template-columns:1fr}.eu-itin .hero{padding-top:44px}
}
@media (prefers-reduced-motion:reduce){.eu-itin *{animation:none!important;transition:none!important}}

.eu-itin{padding:8px 0 40px}
.eu-itin .hero{padding-top:8px}
.eu-itin .wrap{max-width:1040px}
.eu-itin footer{padding:22px 0 0}
</style>
<div class="eu-main">

<section class="hero">
  <div class="wrap">
    <div class="eyebrow"><span class="rule"></span><span class="label">5박 6일 · 전용버스 · 인솔자 동행</span></div>
    <h1>프랑스 바스크와 <em>나바라</em></h1>
    <p class="lede">
      비스케이 만의 해안선을 따라 국경을 넘나드는 여정입니다. 스페인 쪽 산세바스티안과 온다리비아,
      프랑스 쪽 생장드뤼즈와 아이노아, 그리고 피레네 남쪽 바즈탄 계곡의 나바라까지—
      하나의 문화권이 두 나라에 걸쳐 어떻게 이어지는지를 엿새 동안 따라갑니다.
    </p>
    <dl class="facts">
      <div class="fact"><dt class="label">일정</dt><dd>5박 6일</dd></div>
      <div class="fact"><dt class="label">숙박</dt><dd>기푸스코아 3성급 5박</dd></div>
      <div class="fact"><dt class="label">이동</dt><dd>전 일정 전용버스</dd></div>
      <div class="fact"><dt class="label">인솔</dt><dd>전문 인솔자 동행</dd></div>
      <div class="fact"><dt class="label">출발·해산</dt><dd>마드리드</dd></div>
    </dl>
  </div>

  <div class="wrap garland" aria-hidden="true">
    <svg viewBox="0 0 600 34">
      <path d="M0 5 Q150 15 300 5 T600 5" fill="none" stroke="currentColor" stroke-width=".8" opacity=".4"/>
      <g stroke="var(--pine)" stroke-width=".9" fill="none" opacity=".8">
        <path d="M40 6 v-3"/><path d="M92 7 v-3"/><path d="M148 5 v-3"/><path d="M206 8 v-3"/><path d="M262 6 v-3"/>
        <path d="M318 5 v-3"/><path d="M376 7 v-3"/><path d="M432 6 v-3"/><path d="M490 5 v-3"/><path d="M546 7 v-3"/>
      </g>
      <g fill="currentColor">
        <g opacity=".9"><path d="M40 6 q3 0 3.4 4 q.4 5-3.4 12 q-3.8-7-3.4-12 Q37 6 40 6z"/></g>
        <g opacity=".7"><path d="M92 7 q2.6 0 3 3.4 q.4 4.4-3 10.6 q-3.4-6.2-3-10.6 Q89.4 7 92 7z"/></g>
        <g opacity=".95"><path d="M148 5 q3.2 0 3.6 4.4 q.4 5.4-3.6 13 q-4-7.6-3.6-13 Q144.8 5 148 5z"/></g>
        <g opacity=".65"><path d="M206 8 q2.4 0 2.8 3.2 q.4 4-2.8 9.8 q-3.2-5.8-2.8-9.8 Q203.6 8 206 8z"/></g>
        <g opacity=".9"><path d="M262 6 q3 0 3.4 4 q.4 5-3.4 12 q-3.8-7-3.4-12 Q259 6 262 6z"/></g>
        <g opacity=".75"><path d="M318 5 q2.7 0 3.1 3.6 q.4 4.6-3.1 11 q-3.5-6.4-3.1-11 Q315.3 5 318 5z"/></g>
        <g opacity=".95"><path d="M376 7 q3.2 0 3.6 4.2 q.4 5.2-3.6 12.4 q-4-7.2-3.6-12.4 Q372.8 7 376 7z"/></g>
        <g opacity=".6"><path d="M432 6 q2.4 0 2.8 3.2 q.4 4-2.8 9.6 q-3.2-5.6-2.8-9.6 Q429.6 6 432 6z"/></g>
        <g opacity=".9"><path d="M490 5 q3 0 3.4 4 q.4 5-3.4 12.4 q-3.8-7.4-3.4-12.4 Q487 5 490 5z"/></g>
        <g opacity=".7"><path d="M546 7 q2.6 0 3 3.4 q.4 4.4-3 10.4 q-3.4-6-3-10.4 Q543.4 7 546 7z"/></g>
      </g>
    </svg>
  </div>
</section>

<section class="mapsec">
  <div class="wrap">
    <div class="mapcard">
      <h2 class="display">국경을 사이에 둔 두 바스크</h2>
      <p class="note">방문지의 상대적 위치를 나타낸 개념도입니다. 실제 축척과 해안선 형태는 다릅니다.</p>
      <div class="mapscroll">
        <svg viewBox="0 0 100 72" role="img" aria-label="비스케이 만 연안과 피레네 서부의 방문 도시 위치 개념도. 국경선을 기준으로 북쪽에 프랑스 바스크의 앙다예·생장드뤼즈·비아리츠·바욘·사르·아이노아·에스플레트가, 남쪽에 스페인의 산세바스티안·온다리비아와 나바라의 아마이우르·엘리손도·팜플로나가 있습니다.">
          <path class="mp-sea" d="M0 0 H100 V2 L72 2 L62 5.5 L52 9.5 L42 13.5 L33 19 L26 22.5 L14 28.5 L2 44.5 L0 44.5 Z"/>
          <path class="mp-coast" d="M2 44.5 L14 28.5 L26 22.5 L33 19 L42 13.5 L52 9.5 L62 5.5 L72 2 L100 1"/>
          <text class="mp-c" x="10" y="13">비스케이 만</text>

          <path class="mp-border" d="M33 19 L38 26 L42 33 L50 37.5 L58 42.5 L70 46 L84 47.5"/>
          <text class="mp-c" x="79" y="31" fill="var(--accent)" opacity=".75">FRANCE</text>
          <text class="mp-c" x="26" y="58" fill="var(--accent)" opacity=".75">ESPAÑA</text>

          <path d="M3 67 L13.5 60.5" stroke="var(--ink-3)" stroke-width=".35" fill="none" stroke-dasharray="1.3 1.1"/>
          <text class="mp-n" x="2.5" y="70.4">← 마드리드 · 1일차 출발, 6일차 귀환</text>

          <circle class="mp-base" cx="19" cy="36" r="1.4"/>
          <text class="mp-t" x="21.4" y="36.7">기푸스코아 · 숙소 5박</text>

          <circle class="mp-dot es" cx="16" cy="31" r=".72"/><text class="mp-t" x="14.2" y="31.6" text-anchor="end">산세바스티안</text>
          <circle class="mp-dot es" cx="34" cy="23.5" r=".72"/><text class="mp-t" x="32.2" y="22.6" text-anchor="end">온다리비아</text>
          <circle class="mp-dot" cx="38.5" cy="20.5" r=".72"/><text class="mp-t" x="40.2" y="19.7">앙다예</text>
          <circle class="mp-dot" cx="46" cy="16.5" r=".72"/><text class="mp-t" x="47.7" y="15.8">생장드뤼즈</text>
          <circle class="mp-dot" cx="57" cy="10" r=".72"/><text class="mp-t" x="58.7" y="9.4">비아리츠</text>
          <circle class="mp-dot" cx="64" cy="13.5" r=".72"/><text class="mp-t" x="65.7" y="14.6">바욘</text>
          <circle class="mp-dot" cx="44" cy="30" r=".72"/><text class="mp-t" x="44" y="28.2" text-anchor="middle">사르</text>
          <circle class="mp-dot" cx="51.5" cy="31.5" r=".72"/><text class="mp-t" x="53.2" y="32.2">아이노아</text>
          <circle class="mp-dot" cx="56" cy="26" r=".72"/><text class="mp-t" x="57.7" y="25.4">에스플레트</text>
          <circle class="mp-dot es" cx="52" cy="41" r=".72"/><text class="mp-t" x="50.3" y="42.2" text-anchor="end">아마이우르</text>
          <circle class="mp-dot es" cx="51" cy="47.5" r=".72"/><text class="mp-t" x="52.7" y="48.1">엘리손도</text>
          <circle class="mp-dot es" cx="63" cy="61" r=".72"/><text class="mp-t" x="64.7" y="61.6">팜플로나</text>
        </svg>
      </div>
      <div class="maplegend">
        <span><i style="background:var(--accent)"></i>스페인 — 기푸스코아 · 나바라</span>
        <span><i style="background:var(--pine)"></i>프랑스 — 피레네자틀랑티크</span>
        <span><i style="background:var(--accent);opacity:.5"></i>국경선</span>
      </div>
    </div>
  </div>
</section>

<section class="itin">
  <div class="wrap">
    <h2 class="display">일정</h2>
    <p class="sub">현지 사정과 기상, 교통 상황에 따라 방문 순서가 조정될 수 있습니다.</p>

    <article class="day">
      <div class="daykey">
        <div class="daynum">01<sub>일차</sub></div>
        <ul class="places">
          <li>마드리드 출발<span class="lat">Madrid</span></li>
          <li>기푸스코아<span class="lat">Gipuzkoa</span></li>
        </ul>
      </div>
      <div class="daybody">
        <h3>북쪽으로</h3>
        <p>마드리드를 출발해 카스티야의 고원을 지나 북쪽 바스크 지방으로 향합니다. 여정 중 적절한 휴식 시간을 갖습니다.</p>
        <p>기푸스코아 지역 호텔에 도착해 <strong>체크인</strong>합니다. 이후 닷새 동안 같은 호텔에 머무르므로, 매일 짐을 옮길 필요가 없습니다.</p>
        <div class="meals"><span class="meal">석식</span></div>
        <span class="tag-stay">숙박 — 기푸스코아 3성급 호텔</span>
      </div>
    </article>

    <article class="day">
      <div class="daykey">
        <div class="daynum">02<sub>일차</sub></div>
        <ul class="places">
          <li>산세바스티안<span class="lat">San Sebastián</span></li>
          <li>생장드뤼즈<span class="lat">Saint-Jean-de-Luz</span></li>
          <li>앙다예<span class="lat">Hendaye</span></li>
        </ul>
      </div>
      <div class="daybody">
        <h3>라 콘차 만에서 국경의 강까지</h3>
        <p>조식 후 현지 가이드와 만나 <strong>산세바스티안</strong> 관광을 시작합니다. 반달 모양으로 완만하게 휘어진 <strong>라 콘차(La Concha) 만</strong>과 해변을 따라 걸으며, 산 비센테 교회와 대성당, 해변을 따라 이어지는 불레바르(Boulevard), 그리고 강어귀에 자리한 쿠르살(Kursaal)을 둘러봅니다.</p>
        <p>중식은 호텔로 복귀해 드십니다.</p>
        <p>오후에는 국경을 넘어 프랑스 바스크 해안의 아름다운 마을 <strong>생장드뤼즈</strong>를 방문합니다. 루이 14세가 머물렀던 <strong>메종 루이 14세</strong>와 그의 혼례가 치러진 <strong>생장바티스트 교회</strong> 등 품격 있는 건축을 살펴봅니다.</p>
        <p>이어 <strong>앙다예 만</strong>으로 이동합니다. 이곳 해안은 수천만 년의 퇴적층이 켜켜이 드러난 <strong>플리시(flysch)</strong> 지형으로 알려져 있습니다. 아바디아 성(입장료 별도)과, 프랑스와 스페인이 6개월씩 번갈아 관할하는 세계에서 가장 작은 공동 통치 영토 <strong>꿩의 섬(Isla de los Faisanes)</strong>도 이곳에서 만납니다.</p>
        <p>일정을 마친 후 호텔로 복귀합니다.</p>
        <div class="meals"><span class="meal">조식</span><span class="meal">중식 · 호텔</span><span class="meal">석식</span></div>
        <span class="tag-stay">숙박 — 기푸스코아 3성급 호텔</span>
      </div>
    </article>

    <article class="day">
      <div class="daykey">
        <div class="daynum">03<sub>일차</sub></div>
        <ul class="places">
          <li>사르<span class="lat">Sare</span></li>
          <li>아이노아<span class="lat">Ainhoa</span></li>
          <li>에스플레트<span class="lat">Espelette</span></li>
        </ul>
      </div>
      <div class="daybody">
        <h3>동굴과 붉은 고추의 마을</h3>
        <p>조식 후 바다와 산 사이에 자리한 <strong>사르</strong>로 출발합니다. 프랑스에서 가장 아름다운 마을로 꼽히는 곳입니다. 이곳에서 <strong>사르 동굴</strong>을 견학합니다. 200만 년 전의 모습을 그대로 간직한 석회암 동굴로, <strong>입장료가 포함</strong>되어 있습니다.</p>
        <p>중식은 자유식입니다. 마을의 작은 식당과 카페를 자유롭게 이용하실 수 있습니다.</p>
        <p>오후에는 전형적인 프랑스 바스크 마을인 <strong>아이노아</strong>와 <strong>에스플레트</strong>를 방문합니다. 흰 회벽에 붉거나 짙은 초록으로 칠한 창틀이 늘어선 거리가 이 지방의 얼굴입니다. 특히 에스플레트는 처마마다 <strong>붉은 고추를 엮어 말리는 풍경</strong>으로 널리 알려져 있습니다.</p>
        <p>일정을 마친 후 호텔로 복귀합니다.</p>
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal">석식</span></div>
        <span class="tag-stay">숙박 — 기푸스코아 3성급 호텔</span>
      </div>
    </article>

    <article class="day">
      <div class="daykey">
        <div class="daynum">04<sub>일차</sub></div>
        <ul class="places">
          <li>팜플로나<span class="lat">Pamplona</span></li>
          <li>아마이우르<span class="lat">Amaiur</span></li>
          <li>엘리손도<span class="lat">Elizondo</span></li>
        </ul>
      </div>
      <div class="daybody">
        <h3>나바라의 주도와 바즈탄 계곡</h3>
        <p>조식 후 나바라의 주도 <strong>팜플로나</strong>를 탐방합니다. 도시의 거실이라 불리는 <strong>카스티요 광장</strong>, 바이올리니스트 사라사테의 이름을 딴 <strong>사라사테 산책로</strong>, <strong>시청 광장</strong>, 그리고 회랑이 아름다운 <strong>산타 마리아 라 레알 대성당</strong>을 둘러봅니다.</p>
        <p>중식은 <strong>팜플로나 시내 레스토랑에서 제공</strong>됩니다.</p>
        <p>오후에는 그림 같은 마을 <strong>아마이우르</strong>로 향합니다. 아레체아 궁전(Palacio Arretxea)과 아리아다 저택(Casa Arriada) 같은 석조 저택들이 좁은 길을 따라 늘어서 있습니다.</p>
        <p>이어 바즈탄 계곡의 중심지 <strong>엘리손도</strong>로 이동합니다. 바로크 양식의 아리스쿠네네아(Arizkunenea) 궁전, 시청사, 다투에(Datue) 궁전, 부왕의 저택(Casa del Virrey), 산티아고 교회가 강을 끼고 모여 있습니다.</p>
        <p>일정을 마친 후 호텔로 복귀합니다.</p>
        <div class="meals"><span class="meal">조식</span><span class="meal star">중식 · 레스토랑</span><span class="meal">석식</span></div>
        <span class="tag-stay">숙박 — 기푸스코아 3성급 호텔</span>
      </div>
    </article>

    <article class="day">
      <div class="daykey">
        <div class="daynum">05<sub>일차</sub></div>
        <ul class="places">
          <li>비아리츠<span class="lat">Biarritz</span></li>
          <li>바욘<span class="lat">Bayonne</span></li>
          <li>온다리비아<span class="lat">Hondarribia</span></li>
        </ul>
      </div>
      <div class="daybody">
        <h3>포경 마을에서 성벽 마을로</h3>
        <p>조식 후 과거 포경 마을이었다가 19세기 유럽 왕실의 휴양지로 변모한 <strong>비아리츠</strong>를 방문합니다. 해양 박물관, 생 마르탱 교회, 러시아 정교회 성당 등을 둘러봅니다.</p>
        <p>이어 <strong>바욘</strong>으로 이동합니다. 생트 마리 대성당, 구 성(Castillo Viejo), 지역 식재료가 모이는 <strong>레 알(Les Halles) 시장</strong>, 시청과 식물원을 둘러봅니다.</p>
        <p>중식은 자유식입니다. 레 알 시장 주변에서 바스크의 식재료를 직접 맛보실 수 있습니다.</p>
        <p>오후에는 다시 스페인으로 넘어와 <strong>온다리비아</strong>를 방문합니다. 하이스키벨(Jaizkibel) 산기슭에 자리해 높고 두꺼운 성벽이 구시가지를 감싸고 있으며, 프랑스와의 자연 국경을 이루는 곳입니다. 카를로스 5세 성, 누에스트라 세뇨라 델 만사노 교회, 에체베스테 저택(Casa de Etxebeste), 기푸스코아 광장과 중세의 거리를 걷습니다.</p>
        <p>일정을 마친 후 호텔로 복귀합니다.</p>
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal">석식</span></div>
        <span class="tag-stay">숙박 — 기푸스코아 3성급 호텔</span>
      </div>
    </article>

    <article class="day">
      <div class="daykey">
        <div class="daynum">06<sub>일차</sub></div>
        <ul class="places">
          <li>마드리드 귀환<span class="lat">Madrid</span></li>
        </ul>
      </div>
      <div class="daybody">
        <h3>귀환</h3>
        <p>조식 후 마드리드로 귀환 여정을 시작합니다. 경로상 짧은 휴식 시간을 가지며 이동합니다.</p>
        <p>중식은 자유식입니다.</p>
        <p>목적지 도착 후 모든 여행 서비스가 종료됩니다.</p>
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span></div>
      </div>
    </article>
  </div>
</section>

<section class="incl">
  <div class="wrap">
    <h2 class="display">포함 · 불포함</h2>
    <div class="cols">
      <div class="card">
        <h3><span class="pip"></span>포함 사항</h3>
        <ul>
          <li><b>숙박</b>기푸스코아 지역 3성급 호텔 5박</li>
          <li><b>차량</b>전 일정 전용 버스(Autocar) 이동</li>
          <li><b>식사</b>일정표에 표기된 식사</li>
          <li><b>음료</b>제공 식사 시 물과 와인</li>
          <li><b>특별 식사</b>4일차 팜플로나 레스토랑 중식</li>
          <li><b>인솔</b>전 일정 전문 인솔자 동행</li>
          <li><b>입장</b>3일차 사르 동굴 입장료</li>
        </ul>
      </div>
      <div class="card no">
        <h3><span class="pip"></span>불포함 사항</h3>
        <ul>
          <li><b>가이드 · 입장료</b>별도 명시된 경우를 제외한 현지 가이드 투어와 관광지 입장료</li>
          <li><b>아바디아 성</b>2일차 앙다예 아바디아 성 입장료</li>
          <li><b>관광세</b>숙박지 관광세(Tourist tax)</li>
          <li><b>선택 관광</b>선택(옵션) 투어</li>
          <li><b>보험</b>여행자 보험</li>
          <li><b>개인 비용</b>위 항목에 명시되지 않은 모든 개인 비용</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="notes">
  <div class="wrap">
    <h2 class="display">예약 전 확인해 주십시오</h2>
    <ol>
      <li>본 일정은 <strong>마드리드 출발·해산</strong> 기준입니다. 항공권은 포함되어 있지 않습니다.</li>
      <li>2일차 산세바스티안 관광에는 현지 가이드가 동행하며, 그 외 구간은 인솔자가 안내합니다.</li>
      <li>사르 동굴은 내부 온도가 연중 약 11~14℃로 유지됩니다. 여름에도 <strong>겉옷</strong>을 준비해 주십시오. 동굴 내부에는 계단과 경사 구간이 있습니다.</li>
      <li>프랑스와 스페인 국경을 여러 차례 통과합니다. <strong>여권을 항상 소지</strong>해 주십시오.</li>
      <li>일부 소도시는 차량 진입이 제한되어 도보 이동 구간이 있습니다. 편한 신발을 권해 드립니다.</li>
      <li>현지 사정과 기상, 도로 상황, 시설 휴관일에 따라 방문 순서와 내용이 조정될 수 있습니다.</li>
      <li>요금과 출발일은 별도 문의해 주십시오. 인원과 시즌에 따라 달라집니다.</li>
    </ol>
  </div>
</section>

<section class="cta">
  <div class="wrap">
    <div>
      <div class="label">문의</div>
      <h2 class="display">일정을 원하시는 대로 맞춰 드립니다</h2>
      <p>인원, 출발일, 호텔 등급, 식사 구성에 따라 맞춤 견적을 드립니다. 스페인 현지에서 직접 운영하므로 일정 변경과 긴급 상황에도 빠르게 대응합니다.</p>
    </div>
    <div class="contact">
      <span class="label">Euforia Tour Spain</span>
      <a href="mailto:euforia@euforiatour.com">euforia@euforiatour.com</a>
    </div>
  </div>
</section>

</div>

<footer>
  <div class="wrap">
    <span>EUFORIA DAS NUVENS S.L. · Madrid, España</span>
    <span>País Vasco francés y Navarra · 5박 6일</span>
  </div>
</footer>
</div>
`,
      highlights: ['산세바스티안 라 콘차 만 · 현지 가이드 투어', '생장드뤼즈 · 앙다예 플리시 해안', '사르 동굴 탐험 (입장료 포함)', '아이노아 · 에스플레트 붉은 고추 마을', '팜플로나 · 바즈탄 계곡 엘리손도'],
      includes: ['기푸스코아 3성급 호텔 5박', '전 일정 전용버스 이동', '전문 인솔자 동행', '일정표 표기 식사 및 음료(물·와인)', '사르 동굴 입장료'],
      excludes: ['왕복 항공권', '현지 가이드 투어·관광지 입장료(별도 명시 제외)', '아바디아 성 입장료', '숙박지 관광세', '여행자 보험', '개인 경비'],
      duration: '5박 6일 (마드리드 출발·해산)'
    }
  },
 {
    id: 'portugal-8days',
    cats: ['portugal'],
    topClass: 'portugal',
    region: 'PORTUGAL',
    days: '8일 7박',
    price: '가격 문의',
    title: '[포르투갈 일주] 리스본 IN/OUT 8일 7박',
    summary: '리스본에서 대서양 절벽까지, 성벽 마을과 성지를 지나 포르투까지 — 유네스코 세계유산 9곳을 한 동선에 담은 8일 일주예요.',
    tags: ['8일 7박', '왕복 직항', '전용차량+한국인 인솔'],
    isNew: true,
    detail: {
      lead: '리스본 3박·파티마 1박·포르투 3박, 짐은 세 번만 풀면서 남쪽에서 북쪽으로 한 방향으로 이어지는 포르투갈 종단 일주예요.',
      description: `<!-- ── Euforia Tour · 포르투갈 일주 8일 · 붙여넣기용 조각 ──
     이 블록 전체를 상세설명 HTML 칸에 그대로 붙여 넣으십시오.
     모든 스타일이 .eu-itin 안으로만 적용되므로 사이트의 기존 디자인과 부딪히지 않습니다. ── -->
<div class="eu-itin">
<style>
@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,700&family=Gowun+Batang:wght@400;700&family=IBM+Plex+Sans+KR:wght@300;400;500;600&display=swap");
.eu-itin h1,.eu-itin h2,.eu-itin h3,.eu-itin h4,.eu-itin h5{
  color:var(--ink);font-family:inherit;margin:0;line-height:1.25;text-transform:none;
}
.eu-itin p,.eu-itin li,.eu-itin dl,.eu-itin dt,.eu-itin dd,.eu-itin span,.eu-itin div,.eu-itin strong,.eu-itin b,.eu-itin em{
  font-family:inherit;
}
.eu-itin .display{font-family:"Fraunces","Gowun Batang",Georgia,serif}
.eu-itin h1 em{color:var(--accent);font-style:normal}
.eu-itin a{color:var(--accent);text-decoration:none}
.eu-itin ul,.eu-itin ol{margin:0}
.eu-itin section,.eu-itin article,.eu-itin footer{margin:0;background:none;border:0}
.eu-itin svg{max-width:100%}
.eu-itin{background:var(--ground)}

.eu-itin{
  --ground:#FAF9F6;
  --surface:#FFFFFF;
  --surface-2:#F1EFE9;
  --ink:#1B201D;
  --ink-2:#4A524D;
  --ink-3:#7C837E;
  --line:#DCD9D0;
  --line-soft:#E9E6DE;
  --accent:#1E5C4E;
  --accent-soft:#DEEBE6;
  --pine:#8C2B2B;
  --pine-soft:#F0E2DE;
  --sea:#DCE4E3;
  --shadow:0 1px 2px rgba(27,32,29,.05),0 8px 24px -14px rgba(27,32,29,.22);
}.eu-itin *{box-sizing:border-box}.eu-itin{
  margin:0;
  background:var(--ground);
  color:var(--ink);
  font-family:"IBM Plex Sans KR","IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Malgun Gothic",sans-serif;
  font-weight:400;
  font-size:16px;
  line-height:1.75;
  -webkit-font-smoothing:antialiased;
  word-break:keep-all;
}.eu-itin .wrap{max-width:1040px;margin:0 auto;padding:0 24px}.eu-itin .display{font-family:"Fraunces","Gowun Batang",Georgia,serif;font-weight:700;letter-spacing:-.01em;text-wrap:balance;line-height:1.2}.eu-itin .label{
  font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;
  color:var(--ink-3);
}.eu-itin .masthead{
  border-bottom:1px solid var(--line);
  background:var(--surface);
}.eu-itin .masthead .wrap{
  display:flex;align-items:center;justify-content:space-between;gap:16px;
  padding-top:18px;padding-bottom:18px;flex-wrap:wrap;
}.eu-itin .brand{display:flex;align-items:baseline;gap:10px}.eu-itin .brand strong{font-family:"Fraunces",serif;font-weight:700;font-size:19px;letter-spacing:-.01em}.eu-itin .brand span{font-size:12px;color:var(--ink-3);letter-spacing:.06em}.eu-itin .hero{padding:64px 0 0}.eu-itin .eyebrow{display:flex;align-items:center;gap:12px;margin-bottom:20px}.eu-itin .eyebrow .rule{height:1px;flex:0 0 40px;background:var(--accent)}.eu-itin h1{font-size:clamp(38px,6.4vw,64px);margin:0 0 22px}.eu-itin h1 em{font-style:normal;color:var(--accent)}.eu-itin .lede{
  font-size:clamp(17px,2.1vw,19px);color:var(--ink-2);max-width:60ch;margin:0 0 34px;
  font-weight:300;line-height:1.85;
}.eu-itin .facts{
  display:grid;gap:1px;background:var(--line);
  grid-template-columns:repeat(auto-fit,minmax(160px,1fr));
  border:1px solid var(--line);border-radius:2px;overflow:hidden;
}.eu-itin .fact{background:var(--surface);padding:18px 20px}.eu-itin .fact dt{margin:0 0 6px}.eu-itin .fact dd{margin:0;font-size:16px;font-weight:500;line-height:1.5}.eu-itin .garland{margin:56px 0 0;color:var(--accent);opacity:.9}.eu-itin .garland svg{display:block;width:100%;height:34px}.eu-itin .mapsec{padding:56px 0 8px}.eu-itin .mapcard{
  background:var(--surface);border:1px solid var(--line);border-radius:2px;
  padding:26px 26px 18px;box-shadow:var(--shadow);
}.eu-itin .mapcard h2{font-size:20px;margin:0 0 4px}.eu-itin .mapcard p.note{font-size:13px;color:var(--ink-3);margin:0 0 18px}.eu-itin .mapscroll{overflow-x:auto}.eu-itin .mapscroll svg{display:block;min-width:0;width:100%;max-width:640px;margin:0 auto;height:auto}.eu-itin .mp-sea{fill:var(--sea)}.eu-itin .mp-coast{fill:none;stroke:var(--ink-3);stroke-width:.4;opacity:.55}.eu-itin .mp-route{fill:none;stroke:var(--pine);stroke-width:.5;stroke-dasharray:1.4 1.1;opacity:.85}.eu-itin .mp-dot{fill:var(--accent)}.eu-itin .mp-dot.stay{fill:var(--pine)}.eu-itin .mp-base{fill:var(--surface);stroke:var(--pine);stroke-width:.7}.eu-itin .mp-t{font-size:2.1px;fill:var(--ink-2);font-family:"IBM Plex Sans KR",sans-serif;font-weight:500}.eu-itin .mp-c{font-size:2.1px;fill:var(--ink-3);font-family:"IBM Plex Sans KR",sans-serif;letter-spacing:.14em}.eu-itin .mp-n{font-size:1.9px;fill:var(--ink-3);font-family:"IBM Plex Sans KR",sans-serif}.eu-itin .maplegend{display:flex;flex-wrap:wrap;gap:18px;margin-top:14px;font-size:12.5px;color:var(--ink-2)}.eu-itin .maplegend i{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:7px;vertical-align:1px}.eu-itin .itin{padding:56px 0 0}.eu-itin .itin > h2{font-size:clamp(24px,3.4vw,30px);margin:0 0 6px}.eu-itin .itin > p.sub{color:var(--ink-3);margin:0 0 36px;font-size:14.5px}.eu-itin .day{
  display:grid;grid-template-columns:196px 1fr;gap:36px;
  padding:34px 0;border-top:1px solid var(--line);
}.eu-itin .day:last-of-type{border-bottom:1px solid var(--line)}.eu-itin .daykey{position:relative}.eu-itin .daynum{
  font-family:"Fraunces",serif;font-weight:300;font-size:52px;line-height:1;
  color:var(--accent);letter-spacing:-.03em;font-variant-numeric:tabular-nums;
}.eu-itin .daynum sub{font-size:15px;font-weight:500;vertical-align:baseline;margin-left:4px;color:var(--ink-3)}.eu-itin .places{margin:14px 0 0;padding:0;list-style:none}.eu-itin .places li{
  font-weight:500;font-size:15.5px;line-height:1.5;padding:3px 0;
}.eu-itin .places li .lat{display:block;font-family:"Fraunces",serif;font-weight:300;font-size:13px;color:var(--ink-3);letter-spacing:.01em}.eu-itin .daybody h3{font-size:19px;margin:0 0 12px;font-weight:600;letter-spacing:-.005em}.eu-itin .daybody p{margin:0 0 14px;color:var(--ink-2);max-width:62ch}.eu-itin .daybody p:last-child{margin-bottom:0}.eu-itin .daybody strong{color:var(--ink);font-weight:600}.eu-itin .meals{
  display:flex;flex-wrap:wrap;gap:8px;margin-top:18px;padding-top:16px;
  border-top:1px dashed var(--line);
}.eu-itin .meal{
  font-size:12px;font-weight:500;letter-spacing:.02em;
  padding:4px 11px;border-radius:2px;
  background:var(--accent-soft);color:var(--accent);
}.eu-itin .meal.free{background:var(--surface-2);color:var(--ink-3)}.eu-itin .meal.star{background:var(--pine-soft);color:var(--pine)}.eu-itin .tag-stay{
  display:inline-block;margin-top:14px;font-size:12.5px;color:var(--ink-3);
}.eu-itin .info{padding:60px 0 0}.eu-itin .info h2{font-size:clamp(22px,3vw,26px);margin:0 0 22px}.eu-itin .info .why{display:flex;flex-direction:column;gap:16px}.eu-itin .info .why p{margin:0;color:var(--ink-2);font-size:14.5px;line-height:1.8;max-width:70ch}.eu-itin .info .why strong{color:var(--ink);font-weight:600}.eu-itin .alt{padding:52px 0 0}.eu-itin .alt .box{background:var(--surface-2);border:1px solid var(--line);border-radius:2px;padding:28px 28px 30px}.eu-itin .alt h2{font-size:19px;margin:0 0 12px}.eu-itin .alt p{margin:0 0 12px;font-size:14px;color:var(--ink-2);line-height:1.75}.eu-itin .alt ul{margin:10px 0 16px;padding-left:18px;display:flex;flex-direction:column;gap:6px}.eu-itin .alt li{font-size:13.5px;color:var(--ink-2)}.eu-itin .alt .reco{border-top:1px dashed var(--line);margin-top:16px;padding-top:16px;font-size:13.5px;color:var(--ink)}.eu-itin .opt{padding:56px 0 0}.eu-itin .opt h2{font-size:clamp(22px,3vw,26px);margin:0 0 22px}.eu-itin .opttable{width:100%;border-collapse:collapse;font-size:13.5px}.eu-itin .opttable th{text-align:left;padding:10px 14px;background:var(--surface-2);color:var(--ink-3);font-weight:600;font-size:11px;letter-spacing:.06em;text-transform:uppercase;border-bottom:1px solid var(--line)}.eu-itin .opttable td{padding:12px 14px;border-bottom:1px solid var(--line-soft);color:var(--ink-2)}.eu-itin .opttable td:first-child{color:var(--ink);font-weight:600;white-space:nowrap}.eu-itin .incl{padding:64px 0 0}.eu-itin .cols{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:26px}.eu-itin .card{
  border:1px solid var(--line);border-radius:2px;padding:26px 26px 28px;
  background:var(--surface);
}.eu-itin .card.no{background:var(--surface-2)}.eu-itin .card h3{font-size:17px;margin:0 0 4px;display:flex;align-items:center;gap:9px;font-weight:600}.eu-itin .card h3 .pip{width:8px;height:8px;border-radius:50%;background:var(--accent);flex:0 0 auto}.eu-itin .card.no h3 .pip{background:var(--ink-3)}.eu-itin .card ul{margin:16px 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:12px}.eu-itin .card li{
  font-size:14.5px;line-height:1.65;color:var(--ink-2);
  padding-left:16px;position:relative;
}.eu-itin .card li::before{
  content:"";position:absolute;left:0;top:.7em;
  width:6px;height:1px;background:var(--line);
}.eu-itin .card li b{color:var(--ink);font-weight:600;display:block;font-size:13px;letter-spacing:.02em}.eu-itin .notes{padding:52px 0 0}.eu-itin .notes ol{margin:18px 0 0;padding-left:20px;display:flex;flex-direction:column;gap:10px}.eu-itin .notes li{font-size:14px;color:var(--ink-2);line-height:1.7}.eu-itin .cta{margin:64px 0 0;border-top:2px solid var(--accent);background:var(--surface);padding:38px 0 44px}.eu-itin .cta .wrap{display:flex;justify-content:space-between;align-items:flex-end;gap:28px;flex-wrap:wrap}.eu-itin .cta h2{font-size:clamp(22px,3vw,28px);margin:8px 0 10px}.eu-itin .cta p{margin:0;color:var(--ink-2);font-size:15px;max-width:46ch}.eu-itin .contact{display:flex;flex-direction:column;gap:6px;font-size:15px}.eu-itin .contact a{color:var(--accent);text-decoration:none;border-bottom:1px solid var(--accent-soft);font-weight:500}.eu-itin .contact a:hover, .eu-itin .contact a:focus-visible{border-bottom-color:var(--accent)}.eu-itin footer{padding:26px 0 60px;color:var(--ink-3);font-size:12.5px}.eu-itin footer .wrap{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap}.eu-itin a:focus-visible, .eu-itin li:focus-visible{outline:2px solid var(--accent);outline-offset:3px}

@media (max-width:800px){.eu-itin .day{grid-template-columns:1fr;gap:18px}.eu-itin .daykey{display:flex;align-items:baseline;gap:20px;flex-wrap:wrap}.eu-itin .daynum{font-size:40px}.eu-itin .places{margin-top:0;display:flex;gap:18px;flex-wrap:wrap}.eu-itin .cols{grid-template-columns:1fr}.eu-itin .hero{padding-top:44px}
}
@media (prefers-reduced-motion:reduce){.eu-itin *{animation:none!important;transition:none!important}}

.eu-itin{padding:8px 0 40px}
.eu-itin .hero{padding-top:8px}
.eu-itin .wrap{max-width:1040px}
.eu-itin footer{padding:22px 0 0}
</style>
<div class="eu-main">

<section class="hero">
  <div class="wrap">
    <div class="eyebrow"><span class="rule"></span><span class="label">8일 7박 · 왕복 직항 · 전용차량+한국인 인솔</span></div>
    <h1>포르투갈 <em>일주</em></h1>
    <p class="lede">
      리스본에 내려 대서양이 끝나는 절벽까지 갔다가, 성벽 마을과 성지를 지나 북쪽 포르투까지 올라갑니다.
      짐은 세 번만 풉니다 — 리스본 3박, 파티마 1박, 포르투 3박.
      유네스코 세계유산 아홉 곳을 한 동선에 담았습니다.
    </p>
    <dl class="facts">
      <div class="fact"><dt class="label">일정</dt><dd>8일 7박</dd></div>
      <div class="fact"><dt class="label">구간</dt><dd>리스본 IN/OUT · KE921·KE922</dd></div>
      <div class="fact"><dt class="label">숙박</dt><dd>3·1·3 (리스본·파티마·포르투)</dd></div>
      <div class="fact"><dt class="label">세계유산</dt><dd>9곳 (선택 관광 포함 시 11곳)</dd></div>
      <div class="fact"><dt class="label">총 주행</dt><dd>약 1,090km · 하루 평균 156km</dd></div>
    </dl>
  </div>

  <div class="wrap garland" aria-hidden="true">
    <svg viewBox="0 0 600 34">
      <path d="M0 5 Q150 15 300 5 T600 5" fill="none" stroke="currentColor" stroke-width=".8" opacity=".4"/>
      <g fill="currentColor" opacity=".8">
        <circle cx="40" cy="8" r="2.4"/><circle cx="120" cy="6" r="2.4"/><circle cx="200" cy="9" r="2.4"/>
        <circle cx="280" cy="6" r="2.4"/><circle cx="360" cy="8" r="2.4"/><circle cx="440" cy="6" r="2.4"/>
        <circle cx="520" cy="9" r="2.4"/><circle cx="580" cy="6" r="2.4"/>
      </g>
    </svg>
  </div>
</section>

<section class="mapsec">
  <div class="wrap">
    <div class="mapcard">
      <h2 class="display">남쪽에서 북쪽으로, 한 방향</h2>
      <p class="note">방문지의 상대적 위치를 나타낸 개념도입니다. 실제 축척과 해안선 형태는 다릅니다.</p>
      <div class="mapscroll">
        <svg viewBox="0 0 62 100" role="img" aria-label="포르투갈 서안을 따라 리스본에서 포르투까지 북상하는 여정 개념도. 리스본, 신트라, 까보 다 로카, 카스카이스, 오비두스, 나자레, 알코바사, 바탈랴, 파티마, 코임브라, 아베이루, 코스타 노바, 포르투, 브라가, 기마랑이스가 표시되어 있습니다.">
          <path class="mp-sea" d="M0 0 H62 V100 H0 Z"/>
          <path class="mp-coast" d="M6 4 L5 18 L4 30 L3 42 L2 55 L2.5 68 L4 80 L7 92 L10 100"/>
          <text class="mp-c" x="18" y="14">ATLÂNTICO</text>

          <path class="mp-route" d="M13 82 L11 78 L9 72 L8 66 L7 60 L8 54 L10 48 L13 44 L16 40 L18 34 L20 28 L21 22 L20 16 L18 11"/>

          <circle class="mp-dot stay" cx="13" cy="82" r="1.2"/>
          <text class="mp-t" x="15.6" y="82.6">리스본 · 3박</text>

          <circle class="mp-dot" cx="7" cy="78" r=".8"/><text class="mp-t" x="4.4" y="78.6" text-anchor="end">신트라</text>
          <circle class="mp-dot" cx="4" cy="79.5" r=".8"/><text class="mp-t" x="1.4" y="76" text-anchor="end">까보 다 로카</text>
          <circle class="mp-dot" cx="6" cy="83.5" r=".8"/><text class="mp-t" x="3.4" y="87" text-anchor="end">카스카이스</text>

          <circle class="mp-dot" cx="9" cy="72" r=".8"/><text class="mp-t" x="11.6" y="72.6">오비두스</text>
          <circle class="mp-dot" cx="8" cy="66" r=".8"/><text class="mp-t" x="5.4" y="66.6" text-anchor="end">나자레</text>
          <circle class="mp-dot" cx="10" cy="61" r=".8"/><text class="mp-t" x="12.6" y="61.6">알코바사</text>
          <circle class="mp-dot" cx="12" cy="56" r=".8"/><text class="mp-t" x="14.6" y="56.6">바탈랴</text>

          <circle class="mp-dot stay" cx="13" cy="50" r="1.2"/>
          <text class="mp-t" x="15.6" y="50.6">파티마 · 1박</text>

          <circle class="mp-dot" cx="18" cy="41" r=".8"/><text class="mp-t" x="20.6" y="41.6">코임브라</text>
          <circle class="mp-dot" cx="14" cy="34" r=".8"/><text class="mp-t" x="11.4" y="34.6" text-anchor="end">아베이루</text>
          <circle class="mp-dot" cx="11" cy="32" r=".8"/><text class="mp-t" x="8.4" y="29" text-anchor="end">코스타 노바</text>

          <circle class="mp-dot stay" cx="20" cy="22" r="1.2"/>
          <text class="mp-t" x="22.6" y="22.6">포르투 · 3박</text>

          <circle class="mp-dot" cx="26" cy="15" r=".8"/><text class="mp-t" x="28.6" y="15.6">브라가</text>
          <circle class="mp-dot" cx="24" cy="19" r=".8"/><text class="mp-t" x="26.6" y="19.6">기마랑이스</text>

          <path d="M13 88 L13 96" stroke="var(--ink-3)" stroke-width=".35" fill="none" stroke-dasharray="1.1 1"/>
          <text class="mp-n" x="13" y="99" text-anchor="middle">↑ 1일차 도착 · 8일차 출국</text>
        </svg>
      </div>
      <div class="maplegend">
        <span><i style="background:var(--pine)"></i>숙박 도시 — 리스본·파티마·포르투</span>
        <span><i style="background:var(--accent)"></i>당일 방문지</span>
        <span><i style="background:var(--accent);opacity:.5"></i>이동 경로</span>
      </div>
    </div>
  </div>
</section>

<section class="itin">
  <div class="wrap">
    <h2 class="display">일정</h2>
    <p class="sub">대한항공 직항은 수·금·일 주 3회 운항합니다. 리스본 도착이 저녁이고 귀국편이 밤 늦게 출발하므로, 첫날은 이동만 하고 마지막 날은 온전히 관광에 씁니다.</p>

    <article class="day">
      <div class="daykey">
        <div class="daynum">01<sub>일차</sub></div>
        <ul class="places">
          <li>인천 → 리스본<span class="lat">Incheon → Lisboa</span></li>
        </ul>
      </div>
      <div class="daybody">
        <h3>인천 → 리스본</h3>
        <p>수·금·일 KE921편, 13:00 인천공항 출발, 15시간 20분 비행 후 20:15 리스본 도착합니다.</p>
        <p>현지 가이드 미팅 후 호텔로 이동합니다(공항–호텔 약 20분). 첫날은 이동과 휴식에 씁니다.</p>
        <div class="meals"><span class="meal free">기내식</span></div>
        <span class="tag-stay">숙박 — 리스본 (1/3박)</span>
      </div>
    </article>

    <article class="day">
      <div class="daykey">
        <div class="daynum">02<sub>일차</sub></div>
        <ul class="places">
          <li>리스본 종일<span class="lat">Lisboa</span></li>
        </ul>
      </div>
      <div class="daybody">
        <h3>대항해시대의 도시</h3>
        <p><strong>제로니무스 수도원(세계유산)</strong> — 대항해시대의 부로 지은 마누엘 양식의 정점, 바스쿠 다 가마가 잠든 곳입니다.</p>
        <p><strong>벨렘탑(세계유산)</strong>과 <strong>발견기념비</strong> — 테주 강가에서 배들이 떠나던 자리를 둘러봅니다. 이어 1837년부터 같은 자리에서 굽는 원조 에그타르트, <strong>파스테이스 드 벨렝</strong>을 맛봅니다.</p>
        <p><strong>코메르시우 광장 · 아우구스타 개선문 · 산타 주스타 엘리베이터</strong>를 지나, 1755년 대지진에도 살아남은 옛 골목 <strong>알파마</strong>와 <strong>상 조르지 성</strong>에서 도시 전경을 봅니다. 언덕과 골목을 그대로 훑고 지나가는 <strong>28번 트램</strong>도 체험 승차합니다.</p>
        <p>시내 이동 약 40km, 도보 구간이 많습니다. (선택) 유네스코 무형문화유산인 <strong>파두 디너쇼</strong>를 즐기실 수 있습니다.</p>
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal">석식</span></div>
        <span class="tag-stay">숙박 — 리스본 (2/3박)</span>
      </div>
    </article>

    <article class="day">
      <div class="daykey">
        <div class="daynum">03<sub>일차</sub></div>
        <ul class="places">
          <li>신트라<span class="lat">Sintra</span></li>
          <li>까보 다 로카<span class="lat">Cabo da Roca</span></li>
          <li>카스카이스<span class="lat">Cascais</span></li>
        </ul>
      </div>
      <div class="daybody">
        <h3>대륙의 끝, 유라시아 최서단</h3>
        <p><strong>신트라 문화경관(세계유산)</strong> — 왕과 귀족들이 여름을 나던 안개 낀 산자락입니다. 노랑과 빨강으로 칠한 낭만주의 궁전 <strong>페나 궁전</strong>에서 산 능선을 통째로 내려다보고, 지하 27m로 나선을 그리며 내려가는 입회의 우물 <strong>킨타 다 헤갈레이라</strong>를 둘러봅니다. 신트라 구시가에서 명물 페이스트리 <strong>트라베세이루</strong>도 맛봅니다.</p>
        <p><strong>까보 다 로카</strong> — 유라시아 대륙 최서단입니다. "여기 땅이 끝나고 바다가 시작된다"는 카몽이스의 시구가 새겨져 있습니다.</p>
        <p><strong>카스카이스</strong>와 대서양이 절벽을 파고든 <strong>보카 두 인페르누(지옥의 입)</strong>를 지나, 에스토릴 해안도로를 따라 리스본으로 돌아옵니다. 약 110km, 주행 2시간입니다.</p>
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal">석식</span></div>
        <span class="tag-stay">숙박 — 리스본 (3/3박)</span>
      </div>
    </article>

    <article class="day">
      <div class="daykey">
        <div class="daynum">04<sub>일차</sub></div>
        <ul class="places">
          <li>오비두스<span class="lat">Óbidos</span></li>
          <li>나자레<span class="lat">Nazaré</span></li>
          <li>알코바사 · 바탈랴<span class="lat">Alcobaça · Batalha</span></li>
          <li>파티마<span class="lat">Fátima</span></li>
        </ul>
      </div>
      <div class="daybody">
        <h3>성벽 마을에서 성지까지</h3>
        <p><strong>오비두스</strong> — 왕비에게 결혼 선물로 준 성벽 마을입니다. 초콜릿 잔에 담아 마시는 <strong>진자 리큐르</strong>를 맛봅니다.</p>
        <p><strong>나자레</strong> — 시티오 전망대와 절벽 푸니쿨라, 겨울이면 30m 파도가 서는 것으로 유명한 프라이아 두 노르트를 봅니다.</p>
        <p><strong>알코바사 수도원(세계유산)</strong> — 페드루 1세와 이네스가 서로를 마주 보고 누운 무덤이 있습니다. <strong>바탈랴 수도원(세계유산)</strong> — 지붕을 끝내 얹지 못한 '미완의 예배당'을 봅니다. (선택) <strong>토마르 그리스도 수도원(세계유산)</strong> — 템플기사단의 본거지도 방문 가능합니다.</p>
        <p><strong>파티마</strong>에 도착해 1917년 성모 발현 성지, 발현 예배당과 대성당을 둘러봅니다. (선택) 광장을 가득 메우는 <strong>야간 촛불 행렬</strong>에 참여하실 수 있습니다. 약 230km, 주행 3시간(구간별 15~45분)입니다.</p>
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal star">석식 · 파티마 호텔</span></div>
        <span class="tag-stay">숙박 — 파티마 (1박 · 석식 포함형 호텔)</span>
      </div>
    </article>

    <article class="day">
      <div class="daykey">
        <div class="daynum">05<sub>일차</sub></div>
        <ul class="places">
          <li>코임브라<span class="lat">Coimbra</span></li>
          <li>아베이루 · 코스타 노바<span class="lat">Aveiro · Costa Nova</span></li>
          <li>포르투 도착<span class="lat">Porto</span></li>
        </ul>
      </div>
      <div class="daybody">
        <h3>유럽 최고(最古)의 대학에서 줄무늬 마을까지</h3>
        <p><strong>코임브라 대학(세계유산)</strong> — 1290년에 문을 연, 유럽에서 가장 오래된 대학 중 하나입니다. 금박 서가와 책벌레를 잡는 박쥐가 사는 <strong>조아니나 도서관</strong>, 검은 망토를 걸친 학생들의 풍경을 봅니다.</p>
        <p><strong>아베이루</strong> — 운하를 젓는 색색의 몰리세이루 배와, 달걀 과자 <strong>오보스 몰레스</strong>를 맛봅니다. <strong>코스타 노바</strong> — 대서양을 등지고 늘어선 줄무늬 목조 가옥을 봅니다.</p>
        <p>저녁 포르투에 도착합니다. 약 220km, 주행 2시간 40분입니다.</p>
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal">석식</span></div>
        <span class="tag-stay">숙박 — 포르투 (1/3박)</span>
      </div>
    </article>

    <article class="day">
      <div class="daykey">
        <div class="daynum">06<sub>일차</sub></div>
        <ul class="places">
          <li>포르투 종일<span class="lat">Porto</span></li>
        </ul>
      </div>
      <div class="daybody">
        <h3>두루 강을 낀 옛 도시</h3>
        <p><strong>포르투 역사지구(세계유산)</strong> — 두루 강을 끼고 층층이 쌓아 올린 옛 도시입니다. 아줄레주 2만 장으로 벽을 채운 <strong>상 벤투 역</strong>, <strong>렐루 서점 · 클레리구스 탑 · 카르무 성당 · 포르투 대성당</strong>을 둘러봅니다.</p>
        <p>에펠의 제자가 놓은 2층 철교 <strong>동 루이스 1세 다리</strong>를 위층으로 걸어서 건넙니다. <strong>히베이라 강변</strong>과 가이아행 케이블카를 지나 <strong>빌라 노바 드 가이아</strong>의 포트와인 셀러에서 견학과 시음을 합니다.</p>
        <p>강 위에서 보는 포르투 전경, <strong>두루강 6다리 유람선</strong>도 탑승합니다. 시내 약 30km, 도보 구간이 많습니다.</p>
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal">석식</span></div>
        <span class="tag-stay">숙박 — 포르투 (2/3박)</span>
      </div>
    </article>

    <article class="day">
      <div class="daykey">
        <div class="daynum">07<sub>일차</sub></div>
        <ul class="places">
          <li>브라가<span class="lat">Braga</span></li>
          <li>기마랑이스<span class="lat">Guimarães</span></li>
        </ul>
      </div>
      <div class="daybody">
        <h3>포르투갈이 태어난 곳</h3>
        <p><strong>봉 제수스 두 몬트(세계유산)</strong> — 오감을 하나씩 지나 올라가는 바로크 계단과, 물로 움직이는 푸니쿨라를 체험합니다. <strong>브라가 대성당</strong>과 구시가 — 포르투갈에서 가장 오래된 대성당입니다.</p>
        <p><strong>기마랑이스(세계유산)</strong> — 성벽에 "여기서 포르투갈이 태어났다"고 적혀 있는 건국의 도시입니다. <strong>기마랑이스 성 · 브라간사 공작 궁전 · 올리베이라 광장</strong>을 둘러봅니다.</p>
        <p>(선택) <strong>두루 밸리 피녀웅 와이너리 + 두루 열차(대안 세계유산)</strong> 코스로 대체하실 수 있습니다. 약 140km, 주행 1시간 50분입니다.</p>
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal">석식</span></div>
        <span class="tag-stay">숙박 — 포르투 (3/3박)</span>
      </div>
    </article>

    <article class="day">
      <div class="daykey">
        <div class="daynum">08<sub>일차</sub></div>
        <ul class="places">
          <li>포르투 → 리스본 → 인천<span class="lat">Porto → Lisboa → Incheon</span></li>
        </ul>
      </div>
      <div class="daybody">
        <h3>귀환</h3>
        <p>오전 <strong>포르투 볼량 시장</strong> 또는 자유 시간을 즐깁니다. A1 고속도로로 리스본까지 이동합니다(약 320km, 주행 3시간).</p>
        <p>리스본 시내에서 자유 시간·쇼핑을 즐긴 뒤, 19:30 공항으로 이동해 22:15 KE922편으로 출발, 이튿날 19:15 인천 도착합니다.</p>
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal free">기내식</span></div>
      </div>
    </article>
  </div>
</section>

<section class="info">
  <div class="wrap">
    <h2 class="display">왜 이 동선인가</h2>
    <div class="why">
      <p><strong>남쪽에서 북쪽으로, 한 방향으로만 갑니다.</strong> 리스본에서 출발해 오비두스·나자레·파티마를 거쳐 포르투까지 계속 북상하고, 마지막 날 하루만 고속도로로 내려옵니다. 같은 길을 두 번 지나지 않습니다.</p>
      <p><strong>짐은 세 번만 풉니다.</strong> 리스본 3박, 파티마 1박, 포르투 3박. 매일 호텔을 옮기는 일정보다 체력 소모가 훨씬 적고, 리스본과 포르투에서는 저녁 시간이 온전히 남습니다.</p>
      <p><strong>항공 스케줄에 맞춰 앞뒤를 설계했습니다.</strong> 리스본 도착이 밤 8시대라 첫날은 이동만 하고, 귀국편이 밤 10시대라 마지막 날을 온전한 관광일로 씁니다. 8일 일정에서 실제 관광일이 7일 나옵니다.</p>
      <p><strong>가장 먼 날을 중간에 배치했습니다.</strong> 하루 최대 주행은 4일차 230km와 5일차 220km입니다. 시차 적응이 끝난 뒤이고, 구간마다 15~45분씩 끊어져 있어 장거리로 느껴지지 않습니다.</p>
    </div>
  </div>
</section>

<section class="opt">
  <div class="wrap">
    <h2 class="display">선택 관광</h2>
    <table class="opttable">
      <thead><tr><th>일차</th><th>선택 관광</th><th>내용</th><th>최소 인원</th></tr></thead>
      <tbody>
        <tr><td>2일차</td><td>리스본 파두 디너쇼</td><td>유네스코 무형문화유산 · 석식 겸용</td><td>10명</td></tr>
        <tr><td>4일차</td><td>토마르 그리스도 수도원</td><td>템플기사단 본거지 · 세계유산</td><td>10명</td></tr>
        <tr><td>4일차</td><td>파티마 야간 촛불 행렬</td><td>저녁 기도 참여 · 도보</td><td>—</td></tr>
        <tr><td>6일차</td><td>포르투 두루강 6다리 유람선</td><td>50분 크루즈</td><td>10명</td></tr>
        <tr><td>7일차</td><td>두루 밸리 · 피녀웅</td><td>브라가·기마랑이스 대안 · 와이너리 + 두루 열차</td><td>15명</td></tr>
      </tbody>
    </table>
  </div>
</section>

<section class="incl">
  <div class="wrap">
    <h2 class="display">포함 · 불포함</h2>
    <div class="cols">
      <div class="card">
        <h3><span class="pip"></span>포함 사항</h3>
        <ul>
          <li><b>항공</b>왕복 국제선 항공(대한항공 직항)</li>
          <li><b>숙박</b>전 일정 4성급 호텔 7박 · 조식</li>
          <li><b>특별 식사</b>파티마 호텔 석식 포함</li>
          <li><b>차량</b>전용 차량 및 기사(현지 8일)</li>
          <li><b>인솔</b>한국인 인솔 가이드 전 일정 동행</li>
          <li><b>현지 가이드</b>일정표 명시 도시</li>
          <li><b>입장료</b>일정표 명시 입장료 전액</li>
          <li><b>식사</b>일정표 명시 식사(조식 7 · 중식 6 · 석식 6)</li>
          <li><b>보험</b>여행자 보험</li>
        </ul>
      </div>
      <div class="card no">
        <h3><span class="pip"></span>불포함 사항</h3>
        <ul>
          <li><b>선택 관광</b>선택 관광 비용</li>
          <li><b>팁</b>가이드 · 기사 팁</li>
          <li><b>개인 경비</b>개인 경비 및 매식(자유 시간 중 식사)</li>
          <li><b>관광세</b>포르투갈 도시별 숙박세(1인 1박 €2~4, 현지 납부)</li>
          <li><b>수하물</b>초과 수하물 요금</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="alt">
  <div class="wrap">
    <div class="box">
      <h2 class="display">남부 알가르베를 넣는다면</h2>
      <p>알부페이라와 베나길 동굴은 리스본에서 남쪽으로 250km, 포르투와는 정반대 방향입니다. 8일 일정에 그대로 넣으면 어딘가를 덜어내야 합니다.</p>
      <p><strong>8일에 넣는 경우</strong></p>
      <ul>
        <li>4일차에 에보라를 거쳐 알부페이라로 내려가 2박</li>
        <li>5일차 베나길 동굴 보트 · 라구스 · 사그레스 곶</li>
        <li>6일차에 다시 북상 — 하루 400km 주행</li>
        <li>브라가 · 기마랑이스 · 알코바사 · 바탈랴 · 코스타 노바가 빠집니다</li>
        <li>포르투가 반나절로 줄어듭니다</li>
      </ul>
      <div class="reco">
        <strong>권해 드리는 방식</strong> — 남부까지 제대로 보시려면 10일 9박이 맞습니다: 리스본 3박 · 알부페이라 2박 · 파티마 1박 · 포르투 3박. 또는 남부를 별도 상품으로, 리스본과 알가르베만 도는 6일 일정을 추천해 드려요. 8일로 남부와 북부를 모두 넣으면 이동이 관광을 덮습니다.
      </div>
    </div>
  </div>
</section>

<section class="notes">
  <div class="wrap">
    <h2 class="display">예약 전 확인해 주십시오</h2>
    <ol>
      <li>본 일정은 <strong>리스본 IN/OUT</strong> 기준입니다. 대한항공 직항은 수·금·일 주 3회 운항합니다.</li>
      <li>일정표에 명시된 도시는 현지 가이드가 동행하며, 그 외 구간은 한국인 인솔자가 안내합니다.</li>
      <li>파티마 숙박은 <strong>석식 포함형 호텔</strong>로 별도 외부 식당 이용이 제한될 수 있습니다.</li>
      <li>도보 구간이 많은 날이 있습니다(리스본·포르투 시내). <strong>편한 신발</strong>을 권해 드립니다.</li>
      <li>포르투갈 전 도시는 숙박세(Tourist tax)가 별도이며 현지에서 직접 납부합니다.</li>
      <li>현지 사정과 기상, 도로 상황, 시설 휴관일에 따라 방문 순서와 내용이 조정될 수 있습니다.</li>
      <li>요금과 출발일은 별도 문의해 주십시오. 인원과 시즌에 따라 달라집니다.</li>
    </ol>
  </div>
</section>

<section class="cta">
  <div class="wrap">
    <div>
      <div class="label">문의</div>
      <h2 class="display">일정을 원하시는 대로 맞춰 드립니다</h2>
      <p>인원, 출발일, 호텔 등급, 식사 구성에 따라 맞춤 견적을 드립니다. 스페인 현지에서 직접 운영하므로 일정 변경과 긴급 상황에도 빠르게 대응합니다.</p>
    </div>
    <div class="contact">
      <span class="label">Euforia Tour Spain</span>
      <a href="mailto:euforia@euforiatour.com">euforia@euforiatour.com</a>
    </div>
  </div>
</section>

</div>

<footer>
  <div class="wrap">
    <span>EUFORIA DAS NUVENS S.L. · Madrid, España</span>
    <span>Portugal Grand Tour · 8일 7박</span>
  </div>
</footer>
</div>
`,
      highlights: ['제로니무스 수도원 · 벨렘탑 (세계유산)', '신트라 페나 궁전 · 유라시아 최서단 까보 다 로카', '오비두스 · 나자레 · 알코바사 · 바탈랴 세계유산 벨트', '파티마 성지 순례', '포르투 역사지구 · 동 루이스 1세 다리 · 포트와인 셀러', '브라가 · 기마랑이스 (포르투갈 건국의 도시)'],
      includes: ['왕복 국제선 항공(대한항공 직항)', '전 일정 4성급 호텔 7박 · 조식', '파티마 호텔 석식 포함', '전용 차량 및 기사(현지 8일)', '한국인 인솔 가이드 전 일정 동행', '일정표 명시 도시 현지 가이드', '일정표 명시 입장료 전액', '일정표 명시 식사(조식 7 · 중식 6 · 석식 6)', '여행자 보험'],
      excludes: ['선택 관광 비용', '가이드 · 기사 팁', '개인 경비 및 매식', '포르투갈 도시별 숙박세(1인 1박 €2~4, 현지 납부)', '초과 수하물 요금'],
      duration: '8일 7박 (리스본 IN/OUT · 실 관광일 7일)'
    }
  },
];
/* 가격 배지를 두 줄로 나눠 보여줄 때 써요. 괄호 앞부분(가격)은 굵게 위 줄에,
   괄호 부분(조건, 예: (4인 이상 출발 기준))은 아래 줄에 작게 표시해요.
   괄호가 없는 가격(예: '가격 문의')은 그대로 한 줄로 나와요. */
function formatPriceBadge(price){
  const p = price || '가격 문의';
  const idx = p.indexOf('(');
  const inner = idx === -1 ? p : `${p.slice(0, idx).trim()}<span class="price-sub">${p.slice(idx).trim()}</span>`;

  /* 정해진 가격이 없는 '가격 문의' 상품은, 뱃지 자체를 눌러서
     바로 예약문의 폼(contact.html)으로 이동하는 버튼으로 만들어요. */
  if(p.indexOf('가격 문의') !== -1){
    return `<button type="button" class="price-chip" onclick="event.preventDefault();event.stopPropagation();location.href='contact.html';">${inner}<span class="price-cta-label">예약문의 하러 가기 →</span></button>`;
  }
  return `<span class="price-chip">${inner}</span>`;
}

/* 상품에 youtubeUrl이 있으면 가격 뱃지 오른쪽에 빨간 유튜브 버튼을 붙여줘요.
   없으면 빈 문자열을 반환해서 기존 가격 뱃지만 그대로 보여요.
   .tour-price / .p-price 감싸는 요소에 overflow:hidden이 있어서
   버튼을 붙여도 모서리가 자동으로 둥글게 맞춰져요.
   주의: index.html/tours.html의 카드 전체가 <a class="tour-card">라서,
   여기서도 <a>를 쓰면 앵커 안에 앵커가 중첩되는 잘못된 HTML이 되어
   브라우저가 바깥 카드 링크를 중간에 끊어버려요(레이아웃 깨짐의 원인).
   그래서 반드시 <button>으로 만들고 클릭 시 window.open으로 새 탭을 열어요. */
function formatYoutubeBtn(youtubeUrl){
  if(!youtubeUrl) return '';
  const safeUrl = youtubeUrl.replace(/'/g, '%27');
  return `<button type="button" class="yt-btn" aria-label="관광지 영상 보기" onclick="event.preventDefault();event.stopPropagation();window.open('${safeUrl}','_blank','noopener');"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2c-.3-1-1-1.8-2-2C19.7 3.7 12 3.7 12 3.7s-7.7 0-9.5.5c-1 .2-1.7 1-2 2C0 8 0 12 0 12s0 4 .5 5.8c.3 1 1 1.8 2 2 1.8.5 9.5.5 9.5.5s7.7 0 9.5-.5c1-.2 1.7-1 2-2 .5-1.8.5-5.8.5-5.8s0-4-.5-5.8zM9.5 15.5v-7l6.3 3.5-6.3 3.5z"/></svg></button>`;
}function formatAudioBadge(audioGuide){
  if (!audioGuide || !audioGuide.length) return '';
  const first = audioGuide[0];
 return `<button type="button" class="audio-badge" data-audio="${first.url}" data-bg="${first.bg || ''}" title="오디오 가이드 듣기 (${audioGuide.length}곳)" onclick="event.preventDefault();event.stopPropagation();window.toggleAudioGuide(this);">🎧</button>`;
}
