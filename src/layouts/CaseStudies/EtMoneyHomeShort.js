import { useRef, useEffect, useState } from 'react';
import { m, useScroll, useTransform, useInView } from 'framer-motion';
import { Meta } from 'components/Meta';
import styles from './EtMoneyHomeShort.module.css';

import HeroPhone from 'assets/etmoney/short/hero-phone.png';
import GeniusPhone from 'assets/etmoney/short/problem-genius-phone.png';
import OlderNav from 'assets/etmoney/short/root-old-nav-diagram.png';
import FinalIaPhone from 'assets/etmoney/short/finalia-bottom-nav.png';
import ExplorePhone from 'assets/etmoney/short/explore-tall.png';

const imgSrc = (img) => img?.src || img;

// ─── Word-by-word animated text ───────────────────────────────────────────────

const AnimatedWord = ({ word, scrollYProgress, start, end, fromColor, toColor }) => {
  const color = useTransform(scrollYProgress, [start, end], [fromColor, toColor]);
  return <m.span style={{ color }}>{word} </m.span>;
};

const AnimatedText = ({
  text,
  scrollYProgress,
  rangeStart,
  rangeEnd,
  fromColor = '#5c5c5c',
  toColor = '#fdfdfd',
  className,
}) => {
  const words = text.split(' ');
  const n = words.length;
  const step = (rangeEnd - rangeStart) / n;
  // Each word fades over ~3.6 steps of scroll while neighbours start every 1
  // step — the heavy overlap makes the reveal read as one continuous wave
  // moving through the line, not discrete words popping in one at a time.
  const duration = step * 3.6;

  return (
    <span className={className}>
      {words.map((word, i) => {
        const start = Math.min(rangeStart + i * step, rangeEnd - 0.01);
        const end = Math.min(start + duration, rangeEnd);
        return (
          <AnimatedWord
            key={`${word}-${i}`}
            word={word}
            scrollYProgress={scrollYProgress}
            start={start}
            end={end}
            fromColor={fromColor}
            toColor={toColor}
          />
        );
      })}
    </span>
  );
};

// ─── Pill badge with corner ticks ─────────────────────────────────────────────

const BadgePill = ({ children }) => (
  <span className={styles.badge}>
    {children}
    <span className={`${styles.badgeTick} ${styles.tickTL}`} aria-hidden />
    <span className={`${styles.badgeTick} ${styles.tickTR}`} aria-hidden />
    <span className={`${styles.badgeTick} ${styles.tickBL}`} aria-hidden />
    <span className={`${styles.badgeTick} ${styles.tickBR}`} aria-hidden />
  </span>
);

// ─── Impact counter ────────────────────────────────────────────────────────────

