/* ============================================================
   공연 일정 자동 채우기
   ------------------------------------------------------------
   - 제미나이(Gemini)에 구글 검색을 붙여, 아래 "허용 공연장" 목록에
     올라 있는 공연장의 앞으로 120일치 공연을 받아옵니다.
   - 받아온 것은 그대로 믿지 않고 한 줄씩 검사합니다.
       · 공연장이 허용 목록에 없으면 버립니다 (지어낸 공연장 차단)
       · 날짜 모양이 다르거나 지난 날짜면 버립니다
       · 장르가 허용 목록에 없으면 버립니다
       · 제목이 없거나 너무 길면 버립니다
   - 요금은 AI 가 가장 자주 틀리는 값이라 화면에 올리지 않습니다.
     (price 를 비워 두면 concert.html 이 "요금 문의" 로 보여 줍니다)
     대쉬보드에서 요금을 직접 넣으시면 그 값은 다음 갱신 때도 지켜 드립니다.
   - 상설 공연(always:true)과 손으로 넣으신 공연은 건드리지 않습니다.
   - netlify.toml 의 schedule 설정으로 주 1회 자동 실행됩니다.
     대쉬보드의 "지금 채우기" 단추는 concerts-now 를 거쳐 이 함수를 부릅니다.

   필요한 환경변수: GEMINI_API_KEY · GITHUB_TOKEN · GITHUB_REPO
============================================================ */

const GEMINI_MODEL = 'gemini-3.5-flash';
const 파일 = 'data/concerts.json';
const 앞으로 = 120;        // 며칠치까지 받아올지
const 최대 = 60;           // 파일에 담을 최대 건수

/* ---------- 허용 공연장 (여기 없는 공연장은 올라오지 않습니다) ---------- */
const 공연장 = {
  '테아트로 레알':                      { city:'마드리드',   country:'스페인' },
  '아우디토리오 나시오날 데 무지카':      { city:'마드리드',   country:'스페인' },
  '테아트로 로페 데 베가':               { city:'마드리드',   country:'스페인' },
  '테아트로 데 라 수르수엘라':            { city:'마드리드',   country:'스페인' },
  '코랄 데 라 모레리아':                 { city:'마드리드',   country:'스페인' },
  '그란 테아트레 델 리세우':              { city:'바르셀로나', country:'스페인' },
  '팔라우 데 라 무지카 카탈라나':         { city:'바르셀로나', country:'스페인' },
  '라우디토리':                         { city:'바르셀로나', country:'스페인' },
  '테아트레 티볼리':                     { city:'바르셀로나', country:'스페인' },
  '타블라오 코르도베스':                 { city:'바르셀로나', country:'스페인' },
  '테아트로 데 라 마에스트란사':          { city:'세비야',     country:'스페인' },
  '로스 가요스':                        { city:'세비야',     country:'스페인' },
  '푼다상 굴벤키안 대공연장':             { city:'리스본',     country:'포르투갈' },
  '테아트루 나시오날 드 상 카를루스':      { city:'리스본',     country:'포르투갈' },
  '클루베 드 파두':                      { city:'리스본',     country:'포르투갈' },
  '카사 다 무지카':                      { city:'포르투',     country:'포르투갈' },
  '테아트루 히바르타':                   { city:'포르투',     country:'포르투갈' },
  '카사 다 마리키냐스':                  { city:'포르투',     country:'포르투갈' },
};

const 장르목록 = ['플라멩코','파두','오페라','뮤지컬','오케스트라','발레','클래식'];

/* ---------- 작은 도구들 ---------- */
function 오늘() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Madrid', year:'numeric', month:'2-digit', day:'2-digit'
  }).format(new Date());
}
function 더한날(ymd, 일수) {
  const d = new Date(ymd + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + 일수);
  return d.toISOString().slice(0, 10);
}
function 글자(v, 최대길이) {
  return String(v == null ? '' : v).replace(/\s+/g, ' ').trim().slice(0, 최대길이);
}
/* 응답 글 안에서 첫 번째 JSON 배열만 꺼냅니다 */
function 배열읽기(글) {
  if (!글) return [];
  const 시작 = 글.indexOf('[');
  if (시작 < 0) return [];
  let 깊이 = 0;
  for (let i = 시작; i < 글.length; i++) {
    if (글[i] === '[') 깊이++;
    else if (글[i] === ']') {
      깊이--;
      if (깊이 === 0) {
        try { return JSON.parse(글.slice(시작, i + 1)); } catch (e) { return []; }
      }
    }
  }
  return [];
}
function 열쇠(c) {
  return (c.date || '') + '|' + 글자(c.venue, 60) + '|' + 글자(c.title, 60);
}

