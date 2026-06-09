import { useEffect } from 'react';
import { trackSectionView } from 'utils/analytics';

// Track when user scrolls to specific sections
export const useScrollTracking = (sectionRef, sectionName) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackSectionView(sectionName);
          // Only track once per session
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef?.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [sectionRef, sectionName]);
};
