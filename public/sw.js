// Basic Service Worker for PWA Installation Requirements
const CACHE_NAME = 'dr-shimaa-pwa-cache-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // We can just pass through all requests for now, 
  // the main goal is to satisfy the PWA requirement for a fetch handler.
  event.respondWith(fetch(event.request).catch(() => new Response("Offline")));
});
