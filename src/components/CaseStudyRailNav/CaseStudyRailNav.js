import { useEffect, useState } from 'react';
import styles from './CaseStudyRailNav.module.css';

export const CaseStudyRailNav = ({ items = [], visible = true }) => {
  const [activeId, setActiveId] = useState(items[0]?.id);

  useEffect(() => {
    if (!items.length) return;

    const updateActive = () => {
      let nextActiveId = items[0].id;
      let minDistance = Number.POSITIVE_INFINITY;
      const targetY = window.innerHeight * 0.32;

      for (const item of items) {
        const element = document.getElementById(item.id);
        if (!element) continue;
        const distance = Math.abs(element.getBoundingClientRect().top - targetY);
        if (distance < minDistance) {
          minDistance = distance;
          nextActiveId = item.id;
        }
      }

      setActiveId(nextActiveId);
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    window.addEventListener('hashchange', updateActive);

    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
      window.removeEventListener('hashchange', updateActive);
    };
  }, [items]);

  return (
    <aside
      className={styles.rail}
      data-visible={visible}
      aria-label="Case study section navigation"
    >
      <ul className={styles.list}>
        {items.map(item => {
          const active = activeId === item.id;
          return (
            <li key={item.id} className={styles.item}>
              <a
                href={`#${item.id}`}
                className={styles.link}
                data-active={active}
                aria-current={active ? 'true' : undefined}
              >
                <span className={styles.dash} aria-hidden="true" />
                <span className={styles.label}>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};
