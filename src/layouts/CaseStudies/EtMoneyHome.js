import { useEffect, useRef, useState } from 'react';
import { Section } from 'components/Section';
import { Heading } from 'components/Heading';
import { Text } from 'components/Text';
import { CaseSection } from 'components/CaseSection';
import { StickyNote } from 'components/StickyNote';
import { CaseStudyRailNav } from 'components/CaseStudyRailNav';
import styles from './EtMoneyHome.module.css';

import DiscoveryChart from 'assets/etmoney/DiscoveryChart.svg';
import IAExplorationSVG from 'assets/etmoney/IAExplorationSVG.svg';
import CompetitorAnalysis from 'assets/etmoney/CompetitorAnalysis.svg';
import WireframesSVG from 'assets/etmoney/WireframesSVG.svg';
import FinalV1SVG from 'assets/etmoney/FinalV1SVG.svg';
import CasesSVG from 'assets/etmoney/CasesSVG.svg';
import GeniusSVG from 'assets/etmoney/GeniusSvg.svg';
import ReviewSS1 from 'assets/etmoney/ReviewSS1.png';
import ReviewSS2 from 'assets/etmoney/ReviewSS2.png';
import ReviewSS3 from 'assets/etmoney/ReviewSS3.png';
import ReviewSS4 from 'assets/etmoney/ReviewSS4.png';
import ReviewSS5 from 'assets/etmoney/ReviewSS5.png';
import FinalIA from 'assets/etmoney/FinalIA.svg';
import BulbIcon from 'assets/etmoney/bulb.svg';
import AnnotationIcon from 'assets/shared/annotationIcon.svg';
import NavSKUapproach from 'assets/etmoney/NavSKUapproach.svg';
import V2Growwealth from 'assets/etmoney/V2Growwealth.svg';
import DropOffSVG from 'assets/etmoney/DropOffSVG.svg';
import NewProduct from 'assets/etmoney/NewProduct.svg';
import ImpactLaunchScreenshot from 'assets/etmoney/impactLaunchScreenshot.png';
import ImpactSvg from 'assets/etmoney/ImpactSvg.svg';
import UsersentimentSvg from 'assets/etmoney/UsersentimentSvg.svg';
import ExploreThumbnail from 'assets/etmoney/ExploreThumbnail.png';

const caseStudyNavItems = [
  { id: 'context', label: 'Context' },
  { id: 'problem-discover', label: 'Problem Discover' },
  { id: 'exploration-insights', label: 'Exploration Insights' },
  { id: 'solution', label: 'Solution' },
  { id: 'v2-cases', label: 'V2 & Cases' },
  { id: 'impact', label: 'Impact' },
];

const reviewScreenshotSlots = [
  {
    id: 'review-01',
    src: ReviewSS1,
    alt: 'ET Money review screenshot 1',
  },
  {
    id: 'review-02',
    src: ReviewSS2,
    alt: 'ET Money review screenshot 2',
  },
  {
    id: 'review-03',
    src: ReviewSS3,
    alt: 'ET Money review screenshot 3',
  },
  {
    id: 'review-04',
    src: ReviewSS4,
    alt: 'ET Money review screenshot 4',
  },
  {
    id: 'review-05',
    src: ReviewSS5,
    alt: 'ET Money review screenshot 5',
  },
];

const metricNotes = [
  {
    id: 'aum',
    text: 'Increase AUM managed by ET Money',
    backText: '...',
    interaction: 'flip',
    variant: 'aqua',
    icon: BulbIcon,
    rotate: 0,
    y: 0,
  },
  {
    id: 'average-products',
    text: 'Increase average products held per user (from 1.2)',
    backText: '...',
    interaction: 'flip',
    variant: 'green',
    icon: BulbIcon,
    rotate: 2,
    y: 22,
  },
  {
    id: 'nps',
    text: 'Improve NPS and restore positive user sentiment',
    backText: '...',
    interaction: 'flip',
    variant: 'yellow',
    icon: BulbIcon,
    rotate: -7,
    y: 6,
  },
];

