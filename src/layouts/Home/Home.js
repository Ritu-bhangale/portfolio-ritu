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
import coffeeTexturePlaceholder from '../../assets/coffee-home-placeholder.jpg';
import coffeeTexture from '../../assets/coffee-home.jpg';
import visualiseDsa from '../../assets/visualize-dsa.png';
import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { Intro } from 'layouts/Home/Intro';
import { Profile } from 'layouts/Home/Profile';
import { ProjectSummary } from 'layouts/Home/ProjectSummary';
import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';

const disciplines = ['Developer', 'Prototyper', 'Illustrator'];

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
    const sections = [intro, projectOne, projectTwo, projectThree, projectFour, details];

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
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Flent - Furniture & Appliances rental app."
        description="User Eperience and User Interface of Dummy Project."
        buttonText="View project"
        buttonLink="/projects/flent"
        model={{
          type: 'phone',
          alt: 'flent app ui',
          textures: [
            {
              srcSet: [flentTexture, flentTextureLarge],
              placeholder: flentTexturePlaceholder,
            },
            {
              srcSet: [flentTexture2, flentTexture2Large],
              placeholder: flentTexture2Placeholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-4"
        sectionRef={projectFour}
        visible={visibleSections.includes(projectFour.current)}
        index={2}
        title="Visualize - DSA"
        description=" An interactive tool to visualize data structures and algorithms."
        buttonText="View project"
        buttonLink="https://visualize-dsa.netlify.app/"
        model={{
          type: 'laptop',
          alt: 'Annotating a biomedical image in the Slice app',
          textures: [
            {
              srcSet: [visualiseDsa, visualiseDsa],
              placeholder: visualiseDsa,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={3}
        title="Noyyal - Mental Wellness App"
        description="An UI UX case study of Project built during Hackathon."
        buttonText="View project"
        buttonLink="https://www.behance.net/gallery/132527183/Noyyal"
        model={{
          type: 'phone',
          alt: 'App login screen',
          textures: [
            {
              srcSet: [noyyalTexture, noyalTextureLarge],
              placeholder: noyyalTexturePlaceholder,
            },
            {
              srcSet: [noyyalTexture2, noyalTexture2Large],
              placeholder: noyyalTexture2Placeholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
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
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
