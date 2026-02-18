import profileImgLarge from 'assets/profile.jpg';
import profileImgPlaceholder from 'assets/profile.jpg';
import profileImg from 'assets/profile.jpg';
import { Image } from 'components/Image';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { Transition } from 'components/Transition';
import { Fragment, useState } from 'react';
import { media } from 'utils/style';
import styles from './Profile.module.css';

const ProfileText = ({ visible, titleId: _titleId }) => (
  <Fragment>
    <Text className={styles.description} data-visible={visible} size="m" as="p">
      I am product designer with 2+ years of experience. I love diving deep into product
      ecosystems, uncovering complex challenges, and crafting/ experimenting thoughtful
      solutions that truly resonate with users.
    </Text>
  </Fragment>
);

const ExperienceItem = ({ visible, title, description }) => (
  <div className={styles.experienceItem} data-visible={visible}>
    <div className={styles.experienceTimeline}>
      <div className={styles.timelineDot} />
      <div className={styles.timelineConnector} />
    </div>
    <div className={styles.experienceContent}>
      <div className={styles.experienceTitle}>{title}</div>
      {description && (
        <Text className={styles.experienceDescription} size="m" as="p">
          {description}
        </Text>
      )}
    </div>
  </div>
);

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  const experiences = [
    {
      title: 'Product Designer',
      company: 'ET Money',
      description:
        'Led the App Revamp, redesigning core navigation and Explore experience, driving a +83 point improvement in App Store NPS and increasing product discoverability CTR by 5.5x.',
    },
    {
      title: 'Product Designer',
      company: 'Upstox',
      description:
        'Boosted user conversion by 76% by redesigning the Fixed Deposits Order Form and optimizing the investment funnel through streamlined flows.',
    },
    {
      title: 'Product Designer',
      company: 'Jar',
      description:
        'Developed user flows for Viba (Nek) to improve usability based on research and testing. Integrated Viba with Jar, leading to a 16.72% increase in order volume.',
    },
  ];

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {visible => (
          <div className={styles.content}>
            <div className={styles.column}>
              <div className={styles.profileImageWrapper}>
                <div className={styles.profileImage}>
                  <Image
                    reveal
                    delay={100}
                    placeholder={profileImgPlaceholder}
                    srcSet={[profileImg, profileImgLarge]}
                    sizes={`(max-width: ${media.mobile}px) 100vw, 360px`}
                    alt="Profile photo"
                  />
                </div>
              </div>
              <div className={styles.bioSection}>
                <ProfileText visible={visible} titleId={titleId} />
              </div>
              <div className={styles.aboutSection}>
                <div className={styles.aboutHeading} data-visible={visible}>
                  About
                </div>
                <div className={styles.aboutContent}>
                  <div className={styles.aboutItem} data-visible={visible}>
                    <div className={styles.aboutLabel}>Education</div>
                    <div className={styles.aboutValue}>
                      <strong>Maharaja Agrasen Institute of Technology</strong>
                      <br />
                      Computer Science & Engineering
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.column}>
              <div className={styles.experienceHeading} data-visible={visible}>
                Experience
              </div>
              <div className={styles.experienceTimelineWrapper}>
                {experiences.map((exp, idx) => (
                  <ExperienceItem
                    key={idx}
                    visible={visible}
                    title={exp.title}
                    company={exp.company}
                    description={exp.description}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
