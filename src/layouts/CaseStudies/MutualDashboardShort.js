import { useRef, useEffect } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { Meta } from 'components/Meta';
import { trackCaseStudyOpen } from 'utils/analytics';
import styles from './MutualDashboardShort.module.css';

import HeroFrame from 'assets/home/MFdashboardWithFrame.png';
import Phase1Phone from 'assets/mutual-dashboard/short/MFD phase 1.png';
import Phase2Fan from 'assets/mutual-dashboard/short/MFD Phase 2.png';

const imgSrc = img => img?.src || img;

// ─── Word-by-word animated text ───────────────────────────────────────────────
// Reveal is driven by each paragraph's own scroll-into-view progress (flat
// layout, matches Figma 132:10). Words fade dark→light as a continuous wave.
// `accents` lets specific words settle to a Figma accent colour (and optionally
// italic) instead of the default light, e.g. "incorrect" → red.

const AnimatedWord = ({ word, scrollYProgress, start, end, fromColor, toColor, italic }) => {
  const color = useTransform(scrollYProgress, [start, end], [fromColor, toColor]);
  return <m.span style={{ color, fontStyle: italic ? 'italic' : undefined }}>{word} </m.span>;
};

const AnimatedText = ({
  text,
  scrollYProgress,
  fromColor = '#3a3a3a',
  toColor = '#fdfdfd',
  accents = [],
  className,
}) => {
  const words = text.split(' ');
  const n = words.length;
  const step = 1 / n;
  // Each word fades over ~3.6 steps while neighbours start every 1 step — the
  // heavy overlap reads as one continuous wave, not discrete word pops.
  const duration = step * 3.6;

  const accentFor = word => {
    const bare = word.replace(/[.,;:—'’]+$/, '');
    return accents.find(a => a.match === bare);
  };

  return (
    <p className={className}>
      {words.map((word, i) => {
        const start = Math.min(i * step, 1 - 0.01);
        const end = Math.min(start + duration, 1);
        const a = accentFor(word);
        return (
          <AnimatedWord
            key={`${word}-${i}`}
            word={word}
            scrollYProgress={scrollYProgress}
            start={start}
            end={end}
            fromColor={fromColor}
            toColor={a ? a.color : toColor}
            italic={a?.italic}
          />
        );
      })}
    </p>
  );
};

// ─── Pill badge with corner ticks (Figma 132:43) ──────────────────────────────

const BadgePill = ({ children }) => (
  <span className={styles.badge}>
    {children}
    <span className={`${styles.badgeTick} ${styles.tickTL}`} aria-hidden />
    <span className={`${styles.badgeTick} ${styles.tickTR}`} aria-hidden />
    <span className={`${styles.badgeTick} ${styles.tickBL}`} aria-hidden />
    <span className={`${styles.badgeTick} ${styles.tickBR}`} aria-hidden />
  </span>
);

// L1 / L2 architecture cards (Figma 132:23 / 132:32) — pure markup, no asset
const SourceCard = ({ index, title, sublabel, children }) => (
  <m.div
    className={styles.archCard}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-12%' }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
  >
    <div className={styles.archHead}>
      <span className={styles.archIndex}>{index}</span>
      <div className={styles.archTitleGroup}>
        <h3 className={styles.archTitle}>{title}</h3>
        <span className={styles.archSublabel}>{sublabel}</span>
      </div>
    </div>
    <div className={styles.archBody}>{children}</div>
  </m.div>
);

// ─── Main ──────────────────────────────────────────────────────────────────────

export default function MutualDashboardShort() {
  // Track case study open
  useEffect(() => {
    trackCaseStudyOpen('Mutual Dashboard');
  }, []);

  // each reveal paragraph reveals as it travels up through the viewport
  const para1Ref = useRef();
  const rootIntroRef = useRef();
  const para2Ref = useRef();

  const revealOffset = ['start 0.85', 'start 0.4'];
  const { scrollYProgress: para1Progress } = useScroll({ target: para1Ref, offset: revealOffset });
  const { scrollYProgress: rootIntroProgress } = useScroll({ target: rootIntroRef, offset: revealOffset });
  const { scrollYProgress: para2Progress } = useScroll({ target: para2Ref, offset: revealOffset });

  return (
    <article className={styles.article}>
      <Meta
        title="Mutual Funds Dashboard — Ritu Bhangale"
        description="Rebuilding portfolio reliability from the architecture up. A two-phase redesign of ET Money's mutual funds dashboard, 2024–25."
      />

      {/* ── Scene 1: Hero ─────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroGradient} aria-hidden />
        <div className={styles.heroBand} aria-hidden />
        <h1 className={styles.heroHeadline}>
          Fixing <span className={styles.accentPortfolio}>portfolio</span> trust for{' '}
          <span className={styles.accentMillions}>millions</span> of mutual fund investors
        </h1>
        <div className={styles.heroPhoneWrap}>
          <img
            src={imgSrc(HeroFrame)}
            alt="ET Money mutual funds dashboard"
            className={styles.heroPhone}
            draggable={false}
          />
        </div>
      </section>

      {/* ── Scene 2: Dark — Problem + Root cause ──────────────────────────── */}
      <section className={styles.dark}>
        <div className={styles.darkInner}>
          <div ref={para1Ref} className={styles.fullPara}>
            <AnimatedText
              text="2–3% of ET Money's mutual fund users were seeing incorrect portfolio values. At a platform managing ₹1,00,000+ Cr in AUM, that's not a small edge case — it's a trust problem."
              scrollYProgress={para1Progress}
              className={styles.animPara}
              accents={[
                { match: 'incorrect', color: '#ff4c4c', italic: true },
                { match: '₹1,00,000+', color: '#dff4ff' },
                { match: 'Cr', color: '#dff4ff' },
              ]}
            />
          </div>

          <div className={styles.rootBlock}>
            <div ref={rootIntroRef} className={styles.rootIntro}>
              <AnimatedText
                text="The root cause was architectural. When ET Money pulled holdings from MF Central"
                scrollYProgress={rootIntroProgress}
                className={styles.animParaSmall}
              />
            </div>

            <div className={styles.archGrid}>
              <SourceCard index="L1" title="MF Central API — Raw source of truth" sublabel="Source">
                <p className={styles.archDesc}>
                  Everytime a user triggers an external fetch, we send a request to MF
                  Central. Which in return sends us a feed. Containing
                </p>
                <ul className={styles.archList}>
                  <li>Transactions</li>
                  <li>Folio Numbers</li>
                  <li>Holdings</li>
                  <li>….etc</li>
                </ul>
              </SourceCard>

              <SourceCard index="L2" title="Reconciliation engine" sublabel="ET Money preprocessing">
                <ul className={styles.archList}>
                  <li>Match transactions to the holdings via Folio Numbers as unique identifiers.</li>
                  <li>Identify External vs Internal</li>
                  <li>Map to Goals, Strategies, Genius</li>
                </ul>
              </SourceCard>
            </div>
          </div>

          <div ref={para2Ref} className={styles.fullPara}>
            <AnimatedText
              text="Beyond accuracy, support ticket data showed SIP and transaction tracking queries were the top two complaint categories — these workflows were buried deep in the existing dashboard."
              scrollYProgress={para2Progress}
              className={styles.animPara}
            />
          </div>
        </div>
      </section>

      {/* ── Scene 3: Light — The Build ────────────────────────────────────── */}
      <section className={styles.build}>
        <div className={styles.buildInner}>
          <div className={styles.phaseHeader}>
            <BadgePill>Two-phased rollouts</BadgePill>
            <m.h2
              className={styles.phaseHeadline}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-12%' }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
              Phase 1 — Fix usability without touching the backend.
            </m.h2>
          </div>

          <div className={styles.phaseOnePhone}>
            <img src={imgSrc(Phase1Phone)} alt="Phase 1 — unified dashboard" draggable={false} />
          </div>

          <m.h2
            className={`${styles.phaseHeadline} ${styles.phaseTwoHeadline}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12%' }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            Phase 2 — Fix reliability at the architecture level
          </m.h2>

          <m.p
            className={styles.phasePara}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12%' }}
            transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
          >
            Instead of patching the preprocessing layer, I removed the dependency on it
            entirely. Introduced a top-level All / ET Money tab split. The All tab pulls
            holdings directly from MF Central with zero preprocessing — no reconciliation
            layer, no matching errors. The ET Money tab retains the structured product
            view required for SIPs, rebalancing, and goal tracking.
          </m.p>

          <div className={styles.phaseTwoFan}>
            <img src={imgSrc(Phase2Fan)} alt="Phase 2 — All / ET Money tab split pulling directly from MF Central" draggable={false} />
          </div>
        </div>
      </section>

      {/* ── Scene 4: Impact ───────────────────────────────────────────────── */}
      <section className={styles.impact}>
        <div className={styles.impactInner}>
          <span className={styles.sceneLabel}>Impact</span>

          <div className={styles.impactGrid}>
            <div className={styles.impactStat}>
              <div className={styles.impactNumber}>~99.9%</div>
              <div className={styles.impactMeta}>
                <span className={styles.impactStatLabel}>Portfolio accuracy</span>
                <span className={styles.impactNote}>Preprocessing dependency removed</span>
              </div>
            </div>

            <div className={styles.impactDivider} />

            <div className={styles.impactStat}>
              <div className={styles.impactNumber}>↓</div>
              <div className={styles.impactMeta}>
                <span className={styles.impactStatLabel}>Support tickets</span>
                <span className={styles.impactNote}>
                  SIP &amp; transaction queries down after surfacing the workflows
                </span>
              </div>
            </div>
          </div>

          <p className={styles.impactContext}>
            Phase 1&rsquo;s navigation data validated the holdings-first architecture of Phase 2
            — before a single Phase 2 screen was designed.
          </p>

          <div className={styles.reflection}>
            <span className={styles.reflectionLabel}>What I&rsquo;d do differently</span>
            <p className={styles.reflectionText}>
              Validate the Current vs Lifetime toggle earlier with actual Genius and DIY
              users — even 3–4 calls each. We reached the right solution through iteration,
              but early qualitative input would have shortened that path.
            </p>
          </div>

          <a href="/presentation/projects/mutual-dashboard/" className={styles.fullStudyLink}>
            Read the full case study →
          </a>
        </div>
      </section>

      {/* ── Scene 5: Read next ────────────────────────────────────────────── */}
      <section className={styles.nextWrap}>
        <a href="/projects/etmoney-home/" className={styles.nextCard}>
          <div className={styles.nextText}>
            <span className={styles.nextLabel}>Read next</span>
            <h3 className={styles.nextTitle}>ET Money Home Redesign</h3>
            <p className={styles.nextTeaser}>
              Re-architecting how 10M+ investors discover wealth products — an IA redesign
              that turned a subscription-first model around.
            </p>
            <span className={styles.nextCta}>View case study →</span>
          </div>
        </a>
      </section>
    </article>
  );
}
