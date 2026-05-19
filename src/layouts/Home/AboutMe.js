import profileImg from 'assets/home/profile.jpg';
import { Heading } from 'components/Heading';
import { Text } from 'components/Text';
import styles from './AboutMe.module.css';

const experiences = [
  {
    period: '2025 - PRESENT',
    role: 'Product Designer',
    companyName: 'ET Money',
    companyDesc: "India's leading mutual funds app",
    description:
      'Led the App Revamp, redesigning core navigation and Explore experience, driving a +83 point improvement in App Store NPS and increasing product discoverability CTR by 5.5x.',
  },
  {
    period: '2024 - 2025',
    role: 'UX design intern',
    companyName: 'Upstox',
    companyDesc: 'Stocks broker & wealth powerhouse',
    description:
      'Boosted user conversion by 76% by redesigning the Fixed Deposits Order Form and optimizing the investment funnel through streamlined flows.',
  },
  {
    period: '2023 - 2024',
    role: 'Product design intern',
    companyName: 'Jar',
    companyDesc: 'Gold savings app',
    description:
      'Developed user flows for Viba (Nek) to improve usability based on research and testing. Integrated Viba with Jar, leading to a 16.72% increase in order volume.',
  },
];

export function AboutMe({ id, sectionRef }) {
  return (
    <section className={styles.aboutMe} id={id} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.columns}>
          {/* Left column */}
          <div className={styles.leftCol}>
            <div className={styles.photoBlock}>
              <div className={styles.photoWrapper}>
                <img
                  src={profileImg?.src || profileImg}
                  alt="Ritu Bhangale"
                  className={styles.photo}
                />
              </div>
              <Text as="span" size="m">
                I am product designer with 2+ years of experience. I love diving deep into
                product ecosystems, uncovering complex challenges, and crafting/
                experimenting thoughtful solutions that truly resonate with users.
              </Text>
            </div>

            <div className={styles.contact}>
              <div className={styles.contactItem}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <Text as="span" size="l">
                  8421021672
                </Text>
              </div>
              <div className={styles.contactItem}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <Text as="span" size="l">
                  ritu.bhangales@gmail.com
                </Text>
              </div>
            </div>

            <div className={styles.education}>
              <Heading level={4} align="start" variant="sans">
                Education
              </Heading>
              <div className={styles.eduBlock}>
                <Text as="span" size="m">
                  2020 - 2024
                </Text>
                <div className={styles.eduDetails}>
                  <div className={styles.eduNameBlock}>
                    <div className={styles.eduDegree}><Heading level={5} align="start" variant="serif">
                Bachelors of technology
              </Heading></div>
                    <div className={styles.eduInstitute}>
                      <Text as="span" size="l">
                  Indian Institute of Information Technology, Nagpur
                </Text>
                    </div>
                  </div>
                  <div className={styles.eduField}>Computer science & Engineering</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className={styles.rightCol}>
            <Heading level={4} align="start" variant="sans">
              Experience
            </Heading>

            <div className={styles.timeline}>
              {experiences.map((exp, i) => (
                <div key={i} className={styles.timelineItem}>
                  <div className={styles.timelineTrack}>
                    <div className={styles.timelineLineTop} />
                    <div className={styles.timelineDot} />
                    <div className={styles.timelineLineBottom} />
                  </div>

                  <div className={styles.timelineContent}>
                    <div className={styles.expPeriod}>
                      <Text as="span" size="m">
                        {exp.period}
                      </Text>
                    </div>
                    <div className={styles.expDetails}>
                      <div className={styles.expNameBlock}>
                        <Heading level={5} align="start" variant="serif">
                {exp.role}
              </Heading>
                        <div className={styles.expCompany}>
                          <span className={styles.expCompanyName}>
                            <Text as="span" size="l">
                  {exp.companyName}
                </Text>
                </span>
                          <span className={styles.expCompanySep}> — </span>
                          <span className={styles.expCompanyDesc}>{exp.companyDesc}</span>
                        </div>
                      </div>
                      <p className={styles.expDescription}>{exp.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
