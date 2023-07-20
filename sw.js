
self.addEventListener('activate', (evt) => {
  console.log('Service worker is active.');
});
self.addEventListener('install', (evt) => {
  console.log('Install service worker...');
  evt.waitUntil(
    caches.open('cacheProx')
    .then((cache) => cache.addAll([
      '/practice/',
      '/practice/videoDB.html',
      '/practice/videoDB.css',
      '/practice/videoDB.js'])
      ));
});
self.addEventListener('fetch', (evt) => {
  evt.respondWith(chache.match(evt.request)
  .then((response) => {
    console.log('Cache response the request; '+ evt.request.url);
    return response || fetch(evt.request);
  })
  );
});