const CountUp = ({ from, to, duration = 2 }) => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true, margin: '-15%' });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!isInView) return;
    const startTime = Date.now();
    const totalMs = duration * 1000;
    let raf;
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(elapsed / totalMs, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + (to - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{value > 0 ? `+${value}` : value}</span>;
};

// ─── Main ──────────────────────────────────────────────────────────────────────

export default function EtMoneyHomeShort() {
  const containerRef = useRef();
  const problemRef = useRef();
  const rootRef = useRef();

  // Master progress (0→1 across full article) — drives background color
  const { scrollYProgress: masterProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Per-section scroll (0→1 within each sticky wrapper)
  const { scrollYProgress: problemProgress } = useScroll({
    target: problemRef,
    offset: ['start start', 'end start'],
  });
  const { scrollYProgress: rootProgress } = useScroll({
    target: rootRef,
    offset: ['start start', 'end start'],
  });

  // ── Background: white → black, then hold ─────────────────────────────────────
  // Hero white; dark arrives as the problem text begins (words emerge from
  // darkness) and the article stays black through problem + root. There is NO
  // black→white fade: the light sections (scene 4 onward) paint their own solid
  // white background, so the dark→light boundary is a clean hard cut.
  const backgroundColor = useTransform(
    masterProgress,
    [0, 0.03, 0.15, 1],
    ['#fffffe', '#fffffe', '#0f0f0f', '#0f0f0f']
  );

  return (
    <m.article ref={containerRef} style={{ backgroundColor }} className={styles.article}>
      <Meta
        title="ET Money Home Redesign — Ritu Bhangale"
        description="Re-architecting how 10M+ investors discover wealth products. IA redesign and product discovery at ET Money, 2024–25."
      />

      {/* ── Scene 1: Hero ─────────────────────────────────────────────────── */}
      <div className={styles.scene1Wrap}>
        <div className={styles.sticky}>
          <div className={styles.heroGradient} />
          <div className={styles.heroInner}>
            <h1 className={styles.heroHeadline}>
              Re&#8209;architecting how <span className={styles.accentCyan}>10M+</span> investors{' '}
              <span className={styles.accentBlue}>discover</span> wealth products
            </h1>
            <div className={styles.heroPhoneWrap}>
              <img
                src={imgSrc(HeroPhone)}
                alt="ET Money home screen redesign"
                className={styles.heroPhone}
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Scene 2: The Problem ──────────────────────────────────────────── */}
      <div ref={problemRef} className={styles.scene2Wrap}>
        <div className={styles.sticky}>
          <div className={styles.flankInner}>
            <div className={styles.flankColLeft}>
              <p className={styles.animPara}>
                <AnimatedText
                  text="In December 2024, ET Money shifted to a subscription-first model — Genius."
                  scrollYProgress={problemProgress}
                  rangeStart={0.02}
                  rangeEnd={0.34}
                />
              </p>
              <p className={styles.animPara}>
                <AnimatedText
                  text="It worked for 10% of users. For the other 90% — a gated, frustrating experience."
                  scrollYProgress={problemProgress}
                  rangeStart={0.32}
                  rangeEnd={0.82}
                />
              </p>
            </div>

            <div className={styles.flankPhoneCol}>
              <img
                src={imgSrc(GeniusPhone)}
                alt="ET Money Genius subscription home — Dec 2024 release"
                className={styles.flankPhone}
                draggable={false}
              />
              <span className={styles.releaseTag}>Dec 2024 release</span>
            </div>

            <div className={styles.flankColRight}>
              <m.p
                className={styles.flankPara}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                DAU/MAU started <em className={styles.emWarn}>declining.</em> User sentiment
                turned negative.
              </m.p>
              <m.p
                className={styles.flankPara}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{ duration: 0.5, delay: 0.12, ease: 'easeOut' }}
              >
                NPS score dropped to <span className={styles.inlineNps}>−10.</span> Sentiment kept{' '}
                <em className={styles.emWarn}>worsening</em> across platforms.
              </m.p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scene 3: Root Cause ───────────────────────────────────────────── */}
      <div ref={rootRef} className={styles.scene3Wrap}>
        <div className={styles.sticky}>
          <div className={styles.flankInner}>
            <div className={styles.flankColLeft}>
              <p className={styles.animPara}>
                <AnimatedText
                  text="One of the root causes was structural — the app's IA was organised around intent."
                  scrollYProgress={rootProgress}
                  rangeStart={0.03}
                  rangeEnd={0.36}
                />
              </p>
              <p className={styles.animPara}>
                <AnimatedText
                  text="Discovery of FDs, Bonds, NPS — products users actually wanted — was buried behind tab selection and Genius-first flows."
                  scrollYProgress={rootProgress}
                  rangeStart={0.34}
                  rangeEnd={0.85}
                />
              </p>
            </div>

            <div className={styles.flankPhoneCol}>
              <img
                src={imgSrc(OlderNav)}
                alt="Old navigation funnel — users always landed on Genius, FDs buried at 4.32%"
                className={styles.navDiagram}
                draggable={false}
              />
            </div>

            <div className={styles.flankColRightRoot}>
              <m.p
                className={styles.flankPara}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                75% of users who wanted them never knew FDs existed on our app — unless
                we showed them ads.
              </m.p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scene 4: Final IA ─────────────────────────────────────────────── */}
      <div className={styles.scene4Wrap}>
        <div className={styles.finalIaInner}>
          <m.div
            className={styles.finalIaText}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12%' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className={styles.finalIaHeadline}>
              Final IA — solving discovery &amp; tracking
            </h2>
          </m.div>

          <div className={styles.finalIaPhoneCol}>
            <img
              src={imgSrc(FinalIaPhone)}
              alt="Restructured bottom navigation — ET Money, My Wealth, Profile"
              className={styles.finalIaPhone}
              draggable={false}
            />
          </div>

          <m.p
            className={styles.finalIaQuestions}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12%' }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          >
            The IA now answers two clear questions:
            <span className={styles.question}>“What’s happening with my money?”</span>
            <span className={styles.question}>“What do I do with my money?”</span>
          </m.p>
        </div>
      </div>

      {/* ── Scene 5: The new Explore ──────────────────────────────────────── */}
      <div className={styles.scene5Wrap}>
        <div className={styles.exploreHeader}>
          <BadgePill>What I shipped</BadgePill>
          <h2 className={styles.exploreHeadline}>The new Explore</h2>
        </div>

        <div className={styles.exploreInner}>
          <div className={styles.exploreColLeft}>
            <m.p
              className={`${styles.annotation} ${styles.annUnified}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              FDs, Bonds, NPS, and Stocks: direct visibility inside a{' '}
              <span className={styles.annotAccent}>unified Explore.</span>
            </m.p>
            <m.p
              className={`${styles.annotation} ${styles.annPreserve}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              Tried to preserve the intent-based approach &amp; bring out the SKUs at the
              same time.
            </m.p>
          </div>

          <div className={styles.explorePhoneCol}>
            <img
              src={imgSrc(ExplorePhone)}
              alt="Redesigned ET Money Explore — Mutual Funds, Stocks, Smallcase, FDs, Bonds, NPS, fixed deposits"
              className={styles.explorePhone}
              draggable={false}
            />
          </div>

          <div className={styles.exploreColRight}>
            <m.p
              className={`${styles.annotation} ${styles.annMFAnchor}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              Mutual Funds kept as the{' '}
              <span className={styles.annotAccent}>primary anchor</span> — ET Money’s core
              product.
            </m.p>
            <m.p
              className={`${styles.annotation} ${styles.annSKU}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <span className={styles.annotAccent}>SKU-based approach</span> surfaced
              directly in scroll.
            </m.p>
          </div>
        </div>
      </div>

      {/* ── Scene 6: Impact ───────────────────────────────────────────────── */}
      <div className={styles.scene6Wrap}>
        <div className={styles.impactInner}>
          <BadgePill>Impact</BadgePill>

          <div className={styles.impactGrid}>
            <div className={styles.impactStat}>
              <div className={styles.impactNumber}>
                <CountUp from={-10} to={73} duration={1.8} />
              </div>
              <div className={styles.impactMeta}>
                <span className={styles.impactStatLabel}>NPS</span>
                <span className={styles.impactNote}>One month post-launch</span>
              </div>
            </div>

            <div className={styles.impactDivider} />

            <div className={styles.impactStat}>
              <div className={styles.impactNumber}>~15%</div>
              <div className={styles.impactMeta}>
                <span className={styles.impactStatLabel}>Product discoverability</span>
                <span className={styles.impactNote}>Up from 4.32%</span>
              </div>
            </div>
          </div>

          <p className={styles.impactContext}>
            Review sentiment flipped from predominantly negative to overwhelmingly
            positive within weeks of launch.
          </p>

          <a href="/presentation/projects/etmoney-home/" className={styles.fullStudyLink}>
            Read the full case study →
          </a>
        </div>
      </div>

      {/* ── Scene 7: Read next ────────────────────────────────────────────── */}
      <div className={styles.scene7Wrap}>
        <a href="/projects/mutual-dashboard/" className={styles.nextCard}>
          <div className={styles.nextText}>
            <span className={styles.nextLabel}>Read next</span>
            <h3 className={styles.nextTitle}>Mutual Fund Dashboard</h3>
            <p className={styles.nextTeaser}>
              Turning a confusing portfolio screen into a clear answer to “how are my
              investments doing?” — a tracking-first redesign.
            </p>
            <span className={styles.nextCta}>View case study →</span>
          </div>
        </a>
      </div>
    </m.article>
  );
}
