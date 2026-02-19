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

export const EtMoneyHome = () => {
  return (
    <>
      {/* HERO */}
      <Section>
        <div className={styles.container}>
          <Heading level={2}>
            Re-architecting how 10M+ Investors <em>Discover</em> Wealth
          </Heading>
        </div>
      </Section>

      {/* IMPACT + META */}
      <Section>
        <div className={styles.container}>
          <Heading level={3}>Impact</Heading>
          <Text size="m">NPS Score: -10 → +73</Text>
          <Text size="m">Enhanced Product discovery: 4.32% → ~22%</Text>
        </div>
      </Section>

      {/* TIMELINE ENTRY */}
      <CaseSection
        timeline="Dec, 2024"
        title="ET Money introduced a advisory-led product (Genius)"
      />

      <CaseSection title="User sentiment started worsening">
        <TestimonialsSVG />
      </CaseSection>

      <CaseSection
        timeline="June, 2025"
        subtitle="Soon, business had realized that subscriptions doesnt work..."
      />

      <CaseSection
        title="As we decided to focus on distribution & wealth powerhouse, we realized"
        subtitle="Existing app structure failed to support broader discovery"
      >
        <DiscoveryChart />
      </CaseSection>

      <CaseSection title="So we decided to undergo a long pending quest of designing app IA & Home," />

      <CaseSection title="Metrics we were solving for">
        <MetricsSVG />
      </CaseSection>

      <CaseSection
        title="To start with we started talking to users who have an active AUM & SIPs"
        subtitle="Understanding how users perceived ET Money?"
      >
        <UserResearchDiagram />
      </CaseSection>

      <CaseSection
        title="Early IA Exploration - Introducing wealth & invest tab"
        subtitle="All investment products including MF, Genius & Fixed income — All investments at one place"
      >
        <IAExplorationSVG />
      </CaseSection>

      <CaseSection
        title="Understanding how they drove discovery post & pre first transaction"
        subtitle="How were others driving discovery?"
      >
        <CompetitorAnalysis />
      </CaseSection>

      <CaseSection
        title="Initial wireframes, that laid the foundations"
        subtitle="Navigation - only approach"
      >
        <WireframesSVG />
      </CaseSection>

      <CaseSection title="Navigation + SKU approach" />

      <CaseSection
        timeline="Live on Nov 15, 2025"
        title="Final approach"
        subtitle="All the Genius/ investment solutions products upfront — All other products on ET Money - One stop solution quite literally"
      >
        <FinalV1SVG />
      </CaseSection>

      <CaseSection
        timeline="Live by March 8, 2026"
        title="Version 2 - Grow your wealth with MF"
        subtitle="Earlier version acted as just a door to our solutions..."
      ></CaseSection>

      <CaseSection title="Handling Cases">
        <CasesSVG />
      </CaseSection>

      <CaseSection title="Impact">
        <ImpactSVG />
      </CaseSection>

      <Section>
        <div className={styles.container}>
          <Heading level={3}>Read next case study</Heading>
        </div>
      </Section>
    </>
  );
};
