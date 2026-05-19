import { Footer } from 'components/Footer';
import { Heading } from 'components/Heading';
import { Meta } from 'components/Meta';
import { useRef } from 'react';
import { Hero } from './Hero';
import { ProjectShowcase } from './ProjectShowcase';
// import { CSProjects } from './CSProjects';
// import { AboutMe } from './AboutMe';
// import { LifeGallery } from './LifeGallery';
import exploreThumbnail from 'assets/home/ExploreThumbnail.png';
import exploreThumbnailMobile from 'assets/home/ExploreThumbnailMobile.png';
import mfDashboardThumbnail from 'assets/home/MFDashboardThumbnail.png';
import mfDashboardThumbnailMobile from 'assets/home/MFDashboardThumbnailMobile.png';
import fdOrderformThumbnail from 'assets/home/FDOrderform.png';
import fdOrderformThumbnailMobile from 'assets/home/FDOrderFormMobile.png';
import styles from './Home.module.css';
import showcaseStyles from './ProjectShowcase.module.css';

export const Home = () => {
  const introRef = useRef();
  const aboutRef = useRef();
  const galleryRef = useRef();

  return (
    <div className={styles.home}>
      <Meta
        title="Product Designer"
        description="Design portfolio of Ritu Bhangale - Product designer crafting thoughtful product experiences at ET Money. Previously Upstox & Jar."
      />
      <Hero id="intro" sectionRef={introRef} />

      <Heading level={4} align="center" as="h2" id="selected-work" className={styles.sectionHeading}>
        Selected work
      </Heading>

      <ProjectShowcase
        index={1}
        tags={[
          { label: 'Business shift' },
          { label: 'NPS score' },
          { label: 'User satisfaction', accent: '#34a853' },
        ]}
        title="Re-architecting how 10M+ Investors Discover Wealth"
        description="Re-architected the app navigation and rebuilt the App Home to scale with a distribution-first business model and improve product discovery."
        buttonHref="/projects/etmoney-home"
        backgroundColor="#F4FFF9"
      >
        <img
          src={exploreThumbnail?.src || exploreThumbnail}
          alt="ET Money Explore redesign"
          className={`${showcaseStyles.thumbnail} ${showcaseStyles.thumbnailDesktop}`}
        />
        <img
          src={exploreThumbnailMobile?.src || exploreThumbnailMobile}
          alt="ET Money Explore redesign"
          className={`${showcaseStyles.thumbnail} ${showcaseStyles.thumbnailMobile}`}
        />
      </ProjectShowcase>

      <ProjectShowcase
        index={2}
        tags={[{ label: 'Dashboard' }, { label: 'Mutual funds' }]}
        title="Designing how Mutual funds investors see there wealth"
        description="Improved portfolio data reliability by redesigning holdings architecture to reduce preprocessing dependency, enabling ~99.9% portfolio accuracy."
        buttonHref="/projects/etmoney-home"
        backgroundColor="#FFFFF6"
        wip
      >
        <img
          src={mfDashboardThumbnail?.src || mfDashboardThumbnail}
          alt="Mutual Funds dashboard redesign"
          className={`${showcaseStyles.thumbnail} ${showcaseStyles.thumbnailDesktop}`}
        />
        <img
          src={mfDashboardThumbnailMobile?.src || mfDashboardThumbnailMobile}
          alt="Mutual Funds dashboard redesign"
          className={`${showcaseStyles.thumbnail} ${showcaseStyles.thumbnailMobile}`}
        />
      </ProjectShowcase>

      <ProjectShowcase
        index={3}
        tags={[{ label: 'Flow optimization' }]}
        title="Fixed Deposits order form"
        description="With 95% of Indians favoring FDs, this project streamlined the booking process to make it faster and more user-friendly."
        buttonHref="https://portfolio-rits.framer.website/fd-upstox"
        backgroundColor="#F9F8FF"
      >
        <img
          src={fdOrderformThumbnail?.src || fdOrderformThumbnail}
          alt="Fixed Deposits order form"
          className={`${showcaseStyles.thumbnail} ${showcaseStyles.thumbnailDesktop}`}
        />
        <img
          src={fdOrderformThumbnailMobile?.src || fdOrderformThumbnailMobile}
          alt="Fixed Deposits order form"
          className={`${showcaseStyles.thumbnail} ${showcaseStyles.thumbnailMobile}`}
        />
      </ProjectShowcase>

      <div className={styles.restOfPage}>
        {/* <CSProjects id="cs-projects" /> */}
        {/* <AboutMe id="about-me" sectionRef={aboutRef} /> */}
        {/* <LifeGallery id="life-gallery" sectionRef={galleryRef} /> */}
        {/* <Footer /> */}
      </div>
    </div>
  );
};
