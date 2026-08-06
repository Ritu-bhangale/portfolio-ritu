import { CursorTooltip } from 'components/CursorTooltip';
import { SectionIcon } from 'components/SectionIcon';
import scratchGlobeThumb from 'assets/home/ScratchGlobeThumb.jpg';
import nodeSvgThumb from 'assets/home/NodeSvgThumb.png';
import { playPop, playTap } from 'utils/sound';
import styles from './CSE.module.css';

// Next's static image imports resolve to a metadata object in this setup; older
// imports resolve to a bare url string. Same helper Hero.js and Projects.js use.
const imgSrc = img => img?.src || img;

/* ── Cards ─────────────────────────────────────────────────────────────────
   Two cards side by side, from Figma node 567:16226: 424-wide columns with a
   56px gutter, a 482-tall thumbnail plate, then title and hook 24px apart.
   Titles and hooks are verbatim from the frame, except the second hook, which
   Figma still shows as a duplicate of the first (see the note on `projects`). */

const projects = [
  {
    id: 'scratch-globe',
    title: 'Scratch globe',
    hook: 'A fun app to capture the “Fridge magnet” emotion',
    href: '/projects/scratch-globe/',
    tooltip: 'Building live now',
    tooltipTone: 'green',
    thumbnail: (
      <img
        className={styles.thumbImage}
        src={imgSrc(scratchGlobeThumb)}
        alt=""
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    ),
  },
  {
    id: 'node-svg',
    title: 'Node Based Svg generator',
    // Figma node 567:16225 repeats the Scratch-globe line verbatim, which is
    // placeholder text left over from duplicating the card. Written here to
    // describe the actual repo (Python + Gemini) instead.
    hook: 'A node based canvas that wires simple rules into generated SVG art',
    href: 'https://github.com/Ritu-bhangale/Node-based-svg-generator',
    external: true,
    tooltip: 'Opens GitHub link',
    tooltipTone: 'grey',
    thumbnail: (
      <img
        className={styles.thumbImage}
        src={imgSrc(nodeSvgThumb)}
        alt=""
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    ),
  },
];

export const CSE = ({ id, sectionRef }) => (
  <section className={styles.cse} id={id} ref={sectionRef}>
    <div className={styles.intro}>
      <SectionIcon name="code" />
      <h2 className={styles.heading}>My computer science degree, put to work</h2>
    </div>

    {/* CursorTooltip renders the gallery grid itself, so the pointer listeners
        stay scoped to this section rather than the whole document. */}
    <CursorTooltip as="div" className={styles.gallery}>
      {projects.map(project => {
        const { id: key, title, hook, href, external, thumbnail, tooltip, tooltipTone } =
          project;

        const body = (
          <>
            <div className={styles.thumb}>{thumbnail}</div>

            <div className={styles.cardText}>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardHook}>{hook}</p>
            </div>
          </>
        );

        // The Figma frame draws both cards identically, so the link is
        // invisible until hover either way.
        return href ? (
          <a
            key={key}
            className={styles.card}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            aria-label={external ? `${title}, view on GitHub` : `${title}, read case study`}
            data-cursor-tooltip={tooltip}
            data-cursor-tooltip-tone={tooltipTone}
            onMouseEnter={playPop}
            onClick={playTap}
          >
            {body}
          </a>
        ) : (
          <div
            key={key}
            className={styles.card}
            data-cursor-tooltip={tooltip}
            data-cursor-tooltip-tone={tooltipTone}
            onMouseEnter={playPop}
          >
            {body}
          </div>
        );
      })}
    </CursorTooltip>
  </section>
);
