import { pxToRem } from 'utils/style';

// Full list of tokens
const baseTokens = {
  rgbBlack: '0 0 0',
  rgbWhite: '255 255 255',
  bezierFastoutSlowin: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  durationXS: '200ms',
  durationS: '300ms',
  durationM: '400ms',
  durationL: '600ms',
  durationXL: '800ms',
  systemFontStack:
    'system-ui, -apple-system, BlinkMacSystemFont, San Francisco, Roboto, Segoe UI, Ubuntu, Helvetica Neue, sans-serif',
  fontStack: `'Season Sans', var(--systemFontStack)`,
  serifFontStack: `'Season Serif', Georgia, serif`,
  monoFontStack:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
  japaneseFontStack:
    'ヒラギノ角ゴ Pro W3, Hiragino Kaku Gothic Pro, Hiragino Sans, Osaka, メイリオ, Meiryo, Segoe UI, sans-serif',
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  fontSizeH0: pxToRem(96),
  fontSizeH1: pxToRem(72),
  fontSizeH2: pxToRem(48),
  fontSizeH3: pxToRem(40),
  fontSizeH4: pxToRem(32),
  fontSizeH5: pxToRem(24),
  fontSizeH6: pxToRem(28),
  fontSizeBodyXL: pxToRem(24),
  fontSizeBodyL: pxToRem(24),
  fontSizeBodyM: pxToRem(20),
  fontSizeBodyS: pxToRem(14),
  fontSizeBodyXS: pxToRem(12),
  lineHeightTitle: '1.5',
  lineHeightTitleTight: '1.25',
  lineHeightBody: '1.5', // 150%
  maxWidthS: '540px',
  maxWidthM: '720px',
  maxWidthL: '1096px',
  maxWidthXL: '1680px',
  spaceOuter: '240px',
  spaceXS: '4px',
  spaceS: '8px',
  spaceM: '12px',
  spaceL: '24px',
  spaceXL: '32px',
  space2XL: '48px',
  space3XL: '60px',
  space4XL: '120px',
  space5XL: '240px',
  zIndex0: 0,
  zIndex1: 4,
  zIndex2: 8,
  zIndex3: 16,
  zIndex4: 32,
  zIndex5: 64,
};

// Tokens that change based on viewport size
const tokensDesktop = {
  fontSizeH0: pxToRem(120),
  fontSizeH1: pxToRem(80),
};

const tokensLaptop = {
  maxWidthS: '480px',
  maxWidthM: '640px',
  maxWidthL: '812px',
  maxWidthXL: '1248px',
  spaceOuter: '48px',
  fontSizeH0: pxToRem(100),
  fontSizeH1: pxToRem(70),
  fontSizeH2: pxToRem(50),
  fontSizeH3: pxToRem(36),
  fontSizeH4: pxToRem(26),
  fontSizeH5: pxToRem(22),
};

const tokensTablet = {
  fontSizeH0: pxToRem(80),
  fontSizeH1: pxToRem(60),
  fontSizeH2: pxToRem(48),
  fontSizeH3: pxToRem(32),
  fontSizeH4: pxToRem(24),
  fontSizeH5: pxToRem(20),
};

const tokensMobile = {
  spaceOuter: '24px',
  fontSizeH0: pxToRem(56),
  fontSizeH1: pxToRem(40),
  fontSizeH2: pxToRem(34),
  fontSizeH3: pxToRem(28),
  fontSizeH4: pxToRem(22),
  fontSizeH5: pxToRem(18),
  fontSizeBodyL: pxToRem(17),
  fontSizeBodyM: pxToRem(16),
  fontSizeBodyS: pxToRem(14),
};

const tokensMobileSmall = {
  spaceOuter: '16px',
  fontSizeH0: pxToRem(42),
  fontSizeH1: pxToRem(38),
  fontSizeH2: pxToRem(28),
  fontSizeH3: pxToRem(24),
  fontSizeH4: pxToRem(20),
};

const theme = {
  /* Backgrounds */
  rgbBackground: '255 255 254', // #FFFFFE (bg-1)
  rgbBackgroundAlt: '245 245 245', // #F5F5F5 (bg-2)

  /* Text */
  rgbTextPrimary: '15 15 15', // #0F0F0F
  rgbTextSecondary: '77 77 77', // #4D4D4D
  rgbTextTertiary: '253 253 253', // #FDFDFD (only if needed)

  /* Stroke */
  rgbStroke: '222 222 222', // #DEDEDE

  /* Primary & Accent */
  rgbPrimary: '15 15 15', // #0f0f0f (black for buttons)
  rgbJar: '83 10 192',
  rgbError: '255 0 60',

  /* Derived CSS vars */
  colorTextTitle: 'rgb(var(--rgbTextPrimary) / 1)',
  colorTextBody: 'rgb(var(--rgbTextPrimary) / 1)',
  colorTextMuted: 'rgb(var(--rgbTextSecondary) / 1)',
  colorTextLight: 'rgb(var(--rgbTextSecondary) / 1)',
  colorStroke: 'rgb(var(--rgbStroke) / 1)',
  rgbText: '15 15 15',
  rgbBackgroundLight: '245 245 245',

  rgbAccent: '0 229 255', // keep or update later
};

export const tokens = {
  base: baseTokens,
  desktop: tokensDesktop,
  laptop: tokensLaptop,
  tablet: tokensTablet,
  mobile: tokensMobile,
  mobileS: tokensMobileSmall,
};

export { theme };
