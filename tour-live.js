/* ═══════════════════════════════════════════════════════════
   상품 카드 덧붙이기 — 메인(index) · 여행상품(tours) 공용 (2026-10)

   ① 상품 목록 맨 앞에 「일정 짜기」 카드를 하나 둡니다
      → 누르면 자유여행 일정 만들기(builder.html)로 갑니다

   ② 최근 예약문의를 해당 상품 카드 안에 띄웁니다
      「● 장**님 예약문의 · 3시간 전」
      - 문의함에 실제로 들어온 문의만 씁니다 (/.netlify/functions/recent-inquiries)
      - 지어낸 이름 · 시간은 하나도 없습니다. 문의가 없으면 아무것도 안 뜹니다
      - 최근 30일 안의 문의만, 상품마다 가장 최근 1건 (같은 상품 문의가 더 있으면 「최근 30일 N건」)
      - 손님이 고른 관심 상품 이름이 사이트 상품 이름과 맞을 때만 그 카드에 붙습니다

   카드 목록을 다시 그려도(섞기 · 필터) 저절로 다시 붙습니다.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var 일정짜기주소 = 'builder.html';

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
  /* ── 카드 안 최근 문의 띠 ── */
  '.pc-live{display:inline-flex;align-items:center;flex-wrap:wrap;gap:4px 7px;margin:0 0 10px;padding:6px 11px 6px 9px;border-radius:999px;background:rgba(255,255,255,.94);color:#24303A;font-size:11.5px;font-weight:700;line-height:1.3;box-shadow:0 8px 18px -10px rgba(0,0,0,.6);animation:pcLive .45s ease both}' +
  '.pc-live i{width:8px;height:8px;border-radius:50%;background:#52786C;box-shadow:0 0 0 3px rgba(82,120,108,.22);flex:0 0 auto}' +
  '.pc-live b{font-weight:800}' +
  '.pc-live em{font-style:normal;color:#64707A;font-weight:700}' +
  '@keyframes pcLive{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}';

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

  var 상품별 = null;   /* { 상품id: {성, at, 건수} } — 한 번만 받아 옵니다 */

  function 문의받기() {
    return fetch('/.netlify/functions/recent-inquiries', { headers: { 'Accept': 'application/json' } })
      .then(function (r) { return r.ok ? r.json() : { 목록: [] }; })
      .catch(function () { return { 목록: [] }; })
      .then(function (d) {
        var 표 = {};
        (d && d.목록 || []).forEach(function (x) {
          var p = 상품찾기(x.상품); if (!p) return;
          var 칸 = 표[p.id];
          if (!칸) 표[p.id] = { 성: x.성, at: x.at, 건수: 1 };   /* 최신순으로 오므로 첫 건이 가장 최근 */
          else 칸.건수++;
        });
        상품별 = 표;
      });
  }

  function 띠붙이기(grid) {
    if (!상품별) return;
    var 카드들 = grid.querySelectorAll('a.tour-card.pc:not(.mc)');
    Array.prototype.forEach.call(카드들, function (a) {
      if (a.querySelector('.pc-live')) return;
      var m = /[?&]id=([^&#]+)/.exec(a.getAttribute('href') || '');
      if (!m) return;
      var 칸 = 상품별[decodeURIComponent(m[1])];
      if (!칸) return;
      var 언제 = 얼마전(칸.at); if (!언제) return;
      var bt = a.querySelector('.pc-bt'); if (!bt) return;
      var 이름 = 칸.성 ? esc(칸.성) + '**님' : '손님';
      bt.insertAdjacentHTML('afterbegin',
        '<span class="pc-live"><i></i><span><b>' + 이름 + '</b> 예약문의</span><em>· ' + 언제 + '</em>' +
        (칸.건수 > 1 ? '<em>· 최근 30일 ' + 칸.건수 + '건</em>' : '') + '</span>');
    });
  }

  function 채우기(grid) {
    if (!grid.querySelector('.mc')) grid.insertAdjacentHTML('afterbegin', 카드HTML);
    띠붙이기(grid);
  }

  function 시작() {
    var grid = document.getElementById('tourGrid');
    if (!grid) return;
    var st = document.createElement('style'); st.id = 'tour-live-style'; st.textContent = CSS;
    document.head.appendChild(st);

    채우기(grid);
    /* 섞기 · 필터로 목록을 다시 그리면 다시 붙입니다 */
    new MutationObserver(function () { 채우기(grid); }).observe(grid, { childList: true });
    문의받기().then(function () { 띠붙이기(grid); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', 시작);
  else 시작();
})();
