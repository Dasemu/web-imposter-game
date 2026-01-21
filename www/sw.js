const CACHE_NAME = 'impostor-game-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/logo.png',
  '/manifest.webmanifest',
  '/word-pools/manifest.json',
  '/word-pools/animales_naturaleza.txt',
  '/word-pools/objetos_cotidianos.txt',
  '/word-pools/lugares_mundo.txt',
  '/word-pools/escuela_educacion.txt',
  '/word-pools/tecnologia_internet.txt',
  '/word-pools/vehiculos_transporte.txt',
  '/word-pools/instrumentos_musicales.txt',
  '/word-pools/videojuegos.txt',
  '/word-pools/personajes_anime.txt',
  '/word-pools/personajes_disney.txt',
  '/word-pools/artistas_latinos.txt',
  '/word-pools/marcas_lujo.txt',
  '/word-pools/personajes_ficcion.txt',
  '/word-pools/cuerpo_humano.txt',
  '/word-pools/playa_verano.txt',
  '/word-pools/amor_romance.txt',
  '/word-pools/navidad_fiestas.txt',
  '/word-pools/marcas_empresas.txt',
  '/word-pools/profesiones_trabajos.txt',
  '/word-pools/comida_bebidas.txt',
  '/word-pools/deportes.txt',
  '/word-pools/peliculas_series.txt'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] All assets cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Failed to cache assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('[SW] Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests (analytics, fonts, etc.)
  if (url.origin !== location.origin) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          // Return cached version
          return cachedResponse;
        }

        // Not in cache, fetch from network
        return fetch(request)
          .then((networkResponse) => {
            // Don't cache non-successful responses
            if (!networkResponse || networkResponse.status !== 200) {
              return networkResponse;
            }

            // Clone the response before caching
            const responseToCache = networkResponse.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseToCache);
              });

            return networkResponse;
          })
          .catch((error) => {
            console.error('[SW] Fetch failed:', error);
            // Return a fallback for HTML pages
            if (request.headers.get('accept')?.includes('text/html')) {
              return caches.match('/index.html');
            }
            throw error;
          });
      })
  );
});
