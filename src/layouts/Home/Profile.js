import profileImgLarge from 'assets/profile.jpg';
import profileImgPlaceholder from 'assets/profile.jpg';
import profileImg from 'assets/profile.jpg';
import { Button } from 'components/Button';
import { DecoderText } from 'components/DecoderText';
import { Divider } from 'components/Divider';
import { Heading } from 'components/Heading';
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
      Embracing the world of product design, I am{' '}
      <Link href="https://www.linkedin.com/in/ritubhangale/">Ritu Bhangale</Link>,
      committed to shaping intuitive interactions. With 6 months of experience as a
      Product Design Intern at <Link href="https://www.myjar.app/">Jar</Link>, alongside
      my ongoing studies in Computer Science at IIIT Nagpur, I am dedicated to making
      design and technology seamlessly coexist.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      My passion lies in working with product-based companies. I thrive on immersing
      myself in the product domain, exploring its intricacies and complexities, and
      developing innovative solutions to improve it. I believe in using data and user
      insights to inform my design decisions.
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
                href="mailto:ritusbhangale@gmail.com"
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
