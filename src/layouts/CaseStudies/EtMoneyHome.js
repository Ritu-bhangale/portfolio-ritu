import styles from './EtMoneyHome.module.css';
import videoETMoneyHome from '../../assets/videoETMoneyHome.mp4';
import MetricsProblem from '../../assets/MetricsProblem.png';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectImage,
  ProjectSection,
  ProjectSectionColumns,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from 'layouts/Project';

export default function EtMoneyHome() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* HERO */}
        <section className={styles.heroSection}>
          <h1 className={styles.title}>
            Re-architecting how 10M+ Investors <em>Discover</em> Wealth
          </h1>

          <div className={styles.video}>
            <video
              loop
              playsInline
              className={styles.sidebarVideo}
              src={videoETMoneyHome}
              placeholder={videoETMoneyHome}
              alt="A working prototype."
            />
          </div>
        </section>

        {/* CONTEXT */}
        <section className={styles.textBlock}>
          <h1 className={styles.content}>
            ET Money started as an <em>advisory-led product (Genius)</em> where most users
            interacted with a small, well-defined set of journeys. The App Home was
            designed to support this model and worked well in that context.
          </h1>
          <h1 className={styles.content}>
            As the business shifted to a <em>distribution-first platform</em> and expanded
            into multiple wealth products. A structure that was previously sufficient now
            struggled to surface new offerings and support broader discovery. This case
            study looks at how we evolved the App Home once the existing model stopped
            scaling with the business.
          </h1>
        </section>

        {/* PROBLEM */}
        <section className={styles.section}>
          <h2>The Problem</h2>

          <div className={styles.problemVisual}>
            <ProjectImage
              raised
              key={themeId}
              jarImg
              srcSet={
                isDark
                  ? [MetricsProblem, MetricsProblem]
                  : [MetricsProblem, MetricsProblem]
              }
              placeholder={isDark ? MetricsProblem : MetricsProblem}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
              alt="This is cover image for Viba."
            />
          </div>
        </section>

        {/* WHAT CHANGED */}
        <section className={styles.section}>
          <h2>What Changed</h2>

          {/* NAVIGATION CHANGE */}
          <div className={styles.split}>
            <div>
              <h3>Navigation Re-architecture</h3>
              {/* TODO: Add nav explanation */}
            </div>

            <div className={styles.sideVisual}>{/* TODO: Insert nav visual */}</div>
          </div>

          {/* HOME REDESIGN */}
          <div className={styles.stack}>
            <h3>App Home Rebuild</h3>
            {/* TODO: Add description */}
            <div className={styles.imageStack}>
              {/* TODO: Insert home screen images */}
            </div>
          </div>
        </section>

        {/* IMPACT */}
        <section className={styles.section}>
          <h2>Impact</h2>

          <div className={styles.metrics}>
            <div className={styles.metricCard}>
              <span className={styles.metricValue}>–10 → +73</span>
              <p>NPS improvement</p>
            </div>

            <div className={styles.metricCard}>
              <span className={styles.metricValue}>4% → 22%</span>
              <p>Product discovery CTR</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
