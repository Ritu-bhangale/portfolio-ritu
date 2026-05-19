import { useRef, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { classes } from 'utils/style';
import styles from './ExploreShowcase.module.css';

export function ExploreShowcase({ screenshotSrc, reviewCards, className }) {
  const containerRef = useRef();

  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el || reduceMotion) return;

    // Find the scroll wrapper that provides extra scroll distance
    const stickyParent = el.closest('[data-scroll-showcase]')
      || el.closest('[style*="--cardIndex"]');

    let ticking = false;
    let animationFrame = null;

    const animate = () => {
      if (!stickyParent) {
        ticking = false;
        return;
      }

      const vh = window.innerHeight;
      const scrollY = window.scrollY;
      const offsetTop = stickyParent.offsetTop;
      const stickyHeight = stickyParent.offsetHeight;

      // Sticky phase: starts when scrollY reaches offsetTop (section locks at top)
      // Ends when scrollY reaches offsetTop + stickyHeight - vh (next section covers it)
      const stickyStart = offsetTop;
      const stickyEnd = offsetTop + stickyHeight - vh;
      const range = stickyEnd - stickyStart;

      let progress = 0;
      if (range > 0) {
        progress = Math.min(1, Math.max(0, (scrollY - stickyStart) / range));
      }

      el.style.setProperty('--scrollProgress', progress);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        animationFrame = requestAnimationFrame(animate);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrame);
    };
  }, [reduceMotion]);

  return (
    <div ref={containerRef} className={classes(styles.showcase, className)}>
      {/* Review cards behind the phone */}
      <div className={styles.reviewLayer}>
        {reviewCards.map((card, i) => (
          <div
            key={card.id}
            className={classes(styles.reviewCard, styles[`reviewCard${i + 1}`])}
          >
            <img
              src={card.src?.src || card.src}
              alt={card.alt}
              className={styles.reviewImage}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Gradient overlay to fade review edges behind phone */}
      <div className={styles.gradientOverlay} />

      {/* Phone mockup */}
      <div className={styles.phone}>
        <div className={styles.phoneBezel}>
          <div className={styles.phoneScreen}>
            <img
              src={screenshotSrc?.src || screenshotSrc}
              alt="ET Money home page scroll"
              className={styles.phoneScreenshot}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
