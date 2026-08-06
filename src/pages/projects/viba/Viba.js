import imageVibaCoverLarge from 'assets/viba/viba-cover.jpg';
import imageVibaCover from 'assets/viba/viba-cover.jpg';
import imageVibaCoverPlaceholder from 'assets/viba/viba-cover.jpg';
import videoVibaJar from 'assets/viba/VibaJar.mp4';
import imageVibaPostorder from 'assets/viba/Viba-postorder.jpg';
import imageVibaPostOrderLarge from 'assets/viba/Viba-postorder-large.jpg';
import { Footer } from 'components/Footer';
import { Button } from 'components/Button';
import { Image } from 'components/Image';
import { Meta } from 'components/Meta';
import {
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
import { Fragment } from 'react';
import { media } from 'utils/style';
import styles from './Viba.module.css';

const title = 'Designing the Ecommerce site - Viba by Jar';
const description =
  'As a part of my internship at Jar, I embarked on a journey to design an e-commerce platform for pure gold jewellery from the ground up. My role extended to seamlessly integrating Viba with Jar.';

// Shorter, search friendly versions of the on page copy above. The full title
// would push the <title> tag past what search results actually show.
const metaTitle = 'Viba by Jar, ecommerce design';
const metaDescription =
  'Designing an ecommerce platform for pure gold jewellery from the ground up during an internship at Jar, and integrating Viba with the main Jar app.';

export const Viba = () => {
  return (
    <>
      <Fragment>
        <ProjectContainer className="spr">
          <Meta title={metaTitle} description={metaDescription} type="article" />
          <ProjectHeader title={title} description={description} />
          <ProjectSection>
            <ProjectSectionContent>
              <ProjectImage
                raised
                jarImg
                srcSet={[imageVibaCover, imageVibaCoverLarge]}
                placeholder={imageVibaCoverPlaceholder}
                sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
                alt="This is cover image for Viba."
              />
            </ProjectSectionContent>
          </ProjectSection>
          <ProjectSection>
            <ProjectSectionColumns>
              <ProjectSectionContent>
                <ProjectTextRow>
                  <ProjectSectionHeading>Viba-Jar Integration</ProjectSectionHeading>
                  <ProjectSectionText size="m">
                    I contributed to the design and integration of Vibas website with the
                    Jar platform, which led to a significant increase in website traffic
                    and orders. Additionally, I conceptualized and implemented entry
                    points for Viba within the Jar app, resulting in a significant boost
                    in user engagement.
                  </ProjectSectionText>
                </ProjectTextRow>
                <Button
                  jarbtn
                  className={styles.button}
                  href="https://portfolio-rits.framer.website/page"
                >
                  Case Study
                </Button>
              </ProjectSectionContent>
              <div className={styles.video}>
                <video
                  className={styles.sidebarVideo}
                  controls
                  src={videoVibaJar}
                  width={270}
                  height={600}
                  placeholder={videoVibaJar}
                  alt="A working prototype."
                  sizes="(max-width: 480px) 90vw, (max-width: 768px) 80vw, 360px"
                />
              </div>
              <div className={styles.video} />
            </ProjectSectionColumns>
          </ProjectSection>
          <ProjectSection>
            <ProjectSectionColumns>
              <div className={styles.gridForeground}>
                <Image
                  jarImg
                  srcSet={[imageVibaPostorder, imageVibaPostOrderLarge]}
                  placeholder={imageVibaPostorder}
                  alt="Configuration options for text."
                  sizes={`(max-width: ${media.mobile}px) 50vw, 25vw`}
                />
              </div>
              <ProjectSectionContent>
                <ProjectTextRow>
                  <ProjectSectionHeading>Post order Flow</ProjectSectionHeading>
                  <ProjectSectionText size="m">
                    I delved into the post-order flow of Viba, meticulously examining the
                    various emotions experienced by users after or during the order
                    placement process. My aim was to enhance the user experience and
                    increase the potential for repeat orders.
                  </ProjectSectionText>
                  <Button
                    jarbtn
                    className={styles.button}
                    href="https://www.figma.com/proto/YRyvTQGBNUntU1mdR8sFsd/Portfolio?page-id=499%3A8583&node-id=499-8584&viewport=38%2C299%2C0.25&t=Re8qaXCo7JrQRcOJ-1&scaling=contain"
                  >
                    Case Study
                  </Button>
                </ProjectTextRow>
              </ProjectSectionContent>
            </ProjectSectionColumns>
          </ProjectSection>
          <ProjectSection>
            <ProjectTextRow>
              <ProjectSectionHeading level="4">
                Integrating Jar Savings with Viba
              </ProjectSectionHeading>
              <ProjectSectionText size="l">
                One of my significant achievements is the seamless inclusion of Jar
                Savings as a payment option in Viba. It was paramount to communicate this
                to our users, highlighting the convenience of using Jar Savings for their
                purchases on Viba.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSection>
          <ProjectSection>
            <ProjectSectionContent>
              <ProjectTextRow center centerMobile noMargin>
                <ProjectSectionHeading>Internship outcomes</ProjectSectionHeading>
                <ProjectSectionText>
                  During my internship at Jar, I took on the monumental task of designing
                  the entire e-commerce website from scratch for Viba, a subsidiary
                  specializing in jewelry. This comprehensive project included the
                  seamless integration of Viba with Jar, providing a unified experience
                  for users. As the sole designer, I conducted an in-depth analysis of
                  user emotions in the post-order flow, leading to significant
                  enhancements that made the customer journey more rewarding and
                  user-centric.
                </ProjectSectionText>
              </ProjectTextRow>
            </ProjectSectionContent>
          </ProjectSection>
        </ProjectContainer>
        <Footer />
      </Fragment>
    </>
  );
};
