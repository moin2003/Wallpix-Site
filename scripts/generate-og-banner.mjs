import sharp from 'sharp';
import fs from 'fs';

async function createOgBanner() {
  const width = 1200;
  const height = 630;

  const svgText = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#040608" />
        <stop offset="50%" stop-color="#080C14" />
        <stop offset="100%" stop-color="#030405" />
      </linearGradient>
      <linearGradient id="lime-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#B4F324" />
        <stop offset="100%" stop-color="#22D3EE" />
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="45%" r="60%">
        <stop offset="0%" stop-color="#B4F324" stop-opacity="0.18" />
        <stop offset="50%" stop-color="#3B82F6" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#040608" stop-opacity="0" />
      </radialGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#000000" flood-opacity="0.8"/>
      </filter>
    </defs>

    <!-- Background Base -->
    <rect width="${width}" height="${height}" fill="url(#bg-grad)" />
    
    <!-- Ambient Radial Glow -->
    <circle cx="600" cy="270" r="450" fill="url(#glow)" />

    <!-- Subtle Tech Border -->
    <rect x="24" y="24" width="1152" height="582" rx="24" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" />

    <!-- Top Badge -->
    <g transform="translate(600, 95)">
      <rect x="-165" y="-18" width="330" height="36" rx="18" fill="rgba(180, 243, 36, 0.12)" stroke="rgba(180, 243, 36, 0.4)" stroke-width="1" />
      <text x="0" y="5" text-anchor="middle" fill="#B4F324" font-family="'Segoe UI', system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" letter-spacing="2">
        PREMIUM 4K &amp; AMOLED WALLPAPERS
      </text>
    </g>

    <!-- Main Title -->
    <text x="600" y="375" text-anchor="middle" fill="#FFFFFF" font-family="'Segoe UI', system-ui, -apple-system, sans-serif" font-size="64" font-weight="900" letter-spacing="4" filter="url(#shadow)">
      WALPIX <tspan fill="url(#lime-grad)">4K</tspan>
    </text>

    <!-- Subtitle / Tagline -->
    <text x="600" y="430" text-anchor="middle" fill="#94A3B8" font-family="'Segoe UI', system-ui, -apple-system, sans-serif" font-size="22" font-weight="500" letter-spacing="0.5">
      Ultra HD Backgrounds for Desktop, iPhone &amp; Android
    </text>

    <!-- Feature Pills -->
    <g transform="translate(600, 495)">
      <!-- Pill 1 -->
      <g transform="translate(-240, 0)">
        <rect x="-65" y="-16" width="130" height="32" rx="16" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" />
        <text x="0" y="5" text-anchor="middle" fill="#E2E8F0" font-family="'Segoe UI', system-ui, sans-serif" font-size="12" font-weight="600">14,800+ 4K UHD</text>
      </g>
      <!-- Pill 2 -->
      <g transform="translate(-80, 0)">
        <rect x="-65" y="-16" width="130" height="32" rx="16" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" />
        <text x="0" y="5" text-anchor="middle" fill="#E2E8F0" font-family="'Segoe UI', system-ui, sans-serif" font-size="12" font-weight="600">True 9:16 Mobile</text>
      </g>
      <!-- Pill 3 -->
      <g transform="translate(80, 0)">
        <rect x="-65" y="-16" width="130" height="32" rx="16" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" />
        <text x="0" y="5" text-anchor="middle" fill="#E2E8F0" font-family="'Segoe UI', system-ui, sans-serif" font-size="12" font-weight="600">Pure AMOLED</text>
      </g>
      <!-- Pill 4 -->
      <g transform="translate(240, 0)">
        <rect x="-65" y="-16" width="130" height="32" rx="16" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" />
        <text x="0" y="5" text-anchor="middle" fill="#E2E8F0" font-family="'Segoe UI', system-ui, sans-serif" font-size="12" font-weight="600">100% Free</text>
      </g>
    </g>

    <!-- Bottom URL Footer -->
    <text x="600" y="560" text-anchor="middle" fill="#64748B" font-family="'Segoe UI', system-ui, monospace" font-size="14" font-weight="600" letter-spacing="1.5">
      https://walpix.site
    </text>
  </svg>
  `;

  const logoBuffer = await sharp('public/images/logo/walpix-icon.png')
    .resize(150, 150, { fit: 'contain' })
    .toBuffer();

  const baseSvg = Buffer.from(svgText);

  await sharp(baseSvg)
    .composite([
      {
        input: logoBuffer,
        top: 145,
        left: 525,
      }
    ])
    .jpeg({ quality: 95 })
    .toFile('public/images/walpix-og-banner.jpg');

  console.log('✓ Created public/images/walpix-og-banner.jpg successfully (1200x630)');
}

createOgBanner().catch(console.error);
