/*
  ===========================================================
  쓰레드 연결하기 — 60일 토큰을 자동으로 받아 오는 창구
  -----------------------------------------------------------
  메타는 쓰레드 토큰을 버튼 하나로 주지 않고 아래 절차를 요구합니다.

    ① 쓰레드 승인 화면으로 보냄
    ② 승인하면 code 를 들고 되돌아옴
    ③ code → 단기 토큰 으로 교환   (앱 시크릿 필요, 서버에서만)
    ④ 단기 토큰 → 60일 장기 토큰 으로 교환

  이 함수가 ①~④ 를 한 번에 해 주고, 마지막에 넣어야 할 값을
  화면에 보여 줍니다. 대표님은 그 값을 Netlify 에 붙여넣기만 하시면 됩니다.

  아무나 못 부르도록 대쉬보드 로그인 토큰으로 서명한 state 를 씁니다.
  (승인 화면을 다녀오는 동안에는 로그인 정보를 들고 다닐 수 없어서,
   대신 10분짜리 서명값을 만들어 보냈다가 돌아올 때 확인합니다.)

  Netlify 환경변수
    THREADS_APP_ID       쓰레드 앱 ID       (설정 화면의 "Threads 앱 ID")
    THREADS_APP_SECRET   쓰레드 앱 시크릿    (설정 화면의 "보기" 를 눌러 복사)
    ADMIN_SECRET         대쉬보드와 공유
  ===========================================================
*/

const crypto = require('crypto');

const AUTHORIZE = 'https://www.threads.com/oauth/authorize';
/* 메타가 .net 과 .com 을 함께 쓰고 있어 둘 다 시도합니다 */
const GRAPH_HOSTS = ['https://graph.threads.net', 'https://graph.threads.com'];

const SCOPES = 'threads_basic,threads_content_publish';
const STATE_TTL = 10 * 60 * 1000;      /* 승인에 쓸 수 있는 시간: 10분 */

const appId = () => String(process.env.THREADS_APP_ID || '').trim();
const appSecret = () => String(process.env.THREADS_APP_SECRET || '').trim();

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function page(title, bodyHtml) {
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
    body: '<!doctype html><html lang="ko"><head><meta charset="utf-8">' +
      '<meta name="viewport" content="width=device-width,initial-scale=1">' +
      '<title>' + esc(title) + '</title><style>' +
      'body{margin:0;background:#f4f5fa;color:#1a1f36;font:15px/1.7 -apple-system,BlinkMacSystemFont,"Segoe UI",' +
      '"Noto Sans KR",sans-serif;padding:32px 16px}' +
      '.w{max-width:680px;margin:0 auto;background:#fff;border-radius:16px;padding:28px;' +
      'box-shadow:0 2px 18px rgba(20,25,60,.08)}' +
      'h1{font-size:21px;margin:0 0 6px}h2{font-size:16px;margin:26px 0 8px}' +
      '.sub{color:#6b7280;margin:0 0 20px}' +
      '.row{margin:14px 0}.lab{font-size:13px;font-weight:700;color:#4b5563;margin-bottom:5px}' +
      '.val{display:flex;gap:8px;align-items:stretch}' +
      'input{flex:1;min-width:0;font:13px/1.5 ui-monospace,SFMono-Regular,Menlo,monospace;' +
      'padding:11px 12px;border:1px solid #d7dae4;border-radius:9px;background:#fbfbfe;color:#1a1f36}' +
      'button{border:0;border-radius:9px;padding:0 15px;background:#141a3c;color:#fff;font-weight:700;' +
      'cursor:pointer;white-space:nowrap;font-size:13px}' +
      'button:active{opacity:.75}' +
      '.ok{background:#e7f7f0;color:#0b6b47;border-radius:11px;padding:13px 15px;margin:0 0 4px}' +
      '.bad{background:#fdecef;color:#a01235;border-radius:11px;padding:13px 15px}' +
      'ol{padding-left:20px;margin:8px 0}li{margin:7px 0}' +
      'code{background:#eef0f7;border-radius:5px;padding:1px 6px;font-size:13px}' +
      '.note{color:#6b7280;font-size:13.5px;margin-top:18px;border-top:1px solid #eceef5;padding-top:16px}' +
      '</style></head><body><div class="w">' + bodyHtml + '</div>' +
      '<script>function cp(id,b){var el=document.getElementById(id);el.select();' +
      'el.setSelectionRange(0,99999);try{document.execCommand("copy")}catch(e){}' +
      'var t=b.textContent;b.textContent="복사됨";setTimeout(function(){b.textContent=t},1400)}<\/script>' +
      '</body></html>',
  };
}

