import { SectionIcon } from 'components/SectionIcon';
import { playHush } from 'utils/sound';
import bakeFan from 'assets/Fun/bake-fan.png';
import crochetFan from 'assets/Fun/crochet-fan.png';
import snakePlant from 'assets/Fun/Plants 1.png';
import travel1 from 'assets/Fun/travel 1.png';
import travel2 from 'assets/Fun/travel 2.png';
import travel3 from 'assets/Fun/travel 3.png';
import travel4 from 'assets/Fun/travel 4.png';
import travel5 from 'assets/Fun/travel 5.png';
import styles from './FunSection.module.css';

// Next's static image imports resolve to a metadata object in this setup;
// older/plain imports resolve to a bare url string. Same helper Hero.js uses.
const imgSrc = img => img?.src || img;

/* ── Layout source of truth ───────────────────────────────────────────────
   Every number below is read off Figma node `559:15761`, a 768 × 512 board,
   and is written in that board's own pixels. `--unit` (declared in the CSS)
   is one of those pixels expressed in real ones, so `calc(N * var(--unit))`
   lands exactly where Figma put it at whatever width the board resolves to.

   Two conventions are in play, because Figma uses both:

     ORIGIN     a node's `x`/`y` is where its unrotated top-left corner ends
                up, and rotation happens about that corner. The board's
                top-level pieces (the two fans, the crochet cluster, the
                label, the plant) are placed this way — `transform-origin: 0 0`.
     CENTRE     everything inside a cluster is placed by the centre of its own
                box, which is rotation-invariant and so survives the cluster's
                rotation without any trigonometry here.

   The crochet cluster carries a rotation of its own (+6.55°) that its children
   inherit; the per-child `rot` below is that child's rotation *inside* the
   cluster, exactly as Figma stores it. */

const BOARD = {
  crochetCluster: { x: 479.418, y: 62.468, rot: 6.55 },
  plant: { x: -29, y: 160, w: 161.92, h: 202.4 },
};

/* ── The two photo fans ───────────────────────────────────────────────────
   Each fan is one flat 2x PNG exported straight from Figma rather than a pile
   of separately positioned `<img>` tiles, because the fans are not just loose
   photographs: Figma paints a solid rounded backing card behind each stack
   and a second flattened shadow blob over it (both named "Rectangle
   161124715" — `559:15923` in baking, `559:15946` in crochet). Those two
   layers are what make the stack read as prints resting on a card rather than
   cut-outs floating on the paper, and no arrangement of per-tile CSS
   `box-shadow` reproduces them. Exporting the whole frame keeps them, and
   costs less than the four full-size photographs it replaces.

   The exports are rendered in the board's own orientation — Figma bakes each
   frame's rotation into the raster — so these are plain unrotated boxes and
   carry no `rot` of their own.

   Bounds are the export's render box, which is wider than the frame's nominal
   one because both frames let content spill: they were measured by locating
   each export inside a full-board render of `559:15761` rather than read off
   the frame's own x/y/w/h, which describe the frame and not what it draws.

   Baked into `bake-fan.png` (all inside frame `559:15922`, verified against
   the export): the four bake photographs, the backing card and shadow blob,
   the crocheted sunflowers, the white "cupcake" badge disc `559:15938`, and
   the whole of the connector arrow `563:15969` that runs from the "Sometimes
   I bake" note down to the badge — the arrow's far end lands 1 unit inside
   the export's right edge, so nothing of it is clipped.

   Baked into `crochet-fan.png` (frame `559:15945`): the three crochet
   photographs, the backing card and shadow blob, and the tulip bouquet
   `559:15943`.

   Everything else on the board — the plant, both hand-written notes, and the
   crochet note's own connector arrow — is a sibling of these frames in Figma
   and stays a separate element here. */
const BAKE_FAN = { x: -29, y: 19.64, w: 363.5, h: 277.5 };
const CROCHET_FAN = { x: 478, y: 87.64, w: 271.5, h: 294 };

