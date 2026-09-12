/*
  ===========================================================
  유포리아투어 관리자 API
  -----------------------------------------------------------
  admin.html 에서만 호출하는 백엔드예요.
  비밀번호 확인 → GitHub 파일 읽기 → 수정본 커밋 → Netlify 자동 배포
  까지를 한 함수에서 처리합니다.

  Netlify 환경변수 (사이트 설정 → Environment variables)
    ADMIN_PASSWORD   대쉬보드 로그인 비밀번호
    ADMIN_SECRET     로그인 토큰 서명용 임의 문자열 (길고 복잡하게)
    GITHUB_TOKEN     GitHub 개인 액세스 토큰 (이 저장소 Contents 읽기/쓰기)
    GITHUB_REPO      예: euforia-jpg/ornate-chebakia-a4180f
    GITHUB_BRANCH    예: main   (없으면 main)
    NETLIFY_BUILD_HOOK  (선택) 수동 재배포용 빌드 훅 주소

  ※ 비밀번호와 토큰은 절대 admin.html 에 넣지 않습니다.
     브라우저로 내려가는 파일에 적으면 누구나 볼 수 있어요.
  ===========================================================
*/

const crypto = require('crypto');

const GH   = 'https://api.github.com';
const REPO = process.env.GITHUB_REPO || '';
const BR   = process.env.GITHUB_BRANCH || 'main';

/* 관리할 파일 목록 — 여기 없는 경로는 건드리지 못하게 막아요 */
const FILES = {
  products: 'products.js',
  concerts: 'data/concerts.json',
  fares:    'data/fares.json',
};

/* ---------------------------------------------------------- 공통 */

function json(status, body) {
  return {
    statusCode: status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
    body: JSON.stringify(body),
  };
}

/* 로그인 토큰 만들기 — 만료시각을 비밀키로 서명해 둡니다 */
function makeToken(hours) {
  const secret = process.env.ADMIN_SECRET;
  const exp = Date.now() + hours * 3600 * 1000;
  const sig = crypto.createHmac('sha256', secret).update(String(exp)).digest('hex');
  return exp + '.' + sig;
}

function checkToken(token) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || !token || token.indexOf('.') === -1) return false;
  const [exp, sig] = token.split('.');
  if (!/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;
  const want = crypto.createHmac('sha256', secret).update(exp).digest('hex');
  // 길이가 다르면 timingSafeEqual 이 예외를 내므로 먼저 걸러요
  if (want.length !== sig.length) return false;
  return crypto.timingSafeEqual(Buffer.from(want), Buffer.from(sig));
}

/* 비밀번호 비교도 시간차 공격을 막기 위해 고정시간 비교로 합니다 */
function samePassword(input) {
  const real = process.env.ADMIN_PASSWORD || '';
  const a = crypto.createHash('sha256').update(String(input || '')).digest();
  const b = crypto.createHash('sha256').update(real).digest();
  return real.length > 0 && crypto.timingSafeEqual(a, b);
}

/* ---------------------------------------------------------- GitHub */

async function gh(path, options) {
  const res = await fetch(GH + path, Object.assign({
    headers: {
      /* 붙여넣을 때 딸려 오는 공백·줄바꿈이 있으면 GitHub 이 401 을 냅니다. 미리 털어내요. */
      Authorization: 'Bearer ' + String(process.env.GITHUB_TOKEN || '').trim(),
      Accept: 'application/vnd.github+json',
      'User-Agent': 'euforia-admin',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  }, options || {}));
  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch (e) { data = { raw: text }; }
  if (!res.ok) {
    const msg = (data && data.message) || ('GitHub ' + res.status);
    const err = new Error(msg);
    err.status = res.status;
    throw err;
  }
  return data;
}

async function readFile(path) {
  const enc = encodeURIComponent(path);
  const data = await gh(`/repos/${REPO}/contents/${enc}?ref=${encodeURIComponent(BR)}`);
  return {
    sha: data.sha,
    content: Buffer.from(data.content || '', 'base64').toString('utf8'),
  };
}

async function writeFile(path, content, message, sha) {
  const enc = encodeURIComponent(path);
  return gh(`/repos/${REPO}/contents/${enc}`, {
    method: 'PUT',
    body: JSON.stringify({
      message,
      content: Buffer.from(content, 'utf8').toString('base64'),
      branch: BR,
      sha: sha || undefined,
    }),
  });
}

/* ---------------------------------------------------------- products.js */

/*
  products.js 는 [주석 + const PRODUCTS = [...] + 도우미 함수들] 구조예요.
  배열 부분만 정확히 갈아끼우고 나머지는 글자 하나 건드리지 않습니다.
*/
const START = 'const PRODUCTS = [';

function sliceProducts(src) {
  const a = src.indexOf(START);
  if (a === -1) throw new Error('products.js 에서 PRODUCTS 배열을 찾지 못했습니다');
  const m = /\n\];\s*\n/.exec(src.slice(a));
  if (!m) throw new Error('products.js 에서 PRODUCTS 배열의 끝을 찾지 못했습니다');
  return { head: src.slice(0, a), body: src.slice(a, a + m.index + m[0].length), tail: src.slice(a + m.index + m[0].length) };
}

