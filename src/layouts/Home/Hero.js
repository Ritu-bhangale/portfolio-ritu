/* Both plant layers are WebP rather than PNG. The photo is the page's Largest
   Contentful Paint element and was a 320KB PNG; at WebP q95 it is 75KB with
   the alpha cutout intact and no visible difference. The dithered twin is
   lossless WebP, so its Bayer pattern is preserved pixel for pixel at half
   the bytes. */
import heroPlant from 'assets/home/hero-plant-cover.webp';
import heroPlantDither from 'assets/home/hero-plant-cover-dither.webp';
import etmoneyLogo from 'assets/home/logos_workplace/ETMoney.png';
import jarLogo from 'assets/home/logos_workplace/Jar.png';
import upstoxLogo from 'assets/home/logos_workplace/Upstox.png';
import dynamic from 'next/dynamic';
import styles from './Hero.module.css';
import {
  trackContactInteraction,
  trackExternalLink,
  trackResumeDownload,
} from 'utils/analytics';
import { playHush, playTap } from 'utils/sound';

/* The caustic background pulls in three.js, which is ~450KB of the home
   page's JavaScript on its own. Imported statically it landed in the initial
   bundle, so the browser had to finish downloading and parsing a WebGL engine
   before it could hydrate and paint anything. Loading it dynamically with
   ssr: false keeps it out of the critical path entirely: the hero text,
   buttons and plant paint from the server-rendered HTML, and the shader
   attaches afterwards. It is purely decorative and already fades itself in
   over 1200ms (see HeroBackground.module.css), so arriving a beat later is
   indistinguishable from the previous behaviour. */
const HeroBackground = dynamic(
  () => import('./HeroBackground').then(mod => mod.HeroBackground),
  { ssr: false }
);

const logoSrc = img => img?.src || img;

const appTiles = [
  { src: jarLogo, alt: 'Jar', cls: 'tileJar' },
  { src: upstoxLogo, alt: 'Upstox', cls: 'tileUpstox' },
  { src: etmoneyLogo, alt: 'ET Money', cls: 'tileEtmoney' },
];

/* Two discrete paragraphs, not one pre-wrapped string: Figma (node 430:3757)
   sets a 24px gap between them, which a blank line in a pre-wrap block can't
   express — that renders as a full 42px line box. */
const bodyParagraphs = [
  'I 🔍 explore, learn, think, build taste, and 🎨 design to shape experiences that help people make decisions faster with a ✨ spark of delight.',
  "My background in computer science 🎓 taught me to read a problem before reacting to it. To ask what's underneath before deciding what goes on top. I iterate, not to polish, but to 🧪 pressure-test. Somewhere in that process, the right answer usually shows up.",
];

const LinkedInIcon = () => (
  <svg width="24" height="24" fill="currentColor" viewBox="0 0 256 256" aria-hidden>
    <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z" />
  </svg>
);

const MailIcon = () => (
  <svg width="24" height="24" fill="currentColor" viewBox="0 0 256 256" aria-hidden>
    <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z" />
  </svg>
);

const DownloadIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M12 3v12" />
    <path d="m7 10 5 5 5-5" />
    <path d="M4 20h16" />
  </svg>
);

export const Hero = ({ id, sectionRef }) => (
  <section className={styles.hero} id={id} ref={sectionRef}>
    <HeroBackground />

    {/* Decorative plant photo — anchored to the bottom-right corner of
        the section, behind the text column. Not part of the content flow.
        On hover it cross-fades to a pre-dithered (Bayer, blue/white) twin
        stacked on top — same halftone treatment as the footer mountains and
        section icons — and fades back on mouse-out. Pure CSS opacity
        transition, no JS/canvas involved. */}
    <div className={styles.plantImage}>
      {/* This photo is the Largest Contentful Paint element on desktop, so it
          gets an explicit high fetch priority. Without it the browser assigns
          images a low initial priority and this one queued behind six web
          fonts and the below-the-fold thumbnails, which pushed LCP out by
          several seconds on a slow connection. */}
      <img
        className={styles.plantPhoto}
        src={logoSrc(heroPlant)}
        alt=""
        fetchpriority="high"
        decoding="async"
        draggable={false}
      />
      {/* The dithered twin only ever shows on hover, so it can wait. */}
      <img
        className={styles.plantDither}
        src={logoSrc(heroPlantDither)}
        alt=""
        fetchpriority="low"
        decoding="async"
        draggable={false}
      />
    </div>

    <div className={styles.inner}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>Hello, I am</p>
        <h1 className={styles.name}>Ritu Bhangale</h1>

        <div className={styles.body}>
          {bodyParagraphs.map(para => (
            <p key={para.slice(0, 24)} className={styles.bodyPara}>
              {para}
            </p>
          ))}
        </div>

        <div className={styles.resumeRow}>
          <a
            className={styles.resumeButton}
            href="/Ritu-Bhangale-Resume.pdf"
            download
            onMouseEnter={playHush}
            onClick={() => {
              playTap();
              trackResumeDownload();
            }}
          >
            <span className={styles.tileStack}>
              {appTiles.map(t => (
                <span key={t.alt} className={`${styles.tile} ${styles[t.cls]}`}>
                  <img src={logoSrc(t.src)} alt={t.alt} draggable={false} />
                </span>
              ))}
            </span>
            <span className={styles.resumeLabel}>Resume</span>
            <span className={styles.resumeDownloadIcon}>
              <DownloadIcon />
            </span>
          </a>
        </div>

        <div className={styles.contactRow}>
          <a
            className={styles.contactChip}
            href="mailto:ritu.bhangales@gmail.com"
            onClick={() => {
              playTap();
              trackContactInteraction('email_click', 'ritu.bhangales@gmail.com');
            }}
          >
            <MailIcon />
            ritu.bhangales@gmail.com
          </a>
          <a
            className={styles.contactChip}
            href="https://www.linkedin.com/in/ritubhangale/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              playTap();
              trackExternalLink('linkedin', 'LinkedIn Profile');
            }}
          >
            <LinkedInIcon />
            Linkedin
          </a>
        </div>
      </div>
    </div>
  </section>
);
