/* ============================================================
   라리가 경기 일정 자동 업데이트 함수
   - football-data.org에서 최신 경기 일정을 가져와요
   - 지금 사이트에 경기장 정보가 있는 10개 구단 경기만 골라요
     (레알 마드리드/아틀레티코 마드리드/바르셀로나/에스파뇰/
      세비야/베티스/발렌시아/빌바오/레알 소시에다드/비야레알)
   - 기존에 손으로 입력해둔 가격(from)·좌석상태(seats)는
     최대한 그대로 유지하고, 새 경기만 추가/갱신해요
   - netlify.toml의 schedule 설정으로 매주 자동 실행돼요
============================================================ */

// football-data.org 영문 팀명 → 우리 사이트 slug(경기장) + 한국어 팀명
const CLUB_MAP = {
  'Real Madrid CF':        { venue: 'bernabeu',      name: '레알 마드리드' },
  'Club Atlético de Madrid': { venue: 'metropolitano', name: '아틀레티코 마드리드' },
  'FC Barcelona':           { venue: 'campnou',       name: 'FC 바르셀로나' },
  'RCD Espanyol de Barcelona': { venue: 'rcde',        name: 'RCD 에스파뇰' },
  'Sevilla FC':             { venue: 'pizjuan',       name: '세비야 FC' },
  'Real Betis Balompié':    { venue: 'villamarin',    name: '레알 베티스' },
  'Valencia CF':            { venue: 'mestalla',      name: '발렌시아 CF' },
  'Athletic Club':          { venue: 'sanmames',      name: '아틀레틱 클루브' },
  'Real Sociedad de Fútbol': { venue: 'realearena',    name: '레알 소시에다드' },
  'Villarreal CF':          { venue: 'ceramica',      name: '비야레알 CF' },
};

function toMadridDateTime(utcDate, status) {
  const d = new Date(utcDate);
  const dateStr = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid', year:'numeric', month:'2-digit', day:'2-digit' }).format(d);
  if (status === 'TIMED' || status === 'IN_PLAY' || status === 'FINISHED') {
    const timeStr = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', hour:'2-digit', minute:'2-digit', hour12:false }).format(d);
    return { date: dateStr, time: timeStr };
  }
  return { date: dateStr, time: '미정' };
}

function parseOldMatches(html) {
  const map = {};
  const arrMatch = html.match(/const MATCHES = \[([\s\S]*?)\];/);
  if (!arrMatch) return map;
  const blocks = arrMatch[1].match(/\{[^}]*\}/g) || [];
  for (const block of blocks) {
    const get = (key) => {
      const m = block.match(new RegExp(key + ":\\s*'([^']*)'"));
      return m ? m[1] : null;
    };
    const getNum = (key) => {
      const m = block.match(new RegExp(key + ':\\s*(\\d+)'));
      return m ? Number(m[1]) : null;
    };
    const date = get('date'), home = get('home'), away = get('away');
    if (!date || !home || !away) continue;
    const key = `${date}|${home}|${away}`;
    map[key] = { from: getNum('from') ?? 0, seats: get('seats') || 'ok' };
  }
  return map;
}

function buildMatchesArray(apiMatches, oldMap) {
  const lines = [];
  let n = 1;
  for (const m of apiMatches) {
    const homeInfo = CLUB_MAP[m.homeTeam.name];
    if (!homeInfo) continue; // 아직 경기장 정보 없는 구단은 건너뜀
    const awayName = CLUB_MAP[m.awayTeam.name] ? CLUB_MAP[m.awayTeam.name].name : m.awayTeam.name;
    const { date, time } = toMadridDateTime(m.utcDate, m.status);
    const key = `${date}|${homeInfo.name}|${awayName}`;
    const prev = oldMap[key] || { from: 0, seats: 'ok' };
    const id = 'm' + String(n).padStart(2, '0');
    n++;
    lines.push(
      `  { id:'${id}', date:'${date}', time:'${time}', round:'${m.matchday}라운드', venue:'${homeInfo.venue}',\n` +
      `    home:'${homeInfo.name}', away:'${awayName}', from:${prev.from}, seats:'${prev.seats}' },`
    );
  }
  return `const MATCHES = [\n${lines.join('\n')}\n];`;
}

