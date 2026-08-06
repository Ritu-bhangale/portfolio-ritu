import Head from 'next/head';
import { useRouter } from 'next/router';
import { AUTHOR_NAME, SITE_URL, absoluteUrl } from 'utils/seo';

const DEFAULT_OG_IMAGE = `${SITE_URL}/og/og-default.png`;
const DEFAULT_OG_IMAGE_ALT =
  'Ritu Bhangale, product designer, portfolio site preview';

/**
 * Pages sometimes pass a title that already ends in the site name, e.g.
 * "Mutual Funds Dashboard - Ritu Bhangale". Strip that so the prefix does not
 * render the name twice in one <title>.
 */
function stripTrailingSiteName(title) {
  if (!title) return title;

  return String(title)
    .replace(/\s*[|–—-]\s*Ritu Bhangale\s*$/i, '')
    .trim();
}

export const Meta = ({
  title,
  description,
  prefix = AUTHOR_NAME,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt = DEFAULT_OG_IMAGE_ALT,
  type = 'website',
  noIndex = false,
}) => {
  const router = useRouter();
  const titleText = [prefix, stripTrailingSiteName(title)].filter(Boolean).join(' | ');
  const url = absoluteUrl(router?.asPath || '/');
  const imageUrl = ogImage?.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;

  return (
    <Head>
      <title key="title">{titleText}</title>
      <meta key="description" name="description" content={description} />
      <meta key="author" name="author" content={AUTHOR_NAME} />
      <meta
        key="robots"
        name="robots"
        content={noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}
      />
      <link key="canonical" rel="canonical" href={url} />

      <meta key="og:image" property="og:image" content={imageUrl} />
      <meta key="og:image:alt" property="og:image:alt" content={ogImageAlt} />
      <meta key="og:image:type" property="og:image:type" content="image/png" />
      <meta key="og:image:width" property="og:image:width" content="1200" />
      <meta key="og:image:height" property="og:image:height" content="630" />

      <meta key="og:title" property="og:title" content={titleText} />
      <meta key="og:site_name" property="og:site_name" content={AUTHOR_NAME} />
      <meta key="og:type" property="og:type" content={type} />
      <meta key="og:locale" property="og:locale" content="en_US" />
      <meta key="og:url" property="og:url" content={url} />
      <meta key="og:description" property="og:description" content={description} />

      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter:title" name="twitter:title" content={titleText} />
      <meta key="twitter:description" name="twitter:description" content={description} />
      <meta key="twitter:image" name="twitter:image" content={imageUrl} />
      <meta key="twitter:image:alt" name="twitter:image:alt" content={ogImageAlt} />
    </Head>
  );
};
