import type { APIRoute } from 'astro';
import { wallpapers, type Wallpaper } from '../../data/wallpapers';

export const GET: APIRoute = async ({ url }) => {
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10));
  const limit = Math.min(Math.max(12, parseInt(url.searchParams.get('limit') || '36', 10)), 72);
  const category = (url.searchParams.get('category') || 'all').toLowerCase().trim();
  const format = (url.searchParams.get('format') || 'all').toLowerCase().trim();
  const search = (url.searchParams.get('search') || url.searchParams.get('q') || '').toLowerCase().trim();
  const sort = (url.searchParams.get('sort') || 'popular').toLowerCase().trim();

  let filtered: Wallpaper[] = wallpapers;

  // 1. Format Filter
  if (format === 'phone' || format === 'mobile') {
    filtered = filtered.filter(w => w.aspectRatio === '9:16' || w.aspectRatio === 'vertical');
  } else if (format === 'desktop') {
    filtered = filtered.filter(w => w.aspectRatio === '16:9' || (!w.aspectRatio?.includes('9:16') && !w.aspectRatio?.includes('vertical')));
  } else if (format === 'dual') {
    filtered = filtered.filter(w => 
      (w.aspectRatio || '').includes('32:9') || 
      (w.screenTypes || []).includes('dual-monitor') || 
      (w.screenTypes || []).includes('ultrawide')
    );
  }

  // 2. Category Filter
  if (category && category !== 'all') {
    filtered = filtered.filter(w => {
      const cCat = (w.category || '').toLowerCase();
      const cTags = (w.tags || []).map(t => t.toLowerCase());
      const cTitle = (w.title || '').toLowerCase();

      if (category === '4k') return cCat.includes('4k') || cTags.includes('4k') || cTitle.includes('4k');
      if (category === 'hd') return cCat.includes('hd') || cCat.includes('1080p') || cTags.includes('hd') || cTags.includes('1080p');
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
      if (category === 'celebrities') return cCat.includes('celebrity') || cTags.includes('celebrity');
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

  // 4. Sort
  if (sort === 'recent' || sort === 'newest') {
    // Reverse order for newest
    filtered = [...filtered].reverse();
  } else if (sort === 'downloads') {
    filtered = [...filtered].sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
  } else {
    // popular: views
    filtered = [...filtered].sort((a, b) => (b.views || 0) - (a.views || 0));
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
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
};
