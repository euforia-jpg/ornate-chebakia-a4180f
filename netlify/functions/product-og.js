/*
  ===========================================================
  상품 링크 미리보기 — /p/<상품id>
  -----------------------------------------------------------
  ★ GitHub 토큰도, 저장소도 쓰지 않습니다 ★
  ★ products.js 와 product.html 을 고치지 않습니다 ★

  무엇을 고치는 일인가
    product.html 의 미리보기 태그(og:*)는 파일에 박혀 있어
    어느 상품을 열어도 「상품 보기 — Euforia Tour」 하나뿐입니다.
    제목은 자바스크립트로 바꾸지만, 카카오톡·문자·페이스북이
    미리보기를 만들 때는 자바스크립트를 돌리지 않습니다.
    그래서 어떤 상품 링크를 보내도 똑같은 회색 카드가 떴습니다.

    canonical 도 38개 상품이 전부 product.html 하나를 가리켜,
    구글이 상품들을 한 쪽으로 보고 있었습니다.

  어떻게 고치나
    이 함수가 product.html 을 그대로 가져와
    그 상품의 제목·설명·카드 사진으로 머리말만 바꿔 돌려줍니다.
    손님이 보는 화면과 기능은 조금도 달라지지 않습니다.

  왜 새 주소(/p/…)를 쓰나
    /product.html 을 이 함수로 돌리면, 함수가 원본을 가져오려고
    같은 주소를 부르는 순간 제 자신을 다시 부르게 됩니다(무한 되돌이).
    새 주소를 쓰면 그 일이 없고, 주소도 짧아 손님께 보내기 좋습니다.
        https://toureplus.co.kr/p/spain-12days-barcelona
    기존 /product.html?id=… 도 그대로 열립니다. 한 쪽도 안 막힙니다.

  본문도 미리 채워 둡니다 (2026-11 · 검색 노출)
    네이버 검색 로봇은 자바스크립트를 거의 돌리지 않아, 상품 쪽을 열어도
    빈 상자만 보였습니다. 그래서 이 함수가 상품의 제목 · 소개 · 이런 경험 ·
    일자별 일정 · 포함/불포함 · 함께 보면 좋은 상품 링크를 글로 만들어
    본문 자리(#content)에 미리 넣어 둡니다.
    손님 화면에서는 product.html 이 상품을 그리는 순간 이 글을 통째로
    바꿔 끼우므로 두 번 보이지 않습니다. 화면이 그려지기 전 잠깐은
    이 글이 먼저 보여, 느린 휴대폰에서도 빈 화면 대신 내용이 보입니다.

  잘못되면
    무슨 일이 생기든 원래 product.html 을 그대로 돌려줍니다.
    그것마저 못 가져오면 /product.html?id=… 로 보냅니다.
    손님이 빈 쪽을 보는 일은 없습니다.
  ===========================================================
*/

'use strict';

const 도메인 = 'https://toureplus.co.kr';
const 기본사진 = 도메인 + '/og-image.png';

/* 한 번 읽은 것은 잠시 들고 있습니다 (sitemap.js 와 같은 방식) */
const 캐시시간 = 10 * 60 * 1000;          // 10분
let 캐시 = { 때: 0, 상품: null, 틀: null };

/* HTML 속성 안에서 뜻이 달라지는 글자를 막습니다 */
function 안전(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/* <script> 안에 넣을 문자열 — </script> 로 빠져나가지 못하게 합니다 */
function 스크립트안전(s) {
  return JSON.stringify(String(s == null ? '' : s))
    .replace(/</g, '\\u003c').replace(/>/g, '\\u003e')
    .replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
}

/* 설명문 다듬기 — 줄바꿈과 겹친 공백을 없애고 길면 자릅니다.
   카카오톡은 대략 80자, 구글은 160자쯤 보여 줍니다. */
function 줄이기(s, 길이) {
  /* 상품 설명에는 <br> 같은 태그와 &nbsp; 같은 기호가 섞여 있습니다.
     그대로 두면 미리보기에 「&lt;br&gt;」 가 글자로 찍힙니다. */
  let t = String(s == null ? '' : s)
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&middot;/gi, '·')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
  if (t.length <= 길이) return t;
  return t.slice(0, 길이 - 1).replace(/[\s·,.]+$/, '') + '…';
}