function parseProducts(src) {
  const { body } = sliceProducts(src);
  const arr = body.slice(body.indexOf('['), body.lastIndexOf(']') + 1);
  // 데이터 배열이라 Function 으로 평가해도 안전합니다 (저장소 안의 우리 파일)
  const out = new Function('return (' + arr + ');')();
  if (!Array.isArray(out)) throw new Error('PRODUCTS 가 배열이 아닙니다');
  return out;
}

function buildProducts(src, products) {
  const { head, tail } = sliceProducts(src);
  return head + 'const PRODUCTS = ' + JSON.stringify(products, null, 2) + ';\n' + tail;
}

/* ---------------------------------------------------------- 본체 */

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') return json(405, { error: 'POST 만 받습니다' });

  for (const k of ['ADMIN_PASSWORD', 'ADMIN_SECRET', 'GITHUB_TOKEN', 'GITHUB_REPO']) {
    if (!process.env[k]) return json(500, { error: '환경변수 ' + k + ' 가 설정되지 않았습니다' });
  }

  let req;
  try { req = JSON.parse(event.body || '{}'); }
  catch (e) { return json(400, { error: '요청 형식이 올바르지 않습니다' }); }

  const action = req.action;

  /* --- 로그인 --- */
  if (action === 'login') {
    if (!samePassword(req.password)) return json(401, { error: '비밀번호가 맞지 않습니다' });
    return json(200, { token: makeToken(8), expiresInHours: 8 });
  }

  /* --- 이후 모든 요청은 토큰이 있어야 합니다 --- */
  if (!checkToken(req.token)) {
    return json(401, { error: '로그인이 만료되었습니다. 다시 로그인해 주세요.' });
  }

  try {
    /* --- 불러오기 --- */
    if (action === 'load') {
      const path = FILES[req.file];
      if (!path) return json(400, { error: '알 수 없는 파일입니다' });

      let file;
      try {
        file = await readFile(path);
      } catch (e) {
        // 아직 없는 파일(공연·요금)은 빈 목록으로 시작합니다
        if (e.status === 404) return json(200, { items: [], sha: null, isNew: true });
        throw e;
      }

      if (req.file === 'products') {
        return json(200, { items: parseProducts(file.content), sha: file.sha });
      }
      return json(200, { items: JSON.parse(file.content || '[]'), sha: file.sha });
    }

    /* --- 진단 --- */
    /*
      GitHub 토큰이 왜 거부되는지 짚어 줍니다.
      토큰 값 자체는 절대 돌려주지 않고, 길이·앞부분·공백 여부만 알려 줘요.
    */
    if (action === 'ping') {
      const raw = process.env.GITHUB_TOKEN || '';
      const tok = raw.trim();
      const out = {
        길이: raw.length,
        앞부분: tok.slice(0, 11) + '…',
        앞뒤공백: raw !== tok ? '있음 — 이게 원인일 가능성이 큽니다' : '없음',
        줄바꿈포함: /[\r\n]/.test(raw) ? '있음 — 이게 원인일 가능성이 큽니다' : '없음',
        토큰종류: tok.startsWith('github_pat_') ? 'Fine-grained'
                : tok.startsWith('ghp_') ? 'Classic'
                : '알 수 없음 — 토큰이 아닌 값이 들어갔을 수 있습니다',
        저장소설정: REPO,
        브랜치: BR,
      };

      /* 1) 토큰이 GitHub 에서 인정되는지 */
      try {
        const me = await gh('/user');
        out.토큰확인 = '정상 — 계정: ' + me.login;
      } catch (e) {
        out.토큰확인 = '실패 (' + (e.status || '?') + ') ' + e.message;
        return json(200, { diag: out });
      }

      /* 2) 그 토큰으로 이 저장소에 닿는지 */
      try {
        const r = await gh('/repos/' + REPO);
        out.저장소확인 = '정상 — ' + r.full_name + (r.private ? ' (비공개)' : ' (공개)');
        out.쓰기권한 = r.permissions && r.permissions.push ? '있음' : '없음 — Contents 를 Read and write 로 바꿔 주세요';
      } catch (e) {
        out.저장소확인 = '실패 (' + (e.status || '?') + ') ' + e.message;
      }

      /* 3) 실제로 고칠 파일이 보이는지 */
      try {
        await readFile(FILES.products);
        out.파일확인 = 'products.js 읽기 정상';
      } catch (e) {
        out.파일확인 = '실패 (' + (e.status || '?') + ') ' + e.message;
      }

      return json(200, { diag: out });
    }

    /* --- 저장 (= 커밋 → Netlify 자동 배포) --- */
    if (action === 'save') {
      const path = FILES[req.file];
      if (!path) return json(400, { error: '알 수 없는 파일입니다' });
      if (!Array.isArray(req.items)) return json(400, { error: '저장할 내용이 배열이 아닙니다' });

      const note = String(req.note || '').slice(0, 80);
      let content, sha = null;

      if (req.file === 'products') {
        const cur = await readFile(path);
        sha = cur.sha;
        // 다른 사람이 그 사이에 고쳤으면 덮어쓰지 않고 알려줍니다
        if (req.sha && req.sha !== cur.sha) {
          return json(409, { error: '그 사이 파일이 변경되었습니다. 새로고침 후 다시 시도해 주세요.', sha: cur.sha });
        }
        content = buildProducts(cur.content, req.items);
      } else {
        try {
          const cur = await readFile(path);
          sha = cur.sha;
          if (req.sha && req.sha !== cur.sha) {
            return json(409, { error: '그 사이 파일이 변경되었습니다. 새로고침 후 다시 시도해 주세요.', sha: cur.sha });
          }
        } catch (e) {
          if (e.status !== 404) throw e;   // 없으면 새로 만듭니다
        }
        content = JSON.stringify(req.items, null, 2) + '\n';
      }

      const label = { products: '여행상품', concerts: '공연 일정', fares: '교통 요금표' }[req.file];
      const msg = `[관리자] ${label} 수정${note ? ' — ' + note : ''}`;
      const res = await writeFile(path, content, msg, sha);

      return json(200, {
        ok: true,
        sha: res.content && res.content.sha,
        commit: res.commit && res.commit.sha ? res.commit.sha.slice(0, 7) : null,
        message: '저장했습니다. 1~2분 뒤 사이트에 반영됩니다.',
      });
    }

    /* --- 변경 이력 --- */
    if (action === 'history') {
      const path = FILES[req.file] || '';
      const q = path ? '&path=' + encodeURIComponent(path) : '';
      const list = await gh(`/repos/${REPO}/commits?sha=${encodeURIComponent(BR)}&per_page=15${q}`);
      return json(200, {
        commits: list.map(function (c) {
          return {
            sha: c.sha.slice(0, 7),
            message: (c.commit.message || '').split('\n')[0],
            author: (c.commit.author && c.commit.author.name) || '',
            date: c.commit.author && c.commit.author.date,
            url: c.html_url,
          };
        }),
      });
    }

    /* --- 수동 재배포 --- */
    if (action === 'deploy') {
      const hook = process.env.NETLIFY_BUILD_HOOK;
      if (!hook) return json(400, { error: '빌드 훅(NETLIFY_BUILD_HOOK)이 설정되지 않았습니다' });
      const r = await fetch(hook, { method: 'POST' });
      if (!r.ok) return json(502, { error: '배포 요청이 실패했습니다 (' + r.status + ')' });
      return json(200, { ok: true, message: '재배포를 요청했습니다.' });
    }

    return json(400, { error: '알 수 없는 요청입니다' });

  } catch (e) {
    return json(e.status === 404 ? 404 : 500, { error: e.message || '처리 중 오류가 발생했습니다' });
  }
};
