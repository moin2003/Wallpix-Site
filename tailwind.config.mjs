/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'walpix-lime': '#C2FF06',
        'walpix-lime-bright': '#D0FF00',
        'walpix-lime-soft': '#B8F52A',
        'walpix-magenta': '#F91ACF',
        'walpix-pink': '#FF3FAF',
        'lumina-lime': '#C2FF06',
        'lumina-lime-bright': '#D0FF00',
        'lumina-lime-soft': '#B8F52A',
        'lumina-magenta': '#F91ACF',
        'lumina-pink': '#FF3FAF',
        lumina: {
          bg: '#030405',
          secondary: '#07090B',
          tertiary: '#0C0F12',
          surface: '#0B0D0F',
          elevated: '#121417',
          card: '#080A0C',

          lime: '#C2FF06',
          'lime-bright': '#D0FF00',
          'lime-soft': '#B8F52A',

          magenta: '#F91ACF',
          pink: '#FF3FAF',

          primary: '#FFFFFF',
          'text-secondary': '#D7D9DC',
          'text-tertiary': '#92979E',
          muted: '#656A72',
          disabled: '#44484E',
        },
        walpix: {
          bg: '#030405',
          secondary: '#07090B',
          tertiary: '#0C0F12',
          surface: '#0B0D0F',
          elevated: '#121417',
          card: '#080A0C',

          lime: '#C2FF06',
          'lime-bright': '#D0FF00',
          'lime-soft': '#B8F52A',

          magenta: '#F91ACF',
          pink: '#FF3FAF',

          primary: '#FFFFFF',
          'text-secondary': '#D7D9DC',
          'text-tertiary': '#92979E',
          muted: '#656A72',
          disabled: '#44484E',
        },
      },
      spacing: {
        0.5: '2px',
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        8: '32px',
        10: '40px',
        12: '48px',
        16: '64px',
        20: '80px',
      },
      borderRadius: {
        xs: '8px',
        sm: '10px',
        card: '12px',
        button: '14px',
        input: '16px',
        glass: '20px',
        panel: '24px',
        pill: '9999px',
      },
      maxWidth: {
        lumina: '100%',
      },
      backdropBlur: {
        glass: '20px',
        soft: '14px',
        strong: '28px',
      },
      boxShadow: {
        'lime-sm': '0 0 8px rgba(194,255,6,.35), 0 0 18px rgba(194,255,6,.12)',
        'lime': '0 0 10px rgba(194,255,6,.45), 0 0 30px rgba(194,255,6,.20)',
        'lime-pill': '0 0 12px rgba(194,255,6,.30), inset 0 0 16px rgba(194,255,6,.04)',
        'magenta': '0 0 20px rgba(249,26,207,.18)',
        'glass': '0 8px 32px rgba(0,0,0,.38), inset 0 1px 0 rgba(255,255,255,.04)',
        'card': '0 12px 32px rgba(0,0,0,.45)',
        'card-hover': '0 14px 35px rgba(0,0,0,.55), 0 0 22px rgba(194,255,6,.10)',
        'play-glow': '0 0 16px rgba(194,255,6,.45), inset 0 0 10px rgba(194,255,6,.08)',
      },
      backgroundImage: {
        'lumina-gradient': 'linear-gradient(90deg, #C2FF06 0%, #F6D72D 42%, #F91ACF 100%)',
        'hero-overlay': 'linear-gradient(90deg, rgba(3,4,5,0.95) 0%, rgba(3,4,5,0.85) 30%, rgba(3,4,5,0.40) 65%, rgba(3,4,5,0.20) 100%)',
        'hero-bottom': 'linear-gradient(to bottom, transparent 40%, rgba(3,4,5,0.75) 75%, #030405 100%)',
        'card-overlay': 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.58) 30%, transparent 65%)',
      },
      fontSize: {
        hero: [
          'clamp(48px, 5.2vw, 82px)',
          {
            lineHeight: '0.92',
            letterSpacing: '-0.055em',
            fontWeight: '800',
          },
        ],
      },
      transitionTimingFunction: {
        lumina: 'cubic-bezier(.22,1,.36,1)',
      },
      transitionDuration: {
        350: '350ms',
      },
    },
  },
  plugins: [],
};
