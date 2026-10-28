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
    coverImage: 'https://wallpapercat.com/w/full/5/d/f/2614-3840x2160-desktop-4k-cyberpunk-2077-wallpaper-photo.jpg',
    count: 8,
    featuredCategory: 'Cyberpunk',
    tags: ['cyberpunk', 'neon', 'rain', 'futuristic', '4k'],
    gradient: 'from-cyan-500/20 via-magenta-500/10 to-transparent',
    wallpaperSlugs: [
      '3840x2160-desktop-4k-cyberpunk-2077-wallpaper-photo-jpg-cyberpunk-2077-4k',
      'cyberpunk-jel1-4k',
      'cyberpunk-w533-4k',
      'cyberpunk-2166-4k',
      'cyberpunk-1qo2-4k',
      'cyberpunk-k8jl-4k'
    ]
  },
  {
    id: 'col-amoled',
    slug: 'amoled-dark-void-pack',
    title: 'Pitch Black & OLED Minimalist',
    description: '100% genuine #000000 black canvas engineered for maximum OLED contrast and battery preservation.',
    coverImage: 'https://wallpapercat.com/w/full/0/9/0/1644033-3840x2160-desktop-4k-berserk-background-image.jpg',
    count: 7,
    featuredCategory: 'AMOLED',
    tags: ['amoled', 'oled', 'pure black', 'minimalism'],
    gradient: 'from-gray-500/20 via-black to-transparent',
    wallpaperSlugs: [
      'berserk-4k-ultra-wallpaper-4k',
      'dark-gothic-anime-background-image-gothic-anime-4k',
      'nature-xekj-4k',
      'space-qrpp-4k',
      'cyberpunk-jel1-4k'
    ]
  },
  {
    id: 'col-supercars',
    slug: 'hypercars-supercars-speed-pack',
    title: '8K Track Beasts & Supercars',
    description: 'Exotic carbon-fiber monsters, night-glow silhouettes, and high-octane asphalt reflections.',
    coverImage: 'https://wallpapercat.com/w/full/7/1/4/218040-3840x2160-desktop-4k-porsche-911-992-background.jpg',
    count: 6,
    featuredCategory: 'Cars',
    tags: ['supercars', 'hypercars', 'gt3', 'matte black', '4k'],
    gradient: 'from-red-500/20 via-amber-500/10 to-transparent',
    wallpaperSlugs: [
      'porsche-911-992-4k',
      'singer-porsche-964-4k',
      'supercar-rqee-4k',
      'supercar-zpv2-4k',
      'supercar-5ypk-4k',
      'supercar-rqez-4k'
    ]
  },
  {
    id: 'col-nature',
    slug: 'nature-alpine-sanctuary',
    title: 'Serene Landscapes & Alpine Waters',
    description: 'Misty pine forests, crystalline glacial lakes, and breathtaking golden-hour mountain ridges.',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&q=85',
    count: 8,
    featuredCategory: 'Nature',
    tags: ['nature', 'mountains', 'lake', 'forest', 'calm'],
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    wallpaperSlugs: [
      'nature-xekj-4k',
      'nature-5ypz-4k',
      'nature-jely-4k',
      'nature-jely-1-4k',
      'peak-into-colorado-4k',
      'bridges-rooftops-and-twilight-4k'
    ]
  },
  {
    id: 'col-space',
    slug: 'deep-space-nebula-odyssey',
    title: 'Cosmic Galaxies & Star Clusters',
    description: 'Stunning deep-field telescope visuals, glowing interstellar gas nebulae, and orbital planets.',
    coverImage: 'https://wallpapercat.com/w/full/9/7/7/151978-3840x2160-desktop-4k-interstellar-wallpaper.jpg',
    count: 5,
    featuredCategory: 'Space',
    tags: ['space', 'nebula', 'galaxy', 'astronomy', 'stars'],
    gradient: 'from-purple-500/20 via-indigo-500/10 to-transparent',
    wallpaperSlugs: [
      'space-qrpp-4k',
      'space-2166-4k',
      'space-mlom-4k',
      'space-jelk-4k'
    ]
  },
  {
    id: 'col-anime',
    slug: 'anime-samurai-fantasy-heroes',
    title: 'Anime Warriors & Neo-Tokyo Legends',
    description: 'Mythical ronin swordsmen, moody cyberpunk rain umbrellas, and epic celestial anime art.',
    coverImage: 'https://wallpapercat.com/w/full/f/9/6/1302353-3840x2160-desktop-4k-anime-background-image.jpg',
    count: 6,
    featuredCategory: 'Anime',
    tags: ['anime', 'samurai', 'cyberpunk', 'fantasy', 'art'],
    gradient: 'from-pink-500/20 via-rose-500/10 to-transparent',
    wallpaperSlugs: [
      'naruto-uzumaki-4k',
      'goku-and-vegeta-4k',
      'rengoku-demon-slayer-horizon-4k',
      'berserk-4k-ultra-wallpaper-4k',
      'luffy-one-piece-horizon-4k'
    ]
  }
];
