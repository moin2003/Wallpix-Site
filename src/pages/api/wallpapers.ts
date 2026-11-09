import type { APIRoute } from 'astro';
import { wallpapers, type Wallpaper } from '../../data/wallpapers';

export const prerender = false;

// Round-robin category diversification for rich, balanced discovery feeds
function diversifyByCategory(items: Wallpaper[]): Wallpaper[] {
  const byCat = new Map<string, Wallpaper[]>();
  for (const item of items) {
    const cat = item.category || 'Other';
    if (!byCat.has(cat)) byCat.set(cat, []);
    byCat.get(cat)!.push(item);
  }

  const result: Wallpaper[] = [];
  const catArrays = Array.from(byCat.values());
  let maxLen = 0;
  for (const arr of catArrays) {
    if (arr.length > maxLen) maxLen = arr.length;
  }

  for (let i = 0; i < maxLen; i++) {
    for (const arr of catArrays) {
      if (i < arr.length) {
        result.push(arr[i]);
      }
    }
  }
  return result;
}

// 0ms In-Memory Caches for Primary Format Streams (Eliminates Worker CPU bottleneck)
let cachedPhoneFeed: Wallpaper[] | null = null;
let cachedDesktopFeed: Wallpaper[] | null = null;
let cachedDualFeed: Wallpaper[] | null = null;
let cachedDefaultDiversified: Wallpaper[] | null = null;

function isQuality(w: Wallpaper): boolean {
  const t = (w.title || '').trim().toLowerCase();
  const banned = new Set(['anime', 'iphone', 'cool', 'onyx', 'car', 'nature', 'phone', 'goth', 'sand', 'gradient', 'island', 'logo']);
  return !banned.has(t) && t.length >= 3;
}

function scoreQuality(w: Wallpaper): number {
  let s = (w.views || 0) * 0.1 + (w.downloads || 0) * 0.2;
  const res = w.resolution || '';
  if (res.includes('3840') || res.includes('4K') || res.includes('2160')) s += 50000;
  if (res.includes('2560') || res.includes('1440') || res.includes('2880') || res.includes('3120')) s += 25000;
  const t = (w.title || '').toLowerCase();
  if (/spider[-\s]?man|miles morales|peter parker|iron spider|spiderverse|spider-verse/i.test(t)) s += 40000;
  if (/naruto|sasuke|gojo|luffy|zoro|demon slayer|eren|titan|goku|jujutsu|tanjiro|tokyo ghoul|bleach|one punch/i.test(t)) s += 35000;
  if (/porsche|lamborghini|ferrari|mclaren|bugatti|supercar/i.test(t)) s += 30000;
  if (/amoled|pitch black|black diamond/i.test(t)) s += 25000;
  if (/nebula|galaxy|astronaut|cosmos|guardians of the galaxy/i.test(t)) s += 25000;
  return s;
}

function getPhoneFeed(): Wallpaper[] {
  if (cachedPhoneFeed) return cachedPhoneFeed;
  const allPhone = wallpapers.filter(w => w.aspectRatio === '9:16' || w.aspectRatio === 'vertical');
  const qualityPhone = allPhone.filter(isQuality).sort((a, b) => scoreQuality(b) - scoreQuality(a));
  const otherPhone = allPhone.filter(w => !isQuality(w));
  cachedPhoneFeed = [...qualityPhone, ...otherPhone];
  return cachedPhoneFeed;
}

function getDesktopFeed(): Wallpaper[] {
  if (cachedDesktopFeed) return cachedDesktopFeed;
  const allDesk = wallpapers.filter(w => w.aspectRatio === '16:9' || (!w.aspectRatio?.includes('9:16') && !w.aspectRatio?.includes('vertical')));
  const qualityDesk = allDesk.filter(isQuality).sort((a, b) => scoreQuality(b) - scoreQuality(a));
  const otherDesk = allDesk.filter(w => !isQuality(w));
  cachedDesktopFeed = [...qualityDesk, ...otherDesk];
  return cachedDesktopFeed;
}

function getDualFeed(): Wallpaper[] {
  if (cachedDualFeed) return cachedDualFeed;
  cachedDualFeed = wallpapers.filter(w => 
    (w.aspectRatio || '').includes('32:9') || 
    (w.screenTypes || []).includes('dual-monitor') || 
    (w.screenTypes || []).includes('ultrawide')
  );
  return cachedDualFeed;
}

