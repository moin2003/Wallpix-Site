---
name: adsense-monetization
description: >-
  Plan, implement, and optimize Google AdSense monetization, high-RPM ad layouts,
  ads.txt configuration, policy compliance, and consent management (GDPR/CPRA).
  Use when adding AdSense code, setting up ad containers, configuring ads.txt, optimizing CTR/RPM, or preparing a site for AdSense approval.
---

# Google AdSense & Monetization Skill

This skill provides complete guidelines, layout blueprints, policy compliance rules, and code implementations for monetizing a website with Google AdSense while maintaining user experience and high Core Web Vitals.

---

## 1. AdSense Approval Prerequisites

Before applying for Google AdSense, the site MUST have:
1. **Mandatory Compliance Pages**:
   - `/privacy-policy` (Must mention Google AdSense, cookies, DoubleClick DART cookies, third-party vendors).
   - `/terms-of-service` (Usage terms, copyright/DMCA).
   - `/about-us` (Genuine description of the site and editorial mission).
   - `/contact-us` (Working email or contact form).
   - `/dmca-policy` (Essential for wallpaper/image websites with takedown process).
2. **Sufficient High-Quality Content**:
   - Minimum 25-30 well-written articles / organized wallpaper collections with descriptive text (avoid thin content / image-only without descriptions).
3. **Clean Navigation**:
   - Clear header navigation, categories, search bar, and footer links.
4. **Site Age & Indexing**:
   - All main URLs indexed in Google Search Console.

---

## 2. Setting Up `ads.txt`

Place `ads.txt` in the root public directory (e.g., `public/ads.txt` or root web directory):

```text
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```
*(Replace `pub-XXXXXXXXXXXXXXXX` with your publisher ID)*

---

## 3. Ad Placement Architecture (High RPM & Zero CLS)

To avoid Cumulative Layout Shift (CLS) penalties and accidental click policy strikes, always wrap ad units in pre-sized containers.

### A. Responsive Header Ad (Leaderboard: 728x90 / 320x50):
```html
<div class="ad-container my-4 flex justify-center overflow-hidden">
  <div class="min-h-[90px] min-w-[320px] md:min-w-[728px] bg-neutral-100 dark:bg-neutral-800 text-center flex items-center justify-center">
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
         data-ad-slot="1234567890"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
  </div>
</div>
```

### B. In-Gallery Native Ad Card (Blended every 8-12 wallpaper items):
```html
<div class="wallpaper-card ad-card aspect-[9/16] rounded-2xl bg-neutral-900 border border-neutral-800 p-2 flex flex-col justify-between items-center text-center">
  <span class="text-[10px] text-neutral-500 uppercase tracking-widest self-start">Advertisement</span>
  <div class="w-full flex-1 flex items-center justify-center">
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
         data-ad-slot="9876543210"
         data-ad-format="fluid"
         data-ad-layout-key="-fg+5n+6u-e7+r"></ins>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
  </div>
  <span class="text-xs text-neutral-400">Sponsored Content</span>
</div>
```

### C. Sticky Mobile Bottom Anchor Ad:
Enable **Auto Ads** -> **Anchor Ads** in your Google AdSense dashboard, or use sticky bottom container with a close button and reserved height.

---

## 4. Policy Compliance (Critical Rules to Prevent Account Bans)

1. **No False Encouragement**: Never write "Click our ads to support us", "Check out our sponsors", or draw arrows pointing to ads.
2. **Clear Spacing from Download Buttons**: Keep a minimum of **25-30px** spacing between AdSense banners and wallpaper "Download" or "Action" buttons to prevent accidental clicks.
3. **Content-to-Ad Ratio**: Ensure original content occupies at least 65-70% of screen real estate. Never show more ads than content.
4. **GDPR / Privacy Consent**: Integrate Google CMP (Consent Management Platform) via Google AdSense "Privacy & Messaging" tab for European & California visitors.

---

## 5. AdSense Monetization Checklist

- [ ] `ads.txt` uploaded and validated at `https://yourdomain.com/ads.txt`.
- [ ] Essential 5 pages live and linked in footer (Privacy, Terms, About, Contact, DMCA).
- [ ] Ad slots containerized with CSS `min-height` to prevent CLS layout shifts.
- [ ] Download buttons separated with safe margin from ad units.
- [ ] Google CMP / Cookie consent banner enabled.
- [ ] High-paying niches / keyword tags targeted in wallpaper collection titles.
