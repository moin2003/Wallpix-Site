import catalogData from '../../public/data/catalog.json';
import { getAllTags as getTaxonomyTags } from './taxonomy';

export interface Wallpaper {
  id: string;
  title: string;
  slug: string;
  category: string;
  sourceCdn: string;
  isHotlink: boolean;
  views: number;
  downloads: number;
  aspectRatio: string;
  resolution?: string;
  colorName?: string;
  colorHex?: string;
  tags?: string[];
  screenTypes?: string[];
}

export interface LuxuryColor {
  id: string;
  name: string;
  slug: string;
  hexPrimary: string;
  hexAccent: string;
  category: 'nature' | 'cyberpunk' | 'amoled' | 'space' | 'anime' | 'luxury';
  categoryLabel: string;
}

export const LUXURY_COLOR_CATEGORIES = [
  { key: 'all', label: 'All Palettes', count: 26, icon: 'palette' },
  { key: 'nature', label: 'Nature & Earth', count: 5, icon: 'mountain' },
  { key: 'cyberpunk', label: 'Cyberpunk & Neon', count: 5, icon: 'zap' },
  { key: 'amoled', label: 'AMOLED Pitch Black', count: 4, icon: 'moon' },
  { key: 'space', label: 'Space & Cosmic', count: 4, icon: 'orbit' },
  { key: 'anime', label: 'Anime & Aesthetics', count: 4, icon: 'sparkles' },
  { key: 'luxury', label: 'Luxury & Supercars', count: 4, icon: 'crown' },
];

