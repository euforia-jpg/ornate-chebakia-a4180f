/*
  ===========================================================
  RSS (네이버 서치어드바이저에 내는 「새 글 목록」)  — 2026-11
  -----------------------------------------------------------
  주소 : https://toureplus.co.kr/rss.xml
         (_redirects 의 「/rss.xml → 이 함수」 규칙으로 열립니다)

  하는 일
    홈페이지의 products.js 를 읽어 상품 쪽(/p/상품id)과 여행 안내 글을
    RSS 2.0 목록으로 만들어 돌려줍니다. 사이트맵(sitemap.js)과 같은 방식이라
    대쉬보드에서 상품을 더하거나 빼도 따로 고치실 것이 없습니다.

  「언제 올라온 상품인가」
    products.js 에는 상품 등록 날짜가 없습니다. 그래서 이 함수가 상품을
    처음 본 날을 Netlify 저장소(euforia-stats 창고의 rss/첫날 칸)에 적어 둡니다.
      · 이 함수를 처음 켠 날 있던 상품은 모두 그날 날짜로 적힙니다.
      · 그 뒤로 새로 생긴 상품은 처음 보인 날짜로 적혀 목록 맨 위에 옵니다.
    네이버는 이 날짜를 보고 새 상품을 먼저 가져갑니다.

  products.js 를 못 읽거나 저장소를 못 쓰면?
    안내 글만이라도, 또는 고정 날짜로라도 목록을 만들어 돌려줍니다.
    RSS 가 비거나 깨지는 일은 없습니다.
  ===========================================================
*/

'use strict';

const { connectLambda, getStore } = require('@netlify/blobs');

const 도메인 = 'https://toureplus.co.kr';
const 창고 = 'euforia-stats';
const 칸 = 'rss/첫날';
const 기본날 = '2026-11-20';          /* 저장소를 못 쓸 때 쓰는 날짜 */
const 최대 = 100;                      /* 목록에 넣는 최대 개수 */

/* 여행 안내 글 — 사이트에 올린 날짜 그대로 */
const 안내글 = [
  { 주소: 'guide.html', 제목: '스페인 여행 안내 — 공항·이동·근교·라리가', 날: '2026-11-14',
    설명: '스페인 현지 여행사 유포리아투어가 정리한 스페인 여행 안내 — 공항 이동, 도시 간 이동, 근교 당일치기, 라리가 직관 방법.' },
  { 주소: 'guide-airport.html', 제목: '바르셀로나·마드리드 공항에서 시내 가는 법', 날: '2026-11-14',
    설명: '바르셀로나 엘프라트·마드리드 바라하스 공항에서 시내까지 공항버스·지하철·기차·택시·공항 픽업으로 가는 방법을 정리했습니다.' },
  { 주소: 'guide-barcelona-madrid.html', 제목: '바르셀로나 마드리드 이동 방법 — 고속열차·비행기·차량 비교', 날: '2026-11-14',
    설명: '바르셀로나와 마드리드 사이를 고속열차·비행기·차량으로 이동하는 방법을 비교하고, 몬세라트·사라고사를 들르는 방법도 소개합니다.' },
  { 주소: 'guide-madrid-daytrip.html', 제목: '마드리드 근교 당일치기 — 톨레도·세고비아·아빌라 가는 법', 날: '2026-11-14',
    설명: '마드리드에서 톨레도·세고비아·아빌라로 당일치기하는 방법을 기차·버스·차량별로 정리하고, 두 도시를 하루에 보는 방법도 소개합니다.' },
  { 주소: 'guide-laliga.html', 제목: '라리가 직관 가이드 — 티켓 구하는 법·경기 시간·경기장 가는 법', 날: '2026-11-14',
    설명: '스페인 여행 중 라리가 경기를 직관하려면 알아야 할 티켓 구하는 법, 경기 시간이 정해지는 시기, 경기장 가는 법을 정리했습니다.' },
];

/* 스페인 현지 날짜 */
function 오늘() {
  const f = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit',
  });
  const p = {};
  f.formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
  return p.year + '-' + p.month + '-' + p.day;
}

/* RSS 날짜 모양 (예: Fri, 20 Nov 2026 09:00:00 +0000) — 스페인 아침 10시쯤으로 적습니다 */
function rss날짜(날) {
  const d = new Date(날 + 'T09:00:00Z');
  return isNaN(d) ? new Date().toUTCString() : d.toUTCString().replace('GMT', '+0000');
}

