import catalogData from '../../public/data/catalog.json';

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
  { name: 'Anime & Gaming', slug: 'anime-gaming', icon: 'gamepad' },
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

// Exact 6 Featured Cards from the Master Mockup (Ultra-light WebP)
const FEATURED_MASTER_MOCKUP: Wallpaper[] = [
  {
    id: 'walpix-featured-1',
    title: 'Mountain Serenity',
    slug: 'mountain-serenity-4k',
    category: 'Nature',
    sourceCdn: '/images/mockup_cards/card-1-mountain.webp',
    isHotlink: false,
    views: 124000,
    downloads: 6888,
    aspectRatio: '16:9',
    resolution: '3840×2160',
    colorName: 'Sunset Gold & Slate',
    colorHex: '#4A6B82',
    tags: ['mountain', 'nature', 'sunset', '4k', 'serenity', 'alpine', 'landscape'],
    screenTypes: ['desktop-4k', 'phone-iphone', 'dual-monitor', 'ultrawide']
  },
  {
    id: 'walpix-featured-2',
    title: 'Neon Drive',
    slug: 'neon-drive-cyberpunk-4k',
    category: 'Cyberpunk',
    sourceCdn: '/images/mockup_cards/card-2-neondrive.webp',
    isHotlink: false,
    views: 281000,
    downloads: 15611,
    aspectRatio: '16:9',
    resolution: '3840×2160',
    colorName: 'Cyan & Magenta Neon',
    colorHex: '#00F0FF',
    tags: ['cyberpunk', 'car', 'neon', 'city', 'night', '4k', 'cyberpunk-city', 'synthwave'],
    screenTypes: ['desktop-4k', 'phone-iphone', 'dual-monitor', 'ultrawide']
  },
  {
    id: 'walpix-featured-3',
    title: 'Shadow Realm',
    slug: 'shadow-realm-anime-4k',
    category: 'Anime',
    sourceCdn: '/images/mockup_cards/card-3-shadowrealm.webp',
    isHotlink: false,
    views: 317000,
    downloads: 17611,
    aspectRatio: '16:9',
    resolution: '3840×2160',
    colorName: 'Crimson & Obsidian',
    colorHex: '#E63946',
    tags: ['anime', 'character', 'dark', 'shadow', 'fantasy', '4k', 'dark-aesthetic'],
    screenTypes: ['desktop-4k', 'phone-iphone', 'amoled-black']
  },
  {
    id: 'walpix-featured-4',
    title: 'Cosmic Horizon',
    slug: 'cosmic-horizon-space-4k',
    category: 'Space',
    sourceCdn: '/images/mockup_cards/card-4-cosmichorizon.webp',
    isHotlink: false,
    views: 193000,
    downloads: 10722,
    aspectRatio: '16:9',
    resolution: '3840×2160',
    colorName: 'Deep Purple & Nebula Pink',
    colorHex: '#9D4EDD',
    tags: ['space', 'cosmic', 'planet', 'nebula', 'galaxy', '4k', 'interstellar'],
    screenTypes: ['desktop-4k', 'phone-iphone', 'dual-monitor', 'amoled-black', 'ultrawide']
  },
  {
    id: 'walpix-featured-5',
    title: 'Forest Calm',
    slug: 'forest-calm-waterfall-4k',
    category: 'Nature',
    sourceCdn: '/images/mockup_cards/card-5-forestcalm.webp',
    isHotlink: false,
    views: 149000,
    downloads: 8277,
    aspectRatio: '16:9',
    resolution: '3840×2160',
    colorName: 'Emerald Forest Green',
    colorHex: '#2A9D8F',
    tags: ['forest', 'waterfall', 'nature', 'green', 'calm', '4k', 'landscape'],
    screenTypes: ['desktop-4k', 'phone-iphone', 'dual-monitor', 'ultrawide']
  },
  {
    id: 'walpix-featured-6',
    title: 'Night Beast',
    slug: 'night-beast-supercar-4k',
    category: 'Cars',
    sourceCdn: '/images/mockup_cards/card-6-nightbeast.webp',
    isHotlink: false,
    views: 226000,
    downloads: 12555,
    aspectRatio: '16:9',
    resolution: '3840×2160',
    colorName: 'Matte Obsidian & Red LED',
    colorHex: '#E71D36',
    tags: ['car', 'supercar', 'matte black', 'night', 'beast', '4k', 'porsche-911', 'dark-aesthetic'],
    screenTypes: ['desktop-4k', 'phone-iphone', 'amoled-black']
  }
];