export const LUXURY_COLORS: LuxuryColor[] = [
  // 1. Nature & Earth
  { id: 'forest-sage', name: 'Forest & Sage Green', slug: 'forest-sage', hexPrimary: '#1B4332', hexAccent: '#A7C957', category: 'nature', categoryLabel: 'Nature & Earth' },
  { id: 'sunset-gold', name: 'Sunset Gold & Alpine', slug: 'sunset-gold', hexPrimary: '#2B1D0C', hexAccent: '#F59E0B', category: 'nature', categoryLabel: 'Nature & Earth' },
  { id: 'emerald-canyon', name: 'Emerald Canyon & River', slug: 'emerald-canyon', hexPrimary: '#064E3B', hexAccent: '#10B981', category: 'nature', categoryLabel: 'Nature & Earth' },
  { id: 'autumn-amber', name: 'Autumn Amber & Pine', slug: 'autumn-amber', hexPrimary: '#451A03', hexAccent: '#D97706', category: 'nature', categoryLabel: 'Nature & Earth' },
  { id: 'nordic-fjord', name: 'Nordic Fjord & Glacial', slug: 'nordic-fjord', hexPrimary: '#0C2340', hexAccent: '#38BDF8', category: 'nature', categoryLabel: 'Nature & Earth' },

  // 2. Cyberpunk & Neon
  { id: 'charcoal-teal', name: 'Charcoal & Neon Teal', slug: 'charcoal-teal', hexPrimary: '#1C1C1C', hexAccent: '#00C2CB', category: 'cyberpunk', categoryLabel: 'Cyberpunk & Neon' },
  { id: 'synthwave-pink', name: 'Synthwave Magenta & Cyan', slug: 'synthwave-pink', hexPrimary: '#2D006B', hexAccent: '#FF007F', category: 'cyberpunk', categoryLabel: 'Cyberpunk & Neon' },
  { id: 'tokyo-violet', name: 'Tokyo Night & Neon Violet', slug: 'tokyo-violet', hexPrimary: '#1E1035', hexAccent: '#A855F7', category: 'cyberpunk', categoryLabel: 'Cyberpunk & Neon' },
  { id: 'electric-lime', name: 'Electric Lime & Matrix', slug: 'electric-lime', hexPrimary: '#050801', hexAccent: '#C2FF06', category: 'cyberpunk', categoryLabel: 'Cyberpunk & Neon' },
  { id: 'cyber-amber', name: 'Cyber Amber & Streetlight', slug: 'cyber-amber', hexPrimary: '#1A1108', hexAccent: '#FBBF24', category: 'cyberpunk', categoryLabel: 'Cyberpunk & Neon' },

  // 3. AMOLED & Pure Dark
  { id: 'obsidian-void', name: 'Obsidian Void & Pure Black', slug: 'obsidian-void', hexPrimary: '#000000', hexAccent: '#22D3EE', category: 'amoled', categoryLabel: 'AMOLED Pitch Black' },
  { id: 'golden-particle', name: 'Golden Particle Wave', slug: 'golden-particle', hexPrimary: '#000000', hexAccent: '#F5D061', category: 'amoled', categoryLabel: 'AMOLED Pitch Black' },
  { id: 'minimal-monolith', name: 'Dark Monolith & Onyx', slug: 'minimal-monolith', hexPrimary: '#0A0A0A', hexAccent: '#E5E7EB', category: 'amoled', categoryLabel: 'AMOLED Pitch Black' },
  { id: 'luminous-ring', name: 'Neon Ring & Pure Void', slug: 'luminous-ring', hexPrimary: '#000000', hexAccent: '#34D399', category: 'amoled', categoryLabel: 'AMOLED Pitch Black' },

  // 4. Space & Cosmic
  { id: 'royal-purple', name: 'Cosmic Violet & Lilac', slug: 'royal-purple', hexPrimary: '#4B0082', hexAccent: '#E6D6FF', category: 'space', categoryLabel: 'Space & Cosmic' },
  { id: 'orion-nebula', name: 'Orion Nebula & Starlight', slug: 'orion-nebula', hexPrimary: '#1B0A2A', hexAccent: '#EC4899', category: 'space', categoryLabel: 'Space & Cosmic' },
  { id: 'deep-space', name: 'Deep Space & Pillars', slug: 'deep-space', hexPrimary: '#05070D', hexAccent: '#60A5FA', category: 'space', categoryLabel: 'Space & Cosmic' },
  { id: 'aurora-emerald', name: 'Aurora Borealis & Fjord Glow', slug: 'aurora-emerald', hexPrimary: '#021F17', hexAccent: '#4ADE80', category: 'space', categoryLabel: 'Space & Cosmic' },

  // 5. Anime & Aesthetics
  { id: 'midnight-pink', name: 'Midnight Blue & Hot Pink', slug: 'midnight-pink', hexPrimary: '#0B132B', hexAccent: '#FF2E88', category: 'anime', categoryLabel: 'Anime & Aesthetics' },
  { id: 'samurai-crimson', name: 'Sakura Mist & Samurai Crimson', slug: 'samurai-crimson', hexPrimary: '#2A0808', hexAccent: '#EF4444', category: 'anime', categoryLabel: 'Anime & Aesthetics' },
  { id: 'ghibli-meadow', name: 'Ghibli Lush Meadow & Sky', slug: 'ghibli-meadow', hexPrimary: '#14361C', hexAccent: '#86EFAC', category: 'anime', categoryLabel: 'Anime & Aesthetics' },
  { id: 'shinobi-gold', name: 'Shinobi Sage & Golden Moon', slug: 'shinobi-gold', hexPrimary: '#1A1505', hexAccent: '#EAB308', category: 'anime', categoryLabel: 'Anime & Aesthetics' },

  // 6. Luxury & Supercars
  { id: 'golden-navy', name: 'Navy & Royal Gold', slug: 'navy-gold', hexPrimary: '#0D1B2A', hexAccent: '#F4B400', category: 'luxury', categoryLabel: 'Luxury & Supercars' },
  { id: 'rosso-corsa', name: 'Rosso Corsa & Speed Red', slug: 'rosso-corsa', hexPrimary: '#380505', hexAccent: '#DC2626', category: 'luxury', categoryLabel: 'Luxury & Supercars' },
  { id: 'stealth-matte', name: 'Stealth Matte Black & Cyber', slug: 'stealth-matte', hexPrimary: '#121212', hexAccent: '#F3F4F6', category: 'luxury', categoryLabel: 'Luxury & Supercars' },
  { id: 'liquid-chrome', name: 'Liquid Chrome & Mercury', slug: 'liquid-chrome', hexPrimary: '#1E242B', hexAccent: '#CBD5E1', category: 'luxury', categoryLabel: 'Luxury & Supercars' },
];

export const CATEGORIES = [
  { name: 'All Wallpapers', slug: 'all', icon: 'sparkles' },
  { name: '4K Ultra HD', slug: '4k-ultra-hd', icon: 'monitor' },
  { name: 'HD Wallpapers', slug: 'hd-wallpapers', icon: 'sparkles' },
  { name: 'Movies & TV', slug: 'movies', icon: 'film' },
  { name: 'TV Shows', slug: 'tv-shows', icon: 'tv' },
  { name: 'Anime & Manga', slug: 'anime', icon: 'anime' },
  { name: 'Gaming', slug: 'gaming', icon: 'gamepad' },
  { name: 'AMOLED Black', slug: 'amoled-black', icon: 'moon' },
  { name: 'Cyberpunk & Neon', slug: 'cyberpunk-neon', icon: 'zap' },
  { name: 'Nature & Scenery', slug: 'nature-scenery', icon: 'mountain' },
  { name: 'Minimalist & Abstract', slug: 'minimalist-abstract', icon: 'layers' },
  { name: 'Cars & Bikes', slug: 'cars-supercars', icon: 'gauge' },
  { name: 'Cartoons', slug: 'cartoon', icon: 'sparkles' },
  { name: 'Music & Artists', slug: 'music', icon: 'music' },
  { name: 'Space & Cosmic', slug: 'space-cosmic', icon: 'orbit' },
  { name: 'Dark Mode & Mystery', slug: 'dark-mode', icon: 'eye' },
  { name: 'Fantasy & Mythical', slug: 'fantasy', icon: 'wand' },
  { name: 'City & Architecture', slug: 'city', icon: 'building' },
  { name: 'Animals & Wildlife', slug: 'animals', icon: 'paw' },
  { name: 'Sports & Racing', slug: 'sports', icon: 'trophy' },
  { name: 'Celebrities', slug: 'celebrities', icon: 'star' },
  { name: 'Comics & Superheroes', slug: 'superheroes', icon: 'zap' },
  { name: 'Holidays & Festivals', slug: 'holidays', icon: 'sparkles' },
  { name: 'Food & Culinary', slug: 'food', icon: 'sparkles' },
];

