/*
  ===========================================================
  유포리아투어 — 다국어 (한국어 / English / 中文)
  -----------------------------------------------------------
  쪽마다 글을 두 벌 만들지 않습니다.
  화면에 떠 있는 한국어 문장을 사전에서 찾아 그 자리에서
  바꿔 끼우는 방식입니다. 그래서

    · 쪽을 고칠 때 번역본을 따로 손볼 일이 없고
    · 사전에 없는 문장은 한국어로 그냥 남습니다 (깨지지 않음)
    · 나중에 i18n-zh.json 만 올리면 중국어가 바로 켜집니다

  사전 파일 : /i18n-en.json  (중국어는 /i18n-zh.json)
  고른 언어 : 브라우저에 기억해 둡니다 (localStorage)

  ※ 사전 파일을 고치셨으면 아래 판 번호(사전판)를 1 올려 주세요.
     손님 기기에 남아 있는 옛 사전을 버리게 하는 표시입니다.
  ===========================================================
*/
(function () {
  'use strict';

  var 사전판 = '4';
  var 저장칸 = 'euforia-lang';
  var 사전칸 = 'euforia-dict-';

  /* 메뉴·단추만 번역되고 본문은 한국어로 두는 쪽 */
  var 일부만 = /(hotels|concert|builder|move|product|audio-guide)/;

  var 안내문 = {
    en: ['This page is in Korean only — the menu is translated.',
         'For help in English, please send us an inquiry.',
         'Go to inquiry →'],
    zh: ['本页仅提供韩语内容 — 菜单已翻译。',
         '如需中文协助，请通过咨询表单与我们联系。',
         '前往咨询 →']
  };

  var 건너뛸태그 = /^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA|CODE|PRE)$/;
  var 번역할속성 = ['placeholder', 'alt', 'title', 'aria-label'];
  var 한글 = /[가-힣]/;

  var 사전 = null;
  var 규칙 = [];        /* 날짜·숫자처럼 매번 달라지는 문장을 위한 꼴 바꾸기 */
  var 현재 = 'ko';
  var 되돌림 = [];
  var 원래제목 = document.title;
  var 감시자 = null;
  var 기다림 = null;
  var 받는중 = false;

  function 정리(s) { return String(s).replace(/\s+/g, ' ').trim(); }

  function 찾기(s) {
    if (!s) return null;
    var k = 정리(s);
    if (!k || !한글.test(k)) return null;
    var v = 사전 ? 사전[k] : null;
    if (typeof v === 'string' && v) return v;

    /* 사전에 그대로 없으면 꼴 바꾸기를 해 봅니다 (10.17 토 · 14:00 → 10/17 Sat · 14:00) */
    var 바뀐 = k;
    for (var i = 0; i < 규칙.length; i++) {
      바뀐 = 바뀐.replace(규칙[i][0], 규칙[i][1]);
    }
    return (바뀐 !== k && !한글.test(바뀐)) ? 바뀐 : null;
  }

  function 규칙만들기(목록) {
    규칙 = [];
    if (!목록 || !목록.length) return;
    for (var i = 0; i < 목록.length; i++) {
      try { 규칙.push([new RegExp(목록[i][0], 'g'), 목록[i][1]]); } catch (e) {}
    }
  }

  /* ---------- 글자 바꾸기 ---------- */

  function 글자번역(뿌리) {
    var w = document.createTreeWalker(뿌리, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!한글.test(n.nodeValue)) return NodeFilter.FILTER_REJECT;
        var e = n.parentElement;
        while (e) {
          if (건너뛸태그.test(e.tagName)) return NodeFilter.FILTER_REJECT;
          if (e.getAttribute && e.getAttribute('data-i18n-skip') !== null) return NodeFilter.FILTER_REJECT;
          e = e.parentElement;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n, 목록 = [];
    while ((n = w.nextNode())) 목록.push(n);

    for (var i = 0; i < 목록.length; i++) {
      var 칸 = 목록[i];
      var v = 찾기(칸.nodeValue);
      if (v === null) continue;

      /* 선택목록(option)에 value 가 없으면 보이는 글이 그대로 "보내는 값"이 됩니다.
         글만 영어로 바꾸면 사무실로 오는 문의 메일의 상품명도 영어로 바뀌므로,
         먼저 한국어 원문을 value 로 고정해 둡니다. */
      var 부모 = 칸.parentElement;
      if (부모 && 부모.tagName === 'OPTION' && !부모.hasAttribute('value')) {
        되돌림.push([부모, '\u0000value', null]);
        부모.setAttribute('value', (부모.textContent || '').replace(/\s+/g, ' ').trim());
      }

      var m = /^(\s*)[\s\S]*?(\s*)$/.exec(칸.nodeValue);
      되돌림.push([칸, null, 칸.nodeValue]);
      칸.nodeValue = (m ? m[1] : '') + v + (m ? m[2] : '');
    }
  }

  function 속성번역(뿌리) {
    for (var a = 0; a < 번역할속성.length; a++) {
      var 이름 = 번역할속성[a];
      var 것들 = [];
      if (뿌리.nodeType === 1 && 뿌리.hasAttribute && 뿌리.hasAttribute(이름)) 것들.push(뿌리);
      if (뿌리.querySelectorAll) {
        var q = 뿌리.querySelectorAll('[' + 이름 + ']');
        for (var i = 0; i < q.length; i++) 것들.push(q[i]);
      }
      for (var j = 0; j < 것들.length; j++) {
        var e = 것들[j];
        if (e.closest && e.closest('[data-i18n-skip]')) continue;
        var 원래 = e.getAttribute(이름);
        var v = 찾기(원래);
        if (v === null) continue;
        되돌림.push([e, 이름, 원래]);
        e.setAttribute(이름, v);
      }
    }
  }

  function 한판(뿌리) {
    if (현재 === 'ko' || !사전) return;
    try { 글자번역(뿌리 || document.body); } catch (e) {}
    try { 속성번역(뿌리 || document.body); } catch (e) {}
  }

  function 되돌리기() {
    for (var i = 되돌림.length - 1; i >= 0; i--) {
      var r = 되돌림[i];
      try {
        if (r[1] === null) r[0].nodeValue = r[2];
        else if (r[1] === '\u0000value') r[0].removeAttribute('value');
        else r[0].setAttribute(r[1], r[2]);
      } catch (e) {}
    }
    되돌림 = [];
    document.title = 원래제목;
  }

  /* ---------- 새로 그려지는 부분도 따라 번역 ---------- */

  function 감시시작() {
    if (감시자 || !window.MutationObserver) return;
    감시자 = new MutationObserver(function () {
      if (기다림) clearTimeout(기다림);
      기다림 = setTimeout(function () { 기다림 = null; 한판(document.body); }, 50);
    });
    감시자.observe(document.body, { childList: true, subtree: true });
  }

  function 감시정지() {
    if (감시자) { 감시자.disconnect(); 감시자 = null; }
    if (기다림) { clearTimeout(기다림); 기다림 = null; }
  }

  /* ---------- 한국어로 두는 쪽 안내 띠 ---------- */

  function 띠보이기() {
    var 글 = 안내문[현재];
    if (!글) return;
    var 있던 = document.getElementById('i18nNotice');
    if (있던) 있던.parentNode.removeChild(있던);

    var d = document.createElement('div');
    d.id = 'i18nNotice';
    d.setAttribute('data-i18n-skip', '');
    d.setAttribute('role', 'note');
    d.style.cssText = 'margin:0;padding:11px clamp(16px,4vw,56px);background:#EFEBFD;' +
      'border-bottom:1.5px solid #DCD3FA;color:#2A2160;font-size:13px;font-weight:600;' +
      'line-height:1.6;display:flex;flex-wrap:wrap;gap:4px 10px;align-items:baseline;';
    var s1 = document.createElement('span'); s1.textContent = 글[0];
    var s2 = document.createElement('span'); s2.textContent = 글[1]; s2.style.opacity = '.8';
    var a = document.createElement('a');
    a.href = 'contact.html'; a.textContent = 글[2];
    a.style.cssText = 'color:#6C3CE9;font-weight:800;text-decoration:none;white-space:nowrap;';
    d.appendChild(s1); d.appendChild(s2); d.appendChild(a);

    var nav = document.querySelector('.site-nav');
    if (nav && nav.parentNode) nav.parentNode.insertBefore(d, nav.nextSibling);
    else document.body.insertBefore(d, document.body.firstChild);
  }

  function 띠숨기기() {
    var 있던 = document.getElementById('i18nNotice');
    if (있던 && 있던.parentNode) 있던.parentNode.removeChild(있던);
  }

  /* ---------- 사전 가져오기 ---------- */

  function 사전받기(코드, 끝내기) {
    var 열쇠 = 사전칸 + 코드 + '-' + 사전판;
    try {
      var 둔것 = window.localStorage.getItem(열쇠);
      if (둔것) { 끝내기(JSON.parse(둔것)); return; }
    } catch (e) {}

    if (!window.fetch) { 끝내기(null); return; }
    받는중 = true;
    fetch('/i18n-' + 코드 + '.json', { credentials: 'omit' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        받는중 = false;
        if (j) { try { window.localStorage.setItem(열쇠, JSON.stringify(j)); } catch (e) {} }
        끝내기(j);
      })
      .catch(function () { 받는중 = false; 끝내기(null); });
  }

  /* ---------- 아직 없는 언어를 누르셨을 때 ---------- */

  function 잠깐알림(코드) {
    var 글 = (코드 === 'zh')
      ? '中文版本正在准备中。目前请使用 English 或 한국어。'
      : 'This language is not available yet.';
    var 있던 = document.getElementById('i18nToast');
    if (있던 && 있던.parentNode) 있던.parentNode.removeChild(있던);
    var d = document.createElement('div');
    d.id = 'i18nToast';
    d.setAttribute('data-i18n-skip', '');
    d.setAttribute('role', 'status');
    d.textContent = 글;
    d.style.cssText = 'position:fixed;left:50%;bottom:26px;transform:translateX(-50%);z-index:99999;' +
      'background:#14103D;color:#fff;font-size:13.5px;font-weight:700;padding:12px 20px;' +
      'border-radius:999px;box-shadow:0 14px 34px -14px rgba(20,16,61,.6);max-width:90vw;text-align:center;';
    document.body.appendChild(d);
    setTimeout(function () { if (d.parentNode) d.parentNode.removeChild(d); }, 4200);
  }

  /* ---------- 단추 모양 ---------- */

  function 단추맞추기() {
    var bs = document.querySelectorAll('.lang-switch button[data-lang]');
    for (var i = 0; i < bs.length; i++) {
      var 같나 = bs[i].getAttribute('data-lang') === 현재;
      if (같나) bs[i].classList.add('active'); else bs[i].classList.remove('active');
      bs[i].setAttribute('aria-pressed', 같나 ? 'true' : 'false');
    }
  }

  /* ---------- 바꾸기 ---------- */

  function 바꾸기(코드) {
    if (받는중) return;
    if (코드 !== 'ko' && 코드 !== 'en' && 코드 !== 'zh') 코드 = 'ko';
    try { window.localStorage.setItem(저장칸, 코드); } catch (e) {}

    if (코드 === 'ko') {
      감시정지(); 되돌리기(); 띠숨기기();
      현재 = 'ko'; 사전 = null; 규칙 = [];
      document.documentElement.lang = 'ko';
      단추맞추기();
      return;
    }

    사전받기(코드, function (j) {
      /* 사전 파일이 아직 없으면(예: 중국어) 한국어를 그대로 두고 알려 드립니다 */
      if (!j) {
        현재 = 'ko';
        try { window.localStorage.setItem(저장칸, 'ko'); } catch (e) {}
        단추맞추기(); 잠깐알림(코드); return;
      }
      감시정지(); 되돌리기();
      사전 = j; 현재 = 코드;
      규칙만들기(j.__rules);
      document.documentElement.lang = (코드 === 'zh' ? 'zh-Hans' : 코드);
      var t = 찾기(원래제목); if (t) document.title = t;
      한판(document.body);
      if (일부만.test(location.pathname)) 띠보이기(); else 띠숨기기();
      단추맞추기();
      감시시작();
    });
  }

  /* ---------- 시작 ---------- */

  function 준비() {
    var bs = document.querySelectorAll('.lang-switch button[data-lang]');
    for (var i = 0; i < bs.length; i++) {
      bs[i].setAttribute('type', 'button');
      bs[i].addEventListener('click', function () {
        바꾸기(this.getAttribute('data-lang'));
      });
    }
    var 둔것 = 'ko';
    try { 둔것 = window.localStorage.getItem(저장칸) || 'ko'; } catch (e) {}
    if (둔것 !== 'ko') 바꾸기(둔것); else 단추맞추기();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', 준비);
  else 준비();

  window.EuforiaI18n = {
    set: 바꾸기,
    get: function () { return 현재; },
    refresh: function () { 한판(document.body); }
  };
})();
