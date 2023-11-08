import backgroundVibaLarge from 'assets/viba-background-large.jpg';
import backgroundVibaPlaceholder from 'assets/viba-background.jpg';
import backgroundViba from 'assets/viba-background.jpg';
import imageVibaCoverLarge from 'assets/viba-cover-large.jpg';
import imageVibaCover from 'assets/viba-cover.jpg';
import imageVibaCoverPlaceholder from 'assets/viba-cover.jpg';
import imageVibaJar from 'assets/Viba-Jar.jpg';
import imageVibaJarLarge from 'assets/Viba-Jar-Large.jpg';
import imageVibaJarPlaceholder from 'assets/Viba-Jar.jpg';
import imageVibaGoldDelivery from 'assets/Viba-Gold-Delivery.jpg';
import imageVibaGoldDeliveryLarge from 'assets/Viba-Gold-Delivery-Large.jpg';
import imageVibaGoldDeliveryPlaceholder from 'assets/Viba-Gold-Delivery.jpg';
import imageVibaPostorder from 'assets/Viba-postorder.jpg';
import imageVibaPostOrderLarge from 'assets/Viba-postorder-large.jpg';
import { Footer } from 'components/Footer';
import { Button } from 'components/Button';
import { Image } from 'components/Image';
import { Meta } from 'components/Meta';
import { useTheme } from 'components/ThemeProvider';
import { useAppContext } from 'hooks';
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
import dynamic from 'next/dynamic';
import { Fragment, useMemo } from 'react';
import { media } from 'utils/style';
import styles from './Viba.module.css';

const title = 'Designing the Ecommerce site - Viba by Jar';
const description =
  'As a part of my internship at Jar, I embarked on a journey to design an e-commerce platform for pure gold jewellery from the ground up. My role extended to seamlessly integrating Viba with Jar.';
const roles = [
  'Product Design Intern - Jar',
  'Basic Design Sytem',
  'Basic & Complex flows',
  'Founding Designer',
];

