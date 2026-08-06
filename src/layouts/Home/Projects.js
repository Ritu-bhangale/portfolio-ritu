import { CursorTooltip } from 'components/CursorTooltip';
import { SectionIcon } from 'components/SectionIcon';
import etMoneyThumb from 'assets/home/EtMoneyThumb.jpg';
import mfThumb from 'assets/home/MFDashboardThumb.jpg';
import { playPop, playTap } from 'utils/sound';
import styles from './Projects.module.css';

const logoSrc = img => img?.src || img;

const projects = [
  {
    title: 'Fixing portfolio trust for millions of mutual fund investors',
    hook:
      "2–3% of users saw incorrect portfolio data. Backend couldn't fix it. I redesigned the architecture.",
    href: '/projects/mutual-dashboard',
    tags: ['Inaccuracy', 'Redesign'],
    thumbnail: (
      <div className={styles.thumb}>
        <img
          className={styles.thumbFlat}
          src={logoSrc(mfThumb)}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>
    ),
  },
  {
    title: 'Re-architecting how 10M+ investors discover wealth products',
    hook:
      "A subscription-first model tanked user sentiment. I rebuilt the app's information architecture and explore experience.",
    href: '/projects/etmoney-home',
    tags: null,
    thumbnail: (
      <div className={styles.thumb}>
        <img
          className={styles.thumbFlat}
          src={logoSrc(etMoneyThumb)}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>
    ),
  },
];

export const Projects = ({ id, sectionRef }) => (
  <section className={styles.showcase} id={id} ref={sectionRef}>
    <div className={styles.sectionHead}>
      <SectionIcon name="works" />
      <h2 className={styles.sectionTitle}>Selected works</h2>
    </div>

    <div className={styles.stage}>
      {/* Cards opt into the cursor-following pill via `data-cursor-tooltip`;
          CursorTooltip renders the list container itself so its listeners stay
          scoped to this section. */}
      <CursorTooltip as="div" className={styles.list}>
        {projects.map((project, i) => (
          <a
            key={i}
            href={project.href}
            className={styles.card}
            data-cursor-tooltip="Read more"
            data-cursor-tooltip-tone="blue"
            onMouseEnter={playPop}
            onClick={playTap}
          >
            {project.thumbnail}

            <div className={styles.content}>
              {project.tags && (
                <div className={styles.tags}>
                  {project.tags.map(tag => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className={styles.textBlock}>
                <h3 className={styles.title}>{project.title}</h3>

                <p className={styles.hook}>{project.hook}</p>
              </div>
            </div>
          </a>
        ))}
      </CursorTooltip>
    </div>
  </section>
);