export const RESOLUTIONS = [
  { name: 'Desktop 4K UHD', width: 3840, height: 2160, aspect: '16:9', popular: true },
  { name: 'Ultrawide 2K', width: 3440, height: 1440, aspect: '21:9', popular: false },
  { name: 'Desktop 2K QHD', width: 2560, height: 1440, aspect: '16:9', popular: false },
  { name: 'Desktop 1080p FHD', width: 1920, height: 1080, aspect: '16:9', popular: false },
  { name: 'Mobile (iPhone/Android)', width: 1080, height: 2400, aspect: '9:20', popular: true },
  { name: 'Tablet (iPad Pro)', width: 2048, height: 2732, aspect: '3:4', popular: false },
];

export interface ScreenTypeHub {
  slug: string;
  key: string;
  name: string;
  headline: string;
  title: string;
  description: string;
  icon: string;
  badge: string;
  targetRes: string;
  aspectRatio: string;
  count?: number;
}

export const SCREEN_TYPES: ScreenTypeHub[] = [
  {
    slug: 'phone-wallpapers',
    key: 'phone-iphone',
    name: 'Phone & iPhone Wallpapers',
    headline: 'High-Res 4K Vertical Wallpapers for iPhone 16 Pro, Samsung Galaxy & Android',
    title: '4K Phone & Mobile Wallpapers (iPhone & Android AMOLED)',
    description: 'Explore ultra-HD 4K phone wallpapers custom formatted for iPhone 16 Pro, Samsung Galaxy, and all modern mobile displays with vibrant clarity.',
    icon: 'smartphone',
    badge: 'Mobile 9:19.5',
    targetRes: '1080 × 2400',
    aspectRatio: '9:19.5'
  },
  {
    slug: 'desktop-wallpapers',
    key: 'desktop-4k',
    name: 'Desktop & PC 4K Wallpapers',
    headline: 'Crisp 3840×2160 UHD Backgrounds for Windows 11, macOS Sequoia & 4K Monitors',
    title: '4K Desktop & PC Wallpapers (3840×2160 Ultra HD)',
    description: 'Download razor-sharp 4K UHD desktop wallpapers for Windows 11, Mac Studio, and 4K gaming monitors. Crafted for true high-DPI clarity.',
    icon: 'monitor',
    badge: 'Desktop 16:9',
    targetRes: '3840 × 2160',
    aspectRatio: '16:9'
  },
  {
    slug: 'dual-screen-wallpapers',
    key: 'dual-monitor',
    name: 'Dual Monitor & Multi-Display',
    headline: 'Superwide Panoramic 3840×1080 & 7680×2160 Wallpapers for Dual-Screen Setups',
    title: 'Best 4K Dual Monitor Wallpapers for Windows 11 / Mac',
    description: 'Curated panoramic dual-monitor wallpapers engineered to span seamlessly across two displays with zero bezel alignment distortion.',
    icon: 'screens',
    badge: 'Dual 32:9',
    targetRes: '7680 × 2160',
    aspectRatio: '32:9'
  },
  {
    slug: 'amoled-black',
    key: 'amoled-black',
    name: 'AMOLED Pure Black (OLED)',
    headline: 'True #000000 Pitch Black Wallpapers with Vibrant HDR Neon Highlights for OLED Displays',
    title: 'AMOLED Pure Black Wallpapers (True #000000 4K UHD)',
    description: 'Save battery and maximize infinite contrast with pure black #000000 AMOLED wallpapers with stunning luminous HDR accents.',
    icon: 'moon',
    badge: 'True OLED #000000',
    targetRes: '3840 × 2160',
    aspectRatio: 'Universal'
  },
  {
    slug: 'ultrawide-wallpapers',
    key: 'ultrawide',
    name: 'Ultrawide 21:9 & 32:9',
    headline: 'Cinematic 3440×1440 & 5120×1440 Curved Monitor Wallpapers for Gaming & Productivity',
    title: 'Ultrawide 21:9 & 32:9 4K Wallpapers for Curved Monitors',
    description: 'Breathtaking cinematic ultrawide backgrounds designed specifically for 3440×1440 and 5120×1440 curved gaming and workstation monitors.',
    icon: 'maximize',
    badge: 'Ultrawide 21:9',
    targetRes: '3440 × 1440',
    aspectRatio: '21:9'
  }
];

