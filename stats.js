/*
  ===========================================================
  홈페이지 방문·클릭 세기 (홈페이지 쪽에 들어가는 아주 가벼운 조각)
  -----------------------------------------------------------
  하는 일은 두 가지뿐입니다.

    1. 페이지가 열리면 "어느 페이지가 한 번 열렸다" 고 알립니다
    2. 주요 단추를 누르면 "어느 단추가 눌렸다" 고 알립니다

  보내는 내용에는 이름도, 쿠키도, 아이피도 없습니다.
  홈페이지가 느려지지 않도록 보내기만 하고 답은 기다리지 않습니다.
  혹시 이 조각이 잘못돼도 홈페이지는 아무 영향을 받지 않습니다
  (전체를 try 로 감싸 두었습니다).
  ===========================================================
*/
(function () {
  'use strict';

  var URL_HIT = '/.netlify/functions/hit';

  function send(data) {
    try {
      var body = JSON.stringify(data);
      if (navigator.sendBeacon) {
        navigator.sendBeacon(URL_HIT, new Blob([body], { type: 'application/json' }));
      } else {
        fetch(URL_HIT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: body,
          keepalive: true,
        }).catch(function () {});
      }
    } catch (e) { /* 조용히 넘어갑니다 */ }
  }

  /* 어디서 들어왔는지 — 검색엔진 이름 정도만 굵게 봅니다 */
  function whereFrom() {
    try {
      var r = document.referrer || '';
      if (!r) return 'direct';
      if (r.indexOf(location.host) !== -1) return '';       // 우리 사이트 안에서 이동한 것
      if (/naver\./i.test(r)) return 'naver';
      if (/google\./i.test(r)) return 'google';
      if (/daum\.|kakao\./i.test(r)) return 'daum';
      if (/threads|instagram|facebook|twitter|x\.com|youtube/i.test(r)) return 'sns';
      return 'other';
    } catch (e) { return 'direct'; }
  }

  /* 눌린 것이 무슨 단추인지 가려냅니다 */
  function classify(el) {
    try {
      var href = (el.getAttribute && el.getAttribute('href')) || '';
      var txt = (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40);
      var id = (el.id || '') + ' ' + (el.className || '');

      if (/^tel:/i.test(href)) return 'tel';
      if (/^mailto:/i.test(href)) return 'mail';
      if (/deposit\.html/i.test(href)) return 'deposit';
      if (/contact\.html/i.test(href)) return 'inquiry';
      if (/product\.html/i.test(href)) return 'product';
      if (/matchday\.html/i.test(href)) return 'match';
      if (/concert\.html/i.test(href)) return 'concert';
      if (/tours\.html/i.test(href)) return 'tour';
      if (/plan\.html/i.test(href)) return 'plan';
      if (/kakao/i.test(href) || /카카오/.test(txt)) return 'kakao';
      if (/AI ?상담|유포리아 AI/i.test(txt) || /aiChat|ai-chat/i.test(id)) return 'ai';
      if (/예약 ?문의|문의하기|상담/.test(txt)) return 'inquiry';
      return '';   // 나머지 클릭은 세지 않습니다
    } catch (e) { return ''; }
  }

  try {
    /* --- 1. 페이지 조회 --- */
    var isNewVisit = false;
    try {
      if (!sessionStorage.getItem('euf_v')) {
        sessionStorage.setItem('euf_v', '1');
        isNewVisit = true;
      }
    } catch (e) { isNewVisit = true; }

    var prod = '';
    try {
      var m = location.search.match(/[?&]id=([^&]+)/i);
      if (m) prod = decodeURIComponent(m[1]);
    } catch (e) {}

    var from = whereFrom();

    send({
      t: 'view',
      p: location.pathname,
      prod: prod,
      ref: from || 'direct',
      n: isNewVisit ? 1 : 0,
    });

    /* --- 2. 단추 클릭 --- */
    document.addEventListener('click', function (e) {
      try {
        var el = e.target;
        if (el && el.nodeType !== 1) el = el.parentElement;
        if (!el || !el.closest) return;
        var hit = el.closest('a,button,[role="button"]');
        if (!hit) return;
        var label = classify(hit);
        if (!label) return;
        send({ t: 'click', c: label, p: location.pathname });
      } catch (err) {}
    }, true);
  } catch (e) { /* 홈페이지에는 어떤 영향도 주지 않습니다 */ }
})();
