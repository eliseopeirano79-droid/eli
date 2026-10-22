/* PHARMA • servizio offline e aggiornamenti delle versioni pubblicate */
const CACHE = 'elix-alpha-0.12.3';
const RUNTIME=CACHE+'-runtime';
const MAX_RUNTIME=120;
const FILES = ['./', './index.html', './styles.css', './app.js', './evidence-atlas.js', './elix-content-batches.js', './evidence-atlas.css', './elix-studio.js', './elix-content.js', './elix-expanded-chapters.js', './elix-expanded-questions.js', './elix-deep-drugs.js', './elix-rich-reader.js', './elix-research.js', './elix-targets.js', './elix-extra-cases.js', './italian-names.js', './elix-studio.css', './elix-deep.css', './elix-verified.js', './elix-verified.css', './elix-pharma-labs.js', './elix-pk-reviewed.js', './elix-pk-reviewed.css', './data/pk-reviewed.json', './elix-structure-visuals.js', './elix-clean-sheets.css', './elix-usability.js', './elix-audit.css', './elix-pharma-labs.css', './elix-09-content.js', './data/verified/index.json', './receptors.js', './elix-focus.css', './data/catalog.json', './data/registry.json', './data/editorial.json', './data/labels-index.json', './data/news.json', './assets/heparin-subunits.jpg', './manifest.webmanifest', './assets/elix-pill-original.svg', './assets/elix-pill-192.png'];
self.addEventListener('install', event => {
  // Fetch the whole release from the network before claiming clients. A warm HTTP
  // cache can otherwise copy assets from the previous release into this snapshot.
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES.map(file=>new Request(file,{cache:'reload'})))).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>/^(?:pharma|elix)-/.test(k)&&k!==CACHE&&k!==RUNTIME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
async function networkWithTimeout(request){
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),4500);
 try{return await fetch(request,{cache:'no-cache',signal:controller.signal});}finally{clearTimeout(timer);}
}
async function cacheRuntime(request,response){
 if(!response.ok)return;
 const cache=await caches.open(RUNTIME);await cache.put(request,response);
 const keys=await cache.keys();for(const key of keys.slice(0,Math.max(0,keys.length-MAX_RUNTIME)))await cache.delete(key);
}
self.addEventListener('fetch', event => {
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url),scope=new URL(self.registration.scope);
 if(url.origin!==scope.origin||!url.pathname.startsWith(scope.pathname))return;
 event.respondWith((async()=>{
  const core=await caches.open(CACHE);
  const coreHit=await core.match(event.request);
  // All versioned assets belong to this worker's atomic shell snapshot.
  if(coreHit)return coreHit;
  try{
   const response=await networkWithTimeout(event.request);
   if(response.ok){event.waitUntil(cacheRuntime(event.request,response.clone()).catch(()=>{}));return response;}
   const saved=await caches.match(event.request);return saved||response;
  }catch(error){
   const saved=await caches.match(event.request);if(saved)return saved;
   if(event.request.mode==='navigate'){const shell=await core.match('./index.html');if(shell)return shell;}
   return new Response('Contenuto non disponibile offline. Riconnettiti e riprova.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
  }
 })());
});
