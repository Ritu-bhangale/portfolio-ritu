import { Heading } from 'components/Heading';
import { Text } from 'components/Text';
import styles from './CSE.module.css';

// Each project reads as a framed editorial print — the title is the artwork.
// `theme` selects a restrained, collection-consistent palette; index, tag and
// tech are secondary metadata framing the title.
const projects = [
  {
    id: 'node-svg',
    theme: 'night',
    tag: 'Work in progress',
    title: 'Node SVG Generator',
    tech: 'Python · Gemini API',
    href: 'https://github.com/Ritu-bhangale/Node-based-svg-generator',
  },
  {
    id: 'saliency',
    theme: 'noir',
    tag: 'Work in progress',
    title: 'Sum Saliency UI',
    tech: 'Python · ML · Vision',
    href: 'https://github.com/Ritu-bhangale/sum-saliency-ui',
  },
  {
    id: 'visualize-dsa',
    theme: 'paper',
    tag: 'Pre-AI Era',
    title: 'Visualize DSA',
    tech: 'React · JavaScript',
    href: 'https://visualize-dsa.netlify.app/',
  },
];

const ArrowMark = () => (
  <svg
    className={styles.posterArrow}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden
  >
    <path
      d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CSE = ({ id, sectionRef }) => (
  <section className={styles.cse} id={id} ref={sectionRef}>
    <div className={styles.intro}>
      <Heading level={2} as="h2" className={styles.heading}>
        My computer science degree, put to work
      </Heading>
      {/* <Text size="m" tone="secondary" as="p" className={styles.sub}>
        Seemingly for the benefit of designers.
      </Text> */}
    </div>

    <div className={styles.shelfWrap}>
      <div className={styles.gallery}>
        {projects.map(({ id, theme, tag, title, tech, href }) => (
          <div key={id} className={styles.frame}>
            <a
              className={`${styles.poster} ${styles[theme]}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} — view on GitHub`}
            >
              <div className={styles.posterTop}>
                <span className={styles.posterTag}>{tag}</span>
              </div>
              <Heading level={4} as="h3" className={styles.posterTitle}>
                {title}
              </Heading>
              <div className={styles.posterBottom}>
                <span className={styles.posterTech}>{tech}</span>
                <ArrowMark />
              </div>
            </a>
          </div>
        ))}
      </div>
      <div className={styles.plank} aria-hidden />
    </div>
  </section>
);
