// YARD ZERO service worker: caches the game so it starts offline.
const CACHE='yard-zero-v1';
const FILES=["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png", "tex/a0.jpg", "tex/a1.jpg", "tex/a10.jpg", "tex/a11.jpg", "tex/a12.jpg", "tex/a2.jpg", "tex/a3.jpg", "tex/a4.jpg", "tex/a5.jpg", "tex/a6.jpg", "tex/a7.jpg", "tex/a8.jpg", "tex/a9.jpg", "tex/n0.jpg", "tex/n1.jpg", "tex/n10.jpg", "tex/n11.jpg", "tex/n12.jpg", "tex/n2.jpg", "tex/n3.jpg", "tex/n4.jpg", "tex/n5.jpg", "tex/n6.jpg", "tex/n7.jpg", "tex/n8.jpg", "tex/n9.jpg"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  // index.html: network first so updates arrive; everything else: cache first
  if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(CACHE).then(k=>k.put('./',c));return res;}).catch(()=>caches.match('./')));return;}
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok){const c=res.clone();caches.open(CACHE).then(k=>k.put(r,c));}return res;})));});