/* Both labels are Caveat, the informal hand the reference writes them in, at
   the accent blue Figma uses for the connector arrows too. Neither sits in a
   pill or a chip — they are notes written straight onto the paper, each with
   an arrow curving off toward the thing it names. The bake one is a board-
   level element; the crochet one belongs to its cluster and so inherits that
   cluster's +6.55°, which is why the angle written here is the smaller one
   Figma stores on the text itself. */
const BAKE_LABEL = {
  cx: 373.87,
  cy: 127.03,
  w: 138.6,
  rot: 4.49,
  size: 24,
  track: -0.24,
};
const CROCHET_LABEL = {
  cx: 229.9,
  cy: 281.2,
  w: 108.9,
  rot: -4.49,
  size: 20,
  track: -0.2,
};

/* The crochet note's connector, lifted verbatim from Figma as a path. It is
   stored mirrored in the file, which is why it carries an `scaleX(-1)` in
   front of its rotation rather than a plain angle. The baking note's
   connector is not here: it is part of the baking frame and so already inside
   that fan's flat export. */
const ARROW_CROCHET = {
  cx: 243.081,
  cy: 235.288,
  w: 37.246,
  h: 32.1002,
  rot: -62,
  d: 'M0.627989 30.7281L0 30.8442L0.232271 32.1002L0.86026 31.984L0.744125 31.3561L0.627989 30.7281ZM34.5286 13.8832C34.8622 13.998 35.2256 13.8207 35.3404 13.4872L37.211 8.05235C37.3258 7.71884 37.1485 7.35542 36.815 7.24063C36.4815 7.12584 36.1181 7.30314 36.0033 7.63664L34.3405 12.4676L29.5095 10.8048C29.176 10.69 28.8126 10.8673 28.6978 11.2008C28.583 11.5343 28.7603 11.8977 29.0938 12.0125L34.5286 13.8832ZM0.744125 31.3561L0.86026 31.984C2.82222 31.6212 4.52846 30.4292 6.03828 28.7908C7.54855 27.1519 8.90304 25.0222 10.1582 22.6972C11.4149 20.3694 12.5881 17.8148 13.7245 15.3164C14.8648 12.8096 15.9663 10.3634 17.0913 8.21763C18.2193 6.06621 19.3468 4.26489 20.5226 3.03019C21.6976 1.79626 22.8419 1.20778 24.0213 1.28397C25.2199 1.3614 26.6527 2.13577 28.3682 4.10036C30.076 6.05617 31.9919 9.11026 34.1625 13.5593L34.7365 13.2793L35.3105 12.9993C33.1191 8.50754 31.1453 5.3388 29.3303 3.26024C27.5229 1.19047 25.7997 0.118918 24.1037 0.00935149C22.3885 -0.101451 20.8997 0.781989 19.5976 2.14938C18.2962 3.516 17.1026 5.44538 15.9601 7.62453C14.8146 9.80932 13.6963 12.2935 12.5619 14.7875C11.4236 17.2899 10.2673 19.8064 9.03427 22.0904C7.79974 24.3772 6.5043 26.4002 5.099 27.9253C3.69325 29.4508 2.21828 30.434 0.627989 30.7281L0.744125 31.3561Z',
};

// Centre-anchored box: `left`/`top` are the centre, so a rotation inherited
// from an ancestor moves the box without ever changing what it is centred on.
const centred = ({ cx, cy, w, h, rot, flip }) => ({
  '--cx': cx,
  '--cy': cy,
  '--boxW': w,
  '--boxH': h,
  '--rot': rot,
  ...(flip ? { '--flip': flip } : null),
});

const Label = ({ label, children }) => (
  <p
    className={styles.label}
    style={{ ...centred(label), '--size': label.size, '--track': label.track }}
  >
    {children}
  </p>
);

// Corner-anchored, unrotated: the export already carries its own tilt.
const Fan = ({ fan, src, alt }) => (
  <img
    className={styles.fan}
    style={{
      '--posX': fan.x,
      '--posY': fan.y,
      '--boxW': fan.w,
      '--boxH': fan.h,
    }}
    src={imgSrc(src)}
    alt={alt}
    onMouseEnter={playHush}
    loading="lazy"
    draggable={false}
  />
);

