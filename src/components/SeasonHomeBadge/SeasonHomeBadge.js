import RouterLink from 'next/link';
import { useAppContext } from 'hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import autumnImage from 'assets/autumn.png';
import monsoonImage from 'assets/monsoon.png';
import summerImage from 'assets/summer.png';
import winterImage from 'assets/winter.png';
import styles from './SeasonHomeBadge.module.css';

const SEASON_IMAGES = [summerImage, monsoonImage, autumnImage, winterImage];

export const SeasonHomeBadge = () => {
  const { route } = useRouter();
  const { seasonIndex } = useAppContext();
  const [isHidden, setIsHidden] = useState(false);
  const [isTopHover, setIsTopHover] = useState(false);
  const activeSeasonIndex = typeof seasonIndex === 'number' ? seasonIndex : 0;

  useEffect(() => {
    // Home uses the in-hero morphing circle. This badge is for non-home routes.
    if (route === '/') {
      setIsHidden(false);
      setIsTopHover(false);
      return;
    }

    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    if (isTouch) {
      setIsHidden(false);
      return;
    }

    const handleScroll = () => {
      setIsHidden(window.scrollY > 0);
    };

    const handleMouseMove = event => {
      setIsTopHover(event.clientY <= 36);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [route]);

  // Home uses the in-hero morphing circle. This badge is for non-home routes.
  if (route === '/') return null;

  const shouldHide = isHidden && !isTopHover;

  return (
    <RouterLink href="/#intro">
      <a className={styles.badgeLink} data-hidden={shouldHide} aria-label="Go to home hero">
        <span className={styles.badge}>
          <img
            className={styles.seasonImage}
            src={SEASON_IMAGES[activeSeasonIndex].src || SEASON_IMAGES[activeSeasonIndex]}
            alt=""
          />
          <span className={styles.homeIcon} aria-hidden>
            <svg viewBox="0 0 24 24">
              <path d="M3 10.5L12 3l9 7.5v9a1 1 0 0 1-1 1h-5.5a.5.5 0 0 1-.5-.5V15a2 2 0 0 0-4 0v5a.5.5 0 0 1-.5.5H4a1 1 0 0 1-1-1v-9z" />
            </svg>
          </span>
        </span>
      </a>
    </RouterLink>
  );
};
