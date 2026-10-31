/*
  ===========================================================
  호텔 사진 — 구글 지도(Places API New)에서 자동으로 받아 오기
  -----------------------------------------------------------
  일정 만들기(builder.html)의 호텔 카드 가운데, 관리자 화면에서
  사진을 올리지 않은 호텔에 구글 지도 사진을 보여 줍니다.
  (케이네트워크 hotel-photo.mjs 와 같은 방식)

  GET /.netlify/functions/place-photo?id=h102&n=1   → 카드용 1장
  GET /.netlify/functions/place-photo?id=h102&n=6   → 크게 보기용 최대 6장
      → { maps:"구글 지도 주소", photos:[{ u:"사진 주소", a:[{ n:"촬영자", u:"촬영자 주소" }] }] }

  - 환경변수 GOOGLE_PLACES_KEY 가 필요합니다 (없으면 {error:'nokey'}).
  - 키 남용을 막으려고 data/builder.json 의 「숙박」 품목(공개 · 도시 있는 호텔)만 조회합니다.
  - 구글이 찾은 호텔 번호(장소 ID)만 저장소에 적어 두고, 사진 주소는 매번 새로 받습니다.
  - 구글 약관상 사진에는 촬영자(출처)를 함께 표시해야 합니다 → 화면에서 표시합니다.
  ===========================================================
*/
import { getStore } from "@netlify/blobs";

const EN = {
  "마드리드": "Madrid, Spain", "톨레도": "Toledo, Spain", "세고비아": "Segovia, Spain",
  "살라망카": "Salamanca, Spain", "코르도바": "Cordoba, Spain", "세비야": "Seville, Spain",
  "론다": "Ronda, Spain", "그라나다": "Granada, Spain", "말라가": "Malaga, Spain",
  "발렌시아": "Valencia, Spain", "사라고사": "Zaragoza, Spain", "바르셀로나": "Barcelona, Spain",
  "리스본": "Lisbon, Portugal", "코임브라": "Coimbra, Portugal", "포르투": "Porto, Portugal",
};

const J = (o, s = 200, c = "no-store") =>
  new Response(JSON.stringify(o), { status: s, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": c } });

/* 호텔 목록 — 사이트에 올라가 있는 builder.json 을 10분마다 다시 읽습니다 */
let 목록 = null, 읽은때 = 0;
async function 호텔목록(origin) {
  if (목록 && Date.now() - 읽은때 < 10 * 60 * 1000) return 목록;
  const r = await fetch(origin + "/data/builder.json?v=" + Date.now(), { headers: { Accept: "application/json" } });
  const d = await r.json();
  const m = new Map();
  (Array.isArray(d && d.품목) ? d.품목 : []).forEach(x => {
    if (x && x.종류 === "숙박" && x.도시 && x.공개 !== false && String(x.이름 || "").trim()) m.set(String(x.id), x);
  });
  목록 = m; 읽은때 = Date.now();
  return m;
}

export default async (req) => {
  const key = process.env.GOOGLE_PLACES_KEY;
  if (!key) return J({ error: "nokey" }, 503);

  const u = new URL(req.url);
  const id = u.searchParams.get("id") || "";
  const n = Math.min(6, Math.max(1, parseInt(u.searchParams.get("n")) || 1));
  if (!/^[A-Za-z0-9_-]{1,40}$/.test(id)) return J({ error: "unknown" }, 404);

  let h;
  try { h = (await 호텔목록(u.origin)).get(id); } catch (e) { return J({ error: "list" }, 502); }
  if (!h) return J({ error: "unknown" }, 404);

  const H = { "X-Goog-Api-Key": key };
  const 칸 = id + "|" + h.이름;               /* 호텔 이름을 바꾸면 다시 찾습니다 */
  let st = null, pid = null;
  try { st = getStore("euforia-hotel-place"); pid = await st.get(칸); } catch (e) { /* 저장소 없이도 찾기는 됩니다 */ }

  try {
    if (!pid) {
      const r = await fetch("https://places.googleapis.com/v1/places:searchText", {
        method: "POST",
        headers: { ...H, "Content-Type": "application/json", "X-Goog-FieldMask": "places.id" },
        body: JSON.stringify({ textQuery: h.이름 + ", " + (EN[h.도시] || h.도시), includedType: "lodging", maxResultCount: 1 }),
      });
      const d = await r.json();
      if (d && d.error) { console.error("[place-photo] 검색 오류:", d.error.status, d.error.message); return J({ error: "google", why: d.error.status || "" }, 502); }
      pid = d.places && d.places[0] && d.places[0].id;
      if (!pid) return J({ error: "notfound" }, 404, "public, max-age=3600");
      try { if (st) await st.set(칸, pid); } catch (e) { /* 다음에 다시 찾으면 됩니다 */ }
    }

    const r = await fetch("https://places.googleapis.com/v1/places/" + encodeURIComponent(pid), {
      headers: { ...H, "X-Goog-FieldMask": "googleMapsUri,photos" },
    });
    const p = await r.json();
    if (p && p.error) { console.error("[place-photo] 상세 오류:", p.error.status, p.error.message); return J({ error: "google", why: p.error.status || "" }, 502); }

    const list = (p.photos || []).slice(0, n);
    const photos = (await Promise.all(list.map(async x => {
      try {
        const m = await fetch("https://places.googleapis.com/v1/" + x.name + "/media?maxWidthPx=" + (n > 1 ? 1600 : 640) + "&skipHttpRedirect=true", { headers: H });
        const j = await m.json();
        return j.photoUri ? { u: j.photoUri, a: (x.authorAttributions || []).map(a => ({ n: a.displayName || "", u: a.uri || "" })) } : null;
      } catch (e) { return null; }
    }))).filter(Boolean);

    return J({ maps: p.googleMapsUri || "", photos }, 200, "private, max-age=1800");
  } catch (e) {
    console.error("[place-photo] 실패:", e && e.message);
    return J({ error: "fail" }, 502);
  }
};
