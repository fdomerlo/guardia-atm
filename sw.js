const CACHE_NAME = 'guardia-atm-folp-v4';

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/theme.css',
  './css/layout.css',
  './css/components.css',
  './css/interactive.css',
  './js/bundle.js',
  './js/app.js',
  './js/data/patologias.js',
  './js/data/farmacos.js',
  './js/data/procedimientos.js',
  './js/data/red-flags.js',
  './js/data/mapa-dolor.js',
  './js/modules/triage.js',
  './js/modules/pathologies-view.js',
  './js/modules/drugs-view.js',
  './js/modules/procedures-view.js',
  './js/modules/referral-map-view.js',
  './js/modules/search.js',
  './js/modules/favorites.js',
  './js/modules/pwa.js',
  './js/modules/screen-header.js',
  './assets/folp-logo.svg',
  './assets/logo-folp-watermark.png',
  './assets/mapa-anatomico.jpg',
  './assets/icons/icon.svg',
  './assets/icons/favicon.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Precaching assets for offline hospital use...');
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Clearing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch in background to revalidate (Stale-While-Revalidate)
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
        }).catch(() => {
          // Offline, cached response is fine
        });
        return cachedResponse;
      }

      // Not in cache, try network
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        // If navigation request fails, return cached index.html
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