export const GET: APIRoute = async ({ url }) => {
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10));
  const limit = Math.min(Math.max(12, parseInt(url.searchParams.get('limit') || '36', 10)), 72);
  const category = (url.searchParams.get('category') || 'all').toLowerCase().trim();
  const format = (url.searchParams.get('format') || 'all').toLowerCase().trim();
  const search = (url.searchParams.get('search') || url.searchParams.get('q') || '').toLowerCase().trim();
  const sort = (url.searchParams.get('sort') || 'recent').toLowerCase().trim();

  let filtered: Wallpaper[];

  // 1. High-Speed Pre-Cached Format Selection
  if (format === 'phone' || format === 'mobile') {
    filtered = getPhoneFeed();
  } else if (format === 'desktop') {
    filtered = getDesktopFeed();
  } else if (format === 'dual') {
    filtered = getDualFeed();
  } else {
    filtered = wallpapers;
  }

  // 2. Category Filter
  if (category && category !== 'all') {
    filtered = filtered.filter(w => {
      const cCat = (w.category || '').toLowerCase();
      const cTags = (w.tags || []).map(t => t.toLowerCase());
      const cTitle = (w.title || '').toLowerCase();

      if (category === '4k') return cCat.includes('4k') || cTags.includes('4k') || cTitle.includes('4k');
      if (category === 'hd') return (w.resolution || '').includes('1920') || (w.title || '').includes('1080') || cCat.includes('hd') || cCat.includes('1080p') || cTags.includes('hd') || cTags.includes('1080p');
      if (category === 'gaming') return cCat.includes('game') || cTags.includes('game') || cTags.includes('gaming') || cTags.includes('genshin') || cTags.includes('cyberpunk') || cTags.includes('valorant') || cTags.includes('gta');
      if (category === 'anime') return cCat.includes('anime') || cCat.includes('manga') || cTags.includes('anime') || cTags.includes('manga') || cTags.includes('naruto') || cTags.includes('ghibli');
      if (category === 'amoled') return cCat.includes('amoled') || cTags.includes('amoled') || cCat.includes('black') || cTags.includes('dark') || cTitle.includes('black');
      if (category === 'cyberpunk') return cCat.includes('cyber') || cTags.includes('cyber') || cTags.includes('neon') || cTitle.includes('cyber');
      if (category === 'cars') return cCat.includes('car') || cTags.includes('car') || cTags.includes('bike') || cTags.includes('supercar') || cTags.includes('porsche') || cTags.includes('lamborghini') || cTags.includes('audi') || cTags.includes('mclaren');
      if (category === 'nature') return cCat.includes('nature') || cTags.includes('nature') || cTags.includes('mountain') || cTags.includes('forest') || cTags.includes('lake') || cTags.includes('ocean');
      if (category === 'space') return cCat.includes('space') || cTags.includes('space') || cTags.includes('galaxy') || cTags.includes('nebula') || cTags.includes('cosmic') || cTags.includes('planet');
      if (category === 'superheroes') return cCat.includes('hero') || cTags.includes('hero') || cTags.includes('marvel') || cTags.includes('batman') || cTags.includes('spider');
      if (category === 'movies') return cCat.includes('movie') || cTags.includes('movie') || cCat.includes('film') || cTags.includes('cinema');
      if (category === 'tv-shows') return cCat.includes('tv') || cTags.includes('series') || cTags.includes('show') || cTags.includes('stranger') || cTags.includes('thrones');
      if (category === 'cartoon') return cCat.includes('cartoon') || cCat.includes('animation') || cTags.includes('cartoon') || cTags.includes('disney') || cTags.includes('pixar');
      if (category === 'music') return cCat.includes('music') || cTags.includes('music') || cTags.includes('singer') || cTags.includes('band') || cTags.includes('rock');
      if (category === 'city') return cCat.includes('city') || cTags.includes('city') || cTags.includes('urban') || cTags.includes('tokyo');
      if (category === 'animals') return cCat.includes('animal') || cTags.includes('animal') || cTags.includes('wildlife') || cTags.includes('wolf');
      if (category === 'sports') return cCat.includes('sport') || cTags.includes('sport') || cTags.includes('racing');
      if (category === 'celebrities') return cCat.includes('celebrity') || cCat.includes('actor') || cCat.includes('actress') || cCat.includes('model') || cCat.includes('singer') || cTags.includes('celebrity') || cTags.includes('singer') || cTags.includes('actor') || cTags.includes('actress') || cTags.includes('artist') || cTags.includes('taylor-swift');
      if (category === 'minimalist' || category === 'abstract') return cCat.includes('minimal') || cCat.includes('abstract') || cTags.includes('abstract') || cTags.includes('minimal');
      if (category === 'dark') return cCat.includes('dark') || cTags.includes('dark') || cCat.includes('black') || cTags.includes('shadow');
      if (category === 'fantasy') return cCat.includes('fantasy') || cTags.includes('fantasy') || cTags.includes('magic') || cTags.includes('dragon');

      return cCat.includes(category) || cTags.includes(category) || cTitle.includes(category);
    });
  }

  // 3. Search Filter
  if (search) {
    const tokens = search.split(/\s+/).filter(Boolean);
    filtered = filtered.filter(w => {
      const text = ((w.title || '') + ' ' + (w.category || '') + ' ' + (w.tags || []).join(' ')).toLowerCase();
      return tokens.every(t => text.includes(t));
    });
  }

  // 4. De-duplicate by slug before pagination
  const seenSlugs = new Set<string>();
  filtered = filtered.filter(w => {
    if (!w.slug || seenSlugs.has(w.slug)) return false;
    seenSlugs.add(w.slug);
    return true;
  });

  // 5. Sort & Category Diversification
  if (sort === 'downloads') {
    filtered = [...filtered].sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
  } else if (sort === 'popular') {
    filtered = [...filtered].sort((a, b) => (b.views || 0) - (a.views || 0));
  } else if (sort === 'oldest') {
    filtered = [...filtered].reverse();
  } else if (category === 'all' && !search && format === 'all') {
    if (!cachedDefaultDiversified) {
      cachedDefaultDiversified = diversifyByCategory(filtered);
    }
    filtered = cachedDefaultDiversified;
  }

  const total = filtered.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const items = filtered.slice(startIndex, endIndex);
  const hasMore = endIndex < total;

  return new Response(JSON.stringify({
    page,
    limit,
    total,
    hasMore,
    items
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
      'Cloudflare-CDN-Cache-Control': 'public, max-age=86400, stale-while-revalidate=86400',
      'CDN-Cache-Control': 'public, max-age=86400, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*'
    }
  });
};
