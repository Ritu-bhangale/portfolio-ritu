import { useEffect } from 'react';
import { Meta } from 'components/Meta';
import { Icon } from 'components/Icon';
import { CaseStudyHeader, CaseStudySection } from 'components/CaseStudy';
import { trackCaseStudyOpen } from 'utils/analytics';
import { playHush, playTap } from 'utils/sound';
import styles from './EtMoneyHomeShort.module.css';

// Flat 2x exports of the image frames in the Figma case study
// (file cEgyhLlNbaIltuy4cZzWEt, node 570-16337). Each is a multi-layer mockup
// composition with its own tinted card, rounded corners and, where the design
// has them, baked-in annotations and captions, so each is rendered as one
// full-width image rather than reproduced in CSS. Figma node ids are noted per
// import.
import heroCover from 'assets/etmoney-home/short/hero-cover.jpg'; // 572:20473
import appHomeOldVsNew from 'assets/etmoney-home/short/app-home-old-vs-new.jpg'; // 570:16389
import iaTwoQuestions from 'assets/etmoney-home/short/ia-two-questions.jpg'; // 570:17921
import approaches from 'assets/etmoney-home/short/approaches.jpg'; // 570:17960
import exploreScroll from 'assets/etmoney-home/short/explore-scroll.jpg'; // 572:20476
import impactLaunch from 'assets/etmoney-home/short/impact-launch-reviews.jpg'; // 572:20529
import nextCardBg from 'assets/case-study/next-card-bg.jpg'; // 570:17122, same export as 570:16323
import nextCardPhone from 'assets/mutual-dashboard/short/overview-phone.png';

// Verbatim from Figma node 570:16348 / 570:16351.
const META = [
  { label: 'Role', value: 'Led IA exploration, owned Explore end-to-end' },
  { label: 'Timeline', value: '1.5 months design, 3 months tech' },
];

// The Impact block on this page is not a single three-up row: Figma stacks the
// headline stat above the launch screenshot (node 570:17107), then puts the
// remaining two side by side (node 572:20534).
const LEAD_STAT = { value: '+73', label: 'App-store NPS, up from −10' };

const OUTCOME_STATS = [
  { value: '~15%', label: 'Product discoverability, up from 4.32%' },
  { value: '1.64', label: 'Average products held, up from 1.2' },
];

// Each Figma image frame is 768 wide at 1x; the intrinsic width/height below
// are the 1x frame sizes, so the browser reserves the right box before the
// 2x file loads.
const Figure = ({ src, width, height, alt }) => (
  <img
    className={styles.figure}
    src={src?.src || src}
    width={width}
    height={height}
    alt={alt}
    draggable={false}
    loading="lazy"
  />
);

const Stat = ({ value, label }) => (
  <div className={styles.stat}>
    <span className={styles.statValue}>{value}</span>
    <span className={styles.statLabel}>{label}</span>
  </div>
);

export default function EtMoneyHomeShort() {
  useEffect(() => {
    trackCaseStudyOpen('ET Money Home');
  }, []);

  return (
    <article className={styles.page}>
      <Meta
        title="ET Money Home Redesign – Ritu Bhangale"
        description="An information architecture redesign that fixed how 10M+ investors discover FDs, Bonds, NPS, and Stocks, after a subscription-first shift left 90% of users behind."
      />

      <div className={styles.container}>
        {/* Figma node 570:16340 shows only the back pill, the title and the
            Role/Timeline row, so no tl;dr line and no tag pills here. */}
        <CaseStudyHeader
          className={styles.header}
          title="ETMoney explore 0 - 1"
          meta={META}
        />

        <img
          className={styles.hero}
          src={heroCover?.src || heroCover}
          width={768}
          height={422}
          alt="The redesigned ET Money home screen on a phone, over a dark green cover"
          draggable={false}
        />

        <div className={styles.sections}>
          <CaseStudySection
            headline="Why Redesign?"
            description={
              <>
                <p>
                  Evolving business goals led to a shift in how users perceived ET Money. Our
                  app store &amp; Play store reviews started reflecting the same.
                </p>
                <p>
                  The existing app structure didn&rsquo;t support the goal of ET Money to be a
                  wealth powerhouse.
                </p>
              </>
            }
            image={
              <Figure
                src={appHomeOldVsNew}
                width={768}
                height={565}
                alt="The ET Money app home screen, older version beside the new version"
              />
            }
          />

          <CaseStudySection
            headline="Rebuilt the IA"
            description="One unified Explore now holds every product, with Mutual Funds kept as the anchor since it is still ET Money's core business. Tracking moved into a single consolidated dashboard, so discovery and tracking stopped competing for the same space."
            image={
              <div className={styles.stack}>
                <Figure
                  src={iaTwoQuestions}
                  width={768}
                  height={334}
                  alt="The redesigned bottom navigation, where the ET Money tab answers what can I do with my money and the My Wealth tab answers what is happening with my money"
                />
                <div className={styles.approaches}>
                  <p className={styles.approachesCaption}>
                    Different approaches &amp; iterations
                  </p>
                  <Figure
                    src={approaches}
                    width={768}
                    height={401}
                    alt="Approach 1, gated discovery, beside approach 2, gated discovery with product SKUs revealed on scroll"
                  />
                </div>
              </div>
            }
          />
        </div>

        <div className={styles.exploreScroll}>
          <Figure
            src={exploreScroll}
            width={768}
            height={995}
            alt="The shipped Explore screen scrolled top to bottom, with Genius and investment solutions upfront, every other ET Money product below them, and SKU based cards further down the scroll"
          />
        </div>

        <section className={styles.impact}>
          <h2 className={styles.impactHeading}>Impact</h2>

          <div className={styles.impactBody}>
            <Stat value={LEAD_STAT.value} label={LEAD_STAT.label} />

            <Figure
              src={impactLaunch}
              width={768}
              height={691}
              alt="A team Slack channel filling with positive Play Store reviews in the first few hours of launch"
            />

            <div className={styles.statRow}>
              {OUTCOME_STATS.map(stat => (
                <Stat key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>

            <a
              href="/presentation/projects/etmoney-home/"
              className={styles.fullStudyLink}
              onClick={playTap}
            >
              Read full case study
              <Icon className={styles.fullStudyIcon} icon="arrowRight" />
            </a>
          </div>
        </section>

        {/* Figma node 570:17121 styles this card but fills it with this page's
            own title, which would point the reader back here, so the copy,
            link and phone are the mutual funds dashboard's. */}
        <a
          href="/projects/mutual-dashboard/"
          className={styles.nextCard}
          onMouseEnter={playHush}
          onClick={playTap}
        >
          <img
            className={styles.nextCardBg}
            src={nextCardBg?.src || nextCardBg}
            alt=""
            aria-hidden="true"
            draggable={false}
            loading="lazy"
          />
          <div className={styles.nextText}>
            <div className={styles.nextHeading}>
              <span className={styles.nextLabel}>Next case study</span>
              <h3 className={styles.nextTitle}>Mutual funds dashboard</h3>
            </div>
            <span className={styles.nextCta}>
              Read
              <Icon className={styles.nextCtaIcon} icon="arrowRight" />
            </span>
          </div>
          <img
            className={styles.nextCardPhone}
            src={nextCardPhone?.src || nextCardPhone}
            alt=""
            aria-hidden="true"
            draggable={false}
            loading="lazy"
          />
        </a>
      </div>
    </article>
  );
}
