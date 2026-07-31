import styles from './CaseStudySection.module.css';

/**
 * Repeating two-column case-study section: a short blue one-liner headline
 * (left, ~30% width) paired with a grey supporting paragraph (right, ~70%
 * width). Stacks vertically; headline above paragraph on tablet/mobile.
 *
 * `image` is an optional node (an <img>, an imported SVG component, or a
 * small composed figure) rendered full-width beneath the two columns, so
 * sections that need supporting visuals stay inside this component rather
 * than hand-rolling markup per case study.
 */
export const CaseStudySection = ({ headline, description, image, className }) => (
  <section className={`${styles.section} ${className || ''}`}>
    <div className={styles.row}>
      <h2 className={styles.headline}>{headline}</h2>
      <div className={styles.description}>{description}</div>
    </div>
    {image && <div className={styles.media}>{image}</div>}
  </section>
);
