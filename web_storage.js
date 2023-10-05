// Service Worker
if("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register('/practice/sw.js') // relative to the base URL of the application
    .then(() => console.log("Service Worker Registered"));
    //.catch(err => console.log('failed: ', err));
}
// const registSvcWork = async () => {
//   if('serviceWorker' in navigator) {
//     let registry = await navigator.serviceWorker.getRegistration();
//   console.log(registry);
//     if(!registry) {
//       registry = await navigator.serviceWorker.register('/serve_worker.js');
//       console.log('Service Worker registered.');
//     }
//   //await updatePushStatus(registry);
//   }
// }
// registSvcWork();

// IndexDB
const section = document.querySelector('section');
const videos = [
  {name: 'crystal'},
  {name: 'elf'},
  {name: 'frog'},
  {name: 'monster'},
  {name: 'pig'},
  {name: 'rabbit'},
];
let db;

function init() {
  for (const vid of videos) {
    const request = db.transaction(['videos_os']).objectStore('videos_os').get(vid.name);
    request.addEventListener('success', () => {
      if (request.result) {
        console.log('Taking videos from IDB');
        displayVideo(request.result.mp4, request.result.webm, request.result.name);
//console.log(request.result.mp4, request.result.webm, request.result.name);
      } else {
        fetchVideo(vid);
      }
    });
  }
}
function fetchVideo(vid) {
  const mp4Blob = fetch(`video/${vid.name}.mp4`).then((response) => response.blob());
  const webmBlob = fetch(`video/${vid.name}.webm`).then((response) => response.blob());
  Promise.all([mp4Blob, webmBlob]).then((values) => {
    displayVideo(values[0], values[1], vid.name);
    storeVideo(values[0], values[1], vid.name);
  });
}
function storeVideo(mp4Blob, webmBlob, vdName) {
  const record = {
    mp4: mp4Blob,
    webm: webmBlob,
    name: vdName
  }
  const request = db.transaction(['videos_os'], 'readwrite').objectStore('videos_os').add(record);
  request.addEventListener('success', () => {
    console.log('Record addition finished.');
  });
  request.addEventListener('error', () => console.error(request.error));
}
function displayVideo(mp4, webm, name) {
  const sourceMp4 = URL.createObjectURL(mp4);
  const sourceWebm = URL.createObjectURL(webm);
  section.innerHTML += `<article><h2>${name}</h2><video controls><source src="${sourceMp4}" type="video/mp4"><source src="${sourceWebm}" type="video/webm"></video>Your browser does not support the video tag.</article>`;
//console.log(sourceMp4, sourceWebm);
}

const request = window.indexedDB.open('videos_db', 1);
request.addEventListener('upgradeneeded', (evt) => {
  db = evt.target.result;
  const objectStore = db.createObjectStore('videos_os', {keyPath: 'name'});
  objectStore.createIndex('mp4', 'mp4', {unique: false});
  objectStore.createIndex('webm', 'webm', {unique: false});
  console.log('DB setup complete.')
});
request.addEventListener('error', (evt) => {
  alert("openDB failed: " + evt.target.errorCode);
});
request.addEventListener('success', () => {
  console.log('openDB successed.');
  db = request.result;
  init();
});
async function arryPromise() {
  for (const vid of videos) {
    const fetchMp4 = await fetch(`video/${vid.name}.mp4`);
    const blobMp4 = await fetchMp4.blob();
    const fetchWebm = await fetch(`video/${vid.name}.webm`);
    const blobWebm = await fetchWebm.blob();
console.log(blobMp4, blobWebm, blobMp4.size);
  }
}


// self.addEventListener('activate', (evt) => {
//   console.log('Service worker is active.');
// })
// self.addEventListener('install', (evt) => {
//   console.log('Install service worker...');
//   evt.waitUntil(
//     caches.open('cacheProx')
//     .then((cache) => cache.addAll([
//       '/',
//       '/videoDB.html',
//       '/videoDB.css',
//       '/videoDB.js'])
//       ));
// });
// self.addEventListener('fetch', (evt) => {
//   evt.respondWith(chache.match(evt.request)
//   .then((response) => {
//     console.log('Caqhe response the request; '+ evt.request.url);
//     return response || fetch(evt.request)
//     .then((reply) => caches.open('cacheProx')
//       .then((cache) => {
//         cache.put(evt.request, reply.clone());
//         console.log('Cache new resource: ' + evt.request.url);
//         return reply;
//       }));
//   })
//   );
// });
