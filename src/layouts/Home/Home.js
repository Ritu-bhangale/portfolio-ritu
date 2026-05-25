import { Footer } from 'components/Footer';
import { Heading } from 'components/Heading';
import { Meta } from 'components/Meta';
import { useRef } from 'react';
import { Hero } from './Hero';
import { ProjectShowcase } from './ProjectShowcase';
// import { CSProjects } from './CSProjects';
import { AboutMe } from './AboutMe';
import { LifeGallery } from './LifeGallery';
import { ExploreShowcase } from 'components/ExploreShowcase';
import HomePagescroll from 'assets/home/HomePagescroll.png';
import HomeReview1 from 'assets/home/Review1.png';
import HomeReview2 from 'assets/home/Review2.png';
import HomeReview3 from 'assets/home/Review3.png';
import HomeReview4 from 'assets/home/Review4.png';
import HomeReview5 from 'assets/home/Review5.png';
import mfDashboardThumbnail from 'assets/home/MFDashboardThumbnail.png';
import mfDashboardThumbnailMobile from 'assets/home/MFDashboardThumbnailMobile.png';
import fdOrderformThumbnail from 'assets/home/FDOrderform.png';
import fdOrderformThumbnailMobile from 'assets/home/FDOrderFormMobile.png';
import styles from './Home.module.css';
import showcaseStyles from './ProjectShowcase.module.css';

const exploreReviewCards = [
  { id: 'review-1', src: HomeReview1, alt: 'User review 1' },
  { id: 'review-2', src: HomeReview2, alt: 'User review 2' },
  { id: 'review-3', src: HomeReview3, alt: 'User review 3' },
  { id: 'review-4', src: HomeReview4, alt: 'User review 4' },
  { id: 'review-5', src: HomeReview5, alt: 'User review 5' },
];

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

      <Heading
        level={3}
        align="center"
        as="h3"
        id="selected-work"
        className={styles.sectionHeading}
      >
        Selected work
      </Heading>

      <div className={styles.scrollShowcaseWrap} data-scroll-showcase>
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
          <ExploreShowcase
            screenshotSrc={HomePagescroll}
            reviewCards={exploreReviewCards}
          />
        </ProjectShowcase>
      </div>

      <ProjectShowcase
        index={2}
        tags={[{ label: 'Dashboard' }, { label: 'Mutual funds' }]}
        title="Designing how Mutual funds investors see there wealth"
        description="Improved portfolio data reliability by redesigning holdings architecture to reduce preprocessing dependency, enabling ~99.9% portfolio accuracy."
        buttonHref="/projects/mutual-dashboard"
        backgroundColor="#FFFFF6"
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
        <Heading
          level={2}
          align="center"
          as="h2"
          id="selected-work"
          className={styles.sectionHeading}
        >
          About me
        </Heading>
        <AboutMe id="about-me" sectionRef={aboutRef} />
        <Heading
          level={2}
          align="center"
          as="h2"
          id="selected-work"
          className={styles.sectionHeading}
        >
          What my life looks like, <br/> outside design
        </Heading>
        <LifeGallery id="life-gallery" sectionRef={galleryRef} />
        <Footer />
      </div>
    </div>
  );
};
