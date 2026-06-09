import { useAppContext } from 'hooks/useAppContext';
import { getSeasonTheme } from 'utils/season';
import { m } from 'framer-motion';
import styles from './Loader.module.css';

export const Loader = ({ isVisible }) => {
  const { seasonIndex } = useAppContext();
  const season = getSeasonTheme(seasonIndex);

  return (
    <m.div
      className={styles.loader}
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <div className={styles.content}>
        <m.h1
          className={styles.name}
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <span className={styles.nameGradient}>Ritu Bhangale</span>
        </m.h1>

        <m.p
          className={styles.text}
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          loading in <span className={styles.season}>{season.label}</span> {season.glyph}
        </m.p>
      </div>
    </m.div>
  );
};
