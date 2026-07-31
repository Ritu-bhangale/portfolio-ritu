import { playTap } from 'utils/sound';
import styles from './CaseStudyHeader.module.css';

/**
 * Shared case-study page header: eyebrow, big serif title, a TL;DR line,
 * optional tag pills (same shape as the homepage project card tags), and a
 * meta row (label + value). Everything is passed as props so this stays
 * reusable across case studies rather than hardcoding copy.
 *
 * Plain background, no shader here. The water-caustic shader is reserved
 * for the home hero (layouts/Home/Hero.js) only.
 */
export const CaseStudyHeader = ({
  eyebrow,
  title,
  tldr,
  tags = [],
  meta = [],
  backHref = '/',
  className,
}) => (
  <header className={`${styles.header} ${className || ''}`}>
    <div className={styles.content}>
      {backHref && (
        <a href={backHref} className={styles.backLink} onClick={playTap}>
          ← Back
        </a>
      )}
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      {title && <h1 className={styles.title}>{title}</h1>}
      {tldr && <p className={styles.tldr}>{tldr}</p>}
      {tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map(tag => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      )}
      {meta.length > 0 && (
        <ul className={styles.metaRow}>
          {meta.map(item => (
            <li key={item.label} className={styles.metaItem}>
              <span className={styles.metaLabel}>{item.label}</span>
              <span className={styles.metaValue}>{item.value}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </header>
);
