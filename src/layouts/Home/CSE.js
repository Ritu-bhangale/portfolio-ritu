import { SectionIcon } from 'components/SectionIcon';
import scratchGlobeThumb from 'assets/home/ScratchGlobeThumb.png';
import { playTap } from 'utils/sound';
import styles from './CSE.module.css';

// Next's static image imports resolve to a metadata object in this setup; older
// imports resolve to a bare url string. Same helper Hero.js and Projects.js use.
const imgSrc = img => img?.src || img;

/* ── Node-graph illustration ───────────────────────────────────────────────
   The thumbnail for "Node Based Svg generator", traced from Figma node
   579:21427 ("Thumbnail", 424×482) — the plate that replaced the earlier
   hand-drawn placeholder once the real art was designed.

   Figma builds it as an auto-layout node editor sitting at (46, 90) inside the
   plate: four input nodes on the left, each wired from its output port into one
   of four inlets on an artboard node, where the generated vector is shown mid
   edit with anchors, dashed handles and veins. Every number below is that
   layout already resolved into the plate's own 424×482 coordinate space, so the
   drawing lines up 1:1 with the frame at any card width.

   The frame also carries a cloud photo as its background fill, but the child
   frame on top of it paints an opaque gradient across the full 424×482, so the
   photo never shows. It is left out rather than shipped as a hidden 180KB PNG.

   Colours live in CSS rather than as attributes, the same call the previous
   drawing made, so the accent tracks `--rgbAccent` instead of hard-coding
   Figma's #1F46AC. The two blues differ by about a percent. */

// The dot field is a 26×52 tile carrying two dots, repeated across the plate:
// Figma draws all 320 of them individually, which is the same picture.
const DOT_TILE = { w: 26, h: 52, a: [18, 31], b: [19, 5] };

// Figma's grain: fractal noise, kept to the middle band of its luminance so the
// speckle stays sparse, then flooded with a pale blue and merged back on top.
const GRAIN_STEPS = [
  ...Array(9).fill(0),
  ...Array(31).fill(1),
  ...Array(60).fill(0),
].join(' ');

/* Node cards. `w`/`h` are the auto-layout results: 1.277 border + 10.214
   padding on every side, a 10.214 gutter between the glyph and the label, and
   an extra 5.106 of right padding. `bars` are the two label widths. */

const CARD_PAD = 11.491; // border + padding, i.e. glyph offset from the corner
const GUTTER = 10.214;
const BAR_H = 5.107;
const LABEL_H = 15.321; // two bars plus the gap between them

const NODES = [
  {
    id: 'spark',
    x: 48.55,
    y: 90,
    w: 114.904,
    h: 43.409,
    glyph: 'spark',
    icon: 20.427,
    bars: [56.175, 33.194],
  },
  {
    id: 'ring',
    x: 54.94,
    y: 158.94,
    w: 108.52,
    h: 42.132,
    glyph: 'ring',
    icon: 19.15,
    bars: [51.068, 37.024],
  },
  {
    id: 'square',
    x: 46,
    y: 230.44,
    w: 118.734,
    h: 42.132,
    glyph: 'square',
    icon: 19.15,
    bars: [42.131, 61.282],
  },
  {
    id: 'triangle',
    x: 76.64,
    y: 299.38,
    w: 112.35,
    h: 43.409,
    glyph: 'triangle',
    icon: 20.427,
    bars: [53.621, 30.641],
  },
];

// Each cable leaves a node's output port and lands on an artboard inlet. The
// paths are Figma's own, translated into plate space.
const WIRES = [
  {
    x: 165.204,
    y: 110.455,
    d: 'M0.166305 0.616306C40.3823 11.4682 31.3472 58.7748 66.5547 74.6649',
  },
  {
    x: 169.736,
    y: 180.652,
    d: 'M0.102858 0.630008C31.382 5.7368 33.4353 29.694 61.3844 35.7392',
  },
  { x: 167.92, y: 247.672, d: 'M0.0191419 2.55311L63.8541 0.638062' },
  {
    x: 192.727,
    y: 279.592,
    d: 'M39.034 0.63835C28.8204 0.638427 12.8617 40.2161 0.0946969 38.301',
  },
];

