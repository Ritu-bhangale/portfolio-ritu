import { SectionIcon } from 'components/SectionIcon';
import styles from './Teaser.module.css';

export const Teaser = () => (
  <section className={styles.teaser}>
    <div className={styles.sectionHead}>
      <SectionIcon name="gallery" />
      <h2 className={styles.sectionTitle}>Design gallery</h2>
      <p className={styles.sectionSubtext}>
        Few other that went live and moved the numbers.
      </p>
    </div>

    <div className={styles.videoPlaceholder} aria-hidden />
  </section>
);
