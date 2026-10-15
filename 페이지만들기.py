# -*- coding: utf-8 -*-
"""golf-clubs.json + 지도땅.json 에서 손님용 화면을 찍어냅니다.
   '_' 로 시작하는 칸(요금·수수료·연락처)은 여기서 걸러져 화면에 들어가지 않습니다."""
import json, re, os

원본 = json.load(open("golf-clubs.json", encoding="utf-8"))
땅 = json.load(open("지도땅.json", encoding="utf-8"))

def 걸러(x):
    if isinstance(x, dict):
        return {k: 걸러(v) for k, v in x.items() if not k.startswith("_")}
    if isinstance(x, list):
        return [걸러(v) for v in x]
    return x

기준공개 = {k: 원본["기준"][k] for k in ("조사일", "요금안내")}
자료 = {
    "기준": 기준공개,
    "권역": 걸러(원본["권역"]),
    "골프장": [걸러(g) for g in 원본["골프장"]],
    "땅": 땅,
}

# 내부 정보가 새지 않았는지 확인 — 금액·수수료·연락처가 손님 화면에 섞이면 안 됩니다
덩이 = json.dumps({k: v for k, v in 자료.items() if k != "땅"}, ensure_ascii=False)
for 금지 in ["€", "유로", "EUR", "커미션", "_내부", "@", "+34", "reservas", "reservation"]:
    assert 금지 not in 덩이, ("내부 정보가 남았습니다: " + 금지)
금액 = re.findall(r"\d[\d,]*\s*(?:€|유로|EUR)|(?:€|EUR)\s*\d", 덩이)
assert not 금액, ("금액이 남았습니다: " + str(금액))
for g in 자료["골프장"]:
    assert 36.0 <= g["위도"] <= 37.6 and -9.0 <= g["경도"] <= -4.5, ("좌표 범위 밖", g["id"])