// 100% Authentic 4K Wallpapers Catalog (Zero mockups, zero dummy cards)
export const FEATURED_MASTER_MOCKUP: Wallpaper[] = [];

export const wallpapers: Wallpaper[] = (catalogData as Wallpaper[]).filter(
  w => w.sourceCdn && w.sourceCdn.startsWith('http') && !w.sourceCdn.includes('mockup')
);

const CATEGORY_SYNONYMS: Record<string, string[]> = {
  '4k-ultra-hd': ['4k', 'uhd', 'ultra', 'desktop', 'wallpaper', '3840'],
  'hd-wallpapers': ['hd', 'high-definition', '1080p', 'fhd', '4k', 'wallpaper', 'background'],
  'movies': ['movie', 'movies', 'cinema', 'hollywood', 'marvel', 'batman', 'spider-man', 'interstellar', 'film', 'actor', 'actress'],
  'tv-shows': ['tv', 'show', 'series', 'netflix', 'hbo', 'stranger-things', 'breaking-bad', 'game-of-thrones', 'peaky-blinders', 'the-boys', 'vikings', 'supernatural', 'friends', 'witcher', 'wednesday', 'dorama'],
  'anime': ['anime', 'manga', 'naruto', 'ghibli', 'jujutsu-kaisen', 'demon-slayer', 'one-piece', 'dragon-ball', 'your-name', 'anime-girls', 'bleach', 'attack-on-titan', 'berserk', 'tokyo-ghoul', 'goku', 'shinobi', 'anime-gaming'],
  'gaming': ['gaming', 'game', 'games', 'gamer', 'gta', 'cyberpunk-2077', 'witcher', 'god-of-war', 'red-dead-redemption', 'elden-ring', 'minecraft', 'call-of-duty', 'assassins-creed', 'forza', 'esports', 'steam', 'playstation', 'xbox'],
  'anime-gaming': ['anime', 'gaming', 'game', 'samurai', 'naruto', 'cyber', 'manga', 'shadow'],
  'amoled-black': ['amoled', 'black', 'oled', 'dark', 'void', 'pitch', 'matte'],
  'cyberpunk-neon': ['cyberpunk', 'neon', 'synthwave', 'city', 'futuristic', 'night', 'drive'],
  'nature-scenery': ['nature', 'mountain', 'forest', 'waterfall', 'landscape', 'lake', 'alpine', 'sunset', 'calm', 'tree', 'trees', 'beach', 'ocean', 'river', 'flowers', 'autumn', 'winter', 'rain', 'glacier'],
  'minimalist-abstract': ['minimalist', 'minimal', 'abstract', 'geometry', 'waveform', 'fluid', '3d', 'render', 'shapes'],
  'cars-supercars': ['car', 'cars', 'supercar', 'porsche', 'lamborghini', 'ferrari', 'speed', 'jdm', 'drive', 'beast', 'bike', 'bikes', 'motorcycle', 'superbike', 'ducati', 'kawasaki', 'yamaha', 'harley-davidson', 'ktm', 'triumph', 'bmw-m1000rr', 'ninja', 'hayabusa'],
  'cartoon': ['cartoon', 'cartoons', 'animation', 'disney', 'pixar', 'spongebob', 'rick-and-morty', 'simpsons', 'shrek', 'minions', 'spider-verse', 'animated', 'anime'],
  'cartoons': ['cartoon', 'cartoons', 'animation', 'disney', 'pixar', 'spongebob', 'rick-and-morty', 'simpsons', 'shrek', 'minions', 'spider-verse', 'animated', 'anime'],
  'music': ['music', 'musician', 'singer', 'band', 'rock', 'guitar', 'kpop', 'metal', 'hip-hop', 'concert', 'rap', 'album', 'blackpink', 'bts', 'linkin-park', 'beatles', 'queen', 'metallica', 'nirvana', 'hard-rock'],
  'space-cosmic': ['space', 'cosmic', 'galaxy', 'nebula', 'planet', 'planets', 'astronaut', 'astronauts', 'orbit', 'universe', 'celestial', 'earth', 'moon', 'black-hole', 'black-holes', 'nasa', 'spacex', 'hubble', 'james-webb', 'mars', 'saturn', 'jupiter', 'aurora', 'milky-way', 'iss'],
  'dark-mode': ['dark', 'amoled', 'shadow', 'night', 'black', 'mystery', 'void'],
  'fantasy': ['fantasy', 'mythical', 'dragon', 'magic', 'celestial', 'castle'],
  'city': ['city', 'architecture', 'skyline', 'tokyo', 'urban', 'street', 'building'],
  'animals': ['animal', 'animals', 'wildlife', 'wolf', 'wolves', 'lion', 'lions', 'tiger', 'tigers', 'predator', 'cat', 'cats', 'dog', 'dogs', 'beast', 'eagle', 'horse', 'horses', 'dolphin', 'shark', 'bear', 'leopard', 'panther', 'pet', 'pets'],
  'animals-wildlife': ['animal', 'animals', 'wildlife', 'wolf', 'wolves', 'lion', 'lions', 'tiger', 'tigers', 'predator', 'cat', 'cats', 'dog', 'dogs', 'beast', 'eagle', 'horse', 'horses', 'dolphin', 'shark', 'bear', 'leopard', 'panther', 'pet', 'pets'],
  'sports': ['sport', 'sports', 'football', 'soccer', 'messi', 'ronaldo', 'nba', 'cricket', 'f1', 'formula-1', 'nike', 'adidas', 'fitness', 'gym', 'boxing', 'racing', 'tennis', 'lewis-hamilton', 'real-madrid', 'barcelona', 'chelsea', 'liverpool', 'manchester-united', 'basketball', 'motogp'],
  'celebrities': ['celebrity', 'celebrities', 'actor', 'actress', 'model', 'hollywood', 'megan-fox', 'scarlett-johansson', 'kylie-jenner', 'dua-lipa', 'billie-eilish', 'angelina-jolie', 'zendaya', 'keanu-reeves', 'dicaprio', 'elon-musk', 'mrbeast', 'taylor-swift', 'kardashian', 'monica-bellucci', 'brad-pitt'],
  'celebrities-music': ['celebrity', 'celebrities', 'actor', 'actress', 'model', 'hollywood', 'megan-fox', 'scarlett-johansson', 'kylie-jenner', 'dua-lipa', 'billie-eilish', 'angelina-jolie', 'zendaya', 'keanu-reeves', 'dicaprio', 'elon-musk', 'mrbeast', 'taylor-swift', 'kardashian', 'monica-bellucci', 'brad-pitt'],
  'superheroes': ['comic', 'comics', 'superhero', 'superheroes', 'marvel', 'dc', 'batman', 'deadpool', 'mcu', 'harley-quinn', 'hulk', 'daredevil', 'superman', 'wonder-woman', 'avengers', 'gwen-stacy', 'loki'],
  'comics': ['comic', 'comics', 'superhero', 'superheroes', 'marvel', 'dc', 'batman', 'deadpool', 'mcu', 'harley-quinn', 'hulk', 'daredevil', 'superman', 'wonder-woman', 'avengers', 'gwen-stacy', 'loki'],
  'holidays': ['holiday', 'holidays', 'festival', 'christmas', 'halloween', 'new-year', 'valentine', 'thanksgiving', 'easter', 'santa', 'fireworks', 'lights', 'celebration', 'party', 'winter', 'snow'],
  'food': ['food', 'culinary', 'coffee', 'fruit', 'fruits', 'pizza', 'burger', 'dessert', 'ice-cream', 'chocolate', 'cake', 'sushi', 'pasta', 'tea', 'sweets', 'drink', 'beverage', 'delicious'],
};

