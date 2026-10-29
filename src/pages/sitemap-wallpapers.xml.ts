export const prerender = true;
import type { APIRoute } from 'astro';
import { wallpapers } from '../data/wallpapers';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async () => {
  const siteUrl = 'https://walpix.site';
  const currentDate = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${wallpapers
  .map((wp) => {
    const pageLoc = `${siteUrl}/wallpapers/${wp.slug}`;
    const imageLoc = wp.sourceCdn.startsWith('http')
      ? escapeXml(wp.sourceCdn)
      : `${siteUrl}${escapeXml(wp.sourceCdn)}`;
    const imageTitle = escapeXml(`${wp.title} 4K Wallpaper`);
    const imageCaption = escapeXml(`Download ${wp.title} in native 4K Ultra HD resolution`);

    return `  <url>
    <loc>${pageLoc}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>${imageLoc}</image:loc>
      <image:title>${imageTitle}</image:title>
      <image:caption>${imageCaption}</image:caption>
    </image:image>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
