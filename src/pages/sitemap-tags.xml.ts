export const prerender = true;
import type { APIRoute } from 'astro';
import { getAllTags } from '../data/wallpapers';

export const GET: APIRoute = async () => {
  const siteUrl = 'https://www.walpix.site';
  const currentDate = new Date().toISOString().split('T')[0];
  const allTags = getAllTags();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/tag</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
${allTags
  .map(
    (tag) => `  <url>
    <loc>${siteUrl}/tag/${tag.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
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
