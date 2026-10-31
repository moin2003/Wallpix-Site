import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import cloudflare from '@astrojs/cloudflare';

const isVercel = Boolean(process.env.VERCEL);

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: isVercel ? vercel() : cloudflare(),
  devToolbar: {
    enabled: false,
  },
  integrations: [
    tailwind({
      applyBaseStyles: true,
    }),
  ],
  site: 'https://www.walpix.site',
});
