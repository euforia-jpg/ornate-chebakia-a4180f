/* ═══════════════════════════════════════════════════════════
   상품 카드 덧붙이기 — 메인(index) · 여행상품(tours) 공용 (2026-10)

   ① 상품 목록 맨 앞에 「일정 짜기」 카드를 하나 둡니다
      → 누르면 자유여행 일정 만들기(builder.html)로 갑니다

   ② 최근 예약문의 알림 — 화면 오른쪽 아래 AI 상담 단추 옆에 잠깐씩 뜹니다
      「● 장**님이 [스페인 일주] … 예약문의를 남겼어요 · 3시간 전」
      - 문의함에 실제로 들어온 문의만 씁니다 (/.netlify/functions/recent-inquiries)
      - 지어낸 이름 · 상품 · 시간은 하나도 없습니다. 문의가 없으면 아무것도 안 뜹니다
      - 최근 30일 안의 문의 중 가장 최근 것부터 최대 5건을 한 번씩만 보여 주고 멈춥니다
      - 관심 상품 이름이 사이트 상품과 같으면 상품명을 적고 누르면 그 상품으로 갑니다.
        같지 않으면 상품명 없이 「예약문의를 남겼어요」만 적습니다
      - × 를 누르면 그 창을 닫을 때까지 다시 안 뜹니다
      - AI 상담 창을 열면 알림은 숨습니다. AI 상담 단추가 없는 쪽(여행상품)은 같은 구석에 뜹니다

   ③ BEST 배지 — 최근 30일 동안 손님이 가장 많이 누른 상품 카드 3개
      - 카드를 누를 때마다 /.netlify/functions/card-click 에 한 번 셉니다
        (같은 기기에서 같은 상품은 6시간에 한 번만 셉니다)
      - 5번 이상 눌린 상품만 BEST 가 됩니다. 아직 모자라면 BEST 는 안 뜹니다
      - 지어낸 숫자는 없습니다. 무작위로 돌리던 예전 BEST 는 지웠습니다

   카드 목록을 다시 그려도(섞기 · 필터) 저절로 다시 붙습니다.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var 일정짜기주소 = 'builder.html';
  var BEST_수 = 3;        /* BEST 를 몇 개까지 붙일지 */
  var BEST_최소 = 5;      /* 최근 30일 이 숫자 이상 눌린 상품만 */
  var 다시셈시간 = 6 * 3600 * 1000;   /* 같은 기기 · 같은 상품은 6시간에 한 번만 셉니다 */
  var 알림_최대 = 5;                  /* 한 번 들어올 때 보여 줄 문의 수 */
  var 알림_처음 = 4000, 알림_보임 = 6000, 알림_쉼 = 9000;   /* 첫 알림까지 · 떠 있는 시간 · 다음 알림까지 (밀리초) */

  var CSS =
  /* ── 일정 짜기 카드 ── */
  '.tour-card.pc.mc{background:linear-gradient(150deg,#24303A 0%,#4A6E86 62%,#94634A 100%);min-height:420px}' +
  '.mc-in{position:relative;z-index:3;min-height:inherit;height:100%;box-sizing:border-box;padding:20px 20px 18px;display:flex;flex-direction:column;color:#fff}' +
  '.mc-tag{align-self:flex-start;font-size:10px;font-weight:800;letter-spacing:.1em;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.3);border-radius:7px;padding:5px 9px}' +
  '.mc h3{margin:14px 0 6px;font-size:20px;font-weight:800;font-style:normal;line-height:1.32;letter-spacing:-.01em;color:#fff;word-break:keep-all}' +
  '.mc .mc-lead{margin:0 0 14px;font-size:12px;font-weight:500;color:rgba(255,255,255,.84);line-height:1.6;word-break:keep-all}' +
  '.mc ol{list-style:none;margin:0;padding:0;counter-reset:mc;display:flex;flex-direction:column;gap:9px}' +
  '.mc li{counter-increment:mc;display:flex;gap:10px;align-items:flex-start;font-size:12.5px;font-weight:600;line-height:1.45}' +
  '.mc li::before{content:counter(mc);flex:0 0 20px;height:20px;border-radius:6px;background:rgba(255,255,255,.95);color:#24303A;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;margin-top:1px}' +
  '.mc li b{font-weight:800}' +
  '.mc li span{display:block;font-size:11.2px;font-weight:500;color:rgba(255,255,255,.76)}' +
  '.mc-sp{flex:1;min-height:14px}' +
  '.mc-go{display:flex;justify-content:space-between;align-items:center;gap:10px;background:#fff;color:#24303A;border-radius:12px;padding:12px 14px;font-size:13.5px;font-weight:800;transition:background .15s}' +
  '.mc-go small{font-size:11px;font-weight:700;color:#64707A}' +
  '.tour-card.mc:hover .mc-go{background:#F1C48A}' +
  '@media (max-width:560px){.tour-card.pc.mc{min-height:380px}}' +
  /* ── 오른쪽 아래 최근 문의 알림 (AI 상담 단추 옆) ── */
  '.eu-live{position:fixed;z-index:299;right:88px;bottom:26px;max-width:300px;display:flex;align-items:center;gap:10px;background:#fff;border:1.5px solid var(--line,#E4E6E8);border-radius:14px;padding:10px 12px 10px 14px;box-shadow:0 18px 34px -18px rgba(36,48,58,.45);opacity:0;transform:translateY(10px);pointer-events:none;transition:opacity .35s ease,transform .35s ease;text-decoration:none;color:var(--ink,#24303A)}' +
  '.eu-live.solo{right:20px;bottom:20px}' +
  '.eu-live.show{opacity:1;transform:none;pointer-events:auto}' +
  '.eu-live .dot{flex:0 0 auto;width:9px;height:9px;border-radius:50%;background:var(--teal,#52786C);box-shadow:0 0 0 4px rgba(82,120,108,.18)}' +
  '.eu-live .tx{font-size:12.2px;line-height:1.48;font-weight:600;word-break:keep-all}' +
  '.eu-live .tx b{color:var(--navy,#24303A);font-weight:800}' +
  '.eu-live .tm{display:block;margin-top:1px;font-size:10.8px;color:var(--muted,#64707A);font-weight:700}' +
  '.eu-live .x{flex:0 0 auto;align-self:flex-start;border:0;background:none;color:#8A9399;font-size:13px;line-height:1;padding:2px;cursor:pointer;font-family:inherit}' +
  '.eu-live .x:hover{color:var(--ink,#24303A)}' +
  '@media (max-width:480px){.eu-live{right:78px;bottom:16px;max-width:calc(100vw - 92px);padding:8px 10px 8px 12px}.eu-live.solo{right:12px;bottom:12px;max-width:calc(100vw - 24px)}.eu-live .tx{font-size:11.5px}}' +
  '.pc-best{font-size:10px;font-weight:800;color:#fff;background:linear-gradient(90deg,#8E6139,#C9A06A);border-radius:7px;padding:5px 9px;white-space:nowrap;letter-spacing:.04em}' +
  '';

  var 카드HTML =
    '<a class="tour-card pc mc" href="' + 일정짜기주소 + '"><div class="mc-in">' +
      '<span class="mc-tag">EUFORIA TOUR · 일정 짜기</span>' +
      '<h3>원하는 상품이 없다면<br>일정을 직접 짜 보세요</h3>' +
      '<p class="mc-lead">가고 싶은 곳과 필요한 것만 고르면 예상 금액이 바로 나옵니다.</p>' +
      '<ol>' +
        '<li><div><b>가고 싶은 곳부터 고르기</b><span>입장지 · 도시를 원하는 만큼 담기</span></div></li>' +
        '<li><div><b>필요한 것만 더하기</b><span>숙박 · 차량 · 가이드 · 식사 선택</span></div></li>' +
        '<li><div><b>예상 금액이 바로 나와요</b><span>고를 때마다 다시 계산됩니다</span></div></li>' +
        '<li><div><b>짠 일정 그대로 문의</b><span>담당자가 확인해 회신해 드립니다</span></div></li>' +
      '</ol>' +
      '<div class="mc-sp"></div>' +
      '<div class="mc-go">일정 짜기 시작 <small>바로 금액 확인 →</small></div>' +
    '</div></a>';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── 문의 → 상품 맞추기 ── */
  function 다듬기(s) {
    return String(s || '').toLowerCase().replace(/[\s·・\-–—&,.()\[\]\/→>+]/g, '');
  }
  function 상품찾기(이름) {
    if (typeof PRODUCTS === 'undefined') return null;
    var n = 다듬기(이름);
    if (n.length < 4) return null;
    for (var i = 0; i < PRODUCTS.length; i++) if (다듬기(PRODUCTS[i].title) === n) return PRODUCTS[i];
    return null;
  }

  /* 서울 시각 「2026-10-31T14:03」 → 「3시간 전」 */
  function 얼마전(at) {
    var t = Date.parse(String(at).slice(0, 16) + ':00+09:00');
    if (!isFinite(t)) return '';
    var 분 = Math.max(0, Math.floor((Date.now() - t) / 60000));
    if (분 < 1) return '방금 전';
    if (분 < 60) return 분 + '분 전';
    var 시간 = Math.floor(분 / 60);
    if (시간 < 24) return 시간 + '시간 전';
    var 일 = Math.floor(시간 / 24);
    if (일 < 7) return 일 + '일 전';
    var d = new Date(t + 9 * 3600 * 1000);
    return (d.getUTCMonth() + 1) + '월 ' + d.getUTCDate() + '일';
  }

  /* ── 최근 예약문의 알림 ── */
  function 문의받기() {
    return fetch('/.netlify/functions/recent-inquiries', { headers: { 'Accept': 'application/json' } })
      .then(function (r) { return r.ok ? r.json() : { 목록: [] }; })
      .catch(function () { return { 목록: [] }; })
      .then(function (d) { return (d && d.목록 || []).slice(0, 알림_최대); });
  }

  function 알림시작(목록) {
    if (!목록.length) return;
    try { if (sessionStorage.getItem('eu-live-off')) return; } catch (e) { /* 그냥 보여 줍니다 */ }
    var fab = document.getElementById('chatFab'), win = document.getElementById('chatWindow');
    var 판 = document.createElement('a');
    판.className = 'eu-live' + (fab ? '' : ' solo');
    판.setAttribute('role', 'status'); 판.setAttribute('aria-live', 'polite');
    document.body.appendChild(판);
    var i = 0, 꺼짐 = false, 타이머 = null;

    판.addEventListener('click', function (e) {
      if (e.target.closest('.x')) {
        e.preventDefault(); 꺼짐 = true; 판.classList.remove('show'); clearTimeout(타이머);
        try { sessionStorage.setItem('eu-live-off', '1'); } catch (er) { /* 넘어갑니다 */ }
      }
    });

    function 하나() {
      if (꺼짐 || i >= 목록.length) return;
      if (win && win.classList.contains('open')) { 타이머 = setTimeout(하나, 알림_쉼); return; }   /* 상담 중엔 기다립니다 */
      var x = 목록[i++], p = 상품찾기(x.상품), 언제 = 얼마전(x.at);
      if (!언제) { 하나(); return; }
      var 누구 = x.성 ? '<b>' + esc(x.성) + '**</b>님이' : '<b>손님</b>이';
      판.innerHTML = '<span class="dot"></span><span class="tx">' + 누구 + ' ' +
        (p ? '<b>' + esc(p.title) + '</b> ' : '') + '예약문의를 남겼어요<span class="tm">' + 언제 + '</span></span>' +
        '<button type="button" class="x" aria-label="알림 닫기">✕</button>';
      if (p && typeof window.productLink === 'function') 판.href = window.productLink(p);
      else if (p) 판.href = 'product.html?id=' + encodeURIComponent(p.id);
      else 판.removeAttribute('href');
      판.classList.add('show');
      타이머 = setTimeout(function () {
        판.classList.remove('show');
        타이머 = setTimeout(하나, 알림_쉼);
      }, 알림_보임);
    }
    타이머 = setTimeout(하나, 알림_처음);
  }

  /* ── BEST (실제 클릭 수) ── */
  var 베스트 = null;   /* 상품 id 목록 */
  function 순위받기() {
    return fetch('/.netlify/functions/card-click', { headers: { 'Accept': 'application/json' } })
      .then(function (r) { return r.ok ? r.json() : { 순위: [] }; })
      .catch(function () { return { 순위: [] }; })
      .then(function (d) {
        var 있는id = {};
        if (typeof PRODUCTS !== 'undefined') PRODUCTS.forEach(function (p) { 있는id[p.id] = 1; });
        베스트 = (d && d.순위 || []).filter(function (x) { return 있는id[x.id] && x.n >= BEST_최소; })
                 .slice(0, BEST_수).map(function (x) { return x.id; });
      });
  }
  function 카드id(a) {
    var m = /[?&]id=([^&#]+)/.exec(a.getAttribute('href') || '');
    return m ? decodeURIComponent(m[1]) : '';
  }
  function 베스트붙이기(grid) {
    if (!베스트 || !베스트.length) return;
    Array.prototype.forEach.call(grid.querySelectorAll('a.tour-card.pc:not(.mc)'), function (a) {
      if (a.querySelector('.pc-best') || 베스트.indexOf(카드id(a)) === -1) return;
      var 자리 = a.querySelector('.pc-top > span:last-child');
      if (자리) 자리.insertAdjacentHTML('afterbegin', '<span class="pc-best">BEST</span> ');
    });
  }

  /* ── 카드 누름 세기 ── */
  function 세기(id) {
    if (!id) return;
    var 열쇠 = 'eu-click-' + id, 지금 = Date.now();
    try {
      var 전 = Number(localStorage.getItem(열쇠)) || 0;
      if (지금 - 전 < 다시셈시간) return;
      localStorage.setItem(열쇠, String(지금));
    } catch (e) { /* 저장이 막힌 브라우저도 세기는 합니다 */ }
    var 몸 = JSON.stringify({ id: id });
    try {
      if (navigator.sendBeacon && navigator.sendBeacon('/.netlify/functions/card-click', new Blob([몸], { type: 'application/json' }))) return;
    } catch (e) { /* 아래로 */ }
    try { fetch('/.netlify/functions/card-click', { method: 'POST', body: 몸, keepalive: true, headers: { 'Content-Type': 'application/json' } }); } catch (e) { /* 못 세도 이동은 됩니다 */ }
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a.tour-card.pc:not(.mc), a.tf-card');
    if (a) 세기(카드id(a));
  }, true);

  function 채우기(grid) {
    if (!grid.querySelector('.mc')) grid.insertAdjacentHTML('afterbegin', 카드HTML);
    베스트붙이기(grid);
  }

  function 시작() {
    var grid = document.getElementById('tourGrid');
    if (!grid) return;
    var st = document.createElement('style'); st.id = 'tour-live-style'; st.textContent = CSS;
    document.head.appendChild(st);

    채우기(grid);
    /* 섞기 · 필터로 목록을 다시 그리면 다시 붙입니다 */
    new MutationObserver(function () { 채우기(grid); }).observe(grid, { childList: true });
    문의받기().then(알림시작);
    순위받기().then(function () { 베스트붙이기(grid); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', 시작);
  else 시작();
})();
