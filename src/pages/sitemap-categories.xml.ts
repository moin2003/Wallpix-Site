export const prerender = true;
import type { APIRoute } from 'astro';
import { CATEGORIES, LUXURY_COLORS } from '../data/wallpapers';

export const GET: APIRoute = async () => {
  const siteUrl = 'https://walpix.site';
  const currentDate = new Date().toISOString();

  const categoryPages = CATEGORIES.map((cat) => ({
    url: `/category/${cat.slug}`,
    priority: '0.8',
    changefreq: 'daily',
  }));

  const colorPages = LUXURY_COLORS.map((c) => ({
    url: `/color/${c.slug}`,
    priority: '0.7',
    changefreq: 'weekly',
  }));

  const allUrls = [...categoryPages, ...colorPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (item) => `  <url>
    <loc>${siteUrl}${item.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
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
