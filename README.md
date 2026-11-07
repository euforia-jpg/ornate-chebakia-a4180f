# 유포리아투어 홈페이지 (www.toureplus.co.kr)

Netlify 로 배포되는 회사 홈페이지 저장소입니다. `main` 에 올리면 자동으로 사이트에 반영됩니다.
빌드 과정은 없고, 저장소 맨 위 폴더가 그대로 사이트가 됩니다.

## 화면 (손님용)

| 파일 | 내용 |
|---|---|
| index.html | 첫 화면 |
| tours.html · product.html | 여행상품 목록 · 상품 상세 (`/p/<상품id>` 짧은 주소도 있음) |
| builder.html · plan.html | 자유여행 일정 만들기 · AI 코스 추천 |
| hotels.html · golf.html | 기준호텔 지도 · 골프장 지도 |
| matchday.html · concert.html | 라리가 경기 · 공연 일정과 예매 |
| move.html | 공항 픽업 (EUFORIA MOVE) |
| audio-guide.html | 오디오 가이드 |
| about · contact · deposit · cancel · faq · today · 404 | 회사소개 · 예약문의 · 입금확인 · 취소환불 · FAQ · 오늘 · 없는 페이지 |

## 관리자

| 파일 | 내용 |
|---|---|
| admin.html | 관리자 대쉬보드 — 상품·견적표·쓰레드·문의를 고치면 GitHub 에 바로 저장 |
| audio-admin.html | 오디오 가이드 음성 생성 도구 |
| _내부자료/ | 설치안내(최신본은 `설치안내.md`), 작업기록, 사진표 — 사이트에서는 열리지 않음 |

## 데이터 — 관리자 대쉬보드가 직접 고치는 파일 (이름·위치 바꾸지 마세요)

- `products.js` — 전체 여행상품
- `data/builder.json` · `data/costsheets.json` · `data/fares.json` · `data/concerts.json` · `data/threads-auto.json`
- `docs/` — 상품별 일정표 PDF (대쉬보드에서 올림)
- `images/threads/` — 쓰레드 자동광고 사진 (대쉬보드에서 올림)

## 사진 · 음성 · 문서

- `card-*.jpg` 상품 카드 사진, `pic-*.jpg` 상세 사진 — 맨 위 폴더에 그대로 둡니다 (products.js 가 이 위치를 가리킴)
- `audio/` 오디오 가이드 음성과 배경음악
- `logo/` 협력사 로고, `*-itinerary.pdf` 일부 상품 일정표

## 서버 기능 (netlify/functions)

문의·입금·경기예매 메일(send-*), 문의함(inbox, recent-inquiries), 관리자 저장(admin-api),
AI 일정·상담(generate-itinerary, builder-advice, chat), 사진(hotel-photo, place-photo, spot-photo),
경기·공연 일정(update-matches, update-concerts, *-now), 쓰레드(threads-*), 카카오 알림(kakao-*),
통계(hit, site-stats, card-click), 상품 미리보기(product-og), 사이트맵(sitemap), 음성(generate-audio).

예약 실행 시각은 `netlify.toml`, 주소 연결·접근 차단은 `_redirects` 에 있습니다.

## 정리 기록

- 2026-11-07 — 작업 캡처·zip·중복 폴더·옛 함수 복사본·미사용 사진/PDF/음악 등 약 48MB 정리,
  관리자 문서를 `_내부자료/` 로 모음. 지운 파일은 Git 기록에서 언제든 복구할 수 있습니다.
