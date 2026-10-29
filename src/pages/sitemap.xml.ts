export const prerender = true;
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const siteUrl = 'https://walpix.site';
  const currentDate = new Date().toISOString();

  const sitemaps = [
    '/sitemap-main.xml',
    '/sitemap-categories.xml',
    '/sitemap-screens.xml',
    '/sitemap-tags.xml',
    '/sitemap-wallpapers.xml',
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (sm) => `  <sitemap>
    <loc>${siteUrl}${sm}</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