PAGE = r"""<title>유포리아 골프</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,600&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans+KR:wght@400;500;600;700&display=swap">
<style>
/* 레이아웃 — 머리말 · 권역 탭 · 지도(핀 번호 = 카드 번호) · 코스 카드 격자.
   밝은 한낮의 코스 느낌. 바탕은 페어웨이를 깎은 줄무늬를 아주 옅게 깔았습니다. */
:root{
  color-scheme: light;
  --paper:#F3F7F0;       /* 페어웨이 빛 */
  --mow:#EFF4EB;         /* 잔디 깎은 줄 */
  --card:#FFFFFF;
  --ink:#152018; --ink-2:#5C6E62; --line:#DCE6D9;
  --fair:#2C6B46;        /* 페어웨이 — 주 액센트 */
  --deep:#17402B;        /* 짙은 그늘 */
  --sand:#C79A52;        /* 벙커 모래 */
  --sea:#DCEAEC;         /* 바다 */
  --land:#E9EFE2;        /* 지도 땅 */
  --wash:#E8F1E7;
  --shadow:0 1px 2px rgba(21,32,24,.05), 0 12px 28px -20px rgba(21,32,24,.5);
  --disp:'Fraunces', Georgia, 'Times New Roman', serif;
  --body:'IBM Plex Sans KR', system-ui, -apple-system, 'Apple SD Gothic Neo', sans-serif;
  --data:'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
}
*{ box-sizing:border-box; }
body{
  margin:0; color:var(--ink); font-family:var(--body); font-size:15px; line-height:1.65;
  -webkit-font-smoothing:antialiased;
  background:
    repeating-linear-gradient(101deg, var(--mow) 0 54px, var(--paper) 54px 108px),
    linear-gradient(176deg, #EDF4EE 0%, var(--paper) 46%, #F5F8F1 100%);
  background-attachment: fixed;
}
body::before{ content:""; position:fixed; inset:0 0 auto; height:env(safe-area-inset-top, 0px);
              z-index:10; background:var(--paper); }
.wrap{ max-width:1140px; margin:0 auto;
       padding-left:max(16px, env(safe-area-inset-left, 0px));
       padding-right:max(16px, env(safe-area-inset-right, 0px)); }

/* ── 머리말 ───────────────────────────────── */
.top{ padding-block:34px 22px; }
.kicker{ font-family:var(--data); font-size:11px; letter-spacing:.15em; text-transform:uppercase;
         color:var(--fair); font-weight:500; margin:0 0 10px; }
h1{ font-family:var(--disp); font-weight:600; font-size:clamp(31px,5.5vw,48px); line-height:1.06;
    letter-spacing:-.018em; margin:0 0 13px; text-wrap:balance; }
h1 em{ font-style:italic; color:var(--fair); }
.lede{ margin:0; max-width:58ch; color:var(--ink-2); font-size:15.5px; }
.count{ display:flex; flex-wrap:wrap; gap:6px 18px; margin:18px 0 0; padding:0; list-style:none;
        font-family:var(--data); font-size:12px; color:var(--ink-2); font-variant-numeric:tabular-nums; }
.count b{ color:var(--ink); font-weight:500; }

/* ── 권역 탭 ───────────────────────────────── */
.bar{ position:sticky; top:env(safe-area-inset-top, 0px); z-index:9;
      background:rgba(243,247,240,.94); backdrop-filter:blur(8px);
      border-bottom:1px solid var(--line); }
.bar .wrap{ display:flex; gap:18px; align-items:center; overflow-x:auto; scrollbar-width:none; }
.bar .wrap::-webkit-scrollbar{ display:none; }
.tab{ all:unset; cursor:pointer; white-space:nowrap; padding:14px 0; font-size:14px; font-weight:600;
      color:var(--ink-2); border-bottom:2px solid transparent; margin-bottom:-1px; transition:color .15s; }
.tab:hover{ color:var(--ink); }
.tab[aria-selected="true"]{ color:var(--ink); border-bottom-color:var(--fair); }
.tab .n{ font-family:var(--data); font-size:11px; color:var(--ink-2); margin-left:5px;
         font-variant-numeric:tabular-nums; }
.tab:focus-visible{ outline:2px solid var(--fair); outline-offset:3px; border-radius:3px; }

/* ── 지도 ─────────────────────────────────── */
.mapwrap{ display:grid; grid-template-columns:1.55fr 1fr; gap:0; margin-block:22px 4px;
          background:var(--card); border:1px solid var(--line); border-radius:6px;
          box-shadow:var(--shadow); overflow:hidden; }
.mapbox{ position:relative; min-width:0; background:var(--sea); }
.mapbox svg{ display:block; width:100%; height:auto; }
.pin{ cursor:pointer; }
.pin .dot{ fill:var(--fair); stroke:#fff; stroke-width:2.4; }
.pin .num{ fill:#fff; font-family:var(--data); font-size:10px; font-weight:500; text-anchor:middle; }
.pin.rec .dot{ fill:var(--sand); }
.pin:hover .dot, .pin.on .dot{ fill:var(--deep); }
.pin:focus-visible{ outline:none; }
.pin:focus-visible .dot{ stroke:var(--deep); stroke-width:3.4; }
.town{ fill:var(--ink-2); font-family:var(--data); font-size:9.5px; letter-spacing:.04em; }
.scale{ position:absolute; left:12px; bottom:10px; font-family:var(--data); font-size:10px;
        color:var(--ink-2); display:flex; align-items:flex-end; gap:6px; }
.scale i{ display:block; height:5px; border:1px solid var(--ink-2); border-top:0; }
.legend{ border-left:1px solid var(--line); padding:16px 18px; min-width:0; overflow-y:auto; max-height:420px; }
.legend h3{ font-family:var(--data); font-size:10.5px; letter-spacing:.09em; text-transform:uppercase;
            color:var(--ink-2); margin:0 0 10px; font-weight:500; }
.legend ol{ margin:0; padding:0; list-style:none; display:grid; gap:2px; }
.legend button{ all:unset; cursor:pointer; display:flex; gap:9px; align-items:center; width:100%;
                padding:6px 8px; border-radius:4px; }
.legend button:hover, .legend button.on{ background:var(--wash); }
.legend button:focus-visible{ outline:2px solid var(--fair); outline-offset:-2px; }
.legend .b{ flex:0 0 20px; height:20px; border-radius:50%; background:var(--fair); color:#fff;
            font-family:var(--data); font-size:10px; display:inline-flex; align-items:center;
            justify-content:center; }
.legend .b.rec{ background:var(--sand); color:#20180A; }
.legend .t{ font-size:12.5px; line-height:1.4; min-width:0; }
.legend .t small{ display:block; color:var(--ink-2); font-size:11px; }
.maphint{ font-family:var(--data); font-size:11px; color:var(--ink-2); margin:10px 0 0; }

/* ── 거르개 ───────────────────────────────── */
.sift{ display:flex; flex-wrap:wrap; gap:8px; padding-block:20px 4px; }
.sift button{ all:unset; cursor:pointer; padding:6px 14px; border-radius:999px; font-size:12.5px;
              font-weight:600; color:var(--ink-2); border:1px solid var(--line); background:var(--card); }
.sift button:hover{ color:var(--ink); border-color:var(--fair); }
.sift button[aria-pressed="true"]{ background:var(--fair); border-color:var(--fair); color:#fff; }
.sift button:focus-visible{ outline:2px solid var(--fair); outline-offset:2px; }

/* ── 권역 소개 ─────────────────────────────── */
.area{ padding-block:20px 2px; }
.area h2{ font-family:var(--disp); font-weight:600; font-size:25px; margin:0 0 6px; letter-spacing:-.012em; }
.area p{ margin:0 0 10px; color:var(--ink-2); max-width:62ch; font-size:14.5px; }
.air{ display:flex; flex-wrap:wrap; gap:6px 14px; margin:0; padding:0; list-style:none;
      font-family:var(--data); font-size:11.5px; color:var(--ink-2); }
.air li::before{ content:"\2708 "; color:var(--sand); }

/* ── 카드 ─────────────────────────────────── */
.grid{ display:grid; grid-template-columns:repeat(auto-fill, minmax(330px,1fr)); gap:16px;
       padding-block:18px 38px; align-items:start; }
.club{ background:var(--card); border:1px solid var(--line); border-radius:5px; box-shadow:var(--shadow);
       overflow:hidden; min-width:0; scroll-margin-top:92px; transition:border-color .2s, box-shadow .2s; }
.club.on{ border-color:var(--fair); box-shadow:0 0 0 2px rgba(44,107,70,.18), var(--shadow); }
.club > .pad{ padding:18px 20px 16px; }
.head{ display:flex; gap:11px; align-items:flex-start; }
.head > div{ min-width:0; }
.no{ flex:0 0 26px; height:26px; border-radius:50%; background:var(--fair); color:#fff;
     font-family:var(--data); font-size:11.5px; display:inline-flex; align-items:center;
     justify-content:center; margin-top:2px; }
.no.rec{ background:var(--sand); color:#20180A; }
.tagrow{ display:flex; flex-wrap:wrap; gap:6px; margin:0 0 9px; }
.tag{ font-family:var(--data); font-size:10.5px; letter-spacing:.06em; text-transform:uppercase;
      padding:3px 8px; border-radius:2px; background:var(--wash); color:var(--fair); font-weight:500; }
.tag.rec{ background:var(--sand); color:#20180A; }
.name{ font-family:var(--disp); font-size:20px; font-weight:600; line-height:1.2; margin:0 0 3px;
       letter-spacing:-.012em; text-wrap:balance; }
.ko{ font-size:12.5px; color:var(--ink-2); margin:0 0 2px; }
.where{ font-family:var(--data); font-size:11.5px; color:var(--ink-2); margin:0; overflow-wrap:anywhere; }
.site{ display:inline-flex; align-items:center; gap:5px; margin:12px 0 0; font-size:12.5px;
       font-weight:600; color:var(--fair); text-decoration:none; border-bottom:1px solid currentColor;
       padding-bottom:1px; }
.site:hover{ color:var(--deep); }
.site:focus-visible{ outline:2px solid var(--fair); outline-offset:3px; border-radius:2px; }
.one{ margin:13px 0 0; font-size:14px; }

.card-row{ display:grid; gap:1px; background:var(--line); border-top:1px solid var(--line);
           border-bottom:1px solid var(--line); grid-template-columns:repeat(2,1fr); }
.card-row div{ background:var(--card); padding:9px 12px; min-width:0; }
.card-row div:last-child:nth-child(odd){ grid-column:1 / -1; }
.card-row dt{ font-family:var(--data); font-size:10px; letter-spacing:.08em; text-transform:uppercase;
              color:var(--ink-2); margin:0 0 2px; }
.card-row dd{ margin:0; font-size:12.5px; line-height:1.45; overflow-wrap:anywhere;
              font-variant-numeric:tabular-nums; }
.hotel{ display:flex; gap:9px; padding:12px 20px; background:var(--wash); font-size:12.5px; align-items:flex-start; }
.hotel .ic{ color:var(--fair); flex:0 0 auto; }
.hotel b{ font-weight:600; }
.hotel span{ color:var(--ink-2); }
.nohotel{ padding:12px 20px; font-size:12.5px; color:var(--ink-2); border-top:1px solid var(--line); margin:0; }

details{ border-top:1px solid var(--line); }
summary{ cursor:pointer; list-style:none; padding:12px 20px; font-size:12.5px; font-weight:600;
         color:var(--fair); display:flex; justify-content:space-between; align-items:center; gap:10px; }
summary::-webkit-details-marker{ display:none; }
summary .chev{ transition:transform .2s; font-family:var(--data); }
details[open] summary .chev{ transform:rotate(180deg); }
summary:focus-visible{ outline:2px solid var(--fair); outline-offset:-2px; }
.more{ padding:0 20px 18px; display:grid; gap:14px; }
.more h4{ font-family:var(--data); font-size:10.5px; letter-spacing:.09em; text-transform:uppercase;
          color:var(--ink-2); margin:0 0 6px; font-weight:500; }
.more ul{ margin:0; padding-left:17px; display:grid; gap:5px; font-size:13px; }
.more ul.plain{ list-style:none; padding-left:0; }
.more ul.plain li{ padding-left:14px; position:relative; }
.more ul.plain li::before{ content:""; position:absolute; left:0; top:.62em; width:5px; height:5px;
                           border-radius:50%; background:var(--sand); }
.hc{ font-family:var(--data); font-size:12.5px; font-variant-numeric:tabular-nums; margin:0; }

/* ── 꼬리말 ───────────────────────────────── */
.foot{ border-top:1px solid var(--line); background:rgba(255,255,255,.55); }
.foot .wrap{ padding-block:28px 42px; display:grid; gap:14px; }
.foot p{ margin:0; font-size:13px; color:var(--ink-2); max-width:62ch; }
.ask{ display:inline-flex; align-items:center; gap:8px; justify-self:start; padding:13px 24px;
      background:var(--fair); color:#fff; text-decoration:none; border-radius:4px;
      font-weight:600; font-size:14px; }
.ask:hover{ background:var(--deep); }
.ask:focus-visible{ outline:2px solid var(--sand); outline-offset:3px; }
.sig{ font-family:var(--data); font-size:11px; color:var(--ink-2); letter-spacing:.04em; }
.empty{ padding:46px 0 56px; text-align:center; color:var(--ink-2); font-size:14px; }

@media (max-width:860px){
  .mapwrap{ grid-template-columns:1fr; }
  .legend{ border-left:0; border-top:1px solid var(--line); max-height:none; }
}
@media (max-width:420px){
  .grid{ grid-template-columns:1fr; }
  .club > .pad{ padding:16px 16px 14px; }
  .hotel, .nohotel, summary{ padding-left:16px; padding-right:16px; }
  .more{ padding-left:16px; padding-right:16px; }
}
html{ scroll-behavior:smooth; }
@media (prefers-reduced-motion: reduce){ *{ transition:none !important; } html{ scroll-behavior:auto !important; } }
</style>

<header class="top"><div class="wrap">
  <p class="kicker">Euforia Tour &middot; Golf</p>
  <h1>이베리아 반도의 <em>코스</em>를<br>한자리에</h1>
  <p class="lede">스페인 남부와 포르투갈 남부에서 유포리아투어가 직접 확인한 골프장입니다.
     라이더컵과 솔하임컵을 치른 코스부터 호텔이 코스 안에 있는 리조트까지,
     지도에서 위치를 보고 일정에 맞춰 고르실 수 있습니다.</p>
  <ul class="count" id="count"></ul>
</div></header>

<nav class="bar" aria-label="권역"><div class="wrap" id="tabs" role="tablist"></div></nav>

<main class="wrap">
  <section class="mapwrap" aria-label="골프장 위치">
    <div class="mapbox" id="mapbox"></div>
    <div class="legend">
      <h3 id="legendTitle">코스 위치</h3>
      <ol id="legend"></ol>
      <p class="maphint">번호를 누르면 그 코스로 내려갑니다.</p>
    </div>
  </section>

  <div class="sift" id="sift" role="group" aria-label="골라 보기">
    <button type="button" data-f="all" aria-pressed="true">전체</button>
    <button type="button" data-f="rec" aria-pressed="false">단체 추천</button>
    <button type="button" data-f="hotel" aria-pressed="false">호텔 있는 곳</button>
  </div>
  <div id="list"></div>
</main>

<footer class="foot"><div class="wrap">
  <p id="noteFare"></p>
  <p>핸디캡 제한과 복장 규정은 코스마다 다릅니다. 가시기 전에 확인해 드리고,
     티타임과 버기&middot;캐디&middot;클럽 대여까지 함께 잡아 드립니다.</p>
  <a class="ask" href="https://www.toureplus.co.kr/contact.html" target="_blank" rel="noopener">
    골프 일정 문의하기 <span aria-hidden="true">&rarr;</span></a>
  <p class="sig" id="sig"></p>
</div></footer>

<script type="application/json" id="data">__DATA__</script>
<script>
(function(){
  var D = JSON.parse(document.getElementById('data').textContent);
  var esc = function(s){ return String(s==null?'':s).replace(/[&<>"]/g, function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };

  var 권역 = D.권역, 전부 = D.골프장, 땅 = D.땅;
  var state = { 권역: 권역[0].id, 거르개: 'all' };

  document.getElementById('count').innerHTML =
    '<li>코스 <b>' + 전부.length + '</b>곳</li>' +
    '<li>권역 <b>' + 권역.length + '</b>곳</li>' +
    '<li>코스 안에 호텔 <b>' + 전부.filter(function(g){ return g.호텔; }).length + '</b>곳</li>';
  document.getElementById('noteFare').textContent = D.기준.요금안내;
  document.getElementById('sig').textContent = '조사 ' + D.기준.조사일 + ' · 유포리아투어';

  document.getElementById('tabs').innerHTML = 권역.map(function(r){
    var n = 전부.filter(function(g){ return g.권역 === r.id; }).length;
    return '<button type="button" class="tab" role="tab" data-r="' + esc(r.id) + '"' +
           ' aria-selected="' + (r.id === state.권역) + '">' + esc(r.이름) +
           '<span class="n">' + n + '</span></button>';
  }).join('');

  function 보일것(){
    return 전부.filter(function(g){
      if(g.권역 !== state.권역) return false;
      if(state.거르개 === 'rec') return !!g.단체추천;
      if(state.거르개 === 'hotel') return !!g.호텔;
      return true;
    });
  }

  /* ───────── 지도 — 경위도를 그 자리에서 투영합니다.
     보이는 코스에 맞춰 창이 바뀌므로 권역을 바꾸면 그 동네로 확대됩니다. ───────── */
  var BOX = { W: 660, H: 400 };

  function 창만들기(목록){
    var la = 목록.map(function(g){ return g.위도; }), ln = 목록.map(function(g){ return g.경도; });
    var 왼 = Math.min.apply(null, ln), 오 = Math.max.apply(null, ln),
        아래 = Math.min.apply(null, la), 위 = Math.max.apply(null, la);
    var 여1 = Math.max((오 - 왼) * 0.34, 0.14), 여2 = Math.max((위 - 아래) * 0.34, 0.11);
    왼 -= 여1; 오 += 여1; 아래 -= 여2; 위 += 여2;

    var 최소가로 = 0.45, 최소세로 = 0.32;
    var cx = (왼 + 오) / 2, cy = (아래 + 위) / 2;
    if(오 - 왼 < 최소가로){ 왼 = cx - 최소가로/2; 오 = cx + 최소가로/2; }
    if(위 - 아래 < 최소세로){ 아래 = cy - 최소세로/2; 위 = cy + 최소세로/2; }

    var k = Math.cos((아래 + 위) / 2 * Math.PI / 180);   /* 위도에 따른 가로 줄어듦 보정 */
    var 폭 = (오 - 왼) * k, 높 = (위 - 아래), 바람 = BOX.W / BOX.H;
    if(폭 / 높 < 바람){ var 새폭 = 높 * 바람 / k; cx = (왼+오)/2; 왼 = cx - 새폭/2; 오 = cx + 새폭/2; }
    else { var 새높 = 폭 / 바람; cy = (아래+위)/2; 아래 = cy - 새높/2; 위 = cy + 새높/2; }

    return { 왼:왼, 오:오, 아래:아래, 위:위, k:k, S: BOX.W / ((오 - 왼) * k) };
  }
  function 점(ln, la, c){ return [ (ln - c.왼) * c.k * c.S, (c.위 - la) * c.S ]; }

  function 땅길(코드, c){
    var out = [];
    (땅[코드] || '').split(';').forEach(function(고리){
      var d = '', 첫 = true;
      고리.split(' ').forEach(function(p){
        if(!p) return;
        var a = p.split(','), xy = 점(parseFloat(a[0]), parseFloat(a[1]), c);
        d += (첫 ? 'M' : 'L') + xy[0].toFixed(1) + ' ' + xy[1].toFixed(1); 첫 = false;
      });
      if(d) out.push(d + 'Z');
    });
    return out.join('');
  }
  function 축척(c){
    var 후보 = [2,5,10,20,25,50,100], 목표 = BOX.W * 0.22, 픽셀당 = c.S / 111.32, km = 후보[0];
    for(var i=0;i<후보.length;i++){ if(후보[i]*픽셀당 <= 목표) km = 후보[i]; }
    return { km: km, px: km * 픽셀당 };
  }

  function 지도그리기(목록){
    var box = document.getElementById('mapbox'), leg = document.getElementById('legend');
    if(!목록.length){ box.innerHTML = ''; leg.innerHTML = ''; return; }
    var c = 창만들기(목록);
    var 땅들 = ['PRT','ESP','MAR'].map(function(k){
      var d = 땅길(k, c);
      return d ? '<path d="' + d + '" fill="var(--land)" stroke="#C7D7C0" stroke-width="1"/>' : '';
    }).join('');
    var 핀 = 목록.map(function(g, i){
      var xy = 점(g.경도, g.위도, c);
      return '<g class="pin' + (g.단체추천 ? ' rec' : '') + '" data-id="' + esc(g.id) + '" tabindex="0" role="button"' +
        ' aria-label="' + esc(g.한글) + ' — 그 코스로 이동">' +
        '<title>' + esc(g.한글) + ' · ' + esc(g.도시) + '</title>' +
        '<circle class="dot" cx="' + xy[0].toFixed(1) + '" cy="' + xy[1].toFixed(1) + '" r="11"/>' +
        '<text class="num" x="' + xy[0].toFixed(1) + '" y="' + (xy[1] + 3.6).toFixed(1) + '">' + (i+1) + '</text>' +
        '</g>';
    }).join('');
    var s = 축척(c);
    box.innerHTML =
      '<svg viewBox="0 0 ' + BOX.W + ' ' + BOX.H + '" role="img" aria-label="골프장 위치 지도">' +
      '<rect width="' + BOX.W + '" height="' + BOX.H + '" fill="var(--sea)"/>' + 땅들 + 핀 + '</svg>' +
      '<div class="scale"><i style="width:' + s.px.toFixed(0) + 'px"></i>' + s.km + ' km</div>';
    leg.innerHTML = 목록.map(function(g, i){
      return '<li><button type="button" data-id="' + esc(g.id) + '">' +
        '<span class="b' + (g.단체추천 ? ' rec' : '') + '">' + (i+1) + '</span>' +
        '<span class="t">' + esc(g.한글) + '<small>' + esc(g.도시) + '</small></span></button></li>';
    }).join('');
  }

  /* ───────── 카드 ───────── */
  function 칸(라벨, 값){ return 값 ? '<div><dt>' + esc(라벨) + '</dt><dd>' + esc(값) + '</dd></div>' : ''; }
  function 묶음(제목, 줄들, 꼴){
    if(!줄들 || !줄들.length) return '';
    return '<div><h4>' + esc(제목) + '</h4><ul class="' + (꼴||'') + '">' +
      줄들.map(function(x){ return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>';
  }
  function 카드(g, i){
    var 줄 = 칸('홀', g.홀) + 칸('설계', g.설계) + 칸('개장', g.개장);
    var 숙 = g.호텔
      ? '<div class="hotel"><span class="ic" aria-hidden="true">■</span><div><b>' + esc(g.호텔.이름) + '</b>' +
        (g.호텔.비고 ? '<br><span>' + esc(g.호텔.비고) + '</span>' : '') + '</div></div>'
      : '<p class="nohotel">코스 안에 호텔은 없습니다. 가까운 호텔을 함께 잡아 드립니다.</p>';
    var 속 = (g.핸디캡 ? '<div><h4>핸디캡 상한</h4><p class="hc">' + esc(g.핸디캡) + '</p></div>' : '') +
             묶음('치른 대회', g.대회) + 묶음('알아두실 점', g.꼭보실점, 'plain') + 묶음('복장', g.복장, 'plain');
    return '<article class="club" id="c-' + esc(g.id) + '"><div class="pad">' +
      '<div class="head"><span class="no' + (g.단체추천 ? ' rec' : '') + '">' + (i+1) + '</span><div>' +
      '<div class="tagrow"><span class="tag">' + esc(g.등급) + '</span>' +
      (g.단체추천 ? '<span class="tag rec">단체 추천</span>' : '') + '</div>' +
      '<h3 class="name">' + esc(g.이름) + '</h3>' +
      '<p class="ko">' + esc(g.한글) + '</p>' +
      '<p class="where">' + esc(g.도시) + ' · ' + esc(g.홈페이지) + '</p></div></div>' +
      '<p class="one">' + esc(g.한줄) + '</p>' +
      '<a class="site" href="' + esc(g.링크 || ('https://' + g.홈페이지)) + '" target="_blank" rel="noopener">' +
      '공식 사이트에서 코스 사진 보기 <span aria-hidden="true">\u2197</span></a></div>' +
      (줄 ? '<dl class="card-row">' + 줄 + '</dl>' : '') + 숙 +
      (속 ? '<details><summary>자세히 보기 <span class="chev" aria-hidden="true">⌄</span></summary>' +
            '<div class="more">' + 속 + '</div></details>' : '') + '</article>';
  }

  function 그리기(){
    var r = 권역.filter(function(x){ return x.id === state.권역; })[0];
    var 목록 = 보일것();
    지도그리기(목록);
    document.getElementById('legendTitle').textContent = r.이름 + ' 코스 위치';
    document.getElementById('list').innerHTML =
      '<section class="area"><h2>' + esc(r.이름) + '</h2><p>' + esc(r.설명) + '</p>' +
      '<ul class="air">' + (r.공항||[]).map(function(a){ return '<li>' + esc(a) + '</li>'; }).join('') + '</ul></section>' +
      (목록.length ? '<div class="grid">' + 목록.map(카드).join('') + '</div>'
                   : '<p class="empty">이 권역에는 조건에 맞는 코스가 없습니다. 거르개를 「전체」로 바꿔 보세요.</p>');
    document.querySelectorAll('.tab').forEach(function(b){ b.setAttribute('aria-selected', b.dataset.r === state.권역); });
    document.querySelectorAll('.sift button').forEach(function(b){ b.setAttribute('aria-pressed', b.dataset.f === state.거르개); });
  }

  function 고르기(id){
    document.querySelectorAll('.club').forEach(function(x){ x.classList.toggle('on', x.id === 'c-' + id); });
    document.querySelectorAll('.pin').forEach(function(x){ x.classList.toggle('on', x.getAttribute('data-id') === id); });
    document.querySelectorAll('.legend button').forEach(function(x){ x.classList.toggle('on', x.getAttribute('data-id') === id); });
    var el = document.getElementById('c-' + id);
    if(el) el.scrollIntoView({ block:'start' });
  }

  document.getElementById('tabs').addEventListener('click', function(e){
    var b = e.target.closest('.tab'); if(!b) return; state.권역 = b.dataset.r; 그리기();
  });
  document.getElementById('sift').addEventListener('click', function(e){
    var b = e.target.closest('button'); if(!b) return; state.거르개 = b.dataset.f; 그리기();
  });
  document.getElementById('mapbox').addEventListener('click', function(e){
    var p = e.target.closest('.pin'); if(p) 고르기(p.getAttribute('data-id'));
  });
  document.getElementById('mapbox').addEventListener('keydown', function(e){
    if(e.key !== 'Enter' && e.key !== ' ') return;
    var p = e.target.closest('.pin'); if(p){ e.preventDefault(); 고르기(p.getAttribute('data-id')); }
  });
  document.getElementById('legend').addEventListener('click', function(e){
    var b = e.target.closest('button'); if(b) 고르기(b.getAttribute('data-id'));
  });

  그리기();
})();
</script>
"""

