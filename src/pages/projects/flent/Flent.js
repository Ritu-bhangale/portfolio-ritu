import backgroundFlentLarge from 'assets/flent-background-large.jpg';
import backgroundFlentPlaceholder from 'assets/flent-background-placeholder.jpg';
import backgroundFlent from 'assets/flent-background.png';
import imageFlentBackgroundWoodenLarge from 'assets/flent-background-wooden-large.jpg';
import imageFlentBackgroundWoodenPlaceholder from 'assets/flent-background-wooden-placeholder.png';
import imageFlentBackgroundWooden from 'assets/flent-background-wooden.jpg';
import imageFlentComponentsLarge from 'assets/flent-components-large.jpg';
import imageFlentComponentsPlaceholder from 'assets/flent-components-placeholder.jpg';
import imageFlentComponents from 'assets/flent-components.jpg';
import imageFlentDesignSystemDarkLarge from 'assets/flent-designsys-large.jpg';
import imageFlentDesignSystemDarkPlaceholder from 'assets/flent-designsys-placeholder.jpg';
import imageFlentDesignSystemDark from 'assets/flent-designsys.jpg';
import imageFlentCoverLarge from 'assets/flent-cover-large.jpg';
import imageFlentCoverPlaceholder from 'assets/flent-cover.jpg';
import imageFlentCover from 'assets/flent-cover.jpg';
import imageFlentWireframeLogin from 'assets/flent-wireframe-login-large.jpg';
import imageFlentWireframeCart from 'assets/flent-wireframe-cart.jpg';
import { Footer } from 'components/Footer';
import { Image } from 'components/Image';
import { Link } from 'components/Link';
import { Meta } from 'components/Meta';
import { SegmentedControl, SegmentedControlOption } from 'components/SegmentedControl';
import { ThemeProvider, useTheme } from 'components/ThemeProvider';
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
import styles from './Flent.module.css';

const title =
  'Designing a seamless furniture rental experience with Flent app - a UX case study';
const description =
  'I worked as a UI/UX designer on the Flent rental services app, conducting extensive user research to inform the design decisions and improve the overall user experience. Developed a basic design system that established consistency and improved usability. Designed a platform that allows users to rent furniture, appliances, and electronics at affordable prices.';
const roles = ['UI Design', 'UX Research'];

export const Flent = () => {
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
            opacity={isDark ? 0.5 : 0.8}
            src={backgroundFlent}
            srcSet={`${backgroundFlent.src} 1080w, ${backgroundFlentLarge.src} 2160w`}
            placeholder={backgroundFlentPlaceholder}
          />
          <ProjectHeader
            title={title}
            description={description}
            url="https://ritu-bhangale.github.io/Portfolio/flent.html"
            roles={roles}
          />
          <ProjectSection padding="top">
            <ProjectSectionContent>
              <ProjectImage
                raised
                key={themeId}
                srcSet={
                  isDark
                    ? [imageFlentCover, imageFlentCoverLarge]
                    : [imageFlentCover, imageFlentCoverLarge]
                }
                placeholder={
                  isDark ? imageFlentCoverPlaceholder : imageFlentCoverPlaceholder
                }
                sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
                alt="The aero lesson builder app dragging an audio component into a screen about plant cells."
              />
            </ProjectSectionContent>
          </ProjectSection>
          <ProjectSection>
            <ProjectTextRow>
              <ProjectSectionHeading>The problem</ProjectSectionHeading>
              <ProjectSectionText>
                People who frequently move or live in temporary accommodations often
                struggle with finding affordable and hassle-free options for renting
                furniture, appliances, and electronics. Traditional rental services are
                often expensive, inflexible, and require long-term commitments, making it
                challenging for people who want to live more transient lifestyles or those
                on a tight budget.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSection>
          <ProjectSection light={isDark}>
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
                <ProjectSectionHeading>The design system</ProjectSectionHeading>
                <ProjectSectionText>
                  The Flent design system includes a set of predefined UI components and
                  rules for using them consistently across the app. The components include
                  buttons, input fields, navigation bars, and more, all designed to fit
                  seamlessly together and maintain a consistent look and feel throughout
                  the app.
                </ProjectSectionText>
              </ProjectTextRow>
            </ProjectSectionContent>
          </ProjectSection>
          <ProjectSection>
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
          </ThemeProvider>
          <ProjectSection>
            <ProjectSectionContent>
              <ProjectTextRow center centerMobile noMargin>
                <ProjectSectionHeading>Project outcomes</ProjectSectionHeading>
                <ProjectSectionText>
                  Overall, Flent was a successful project that resulted in a functional
                  and user-friendly prototype for a language learning app. The project
                  outcomes included a clear understanding of user needs and preferences, a
                  well-designed wireframe, and positive feedback from user testing. While
                  Flent has not yet been released as a commercial product, the knowledge
                  and insights gained from this project could potentially be used to
                  inform the development of future language learning apps.
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
