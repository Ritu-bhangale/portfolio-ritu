import styles from './EtMoneyHome.module.css';
import iconPhone from '../../assets/icon-phone.svg';

export default function EtMoneyHome() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* HERO SECTION */}
        <section className={styles.heading}>
          <h1 className={styles.title}>
            Re-architecting how 10M+ Investors <em>Discover</em> Wealth
          </h1>

          <div className={styles.badgeGroup}>
            <div className={styles.badge}>
              <div className={styles.badgeIcon}>
                <img src={iconPhone} alt="phone" />
              </div>
            </div>
            <div className={`${styles.badge} ${styles.badgeGreen}`}>
              <p className={styles.badgeText}>ET Money</p>
            </div>
            <div className={`${styles.badge} ${styles.badgePurple}`}>
              <p className={styles.badgeText}>Fintech</p>
            </div>
            <div className={`${styles.badge} ${styles.badgeBlue}`}>
              <p className={styles.badgeText}>App home - Explore</p>
            </div>
          </div>
        </section>

        {/* IMPACT CARDS SECTION */}
        <section className={styles.impactSection}>
          <div className={styles.impactCard}>
            <h2 className={styles.cardHeading}>Impact</h2>
            <div className={styles.metricsGroup}>
              <div className={styles.metricBox}>
                <p className={styles.metricText}>NPS Score: -10 →+73</p>
              </div>
              <div className={styles.metricBox}>
                <p className={styles.metricText}>
                  Enhanced Product discovery: <br />
                  4.32% →~22%
                </p>
              </div>
            </div>
          </div>

          <div className={styles.impactCard}>
            <h2 className={styles.cardHeading}>Stakeholders</h2>
            <ul className={styles.stakeholderList}>
              <li>Raman — Director of Design</li>
              <li>Anubha, Punit — Product Manager</li>
              <li>Leadership involvement: CEO, COO, VP</li>
            </ul>
            <p className={styles.roleText}>
              My role: Led IA exploration and owned the Explore redesign end-to-end.
            </p>
          </div>

          <div className={styles.impactCard}>
            <h2 className={styles.cardHeading}>Duration</h2>
            <div className={styles.durationText}>
              <p>Design timeline: 1.5 Months</p>
              <p>
                Tech: 3 Months
                <br />
                New design got published on: 5th November
              </p>
            </div>
          </div>
        </section>

        {/* 30 SECONDS SUMMARY SECTION */}
        <section className={styles.summarySection}>
          <h2 className={styles.sectionTitle}>
            Got only 30 seconds? Quickly know what we did
          </h2>
        </section>

        {/* DETAILED CONTENT SECTION */}
        <section className={styles.detailedSection}>
          {/* Timeline entry 1 */}
          <article className={styles.timelineEntry}>
            <div className={styles.timeline}>
              <div className={styles.timelineIndicator}>
                <span className={styles.dot}></span>
                <span className={styles.date}>Dec, 2024</span>
              </div>
              <p className={styles.timelineText}>
                ET Money introduced a advisory-led product (Genius)
              </p>
            </div>
          </article>

          {/* Timeline entry 2 */}
          <article className={styles.timelineEntry}>
            <div className={styles.timeline}>
              <p className={styles.largeHeading}>User sentiment started worsening</p>
              <div className={styles.testimonialGrid}>
                <Testimonial
                  rating={1}
                  quote="The app has become overcomplicated and keeps pushing paid membership everywhere. This is not what I signed up for."
                  author="Sangram Nandkhile"
                />
                <Testimonial
                  rating={1}
                  quote="The app feels more predatory now — I can't even find my portfolio breakdown or withdraw easily anymore."
                  author="Rishav Ganguli"
                />
                <Testimonial
                  rating={1}
                  quote="Stopping a SIP took multiple ad screens. The UI is frustrating and made me switch platforms"
                  author="Kunal Chowdhury"
                />
                <Testimonial
                  rating={1}
                  quote="What used to be simple is now a mess. Basic reports and tracking are hard to find or paid."
                  author="Sattison Aguiar"
                />
                <Testimonial
                  rating={2}
                  quote="Too many ads and constant Genius promotions make the app feel cluttered and below average."
                  author="Glen George"
                />
              </div>
            </div>
          </article>

          {/* Timeline entry 3 */}
          <article className={styles.timelineEntry}>
            <div className={styles.timeline}>
              <div className={styles.timelineIndicator}>
                <span className={styles.dot}></span>
                <span className={styles.date}>June, 2025</span>
              </div>
              <p className={styles.longText}>
                Soon, business had realized that subscriptions doesnt work for indian
                audiences especially when we handle there money. Also, all our compitetors
                were offering free. Hence,
              </p>
              <p className={styles.boldText}>
                We decided to shift towards being Wealth powerhouse.
              </p>
            </div>
          </article>

          {/* Timeline entry 4 */}
          <article className={styles.timelineEntry}>
            <div className={styles.timeline}>
              <p className={styles.largeHeading}>
                As we decided to focus on distribution & wealth powerhouse, we realized
              </p>
              <p className={styles.highlightText}>
                Existing app structure failed to support broader discovery
              </p>
              <DiscoveryChart />
            </div>
          </article>

          {/* Timeline entry 5 */}
          <article className={styles.timelineEntry}>
            <p className={styles.sectionHeading}>
              So we decided to undergo a long pending quest of designing app IA & Home,
            </p>
          </article>

          {/* Metrics section */}
          <article className={styles.metricsSection}>
            <h2 className={styles.sectionTitle}>Metrics we were solving for</h2>
            <div className={styles.metricsCards}>
              <div className={styles.metricCardBox}>
                <p className={styles.metricDescription}>
                  Increasing AUM Managed by ET Money
                </p>
              </div>
              <div className={styles.metricCardBox}>
                <p className={styles.metricDescription}>
                  User invested in 1.2 products on et money in average, we wanted to
                  increase that
                </p>
              </div>
              <div className={styles.metricCardBox}>
                <p className={styles.metricDescription}>
                  Increasing NPS & driving user sentiment positive again
                </p>
              </div>
            </div>
          </article>

          {/* User research section */}
          <article className={styles.researchSection}>
            <h2 className={styles.largeHeading}>
              To start with we started talking to users who have an active AUM & SIPs
            </h2>
            <p className={styles.subheading}>
              Understanding how users perceived ET Money?
            </p>
            <UserResearchDiagram />
          </article>

          {/* IA Exploration section */}
          <article className={styles.explorationSection}>
            <h2 className={styles.sectionTitle}>
              Early IA Exploration - Introducing wealth & invest tab
            </h2>
            <p className={styles.explorationNote}>
              All investment products including MF, Genius & Fixed income — All
              investments at one place
            </p>
            <div className={styles.explorationWhatDidntWork}>
              <h3>What didn't work?</h3>
              <p>
                Discovery for insurance & cash was still gated behind navigation choices
              </p>
            </div>
          </article>

          {/* Design exploration section */}
          <article className={styles.explorationSection}>
            <h2 className={styles.largeHeading}>
              Understanding how they drove discovery post & pre first transaction
            </h2>
            <p className={styles.subheading}>How were others driving discovery?</p>
            <CompetitorAnalysis />
          </article>

          {/* Wireframes section */}
          <article className={styles.wireframesSection}>
            <h2 className={styles.largeHeading}>
              Initial wireframes, that laid the foundations
            </h2>
            <p className={styles.subheading}>Navigation - only approach</p>
            <div className={styles.wireframeNote}>
              <p>All the Genius/ investment solutions products upfront</p>
              <p>Entry point for wealth expert</p>
              <p>All other products ET Money has to offer</p>
            </div>
          </article>

          {/* Revised approach */}
          <article className={styles.revisedSection}>
            <p className={styles.sectionText}>
              Somehow having just navigation, didn't work. it limited the scope of playing
              out & experimenting things for various journeys.
            </p>
            <h2 className={styles.largeHeading}>Navigation + SKU approach</h2>
          </article>

          {/* Final approach v1 */}
          <article className={styles.finalSection}>
            <div className={styles.timelineIndicator}>
              <span className={styles.dot}></span>
              <span className={styles.date}>Live on Nov 15, 2025</span>
            </div>
            <h2 className={styles.largeHeading}>Final approach</h2>
            <p className={styles.finalNote}>
              All the Genius/ investment solutions products upfront — All other products
              on ET Money - One stop solution quite literally
            </p>
          </article>

          {/* Final approach v2 */}
          <article className={styles.finalSection}>
            <div className={styles.timelineIndicator}>
              <span className={styles.dot}></span>
              <span className={styles.date}>Live by March 8, 2026</span>
            </div>
            <h2 className={styles.largeHeading}>Version 2 - Grow your wealth with MF</h2>
            <p className={styles.versionText}>
              Earlier version acted as just a door to our solutions, without stating its
              importance/ what's inside so - we tried to bring the core out on explore
              itself
            </p>
          </article>

          {/* Cases section */}
          <article className={styles.casesSection}>
            <h2 className={styles.sectionTitle}>Handling Cases</h2>

            {/* Zero state */}
            <div className={styles.caseStudy}>
              <h3 className={styles.caseHeading}>Zero state</h3>
              <p className={styles.caseDescription}>
                First time visitor/ zero state - users are usually seeking for help & they
                need a guide on where to start
              </p>
              <p className={styles.caseNote}>
                Users usually ask there aquitances on where they should start there
                investment with So we built a suggestion module for them.
              </p>
            </div>

            {/* Drop-off */}
            <div className={styles.caseStudy}>
              <h3 className={styles.caseHeading}>Drop-off</h3>
              <p className={styles.caseDescription}>
                Most of the users, explore products and drop-off at certain stage of
                journeys, where we loose huge chunk of opportunity. So tap what they
                thought of earlier right on homescreen
              </p>
            </div>
          </article>
        </section>

        {/* IMPACT SECTION */}
        <section className={styles.impactFinal}>
          <h2 className={styles.sectionTitle}>Impact</h2>
          <div className={styles.impactCards}>
            <ImpactCard
              label="App-store NPS (written reviews)"
              before="-10"
              after="+73"
              subtext="within days of the Nov 15 release."
              details={[
                'Review sentiment flipped from predominantly negative to overwhelmingly positive, with users explicitly praising simplicity, navigation, and overall feel.',
                'Several users returned after uninstalling and upgraded ratings ( 1★ → 4–5★)',
              ]}
            />

            <ImpactCard
              label="CTR/ Product discoverability (Avg & Approx)"
              before="4%"
              after="22%"
              subtext="within days of the Nov 15 release."
              details={[
                'Average investment products of users earlier was 1.5; we saw this shifting to 1.94 after the release.',
              ]}
            />
          </div>
        </section>

        {/* NEXT CASE STUDY */}
        <section className={styles.nextSection}>
          <h2 className={styles.sectionTitle}>Read next case study</h2>
        </section>
      </div>
    </main>
  );
}

