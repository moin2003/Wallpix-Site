---
name: wallpaper-media-pipeline
description: >-
  Process, optimize, crop, tag, and publish wallpapers and media assets at scale.
  Use when compressing image files, generating multi-resolution downloads (4K, 2K, 1080p, Mobile),
  extracting dominant color palettes for UI filters, and structuring wallpaper catalog metadata.
---

# Wallpaper Media Pipeline Skill

This skill provides an automated pipeline for wallpaper asset preparation, multi-resolution cropping, high-efficiency WebP/AVIF conversion, dominant color extraction, and catalog indexing.

---

## 1. Wallpaper Resolution Standards

For every raw uploaded wallpaper, generate the following standard renditions:

| Format | Target Resolution | Aspect Ratio | Use Case | Target Size |
| :--- | :--- | :--- | :--- | :--- |
| **Original 4K** | `3840 x 2160` | 16:9 | Desktop / TV / Ultra-Wide | ~500 KB - 1.2 MB (WebP q=88) |
| **Full HD (1080p)**| `1920 x 1080` | 16:9 | Standard Laptops / Monitors | ~200 - 450 KB (WebP q=82) |
| **Mobile Ultra** | `1440 x 3200` | 9:20 / 9:16 | Modern OLED/AMOLED Phones | ~300 - 600 KB (WebP q=85) |
| **Mobile Standard**| `1080 x 2400` | 9:20 / 9:16 | Standard Smartphones | ~180 - 350 KB (WebP q=80) |
| **Thumbnail / Card**| `480 x 854` (or `480x270`)| Matches ratio| Grid Card Preview | ~25 - 45 KB (WebP q=75) |

---

## 2. Automated Python Batch Processing Script

See the complete working Python image optimizer in [optimize-images.py](../../scripts/optimize-images.py).

### Core Conversion Features:
- Converts PNG/JPG/JPEG to highly compressed `.webp` and `.avif`.
- Preserves sharp contrast and removes unwanted EXIF metadata to save 10-15% extra filesize.
- Extracts dominant RGB hex colors to enable "Filter by Color" (e.g. #0D0E15 for dark mode/AMOLED).
- Generates JSON metadata ready to be read by the frontend.

---

## 3. Wallpaper Catalog Metadata Schema

Every wallpaper entry should have structured metadata:

```json
{
  "id": "wp-2026-neon-samurai",
  "title": "Cyberpunk Neon Samurai 4K",
  "slug": "cyberpunk-neon-samurai-4k",
  "category": "Anime & Sci-Fi",
  "tags": ["cyberpunk", "samurai", "neon", "dark", "amoled", "4k"],
  "dominantColor": "#120e24",
  "isAmoled": true,
  "views": 1420,
  "downloads": 890,
  "dimensions": {
    "width": 3840,
    "height": 2160,
    "aspectRatio": "16:9"
  },
  "files": {
    "thumbnail": "/wallpapers/thumbs/neon-samurai.webp",
    "desktop4k": "/wallpapers/4k/neon-samurai.webp",
    "desktop1080p": "/wallpapers/1080p/neon-samurai.webp",
    "mobile": "/wallpapers/mobile/neon-samurai.webp"
  },
  "publishedAt": "2026-10-03T03:00:00Z"
}
```

---

## 4. Pipeline Execution Checklist

- [ ] Optimize images before uploading to production.
- [ ] Ensure thumbnail payloads are under 50 KB for instant grid rendering.
- [ ] Check AMOLED tag accuracy (True if >60% pixels are pure black `#000000`).
- [ ] Verify download URLs work with proper `Content-Disposition: attachment` headers.
