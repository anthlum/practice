// Service Worker
// if("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register('/practice/sw.js') // relative to the base URL of the application
//     .then(() => console.log("Service Worker Registered"));
//     //.catch(err => console.log('failed: ', err));
// }
const registSvcWork = async () => {
  if('serviceWorker' in navigator) {
    let registry = await navigator.serviceWorker.getRegistration();
  console.log(registry);
    if(!registry) {
      registry = await navigator.serviceWorker.register('/practice/svc_work.js');
      console.log('Service Worker registered.');
    }
  //await updatePushStatus(registry);
  }
}
registSvcWork();
