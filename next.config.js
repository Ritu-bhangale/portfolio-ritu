module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  pageExtensions: ['page.js', 'api.js'],
  webpack(config, { isServer, dev }) {
    // Run custom scripts
    if (isServer) {
      require('./scripts/generate-sitemap');
    }

    // Use in-memory cache in dev to avoid ENOENT .pack race on rapid edits
    if (dev) {
      config.cache = { type: 'memory' };
    }

    // Import `svg` files as React components
    config.module.rules.push({
      test: /\.svg$/,
      resourceQuery: { not: [/url/] },
      use: [{ loader: '@svgr/webpack', options: { svgo: false } }],
    });

    // Import videos and fonts
    config.module.rules.push({
      test: /\.(mp4|woff|woff2)$/i,
      type: 'asset/resource',
    });

    // Force url import with `?url`
    config.module.rules.push({
      resourceQuery: /url/,
      type: 'asset/resource',
    });

    return config;
  },
};
