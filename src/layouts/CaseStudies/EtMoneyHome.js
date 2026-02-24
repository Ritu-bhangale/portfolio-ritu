import { Section } from 'components/Section';
import { Heading } from 'components/Heading';
import { Text } from 'components/Text';
import { CaseSection } from 'components/CaseSection';

import styles from './EtMoneyHome.module.css';

import TestimonialsSVG from 'assets/TestimonialsSVG.svg';
import DiscoveryChart from 'assets/DiscoveryChart.svg';
import MetricsSVG from 'assets/MetricsSVG.svg';
import UserResearchDiagram from 'assets/UserResearchDiagram.svg';
import IAExplorationSVG from 'assets/IAExplorationSVG.svg';
import CompetitorAnalysis from 'assets/CompetitorAnalysis.svg';
import WireframesSVG from 'assets/WireframesSVG.svg';
import FinalV1SVG from 'assets/FinalV1SVG.svg';
import CasesSVG from 'assets/CasesSVG.svg';
import ImpactSVG from 'assets/ImpactSVG.svg';
import GeniusSVG from 'assets/GeniusSvg.svg';

export default function EtMoneyHome() {
  return (
    <>
      <div className={styles.body}>
        <div className={styles.topSections}>
          <Section>
            <div className={`${styles.container} ${styles.hero}`}>
              <Heading level={1} align="start" className={styles.heroTitle}>
                Re-architecting how 10M+ Investors
                <br />
                <span className={styles.heroEmphasis}>Discover</span> Wealth
              </Heading>

              <div className={styles.badgeGroup}>
                <span
                  className={`${styles.badge} ${styles.badgeIconWrap}`}
                  aria-hidden="true"
                >
                  <span className={styles.badgeIcon} />
                </span>
                <span className={`${styles.badge} ${styles.badgeEt}`}>
                  <Text as="span" size="s" className={styles.badgeText}>
                    ET Money
                  </Text>
                </span>
                <span className={`${styles.badge} ${styles.badgeFintech}`}>
                  <Text as="span" size="s" className={styles.badgeText}>
                    Fintech
                  </Text>
                </span>
                <span className={`${styles.badge} ${styles.badgeExplore}`}>
                  <Text as="span" size="s" className={styles.badgeText}>
                    App home - Explore
                  </Text>
                </span>
              </div>
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
        </div>
      </Section>

          <Section>
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
          </Section>
        </div>

        <div className={styles.caseSections}>
        <CaseSection
          timeline="Dec, 2024"
          title={
            <>
              <span className={styles.titleLineMuted}>ET Money introduced a</span>
              <br />
              <span className={styles.titleLineEmphasis}>advisory-led product (Genius)</span>
            </>
          }
          size="large"
        >
          <GeniusSVG />
        </CaseSection>

          <CaseSection
            subtitle={
              <>
                User sentiment started <span className={styles.subtitleEmphasisRed}>worsening</span>
              </>
            }
            size="large"
          >
            <TestimonialsSVG />
          </CaseSection>

          <CaseSection
            timeline="June, 2025"
            subtitleTop="Soon, business had realized that subscriptions doesnt work for indian audiences especially when we handle there money. Also, all our compitetors were offering free. Hence,"
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
            subtitleTop="As we decided to focus on distribution & wealth powerhouse, we realized"
            title={
              <>
                <span className={styles.calloutMuted}>Existing app structure failed to,</span>
                <br />
                <span className={styles.calloutStrong}>support broader discovery</span>
              </>
            }
            size="small"
          >
            <DiscoveryChart />
          </CaseSection>

          <CaseSection subtitle="So we decided to undergo a long pending quest of designing app IA & Home," />

          <CaseSection title="Metrics we were solving for">
            <MetricsSVG />
          </CaseSection>

          <CaseSection
            headerMeta={
              <div className={styles.callMeta}>
                <span className={styles.callMetaIcon} aria-hidden="true">
                  <span className={styles.callMetaIconGlyph}>☎</span>
                </span>
                <span className={styles.callMetaDots} aria-hidden="true">
                  <span className={styles.callMetaDot} />
                  <span className={styles.callMetaDot} />
                  <span className={styles.callMetaDot} />
                </span>
              </div>
            }
            subtitleTop="To start with we started talking to users who have an active AUM & SIPs"
            title="Understanding how users perceived ET Money?"
          >
            <UserResearchDiagram />
          </CaseSection>

          <CaseSection
            size="small"
            title={
              <>
                <span className={styles.calloutMuted}>Early IA Exploration -</span>
                <br />
                <span className={styles.calloutStrong}>Introducing wealth & invest tab</span>
              </>
            }
          >
            <IAExplorationSVG />

            <div className={`${styles.block} ${styles.whatDidntWorkBlock}`}>
              <Text className={styles.label}>What didn't work?</Text>
              <Heading level={5} className={styles.redCallout}>
                Discovery for insurance & cash was still gated behind navigation choices
              </Heading>
            </div>
          </CaseSection>

        <CaseSection
          subtitleTop="Understanding how they drove discovery post & pre first transaction"
          title="How were others driving discovery?"
        >
          <CompetitorAnalysis />
        </CaseSection>

        <CaseSection
          subtitleTop="Mutual fund being our only core product, we decided to have a single explore section with other products living on explore itself & likewise Single dashboard."
          title={
            <>
              Final IA - Solving <span className={styles.wealthEmphasis}>Discovery</span> &{' '}
              <span className={styles.wealthEmphasis}>Tracking</span>
            </>
          }
          size="small"
        >
          <WireframesSVG />
        </CaseSection>

          <CaseSection
            size="small"
            title={
              <>
                <span className={styles.calloutStrong}>Let's talk about explore page now</span>
              </>
            }
          >
            <Text className={styles.textWide}>
              Here's where things got real dirty - Since we were now bringing all products
              we had in a single roof, we wanted to make sure it shouldn't look messier in
              there.
            </Text>
            <Text className={styles.textWide}>
              It all started with endlessly scrolling apps which have multiple products
              like phonepe, paytm, cred etc. Plus explore should cater broadly to all the
              journeys user has to do. Right from first investment to planning there
              retirement corpus.
            </Text>
          </CaseSection>

        <CaseSection
          subtitleTop="Starting with very first purpose - to offer all the solutions we had"
          title={
            <>
              Initial wireframes, that laid the foundations
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
            subtitle="Somehow having just navigation, didn't work. it limited the scope of playing out & experimenting things for various journeys."
          />

          <CaseSection timeline="Live on Nov 15, 2025" title="Final approach">
            <FinalV1SVG />
          </CaseSection>

          <CaseSection
            timeline="Live by March 8, 2026"
            title="Version 2 - Grow your wealth with MF"
            subtitle="Earlier version acted as just a door to our solutions, without stating its importance/ what's inside so - we tried to bring the core out on explore itself"
          />

          <CaseSection title="Handling Cases">
            <div className={styles.block}>
              <Heading level={4}>Zero state</Heading>
              <Text className={styles.textWide}>
                First time visitor/ zero state - users are usually seeking for help & they
                need a guide on where to start.
              </Text>
            </div>

            <CasesSVG />

            <div className={styles.block}>
              <Heading level={4}>Drop - off</Heading>
              <Text className={styles.textWide}>
                Most of the users, explore products and drop-off at certain stage of
                journeys, where we loose huge chunk of opportunity. So tap what they
                thought of earlier right on homescreen.
              </Text>
            </div>
          </CaseSection>

          <CaseSection title="Impact">
            <ImpactSVG />
          </CaseSection>
        </div>

        <Section>
          <div className={styles.container}>
            <div className={styles.quickSummary}>
              <Heading level={3} align="center" className={styles.quickSummaryLead}>
                Read next case study
              </Heading>
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}
