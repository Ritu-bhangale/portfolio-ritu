import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { useRef } from 'react';
import { CSE } from './CSE';
import { Hero } from './Hero';
import { Projects } from './Projects';
import styles from './Home.module.css';

export const Home = () => {
  const introRef = useRef();
  const projectsRef = useRef();
  const cseRef = useRef();

  return (
    <>
      <Meta
        title="Product Designer"
        description="Ritu Bhangale — a product designer solving trust, accuracy, and discovery problems. Two years in Indian fintech: portfolio dashboards, investment flows, and product discovery at scale."
      />

      {/* top layer — scrolls up over the fixed footer underneath (popcorn-style) */}
      <div className={styles.pageLayer}>
        <Hero id="intro" sectionRef={introRef} />
        <Projects id="projects" sectionRef={projectsRef} />
        <CSE id="cse" sectionRef={cseRef} />
      </div>

      <Footer reveal />
    </>
  );
};