const Arrow = ({ arrow }) => (
  <svg
    className={styles.arrow}
    style={centred(arrow)}
    viewBox={`0 0 ${arrow.w} ${arrow.h}`}
    fill="none"
    aria-hidden
    focusable="false"
  >
    <path d={arrow.d} fill="#002BBA" />
  </svg>
);

/* ── The reel ─────────────────────────────────────────────────────────────
   One filmstrip laid across the very bottom of the board: node `564:16043`
   puts its top-left corner at (-5, 457) and turns it -4°, which drops the
   left end of the strip off the board's 512px bottom edge and leaves only the
   top of it showing at the right. Frame order, left to right, is nodes
   564:15989 → 564:15993 — and every one of them is a crop of a photo the
   project already ships in `assets/Fun`, at the exact frame ratio (976 × 848
   = 180.698 × 157), so nothing needs re-exporting and `object-fit: cover`
   takes no crop at all.

       564:15989  20240406_181301   travel 5   horse on the beach
       564:15990  IMG_2761          travel 4   hillside
       564:15991  IMG_0626          travel 3   forest path
       564:15992  IMG_2462          travel 2   snow and lake
       564:15993  IMG_4879          travel 1   rooftop sunset

   Rendered twice, back to back: the track scrolls by exactly one set width and
   restarts, so the seam is the first frame arriving where it started. Runs on
   its own CSS clock, forever, independent of scroll and of the two fans
   above it — stops only under reduced motion. */
const REEL_FRAMES = [travel5, travel4, travel3, travel2, travel1];

export const FunSection = ({ id, sectionRef }) => (
  <section className={styles.fun} id={id} ref={sectionRef}>
    <div className={styles.intro}>
      <SectionIcon name="camera" />
      <h2 className={styles.heading}>Things I do for fun</h2>
    </div>

    <div className={styles.range}>
      <div className={styles.pin}>
        <div className={styles.stage}>
          <div className={styles.paper} aria-hidden />

          <div className={styles.reel} aria-hidden>
            <div className={styles.reelPerf} />
            <div className={styles.reelWindow}>
              <div className={styles.reelTrack}>
                {[0, 1].map(pass =>
                  REEL_FRAMES.map((src, index) => (
                    <div className={styles.reelFrame} key={`${pass}-${index}`}>
                      <img src={imgSrc(src)} alt="" loading="lazy" draggable={false} />
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className={styles.reelPerf} />
          </div>

          {/* Sits under the baking fan, as it does in Figma: that fan's own
              arrow is drawn over the end of this line. */}
          <Label label={BAKE_LABEL}>Sometimes I bake</Label>

          <Fan
            fan={CROCHET_FAN}
            src={crochetFan}
            alt="A fan of photographs from my travels, with a bouquet of crocheted tulips resting against it"
          />

          <div
            className={styles.cluster}
            style={{
              '--posX': BOARD.crochetCluster.x,
              '--posY': BOARD.crochetCluster.y,
              '--rot': BOARD.crochetCluster.rot,
            }}
          >
            <Label label={CROCHET_LABEL}>
              Other few times
              <br />i crochet
            </Label>

            <Arrow arrow={ARROW_CROCHET} />
          </div>

          <Fan
            fan={BAKE_FAN}
            src={bakeFan}
            alt="A fan of photographs of things I have baked, with a bunch of crocheted sunflowers in front of them"
          />

          {/* Topmost, as drawn: the plant leans in front of the baking fan. */}
          <img
            className={styles.plant}
            style={{
              '--posX': BOARD.plant.x,
              '--posY': BOARD.plant.y,
              '--boxW': BOARD.plant.w,
              '--boxH': BOARD.plant.h,
            }}
            src={imgSrc(snakePlant)}
            alt=""
            loading="lazy"
            draggable={false}
          />
        </div>
      </div>
    </div>
  </section>
);