// Internal helper to compute category wallpapers
function computeCategoryWallpapers(slug: string): Wallpaper[] {
  if (!slug || slug === 'all') return wallpapers;
  const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const synonyms = CATEGORY_SYNONYMS[cleanSlug] || [cleanSlug.replace(/-/g, ' '), cleanSlug];
  
  return wallpapers.filter((wp) => {
    const cat = (wp.category || '').toLowerCase();
    const title = (wp.title || '').toLowerCase();
    const tags = (wp.tags || []).map(t => t.toLowerCase());
    
    // Strict category boundaries: Do NOT leak Anime into Gaming, Cars, or Nature
    if (cleanSlug === 'gaming' && cat.includes('anime') && !cat.includes('gaming')) {
      return false;
    }
    if (cleanSlug === 'anime' && (cat.includes('cars') || cat.includes('nature'))) {
      return false;
    }
    
    // Direct category match
    if (cat.includes(cleanSlug) || cleanSlug.includes(cat)) return true;
    
    // Synonym check with exact token matching (prevents 'game' from matching 'gilgamesh')
    return synonyms.some(syn => {
      if (cat.includes(syn)) return true;
      if (title.split(/[-_\\s]+/).includes(syn)) return true;
      return tags.some(t => t === syn || t.split(/[-_\\s]+/).includes(syn));
    });
  });
}

// 0ms O(1) In-Memory Lookup Indices
let tagIndexMap: Map<string, Wallpaper[]> | null = null;
let categoryIndexMap: Map<string, Wallpaper[]> | null = null;
let screenIndexMap: Map<string, Wallpaper[]> | null = null;
let cachedAllTags: TagHubItem[] | null = null;

