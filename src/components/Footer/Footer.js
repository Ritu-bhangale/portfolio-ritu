import { useAppContext } from 'hooks/useAppContext';
import { useSeasonalHoverEffect } from 'hooks/useSeasonalHoverEffect';
import { classes } from 'utils/style';
import { getSeasonTheme } from 'utils/season';
import styles from './Footer.module.css';

const EMAIL = 'ritu.bhangales@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/ritubhangale/';

export const Footer = ({ className, reveal }) => {
  const { seasonIndex } = useAppContext();
  const season = getSeasonTheme(seasonIndex);
  const { handleMouseEnter, handleMouseLeave } = useSeasonalHoverEffect();
  const bg = season.footerImage?.src || season.footerImage;

  return (
    <footer className={classes(styles.footer, reveal && styles.reveal, className)}>
      <div className={styles.bg} style={{ backgroundImage: `url(${bg})` }} aria-hidden />
      <div className={styles.fade} aria-hidden />

      {/* Two flow sections: contact block, then the oversized wordmark below it. */}
      <div className={styles.inner}>
        <div className={styles.top}>
          <p className={styles.tagline}>{season.footerTagline}</p>
          <h2 className={styles.cta}>{season.footerCta}</h2>

          <div className={styles.links}>
            <a
              className={styles.link}
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
            >
              Linkedin
            </a>
            <a className={styles.link} href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </div>
        </div>

        <span
          className={styles.wordmark}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className={styles.wordmarkMain}>{season.label} </span>
          <span className={styles.glyph}>{season.glyph}</span>
        </span>
      </div>
    </footer>
  );
};
