import flentTextureLarge from '../../assets/flent-product-large.jpg';
import flentTexturePlaceholder from '../../assets/flent-product-placeholder.jpg';
import flentTexture from '../../assets/flent-product.jpg';
import flentTexture2Large from '../../assets/flent-home-large.jpg';
import flentTexture2Placeholder from '../../assets/flent-home-placeholder.jpg';
import flentTexture2 from '../../assets/flent-home.jpg';
import noyalTextureLarge from '../../assets/noyyal-callout-large.jpg';
import noyyalTexturePlaceholder from '../../assets/noyyal-callout-placeholder.jpg';
import noyyalTexture from '../../assets/noyyal-callout.png';
import noyalTexture2Large from '../../assets/noyyal-audio-large.jpg';
import noyyalTexture2Placeholder from '../../assets/noyyal-audio-placeholder.jpg';
import noyyalTexture2 from '../../assets/noyyal-audio.jpg';
import coffeeTextureLarge from '../../assets/coffee-home-large.jpg';
import iiitnagpur from '../../assets/iiit nagpur.png';
import coffeeTexturePlaceholder from '../../assets/coffee-home-placeholder.jpg';
import coffeeTexture from '../../assets/coffee-home.jpg';
import visualiseDsa from '../../assets/visualize-dsa.png';
import canteenLanding from '../../assets/canteen-landing.png';
import canteenHome from '../../assets/canteen-home.png';
import pinterestLogin from '../../assets/pinterest - Login.png';
import pinterestPost from '../../assets/pinterest - Post.png';
import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { Intro } from 'layouts/Home/Intro';
import { Profile } from 'layouts/Home/Profile';
import { ProjectSummary } from 'layouts/Home/ProjectSummary';
import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';

const disciplines = ['Interaction', 'User Experience', 'Product'];

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const projectFour = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, details, projectOne, projectTwo, projectThree, projectFour];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Meta
        title="Designer + Developer"
        description="Design portfolio of Ritu - Product designer with a passion for UX/UI design. Focused on creating innovative solutions for web and mobile apps, with expertise in design thinking and accessibility."
      />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <ProjectSummary
        id="project-1"
        alternate
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Revamping the User Experience"
        description="An UI UX case study of Pinterest."
        buttonText="View project"
        buttonLink="https://medium.com/@rits_8/revamping-the-user-experience-pinterest-92420843dc4a"
        model={{
          type: 'phone',
          alt: 'App login screen',
          textures: [
            {
              srcSet: [pinterestLogin, pinterestLogin],
              placeholder: pinterestLogin,
            },
            {
              srcSet: [pinterestPost, pinterestPost],
              placeholder: pinterestPost,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Unveiling the New Horizon"
        description=" Transforming the Institute's Website for an Optimal User Experience."
        buttonText="View project"
        buttonLink="https://languid-turtle-a74.notion.site/Transforming-the-Institute-s-Website-for-an-Optimal-User-Experience-6d2fb0873c1a4bf09ec4878fa433df9f"
        model={{
          type: 'laptop',
          alt: 'Annotating a interface of webstite UI',
          textures: [
            {
              srcSet: [iiitnagpur, iiitnagpur],
              placeholder: iiitnagpur,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="A User-Friendly Canteen App"
        description=" A UX Design Case Study"
        buttonText="View project"
        buttonLink="https://medium.com/@rits_8/a-user-friendly-canteen-app-a-ux-design-case-study-8d9ee5f63d19"
        model={{
          type: 'phone',
          alt: 'rushorder app ui',
          textures: [
            {
              srcSet: [canteenHome, canteenHome],
              placeholder: canteenHome,
            },
            {
              srcSet: [canteenLanding, canteenLanding],
              placeholder: canteenLanding,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-4"
        sectionRef={projectFour}
        visible={visibleSections.includes(projectFour.current)}
        index={4}
        title="Flent - UI Design"
        description="Focused on UX(UI) rather than UX(product)."
        buttonText="View project"
        buttonLink="https://www.behance.net/gallery/170470277/Flent-UI"
        model={{
          type: 'phone',
          alt: 'rushorder app ui',
          textures: [
            {
              srcSet: [flentTextureLarge, flentTextureLarge],
              placeholder: flentTextureLarge,
            },
            {
              srcSet: [flentTexture2Large, flentTexture2Large],
              placeholder: flentTexture2Large,
            },
          ],
        }}
      />
      {/* <ProjectSummary
        id="project-4"
        sectionRef={projectFour}
        visible={visibleSections.includes(projectThree.current)}
        index={4}
        title="Coffee-Bite ( UI Development and Branding Design)"
        description="Developed and Designed website for dummy brand Coffee-bite."
        buttonText="View project"
        buttonLink="https://www.behance.net/gallery/116015003/Coffee-Bite"
        model={{
          type: 'laptop',
          alt: 'Annotating a biomedical image in the Slice app',
          textures: [
            {
              srcSet: [coffeeTexture, coffeeTextureLarge],
              placeholder: coffeeTexturePlaceholder,
            },
          ],
        }}
      /> */}
      <Footer />
    </div>
  );
};