// Testimonial Component
function Testimonial({ rating, quote, author }) {
  return (
    <div className={styles.testimonial}>
      <div className={styles.testimonialBox}>
        <div className={styles.testimonialLine}></div>
        <div className={styles.testimonialContent}>
          <div className={styles.rating}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={i < rating ? styles.starFilled : styles.starEmpty}
                >
                  ★
                </span>
              ))}
            </div>
            <span className={styles.ratingValue}>{rating}/5</span>
          </div>
          <p className={styles.quote}>{quote}</p>
        </div>
      </div>
      <div className={styles.testimonialAuthor}>
        <p className={styles.authorName}>{author}</p>
      </div>
    </div>
  );
}

// Discovery Chart Component - Product Discovery Pattern
function DiscoveryChart() {
  return (
    <svg
      className={styles.svgFrame}
      viewBox="0 0 800 500"
      style={{ backgroundColor: '#f5f5f5' }}
    >
      {/* Top navigation bar showing product categories */}
      <rect
        x="50"
        y="20"
        width="700"
        height="60"
        fill="none"
        stroke="#ddd"
        strokeWidth="2"
        rx="8"
      />

      {/* Genius - Green highlight */}
      <rect x="80" y="35" width="80" height="20" fill="#00b852" rx="3" />
      <text
        x="120"
        y="52"
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontFamily="'Season Sans'"
        fontWeight="600"
      >
        Genius
      </text>

      {/* Income badge with 25% */}
      <rect
        x="180"
        y="20"
        width="70"
        height="35"
        fill="none"
        stroke="#ddd"
        strokeWidth="1"
      />
      <text
        x="215"
        y="45"
        textAnchor="middle"
        fill="#000"
        fontSize="11"
        fontFamily="'Season Sans'"
      >
        Income
      </text>
      <rect x="205" y="20" width="45" height="20" fill="#d22525" rx="3" />
      <text
        x="227"
        y="33"
        textAnchor="middle"
        fill="white"
        fontSize="11"
        fontFamily="'Season Sans'"
        fontWeight="600"
      >
        25%
      </text>

      {/* Tax-saver badge with 18% */}
      <rect
        x="270"
        y="20"
        width="70"
        height="35"
        fill="none"
        stroke="#ddd"
        strokeWidth="1"
      />
      <text
        x="305"
        y="45"
        textAnchor="middle"
        fill="#000"
        fontSize="11"
        fontFamily="'Season Sans'"
      >
        Tax-saver
      </text>
      <rect x="295" y="20" width="45" height="20" fill="#d22525" rx="3" />
      <text
        x="317"
        y="33"
        textAnchor="middle"
        fill="white"
        fontSize="11"
        fontFamily="'Season Sans'"
        fontWeight="600"
      >
        18%
      </text>

      {/* Insurance badge with 14.72% */}
      <rect
        x="360"
        y="20"
        width="70"
        height="35"
        fill="none"
        stroke="#ddd"
        strokeWidth="1"
      />
      <text
        x="395"
        y="45"
        textAnchor="middle"
        fill="#000"
        fontSize="11"
        fontFamily="'Season Sans'"
      >
        Insurance
      </text>
      <rect x="385" y="20" width="45" height="20" fill="#d22525" rx="3" />
      <text
        x="407"
        y="33"
        textAnchor="middle"
        fill="white"
        fontSize="11"
        fontFamily="'Season Sans'"
        fontWeight="600"
      >
        14.72%
      </text>

      {/* Cash badge with 8.92% */}
      <rect
        x="450"
        y="20"
        width="70"
        height="35"
        fill="none"
        stroke="#ddd"
        strokeWidth="1"
      />
      <text
        x="485"
        y="45"
        textAnchor="middle"
        fill="#000"
        fontSize="11"
        fontFamily="'Season Sans'"
      >
        Cash
      </text>
      <rect x="475" y="20" width="45" height="20" fill="#d22525" rx="3" />
      <text
        x="497"
        y="33"
        textAnchor="middle"
        fill="white"
        fontSize="11"
        fontFamily="'Season Sans'"
        fontWeight="600"
      >
        8.92%
      </text>

      {/* Central vertical line */}
      <line
        x1="400"
        y1="100"
        x2="400"
        y2="400"
        stroke="#ddd"
        strokeWidth="1"
        opacity="0.5"
      />

      {/* Left side - "User always landed here" */}
      <text x="120" y="150" fill="#000" fontSize="12" fontFamily="'Season Sans'">
        User always
      </text>
      <text x="120" y="165" fill="#000" fontSize="12" fontFamily="'Season Sans'">
        landed here
      </text>

      {/* Curved arrow pointing to Genius */}
      <path
        d="M 140 180 Q 160 140, 180 120"
        fill="none"
        stroke="#d4b5a0"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <polygon points="180,120 185,128 172,122" fill="#d4b5a0" />

      {/* Right side - Product discovery lines showing data */}
      <text
        x="450"
        y="150"
        fill="#000"
        fontSize="13"
        fontFamily="'Season Sans'"
        fontWeight="600"
      >
        FDs
      </text>
      <text
        x="500"
        y="150"
        fill="#d22525"
        fontSize="13"
        fontFamily="'Season Sans'"
        fontWeight="600"
      >
        4.32%
      </text>
      <line x1="430" y1="160" x2="520" y2="160" stroke="#ddd" strokeWidth="1" />

      <text
        x="450"
        y="200"
        fill="#000"
        fontSize="13"
        fontFamily="'Season Sans'"
        fontWeight="600"
      >
        Bonds
      </text>
      <text
        x="500"
        y="200"
        fill="#d22525"
        fontSize="13"
        fontFamily="'Season Sans'"
        fontWeight="600"
      >
        ~4%
      </text>
      <line x1="430" y1="210" x2="520" y2="210" stroke="#ddd" strokeWidth="1" />

      <text
        x="450"
        y="250"
        fill="#000"
        fontSize="13"
        fontFamily="'Season Sans'"
        fontWeight="600"
      >
        NPS
      </text>
      <line x1="430" y1="260" x2="520" y2="260" stroke="#ddd" strokeWidth="1" />

      <text
        x="450"
        y="300"
        fill="#000"
        fontSize="13"
        fontFamily="'Season Sans'"
        fontWeight="600"
      >
        SWP
      </text>
      <line x1="430" y1="310" x2="520" y2="310" stroke="#ddd" strokeWidth="1" />

      {/* Key insight at bottom */}
      <rect x="50" y="380" width="700" height="60" fill="#f0f0f0" rx="8" />
      <text x="70" y="400" fill="#666" fontSize="12" fontFamily="'Season Sans'">
        Key Insight: Users discovered new product categories when featured
      </text>
      <text x="70" y="420" fill="#666" fontSize="12" fontFamily="'Season Sans'">
        in navigation. Hidden sections under "Protect" or "Income" had low
        discoverability.
      </text>
    </svg>
  );
}

