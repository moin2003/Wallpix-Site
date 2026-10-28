// WALPIX 4K Exhaustive Taxonomy & Programmatic SEO System
// High-performance JSON-backed catalog data

import taxonomyData from './taxonomyData.json';

export interface SubTopic {
  name: string;
  slug: string;
  count: string;
  cover?: string;
  wpcEndpoint?: string;
}

export interface MainCategory {
  id: string;
  name: string;
  slug: string;
  count: string;
  icon: string;
  cover: string;
  description: string;
  subTopics: SubTopic[];
}

export interface ScreenTypeHub {
  name: string;
  slug: string;
  badge: string;
  count: string;
  description: string;
}

export interface PopularSearchTag {
  name: string;
  slug: string;
  count: string;
}

export const SCREEN_TYPE_HUBS: ScreenTypeHub[] = taxonomyData.screenTypeHubs as ScreenTypeHub[];
export const MAIN_CATEGORIES: MainCategory[] = taxonomyData.mainCategories as MainCategory[];
export const POPULAR_SEARCH_TAGS: PopularSearchTag[] = taxonomyData.popularSearchTags as PopularSearchTag[];

// Cached Tag Registry for instant lookups without AST overhead
let cachedAllTags: SubTopic[] | null = null;
const tagSlugMap = new Map<string, SubTopic>();

export function getAllTags(): SubTopic[] {
  if (cachedAllTags) return cachedAllTags;
  
  const map = new Map<string, SubTopic>();
  for (const cat of MAIN_CATEGORIES) {
    if (!cat.subTopics) continue;
    for (const sub of cat.subTopics) {
      if (!map.has(sub.slug)) {
        map.set(sub.slug, sub);
        tagSlugMap.set(sub.slug, sub);
      }
    }
  }
  cachedAllTags = Array.from(map.values());
  return cachedAllTags;
}

const CATEGORY_SLUG_ALIASES: Record<string, string> = {
  'comics': 'superheroes',
  'superhero': 'superheroes',
  'cartoons': 'cartoon',
  'music-artists': 'music',
  'animals-wildlife': 'animals',
  'celebrities-music': 'celebrities',
  'nature': 'nature-scenery',
  'space': 'space-cosmic',
  'cars': 'cars-supercars',
  'amoled': 'amoled-black',
  'cyberpunk': 'cyberpunk-neon',
};

export function getCategoryBySlug(slug: string): MainCategory | undefined {
  if (!slug) return undefined;
  const clean = slug.toLowerCase().trim();
  const alias = CATEGORY_SLUG_ALIASES[clean] || clean;
  return MAIN_CATEGORIES.find(
    (c) => c.slug === alias || c.id === alias || c.slug === clean || c.id === clean
  );
}

export function getTagBySlug(slug: string): SubTopic | undefined {
  if (!slug) return undefined;
  const clean = slug.toLowerCase().trim();
  if (tagSlugMap.has(clean)) return tagSlugMap.get(clean);
  return getAllTags().find((t) => t.slug === clean);
}

export function getScreenHubBySlug(slug: string): ScreenTypeHub | undefined {
  if (!slug) return undefined;
  const clean = slug.toLowerCase().trim();
  return SCREEN_TYPE_HUBS.find((s) => s.slug === clean);
}
