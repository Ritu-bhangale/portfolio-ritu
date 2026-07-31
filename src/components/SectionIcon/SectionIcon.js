import { classes } from 'utils/style';
import camera from 'assets/shared/icons/icon-camera.png';
import code from 'assets/shared/icons/icon-code.png';
import works from 'assets/shared/icons/icon-works.png';
import gallery from 'assets/shared/icons/icon-gallery.png';
import styles from './SectionIcon.module.css';

// Next's static image imports resolve to a metadata object in this setup; older
// imports resolve to a bare url string. Same helper Hero.js and FunSection.js use.
const imgSrc = img => img?.src || img;

const ICONS = { camera, code, works, gallery };

/**
 * The small halftone mark that sits directly above a home-page section title.
 *
 * Each icon is a *photograph* put through the same ordered-dither (8×8 Bayer)
 * as the footer's mountains — quantised to accent blue on bare paper, so the
 * marks read as part of that same press run. Photographs, not vector shapes:
 * continuous tone is what gives the halftone something to do, so the varying
 * dot density carries the real shading of the subject (chrome highlights on the
 * camera top plate, the fall-off across a hand) instead of a flat silhouette.
 *
 * Sources are free-licence Unsplash photos:
 *   camera  — Canon Canonet rangefinder, photo-1603208234872-619ffa1209cb
 *   works   — an app open in someone's hand, photo-1554672408-730436b60dde
 *   code    — a laptop running an editor, photo-1672309046475-4cce2039f342
 *   gallery — a shipped dashboard app on a phone, screens live in the
 *             background, photo-1551650975-87deedd944c3
 *
 * Art is dithered at 128px and rendered at 64, so on a retina display the
 * stipple lands 1:1 on device pixels. That only holds while the rendered width
 * matches the dither grid, which is why the size lives here rather than being
 * passed per section — the icons are meant to be identical across the page.
 */
export const SectionIcon = ({ name, className, ...rest }) => (
  <img
    className={classes(styles.icon, className)}
    src={imgSrc(ICONS[name])}
    alt=""
    aria-hidden
    draggable={false}
    width={64}
    height={64}
    {...rest}
  />
);
