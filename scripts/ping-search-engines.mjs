/**
 * Wallpix Search Engine Pinging & IndexNow Automation Engine
 * Submits dynamic sitemap URLs, blog posts, tools, and fresh wallpapers to IndexNow (Bing/Yandex)
 */

import https from 'https';
import fs from 'fs';
import path from 'path';

const DOMAIN = 'walpix.site';
const apiKey = process.env.INDEXNOW_KEY || 'f68a27d14c3e41b988f0a28f7311c9ea';

// Dynamic URL Extractor
function gatherUrls() {
  const urls = new Set();

  // 1. Core Pages & Tools
  urls.add(`https://${DOMAIN}/`);
  urls.add(`https://${DOMAIN}/wallpapers`);
  urls.add(`https://${DOMAIN}/tools`);
  urls.add(`https://${DOMAIN}/tool/mockup`);
  urls.add(`https://${DOMAIN}/tool/cropper`);
  urls.add(`https://${DOMAIN}/tool/avatar`);
  urls.add(`https://${DOMAIN}/tool/splitter`);
  urls.add(`https://${DOMAIN}/blog`);

  // 2. High-Priority Categories
  const categories = [
    'anime', 'gaming', 'cars-supercars', 'nature-scenery', 'movies',
    'amoled-black', 'cyberpunk-neon', 'minimalist-abstract', 'space-cosmic'
  ];
  categories.forEach(c => urls.add(`https://${DOMAIN}/category/${c}`));

  // 3. 16 Master E-E-A-T Blog Posts
  const blogSlugs = [
    'oled-monitor-eye-strain-settings-calibration-guide',
    'windows-11-4k-hdr-display-settings-calibration-guide',
    'dual-monitor-wallpaper-alignment-gaming-setup-guide',
    'iphone-16-pro-max-lock-screen-customization-wallpaper-guide',
    'galaxy-s25-ultra-always-on-display-burn-in-prevention-guide',
    'jujutsu-kaisen-season-3-gojo-satoru-visual-aesthetic-color-palette',
    'porsche-911-gt3-rs-aerodynamics-minimalist-car-photography-4k',
    'ai-4k-wallpapers-2026-upscaling-prompting-quality-guide',
    'minimalist-desk-setup-psychology-dark-workspace-aesthetics',
    'james-webb-space-telescope-deep-space-images-cosmic-resolution-limits',
    'circular-3d-neon-avatar-discord-steam-tiktok-guide',
    'cyberpunk-lighting-cinematography-color-grading-guide',
    'cyberpunk-edgerunners-2-wallpapers-night-city-4k',
    'halloween-dark-academia-aesthetic-wallpapers-4k',
    'best-4k-amoled-wallpapers-oled-calibration-guide',
    'dual-monitor-ultrawide-wallpaper-setup-guide'
  ];
  blogSlugs.forEach(slug => urls.add(`https://${DOMAIN}/blog/${slug}`));

  // 4. Sample Fresh Wallpapers from Catalog
  try {
    const catalogPath = path.resolve('public/data/catalog.json');
    if (fs.existsSync(catalogPath)) {
      const raw = fs.readFileSync(catalogPath, 'utf8');
      const catalog = JSON.parse(raw);
      // Select 150 top wallpapers
      const sample = catalog.slice(0, 150);
      sample.forEach(w => {
        if (w.slug) urls.add(`https://${DOMAIN}/wallpapers/${w.slug}`);
      });
    }
  } catch (err) {
    console.warn('[IndexNow] Could not read catalog.json:', err.message);
  }

  return Array.from(urls);
}

// Submit to IndexNow (Bing, Yandex, Seznam, Naver)
function submitIndexNow(urlList) {
  const postData = JSON.stringify({
    host: DOMAIN,
    key: apiKey,
    keyLocation: `https://${DOMAIN}/${apiKey}.txt`,
    urlList: urlList.slice(0, 500),
  });

  const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(postData),
    },
  };

  console.log(`[IndexNow] Submitting ${Math.min(urlList.length, 500)} URLs to api.indexnow.org (Bing, Yandex, Seznam)...`);
  const req = https.request(options, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      console.log(`[IndexNow] Response Status: ${res.statusCode} (${res.statusCode === 200 || res.statusCode === 202 ? 'Success' : 'Queued'})`);
      if (res.statusCode === 200 || res.statusCode === 202) {
        console.log(`✓ Successfully notified Bing & Yandex about ${Math.min(urlList.length, 500)} high-value URLs!`);
      }
    });
  });

  req.on('error', (e) => {
    console.warn(`[IndexNow] Error: ${e.message}`);
  });

  req.write(postData);
  req.end();
}

// Execute
console.log('🚀 Initiating Wallpix Search Engine Pinging Engine...');
const allUrls = gatherUrls();
console.log(`[Gathered] ${allUrls.length} high-intent URLs across tools, guides, categories, and 4K wallpapers.`);
submitIndexNow(allUrls);
