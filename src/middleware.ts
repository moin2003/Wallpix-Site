import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  const pathname = context.url.pathname;

  // 1. Image Download Proxy API - Immutable Edge Caching
  // Images from upstream CDN are static and immutable; caching for 7 days saves Cloudflare Worker CPU
  if (pathname.startsWith('/api/download')) {
    response.headers.set('Cache-Control', 'public, max-age=604800, immutable');
    response.headers.set('Cloudflare-CDN-Cache-Control', 'public, max-age=604800');
    response.headers.set('CDN-Cache-Control', 'public, max-age=604800');
    return response;
  }

  // 2. Wallpaper Feed API - 24-Hour Edge Caching
  // Caching feed pages absorbs repetitive pagination and automation scrapes at 0ms Worker CPU time
  if (pathname.startsWith('/api/wallpapers')) {
    response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400');
    response.headers.set('Cloudflare-CDN-Cache-Control', 'public, max-age=86400, stale-while-revalidate=86400');
    response.headers.set('CDN-Cache-Control', 'public, max-age=86400, stale-while-revalidate=86400');
    return response;
  }

  // Other API routes if any
  if (pathname.startsWith('/api/')) {
    return response;
  }

  // 3. Edge CDN Caching for all HTML pages and sitemaps
  // s-maxage=86400 instructs Cloudflare Edge to cache the rendered page for 24 hours
  // Cloudflare-CDN-Cache-Control guarantees Cloudflare edge servers serve cached HTML without executing Workers
  // stale-while-revalidate=604800 serves edge cache instantly while refreshing in background
  // This drastically reduces Cloudflare Worker CPU execution time to near 0ms
  response.headers.set(
    'Cache-Control',
    'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800'
  );
  response.headers.set(
    'Cloudflare-CDN-Cache-Control',
    'public, max-age=86400, stale-while-revalidate=604800'
  );
  response.headers.set(
    'CDN-Cache-Control',
    'public, max-age=86400, stale-while-revalidate=604800'
  );

  return response;
});