// User Research Diagram Component - User Segments & Behavior
function UserResearchDiagram() {
  return (
    <svg
      className={styles.svgFrame}
      viewBox="0 0 1000 600"
      style={{ backgroundColor: '#fafafa' }}
    >
      {/* Title and categories */}
      <text
        x="150"
        y="40"
        fill="#000"
        fontSize="16"
        fontFamily="'Season Serif'"
        fontWeight="700"
      >
        User Segments & Behavior Insights
      </text>

      {/* Left column - Naive Users */}
      <rect
        x="30"
        y="80"
        width="400"
        height="480"
        fill="none"
        stroke="#e0e0e0"
        strokeWidth="1"
        rx="4"
      />
      <text
        x="50"
        y="110"
        fill="#000"
        fontSize="14"
        fontFamily="'Season Serif'"
        fontWeight="700"
      >
        Naive / New Investors
      </text>
      <text x="50" y="140" fill="#666" fontSize="12" fontFamily="'Season Sans'">
        Profile: Invested in 1-2 mutual funds
      </text>
      <text x="50" y="160" fill="#666" fontSize="12" fontFamily="'Season Sans'">
        Few were new to investing
      </text>
      <text x="50" y="180" fill="#666" fontSize="12" fontFamily="'Season Sans'">
        Rare genius subscriptions
      </text>

      <text
        x="50"
        y="230"
        fill="#d22525"
        fontSize="12"
        fontFamily="'Season Sans'"
        fontWeight="600"
      >
        Pain Points:
      </text>
      <text x="50" y="255" fill="#333" fontSize="11" fontFamily="'Season Sans'">
        • Transaction-focused perception of app
      </text>
      <text x="50" y="275" fill="#333" fontSize="11" fontFamily="'Season Sans'">
        • Few recommendations given
      </text>
      <text x="50" y="295" fill="#333" fontSize="11" fontFamily="'Season Sans'">
        • Didn't know about FDs, Bonds, NPS
      </text>
      <text x="50" y="315" fill="#333" fontSize="11" fontFamily="'Season Sans'">
        • These products buried under
      </text>
      <text x="50" y="330" fill="#333" fontSize="11" fontFamily="'Season Sans'">
        "Fixed-income" / "Protect" sections
      </text>
      <text x="50" y="350" fill="#333" fontSize="11" fontFamily="'Season Sans'">
        • No awareness of new product options
      </text>

      <rect
        x="50"
        y="380"
        width="360"
        height="150"
        fill="#fff9f9"
        stroke="#e0b0b0"
        strokeWidth="1"
        rx="3"
      />
      <text
        x="70"
        y="405"
        fill="#d22525"
        fontSize="11"
        fontFamily="'Season Sans'"
        fontWeight="600"
      >
        Key Discovery:
      </text>
      <text x="70" y="425" fill="#333" fontSize="11" fontFamily="'Season Sans'">
        Users discovered products primarily through
      </text>
      <text x="70" y="445" fill="#333" fontSize="11" fontFamily="'Season Sans'">
        push notifications or home screen banners
      </text>
      <text x="70" y="465" fill="#333" fontSize="11" fontFamily="'Season Sans'">
        75% never navigated to Income section
      </text>
      <text x="70" y="485" fill="#333" fontSize="11" fontFamily="'Season Sans'">
        showed high conversion potential.
      </text>

      {/* Right column - Affluent Users */}
      <rect
        x="520"
        y="80"
        width="400"
        height="480"
        fill="none"
        stroke="#e0e0e0"
        strokeWidth="1"
        rx="4"
      />
      <text
        x="540"
        y="110"
        fill="#000"
        fontSize="14"
        fontFamily="'Season Serif'"
        fontWeight="700"
      >
        Financially Affluent Users
      </text>
      <text x="540" y="140" fill="#666" fontSize="12" fontFamily="'Season Sans'">
        Profile: Well-diversified portfolio
      </text>
      <text x="540" y="160" fill="#666" fontSize="12" fontFamily="'Season Sans'">
        Understood wealth management
      </text>
      <text x="540" y="180" fill="#666" fontSize="12" fontFamily="'Season Sans'">
        Many already had Genius subscriptions
      </text>

      <text
        x="540"
        y="230"
        fill="#268a5d"
        fontSize="12"
        fontFamily="'Season Sans'"
        fontWeight="600"
      >
        Perception:
      </text>
      <text x="540" y="255" fill="#333" fontSize="11" fontFamily="'Season Sans'">
        • ET Money as complete financial advisor
      </text>
      <text x="540" y="275" fill="#333" fontSize="11" fontFamily="'Season Sans'">
        • Trusted for retirement planning
      </text>
      <text x="540" y="295" fill="#333" fontSize="11" fontFamily="'Season Sans'">
        • Aware of FDs, Bonds, NPS, SWP options
      </text>
      <text x="540" y="315" fill="#333" fontSize="11" fontFamily="'Season Sans'">
        • High engagement with new features
      </text>
      <text x="540" y="335" fill="#333" fontSize="11" fontFamily="'Season Sans'">
        • Used app for insights and planning
      </text>

      <rect
        x="540"
        y="380"
        width="360"
        height="150"
        fill="#f9fff9"
        stroke="#b0e0b0"
        strokeWidth="1"
        rx="3"
      />
      <text
        x="560"
        y="405"
        fill="#268a5d"
        fontSize="11"
        fontFamily="'Season Sans'"
        fontWeight="600"
      >
        Insight Validated:
      </text>
      <text x="560" y="425" fill="#333" fontSize="11" fontFamily="'Season Sans'">
        Product discovery through app navigation was
      </text>
      <text x="560" y="445" fill="#333" fontSize="11" fontFamily="'Season Sans'">
        critical. This segment actively explored
      </text>
      <text x="560" y="465" fill="#333" fontSize="11" fontFamily="'Season Sans'">
        all sections and showed strong conversion
      </text>
      <text x="560" y="485" fill="#333" fontSize="11" fontFamily="'Season Sans'">
        when offerings were prominent.
      </text>
    </svg>
  );
}

