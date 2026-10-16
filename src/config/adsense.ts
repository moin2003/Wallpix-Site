/**
 * WALPIX 4K Google AdSense & Monetization Configuration
 * 
 * During site review & approval phase:
 * - publisherId should remain empty ('') so no fake ads or console errors appear.
 * - Site stays 100% clean, professional, and compliant for Google AdSense Reviewers.
 * 
 * After AdSense approval:
 * - Set PUBLIC_ADSENSE_CLIENT_ID in your environment or replace publisherId with 'ca-pub-XXXXXXXXXXXXXXXX'
 * - All pre-placed high-RPM ad units (Top Leaderboard, In-Feed Native, Bottom Leaderboard) activate automatically!
 */

export const ADSENSE_CONFIG = {
  // Set your real Google AdSense Publisher ID here (e.g. 'ca-pub-1234567890123456')
  publisherId: (import.meta.env.PUBLIC_ADSENSE_CLIENT_ID || '').trim(),

  // Live check: Only active if a real ca-pub ID is configured
  get isLive(): boolean {
    return Boolean(
      this.publisherId &&
      this.publisherId.startsWith('ca-pub-') &&
      !this.publisherId.includes('0000000000000000')
    );
  }
};
