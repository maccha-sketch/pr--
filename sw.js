// かんじ道場 3年生 - オフライン起動用のService Worker
// アプリ本体は外部フォント・CDN・APIを一切使わないため、
// このファイルが一度キャッシュした後は電波なしで起動・動作できる。
const CACHE_VERSION = "kanji-app-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./kanji-quiz-g3.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-192-maskable.png",
  "./icons/icon-512-maskable.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// キャッシュ優先。キャッシュになければネットワークから取得し、次回のために保存する。
// オフラインでネットワークも失敗した場合はキャッシュ内容（無ければ何も返さない）。
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached);
    })
  );
});
