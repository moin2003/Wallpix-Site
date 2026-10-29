/**
 * Ultra-Fast High-Performance Image Thumbnail Optimizer
 * Converts massive 4K raw images (600KB - 3MB) into ultra-lightweight,
 * edge-cached modern WebP thumbnails (15KB - 35KB) for instant gallery rendering.
 */
export function getOptimizedThumbUrl(
  rawUrl: string | undefined | null,
  width: number = 520,
  quality: number = 80
): string {
  if (!rawUrl) return '';

  // 1. Mockup cards WebP conversion
  if (rawUrl.startsWith('/images/mockup_cards/') && rawUrl.endsWith('.jpg')) {
    return rawUrl.replace('.jpg', '.webp');
  }

  // 2. Unsplash dynamic format API (High-DPI Retina clarity)
  if (rawUrl.includes('images.unsplash.com')) {
    try {
      const u = new URL(rawUrl);
      const targetWidth = Math.max(width * 1.5, 800);
      u.searchParams.set('w', Math.round(targetWidth).toString());
      u.searchParams.set('q', '85');
      u.searchParams.set('auto', 'format');
      u.searchParams.set('fit', 'crop');
      u.searchParams.set('fm', 'webp');
      return u.toString();
    } catch {
      return rawUrl;
    }
  }

  // 3. Wallhaven native thumbnails (lg 1280x720 for cards >= 300px; small for micro thumbs)
  if (rawUrl.includes('w.wallhaven.cc/full/')) {
    const parts = rawUrl.split('/');
    const sub = parts[parts.length - 2];
    const filename = parts[parts.length - 1];
    const id = filename.replace(/^wallhaven-/, '').split('.')[0];
    const sizeFolder = width >= 300 ? 'lg' : 'small';
    return `https://th.wallhaven.cc/${sizeFolder}/${sub}/${id}.jpg`;
  }

  // 4. Bing native thumbnail API
  if (rawUrl.includes('bing.com/th')) {
    try {
      const u = new URL(rawUrl);
      const targetWidth = Math.max(width * 1.5, 800);
      u.searchParams.set('w', Math.round(targetWidth).toString());
      u.searchParams.set('h', Math.round((targetWidth * 9) / 16).toString());
      u.searchParams.set('c', '7');
      u.searchParams.set('rs', '1');
      return u.toString();
    } catch {
      return rawUrl;
    }
  }

  // 5. WallpaperCat native retina thumbnails (middle-retina 1600x900 ~110KB for crystal-clear cards; small-retina for micro icons < 250px)
  if (rawUrl.includes('wallpapercat.com/w/full/')) {
    const isVertical =
      /(mobile|phone|iphone|samsung|vertical)/i.test(rawUrl) ||
      /(5828021|5828027|5827973|5828001|5827784|5827936|5828105|5828096|5828338|5828115)\.jpg/.test(
        rawUrl
      );
    const sizePrefix = width >= 250 ? 'middle' : 'small';
    const thumbType = isVertical ? `${sizePrefix}-vertical-retina` : `${sizePrefix}-retina`;
    return rawUrl.replace('/w/full/', `/w/${thumbType}/`);
  }

  // 6. AlphaCoders (WordPress Photon CDN with 2x High-DPI sampling)
  if (rawUrl.includes('alphacoders.com')) {
    const cleanUrl = rawUrl.replace(/^https?:\/\//, '');
    const targetWidth = Math.max(width * 1.5, 800);
    return `https://i0.wp.com/${cleanUrl}?w=${Math.round(targetWidth)}&strip=all`;
  }

  // 7. Global Cloudflare Edge WebP CDN (wsrv.nl) with High-DPI sampling
  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
    const targetWidth = Math.max(width * 1.5, 800);
    return `https://wsrv.nl/?url=${encodeURIComponent(rawUrl)}&w=${Math.round(targetWidth)}&q=85&output=webp`;
  }

  return rawUrl;
}
