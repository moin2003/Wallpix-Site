---
name: blogging-and-seo
description: >-
  Execute high-impact SEO strategies, on-page search engine optimization, keyword clustering,
  structured data (JSON-LD schema markup), and E-E-A-T compliant blog content creation.
  Use when writing blog articles, adding SEO meta tags, optimizing keywords, setting up breadcrumbs, or improving organic search traffic.
---

# Blogging & SEO Skill

This skill provides comprehensive workflows for keyword research, content architecture, structured data markup, and on-page optimization to maximize organic search rankings and ad monetization.

---

## 1. Content Structure for High-Ranking Articles

Every blog post and collection page must follow this high-retention, high-search-intent structure:

1. **Compelling H1 Title (50-60 characters)**:
   - Must contain the target keyword naturally near the front.
   - Example: `Top 50 4K Cyberpunk Wallpapers for Desktop and Mobile (2026 Edition)`
2. **Meta Description (140-155 characters)**:
   - High CTR copy with explicit call to action.
   - Example: `Download 50+ free ultra HD 4K cyberpunk wallpapers. Stunning neon cityscapes, sci-fi aesthetic backgrounds optimized for PC and mobile screens.`
3. **Introduction (100-150 words)**:
   - Answer the search intent immediately. Avoid fluff.
   - Include primary keyword in the first 100 words.
4. **Table of Contents (TOC)**:
   - Quick jump links for user experience and Google featured snippets.
5. **Body Sections (H2, H3 tags)**:
   - Organized by subtopics/themes (e.g., "Futuristic Cityscapes", "Neon Cyber Anime", "Minimalist Cyberpunk").
   - Embed high-resolution sample previews with descriptive `alt` text.
6. **FAQ Section (H2 + JSON-LD Schema)**:
   - Answer common user queries (e.g., "How do I set 4K wallpaper on Windows 11?", "What resolution is best for mobile?").
7. **Call to Action (CTA) & Related Collections**:
   - Internal links to related wallpaper categories to increase pageviews and dwell time.

---

## 2. Structured Data Markup (JSON-LD)

Every page must have appropriate JSON-LD injected in the `<head>`:

### For Blog Posts / Articles:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Top 50 4K Cyberpunk Wallpapers for Desktop and Mobile",
  "image": [
    "https://example.com/images/cyberpunk-banner.webp"
  ],
  "datePublished": "2026-10-01T08:00:00+08:00",
  "dateModified": "2026-10-03T09:20:00+08:00",
  "author": [{
    "@type": "Person",
    "name": "Site Editorial Team",
    "url": "https://example.com/about"
  }],
  "publisher": {
    "@type": "Organization",
    "name": "Wallpaper Hub",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.webp"
    }
  },
  "description": "Download 50+ free ultra HD 4K cyberpunk wallpapers for PC and phone."
}
</script>
```

### For Wallpaper Media Object:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "contentUrl": "https://example.com/wallpapers/neon-city-4k.webp",
  "license": "https://example.com/license",
  "acquireLicensePage": "https://example.com/download/neon-city",
  "creditText": "Wallpaper Hub",
  "creator": {
    "@type": "Organization",
    "name": "Wallpaper Hub"
  },
  "copyrightNotice": "Wallpaper Hub",
  "name": "Neon City Cyberpunk 4K Wallpaper"
}
</script>
```

---

## 3. SEO Optimization Checklist

- [ ] Target keyword in URL slug (`/cyberpunk-wallpapers-4k`).
- [ ] Primary keyword in `<title>`, `<meta name="description">`, and `<h1>`.
- [ ] Descriptive, natural `alt` tags on every image (`alt="Dark aesthetic rainy street 4K wallpaper"`).
- [ ] Canonical URL tag in `<head>` (`<link rel="canonical" href="..." />`).
- [ ] Open Graph (`og:title`, `og:image`, `og:description`, `og:type`) & Twitter Card tags present.
- [ ] Minimum 3-5 internal links to relevant categories or collections.
- [ ] Valid BreadcrumbList schema implemented.
- [ ] Keyword density balanced (1-2%), natural readability, zero keyword stuffing.
