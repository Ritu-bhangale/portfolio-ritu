import { useEffect, useRef, useState } from 'react';
import { Section } from 'components/Section';
import { Heading } from 'components/Heading';
import { Text } from 'components/Text';
import { CaseSection } from 'components/CaseSection';
import { CaseStudyRailNav } from 'components/CaseStudyRailNav';
import styles from './MutualDashboard.module.css';

import TriggeredSection from 'assets/mutual-dashboard/UnderstandingProblem.png';
import WhyCardLeft from 'assets/mutual-dashboard/WhyCardLeft.png';
import WhyIconMiddle from 'assets/mutual-dashboard/WhyPhoneLeft.png';
import WhyCardRight from 'assets/mutual-dashboard/WhyPhoneRight.png';
import AffinitySVG from 'assets/mutual-dashboard/AffinitySVG.svg';
import BuildingV1Img from 'assets/mutual-dashboard/BuildingV1.png';
import InitialPortfolioSnapshotSVG from 'assets/mutual-dashboard/InitialPortfolioSnapshotSVG.svg';
import FinalPortfolioSnapshotSVG from 'assets/mutual-dashboard/FinalPortfolioSnapshotSVG.svg';
import BuildingV2Img from 'assets/mutual-dashboard/BuildingV2SVG.png';
import AnalyticsExploreSVG from 'assets/mutual-dashboard/Analytics&exploreSVG.svg';

const caseStudyNavItems = [
  { id: 'understanding-problem', label: 'Understanding Problem' },
  { id: 'scale', label: 'Scale' },
  { id: 'building-v1', label: 'Building V1' },
  { id: 'portfolio-snapshot', label: 'Portfolio Snapshot' },
  { id: 'architecture', label: 'Architecture Issue' },
  { id: 'building-v2', label: 'Building V2' },
];

