// Service Worker Proxy
const version = '1.0';
const cacheName = `cacheWorker_${version}`;
const shellFiles = [
  '/practice/',
  '/practice/cache_storage.html',
  '/practice/cache_storage.css',
  '/practice/cache_storage.js',
  '/practice/images/desk.png',
  '/practice/images/pic1.jpg',
  '/practice/images/pic2.jpg',
  '/practice/images/pic3.jpg',
  '/practice/images/pic4.jpg',
  '/practice/images/pic5.jpg'
];
const installSvc = (evt) => {
  console.log('Install service worker...', cacheName);
  evt.waitUntil(async () => {
    try {
      const cache = await caches.open(cacheName);
      return cache.addAll(shellFiles);
    }
    catch { console.log('error during installing');
    }
  }); 
}
const activeSvc = () => {
  evt.waitUntil(async () => {
    try {
      const nameSet = await caches.keys();
      console.log('Service worker is active.');
      return Promise.all(nameSet.map((keyName) => {
        if(keyName.indexOf(cacheName) < 0) {
          console.log(keyName, nameSet);
        }}
      ));
      }
    catch { console.log('error during activing')
    }});
  }
const fetchSvc = (evt) => {
  evt.respondWith(async () => {
    try {
      const response = await caches.match(evt.request);
      if(response) {
        console.log('Cached resource: ' + evt.request.url);
        return response; }
      console.log('New resources: ' + evt.rquest.url);
      const reply = await fetch(evt.request);
      return reply;
    }
    catch { console.log('error during activing', evt.request.url);
    }
  });
}
self.addEventListener('install', installSvc);
self.addEventListener('activate', activeSvc);
self.addEventListener('fetch', fetchSvc));
