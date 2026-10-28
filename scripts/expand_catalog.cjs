const fs = require('fs');
const path = require('path');

const catalogPath = path.join(__dirname, '..', 'public', 'data', 'catalog.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

const existingSlugs = new Set(catalog.map(w => w.slug));

const additionalWallpapers = [
  // Anime & Gaming
  {
    id: "lumina-curated-110",
    title: "Ghost of Tsushima Moonlight Ronin",
    slug: "ghost-of-tsushima-moonlight-ronin-4k",
    category: "Anime & Gaming",
    sourceCdn: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=2400&q=85",
    isHotlink: false,
    views: 412000,
    downloads: 89000,
    aspectRatio: "16:9",
    resolution: "3840×2160",
    colorHex: "#E63946",
    tags: ["samurai", "ghost-of-tsushima", "ronin", "anime", "gaming", "katana", "4k"],
    screenTypes: ["desktop-4k", "phone-iphone", "ultrawide", "dual-monitor"]
  },
  {
    id: "lumina-curated-111",
    title: "Elden Ring Erdtree Golden Horizon",
    slug: "elden-ring-erdtree-golden-horizon-4k",
    category: "Anime & Gaming",
    sourceCdn: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2400&q=85",
    isHotlink: false,
    views: 650000,
    downloads: 182000,
    aspectRatio: "16:9",
    resolution: "3840×2160",
    colorHex: "#F4B400",
    tags: ["elden-ring", "erdtree", "fantasy", "gaming", "gold", "rpg", "4k"],
    screenTypes: ["desktop-4k", "ultrawide", "dual-monitor"]
  },
  {
    id: "lumina-curated-112",
    title: "Gears of War E-Day Emergence Storm",
    slug: "gears-of-war-e-day-emergence-storm-4k",
    category: "Anime & Gaming",
    sourceCdn: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=2400&q=85",
    isHotlink: false,
    views: 380000,
    downloads: 94000,
    aspectRatio: "16:9",
    resolution: "3840×2160",
    colorHex: "#C2FF06",
    tags: ["gears-of-war", "e-day", "marcus-fenix", "xbox", "gaming", "locust", "4k"],
    screenTypes: ["desktop-4k", "phone-iphone", "ultrawide"]
  },
  {
    id: "lumina-curated-113",
    title: "Phantom Blade Zero Rainblade Duel",
    slug: "phantom-blade-zero-rainblade-duel-4k",
    category: "Anime & Gaming",
    sourceCdn: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=2400&q=85",
    isHotlink: false,
    views: 290000,
    downloads: 72000,
    aspectRatio: "16:9",
    resolution: "3840×2160",
    colorHex: "#0D1B2A",
    tags: ["phantom-blade", "kungfu-punk", "samurai", "gaming", "rain", "4k"],
    screenTypes: ["desktop-4k", "ultrawide", "dual-monitor"]
  },
  {
    id: "lumina-curated-114",
    title: "Neon Cyberpunk Akira Neo Tokyo",
    slug: "neon-cyberpunk-akira-neo-tokyo-4k",
    category: "Cyberpunk & Neon",
    sourceCdn: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=2400&q=85",
    isHotlink: false,
    views: 520000,
    downloads: 135000,
    aspectRatio: "16:9",
    resolution: "3840×2160",
    colorHex: "#00F0FF",
    tags: ["cyberpunk", "akira", "neo-tokyo", "synthwave", "neon", "anime", "4k"],
    screenTypes: ["desktop-4k", "phone-iphone", "ultrawide", "dual-monitor"]
  },
  {
    id: "lumina-curated-115",
    title: "Porsche 911 GT3 RS Neon Cyber Drift",
    slug: "porsche-911-gt3-rs-neon-cyber-drift-4k",
    category: "Cars & Bikes",
    sourceCdn: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2400&q=85",
    isHotlink: false,
    views: 480000,
    downloads: 124000,
    aspectRatio: "16:9",
    resolution: "3840×2160",
    colorHex: "#C2FF06",
    tags: ["porsche", "porsche-911", "supercar", "cars", "drift", "speed", "4k"],
    screenTypes: ["desktop-4k", "phone-iphone", "ultrawide", "dual-monitor"]
  },
  {
    id: "lumina-curated-116",
    title: "Lamborghini Revuelto Stealth Matte Black",
    slug: "lamborghini-revuelto-stealth-matte-black-4k",
    category: "Cars & Bikes",
    sourceCdn: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=2400&q=85",
    isHotlink: false,
    views: 560000,
    downloads: 147000,
    aspectRatio: "16:9",
    resolution: "3840×2160",
    colorHex: "#1C1C1C",
    tags: ["lamborghini", "revuelto", "supercar", "hypercar", "matte-black", "4k"],
    screenTypes: ["desktop-4k", "phone-iphone", "amoled-black"]
  },
  {
    id: "lumina-curated-117",
    title: "BMW M1000RR Cyber Superbike Night",
    slug: "bmw-m1000rr-cyber-superbike-night-4k",
    category: "Cars & Bikes",
    sourceCdn: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=2400&q=85",
    isHotlink: false,
    views: 310000,
    downloads: 82000,
    aspectRatio: "16:9",
    resolution: "3840×2160",
    colorHex: "#00F0FF",
    tags: ["bmw", "superbike", "motorcycle", "bike", "racing", "speed", "4k"],
    screenTypes: ["desktop-4k", "phone-iphone", "amoled-black"]
  },
  {
    id: "lumina-curated-118",
    title: "AMOLED Pure Void OLED Waves",
    slug: "amoled-pure-void-oled-waves-4k",
    category: "AMOLED Black",
    sourceCdn: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2400&q=85",
    isHotlink: false,
    views: 740000,
    downloads: 215000,
    aspectRatio: "16:9",
    resolution: "3840×2160",
    colorHex: "#000000",
    tags: ["amoled", "pure-black", "oled", "minimal", "abstract", "dark", "4k"],
    screenTypes: ["desktop-4k", "phone-iphone", "amoled-black"]
  },
  {
    id: "lumina-curated-119",
    title: "AMOLED Luminous Neon Ring Geometry",
    slug: "amoled-luminous-neon-ring-geometry-4k",
    category: "AMOLED Black",
    sourceCdn: "https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=2400&q=85",
    isHotlink: false,
    views: 490000,
    downloads: 138000,
    aspectRatio: "16:9",
    resolution: "3840×2160",
    colorHex: "#C2FF06",
    tags: ["amoled", "neon", "geometry", "ring", "pure-black", "dark-mode", "4k"],
    screenTypes: ["desktop-4k", "phone-iphone", "amoled-black"]
  },
  {
    id: "lumina-curated-120",
    title: "James Webb Deep Space Carina Nebula",
    slug: "james-webb-deep-space-carina-nebula-4k",
    category: "Space & Cosmic",
    sourceCdn: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=85",
    isHotlink: false,
    views: 890000,
    downloads: 280000,
    aspectRatio: "16:9",
    resolution: "3840×2160",
    colorHex: "#9D4EDD",
    tags: ["jwst", "nebula", "space", "carina", "galaxy", "nasa", "cosmic", "4k"],
    screenTypes: ["desktop-4k", "phone-iphone", "ultrawide", "dual-monitor"]
  },
  {
    id: "lumina-curated-121",
    title: "Aurora Borealis Nordic Frozen Fjord",
    slug: "aurora-borealis-nordic-frozen-fjord-4k",
    category: "Nature & Scenery",
    sourceCdn: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=2400&q=85",
    isHotlink: false,
    views: 620000,
    downloads: 195000,
    aspectRatio: "16:9",
    resolution: "3840×2160",
    colorHex: "#2A9D8F",
    tags: ["aurora", "northern-lights", "fjord", "norway", "winter", "nature", "4k"],
    screenTypes: ["desktop-4k", "phone-iphone", "ultrawide", "dual-monitor"]
  },
  {
    id: "lumina-curated-122",
    title: "Mount Fuji Cherry Blossom Sunset Peak",
    slug: "mount-fuji-cherry-blossom-sunset-peak-4k",
    category: "Nature & Scenery",
    sourceCdn: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2400&q=85",
    isHotlink: false,
    views: 580000,
    downloads: 172000,
    aspectRatio: "16:9",
    resolution: "3840×2160",
    colorHex: "#FF6B6B",
    tags: ["mount-fuji", "japan", "cherry-blossom", "sakura", "sunset", "mountain", "4k"],
    screenTypes: ["desktop-4k", "phone-iphone", "ultrawide", "dual-monitor"]
  },
  {
    id: "lumina-curated-123",
    title: "Minimalist Desert Dunes Golden Hour",
    slug: "minimalist-desert-dunes-golden-hour-4k",
    category: "Minimalist & Abstract",
    sourceCdn: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2400&q=85",
    isHotlink: false,
    views: 340000,
    downloads: 98000,
    aspectRatio: "16:9",
    resolution: "3840×2160",
    colorHex: "#E3B505",
    tags: ["desert", "minimalist", "dunes", "sand", "golden-hour", "clean", "4k"],
    screenTypes: ["desktop-4k", "phone-iphone", "ultrawide"]
  },
  {
    id: "lumina-curated-124",
    title: "Abstract 3D Liquid Chrome Waves",
    slug: "abstract-3d-liquid-chrome-waves-4k",
    category: "Minimalist & Abstract",
    sourceCdn: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2400&q=85",
    isHotlink: false,
    views: 420000,
    downloads: 118000,
    aspectRatio: "16:9",
    resolution: "3840×2160",
    colorHex: "#00F0FF",
    tags: ["abstract", "chrome", "liquid", "3d", "render", "fluid", "4k"],
    screenTypes: ["desktop-4k", "phone-iphone", "ultrawide", "dual-monitor"]
  },
  {
    id: "lumina-curated-125",
    title: "Castlevania Belmont Gothic Blood Moon",
    slug: "castlevania-belmont-gothic-blood-moon-4k",
    category: "Dark Mode & Mystery",
    sourceCdn: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2400&q=85",
    isHotlink: false,
    views: 390000,
    downloads: 106000,
    aspectRatio: "16:9",
    resolution: "3840×2160",
    colorHex: "#800020",
    tags: ["castlevania", "belmont", "dracula", "gothic", "blood-moon", "vampire", "4k"],
    screenTypes: ["desktop-4k", "phone-iphone", "amoled-black"]
  },
  {
    id: "lumina-curated-126",
    title: "Cyberpunk Tokyo Rain Neon Alley Shinjuku",
    slug: "cyberpunk-tokyo-rain-neon-alley-shinjuku-4k",
    category: "Cyberpunk & Neon",
    sourceCdn: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=2400&q=85",
    isHotlink: false,
    views: 670000,
    downloads: 210000,
    aspectRatio: "16:9",
    resolution: "3840×2160",
    colorHex: "#00F0FF",
    tags: ["cyberpunk", "tokyo", "shinjuku", "rain", "neon", "night", "city", "4k"],
    screenTypes: ["desktop-4k", "phone-iphone", "ultrawide", "dual-monitor"]
  },
  {
    id: "lumina-curated-127",
    title: "Misty Pine Forest Alpine Sunlight",
    slug: "misty-pine-forest-alpine-sunlight-4k",
    category: "Nature & Scenery",
    sourceCdn: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2400&q=85",
    isHotlink: false,
    views: 450000,
    downloads: 132000,
    aspectRatio: "16:9",
    resolution: "3840×2160",
    colorHex: "#1B4332",
    tags: ["forest", "trees", "mist", "sunlight", "pine", "nature", "alpine", "4k"],
    screenTypes: ["desktop-4k", "phone-iphone", "ultrawide"]
  },
  {
    id: "lumina-curated-128",
    title: "Interstellar Black Hole Accretion Disk",
    slug: "interstellar-black-hole-accretion-disk-4k",
    category: "Space & Cosmic",
    sourceCdn: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=85",
    isHotlink: false,
    views: 780000,
    downloads: 245000,
    aspectRatio: "16:9",
    resolution: "3840×2160",
    colorHex: "#F4B400",
    tags: ["interstellar", "black-hole", "space", "gargantua", "physics", "cosmos", "4k"],
    screenTypes: ["desktop-4k", "phone-iphone", "ultrawide", "dual-monitor", "amoled-black"]
  },
  {
    id: "lumina-curated-129",
    title: "Ferrari Daytona SP3 Rosso Corsa Speed",
    slug: "ferrari-daytona-sp3-rosso-corsa-speed-4k",
    category: "Cars & Bikes",
    sourceCdn: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=2400&q=85",
    isHotlink: false,
    views: 510000,
    downloads: 142000,
    aspectRatio: "16:9",
    resolution: "3840×2160",
    colorHex: "#E63946",
    tags: ["ferrari", "daytona", "rosso-corsa", "supercar", "hypercar", "speed", "4k"],
    screenTypes: ["desktop-4k", "phone-iphone", "ultrawide"]
  }
];

let addedCount = 0;
additionalWallpapers.forEach(wp => {
  if (!existingSlugs.has(wp.slug)) {
    catalog.push(wp);
    existingSlugs.add(wp.slug);
    addedCount++;
  }
});

fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), 'utf8');
console.log(`Successfully added ${addedCount} new wallpapers. Total in catalog: ${catalog.length}`);
