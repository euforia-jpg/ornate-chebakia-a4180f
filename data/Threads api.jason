/*
  ===========================================================
  유포리아투어 쓰레드(Threads) 광고 — 전용 백엔드
  -----------------------------------------------------------
  ★ 다른 기능과 완전히 분리되어 있습니다 ★

    · GitHub 토큰을 쓰지 않습니다 (저장소에 아무것도 쓰지 않아요)
    · 축구 API 키를 쓰지 않습니다
    · 이 함수가 죽어도 대쉬보드의 다른 탭과 사이트는 멀쩡합니다
    · 반대로 GITHUB_TOKEN 이 만료돼도 쓰레드 발행은 계속 됩니다

  발행 이력은 저장소에 남기지 않고 쓰레드에서 직접 읽어옵니다.
  그래서 이 기능에 필요한 열쇠는 아래 세 개뿐입니다.

  Netlify 환경변수 (전부 THREADS_ 로 시작)
    THREADS_USER_ID        쓰레드 사용자 ID (숫자)
    THREADS_TOKEN          장기 액세스 토큰 (60일마다 갱신 필요)
    THREADS_TOKEN_ISSUED   토큰 발급일 YYYY-MM-DD (남은 기간 계산용, 선택)

  로그인 확인만 관리자 대쉬보드와 공유합니다 (ADMIN_SECRET).
  대쉬보드에 로그인한 사람만 이 함수를 부를 수 있게 하기 위해서예요.
  ===========================================================
*/

const crypto = require('crypto');

const API = 'https://graph.threads.net/v1.0';
const TOKEN_DAYS = 60;          // 장기 토큰 유효기간
const WARN_DAYS  = 14;          // 이 날짜 아래로 남으면 경고

function json(status, body) {
  return {
    statusCode: status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
    body: JSON.stringify(body),
  };
}

/* 대쉬보드 로그인 토큰 확인 — admin-api 가 발급한 것과 같은 방식 */
function checkToken(token) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || !token || token.indexOf('.') === -1) return false;
  const [exp, sig] = token.split('.');
  if (!/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;
  const want = crypto.createHmac('sha256', secret).update(exp).digest('hex');
  if (want.length !== sig.length) return false;
  return crypto.timingSafeEqual(Buffer.from(want), Buffer.from(sig));
}

const tok = () => String(process.env.THREADS_TOKEN || '').trim();
const uid = () => String(process.env.THREADS_USER_ID || '').trim();

async function th(path, params, method) {
  const q = new URLSearchParams(Object.assign({ access_token: tok() }, params || {}));
  const res = await fetch(API + path + '?' + q.toString(), { method: method || 'GET' });
  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch (e) { data = { raw: text }; }
  if (!res.ok) {
    const m = (data && data.error && data.error.message) || ('Threads ' + res.status);
    const err = new Error(m);
    err.status = res.status;
    throw err;
  }
  return data;
}

/* 토큰 발급일로부터 남은 날짜를 셉니다 */
function daysLeft() {
  const issued = String(process.env.THREADS_TOKEN_ISSUED || '').trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(issued)) return null;
  const gone = Math.floor((Date.now() - new Date(issued + 'T00:00:00Z').getTime()) / 86400000);
  return TOKEN_DAYS - gone;
}

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') return json(405, { error: 'POST 만 받습니다' });

  let req;
  try { req = JSON.parse(event.body || '{}'); }
  catch (e) { return json(400, { error: '요청 형식이 올바르지 않습니다' }); }

  if (!checkToken(req.token)) {
    return json(401, { error: '로그인이 만료되었습니다. 다시 로그인해 주세요.' });
  }

  /* 쓰레드 열쇠가 없으면 여기서 멈춥니다. 다른 기능에는 영향이 없어요. */
  for (const k of ['THREADS_USER_ID', 'THREADS_TOKEN']) {
    if (!process.env[k]) {
      return json(503, {
        error: '쓰레드가 아직 연결되지 않았습니다',
        detail: '환경변수 ' + k + ' 가 설정되지 않았습니다. 설치안내의 쓰레드 항목을 참고해 주세요.',
        notConnected: true,
      });
    }
  }

  try {
    /* ---------- 연결 확인 ---------- */
    if (req.action === 'check') {
      const me = await th('/me', { fields: 'id,username' });
      const left = daysLeft();
      return json(200, {
        ok: true,
        username: me.username,
        userId: me.id,
        matchesEnv: String(me.id) === uid(),
        tokenDaysLeft: left,
        tokenWarn: left !== null && left <= WARN_DAYS,
        tokenLen: tok().length,
      });
    }

    /* ---------- 게시 ---------- */
    /*
      쓰레드는 두 번에 나눠 올립니다.
        1) 글 상자(container)를 만들고  2) 그 상자를 발행합니다.
      글만 올릴 때는 두 단계를 바로 이어서 해도 됩니다(사진·영상은 처리 시간이 필요).
    */
    if (req.action === 'publish') {
      const text = String(req.text || '').trim();
      if (!text) return json(400, { error: '올릴 내용이 비어 있습니다' });
      if (text.length > 500) {
        return json(400, { error: '쓰레드는 500자까지입니다. 현재 ' + text.length + '자입니다.' });
      }

      const box = await th('/' + uid() + '/threads', { media_type: 'TEXT', text }, 'POST');
      if (!box || !box.id) throw new Error('쓰레드가 글 상자를 만들어 주지 않았습니다');

      const out = await th('/' + uid() + '/threads_publish', { creation_id: box.id }, 'POST');
      return json(200, { ok: true, id: out && out.id, message: '쓰레드에 올렸습니다.' });
    }

    /* ---------- 발행 이력 (쓰레드에서 직접 읽음) ---------- */
    if (req.action === 'history') {
      const list = await th('/' + uid() + '/threads', {
        fields: 'id,text,timestamp,permalink',
        limit: String(Math.min(25, Math.max(1, Number(req.limit) || 10))),
      });
      return json(200, {
        posts: ((list && list.data) || []).map(function (p) {
          return {
            id: p.id,
            text: String(p.text || '').slice(0, 160),
            at: p.timestamp,
            url: p.permalink,
          };
        }),
      });
    }

    return json(400, { error: '알 수 없는 요청입니다' });

  } catch (e) {
    /* 토큰 문제는 원인을 짚어 줍니다 */
    const msg = String(e.message || '');
    const expired = /expired|session|OAuth|access token/i.test(msg);
    return json(e.status === 401 || e.status === 400 ? 400 : 500, {
      error: expired
        ? '쓰레드 토큰이 만료되었거나 유효하지 않습니다. 새로 발급해 THREADS_TOKEN 을 교체해 주세요.'
        : msg || '쓰레드 요청 중 오류가 발생했습니다',
      raw: msg,
    });
  }
};
