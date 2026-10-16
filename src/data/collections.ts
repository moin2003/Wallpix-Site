export interface Collection {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  count: number;
  featuredCategory: string;
  tags: string[];
  gradient: string;
  wallpaperSlugs: string[];
}

export const collections: Collection[] = [
  {
    id: 'col-cyberpunk',
    slug: 'cyberpunk-night-city-pack',
    title: 'Cyberpunk 2077 & Neon Metropolis',
    description: 'Dystopian rain, glowing holograms, and hyper-detailed futuristic cityscapes in native 4K UHD.',
    coverImage: '/images/mockup_cards/card-2-neondrive.jpg',
    count: 8,
    featuredCategory: 'Cyberpunk',
    tags: ['cyberpunk', 'neon', 'rain', 'futuristic', '4k'],
    gradient: 'from-cyan-500/20 via-magenta-500/10 to-transparent',
    wallpaperSlugs: [
      'neon-drive-cyberpunk-4k',
      'cyberpunk-tokyo-alley-rain-4k',
      'cyberpunk-shinjuku-rain-4k',
      'futuristic-synthwave-highway-4k',
      'neon-horizon-cyber-sunset-4k',
      'retro-80s-grid-synthwave-sun-4k'
    ]
  },
  {
    id: 'col-amoled',
    slug: 'amoled-dark-void-pack',
    title: 'Pitch Black & OLED Minimalist',
    description: '100% genuine #000000 black canvas engineered for maximum OLED contrast and battery preservation.',
    coverImage: '/images/mockup_cards/card-6-nightbeast.jpg',
    count: 7,
    featuredCategory: 'AMOLED',
    tags: ['amoled', 'oled', 'pure black', 'minimalism'],
    gradient: 'from-gray-500/20 via-black to-transparent',
    wallpaperSlugs: [
      'amoled-dark-minimal-waves-4k',
      'amoled-golden-particle-wave-4k',
      'obsidian-dark-geometric-sphere-4k',
      'minimal-dark-waveform-fluid-4k',
      'minimal-monolith-dark-dunes-4k'
    ]
  },
  {
    id: 'col-supercars',
    slug: 'hypercars-supercars-speed-pack',
    title: '8K Track Beasts & Supercars',
    description: 'Exotic carbon-fiber monsters, night-glow silhouettes, and high-octane asphalt reflections.',
    coverImage: '/images/mockup_cards/card-6-nightbeast.jpg',
    count: 6,
    featuredCategory: 'Cars',
    tags: ['supercars', 'hypercars', 'gt3', 'matte black', '4k'],
    gradient: 'from-red-500/20 via-amber-500/10 to-transparent',
    wallpaperSlugs: [
      'night-beast-supercar-4k',
      'matte-black-gt3-supercar-4k',
      'supercar-silhouette-night-glow-4k',
      'hypercar-racing-neon-reflections-4k'
    ]
  },
  {
    id: 'col-nature',
    slug: 'nature-alpine-sanctuary',
    title: 'Serene Landscapes & Alpine Waters',
    description: 'Misty pine forests, crystalline glacial lakes, and breathtaking golden-hour mountain ridges.',
    coverImage: '/images/mockup_cards/card-1-mountain.jpg',
    count: 8,
    featuredCategory: 'Nature',
    tags: ['nature', 'mountains', 'lake', 'forest', 'calm'],
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    wallpaperSlugs: [
      'mountain-serenity-4k',
      'forest-calm-waterfall-4k',
      'bavarian-alps-crystal-lake-reflection-4k',
      'emerald-canyon-mist-river-4k',
      'nordic-alpine-sunset-glow-4k',
      'misty-pine-forest-autumn-morning-4k',
      'lofoten-islands-northern-lights-4k'
    ]
  },
  {
    id: 'col-space',
    slug: 'deep-space-nebula-odyssey',
    title: 'Cosmic Galaxies & Star Clusters',
    description: 'Stunning deep-field telescope visuals, glowing interstellar gas nebulae, and orbital planets.',
    coverImage: '/images/mockup_cards/card-4-cosmichorizon.jpg',
    count: 5,
    featuredCategory: 'Space',
    tags: ['space', 'nebula', 'galaxy', 'astronomy', 'stars'],
    gradient: 'from-purple-500/20 via-indigo-500/10 to-transparent',
    wallpaperSlugs: [
      'cosmic-horizon-space-4k',
      'deep-space-pillars-creation-4k',
      'orion-nebula-star-cluster-4k'
    ]
  },
  {
    id: 'col-anime',
    slug: 'anime-samurai-fantasy-heroes',
    title: 'Anime Warriors & Neo-Tokyo Legends',
    description: 'Mythical ronin swordsmen, moody cyberpunk rain umbrellas, and epic celestial anime art.',
    coverImage: '/images/mockup_cards/card-3-shadowrealm.jpg',
    count: 6,
    featuredCategory: 'Anime',
    tags: ['anime', 'samurai', 'cyberpunk', 'fantasy', 'art'],
    gradient: 'from-pink-500/20 via-rose-500/10 to-transparent',
    wallpaperSlugs: [
      'shadow-realm-anime-4k',
      'anime-blade-samurai-mist-4k',
      'anime-cyber-city-neon-umbrella-4k'
    ]
  }
];
