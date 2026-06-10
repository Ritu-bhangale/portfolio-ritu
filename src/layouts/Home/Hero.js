import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import styles from './Hero.module.css';
import { useAppContext } from 'hooks/useAppContext';
import { getSeasonTheme } from 'utils/season';
import {
  trackResumeDownload,
  trackContactInteraction,
  trackExternalLink,
  trackEvent,
} from 'utils/analytics';
import etmoneyLogo from 'assets/home/logos_workplace/ETMoney.png';
import deskImage from 'assets/home/Desk.png';
import jarLogo from 'assets/home/logos_workplace/Jar.png';
import upstoxLogo from 'assets/home/logos_workplace/Upstox.png';

// The letter body types out as you scroll — a scroll-scrubbed typewriter
// (extra.email style): a blinking caret leads the reveal, freshly-typed
// characters carry the season's gradient trail, scrolling up un-types.
const bodyText =
  "I 🔍 explore, learn, think, build taste, and 🎨 design to shape experiences that help people make decisions faster with a ✨ spark of delight.\n\nMy background in computer science 🎓 taught me to read a problem before reacting to it. To ask what's underneath before deciding what goes on top. I iterate, not to polish, but to 🧪 pressure-test. Somewhere in that process, the right answer usually shows up.";

const chars = Array.from(bodyText); // index-stable list, includes spaces

// ---- reveal tuning ----
const TRAIL = 30; // chars carrying the gradient behind the caret
// The reveal is centred on the viewport centre: it begins as the paragraph's
// centre passes START_VH (lower half) and finishes as it reaches END_VH (upper
// half). With these symmetric around 0.5, the typing is half-done exactly when
// the paragraph sits at the centre of the page.
const START_VH = 0.82; // begin when block centre is 82% down (entering from below)
const END_VH = 0.18; // finish when block centre is 18% down (centred on 0.5)
const PRELOAD = 58; // chars pre-typed on page load (mid-sentence arrival feel)

const clamp01 = v => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a, b, t) => a + (b - a) * t;
const mix = (c1, c2, t) =>
  `rgb(${Math.round(lerp(c1[0], c2[0], t))} ${Math.round(
    lerp(c1[1], c2[1], t)
  )} ${Math.round(lerp(c1[2], c2[2], t))})`;

// distance d behind the caret (0 = newest): season from → mid → to over TRAIL,
// then settles to black once past the trail. `g` is the season gradient.
const makeColorFor = g => d => {
  if (d >= TRAIL) return 'rgb(15 15 15)';
  const t = d / TRAIL;
  return t < g.midStop
    ? mix(g.from, g.mid, t / g.midStop)
    : mix(g.mid, g.to, (t - g.midStop) / (1 - g.midStop));
};

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const FigmaCursor = () => (
  <svg
    className={styles.figmaCursorIcon}
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    aria-hidden
  >
    <path
      d="M3.5 3 L3.5 17.5 L7.6 13.6 L10.3 19.6 L12.7 18.5 L10 12.6 L15.6 12.6 Z"
      fill="currentColor"
      stroke="#fff"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
);

const logoSrc = img => img?.src || img;

// ---- Easter egg: hover "ritu's desk" → particles assemble into a desk photo ----
const DESK_PARTICLES = 64;

// Particles spawn scattered around the popover, fly to random points across the
// photo area, then fade as the image resolves underneath. Colors come from the
// active season's gradient so the egg always matches the page.
const makeDeskParticles = gradient => {
  const stops = [gradient.from, gradient.mid, gradient.to];
  return Array.from({ length: DESK_PARTICLES }, () => {
    const angle = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 90;
    const c = stops[(Math.random() * stops.length) | 0];
    return {
      x: 4 + Math.random() * 92,
      y: 4 + Math.random() * 92,
      dx: Math.cos(angle) * dist,
      dy: Math.sin(angle) * dist,
      delay: Math.random() * 0.3,
      color: `rgb(${c[0]} ${c[1]} ${c[2]})`,
    };
  });
};

const DeskReveal = ({ show, reduced, particles, burst }) => (
  <span
    className={styles.deskPopover}
    data-show={show}
    data-reduced={reduced}
    aria-hidden
  >
    {/* key restarts the particle animation on every fresh hover */}
    <span className={styles.deskParticles} key={burst}>
      {particles.map((p, i) => (
        <span
          key={i}
          className={styles.deskParticle}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.color,
            '--dx': `${p.dx}px`,
            '--dy': `${p.dy}px`,
            '--delay': `${p.delay}s`,
          }}
        />
      ))}
    </span>
    <img className={styles.deskImg} src={logoSrc(deskImage)} alt="" draggable={false} />
  </span>
);

