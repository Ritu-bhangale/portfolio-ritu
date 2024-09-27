import profileImgLarge from 'assets/profile.jpg';
import profileImgPlaceholder from 'assets/profile.jpg';
import profileImg from 'assets/profile.jpg';
import { Button } from 'components/Button';
import { Image } from 'components/Image';
import { Link } from 'components/Link';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { Transition } from 'components/Transition';
import { Fragment, useState } from 'react';
import { media } from 'utils/style';
import styles from './Profile.module.css';

const ProfileText = ({ visible, titleId }) => (
  <Fragment>
    <Text className={styles.description} data-visible={visible} size="m" as="p">
      I’m <Link href="https://www.linkedin.com/in/ritubhangale/">Ritu Bhangale</Link>, a
      product designer fueled by the challenge of creating seamless, impactful user
      experiences. Currently working at{' '}
      <Link href="https://www.linkedin.com/company/upstox">Upstox</Link>, I bring a blend
      of creativity and problem-solving, honed over six months at{' '}
      <Link href="https://www.myjar.app/">Jar</Link>, where I learned what it takes to
      design for the masses.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      I love diving deep into product ecosystems, uncovering complex challenges, and
      crafting thoughtful solutions that truly resonate with users. With every design
      decision rooted in data and user insights, my goal is to create intuitive,
      meaningful interactions that make a difference.
    </Text>
  </Fragment>
);

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

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
              <div className={styles.tagText} data-visible={visible}>
                About Me
              </div>
              <ProfileText visible={visible} titleId={titleId} />
              <Button
                secondary
                className={styles.button}
                data-visible={visible}
                href="mailto:ritu.bhangales@gmail.com"
                icon="send"
              >
                Send me a message
              </Button>
            </div>
            <div className={styles.column}>
              <div className={styles.image}>
                <Image
                  reveal
                  delay={100}
                  placeholder={profileImgPlaceholder}
                  srcSet={[profileImg, profileImgLarge]}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt="Captured in the moment, Ritu strikes a thoughtful pose as she contemplates UX design challenges in her environment."
                />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