export const Viba = () => {
  const { themeId } = useTheme();
  const { dispatch } = useAppContext();

  const isDark = themeId === 'dark';
  const themes = ['dark', 'light'];

  const handleThemeChange = index => {
    dispatch({ type: 'setTheme', value: themes[index] });
  };
  return (
    <>
      <Fragment>
        <ProjectContainer className="spr">
          <Meta title={title} prefix="Projects" description={description} />
          <ProjectBackground
            opacity={isDark ? 0.9 : 0.8}
            src={backgroundViba}
            srcSet={`${backgroundViba.src} 1080w, ${backgroundVibaLarge.src} 2160w`}
            placeholder={backgroundVibaPlaceholder}
          />
          <ProjectHeader title={title} description={description} roles={roles} />
          <ProjectSection padding="top">
            <ProjectSectionContent>
              <ProjectImage
                raised
                key={themeId}
                srcSet={
                  isDark
                    ? [imageVibaCover, imageVibaCoverLarge]
                    : [imageVibaCover, imageVibaCoverLarge]
                }
                placeholder={
                  isDark ? imageVibaCoverPlaceholder : imageVibaCoverPlaceholder
                }
                sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
                alt="This is cover image for Viba."
              />
            </ProjectSectionContent>
          </ProjectSection>
          <ProjectSection>
            <ProjectSectionColumns>
              <div className={styles.gridForeground}>
                <Image
                  srcSet={
                    isDark
                      ? [imageVibaPostorder, imageVibaPostOrderLarge]
                      : [imageVibaPostorder, imageVibaPostOrderLarge]
                  }
                  placeholder={isDark ? imageVibaPostorder : imageVibaPostorder}
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
                    secondary
                    className={styles.button}
                    href="https://ritu-bhangale.notion.site/Streamlining-Post-Order-Process-41f6df3933c342919d40195817daa441?pvs=4"
                  >
                    Case Study
                  </Button>
                </ProjectTextRow>
              </ProjectSectionContent>
            </ProjectSectionColumns>
          </ProjectSection>
          <ProjectSection>
            <ProjectSectionColumns>
              <ProjectSectionContent>
                <ProjectTextRow>
                  <ProjectSectionHeading>Entrypoints on Jar</ProjectSectionHeading>
                  <ProjectSectionText size="m">
                    As the sole designer, I focused on the key entry point of integrating
                    Viba Entrypoints within the Jar apps home page. I ensured that Viba
                    products could seamlessly align with the gold delivery functionality,
                    creating a unified and user-friendly experience for our customers.
                  </ProjectSectionText>
                  <ProjectSectionText size="l">
                    Notably, a significant portion of the traffic to the Viba site
                    originated from the Jar app, underlining the importance of a smooth
                    integration.
                  </ProjectSectionText>
                </ProjectTextRow>
                {/* <Button
                  secondary
                  className={styles.button}
                  href="mailto:ritusbhangale@gmail.com"
                >
                  Case Study
                </Button> */}
              </ProjectSectionContent>
              <div className={styles.sidebarImages}>
                <Image
                  className={styles.sidebarImage}
                  srcSet={
                    isDark
                      ? [imageVibaGoldDelivery, imageVibaGoldDeliveryLarge]
                      : [imageVibaGoldDelivery, imageVibaGoldDeliveryLarge]
                  }
                  placeholder={
                    isDark
                      ? imageVibaGoldDeliveryPlaceholder
                      : imageVibaGoldDeliveryPlaceholder
                  }
                  alt="Configuration options for text."
                  sizes={`(max-width: ${media.mobile}px) 40vw, 20vw`}
                />
                <Image
                  className={styles.sidebarImage}
                  srcSet={
                    isDark
                      ? [imageVibaJar, imageVibaJarLarge]
                      : [imageVibaJar, imageVibaJarLarge]
                  }
                  placeholder={isDark ? imageVibaJarPlaceholder : imageVibaJarPlaceholder}
                  alt="Configuration options for a component."
                  sizes={`(max-width: ${media.mobile}px) 40vw, 20vw`}
                />
              </div>
            </ProjectSectionColumns>
          </ProjectSection>
          <ProjectSection light={isDark}>
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
          {/* <ProjectSection light={isDark}>
            <ProjectSectionContent>
              <Image
                key={themeId}
                srcSet={
                  isDark
                    ? [imageFlentComponents, imageFlentComponentsLarge]
                    : [imageFlentComponents, imageFlentComponentsLarge]
                }
                placeholder={
                  isDark
                    ? imageFlentComponentsPlaceholder
                    : imageFlentComponentsPlaceholder
                }
                alt={`A set of ${themeId} themed components for the aero design system`}
                sizes="100vw"
              />
              <ProjectTextRow>
                <SegmentedControl
                  currentIndex={themes.indexOf(themeId)}
                  onChange={handleThemeChange}
                >
                  <SegmentedControlOption>Dark theme</SegmentedControlOption>
                  <SegmentedControlOption>Light theme</SegmentedControlOption>
                </SegmentedControl>
              </ProjectTextRow>
              <ProjectTextRow>
                <ProjectSectionHeading>
                  Basic design system & Visual Explorations -
                </ProjectSectionHeading>
                <ProjectSectionText>
                  The Flent design system includes a set of predefined UI components and
                  rules for using them consistently across the app. The components include
                  buttons, input fields, navigation bars, and more, all designed to fit
                  seamlessly together and maintain a consistent look and feel throughout
                  the app.
                </ProjectSectionText>
              </ProjectTextRow>
            </ProjectSectionContent>
          </ProjectSection> */}
          {/* <ProjectSection>
            <ProjectSectionContent>
              <Image
                raised
                key={themeId}
                srcSet={
                  isDark
                    ? [imageFlentDesignSystemDark, imageFlentDesignSystemDarkLarge]
                    : [imageFlentDesignSystemDark, imageFlentDesignSystemDarkLarge]
                }
                placeholder={
                  isDark
                    ? imageFlentDesignSystemDarkPlaceholder
                    : imageFlentDesignSystemDarkPlaceholder
                }
                alt="The homepage of the aero design system docs website linking to principles and components."
                sizes="100vw"
              />
              <ProjectTextRow>
                <ProjectSectionHeading>Color & Typography.</ProjectSectionHeading>
                <ProjectSectionText>
                  The design system includes a set of guidelines for typography, color
                  schemes, and other visual elements. These guidelines help ensure that
                  the app overall design is coherent and visually pleasing. Color system
                  of flent consists of Orange & Grey. Orange is often associated with
                  energy, creativity, and friendliness, while grey is associated with
                  professionalism, sophistication, and neutrality. Poppins is a modern and
                  elegant sans-serif typeface that has been chosen for typography of
                  Flent. Its clean and simple design makes it easy to read and perfect for
                  UI design.
                </ProjectSectionText>
              </ProjectTextRow>
            </ProjectSectionContent>
          </ProjectSection>
          <ThemeProvider themeId="dark" data-invert>
            <ProjectSection
              backgroundOverlayOpacity={0.5}
              backgroundElement={
                <Image
                  srcSet={[imageFlentBackgroundWooden, imageFlentBackgroundWoodenLarge]}
                  placeholder={imageFlentBackgroundWoodenPlaceholder}
                  alt="A dramatic wood."
                  sizes="100vw"
                />
              }
            >
              <ProjectSectionContent>
                <ProjectTextRow>
                  <ProjectSectionHeading>UX Research</ProjectSectionHeading>
                  <ProjectSectionText>
                    The UX research conducted during Flent consisted of both qualitative
                    and quantitative methods to gain insights into users furniture,
                    appliance, and electronics purchasing behaviors and decision-making
                    processes. Qualitative research involved individual interviews with
                    7-8 users, while quantitative research involved an online survey. The
                    research aimed to gather data on users online renting thinking,
                    habits, and preferences, including their awareness of online furniture
                    rental services, previous experience, and factors considered when
                    renting furniture, electronics, and appliances. User personas, empathy
                    maps, and affinity mapping were also created to better understand the
                    target user segments and design user-centric solutions.
                  </ProjectSectionText>
                </ProjectTextRow>
              </ProjectSectionContent>
            </ProjectSection>
            <ProjectSection>
              <ProjectSectionColumns>
                <ProjectSectionContent>
                  <ProjectTextRow>
                    <ProjectSectionHeading>Wireframes.</ProjectSectionHeading>
                    <ProjectSectionText>
                      The wireframe section of Flent outlines the proposed layout and
                      design of the app user interface. It provides a visual
                      representation of the app features, functionality, and content,
                      while excluding visual design elements like colors and images. The
                      wireframes were created early in the design process to ensure the
                      app functionality and user experience are well-planned before any
                      visual design work begins.
                    </ProjectSectionText>
                  </ProjectTextRow>
                </ProjectSectionContent>
                <div className={styles.sidebarImages}>
                  <Image
                    className={styles.sidebarImage}
                    srcSet={
                      isDark
                        ? [imageFlentWireframeCart, imageFlentWireframeCart]
                        : [imageFlentWireframeCart, imageFlentWireframeCart]
                    }
                    placeholder={
                      isDark ? imageFlentWireframeCart : imageFlentWireframeCart
                    }
                    alt="Configuration options for a component."
                    sizes={`(max-width: ${media.mobile}px) 50vw, 25vw`}
                  />
                  <Image
                    className={styles.sidebarImage}
                    srcSet={
                      isDark
                        ? [imageFlentWireframeLogin, imageFlentWireframeLogin]
                        : [imageFlentWireframeLogin, imageFlentWireframeLogin]
                    }
                    placeholder={
                      isDark ? imageFlentWireframeLogin : imageFlentWireframeLogin
                    }
                    alt="Configuration options for text."
                    sizes={`(max-width: ${media.mobile}px) 50vw, 25vw`}
                  />
                </div>
              </ProjectSectionColumns>
            </ProjectSection>
          </ThemeProvider> */}
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