function fail(msg, detail) {
  return page('쓰레드 연결 실패',
    '<h1>쓰레드 연결에 실패했습니다</h1>' +
    '<p class="bad">' + esc(msg) + '</p>' +
    (detail ? '<p class="note">' + esc(detail) + '</p>' : '') +
    '<p class="note">이 창을 닫고 대쉬보드에서 다시 시도해 주세요.</p>');
}

/* ---------- 대쉬보드 로그인 토큰 확인 ---------- */
function checkToken(token) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || !token || token.indexOf('.') === -1) return false;
  const [exp, sig] = token.split('.');
  if (!/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;
  const want = crypto.createHmac('sha256', secret).update(exp).digest('hex');
  if (want.length !== sig.length) return false;
  return crypto.timingSafeEqual(Buffer.from(want), Buffer.from(sig));
}

/* ---------- 승인 다녀오는 동안 들고 다닐 서명값 ---------- */
function makeState() {
  const exp = String(Date.now() + STATE_TTL);
  const sig = crypto.createHmac('sha256', process.env.ADMIN_SECRET).update('threads:' + exp).digest('hex');
  return exp + '.' + sig;
}

function checkState(state) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || !state || state.indexOf('.') === -1) return false;
  const [exp, sig] = state.split('.');
  if (!/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;
  const want = crypto.createHmac('sha256', secret).update('threads:' + exp).digest('hex');
  if (want.length !== sig.length) return false;
  return crypto.timingSafeEqual(Buffer.from(want), Buffer.from(sig));
}

/* ---------- 그래프 호출 (.net 실패하면 .com 으로 재시도) ---------- */
async function graph(path, params, method) {
  let last = null;
  for (const host of GRAPH_HOSTS) {
    const url = host + path;
    let res, text;
    try {
      if (method === 'POST') {
        res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(params).toString(),
        });
      } else {
        res = await fetch(url + '?' + new URLSearchParams(params).toString());
      }
      text = await res.text();
    } catch (e) { last = e.message; continue; }

    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch (e) { data = { raw: text }; }
    if (res.ok) return data;

    last = (data && data.error && (data.error.message || data.error_message)) ||
           (data && data.error_message) || ('HTTP ' + res.status + ' ' + String(text).slice(0, 200));
    /* 인증 오류면 다른 호스트로 바꿔도 결과가 같으니 바로 멈춥니다 */
    if (res.status === 400 || res.status === 401) break;
  }
  throw new Error(last || '쓰레드 서버에 연결하지 못했습니다');
}