function initIndices(): void {
  if (tagIndexMap && categoryIndexMap && screenIndexMap) return;
  tagIndexMap = new Map<string, Wallpaper[]>();
  categoryIndexMap = new Map<string, Wallpaper[]>();
  screenIndexMap = new Map<string, Wallpaper[]>();

  for (let i = 0; i < wallpapers.length; i++) {
    const wp = wallpapers[i];

    // Index by tag
    const tags = wp.tags || [];
    const seen = new Set<string>();
    for (let j = 0; j < tags.length; j++) {
      const s = slugifyTag(tags[j]);
      if (s && !seen.has(s)) {
        seen.add(s);
        let list = tagIndexMap.get(s);
        if (!list) {
          list = [];
          tagIndexMap.set(s, list);
        }
        list.push(wp);
      }
    }

    // Index by screen type
    const screens = wp.screenTypes || [];
    for (let j = 0; j < screens.length; j++) {
      const sc = screens[j];
      let sList = screenIndexMap.get(sc);
      if (!sList) {
        sList = [];
        screenIndexMap.set(sc, sList);
      }
      sList.push(wp);
    }
  }


}

export function getWallpapersByCategory(slug: string): Wallpaper[] {
  if (!slug || slug === 'all') return wallpapers;
  initIndices();
  const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  if (categoryIndexMap!.has(cleanSlug)) {
    return categoryIndexMap!.get(cleanSlug)!;
  }
  const result = computeCategoryWallpapers(cleanSlug);
  categoryIndexMap!.set(cleanSlug, result);
  return result;
}

export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export interface TagHubItem {
  name: string;
  slug: string;
  count: number;
}

export function getAllTags(): TagHubItem[] {
  if (cachedAllTags) return cachedAllTags;
  initIndices();

  const tagCountMap = new Map<string, { name: string; slug: string; count: number }>();
  const taxonomyMap = new Map<string, string>();
  getTaxonomyTags().forEach((t) => {
    taxonomyMap.set(t.slug, t.name);
  });

  // Calculate authentic live counts from catalog wallpapers
  wallpapers.forEach((wp) => {
    const seenInWp = new Set<string>();
    (wp.tags || []).forEach((rawTag) => {
      const trimmed = rawTag.trim();
      if (!trimmed) return;
      const slug = slugifyTag(trimmed);
      if (!slug || seenInWp.has(slug)) return;
      seenInWp.add(slug);

      const existing = tagCountMap.get(slug);
      if (existing) {
        existing.count += 1;
      } else {
        const formattedName = taxonomyMap.get(slug) || trimmed
          .split(/[-_\\s]+/)
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');
        tagCountMap.set(slug, { name: formattedName, slug, count: 1 });
      }
    });
  });

  cachedAllTags = Array.from(tagCountMap.values()).sort((a, b) => b.count - a.count);
  return cachedAllTags;
}

export function getLiveSubTopicCount(slug: string): number {
  if (!slug) return 0;
  initIndices();
  const norm = slugifyTag(slug);
  return tagIndexMap!.get(norm)?.length || 0;
}

export function getAllScreenTypes(): ScreenTypeHub[] {
  initIndices();
  return SCREEN_TYPES.map((hub) => ({
    ...hub,
    count: screenIndexMap?.get(hub.key)?.length || getWallpapersByScreen(hub.slug).length,
  }));
}

export function getWallpapersByTag(tagSlug: string): Wallpaper[] {
  initIndices();
  const normalized = slugifyTag(tagSlug);
  const direct = tagIndexMap!.get(normalized);
  if (direct && direct.length > 0) return direct;

  // Multi-token fallback (e.g. 'nissan-gtr' matches wallpapers having 'nissan' and 'gtr' or related tokens)
  const parts = normalized.split('-').filter(p => p.length > 1);
  if (parts.length > 1) {
    const candidateArrays = parts.map(p => tagIndexMap!.get(p) || []).filter(a => a.length > 0);
    if (candidateArrays.length > 0) {
      const smallest = candidateArrays.reduce((min, a) => a.length < min.length ? a : min);
      const matched = smallest.filter(wp => {
        const tSet = new Set((wp.tags || []).map(slugifyTag));
        return parts.some(p => tSet.has(p));
      });
      if (matched.length > 0) return matched;
    }
  }

  // Partial match fallback for hyphenated keywords
  for (const [key, list] of tagIndexMap!.entries()) {
    if (key.includes(normalized) || normalized.includes(key)) {
      if (list.length > 0) return list;
    }
  }

  return [];
}

export function getWallpapersByScreen(screenSlugOrKey: string): Wallpaper[] {
  const hub = SCREEN_TYPES.find(
    (h) => h.slug === screenSlugOrKey || h.key === screenSlugOrKey
  );
  if (!hub) return [];
  return wallpapers.filter((wp) => (wp.screenTypes || []).includes(hub.key));
}

interface ColorPaletteRule {
  cat?: string;
  tags: string[];
  hexes: string[];
}

