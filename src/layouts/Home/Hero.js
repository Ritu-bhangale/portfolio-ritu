import { useEffect, useState } from 'react';
import { Text } from 'components/Text';
import { Heading } from 'components/Heading';
import styles from './Hero.module.css';

export function Hero({ id, sectionRef }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / 600, 1);
      setScrollProgress(progress);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = targetId => {
    setMenuOpen(false);
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero} id={id} ref={sectionRef}>
      {/* Gradient ellipses */}
      <div className={styles.gradientBg} aria-hidden>
        <div className={styles.ellipse1} />
        <div className={styles.ellipse2} />
        <div className={styles.ellipse3} />
      </div>

      {/* Desktop navigation */}
      <nav className={styles.nav}>
        <a href="/Ritu-Bhangale-Resume.pdf" download className={styles.navLink}>
          <Text as="span" size="m" variant="serif">
            Resume
          </Text>
        </a>
        <button onClick={() => handleNavClick('selected-work')}>
          <Text as="span" size="m" variant="serif">
            Projects
          </Text>
        </button>
        <button onClick={() => handleNavClick('about-me')}>
          <Text as="span" size="m" variant="serif">
            About me
          </Text>
        </button>
      </nav>

      {/* Mobile hamburger */}
      <button
        className={styles.menuToggle}
        onClick={() => setMenuOpen(prev => !prev)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        data-open={menuOpen}
      >
        <span className={styles.menuBar} />
        <span className={styles.menuBar} />
      </button>

      {/* Mobile menu overlay */}
      <div className={styles.mobileMenu} data-open={menuOpen}>
        <nav className={styles.mobileNav}>
          <a
            href="/Ritu-Bhangale-Resume.pdf"
            download
            className={styles.mobileNavLink}
            onClick={() => setMenuOpen(false)}
          >
            <Text as="span" size="l" variant="serif">
              Resume
            </Text>
          </a>
          <button onClick={() => handleNavClick('selected-work')} className={styles.mobileNavLink}>
            <Text as="span" size="l" variant="serif">
              Projects
            </Text>
          </button>
          <button onClick={() => handleNavClick('about-me')} className={styles.mobileNavLink}>
            <Text as="span" size="l" variant="serif">
              About me
            </Text>
          </button>
        </nav>
      </div>

      {/* Hero content */}
      <div className={styles.content}>
        <div className={styles.headlineGroup}>
          <Heading level={6} align="center" className={styles.label}>
            Hi, I am Ritu Bhangale
          </Heading>
          <Heading level={0} align="center" className={styles.headline}>
            I <span className={styles.heroEmphasis}>shape </span>
            how people{' '}
            <span className={styles.headlineWrap}>
              <span className={styles.heroEmphasis}>experience </span>
              products
            </span>
          </Heading>
        </div>
      </div>

      {/* Subtext */}
      <Text as="span" size="m" tone="secondary" className={styles.subtext}>
        Currently designing product at ET Money | Previously Upstox &amp; Jar
      </Text>

      {/* Scroll cue */}
      <div
        className={styles.scrollCue}
        style={{ opacity: 1 - scrollProgress }}
        aria-hidden
      >
        <div className={styles.scrollDot} />
      </div>
    </section>
  );
}
