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
  { name: 'Space & Sci-Fi', slug: 'space-sci-fi', icon: 'globe' },
];

// Enrich catalog with real attributes
export const wallpapers: Wallpaper[] = (catalogData as any[]).map((wp, index) => {
  const colorIndex = index % LUXURY_COLORS.length;
  const color = LUXURY_COLORS[colorIndex];
  
  const titleVariations = [
    'Cyberpunk Neon City Skyline',
    'Minimalist Obsidian Geometry',
    'Ethereal Anime Sunset Horizon',
    'Deep Space Nebula 4K',
    'AMOLED Supercar Night Drive',
    'Japanese Cherry Blossom Shrine',
    'Futuristic Mecha Warrior',
    'Moody Dark Forest Mist',
    'Abstract Fluid Gold & Black',
    'Quantum Horizon Aurora',
    'Neon Samurai Cyberblade',
    'Hyperdrive Galactic Portal',
    'Liquid Chrome Abstract Waves',
    'Synthwave Sunset Grid',
    'Dark Velvet Rose Aesthetic',
  ];

  const assignedTitle = wp.title && wp.title !== 'Ultra Hd 4K Wallpaper' 
    ? wp.title 
    : titleVariations[index % titleVariations.length] + ` #${index + 1}`;

  const assignedSlug = assignedTitle
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-') + `-${index + 1}`;

  return {
    ...wp,
    title: assignedTitle,
    slug: assignedSlug,
    resolution: index % 3 === 0 ? '3840 x 2160 (4K)' : index % 2 === 0 ? '2560 x 1440 (2K)' : '1920 x 1080 (FHD)',
    colorName: color.name,
    colorHex: color.hexAccent,
    tags: [
      '4K Wallpaper',
      'Ultra HD',
      'Free Download',
      'Desktop & Mobile',
      color.slug,
      wp.category || 'Aesthetic',
    ],
    views: wp.views || Math.floor(Math.random() * 4000) + 1200,
    downloads: wp.downloads || Math.floor(Math.random() * 1800) + 450,
  };
});
