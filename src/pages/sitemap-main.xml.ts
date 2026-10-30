export const prerender = true;
import type { APIRoute } from 'astro';
import { collections } from '../data/collections';
import { blogPosts } from '../data/blogPosts';

export const GET: APIRoute = async () => {
  const siteUrl = 'https://www.walpix.site';
  const currentDate = new Date().toISOString().split('T')[0];

  const corePages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/wallpapers', priority: '0.9', changefreq: 'daily' },
    { url: '/categories', priority: '0.9', changefreq: 'weekly' },
    { url: '/collections', priority: '0.8', changefreq: 'weekly' },
    { url: '/community', priority: '0.7', changefreq: 'weekly' },
    { url: '/blog', priority: '0.8', changefreq: 'daily' },
    { url: '/tool/cropper', priority: '0.8', changefreq: 'monthly' },
    { url: '/tool/avatar', priority: '0.8', changefreq: 'monthly' },
    { url: '/tool/mockup', priority: '0.8', changefreq: 'monthly' },
    { url: '/privacy', priority: '0.3', changefreq: 'monthly' },
    { url: '/terms', priority: '0.3', changefreq: 'monthly' },
    { url: '/dmca', priority: '0.3', changefreq: 'monthly' },
    { url: '/contact', priority: '0.4', changefreq: 'monthly' },
  ];

  const collectionUrls = collections.map((col) => ({
    url: `/collections/${col.slug}`,
    priority: '0.8',
    changefreq: 'weekly',
  }));

  const blogUrls = blogPosts.map((post) => ({
    url: `/blog/${post.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
  }));

  const allUrls = [...corePages, ...collectionUrls, ...blogUrls];

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