// Figma-style selection box: thin border + 4 corner handles around the children.
const SelectionFrame = ({ variant = 'dark', className, children, ...rest }) => (
  <span
    className={`${styles.selectionFrame} ${styles[`frame_${variant}`]} ${
      className || ''
    }`}
    {...rest}
  >
    {children}
    <span className={`${styles.handle} ${styles.handleTL}`} aria-hidden />
    <span className={`${styles.handle} ${styles.handleTR}`} aria-hidden />
    <span className={`${styles.handle} ${styles.handleBL}`} aria-hidden />
    <span className={`${styles.handle} ${styles.handleBR}`} aria-hidden />
  </span>
);

// Figma-native select cursor — solid black classic pointer, tip up-left.
const ArrowCursor = ({ className }) => (
  <svg
    className={className}
    width="22"
    height="26"
    viewBox="0 0 22 26"
    fill="none"
    aria-hidden
  >
    <path
      d="M4 2 L4 21.5 L9.3 16.4 L12.7 24 L15.8 22.6 L12.4 15.1 L19.6 15 Z"
      fill="#0f0f0f"
      stroke="#fff"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>
);

// App-icon tiles, back→front (Jar + Upstox behind, ET Money front). Each asset is
// a complete app icon (its own bg + artwork), so the tile just frames the image.
const appTiles = [
  { src: jarLogo, alt: 'Jar', cls: 'tileJar' },
  { src: upstoxLogo, alt: 'Upstox', cls: 'tileUpstox' },
  { src: etmoneyLogo, alt: 'ET Money', cls: 'tileEtmoney' },
];