/*
  products.js 에서 배열만 떼어 냅니다.
  끝을 '\n];' 로 찾는 것은 뒤에 붙은 함수들까지 삼키지 않기 위해서입니다.
  (sitemap.js 와 같은 방식 — 한쪽만 고쳐져 어긋나는 일이 없게 맞춰 두었습니다)
*/
function 상품뽑기(글) {
  const 시 = 글.indexOf('[');
  if (시 === -1) return null;
  let 끝 = 글.indexOf('\n];', 시);
  끝 = 끝 === -1 ? 글.lastIndexOf(']') + 1 : 끝 + 2;
  try {
    const arr = JSON.parse(글.slice(시, 끝));
    return Array.isArray(arr) ? arr : null;
  } catch (e) {
    return null;
  }
}

/* 상품 자료와 쪽 틀을 함께 가져옵니다 */
async function 가져오기(바탕) {
  if (캐시.상품 && 캐시.틀 && (Date.now() - 캐시.때) < 캐시시간) return 캐시;
  const [a, b] = await Promise.all([
    fetch(바탕 + '/products.js', { headers: { 'Cache-Control': 'no-cache' } }),
    fetch(바탕 + '/product.html', { headers: { 'Cache-Control': 'no-cache' } }),
  ]);
  if (!a.ok) throw new Error('products.js HTTP ' + a.status);
  if (!b.ok) throw new Error('product.html HTTP ' + b.status);
  const 상품 = 상품뽑기(await a.text());
  const 틀 = await b.text();
  if (!상품 || !틀) throw new Error('읽은 내용이 비어 있습니다');
  캐시 = { 때: Date.now(), 상품: 상품, 틀: 틀 };
  return 캐시;
}

