// ==============================================================
// SERVICE WORKER CLEANER & AUTO-PURGE (GITHUB PAGES UPDATE COMPATIBLE)
// ==============================================================
// Script ini secara proaktif menghapus cache lama dan meng-unregister
// Service Worker agar browser & Smart TV selalu mengambil versi terbaru.

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => caches.delete(key)));
    }).then(() => {
      return self.registration.unregister();
    }).then(() => {
      return self.clients.matchAll();
    }).then((clients) => {
      clients.forEach((client) => {
        if (client.url && 'navigate' in client) {
          client.navigate(client.url);
        }
      });
    })
  );
  self.clients.claim();
});

// Selalu ambil langsung dari jaringan (Network-First / Bypass Cache)
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