exports.handler = async () => {
  try {
    const FOOTBALL_KEY = process.env.FOOTBALL_DATA_API_KEY;
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const REPO = process.env.GITHUB_REPO; // 예: euforia-jpg/ornate-chebakia-a4180f

    console.log('환경변수 확인:', {
      hasFootballKey: !!FOOTBALL_KEY,
      hasGithubToken: !!GITHUB_TOKEN,
      repo: REPO
    });

    // 1. 최신 라리가 경기 일정 가져오기 (오늘부터 100일치)
    const dateFrom = new Date().toISOString().slice(0, 10);
    const dateTo = new Date(Date.now() + 100 * 24 * 3600 * 1000).toISOString().slice(0, 10);
    console.log('football-data.org 요청:', dateFrom, '~', dateTo);
    const fdRes = await fetch(`https://api.football-data.org/v4/competitions/PD/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`, {
      headers: { 'X-Auth-Token': FOOTBALL_KEY }
    });
    console.log('football-data.org 응답 상태:', fdRes.status);
    const fdData = await fdRes.json();
    if (!fdData.matches) {
      console.error('football-data.org 응답 이상:', JSON.stringify(fdData));
      return { statusCode: 500, body: JSON.stringify({ ok:false, error:'football-data.org 응답 이상', detail: fdData }) };
    }
    console.log('가져온 전체 경기 수:', fdData.matches.length);

    // 2. GitHub에서 현재 matchday.html 가져오기
    const ghGetRes = await fetch(`https://api.github.com/repos/${REPO}/contents/matchday.html`, {
      headers: { 'Authorization': `Bearer ${GITHUB_TOKEN}`, 'Accept': 'application/vnd.github+json' }
    });
    console.log('GitHub 파일 조회 응답 상태:', ghGetRes.status);
    const ghGetData = await ghGetRes.json();
    if (!ghGetData.content) {
      console.error('GitHub 파일 조회 실패:', JSON.stringify(ghGetData));
      return { statusCode: 500, body: JSON.stringify({ ok:false, error:'GitHub 파일 조회 실패', detail: ghGetData }) };
    }
    const html = Buffer.from(ghGetData.content, 'base64').toString('utf-8');

    // 3. 기존 가격/좌석상태 보존하면서 새 배열 생성
    const oldMap = parseOldMatches(html);
    const newArrayText = buildMatchesArray(fdData.matches, oldMap);
    console.log('필터링 후 우리 구단 경기 수:', (newArrayText.match(/\{ id:/g) || []).length);
    const newHtml = html.replace(/const MATCHES = \[[\s\S]*?\];/, newArrayText);

    if (newHtml === html) {
      console.log('변경사항 없음 (이미 최신 상태)');
      return { statusCode: 200, body: JSON.stringify({ ok:true, changed:false }) };
    }

    // 4. GitHub에 커밋
    const ghPutRes = await fetch(`https://api.github.com/repos/${REPO}/contents/matchday.html`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${GITHUB_TOKEN}`, 'Accept': 'application/vnd.github+json' },
      body: JSON.stringify({
        message: `자동 업데이트: 라리가 경기 일정 (${new Date().toISOString().slice(0,10)})`,
        content: Buffer.from(newHtml, 'utf-8').toString('base64'),
        sha: ghGetData.sha,
        branch: 'main'
      })
    });
    console.log('GitHub 커밋 응답 상태:', ghPutRes.status);
    const ghPutData = await ghPutRes.json();
    if (!ghPutRes.ok) {
      console.error('GitHub 커밋 실패:', JSON.stringify(ghPutData));
      return { statusCode: 500, body: JSON.stringify({ ok:false, error:'GitHub 커밋 실패', detail: ghPutData }) };
    }

    console.log('커밋 성공!');
    return { statusCode: 200, body: JSON.stringify({ ok:true, changed:true }) };
  } catch (err) {
    console.error('예외 발생:', err.message);
    return { statusCode: 500, body: JSON.stringify({ ok:false, error: err.message }) };
  }
};