/* 카드 사진 주소를 온전한 주소로. 수상한 값이면 기본 사진을 씁니다. */
function 사진주소(값) {
  if (typeof 값 !== 'string') return 기본사진;
  const v = 값.trim();
  if (!v || /[\s"'<>]/.test(v)) return 기본사진;
  if (/^https:\/\//i.test(v)) return v;
  if (v.charAt(0) === '/') return 도메인 + v;
  return 기본사진;
}

/* 요금 — 「요금」 칸의 숫자를 먼저 보고, 없으면 price 글에서 유로 숫자를 찾습니다.
   없으면 값을 지어내지 않고 그냥 뺍니다(틀린 값보다 빈 칸이 낫습니다). */
function 요금뽑기(p) {
  const 요 = p['요금'];
  if (요 && typeof 요.값 === 'number' && 요.값 > 0) return 요.값;
  const m = String(p.price || '').match(/([\d,]+)\s*유로/);
  if (m) {
    const n = Number(m[1].replace(/,/g, ''));
    if (n > 0) return n;
  }
  return null;
}

/* 머리말의 한 태그를 통째로 갈아 끼웁니다. 없으면 그냥 둡니다. */
function 갈기(글, 무늬, 새것) {
  return 무늬.test(글) ? 글.replace(무늬, 새것) : 글;
}

/*
  주소에서 상품 번호를 찾습니다.

  원래는 _redirects 의
      /p/*  →  /.netlify/functions/product-og?id=:splat
  가 넘겨 주기로 되어 있는데, 넷리파이가 물음표 뒤의 :splat 을
  채워 주지 않는 경우가 있습니다(실제로 그래서 /p/ 가 전부
  여행상품 목록으로 튕겼습니다).

  그래서 넘어온 값이 없으면 원래 주소에서 직접 읽습니다.
  되돌림 규칙이 어떻게 바뀌든 이쪽이 받아 냅니다.
*/
function 아이디찾기(event) {
  const q = (event && event.queryStringParameters) || {};
  const 넘어온것 = String(q.id || '').trim();
  if (넘어온것) return 넘어온것;

  const h = (event && event.headers) || {};
  const 후보 = [event && event.rawUrl, event && event.path,
                h['x-nf-original-path'], h['x-original-path']];

  for (let i = 0; i < 후보.length; i++) {
    if (!후보[i]) continue;
    let 길 = String(후보[i]);
    if (/^https?:\/\//i.test(길)) {
      try { 길 = new URL(길).pathname; } catch (e) { /* 그냥 통째로 봅니다 */ }
    }
    const m = 길.match(/\/p\/([^/?#]+)/);
    if (m) {
      try { return decodeURIComponent(m[1]).trim(); }
      catch (e) { return m[1].trim(); }
    }
  }
  return '';
}

/* ── 검색 로봇용 본문 ─────────────────────────────────────
   product.html 이 그리는 내용과 같은 자료를 글(HTML)로 미리 만듭니다.
   요금 · 일정은 products.js 에 적힌 그대로만 씁니다(지어내지 않습니다). */
function 글만(s) { return 줄이기(s, 100000); }

function 장소들(p) {
  const 본 = [];
  (Array.isArray(p['경로']) ? p['경로'] : []).forEach(function (d) {
    (Array.isArray(d && d['들']) ? d['들'] : []).forEach(function (x) {
      const v = String(x || '').trim();
      if (v && v.charAt(0) !== '~' && 본.indexOf(v) === -1) 본.push(v);
    });
  });
  return 본;
}

function 본문만들기(p, 모두) {
  const d = p.detail || {};
  const 목록 = function (arr) {
    return (Array.isArray(arr) ? arr : []).map(글만).filter(Boolean)
      .map(function (x) { return '<li>' + 안전(x) + '</li>'; }).join('');
  };
  const 줄들 = [];
  줄들.push('<p class="eu-ssr-meta">' + 안전([p.region, p.days, 글만(p.price)].filter(Boolean).join(' · ')) + '</p>');
  줄들.push('<h1>' + 안전(p.title) + '</h1>');
  const 소개 = 글만(d.lead || p.summary);
  if (소개) 줄들.push('<p>' + 안전(소개) + '</p>');
  if (d.lead && p.summary && 글만(p.summary) !== 소개) 줄들.push('<p>' + 안전(글만(p.summary)) + '</p>');
  const 설명 = 글만(String(d.description || '').replace(/<p class="photo-credit"[\s\S]*?<\/p>/gi, ''));
  if (설명) 줄들.push('<p>' + 안전(설명.slice(0, 1200)) + '</p>');

  const 경험 = 목록(d.highlights);
  if (경험) 줄들.push('<h2>이런 경험을 할 수 있어요</h2><ul>' + 경험 + '</ul>');

  /* 일자별 일정 — 「경로」 칸(지도와 같은 자료). 크루즈는 기항지 표 */
  const 경로 = Array.isArray(p['경로']) ? p['경로'] : [];
  const 기항 = p['크루즈'] && Array.isArray(p['크루즈']['기항']) ? p['크루즈']['기항'] : null;
  if (기항 && 기항.length) {
    줄들.push('<h2>일자별 일정</h2><ol>' + 기항.map(function (g) {
      const 곳 = [g['곳'], g['꼬리']].filter(Boolean).join(' · ');
      const 때 = (g['입표'] || '') + (g['출표'] ? ' / ' + g['출표'] : '');
      return '<li><b>' + 안전((g['일'] || '') + '일차 ' + (g['날'] || '')) + '</b> ' + 안전(곳) +
             (g['말'] ? ' — ' + 안전(글만(g['말'])) : '') + (때.trim() ? ' (' + 안전(때.trim()) + ')' : '') + '</li>';
    }).join('') + '</ol>');
  } else if (경로.length) {
    줄들.push('<h2>일자별 일정</h2><ol>' + 경로.map(function (x) {
      const 곳 = (Array.isArray(x['들']) ? x['들'] : []).map(String).filter(function (v) { return v && v.charAt(0) !== '~'; });
      return '<li><b>' + 안전((x['일'] || '') + '일차' + (x['제목'] ? ' · ' + 글만(x['제목']) : '')) + '</b>' +
             (곳.length ? ' — ' + 안전(곳.join(' → ')) : '') +
             (x['말'] ? ' · ' + 안전(글만(x['말'])) : '') +
             (x['숙'] ? ' (숙박: ' + 안전(글만(x['숙'])) + ')' : '') + '</li>';
    }).join('') + '</ol>');
  }

  const 포함 = 목록(d.includes), 불포함 = 목록(d.excludes);
  if (포함) 줄들.push('<h2>포함 사항</h2><ul>' + 포함 + '</ul>');
  if (불포함) 줄들.push('<h2>불포함 사항</h2><ul>' + 불포함 + '</ul>');
  if (d.duration) 줄들.push('<p><b>여행 기간</b> ' + 안전(글만(d.duration)) + '</p>');
  const 태그 = (Array.isArray(p.tags) ? p.tags : []).map(글만).filter(Boolean);
  if (태그.length) 줄들.push('<p>' + 태그.map(function (x) { return '#' + 안전(x.replace(/\s+/g, '')); }).join(' ') + '</p>');
  if (p.downloadUrl && /^\/?[\w\-./]+\.pdf$/i.test(String(p.downloadUrl)))
    줄들.push('<p><a href="' + 안전('/' + String(p.downloadUrl).replace(/^\/+/, '')) + '">일정표 PDF 내려받기</a></p>');
  줄들.push('<p><a href="/contact.html">예약 문의하기</a> · <a href="/tours.html">전체 여행상품 보기</a> · <a href="/">유포리아투어 첫 화면</a></p>');

  /* 함께 보면 좋은 상품 — 같은 갈래(cats 첫 칸) 상품 6개까지 */
  const 갈래 = Array.isArray(p.cats) && p.cats[0];
  const 이웃 = (모두 || []).filter(function (x) {
    return x && x.detail && x.id !== p.id && 갈래 && Array.isArray(x.cats) && x.cats.indexOf(갈래) !== -1 &&
           !/[\s"'<>]/.test(x.id);
  }).slice(0, 6);
  if (이웃.length) {
    줄들.push('<h2>함께 보면 좋은 상품</h2><ul>' + 이웃.map(function (x) {
      return '<li><a href="/p/' + encodeURIComponent(x.id) + '">' + 안전(x.title) + '</a>' +
             (x.days ? ' · ' + 안전(x.days) : '') + '</li>';
    }).join('') + '</ul>');
  }
  return '<div class="layout" style="grid-template-columns:1fr;"><div class="section-inner eu-ssr">' +
         줄들.join('\n') + '</div></div>';
}

const 본문꾸밈 =
  '<style>.eu-ssr h1{font-size:24px;line-height:1.35;margin:6px 0 12px}' +
  '.eu-ssr h2{font-size:17px;margin:24px 0 8px}.eu-ssr p,.eu-ssr li{font-size:14.5px;line-height:1.8}' +
  '.eu-ssr ul,.eu-ssr ol{padding-left:20px;margin:0}.eu-ssr .eu-ssr-meta{font-size:13px;opacity:.75;margin:0}' +
  '.eu-ssr a{color:inherit;text-decoration:underline}</style>';

exports.handler = async function (event) {
  const 주기 = {
    'Content-Type': 'text/html; charset=utf-8',
    /* 미리보기를 만드는 쪽도, 손님도 같은 것을 받습니다.
       10분마다 새로 만들되 그 사이에는 CDN 이 바로 내줍니다. */
    'Cache-Control': 'public, max-age=0, must-revalidate',
    'Netlify-CDN-Cache-Control': 'public, s-maxage=600, stale-while-revalidate=86400',
    'X-Robots-Tag': 'all',
  };

  const 아이디 = 아이디찾기(event);

  /* 주소로 만들 수 없는 값은 바로 목록으로 보냅니다 */
  const 쓸만한 = 아이디 && 아이디.length <= 80 &&
                 !/[\s"'<>\u0000-\u001f]/.test(아이디);
  if (!쓸만한) {
    return { statusCode: 302, headers: { Location: '/tours.html' }, body: '' };
  }

  const 바탕 = 도메인;
  let 자료;
  try {
    자료 = await 가져오기(바탕);
  } catch (e) {
    console.error('[product-og] 못 읽음:', e && e.message);
    /* 틀을 못 가져왔으면 원래 쪽으로 보냅니다 — 빈 쪽을 보여 주지 않습니다 */
    return {
      statusCode: 302,
      headers: { Location: '/product.html?id=' + encodeURIComponent(아이디) },
      body: '',
    };
  }

  const p = 자료.상품.find(function (x) {
    return x && x.id === 아이디 && x.detail;
  });

  /* 그런 상품이 없으면 틀을 손대지 않고 그대로 — product.html 이
     「상품을 찾을 수 없어요」를 스스로 보여 줍니다 */
  if (!p) {
    return {
      statusCode: 404,
      headers: 주기,
      body: 자료.틀.replace(
        '</head>',
        '<script>window.__EU_PID=' + 스크립트안전(아이디) + ';</script></head>'
      ),
    };
  }

  const 제목 = p.title + ' — 유포리아투어';
  const 설명짧 = 줄이기((p.detail && p.detail.lead) || p.summary, 150);
  const 사진 = 사진주소(p['카드사진']);
  const 주소 = 도메인 + '/p/' + encodeURIComponent(아이디);
  const 요금 = 요금뽑기(p);

  let 글 = 자료.틀;

  /* ── 상대 주소 바로잡기 ─────────────────────────────────
     이 쪽은 /p/<상품id> 라는 한 칸 아래 주소로 보여 줍니다.
     그런데 product.html 안에는 products.js · about.html 처럼
     「/」 없이 적힌 주소가 많습니다. 그대로 두면 브라우저가
     /p/products.js 를 찾다가 못 찾아 쪽이 통째로 안 그려집니다.
     (실제로 「PRODUCTS is not defined」 가 났습니다)

     <base> 를 머리말 맨 앞에 넣어 「상대 주소는 뿌리에서 센다」고
     알려 주면 한 줄로 끝납니다. product.html 에는 href="#…" 식의
     제자리 링크가 하나도 없어서 부작용이 없습니다. */
  if (글.indexOf('<base ') === -1) {
    글 = 글.replace(/<head([^>]*)>/i, '<head$1><base href="' + 도메인 + '/">');
  }

  /* ── 머리말 갈아 끼우기 ───────────────────────────────── */
  글 = 갈기(글, /<title>[\s\S]*?<\/title>/i, '<title>' + 안전(제목) + '</title>');
  글 = 갈기(글, /<meta\s+name="description"[^>]*>/i,
            '<meta name="description" content="' + 안전(설명짧) + '">');
  글 = 갈기(글, /<link\s+rel="canonical"[^>]*>/i,
            '<link rel="canonical" href="' + 안전(주소) + '">');
  글 = 갈기(글, /<meta\s+property="og:title"[^>]*>/i,
            '<meta property="og:title" content="' + 안전(제목) + '">');
  글 = 갈기(글, /<meta\s+property="og:description"[^>]*>/i,
            '<meta property="og:description" content="' + 안전(설명짧) + '">');
  글 = 갈기(글, /<meta\s+property="og:url"[^>]*>/i,
            '<meta property="og:url" content="' + 안전(주소) + '">');
  글 = 갈기(글, /<meta\s+property="og:image"[^>]*>/i,
            '<meta property="og:image" content="' + 안전(사진) + '">');
  글 = 갈기(글, /<meta\s+property="og:image:alt"[^>]*>/i,
            '<meta property="og:image:alt" content="' + 안전(p.title) + '">');
  글 = 갈기(글, /<meta\s+name="twitter:title"[^>]*>/i,
            '<meta name="twitter:title" content="' + 안전(제목) + '">');
  글 = 갈기(글, /<meta\s+name="twitter:description"[^>]*>/i,
            '<meta name="twitter:description" content="' + 안전(설명짧) + '">');
  글 = 갈기(글, /<meta\s+name="twitter:image"[^>]*>/i,
            '<meta name="twitter:image" content="' + 안전(사진) + '">');

  /* 카드 사진은 세로(660×840)입니다. 가로 1200×630 이라고 적어 두면
     카카오톡이 잘라 버리므로, 카드 사진을 쓸 때는 크기를 바로잡습니다. */
  if (사진 !== 기본사진) {
    글 = 갈기(글, /<meta\s+property="og:image:width"[^>]*>/i,
              '<meta property="og:image:width" content="660">');
    글 = 갈기(글, /<meta\s+property="og:image:height"[^>]*>/i,
              '<meta property="og:image:height" content="840">');
  }

  /* ── 구글이 읽는 구조화 자료 ───────────────────────────
     요금을 모르는 상품은 offers 를 아예 빼 둡니다.
     「문의」를 0원으로 적으면 검색 결과에 0유로로 뜹니다. */
  const 짜임 = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: p.title,
    description: 줄이기((p.detail && p.detail.lead) || p.summary, 300),
    url: 주소,
    image: 사진,
    /* 첫 쪽(index.html)에 적어 둔 회사 정보와 같은 @id 를 씁니다.
       이렇게 묶어 두면 구글이 「이 상품을 파는 곳 = 그 회사」로 읽습니다.
       회사 정보를 여기서 또 길게 적으면 두 곳이 어긋날 때 서로 부딪칩니다. */
    provider: {
      '@id': 도메인 + '/#organization',
      '@type': 'TravelAgency',
      name: '유포리아투어 Euforia Tour',
      url: 도메인 + '/',
    },
  };
  const 들른곳 = 장소들(p);
  if (들른곳.length) {
    짜임.itinerary = {
      '@type': 'ItemList',
      name: p.days || '',
      numberOfItems: 들른곳.length,
      itemListElement: 들른곳.map(function (n, k) {
        return { '@type': 'ListItem', position: k + 1, item: { '@type': 'Place', name: n } };
      }),
    };
  } else if (p.days) 짜임.itinerary = { '@type': 'ItemList', name: p.days };
  if (Array.isArray(p.tags) && p.tags.length) 짜임.keywords = p.tags.join(', ');
  if (요금 != null) {
    짜임.offers = {
      '@type': 'Offer',
      price: String(요금),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: 주소,
    };
  }

  /* 첫 화면 › 여행상품 › 이 상품 — 검색 결과에 경로로 보입니다 */
  const 길 = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '유포리아투어', item: 도메인 + '/' },
      { '@type': 'ListItem', position: 2, name: '여행상품', item: 도메인 + '/tours.html' },
      { '@type': 'ListItem', position: 3, name: p.title, item: 주소 },
    ],
  };

  const 덧 =
    '<script type="application/ld+json">' +
      JSON.stringify(짜임).replace(/</g, '\\u003c') +
    '</script>' +
    '<script type="application/ld+json">' +
      JSON.stringify(길).replace(/</g, '\\u003c') +
    '</script>' + 본문꾸밈 +
    /* 주소에 ?id= 가 없으므로 어느 상품인지 알려 줍니다 */
    '<script>window.__EU_PID=' + 스크립트안전(아이디) + ';</script>';

  글 = 글.indexOf('</head>') !== -1 ? 글.replace('</head>', 덧 + '</head>') : (글 + 덧);

  /* ── 본문 미리 채우기 (검색 로봇용 · 화면이 그려지면 바뀜) ── */
  try {
    const 본문 = 본문만들기(p, 자료.상품);
    const 자리 = /(<div class="section" id="content">)\s*(<!--[\s\S]*?-->)?/i;
    if (자리.test(글)) 글 = 글.replace(자리, function (m, 앞) { return 앞 + 본문; });
  } catch (e) {
    console.error('[product-og] 본문 만들기 실패:', e && e.message);
  }

  return { statusCode: 200, headers: 주기, body: 글 };
};
