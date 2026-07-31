import { useEffect } from 'react';
import { Meta } from 'components/Meta';
import { Icon } from 'components/Icon';
import { CaseStudyHeader, CaseStudySection } from 'components/CaseStudy';
import { trackCaseStudyOpen, trackExternalLink } from 'utils/analytics';
import { playTap } from 'utils/sound';
import styles from './MutualDashboardShort.module.css';

// Flat 2x exports of the four image frames in the Figma case study
// (file cEgyhLlNbaIltuy4cZzWEt, node 553-5513). Each is a multi-layer mockup
// composition with its own tinted card, rounded corners and, where the design
// has them, baked-in captions, so each is rendered as one full-width image
// rather than reproduced in CSS. Figma node ids are noted per import.
import heroImg from 'assets/mutual-dashboard/short/hero.jpg'; // 559:12278
import appHomeOldVsNew from 'assets/mutual-dashboard/short/app-home-old-vs-new.jpg'; // 555:9593
import mfHoldingsScreen from 'assets/mutual-dashboard/short/mf-holdings-screen.jpg'; // 559:12312
import phase2Screens from 'assets/mutual-dashboard/short/phase2-dashboard-analytics-explore.jpg'; // 559:13948
import nextCardBg from 'assets/case-study/next-card-bg.jpg'; // 570:16323
import nextCardPhone from 'assets/mutual-dashboard/short/next-card-phone.png'; // 570:16326

const TLDR = "2-phase redesign of ET Money's mutual funds dashboard.";

const META = [
  { label: 'Role', value: 'End-to-end, Sole Designer' },
  { label: 'Timeline', value: 'Under 3 months, including tech' },
];

const OUTCOME_STATS = [
  { value: '99.9%', label: 'Portfolio accuracy' },
  { value: '−14.32%', label: 'Support tickets' },
  { value: '2', label: 'Rollouts shipped' },
];

const FULL_STUDY_URL =
  'https://www.figma.com/proto/cEgyhLlNbaIltuy4cZzWEt/Portfolio?node-id=303-26521&viewport=588%2C-96%2C0.11&t=g8iBT0QnK2w4f4Ji-1&scaling=contain&content-scaling=fixed&page-id=1%3A2';

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

export default function MutualDashboardShort() {
  useEffect(() => {
    trackCaseStudyOpen('Mutual Dashboard');
  }, []);

  return (
    <article className={styles.page}>
      <Meta title="Mutual Funds Dashboard – Ritu Bhangale" description={TLDR} />

      <div className={styles.container}>
        {/* Figma node 553:6068 shows only the back pill, the title and the
            Role/Timeline row, so no tl;dr line and no tag pills here. TLDR is
            still used for the page's meta description. */}
        <CaseStudyHeader title="Mutual funds dashboard" meta={META} />

        <img
          className={styles.hero}
          src={heroImg?.src || heroImg}
          width={768}
          height={482}
          alt="Two phones showing the redesigned mutual funds holdings and dashboard screens, beside a wax seal reading 99.9% accuracy"
          draggable={false}
        />

        <div className={styles.sections}>
          <CaseStudySection
            headline="This design started as part of a major restructuring of the app."
            description="Instead of cosmetic changes, I decided to understand the problems users faced and solve them. I started by identifying UX friction points in the current dashboard."
            image={
              <Figure
                src={appHomeOldVsNew}
                width={768}
                height={565}
                alt="The app home screen, older version beside new version"
              />
            }
            className={styles.withMedia}
          />

          <CaseStudySection
            headline="Data analytics, support tickets, and user interviews uncovered something unexpected."
            description={
              <>
                <p>
                  <strong className={styles.leadIn}>UX issues:</strong> buried workflows, no
                  unified view, and portfolio performance that was difficult to understand.
                </p>
                <p>
                  <strong className={styles.leadIn}>Unexpected:</strong> a data problem, where
                  2 to 3% of users saw the wrong values.
                </p>
              </>
            }
          />

          <CaseStudySection
            headline="Built the dashboard by solving for the UX issues, making the portfolio snapshot easy to understand and consume."
            description="Considering engineering effort versus impact, I decided to ship in phases, starting with the UX issues. We were solving for two different users: Genius and DIY. For the portfolio snapshot, Genius investors cared most about total returns. For DIY investors, current returns mattered most."
            image={
              <Figure
                src={mfHoldingsScreen}
                width={768}
                height={565}
                alt="The Phase 1 mutual funds holdings screen, with the portfolio snapshot split into a Current view above Goals, Managed portfolios, Funds on ET Money and External funds"
              />
            }
            className={styles.withMedia}
          />

          <CaseStudySection
            headline="In Phase 2, after understanding the backend deeply, we decided to skip preprocessing entirely."
            description="Phase 1 showed us that users skipped segmentation and wanted to see insights directly. Every fetch from MF Central arrives correct, but a reconciliation engine then matched those transactions to holdings using folio numbers, and for a slice of users it guessed wrong. Phase 2 reads holdings directly from MF Central instead, bypassing that layer. This compromised the segmentation of external and internal funds, so of the two approaches considered, tags at the fund level or a toggle, we shipped the toggle as an All versus ET Money split."
            image={
              <Figure
                src={phase2Screens}
                width={768}
                height={1150}
                alt="Phase 2 shipped screens: the Dashboard tab with its All versus ET Money toggle, and below it the Analytics tab and the Explore funds tab"
              />
            }
            className={styles.withMedia}
          />
        </div>

        {/* Figma node 569:16289: the stat row and the pill sit inside one
            block, 48px apart, with 120px of padding above and below. */}
        <div className={styles.impact}>
          <ul className={styles.outcomeRow}>
            {OUTCOME_STATS.map(stat => (
              <li key={stat.label} className={styles.outcomeStat}>
                <span className={styles.outcomeValue}>{stat.value}</span>
                <span className={styles.outcomeLabel}>{stat.label}</span>
              </li>
            ))}
          </ul>

          {/* Figma node 570:16290 styles this as a soft grey pill rather than
              the site's default solid Button, so it is a plain anchor here. */}
          <a
            href={FULL_STUDY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.fullStudyLink}
            onClick={() => {
              playTap();
              trackExternalLink('figma_prototype', 'Mutual Dashboard full case study');
            }}
          >
            Read full case study
            <Icon className={styles.fullStudyIcon} icon="arrowRight" />
          </a>
        </div>

        <a href="/projects/etmoney-home/" className={styles.nextCard} onClick={playTap}>
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
              <h3 className={styles.nextTitle}>
                Re-architecting how 10M+ investors discover wealth products
              </h3>
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
