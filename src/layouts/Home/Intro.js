import { Heading } from 'components/Heading';
import { Section } from 'components/Section';
import { useScrollToHash } from 'hooks';
import styles from './Intro.module.css';

import summerImage from 'assets/summer.png';
import monsoonImage from 'assets/monsoon.png';
import autumnImage from 'assets/autumn.png';
import winterImage from 'assets/winter.png';
import annotationIcon from 'assets/annotationIcon.svg';

import { useState, useRef, useEffect } from 'react';

const SEASONS = ['summer', 'monsoon', 'autumn', 'winter'];

const SEASON_IMAGES = [summerImage, monsoonImage, autumnImage, winterImage];

function getSeasonIndexFromMonth() {
  const month = new Date().getMonth() + 1;

  if (month >= 3 && month <= 6) return 0; // summer
  if (month >= 7 && month <= 9) return 1; // monsoon
  if (month >= 10 && month <= 11) return 2; // autumn
  return 3; // winter
}

export function Intro({ id, sectionRef }) {
  const scrollToHash = useScrollToHash();

  const handleNavClick = hash => {
    scrollToHash(hash);
  };

  const [seasonIndex, setSeasonIndex] = useState(getSeasonIndexFromMonth());

  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef(null);

  // Loop cycling logic
  useEffect(() => {
    if (!isHovering) return;

    intervalRef.current = setInterval(() => {
      setSeasonIndex(prev => (prev + 1) % SEASONS.length);
    }, 1200);

    return () => clearInterval(intervalRef.current);
  }, [isHovering]);

  const season = SEASONS[seasonIndex];

  return (
    <Section className={styles.intro} as="section" ref={sectionRef} id={id}>
      <div className={styles.hero}>
        {/* Gradient Layer */}
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
          <button onClick={() => handleNavClick('#intro')}>Resume</button>
          <button onClick={() => handleNavClick('#projects')}>Projects</button>
          <button onClick={() => handleNavClick('#about')}>About me</button>
        </nav>

        {/* Main Content */}
        <div className={styles.centerContent}>
          {/* Season Circle */}
          <div
            className={styles.circle}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div
              className={styles.stack}
              style={{
                transform: `translateY(-${seasonIndex * 20}%)`,
                transition:
                  seasonIndex === SEASONS.length ? 'none' : 'transform 800ms ease-in-out',
              }}
            >
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
