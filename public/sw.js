/* Little Milestones — service worker.
 *
 * Goal: the app opens and works with no network, because a thread you keep for
 * three years should not need a signal to read.
 *
 * Strategy per request:
 *   navigation      network first, fall back to the cached shell (offline)
 *   same-origin     cache first — Expo content-hashes these, so they are immutable
 *   Google Fonts    stale-while-revalidate
 *   anything else   straight to the network, never cached
 *
 * That last line matters: Drive API calls and the OAuth endpoints must never
 * be served from a cache. They carry tokens and per-user data.
 */

const VERSION = 'v1';
const SHELL = `lm-shell-${VERSION}`;
const STATIC = `lm-static-${VERSION}`;
const FONTS = `lm-fonts-${VERSION}`;
const KEEP = [SHELL, STATIC, FONTS];

const SHELL_URL = new URL('./index.html', self.registration.scope).toString();

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(SHELL)
      .then(c => c.add(new Request(SHELL_URL, { cache: 'reload' })))
      .catch(() => {})
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => !KEEP.includes(k)).map(k => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

const isFontRequest = url =>
  url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';

const cacheFirst = async (request, cacheName) => {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  if (hit) return hit;
  const res = await fetch(request);
  if (res && res.ok) cache.put(request, res.clone());
  return res;
};

const staleWhileRevalidate = async (request, cacheName) => {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  const fetching = fetch(request)
    .then(res => {
      if (res && (res.ok || res.type === 'opaque')) cache.put(request, res.clone());
      return res;
    })
    .catch(() => null);
  return hit || fetching || fetch(request);
};

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // the app shell, so a cold offline launch still works
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(res => {
          const copy = res.clone();
          caches.open(SHELL).then(c => c.put(SHELL_URL, copy)).catch(() => {});
          return res;
        })
        .catch(async () => (await caches.match(SHELL_URL)) || Response.error()),
    );
    return;
  }

  if (isFontRequest(url)) {
    event.respondWith(staleWhileRevalidate(request, FONTS));
    return;
  }

  // Drive, OAuth and anything else off-origin: never cached.
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    cacheFirst(request, STATIC).catch(() => caches.match(request).then(r => r || Response.error())),
  );
});

// lets the page tell a waiting worker to take over immediately
self.addEventListener('message', event => {
  if (event.data === 'skip-waiting') self.skipWaiting();
});
