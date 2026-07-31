import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { useRef } from 'react';
import { CSE } from './CSE';
import { FunSection } from './FunSection';
import { Hero } from './Hero';
import { Projects } from './Projects';
// import { Teaser } from './Teaser'; // PAUSED — Design gallery section, off for now
import { useScrollTracking } from 'hooks/useScrollTracking';
import styles from './Home.module.css';

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
      <Meta
        title="Product Designer"
        description="Ritu Bhangale, a product designer solving trust, accuracy, and discovery problems. Two years in Indian fintech: portfolio dashboards, investment flows, and product discovery at scale."
      />

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
