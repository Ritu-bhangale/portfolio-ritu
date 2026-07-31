import Head from 'next/head';
import { createContext } from 'react';
import { media } from 'utils/style';
import { theme, tokens } from './theme';

export const ThemeContext = createContext({});

export const ThemeProvider = ({
  theme: themeOverrides,
  children,
}) => {
  const currentTheme = { ...theme, ...themeOverrides };

  return (
    <ThemeContext.Provider value={currentTheme}>
      <Head>
        <meta name="theme-color" content={`rgb(${currentTheme.rgbBackground})`} />
      </Head>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Squeeze out spaces and newlines
 */
export function squish(styles) {
  return styles.replace(/\s\s+/g, ' ');
}

/**
 * Transform theme token objects into CSS custom property strings
 */
export function createThemeProperties(theme) {
  return squish(
    Object.keys(theme)
      .map(key => `--${key}: ${theme[key]};`)
      .join('\n\n')
  );
}

/**
 * Transform theme tokens into a React CSSProperties object
 */
export function createThemeStyleObject(theme) {
  let style = {};

  for (const key of Object.keys(theme)) {
    style[`--${key}`] = theme[key];
  }

  return style;
}

/**
 * Generate media queries for tokens
 */
export function createMediaTokenProperties() {
  return squish(
    Object.keys(media)
      .map(key => {
        return `
        @media (max-width: ${media[key]}px) {
          :root {
            ${createThemeProperties(tokens[key])}
          }
        }
      `;
      })
      .join('\n')
  );
}

export const tokenStyles = squish(`
  :root {
    ${createThemeProperties(tokens.base)}
  }

  ${createMediaTokenProperties()}
  
  :root {
    ${createThemeProperties(theme)}
  }
`);
