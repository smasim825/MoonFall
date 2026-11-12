// Minimal MoonFall Service Worker for PWA Offline & Installability
const CACHE_NAME = 'moonfall-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Network first with offline fallback
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