const COLOR_PALETTE_RULES: Record<string, ColorPaletteRule> = {
  // 1. Nature & Earth
  'forest-sage': {
    cat: 'nature',
    tags: ['forest', 'sage', 'green', 'tree', 'trees', 'nature', 'landscape', 'mountain', 'lake', 'wood', 'valley', 'jungle', 'leaf'],
    hexes: ['#1b4332', '#00ff88', '#a7c957', '#c2ff06'],
  },
  'sunset-gold': {
    cat: 'nature',
    tags: ['sunset', 'gold', 'golden', 'dusk', 'sunrise', 'sun', 'autumn', 'orange', 'warm', 'alpine', 'peak'],
    hexes: ['#ffb800', '#f59e0b', '#d97706'],
  },
  'emerald-canyon': {
    cat: 'nature',
    tags: ['emerald', 'canyon', 'river', 'water', 'stream', 'valley', 'nature', 'waterfall', 'green', 'moss'],
    hexes: ['#1b4332', '#00ff88', '#10b981', '#064e3b'],
  },
  'autumn-amber': {
    cat: 'nature',
    tags: ['autumn', 'amber', 'fall', 'leaves', 'fog', 'orange', 'brown', 'warm', 'forest', 'pine'],
    hexes: ['#ffb800', '#663300', '#d97706', '#451a03'],
  },
  'nordic-fjord': {
    cat: 'nature',
    tags: ['nordic', 'fjord', 'glacial', 'snow', 'ice', 'winter', 'lake', 'cold', 'blue', 'mountain', 'arctic'],
    hexes: ['#38bdf8', '#00e5ff', '#0c2340'],
  },

  // 2. Cyberpunk & Neon
  'charcoal-teal': {
    cat: 'cyberpunk',
    tags: ['cyberpunk', 'teal', 'neon', 'dark', 'matrix', 'synthwave', 'night-city', 'shinjuku', 'cyan'],
    hexes: ['#00e5ff', '#0a1118', '#1c1c1c', '#00c2cb'],
  },
  'synthwave-pink': {
    cat: 'cyberpunk',
    tags: ['synthwave', 'pink', 'magenta', 'retro', '80s', 'neon', 'grid', 'vaporwave', 'horizon'],
    hexes: ['#f91acf', '#ff2e54', '#ff007f'],
  },
  'tokyo-violet': {
    cat: 'cyberpunk',
    tags: ['tokyo', 'violet', 'purple', 'neon', 'rain', 'alley', 'city', 'night', 'cyber', 'shinjuku'],
    hexes: ['#a855f7', '#1e1035'],
  },
  'electric-lime': {
    cat: 'cyberpunk',
    tags: ['lime', 'matrix', 'electric', 'cyber', 'neon', 'glow', 'green', 'walpix'],
    hexes: ['#c2ff06', '#00ff88'],
  },
  'cyber-amber': {
    cat: 'cyberpunk',
    tags: ['amber', 'cyberpunk', 'neon', 'yellow', 'gold', 'city', 'urban', 'skyline', 'traffic', 'streetlight'],
    hexes: ['#ffb800', '#fbbf24'],
  },

  // 3. AMOLED & Pure Dark
  'obsidian-void': {
    cat: 'amoled',
    tags: ['amoled', 'pure black', 'black', 'void', 'dark', 'shadow', 'oled', 'dark-mode'],
    hexes: ['#000000', '#0a1118', '#1c1c1c'],
  },
  'golden-particle': {
    cat: 'amoled',
    tags: ['gold', 'particle', 'amoled', 'wave', 'dust', 'sparkle', 'black', 'oled'],
    hexes: ['#ffb800', '#f5d061', '#000000'],
  },
  'minimal-monolith': {
    cat: 'amoled',
    tags: ['minimalist', 'minimal', 'monolith', 'clean', 'matte', 'dark', 'geometry', 'black', 'onyx'],
    hexes: ['#000000', '#1c1c1c', '#424153', '#0a0a0a'],
  },
  'luminous-ring': {
    cat: 'amoled',
    tags: ['ring', 'geometry', 'neon', 'amoled', 'glow', 'void', 'minimal', 'black', 'luminous'],
    hexes: ['#000000', '#00ff88', '#00e5ff', '#34d399'],
  },

  // 4. Space & Cosmic
  'royal-purple': {
    cat: 'space',
    tags: ['space', 'cosmic', 'violet', 'purple', 'saturn', 'horizon', 'galaxy', 'planetary', 'lilac'],
    hexes: ['#a855f7', '#4b0082', '#e6d6ff'],
  },
  'orion-nebula': {
    cat: 'space',
    tags: ['space', 'nebula', 'orion', 'star', 'cluster', 'pink', 'magenta', 'james-webb', 'starlight'],
    hexes: ['#f91acf', '#ff2e54', '#ec4899'],
  },
  'deep-space': {
    cat: 'space',
    tags: ['space', 'cosmos', 'universe', 'stars', 'earth', 'astronomy', 'blue', 'deep space', 'satellite'],
    hexes: ['#38bdf8', '#00e5ff', '#0a1118', '#60a5fa'],
  },
  'aurora-emerald': {
    cat: 'space',
    tags: ['space', 'aurora', 'borealis', 'green', 'northern-lights', 'fjord', 'night-sky'],
    hexes: ['#00ff88', '#1b4332', '#4ade80'],
  },

  // 5. Anime & Aesthetics
  'midnight-pink': {
    cat: 'anime',
    tags: ['anime', 'pink', 'magenta', 'night', 'girl', 'neon', 'sakura', 'midnight'],
    hexes: ['#f91acf', '#ff2e54', '#ff2e88'],
  },
  'samurai-crimson': {
    cat: 'anime',
    tags: ['anime', 'samurai', 'crimson', 'red', 'blade', 'sakura', 'cherry blossom', 'blood', 'duel'],
    hexes: ['#e63946', '#ff2e54', '#ef4444'],
  },
  'ghibli-meadow': {
    cat: 'anime',
    tags: ['anime', 'ghibli', 'meadow', 'green', 'sky', 'grass', 'nature', 'countryside', 'dream', 'lush'],
    hexes: ['#00ff88', '#1b4332', '#86efac'],
  },
  'shinobi-gold': {
    cat: 'anime',
    tags: ['anime', 'naruto', 'ninja', 'gold', 'yellow', 'sage', 'moon', 'shinobi', 'ronin'],
    hexes: ['#ffb800', '#eab308'],
  },

  // 6. Luxury & Supercars
  'navy-gold': {
    cat: 'cars',
    tags: ['car', 'cars', 'supercar', 'luxury', 'gold', 'royal', 'palace', 'navy'],
    hexes: ['#ffb800', '#0a1118', '#f4b400'],
  },
  'rosso-corsa': {
    cat: 'cars',
    tags: ['car', 'cars', 'ferrari', 'supercar', 'red', 'speed', 'racing', 'gt3', 'rosso'],
    hexes: ['#e63946', '#ff2e54', '#dc2626'],
  },
  'stealth-matte': {
    cat: 'cars',
    tags: ['car', 'cars', 'matte', 'black', 'porsche', 'lamborghini', 'gt3', 'stealth'],
    hexes: ['#000000', '#1c1c1c', '#121212'],
  },
  'liquid-chrome': {
    cat: 'cars',
    tags: ['car', 'cars', 'silver', 'chrome', 'liquid', 'mercury', 'metallic', 'gray', 'abstract'],
    hexes: ['#999999', '#424153', '#cbd5e1'],
  },
};

