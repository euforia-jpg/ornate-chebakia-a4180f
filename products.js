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
    downloadUrl: '/docs/portugal-8days-itinerary.pdf',
    cats: ['portugal'],
    topClass: 'portugal',
    region: 'PORTUGAL',
    days: '7박8일',
    price: '가격 문의',
    title: '[포르투갈 일주] 리스본 IN/OUT 7박8일',
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
.eu-itin{background:var(--ground);overflow-x:hidden;max-width:100%;}

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
       <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal free">석식 · 자유식</span></div>
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
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal free">석식 · 자유식</span></div>
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
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal free">석식 · 자유식</span></div>
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
       <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal free">석식 · 자유식</span></div>
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
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal free">석식 · 자유식</span></div>
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
    <div style="overflow-x:auto;">
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
  </div>
</section>

<section class="incl">
  <div class="wrap">
    <h2 class="display">포함 · 불포함</h2>
    <div class="cols">
      <div class="card">
        <h3><span class="pip"></span>포함 사항</h3>
        <ul>
          <li><b>숙박</b>전 일정 4성급 호텔 7박 · 조식</li>
          <li><b>특별 식사</b>파티마 호텔 석식 포함</li>
          <li><b>차량</b>전용 차량 및 기사(현지 8일)</li>
          <li><b>인솔</b>한국인 인솔 가이드 전 일정 동행</li>
          <li><b>현지 가이드</b>일정표 명시 도시</li>
          <li><b>입장료</b>일정표 명시 입장료 전액</li>
          <li><b>보험</b>여행자 보험</li>
        </ul>
      </div>
      <div class="card no">
        <h3><span class="pip"></span>불포함 사항</h3>
        <ul>
           <li><b>항공</b>왕복 국제선 항공(대한항공 직항)</li>
          <li><b>선택 관광</b>선택 관광 비용</li>
          <li><b>팁</b>가이드 · 기사 팁</li>
          <li><b>식사</b>호텔 조식 7회 · 파티마 호텔 석식 1회를 제외한 전 일정 식사 — 중식 · 석식 모두 자유식</li>
          <li><b>개인 경비</b>개인 경비 </li>
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
      includes: ['전 일정 4성급 호텔 7박 · 조식', '파티마 호텔 석식 포함', '전용 차량 및 기사(현지 8일)', '한국인 인솔 가이드 전 일정 동행', '일정표 명시 도시 현지 가이드', '일정표 명시 입장료 전액', '조식 7회(호텔 조식)', '여행자 보험'],
      excludes: ['왕복 국제선 항공(대한항공)', '선택 관광 비용', '가이드 · 기사 팁', '중식·석식 전체 자유식(파티마 호텔 석식 제외)', '포르투갈 도시별 숙박세(1인 1박 €2~4, 현지 납부)', '초과 수하물 요금'],
      duration: '8일 7박 (리스본 IN/OUT · 실 관광일 7일)'
    }
  },
{
    id: 'portugal-10days',
    downloadUrl: '/docs/portugal-10days-itinerary.pdf',
    cats: ['portugal'],
    topClass: 'portugal',
    region: 'PORTUGAL',
    days: '9박10일',
    price: '가격 문의',
    title: '[포르투갈 남북종단] 리스본 IN/OUT 9박10일 (남부 포함)',
    summary: '리스본에서 알가르베(베나길·라구스·사그레스)까지 내려갔다가, 성벽 마을과 성지를 지나 포르투·기마랑이스까지 — 유네스코 세계유산 10곳을 담은 남북 종단 일주예요.',
    tags: ['9박 10일', '왕복 직항', '남부+북부 종단'],
    isNew: true,
    detail: {
      lead: '리스본 3박·알부페이라 2박·파티마 1박·포르투 3박, 남쪽 알가르베부터 북쪽 포르투까지 한 번에 잇는 포르투갈 종단 일주예요.',
      description: `<!-- ── Euforia Tour · 포르투갈 일주 10일(남부+북부) · 붙여넣기용 조각 ──
     이 블록 전체를 상세설명 HTML 칸에 그대로 붙여 넣으십시오. ── -->
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
.eu-itin{background:var(--ground);overflow-x:hidden;max-width:100%;}

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
}.eu-itin .hero{padding:64px 0 0}.eu-itin .eyebrow{display:flex;align-items:center;gap:12px;margin-bottom:20px}.eu-itin .eyebrow .rule{height:1px;flex:0 0 40px;background:var(--accent)}.eu-itin h1{font-size:clamp(38px,6.4vw,64px);margin:0 0 22px}.eu-itin h1 em{font-style:normal;color:var(--accent)}.eu-itin .lede{
  font-size:clamp(17px,2.1vw,19px);color:var(--ink-2);max-width:60ch;margin:0 0 34px;
  font-weight:300;line-height:1.85;
}.eu-itin .facts{
  display:grid;gap:1px;background:var(--line);
  grid-template-columns:repeat(auto-fit,minmax(160px,1fr));
  border:1px solid var(--line);border-radius:2px;overflow:hidden;
}.eu-itin .fact{background:var(--surface);padding:18px 20px}.eu-itin .fact dt{margin:0 0 6px}.eu-itin .fact dd{margin:0;font-size:16px;font-weight:500;line-height:1.5}.eu-itin .garland{margin:56px 0 0;color:var(--accent);opacity:.9}.eu-itin .garland svg{display:block;width:100%;height:34px}.eu-itin .mapsec{padding:56px 0 8px}.eu-itin .mapcard{
  background:var(--surface);border:1px solid var(--line);border-radius:2px;
  padding:26px 26px 18px;box-shadow:var(--shadow);
}.eu-itin .mapcard h2{font-size:20px;margin:0 0 4px}.eu-itin .mapcard p.note{font-size:13px;color:var(--ink-3);margin:0 0 18px}.eu-itin .mapscroll{overflow-x:auto}.eu-itin .mapscroll svg{display:block;min-width:0;width:100%;max-width:520px;margin:0 auto;height:auto}.eu-itin .mp-sea{fill:var(--sea)}.eu-itin .mp-coast{fill:none;stroke:var(--ink-3);stroke-width:.4;opacity:.55}.eu-itin .mp-route{fill:none;stroke:var(--pine);stroke-width:.5;stroke-dasharray:1.4 1.1;opacity:.85}.eu-itin .mp-dot{fill:var(--accent)}.eu-itin .mp-dot.stay{fill:var(--pine)}.eu-itin .mp-base{fill:var(--surface);stroke:var(--pine);stroke-width:.7}.eu-itin .mp-t{font-size:2.1px;fill:var(--ink-2);font-family:"IBM Plex Sans KR",sans-serif;font-weight:500}.eu-itin .mp-c{font-size:2.1px;fill:var(--ink-3);font-family:"IBM Plex Sans KR",sans-serif;letter-spacing:.14em}.eu-itin .mp-n{font-size:1.9px;fill:var(--ink-3);font-family:"IBM Plex Sans KR",sans-serif}.eu-itin .maplegend{display:flex;flex-wrap:wrap;gap:18px;margin-top:14px;font-size:12.5px;color:var(--ink-2)}.eu-itin .maplegend i{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:7px;vertical-align:1px}.eu-itin .itin{padding:56px 0 0}.eu-itin .itin > h2{font-size:clamp(24px,3.4vw,30px);margin:0 0 6px}.eu-itin .itin > p.sub{color:var(--ink-3);margin:0 0 36px;font-size:14.5px}.eu-itin .day{
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
}.eu-itin .info{padding:60px 0 0}.eu-itin .info h2{font-size:clamp(22px,3vw,26px);margin:0 0 22px}.eu-itin .info .why{display:flex;flex-direction:column;gap:16px}.eu-itin .info .why p{margin:0;color:var(--ink-2);font-size:14.5px;line-height:1.8;max-width:70ch}.eu-itin .info .why strong{color:var(--ink);font-weight:600}.eu-itin .cmp{padding:52px 0 0}.eu-itin .cmp h2{font-size:clamp(22px,3vw,26px);margin:0 0 22px}.eu-itin .cmptable{width:100%;border-collapse:collapse;font-size:13.5px}.eu-itin .cmptable th{text-align:left;padding:10px 14px;background:var(--surface-2);color:var(--ink-3);font-weight:600;font-size:11px;letter-spacing:.06em;text-transform:uppercase;border-bottom:1px solid var(--line)}.eu-itin .cmptable td{padding:12px 14px;border-bottom:1px solid var(--line-soft);color:var(--ink-2)}.eu-itin .cmptable td:first-child{color:var(--ink);font-weight:600;white-space:nowrap}.eu-itin .cmptable p.note{margin:14px 0 0;font-size:13.5px;color:var(--ink-2);line-height:1.75}.eu-itin .opt{padding:56px 0 0}.eu-itin .opt h2{font-size:clamp(22px,3vw,26px);margin:0 0 22px}.eu-itin .opttable{width:100%;border-collapse:collapse;font-size:13.5px}.eu-itin .opttable th{text-align:left;padding:10px 14px;background:var(--surface-2);color:var(--ink-3);font-weight:600;font-size:11px;letter-spacing:.06em;text-transform:uppercase;border-bottom:1px solid var(--line)}.eu-itin .opttable td{padding:12px 14px;border-bottom:1px solid var(--line-soft);color:var(--ink-2)}.eu-itin .opttable td:first-child{color:var(--ink);font-weight:600;white-space:nowrap}.eu-itin .incl{padding:64px 0 0}.eu-itin .cols{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:26px}.eu-itin .card{
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
    <div class="eyebrow"><span class="rule"></span><span class="label">9박 10일 · 남부+북부 종단 · 전용차량+한국인 인솔</span></div>
    <h1>포르투갈 <em>남북 종단</em></h1>
    <p class="lede">
      리스본에서 남쪽 알가르베 해안까지 내려갔다가, 성벽 마을과 성지를 지나 북쪽 포르투와 건국의 도시 기마랑이스까지 올라갑니다.
      나라를 남에서 북으로 한 번에 훑는 동선이에요. 유네스코 세계유산 10곳을 담았습니다.
    </p>
    <dl class="facts">
      <div class="fact"><dt class="label">일정</dt><dd>9박 10일</dd></div>
      <div class="fact"><dt class="label">구간</dt><dd>리스본 IN/OUT · KE921·KE922</dd></div>
      <div class="fact"><dt class="label">숙박</dt><dd>3·2·1·3 (리스본·알부페이라·파티마·포르투)</dd></div>
      <div class="fact"><dt class="label">세계유산</dt><dd>10곳 (선택 관광 포함 시 12곳)</dd></div>
      <div class="fact"><dt class="label">총 주행</dt><dd>약 1,820km (남북 종단 780km 포함)</dd></div>
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
      <h2 class="display">남쪽 끝까지, 그리고 다시 북쪽 끝까지</h2>
      <p class="note">방문지의 상대적 위치를 나타낸 개념도입니다. 실제 축척과 해안선 형태는 다릅니다.</p>
      <div class="mapscroll">
        <svg viewBox="0 0 62 132" role="img" aria-label="포르투갈 종단 여정 개념도. 리스본에서 남쪽 에보라·알부페이라·베나길·라구스·사그레스까지 내려갔다가, 다시 북쪽 오비두스·나자레·파티마·코임브라·포르투·브라가·기마랑이스까지 올라가는 경로입니다.">
          <path class="mp-sea" d="M0 0 H62 V132 H0 Z"/>
          <path class="mp-coast" d="M6 4 L5 20 L4 36 L3 52 L2 68 L2.5 84 L4 100 L6 112 L9 122 L12 130"/>
          <text class="mp-c" x="18" y="14">ATLÂNTICO</text>

          <path class="mp-route" d="M13 108 L11 104 L9 98 L11 92 L14 88 L17 92 L19 98 L17 104 L15 110 L13 116 L11 112 L9 106 L8 100 L7 94 L8 88 L10 82 L13 78 L15 72 L14 66 L12 60 L10 54 L8 48 L7 42 L8 36 L10 30 L13 26 L16 22 L18 16 L20 10 L18 5"/>

          <circle class="mp-dot stay" cx="13" cy="108" r="1.2"/>
          <text class="mp-t" x="15.6" y="108.6">리스본 · 3박</text>

          <circle class="mp-dot" cx="14" cy="88" r=".8"/><text class="mp-t" x="16.6" y="88.6">에보라</text>

          <circle class="mp-dot stay" cx="13" cy="78" r="1.2"/>
          <text class="mp-t" x="15.6" y="78.6">알부페이라 · 2박</text>

          <circle class="mp-dot" cx="9" cy="72" r=".8"/><text class="mp-t" x="6.4" y="72.6" text-anchor="end">베나길</text>
          <circle class="mp-dot" cx="6" cy="76" r=".8"/><text class="mp-t" x="3.4" y="80" text-anchor="end">라구스</text>
          <circle class="mp-dot" cx="4" cy="82" r=".8"/><text class="mp-t" x="1.4" y="86" text-anchor="end">사그레스</text>

          <circle class="mp-dot" cx="11" cy="54" r=".8"/><text class="mp-t" x="13.6" y="54.6">오비두스</text>
          <circle class="mp-dot" cx="8" cy="48" r=".8"/><text class="mp-t" x="5.4" y="48.6" text-anchor="end">나자레</text>
          <circle class="mp-dot" cx="9" cy="42" r=".8"/><text class="mp-t" x="11.6" y="42.6">알코바사·바탈랴</text>

          <circle class="mp-dot stay" cx="13" cy="36" r="1.2"/>
          <text class="mp-t" x="15.6" y="36.6">파티마 · 1박</text>

          <circle class="mp-dot" cx="16" cy="27" r=".8"/><text class="mp-t" x="18.6" y="27.6">코임브라</text>
          <circle class="mp-dot" cx="12" cy="21" r=".8"/><text class="mp-t" x="9.4" y="21.6" text-anchor="end">아베이루</text>

          <circle class="mp-dot stay" cx="18" cy="16" r="1.2"/>
          <text class="mp-t" x="20.6" y="16.6">포르투 · 3박</text>

          <circle class="mp-dot" cx="24" cy="10" r=".8"/><text class="mp-t" x="26.6" y="10.6">브라가</text>
          <circle class="mp-dot" cx="22" cy="13" r=".8"/><text class="mp-t" x="19.4" y="13.6" text-anchor="end">기마랑이스</text>

          <path d="M13 114 L13 122" stroke="var(--ink-3)" stroke-width=".35" fill="none" stroke-dasharray="1.1 1"/>
          <text class="mp-n" x="13" y="126" text-anchor="middle">↑ 1일차 도착 · 10일차 출국</text>
        </svg>
      </div>
      <div class="maplegend">
        <span><i style="background:var(--pine)"></i>숙박 도시 — 리스본·알부페이라·파티마·포르투</span>
        <span><i style="background:var(--accent)"></i>당일 방문지</span>
        <span><i style="background:var(--accent);opacity:.5"></i>이동 경로</span>
      </div>
    </div>
  </div>
</section>

<section class="itin">
  <div class="wrap">
    <h2 class="display">일정</h2>
    <p class="sub">대한항공 직항은 수·금·일 주 3회 운항합니다. 리스본 도착이 저녁이고 귀국편이 밤 늦게 출발하므로, 첫날은 이동만 하고 마지막 날은 온전히 관광에 씁니다. 중식·석식은 전 일정 자유식으로, 가이드가 현지 식당을 안내해 드려요.</p>

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
        <p><strong>제로니무스 수도원(세계유산)</strong> — 대항해시대의 부로 지은 마누엘 양식의 정점, 바스쿠 다 가마가 잠든 곳입니다. <strong>벨렘탑(세계유산)</strong>과 <strong>발견기념비</strong>를 지나, 1837년부터 같은 자리에서 굽는 원조 에그타르트 <strong>파스테이스 드 벨렝</strong>을 맛봅니다.</p>
        <p><strong>코메르시우 광장 · 아우구스타 개선문 · 산타 주스타 엘리베이터</strong>를 지나, <strong>알파마</strong>와 <strong>상 조르지 성</strong>에서 도시 전경을 보고, 언덕과 골목을 그대로 훑고 지나가는 <strong>28번 트램</strong>도 체험 승차합니다. (선택) 유네스코 무형문화유산인 <strong>파두 디너쇼</strong>를 즐기실 수 있습니다.</p>
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal free">석식 · 자유식</span></div>
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
        <p><strong>신트라 문화경관(세계유산)</strong> — 노랑과 빨강으로 칠한 낭만주의 궁전 <strong>페나 궁전</strong>에서 산 능선을 내려다보고, 지하 27m로 나선을 그리며 내려가는 입회의 우물 <strong>킨타 다 헤갈레이라</strong>를 둘러봅니다. 신트라 구시가에서 명물 페이스트리 <strong>트라베세이루</strong>도 맛봅니다.</p>
        <p><strong>까보 다 로카</strong> — 유라시아 대륙 최서단입니다. <strong>카스카이스</strong>와 대서양이 절벽을 파고든 <strong>보카 두 인페르누</strong>를 지나, 에스토릴 해안도로를 따라 리스본으로 돌아옵니다. 약 110km, 주행 2시간입니다.</p>
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal free">석식 · 자유식</span></div>
        <span class="tag-stay">숙박 — 리스본 (3/3박)</span>
      </div>
    </article>

    <article class="day">
      <div class="daykey">
        <div class="daynum">04<sub>일차</sub></div>
        <ul class="places">
          <li>에보라<span class="lat">Évora</span></li>
          <li>알부페이라 도착<span class="lat">Albufeira</span></li>
        </ul>
      </div>
      <div class="daybody">
        <h3>남부 구간의 시작</h3>
        <p><strong>에보라 역사지구(세계유산)</strong> — 성벽 안이 통째로 유산인 알렌테주의 옛 수도입니다. 5천 구의 유골로 벽을 쌓고 "우리 뼈가 당신 뼈를 기다린다"고 새겨 둔 <strong>뼈 예배당</strong>, <strong>디아나 로마 신전 · 에보라 대성당 · 히랄두 광장</strong>을 둘러봅니다.</p>
        <p>알렌테주 평원의 코르크나무 숲을 지나 남하해 <strong>알부페이라</strong>에 도착합니다. 구시가 골목과 해변 절벽을 둘러봅니다. 약 350km, 주행 4시간으로 남부 구간이 시작돼요.</p>
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal free">석식 · 자유식</span></div>
        <span class="tag-stay">숙박 — 알부페이라 (1/2박)</span>
      </div>
    </article>

    <article class="day">
      <div class="daykey">
        <div class="daynum">05<sub>일차</sub></div>
        <ul class="places">
          <li>베나길<span class="lat">Benagil</span></li>
          <li>라구스<span class="lat">Lagos</span></li>
          <li>사그레스<span class="lat">Sagres</span></li>
        </ul>
      </div>
      <div class="daybody">
        <h3>알가르베 황금빛 해안</h3>
        <p><strong>베나길 동굴</strong> — 천장이 뚫린 해식 동굴로, 바다에서 보트로만 들어갈 수 있습니다(보트 승선 포함). <strong>카르보에이루 등대 절벽길</strong>과 알가르베 황금빛 사암 해안을 지납니다.</p>
        <p><strong>라구스</strong>와 바다가 깎아 세운 기암 절벽 <strong>폰타 다 피에다드</strong>, 엔히크 왕자의 항해 학교가 있던 유럽 남서쪽 끝 <strong>사그레스 곶</strong>을 둘러봅니다. 대서양 해산물 식당이 모여 있는 알부페이라 구시가에서 자유 시간을 가집니다. 약 150km, 주행 2시간 20분(보트 45~60분).</p>
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal free">석식 · 자유식</span></div>
        <span class="tag-stay">숙박 — 알부페이라 (2/2박)</span>
      </div>
    </article>

    <article class="day">
      <div class="daykey">
        <div class="daynum">06<sub>일차</sub></div>
        <ul class="places">
          <li>오비두스<span class="lat">Óbidos</span></li>
          <li>나자레<span class="lat">Nazaré</span></li>
          <li>알코바사 · 바탈랴<span class="lat">Alcobaça · Batalha</span></li>
          <li>파티마<span class="lat">Fátima</span></li>
        </ul>
      </div>
      <div class="daybody">
        <h3>가장 긴 하루, 다시 북쪽으로</h3>
        <p>이른 아침 출발, 리스본을 지나 대서양 연안으로 북상합니다(오전에 320km 연속 주행). <strong>오비두스</strong> — 왕비에게 결혼 선물로 준 성벽 마을에서 초콜릿 잔에 담아 마시는 진자 리큐르를 맛봅니다.</p>
        <p><strong>나자레</strong> — 겨울이면 30m 파도가 서는 프라이아 두 노르트를 봅니다. <strong>알코바사 수도원(세계유산)</strong>과 지붕을 끝내 얹지 못한 '미완의 예배당' <strong>바탈랴 수도원(세계유산)</strong>을 지나 <strong>파티마</strong>에 도착합니다, 1917년 성모 발현 성지를 둘러봅니다. (선택) 야간 촛불 행렬에 참여하실 수 있습니다. 약 440km, 주행 5시간입니다.</p>
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal free">석식 · 자유식</span></div>
        <span class="tag-stay">숙박 — 파티마 (1박)</span>
      </div>
    </article>

    <article class="day">
      <div class="daykey">
        <div class="daynum">07<sub>일차</sub></div>
        <ul class="places">
          <li>코임브라<span class="lat">Coimbra</span></li>
          <li>아베이루 · 코스타 노바<span class="lat">Aveiro · Costa Nova</span></li>
          <li>포르투 도착<span class="lat">Porto</span></li>
        </ul>
      </div>
      <div class="daybody">
        <h3>유럽 최고(最古)의 대학에서 줄무늬 마을까지</h3>
        <p>(선택) <strong>토마르 그리스도 수도원(세계유산)</strong> — 템플기사단의 본거지도 경유 가능합니다. <strong>코임브라 대학(세계유산)</strong> — 1290년에 문을 연, 유럽에서 가장 오래된 대학 중 하나입니다. 금박 서가와 책벌레를 잡는 박쥐가 사는 <strong>조아니나 도서관</strong>을 봅니다.</p>
        <p><strong>아베이루</strong> — 운하를 젓는 색색의 몰리세이루 배와 달걀 과자 오보스 몰레스를 맛봅니다. <strong>코스타 노바</strong> — 대서양을 등지고 늘어선 줄무늬 목조 가옥을 보고, 저녁 포르투에 도착합니다. 약 220km, 주행 2시간 40분입니다.</p>
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal free">석식 · 자유식</span></div>
        <span class="tag-stay">숙박 — 포르투 (1/3박)</span>
      </div>
    </article>

    <article class="day">
      <div class="daykey">
        <div class="daynum">08<sub>일차</sub></div>
        <ul class="places">
          <li>포르투 종일<span class="lat">Porto</span></li>
        </ul>
      </div>
      <div class="daybody">
        <h3>두루 강을 낀 옛 도시</h3>
        <p><strong>포르투 역사지구(세계유산)</strong> — 아줄레주 2만 장으로 벽을 채운 <strong>상 벤투 역</strong>, <strong>렐루 서점 · 클레리구스 탑 · 카르무 성당 · 포르투 대성당</strong>을 둘러봅니다. 에펠의 제자가 놓은 2층 철교 <strong>동 루이스 1세 다리</strong>를 위층으로 걸어서 건넙니다.</p>
        <p><strong>히베이라 강변</strong>과 가이아행 케이블카를 지나 <strong>빌라 노바 드 가이아</strong>의 포트와인 셀러에서 견학과 시음을 하고, 강 위에서 보는 포르투 전경 <strong>두루강 6다리 유람선</strong>도 탑승합니다. 시내 약 30km, 도보 구간이 많습니다.</p>
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal free">석식 · 자유식</span></div>
        <span class="tag-stay">숙박 — 포르투 (2/3박)</span>
      </div>
    </article>

    <article class="day">
      <div class="daykey">
        <div class="daynum">09<sub>일차</sub></div>
        <ul class="places">
          <li>브라가<span class="lat">Braga</span></li>
          <li>기마랑이스<span class="lat">Guimarães</span></li>
        </ul>
      </div>
      <div class="daybody">
        <h3>포르투갈이 태어난 곳</h3>
        <p><strong>봉 제수스 두 몬트(세계유산)</strong> — 바로크 계단과 물로 움직이는 푸니쿨라를 체험합니다. <strong>브라가 대성당</strong>과 구시가 — 포르투갈에서 가장 오래된 대성당입니다.</p>
        <p><strong>기마랑이스(세계유산)</strong> — 성벽에 "여기서 포르투갈이 태어났다"고 적혀 있는 건국의 도시입니다. <strong>기마랑이스 성 · 브라간사 공작 궁전 · 올리베이라 광장</strong>을 둘러봅니다. (선택) <strong>두루 밸리 피녀웅 와이너리 + 두루 열차(대안 세계유산)</strong> 코스로 대체하실 수 있습니다. 약 140km, 주행 1시간 50분입니다.</p>
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal free">석식 · 자유식</span></div>
        <span class="tag-stay">숙박 — 포르투 (3/3박)</span>
      </div>
    </article>

    <article class="day">
      <div class="daykey">
        <div class="daynum">10<sub>일차</sub></div>
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
      <p><strong>남쪽을 먼저 끝내고 북으로 한 번에 올라갑니다.</strong> 알가르베는 리스본에서 막다른 남쪽 끝입니다. 리스본 관광을 마친 뒤 내려갔다가, 올라오는 길에 오비두스·나자레·알코바사·바탈랴를 차례로 지나며 북상합니다. 같은 길을 두 번 지나지 않습니다.</p>
      <p><strong>에보라는 내려가는 길에 넣었습니다.</strong> 리스본에서 알가르베로 곧장 내려가면 250km가 그냥 이동입니다. 중간에 에보라를 끼우면 같은 하루에 세계유산 한 곳이 더 붙습니다.</p>
      <p><strong>짐은 네 번만 풉니다.</strong> 리스본 3박, 알부페이라 2박, 파티마 1박, 포르투 3박. 10일 일정에서 이동 숙박은 파티마 하룻밤뿐입니다.</p>
      <p><strong>가장 긴 날은 6일차 하루입니다.</strong> 440km 중 320km가 오전 고속도로 연속 구간이고, 오후에는 15~40분 간격으로 네 곳을 끊어서 돕니다. 이 하루를 감수하는 대신 남부와 북부를 하나의 여정으로 잇습니다.</p>
      <p><strong>항공 스케줄에 맞춰 앞뒤를 설계했습니다.</strong> 리스본 도착이 밤 8시대라 첫날은 이동만 하고, 귀국편이 밤 10시대라 마지막 날을 온전한 관광일로 씁니다. 10일 일정에서 실제 관광일이 9일 나옵니다.</p>
    </div>
  </div>
</section>

<section class="cmp">
  <div class="wrap">
    <h2 class="display">8일 상품과의 차이</h2>
    <table class="cmptable">
      <thead><tr><th></th><th>8일 7박</th><th>9박10일 (남부 포함)</th></tr></thead>
      <tbody>
        <tr><td>남부 알가르베</td><td>없음</td><td>2박 — 베나길·라구스·사그레스</td></tr>
        <tr><td>에보라</td><td>없음</td><td>포함</td></tr>
        <tr><td>세계유산</td><td>9곳</td><td>10곳</td></tr>
        <tr><td>숙박 도시</td><td>3곳</td><td>4곳</td></tr>
        <tr><td>총 주행</td><td>약 1,090km</td><td>약 1,820km</td></tr>
        <tr><td>최장 주행일</td><td>230km</td><td>440km (6일차)</td></tr>
        <tr><td>포르투·브라가</td><td>3박 · 종일 + 근교</td><td>3박 · 종일 + 근교 (동일)</td></tr>
      </tbody>
    </table>
    <p class="note">북부 구성은 두 상품이 같아요. 10일 상품은 앞쪽에 남부 사흘을 얹은 구조라, 8일 상품에서 아무것도 덜어내지 않고 알가르베와 에보라를 더한 셈이에요.</p>
  </div>
</section>

<section class="opt">
  <div class="wrap">
    <h2 class="display">선택 관광</h2>
    <div style="overflow-x:auto;">
    <table class="opttable">
      <thead><tr><th>일차</th><th>선택 관광</th><th>내용</th><th>최소 인원</th></tr></thead>
      <tbody>
        <tr><td>2일차</td><td>리스본 파두 디너쇼</td><td>유네스코 무형문화유산 · 석식 겸용</td><td>10명</td></tr>
        <tr><td>5일차</td><td>알가르베 지프 사파리</td><td>내륙 산악마을 · 반나절</td><td>10명</td></tr>
        <tr><td>6일차</td><td>파티마 야간 촛불 행렬</td><td>저녁 기도 참여 · 도보</td><td>—</td></tr>
        <tr><td>7일차</td><td>토마르 그리스도 수도원</td><td>템플기사단 본거지 · 세계유산</td><td>10명</td></tr>
        <tr><td>8일차</td><td>포르투 두루강 6다리 유람선</td><td>50분 크루즈</td><td>10명</td></tr>
        <tr><td>9일차</td><td>두루 밸리 · 피녀웅</td><td>브라가·기마랑이스 대안 · 와이너리 + 두루 열차</td><td>15명</td></tr>
      </tbody>
    </table>
    </div>
  </div>
</section>

<section class="incl">
  <div class="wrap">
    <h2 class="display">포함 · 불포함</h2>
    <div class="cols">
      <div class="card">
        <h3><span class="pip"></span>포함 사항</h3>
        <ul>
          <li><b>숙박</b>전 일정 4성급 호텔 9박 · 조식 포함</li>
          <li><b>차량</b>전용 차량 및 기사(현지 10일)</li>
          <li><b>인솔</b>한국인 인솔 가이드 전 일정 동행</li>
          <li><b>현지 가이드</b>일정표 명시 도시</li>
          <li><b>입장료</b>일정표 명시 입장료 전액</li>
          <li><b>베나길</b>베나길 동굴 보트 승선</li>
          <li><b>보험</b>여행자 보험</li>
        </ul>
      </div>
      <div class="card no">
        <h3><span class="pip"></span>불포함 사항</h3>
        <ul>
          <li><b>항공</b>왕복 국제선 항공권 — 지상 수배 상품이에요</li>
          <li><b>식사</b>중식·석식(전 일정 자유식) — 가이드가 현지 식당을 안내해 드려요</li>
          <li><b>선택 관광</b>선택 관광 비용</li>
          <li><b>팁</b>가이드 · 기사 팁</li>
          <li><b>개인 경비</b>개인 경비</li>
          <li><b>관광세</b>포르투갈 도시별 숙박세(1인 1박 €2~4, 현지 납부)</li>
          <li><b>수하물</b>초과 수하물 요금</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="notes">
  <div class="wrap">
    <h2 class="display">예약 전 확인해 주십시오</h2>
    <ol>
      <li>본 일정은 <strong>리스본 IN/OUT</strong> 기준의 <strong>지상 수배 상품</strong>이에요. 항공권은 별도로 준비해 주세요.</li>
      <li>일정표에 명시된 도시는 현지 가이드가 동행하며, 그 외 구간은 한국인 인솔자가 안내해요.</li>
      <li><strong>중식·석식은 전 일정 자유식</strong>이에요. 가이드가 현지 식당을 추천·안내해 드려요.</li>
      <li>6일차는 오전 320km 연속 주행이 있는 최장 이동일이에요. 편한 옷차림을 권해 드려요.</li>
      <li>도보 구간이 많은 날이 있어요(리스본·포르투 시내). <strong>편한 신발</strong>을 권해 드려요.</li>
      <li>포르투갈 전 도시는 숙박세(Tourist tax)가 별도이며 현지에서 직접 납부해요.</li>
      <li>현지 사정과 기상, 도로 상황, 시설 휴관일에 따라 방문 순서와 내용이 조정될 수 있어요.</li>
      <li>요금과 출발일은 별도 문의해 주세요. 인원과 시즌에 따라 달라져요.</li>
    </ol>
  </div>
</section>

<section class="cta">
  <div class="wrap">
    <div>
      <div class="label">문의</div>
      <h2 class="display">일정을 원하시는 대로 맞춰 드립니다</h2>
      <p>인원, 출발일, 호텔 등급에 따라 맞춤 견적을 드려요. 8일 상품(남부 제외)으로 조정도 가능해요. 스페인 현지에서 직접 운영하므로 일정 변경과 긴급 상황에도 빠르게 대응해요.</p>
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
    <span>Portugal Grand Tour North &amp; South · 9박 10일</span>
  </div>
</footer>
</div>
`,
      highlights: ['에보라 역사지구 (세계유산) · 뼈 예배당', '베나길 동굴 보트 승선 · 라구스 · 사그레스 곶', '오비두스 · 나자레 · 알코바사 · 바탈랴 세계유산 벨트', '파티마 성지 순례', '포르투 역사지구 · 동 루이스 1세 다리 · 포트와인 셀러', '브라가 · 기마랑이스 (포르투갈 건국의 도시)'],
      includes: ['전 일정 4성급 호텔 9박 · 조식 포함', '전용 차량 및 기사(현지 10일)', '한국인 인솔 가이드 전 일정 동행', '일정표 명시 도시 현지 가이드', '일정표 명시 입장료 전액', '베나길 동굴 보트 승선', '여행자 보험'],
      excludes: ['왕복 국제선 항공권(지상 수배 상품)', '중식·석식(전 일정 자유식)', '선택 관광 비용', '가이드 · 기사 팁', '개인 경비', '포르투갈 도시별 숙박세(1인 1박 €2~4, 현지 납부)', '초과 수하물 요금'],
      duration: '9박 10일 (리스본 IN/OUT · 실 관광일 9일)'
    }
  },
{
    id: 'iberia-12days',
    downloadUrl: '/docs/iberia-12days-itinerary.pdf',
    cats: ['spain'],
    topClass: 'spain',
    region: 'SPAIN · PORTUGAL',
    days: '11박12일',
    price: '가격 문의',
    title: '[이베리아 종단] 리스본 IN · 마드리드 OUT 11박12일',
    summary: '리스본에서 대서양 절벽까지 갔다가 국경을 넘어 세비야로, 안달루시아 파라도르에서 사흘을 쉬고 알함브라를 지나 마드리드까지 — 되돌아가는 구간 없는 이베리아 반도 종단 일주예요.',
    tags: ['11박 12일', '파라도르 3박', '관광 9일+휴식 3일'],
    isNew: true,
    detail: {
      lead: '리스본 3박·세비야 2박·카르모나 파라도르 1박·론다 파라도르 2박·그라나다 2박·마드리드 1박, 포르투갈과 스페인을 한 여정에 담은 이베리아 반도 종단이에요.',
      description: `<!-- ── Euforia Tour · 이베리아 종단 12일(리스본 IN·마드리드 OUT) · 붙여넣기용 조각 ──
     이 블록 전체를 상세설명 HTML 칸에 그대로 붙여 넣으십시오.
     모든 스타일이 .eu-iberia12 안으로만 적용되므로 사이트의 기존 디자인과 부딪히지 않습니다. ── -->
<div class="eu-iberia12">
<style>
.eu-iberia12{
  --ink:#20292B;
  --tilegreen:#1F6F6B;
  --tilegreen-soft:#5E9A96;
  --ochre:#A9682B;
  --stone:#6E7B78;
  --paper:#FAF7F1;
  --tile:#EFEDE5;
  --line:#DAD6CA;
  --muted:#6B7573;
  --pattern-op:.16;
  --f-kr:"IBM Plex Sans KR","Noto Sans KR","Malgun Gothic",system-ui,-apple-system,sans-serif;
  --f-disp:var(--f-kr);
  --f-body:var(--f-kr);
}
.eu-iberia12 *{box-sizing:border-box}
.eu-iberia12{overflow-x:hidden;max-width:100%;
  margin:0; background:var(--paper); color:var(--ink);
  font-family:var(--f-body); font-weight:300; font-size:16px; line-height:1.75;
  -webkit-font-smoothing:antialiased;
  word-break:keep-all; overflow-wrap:anywhere;
}
.eu-iberia12 h1, .eu-iberia12 h2, .eu-iberia12 h3, .eu-iberia12 h4{font-family:var(--f-disp); font-weight:600; text-wrap:balance; margin:0; line-height:1.3; letter-spacing:-.015em}
.eu-iberia12 p{margin:0}
.eu-iberia12 a{color:var(--tilegreen)}
.eu-iberia12 .wrap{max-width:1080px; margin:0 auto; padding:0 24px}


/* ── 알함브라 팔각 성형 타일 밴드 ─────────────── */
.eu-iberia12 .mudejar{
  height:18px;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 44 44'%3E%3Cg fill='none' stroke='%231F6F6B' stroke-width='1.15'%3E%3Crect x='9' y='9' width='26' height='26'/%3E%3Crect x='9' y='9' width='26' height='26' transform='rotate(45 22 22)'/%3E%3Ccircle cx='22' cy='22' r='4'/%3E%3C/g%3E%3C/svg%3E");
  background-size:22px 22px;
  opacity:var(--pattern-op);
}


/* ── masthead ─────────────────────────────────── */
.eu-iberia12 header.mast{padding:64px 0 44px}
.eu-iberia12 .eyebrow{
  font-size:11.5px; font-weight:500; letter-spacing:.2em; text-transform:uppercase;
  color:var(--tilegreen); margin-bottom:20px;
}
.eu-iberia12 h1{font-size:clamp(36px,5.8vw,60px); font-weight:700; letter-spacing:-.03em}
.eu-iberia12 h1 .lat{font-weight:300; color:var(--tilegreen)}
.eu-iberia12 .lede{margin-top:20px; max-width:56ch; font-size:17.5px; color:var(--muted); line-height:1.85}
.eu-iberia12 .route{
  margin-top:34px; padding-top:22px; border-top:1px solid var(--line);
  font-weight:400; font-size:13px; line-height:2.2; color:var(--stone);
}
.eu-iberia12 .route b{color:var(--ink); font-weight:500}
.eu-iberia12 .route em{color:var(--ochre); font-style:normal; font-weight:500}


/* ── facts ────────────────────────────────────── */
.eu-iberia12 .facts{
  display:grid; gap:1px; background:var(--line);
  grid-template-columns:repeat(auto-fit,minmax(160px,1fr));
  border:1px solid var(--line); margin:44px 0 8px;
}
.eu-iberia12 .fact{background:var(--paper); padding:20px 22px}
.eu-iberia12 .fact dt{font-size:12px; font-weight:500; color:var(--muted); margin-bottom:6px}
.eu-iberia12 .fact dd{margin:0; font-weight:600; font-size:21px; line-height:1.35; font-variant-numeric:tabular-nums}
.eu-iberia12 .fact dd small{display:block; font-weight:300; font-size:13px; color:var(--muted); margin-top:4px}


/* ── sections ─────────────────────────────────── */
.eu-iberia12 .sec{padding:64px 0 8px}
.eu-iberia12 .sec-label{
  font-size:11px; font-weight:500; letter-spacing:.18em; text-transform:uppercase;
  color:var(--tilegreen); margin-bottom:12px;
}
.eu-iberia12 .sec h2{font-size:clamp(26px,3.4vw,34px)}
.eu-iberia12 .sec .sub{margin-top:12px; color:var(--muted); max-width:62ch}


/* ── itinerary spine ──────────────────────────── */
.eu-iberia12 .days{margin-top:40px}
.eu-iberia12 .day{display:grid; grid-template-columns:104px 1fr; gap:0 28px; padding-bottom:44px; position:relative}
.eu-iberia12 .rail{position:relative}
.eu-iberia12 .rail::before{content:""; position:absolute; left:19px; top:44px; bottom:-44px; width:1px; background:var(--line)}
.eu-iberia12 .day:last-child .rail::before{display:none}
.eu-iberia12 .dnum{
  width:40px; height:40px; border-radius:50%;
  background:var(--paper); border:1px solid var(--tilegreen); color:var(--tilegreen);
  display:grid; place-items:center; font-size:14px; font-weight:500;
  position:relative; z-index:1;
}
.eu-iberia12 .day.hub .dnum{background:var(--tilegreen); border-color:var(--tilegreen); color:var(--paper)}
.eu-iberia12 .day.rest .dnum{background:var(--ochre); border-color:var(--ochre); color:var(--paper)}
.eu-iberia12 .day.rest .drive span::before{background:var(--ochre)}
.eu-iberia12 .day.rest ul.stops li::before{background:var(--ochre)}
.eu-iberia12 .day.rest .stay{border-left-color:var(--ochre)}
.eu-iberia12 .dwhen{
  width:80px; text-align:center; padding:7px 0 3px; margin-left:-20px;
  background:var(--paper); position:relative; z-index:1;
  font-weight:400; font-size:11.5px; color:var(--muted); white-space:nowrap;
  font-variant-numeric:tabular-nums;
}
.eu-iberia12 .day.rest .dwhen{color:var(--ochre); font-weight:500}
.eu-iberia12 .body{min-width:0}
.eu-iberia12 .dtitle{font-size:23px; letter-spacing:-.005em}
.eu-iberia12 .dtitle .via{color:var(--muted); font-weight:400}
.eu-iberia12 .drive{
  margin-top:10px; display:flex; flex-wrap:wrap; gap:6px 14px;
  font-weight:400; font-size:12.5px; color:var(--stone); font-variant-numeric:tabular-nums;
}
.eu-iberia12 .drive span{display:inline-flex; align-items:center; gap:6px}
.eu-iberia12 .drive span::before{content:""; width:5px; height:5px; background:var(--tilegreen-soft); border-radius:50%}
.eu-iberia12 ul.stops{list-style:none; padding:0; margin:18px 0 0; display:grid; gap:11px}
.eu-iberia12 ul.stops li{padding-left:18px; position:relative; line-height:1.7}
.eu-iberia12 ul.stops li::before{content:""; position:absolute; left:0; top:.72em; width:7px; height:1px; background:var(--tilegreen)}
.eu-iberia12 ul.stops b{font-weight:600; color:var(--ink)}
.eu-iberia12 .tag{
  display:inline-block; margin-left:6px; padding:1px 7px; border-radius:2px;
  font-weight:400; font-size:11px;
  border:1px solid var(--tilegreen); color:var(--tilegreen); vertical-align:2px;
}
.eu-iberia12 .tag.opt{border-color:var(--ochre); color:var(--ochre)}
.eu-iberia12 .tag.xmas{border-color:var(--ochre); color:var(--paper); background:var(--ochre)}
.eu-iberia12 .stay{
  margin-top:18px; padding:12px 16px; background:var(--tile); border-left:2px solid var(--tilegreen);
  font-size:13.5px; display:flex; flex-wrap:wrap; gap:4px 18px;
}
.eu-iberia12 .stay dt{font-size:12px; font-weight:500; color:var(--muted); align-self:center}
.eu-iberia12 .stay dd{margin:0; font-weight:500}


/* ── tables / cards ───────────────────────────── */
.eu-iberia12 .scroll{overflow-x:auto; margin-top:24px}
.eu-iberia12 table{border-collapse:collapse; width:100%; font-size:14px; min-width:560px}
.eu-iberia12 th, .eu-iberia12 td{text-align:left; padding:11px 14px; border-bottom:1px solid var(--line); vertical-align:top}
.eu-iberia12 th{font-size:12.5px; color:var(--muted); font-weight:500; border-bottom-color:var(--ink)}
.eu-iberia12 td.num{font-variant-numeric:tabular-nums; white-space:nowrap}
.eu-iberia12 td small{display:block; font-weight:300; font-size:12.5px; color:var(--muted); margin-top:3px; font-variant-numeric:tabular-nums}
.eu-iberia12 .cols{display:grid; gap:32px; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); margin-top:28px}
.eu-iberia12 .card{border:1px solid var(--line); padding:24px}
.eu-iberia12 .card h3{font-size:18px; margin-bottom:14px}
.eu-iberia12 .card ul{list-style:none; padding:0; margin:0; display:grid; gap:9px; font-size:14.5px}
.eu-iberia12 .card li{padding-left:16px; position:relative}
.eu-iberia12 .card li::before{content:""; position:absolute; left:0; top:.7em; width:6px; height:1px; background:var(--tilegreen)}
.eu-iberia12 .card.excl li::before{background:var(--muted)}
.eu-iberia12 .note{margin-top:28px; padding:24px 26px; border:1px solid var(--line); background:var(--tile)}
.eu-iberia12 .note .why{display:grid; gap:14px; counter-reset:w}
.eu-iberia12 .note .why div{padding-left:20px; position:relative}
.eu-iberia12 .note .why div::before{
  content:counter(w); counter-increment:w; position:absolute; left:0; top:.1em;
  font-weight:500; font-size:13px; color:var(--tilegreen);
}
.eu-iberia12 .note.warn{border-left:3px solid var(--ochre)}
.eu-iberia12 .note.warn .why div::before{color:var(--ochre)}
.eu-iberia12 footer{
  margin-top:72px; padding:36px 0 56px; border-top:1px solid var(--line);
  font-size:13px; color:var(--muted); display:flex; flex-wrap:wrap; gap:8px 28px; justify-content:space-between;
}
.eu-iberia12 footer b{color:var(--ink); font-weight:600; letter-spacing:.02em}
@media (max-width:640px){.eu-iberia12 .day{grid-template-columns:52px 1fr; gap:0 14px}
.eu-iberia12 .dwhen{width:52px; margin-left:-6px; font-size:10px}
.eu-iberia12 header.mast{padding:44px 0 32px}

}

</style>


<div class="mudejar"></div>

<div class="wrap">

  <header class="mast">
    <div class="eyebrow">Euforia Tour · Iberia Grand Tour · Lisbon In · Madrid Out</div>
    <h1>리스본에서 <span class="lat">마드리드</span>까지 12일</h1>
    <p class="lede">
      리스본에 내려 대서양이 끝나는 절벽까지 갔다가, 국경을 넘어 세비야로 들어갑니다.
      안달루시아 파라도르에서 사흘을 쉬고 알함브라를 지나 마드리드에서 돌아옵니다.
      되돌아가는 구간이 하나도 없어 12일 일정치고 주행이 짧고, 그만큼 시간이 관광으로 갑니다.
    </p>
    <div class="route">
      <b>리스본</b> → 신트라 → 까보 다 로카 → 카스카이스 → 에보라 → <b>세비야</b> →
      <em>카르모나</em> → 백색마을 → <em>론다</em> → 네르하 → 프리힐리아나 → <b>그라나다</b> → <b>마드리드</b>
    </div>

    <dl class="facts">
      <div class="fact"><dt>일정</dt><dd>12일 11박<small>출발일 협의 · 연중 진행</small></dd></div>
      <div class="fact"><dt>구성</dt><dd>관광 9 · 휴식 3<small>휴식은 6~8일차 연속</small></dd></div>
      <div class="fact"><dt>구간</dt><dd>리스본 IN · 마드리드 OUT<small>항공 별도 · 대한항공 KE921 / KE914</small></dd></div>
      <div class="fact"><dt>이동</dt><dd>전 구간 차량<small>국내선·열차 없음</small></dd></div>
      <div class="fact"><dt>총 주행</dt><dd>약 1,450km<small>11일 평균 132km</small></dd></div>
    </dl>
  </header>


  <section class="sec">
    <div class="sec-label">Flights</div>
    <h2>항공 안내</h2>
    <p class="sub">이 상품은 <b>지상 수배</b>입니다. 국제선 항공권은 불포함이며, 아래는 인천에서 오갈 수 있는 직항편입니다.</p>
    <div class="scroll">
      <table>
        <thead><tr><th>구간</th><th>항공사 · 편명</th><th>운항</th><th>소요</th></tr></thead>
        <tbody><tr><td>인천 → 리스본</td><td>대한항공 <b>KE921</b><br><small>13:00 → 19:35</small></td><td>주 3회<br><small>수 · 금 · 일</small></td><td>약 15시간 35분</td></tr><tr><td>마드리드 → 인천</td><td>대한항공 <b>KE914</b><br><small>21:25 → 18:15 (+1)</small></td><td>주 4회<br><small>화 · 목 · 금 · 일</small></td><td>약 12시간 50분</td></tr><tr><td>참고 · 리스본 → 인천</td><td>대한항공 KE922<br><small>21:40 → 20:00 (+1)</small></td><td>주 3회<br><small>수 · 금 · 일</small></td><td>약 13시간 20분</td></tr></tbody>
      </table>
    </div>
    <div class="note" style="margin-top:24px"><div class="why">
      <div><b>리스본이 뜨는 세 요일 모두 12일이 성립합니다.</b> 리스본편은 수·금·일 주 3회인데, 열하루 뒤 마드리드발 귀국편이 각각 일요일·화요일·목요일이고 셋 다 운항일입니다. <b>수요일에 나가면 일요일에, 금요일이면 화요일에, 일요일이면 목요일에 돌아옵니다.</b></div>
      <div><b>편도 두 건으로 수배합니다.</b> 들어가는 공항과 나오는 공항이 달라 왕복 한 건으로는 끊을 수 없습니다. 다만 두 구간 모두 대한항공 직항이라 <b>한 항공사로 묶을 수 있고</b>, 왕복 대비 요금 차이도 크지 않습니다.</div>
      <div><b>시각은 시즌마다 바뀝니다.</b> 동계(10월 말~3월 말)와 하계 스케줄이 달라 출발·도착 시각이 한두 시간 움직입니다. 위 시각은 동계 기준이며, <b>출발일이 정해지면 그 시점 스케줄로 다시 확인해 드립니다.</b></div>
    </div></div>
    <p class="sub" style="margin-top:20px">되돌아가는 구간이 없는 대신 들고나는 도시가 다릅니다. 항공을 왕복 한 건으로 끊고 싶으시면 마드리드 왕복이나 바르셀로나 왕복 구성을 봐 주십시오.</p>
  </section>

  <section class="sec">
    <div class="sec-label">Itinerary</div>
    <h2>일정</h2>
    <p class="sub">
      휴식 사흘은 6~8일차에 연속으로 둡니다. 안달루시아 국영 고성 호텔 파라도르 두 곳에서 묵습니다.
      중식·석식은 전 일정 자유식입니다.
    </p>

    <div class="days">

      <article class="day hub">
        <div class="rail"><div class="dnum">1</div><div class="dwhen">1일차</div></div>
        <div class="body">
          <h3 class="dtitle">인천 <span class="via">→</span> 리스본</h3>
          <div class="drive"><span>KE921 인천 13:00 → 리스본 19:35 (동계)</span><span>공항–호텔 20분</span></div>
          <ul class="stops">
            <li>대한항공 직항으로 리스본 도착, 미팅 후 호텔 이동 — 첫날은 휴식에 씁니다</li>
          </ul>
          <dl class="stay"><dt>숙박</dt><dd>리스본 (1/3박)</dd></dl>
        </div>
      </article>

      <article class="day">
        <div class="rail"><div class="dnum">2</div><div class="dwhen">2일차</div></div>
        <div class="body">
          <h3 class="dtitle">리스본 종일</h3>
          <div class="drive"><span>시내 약 40km</span><span>도보 구간 다수</span></div>
          <ul class="stops">
            <li><b>제로니무스 수도원</b><span class="tag">세계유산</span> — 대항해시대의 부로 지은 마누엘 양식의 정점</li>
            <li><b>벨렘탑</b><span class="tag">세계유산</span>과 <b>발견기념비</b> · <b>파스테이스 드 벨렝</b> 원조 에그타르트</li>
            <li><b>코메르시우 광장</b> · 아우구스타 개선문 · 산타 주스타 엘리베이터</li>
            <li><b>알파마</b>와 <b>상 조르지 성</b> · <b>28번 트램</b> 체험 승차</li>
            <li>파두 디너쇼<span class="tag opt">선택</span> — 유네스코 무형문화유산</li>
          </ul>
          <dl class="stay"><dt>숙박</dt><dd>리스본 (2/3박)</dd></dl>
        </div>
      </article>

      <article class="day">
        <div class="rail"><div class="dnum">3</div><div class="dwhen">3일차</div></div>
        <div class="body">
          <h3 class="dtitle">신트라 <span class="via">·</span> 까보 다 로카 <span class="via">·</span> 카스카이스</h3>
          <div class="drive"><span>약 110km</span><span>주행 2시간</span></div>
          <ul class="stops">
            <li><b>신트라 문화경관</b><span class="tag">세계유산</span> — 왕과 귀족들이 여름을 나던 안개 낀 산자락</li>
            <li><b>페나 궁전</b> — 노랑과 빨강으로 칠한 낭만주의 궁전</li>
            <li><b>킨타 다 헤갈레이라</b> — 지하 27m로 나선을 그리며 내려가는 입회의 우물</li>
            <li><b>까보 다 로카</b> — 유라시아 대륙 최서단. “여기 땅이 끝나고 바다가 시작된다”</li>
            <li><b>카스카이스</b>와 <b>보카 두 인페르누</b> · 에스토릴 해안도로</li>
          </ul>
          <dl class="stay"><dt>숙박</dt><dd>리스본 (3/3박)</dd></dl>
        </div>
      </article>

      <article class="day hub">
        <div class="rail"><div class="dnum">4</div><div class="dwhen">4일차</div></div>
        <div class="body">
          <h3 class="dtitle">에보라 <span class="via">→</span> 세비야</h3>
          <div class="drive"><span>약 350km</span><span>주행 4시간</span><span>국경 통과</span></div>
          <ul class="stops">
            <li><b>에보라 역사지구</b><span class="tag">세계유산</span> — 성벽 안이 통째로 유산인 알렌테주의 옛 수도</li>
            <li><b>뼈 예배당</b> — 5천 구의 유골로 벽을 쌓고 “우리 뼈가 당신 뼈를 기다린다”고 새겨 둔 곳</li>
            <li><b>디아나 로마 신전</b> · 에보라 대성당 · 히랄두 광장</li>
            <li>코르크나무 숲을 지나 국경을 넘어 <b>세비야</b> 도착 · 과달키비르 강변 산책</li>
          </ul>
          <dl class="stay"><dt>숙박</dt><dd>세비야 (1/2박)</dd></dl>
        </div>
      </article>

      <article class="day">
        <div class="rail"><div class="dnum">5</div><div class="dwhen">5일차</div></div>
        <div class="body">
          <h3 class="dtitle">세비야 종일</h3>
          <div class="drive"><span>시내 약 20km</span><span>도보 구간 다수</span></div>
          <ul class="stops">
            <li><b>세비야 대성당과 히랄다 탑</b><span class="tag">세계유산</span> — 세계 최대 고딕 성당, 콜럼버스의 관</li>
            <li><b>레알 알카사르</b><span class="tag">세계유산</span> — 무데하르 양식 왕궁과 정원</li>
            <li><b>스페인 광장</b>과 마리아 루이사 공원 · <b>산타 크루스 골목</b></li>
            <li>황금의 탑 · 메트로폴 파라솔<span class="tag opt">선택</span></li>
            <li>세비야 플라멩코<span class="tag opt">선택</span> — 유네스코 무형문화유산</li>
          </ul>
          <dl class="stay"><dt>숙박</dt><dd>세비야 (2/2박)</dd></dl>
        </div>
      </article>

      <article class="day rest">
        <div class="rail"><div class="dnum">6</div><div class="dwhen">6일차</div></div>
        <div class="body">
          <h3 class="dtitle">휴식 <span class="via">·</span> 카르모나 파라도르</h3>
          <div class="drive"><span>약 35km</span><span>주행 40분</span><span>오후 체크인 후 자유</span></div>
          <ul class="stops">
            <li><b>카르모나 파라도르</b> — 페드로 1세가 쓰던 무어인 성채를 고쳐 만든 호텔</li>
            <li>성벽 테라스에서 베가 평원으로 지는 해 — 이 파라도르의 전부입니다</li>
            <li>천천히 걷는 카르모나 구시가 — 세비야 문, 코르도바 문, 로마 시대 네크로폴리스</li>
            <li>파라도르 수영장과 정원에서 보내는 오후</li>
          </ul>
          <dl class="stay"><dt>숙박</dt><dd>카르모나 파라도르 (1박)</dd></dl>
        </div>
      </article>

      <article class="day rest">
        <div class="rail"><div class="dnum">7</div><div class="dwhen">7일차</div></div>
        <div class="body">
          <h3 class="dtitle">백색마을 길 <span class="via">→</span> 론다 파라도르</h3>
          <div class="drive"><span>약 165km</span><span>주행 2시간</span><span>오전 자유 · 오후 이동</span></div>
          <ul class="stops">
            <li>오전 카르모나에서 늦게까지 자유 — 체크아웃 서두르지 않습니다</li>
            <li>올리브 밭과 백색마을을 지나는 안달루시아 시골길 · 오수나 경유</li>
            <li><b>론다 파라도르</b> — 옛 시청사를 고쳐 만든 호텔, 누에보 다리 바로 옆 절벽 위</li>
            <li>협곡을 내려다보는 테라스에서 저녁</li>
          </ul>
          <dl class="stay"><dt>숙박</dt><dd>론다 파라도르 (1/2박)</dd></dl>
        </div>
      </article>

      <article class="day rest">
        <div class="rail"><div class="dnum">8</div><div class="dwhen">8일차</div></div>
        <div class="body">
          <h3 class="dtitle">휴식 <span class="via">·</span> 론다 파라도르</h3>
          <div class="drive"><span>일정 없음</span><span>완전 자유</span></div>
          <ul class="stops">
            <li>늦은 아침, 타호 협곡을 내려다보는 테라스에서 시작하는 하루</li>
            <li>원하는 만큼만 걷는 론다 구시가 — 누에보 다리, 투우장, 아랍 목욕탕</li>
            <li>세테닐 데 라스 보데가스 · 그라살레마 백색마을<span class="tag opt">선택</span> — 반나절 근교</li>
          </ul>
          <dl class="stay"><dt>숙박</dt><dd>론다 파라도르 (2/2박)</dd></dl>
        </div>
      </article>

      <article class="day">
        <div class="rail"><div class="dnum">9</div><div class="dwhen">9일차</div></div>
        <div class="body">
          <h3 class="dtitle">네르하 <span class="via">·</span> 프리힐리아나 <span class="via">→</span> 그라나다</h3>
          <div class="drive"><span>약 300km</span><span>주행 3시간 30분</span><span>실내 관람 없는 날</span></div>
          <ul class="stops">
            <li><b>네르하 발콘 데 에우로파</b> — 지중해로 튀어나온 절벽 전망대</li>
            <li><b>프리힐리아나</b> — 안달루시아에서 가장 아름다운 백색마을로 꼽히는 곳</li>
            <li>네르하 동굴<span class="tag opt">선택</span> — 종유석 대공동과 선사시대 벽화</li>
            <li>오후 <b>그라나다</b> 도착 · 대성당 앞 산책</li>
            <li>저녁 자유식 — 가이드가 알바이신 언덕 아래 추천 식당을 미리 안내합니다</li>
          </ul>
          <dl class="stay"><dt>숙박</dt><dd>그라나다 (1/2박)</dd></dl>
        </div>
      </article>

      <article class="day hub">
        <div class="rail"><div class="dnum">10</div><div class="dwhen">10일차</div></div>
        <div class="body">
          <h3 class="dtitle">그라나다 걷는 날</h3>
          <div class="drive"><span>시내 약 20km</span><span>전부 야외 일정</span></div>
          <ul class="stops">
            <li>알함브라는 이튿날 오전에 봅니다. 이날은 언덕 위 옛 도시를 걷는 데 씁니다</li>
            <li><b>알바이신</b><span class="tag">세계유산</span> — 무어인들이 남긴 언덕 위 옛 마을, 좁은 골목과 흰 벽</li>
            <li><b>산 니콜라스 전망대</b> — 시에라네바다 설산을 배경으로 알함브라 전경</li>
            <li><b>사크로몬테</b> 동굴 지구 — 집시들이 산비탈을 파고 들어가 만든 마을</li>
            <li>그라나다 대성당과 왕실 예배당 외관 · 누에바 광장</li>
          </ul>
          <dl class="stay"><dt>숙박</dt><dd>그라나다 (2/2박)</dd></dl>
        </div>
      </article>

      <article class="day hub">
        <div class="rail"><div class="dnum">11</div><div class="dwhen">11일차</div></div>
        <div class="body">
          <h3 class="dtitle">알함브라 <span class="via">→</span> 마드리드</h3>
          <div class="drive"><span>약 430km</span><span>주행 4시간 30분</span><span>알함브라 오전 지정 입장</span></div>
          <ul class="stops">
            <li><b>알함브라 궁전</b><span class="tag">세계유산</span> — 나스르 왕조의 붉은 성. 사자의 중정, 헤네랄리페 정원</li>
            <li>오전 지정 시간 입장 후 점심</li>
            <li>오후 마드리드로 북상 — 라만차 평원을 가로지릅니다</li>
            <li>저녁 <b>마요르 광장</b>과 <b>그란 비아</b></li>
          </ul>
          <dl class="stay"><dt>숙박</dt><dd>마드리드 (1박)</dd></dl>
        </div>
      </article>

      <article class="day hub">
        <div class="rail"><div class="dnum">12</div><div class="dwhen">12일차</div></div>
        <div class="body">
          <h3 class="dtitle">마드리드 종일 <span class="via">→</span> 인천</h3>
          <div class="drive"><span>시내 약 30km</span><span>마드리드 저녁 출발편 기준</span><span>17:30 공항 이동</span></div>
          <ul class="stops">
            <li><b>프라도 미술관</b><span class="tag">세계유산</span> — 벨라스케스 「시녀들」, 고야, 보스의 「쾌락의 정원」</li>
            <li><b>파세오 델 프라도와 부엔 레티로</b><span class="tag">세계유산</span> — 2021년 등재된 계몽 시대 도시경관</li>
            <li><b>마드리드 왕궁</b>과 알무데나 대성당 · 마요르 광장 · 산 미겔 시장</li>
            <li>솔 광장 자유 시간 후 공항 이동</li>
            <li>마드리드 저녁 출발 — 이튿날 인천 도착</li>
          </ul>
        </div>
      </article>

    </div>
  </section>

  <section class="sec">
    <div class="sec-label">Design note</div>
    <h2>왜 이 동선인가</h2>
    <div class="note">
      <div class="why">
        <div><b>한 방향으로만 갑니다.</b> 리스본에서 시작해 마드리드에서 끝나므로 되돌아가는 구간이 아예 없습니다. 총 주행 1,450km, 하루 평균 130km입니다. 12일 일정으로는 짧은 편이고 남는 시간이 그대로 관광으로 갑니다.</div>
        <div><b>남는 시간이 관광으로 갑니다.</b> 주행이 짧은 만큼 리스본 3박, 세비야 2박, 그라나다 2박처럼 한 도시에 이틀씩 머무는 구성이 가능합니다. 짐 푸는 횟수는 여섯 번입니다.</div>
        <div><b>포르투갈과 스페인을 한 상품에 담습니다.</b> 리스본·신트라·에보라와 세비야·그라나다·마드리드를 같은 일정에서 봅니다. 두 나라를 각각 다녀오는 것보다 항공과 일수가 크게 절약됩니다.</div>
        <div><b>그라나다에 이틀 묵습니다.</b> 알함브라를 도착 이튿날 오전 지정 시간에 배치할 수 있고, 남는 하루는 알바이신과 사크로몬테를 걷는 데 씁니다. 알함브라만 보고 곧장 떠나는 일정과 가장 크게 다른 점입니다.</div>
        <div><b>항공은 편도 두 개입니다.</b> 리스본 IN, 마드리드 OUT이라 왕복 하나로 끊는 마드리드 인아웃 안보다 항공 수배가 까다롭습니다. 대한항공 리스본편이 수·금·일 주 3회라 출발일 선택 폭도 좁습니다.</div>
      </div>
    </div>
  </section>

  <section class="sec">
    <div class="sec-label">Inclusions</div>
    <h2>포함 · 불포함</h2>
    <div class="cols">
      <div class="card">
        <h3>포함 사항</h3>
        <ul>
          <li>4성급 호텔 8박 · <b>조식 포함</b></li>
          <li><b>파라도르 3박</b> (카르모나 1 · 론다 2) · 조식 포함</li>
          <li>전용 차량 및 기사 (현지 12일 · 전 구간)</li>
          <li>한국인 인솔 가이드 전 일정 동행</li>
          <li>일정표 명시 도시의 현지 가이드</li>
          <li>일정표 명시 입장료 전액</li>
          <li>여행자 보험</li>
        </ul>
      </div>
      <div class="card excl">
        <h3>불포함 사항</h3>
        <ul>
          <li><b>왕복 국제선 항공권</b> — 지상 수배 상품입니다</li>
          <li><b>중식 · 석식 (전 일정 자유식)</b> — 가이드가 현지 식당을 안내합니다</li>
          <li>선택 관광 비용</li>
          <li>가이드 · 기사 팁</li>
          <li>개인 경비</li>
          <li>포르투갈 도시별 숙박세 (리스본 1인 1박 €4, 현지 납부)</li>
          <li>초과 수하물 요금</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="sec">
    <div class="sec-label">Highlights</div>
    <h2>이 일정에 담긴 것</h2>
    <div class="scroll">
      <table>
        <thead><tr><th>구분</th><th>내용</th></tr></thead>
        <tbody>
          <tr><td>세계유산</td><td>제로니무스 수도원 · 벨렘탑 · 신트라 문화경관 · 에보라 역사지구 · 세비야 대성당과 알카사르 · 알함브라와 알바이신 · 파세오 델 프라도와 부엔 레티로 <b>(7곳)</b></td></tr>
          <tr><td>백색마을</td><td>프리힐리아나 · 론다 · 카르모나 · 오수나 · 세테닐(선택) · 그라살레마(선택)</td></tr>
          <tr><td>파라도르</td><td>카르모나(무어인 성채) 1박 · 론다(옛 시청사, 절벽 위) 2박</td></tr>
          <tr><td>이동 방식</td><td>전 구간 전용 차량 — 국내선·열차 없이 12일을 한 대로 이동합니다</td></tr>
          <tr><td>숙박 도시</td><td>리스본 3 · 세비야 2 · 카르모나 1 · 론다 2 · 그라나다 2 · 마드리드 1 <b>(11박)</b></td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <footer>
    <div><b>EUFORIA TOUR SPAIN</b> · Euforia das Nuvens, S.L. · Calle Gran Vía 69, Madrid</div>
    <div>일정과 순서는 현지 사정에 따라 조정될 수 있습니다.</div>
  </footer>

</div>

<div class="mudejar"></div>


</div>
`,
      highlights: ['제로니무스 수도원 · 벨렘탑 (세계유산)', '신트라 문화경관 · 유라시아 최서단 까보 다 로카', '에보라 역사지구 (세계유산) · 뼈 예배당', '세비야 대성당 · 레알 알카사르 (세계유산)', '카르모나·론다 파라도르(국영 고성 호텔) 3박', '프리힐리아나 백색마을 · 알함브라 궁전 (세계유산)', '그라나다 알바이신 · 사크로몬테 · 프라도 미술관'],
      includes: ['4성급 호텔 8박 · 조식 포함', '파라도르 3박(카르모나 1·론다 2) · 조식 포함', '전용 차량 및 기사(현지 12일 · 전 구간)', '한국인 인솔 가이드 전 일정 동행', '일정표 명시 도시 현지 가이드', '일정표 명시 입장료 전액', '여행자 보험'],
      excludes: ['왕복 국제선 항공권(지상 수배 상품)', '중식·석식(전 일정 자유식)', '선택 관광 비용', '가이드 · 기사 팁', '개인 경비', '포르투갈 도시별 숙박세(리스본 1인 1박 €4, 현지 납부)', '초과 수하물 요금'],
      duration: '11박 12일 (리스본 IN · 마드리드 OUT · 관광 9일+휴식 3일)'
    }
  },
{
    id: 'spain-12days-barcelona',
    downloadUrl: '/docs/spain-12days-itinerary.pdf',
    cats: ['spain'],
    topClass: 'spain',
    region: 'SPAIN',
    days: '11박12일',
    price: '가격 문의',
    title: '[스페인 일주] 바르셀로나 IN/OUT 11박12일',
    summary: '바르셀로나에서 지중해를 따라 남하해 알함브라와 백색마을을 지나고, 안달루시아 파라도르에서 사흘을 쉰 뒤 세비야·코르도바·마드리드를 거쳐 돌아오는 스페인 일주예요.',
    tags: ['11박 12일', '파라도르 3박', '관광 9일+휴식 3일'],
    isNew: true,
    detail: {
      lead: '바르셀로나 2박·발렌시아 1박·그라나다 1박·론다 파라도르 2박·카르모나 파라도르 1박·세비야 2박·마드리드 2박, 시계 방향으로 스페인을 한 바퀴 도는 일주예요.',
      description: `<!-- ── Euforia Tour · 스페인 일주 12일(바르셀로나 IN/OUT) · 붙여넣기용 조각 ──
     이 블록 전체를 상세설명 HTML 칸에 그대로 붙여 넣으십시오.
     모든 스타일이 .eu-spain12a 안으로만 적용되므로 사이트의 기존 디자인과 부딪히지 않습니다. ── -->
<div class="eu-spain12a">
<style>
.eu-spain12a{
  --ink:#20292B;
  --tilegreen:#1F6F6B;
  --tilegreen-soft:#5E9A96;
  --ochre:#A9682B;
  --stone:#6E7B78;
  --paper:#FAF7F1;
  --tile:#EFEDE5;
  --line:#DAD6CA;
  --muted:#6B7573;
  --pattern-op:.16;
  --f-kr:"IBM Plex Sans KR","Noto Sans KR","Malgun Gothic",system-ui,-apple-system,sans-serif;
  --f-disp:var(--f-kr);
  --f-body:var(--f-kr);
}
.eu-spain12a *{box-sizing:border-box}
.eu-spain12a{overflow-x:hidden;max-width:100%;
  margin:0; background:var(--paper); color:var(--ink);
  font-family:var(--f-body); font-weight:300; font-size:16px; line-height:1.75;
  -webkit-font-smoothing:antialiased;
  word-break:keep-all; overflow-wrap:anywhere;
}
.eu-spain12a h1, .eu-spain12a h2, .eu-spain12a h3, .eu-spain12a h4{font-family:var(--f-disp); font-weight:600; text-wrap:balance; margin:0; line-height:1.3; letter-spacing:-.015em}
.eu-spain12a p{margin:0}
.eu-spain12a a{color:var(--tilegreen)}
.eu-spain12a .wrap{max-width:1080px; margin:0 auto; padding:0 24px}


/* ── 알함브라 팔각 성형 타일 밴드 ─────────────── */
.eu-spain12a .mudejar{
  height:18px;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 44 44'%3E%3Cg fill='none' stroke='%231F6F6B' stroke-width='1.15'%3E%3Crect x='9' y='9' width='26' height='26'/%3E%3Crect x='9' y='9' width='26' height='26' transform='rotate(45 22 22)'/%3E%3Ccircle cx='22' cy='22' r='4'/%3E%3C/g%3E%3C/svg%3E");
  background-size:22px 22px;
  opacity:var(--pattern-op);
}


/* ── masthead ─────────────────────────────────── */
.eu-spain12a header.mast{padding:64px 0 44px}
.eu-spain12a .eyebrow{
  font-size:11.5px; font-weight:500; letter-spacing:.2em; text-transform:uppercase;
  color:var(--tilegreen); margin-bottom:20px;
}
.eu-spain12a h1{font-size:clamp(36px,5.8vw,60px); font-weight:700; letter-spacing:-.03em}
.eu-spain12a h1 .lat{font-weight:300; color:var(--tilegreen)}
.eu-spain12a .lede{margin-top:20px; max-width:56ch; font-size:17.5px; color:var(--muted); line-height:1.85}
.eu-spain12a .route{
  margin-top:34px; padding-top:22px; border-top:1px solid var(--line);
  font-weight:400; font-size:13px; line-height:2.2; color:var(--stone);
}
.eu-spain12a .route b{color:var(--ink); font-weight:500}
.eu-spain12a .route em{color:var(--ochre); font-style:normal; font-weight:500}


/* ── facts ────────────────────────────────────── */
.eu-spain12a .facts{
  display:grid; gap:1px; background:var(--line);
  grid-template-columns:repeat(auto-fit,minmax(160px,1fr));
  border:1px solid var(--line); margin:44px 0 8px;
}
.eu-spain12a .fact{background:var(--paper); padding:20px 22px}
.eu-spain12a .fact dt{font-size:12px; font-weight:500; color:var(--muted); margin-bottom:6px}
.eu-spain12a .fact dd{margin:0; font-weight:600; font-size:21px; line-height:1.35; font-variant-numeric:tabular-nums}
.eu-spain12a .fact dd small{display:block; font-weight:300; font-size:13px; color:var(--muted); margin-top:4px}


/* ── sections ─────────────────────────────────── */
.eu-spain12a .sec{padding:64px 0 8px}
.eu-spain12a .sec-label{
  font-size:11px; font-weight:500; letter-spacing:.18em; text-transform:uppercase;
  color:var(--tilegreen); margin-bottom:12px;
}
.eu-spain12a .sec h2{font-size:clamp(26px,3.4vw,34px)}
.eu-spain12a .sec .sub{margin-top:12px; color:var(--muted); max-width:62ch}


/* ── itinerary spine ──────────────────────────── */
.eu-spain12a .days{margin-top:40px}
.eu-spain12a .day{display:grid; grid-template-columns:104px 1fr; gap:0 28px; padding-bottom:44px; position:relative}
.eu-spain12a .rail{position:relative}
.eu-spain12a .rail::before{content:""; position:absolute; left:19px; top:44px; bottom:-44px; width:1px; background:var(--line)}
.eu-spain12a .day:last-child .rail::before{display:none}
.eu-spain12a .dnum{
  width:40px; height:40px; border-radius:50%;
  background:var(--paper); border:1px solid var(--tilegreen); color:var(--tilegreen);
  display:grid; place-items:center; font-size:14px; font-weight:500;
  position:relative; z-index:1;
}
.eu-spain12a .day.hub .dnum{background:var(--tilegreen); border-color:var(--tilegreen); color:var(--paper)}
.eu-spain12a .day.rest .dnum{background:var(--ochre); border-color:var(--ochre); color:var(--paper)}
.eu-spain12a .day.rest .drive span::before{background:var(--ochre)}
.eu-spain12a .day.rest ul.stops li::before{background:var(--ochre)}
.eu-spain12a .day.rest .stay{border-left-color:var(--ochre)}
.eu-spain12a .dwhen{
  width:80px; text-align:center; padding:7px 0 3px; margin-left:-20px;
  background:var(--paper); position:relative; z-index:1;
  font-weight:400; font-size:11.5px; color:var(--muted); white-space:nowrap;
  font-variant-numeric:tabular-nums;
}
.eu-spain12a .day.rest .dwhen{color:var(--ochre); font-weight:500}
.eu-spain12a .body{min-width:0}
.eu-spain12a .dtitle{font-size:23px; letter-spacing:-.005em}
.eu-spain12a .dtitle .via{color:var(--muted); font-weight:400}
.eu-spain12a .drive{
  margin-top:10px; display:flex; flex-wrap:wrap; gap:6px 14px;
  font-weight:400; font-size:12.5px; color:var(--stone); font-variant-numeric:tabular-nums;
}
.eu-spain12a .drive span{display:inline-flex; align-items:center; gap:6px}
.eu-spain12a .drive span::before{content:""; width:5px; height:5px; background:var(--tilegreen-soft); border-radius:50%}
.eu-spain12a ul.stops{list-style:none; padding:0; margin:18px 0 0; display:grid; gap:11px}
.eu-spain12a ul.stops li{padding-left:18px; position:relative; line-height:1.7}
.eu-spain12a ul.stops li::before{content:""; position:absolute; left:0; top:.72em; width:7px; height:1px; background:var(--tilegreen)}
.eu-spain12a ul.stops b{font-weight:600; color:var(--ink)}
.eu-spain12a .tag{
  display:inline-block; margin-left:6px; padding:1px 7px; border-radius:2px;
  font-weight:400; font-size:11px;
  border:1px solid var(--tilegreen); color:var(--tilegreen); vertical-align:2px;
}
.eu-spain12a .tag.opt{border-color:var(--ochre); color:var(--ochre)}
.eu-spain12a .tag.xmas{border-color:var(--ochre); color:var(--paper); background:var(--ochre)}
.eu-spain12a .stay{
  margin-top:18px; padding:12px 16px; background:var(--tile); border-left:2px solid var(--tilegreen);
  font-size:13.5px; display:flex; flex-wrap:wrap; gap:4px 18px;
}
.eu-spain12a .stay dt{font-size:12px; font-weight:500; color:var(--muted); align-self:center}
.eu-spain12a .stay dd{margin:0; font-weight:500}


/* ── tables / cards ───────────────────────────── */
.eu-spain12a .scroll{overflow-x:auto; margin-top:24px}
.eu-spain12a table{border-collapse:collapse; width:100%; font-size:14px; min-width:560px}
.eu-spain12a th, .eu-spain12a td{text-align:left; padding:11px 14px; border-bottom:1px solid var(--line); vertical-align:top}
.eu-spain12a th{font-size:12.5px; color:var(--muted); font-weight:500; border-bottom-color:var(--ink)}
.eu-spain12a td.num{font-variant-numeric:tabular-nums; white-space:nowrap}
.eu-spain12a td small{display:block; font-weight:300; font-size:12.5px; color:var(--muted); margin-top:3px; font-variant-numeric:tabular-nums}
.eu-spain12a .cols{display:grid; gap:32px; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); margin-top:28px}
.eu-spain12a .card{border:1px solid var(--line); padding:24px}
.eu-spain12a .card h3{font-size:18px; margin-bottom:14px}
.eu-spain12a .card ul{list-style:none; padding:0; margin:0; display:grid; gap:9px; font-size:14.5px}
.eu-spain12a .card li{padding-left:16px; position:relative}
.eu-spain12a .card li::before{content:""; position:absolute; left:0; top:.7em; width:6px; height:1px; background:var(--tilegreen)}
.eu-spain12a .card.excl li::before{background:var(--muted)}
.eu-spain12a .note{margin-top:28px; padding:24px 26px; border:1px solid var(--line); background:var(--tile)}
.eu-spain12a .note .why{display:grid; gap:14px; counter-reset:w}
.eu-spain12a .note .why div{padding-left:20px; position:relative}
.eu-spain12a .note .why div::before{
  content:counter(w); counter-increment:w; position:absolute; left:0; top:.1em;
  font-weight:500; font-size:13px; color:var(--tilegreen);
}
.eu-spain12a .note.warn{border-left:3px solid var(--ochre)}
.eu-spain12a .note.warn .why div::before{color:var(--ochre)}
.eu-spain12a footer{
  margin-top:72px; padding:36px 0 56px; border-top:1px solid var(--line);
  font-size:13px; color:var(--muted); display:flex; flex-wrap:wrap; gap:8px 28px; justify-content:space-between;
}
.eu-spain12a footer b{color:var(--ink); font-weight:600; letter-spacing:.02em}
@media (max-width:640px){.eu-spain12a .day{grid-template-columns:52px 1fr; gap:0 14px}
.eu-spain12a .dwhen{width:52px; margin-left:-6px; font-size:10px}
.eu-spain12a header.mast{padding:44px 0 32px}

}

</style>


<div class="mudejar"></div>

<div class="wrap">

  <header class="mast">
    <div class="eyebrow">Euforia Tour · Spain Grand Tour</div>
    <h1>스페인 일주 <span class="lat">12일</span></h1>
    <p class="lede">
      바르셀로나에서 지중해를 따라 남하해 알함브라와 백색마을을 지나고,
      안달루시아 파라도르에서 사흘을 쉰 뒤 세비야·코르도바·마드리드를 거쳐 돌아옵니다.
      관광 아홉 날과 쉬는 사흘을 처음부터 나눠 설계했고, 전 구간을 전용 차량으로만 이동합니다.
    </p>
    <div class="route">
      <b>바르셀로나</b> → 몬세라트 → <b>발렌시아</b> → <b>그라나다</b> → 네르하 → 프리힐리아나 →
      <em>론다</em> → 백색마을 → <em>카르모나</em> → <b>세비야</b> → 코르도바 → <b>마드리드</b> → 사라고사 → 바르셀로나
    </div>

    <dl class="facts">
      <div class="fact"><dt>일정</dt><dd>12일 11박<small>출발일 협의 · 연중 진행</small></dd></div>
      <div class="fact"><dt>구성</dt><dd>관광 9 · 휴식 3<small>휴식은 6~8일차 연속</small></dd></div>
      <div class="fact"><dt>구간</dt><dd>바르셀로나 IN/OUT<small>항공 별도 · 아시아나 OZ511/512</small></dd></div>
      <div class="fact"><dt>이동</dt><dd>전 구간 차량<small>국내선·열차 없음</small></dd></div>
      <div class="fact"><dt>총 주행</dt><dd>약 2,700km<small>11일 평균 245km</small></dd></div>
    </dl>
  </header>


  <section class="sec">
    <div class="sec-label">Flights</div>
    <h2>항공 안내</h2>
    <p class="sub">이 상품은 <b>지상 수배</b>입니다. 국제선 항공권은 불포함이며, 아래는 인천에서 오갈 수 있는 직항편입니다.</p>
    <div class="scroll">
      <table>
        <thead><tr><th>구간</th><th>항공사 · 편명</th><th>운항</th><th>소요</th></tr></thead>
        <tbody><tr><td>인천 → 바르셀로나</td><td>아시아나 <b>OZ511</b><br><small>11:50 → 19:10</small></td><td><b>매일</b><br><small>2026년 9월 1일부터</small></td><td>약 14시간 20분</td></tr><tr><td>바르셀로나 → 인천</td><td>아시아나 <b>OZ512</b><br><small>20:50 → 16:20 (+1)</small></td><td><b>매일</b></td><td>약 13시간 30분</td></tr><tr><td>인천 ↔ 바르셀로나</td><td>티웨이 TW407 / TW408<br><small>11:05 → 19:00</small></td><td>주 4회</td><td>약 14시간 55분</td></tr><tr><td>인천 ↔ 바르셀로나</td><td>대한항공</td><td>직항 노선 <b>없음</b></td><td>—</td></tr></tbody>
      </table>
    </div>
    <div class="note" style="margin-top:24px"><div class="why">
      <div><b>출발 요일에 제한이 없습니다.</b> 아시아나가 2026년 9월 1일부터 인천–바르셀로나를 매일 운항합니다. 가는 편도 오는 편도 매일 있으니 어느 요일에 출발해도 12일이 그대로 나옵니다. 세 노선 가운데 날짜를 가장 자유롭게 잡을 수 있습니다.</div>
      <div><b>시각은 시즌마다 바뀝니다.</b> 동계(10월 말~3월 말)와 하계 스케줄이 달라 출발·도착 시각이 한두 시간 움직입니다. 위 시각은 동계 기준이며, <b>출발일이 정해지면 그 시점 스케줄로 다시 확인해 드립니다.</b></div>
    </div></div>
    <p class="sub" style="margin-top:20px">대한항공은 인천–바르셀로나 직항 노선이 없습니다. 티웨이는 주 4회 운항이라 출발 요일이 맞아야 합니다. 좌석은 운항 요일과 별개이므로, 특히 연말·여름 성수기에는 <b>단체 좌석 확보가 먼저입니다.</b></p>
  </section>

  <section class="sec">
    <div class="sec-label">Itinerary</div>
    <h2>일정</h2>
    <p class="sub">
      휴식 사흘은 6~8일차에 연속으로 둡니다. 안달루시아 국영 고성 호텔 파라도르 두 곳에서 묵습니다.
      중식·석식은 전 일정 자유식입니다.
    </p>

    <div class="days">

      <article class="day hub">
        <div class="rail"><div class="dnum">1</div><div class="dwhen">1일차</div></div>
        <div class="body">
          <h3 class="dtitle">인천 <span class="via">→</span> 바르셀로나</h3>
          <div class="drive"><span>공항–호텔 약 20km</span><span>인천 오전 출발 · 바르셀로나 저녁 도착</span></div>
          <ul class="stops">
            <li>바르셀로나 공항 미팅 후 호텔 이동 — 첫날은 휴식에 씁니다</li>
          </ul>
          <dl class="stay"><dt>숙박</dt><dd>바르셀로나 (1/2박)</dd></dl>
        </div>
      </article>

      <article class="day">
        <div class="rail"><div class="dnum">2</div><div class="dwhen">2일차</div></div>
        <div class="body">
          <h3 class="dtitle">바르셀로나 종일</h3>
          <div class="drive"><span>시내 약 40km</span><span>도보 구간 다수</span></div>
          <ul class="stops">
            <li><b>사그라다 파밀리아</b><span class="tag">세계유산</span> — 가우디가 43년을 매달린 미완의 성당</li>
            <li><b>구엘 공원</b><span class="tag">세계유산</span> · <b>까사 바트요</b>와 까사 밀라 — 가우디 작품군</li>
            <li><b>고딕 지구</b>와 바르셀로나 대성당 · 보케리아 시장 · 람블라스 거리</li>
            <li><b>산타 마리아 델 마르 성당</b>과 보른 지구 — 카탈루냐 고딕의 정수</li>
            <li><b>몬주익 언덕</b> 전망과 마법의 분수 조명</li>
          </ul>
          <dl class="stay"><dt>숙박</dt><dd>바르셀로나 (2/2박)</dd></dl>
        </div>
      </article>

      <article class="day">
        <div class="rail"><div class="dnum">3</div><div class="dwhen">3일차</div></div>
        <div class="body">
          <h3 class="dtitle">몬세라트 <span class="via">→</span> 발렌시아</h3>
          <div class="drive"><span>약 410km</span><span>주행 4시간 30분</span><span>08:30 출발</span></div>
          <ul class="stops">
            <li><b>몬세라트 수도원</b> — 톱니 모양 바위산 위 베네딕토회 수도원, 검은 성모 라 모레네타</li>
            <li>몬세라트 <b>케이블카</b> 또는 산악열차 · 소년 합창단 에스콜라니아</li>
            <li>지중해 연안을 따라 남하 — 발렌시아 도착</li>
            <li>저녁 <b>발렌시아 구시가</b> 산책</li>
          </ul>
          <dl class="stay"><dt>숙박</dt><dd>발렌시아 (1박)</dd></dl>
        </div>
      </article>

      <article class="day">
        <div class="rail"><div class="dnum">4</div><div class="dwhen">4일차</div></div>
        <div class="body">
          <h3 class="dtitle">발렌시아 <span class="via">→</span> 그라나다</h3>
          <div class="drive"><span>약 500km</span><span>주행 5시간</span><span>오전 관광 후 이동</span></div>
          <ul class="stops">
            <li><b>라 론하 데 라 세다</b><span class="tag">세계유산</span> — 지중해 무역 전성기의 비단 거래소</li>
            <li><b>중앙시장</b> — 유럽 최대 규모 재래시장 중 하나, 모데르니스모 철골 건축</li>
            <li><b>발렌시아 대성당</b>과 성배 예배당 · 미겔레테 탑</li>
            <li><b>예술과학도시</b> 외관 — 칼라트라바의 백색 구조물</li>
            <li>오후 내륙을 가로질러 그라나다로 이동</li>
          </ul>
          <dl class="stay"><dt>숙박</dt><dd>그라나다 (1박)</dd></dl>
        </div>
      </article>

      <article class="day">
        <div class="rail"><div class="dnum">5</div><div class="dwhen">5일차</div></div>
        <div class="body">
          <h3 class="dtitle">알함브라 <span class="via">·</span> 네르하 <span class="via">·</span> 프리힐리아나 <span class="via">→</span> 론다</h3>
          <div class="drive"><span>약 300km</span><span>주행 3시간 30분</span><span>알함브라 오전 지정 입장</span></div>
          <ul class="stops">
            <li><b>알함브라 궁전</b><span class="tag">세계유산</span> — 나스르 왕조의 붉은 성. 사자의 중정, 헤네랄리페 정원</li>
            <li><b>네르하 발콘 데 에우로파</b> — 지중해로 튀어나온 절벽 전망대</li>
            <li><b>프리힐리아나</b> — 안달루시아에서 가장 아름다운 백색마을로 꼽히는 곳</li>
            <li>해 지기 전 <b>론다</b> 입성 — 파라도르 체크인, 타호 협곡 전망</li>
          </ul>
          <dl class="stay"><dt>숙박</dt><dd>론다 파라도르 (1/2박)</dd></dl>
        </div>
      </article>

      <article class="day rest">
        <div class="rail"><div class="dnum">6</div><div class="dwhen">6일차</div></div>
        <div class="body">
          <h3 class="dtitle">휴식 <span class="via">·</span> 론다 파라도르</h3>
          <div class="drive"><span>일정 없음</span><span>완전 자유</span></div>
          <ul class="stops">
            <li>옛 시청사를 고쳐 만든 <b>론다 파라도르</b> — 누에보 다리 바로 옆, 절벽 위에 서 있습니다</li>
            <li>늦은 아침, 협곡을 내려다보는 테라스에서 시작하는 하루</li>
            <li>원하는 만큼만 걷는 론다 구시가 — 누에보 다리, 투우장, 아랍 목욕탕</li>
            <li>세테닐 데 라스 보데가스 · 그라살레마 백색마을<span class="tag opt">선택</span> — 반나절 근교</li>
          </ul>
          <dl class="stay"><dt>숙박</dt><dd>론다 파라도르 (2/2박)</dd></dl>
        </div>
      </article>

      <article class="day rest">
        <div class="rail"><div class="dnum">7</div><div class="dwhen">7일차</div></div>
        <div class="body">
          <h3 class="dtitle">백색마을 길 <span class="via">→</span> 카르모나 파라도르</h3>
          <div class="drive"><span>약 165km</span><span>주행 2시간</span><span>오전 자유 · 오후 이동</span></div>
          <ul class="stops">
            <li>오전 론다에서 늦게까지 자유 — 체크아웃 서두르지 않습니다</li>
            <li>올리브 밭과 백색마을을 지나는 안달루시아 시골길</li>
            <li><b>카르모나 파라도르</b> — 페드로 1세가 쓰던 무어인 성채를 고쳐 만든 호텔</li>
            <li>성벽 테라스에서 베가 평원으로 지는 해 — 이 파라도르의 전부입니다</li>
          </ul>
          <dl class="stay"><dt>숙박</dt><dd>카르모나 파라도르 (1박)</dd></dl>
        </div>
      </article>

      <article class="day rest">
        <div class="rail"><div class="dnum">8</div><div class="dwhen">8일차</div></div>
        <div class="body">
          <h3 class="dtitle">카르모나 자유 <span class="via">→</span> 세비야</h3>
          <div class="drive"><span>약 35km</span><span>주행 40분</span><span>오전 완전 자유</span></div>
          <ul class="stops">
            <li>오전 카르모나 완전 자유 — 파라도르 수영장, 성벽 산책, 로마 시대 네크로폴리스</li>
            <li>세비야 문과 코르도바 문 사이 언덕 마을을 천천히 걷습니다</li>
            <li>오후 <b>세비야</b> 이동 · 체크인 후 과달키비르 강변 산책</li>
          </ul>
          <dl class="stay"><dt>숙박</dt><dd>세비야 (1/2박)</dd></dl>
        </div>
      </article>

      <article class="day hub">
        <div class="rail"><div class="dnum">9</div><div class="dwhen">9일차</div></div>
        <div class="body">
          <h3 class="dtitle">세비야 종일</h3>
          <div class="drive"><span>시내 약 20km</span><span>실내 관람은 오전 집중</span></div>
          <ul class="stops">
            <li><b>세비야 대성당과 히랄다 탑</b><span class="tag">세계유산</span> — 세계 최대 고딕 성당, 콜럼버스의 관</li>
            <li><b>레알 알카사르</b><span class="tag">세계유산</span> — 무데하르 양식 왕궁과 정원</li>
            <li><b>스페인 광장</b> — 반원형 회랑과 타일 벤치, 오후에도 열려 있는 야외 명소</li>
            <li><b>산타 크루스 골목</b>과 황금의 탑 · 과달키비르 강변</li>
            <li>저녁 자유식 — 가이드가 구시가의 타파스 골목과 추천 식당을 미리 안내합니다</li>
          </ul>
          <dl class="stay"><dt>숙박</dt><dd>세비야 (2/2박)</dd></dl>
        </div>
      </article>

      <article class="day hub">
        <div class="rail"><div class="dnum">10</div><div class="dwhen">10일차</div></div>
        <div class="body">
          <h3 class="dtitle">코르도바 <span class="via">→</span> 마드리드</h3>
          <div class="drive"><span>약 540km</span><span>주행 5시간 30분</span><span>실내 관람 없는 날</span></div>
          <ul class="stops">
            <li>세비야에서 마드리드로 북상하는 이동일 — 코르도바를 중간에 끊어 야외 위주로 봅니다</li>
            <li><b>코르도바 유대인 지구</b><span class="tag">세계유산</span> — 골목과 파티오, 메스키타 외관과 종탑</li>
            <li><b>로마교</b>와 칼라오라 탑 — 과달키비르 강 건너에서 보는 옛 도시</li>
            <li>오후 마드리드로 북상</li>
            <li>저녁 <b>마요르 광장</b>과 <b>그란 비아</b> · 솔 광장</li>
          </ul>
          <dl class="stay"><dt>숙박</dt><dd>마드리드 (1/2박)</dd></dl>
        </div>
      </article>

      <article class="day">
        <div class="rail"><div class="dnum">11</div><div class="dwhen">11일차</div></div>
        <div class="body">
          <h3 class="dtitle">마드리드 종일</h3>
          <div class="drive"><span>시내 약 30km</span><span>실내 관람 위주</span></div>
          <ul class="stops">
            <li><b>프라도 미술관</b><span class="tag">세계유산</span> — 벨라스케스 「시녀들」, 고야, 보스의 「쾌락의 정원」</li>
            <li><b>파세오 델 프라도와 부엔 레티로</b><span class="tag">세계유산</span> — 2021년 등재된 계몽 시대 도시경관</li>
            <li><b>마드리드 왕궁</b>과 알무데나 대성당 · 근위병 교대</li>
            <li><b>마요르 광장</b>과 <b>산 미겔 시장</b> — 19세기 철골 시장 건물</li>
            <li>솔 광장 · 그란 비아 자유 시간</li>
          </ul>
          <dl class="stay"><dt>숙박</dt><dd>마드리드 (2/2박)</dd></dl>
        </div>
      </article>

      <article class="day hub">
        <div class="rail"><div class="dnum">12</div><div class="dwhen">12일차</div></div>
        <div class="body">
          <h3 class="dtitle">사라고사 <span class="via">→</span> 바르셀로나 <span class="via">→</span> 인천</h3>
          <div class="drive"><span>약 635km</span><span>주행 6시간 20분</span><span>07:30 출발</span><span>바르셀로나 저녁 출발편 기준</span></div>
          <ul class="stops">
            <li>이른 아침 마드리드 출발, 아라곤 평원을 가로질러 사라고사로</li>
            <li><b>필라르 대성당</b> — 성모가 기둥 위에 나타났다는 자리에 세운 스페인 최대 바로크 성당</li>
            <li><b>알하페리아 궁전</b><span class="tag">세계유산</span> — 아라곤 무데하르 건축</li>
            <li>사라고사 중식 후 바르셀로나로 이동, 공항 도착</li>
            <li>바르셀로나 저녁 출발 — 이튿날 인천 도착</li>
          </ul>
        </div>
      </article>

    </div>
  </section>

  <section class="sec">
    <div class="sec-label">Design note</div>
    <h2>왜 이 동선인가</h2>
    <div class="note">
      <div class="why">
        <div><b>시계 방향 한 바퀴입니다.</b> 바르셀로나에서 지중해를 따라 남하해 안달루시아를 돌고, 마드리드와 사라고사를 지나 바르셀로나로 돌아옵니다. 되돌아가는 구간이 없어야 전 구간 차량 이동이 성립합니다.</div>
        <div><b>휴식 사흘을 여정 한가운데 두었습니다.</b> 앞의 닷새는 바르셀로나부터 알함브라까지 밀도가 높습니다. 그 다음 사흘을 파라도르에서 쉬고, 다시 세비야부터 마드리드까지 나흘을 돕니다. 지쳐서 쉬는 게 아니라 쉬고 나서 후반을 도는 구조입니다.</div>
        <div><b>파라도르 두 곳을 골랐습니다.</b> 론다는 절벽 위 옛 시청사, 카르모나는 언덕 위 무어인 성채입니다. 둘 다 그 자체가 목적지라 밖에 나가지 않아도 하루가 채워집니다. 리조트 대신 이쪽을 고른 이유입니다.</div>
        <div><b>가장 긴 날은 마지막 날입니다.</b> 12일차 635km는 사라고사를 중간에 끊어 두 구간으로 나눕니다. 아침 일찍 출발해 도로가 비어 있고, 짐은 이미 차에 실린 상태입니다.</div>
        <div><b>국내선과 열차를 쓰지 않습니다.</b> 전 구간 전용 차량이라 짐을 옮겨 싣는 일이 없고, 백색마을처럼 대중교통이 닿지 않는 곳을 그대로 일정에 넣을 수 있습니다.</div>
      </div>
    </div>
  </section>

  <section class="sec">
    <div class="sec-label">Inclusions</div>
    <h2>포함 · 불포함</h2>
    <div class="cols">
      <div class="card">
        <h3>포함 사항</h3>
        <ul>
          <li>4성급 호텔 8박 · <b>조식 포함</b></li>
          <li><b>파라도르 3박</b> (론다 2 · 카르모나 1) · 조식 포함</li>
          <li>전용 차량 및 기사 (현지 12일 · 전 구간)</li>
          <li>한국인 인솔 가이드 전 일정 동행</li>
          <li>일정표 명시 도시의 현지 가이드</li>
          <li>일정표 명시 입장료 전액</li>
          <li>여행자 보험</li>
        </ul>
      </div>
      <div class="card excl">
        <h3>불포함 사항</h3>
        <ul>
          <li><b>왕복 국제선 항공권</b> — 지상 수배 상품입니다</li>
          <li><b>중식 · 석식 (전 일정 자유식)</b> — 가이드가 현지 식당을 안내합니다</li>
          <li>선택 관광 비용</li>
          <li>가이드 · 기사 팁</li>
          <li>개인 경비</li>
          <li>바르셀로나 숙박세 (카탈루냐 관광세, 현지 납부)</li>
          <li>초과 수하물 요금</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="sec">
    <div class="sec-label">Optional</div>
    <h2>선택 관광</h2>
    <div class="scroll">
      <table>
        <thead><tr><th>일차</th><th>선택 관광</th><th>내용</th><th>최소 인원</th></tr></thead>
        <tbody>
          <tr><td class="num">4일차</td><td>발렌시아 오세아노그라픽</td><td>유럽 최대 수족관 · 예술과학도시 내부</td><td class="num">10명</td></tr>
          <tr><td class="num">5일차</td><td>네르하 동굴</td><td>종유석 대공동 · 선사시대 벽화</td><td class="num">10명</td></tr>
          <tr><td class="num">6일차</td><td>세테닐 · 그라살레마 백색마을</td><td>론다 근교 반나절 · 바위 아래 지은 마을</td><td class="num">10명</td></tr>
          <tr><td class="num">7일차</td><td>파라도르 특선 만찬</td><td>카르모나 파라도르 안달루시아 코스</td><td class="num">—</td></tr>
          <tr><td class="num">9일차</td><td>세비야 플라멩코</td><td>유네스코 무형문화유산 · 타블라오 공연</td><td class="num">10명</td></tr>
          <tr><td class="num">11일차</td><td>톨레도 반일 투어</td><td>마드리드 근교 75km · 대성당과 산토토메</td><td class="num">15명</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="sec">
    <div class="sec-label">Highlights</div>
    <h2>이 일정에 담긴 것</h2>
    <div class="scroll">
      <table>
        <thead><tr><th>구분</th><th>내용</th></tr></thead>
        <tbody>
          <tr><td>세계유산</td><td>바르셀로나 가우디 작품군 · 발렌시아 라 론하 · 알함브라와 헤네랄리페 · 세비야 대성당과 알카사르 · 코르도바 역사지구 · 파세오 델 프라도와 부엔 레티로 · 사라고사 알하페리아 <b>(7곳)</b></td></tr>
          <tr><td>백색마을</td><td>프리힐리아나 · 론다 · 카르모나 · 세테닐(선택) · 그라살레마(선택)</td></tr>
          <tr><td>파라도르</td><td>론다(옛 시청사, 절벽 위) 2박 · 카르모나(무어인 성채) 1박</td></tr>
          <tr><td>이동 방식</td><td>전 구간 전용 차량 — 국내선·열차 없이 12일을 한 대로 이동합니다</td></tr>
          <tr><td>숙박 도시</td><td>바르셀로나 2 · 발렌시아 1 · 그라나다 1 · 론다 2 · 카르모나 1 · 세비야 2 · 마드리드 2 <b>(11박)</b></td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <footer>
    <div><b>EUFORIA TOUR SPAIN</b> · Euforia das Nuvens, S.L. · Calle Gran Vía 69, Madrid</div>
    <div>일정과 순서는 현지 사정에 따라 조정될 수 있습니다.</div>
  </footer>

</div>

<div class="mudejar"></div>


</div>
`,
      highlights: ['사그라다 파밀리아 · 구엘 공원 (세계유산)', '몬세라트 수도원 · 발렌시아 라 론하 (세계유산)', '알함브라 궁전 (세계유산) · 프리힐리아나 백색마을', '론다·카르모나 파라도르(국영 고성 호텔) 3박', '세비야 대성당 · 레알 알카사르 (세계유산)', '코르도바 역사지구 (세계유산)', '프라도 미술관 · 파세오 델 프라도 (세계유산)', '사라고사 필라르 대성당 · 알하페리아 궁전 (세계유산)'],
      includes: ['4성급 호텔 8박 · 조식 포함', '파라도르 3박(론다 2·카르모나 1) · 조식 포함', '전용 차량 및 기사(현지 12일 · 전 구간)', '한국인 인솔 가이드 전 일정 동행', '일정표 명시 도시 현지 가이드', '일정표 명시 입장료 전액', '여행자 보험'],
      excludes: ['왕복 국제선 항공권(지상 수배 상품)', '중식·석식(전 일정 자유식)', '선택 관광 비용', '가이드 · 기사 팁', '개인 경비', '바르셀로나 숙박세(카탈루냐 관광세, 현지 납부)', '초과 수하물 요금'],
      duration: '11박 12일 (바르셀로나 IN/OUT · 관광 9일+휴식 3일)'
    }
  },
{
    id: 'north-cantabria-basque',
    downloadUrl: '/docs/north-cantabria-basque-itinerary.pdf',
    cats: ['spain'],
    topClass: 'spain',
    region: '스페인북부',
    days: '5박 6일',
    price: '가격 문의',
    title: '[스페인북부] 칸타브리아와 바스크 5박 6일',
    summary: '대서양이 만든 초록색 스페인 — 칸타브리아의 중세 마을과 가우디의 첫 집에서 시작해 비스케이 만의 어촌을 지나 빌바오 구겐하임과 산세바스티안까지 가는 5박 6일이에요.',
    tags: ['5박 6일', '마드리드 현지 집합', '전용차량 + 한국인 인솔', '구겐하임 입장'],
    isNew: true,
    detail: {
      lead: '산탄데르 3박·빌바오 2박으로 짐을 두 번만 풀고, 관광일 주행이 모두 200km 이내라 하루가 버스 안에서 지나가지 않아요.',
      description: `<!-- ── Euforia Tour · 붙여넣기용 조각 · 모든 스타일이 .eu-itin 안으로만 적용됩니다 ── -->
<div class="eu-itin">
<style>
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@300;400;500;600;700&display=swap");
/* ── 사이트 기존 테마가 이 조각 안으로 새어 들어오지 않도록 막는다 ── */
.eu-itin h1,.eu-itin h2,.eu-itin h3,.eu-itin h4,.eu-itin h5{color:var(--ink);font-family:var(--f-kr);margin:0;line-height:1.3;text-transform:none;letter-spacing:-.015em}
.eu-itin p,.eu-itin li,.eu-itin dl,.eu-itin dt,.eu-itin dd,.eu-itin span,.eu-itin div,.eu-itin strong,.eu-itin b,.eu-itin em,.eu-itin td,.eu-itin th{font-family:var(--f-kr)}
.eu-itin ul,.eu-itin ol{margin:0}
.eu-itin section,.eu-itin article,.eu-itin footer,.eu-itin header{margin:0;background:none;border:0}
.eu-itin img,.eu-itin svg{max-width:100%}
.eu-itin em{font-style:normal}
.eu-itin,.eu-itin p,.eu-itin li,.eu-itin dl,.eu-itin dt,.eu-itin dd,.eu-itin div,.eu-itin span,.eu-itin td,.eu-itin th,.eu-itin small,.eu-itin b,.eu-itin strong{text-transform:none;letter-spacing:normal}
.eu-itin{
  --ink:#20292B;
  --tilegreen:#2E5A66;
  --tilegreen-soft:#7BA3AC;
  --ochre:#9E2B2B;
  --stone:#66716F;
  --paper:#F7F6F2;
  --tile:#EAE9E3;
  --line:#D6D3CA;
  --muted:#68726F;
  --pattern-op:.16;
  --f-kr:"IBM Plex Sans KR","Noto Sans KR","Malgun Gothic",system-ui,-apple-system,sans-serif;
  --f-disp:var(--f-kr);
  --f-body:var(--f-kr);
}
.eu-itin *{box-sizing:border-box}
.eu-itin{
  margin:0; background:var(--paper); color:var(--ink);
  font-family:var(--f-body); font-weight:300; font-size:16px; line-height:1.75;
  -webkit-font-smoothing:antialiased;
  word-break:keep-all; overflow-wrap:anywhere;
}
.eu-itin h1, .eu-itin h2, .eu-itin h3, .eu-itin h4{font-family:var(--f-disp); font-weight:600; text-wrap:balance; margin:0; line-height:1.3; letter-spacing:-.015em}
.eu-itin p{margin:0}
.eu-itin a{color:var(--tilegreen)}
.eu-itin .wrap{max-width:1080px; margin:0 auto; padding:0 24px}
.eu-itin /* ── 라우부루(바스크 십자) 밴드 ───────────────── */
.mudejar{
  height:18px;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='none' stroke='%232E5A66' stroke-width='1.2'%3E%3Cpath d='M20 20 A5 5 0 0 1 10 20 A5 5 0 0 0 0 20'/%3E%3Cpath d='M20 20 A5 5 0 0 0 20 10 A5 5 0 0 1 20 0'/%3E%3Cpath d='M20 20 A5 5 0 0 0 30 20 A5 5 0 0 1 40 20'/%3E%3Cpath d='M20 20 A5 5 0 0 1 20 30 A5 5 0 0 0 20 40'/%3E%3C/g%3E%3C/svg%3E");
  background-size:20px 20px;
  opacity:var(--pattern-op);
}
.eu-itin /* ── masthead ─────────────────────────────────── */
header.mast{padding:64px 0 44px}
.eu-itin .eyebrow{
  font-size:11.5px; font-weight:500; letter-spacing:.2em; text-transform:uppercase;
  color:var(--tilegreen); margin-bottom:20px;
}
.eu-itin h1{font-size:clamp(36px,5.8vw,60px); font-weight:700; letter-spacing:-.03em}
.eu-itin h1 .lat{font-weight:300; color:var(--tilegreen)}
.eu-itin .lede{margin-top:20px; max-width:56ch; font-size:17.5px; color:var(--muted); line-height:1.85}
.eu-itin .route{
  margin-top:34px; padding-top:22px; border-top:1px solid var(--line);
  font-weight:400; font-size:13px; line-height:2.2; color:var(--stone);
}
.eu-itin .route b{color:var(--ink); font-weight:500}
.eu-itin .route em{color:var(--ochre); font-style:normal; font-weight:500}
.eu-itin /* ── facts ────────────────────────────────────── */
.facts{
  display:grid; gap:1px; background:var(--line);
  grid-template-columns:repeat(auto-fit,minmax(160px,1fr));
  border:1px solid var(--line); margin:44px 0 8px;
}
.eu-itin .fact{background:var(--paper); padding:20px 22px}
.eu-itin .fact dt{font-size:12px; font-weight:500; color:var(--muted); margin-bottom:6px}
.eu-itin .fact dd{margin:0; font-weight:600; font-size:21px; line-height:1.35; font-variant-numeric:tabular-nums}
.eu-itin .fact dd small{display:block; font-weight:300; font-size:13px; color:var(--muted); margin-top:4px}
.eu-itin /* ── sections ─────────────────────────────────── */
.sec{padding:64px 0 8px}
.eu-itin .sec-label{
  font-size:11px; font-weight:500; letter-spacing:.18em; text-transform:uppercase;
  color:var(--tilegreen); margin-bottom:12px;
}
.eu-itin .sec h2{font-size:clamp(26px,3.4vw,34px)}
.eu-itin .sec .sub{margin-top:12px; color:var(--muted); max-width:62ch}
.eu-itin /* ── itinerary spine ──────────────────────────── */
.days{margin-top:40px}
.eu-itin .day{display:grid; grid-template-columns:104px 1fr; gap:0 28px; padding-bottom:44px; position:relative}
.eu-itin .rail{position:relative}
.eu-itin .rail::before{content:""; position:absolute; left:19px; top:44px; bottom:-44px; width:1px; background:var(--line)}
.eu-itin .day:last-child .rail::before{display:none}
.eu-itin .dnum{
  width:40px; height:40px; border-radius:50%;
  background:var(--paper); border:1px solid var(--tilegreen); color:var(--tilegreen);
  display:grid; place-items:center; font-size:14px; font-weight:500;
  position:relative; z-index:1;
}
.eu-itin .day.hub .dnum{background:var(--tilegreen); border-color:var(--tilegreen); color:var(--paper)}
.eu-itin .day.rest .dnum{background:var(--ochre); border-color:var(--ochre); color:var(--paper)}
.eu-itin .day.rest .drive span::before{background:var(--ochre)}
.eu-itin .day.rest ul.stops li::before{background:var(--ochre)}
.eu-itin .day.rest .stay{border-left-color:var(--ochre)}
.eu-itin .dwhen{
  width:80px; text-align:center; padding:7px 0 3px; margin-left:-20px;
  background:var(--paper); position:relative; z-index:1;
  font-weight:400; font-size:11.5px; color:var(--muted); white-space:nowrap;
  font-variant-numeric:tabular-nums;
}
.eu-itin .day.rest .dwhen{color:var(--ochre); font-weight:500}
.eu-itin .body{min-width:0}
.eu-itin .dtitle{font-size:23px; letter-spacing:-.005em}
.eu-itin .dtitle .via{color:var(--muted); font-weight:400}
.eu-itin .drive{
  margin-top:10px; display:flex; flex-wrap:wrap; gap:6px 14px;
  font-weight:400; font-size:12.5px; color:var(--stone); font-variant-numeric:tabular-nums;
}
.eu-itin .drive span{display:inline-flex; align-items:center; gap:6px}
.eu-itin .drive span::before{content:""; width:5px; height:5px; background:var(--tilegreen-soft); border-radius:50%}
.eu-itin ul.stops{list-style:none; padding:0; margin:18px 0 0; display:grid; gap:11px}
.eu-itin ul.stops li{padding-left:18px; position:relative; line-height:1.7}
.eu-itin ul.stops li::before{content:""; position:absolute; left:0; top:.72em; width:7px; height:1px; background:var(--tilegreen)}
.eu-itin ul.stops b{font-weight:600; color:var(--ink)}
.eu-itin .tag{
  display:inline-block; margin-left:6px; padding:1px 7px; border-radius:2px;
  font-weight:400; font-size:11px;
  border:1px solid var(--tilegreen); color:var(--tilegreen); vertical-align:2px;
}
.eu-itin .tag.opt{border-color:var(--ochre); color:var(--ochre)}
.eu-itin .tag.xmas{border-color:var(--ochre); color:var(--paper); background:var(--ochre)}
.eu-itin .stay{
  margin-top:18px; padding:12px 16px; background:var(--tile); border-left:2px solid var(--tilegreen);
  font-size:13.5px; display:flex; flex-wrap:wrap; gap:4px 18px;
}
.eu-itin .stay dt{font-size:12px; font-weight:500; color:var(--muted); align-self:center}
.eu-itin .stay dd{margin:0; font-weight:500}
.eu-itin /* ── tables / cards ───────────────────────────── */
.scroll{overflow-x:auto; margin-top:24px}
.eu-itin table{border-collapse:collapse; width:100%; font-size:14px; min-width:560px}
.eu-itin th, .eu-itin td{text-align:left; padding:11px 14px; border-bottom:1px solid var(--line); vertical-align:top}
.eu-itin th{font-size:12.5px; color:var(--muted); font-weight:500; border-bottom-color:var(--ink)}
.eu-itin td.num{font-variant-numeric:tabular-nums; white-space:nowrap}
.eu-itin td small{display:block; font-weight:300; font-size:12.5px; color:var(--muted); margin-top:3px; font-variant-numeric:tabular-nums}
.eu-itin .cols{display:grid; gap:32px; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); margin-top:28px}
.eu-itin .card{border:1px solid var(--line); padding:24px}
.eu-itin .card h3{font-size:18px; margin-bottom:14px}
.eu-itin .card ul{list-style:none; padding:0; margin:0; display:grid; gap:9px; font-size:14.5px}
.eu-itin .card li{padding-left:16px; position:relative}
.eu-itin .card li::before{content:""; position:absolute; left:0; top:.7em; width:6px; height:1px; background:var(--tilegreen)}
.eu-itin .card.excl li::before{background:var(--muted)}
.eu-itin .note{margin-top:28px; padding:24px 26px; border:1px solid var(--line); background:var(--tile)}
.eu-itin .note .why{display:grid; gap:14px; counter-reset:w}
.eu-itin .note .why div{padding-left:20px; position:relative}
.eu-itin .note .why div::before{
  content:counter(w); counter-increment:w; position:absolute; left:0; top:.1em;
  font-weight:500; font-size:13px; color:var(--tilegreen);
}
.eu-itin .note.warn{border-left:3px solid var(--ochre)}
.eu-itin .note.warn .why div::before{color:var(--ochre)}
.eu-itin footer{
  margin-top:72px; padding:36px 0 56px; border-top:1px solid var(--line);
  font-size:13px; color:var(--muted); display:flex; flex-wrap:wrap; gap:8px 28px; justify-content:space-between;
}
.eu-itin footer b{color:var(--ink); font-weight:600; letter-spacing:.02em}
@media (max-width:640px){ .eu-itin .day{grid-template-columns:52px 1fr; gap:0 14px}
.eu-itin .dwhen{width:52px; margin-left:-6px; font-size:10px}
.eu-itin header.mast{padding:44px 0 32px}
}
</style>
<div class="mudejar"></div>

<div class="wrap">

  <header class="mast">
    <div class="eyebrow">Euforia Tour · Green Spain · Cantabria &amp; País Vasco</div>
    <h1>칸타브리아와 <span class="lat">바스크</span> 6일</h1>
    <p class="lede">
      대서양이 만든 초록색 스페인입니다. 칸타브리아의 중세 마을과 가우디의 첫 집에서 시작해
      비스케이 만의 어촌을 지나 빌바오와 산세바스티안까지 —
      건조한 남부와 완전히 다른 스페인을 엿새에 담았습니다.
    </p>
    <div class="route">
      <b>마드리드</b> → 부르고스 → <b>산탄데르</b> → <em>산티야나 델 마르</em> → 코미야스 →
      산토냐 → 라레도 → 카스트로 우르디알레스 → 포르투갈레테 → 게초 → <b>빌바오</b> →
      게타리아 → 사라우스 → <em>산세바스티안</em> → 마드리드
    </div>

    <dl class="facts">
      <div class="fact"><dt>일정</dt><dd>6일 5박<small>출발일 협의 · 연중 진행</small></dd></div>
      <div class="fact"><dt>집합</dt><dd>마드리드 현지<small>국제선 항공 불포함</small></dd></div>
      <div class="fact"><dt>숙박</dt><dd>산탄데르 3 · 빌바오 2<small>4성급 · 조식 포함</small></dd></div>
      <div class="fact"><dt>이동</dt><dd>전 구간 차량<small>국내선·열차 없음</small></dd></div>
      <div class="fact"><dt>총 주행</dt><dd>약 1,400km<small>관광일 평균 150km</small></dd></div>
    </dl>
  </header>


  <section class="sec">
    <div class="sec-label">Why North</div>
    <h2>왜 이 코스인가</h2>
    <div class="note">
      <div class="why">
        <div><b>「에스파냐 베르데」입니다.</b> 대서양에서 올라온 습기로 사철 초록이고 여름에도 시원합니다. 남부가 가장 더울 때 이곳이 성수기인 이유입니다. 마드리드·바르셀로나·안달루시아를 이미 다녀오신 손님께 내놓을 수 있는 두 번째 스페인입니다.</div>
        <div><b>거점을 둘로 나눴습니다.</b> 앞의 사흘은 산탄데르에 묵으며 칸타브리아 해안을 좌우로 훑고, 뒤의 이틀은 빌바오에 묵으며 바스크로 넘어갑니다. <b>관광일 주행이 전부 200km 이내</b>로 들어와 하루가 버스 안에서 지나가지 않습니다.</div>
        <div><b>미식이 목적지가 됩니다.</b> 빌바오 카스코 비에호의 핀초스 골목, 산세바스티안 파르테 비에하의 바 카운터, 게타리아의 생선 숯불구이까지 — 이 지역에서는 식사가 관광 사이의 휴식이 아니라 관광 그 자체입니다.</div>
        <div><b>마드리드에서 들고 납니다.</b> 인천–빌바오 직항이 없어 북부만 도는 구성은 유럽 경유가 붙습니다. 마드리드 왕복 직항을 쓰고 첫날과 마지막 날을 이동에 배분하면 항공이 왕복 한 건으로 끝납니다.</div>
      </div>
    </div>
  </section>


  <section class="sec">
    <div class="sec-label">Itinerary</div>
    <h2>일정</h2>
    <p class="sub">
      <b>마드리드 현지 집합</b>으로 시작하는 5박 6일입니다. 산탄데르 3박 · 빌바오 2박.
      중식·석식은 자유식을 기본으로 하며, 가이드가 도시별 핀초스 골목과 식당을 안내합니다.
    </p>

    <div class="days">

      <article class="day hub">
        <div class="rail"><div class="dnum">1</div><div class="dwhen">1일차</div></div>
        <div class="body">
          <h3 class="dtitle">마드리드 <span class="via">→</span> 부르고스 <span class="via">→</span> 산탄데르</h3>
          <div class="drive"><span>약 400km</span><span>주행 4시간</span><span>08:00 마드리드 집합</span></div>
          <ul class="stops">
            <li><b>부르고스 대성당</b><span class="tag">세계유산</span> — 스페인 고딕의 정점, 엘 시드가 묻힌 자리. 중식 정차를 겸합니다</li>
            <li><b>산티아고 순례길</b><span class="tag">세계유산</span> — 부르고스는 프랑스길의 큰 기착지입니다</li>
            <li>칸타브리아 산맥을 넘어 <b>산탄데르</b> 도착</li>
            <li>저녁 <b>사르디네로 해변</b>과 마그달레나 반도 산책</li>
          </ul>
          <dl class="stay"><dt>숙박</dt><dd>산탄데르 (1/3박)</dd></dl>
        </div>
      </article>

      <article class="day">
        <div class="rail"><div class="dnum">2</div><div class="dwhen">2일차</div></div>
        <div class="body">
          <h3 class="dtitle">산티야나 델 마르 <span class="via">·</span> 코미야스</h3>
          <div class="drive"><span>약 95km</span><span>주행 1시간 30분</span><span>도보 구간 다수</span></div>
          <ul class="stops">
            <li><b>산티야나 델 마르</b> — 돌바닥과 귀족 저택이 그대로 남은 중세 마을, 사르트르가 「스페인에서 가장 아름다운 마을」이라 부른 곳</li>
            <li><b>알타미라 박물관</b><span class="tag">세계유산</span> — 1만 5천 년 전 들소 벽화. 원본 동굴은 보존을 위해 닫혀 있고 정밀 복제 동굴을 관람합니다</li>
            <li><b>엘 카프리초</b> — 가우디가 스페인 밖 카탈루냐 지역에 남긴 세 채 중 하나, 해바라기 타일의 여름 별장</li>
            <li><b>소브레야노 궁전</b>과 코미야스 묘지 · 대학 언덕</li>
            <li>산탄데르로 돌아와 저녁 자유식</li>
          </ul>
          <dl class="stay"><dt>숙박</dt><dd>산탄데르 (2/3박)</dd></dl>
        </div>
      </article>

      <article class="day">
        <div class="rail"><div class="dnum">3</div><div class="dwhen">3일차</div></div>
        <div class="body">
          <h3 class="dtitle">산토냐 <span class="via">·</span> 라레도 <span class="via">·</span> 카스트로 우르디알레스</h3>
          <div class="drive"><span>약 175km</span><span>주행 2시간 30분</span><span>동부 칸타브리아 해안</span></div>
          <ul class="stops">
            <li><b>산토냐</b> — 스페인 안초비의 본고장. 절임 공정을 손으로 하는 공장 견학<span class="tag opt">선택</span></li>
            <li><b>라레도</b> — 라 살베 해변이 5km로 이어지는 옛 항구 마을, 푸에블라 비에하 골목</li>
            <li><b>카스트로 우르디알레스</b> — 바위 위 산타 마리아 성당과 등대, 로마 다리가 한 화면에 들어오는 항구</li>
            <li>산탄데르로 돌아와 <b>메르카도 데 라 에스페란사</b> 자유 시간</li>
          </ul>
          <dl class="stay"><dt>숙박</dt><dd>산탄데르 (3/3박)</dd></dl>
        </div>
      </article>

      <article class="day hub">
        <div class="rail"><div class="dnum">4</div><div class="dwhen">4일차</div></div>
        <div class="body">
          <h3 class="dtitle">비스카야 다리 <span class="via">·</span> 게초 <span class="via">→</span> 빌바오</h3>
          <div class="drive"><span>약 125km</span><span>주행 2시간</span><span>구겐하임 오후 입장</span></div>
          <ul class="stops">
            <li><b>비스카야 다리</b><span class="tag">세계유산</span> — 1893년 세워진 세계 최초의 운반교. 곤돌라가 사람과 차를 매달아 강을 건넙니다</li>
            <li><b>포르투갈레테</b>와 <b>게초</b> — 철강으로 부유했던 시절의 저택 거리와 대서양 전망</li>
            <li><b>구겐하임 빌바오</b> — 티타늄 곡면이 강물에 반사되는 프랭크 게리의 건물. 쿤스의 「퍼피」와 부르주아의 「마망」<span class="tag">입장</span></li>
            <li>저녁 <b>카스코 비에호</b> — 일곱 거리의 바르에서 핀초스</li>
          </ul>
          <dl class="stay"><dt>숙박</dt><dd>빌바오 (1/2박)</dd></dl>
        </div>
      </article>

      <article class="day hub">
        <div class="rail"><div class="dnum">5</div><div class="dwhen">5일차</div></div>
        <div class="body">
          <h3 class="dtitle">게타리아 <span class="via">·</span> 사라우스 <span class="via">·</span> 산세바스티안</h3>
          <div class="drive"><span>약 205km</span><span>주행 3시간</span><span>해안 도로 경유</span></div>
          <ul class="stops">
            <li><b>게타리아</b> — 마젤란 함대를 완주한 엘카노와 디자이너 발렌시아가의 고향. 생선을 통째로 숯불에 굽는 어촌</li>
            <li><b>사라우스</b> — 서핑 해변과 바스크 해안 지질공원의 층암 절벽</li>
            <li><b>산세바스티안 라 콘차 해변</b> — 도시를 품에 안은 조개 모양 만</li>
            <li><b>몬테 이겔도</b> — 100년 된 케이블카로 오르는 전망대, 만 전체가 한눈에</li>
            <li><b>파르테 비에하</b> — 바 카운터에 핀초스를 쌓아 두는 바스크식 미식 골목</li>
            <li>빌바오로 돌아옵니다</li>
          </ul>
          <dl class="stay"><dt>숙박</dt><dd>빌바오 (2/2박)</dd></dl>
        </div>
      </article>

      <article class="day hub">
        <div class="rail"><div class="dnum">6</div><div class="dwhen">6일차</div></div>
        <div class="body">
          <h3 class="dtitle">빌바오 <span class="via">→</span> 마드리드</h3>
          <div class="drive"><span>약 400km</span><span>주행 4시간</span><span>07:30 출발</span></div>
          <ul class="stops">
            <li>이른 아침 빌바오 출발, 카스티야 평원을 가로질러 남하</li>
            <li>중간 휴게 정차 후 <b>마드리드</b> 도착 · 일정 종료</li>
            <li>귀국편 시각에 맞춰 공항 또는 시내 호텔로 안내해 드립니다</li>
          </ul>
        </div>
      </article>

    </div>
  </section>


  <section class="sec">
    <div class="sec-label">Inclusions</div>
    <h2>포함 · 불포함</h2>
    <div class="cols">
      <div class="card">
        <h3>포함 사항</h3>
        <ul>
          <li>4성급 호텔 5박 · <b>조식 포함</b> (산탄데르 3 · 빌바오 2)</li>
          <li>전용 차량 및 기사 (현지 6일 · 전 구간)</li>
          <li><b>한국인 인솔 가이드 전 일정 동행</b></li>
          <li>일정표 명시 입장료 — 부르고스 대성당 · 알타미라 박물관 · <b>구겐하임 빌바오</b> · 비스카야 다리 곤돌라</li>
          <li>여행자 보험</li>
        </ul>
      </div>
      <div class="card excl">
        <h3>불포함 사항</h3>
        <ul>
          <li><b>왕복 국제선 항공권</b> — 마드리드 현지 집합 상품입니다</li>
          <li><b>마드리드 전후 숙박</b> — 집합 전날 숙박은 별도로 안내해 드립니다</li>
          <li><b>중식 · 석식</b> — 자유식 기준. 유료 식사를 넣는 구성도 가능합니다</li>
          <li>선택 관광 비용</li>
          <li>가이드 · 기사 팁 · 개인 경비</li>
          <li><b>바스크 관광숙박세</b> — 2027년 1월 1일부터 빌바오에 신설됩니다. 해당 세액은 견적에 포함되지 않으며 출발 시점 확정 금액으로 별도 청구됩니다</li>
          <li>초과 수하물 요금</li>
        </ul>
      </div>
    </div>
  </section>


  <section class="sec">
    <div class="sec-label">Optional</div>
    <h2>선택 관광</h2>
    <div class="scroll">
      <table>
        <thead><tr><th>일차</th><th>선택 관광</th><th>내용</th></tr></thead>
        <tbody>
          <tr><td class="num">3일차</td><td>산토냐 안초비 공장 견학</td><td>손으로 하는 절임 공정 참관 · 시식</td></tr>
          <tr><td class="num">5일차</td><td>산세바스티안 미식 투어</td><td>구시가 바르 3~4곳 순회 · 핀초스와 지역 와인 차콜리</td></tr>
          <tr><td class="num">5일차</td><td>산 후안 데 가스텔루가체</td><td>바다로 뻗은 바위섬 위 암자 · 241계단 · 왕복 약 1시간 (동선 조정 필요)</td></tr>
        </tbody>
      </table>
    </div>
    <p class="sub" style="margin-top:20px">선택 관광은 현지 사정과 인원에 따라 진행 여부가 결정됩니다. 요금은 별도 문의해 주십시오.</p>
  </section>


  <section class="sec">
    <div class="sec-label">Highlights</div>
    <h2>이 일정에 담긴 것</h2>
    <div class="scroll">
      <table>
        <thead><tr><th>구분</th><th>내용</th></tr></thead>
        <tbody>
          <tr><td>세계유산</td><td>부르고스 대성당 · 비스카야 다리 · 알타미라와 북부 스페인 구석기 동굴미술 · 산티아고 순례길(부르고스) <b>(4곳)</b></td></tr>
          <tr><td>미술관</td><td>구겐하임 빌바오 <b>입장</b> · 알타미라 박물관</td></tr>
          <tr><td>해안 마을</td><td>코미야스 · 산토냐 · 라레도 · 카스트로 우르디알레스 · 게타리아 · 사라우스</td></tr>
          <tr><td>미식</td><td>빌바오 카스코 비에호 핀초스 · 산세바스티안 파르테 비에하 · 게타리아 생선 숯불구이 · 산토냐 안초비</td></tr>
          <tr><td>이동 방식</td><td>전 구간 전용 차량 — 관광일 주행이 모두 200km 이내입니다</td></tr>
          <tr><td>숙박</td><td>산탄데르 3박 · 빌바오 2박 <b>(5박)</b> — 짐을 두 번만 풉니다</td></tr>
        </tbody>
      </table>
    </div>
  </section>


  <footer>
    <div><b>EUFORIA TOUR SPAIN</b> · Euforia das Nuvens, S.L. · Calle Gran Vía 69, Madrid</div>
    <div>일정과 순서는 현지 사정에 따라 조정될 수 있습니다.</div>
  </footer>

</div>

<div class="mudejar"></div>
</div>`,
      highlights: ['부르고스 대성당 (세계유산)', '산티야나 델 마르와 알타미라 박물관 (세계유산)', '코미야스 · 가우디의 엘 카프리초', '산토냐 안초비 · 라레도 · 카스트로 우르디알레스', '비스카야 다리 곤돌라 (세계유산)', '구겐하임 빌바오 입장', '게타리아 · 사라우스 · 산세바스티안 라 콘차'],
      includes: ['4성급 호텔 5박 · 조식 포함 (산탄데르 3 · 빌바오 2)', '전용 차량 및 기사 (현지 6일 · 전 구간)', '한국인 인솔 가이드 전 일정 동행', '일정표 명시 입장료 — 부르고스 대성당 · 알타미라 박물관 · 구겐하임 빌바오 · 비스카야 다리 곤돌라', '여행자 보험'],
      excludes: ['왕복 국제선 항공권 — 마드리드 현지 집합 상품입니다', '마드리드 전후 숙박 (집합 전날 숙박은 별도 안내)', '중식 · 석식 (자유식 기준 · 유료 식사 구성 가능)', '선택 관광 비용', '가이드 · 기사 팁 · 개인 경비', '바스크 관광숙박세 — 2027년 1월 1일부터 빌바오에 신설, 출발 시점 확정 금액으로 별도 청구', '초과 수하물 요금'],
      duration: '5박 6일 (마드리드 현지 집합 · 관광일 주행 200km 이내 · 일정은 현지 사정에 따라 변경될 수 있어요)'
    }
  },
{
    id: 'north-asturias-picos',
    downloadUrl: '/docs/north-asturias-picos-itinerary.pdf',
    cats: ['spain'],
    topClass: 'spain',
    region: '스페인북부',
    days: '5박 6일',
    price: '가격 문의',
    title: '[스페인북부] 아스투리아스와 피코스 데 에우로파 5박 6일',
    summary: '스페인 최초의 국립공원 피코스 데 에우로파와 레콘키스타가 시작된 코바동가 성지, 그리고 칸타브리아 해안의 중세 마을을 잇는 5박 6일이에요.',
    tags: ['5박 6일', '마드리드 현지 집합', '전용차량 + 한국인 인솔', '케이블카 · 국립공원'],
    isNew: true,
    detail: {
      lead: '오비에도 2박·산탄데르 3박. 오전에 협곡을 오르고 오후에 해변에 서는 일이 자연스러운 지역이에요.',
      description: `<!-- ── Euforia Tour · 붙여넣기용 조각 · 모든 스타일이 .eu-itin 안으로만 적용됩니다 ── -->
<div class="eu-itin">
<style>
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@300;400;500;600;700&display=swap");
/* ── 사이트 기존 테마가 이 조각 안으로 새어 들어오지 않도록 막는다 ── */
.eu-itin h1,.eu-itin h2,.eu-itin h3,.eu-itin h4,.eu-itin h5{color:var(--ink);font-family:var(--f-kr);margin:0;line-height:1.3;text-transform:none;letter-spacing:-.015em}
.eu-itin p,.eu-itin li,.eu-itin dl,.eu-itin dt,.eu-itin dd,.eu-itin span,.eu-itin div,.eu-itin strong,.eu-itin b,.eu-itin em,.eu-itin td,.eu-itin th{font-family:var(--f-kr)}
.eu-itin ul,.eu-itin ol{margin:0}
.eu-itin section,.eu-itin article,.eu-itin footer,.eu-itin header{margin:0;background:none;border:0}
.eu-itin img,.eu-itin svg{max-width:100%}
.eu-itin em{font-style:normal}
.eu-itin,.eu-itin p,.eu-itin li,.eu-itin dl,.eu-itin dt,.eu-itin dd,.eu-itin div,.eu-itin span,.eu-itin td,.eu-itin th,.eu-itin small,.eu-itin b,.eu-itin strong{text-transform:none;letter-spacing:normal}
.eu-itin{
  --ink:#20292B;
  --tilegreen:#2E5A66;
  --tilegreen-soft:#7BA3AC;
  --ochre:#9E2B2B;
  --stone:#66716F;
  --paper:#F7F6F2;
  --tile:#EAE9E3;
  --line:#D6D3CA;
  --muted:#68726F;
  --pattern-op:.16;
  --f-kr:"IBM Plex Sans KR","Noto Sans KR","Malgun Gothic",system-ui,-apple-system,sans-serif;
  --f-disp:var(--f-kr);
  --f-body:var(--f-kr);
}
.eu-itin *{box-sizing:border-box}
.eu-itin{
  margin:0; background:var(--paper); color:var(--ink);
  font-family:var(--f-body); font-weight:300; font-size:16px; line-height:1.75;
  -webkit-font-smoothing:antialiased;
  word-break:keep-all; overflow-wrap:anywhere;
}
.eu-itin h1, .eu-itin h2, .eu-itin h3, .eu-itin h4{font-family:var(--f-disp); font-weight:600; text-wrap:balance; margin:0; line-height:1.3; letter-spacing:-.015em}
.eu-itin p{margin:0}
.eu-itin a{color:var(--tilegreen)}
.eu-itin .wrap{max-width:1080px; margin:0 auto; padding:0 24px}
.eu-itin /* ── 라우부루(바스크 십자) 밴드 ───────────────── */
.mudejar{
  height:18px;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='none' stroke='%232E5A66' stroke-width='1.2'%3E%3Cpath d='M20 20 A5 5 0 0 1 10 20 A5 5 0 0 0 0 20'/%3E%3Cpath d='M20 20 A5 5 0 0 0 20 10 A5 5 0 0 1 20 0'/%3E%3Cpath d='M20 20 A5 5 0 0 0 30 20 A5 5 0 0 1 40 20'/%3E%3Cpath d='M20 20 A5 5 0 0 1 20 30 A5 5 0 0 0 20 40'/%3E%3C/g%3E%3C/svg%3E");
  background-size:20px 20px;
  opacity:var(--pattern-op);
}
.eu-itin /* ── masthead ─────────────────────────────────── */
header.mast{padding:64px 0 44px}
.eu-itin .eyebrow{
  font-size:11.5px; font-weight:500; letter-spacing:.2em; text-transform:uppercase;
  color:var(--tilegreen); margin-bottom:20px;
}
.eu-itin h1{font-size:clamp(36px,5.8vw,60px); font-weight:700; letter-spacing:-.03em}
.eu-itin h1 .lat{font-weight:300; color:var(--tilegreen)}
.eu-itin .lede{margin-top:20px; max-width:56ch; font-size:17.5px; color:var(--muted); line-height:1.85}
.eu-itin .route{
  margin-top:34px; padding-top:22px; border-top:1px solid var(--line);
  font-weight:400; font-size:13px; line-height:2.2; color:var(--stone);
}
.eu-itin .route b{color:var(--ink); font-weight:500}
.eu-itin .route em{color:var(--ochre); font-style:normal; font-weight:500}
.eu-itin /* ── facts ────────────────────────────────────── */
.facts{
  display:grid; gap:1px; background:var(--line);
  grid-template-columns:repeat(auto-fit,minmax(160px,1fr));
  border:1px solid var(--line); margin:44px 0 8px;
}
.eu-itin .fact{background:var(--paper); padding:20px 22px}
.eu-itin .fact dt{font-size:12px; font-weight:500; color:var(--muted); margin-bottom:6px}
.eu-itin .fact dd{margin:0; font-weight:600; font-size:21px; line-height:1.35; font-variant-numeric:tabular-nums}
.eu-itin .fact dd small{display:block; font-weight:300; font-size:13px; color:var(--muted); margin-top:4px}
.eu-itin /* ── sections ─────────────────────────────────── */
.sec{padding:64px 0 8px}
.eu-itin .sec-label{
  font-size:11px; font-weight:500; letter-spacing:.18em; text-transform:uppercase;
  color:var(--tilegreen); margin-bottom:12px;
}
.eu-itin .sec h2{font-size:clamp(26px,3.4vw,34px)}
.eu-itin .sec .sub{margin-top:12px; color:var(--muted); max-width:62ch}
.eu-itin /* ── itinerary spine ──────────────────────────── */
.days{margin-top:40px}
.eu-itin .day{display:grid; grid-template-columns:104px 1fr; gap:0 28px; padding-bottom:44px; position:relative}
.eu-itin .rail{position:relative}
.eu-itin .rail::before{content:""; position:absolute; left:19px; top:44px; bottom:-44px; width:1px; background:var(--line)}
.eu-itin .day:last-child .rail::before{display:none}
.eu-itin .dnum{
  width:40px; height:40px; border-radius:50%;
  background:var(--paper); border:1px solid var(--tilegreen); color:var(--tilegreen);
  display:grid; place-items:center; font-size:14px; font-weight:500;
  position:relative; z-index:1;
}
.eu-itin .day.hub .dnum{background:var(--tilegreen); border-color:var(--tilegreen); color:var(--paper)}
.eu-itin .day.rest .dnum{background:var(--ochre); border-color:var(--ochre); color:var(--paper)}
.eu-itin .day.rest .drive span::before{background:var(--ochre)}
.eu-itin .day.rest ul.stops li::before{background:var(--ochre)}
.eu-itin .day.rest .stay{border-left-color:var(--ochre)}
.eu-itin .dwhen{
  width:80px; text-align:center; padding:7px 0 3px; margin-left:-20px;
  background:var(--paper); position:relative; z-index:1;
  font-weight:400; font-size:11.5px; color:var(--muted); white-space:nowrap;
  font-variant-numeric:tabular-nums;
}
.eu-itin .day.rest .dwhen{color:var(--ochre); font-weight:500}
.eu-itin .body{min-width:0}
.eu-itin .dtitle{font-size:23px; letter-spacing:-.005em}
.eu-itin .dtitle .via{color:var(--muted); font-weight:400}
.eu-itin .drive{
  margin-top:10px; display:flex; flex-wrap:wrap; gap:6px 14px;
  font-weight:400; font-size:12.5px; color:var(--stone); font-variant-numeric:tabular-nums;
}
.eu-itin .drive span{display:inline-flex; align-items:center; gap:6px}
.eu-itin .drive span::before{content:""; width:5px; height:5px; background:var(--tilegreen-soft); border-radius:50%}
.eu-itin ul.stops{list-style:none; padding:0; margin:18px 0 0; display:grid; gap:11px}
.eu-itin ul.stops li{padding-left:18px; position:relative; line-height:1.7}
.eu-itin ul.stops li::before{content:""; position:absolute; left:0; top:.72em; width:7px; height:1px; background:var(--tilegreen)}
.eu-itin ul.stops b{font-weight:600; color:var(--ink)}
.eu-itin .tag{
  display:inline-block; margin-left:6px; padding:1px 7px; border-radius:2px;
  font-weight:400; font-size:11px;
  border:1px solid var(--tilegreen); color:var(--tilegreen); vertical-align:2px;
}
.eu-itin .tag.opt{border-color:var(--ochre); color:var(--ochre)}
.eu-itin .tag.xmas{border-color:var(--ochre); color:var(--paper); background:var(--ochre)}
.eu-itin .stay{
  margin-top:18px; padding:12px 16px; background:var(--tile); border-left:2px solid var(--tilegreen);
  font-size:13.5px; display:flex; flex-wrap:wrap; gap:4px 18px;
}
.eu-itin .stay dt{font-size:12px; font-weight:500; color:var(--muted); align-self:center}
.eu-itin .stay dd{margin:0; font-weight:500}
.eu-itin /* ── tables / cards ───────────────────────────── */
.scroll{overflow-x:auto; margin-top:24px}
.eu-itin table{border-collapse:collapse; width:100%; font-size:14px; min-width:560px}
.eu-itin th, .eu-itin td{text-align:left; padding:11px 14px; border-bottom:1px solid var(--line); vertical-align:top}
.eu-itin th{font-size:12.5px; color:var(--muted); font-weight:500; border-bottom-color:var(--ink)}
.eu-itin td.num{font-variant-numeric:tabular-nums; white-space:nowrap}
.eu-itin td small{display:block; font-weight:300; font-size:12.5px; color:var(--muted); margin-top:3px; font-variant-numeric:tabular-nums}
.eu-itin .cols{display:grid; gap:32px; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); margin-top:28px}
.eu-itin .card{border:1px solid var(--line); padding:24px}
.eu-itin .card h3{font-size:18px; margin-bottom:14px}
.eu-itin .card ul{list-style:none; padding:0; margin:0; display:grid; gap:9px; font-size:14.5px}
.eu-itin .card li{padding-left:16px; position:relative}
.eu-itin .card li::before{content:""; position:absolute; left:0; top:.7em; width:6px; height:1px; background:var(--tilegreen)}
.eu-itin .card.excl li::before{background:var(--muted)}
.eu-itin .note{margin-top:28px; padding:24px 26px; border:1px solid var(--line); background:var(--tile)}
.eu-itin .note .why{display:grid; gap:14px; counter-reset:w}
.eu-itin .note .why div{padding-left:20px; position:relative}
.eu-itin .note .why div::before{
  content:counter(w); counter-increment:w; position:absolute; left:0; top:.1em;
  font-weight:500; font-size:13px; color:var(--tilegreen);
}
.eu-itin .note.warn{border-left:3px solid var(--ochre)}
.eu-itin .note.warn .why div::before{color:var(--ochre)}
.eu-itin footer{
  margin-top:72px; padding:36px 0 56px; border-top:1px solid var(--line);
  font-size:13px; color:var(--muted); display:flex; flex-wrap:wrap; gap:8px 28px; justify-content:space-between;
}
.eu-itin footer b{color:var(--ink); font-weight:600; letter-spacing:.02em}
@media (max-width:640px){ .eu-itin .day{grid-template-columns:52px 1fr; gap:0 14px}
.eu-itin .dwhen{width:52px; margin-left:-6px; font-size:10px}
.eu-itin header.mast{padding:44px 0 32px}
}
</style>
<div class="mudejar"></div>

<div class="wrap">

  <header class="mast">
    <div class="eyebrow">Euforia Tour · Green Spain · Asturias &amp; Picos de Europa</div>
    <h1>아스투리아스와 <span class="lat">피코스</span> 6일</h1>
    <p class="lede">
      스페인 사람들이 「자연의 낙원」이라 부르는 곳입니다. 레콘키스타가 시작된 코바동가 성지에서
      2,000미터 석회암 봉우리 아래까지 올라갔다가, 칸타브리아 해안으로 내려와 중세 마을에서 끝납니다.
      시드라를 머리 위로 들어 따르는 저녁이 매일 있습니다.
    </p>
    <div class="route">
      <b>마드리드</b> → 레온 → <b>오비에도</b> → 캉가스 데 오니스 → <em>코바동가</em> → 리바데세야 →
      야네스 → 라 에르미다 협곡 → 포테스 → <em>푸엔테 데</em> → <b>산탄데르</b> →
      산티야나 델 마르 → 코미야스 → 마드리드
    </div>

    <dl class="facts">
      <div class="fact"><dt>일정</dt><dd>6일 5박<small>출발일 협의 · 연중 진행</small></dd></div>
      <div class="fact"><dt>집합</dt><dd>마드리드 현지<small>국제선 항공 불포함</small></dd></div>
      <div class="fact"><dt>숙박</dt><dd>오비에도 2 · 산탄데르 3<small>4성급 · 조식 포함</small></dd></div>
      <div class="fact"><dt>이동</dt><dd>전 구간 차량<small>국내선·열차 없음</small></dd></div>
      <div class="fact"><dt>총 주행</dt><dd>약 1,610km<small>실측 경로 기준</small></dd></div>
    </dl>
  </header>


  <section class="sec">
    <div class="sec-label">Why Picos</div>
    <h2>왜 이 코스인가</h2>
    <div class="note">
      <div class="why">
        <div><b>스페인의 첫 국립공원입니다.</b> 피코스 데 에우로파는 1918년에 지정된 스페인 최초의 국립공원이고, 바다에서 20km 떨어진 곳에 2,600미터 석회암 봉우리가 솟아 있습니다. 케이블카 한 번으로 그 한가운데까지 올라갑니다.</div>
        <div><b>스페인이 시작된 자리를 지납니다.</b> 코바동가는 이슬람 세력에 맞서 첫 승리를 거둔 곳이자 아스투리아스 왕국이 세워진 자리입니다. 스페인 사람들에게는 관광지가 아니라 성지입니다.</div>
        <div><b>바다와 산이 붙어 있습니다.</b> 오전에 협곡을 오르고 오후에 해변에 서는 일이 이 지역에서는 자연스럽습니다. 리바데세야와 야네스의 해안이 국립공원에서 한 시간 거리입니다.</div>
        <div><b>거점을 둘로 나눴습니다.</b> 앞의 이틀은 오비에도, 뒤의 사흘은 산탄데르입니다. 짐을 두 번만 풀고 여섯 날을 씁니다.</div>
      </div>
    </div>
  </section>


  <section class="sec">
    <div class="sec-label">Itinerary</div>
    <h2>일정</h2>
    <p class="sub">
      <b>마드리드 현지 집합</b>으로 시작하는 5박 6일입니다. 오비에도 2박 · 산탄데르 3박.
      중식·석식은 자유식을 기본으로 하며, 가이드가 시드레리아와 지역 식당을 안내합니다.
    </p>

    <div class="days">

      <article class="day hub">
        <div class="rail"><div class="dnum">1</div><div class="dwhen">1일차</div></div>
        <div class="body">
          <h3 class="dtitle">마드리드 <span class="via">→</span> 레온 <span class="via">→</span> 오비에도</h3>
          <div class="drive"><span>약 468km</span><span>주행 4시간 50분</span><span>07:30 마드리드 집합</span><span>법정 휴식 45분 포함</span></div>
          <ul class="stops">
            <li><b>레온 대성당</b> — 벽면 대부분이 스테인드글라스인 프랑스식 고딕. 중식 정차를 겸합니다</li>
            <li><b>산티아고 순례길</b><span class="tag">세계유산</span> — 레온은 프랑스길의 큰 기착지입니다</li>
            <li>칸타브리아 산맥을 넘어 <b>오비에도</b> 도착</li>
            <li>저녁 <b>가스코나 거리</b> — 시드라를 머리 위로 들어 따르는 시드레리아 골목</li>
          </ul>
          <dl class="stay"><dt>숙박</dt><dd>오비에도 (1/2박)</dd></dl>
        </div>
      </article>

      <article class="day hub">
        <div class="rail"><div class="dnum">2</div><div class="dwhen">2일차</div></div>
        <div class="body">
          <h3 class="dtitle">코바동가 <span class="via">·</span> 리바데세야 <span class="via">·</span> 야네스</h3>
          <div class="drive"><span>약 255km</span><span>주행 3시간 30분</span><span>산과 바다를 한 날에</span></div>
          <ul class="stops">
            <li><b>캉가스 데 오니스</b> — 아스투리아스 왕국의 첫 수도, 로마 다리에 매달린 승리의 십자가</li>
            <li><b>코바동가 성지</b> — 바위 동굴 안의 산타 쿠에바와 분홍빛 대성당. 스페인 레콘키스타가 시작된 자리</li>
            <li><b>코바동가 호수</b><span class="tag opt">선택</span> — 엔올과 에르시나 두 빙하호. <b>6월 1일~10월 18일에는 대형 차량 진입이 금지되어 셔틀버스로 환승합니다</b></li>
            <li><b>리바데세야</b> — 티토 부스티요 동굴이 있는 항구, 세야 강 하구</li>
            <li><b>야네스</b> — 성벽과 어항, 「기억의 큐브」 조각이 놓인 방파제</li>
          </ul>
          <dl class="stay"><dt>숙박</dt><dd>오비에도 (2/2박)</dd></dl>
        </div>
      </article>

      <article class="day hub">
        <div class="rail"><div class="dnum">3</div><div class="dwhen">3일차</div></div>
        <div class="body">
          <h3 class="dtitle">라 에르미다 협곡 <span class="via">·</span> 포테스 <span class="via">·</span> 푸엔테 데 <span class="via">→</span> 산탄데르</h3>
          <div class="drive"><span>약 316km</span><span>주행 4시간 20분</span><span>협곡 도로 · 케이블카</span></div>
          <ul class="stops">
            <li><b>오비에도 구시가</b> 오전 — 대성당과 「카마라 산타」, <b>산타 마리아 델 나랑코</b><span class="tag">세계유산</span> 9세기 아스투리아스 선로마네스크</li>
            <li><b>라 에르미다 협곡</b> — 20km에 걸쳐 수직 절벽 사이를 지나는 데바 강 협곡 도로</li>
            <li><b>산토 토리비오 데 리에바나 수도원</b> — 그리스도 십자가의 가장 큰 조각을 보관한다는 리에바나 계곡의 수도원</li>
            <li><b>포테스</b> — 돌탑과 나무 발코니가 남은 산간 마을, 중식</li>
            <li><b>푸엔테 데 케이블카</b><span class="tag">입장</span> — 4분 만에 해발 1,823m까지 오르는 절벽 케이블카, 피코스 한가운데의 전망</li>
            <li>산맥을 내려와 <b>산탄데르</b> 도착</li>
          </ul>
          <dl class="stay"><dt>숙박</dt><dd>산탄데르 (1/3박)</dd></dl>
        </div>
      </article>

      <article class="day">
        <div class="rail"><div class="dnum">4</div><div class="dwhen">4일차</div></div>
        <div class="body">
          <h3 class="dtitle">산탄데르 종일</h3>
          <div class="drive"><span>시내 약 25km</span><span>도보 구간 다수</span><span>전날 산행의 회복일</span></div>
          <ul class="stops">
            <li><b>마그달레나 반도</b>와 왕실 별궁 — 바다로 뻗은 곶 전체가 공원입니다</li>
            <li><b>사르디네로 해변</b>과 그란 카시노 — 20세기 초 왕실 피서지의 흔적</li>
            <li><b>센트로 보틴</b> — 렌초 피아노가 물 위에 띄운 문화센터<span class="tag opt">선택</span></li>
            <li><b>메르카도 데 라 에스페란사</b>와 대성당 · 페레다 산책로</li>
            <li>저녁 자유식 — 칸타브리아 해산물</li>
          </ul>
          <dl class="stay"><dt>숙박</dt><dd>산탄데르 (2/3박)</dd></dl>
        </div>
      </article>

      <article class="day">
        <div class="rail"><div class="dnum">5</div><div class="dwhen">5일차</div></div>
        <div class="body">
          <h3 class="dtitle">산티야나 델 마르 <span class="via">·</span> 코미야스</h3>
          <div class="drive"><span>약 95km</span><span>주행 1시간 30분</span><span>도보 구간 다수</span></div>
          <ul class="stops">
            <li><b>산티야나 델 마르</b> — 돌바닥과 귀족 저택이 그대로 남은 중세 마을, 사르트르가 「스페인에서 가장 아름다운 마을」이라 부른 곳</li>
            <li><b>알타미라 박물관</b><span class="tag">세계유산</span> — 1만 5천 년 전 들소 벽화. 원본 동굴은 보존을 위해 닫혀 있고 정밀 복제 동굴을 관람합니다</li>
            <li><b>엘 카프리초</b> — 가우디가 남긴 해바라기 타일의 여름 별장</li>
            <li><b>소브레야노 궁전</b>과 코미야스 묘지 · 대학 언덕</li>
            <li>산탄데르로 돌아와 마지막 저녁</li>
          </ul>
          <dl class="stay"><dt>숙박</dt><dd>산탄데르 (3/3박)</dd></dl>
        </div>
      </article>

      <article class="day hub">
        <div class="rail"><div class="dnum">6</div><div class="dwhen">6일차</div></div>
        <div class="body">
          <h3 class="dtitle">산탄데르 <span class="via">→</span> 마드리드</h3>
          <div class="drive"><span>약 455km</span><span>주행 4시간 50분</span><span>07:30 출발</span><span>법정 휴식 45분 포함</span></div>
          <ul class="stops">
            <li>이른 아침 산탄데르 출발, 칸타브리아 산맥을 넘어 카스티야 평원으로</li>
            <li>중간 휴게 정차 후 <b>마드리드</b> 도착 · 일정 종료</li>
            <li>귀국편 시각에 맞춰 공항 또는 시내 호텔로 안내해 드립니다</li>
          </ul>
        </div>
      </article>

    </div>
  </section>


  <section class="sec">
    <div class="sec-label">Inclusions</div>
    <h2>포함 · 불포함</h2>
    <div class="cols">
      <div class="card">
        <h3>포함 사항</h3>
        <ul>
          <li>4성급 호텔 5박 · <b>조식 포함</b> (오비에도 2 · 산탄데르 3)</li>
          <li>전용 차량 및 기사 (현지 6일 · 전 구간)</li>
          <li><b>한국인 인솔 가이드 전 일정 동행</b></li>
          <li>일정표 명시 입장료 — 레온 대성당 · 산타 마리아 델 나랑코 · 산토 토리비오 수도원 · <b>푸엔테 데 케이블카</b> · 알타미라 박물관</li>
          <li>여행자 보험</li>
        </ul>
      </div>
      <div class="card excl">
        <h3>불포함 사항</h3>
        <ul>
          <li><b>왕복 국제선 항공권</b> — 마드리드 현지 집합 상품입니다</li>
          <li><b>마드리드 전후 숙박</b> — 집합 전날 숙박은 별도로 안내해 드립니다</li>
          <li><b>중식 · 석식</b> — 자유식 기준. 유료 식사를 넣는 구성도 가능합니다</li>
          <li><b>코바동가 호수 선택 관광</b> — 성수기 셔틀버스 요금 포함, 별도 문의</li>
          <li>그 밖의 선택 관광 비용</li>
          <li>가이드 · 기사 팁 · 개인 경비</li>
          <li>초과 수하물 요금</li>
        </ul>
      </div>
    </div>
  </section>


  <section class="sec">
    <div class="sec-label">Notes</div>
    <h2>미리 알려 드립니다</h2>
    <div class="note warn">
      <div class="why">
        <div><b>코바동가 호수는 성수기에 대형 차량이 올라가지 못합니다.</b> 6월 1일부터 10월 18일까지 진입이 통제되어 아래 주차장에서 셔틀버스로 갈아탑니다. 환승과 대기에 한 시간 정도가 더 듭니다 — 이 시기 출발이면 2일차 일정을 그에 맞춰 조정합니다.</div>
        <div><b>푸엔테 데 케이블카는 날씨에 좌우됩니다.</b> 강풍이나 짙은 안개가 있으면 운행이 중단됩니다. 운행하지 않는 날에는 포테스와 리에바나 계곡 일정으로 대체합니다.</div>
        <div><b>1·6일차는 장거리 이동일입니다.</b> 마드리드와 북부 사이가 왕복 900km가 넘어 이틀은 이동이 중심이 됩니다. 대신 레온을 중간에 끊어 대성당과 중식을 넣었고, EU 규정에 따른 기사 법정 휴식 45분도 일정에 반영돼 있습니다.</div>
        <div><b>산간 구간의 고도차가 있습니다.</b> 3일차는 협곡 도로를 오르내리며 케이블카로 해발 1,800m까지 올라갑니다. 여름에도 산 위는 서늘하니 겉옷을 준비해 주십시오.</div>
      </div>
    </div>
  </section>


  <section class="sec">
    <div class="sec-label">Highlights</div>
    <h2>이 일정에 담긴 것</h2>
    <div class="scroll">
      <table>
        <thead><tr><th>구분</th><th>내용</th></tr></thead>
        <tbody>
          <tr><td>세계유산</td><td>오비에도 아스투리아스 선로마네스크 · 알타미라와 북부 스페인 구석기 동굴미술 · 산티아고 순례길(레온) <b>(3곳)</b></td></tr>
          <tr><td>국립공원</td><td>피코스 데 에우로파 — 1918년 지정된 스페인 최초의 국립공원</td></tr>
          <tr><td>성지</td><td>코바동가 산타 쿠에바와 대성당 · 산토 토리비오 데 리에바나 수도원</td></tr>
          <tr><td>해안</td><td>리바데세야 · 야네스 · 사르디네로 · 코미야스</td></tr>
          <tr><td>미식</td><td>오비에도 가스코나 시드레리아 · 아스투리아스 파바다 · 칸타브리아 해산물</td></tr>
          <tr><td>숙박</td><td>오비에도 2박 · 산탄데르 3박 <b>(5박)</b> — 짐을 두 번만 풉니다</td></tr>
        </tbody>
      </table>
    </div>
  </section>


  <footer>
    <div><b>EUFORIA TOUR SPAIN</b> · Euforia das Nuvens, S.L. · Calle Gran Vía 69, Madrid</div>
    <div>일정과 순서는 현지 사정에 따라 조정될 수 있습니다.</div>
  </footer>

</div>

<div class="mudejar"></div>
</div>`,
      highlights: ['레온 대성당과 산티아고 순례길 (세계유산)', '코바동가 성지 · 산타 쿠에바', '피코스 데 에우로파 · 푸엔테 데 케이블카 (해발 1,823m)', '라 에르미다 협곡과 포테스 · 산토 토리비오 수도원', '오비에도 선로마네스크 산타 마리아 델 나랑코 (세계유산)', '산티야나 델 마르와 알타미라 박물관 (세계유산)', '리바데세야 · 야네스 · 코미야스 해안'],
      includes: ['4성급 호텔 5박 · 조식 포함 (오비에도 2 · 산탄데르 3)', '전용 차량 및 기사 (현지 6일 · 전 구간)', '한국인 인솔 가이드 전 일정 동행', '일정표 명시 입장료 — 레온 대성당 · 산타 마리아 델 나랑코 · 산토 토리비오 수도원 · 푸엔테 데 케이블카 · 알타미라 박물관', '여행자 보험'],
      excludes: ['왕복 국제선 항공권 — 마드리드 현지 집합 상품입니다', '마드리드 전후 숙박 (집합 전날 숙박은 별도 안내)', '중식 · 석식 (자유식 기준 · 유료 식사 구성 가능)', '코바동가 호수 선택 관광 — 6/1~10/18 셔틀버스 환승 구간, 별도 문의', '그 밖의 선택 관광 비용', '가이드 · 기사 팁 · 개인 경비', '초과 수하물 요금'],
      duration: '5박 6일 (마드리드 현지 집합 · 총 주행 약 1,610km 실측 · 일정은 현지 사정에 따라 변경될 수 있어요)'
    }
  },
{
    id: 'iberia-14days-madrid',
    downloadUrl: '/docs/iberia-14days-itinerary.pdf',
    cats: ['spain'],
    topClass: 'spain',
    region: 'SPAIN · PORTUGAL',
    days: '13박14일',
    price: '가격 문의',
    title: '[이베리아 대종단] 마드리드 IN · 리스본 OUT 13박14일',
    summary: '지중해에서 대서양까지 — 마드리드에 내려 스페인 여섯 도시(사라고사·바르셀로나·발렌시아·그라나다·세비야)와 포르투갈 세 도시(파티마·포르투·리스본)를 전용 차량 한 대로 잇는 9개 도시 종단 여정이에요.',
    tags: ['13박 14일', '9개 도시', '목요일 출발'],
    isNew: true,
    detail: {
      lead: '마드리드 2박·사라고사 1박·바르셀로나 2박·발렌시아 1박·그라나다 1박·세비야 2박·파티마 1박·포르투 2박·리스본 1박, 스페인 6개 도시와 포르투갈 3개 도시를 전용 차량으로 잇는 대종단이에요.',
      description: `<div class="eu-iberia14">
<style>

@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,700&family=Gowun+Batang:wght@400;700&family=IBM+Plex+Sans+KR:wght@300;400;500;600&display=swap");
.eu-iberia14 h1,.eu-iberia14 h2,.eu-iberia14 h3,.eu-iberia14 h4,.eu-iberia14 h5{
  color:var(--ink);font-family:inherit;margin:0;line-height:1.25;text-transform:none;
}
.eu-iberia14 p,.eu-iberia14 li,.eu-iberia14 dl,.eu-iberia14 dt,.eu-iberia14 dd,.eu-iberia14 span,.eu-iberia14 div,.eu-iberia14 strong,.eu-iberia14 b,.eu-iberia14 em{
  font-family:inherit;
}
.eu-iberia14 .display{font-family:"Fraunces","Gowun Batang",Georgia,serif}
.eu-iberia14 h1 em{color:var(--accent);font-style:normal}
.eu-iberia14 a{color:var(--accent);text-decoration:none}
.eu-iberia14 ul,.eu-iberia14 ol{margin:0}
.eu-iberia14 section,.eu-iberia14 article,.eu-iberia14 footer{margin:0;background:none;border:0}
.eu-iberia14 svg{max-width:100%}
.eu-iberia14{background:var(--ground);overflow-x:hidden;max-width:100%;}

.eu-iberia14{
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
}.eu-iberia14 *{box-sizing:border-box}.eu-iberia14{
  margin:0;
  background:var(--ground);
  color:var(--ink);
  font-family:"IBM Plex Sans KR","IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Malgun Gothic",sans-serif;
  font-weight:400;
  font-size:16px;
  line-height:1.75;
  -webkit-font-smoothing:antialiased;
  word-break:keep-all;
}.eu-iberia14 .wrap{max-width:1040px;margin:0 auto;padding:0 24px}.eu-iberia14 .display{font-family:"Fraunces","Gowun Batang",Georgia,serif;font-weight:700;letter-spacing:-.01em;text-wrap:balance;line-height:1.2}.eu-iberia14 .label{
  font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;
  color:var(--ink-3);
}.eu-iberia14 .hero{padding:64px 0 0}.eu-iberia14 .eyebrow{display:flex;align-items:center;gap:12px;margin-bottom:20px}.eu-iberia14 .eyebrow .rule{height:1px;flex:0 0 40px;background:var(--accent)}.eu-iberia14 h1{font-size:clamp(38px,6.4vw,64px);margin:0 0 22px}.eu-iberia14 h1 em{font-style:normal;color:var(--accent)}.eu-iberia14 .lede{
  font-size:clamp(17px,2.1vw,19px);color:var(--ink-2);max-width:60ch;margin:0 0 34px;
  font-weight:300;line-height:1.85;
}.eu-iberia14 .facts{
  display:grid;gap:1px;background:var(--line);
  grid-template-columns:repeat(auto-fit,minmax(160px,1fr));
  border:1px solid var(--line);border-radius:2px;overflow:hidden;
}.eu-iberia14 .fact{background:var(--surface);padding:18px 20px}.eu-iberia14 .fact dt{margin:0 0 6px}.eu-iberia14 .fact dd{margin:0;font-size:16px;font-weight:500;line-height:1.5}.eu-iberia14 .garland{margin:56px 0 0;color:var(--accent);opacity:.9}.eu-iberia14 .garland svg{display:block;width:100%;height:34px}.eu-iberia14 .mapsec{padding:56px 0 8px}.eu-iberia14 .mapcard{
  background:var(--surface);border:1px solid var(--line);border-radius:2px;
  padding:26px 26px 18px;box-shadow:var(--shadow);
}.eu-iberia14 .mapcard h2{font-size:20px;margin:0 0 4px}.eu-iberia14 .mapcard p.note{font-size:13px;color:var(--ink-3);margin:0 0 18px}.eu-iberia14 .mapscroll{overflow-x:auto}.eu-iberia14 .mapscroll svg{display:block;min-width:0;width:100%;max-width:520px;margin:0 auto;height:auto}.eu-iberia14 .mp-sea{fill:var(--sea)}.eu-iberia14 .mp-coast{fill:none;stroke:var(--ink-3);stroke-width:.4;opacity:.55}.eu-iberia14 .mp-route{fill:none;stroke:var(--pine);stroke-width:.5;stroke-dasharray:1.4 1.1;opacity:.85}.eu-iberia14 .mp-dot{fill:var(--accent)}.eu-iberia14 .mp-dot.stay{fill:var(--pine)}.eu-iberia14 .mp-base{fill:var(--surface);stroke:var(--pine);stroke-width:.7}.eu-iberia14 .mp-t{font-size:2.1px;fill:var(--ink-2);font-family:"IBM Plex Sans KR",sans-serif;font-weight:500}.eu-iberia14 .mp-c{font-size:2.1px;fill:var(--ink-3);font-family:"IBM Plex Sans KR",sans-serif;letter-spacing:.14em}.eu-iberia14 .mp-n{font-size:1.9px;fill:var(--ink-3);font-family:"IBM Plex Sans KR",sans-serif}.eu-iberia14 .maplegend{display:flex;flex-wrap:wrap;gap:18px;margin-top:14px;font-size:12.5px;color:var(--ink-2)}.eu-iberia14 .maplegend i{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:7px;vertical-align:1px}.eu-iberia14 .itin{padding:56px 0 0}.eu-iberia14 .itin > h2{font-size:clamp(24px,3.4vw,30px);margin:0 0 6px}.eu-iberia14 .itin > p.sub{color:var(--ink-3);margin:0 0 36px;font-size:14.5px}.eu-iberia14 .day{
  display:grid;grid-template-columns:196px 1fr;gap:36px;
  padding:34px 0;border-top:1px solid var(--line);
}.eu-iberia14 .day:last-of-type{border-bottom:1px solid var(--line)}.eu-iberia14 .daykey{position:relative}.eu-iberia14 .daynum{
  font-family:"Fraunces",serif;font-weight:300;font-size:52px;line-height:1;
  color:var(--accent);letter-spacing:-.03em;font-variant-numeric:tabular-nums;
}.eu-iberia14 .daynum sub{font-size:15px;font-weight:500;vertical-align:baseline;margin-left:4px;color:var(--ink-3)}.eu-iberia14 .places{margin:14px 0 0;padding:0;list-style:none}.eu-iberia14 .places li{
  font-weight:500;font-size:15.5px;line-height:1.5;padding:3px 0;
}.eu-iberia14 .places li .lat{display:block;font-family:"Fraunces",serif;font-weight:300;font-size:13px;color:var(--ink-3);letter-spacing:.01em}.eu-iberia14 .daybody h3{font-size:19px;margin:0 0 12px;font-weight:600;letter-spacing:-.005em}.eu-iberia14 .daybody p{margin:0 0 14px;color:var(--ink-2);max-width:62ch}.eu-iberia14 .daybody p:last-child{margin-bottom:0}.eu-iberia14 .daybody strong{color:var(--ink);font-weight:600}.eu-iberia14 .meals{
  display:flex;flex-wrap:wrap;gap:8px;margin-top:18px;padding-top:16px;
  border-top:1px dashed var(--line);
}.eu-iberia14 .meal{
  font-size:12px;font-weight:500;letter-spacing:.02em;
  padding:4px 11px;border-radius:2px;
  background:var(--accent-soft);color:var(--accent);
}.eu-iberia14 .meal.free{background:var(--surface-2);color:var(--ink-3)}.eu-iberia14 .meal.star{background:var(--pine-soft);color:var(--pine)}.eu-iberia14 .tag-stay{
  display:inline-block;margin-top:14px;font-size:12.5px;color:var(--ink-3);
}.eu-iberia14 .info{padding:60px 0 0}.eu-iberia14 .info h2{font-size:clamp(22px,3vw,26px);margin:0 0 22px}.eu-iberia14 .info .why{display:flex;flex-direction:column;gap:16px}.eu-iberia14 .info .why p{margin:0;color:var(--ink-2);font-size:14.5px;line-height:1.8;max-width:70ch}.eu-iberia14 .info .why strong{color:var(--ink);font-weight:600}.eu-iberia14 .cmp{padding:52px 0 0}.eu-iberia14 .cmp h2{font-size:clamp(22px,3vw,26px);margin:0 0 22px}.eu-iberia14 .cmptable{width:100%;border-collapse:collapse;font-size:13.5px}.eu-iberia14 .cmptable th{text-align:left;padding:10px 14px;background:var(--surface-2);color:var(--ink-3);font-weight:600;font-size:11px;letter-spacing:.06em;text-transform:uppercase;border-bottom:1px solid var(--line)}.eu-iberia14 .cmptable td{padding:12px 14px;border-bottom:1px solid var(--line-soft);color:var(--ink-2)}.eu-iberia14 .cmptable td:first-child{color:var(--ink);font-weight:600;white-space:nowrap}.eu-iberia14 .cmptable p.note{margin:14px 0 0;font-size:13.5px;color:var(--ink-2);line-height:1.75}.eu-iberia14 .opt{padding:56px 0 0}.eu-iberia14 .opt h2{font-size:clamp(22px,3vw,26px);margin:0 0 22px}.eu-iberia14 .opttable{width:100%;border-collapse:collapse;font-size:13.5px}.eu-iberia14 .opttable th{text-align:left;padding:10px 14px;background:var(--surface-2);color:var(--ink-3);font-weight:600;font-size:11px;letter-spacing:.06em;text-transform:uppercase;border-bottom:1px solid var(--line)}.eu-iberia14 .opttable td{padding:12px 14px;border-bottom:1px solid var(--line-soft);color:var(--ink-2)}.eu-iberia14 .opttable td:first-child{color:var(--ink);font-weight:600;white-space:nowrap}.eu-iberia14 .incl{padding:64px 0 0}.eu-iberia14 .cols{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:26px}.eu-iberia14 .card{
  border:1px solid var(--line);border-radius:2px;padding:26px 26px 28px;
  background:var(--surface);
}.eu-iberia14 .card.no{background:var(--surface-2)}.eu-iberia14 .card h3{font-size:17px;margin:0 0 4px;display:flex;align-items:center;gap:9px;font-weight:600}.eu-iberia14 .card h3 .pip{width:8px;height:8px;border-radius:50%;background:var(--accent);flex:0 0 auto}.eu-iberia14 .card.no h3 .pip{background:var(--ink-3)}.eu-iberia14 .card ul{margin:16px 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:12px}.eu-iberia14 .card li{
  font-size:14.5px;line-height:1.65;color:var(--ink-2);
  padding-left:16px;position:relative;
}.eu-iberia14 .card li::before{
  content:"";position:absolute;left:0;top:.7em;
  width:6px;height:1px;background:var(--line);
}.eu-iberia14 .card li b{color:var(--ink);font-weight:600;display:block;font-size:13px;letter-spacing:.02em}.eu-iberia14 .notes{padding:52px 0 0}.eu-iberia14 .notes ol{margin:18px 0 0;padding-left:20px;display:flex;flex-direction:column;gap:10px}.eu-iberia14 .notes li{font-size:14px;color:var(--ink-2);line-height:1.7}.eu-iberia14 .cta{margin:64px 0 0;border-top:2px solid var(--accent);background:var(--surface);padding:38px 0 44px}.eu-iberia14 .cta .wrap{display:flex;justify-content:space-between;align-items:flex-end;gap:28px;flex-wrap:wrap}.eu-iberia14 .cta h2{font-size:clamp(22px,3vw,28px);margin:8px 0 10px}.eu-iberia14 .cta p{margin:0;color:var(--ink-2);font-size:15px;max-width:46ch}.eu-iberia14 .contact{display:flex;flex-direction:column;gap:6px;font-size:15px}.eu-iberia14 .contact a{color:var(--accent);text-decoration:none;border-bottom:1px solid var(--accent-soft);font-weight:500}.eu-iberia14 .contact a:hover, .eu-iberia14 .contact a:focus-visible{border-bottom-color:var(--accent)}.eu-iberia14 footer{padding:26px 0 60px;color:var(--ink-3);font-size:12.5px}.eu-iberia14 footer .wrap{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap}.eu-iberia14 a:focus-visible, .eu-iberia14 li:focus-visible{outline:2px solid var(--accent);outline-offset:3px}

@media (max-width:800px){.eu-iberia14 .day{grid-template-columns:1fr;gap:18px}.eu-iberia14 .daykey{display:flex;align-items:baseline;gap:20px;flex-wrap:wrap}.eu-iberia14 .daynum{font-size:40px}.eu-iberia14 .places{margin-top:0;display:flex;gap:18px;flex-wrap:wrap}.eu-iberia14 .cols{grid-template-columns:1fr}.eu-iberia14 .hero{padding-top:44px}
}
@media (prefers-reduced-motion:reduce){.eu-iberia14 *{animation:none!important;transition:none!important}}

.eu-iberia14{padding:8px 0 40px}
.eu-iberia14 .hero{padding-top:8px}
.eu-iberia14 .wrap{max-width:1040px}
.eu-iberia14 footer{padding:22px 0 0}

</style>
<div class="eu-main">

<section class="hero">
  <div class="wrap">
    <div class="eyebrow"><span class="rule"></span><span class="label">13박 14일 · 마드리드 IN · 리스본 OUT · 전용차량+한국인 인솔</span></div>
    <h1>이베리아 <em>대종단</em></h1>
    <p class="lede">
      지중해에서 대서양까지 — 마드리드에 내려 스페인 여섯 도시와 포르투갈 세 도시를 전용 차량 한 대로 이어 가는 여정이에요.
      짐을 옮겨 싣는 일도, 기차역을 찾는 일도 없어요.
    </p>
    <dl class="facts">
      <div class="fact"><dt class="label">일정</dt><dd>13박 14일</dd></div>
      <div class="fact"><dt class="label">항공</dt><dd>대한항공 직항 IN/OUT</dd></div>
      <div class="fact"><dt class="label">도시</dt><dd>9개 도시</dd></div>
      <div class="fact"><dt class="label">이동</dt><dd>전 일정 전용 차량 · 약 2,720km</dd></div>
      <div class="fact"><dt class="label">최소 출발</dt><dd>4인</dd></div>
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

<section class="info">
  <div class="wrap">
    <h2 class="display">항공 스케줄 — 확인 결과 (2026-08-27 조회)</h2>
    <div class="why">
      <p>마드리드로 들어가 리스본에서 나오는 오픈조 구간이에요. 두 구간 모두 대한항공 직항으로 연결돼요.</p>
      <p><strong>이 일정은 목요일 출발만 성립해요.</strong> 13박 14일이면 돌아오는 날이 출발일로부터 정확히 13일 뒤, 요일로는 6일 뒤예요. 마드리드행 KE913은 화·목·금·일, 리스본발 KE922는 수·금·일에만 뜨는데, 이 둘이 맞물리는 조합은 <strong>목요일 출발 → 수요일 귀국</strong> 하나뿐이에요.</p>
      <p>날짜를 넓게 잡고 싶으시면 방향을 뒤집는 방법이 있어요. 리스본으로 들어가 마드리드에서 나오면(KE921 IN / KE914 OUT) 수요일·금요일 두 요일이 성립해요. 다만 그러면 도시 순서가 리스본 → 포르투 → 파티마 → 세비야 → … → 마드리드로 완전히 뒤집혀요.</p>
      <p>확인 중인 사항이 하나 있어요. 대한항공이 2026년 9월 21일부터 인천–리스본을 주 4회로 증편한다고 발표했어요. 다만 추가되는 요일이 어디인지는 아직 공시되지 않아서, 확정 전에 다시 확인해 드릴게요.</p>
    </div>
    <table class="cmptable" style="margin-top:20px;">
      <thead><tr><th>구간</th><th>편명</th><th>운항 요일</th><th>하계(~10/23)</th><th>동계(10/25~)</th></tr></thead>
      <tbody>
        <tr><td>인천 → 마드리드</td><td>KE913</td><td>화·목·금·일</td><td>09:55→18:00</td><td>12:10→19:25</td></tr>
        <tr><td>리스본 → 인천</td><td>KE922</td><td>수·금·일</td><td>22:15→19:15+1</td><td>21:40→20:00+1</td></tr>
      </tbody>
    </table>
  </div>
</section>

<section class="cmp">
  <div class="wrap">
    <h2 class="display">동선 — 전 구간 육로 약 2,720km</h2>
    <p class="note" style="margin-bottom:16px;">.</p>
    <table class="cmptable">
      <thead><tr><th>구간</th><th>거리</th><th>비고</th></tr></thead>
      <tbody>
        <tr><td>마드리드 → 사라고사</td><td>약 315km</td><td>A-2 · 가는 길</td></tr>
        <tr><td>사라고사 → 바르셀로나</td><td>약 310km</td><td>A-2 · 가는 길</td></tr>
        <tr><td>바르셀로나 → 발렌시아</td><td>약 350km</td><td>지중해 연안</td></tr>
        <tr><td>발렌시아 → 그라나다</td><td>약 500km</td><td>최장 구간</td></tr>
        <tr><td>그라나다 → 세비야</td><td>약 250km</td><td>안달루시아</td></tr>
        <tr><td>세비야 → 파티마</td><td>약 500km</td><td>국경 통과 · 최장 구간</td></tr>
        <tr><td>파티마 → 포르투</td><td>약 185km</td><td>코임브라 경유</td></tr>
        <tr><td>포르투 → 리스본</td><td>약 310km</td><td>대서양 연안</td></tr>
      </tbody>
    </table>
    <p class="note" style="margin-top:16px;"></p>
  </div>
</section>

<section class="itin">
  <div class="wrap">
    <h2 class="display">일정</h2>
    <p class="sub">1일차 목요일 인천 출발, 14일차 수요일 리스본에서 귀국해요.</p>

    <article class="day">
      <div class="daykey"><div class="daynum">01<sub>일차</sub></div>
        <ul class="places"><li>인천 → 마드리드<span class="lat">Incheon → Madrid</span></li></ul>
      </div>
      <div class="daybody">
        <h3>목요일, 인천 출발</h3>
        <p>KE913편, 직항 약 15시간. 인천공항 3층 출발층에서 미팅 후 탑승 수속을 진행해요.</p>
        <p>마드리드 바라하스 공항 도착 — 인솔자가 입국장에서 대기해요. 전용 차량으로 시내 호텔로 이동해 여장을 풉니다.</p>
        <div class="meals"><span class="meal free">기내식</span></div>
        <span class="tag-stay">숙박 — 마드리드</span>
      </div>
    </article>

    <article class="day">
      <div class="daykey"><div class="daynum">02<sub>일차</sub></div>
        <ul class="places"><li>마드리드<span class="lat">Madrid</span></li></ul>
      </div>
      <div class="daybody">
        <h3>마드리드 시내</h3>
        <p><strong>프라도 미술관</strong> — 벨라스케스 「시녀들」, 고야의 검은 그림을 만나요. <strong>마드리드 왕궁</strong>과 <strong>알무데나 대성당</strong>을 둘러봅니다.</p>
        <p><strong>마요르 광장</strong>과 <strong>산 미겔 시장</strong>에서 이베리코 하몽과 타파스를 맛보고, <strong>솔 광장·그란비아</strong>에서 저녁 산책과 자유 시간을 가져요.</p>
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal free">석식 · 자유식</span></div>
        <span class="tag-stay">숙박 — 마드리드</span>
      </div>
    </article>

    <article class="day">
      <div class="daykey"><div class="daynum">03<sub>일차</sub></div>
        <ul class="places"><li>사라고사<span class="lat">Zaragoza</span></li></ul>
      </div>
      <div class="daybody">
        <h3>마드리드 → 사라고사 (약 315km · 3시간)</h3>
        <p><strong>필라르 성모 대성당</strong> — 에브로 강변에 선 스페인 최초의 성모 발현지예요. <strong>알하페리아 궁전</strong> — 이슬람 왕궁 위에 세워진 무데하르 건축의 정수입니다.</p>
        <p><strong>로마교</strong>와 에브로 강변, 구시가 골목을 걸어요. 패키지 일정에서 잘 다루지 않는 도시라, 저녁의 사라고사는 조용하고 물가도 순해요.</p>
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal free">석식 · 자유식</span></div>
        <span class="tag-stay">숙박 — 사라고사</span>
      </div>
    </article>

    <article class="day">
      <div class="daykey"><div class="daynum">04<sub>일차</sub></div>
        <ul class="places"><li>바르셀로나<span class="lat">Barcelona</span></li></ul>
      </div>
      <div class="daybody">
        <h3>사라고사 → 바르셀로나 (약 310km · 3시간)</h3>
        <p>오전 이동 후 바르셀로나 도착, 점심 식사. <strong>고딕 지구</strong> — 바르셀로나 대성당, 왕의 광장, 로마 성벽의 흔적을 봅니다.</p>
        <p><strong>산타 마리아 델 마르 성당</strong>과 보른 지구 — 카탈루냐 고딕의 정수예요. <strong>람블라스 거리</strong>와 <strong>보케리아 시장</strong>도 둘러봅니다.</p>
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal free">석식 · 자유식</span></div>
        <span class="tag-stay">숙박 — 바르셀로나 (1/2박)</span>
      </div>
    </article>

    <article class="day">
      <div class="daykey"><div class="daynum">05<sub>일차</sub></div>
        <ul class="places"><li>바르셀로나 종일<span class="lat">Barcelona</span></li></ul>
      </div>
      <div class="daybody">
        <h3>가우디의 하루</h3>
        <p><strong>사그라다 파밀리아</strong> — 내부 입장. 오전 빛이 동쪽 탄생의 파사드를 통과해요. <strong>구엘 공원</strong> — 모자이크 벤치와 도시 전망을 즐깁니다.</p>
        <p><strong>카사 바트요 또는 카사 밀라</strong> 외관 — 그라시아 거리를 걷고, <strong>몬주익 언덕</strong>에서 내려다보는 지중해와 항구로 마무리해요.</p>
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal free">석식 · 자유식</span></div>
        <span class="tag-stay">숙박 — 바르셀로나 (2/2박)</span>
      </div>
    </article>

    <article class="day">
      <div class="daykey"><div class="daynum">06<sub>일차</sub></div>
        <ul class="places"><li>발렌시아<span class="lat">Valencia</span></li></ul>
      </div>
      <div class="daybody">
        <h3>바르셀로나 → 발렌시아 (약 350km · 3시간 30분 · 지중해 연안)</h3>
        <p><strong>예술과학도시</strong> — 칼라트라바가 마른 강바닥에 세운 미래 도시예요. <strong>발렌시아 대성당</strong> — 성배 예배당, 미겔레테 종탑을 봅니다.</p>
        <p><strong>중앙시장</strong>과 <strong>라 론하</strong> — 유럽 최대급 모더니즘 시장이에요. 파에야가 태어난 도시라, 저녁은 알부페라 쪽 자유식을 권해 드려요.</p>
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal free">석식 · 자유식</span></div>
        <span class="tag-stay">숙박 — 발렌시아</span>
      </div>
    </article>

    <article class="day">
      <div class="daykey"><div class="daynum">07<sub>일차</sub></div>
        <ul class="places"><li>그라나다<span class="lat">Granada</span></li></ul>
      </div>
      <div class="daybody">
        <h3>발렌시아 → 그라나다 (약 500km · 5시간 · 최장 구간)</h3>
        <p>오전 출발, 중간 휴게하며 이동해요. 차창 밖으로 올리브 밭이 지평선까지 이어집니다.</p>
        <p>도착 후 <strong>산 니콜라스 전망대</strong> — 시에라네바다 설산을 배경으로 한 알함브라의 정면을 봅니다. <strong>알바이신</strong> 백색 골목 — 유네스코 세계유산인 옛 무슬림 거주 구역이에요.</p>
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal free">석식 · 자유식</span></div>
        <span class="tag-stay">숙박 — 그라나다</span>
      </div>
    </article>

    <article class="day">
      <div class="daykey"><div class="daynum">08<sub>일차</sub></div>
        <ul class="places"><li>세비야<span class="lat">Sevilla</span></li></ul>
      </div>
      <div class="daybody">
        <h3>그라나다 → 세비야 (약 250km · 3시간)</h3>
        <p><strong>알함브라 궁전</strong> — 나스르 궁전 지정 시간 입장, 헤네랄리페 정원, 카를로스 5세 궁을 봅니다. 나스르 궁전은 입장 시각이 분 단위로 지정돼서, 이날 오전 일정은 그 시각에 맞춰 짜요.</p>
        <p>오후 세비야로 이동, 과달키비르 강변에서 저녁을 맞습니다.</p>
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal free">석식 · 자유식</span></div>
        <span class="tag-stay">숙박 — 세비야 (1/2박)</span>
      </div>
    </article>

    <article class="day">
      <div class="daykey"><div class="daynum">09<sub>일차</sub></div>
        <ul class="places"><li>세비야 종일<span class="lat">Sevilla</span></li></ul>
      </div>
      <div class="daybody">
        <h3>안달루시아의 심장</h3>
        <p><strong>세비야 대성당</strong>과 히랄다 탑 — 콜럼버스의 관이 있어요. <strong>알카사르</strong> — 무데하르 양식의 왕궁과 정원입니다.</p>
        <p><strong>스페인 광장</strong> — 반원형 회랑과 타일로 새긴 스페인 전 주(州)를 봅니다. 산타크루스 옛 유대인 지구 골목을 지나, 저녁엔 (선택) 플라멩코 공연도 즐기실 수 있어요.</p>
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal free">석식 · 자유식</span></div>
        <span class="tag-stay">숙박 — 세비야 (2/2박)</span>
      </div>
    </article>

    <article class="day">
      <div class="daykey"><div class="daynum">10<sub>일차</sub></div>
        <ul class="places"><li>파티마<span class="lat">Fátima</span></li></ul>
      </div>
      <div class="daybody">
        <h3>세비야 → 파티마 (약 500km · 5시간 30분 · 국경 통과)</h3>
        <p>스페인–포르투갈 국경을 넘어 북상해요. 리스본을 지나쳐 내륙으로 올라갑니다. 여기서부터 시계를 한 시간 뒤로 돌리고, 대서양을 따라 일정이 이어져요.</p>
        <p><strong>파티마 성모 발현 성지</strong> — 발현 소성당, 로사리오 대성당, 삼위일체 성당을 봅니다. 해가 지면 성지 광장에 촛불 행렬이 서요. 신자가 아니어도 오래 남는 장면이에요.</p>
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal free">석식 · 자유식</span></div>
        <span class="tag-stay">숙박 — 파티마</span>
      </div>
    </article>

    <article class="day">
      <div class="daykey"><div class="daynum">11<sub>일차</sub></div>
        <ul class="places"><li>포르투<span class="lat">Porto</span></li></ul>
      </div>
      <div class="daybody">
        <h3>파티마 → 코임브라 → 포르투 (약 185km · 코임브라 경유)</h3>
        <p><strong>코임브라 대학</strong> — 유럽에서 가장 오래된 대학 중 하나예요. <strong>조아니나 도서관</strong> — 금박 서가와, 벌레를 잡기 위해 사는 박쥐들이 있어요.</p>
        <p>오후 포르투 도착. 도루 강이 대서양으로 빠지는 도시예요.</p>
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal free">석식 · 자유식</span></div>
        <span class="tag-stay">숙박 — 포르투 (1/2박)</span>
      </div>
    </article>

    <article class="day">
      <div class="daykey"><div class="daynum">12<sub>일차</sub></div>
        <ul class="places"><li>포르투 종일<span class="lat">Porto</span></li></ul>
      </div>
      <div class="daybody">
        <h3>도루 강의 하루</h3>
        <p><strong>렐루 서점</strong> — 붉은 계단의 네오고딕 서점이에요. <strong>상 벤투 역</strong> — 벽면 2만 장의 아줄레주가 포르투갈 역사를 그립니다.</p>
        <p><strong>동 루이스 1세 다리</strong>와 히베이라 강변 — 유네스코 세계유산 구역이에요. <strong>빌라노바드가이아</strong> 포트와인 셀러 방문과 시음도 함께해요.</p>
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal free">석식 · 자유식</span></div>
        <span class="tag-stay">숙박 — 포르투 (2/2박)</span>
      </div>
    </article>

    <article class="day">
      <div class="daykey"><div class="daynum">13<sub>일차</sub></div>
        <ul class="places"><li>리스본<span class="lat">Lisboa</span></li></ul>
      </div>
      <div class="daybody">
        <h3>포르투 → 리스본 (약 310km · 3시간)</h3>
        <p>오전 이동, 오후 리스본 벨렝 지구로 향합니다. <strong>제로니모스 수도원</strong> — 마누엘 양식의 정점, 바스쿠 다 가마가 잠든 곳이에요.</p>
        <p><strong>벨렝 탑</strong>과 발견 기념비 — 대항해가 시작된 강어귀예요. <strong>파스테이스 드 벨렝</strong> — 1837년부터 같은 자리에서 굽는 에그타르트를 맛봅니다.</p>
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal free">석식 · 자유식</span></div>
        <span class="tag-stay">숙박 — 리스본</span>
      </div>
    </article>

    <article class="day">
      <div class="daykey"><div class="daynum">14<sub>일차</sub></div>
        <ul class="places"><li>리스본 → 인천<span class="lat">Lisboa → Incheon</span></li></ul>
      </div>
      <div class="daybody">
        <h3>수요일, 리스본 출발</h3>
        <p>체크아웃 후 짐은 차량에 싣고 온종일 일정을 소화해요. 비행기가 밤 늦게 뜹니다. <strong>신트라</strong> — 페나 궁전과 헤갈레이라 별장(또는 리스본 시내 알파마·상 조르제 성)을 둘러봐요.</p>
        <p><strong>호카곶</strong> — 유라시아 대륙의 서쪽 끝이에요. "여기서 땅이 끝나고 바다가 시작된다." 저녁 식사 후 리스본 공항으로 이동, 출국 수속을 밟습니다. KE922편, 야간 출발, 직항 약 13시간.</p>
        <div class="meals"><span class="meal">조식</span><span class="meal free">중식 · 자유식</span><span class="meal free">석식 · 자유식</span><span class="meal free">기내식</span></div>
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
          <li><b>차량</b>전 일정 전용 차량 — 공항 픽업부터 샌딩까지</li>
          <li><b>인솔</b>한국인 인솔자 전 일정 동행</li>
          <li><b>숙박</b>호텔 13박 · 2인 1실 기준 · 조식 13회</li>
          <li><b>입장료</b>일정에 명시된 입장료 전부</li>
          <li><b>보험</b>여행자 보험</li>
        </ul>
      </div>
      <div class="card no">
        <h3><span class="pip"></span>불포함 사항</h3>
        <ul>
          <li><b>항공</b>국제선 항공권 — 스케줄 확인은 일정표를 참고해 주세요, 항공사에 직접 문의하시는 게 가장 정확해요</li>
          <li><b>식사</b>조식 외 전 일정 식사 — 중식 · 석식 모두 자유식</li>
          <li><b>개인 경비</b>개인 경비, 기념품</li>
          <li><b>선택 관광</b>플라멩코, 포트와인 셀러 추가 시음 등</li>
          <li><b>팁</b>가이드 · 기사 팁</li>
          <li><b>싱글차지</b>1인 1실 이용 시 별도</li>
        </ul>
      </div>
    </div>
    <p class="note" style="margin-top:16px;">국제선 항공권은 상품에 포함되지 않아요. 위 항공 스케줄을 참고해 직접 발권하시거나, 원하시면 목요일 출발 조건에 맞는 좌석 현황을 확인해 안내해 드려요. 마드리드 IN · 리스본 OUT의 오픈조 항공권으로 예약하셔야 해요.</p>
  </div>
</section>

<section class="notes">
  <div class="wrap">
    <h2 class="display">예약 전 확인해 주십시오</h2>
    <ol>
      <li>본 일정은 <strong>마드리드 IN · 리스본 OUT</strong> 오픈조 항공권 기준이에요. 목요일 출발만 성립해요(귀국은 그다음 주 수요일).</li>
      <li>2026년 9월 21일부터 인천–리스본 노선이 주 4회로 증편될 예정이라, 추가 요일이 공시되면 출발 가능일이 늘어날 수 있어요.</li>
      <li>알함브라 나스르 궁전, 사그라다 파밀리아 등 지정 시각 입장 시설은 예약 상황에 따라 방문 순서가 조정될 수 있어요.</li>
      <li>최소 출발 인원은 4인이에요.</li>
      <li>이동 거리는 실제 도로 기준 근사치예요.</li>
      <li>현지 사정과 기상, 도로 상황, 시설 휴관일에 따라 방문 순서와 내용이 조정될 수 있어요.</li>
      <li>요금과 정확한 출발일은 별도 문의해 주세요.</li>
    </ol>
  </div>
</section>

<section class="cta">
  <div class="wrap">
    <div>
      <div class="label">문의</div>
          <h2 class="display">정확한 견적을 안내해 드려요</h2>
      <p>항공 스케줄은 항공사에 문의하시는 게 가장 정확해요. 스페인 현지에서 직접 운영하므로 일정 변경에도 빠르게 대응해요.</p>
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
    <span>Iberia Grand Tour · 13박 14일</span>
  </div>
</footer>
</div>
`,
      highlights: ['프라도 미술관 · 마드리드 왕궁', '필라르 성모 대성당 · 알하페리아 궁전 (사라고사)', '사그라다 파밀리아 · 구엘 공원 (가우디의 하루)', '예술과학도시 (발렌시아) · 알함브라 궁전 (그라나다)', '세비야 대성당 · 알카사르 · 스페인 광장', '파티마 성지 순례 · 코임브라 대학', '포르투 역사지구 · 포트와인 셀러', '벨렝 지구 · 호카곶 (유라시아 대륙 서쪽 끝)'],
      includes: ['전 일정 전용 차량(공항 픽업~샌딩)', '한국인 인솔자 전 일정 동행', '호텔 13박 · 2인 1실 기준 · 조식 13회', '일정에 명시된 입장료 전부', '여행자 보험'],
      excludes: ['국제선 항공권(마드리드 IN·리스본 OUT 오픈조 별도 안내)', '조식 외 전 일정 식사(중식 · 석식 모두 자유식)', '개인 경비 · 기념품', '선택 관광(플라멩코, 포트와인 셀러 추가 시음 등)', '가이드 · 기사 팁', '싱글차지(1인 1실 이용 시)'],
      duration: '13박 14일 (마드리드 IN · 리스본 OUT · 목요일 출발 · 최소 출발 4인)'
    }
  },
  ];
/* 가격 배지를 두 줄로 나눠 보여줄 때 써요.
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
