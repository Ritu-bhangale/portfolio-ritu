import Head from 'next/head';
import {
  AUTHOR_JOB_TITLE,
  AUTHOR_NAME,
  SITE_URL,
  SOCIAL_PROFILES,
  absoluteUrl,
} from 'utils/seo';

/**
 * Renders a JSON-LD block into <head>. Kept deliberately small: a correct
 * minimal schema is worth more to search engines than an elaborate one that
 * describes things the page does not actually contain.
 */
export const StructuredData = ({ id, data }) => (
  <Head>
    <script
      key={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  </Head>
);

/** Person + ProfilePage graph for the home page. */
export const personSchema = ({ description }) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: AUTHOR_NAME,
      url: `${SITE_URL}/`,
      jobTitle: AUTHOR_JOB_TITLE,
      description,
      email: 'mailto:ritusbhangale@gmail.com',
      sameAs: SOCIAL_PROFILES,
      knowsAbout: [
        'Product design',
        'User experience design',
        'Interaction design',
        'Fintech',
        'Information architecture',
        'Design systems',
      ],
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#profilepage`,
      url: `${SITE_URL}/`,
      name: `${AUTHOR_NAME} | ${AUTHOR_JOB_TITLE}`,
      description,
      mainEntity: { '@id': `${SITE_URL}/#person` },
      isPartOf: { '@id': `${SITE_URL}/#website` },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: `${AUTHOR_NAME} | ${AUTHOR_JOB_TITLE}`,
      inLanguage: 'en',
      publisher: { '@id': `${SITE_URL}/#person` },
    },
  ],
});

/** CreativeWork schema for a case study page. */
export const caseStudySchema = ({ path, name, description, image, datePublished }) => {
  const url = absoluteUrl(path);

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${url}#casestudy`,
    url,
    name,
    headline: name,
    description,
    inLanguage: 'en',
    ...(image && { image: image.startsWith('http') ? image : `${SITE_URL}${image}` }),
    ...(datePublished && { datePublished }),
    author: { '@id': `${SITE_URL}/#person` },
    creator: { '@id': `${SITE_URL}/#person` },
    genre: 'Product design case study',
    isPartOf: { '@id': `${SITE_URL}/#website` },
  };
};
