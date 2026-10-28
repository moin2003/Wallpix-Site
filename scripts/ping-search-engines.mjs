/**
 * Wallpix Search Engine Pinging & IndexNow Automation Engine
 * Pings Google Search Console sitemap endpoint and submits recent URLs to IndexNow (Bing/Yandex)
 */

import https from 'https';

const DOMAIN = 'walpix.site';
const SITEMAP_URL = `https://${DOMAIN}/sitemap.xml`;

// 1. Ping Google Sitemap Endpoint
function pingGoogle() {
  const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
  console.log(`[Google Ping] Pinging: ${pingUrl}`);
  https.get(pingUrl, (res) => {
    console.log(`[Google Ping] Response Status: ${res.statusCode}`);
  }).on('error', (err) => {
    console.warn(`[Google Ping] Notice: ${err.message}`);
  });
}

// 2. Submit to IndexNow (Bing, Yandex, Seznam, Naver)
function submitIndexNow(urlList) {
  const apiKey = process.env.INDEXNOW_KEY || 'f68a27d14c3e41b988f0a28f7311c9ea';
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

  console.log(`[IndexNow] Submitting ${urlList.length} URLs to api.indexnow.org...`);
  const req = https.request(options, (res) => {
    console.log(`[IndexNow] Response Status: ${res.statusCode} (${res.statusCode === 200 || res.statusCode === 202 ? 'Success' : 'Queued'})`);
  });

  req.on('error', (e) => {
    console.warn(`[IndexNow] Error: ${e.message}`);
  });

  req.write(postData);
  req.end();
}

// Execute
console.log('🚀 Initiating Wallpix Search Engine Pinging Engine...');
pingGoogle();

const sampleUrls = [
  `https://${DOMAIN}/`,
  `https://${DOMAIN}/wallpapers`,
  `https://${DOMAIN}/category/anime`,
  `https://${DOMAIN}/category/gaming`,
  `https://${DOMAIN}/category/nature-scenery`,
  `https://${DOMAIN}/category/cars-supercars`,
  `https://${DOMAIN}/category/movies`,
  `https://${DOMAIN}/category/amoled-black`,
  `https://${DOMAIN}/tool/cropper`,
  `https://${DOMAIN}/tool/avatar`,
  `https://${DOMAIN}/tool/splitter`,
];

submitIndexNow(sampleUrls);