function 안전(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function 글만(s, n) {
  const t = String(s == null ? '' : s).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return t.length > n ? t.slice(0, n - 1) + '…' : t;
}

function 절대(u) {
  if (!u) return '';
  if (/^https?:\/\//.test(u)) return u;
  return 도메인 + (u.charAt(0) === '/' ? '' : '/') + u;
}

/* products.js 에서 상품 배열만 떼어 냅니다 (sitemap.js 와 같은 방법) */
function 상품뽑기(글) {
  const 시 = 글.indexOf('[');
  if (시 === -1) return [];
  let 끝 = 글.indexOf('\n];', 시);
  끝 = 끝 === -1 ? 글.lastIndexOf(']') + 1 : 끝 + 2;
  try {
    const arr = JSON.parse(글.slice(시, 끝));
    return Array.isArray(arr) ? arr.filter(function (p) {
      return p && typeof p.id === 'string' && p.detail && p.title &&
             p.id.length > 0 && p.id.length <= 80 && !/[\s"'<>\u0000-\u001f]/.test(p.id);
    }) : [];
  } catch (e) {
    return [];
  }
}

async function 상품목록() {
  try {
    const r = await fetch(도메인 + '/products.js', { headers: { 'Cache-Control': 'no-cache' } });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return 상품뽑기(await r.text());
  } catch (e) {
    console.error('[rss] products.js 읽기 실패:', e && e.message);
    return [];
  }
}

/* 상품을 처음 본 날 — 저장소에 적어 두고 읽습니다 */
async function 첫날표(event, 상품) {
  const 지금 = 오늘();
  try {
    if (event && event.blobs) connectLambda(event);
    const db = getStore(창고);
    const 표 = (await db.get(칸, { type: 'json' })) || {};
    let 바뀜 = false;
    상품.forEach(function (p) {
      if (!표[p.id]) { 표[p.id] = 지금; 바뀜 = true; }
    });
    if (바뀜) await db.setJSON(칸, 표);
    return 표;
  } catch (e) {
    console.error('[rss] 저장소 읽기 실패:', e && e.message);
    const 표 = {};
    상품.forEach(function (p) { 표[p.id] = 기본날; });
    return 표;
  }
}

exports.handler = async function (event) {
  const 상품 = await 상품목록();
  const 표 = 상품.length ? await 첫날표(event, 상품) : {};

  const 항목 = [];
  상품.forEach(function (p, i) {
    항목.push({
      제목: 글만(p.title, 120),
      주소: 도메인 + '/p/' + encodeURIComponent(p.id),
      설명: 글만((p.detail && p.detail.lead) || p.summary || p.title, 300),
      날: 표[p.id] || 기본날,
      사진: p['카드사진'] ? 절대(p['카드사진']) : '',
      분류: '여행상품',
      순서: i,
    });
  });
  안내글.forEach(function (g, i) {
    항목.push({ 제목: g.제목, 주소: 도메인 + '/' + g.주소, 설명: g.설명, 날: g.날, 사진: '', 분류: '여행 안내', 순서: 1000 + i });
  });

  /* 새로 생긴 것 먼저, 같은 날이면 products.js 순서대로 */
  항목.sort(function (a, b) { return b.날 < a.날 ? -1 : b.날 > a.날 ? 1 : a.순서 - b.순서; });
  const 목록 = 항목.slice(0, 최대);
  const 최신 = 목록.length ? 목록[0].날 : 기본날;

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n' +
    '<channel>\n' +
    '  <title>유포리아투어 — 스페인·포르투갈 현지 여행사</title>\n' +
    '  <link>' + 도메인 + '/</link>\n' +
    '  <description>마드리드 현지 여행사 유포리아투어의 스페인·포르투갈·모로코 여행상품과 여행 안내</description>\n' +
    '  <language>ko</language>\n' +
    '  <lastBuildDate>' + rss날짜(최신) + '</lastBuildDate>\n' +
    '  <atom:link href="' + 도메인 + '/rss.xml" rel="self" type="application/rss+xml"/>\n' +
    목록.map(function (x) {
      return '  <item>\n' +
        '    <title>' + 안전(x.제목) + '</title>\n' +
        '    <link>' + 안전(x.주소) + '</link>\n' +
        '    <guid isPermaLink="true">' + 안전(x.주소) + '</guid>\n' +
        '    <description>' + 안전(x.설명) + '</description>\n' +
        '    <category>' + 안전(x.분류) + '</category>\n' +
        '    <pubDate>' + rss날짜(x.날) + '</pubDate>\n' +
        (x.사진 ? '    <enclosure url="' + 안전(x.사진) + '" type="' + (/\.png$/i.test(x.사진) ? 'image/png' : /\.webp$/i.test(x.사진) ? 'image/webp' : 'image/jpeg') + '" length="0"/>\n' : '') +
        '  </item>';
    }).join('\n') + '\n' +
    '</channel>\n' +
    '</rss>\n';

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      /* 검색엔진은 자주 오지 않습니다. 한 시간만 재어 두고 그 뒤로는 새로 만듭니다 */
      'Cache-Control': 'public, max-age=3600',
      'X-Robots-Tag': 'noindex',
    },
    body: xml,
  };
};
