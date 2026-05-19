import RouterLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styles from './SeasonHomeBadge.module.css';

export const SeasonHomeBadge = () => {
  const { route } = useRouter();
  const [visible, setVisible] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (route === '/') return;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const scrollingUp = currentY < lastScrollY.current;
      const pastThreshold = currentY > 100;

      setVisible(scrollingUp && pastThreshold);
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [route]);

  if (route === '/') return null;

  return (
    <RouterLink href="/#intro">
      <a className={styles.badgeLink} data-hidden={!visible} aria-label="Go home">
        <span className={styles.badge}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 10.5L12 3l9 7.5v9a1 1 0 0 1-1 1h-5.5a.5.5 0 0 1-.5-.5V15a2 2 0 0 0-4 0v5a.5.5 0 0 1-.5.5H4a1 1 0 0 1-1-1v-9z" />
          </svg>
        </span>
      </a>
    </RouterLink>
  );
};