// Four output ports on the left column, four inlets down the artboard's edge.
// Figma strokes these 1.2767 outside a 10.214 circle, hence the 5.745 radius.
const PORTS = [
  [160.897, 110.427],
  [163.457, 180.647],
  [162.177, 249.587],
  [186.437, 318.527],
  [237.507, 185.757],
  [237.507, 217.667],
  [237.507, 248.307],
  [237.507, 278.947],
];

const PORT_R = 5.745;

const Glyph = ({ kind, x, y }) => {
  if (kind === 'spark') {
    return (
      <path
        className={styles.glyphFill}
        transform={`translate(${x} ${y})`}
        d="M10.2136 0C10.2136 0 10.7771 5.25994 12.9722 7.455C15.1672 9.65005 20.4272 10.2136 20.4272 10.2136C20.4272 10.2136 15.1672 10.7771 12.9722 12.9722C10.7771 15.1672 10.2136 20.4272 10.2136 20.4272C10.2136 20.4272 9.65005 15.1672 7.455 12.9722C5.25994 10.7771 0 10.2136 0 10.2136C0 10.2136 5.25994 9.65005 7.455 7.455C9.65005 5.25994 10.2136 0 10.2136 0Z"
      />
    );
  }

  if (kind === 'ring') {
    return (
      <g transform={`translate(${x} ${y})`}>
        <rect
          className={styles.glyphStroke}
          x="0.63835"
          y="0.63835"
          width="17.8738"
          height="17.8738"
          rx="8.93689"
        />
        <circle className={styles.glyphFill} cx="9.57547" cy="9.57525" r="2.5534" />
      </g>
    );
  }

  if (kind === 'square') {
    return (
      <rect
        className={styles.glyphStroke}
        x={x + 0.63835}
        y={y + 0.63835}
        width="17.8738"
        height="17.8738"
        rx="4.4685"
      />
    );
  }

  // The triangle sits 1.023 in from the left of its 20.427 box and stops
  // 18.75% short of the bottom (node 579:21756).
  return (
    <path
      className={styles.glyphStroke}
      transform={`translate(${x + 1.0234} ${y})`}
      d="M7.53223 1.5957C8.2693 0.319046 10.1125 0.319137 10.8496 1.5957L17.4834 13.0859C18.2205 14.3626 17.2993 15.9589 15.8252 15.959H2.55762C1.08341 15.959 0.161336 14.3626 0.898437 13.0859L7.53223 1.5957Z"
    />
  );
};

/* The generated artwork inside the artboard (node 579:21776): a leaf outline
   with its four bezier anchors pulled out on dashed handles, plus veins. Drawn
   in its own 89.369×108.519 space and dropped in whole. */
