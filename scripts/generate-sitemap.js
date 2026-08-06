const fs = require('fs');

// TODO: confirm the production domain. This mirrors `NEXT_PUBLIC_WEBSITE_URL`
// in `.env`, which is currently the Vercel deployment URL. Update that one env
// var and the sitemap, robots.txt, canonicals and og:url all follow.
const SITE_URL = (process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://portfolio-rits.vercel.app')
  .trim()
  .replace(/\/+$/, '');

// `next.config.js` sets `trailingSlash: true`, so every exported route is
// served with a trailing slash. The sitemap has to match or search engines see
// a redirect on every entry.
function routeFromPageFile(file) {
  const route = file
    .replace(/^src\/pages/, '')
    .replace(/\.page\.(js|mdx)$/, '')
    .replace(/\/index$/, '');

  // Skip dynamic routes and the 404 page, neither belongs in a sitemap.
  if (route.includes('[') || route.includes('404')) return null;

  return route === '' ? '/' : `${route}/`;
}

function urlEntry(route, lastmod) {
  return `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
  </url>`;
}

function generateRobots() {
  const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

  fs.writeFileSync('public/robots.txt', robots);
}

async function generateSitemap() {
  const { globby } = await import('globby');

  // Ignore Next.js internals (_app, _document) and API routes.
  const pages = await globby([
    'src/pages/**/*{.page.js,.page.mdx}',
    '!src/pages/_*.page.js',
    '!src/pages/api',
  ]);

  // NOTE: `src/posts/*.mdx` used to be listed here as `/articles/<slug>`, but
  // there is no `/articles` route in `src/pages`, so those URLs 404. They stay
  // out of the sitemap until an articles route actually ships.

  const routes = [...new Set(pages.map(routeFromPageFile).filter(Boolean))].sort(
    (a, b) => a.length - b.length || a.localeCompare(b)
  );

  const lastmod = new Date().toISOString().split('T')[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => urlEntry(route, lastmod)).join('\n')}
</urlset>
`;

  fs.writeFileSync('public/sitemap.xml', sitemap);
  generateRobots();
}

generateSitemap();
