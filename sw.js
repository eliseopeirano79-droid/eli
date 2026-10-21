/* PHARMA • servizio offline e aggiornamenti delle versioni pubblicate */
const CACHE = 'elix-alpha-0.9.0';
const FILES = ['./', './index.html', './styles.css', './app.js', './evidence-atlas.js', './evidence-atlas.css', './elix-studio.js', './elix-content.js', './elix-expanded-chapters.js', './elix-expanded-questions.js', './elix-deep-drugs.js', './elix-rich-reader.js', './elix-research.js', './elix-targets.js', './elix-extra-cases.js', './italian-names.js', './elix-studio.css', './elix-deep.css', './elix-verified.js', './elix-verified.css', './elix-pharma-labs.js', './elix-pharma-labs.css', './elix-09-content.js', './data/verified/index.json', './receptors.js', './elix-focus.css', './data/catalog.json', './data/registry.json', './data/editorial.json', './data/labels-index.json', './data/news.json', './assets/heparin-subunits.jpg', './manifest.webmanifest', './assets/elix-pill-original.svg', './assets/elix-pill-192.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => /^(?:pharma|elix)-/.test(k) && k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      // Network-first: una nuova pubblicazione prevale sulle copie precedenti,
      // mantenendo il funzionamento offline quando la rete non è disponibile.
      const response = await fetch(event.request, { cache: 'no-cache' });
      if (response.ok) cache.put(event.request, response.clone()).catch(() => {});
      return response;
    } catch (error) {
      const cached = await caches.match(event.request);
      if (cached) return cached;
      if (event.request.mode === 'navigate') {
        const shell = await caches.match('./index.html');
        if (shell) return shell;
      }
      throw error;
    }
  })());
});