// Competitor Analysis Component
function CompetitorAnalysis() {
  return (
    <div className={styles.competitorSection}>
      <div className={styles.competitorCard}>
        <h4 className={styles.competitorName}>Upstox</h4>
        <p className={styles.competitorNote}>
          Opens app on dashboard screen, has separate Navs for focused wealth products
          like stocks & mf, everything else lives in more. Stocks & MF both has explore &
          portfolio tabs inside its page
        </p>
      </div>
      <div className={styles.competitorCard}>
        <h4 className={styles.competitorName}>IndMoney</h4>
        <p className={styles.competitorNote}>
          App opens on dashboard, and has seperate sections for stocks (us & IND); funds,
          cash has seperate nav
        </p>
      </div>
      <div className={styles.competitorCard}>
        <h4 className={styles.competitorName}>Groww</h4>
        <p className={styles.competitorNote}>
          Groww has product wise different segway, and loans take you to link with
          different app - called groww credit
        </p>
      </div>
    </div>
  );
}

// Impact Card Component
function ImpactCard({ label, before, after, subtext, details }) {
  return (
    <div className={styles.impactCardLarge}>
      <h3 className={styles.impactMetricLabel}>{label}</h3>
      <p className={styles.impactMetricValue}>
        <span>{before}</span>
        <span className={styles.arrow}> → </span>
        <span className={styles.positive}>{after}</span>
      </p>
      <p className={styles.impactMetricSubtext}>{subtext}</p>
      <div className={styles.impactDetails}>
        {details.map((detail, idx) => (
          <p key={idx}>{detail}</p>
        ))}
      </div>
    </div>
  );
}
