import { Heading } from 'components/Heading';
import { Text } from 'components/Text';
import { Section } from 'components/Section';
import { useScrollToHash } from 'hooks';
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

/* Determine season based on current month */
function getSeasonIndexFromMonth() {
  const month = new Date().getMonth() + 1;

  if (month >= 3 && month <= 6) return 0; // Summer
  if (month >= 7 && month <= 9) return 1; // Monsoon
  if (month >= 10 && month <= 11) return 2; // Autumn
  return 3; // Winter
}

/* ---------------------------------- */
/* Intro Component                    */
/* ---------------------------------- */

export function Intro({ id, sectionRef }) {
  const scrollToHash = useScrollToHash();

  /* Hydration-safe initial state */
  const [seasonIndex, setSeasonIndex] = useState(0);

  /* Hover state for cycling */
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef(null);

  /* Set correct season after mount (avoids hydration mismatch) */
  useEffect(() => {
    setSeasonIndex(getSeasonIndexFromMonth());
  }, []);

  /* Loop seasons while hovering */
  useEffect(() => {
    if (!isHovering) return;

    intervalRef.current = setInterval(() => {
      setSeasonIndex(prev => (prev + 1) % SEASONS.length);
    }, 1200);

    return () => clearInterval(intervalRef.current);
  }, [isHovering]);

  const season = SEASONS[seasonIndex];

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
          <button onClick={() => handleNavClick('#projects')}>
            <Text as="m" variant="serif">
              Projects
            </Text>
          </button>
          <button onClick={() => handleNavClick('#about')}>
            <Text as="m" variant="serif">
              About me
            </Text>
          </button>
        </nav>

        {/* Main Content */}
        <div className={styles.centerContent}>
          {/* Season Image Circle */}
          <div
            className={styles.circle}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div
              className={styles.stack}
              style={{
                transform: `translateY(-${seasonIndex * 20}%)`,
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
