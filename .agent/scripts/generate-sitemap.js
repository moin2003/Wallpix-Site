/**
 * Automated XML Sitemap Generator for Wallpaper & Blog Website
 * Usage: node .agent/scripts/generate-sitemap.js [baseURL] [outputPath]
 */

import fs from 'node:fs';
import path from 'node:path';

const BASE_URL = process.argv[2] || 'https://example.com';
const OUTPUT_FILE = process.argv[3] || './public/sitemap.xml';

// Sample static routes (customizable for dynamic pages/database)
const routes = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/categories', priority: '0.9', changefreq: 'daily' },
  { path: '/categories/anime', priority: '0.8', changefreq: 'weekly' },
  { path: '/categories/cyberpunk', priority: '0.8', changefreq: 'weekly' },
  { path: '/categories/minimalist', priority: '0.8', changefreq: 'weekly' },
  { path: '/categories/amoled-4k', priority: '0.8', changefreq: 'weekly' },
  { path: '/categories/nature', priority: '0.8', changefreq: 'weekly' },
  { path: '/blog', priority: '0.7', changefreq: 'daily' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'monthly' },
  { path: '/terms-of-service', priority: '0.3', changefreq: 'monthly' },
  { path: '/about-us', priority: '0.4', changefreq: 'monthly' },
  { path: '/contact-us', priority: '0.4', changefreq: 'monthly' },
  { path: '/dmca-policy', priority: '0.3', changefreq: 'monthly' },
];

function generateSitemapXml(urls) {
  const currentDate = new Date().toISOString().split('T')[0];

  const urlElements = urls.map(route => `
  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
}

try {
  const sitemapXml = generateSitemapXml(routes);
  const outDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  fs.writeFileSync(OUTPUT_FILE, sitemapXml.trim(), 'utf8');
  console.log(`[SUCCESS] Sitemap generated successfully at: ${OUTPUT_FILE}`);
} catch (error) {
  console.error('[ERROR] Failed to generate sitemap:', error);
  process.exit(1);
}