export const wallpapers: Wallpaper[] = [
  ...FEATURED_MASTER_MOCKUP,
  ...(catalogData as Wallpaper[]).filter(w => !FEATURED_MASTER_MOCKUP.some(f => f.slug === w.slug))
];

const CATEGORY_SYNONYMS: Record<string, string[]> = {
  '4k-ultra-hd': ['4k', 'uhd', 'ultra', 'desktop', 'wallpaper', '3840'],
  'hd-wallpapers': ['hd', 'high-definition', '1080p', 'fhd', '4k', 'wallpaper', 'background'],
  'movies': ['movie', 'movies', 'cinema', 'hollywood', 'marvel', 'batman', 'spider-man', 'interstellar', 'film', 'actor', 'actress'],
  'tv-shows': ['tv', 'show', 'series', 'netflix', 'hbo', 'stranger-things', 'breaking-bad', 'game-of-thrones', 'peaky-blinders', 'the-boys', 'vikings', 'supernatural', 'friends', 'witcher', 'wednesday', 'dorama'],
  'anime-gaming': ['anime', 'gaming', 'game', 'samurai', 'naruto', 'cyber', 'manga', 'shadow'],
  'amoled-black': ['amoled', 'black', 'oled', 'dark', 'void', 'pitch', 'matte'],
  'cyberpunk-neon': ['cyberpunk', 'neon', 'synthwave', 'city', 'futuristic', 'night', 'drive'],
  'nature-scenery': ['nature', 'mountain', 'forest', 'waterfall', 'landscape', 'lake', 'alpine', 'sunset', 'calm', 'tree', 'trees', 'beach', 'ocean', 'river', 'flowers', 'autumn', 'winter', 'rain', 'glacier'],
  'minimalist-abstract': ['minimalist', 'minimal', 'abstract', 'geometry', 'waveform', 'fluid', '3d', 'render', 'shapes'],
  'cars-supercars': ['car', 'cars', 'supercar', 'porsche', 'lamborghini', 'ferrari', 'speed', 'jdm', 'drive', 'beast', 'bike', 'bikes', 'motorcycle', 'superbike', 'ducati', 'kawasaki', 'yamaha', 'harley-davidson', 'ktm', 'triumph', 'bmw-m1000rr', 'ninja', 'hayabusa'],
  'cartoon': ['cartoon', 'cartoons', 'animation', 'disney', 'pixar', 'spongebob', 'rick-and-morty', 'simpsons', 'shrek', 'minions', 'spider-verse', 'animated', 'anime'],
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

export function getWallpapersByCategory(slug: string): Wallpaper[] {
  if (!slug || slug === 'all') return wallpapers;
  const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const synonyms = CATEGORY_SYNONYMS[cleanSlug] || [cleanSlug.replace(/-/g, ' '), cleanSlug];
  
  return wallpapers.filter((wp) => {
    const cat = (wp.category || '').toLowerCase();
    const title = (wp.title || '').toLowerCase();
    const tags = (wp.tags || []).map(t => t.toLowerCase());
    
    // Direct category match
    if (cat.includes(cleanSlug) || cleanSlug.includes(cat)) return true;
    
    // Synonym check against tags, title, category
    return synonyms.some(syn => 
      cat.includes(syn) || 
      title.includes(syn) || 
      tags.some(t => t.includes(syn) || syn.includes(t))
    );
  });
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

import { getAllTags as getTaxonomyTags } from './taxonomy';

export function getAllTags(): TagHubItem[] {
  const tagCountMap = new Map<string, { name: string; slug: string; count: number }>();
  
  // 1. Seed from verified taxonomy database (275+ top searched entities)
  getTaxonomyTags().forEach((t) => {
    const rawCount = parseInt(t.count.replace(/[^0-9]/g, '')) || 45;
    tagCountMap.set(t.slug, {
      name: t.name,
      slug: t.slug,
      count: rawCount,
    });
  });

  // 2. Aggregate from live wallpapers in catalog
  wallpapers.forEach((wp) => {
    (wp.tags || []).forEach((rawTag) => {
      const trimmed = rawTag.trim();
      if (!trimmed) return;
      const slug = slugifyTag(trimmed);
      if (!slug) return;
      const existing = tagCountMap.get(slug);
      if (existing) {
        existing.count += 5;
      } else {
        const formattedName = trimmed
          .split(/[-_\s]+/)
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');
        tagCountMap.set(slug, { name: formattedName, slug, count: 12 });
      }
    });
  });

  return Array.from(tagCountMap.values()).sort((a, b) => b.count - a.count);
}

export function getAllScreenTypes(): ScreenTypeHub[] {
  return SCREEN_TYPES.map((hub) => ({
    ...hub,
    count: getWallpapersByScreen(hub.slug).length,
  }));
}

export function getWallpapersByTag(tagSlug: string): Wallpaper[] {
  const normalized = slugifyTag(tagSlug);
  return wallpapers.filter((wp) =>
    (wp.tags || []).some((t) => slugifyTag(t) === normalized)
  );
}

export function getWallpapersByScreen(screenSlugOrKey: string): Wallpaper[] {
  const hub = SCREEN_TYPES.find(
    (h) => h.slug === screenSlugOrKey || h.key === screenSlugOrKey
  );
  if (!hub) return [];
  return wallpapers.filter((wp) => (wp.screenTypes || []).includes(hub.key));
}

const COLOR_PALETTE_KEYWORDS: Record<string, string[]> = {
  // Nature & Earth
  'forest-sage': ['forest', 'sage', 'green', 'nature', 'landscape', 'mountain', 'trees', 'jungle', 'waterfall'],
  'sunset-gold': ['sunset', 'gold', 'golden', 'mountain', 'alpine', 'peak', 'warm', 'dusk', 'sunlight'],
  'emerald-canyon': ['emerald', 'canyon', 'river', 'water', 'mist', 'stream', 'valley', 'forest', 'nature'],
  'autumn-amber': ['autumn', 'amber', 'pine', 'leaves', 'morning', 'fog', 'trees', 'bavarian', 'fall'],
  'nordic-fjord': ['nordic', 'fjord', 'glacial', 'lake', 'crystal', 'snow', 'frozen', 'arctic', 'ice'],

  // Cyberpunk & Neon
  'charcoal-teal': ['charcoal', 'black', 'amoled', 'dark', 'neon teal', 'cyberpunk', 'synthwave', 'shinjuku'],
  'synthwave-pink': ['synthwave', 'pink', 'magenta', '80s', 'retro', 'grid', 'highway', 'sun', 'horizon'],
  'tokyo-violet': ['tokyo', 'violet', 'purple', 'neon', 'alley', 'rain', 'umbrella', 'city', 'night'],
  'electric-lime': ['lime', 'matrix', 'electric', 'cyber', 'neon', 'jaguar', 'predator', 'glow', 'walpix'],
  'cyber-amber': ['amber', 'streetlight', 'cyberpunk', 'neon', 'city', 'urban', 'skyline', 'traffic'],

  // AMOLED & Pure Dark
  'obsidian-void': ['obsidian', 'void', 'pure black', 'amoled', 'black', 'oled', 'sphere', 'dark', 'waves'],
  'golden-particle': ['golden', 'particle', 'wave', 'amoled', 'gold', 'dust', 'sparkle', 'black', 'oled'],
  'minimal-monolith': ['monolith', 'dune', 'minimal', 'minimalist', 'clean', 'matte', 'dark', 'geometry'],
  'luminous-ring': ['ring', 'geometry', 'luminous', 'amoled', 'neon ring', 'void', 'pure', 'minimal'],

  // Space & Cosmic
  'royal-purple': ['purple', 'lilac', 'violet', 'cosmic', 'horizon', 'space', 'saturn', 'planetary'],
  'orion-nebula': ['orion', 'nebula', 'star', 'cluster', 'space', 'galaxy', 'james-webb', 'carina'],
  'deep-space': ['deep space', 'pillars', 'creation', 'earth', 'astronomy', 'stars', 'cosmos', 'satellite'],
  'aurora-emerald': ['aurora', 'borealis', 'northern lights', 'arctic', 'green', 'fjord', 'night sky'],

  // Anime & Aesthetics
  'midnight-pink': ['midnight', 'pink', 'neon', 'magenta', 'anime', 'shadow realm', 'spider-man', 'verse'],
  'samurai-crimson': ['samurai', 'crimson', 'blade', 'mist', 'red', 'cherry blossom', 'sakura', 'duel'],
  'ghibli-meadow': ['ghibli', 'lush', 'countryside', 'dream', 'meadow', 'grass', 'nature', 'studio'],
  'shinobi-gold': ['naruto', 'sage', 'shinobi', 'moon', 'ninja', 'golden', 'anime', 'ronin', 'tsushima'],

  // Luxury & Supercars
  'navy-gold': ['navy', 'gold', 'royal', 'luxury', 'supercar', 'celestial', 'citadel', 'palace'],
  'rosso-corsa': ['ferrari', 'daytona', 'rosso corsa', 'speed', 'supercar', 'red', 'racing', 'gt3'],
  'stealth-matte': ['matte black', 'stealth', 'porsche', 'lamborghini', 'gt3 rs', 'revuelto', 'supercar'],
  'liquid-chrome': ['liquid', 'chrome', 'mercury', 'wave', 'silver', '3d', 'abstract', 'metallic', 'prism'],
};

export function getWallpapersByColor(colorSlug: string): Wallpaper[] {
  const colorInfo = LUXURY_COLORS.find(c => c.slug === colorSlug);
  if (!colorInfo) return wallpapers.slice(0, 16);

  const keywords = COLOR_PALETTE_KEYWORDS[colorSlug] || [colorSlug.replace(/-/g, ' ')];
  
  const directMatches = wallpapers.filter((wp) => {
    // 1. Direct hex match
    if (wp.colorHex && (
      wp.colorHex.toLowerCase() === colorInfo.hexAccent.toLowerCase() ||
      wp.colorHex.toLowerCase() === colorInfo.hexPrimary.toLowerCase()
    )) return true;

    // 2. Color name match
    if (wp.colorName && (
      wp.colorName.toLowerCase().includes(colorInfo.name.toLowerCase()) ||
      keywords.some(k => wp.colorName?.toLowerCase().includes(k))
    )) return true;

    // 3. Tags or category or title match
    const title = (wp.title || '').toLowerCase();
    const cat = (wp.category || '').toLowerCase();
    const tags = (wp.tags || []).map(t => t.toLowerCase());

    return keywords.some(k => 
      tags.some(t => t.includes(k) || k.includes(t)) ||
      title.includes(k) ||
      cat.includes(k)
    );
  });

  if (directMatches.length >= 8) {
    return directMatches;
  }

  // Fallback to fill with rich wallpapers
  const combined = Array.from(new Set([...directMatches, ...wallpapers]));
  return combined.slice(0, 16);
}