const Artwork = () => (
  <g transform="translate(268.14 201.078)">
    <circle className={styles.artHandleDot} cx="12.767" cy="24.2573" r="3.8301" />
    <circle className={styles.artHandleDot} cx="3.8301" cy="61.2816" r="3.8301" />
    <circle className={styles.artHandleDot} cx="85.5388" cy="61.2816" r="3.8301" />
    <circle className={styles.artHandleDot} cx="77.8786" cy="24.2573" r="3.8301" />

    <line className={styles.artHandle} x1="6.84966" y1="63.3989" x2="43.8739" y2="102.977" />
    <line className={styles.artHandle} x1="48.0474" y1="101.701" x2="82.5182" y2="64.6767" />
    <line className={styles.artHandle} x1="14.9777" y1="23.7187" x2="43.0651" y2="5.84494" />
    <line className={styles.artHandle} x1="74.9825" y1="23.5191" x2="46.8952" y2="5.64535" />

    <path
      className={styles.artLeaf}
      d="M45.3569 5.79332C56.5978 9.65008 72.7718 23.0033 72.7719 51.0677C72.7719 65.2392 69.7672 74.0499 64.8188 81.5326C62.335 85.2885 59.3514 88.7244 55.977 92.3509C52.7376 95.8323 49.1183 99.5118 45.2875 103.775C38.0857 96.9093 31.1686 90.8009 25.9867 82.9691C20.713 74.9983 17.2358 65.2269 17.2358 51.0677C17.2358 36.9179 21.1863 27.0047 26.6772 19.9242C32.1095 12.9192 39.0856 8.6421 45.3569 5.79332Z"
    />

    <line className={styles.artVein} x1="45.3228" y1="25.534" x2="45.3228" y2="71.4951" />
    <line className={styles.artVein} x1="45.1358" y1="33.6456" x2="36.199" y2="42.5825" />
    <line className={styles.artVein} x1="45.0095" y1="50.2393" x2="36.2022" y2="59.1762" />
    <line
      className={styles.artVein}
      y1="-0.63835"
      x2="12.5473"
      y2="-0.63835"
      transform="matrix(0.696697 0.717365 0.717365 -0.696697 45.9612 39.5777)"
    />
    <line
      className={styles.artVein}
      y1="-0.63835"
      x2="12.5473"
      y2="-0.63835"
      transform="matrix(0.696697 0.717365 0.717365 -0.696697 45.9612 58.7282)"
    />

    <rect
      className={styles.artAnchor}
      x="40.216"
      y="0.638349"
      width="8.93689"
      height="8.93689"
    />
    <rect
      className={styles.artAnchor}
      x="41.4927"
      y="101.498"
      width="6.3835"
      height="6.3835"
    />
  </g>
);

