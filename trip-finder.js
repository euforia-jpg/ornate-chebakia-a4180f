/*
  ===========================================================
  나에게 맞는 일정 찾기 — 첫 화면 · 여행상품 쪽 공용
  -----------------------------------------------------------
  「대표 여행상품」 제목 오른쪽에 단추 하나만 보입니다.
  누르면 문장이 펼쳐집니다.

      [어디]로 [며칠] 동안, [몇 명]이 [누구와] 떠나요

  빈칸을 하나 고를 때마다 products.js 의 상품을 다시 맞춰 보고,
  잘 맞는 순서로 카드를 보여 줍니다. 원래 상품 목록은 잠시 숨겼다가
  「전체 상품 보기」나 단추를 다시 누르면 그대로 돌아옵니다.

  ※ 「누구와」는 상품 정보에 없는 판단이라 아래 어울림 표에 따로 적습니다.
     새 상품을 올리면 여기에 한 줄 더해 주세요. 빠지면 그 상품은
     「누구와」 점수만 못 받을 뿐, 나라·기간·인원으로는 똑같이 찾아집니다.

  쓰는 곳: index.html · tours.html  (</body> 바로 앞에서 불러옵니다)
  필요한 것: products.js 의 PRODUCTS, 그리고 #tourGrid 와 그 위 .section-head
  ===========================================================
*/
(function () {
  'use strict';

  /* ═══ 「누구와」 어울림 표 — 사장님 확인본 (2026-10) ═══ */
  var 일주 = ['spain-round', 'portugal-round', 'portugal-8days', 'portugal-10days', 'iberia-12days',
              'spain-12days-barcelona', 'iberia-14days-madrid', 'iberia-15days-grand', 'portugal-north-spain-17days'];
  var 북부 = ['north-cantabria-basque', 'north-asturias-picos', 'galicia-a-marina', 'basque-navarra-6days'];
  var 따로 = {
    'golf-spain-portugal':  ['부모님과', '연인·부부', '친구와'],
    'camino-100':           ['친구와', '혼자'],
    'hiking-sierra-nevada': ['친구와'],
    'matchday':             ['친구와', '아이와 가족'],
    'docent-museum':        ['부모님과', '아이와 가족', '혼자'],
    'spain-free-itinerary': ['연인·부부', '친구와', '혼자'],
    'spain-north':          ['연인·부부', '친구와', '혼자'],
    'spain-month-stay':     ['연인·부부', '혼자']
  };
  function 어울림(p) {
    if (따로[p.id]) return 따로[p.id];
    if (일주.indexOf(p.id) > -1) return ['부모님과', '연인·부부', '회사·단체'];
    if (북부.indexOf(p.id) > -1) return ['부모님과', '연인·부부', '친구와', '회사·단체'];
    if (/^car-/.test(p.id) || p.id === 'madrid-toledo-day') return ['부모님과', '아이와 가족', '회사·단체'];
    return [];
  }

  /* ═══ 고를 것 ═══ */
  var 칸들 = [
    { 키: '나라', 빈: '어디', 묻기: '어디로 떠나세요?',  뒤: '로',
      값: [['스페인'], ['포르투갈'], ['둘 다', '스페인+포르투갈'], ['어디든']] },
    { 키: '기간', 빈: '며칠', 묻기: '며칠 정도 생각하세요?', 뒤: ' 동안,',
      값: [['하루', '당일·반나절'], ['4~6일'], ['7~10일'], ['11일 이상'], ['한 달']] },
    { 키: '인원', 빈: '몇 명', 묻기: '몇 분이 함께 가세요?', 뒤: '이',
      값: [['1~3명'], ['4~6명'], ['7~14명'], ['15명 이상']] },
    { 키: '누구', 빈: '누구와', 묻기: '누구와 떠나세요?', 뒤: ' 떠나요',
      값: [['부모님과', '', '👨‍👩‍👦'], ['연인·부부', '', '💑'], ['친구와', '', '🙌'], ['아이와 가족', '', '🧒'], ['회사·단체', '', '🏢'], ['혼자', '', '🎒']] }
  ];
  var 기간범위 = { '하루': [1, 1], '4~6일': [4, 6], '7~10일': [7, 10], '11일 이상': [11, 25], '한 달': [26, 40] };
  var 인원범위 = { '1~3명': [1, 3], '4~6명': [4, 6], '7~14명': [7, 14], '15명 이상': [15, 45] };
  var 배점 = { 나라: 35, 기간: 30, 인원: 15, 누구: 20 };

  var 고름 = { 나라: '', 기간: '', 인원: '', 누구: '' };
  var 열린칸 = '';
  var 다보기 = false;

  /* ═══ 상품 읽기 ═══ */
  function 일수(p) {
    var d = String(p.days || '');
    if (/한달|한 달/.test(d)) return 30;
    if (/당일|반나절|편도/.test(d)) return 1;
    var m = d.match(/(\d+)\s*일/);
    return m ? +m[1] : null;
  }
  function 나라(p) {
    var t = (p.region || '') + ' ' + (p.title || '');
    return {
      스: /SPAIN|스페인|CAMINO|바스크|나바라|하이킹|MATCHDAY|마드리드|바르셀로나|그라나다|세비야|톨레도|빌바오|사라고사|론다|꼬르도바|코르도바|콘수에그라|도슨트|순례길|산티아고/.test(t),
      포: /PORTUGAL|포르투갈|포루투갈|리스본|포루투|포르투|베나길|파티마/.test(t)
    };
  }
  function 최소인원(p) { return (p.요금 && p.요금.최소) || p.minPeople || 1; }
  function 최대인원(p) { return p.maxPeople || 99; }

  function 맞춰보기(p) {
    var 점 = 0, 만점 = 0, 왜 = [];
    var n = 나라(p);
    if (고름.나라) {
      만점 += 배점.나라;
      var g = 고름.나라;
      if (g === '어디든') { 점 += 배점.나라; }
      else if ((g === '스페인' && n.스 && !n.포) || (g === '포르투갈' && n.포 && !n.스) || (g === '둘 다' && n.스 && n.포)) {
        점 += 배점.나라; 왜.push(['ok', g === '둘 다' ? '스페인 + 포르투갈' : g]);
      } else if ((g === '스페인' && n.스) || (g === '포르투갈' && n.포)) {
        점 += 20; 왜.push(['mid', g + ' 포함']);
      } else if (g === '둘 다' && (n.스 || n.포)) {
        점 += 12; 왜.push(['mid', (n.스 ? '스페인' : '포르투갈') + '만']);
      } else return null;
    }
    if (고름.기간) {
      만점 += 배점.기간;
      var d = 일수(p), r = 기간범위[고름.기간];
      var 글 = String(p.days || '').replace(/\s*\(.*\)/, '');
      if (d == null) return null;
      if (d >= r[0] && d <= r[1]) { 점 += 배점.기간; 왜.push(['ok', 글]); }
      else if (Math.min(Math.abs(d - r[0]), Math.abs(d - r[1])) <= 2) { 점 += 14; 왜.push(['mid', 글 + ' · 조금 다름']); }
      else return null;
    }
    if (고름.인원) {
      만점 += 배점.인원;
      var 인 = 인원범위[고름.인원], 최소 = 최소인원(p), 최대 = 최대인원(p);
      if (인[1] >= 최소 && 인[0] <= 최대) { 점 += 배점.인원; 왜.push(['ok', 최소 > 1 ? 최소 + '명부터 출발' : '인원 제한 없음']); }
      else if (인[1] < 최소) { 점 += 3; 왜.push(['warn', 최소 + '명부터 출발 — 상담해 드려요']); }
      else { 점 += 3; 왜.push(['warn', '최대 ' + 최대 + '명 — 상담해 드려요']); }
    }
    if (고름.누구) {
      만점 += 배점.누구;
      if (어울림(p).indexOf(고름.누구) > -1) { 점 += 배점.누구; 왜.push(['ok', 고름.누구 + ' 추천']); }
    }
    if (!만점) return null;
    return { p: p, 퍼센트: Math.round(점 / 만점 * 100), 왜: 왜 };
  }

  function 결과목록() {
    if (typeof PRODUCTS === 'undefined') return [];
    return PRODUCTS.map(맞춰보기).filter(function (r) { return r && r.퍼센트 >= 50; })
      .sort(function (a, b) { return b.퍼센트 - a.퍼센트; });
  }

  /* ═══ 그리기 도우미 ═══ */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function 링크(p) {
    if (typeof window.productLink === 'function') return window.productLink(p);
    return p.link || ('product.html?id=' + encodeURIComponent(p.id));
  }
  function 사진(p) {
    var v = String(p['카드사진'] || '').trim();
    if (!v || /["'()\\\s]/.test(v)) return '';
    return ' style="background-image:url(' + v + ')"';
  }
  function 요금(p) {
    var f = p.요금;
    if (f && f.구간 && f.구간.length) {
      var 상한 = 고름.인원 ? 인원범위[고름.인원][1] : 99;
      var 맞음 = f.구간.filter(function (x) { return x.수 <= 상한; })
                      .sort(function (a, b) { return b.수 - a.수; })[0] || f.구간[0];
      return ['€' + Number(맞음.값).toLocaleString('en-US'), '1인 · ' + 맞음.인원 + ' 기준'];
    }
    return [p.price ? String(p.price).replace(/\s*\(.*\)/, '') : '가격 문의', ''];
  }
  function 카드(r) {
    var p = r.p, 값 = 요금(p);
    var 말 = r.퍼센트 >= 90 ? '딱 맞아요' : r.퍼센트 >= 75 ? '잘 맞아요' : '비슷해요';
    var 표 = { ok: '✓', mid: '△', warn: '!' };
    return '<a class="tf-card" href="' + esc(링크(p)) + '"><span class="tf-bg"' + 사진(p) + '></span><span class="tf-sc"></span>' +
      '<span class="tf-in"><span class="tf-match' + (r.퍼센트 < 75 ? ' mid' : '') + '"><b>' + r.퍼센트 + '%</b>' + 말 + '</span>' +
      '<span class="tf-sp"></span><span class="tf-title">' + esc(p.title) + '</span>' +
      '<span class="tf-why">' + r.왜.map(function (w) {
        return '<span class="' + w[0] + '"><i>' + 표[w[0]] + '</i>' + esc(w[1]) + '</span>';
      }).join('') + '</span>' +
      '<span class="tf-price"><span><b>' + esc(값[0]) + '</b> <small>' + esc(값[1]) + '</small></span><em>자세히 →</em></span></span></a>';
  }

  /* ═══ 꾸밈 ═══ */
  var CSS = '' +
  '.tf-actions{display:flex;align-items:center;gap:14px;flex-wrap:wrap}' +
  '.tf-btn{display:inline-flex;align-items:center;gap:8px;border:2px solid var(--navy,#24303A);background:var(--navy,#24303A);color:#fff;font:inherit;font-size:14px;font-weight:800;padding:10px 16px;border-radius:999px;cursor:pointer;box-shadow:0 10px 22px -12px rgba(36,48,58,.7);transition:transform .15s}' +
  '.tf-btn:hover{transform:translateY(-1px)}' +
  '.tf-btn .tf-spark{width:20px;height:20px;border-radius:50%;background:#F1C48A;color:#24303A;display:inline-flex;align-items:center;justify-content:center;font-size:11px}' +
  '.tf-btn .tf-arr{font-size:11px;opacity:.75}' +
  '.tf-btn[aria-expanded="true"]{background:#fff;color:var(--navy,#24303A);box-shadow:none}' +
  '.tf-panel{display:none;margin:0 0 26px}' +
  '.tf-panel.open{display:block}' +
  '.tf-box{background:linear-gradient(135deg,#EEF1F3 0%,#F4EFEA 100%);border-radius:20px;padding:22px 24px}' +
  '.tf-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}' +
  '.tf-kick{font-size:11.5px;font-weight:800;letter-spacing:2px;color:var(--violet,#4A6E86)}' +
  '.tf-reset{border:none;background:none;font:inherit;font-size:12.5px;font-weight:700;color:var(--muted,#64707A);cursor:pointer;text-decoration:underline;padding:0}' +
  '.tf-sentence{font-size:24px;font-weight:700;line-height:2.1;color:var(--navy,#24303A);word-break:keep-all}' +
  '.tf-slot{display:inline-flex;align-items:center;gap:6px;font:inherit;font-size:inherit;font-weight:800;line-height:1.5;background:#fff;color:var(--navy,#24303A);border:2px solid var(--navy,#24303A);border-radius:12px;padding:0 12px;margin:0 3px;cursor:pointer;box-shadow:0 3px 0 var(--navy,#24303A);vertical-align:baseline}' +
  '.tf-slot .tf-v{font-size:12px;color:var(--muted,#64707A)}' +
  '.tf-slot.empty{background:transparent;border-style:dashed;box-shadow:none;color:#8A9399}' +
  '.tf-slot.on{background:var(--navy,#24303A);color:#fff;border-style:solid}' +
  '.tf-slot.on .tf-v{color:#cfd6db}' +
  '.tf-opts{margin:12px 0 2px;padding:14px 16px;background:#fff;border-radius:14px;border:1.5px solid var(--line,#E4E6E8)}' +
  '.tf-opts[hidden]{display:none}' +
  '.tf-q{font-size:12px;font-weight:800;color:var(--muted,#64707A);margin-bottom:9px}' +
  '.tf-chips{display:flex;flex-wrap:wrap;gap:8px}' +
  '.tf-chip{font:inherit;font-size:13.5px;font-weight:700;color:var(--ink,#24303A);background:#fff;border:1.5px solid var(--line,#E4E6E8);border-radius:999px;padding:8px 14px;cursor:pointer}' +
  '.tf-chip small{font-size:11px;color:#8A9399;font-weight:600;margin-left:4px}' +
  '.tf-chip:hover{border-color:var(--navy,#24303A)}' +
  '.tf-chip.sel{background:var(--navy,#24303A);border-color:var(--navy,#24303A);color:#fff}' +
  '.tf-chip.sel small{color:#cfd6db}' +
  '.tf-hint{margin-top:12px;font-size:13px;font-weight:600;color:var(--muted,#64707A)}' +
  '.tf-hint b{color:var(--navy,#24303A)}' +
  '.tf-res-head{display:flex;justify-content:space-between;align-items:baseline;gap:12px;margin:24px 0 14px}' +
  '.tf-res-head b{font-size:16px;font-weight:800;color:var(--navy,#24303A)}' +
  '.tf-res-head button{border:none;background:none;font:inherit;font-size:12.5px;font-weight:800;color:var(--violet,#4A6E86);cursor:pointer;padding:0}' +
  '.tf-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:18px}' +
  '.tf-card{position:relative;display:block;height:410px;border-radius:20px;overflow:hidden;background:#2b3a44;color:#fff;text-decoration:none}' +
  '.tf-bg{position:absolute;inset:0;background-size:cover;background-position:center;transition:transform .4s}' +
  '.tf-card:hover .tf-bg{transform:scale(1.04)}' +
  '.tf-sc{position:absolute;inset:0;background:linear-gradient(to top,rgba(13,20,26,.9) 0%,rgba(13,20,26,.78) 34%,rgba(13,20,26,.3) 62%,rgba(13,20,26,.05) 100%)}' +
  '.tf-in{position:absolute;inset:0;padding:18px;display:flex;flex-direction:column}' +
  '.tf-match{align-self:flex-start;display:inline-flex;align-items:center;gap:7px;background:#fff;color:var(--navy,#24303A);border-radius:999px;padding:5px 12px 5px 5px;font-size:12.5px;font-weight:800}' +
  '.tf-match b{background:var(--teal,#52786C);color:#fff;border-radius:999px;padding:3px 9px;font-size:12px}' +
  '.tf-match.mid b{background:#9A6A12}' +
  '.tf-sp{flex:1}' +
  '.tf-title{font-size:18px;font-weight:800;line-height:1.35;margin-bottom:10px;word-break:keep-all}' +
  '.tf-why{display:flex;flex-direction:column;gap:4px;margin-bottom:12px}' +
  '.tf-why span{font-size:12.5px;font-weight:600;color:#E9EEF1;display:flex;gap:7px}' +
  '.tf-why i{font-style:normal;font-weight:900;color:#9FD3BE;width:12px}' +
  '.tf-why .mid i{color:#F1C48A}.tf-why .warn i{color:#F1A48A}' +
  '.tf-price{display:flex;justify-content:space-between;align-items:flex-end;border-top:1px solid rgba(255,255,255,.2);padding-top:11px}' +
  '.tf-price b{font-size:21px;font-weight:800}' +
  '.tf-price small{font-size:11.5px;color:#cfd6db;font-weight:600}' +
  '.tf-price em{font-style:normal;font-size:12px;font-weight:800;background:rgba(255,255,255,.95);color:var(--navy,#24303A);border-radius:999px;padding:7px 12px}' +
  '.tf-none{padding:26px;text-align:center;background:#fff;border:1.5px dashed var(--line,#E4E6E8);border-radius:18px;font-size:14px;font-weight:600;color:var(--muted,#64707A)}' +
  '.tf-more{margin-top:16px;display:flex;justify-content:space-between;align-items:center;gap:14px;background:#F4EFEA;border-radius:16px;padding:16px 20px}' +
  '.tf-more p{margin:0;font-size:13.5px;font-weight:600;color:var(--ink,#24303A)}' +
  '.tf-more a{flex:0 0 auto;font-size:13px;font-weight:800;background:var(--pink,#94634A);color:#fff;border-radius:999px;padding:10px 16px;text-decoration:none}' +
  '@media (max-width:600px){' +
    '.tf-box{padding:18px 14px}.tf-sentence{font-size:16.5px;line-height:2.3}' +
    '.tf-slot{padding:0 9px;margin:0 2px;border-radius:10px}.tf-slot .tf-v{font-size:10px}' +
    '.tf-res-head{flex-direction:column;align-items:flex-start;gap:6px}' +
    '.tf-card{height:370px}.tf-more{flex-direction:column;align-items:flex-start}' +
    '.tf-actions{width:100%}' +
  '}';

  /* ═══ 붙이기 ═══ */
  var 판, 그리드, 필터, 단추;

  function 문장() {
    return 칸들.map(function (c) {
      var v = 고름[c.키];
      return '<button type="button" class="tf-slot' + (v ? '' : ' empty') + (열린칸 === c.키 ? ' on' : '') +
        '" data-slot="' + c.키 + '" aria-expanded="' + (열린칸 === c.키) + '">' + esc(v || c.빈) +
        ' <span class="tf-v">▾</span></button>' + c.뒤 + (c.키 === '기간' ? '<br>' : ' ');
    }).join('');
  }
  function 고르는칸() {
    var c = 칸들.filter(function (x) { return x.키 === 열린칸; })[0];
    if (!c) return '<div class="tf-opts" hidden></div>';
    return '<div class="tf-opts"><div class="tf-q">' + c.묻기 + '</div><div class="tf-chips">' +
      c.값.map(function (x) {
        return '<button type="button" class="tf-chip' + (고름[c.키] === x[0] ? ' sel' : '') + '" data-pick="' + esc(x[0]) + '">' +
          (x[2] ? x[2] + ' ' : '') + esc(x[0]) + (x[1] ? '<small>' + esc(x[1]) + '</small>' : '') + '</button>';
      }).join('') + '</div></div>';
  }
  function 견적주소() {
    var 조건 = 칸들.map(function (c) { return 고름[c.키]; }).filter(Boolean).join(' · ');
    var q = 'product=' + encodeURIComponent('맞춤 일정 — ' + 조건);
    if (고름.인원) q += '&people=' + 인원범위[고름.인원][0];
    return 'contact.html?' + q;
  }
  function 결과칸() {
    var 아무것도 = !칸들.some(function (c) { return 고름[c.키]; });
    if (아무것도) return '';
    var 목록 = 결과목록(), 다 = 칸들.every(function (c) { return 고름[c.키]; });
    var 보일 = 다보기 ? 목록 : 목록.slice(0, 3);
    var 머리 = 목록.length
      ? (다 ? '딱 맞는 일정 ' + Math.min(3, 목록.length) + '개를 찾았어요' : '지금까지 고른 조건에 맞는 일정 ' + 목록.length + '개')
      : '고른 조건에 꼭 맞는 상품은 아직 없어요';
    var 오른쪽 = 목록.length > 3
      ? '<button type="button" data-act="more">' + (다보기 ? '세 개만 보기' : '맞는 일정 모두 보기 (' + 목록.length + ')') + '</button>'
      : '<button type="button" data-act="all">전체 상품 보기</button>';
    return '<div class="tf-res-head"><b>' + 머리 + '</b>' + 오른쪽 + '</div>' +
      (목록.length ? '<div class="tf-grid">' + 보일.map(카드).join('') + '</div>'
                   : '<div class="tf-none">조건을 하나 바꿔 보시거나, 아래에서 고른 조건 그대로 일정을 받아 보세요.</div>') +
      '<div class="tf-more"><p>마음에 꼭 드는 게 없나요? <b>고르신 조건 그대로</b> 일정을 짜 드릴게요.</p>' +
      '<a href="' + esc(견적주소()) + '">이 조건으로 맞춤 견적 받기 →</a></div>';
  }
  function 그리기() {
    var 고른것 = 칸들.some(function (c) { return 고름[c.키]; });
    판.innerHTML = '<div class="tf-box"><div class="tf-top"><span class="tf-kick">나에게 맞는 일정 찾기</span>' +
      (고른것 ? '<button type="button" class="tf-reset" data-act="reset">다시 고르기</button>' : '') + '</div>' +
      '<div class="tf-sentence">' + 문장() + '</div>' + 고르는칸() +
      (고른것 ? '' : '<div class="tf-hint">빈칸을 하나씩 고를 때마다 <b>맞는 일정이 바로 추려집니다</b></div>') +
      '</div>' + 결과칸();
    /* 무엇이든 고르면 원래 목록은 잠시 숨깁니다 */
    var 숨김 = 고른것 && 판.classList.contains('open');
    if (그리드) 그리드.style.display = 숨김 ? 'none' : '';
    if (필터) 필터.style.display = 숨김 ? 'none' : '';
  }
  function 열고닫기(열기) {
    판.classList.toggle('open', 열기);
    단추.setAttribute('aria-expanded', 열기);
    단추.querySelector('.tf-arr').textContent = 열기 ? '▴' : '▾';
    if (열기 && !열린칸 && !칸들.some(function (c) { return 고름[c.키]; })) 열린칸 = '나라';
    그리기();
  }

  function 시작() {
    그리드 = document.getElementById('tourGrid');
    if (!그리드 || typeof PRODUCTS === 'undefined') return;
    var 칸 = 그리드.parentNode, 머리 = 칸.querySelector('.section-head');
    if (!머리 || 머리.querySelector('.tf-btn')) return;
    필터 = document.getElementById('filters');

    var st = document.createElement('style'); st.id = 'tf-style'; st.textContent = CSS;
    document.head.appendChild(st);

    /* 제목 오른쪽 — 원래 있던 「전체 상품 보기」 링크와 나란히 */
    var 묶음 = document.createElement('div'); 묶음.className = 'tf-actions';
    단추 = document.createElement('button'); 단추.type = 'button'; 단추.className = 'tf-btn';
    단추.setAttribute('aria-expanded', 'false');
    단추.innerHTML = '<span class="tf-spark">✦</span>나에게 맞는 일정 찾기 <span class="tf-arr">▾</span>';
    묶음.appendChild(단추);
    var 원래링크 = 머리.querySelector('a.more');
    if (원래링크) 묶음.appendChild(원래링크);
    머리.appendChild(묶음);

    판 = document.createElement('div'); 판.className = 'tf-panel'; 판.id = 'tripFinder';
    머리.parentNode.insertBefore(판, 머리.nextSibling);

    단추.addEventListener('click', function () { 열고닫기(!판.classList.contains('open')); });
    판.addEventListener('click', function (e) {
      var t = e.target.closest('button'); if (!t) return;
      if (t.dataset.slot) { 열린칸 = (열린칸 === t.dataset.slot) ? '' : t.dataset.slot; 그리기(); return; }
      if (t.dataset.pick != null) {
        고름[열린칸] = (고름[열린칸] === t.dataset.pick) ? '' : t.dataset.pick;
        /* 다음 빈칸으로 저절로 넘어갑니다 */
        var 다음 = 칸들.filter(function (c) { return !고름[c.키]; })[0];
        열린칸 = 다음 ? 다음.키 : '';
        다보기 = false; 그리기(); return;
      }
      if (t.dataset.act === 'reset') { 고름 = { 나라: '', 기간: '', 인원: '', 누구: '' }; 열린칸 = '나라'; 다보기 = false; 그리기(); return; }
      if (t.dataset.act === 'more') { 다보기 = !다보기; 그리기(); return; }
      if (t.dataset.act === 'all') { 열고닫기(false); 그리드.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', 시작);
  else 시작();
})();
