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
}

export const LUXURY_COLORS = [
  { id: 'golden-navy', name: 'Navy & Gold', hexPrimary: '#0D1B2A', hexAccent: '#F4B400', slug: 'navy-gold' },
  { id: 'deep-teal', name: 'Deep Teal & Coral', hexPrimary: '#006D77', hexAccent: '#FF6B6B', slug: 'deep-teal' },
  { id: 'royal-purple', name: 'Royal Purple & Lilac', hexPrimary: '#4B0082', hexAccent: '#E6D6FF', slug: 'royal-purple' },
  { id: 'charcoal-teal', name: 'Charcoal & Neon Teal', hexPrimary: '#1C1C1C', hexAccent: '#00C2CB', slug: 'charcoal-teal' },
  { id: 'forest-sage', name: 'Forest & Sage Green', hexPrimary: '#1B4332', hexAccent: '#A7C957', slug: 'forest-sage' },
  { id: 'burgundy-beige', name: 'Burgundy & Warm Beige', hexPrimary: '#800020', hexAccent: '#F5E6CA', slug: 'burgundy-beige' },
  { id: 'slate-orange', name: 'Slate Blue & Orange', hexPrimary: '#1E3A8A', hexAccent: '#FF8C00', slug: 'slate-orange' },
  { id: 'chocolate-sand', name: 'Chocolate & Sand Beige', hexPrimary: '#4E342E', hexAccent: '#D7B899', slug: 'chocolate-sand' },
  { id: 'midnight-pink', name: 'Midnight Blue & Hot Pink', hexPrimary: '#0B132B', hexAccent: '#FF2E88', slug: 'midnight-pink' },
  { id: 'olive-mustard', name: 'Olive Green & Mustard', hexPrimary: '#3D4D22', hexAccent: '#E3B505', slug: 'olive-mustard' },
];

export const CATEGORIES = [
  { name: 'All Wallpapers', slug: 'all', icon: 'sparkles' },
  { name: '4K Ultra HD', slug: '4k-ultra-hd', icon: 'monitor' },
  { name: 'Anime & Gaming', slug: 'anime-gaming', icon: 'gamepad' },
  { name: 'AMOLED Black', slug: 'amoled-black', icon: 'moon' },
  { name: 'Cyberpunk & Neon', slug: 'cyberpunk-neon', icon: 'zap' },
  { name: 'Nature & Scenery', slug: 'nature-scenery', icon: 'mountain' },
  { name: 'Minimalist & Abstract', slug: 'minimalist-abstract', icon: 'layers' },
  { name: 'Cars & Supercars', slug: 'cars-supercars', icon: 'gauge' },
  { name: 'Space & Cosmic', slug: 'space-cosmic', icon: 'orbit' },
  { name: 'Dark Mode & Mystery', slug: 'dark-mode', icon: 'eye' },
];

export const RESOLUTIONS = [
  { name: 'Desktop 4K UHD', width: 3840, height: 2160, aspect: '16:9', popular: true },
  { name: 'Ultrawide 2K', width: 3440, height: 1440, aspect: '21:9', popular: false },
  { name: 'Desktop 2K QHD', width: 2560, height: 1440, aspect: '16:9', popular: false },
  { name: 'Desktop 1080p FHD', width: 1920, height: 1080, aspect: '16:9', popular: false },
  { name: 'Mobile (iPhone/Android)', width: 1080, height: 2400, aspect: '9:20', popular: true },
  { name: 'Tablet (iPad Pro)', width: 2048, height: 2732, aspect: '3:4', popular: false },
];

// Exact 6 Featured Cards from the Master Mockup
const FEATURED_MASTER_MOCKUP: Wallpaper[] = [
  {
    id: 'lumina-featured-1',
    title: 'Mountain Serenity',
    slug: 'mountain-serenity-4k',
    category: 'Nature',
    sourceCdn: '/images/mockup_cards/card-1-mountain.jpg',
    isHotlink: false,
    views: 124000,
    downloads: 6888,
    aspectRatio: '16:9',
    resolution: '3840×2160',
    colorName: 'Sunset Gold & Slate',
    colorHex: '#4A6B82',
    tags: ['mountain', 'nature', 'sunset', '4k', 'serenity', 'alpine']
  },
  {
    id: 'lumina-featured-2',
    title: 'Neon Drive',
    slug: 'neon-drive-cyberpunk-4k',
    category: 'Cyberpunk',
    sourceCdn: '/images/mockup_cards/card-2-neondrive.jpg',
    isHotlink: false,
    views: 281000,
    downloads: 15611,
    aspectRatio: '16:9',
    resolution: '3840×2160',
    colorName: 'Cyan & Magenta Neon',
    colorHex: '#00F0FF',
    tags: ['cyberpunk', 'car', 'neon', 'city', 'night', '4k']
  },
  {
    id: 'lumina-featured-3',
    title: 'Shadow Realm',
    slug: 'shadow-realm-anime-4k',
    category: 'Anime',
    sourceCdn: '/images/mockup_cards/card-3-shadowrealm.jpg',
    isHotlink: false,
    views: 317000,
    downloads: 17611,
    aspectRatio: '16:9',
    resolution: '3840×2160',
    colorName: 'Crimson & Obsidian',
    colorHex: '#E63946',
    tags: ['anime', 'character', 'dark', 'shadow', 'fantasy', '4k']
  },
  {
    id: 'lumina-featured-4',
    title: 'Cosmic Horizon',
    slug: 'cosmic-horizon-space-4k',
    category: 'Space',
    sourceCdn: '/images/mockup_cards/card-4-cosmichorizon.jpg',
    isHotlink: false,
    views: 193000,
    downloads: 10722,
    aspectRatio: '16:9',
    resolution: '3840×2160',
    colorName: 'Deep Purple & Nebula Pink',
    colorHex: '#9D4EDD',
    tags: ['space', 'cosmic', 'planet', 'nebula', 'galaxy', '4k']
  },
  {
    id: 'lumina-featured-5',
    title: 'Forest Calm',
    slug: 'forest-calm-waterfall-4k',
    category: 'Nature',
    sourceCdn: '/images/mockup_cards/card-5-forestcalm.jpg',
    isHotlink: false,
    views: 149000,
    downloads: 8277,
    aspectRatio: '16:9',
    resolution: '3840×2160',
    colorName: 'Emerald Forest Green',
    colorHex: '#2A9D8F',
    tags: ['forest', 'waterfall', 'nature', 'green', 'calm', '4k']
  },
  {
    id: 'lumina-featured-6',
    title: 'Night Beast',
    slug: 'night-beast-supercar-4k',
    category: 'Cars',
    sourceCdn: '/images/mockup_cards/card-6-nightbeast.jpg',
    isHotlink: false,
    views: 226000,
    downloads: 12555,
    aspectRatio: '16:9',
    resolution: '3840×2160',
    colorName: 'Matte Obsidian & Red LED',
    colorHex: '#E71D36',
    tags: ['car', 'supercar', 'matte black', 'night', 'beast', '4k']
  }
];

export const wallpapers: Wallpaper[] = [
  ...FEATURED_MASTER_MOCKUP,
  ...(catalogData as Wallpaper[]).filter(w => !FEATURED_MASTER_MOCKUP.some(f => f.slug === w.slug))
];

export function getWallpapersByCategory(slug: string): Wallpaper[] {
  if (slug === 'all') return wallpapers;
  return wallpapers.filter((wp) => {
    const categorySlug = wp.category?.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return categorySlug?.includes(slug.toLowerCase()) || wp.tags?.some((t) => t.toLowerCase() === slug.toLowerCase());
  });
}
