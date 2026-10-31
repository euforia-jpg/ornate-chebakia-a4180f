/*
  ===========================================================
  관광지 사진 — 상품 쪽 「이런 경험을 할 수 있어요」 카드 아래에 붙는 사진
  -----------------------------------------------------------
  구글 지도(Places API New)에서 그 관광지를 찾아 사진 1장을 돌려줍니다.
  (호텔 사진 place-photo.mjs 와 같은 키 GOOGLE_PLACES_KEY 를 씁니다)

  GET /.netlify/functions/spot-photo?p=portugal-10days&i=0
      → { name:"구글에 올라 있는 장소 이름", maps:"구글 지도 주소",
          photo:{ u:"사진 주소", a:[{ n:"촬영자", u:"촬영자 주소" }] } }
      → 사진을 붙이지 않는 줄이면 { skip:true }

  - 사이트의 products.js 에 실제로 있는 상품 · 줄만 조회합니다 (키 남용 방지).
  - 검색어는 그 줄의 첫 장소 이름입니다. 예) "에보라 역사지구 (세계유산) · 뼈 예배당" → "에보라 역사지구"
  - 시각 · 환불 · 호텔 같은 안내 줄은 사진을 붙이지 않습니다.
  - 검색어를 직접 정하려면 products.js 의 그 상품 detail 에
        사진검색어: ["에보라 대성당", "", ...]
    처럼 줄 순서대로 적으면 됩니다. 빈 칸("")은 사진을 붙이지 않는다는 뜻입니다.
  - 찾는 범위는 이베리아 반도(스페인 · 포르투갈 · 프랑스 바스크 일부)로 묶어,
    이름이 같은 다른 나라 장소가 나오지 않게 합니다.
  - 구글이 찾은 장소 번호(ID)만 저장해 두고, 사진 주소는 매번 새로 받습니다.
  ===========================================================
*/
import { getStore } from "@netlify/blobs";
import vm from "node:vm";