exports.handler = async function (event) {
  const q = event.queryStringParameters || {};
  const proto = (event.headers && event.headers['x-forwarded-proto']) || 'https';
  const host = (event.headers && (event.headers['x-forwarded-host'] || event.headers.host)) || '';
  /*
    메타가 "/.netlify/..." 처럼 점으로 시작하는 경로를 리디렉션 URL 로 받아 주지 않습니다.
    그래서 저장소의 _redirects 파일로 /threads-connect 라는 짧은 주소를 만들어 두고,
    메타에는 그 주소를 등록합니다. 아래 값이 메타에 등록한 것과 글자 하나까지 같아야 합니다.
  */
  const redirectUri = proto + '://' + host + '/threads-connect';

  if (!process.env.ADMIN_SECRET) return fail('ADMIN_SECRET 이 설정되지 않았습니다');
  if (!appId() || !appSecret()) {
    return fail('쓰레드 앱 정보가 없습니다',
      'Netlify 환경변수에 THREADS_APP_ID 와 THREADS_APP_SECRET 를 넣어 주세요. ' +
      '메타 콘솔의 쓰레드 설정 화면에서 "Threads 앱 ID" 와 "Threads 앱 시크릿 코드"를 복사하시면 됩니다.');
  }

  /* 메타가 승인 거부를 들고 되돌아온 경우 */
  if (q.error) {
    return fail('승인이 취소되었습니다', q.error_description || q.error);
  }

  /* ---------- ② 되돌아왔을 때: code 를 토큰으로 바꿉니다 ---------- */
  if (q.code) {
    if (!checkState(q.state)) {
      return fail('연결 요청이 만료되었거나 올바르지 않습니다',
        '승인까지 10분이 넘었을 수 있습니다. 대쉬보드에서 다시 눌러 주세요.');
    }

    let shortTok, userId, longTok;
    try {
      const a = await graph('/oauth/access_token', {
        client_id: appId(),
        client_secret: appSecret(),
        code: String(q.code).replace(/#_$/, ''),   /* 메타가 끝에 #_ 를 붙일 때가 있습니다 */
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }, 'POST');
      shortTok = a && a.access_token;
      userId = a && (a.user_id || a.userId);
      if (!shortTok) throw new Error('단기 토큰을 받지 못했습니다');
    } catch (e) {
      return fail('단기 토큰 교환에 실패했습니다', e.message);
    }

    try {
      const b = await graph('/access_token', {
        grant_type: 'th_exchange_token',
        client_secret: appSecret(),
        access_token: shortTok,
      });
      longTok = b && b.access_token;
      if (!longTok) throw new Error('장기 토큰을 받지 못했습니다');
    } catch (e) {
      return fail('60일 토큰 교환에 실패했습니다', e.message);
    }

    /* 어느 계정인지 확인해 둡니다 */
    let username = '';
    try {
      const me = await graph('/v1.0/me', { fields: 'id,username', access_token: longTok });
      if (me) { username = me.username || ''; userId = me.id || userId; }
    } catch (e) { /* 확인만 하는 것이라 실패해도 넘어갑니다 */ }

    const today = new Date().toISOString().slice(0, 10);

    return page('쓰레드 연결 완료',
      '<h1>쓰레드 토큰을 받았습니다</h1>' +
      '<p class="ok">계정 <b>@' + esc(username || '(확인 못 함)') + '</b> · 60일간 사용할 수 있습니다.</p>' +
      '<h2>Netlify 환경변수에 아래 세 개를 넣어 주세요</h2>' +
      '<div class="row"><div class="lab">THREADS_TOKEN</div><div class="val">' +
      '<input id="t1" readonly value="' + esc(longTok) + '">' +
      '<button onclick="cp(\'t1\',this)">복사</button></div></div>' +
      '<div class="row"><div class="lab">THREADS_USER_ID</div><div class="val">' +
      '<input id="t2" readonly value="' + esc(userId || '') + '">' +
      '<button onclick="cp(\'t2\',this)">복사</button></div></div>' +
      '<div class="row"><div class="lab">THREADS_TOKEN_ISSUED</div><div class="val">' +
      '<input id="t3" readonly value="' + today + '">' +
      '<button onclick="cp(\'t3\',this)">복사</button></div></div>' +
      '<h2>넣는 곳</h2><ol>' +
      '<li>Netlify → 사이트 → <b>Project configuration</b></li>' +
      '<li>왼쪽 <b>Environment variables</b></li>' +
      '<li>같은 이름이 있으면 <b>Options → Edit</b>, 없으면 <b>Add a variable</b></li>' +
      '<li>세 개를 다 넣고 <b>Deploys → Trigger deploy</b> 로 재배포</li>' +
      '<li>대쉬보드 <b>쓰레드 광고 → 연결 확인</b> 을 눌러 확인</li>' +
      '</ol>' +
      '<p class="note">이 화면을 닫으면 토큰을 다시 볼 수 없습니다. 먼저 넣어 두세요. ' +
      '60일 뒤에는 대쉬보드에서 <b>쓰레드 연결하기</b> 를 다시 누르시면 새 토큰이 나옵니다.</p>');
  }

  /* ---------- ① 시작: 승인 화면으로 보냅니다 ---------- */
  if (!checkToken(q.token)) {
    return fail('로그인이 필요합니다', '대쉬보드에 로그인한 뒤 “쓰레드 연결하기” 버튼으로 시작해 주세요.');
  }

  /*
    force_reauth 를 붙이면 이미 로그인돼 있어도 메타가 계정을 다시 묻습니다.
    계정이 여러 개일 때 엉뚱한 계정으로 승인되는 것을 막아 줍니다.
  */
  const url = AUTHORIZE + '?' + new URLSearchParams({
    client_id: appId(),
    redirect_uri: redirectUri,
    scope: SCOPES,
    response_type: 'code',
    force_reauth: 'true',
    state: makeState(),
  }).toString();

  return { statusCode: 302, headers: { Location: url, 'Cache-Control': 'no-store' }, body: '' };
};
