# AI Agent Customization Hub (.agent)

This directory contains specialized AI skills, automated workflow scripts, compliance rules, and configuration templates designed for building, automating, ranking, and monetizing websites (specifically tailored for media/wallpaper & blogging sites).

---

## Directory Overview

```text
.agent/
├── skills/
│   ├── website-development/        # High-performance, mobile-first web architecture & UI
│   ├── website-automation/         # Automated pipelines, cron jobs, indexing & feeds
│   ├── blogging-and-seo/           # Keyword ranking, E-E-A-T blogging, schema markup
│   ├── adsense-monetization/       # AdSense setup, high-RPM placements, GDPR/CMP & policy
│   └── wallpaper-media-pipeline/   # Batch 4K/2K/Mobile image optimization & cataloging
├── rules/
│   ├── website-standards.md        # Code quality, Core Web Vitals & responsiveness rules
│   ├── adsense-compliance.md       # Policy rules to prevent account bans & invalid traffic
│   └── seo-and-content-guidelines.md# On-page SEO, slug conventions, schema rules
├── scripts/
│   ├── generate-sitemap.js         # Automated XML sitemap generator
│   └── optimize-images.py          # Python batch image compressor & color extractor
└── templates/
    ├── ads.txt                     # Validated Google AdSense ads.txt format
    ├── robots.txt                  # Optimized search engine crawler directives
    ├── privacy-policy-template.md  # GDPR/AdSense compliant privacy policy
    └── terms-and-dmca-template.md  # Terms of service and DMCA takedown templates
```

---

## Available Skills & How to Use Them

1. **`website-development`**:
   - Runbook for creating clean, responsive HTML5/Tailwind/Astro/Next.js pages.
   - Built-in UI blueprints for high-converting wallpaper gallery grids and responsive download modals.

2. **`website-automation`**:
   - Automate sitemap updates, Google Search Console & IndexNow pings, batch image conversion, and GitHub Actions CI/CD workflows.

3. **`blogging-and-seo`**:
   - Generates high-retention blog articles, FAQ sections, and rich JSON-LD structured data (`Article`, `ImageObject`, `BreadcrumbList`).

4. **`adsense-monetization`**:
   - Ready-to-use zero-CLS responsive ad containers, high-RPM placement blueprints (Header, In-Gallery, Sticky Anchor), and safety guidelines to protect against policy violations.

5. **`wallpaper-media-pipeline`**:
   - Production batch pipeline converting raw wallpaper uploads into 4K, 1080p, Mobile Portrait, and Thumbnail WebP renditions with dominant color hex extraction.

---

## Quick Start Commands

- **Generate Sitemap**: `node .agent/scripts/generate-sitemap.js https://yourdomain.com ./public/sitemap.xml`
- **Batch Optimize Wallpapers**: `python .agent/scripts/optimize-images.py ./raw_wallpapers ./public/wallpapers`
