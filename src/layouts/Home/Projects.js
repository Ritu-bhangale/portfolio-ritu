import { Heading } from 'components/Heading';
import { Text } from 'components/Text';
import styles from './Projects.module.css';

import mfFramed from 'assets/home/MFdashboardWithFrame.png';
import homeFramed from 'assets/home/HomepageWithFrame.png';

const src = image => image?.src || image;

const projects = [
  {
    title: (
      <>
        Re-architecting how 10M+ investors <em>discover</em> wealth products
      </>
    ),
    hook:
      "A subscription-first model tanked user sentiment. I rebuilt the app's information architecture and explore experience.",
    stats: [
      { value: '+73', label: 'NPS points' },
      { value: '~15%', label: 'Product discoverability' },
    ],
    href: '/projects/etmoney-home',
    image: homeFramed,
    tone: 'cool',
  },
  {
    title: (
      <>
        Fixing portfolio <em>trust</em> for millions of mutual fund investors
      </>
    ),
    hook:
      "2–3% of users saw incorrect portfolio data. Backend couldn't fix it. I redesigned the architecture.",
    stats: [
      { value: '99.9%', label: 'Accuracy' },
      { value: 'Drop', label: 'in consumer queries' },
    ],
    href: '/projects/mutual-dashboard',
    image: mfFramed,
    tone: 'warm',
  },
];

// Bevel mechanism: each card owns its own phone (position: fixed, all at the same
// viewport spot). The card has clip-path, so it acts as a window that reveals its
// phone only where the card is. As cards scroll, the fixed phone reads as one
// persistent device whose screen changes per project — no JS, no crossfade.
export const Projects = ({ id, sectionRef }) => (
  <section className={styles.showcase} id={id} ref={sectionRef}>
    <Heading level={2} as="h2" className={styles.sectionTitle}>
      Selected works
    </Heading>

    <div className={styles.stage}>
      <div className={styles.list}>
        {projects.map((project, i) => (
          <a
            key={i}
            href={project.href}
            className={`${styles.card} ${styles[project.tone]}`}
          >
            <div className={styles.cardClip}>
              <div className={styles.content}>
                <Heading level={3} as="h3" className={styles.title}>
                  {project.title}
                </Heading>

                <Text size="m" tone="secondary" as="p" className={styles.hook}>
                  {project.hook}
                </Text>

                <div className={styles.statRow}>
                  {project.stats.map(stat => (
                    <div key={stat.label} className={styles.stat}>
                      <span className={styles.statValue}>{stat.value}</span>
                      <span className={styles.statLabel}>{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.cardPhone} aria-hidden>
                <img
                  className={styles.phoneImg}
                  src={src(project.image)}
                  alt=""
                  draggable="false"
                />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);
