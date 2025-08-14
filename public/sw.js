const STATIC_CACHE = "static-v1";
const DYNAMIC_CACHE = "dynamic-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/offline.html",
 
];

// install event -------------------------->
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log("Pre-caching app shell...");
      return cache.addAll(urlsToCache);
    })
  );
    self.skipWaiting();
});

// activate event -------------------------->
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
   return Promise.all(
     keys.map(key=>{
        if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE ) {
            return caches.delete(key)
        }
    })
   )
    })
  );
  self.clients.claim();
});

// fetch event ---------------------------->
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cacheRes) => {
      return (
        cacheRes ||
        fetch(e.request)
          .then(async (fetchRes) => {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(e.request.url, fetchRes.clone());
            return fetchRes;
          })
          .catch(() => {
            return caches.open(STATIC_CACHE).then((cache) => {
              return cache.match("/offline.html");
            });
          })
      );
    })
  );
});
    
