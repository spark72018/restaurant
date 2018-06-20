const URLS_TO_CACHE = [
  '/',
  'js/dbhelper.js',
  'js/main.js',
  'js/restaurant_info.js',
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
  'img/10.jpg'
];

const STATIC_CACHE_NAME = 'restaurant-cache-v1';

self.addEventListener('install', async e => {
  console.log('Attempting to install service worker and cache static assets');
  const cache = await caches.open(STATIC_CACHE_NAME);

  await cache
    .addAll(URLS_TO_CACHE)
    .then(() => {
      console.log('successfully cached');
    })
    .catch(e => {
      throw new Error('URLS_TO_CACHE error', e);
    });
});

// TODO
// sometimes cache erases after offline reload
self.addEventListener('fetch', e => {
  const requestUrl = new URL(e.request.url);
  // const sameOrigin = requestUrl.origin === location.origin;
  console.log('e.request is', e.request);
  e.respondWith(
    caches
      .match(e.request)
      .then(
        response =>
          (console.log('response for ' + requestUrl + 'is ' + response),
          response) || fetch(e.request)
      )
      .catch(e => {
        throw new Error('fetch error', e);
      })
  );
});

self.addEventListener('activate', e => {
  console.log('Activating new service worker...');
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => {
            return (
              cacheName.startsWith('restaurant-') &&
              cacheName != STATIC_CACHE_NAME
            );
          })
          .map(cacheName => {
            return caches.delete(cacheName);
          })
      );
    })
  );
});
