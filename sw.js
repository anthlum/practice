self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('video-store').then(function(cache) {
      return cache.addAll([
      '/practice/',
      '/practice/videoDB.html',
      '/practice/videoDB.css',
      '/practice/videoDB.js'
    ]);
    })
  );
});

self.addEventListener('fetch', e => {
    console.log(e.request.url);
    e.respondWith(
      caches.match(e.request).then(response => response || fetch(e.request))
    );
  });

// self.addEventListener('activate', (evt) => {
//   console.log('Service worker is active.');
// })
// self.addEventListener('install', (evt) => {
//   console.log('Install service worker...');
//   evt.waitUntil(
//     caches.open('cacheProx')
//     .then((cache) => cache.addAll([
//       '/mdnproject/',
//       '/mdnproject/videoDB.html',
//       '/mdnproject/videoDB.css',
//       '/mdnproject/videoDB.js'])
//       ));
// });
// self.addEventListener('fetch', (evt) => {
//   evt.respondWith(chache.match(evt.request)
//   .then((response) => {
//     console.log('Caqhe response the request; '+ evt.request.url);
//     return response || fetch(evt.request)
//     .then((resp) => caches.open('cacheProx')
//       .then((cache) => {
//         cache.put(evt.request, resp.clone());
//         console.log('Cache new resource: ' + evt.request.url);
//         return resp;
//       }));
//   })
//   );
// });
