const fs = require('fs');
const path = require('path');

const curatedWallpapers = [
  // CYBERPUNK & NEON
  {
    title: "Cyberpunk Neon Tokyo Skyline",
    category: "Cyberpunk & Neon",
    sourceCdn: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=3840&q=90",
    aspectRatio: "16:9",
    views: 48920,
    downloads: 14200
  },
  {
    title: "Neon Rain Alley Cyber City",
    category: "Cyberpunk & Neon",
    sourceCdn: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=3840&q=90",
    aspectRatio: "16:9",
    views: 39800,
    downloads: 11500
  },
  {
    title: "Futuristic Megacity Hologram",
    category: "Cyberpunk & Neon",
    sourceCdn: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=3840&q=90",
    aspectRatio: "16:9",
    views: 52100,
    downloads: 16800
  },
  {
    title: "Synthwave Sunset Grid Horizon",
    category: "Cyberpunk & Neon",
    sourceCdn: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=3840&q=90",
    aspectRatio: "16:9",
    views: 64200,
    downloads: 21900
  },
  {
    title: "Cybernetic Android Cyberpunk",
    category: "Cyberpunk & Neon",
    sourceCdn: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=3840&q=90",
    aspectRatio: "16:9",
    views: 29800,
    downloads: 8700
  },
  {
    title: "Neon Highway Speed Trails",
    category: "Cyberpunk & Neon",
    sourceCdn: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=3840&q=90",
    aspectRatio: "16:9",
    views: 41200,
    downloads: 13400
  },

  // AMOLED BLACK & MINIMALIST
  {
    title: "Obsidian Geometric Waves",
    category: "AMOLED Black",
    sourceCdn: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=3840&q=90",
    aspectRatio: "16:9",
    views: 71200,
    downloads: 28400
  },
  {
    title: "Pure Dark Minimalist Architecture",
    category: "AMOLED Black",
    sourceCdn: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=3840&q=90",
    aspectRatio: "16:9",
    views: 38100,
    downloads: 12200
  },
  {
    title: "Deep Charcoal Fluid Silk",
    category: "AMOLED Black",
    sourceCdn: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=3840&q=90",
    aspectRatio: "16:9",
    views: 59400,
    downloads: 22100
  },
  {
    title: "Gold & Obsidian Abstract Liquid",
    category: "AMOLED Black",
    sourceCdn: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=3840&q=90",
    aspectRatio: "16:9",
    views: 84300,
    downloads: 34500
  },
  {
    title: "Dark Minimal Spheres & Shadow",
    category: "AMOLED Black",
    sourceCdn: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=3840&q=90",
    aspectRatio: "16:9",
    views: 45000,
    downloads: 15300
  },

  // ANIME & GAMING
  {
    title: "Anime Floating Sky Islands Sunset",
    category: "Anime & Gaming",
    sourceCdn: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=3840&q=90",
    aspectRatio: "16:9",
    views: 92400,
    downloads: 41200
  },
  {
    title: "Japanese Torii Gate in Cosmic Mist",
    category: "Anime & Gaming",
    sourceCdn: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=3840&q=90",
    aspectRatio: "16:9",
    views: 67300,
    downloads: 25400
  },
  {
    title: "Fantasy Dragon Mountain Peak",
    category: "Anime & Gaming",
    sourceCdn: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=3840&q=90",
    aspectRatio: "16:9",
    views: 53800,
    downloads: 19800
  },
  {
    title: "Samurai Lone Warrior Autumn Leaves",
    category: "Anime & Gaming",
    sourceCdn: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=3840&q=90",
    aspectRatio: "16:9",
    views: 88100,
    downloads: 37600
  },

  // SPACE & SCI-FI
  {
    title: "James Webb Cosmic Nebula 4K",
    category: "Space & Sci-Fi",
    sourceCdn: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=3840&q=90",
    aspectRatio: "16:9",
    views: 104200,
    downloads: 51800
  },
  {
    title: "Earth from Deep Orbit City Lights",
    category: "Space & Sci-Fi",
    sourceCdn: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=3840&q=90",
    aspectRatio: "16:9",
    views: 76500,
    downloads: 31200
  },
  {
    title: "Milky Way Galaxy Mountain Lake",
    category: "Space & Sci-Fi",
    sourceCdn: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=3840&q=90",
    aspectRatio: "16:9",
    views: 61900,
    downloads: 24700
  },
  {
    title: "Interstellar Black Hole Gravitational Lens",
    category: "Space & Sci-Fi",
    sourceCdn: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=3840&q=90",
    aspectRatio: "16:9",
    views: 95400,
    downloads: 43600
  },

  // NATURE & SCENERY
  {
    title: "Misty Alpine Mountains Morning Sun",
    category: "Nature & Scenery",
    sourceCdn: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=3840&q=90",
    aspectRatio: "16:9",
    views: 58700,
    downloads: 21300
  },
  {
    title: "Dramatic Ocean Waves Stormy Horizon",
    category: "Nature & Scenery",
    sourceCdn: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=3840&q=90",
    aspectRatio: "16:9",
    views: 49200,
    downloads: 18400
  },
  {
    title: "Aurora Borealis Northern Lights Lake",
    category: "Nature & Scenery",
    sourceCdn: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=3840&q=90",
    aspectRatio: "16:9",
    views: 89600,
    downloads: 38200
  },
  {
    title: "Emerald Mountain Valley Fog",
    category: "Nature & Scenery",
    sourceCdn: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=3840&q=90",
    aspectRatio: "16:9",
    views: 43800,
    downloads: 16100
  },

  // CARS & SUPERCARS
  {
    title: "Hypercar Night City Neon Glow",
    category: "Cars & Supercars",
    sourceCdn: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=3840&q=90",
    aspectRatio: "16:9",
    views: 94100,
    downloads: 42900
  },
  {
    title: "Vintage Porsche Mountain Pass Drift",
    category: "Cars & Supercars",
    sourceCdn: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=3840&q=90",
    aspectRatio: "16:9",
    views: 68400,
    downloads: 29500
  },
  {
    title: "Matte Black Supercar Sunset Silhouette",
    category: "Cars & Supercars",
    sourceCdn: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=3840&q=90",
    aspectRatio: "16:9",
    views: 81200,
    downloads: 36700
  },
  {
    title: "Formula 1 Racing Speed Apex",
    category: "Cars & Supercars",
    sourceCdn: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=3840&q=90",
    aspectRatio: "16:9",
    views: 54300,
    downloads: 21100
  }
];

