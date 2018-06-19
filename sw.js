const URLS_TO_CACHE = [
  'js/dbhelper.js',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
  'js/main.js',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
  'css/styles.css',
  'data/restaurants.json',
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
  'img/8.jpg',
  'img/9.jpg',
  'img/10.jpg',
  'index.html',
  'restaurant.html'
];

const STATIC_CACHE_NAME = 'restaurant-cache-v1';

self.addEventListener('install', async e => {
  console.log('Attempting to install service worker and cache static assets');
  const cache = await caches.open(STATIC_CACHE_NAME);

  await cache.addAll(URLS_TO_CACHE);
});

self.addEventListener('fetch', e => {
  const requestUrl = new URL(e.request.url);
  const sameOrigin = requestUrl.origin === location.origin;

  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
