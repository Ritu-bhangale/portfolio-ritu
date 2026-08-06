import { useEffect } from 'react';
import { Meta } from 'components/Meta';
import { CaseStudyHeader, CaseStudySection } from 'components/CaseStudy';
import { trackCaseStudyOpen } from 'utils/analytics';
import styles from './ScratchGlobeShort.module.css';

const TLDR =
  'A 3D scratch-map app for people who travel, even just occasionally, and want to show the world where they have been.';

const META = [
  { label: 'Product Built', value: 'Mobile app' },
  { label: 'Product Builder', value: 'Ritu Bhangale, solo' },
  { label: 'Status', value: 'Currently polishing visuals' },
];

export default function ScratchGlobeShort() {
  useEffect(() => {
    trackCaseStudyOpen('Scratch Globe');
  }, []);

  return (
    <article className={styles.page}>
      <Meta title="Scratch Globe – Ritu Bhangale" description={TLDR} />

      <div className={styles.container}>
        <CaseStudyHeader title="Scratch Globe" tldr={TLDR} meta={META} />

        {/* No hero thumbnail yet. Still being designed. */}

        <div className={styles.sections}>
          <CaseStudySection
            headline="Physical scratch maps, but for people who actually travel."
            description="Scratch maps are a popular physical product: a poster you scratch off place by place as you visit. This is that same feeling, taken digital. You don't need to have travelled a lot to want to say 'I've been here.' Even two or three trips are worth putting on the map."
          />

          <CaseStudySection
            headline="Who it's for"
            description="Travel nomads and the far larger group of people who just travel sometimes, but still like telling the world where they've been. A fun, visual, polish-first app built around that feeling."
          />

          <CaseStudySection
            headline="What's built"
            description={
              <>
                <p>
                  Search for a place, or find it directly on an interactive 3D globe, and
                  stamp it. Each stamp arrives with an AI-suggested thumbnail for that place.
                </p>
                <p>
                  From there you can edit the stamp: add more photos, write down secrets
                  about the place, and mark the route you took getting there.
                </p>
              </>
            }
          />

          <CaseStudySection
            headline="What's next"
            description="Driving engagement. The plan is to let people turn their stamped globe into cool, shareable formats, not just static images but video, built to travel on social media and pull new people into the app."
          />

          <CaseStudySection
            headline="Right now"
            description="The core loop (search, stamp, edit) is built. Current focus is visual polish. The next real problem to solve is the share feature itself: what it should actually contain, and how it should work, product- and UI-wise."
          />
        </div>
      </div>
    </article>
  );
}
