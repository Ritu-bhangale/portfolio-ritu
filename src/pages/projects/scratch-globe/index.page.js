import { Meta } from 'components/Meta';
import { StructuredData, caseStudySchema } from 'components/StructuredData';
import ScratchGlobeShort from '../../../layouts/CaseStudies/ScratchGlobeShort';

const PATH = '/projects/scratch-globe';
const TITLE = 'Scratch Globe';
const DESCRIPTION =
  'A 3D scratch-map app for people who travel, even just occasionally, and want to show the world where they have been. Currently in progress.';

/**
 * The layout also renders a <Meta>. next/head keeps the last keyed tag it
 * sees, so this one is rendered after the layout on purpose: it is the
 * authoritative SEO block for the route, while the layout stays focused on
 * the page content. No ogImage yet: no thumbnail exists for this project
 * until it's designed, so this omits `ogImage` rather than pointing at a
 * placeholder.
 */
export default function ScratchGlobePage() {
  return (
    <>
      <ScratchGlobeShort />
      <Meta title={TITLE} description={DESCRIPTION} type="article" />
      <StructuredData
        id="case-study-scratch-globe"
        data={caseStudySchema({
          path: PATH,
          name: `${TITLE}, Ritu Bhangale`,
          description: DESCRIPTION,
        })}
      />
    </>
  );
}
