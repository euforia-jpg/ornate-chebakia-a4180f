/*
  ===========================================================
  유포리아투어 — 서비스 워커
  -----------------------------------------------------------
  여러 쪽에서 이 파일을 부르고 있었는데 파일이 없어서
  손님이 들어올 때마다 404 가 났습니다. 그 자리를 채웁니다.

  일부러 "아무것도 저장하지 않게" 만들었습니다.
  화면을 저장해 두면 사장님이 새 파일을 올리셔도 손님 기기에는
  옛 화면이 한동안 그대로 남습니다. 이 사이트는 자주 고치니까
  그 위험을 지지 않는 쪽이 낫습니다.

  대신 이 파일이 있으면 휴대폰에서 "홈 화면에 추가"가 떠서
  앱처럼 쓸 수 있습니다. (manifest.json 과 짝입니다)
  ===========================================================
*/

/* 새 서비스 워커가 올라오면 기다리지 않고 바로 바뀝니다 */
self.addEventListener('install', function (e) {
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil((async function () {
    /* 예전에 저장해 둔 것이 있으면 모두 비웁니다 */
    try {
      const names = await caches.keys();
      await Promise.all(names.map(function (n) { return caches.delete(n); }));
    } catch (err) { /* 저장소를 못 써도 그냥 넘어갑니다 */ }
    await self.clients.claim();
  })());
});

/* 모든 요청은 저장하지 않고 그대로 인터넷으로 보냅니다 */
self.addEventListener('fetch', function (e) {
  return;
});
