import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  const pathname = context.url.pathname;

  // Never cache API routes
  if (pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    return response;
  }

  // Edge CDN Caching for all HTML pages and sitemaps
  // s-maxage=86400 instructs Cloudflare Edge to cache the rendered page for 24 hours
  // stale-while-revalidate=604800 serves edge cache instantly while refreshing in background
  // This drastically reduces Cloudflare Worker CPU execution time to near 0ms
  response.headers.set(
    'Cache-Control',
    'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800'
  );

  return response;
});