const NodeGraph = () => (
  <svg
    className={styles.graph}
    viewBox="0 0 424 482"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden
    focusable="false"
  >
    <defs>
      <pattern
        id="cseGridDots"
        x="0"
        y="0"
        width={DOT_TILE.w}
        height={DOT_TILE.h}
        patternUnits="userSpaceOnUse"
      >
        <circle
          className={styles.gridDot}
          cx={DOT_TILE.a[0]}
          cy={DOT_TILE.a[1]}
          r="1"
        />
        <circle
          className={styles.gridDot}
          cx={DOT_TILE.b[0]}
          cy={DOT_TILE.b[1]}
          r="1"
        />
      </pattern>

      <linearGradient
        id="csePlate"
        x1="8"
        y1="8.5"
        x2="294"
        y2="572"
        gradientUnits="userSpaceOnUse"
      >
        <stop className={styles.plateStopTop} offset="0" />
        <stop className={styles.plateStopMid} offset="0.461538" />
        <stop className={styles.plateStopBottom} offset="1" />
      </linearGradient>

      <filter
        id="cseGrain"
        x="0"
        y="0"
        width="424"
        height="482"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="fix" />
        <feBlend mode="normal" in="SourceGraphic" in2="fix" result="shape" />
        <feTurbulence
          type="fractalNoise"
          baseFrequency="2 2"
          stitchTiles="stitch"
          numOctaves="3"
          seed="3557"
          result="noise"
        />
        <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
        <feComponentTransfer in="alphaNoise" result="banded">
          <feFuncA type="discrete" tableValues={GRAIN_STEPS} />
        </feComponentTransfer>
        <feComposite operator="in" in="banded" in2="shape" result="clipped" />
        {/* Figma floods at 0.8, but Chrome resolves the same turbulence into
            coarser clumps, so at full strength the speckle reads twice as loud
            as the design. 0.45 lands the grain's contrast back on Figma's. */}
        <feFlood floodColor="rgba(180, 202, 234, 0.45)" result="tint" />
        <feComposite operator="in" in="tint" in2="clipped" result="grain" />
        <feMerge>
          <feMergeNode in="shape" />
          <feMergeNode in="grain" />
        </feMerge>
      </filter>
    </defs>

    {/* Plate: gradient, dot field and grain. The 24px radius comes from
        `.thumb`'s own clip so it stays right at the mobile radius too. */}
    <g filter="url(#cseGrain)">
      <rect x="0" y="0" width="424" height="482" fill="url(#csePlate)" />
      <rect x="0" y="0" width="424" height="482" fill="url(#cseGridDots)" />
    </g>

    {WIRES.map(({ x, y, d }) => (
      <path
        key={d}
        className={styles.wire}
        transform={`translate(${x} ${y})`}
        d={d}
      />
    ))}

    <g className={styles.plate}>
      {NODES.map(({ id, x, y, w, h, glyph, icon, bars }) => {
        const barsX = x + CARD_PAD + icon + GUTTER;
        const barsY = y + CARD_PAD + (icon - LABEL_H) / 2;

        return (
          <g key={id}>
            <rect
              className={styles.nodeBox}
              x={x + 0.6385}
              y={y + 0.6385}
              width={w - 1.277}
              height={h - 1.277}
              rx="9.5755"
            />
            <Glyph kind={glyph} x={x + CARD_PAD} y={y + CARD_PAD} />
            <rect
              className={styles.bar}
              x={barsX}
              y={barsY}
              width={bars[0]}
              height={BAR_H}
              rx="2.5535"
            />
            <rect
              className={styles.barSoft}
              x={barsX}
              y={barsY + BAR_H * 2}
              width={bars[1]}
              height={BAR_H}
              rx="2.5535"
            />
          </g>
        );
      })}

      {/* Artboard: the node that renders the result (579:21771). */}
      <rect
        className={styles.nodeBox}
        x="239.4185"
        y="136.5985"
        width="146.82"
        height="215.762"
        rx="9.5755"
      />
      <rect
        className={styles.outTitle}
        x="254.1"
        y="151.28"
        width="51.068"
        height="5.107"
        rx="2.5535"
      />
      <rect
        className={styles.outChip}
        x="347.3"
        y="147.45"
        width="24.257"
        height="14.044"
        rx="5.107"
      />
      <rect
        className={styles.artboard}
        x="254.7385"
        y="180.0085"
        width="116.179"
        height="150.65"
        rx="14.6815"
      />
      <Artwork />
    </g>

    {PORTS.map(([cx, cy]) => (
      <circle key={`${cx}-${cy}`} className={styles.port} cx={cx} cy={cy} r={PORT_R} />
    ))}
  </svg>
);

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
    href: null,
    thumbnail: (
      <img
        className={styles.thumbImage}
        src={imgSrc(scratchGlobeThumb)}
        alt=""
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
    thumbnail: <NodeGraph />,
  },
];

export const CSE = ({ id, sectionRef }) => (
  <section className={styles.cse} id={id} ref={sectionRef}>
    <div className={styles.intro}>
      <SectionIcon name="code" />
      <h2 className={styles.heading}>My computer science degree, put to work</h2>
    </div>

    <div className={styles.gallery}>
      {projects.map(project => {
        const { id: key, title, hook, href, thumbnail } = project;

        const body = (
          <>
            <div className={styles.thumb}>{thumbnail}</div>

            <div className={styles.cardText}>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardHook}>{hook}</p>
            </div>
          </>
        );

        // Only the node-svg project has somewhere to go; the Figma frame draws
        // both cards identically, so the link is invisible until hover.
        return href ? (
          <a
            key={key}
            className={styles.card}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title}, view on GitHub`}
            onClick={playTap}
          >
            {body}
          </a>
        ) : (
          <div key={key} className={styles.card}>
            {body}
          </div>
        );
      })}
    </div>
  </section>
);
