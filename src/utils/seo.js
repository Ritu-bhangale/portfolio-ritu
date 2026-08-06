/**
 * Shared SEO constants and URL helpers.
 *
 * TODO: confirm the production domain. `NEXT_PUBLIC_WEBSITE_URL` in `.env` is
 * currently the Vercel preview domain (https://portfolio-rits.vercel.app/). If
 * the site ships on a custom domain, update that env var and everything below
 * (canonicals, og:url, sitemap.xml, robots.txt) follows automatically.
 */

const RAW_SITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://portfolio-rits.vercel.app';

/** Site origin with any trailing slashes removed, so joins never double up. */
export const SITE_URL = RAW_SITE_URL.replace(/\/+$/, '');

export const AUTHOR_NAME = 'Ritu Bhangale';
export const AUTHOR_JOB_TITLE = 'Product Designer';

export const SOCIAL_PROFILES = [
  'https://www.linkedin.com/in/ritubhangale/',
  'https://github.com/Ritu-bhangale/',
  'https://www.behance.net/ritu-bhangale',
];

/**
 * Turn a Next.js route/asPath into an absolute, canonical URL.
 *
 * `next.config.js` sets `trailingSlash: true`, so canonical URLs keep the
 * trailing slash to match what the exported static site actually serves.
 * Query strings and hashes are stripped, they never identify a distinct page
 * here and would otherwise split ranking signals across duplicate URLs.
 */
export function absoluteUrl(path = '/') {
  const cleanPath = String(path).split('?')[0].split('#')[0];
  const withLeadingSlash = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  const withTrailingSlash = withLeadingSlash.endsWith('/')
    ? withLeadingSlash
    : `${withLeadingSlash}/`;

  return `${SITE_URL}${withTrailingSlash}`;
}