export function getWallpapersByColor(colorSlug: string): Wallpaper[] {
  const colorInfo = LUXURY_COLORS.find((c) => c.slug === colorSlug);
  if (!colorInfo) return wallpapers.slice(0, 24);

  const rule = COLOR_PALETTE_RULES[colorSlug] || {
    cat: colorInfo.category,
    tags: [colorSlug.replace(/-/g, ' ')],
    hexes: [colorInfo.hexAccent.toLowerCase(), colorInfo.hexPrimary.toLowerCase()],
  };

  const matches = wallpapers.filter((wp) => {
    const wpHex = (wp.colorHex || '').toLowerCase();
    const wpTags = (wp.tags || []).map((t) => t.toLowerCase());
    const wpTitle = (wp.title || '').toLowerCase();
    const wpCat = (wp.category || '').toLowerCase();

    // 1. Match compatible hexes
    if (wpHex && rule.hexes.some((h) => h.toLowerCase() === wpHex)) {
      if (wpHex === '#000000') {
        // If pure black, ensure it matches dark/amoled theme or tags
        if (rule.cat === 'amoled' || wpCat.includes('amoled') || wpCat.includes('dark') || rule.tags.some((t) => wpTags.includes(t) || wpTitle.includes(t))) {
          return true;
        }
      } else {
        return true;
      }
    }

    // 2. Direct color name match
    if (wp.colorName && (
      wp.colorName.toLowerCase().includes(colorInfo.name.toLowerCase()) ||
      rule.tags.some((t) => wp.colorName?.toLowerCase().includes(t))
    )) {
      return true;
    }

    // 3. Relevant tags & title keywords
    return rule.tags.some((t) => wpTags.includes(t) || wpTitle.includes(t));
  });

  if (matches.length >= 8) {
    return matches;
  }

  // If few matches, backfill strictly with wallpapers matching the palette's parent category
  const categoryWallpapers = rule.cat ? getWallpapersByCategory(rule.cat) : wallpapers;
  const combined = Array.from(new Set([...matches, ...categoryWallpapers]));
  return combined.slice(0, 24);
}

