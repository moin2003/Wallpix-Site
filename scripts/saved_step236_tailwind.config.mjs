/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#060709',
          900: '#08090C',
          850: '#0D0F14',
          800: '#13161F',
          700: '#1D2230',
        },
        neon: {
          lime: '#BBEF1F',
          pink: '#FF0055',
          cyan: '#00C2CB',
          purple: '#A855F7',
          orange: '#FF8C00',
        },
        ice: '#EFF8FF',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        display: [
          'Outfit',
          'Inter',
          'sans-serif',
        ],
      },
      boxShadow: {
        'glow-lime': '0 0 25px -5px rgba(187, 239, 31, 0.35)',
        'glow-pink': '0 0 25px -5px rgba(255, 0, 85, 0.35)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
};
