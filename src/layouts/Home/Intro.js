import { Heading } from 'components/Heading';
import { Text } from 'components/Text';
import { Section } from 'components/Section';
import { useAppContext, useScrollToHash } from 'hooks';
import styles from './Intro.module.css';
import sectionStyles from 'components/Section/Section.module.css';

import summerImage from 'assets/summer.png';
import monsoonImage from 'assets/monsoon.png';
import autumnImage from 'assets/autumn.png';
import winterImage from 'assets/winter.png';
import annotationIcon from 'assets/annotationIcon.svg';

import { useState, useRef, useEffect } from 'react';

/* ---------------------------------- */
/* Season Config                      */
/* ---------------------------------- */

const SEASONS = ['summer', 'monsoon', 'autumn', 'winter'];

const SEASON_IMAGES = [summerImage, monsoonImage, autumnImage, winterImage];

/* ---------------------------------- */
/* Intro Component                    */
/* ---------------------------------- */

export function Intro({ id, sectionRef }) {
  const scrollToHash = useScrollToHash();
  const { seasonIndex, dispatch } = useAppContext();

  /* Hover state for cycling */
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  /* Loop seasons while hovering */
  useEffect(() => {
    if (!isHovering) return;

    intervalRef.current = setInterval(() => {
      const current = typeof seasonIndex === 'number' ? seasonIndex : 0;
      const next = (current + 1) % SEASONS.length;
      dispatch({ type: 'setSeason', value: next });
    }, 1200);

    return () => clearInterval(intervalRef.current);
  }, [dispatch, isHovering, seasonIndex]);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = 360;
      const progress = Math.min(window.scrollY / maxScroll, 1);
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeSeasonIndex = typeof seasonIndex === 'number' ? seasonIndex : 0;
  const season = SEASONS[activeSeasonIndex];
  const circleSize = 200 - 136 * scrollProgress;
  const circleTop = 156 - 132 * scrollProgress;
  const circleBorder = 10 - 6 * scrollProgress;

  const handleNavClick = hash => {
    scrollToHash(hash);
  };

  return (
    <Section
      className={`${styles.intro} ${sectionStyles.noPadding}`}
      as="section"
      ref={sectionRef}
      id={id}
    >
      <div className={styles.hero}>
        {/* Gradient background (controlled via data-season) */}
        <div className={styles.gradientLayer} data-season={season}>
          <div className={styles.ellipseOne} />
          <div className={styles.ellipseTwo} />
        </div>

        {/* Top Center Name */}
        <div className={styles.topName}>
          <Heading level={5} as="p">
            Ritu Bhangale
          </Heading>
        </div>

        {/* Left Navigation */}
        <nav className={styles.nav}>
          <button onClick={() => handleNavClick('#intro')}>
            <Text as="m" variant="serif">
              Resume
            </Text>
          </button>
          <button onClick={() => handleNavClick('#project-1')}>
            <Text as="m" variant="serif">
              Projects
            </Text>
          </button>
          <button onClick={() => handleNavClick('#details')}>
            <Text as="m" variant="serif">
              About me
            </Text>
          </button>
        </nav>

        {/* Main Content */}
        <div className={styles.centerContent}>
          <div className={styles.circlePlaceholder} />

          <button
            className={styles.circleFixed}
            aria-label="Go to home hero"
            onClick={() => handleNavClick('#intro')}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{
              '--circleSize': `${circleSize}px`,
              '--circleTop': `${circleTop}px`,
              '--circleBorder': `${circleBorder}px`,
            }}
          >
            <div className={styles.circle}>
              <div
                className={styles.stack}
                style={{
                  transform: `translateY(-${activeSeasonIndex * 20}%)`,
                  transition: 'transform 800ms ease-in-out',
                }}
              >
                {/* Duplicate first image at end for seamless loop */}
                {[...SEASON_IMAGES, SEASON_IMAGES[0]].map((image, i) => (
                  <div className={styles.season} key={i}>
                    <img src={image.src || image} alt={SEASONS[i % SEASONS.length]} />
                  </div>
                ))}
              </div>
            </div>
          </button>

          {/* Headline */}
          <Heading level={0} className={styles.headline}>
            A <em>Designer</em>, who thinks in systems
          </Heading>

          {/* Subtext */}
          <p className={styles.subtext}>
            Currently designing product at ET Money
            <br />· Previously Upstox & Jar
          </p>
        </div>

        {/* Annotation */}
        <p className={styles.annotation}>Blame my CSE degree for this</p>

        {/* Annotation Icon */}
        <div className={styles.annotationIcon}>
          <img src={annotationIcon} alt="" />
        </div>
      </div>
    </Section>
  );
}
