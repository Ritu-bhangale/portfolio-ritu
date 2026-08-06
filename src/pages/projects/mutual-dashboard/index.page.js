import { Meta } from 'components/Meta';
import { StructuredData, caseStudySchema } from 'components/StructuredData';
import MutualDashboardShort from '../../../layouts/CaseStudies/MutualDashboardShort';

const PATH = '/projects/mutual-dashboard';
const TITLE = 'Mutual Funds Dashboard';
const DESCRIPTION =
  'A mutual funds dashboard rebuilt for trust. How ET Money took portfolio accuracy to 99.9% and gave 2M+ investors a holdings view they could actually read.';
const OG_IMAGE = '/og/og-mutual-dashboard.png';

/**
 * The layout also renders a <Meta>. next/head keeps the last keyed tag it
 * sees, so this one is rendered after the layout on purpose: it is the
 * authoritative SEO block for the route (og:image, og:type, canonical), while
 * the layout stays focused on the page content.
 */
export default function MutualDashboardPage() {
  return (
    <>
      <MutualDashboardShort />
      <Meta
        title={TITLE}
        description={DESCRIPTION}
        type="article"
        ogImage={OG_IMAGE}
        ogImageAlt="Two phones showing the redesigned ET Money mutual funds dashboard beside a wax seal reading 99.9% accuracy"
      />
      <StructuredData
        id="case-study-mutual-dashboard"
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