out = PAGE.replace("__DATA__", json.dumps(자료, ensure_ascii=False, separators=(",", ":")))

# ① 아티팩트용 — 바깥 껍데기(doctype·html·head·body)는 발행할 때 씌워집니다
open("golf.html", "w", encoding="utf-8").write(out)

# ② 홈페이지에 올릴 용 — 껍데기를 직접 씌운 단독 파일
껍데기 = """<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<meta name="description" content="스페인 남부와 포르투갈 남부 골프장 24곳 — 유포리아투어가 직접 확인한 코스와 코스 안 호텔, 지도로 보는 위치.">
<link rel="icon" href="/favicon.ico">
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
html,body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>
__INNER__
</head>
<body>
__BODY__
</body>
</html>
"""
머리끝 = out.index("</style>") + len("</style>")
open("golf-site.html", "w", encoding="utf-8").write(
    껍데기.replace("__INNER__", out[:머리끝]).replace("__BODY__", out[머리끝:]))

print("golf.html", len(out.encode()), "바이트 (아티팩트용)")
print("golf-site.html", os.path.getsize("golf-site.html"), "바이트 (홈페이지 업로드용)")
print("코스", len(자료["골프장"]), "곳 / 권역", len(자료["권역"]), "개")
print("내부 정보 누출 검사: 통과")