/* ---------- 제미나이에게 물어볼 말 ---------- */
function 프롬프트(시작일, 끝일) {
  const 목록 = Object.keys(공연장)
    .map(v => `- ${v} (${공연장[v].city})`).join('\n');
  return `당신은 스페인·포르투갈 공연 일정을 정리하는 조사원입니다.
구글 검색으로 각 공연장의 공식 홈페이지와 공식 예매처를 확인해,
${시작일} 부터 ${끝일} 까지 실제로 열리는 공연을 모아 주세요.

[조사할 공연장 — 이 목록에 있는 곳만]
${목록}

[규칙]
1. 공식 자료에서 날짜를 확인한 공연만 넣습니다. 확실하지 않으면 넣지 마세요.
2. 같은 공연이 여러 날 열리면 그 기간의 첫 공연일 하나만 넣고, until 에 마지막 공연일을 적습니다.
3. 타블라오·파두 하우스처럼 거의 매일 여는 상설 공연은 넣지 마세요. 따로 관리합니다.
4. 장르는 다음 중 하나만 씁니다: ${장르목록.join(' / ')}
5. 공연 제목·출연진은 한국어로 적되, 사람·단체 이름은 한국어 표기를 쓰세요.
6. 요금은 적지 마세요.
7. 아래 JSON 배열만 출력하고 다른 말은 쓰지 마세요. 최대 ${최대}개.

[출력 형식]
[
  {
    "date": "YYYY-MM-DD",
    "until": "YYYY-MM-DD 또는 빈 문자열",
    "time": "HH:MM 또는 빈 문자열",
    "venue": "위 목록에 적힌 공연장 이름 그대로",
    "title": "공연 제목 (한국어)",
    "genre": "${장르목록.join(' 또는 ')}",
    "company": "작곡가·지휘자·출연진 등 한 줄 (한국어)",
    "note": "시즌·공연 기간 등 참고 한 줄"
  }
]`;
}

/* ---------- 받아온 줄을 하나씩 검사 ---------- */
function 걸러내기(받은것, 시작일, 끝일) {
  const 결과 = [];
  const 본것 = new Set();
  const 모양 = /^\d{4}-\d{2}-\d{2}$/;

  for (const r of Array.isArray(받은것) ? 받은것 : []) {
    if (!r || typeof r !== 'object') continue;

    const venue = 글자(r.venue, 60);
    const 정보 = 공연장[venue];
    if (!정보) continue;                                   /* 허용 목록 밖 공연장 */

    const date = 글자(r.date, 10);
    if (!모양.test(date) || date < 시작일 || date > 끝일) continue;

    let until = 글자(r.until, 10);
    if (until && (!모양.test(until) || until < date)) until = '';

    const title = 글자(r.title, 120);
    if (title.length < 2) continue;

    const genre = 글자(r.genre, 20);
    if (장르목록.indexOf(genre) < 0) continue;

    let time = 글자(r.time, 5);
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) time = '';

    const 줄 = {
      date, time,
      country: 정보.country,
      city: 정보.city,
      venue,
      title,
      genre,
      price: '',                                           /* 요금은 올리지 않습니다 */
      link: '',
      company: 글자(r.company, 300),
      note: 글자(r.note, 200),
      tags: [],
      seat: '',
      auto: true,
    };
    if (until) 줄.until = until;

    const k = 열쇠(줄);
    if (본것.has(k)) continue;
    본것.add(k);
    결과.push(줄);
  }
  return 결과;
}

/* ---------- 예전 것과 합치기 ---------- */
function 합치기(예전, 새것, 시작일) {
  const 살아있나 = (c) => {
    if (c.always) return true;
    const 끝 = 글자(c.until, 10) || 글자(c.date, 10);
    return 끝 >= 시작일;
  };

  /* 상설 공연과 손으로 넣으신 공연은 그대로 둡니다 */
  const 지킬것 = 예전.filter(c => c && c.date && !c.auto && 살아있나(c));

  /* 예전 자동분에서 대쉬보드에 손대신 값(요금·예매링크·좌석)은 물려받습니다 */
  const 손댄값 = {};
  예전.forEach(c => {
    if (c && c.auto && (c.price || c.link || c.seat)) {
      손댄값[열쇠(c)] = { price: c.price || '', link: c.link || '', seat: c.seat || '' };
    }
  });

  const 이미 = new Set(지킬것.map(열쇠));
  const 더할것 = [];
  for (const c of 새것) {
    const k = 열쇠(c);
    if (이미.has(k)) continue;                              /* 손으로 넣으신 것이 우선 */
    이미.add(k);
    if (손댄값[k]) Object.assign(c, 손댄값[k]);
    더할것.push(c);
  }

  return 지킬것.concat(더할것)
    .sort((a, b) => {
      if (!!a.always !== !!b.always) return a.always ? -1 : 1;
      return String(a.date).localeCompare(String(b.date)) ||
             String(a.time || '').localeCompare(String(b.time || ''));
    })
    .slice(0, 최대);
}

