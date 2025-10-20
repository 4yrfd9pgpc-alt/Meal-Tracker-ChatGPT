
const CACHE='mealtrack-v1';
const ASSETS=['./','./index.html','./styles.css','./app.js','./manifest.webmanifest','./assets/icon-64.png','./assets/icon-128.png','./assets/icon-180.png','./assets/icon-192.png','./assets/icon-256.png','./assets/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',e=>{const url=new URL(e.request.url); if(ASSETS.includes(url.pathname.replace(/.*\//,'./'))){ e.respondWith(caches.match(e.request)); return;} e.respondWith(caches.match(e.request).then(res=>res||fetch(e.request).then(resp=>{ if(e.request.method==='GET'){ const clone=resp.clone(); caches.open(CACHE).then(c=>c.put(e.request,clone)); } return resp; }).catch(()=>caches.match('./index.html'))));});
