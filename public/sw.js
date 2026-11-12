const CACHE_NAME = 'aura-living-cache-v4';
const OFFLINE_URL = '/offline';

const PRECACHE_ASSETS = [
  '/offline',
  '/manifest.webmanifest',
  '/favicon.ico',
  '/icon-192.png',
  '/madhav-logo.png',
];

const STATIC_EXT_REGEX = /\.(?:png|jpg|jpeg|webp|avif|svg|ico|css|js|woff2?)$/i;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS)),
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
          return Promise.resolve(false);
        }),
      ),
    ),
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Never cache or intercept backend API responses or cross-origin requests
  if (url.origin !== self.location.origin || url.pathname.startsWith('/api/')) {
    return;
  }

  // Only cache static assets; let dynamic Next.js SSR/RSC routes hit live network
  const isStaticAsset =
    url.pathname.startsWith('/_next/static/') ||
    STATIC_EXT_REGEX.test(url.pathname);

  if (!isStaticAsset) {
    if (event.request.mode === 'navigate') {
      event.respondWith(
        fetch(event.request).catch(() => caches.match(OFFLINE_URL)),
      );
    }
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(async () => {
        const cachedResponse = await caches.match(event.request);
        return (
          cachedResponse ||
          new Response('Network offline', {
            status: 503,
            statusText: 'Service Unavailable',
          })
        );
      }),
  );
});
