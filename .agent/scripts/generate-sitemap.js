/**
 * Automated XML Sitemap Generator for WALPIX 4K Wallpaper Portal
 * Generates sitemap-index.xml, sitemap.xml, sitemap-main.xml, sitemap-categories.xml,
 * sitemap-screens.xml, sitemap-tags.xml, and sitemap-wallpapers.xml (with image:image tags)
 * Usage: node .agent/scripts/generate-sitemap.js [baseURL] [outputDir]
 */

import fs from 'node:fs';
import path from 'node:path';

const BASE_URL = process.argv[2] || 'https://walpix.site';
const OUTPUT_DIR = process.argv[3] || './public';

const catalogPath = path.resolve('public/data/catalog.json');
const taxonomyPath = path.resolve('src/data/taxonomyData.json');

let catalog = [];
try {
  catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
} catch (e) {
  console.warn('Could not read catalog.json, using fallback empty array');
}

let taxonomy = { mainCategories: [], screenTypeHubs: [], popularSearchTags: [] };
try {
  taxonomy = JSON.parse(fs.readFileSync(taxonomyPath, 'utf8'));
} catch (e) {
  console.warn('Could not read taxonomyData.json, using fallback');
}

function escapeXml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const currentDate = new Date().toISOString();

// 1. Core / Main Pages Sitemap
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

const mainXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${corePages
  .map(
    (p) => `  <url>
    <loc>${BASE_URL}${p.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

// 2. Categories Sitemap
const catList = taxonomy.mainCategories || [];
const categoriesXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${catList
  .map(
    (cat) => `  <url>
    <loc>${BASE_URL}/category/${cat.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

// 3. Screen Hubs Sitemap
const screenList = taxonomy.screenTypeHubs || [];
const screensXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${screenList
  .map(
    (hub) => `  <url>
    <loc>${BASE_URL}/screen/${hub.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

// 4. Tags Sitemap
const tagList = taxonomy.popularSearchTags || [];
const tagsXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${tagList
  .slice(0, 1000)
  .map(
    (t) => `  <url>
    <loc>${BASE_URL}/tag/${t.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

// 5. Wallpapers Sitemap with Google Image tags
const wallpapersXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${catalog
  .map((wp) => {
    const pageLoc = `${BASE_URL}/wallpapers/${wp.slug}`;
    const imageLoc = wp.sourceCdn.startsWith('http')
      ? escapeXml(wp.sourceCdn)
      : `${BASE_URL}${escapeXml(wp.sourceCdn)}`;
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

// 6. Root Sitemap Index
const sitemapFiles = [
  '/sitemap-main.xml',
  '/sitemap-categories.xml',
  '/sitemap-screens.xml',
  '/sitemap-tags.xml',
  '/sitemap-wallpapers.xml',
];

const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapFiles
  .map(
    (sm) => `  <sitemap>
    <loc>${BASE_URL}${sm}</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>`;

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap-index.xml'), indexXml.trim(), 'utf8');
fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap.xml'), indexXml.trim(), 'utf8');
fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap-main.xml'), mainXml.trim(), 'utf8');
fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap-categories.xml'), categoriesXml.trim(), 'utf8');
fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap-screens.xml'), screensXml.trim(), 'utf8');
fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap-tags.xml'), tagsXml.trim(), 'utf8');
fs.writeFileSync(path.join(OUTPUT_DIR, 'sitemap-wallpapers.xml'), wallpapersXml.trim(), 'utf8');

console.log(`[🎉 SUCCESS] All 7 XML sitemaps generated cleanly in: ${OUTPUT_DIR}`);
