---
name: website-automation
description: >-
  Automate website operations, content ingestion, scheduled publishing, media processing,
  sitemap generation, search engine indexing pings, and CI/CD pipelines.
  Use when setting up web scrapers, automated workflows, cron jobs, RSS feeds, or automated deploy scripts.
---

# Website Automation Skill

This skill provides step-by-step procedures and templates for automating repetitive website tasks, batch data pipelines, continuous content generation, and search engine integration.

---

## 1. Automated Sitemap & Indexing Pipeline

Keeping Google, Bing, and other search engines updated automatically whenever new wallpapers, articles, or categories are added.

### Workflow:
1. Generate fresh `sitemap.xml` after content updates using the automation script (`.agent/scripts/generate-sitemap.js`).
2. Ping Google Search Console and IndexNow API (for Bing & Yandex) with newly updated URLs.

### IndexNow API Webhook Automation (Node.js/JavaScript):
```javascript
import https from 'node:https';

export async function notifyIndexNow(urls, host, key, keyLocation) {
  const payload = JSON.stringify({
    host: host,
    key: key,
    keyLocation: keyLocation,
    urlList: urls
  });

  const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      console.log(`IndexNow response status: ${res.statusCode}`);
      resolve(res.statusCode);
    });
    req.on('error', (e) => reject(e));
    req.write(payload);
    req.end();
  });
}
```

---

## 2. Automated Media & Content Ingestion Pipeline

When fetching or downloading wallpapers/images in batch:
1. **Source Download**: Download high-resolution source image.
2. **Metadata Extraction**: Extract EXIF (resolution, camera data, color tones).
3. **Automated AI Tagging**: Generate SEO tags (e.g., "anime", "cyberpunk", "minimalist", "nature", "dark mode 4k").
4. **Resizing & Conversion**:
   - Master (Original)
   - 4K Desktop (`3840x2160`) -> WebP (Quality 85)
   - 2K/1080p Desktop (`1920x1080`) -> WebP (Quality 80)
   - Mobile Portrait (`1080x1920` / `1440x3200`) -> WebP (Quality 80)
   - Thumbnail (`360x640` / `480x270`) -> WebP (Quality 75)
5. **Database / JSON Sync**: Append metadata to site inventory file (e.g., `wallpapers.json` or SQLite/Supabase).

---

## 3. GitHub Actions CI/CD Automation

Automated scheduled build and deployment (e.g., nightly wallpaper aggregation & sitemap update):

```yaml
name: Build & Auto Deploy

on:
  push:
    branches: [ main ]
  schedule:
    - cron: '0 0 * * *' # Every midnight UTC
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run automated sitemap generator
        run: node .agent/scripts/generate-sitemap.js
        
      - name: Build static site
        run: npm run build
        
      - name: Deploy to Cloudflare Pages / Vercel
        run: npm run deploy
```

---

## 4. Automation Checklist

- [ ] Automated image compression on upload / batch ingest.
- [ ] Automated sitemap XML regeneration.
- [ ] Robots.txt auto-check for disallow rules.
- [ ] Automated RSS / Atom feed generation for blog posts.
- [ ] Automated broken link checking.
