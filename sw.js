const V="insp-v1";
const CORE=["./","index.html","manifest.webmanifest","icon-180.png","icon-192.png","icon-512.png","https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"];
self.addEventListener("install",e=>e.waitUntil(caches.open(V).then(c=>Promise.allSettled(CORE.map(u=>c.add(u)))).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>{
    const net=fetch(e.request).then(r=>{
      if(r&&(r.ok||r.type==="opaque")){const c=r.clone();caches.open(V).then(x=>x.put(e.request,c));}
      return r;
    }).catch(()=>hit);
    return hit||net;
  }));
});
