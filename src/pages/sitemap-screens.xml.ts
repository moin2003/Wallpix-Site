export const prerender = true;
import type { APIRoute } from 'astro';
import { SCREEN_TYPES } from '../data/wallpapers';

export const GET: APIRoute = async () => {
  const siteUrl = 'https://www.walpix.site';
  const currentDate = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${SCREEN_TYPES
  .map(
    (screen) => `  <url>
    <loc>${siteUrl}/screen/${screen.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
