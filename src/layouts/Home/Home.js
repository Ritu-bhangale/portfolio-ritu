import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { StructuredData, personSchema } from 'components/StructuredData';
import { useRef } from 'react';
import { CSE } from './CSE';
import { FunSection } from './FunSection';
import { Hero } from './Hero';
import { Projects } from './Projects';
// import { Teaser } from './Teaser'; // PAUSED — Design gallery section, off for now
import { useScrollTracking } from 'hooks/useScrollTracking';
import styles from './Home.module.css';

const DESCRIPTION =
  'Ritu Bhangale, product designer in Indian fintech. Case studies on portfolio dashboards, investment flows, and product discovery for millions of investors.';
const OG_IMAGE_ALT =
  'Ritu Bhangale, product designer, portfolio site preview with a potted plant';

export const Home = () => {
  const introRef = useRef();
  const projectsRef = useRef();
  const cseRef = useRef();
  const funRef = useRef();

  // Track when user scrolls to sections
  useScrollTracking(cseRef, 'CSE Section');
  useScrollTracking(funRef, 'Fun Section');

  return (
    <>
      <Meta title="Product Designer" description={DESCRIPTION} ogImageAlt={OG_IMAGE_ALT} />
      <StructuredData id="person" data={personSchema({ description: DESCRIPTION })} />

      <div className={styles.pageLayer}>
        <Hero id="intro" sectionRef={introRef} />
        <Projects id="projects" sectionRef={projectsRef} />
        {/* <Teaser /> PAUSED — Design gallery section, off for now */}
        <CSE id="cse" sectionRef={cseRef} />
        <FunSection id="fun" sectionRef={funRef} />
      </div>
      <Footer className={styles.footer} />
    </>
  );
};
