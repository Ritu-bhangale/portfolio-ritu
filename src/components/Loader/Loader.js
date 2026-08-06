import { useAppContext } from 'hooks/useAppContext';
import { getSeasonTheme } from 'utils/season';
import { m } from 'framer-motion';
import styles from './Loader.module.css';

export const Loader = ({ isVisible }) => {
  const { seasonIndex } = useAppContext();
  const season = getSeasonTheme(seasonIndex);

  return (
    <m.div
      className={styles.loader}
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
      // The loader stays mounted at opacity 0 after the intro, so hide it from
      // assistive tech and from the page outline once it is done.
      aria-hidden={!isVisible}
    >
      <div className={styles.content}>
        {/* Deliberately not an <h1>: this splash renders on every route, so an
            <h1> here would give every page a second, wrong page heading. */}
        {/* `initial` is opacity 1, not 0, on purpose. These two nodes are the
            only text on the page during the splash, and a framer `initial` of
            0 is serialised into the static HTML as `style="opacity:0"` — which
            makes them ineligible for First Contentful Paint until React has
            hydrated and framer has run its first frame. The intro fade is done
            in CSS instead (`.name` / `.text` keyframes, same 0.1s/0.3s delays
            and 0.4s duration), which runs off the stylesheet with no JS, so
            the splash paints as soon as CSS is parsed. A running CSS animation
            outranks an inline style, so the fade still wins over `opacity: 1`
            while it plays, and framer takes back control for the exit. */}
        <m.div
          className={styles.name}
          initial={{ opacity: 1 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <span className={styles.nameGradient}>Ritu Bhangale</span>
        </m.div>

        <m.p
          className={styles.text}
          initial={{ opacity: 1 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          loading in <span className={styles.season}>{season.label}</span> {season.glyph}
        </m.p>
      </div>
    </m.div>
  );
};
