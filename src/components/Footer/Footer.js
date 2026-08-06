import { Icon } from 'components/Icon';
import { classes } from 'utils/style';
import { trackExternalLink } from 'utils/analytics';
import { playTap, useSoundEnabled } from 'utils/sound';
import { useHasMounted } from 'hooks';
import footerBg from 'assets/shared/footer-mountains-dither.png';
import styles from './Footer.module.css';

const LINKEDIN = 'https://www.linkedin.com/in/ritubhangale/';

const bg = footerBg?.src || footerBg;

const SpeakerOnIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <polygon points="4 9 8 9 13 4 13 20 8 15 4 15 4 9" fill="currentColor" stroke="none" />
    <path d="M16.5 8.5a5 5 0 0 1 0 7" />
    <path d="M19.5 6a9 9 0 0 1 0 12" />
  </svg>
);

const SpeakerOffIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <polygon points="4 9 8 9 13 4 13 20 8 15 4 15 4 9" fill="currentColor" stroke="none" />
    <line x1="16.5" y1="9" x2="21.5" y2="14" />
    <line x1="21.5" y1="9" x2="16.5" y2="14" />
  </svg>
);

// Fixed-position, sitewide sound toggle. Rendered inside Footer since Footer
// is the one component every page mounts (Home, case studies, Contact,
// Uses, Viba). `useHasMounted` keeps the icon stable on the very first
// client render so it matches SSR output — the real localStorage value only
// takes effect once mounted, avoiding a hydration flash/mismatch.
const SoundToggle = () => {
  const hasMounted = useHasMounted();
  const [soundEnabled, setSoundEnabled] = useSoundEnabled();
  const isEnabled = hasMounted ? soundEnabled !== false : true;

  // Muting shouldn't play the tap sound (silencing sound with a sound is a
  // small paradox), but un-muting should — it's the natural "welcome back"
  // moment. Toggle the flag first so playTap's own mute check reads the new
  // value.
  const handleToggle = () => {
    const next = !isEnabled;
    setSoundEnabled(next);
    if (next) playTap();
  };

  return (
    <button
      type="button"
      className={styles.soundToggle}
      aria-label={isEnabled ? 'Mute sound effects' : 'Unmute sound effects'}
      aria-pressed={!isEnabled}
      onClick={handleToggle}
    >
      {isEnabled ? <SpeakerOnIcon /> : <SpeakerOffIcon />}
    </button>
  );
};

export const Footer = ({ className, reveal }) => (
  <footer className={classes(styles.footer, reveal && styles.reveal, className)}>
    {/* Snow peaks put through the site's 8x8 Bayer press dither (white /
        #2944A6 / #0F0F0F), the same treatment as the section icons and the
        Hero plant hover-swap. The art keeps its alpha sky: everything above
        the ridgeline is cut out, so the page background shows through as sky
        and the range rises out of it with no seam to blend. */}
    <img
      className={styles.bg}
      src={bg}
      alt=""
      aria-hidden
      loading="lazy"
      decoding="async"
      draggable={false}
    />
    <SoundToggle />

    <div className={styles.inner}>
      <div className={styles.content}>
        <h2 className={styles.headline}>
          <span className={styles.headlineSerif}>Have a project in mind?</span>
          <span className={styles.headlineAccent}>Let&rsquo;s make it real</span>
        </h2>

        <a
          className={styles.cta}
          href={LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            playTap();
            trackExternalLink('linkedin', 'LinkedIn Profile');
          }}
        >
          Connect on linkedin
          <Icon className={styles.ctaIcon} icon="arrowRight" />
        </a>
      </div>
    </div>
  </footer>
);
