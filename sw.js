// Service Worker Proxy
const version = '1.0';
const cacheName = `cacheStorage_${version}`;
const shellFiles = [
  '/practice/',
  '/practice/web_storage.html',
  '/practice/web_storage.css',
  '/practice/web_storage.js'
];
self.addEventListener('install', (evt) => {
  // eventTarget > Worker(GlobalScope) > ServiceWorker(GlobalScope) = self > clients
  console.log('Install service worker...', caches);
  evt.waitUntil(
    caches.open(cacheName)
    // cacheStorage(caches) method - open(), match(), delete(), has(), keys()
    // make a named cacheInstace in a cacheStorage
    .then((cache) => {
     return cache.addAll(shellFiles);})
    // cacheInstance method - add(), addAll(), delete(), keys(), match(), matchAll(), put()
  );
});
self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys()
    .then((keys) => {
      return Promise.all(keys.map((keyName) => {
        if(cacheName.indexOf(keyName) === -1) console.log(keyName) ;// return caches.delete(keyName);
      }));
    }
  ));
  console.log('Service worker is active.');
})
self.addEventListener('fetch', (evt) => {
      console.log(evt.request.url);
      console.log('cache match :' + caches.match(evt.request));
  evt.respondWith(caches.match(evt.request)
  .then((response) => {
    //console.log('Cached resource: ' + evt.request.url);
    return(response ||
      fetch(evt.request)
      .then((res) => {
        caches.open(cacheName)
        .then((cache) => {
          cloneRes = res.clone();
          //console.log('New resources: ' + evt.rquest.url, cache);
          cache.put(evt.request, cloneRes);
          return res;
        });
      }));
  }));
});

// self.addEventListener('install', e => {
//   e.waitUntil(
//     caches.open('video-store').then(function(cache) {
//       return cache.addAll([
//       '/mdnproject/',
//       '/mdnproject/videoDB.html',
//       '/mdnproject/videoDB.css',
//       '/mdnproject/videoDB.js'
//     ]);
//     })
//   );
// });

// self.addEventListener('fetch', e => {
//     console.log(e.request.url);
//     e.respondWith(
//       caches.match(e.request).then(response => response || fetch(e.request))
//     );
//   });

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
//     console.log('Cache response the request; '+ evt.request.url);
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

