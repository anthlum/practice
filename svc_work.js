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
self.addEventListener('install', (evt) => {
  console.log('Install service worker...', cacheName);
  evt.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    return await cache.addAll(shellFiles);
  })(),);
});
self.addEventListener('activate', (evt) => {
  evt.waitUntil((async () => {
    const nameSet = await caches.keys();
    return nameSet.map((keyName) => { // return Promise.all()
      if(keyName.indexOf(cacheName) < 0) console.log(keyName, nameSet)
    })
  })(),);
  console.log('Service worker is active.');
});
self.addEventListener('fetch', (evt) => {
  if(evt.request.url.indexOf('http') < 0) return;
  evt.respondWith((async (evt) => {
    const response = await caches.match(evt.request);
console.log(cache.keys());
    if(response) {
      console.log('Cached resource: ' + evt.request.url);
      return response; }
    console.log('New resources: ' + evt.request.url);
    const reply = await fetch(evt.request);
    // await cache.put(evt.request, reply.clone());
    return reply; 
  })(evt));
});
