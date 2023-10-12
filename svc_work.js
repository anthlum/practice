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
const installSvc = async () => {
  const cache = await caches.open(cacheName);
  await cache.addAll(shellFiles);
}
const activeSvc = async () => {
  const nameSet = await caches.keys();
  nameSet.map((keyName) => {
    if(keyName.indexOf(cacheName) < 0) console.log(keyName)
  });
}
const fetchSvc = async (evt) => {
  console.log(evt.request.url);
  const cache = caches.open(cacheName);
  const response = await cache.match(evt.request);
  if(response) {
    console.log('Cached resource: ' + evt.request.url);
    return response; }
  console.log('New resources: ' + evt.rquest.url);
  const reply = await fetch(evt.request);
  if(!request.url.match(/^(http|https):\/\//)){
    return;
  }
  return reply; 
}
self.addEventListener('install', (evt) => {
  console.log('Install service worker...', cacheName);
  evt.waitUntil(installSvc());
});
self.addEventListener('activate', (evt) => {
  evt.waitUntil(activeSvc());
  console.log('Service worker is active.');
})
  self.addEventListener('fetch', (evt) => {
  evt.respondWith(fetchSvc(evt));
});


