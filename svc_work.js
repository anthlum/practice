// Service Worker Proxy
const version = '1.0';
const cacheName = `cacheWorker_${version}`;
const shellFiles = [
  '/practice/',
  '/practice/cache_storage.html',
  '/practice/cache_storage.css',
  '/practice/cache_storage.js',
  '/practice/images/',
  '/practice/images/desk.png',
  '/practice/images/pic1.jpg',
  '/practice/images/pic2.jpg',
  '/practice/images/pic3.jpg',
  '/practice/images/pic4.jpg',
  '/practice/images/pic5.jpg'
];
const installSvc = async () => {
    const cache = await caches.open(cacheName);
    return cache.addAll(shellFiles);
}
const activeSvc = async () => {
  const nameSet = await caches.keys();
  return Promise.all(nameSet.map((keyName) => {
    if(keyName.indexOf(cacheName) < 0) console.log(keyName)
  }));
}
const fetchSvc = async (evt) => {
  console.log(evt.request.url);
  const response = await caches.open(evt.request);
  if(response) {
    console.log('Cached resource: ' + evt.request.url);
    return response; }
  console.log('New resources: ' + evt.rquest.url);
  const reply = await fetch(evt.request);
  return reply; 
}
self.addEventListener('install', (evt) => {
  // eventTarget > Worker(GlobalScope) > ServiceWorker(GlobalScope) = self > clients
  console.log('Install service worker...', caches);
  evt.waitUntil(installSvc());
    // cacheStorage(caches) method - open(), match(), delete(), has(), keys()
    // make a named cacheInstace in a cacheStorage
    // cacheInstance method - add(), addAll(), delete(), keys(), match(), matchAll(), put()
});
self.addEventListener('activate', (evt) => {
  evt.waitUntil(activeSvc());
  console.log('Service worker is active.');
})
self.addEventListener('fetch', (evt) => {
  evt.respondWith(fetchSvc(evt));
});

