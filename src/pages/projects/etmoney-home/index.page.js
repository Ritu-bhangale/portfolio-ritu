import { Meta } from 'components/Meta';
import { StructuredData, caseStudySchema } from 'components/StructuredData';
import EtMoneyHomeShort from '../../../layouts/CaseStudies/EtMoneyHomeShort';

const PATH = '/projects/etmoney-home';
const TITLE = 'ET Money Home Redesign';
const DESCRIPTION =
  'An information architecture redesign of the ET Money home screen, fixing how 10M+ investors discover FDs, Bonds, NPS, and Stocks after a subscription shift.';
const OG_IMAGE = '/og/og-etmoney-home.png';

/**
 * The layout also renders a <Meta>. next/head keeps the last keyed tag it
 * sees, so this one is rendered after the layout on purpose: it is the
 * authoritative SEO block for the route (og:image, og:type, canonical), while
 * the layout stays focused on the page content.
 */
export default function EtMoneyHomePage() {
  return (
    <>
      <EtMoneyHomeShort />
      <Meta
        title={TITLE}
        description={DESCRIPTION}
        type="article"
        ogImage={OG_IMAGE}
        ogImageAlt="The redesigned ET Money home screen on a phone, over a dark green cover"
      />
      <StructuredData
        id="case-study-etmoney-home"
        data={caseStudySchema({
          path: PATH,
          name: `${TITLE}, ET Money`,
          description: DESCRIPTION,
          image: OG_IMAGE,
        })}
      />
    </>
  );
}