const J = (o, s = 200, c = "no-store") =>
  new Response(JSON.stringify(o), { status: s, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": c } });

/* 사진을 붙이지 않는 상품 (차량 이동 · 도슨트 · 자유일정 · 골프 · 순례길 · 하이킹 · 경기) */
const 상품제외 = /^(car-|docent|matchday|golf|camino|hiking|spain-free|spain-north$|spain-month)/;
/* 사진을 붙이지 않는 줄 (시각 · 조건 · 서비스 안내) */
const 줄제외 = /\d{1,2}:\d{2}|\d\s*박|환불|호텔|파라도르|동행|배정|출발|도착|가능|상담|추천|맞춤|자유일정|요금|인원|라운드|캐디|도보|지원|여정|특식|공연|되돌아|쉬어|\bIN\b|\bOUT\b|→/;
/* 장소 이름 뒤에 붙은 활동 말은 떼고 찾습니다 (「톨레도 대성당 관람」 → 「톨레도 대성당」) */
const 꼬리말 = /\s*(관람|자유시간|골목|내부 입장|입장|탐험|보트 승선|승선|순례|야경투어|곤돌라|경유)$/;
/* 앞머리가 도시 이름뿐이거나 「나흘 · 횡단」 같은 말이면 — 뒤의 첫 장소로 찾습니다 */
const 앞머리일반 = /나흘|하루|이틀|횡단|거슬러/;

function 검색어(줄) {
  const 조각 = String(줄).split(/\s+[—–-]\s+/);
  let 앞 = 조각[0].replace(/\([^)]*\)/g, " ").trim();
  if (조각.length > 1 && (앞.length <= 6 || 앞머리일반.test(앞))) 앞 = 조각[1];
  let q = 앞.split(/\s*[·,]\s*/)[0].replace(/\([^)]*\)/g, " ").replace(/[「」『』"]/g, "").replace(/\s+/g, " ").trim();
  q = q.split(/(?<=\S)(?:와|과)\s/)[0].trim();            /* 「레온 대성당과 산티아고 순례길」 → 「레온 대성당」 */
  for (let k = 0; k < 3; k++) q = q.replace(꼬리말, "").trim();
  return q;
}

/* products.js 의 PRODUCTS 배열만 읽습니다 (10분마다 새로) */
let 상품표 = null, 읽은때 = 0;
async function 상품들(origin) {
  if (상품표 && Date.now() - 읽은때 < 10 * 60 * 1000) return 상품표;
  const code = await (await fetch(origin + "/products.js?v=" + Date.now())).text();
  const s = code.search(/(const|var|let)\s+PRODUCTS\s*=\s*\[/);
  if (s < 0) throw new Error("PRODUCTS 를 찾지 못함");
  const a = code.indexOf("[", s), e = code.indexOf("\n];", a);
  const arr = vm.runInNewContext("(" + code.slice(a, e + 2) + ")", {}, { timeout: 1000 });
  const m = new Map();
  (Array.isArray(arr) ? arr : []).forEach(p => { if (p && p.id) m.set(String(p.id), p); });
  상품표 = m; 읽은때 = Date.now();
  return m;
}

export default async (req) => {
  const key = process.env.GOOGLE_PLACES_KEY;
  if (!key) return J({ error: "nokey" }, 503);

  const u = new URL(req.url);
  const pid = u.searchParams.get("p") || "";
  const i = parseInt(u.searchParams.get("i"), 10);
  if (!/^[a-z0-9-]{1,80}$/.test(pid) || !(i >= 0 && i < 40)) return J({ error: "unknown" }, 404);

  let p;
  try { p = (await 상품들(u.origin)).get(pid); } catch (e) { return J({ error: "list" }, 502); }
  const 줄들 = p && p.detail && Array.isArray(p.detail.highlights) ? p.detail.highlights : null;
  if (!줄들 || i >= 줄들.length) return J({ error: "unknown" }, 404);

  /* 검색어 정하기 — 직접 적어 둔 것이 있으면 그것 */
  const 직접 = p.detail.사진검색어;
  let q;
  if (Array.isArray(직접) && 직접[i] !== undefined && 직접[i] !== null) q = String(직접[i]).trim();
  else q = (상품제외.test(pid) || 줄제외.test(줄들[i])) ? "" : 검색어(줄들[i]);
  if (!q || q.length < 2) return J({ skip: true }, 200, "public, max-age=3600");

  const H = { "X-Goog-Api-Key": key };
  let st = null, place = null;
  try { st = getStore("euforia-spot-place"); place = await st.get(q); } catch (e) { /* 저장소 없이도 찾기는 됩니다 */ }

  try {
    if (!place) {
      const r = await fetch("https://places.googleapis.com/v1/places:searchText", {
        method: "POST",
        headers: { ...H, "Content-Type": "application/json", "X-Goog-FieldMask": "places.id" },
        body: JSON.stringify({
          textQuery: q, languageCode: "ko", maxResultCount: 1,
          locationRestriction: { rectangle: { low: { latitude: 35.8, longitude: -9.8 }, high: { latitude: 44.2, longitude: 3.6 } } },
        }),
      });
      const d = await r.json();
      if (d && d.error) { console.error("[spot-photo] 검색 오류:", d.error.status, d.error.message); return J({ error: "google" }, 502); }
      place = d.places && d.places[0] && d.places[0].id;
      if (!place) return J({ skip: true, q }, 200, "public, max-age=3600");
      try { if (st) await st.set(q, place); } catch (e) { /* 다음에 다시 찾으면 됩니다 */ }
    }

    const r = await fetch("https://places.googleapis.com/v1/places/" + encodeURIComponent(place) + "?languageCode=ko", {
      headers: { ...H, "X-Goog-FieldMask": "displayName,googleMapsUri,photos" },
    });
    const d = await r.json();
    if (d && d.error) { console.error("[spot-photo] 상세 오류:", d.error.status, d.error.message); return J({ error: "google" }, 502); }
    const x = (d.photos || [])[0];
    if (!x) return J({ skip: true, q }, 200, "private, max-age=1800");

    const m = await fetch("https://places.googleapis.com/v1/" + x.name + "/media?maxWidthPx=1200&skipHttpRedirect=true", { headers: H });
    const j = await m.json();
    if (!j.photoUri) return J({ skip: true, q }, 200, "private, max-age=1800");

    return J({
      q,
      name: (d.displayName && d.displayName.text) || "",
      maps: d.googleMapsUri || "",
      photo: { u: j.photoUri, a: (x.authorAttributions || []).map(a => ({ n: a.displayName || "", u: a.uri || "" })) },
    }, 200, "private, max-age=1800");
  } catch (e) {
    console.error("[spot-photo] 실패:", e && e.message);
    return J({ error: "fail" }, 502);
  }
};
