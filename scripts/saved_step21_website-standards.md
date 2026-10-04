# Website Development & Quality Standards

When developing or modifying code in this workspace, strictly adhere to these standards:

1. **Performance First**:
   - All preview images and wallpapers must be compressed in WebP/AVIF format.
   - Initial page payload (HTML + CSS + critical JS) must be under 300 KB.
   - All dynamic image components must include `width`, `height`, and `loading="lazy"` attributes.

2. **Mobile-First Responsiveness**:
   - Test layout breakpoints: Mobile (360px, 390px, 412px), Tablet (768px, 820px), Desktop (1024px, 1440px, 1920px).
   - Touch targets for download buttons, category chips, and menu items must be at least 44x44px.

3. **SEO & Accessibility**:
   - Every page must have unique `<title>`, `<meta name="description">`, and canonical URL.
   - Semantic HTML5 structure with one `<h1>` per page.
   - `alt` text is mandatory on all `<img>` tags.

4. **Monetization & Ad Protection**:
   - Ad containers must have fixed minimum heights (`min-h-[250px]` or `min-h-[90px]`) to prevent Cumulative Layout Shift (CLS).
   - Do not place ads directly adjacent to primary CTA buttons without a 25px gap.
