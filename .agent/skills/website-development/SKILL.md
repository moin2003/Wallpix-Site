---
name: website-development
description: >-
  Build, style, and architect modern, lightning-fast, and mobile-responsive websites.
  Use when creating website layouts, frontend architectures (Astro, Next.js, React, Tailwind, HTML5/CSS3),
  implementing UI/UX components, optimizing Core Web Vitals, and designing responsive image galleries.
---

# Website Development Skill

This skill provides step-by-step guidance, best practices, and code architectures for building high-performance, mobile-first, responsive websites optimized for media and content delivery.

---

## 1. Core Architecture Principles

When creating or modifying website pages:
1. **Mobile-First Responsive Design**: Always design for small screens (320px+) first, then progressively enhance for tablet (768px+), laptop (1024px+), and desktop (1440px+).
2. **Core Web Vitals Optimization**:
   - **LCP (Largest Contentful Paint)**: < 2.5s. Preload hero assets, use modern image formats (`.webp`, `.avif`), and prioritize above-the-fold content.
   - **INP (Interaction to Next Paint)**: < 200ms. Minimize main-thread blocking JavaScript.
   - **CLS (Cumulative Layout Shift)**: < 0.1. Always set explicit `width` and `height` attributes on images, video containers, and ad slots.
3. **Clean Semantic HTML5**: Use `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`. Avoid `div`-soup.
4. **Dark / Light Mode**: Provide automatic theme switching using CSS variables or Tailwind's `dark:` classes with smooth transitions.

---

## 2. Recommended Tech Stacks

### Option A: Static Site / SSG (Astro or Next.js App Router) - *Recommended for Wallpaper & Blog Sites*
- **Astro**: Zero-JS by default, ultra-fast TTFB, perfect for wallpaper galleries and blogs with high AdSense and SEO requirements.
- **Next.js (App Router)**: SSR/SSG with React Server Components, ideal if user authentication or dynamic API interactions are needed.

### Option B: Lightweight HTML5 + Tailwind CSS + Vanilla JS
- Best for ultra-lightweight sites, static hosting (Cloudflare Pages, GitHub Pages, Netlify, Vercel).

---

## 3. Media & Wallpaper Gallery Grid Blueprint

When rendering wallpaper grids or image cards:

```html
<div class="wallpaper-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
  <!-- Single Wallpaper Card -->
  <div class="wallpaper-card group relative overflow-hidden rounded-2xl bg-neutral-900 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
    <div class="aspect-[9/16] w-full overflow-hidden bg-neutral-800">
      <img
        src="/thumbnails/sample-thumb.webp"
        data-src="/wallpapers/sample-full.webp"
        alt="Cyberpunk Neon City Wallpaper 4K"
        width="360"
        height="640"
        loading="lazy"
        decoding="async"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-4">
      <h3 class="text-sm font-semibold text-white truncate">Neon Cyberpunk City</h3>
      <div class="mt-2 flex items-center justify-between">
        <span class="text-xs text-neutral-300">4K Ultra HD</span>
        <a href="/download/neon-city" class="rounded-lg bg-indigo-600 px-3 py-1 text-xs font-medium text-white hover:bg-indigo-500">
          Download
        </a>
      </div>
    </div>
  </div>
</div>
```

---

## 4. Performance Checklist

- [ ] Modern image format used (WebP / AVIF).
- [ ] Responsive `srcset` provided for different resolutions (1080p, 2K, 4K, Mobile).
- [ ] Explicit image `width` and `height` set to avoid CLS.
- [ ] CSS and JavaScript minified and bundled.
- [ ] Fonts self-hosted or preconnected with `font-display: swap`.
- [ ] Lazy loading enabled for below-the-fold media (`loading="lazy"`).
- [ ] Fixed dimensions for reserved AdSense ad containers.
