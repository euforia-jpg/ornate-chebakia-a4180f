/*
  ===========================================================
  사이트맵 (검색엔진에게 "우리 쪽이 여기 있다" 고 알려 주는 목록)
  -----------------------------------------------------------
  ★ GitHub 토큰도, 저장소도 쓰지 않습니다 ★

  하는 일은 하나뿐입니다.
  홈페이지의 products.js 를 읽어, 상품 상세 쪽 주소까지 모두 넣은
  sitemap.xml 을 그때그때 만들어 돌려줍니다.

  왜 파일로 두지 않고 함수로 만드는가
    상품은 대쉬보드에서 늘 더하고 빼십니다.
    sitemap.xml 을 파일로 두면 그때마다 손으로 고쳐야 하고,
    고치는 것을 잊으면 새 상품이 검색에 안 잡힙니다.
    이 함수는 부를 때마다 products.js 를 다시 읽으므로
    상품을 올리시면 사이트맵도 저절로 따라옵니다.

  products.js 를 못 읽으면?
    아래 고정 목록(일반 쪽)만으로 사이트맵을 만들어 돌려줍니다.
    사이트맵이 비거나 깨지는 일은 없습니다.
  ===========================================================
*/

'use strict';

const 도메인 = 'https://toureplus.co.kr';

/* 한 번 읽은 products.js 는 잠시 들고 있습니다 (검색엔진이 자주 부르지는 않습니다) */
const 캐시시간 = 30 * 60 * 1000;   // 30분
let 캐시 = { 때: 0, 상품: null };

/*
  일반 쪽 — 손님에게 보여 주는 쪽만 넣습니다.
  admin.html, audio-admin.html 같은 관리 쪽은 robots.txt 에서도 빼 두었으므로
  여기에도 넣지 않습니다.
*/
const 일반 = [
  ['', 1.0, 'daily'],
  ['tours.html', 0.9, 'weekly'],
  ['builder.html', 0.9, 'monthly'],
  ['hotels.html', 0.9, 'monthly'],
  ['golf.html', 0.8, 'monthly'],
  ['contact.html', 0.8, 'monthly'],
  ['matchday.html', 0.8, 'weekly'],
  ['concert.html', 0.8, 'weekly'],
  ['move.html', 0.7, 'monthly'],
  ['about.html', 0.7, 'yearly'],
  ['plan.html', 0.6, 'monthly'],
  ['audio-guide.html', 0.5, 'monthly'],
  ['faq.html', 0.5, 'yearly'],
  ['deposit.html', 0.4, 'yearly'],
  ['cancel.html', 0.3, 'yearly'],
];

/* 스페인 현지 날짜 (홈페이지 발행 시각과 같은 기준) */
function 오늘() {
  const f = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit',
  });
  const p = {};
  f.formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
  return p.year + '-' + p.month + '-' + p.day;
}

/* XML 안에서 뜻이 달라지는 다섯 글자를 막아 둡니다 */
function 안전(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

/*
  products.js 에서 상품 id 를 뽑습니다.

  파일 생김새는 이렇습니다.
      const PRODUCTS = [ { "id": "...", ... }, … ];
      function euFare(...) { … }
  배열만 떼어 내 JSON 으로 읽습니다. 끝을 '\n];' 로 찾는 것은
  뒤에 붙은 함수들까지 통째로 삼키지 않기 위해서입니다.

  상세 쪽이 열리는 상품만 넣습니다.
  product.html 은 `detail` 이 없는 항목을 "상품을 찾을 수 없어요" 로 돌리므로,
  그런 항목을 사이트맵에 넣으면 검색엔진에게 빈 쪽을 알려 주는 셈이 됩니다.
*/
function 상품뽑기(글) {
  const 시 = 글.indexOf('[');
  if (시 === -1) return [];
  let 끝 = 글.indexOf('\n];', 시);
  끝 = 끝 === -1 ? 글.lastIndexOf(']') + 1 : 끝 + 2;
  let arr;
  try {
    arr = JSON.parse(글.slice(시, 끝));
  } catch (e) {
    return [];
  }
  if (!Array.isArray(arr)) return [];
  return arr
    .filter(function (p) {
      /*
        id 는 아래에서 encodeURIComponent 로 감싸므로 한글 id 도 괜찮습니다.
        주소로 만들 수 없는 것(빈 값·공백·따옴표·제어문자)만 걸러 냅니다.
        — 조용히 빠지는 상품이 생기지 않도록 넓게 받습니다.
      */
      return p && typeof p.id === 'string' && p.detail &&
             p.id.length > 0 && p.id.length <= 80 &&
             !/[\s"'<>\u0000-\u001f]/.test(p.id);
    })
    .map(function (p) { return p.id; });
}

/* 같은 사이트의 products.js 를 그대로 가져옵니다 (토큰이 필요 없는 공개 파일입니다) */
async function 상품목록(주소) {
  if (캐시.상품 && (Date.now() - 캐시.때) < 캐시시간) return 캐시.상품;
  try {
    const r = await fetch(주소 + '/products.js', {
      headers: { 'Cache-Control': 'no-cache' },
    });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const 들 = 상품뽑기(await r.text());
    if (들.length) {
      캐시 = { 때: Date.now(), 상품: 들 };
      return 들;
    }
    throw new Error('상품을 읽지 못했습니다');
  } catch (e) {
    console.error('[sitemap] products.js 읽기 실패:', e && e.message);
    /* 지난번에 읽어 둔 것이 있으면 그것이라도 씁니다 */
    return 캐시.상품 || [];
  }
}

function 줄(주소, 날, 중요도, 주기) {
  return '  <url><loc>' + 안전(주소) + '</loc>' +
         '<lastmod>' + 날 + '</lastmod>' +
         '<changefreq>' + 주기 + '</changefreq>' +
         '<priority>' + 중요도.toFixed(1) + '</priority></url>';
}

exports.handler = async function (event) {
  event = event || {};

  /*
    어느 주소로 들어왔든 사이트맵에는 늘 정식 도메인을 적습니다.
    (www 가 붙은 주소나 netlify.app 주소로 들어와도 한 가지로 맞춥니다)
  */
  const 기준 = 도메인;

  const 날 = 오늘();
  const 상품 = await 상품목록(기준);

  const 줄들 = [];
  일반.forEach(function (x) {
    줄들.push(줄(기준 + '/' + x[0], 날, x[1], x[2]));
  });
  상품.forEach(function (id) {
    /* 짧은 주소(/p/<상품id>)를 알려 줍니다 — 이쪽은 넷리파이 함수가
       그 상품의 제목·설명·카드 사진으로 머리말을 채워 내보냅니다.
       /product.html?id=… 를 알려 주면 38개 상품이 전부 같은 머리말로
       보여서, 구글이 한 쪽으로 묶어 버립니다. */
    줄들.push(줄(기준 + '/p/' + encodeURIComponent(id), 날, 0.8, 'weekly'));
  });

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    줄들.join('\n') + '\n' +
    '</urlset>\n';

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      /* 검색엔진은 자주 오지 않습니다. 한 시간만 재어 두고 그 뒤로는 새로 만듭니다 */
      'Cache-Control': 'public, max-age=3600',
      'X-Robots-Tag': 'noindex',
    },
    body: xml,
  };
};
