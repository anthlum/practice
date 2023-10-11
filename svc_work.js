// Service Worker Proxy
const version = '1.0';
const cacheName = `cacheSvcWk_${version}`;
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
function installSvc(evt) {
  evt.waitUntil(async () => {
      const cache = await caches.open(cacheName);
      cache.addAll(shellFiles);
    });
  console.log('Install service worker...', cacheName);
}
function activeSvc(evt) {
  evt.waitUntil(async () => {
    const nameSet = await caches.keys();
    return Promise.all(nameSet.map((keyName) => {
      if(keyName.indexOf(cacheName) < 0) {
        console.log(keyName, nameSet);
      }
    }));
  });
  console.log('Service worker is active.');
}
function fetchSvc(evt) {
  evt.respondWith(async () => {
    const response = await caches.match(evt.request);
    if(response) {
      console.log('Cached resource: ' + evt.request.url);
      return response; }
    console.log('New resources: ' + evt.rquest.url);
    const reply = await fetch(evt.request);
    return reply;
  });
}
self.addEventListener('install', installSvc);
self.addEventListener('activate', activeSvc);
self.addEventListener('fetch', fetchSvc);

