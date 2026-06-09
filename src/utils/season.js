import summerFooter from 'assets/home/summer-footer.png';

// Season order is shared with useSeasonalHoverEffect + the App reducer's
// seasonIndex: 0 summer · 1 monsoon · 2 autumn · 3 winter.
export const SEASON_NAMES = ['summer', 'monsoon', 'autumn', 'winter'];

/**
 * Month → season index. Kept identical to the mapping in _app so server
 * (_document) and client agree on the active season.
 *   Mar–Jun → summer · Jul–Sep → monsoon · Oct–Nov → autumn · else winter
 */
export function getSeasonIndex(date = new Date()) {
  const month = date.getMonth() + 1;
  if (month >= 3 && month <= 6) return 0;
  if (month >= 7 && month <= 9) return 1;
  if (month >= 10 && month <= 11) return 2;
  return 3;
}

// ─── Per-season theme ──────────────────────────────────────────────────────────
// Only summer is fully designed for now. Other seasons fall back to summer so the
// site never breaks — fill these in as each season gets its palette + assets.

const summer = {
  name: 'summer',
  // global accent (CSS --rgbAccent) — Summer/blue/1 #0065D8
  accent: '0 101 216',
  // hero text-reveal trail: FEB403 → FFFDEE → 0065D8
  gradient: {
    from: [254, 180, 3], // Summer/yellow/2  #FEB403
    mid: [255, 253, 238], // #FFFDEE
    to: [0, 101, 216], // Summer/blue/1   #0065D8
    midStop: 0.36,
  },
  footerImage: summerFooter,
  footerTagline: 'Something felt interesting?',
  footerCta: 'Get in touch',
  label: 'Summer',
  glyph: 'ऋतु',
};

const seasonThemes = [summer, summer, summer, summer];

export function getSeasonTheme(seasonIndex) {
  return seasonThemes[seasonIndex ?? 0] || summer;
}

export function getCurrentSeasonTheme(date = new Date()) {
  return getSeasonTheme(getSeasonIndex(date));
}