/* ---------- 본체 ---------- */
exports.handler = async () => {
  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const GITHUB_TOKEN   = process.env.GITHUB_TOKEN;
    const REPO           = process.env.GITHUB_REPO;

    if (!GEMINI_API_KEY) return 답(500, { ok:false, error:'GEMINI_API_KEY 가 설정되어 있지 않습니다' });
    if (!GITHUB_TOKEN || !REPO) return 답(500, { ok:false, error:'GITHUB_TOKEN 또는 GITHUB_REPO 가 설정되어 있지 않습니다' });

    const 시작일 = 오늘();
    const 끝일 = 더한날(시작일, 앞으로);
    console.log('공연 조사 기간:', 시작일, '~', 끝일);

    /* 1. 제미나이 + 구글 검색 */
    const gRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 프롬프트(시작일, 끝일) }] }],
          tools: [{ google_search: {} }],
          generationConfig: { temperature: 0.2, maxOutputTokens: 8192 },
        }),
      });

    const gJson = await gRes.json();
    if (!gRes.ok) {
      const msg = gJson && gJson.error ? gJson.error.message : '알 수 없는 오류';
      console.error('제미나이 응답 실패:', msg);
      return 답(502, { ok:false, error:'제미나이 응답을 받지 못했습니다: ' + msg });
    }

    const parts = gJson.candidates && gJson.candidates[0] &&
                  gJson.candidates[0].content && gJson.candidates[0].content.parts;
    const 본문 = (parts || []).map(p => p && p.text).filter(Boolean).join('\n');
    const 받은것 = 배열읽기(본문);
    console.log('제미나이가 보내온 건수:', 받은것.length);

    const 새것 = 걸러내기(받은것, 시작일, 끝일);
    console.log('검사를 통과한 건수:', 새것.length);

    if (!새것.length) {
      return 답(200, { ok:false, changed:false,
        error:'검사를 통과한 공연이 없습니다. 잠시 뒤 다시 눌러 주세요.',
        받음: 받은것.length });
    }

    /* 2. 지금 파일 읽기 */
    const getRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${파일}`, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: 'application/vnd.github+json' },
    });
    const getData = await getRes.json();
    if (!getData.content) {
      console.error('파일 조회 실패:', JSON.stringify(getData));
      return 답(500, { ok:false, error:'data/concerts.json 을 읽지 못했습니다', detail: getData });
    }
    let 예전 = [];
    try { 예전 = JSON.parse(Buffer.from(getData.content, 'base64').toString('utf-8')); }
    catch (e) { 예전 = []; }
    if (!Array.isArray(예전)) 예전 = [];

    /* 3. 합치기 */
    const 합친것 = 합치기(예전, 새것, 시작일);
    const 새글 = JSON.stringify(합친것, null, 1) + '\n';
    const 옛글 = Buffer.from(getData.content, 'base64').toString('utf-8');
    if (새글 === 옛글) {
      console.log('바뀐 것이 없습니다');
      return 답(200, { ok:true, changed:false, 전체: 합친것.length, 새로추가: 0 });
    }

    /* 4. 저장 */
    const putRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${파일}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: 'application/vnd.github+json' },
      body: JSON.stringify({
        message: `자동 업데이트: 공연 일정 (${시작일})`,
        content: Buffer.from(새글, 'utf-8').toString('base64'),
        sha: getData.sha,
        branch: 'main',
      }),
    });
    const putData = await putRes.json();
    if (!putRes.ok) {
      console.error('저장 실패:', JSON.stringify(putData));
      return 답(500, { ok:false, error:'data/concerts.json 저장에 실패했습니다', detail: putData });
    }

    const 자동수 = 합친것.filter(c => c.auto).length;
    console.log('저장 완료 — 전체', 합친것.length, '건 (자동', 자동수, '건)');
    return 답(200, {
      ok: true, changed: true,
      전체: 합친것.length,
      자동: 자동수,
      받음: 받은것.length,
      걸러냄: 받은것.length - 새것.length,
      message: `공연 ${합친것.length}건을 올렸습니다 (자동 ${자동수}건). 1~2분 뒤 사이트에 보입니다.`,
    });
  } catch (err) {
    console.error('예외 발생:', err && err.message);
    return 답(500, { ok:false, error: (err && err.message) || '알 수 없는 오류' });
  }
};

function 답(status, body) {
  return {
    statusCode: status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
    body: JSON.stringify(body),
  };
}