export default function MutualDashboard() {
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
              <Heading level={2} align="start" className={styles.heroTitle}>
                Improved portfolio data reliability by redesigning holdings architecture
                to reduce preprocessing dependency, enabling
                <span className={styles.heroEmphasis}> ~99.9%</span> portfolio accuracy.
              </Heading>
            </div>
          </Section>
        </div>

        <CaseStudyRailNav items={caseStudyNavItems} visible={showRailNav} />

        <div className={styles.caseSections}>
          <div id="understanding-problem" className={styles.sectionAnchor} />

          <CaseSection
            timeline="To start with, what triggered Mutual Funds dashboard"
            title={
              <>
                <span className={styles.titleLineMuted}>App IA shifted —</span>
                <br />
                <span className={styles.titleLineEmphasis}>MF needed its own home.</span>
              </>
            }
            size="large"
          >
            <figure className={styles.sectionImage}>
              <img
                src={TriggeredSection?.src || TriggeredSection}
                alt="What triggered the Mutual Funds dashboard redesign"
                loading="lazy"
                className={styles.img}
              />
            </figure>
          </CaseSection>

          {/* Why from scratch — 3-column coded layout */}
          <CaseSection
            title={
              <>
                But why from <span className={styles.emphasisItalic}>scratch?</span>
              </>
            }
            size="large"
          >
            <div className={styles.whyGrid}>
              <div className={styles.whyCard}>
                <div className={styles.whyVisual}>
                  <img
                    src={WhyCardLeft?.src || WhyCardLeft}
                    alt="Portfolio view showing Genius, DIY and External segments separately"
                    className={styles.whyCardImg}
                    loading="lazy"
                  />
                </div>
                <Heading level={5}>
                  No unified view of total mutual funds — Genius, DIY, and External
                  products
                </Heading>
                <ul className={styles.whyList}>
                  <li>
                    <Text as="span" size="m">
                      Current portfolio state
                    </Text>
                  </li>
                  <li>
                    <Text as="span" size="m">
                      Investment performance
                    </Text>
                  </li>
                </ul>
              </div>

              <div className={styles.whyCard}>
                <div className={styles.whyVisual}>
                  <img
                    src={WhyIconMiddle?.src || WhyIconMiddle}
                    alt="Customer support icon representing buried workflows"
                    className={styles.whyIconImg}
                    loading="lazy"
                  />
                </div>
                <Heading level={5}>Buried workflows</Heading>
                <Text size="m">
                  Core investment workflows (locating SIPs, tracking external funds) were
                  difficult to access, leading to increased user support queries
                </Text>
              </div>

              <div className={styles.whyCard}>
                <div className={styles.whyVisual}>
                  <img
                    src={WhyCardRight?.src || WhyCardRight}
                    alt="Portfolio showing MF Central data overlay with incorrect values"
                    className={styles.whyCardImg}
                    loading="lazy"
                  />
                </div>
                <Heading level={5}>
                  2 – 3% users saw incorrect portfolio values — due to core architecture
                  issue
                </Heading>
                <Text size="m">
                  Even though this affected a small percentage, wealth products operate
                  heavily on trust.
                </Text>
              </div>
            </div>
          </CaseSection>

          <div id="scale" className={styles.sectionAnchor} />

          {/* Scale of the problem — coded stat cards */}
          <CaseSection
            title={
              <>
                <span className={styles.greenEmphasis}>Scale</span> of the problem
              </>
            }
            subtitle="Mutual funds formed the backbone of ET Money's ecosystem"
            size="large"
          >
            <div className={styles.scaleGrid}>
              <div className={styles.scaleCard}>
                <Text size="m" className={styles.scaleLabel}>
                  Mutual funds AUM
                  <br />
                  managed by ET Money
                </Text>
                <Heading level={3}>₹1,00,000+ Cr.</Heading>
              </div>
              <div className={styles.scaleCard}>
                <Text size="m" className={styles.scaleLabel}>
                  Transaction in
                  <br />
                  Mutual funds
                </Text>
                <Heading level={3}>2 Million +</Heading>
              </div>
              <div className={styles.scaleCard}>
                <Text size="m" className={styles.scaleLabel}>
                  SIPs on
                  <br />
                  ET Money
                </Text>
                <Heading level={3}>₹10.9 Cr.</Heading>
              </div>
            </div>
          </CaseSection>

          {/* User intent quote — coded text with affinity diagram */}
          <Section>
            <div className={`${styles.container} ${styles.quoteSection}`}>
              <Text size="l" className={styles.quoteLead}>
                User comes to this page to understand —
              </Text>
              <Heading level={2} className={styles.quoteHeading}>
                &ldquo;What&rsquo;s happening with my money?&rdquo;
              </Heading>
              <AffinitySVG className={styles.svgFull} />
            </div>
          </Section>

          <div id="building-v1" className={styles.sectionAnchor} />

          <CaseSection
            title="Building V1"
            subtitle="We retained existing investment segmentation — Goals, Individual funds, External funds — because ET Money still operated through these constructs internally."
            size="large"
          >
            <figure className={styles.sectionImage}>
              <img
                src={BuildingV1Img?.src || BuildingV1Img}
                alt="Building V1 of the Mutual Funds dashboard with phone mockup and annotations"
                loading="lazy"
                className={styles.img}
              />
            </figure>
          </CaseSection>

          <div id="portfolio-snapshot" className={styles.sectionAnchor} />

          {/* Portfolio snapshot — coded before/after layout */}
          <CaseSection
            subtitleTop="Something which was very critical and had to be presented in the most easiest way possible"
            title="Portfolio snapshot"
            subtitle={
              'Since we had to merge all three metrics for Genius, individual funds — it became tough to handle. This grew even more complicated for Genius users because portfolio rebalancing distorted simple "current performance" understanding.'
            }
            size="large"
          >
            <div className={styles.snapshotStack}>
              <div className={styles.snapshotBlock}>
                <Heading level={4} className={styles.snapshotBlockLabel}>
                  Initially we had this
                </Heading>
                <div className={styles.snapshotFrame}>
                  <InitialPortfolioSnapshotSVG className={styles.svgFull} />
                </div>
              </div>

              <div className={styles.snapshotBlock}>
                <Heading level={4} className={styles.snapshotBlockLabel}>
                  Final designs after all the stakeholder alignment
                </Heading>
                <div className={styles.snapshotFrame}>
                  <FinalPortfolioSnapshotSVG className={styles.svgFull} />
                </div>
              </div>
            </div>
          </CaseSection>

          <div id="architecture" className={styles.sectionAnchor} />

          {/* Understanding why it happens — coded architecture flow */}
          <CaseSection
            subtitleTop="But still we were not solving the core architecture problem — which caused inaccuracy in portfolio data for 2–3% of users"
            title={
              <>
                Understanding{' '}
                <span className={styles.emphasisItalic}>why it happens</span>
              </>
            }
            size="large"
          >
            <div className={styles.archContainer}>
              <div className={styles.archFlow}>
                <div className={styles.archStep}>
                  <Text size="m">
                    We get data from
                    <br />
                    MF central
                  </Text>
                </div>

                <span className={styles.archArrow} aria-hidden="true">
                  →
                </span>

                <div className={styles.archStepMiddle}>
                  <div className={styles.archStep}>
                    <Text size="m">
                      We preprocess it —
                      <br />
                      separate external funds
                    </Text>
                  </div>
                  <Text size="s" className={styles.archNote}>
                    Sometimes transactions gets tracked twice, if the NAV date is
                    complicated, Multiple folios connected — These are just few scenarios.
                  </Text>
                </div>

                <span className={styles.archArrow} aria-hidden="true">
                  →
                </span>

                <div className={styles.archStep}>
                  <Heading level={5}>Show bifurcated views</Heading>
                  <Text size="s" className={styles.archStepSub}>
                    for external &amp; internal funds &amp; strategy funds (Funds invested
                    via goal &amp; ultimate sip)
                  </Text>
                </div>
              </div>
            </div>
          </CaseSection>

          <div id="building-v2" className={styles.sectionAnchor} />

          <CaseSection
            title="Building V2"
            subtitle="Top-level segregation into Dashboard, Analytics and Explore tabs — with holdings pulled directly from MF Central, removing preprocessing dependency entirely."
            size="large"
          >
            <figure className={styles.sectionImage}>
              <img
                src={BuildingV2Img?.src || BuildingV2Img}
                alt="Building V2 of the MF Dashboard with dark UI and tab navigation"
                loading="lazy"
                className={styles.img}
              />
            </figure>
          </CaseSection>

          <CaseSection
            title="Analytics & Explore section"
            subtitle="Analytics lets users compare their portfolio against benchmarks and surface all insights in one place. Explore suggests the next fund based on past investments."
            size="large"
          >
            <div className={styles.svgWrap}>
              <AnalyticsExploreSVG className={styles.svgFull} />
            </div>
          </CaseSection>
        </div>
      </div>
    </>
  );
}
