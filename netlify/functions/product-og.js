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
  if (p.days) 짜임.itinerary = { '@type': 'ItemList', name: p.days };
  if (요금 != null) {
    짜임.offers = {
      '@type': 'Offer',
      price: String(요금),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: 주소,
    };
  }

  const 덧 =
    '<script type="application/ld+json">' +
      JSON.stringify(짜임).replace(/</g, '\\u003c') +
    '</script>' +
    /* 주소에 ?id= 가 없으므로 어느 상품인지 알려 줍니다 */
    '<script>window.__EU_PID=' + 스크립트안전(아이디) + ';</script>';

  글 = 글.indexOf('</head>') !== -1 ? 글.replace('</head>', 덧 + '</head>') : (글 + 덧);

  return { statusCode: 200, headers: 주기, body: 글 };
};