const exploreNotes = [
  {
    id: 'surface',
    text: 'Surface everything',
    variant: 'aqua',
    icon: BulbIcon,
    rotate: 0,
    className: 'exploreNoteAqua',
  },
  {
    id: 'clarity',
    text: 'Maintain clarity',
    variant: 'yellow',
    icon: BulbIcon,
    rotate: -7,
    className: 'exploreNoteYellow',
  },
  {
    id: 'intent',
    text: 'Guide users by intent',
    variant: 'green',
    icon: BulbIcon,
    rotate: 6,
    className: 'exploreNoteGreen',
  },
  {
    id: 'fatigue',
    text: 'Avoid scroll fatigue',
    backText: 'Highlight next-best actions to keep momentum.',
    variant: 'pink',
    interaction: 'flip',
    icon: AnnotationIcon,
    rotate: -6,
    className: 'exploreNotePink',
  },
];

export default function EtMoneyHome() {
  const metricsBoardRef = useRef(null);
  const exploreNotesRef = useRef(null);
  const topSectionsRef = useRef(null);
  const [showRailNav, setShowRailNav] = useState(false);

  useEffect(() => {
    const updateRailVisibility = () => {
      if (!topSectionsRef.current) return;
      const topSectionsBottom = topSectionsRef.current.getBoundingClientRect().bottom;
      setShowRailNav(topSectionsBottom <= 0);
    };

    updateRailVisibility();
    window.addEventListener('scroll', updateRailVisibility, { passive: true });
    window.addEventListener('resize', updateRailVisibility);

    return () => {
      window.removeEventListener('scroll', updateRailVisibility);
      window.removeEventListener('resize', updateRailVisibility);
    };
  }, []);

  return (
    <>
      <div className={styles.body}>
        <div className={styles.topSections} ref={topSectionsRef}>
          <Section>
            <div className={`${styles.container} ${styles.hero}`}>
              <Heading level={1} align="start" className={styles.heroTitle}>
                Re-architecting how 10M+ Investors
                <span className={styles.heroEmphasis}> Discover</span> Wealth
              </Heading>
            </div>
          </Section>

          <Section>
            <div className={styles.container}>
              <div className={styles.roleImpactGrid}>
                <div className={styles.roleImpactCard}>
                  <Heading level={5}>Impact</Heading>
                  <div className={styles.metrics}>
                    <Text size="m" className={styles.metricItem}>
                      NPS Score: -10 to +73
                    </Text>
                    <Text size="m" className={styles.metricItem}>
                      Enhanced Product discovery:
                      <br />
                      4.32% to ~22%
                    </Text>
                  </div>
                </div>

                <div className={styles.roleImpactCard}>
                  <Heading level={5}>Stakeholders</Heading>
                  <ul className={styles.list}>
                    <li>
                      <Text as="span" size="m">
                        Raman - Director of Design
                      </Text>
                    </li>
                    <li>
                      <Text as="span" size="m">
                        Anubha, Punit - Product Manager
                      </Text>
                    </li>
                    <li>
                      <Text as="span" size="m">
                        Leadership involvement: CEO, COO, VP
                      </Text>
                    </li>
                  </ul>
                  <Text size="m">
                    My role: Led IA exploration and owned the Explore redesign end-to-end.
                  </Text>
                </div>

                <div className={styles.roleImpactCard}>
                  <Heading level={5}>Duration</Heading>
                  <div className={styles.stepper}>
                    <div className={styles.step}>
                      <span className={styles.stepDot} aria-hidden="true" />
                      <Text size="m">Design timeline: 1.5 Months</Text>
                    </div>
                    <div className={styles.step}>
                      <span className={styles.stepDot} aria-hidden="true" />
                      <Text size="m">Tech: 3 Months</Text>
                    </div>
                    <div className={styles.step}>
                      <span className={styles.stepDot} aria-hidden="true" />
                      <Text size="m">
                        New design got published on: 5th
                        <br />
                        November
                      </Text>
                    </div>
                  </div>
                </div>
              </div>

              <figure className={styles.exploreThumbnailCard}>
                <img
                  className={styles.exploreThumbnailImage}
                  src={ExploreThumbnail?.src || ExploreThumbnail}
                  alt="ET Money Explore page redesign"
                  loading="lazy"
                />
              </figure>
            </div>
          </Section>

          {/* <Section>
            <div className={styles.container}>
              <div className={styles.quickSummary}>
                <Heading level={3} align="center" className={styles.quickSummaryLead}>
                  Got only 30 seconds?
                </Heading>
                <Heading level={3} align="center" className={styles.quickSummaryTitle}>
                  Quickly know what we did
                </Heading>
              </div>
            </div>
          </Section> */}
        </div>

        <CaseStudyRailNav items={caseStudyNavItems} visible={showRailNav} />
        <div className={styles.caseSections}>
          <div id="context" className={styles.sectionAnchor} />
          <CaseSection
            timeline="Back in Dec, 2024"
            title={
              <>
                <span className={styles.titleLineMuted}>ET Money introduced a</span>
                <br />
                <span className={styles.titleLineEmphasis}>
                  advisory-led product (Genius)
                </span>
              </>
            }
            size="large"
          >
            <GeniusSVG />
          </CaseSection>

          <CaseSection
            title={
              <>
                <span className={styles.titleLineMuted}>Impact of </span>
                <span className={styles.titleLineEmphasis}>Dec’24 </span>
                <span className={styles.titleLineMuted}>release</span>
              </>
            }
            subtitle="The release successfully increased Genius adoption, but its impact varied significantly across user cohorts."
            size="large"
          >
            <ImpactSvg />
          </CaseSection>

          <CaseSection
            subtitle={
              <>
                User sentiment started{' '}
                <span className={styles.subtitleEmphasisRed}>worsening</span>
              </>
            }
            size="large"
          >
            <UsersentimentSvg />
          </CaseSection>
          <div id="problem-discover" className={styles.sectionAnchor} />

          <CaseSection
            timeline="June, 2025"
            subtitleTop="The business recognized that a subscription model was not resonating with Indian users — especially in a category involving personal finances. At the same time, competitors were offering similar solutions for free."
            title={
              <>
                We decided to shift towards being
                <br />
                <span className={styles.wealthEmphasis}>Wealth powerhouse.</span>
              </>
            }
            size="small"
            showGuides
          />

          <CaseSection
            subtitleTop="As we shifted focus toward distribution and building a wealth powerhouse, we uncovered a structural gap."
            title={
              <>
                <span className={styles.structuralHeadingTop}>
                  Existing IA was{' '}
                  <span className={styles.headingItalics}>intent first. </span>
                </span>
                <br />
                <span className={styles.structuralHeadingStrong}>
                  User behaviour was{' '}
                  <span className={styles.headingItalics}>product-first. </span>
                </span>
              </>
            }
            size="small"
          >
            <DiscoveryChart />
          </CaseSection>

          <Section>
            <div className={`${styles.container} ${styles.iaNarrativeSection}`}>
              <Text size="l" className={styles.iaNarrativeLead}>
                To address this gap, we initiated a long-overdue effort to rethink the
                app&apos;s Information Architecture and Home experience.
              </Text>
              <Text size="l" variant="serif" className={styles.iaNarrativeHeading}>
                This wasn&apos;t just a UI update - it required restructuring how users
                navigate, discover, and understand the breadth of what ET Money offers.
              </Text>
            </div>
          </Section>

          <div id="exploration-insights" className={styles.sectionAnchor} />
          <CaseSection size="small" title="Metrics we were solving for">
            <div className={styles.metricsBoard} ref={metricsBoardRef}>
              {metricNotes.map(note => (
                <StickyNote
                  key={note.id}
                  text={note.text}
                  backText={note.backText}
                  interaction={note.interaction}
                  size="large"
                  variant={note.variant}
                  icon={note.icon}
                  constraintsRef={metricsBoardRef}
                  rotate={note.rotate}
                  y={note.y}
                />
              ))}
            </div>
          </CaseSection>

          <CaseSection
            size="small"
            title={
              <>
                <span className={styles.calloutMuted}>Early IA Exploration -</span>
                <br />
                <span className={styles.calloutStrong}>
                  Introducing wealth & invest tab
                </span>
              </>
            }
          >
            <IAExplorationSVG />

            <div className={`${styles.block} ${styles.whatDidntWorkBlock}`}>
              <Text className={styles.label}>What didn&apos;t work?</Text>
              <Heading level={5} className={styles.redCallout}>
                Discovery for Insurance and Cash remained gated behind tab selection,
                limiting passive exploration and cross-product visibility.
              </Heading>
            </div>
          </CaseSection>

          <CaseSection
            subtitleTop="Understanding how they drove discovery post & pre first transaction"
            title="How were others driving discovery?"
          >
            <CompetitorAnalysis />
          </CaseSection>

          <div id="solution" className={styles.sectionAnchor} />
          <CaseSection
            size="small"
            subtitleTop="Mutual Funds being our primary core product, we chose to retain a single unified Explore section — with all other products integrated within it, supported by a single consolidated dashboard."
            title={
              <>
                Final IA - Solving{' '}
                <span className={styles.wealthEmphasis}>Discovery</span> &{' '}
                <span className={styles.wealthEmphasis}>Tracking</span>
              </>
            }
          >
            <FinalIA />
          </CaseSection>

          <CaseSection size="small" title="Reimagining the Explore Page">
            <div className={styles.exploreSection}>
              <div className={styles.exploreTextColumn}>
                <Heading level={4} className={styles.exploreSubHeading}>
                  Constraints
                </Heading>
                <ul className={styles.exploreList}>
                  <li>All products under one roof</li>
                  <li>Risk: Visual & cognitive clutter</li>
                </ul>

                <Heading level={4} className={styles.exploreSubHeading}>
                  User Expectation
                </Heading>
                <Text className={styles.exploreBodyText}>
                  Users have multiple financial journeys. Explore must serve all - without
                  overwhelming.
                </Text>
                <div className={styles.exploreFlow} aria-label="User journey flow">
                  <span className={styles.exploreFlowTag}>Invest</span>
                  <span className={styles.exploreFlowArrow} aria-hidden="true">
                    →
                  </span>
                  <span className={styles.exploreFlowTag}>Save</span>
                  <span className={styles.exploreFlowArrow} aria-hidden="true">
                    →
                  </span>
                  <span className={styles.exploreFlowTag}>Protect</span>
                  <span className={styles.exploreFlowArrow} aria-hidden="true">
                    →
                  </span>
                  <span className={styles.exploreFlowTag}>Retire</span>
                </div>
              </div>

              <div className={styles.exploreNotesBoard} ref={exploreNotesRef}>
                {exploreNotes.map(note => (
                  <StickyNote
                    key={note.id}
                    text={note.text}
                    backText={note.backText}
                    interaction={note.interaction}
                    size="small"
                    variant={note.variant}
                    icon={note.icon}
                    constraintsRef={exploreNotesRef}
                    rotate={note.rotate}
                    className={styles[note.className]}
                  />
                ))}
              </div>
            </div>
          </CaseSection>

          <CaseSection
            subtitleTop="We began with a simple objective: surface all available solutions clearly."
            title={
              <>
                <span className={styles.calloutMuted}>
                  Initial wireframes, that laid the foundations
                </span>
                <br />
                <span className={styles.titleEmphasis}>Navigation - only</span> approach
              </>
            }
            size="small"
          >
            <WireframesSVG />
          </CaseSection>

          <CaseSection
            title="Navigation + SKU approach"
            size="small"
            subtitle="Having only a navigation-led structure proved restrictive. It limited our ability to surface multiple journeys dynamically and experiment across user contexts."
          >
            <NavSKUapproach />
          </CaseSection>

          <CaseSection
            size="small"
            timeline="Live on Nov 15, 2025"
            title="Final approach"
          >
            <FinalV1SVG />
          </CaseSection>

          <div id="v2-cases" className={styles.sectionAnchor} />
          <CaseSection
            timeline="Live by March 8, 2026"
            size="small"
            title="Version 2 - Grow your wealth with MF"
            subtitle="Earlier version acted as just a door to our solutions, without stating its importance/ what's inside so - we tried to bring the core out on explore itself"
          >
            <V2Growwealth />
          </CaseSection>

          <CaseSection title="Handling Cases" size="small">
            <div className={styles.block}>
              <Heading level={4}>Zero state</Heading>
              <Text className={styles.textWide}>
                For first-time visitors, users are typically looking for direction and
                clarity on where to begin.
              </Text>
              <CasesSVG />
            </div>

            <div className={styles.block}>
              <Heading level={4}>Drop - off</Heading>
              <Text className={styles.textWide}>
                Many users explored products but dropped off mid-journey, leading to lost
                opportunities, so we surfaced contextual reminders on the homescreen to
                help them resume incomplete actions.
              </Text>
              <DropOffSVG />
            </div>
            <div className={styles.block}>
              <Heading level={4}>New product</Heading>
              <Text className={styles.textWide}>
                A dedicate section introduce New launches/ Major products updates.
              </Text>
              <NewProduct />
            </div>
          </CaseSection>

          <div id="impact" className={styles.sectionAnchor} />
          <CaseSection size="small" timeline="Within a month of launch" title="Impact">
            <div className={styles.impactSection}>
              <div className={styles.impactLead}>
                <Heading level={2} className={styles.impactValue}>
                  -10 -&gt; +73
                </Heading>
                <Heading level={3} className={styles.impactPrimaryLabel}>
                  App-store NPS (written reviews)
                </Heading>
                <Text className={styles.impactPrimaryDescription}>
                  User sentiment shifted significantly, with reviews highlighting improved
                  simplicity, clearer navigation, and overall experience.
                </Text>
              </div>

              <figure className={styles.impactLaunchCard}>
                <img
                  className={styles.impactLaunchImage}
                  src={ImpactLaunchScreenshot?.src || ImpactLaunchScreenshot}
                  alt="First few hours of launch"
                  loading="lazy"
                />
              </figure>

              <div className={styles.impactMetricStack}>
                <div className={styles.impactMetricCard}>
                  <Heading level={4} className={styles.impactMetricValue}>
                    4% -&gt; 15%
                  </Heading>
                  <Heading level={4} className={styles.impactMetricTitle}>
                    CTR/ Product discoverability
                  </Heading>
                  <Text className={styles.impactMetricSubtitle}>(Avg & Approx)</Text>
                </div>

                <div className={styles.impactMetricCard}>
                  <Heading level={4} className={styles.impactMetricValue}>
                    1.2 -&gt; 1.64
                  </Heading>
                  <Heading level={4} className={styles.impactMetricTitle}>
                    Average product holdings
                  </Heading>
                </div>
              </div>
            </div>
          </CaseSection>
        </div>

        {/* <Section>
          <div className={styles.container}>
            <div className={styles.quickSummary}>
              <Heading level={3} align="center" className={styles.quickSummaryLead}>
                Read next case study
              </Heading>
            </div>
          </div>
        </Section> */}
      </div>
    </>
  );
}
