
const static_cache_name = 'site-static';
const assets = [
    '/images/pngguru.com.png',
    '/offline',
];

// install service worker
self.addEventListener('install', evt => {
    //console.log('service worker has been installed');

    evt.waitUntil(
        caches.open(static_cache_name).then(cache => {
            console.log('caching shell assets');
            return cache.addAll(assets).then(() => self.skipWaiting());
        })
            .catch(err => {
                console.error(err);
            })
    );
});

// activate event
self.addEventListener('activate', evt => {
   console.log('Service has been activated');
});

// fetch event
self.addEventListener('fetch', evt => {

    console.log('fetch event - ', evt.request.mode);

    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).catch( err => {
                return caches.open(static_cache_name)
                    .then(cache => cache.match('/offline'))
            });
        })
    )
});

/*function isImageGetRequest(request) {
    return request.method === 'GET' && request.headers.get('accept').indexOf('image/!*') > -1;
}*/