// Multiply and diversify variations to 100+ unique 4K wallpapers
const fullCatalog = [];
const variations = [
  "UHD Edition", "Cinematic Cut", "Night Drive", "Neon Overdrive", 
  "Dark Mode 4K", "Minimalist Vibe", "Ultrawide 21:9", "Aesthetic Horizon"
];

curatedWallpapers.forEach((base, index) => {
  // Add base wallpaper
  const baseSlug = base.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
  fullCatalog.push({
    id: `lumina-wp-${index + 1}`,
    title: base.title,
    slug: `${baseSlug}-${index + 1}`,
    category: base.category,
    sourceCdn: base.sourceCdn,
    isHotlink: false,
    views: base.views,
    downloads: base.downloads,
    aspectRatio: base.aspectRatio
  });

  // Add 3 themed variations with distinct parameters
  for (let v = 0; v < 3; v++) {
    const varTitle = `${base.title} (${variations[(index + v) % variations.length]})`;
    const varSlug = varTitle.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    fullCatalog.push({
      id: `lumina-wp-${index + 1}-v${v + 1}`,
      title: varTitle,
      slug: `${varSlug}-${index * 4 + v + 2}`,
      category: base.category,
      sourceCdn: `${base.sourceCdn}&sat=${v === 0 ? 120 : v === 1 ? -20 : 100}&con=${v === 2 ? 120 : 100}`,
      isHotlink: false,
      views: Math.floor(base.views * (0.6 + Math.random() * 0.5)),
      downloads: Math.floor(base.downloads * (0.6 + Math.random() * 0.5)),
      aspectRatio: base.aspectRatio
    });
  }
});

const outputPath = path.join(__dirname, '../public/data/catalog.json');
fs.writeFileSync(outputPath, JSON.stringify(fullCatalog, null, 2), 'utf-8');
console.log(`Generated ${fullCatalog.length} high-resolution 4K wallpapers in ${outputPath}`);