const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
    <path
      d="M9 2.5v9m0 0 3.2-3.2M9 11.5 5.8 8.3M3 14.5h12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Hero = ({ id, sectionRef }) => {
  const cursorRef = useRef();
  const [cursorOn, setCursorOn] = useState(false);

  const { seasonIndex } = useAppContext();
  const season = getSeasonTheme(seasonIndex);

  // desk easter egg — particles generated per hover (fresh scatter every time),
  // lazily so SSR markup stays deterministic
  const [deskOn, setDeskOn] = useState(false);
  const [deskParticles, setDeskParticles] = useState([]);
  const deskBurst = useRef(0);
  const deskFound = useRef(false);

  const showDesk = () => {
    deskBurst.current += 1;
    setDeskParticles(makeDeskParticles(season.gradient));
    setDeskOn(true);
    if (!deskFound.current) {
      deskFound.current = true;
      trackEvent('easter_egg_found', { egg: 'ritus_desk' });
    }
  };

  // scroll-typewriter refs
  const wrapRef = useRef();
  const ghostRef = useRef();
  const charRefs = useRef([]);
  const colorCache = useRef([]);
  const lastCount = useRef(0);
  const [active, setActive] = useState(false);
  const reduceMotion = useReducedMotion();

  const moveCursor = event => {
    const el = cursorRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
  };

  useIsoLayoutEffect(() => {
    if (reduceMotion) return; // leave the static ghost copy visible

    const colorFor = makeColorFor(season.gradient);
    const total = chars.length;

    // imperative caret — kept out of React so re-renders never fight us over it
    const caret = document.createElement('span');
    caret.className = styles.caret;
    caret.setAttribute('aria-hidden', 'true');

    const apply = next => {
      const count = Math.max(PRELOAD, Math.min(total, Math.max(0, next)));
      const prev = lastCount.current;

      if (count > prev) {
        for (let i = prev; i < count; i++) {
          const el = charRefs.current[i];
          if (el) el.style.display = '';
        }
      } else if (count < prev) {
        for (let i = count; i < prev; i++) {
          const el = charRefs.current[i];
          if (el) el.style.display = 'none';
        }
      }

      // recolor revealed chars — cache-guarded so only chars whose color
      // actually changes repaint (covers fast scroll jumps, never leaves
      // stale colors behind the trail). Once fully revealed, the whole
      // paragraph settles to black (no lingering gradient on the tail).
      const settled = count >= total;
      for (let i = 0; i < count; i++) {
        const c = settled ? 'rgb(15 15 15)' : colorFor(count - 1 - i);
        if (colorCache.current[i] !== c) {
          const el = charRefs.current[i];
          if (el) el.style.color = c;
          colorCache.current[i] = c;
        }
      }

      if (count >= total || count <= 0) {
        if (caret.parentNode) caret.parentNode.removeChild(caret);
      } else {
        const ref = charRefs.current[count];
        if (ref && ref.parentNode) ref.parentNode.insertBefore(caret, ref);
      }

      lastCount.current = count;
    };

    // start with PRELOAD chars pre-typed (mid-sentence arrival)
    charRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i < PRELOAD) {
        el.style.display = '';
        el.style.color = 'rgb(15 15 15)';
      } else {
        el.style.display = 'none';
      }
    });
    colorCache.current = Array.from({ length: PRELOAD }, () => 'rgb(15 15 15)');
    lastCount.current = PRELOAD;

    let raf = 0;
    const compute = () => {
      raf = 0;
      const wrap = wrapRef.current;
      const ghost = ghostRef.current;
      if (!wrap || !ghost) return;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const blockCenter = rect.top + rect.height / 2;
      const mid = vh * 0.5; // reveal stays centred on the viewport centre
      const span = vh * (START_VH - END_VH);
      const progress = clamp01(0.5 + (mid - blockCenter) / span);
      apply(Math.round(progress * total));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };

    setActive(true);
    compute(); // set the initial reveal before paint
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
      if (caret.parentNode) caret.parentNode.removeChild(caret);
    };
  }, [reduceMotion, season]);

  return (
    <section className={styles.hero} id={id} ref={sectionRef}>
      <div className={styles.inner}>
        <header className={styles.head}>
          <Row label="From">
            <span
              className={styles.fromRow}
              onMouseEnter={showDesk}
              onMouseLeave={() => setDeskOn(false)}
            >
              <ArrowCursor className={styles.fromCursor} />
              <span className={styles.fromText}>ritu&rsquo;s</span>
              <SelectionFrame variant="dark">desk</SelectionFrame>
              <DeskReveal
                show={deskOn}
                reduced={!!reduceMotion}
                particles={reduceMotion ? [] : deskParticles}
                burst={deskBurst.current}
              />
            </span>
          </Row>

          <Row label="To">
            <SelectionFrame
              variant="blue"
              className={styles.youFrame}
              onMouseEnter={() => setCursorOn(true)}
              onMouseLeave={() => setCursorOn(false)}
              onMouseMove={moveCursor}
            >
              <span className={styles.youText}>you</span>
            </SelectionFrame>
          </Row>

          <Row label="Contact">
            <span className={styles.contactRow}>
              <a
                className={styles.contactChip}
                href="mailto:ritu.bhangales@gmail.com"
                onClick={() =>
                  trackContactInteraction('email_click', 'ritu.bhangales@gmail.com')
                }
              >
                <MailIcon />
                ritu.bhangales@gmail.com
              </a>
              <a
                className={styles.contactChip}
                href="https://www.linkedin.com/in/ritubhangale/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackExternalLink('linkedin', 'LinkedIn Profile')}
              >
                <LinkedInIcon />
                Linkedin
              </a>
            </span>
          </Row>

          <Row label="Attached">
            <a
              className={styles.attachment}
              href="/Ritu-Bhangale-Resume.pdf"
              download
              onClick={trackResumeDownload}
            >
              <span className={styles.tileStack}>
                {appTiles.map(t => (
                  <span key={t.alt} className={`${styles.tile} ${styles[t.cls]}`}>
                    <img src={logoSrc(t.src)} alt={t.alt} draggable={false} />
                  </span>
                ))}
              </span>
              <span className={styles.attachmentLabel}>Resume</span>
              <span className={styles.attachmentDownload}>
                <DownloadIcon />
              </span>
            </a>
          </Row>
        </header>

        <div
          className={`${styles.revealWrap} ${active ? styles.active : ''}`}
          ref={wrapRef}
        >
          {/* static copy: sizes the box + carries the readable text for SR/SEO */}
          <p className={`${styles.body} ${styles.ghost}`} ref={ghostRef}>
            {bodyText}
          </p>
          {/* animated copy: typed out on scroll */}
          <p className={`${styles.body} ${styles.bodyAnim}`} aria-hidden>
            {chars.map((ch, i) => (
              <span
                key={i}
                className={styles.char}
                ref={el => {
                  charRefs.current[i] = el;
                }}
              >
                {ch}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Figma-style multiplayer cursor for the "You" pill */}
      <div ref={cursorRef} className={styles.figmaCursor} data-on={cursorOn} aria-hidden>
        <FigmaCursor />
        <span className={styles.figmaLabel}>you</span>
      </div>
    </section>
  );
};

const Row = ({ label, children }) => (
  <div className={styles.row}>
    <span className={styles.rowLabel}>{label}</span>
    <span className={styles.rowValue}>{children}</span>
  </div>
);
