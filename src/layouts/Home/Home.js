import vibaPdp from '../../assets/viba-pdp.jpg';
import vibaPdpLarge from '../../assets/viba-pdp-large.jpg';
import vibaPdpPlaceholder from '../../assets/viba-pdp.jpg';
import imageVibaGoldDelivery from 'assets/Viba-Gold-Delivery.jpg';
import imageVibaGoldDeliveryLarge from 'assets/Viba-Gold-Delivery-Large.jpg';
import imageVibaGoldDeliveryPlaceholder from 'assets/Viba-Gold-Delivery.jpg';
import imageUpstoxGold from 'assets/UpstoxGold.png';
import imageUpstoxExplore from 'assets/UpstoxExplore.png';
import previewVibaPostOrderFlow from 'assets/PreviewVibaPostOrderFlow.png';
import previewUpstoxFD from 'assets/PreviewUpstoxFD.png';
import previewFD from 'assets/FDpreview.png';
import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { Intro } from 'layouts/Home/Intro';
import { Profile } from 'layouts/Home/Profile';
import { ProjectSummary } from 'layouts/Home/ProjectSummary';
import { Heading } from 'components/Heading';
import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';

const disciplines = ['Product', 'UX', 'Interaction'];

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, details, projectOne, projectTwo, projectThree];

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

    // Check if the refs are assigned to valid DOM elements before observing
    sections.forEach(section => {
      if (section.current) {
        sectionObserver.observe(section.current);
      }
    });

    if (intro.current) {
      indicatorObserver.observe(intro.current);
    }

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
      {/* Adding the 'My Work' heading using your Heading component */}
      <ProjectSummary
        id="project-1"
        alternate
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Fixed Deposits order form"
        description="With 95% of Indians favoring FDs, this project streamlined the booking process to make it faster and more user-friendly."
        buttonText="Read More"
        buttonLink="https://portfolio-rits.framer.website/fd-upstox"
        image={previewUpstoxFD}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Gold : Fragmented to seamless"
        description="Simplifying gold investment journeys by enhancing discoverability, education, and portfolio management."
        buttonText="Read More"
        buttonLink="https://portfolio-rits.framer.website/gold"
        model={{
          type: 'phone',
          alt: 'App login screen',
          textures: [
            {
              srcSet: [imageUpstoxGold, imageUpstoxGold],
              placeholder: imageUpstoxGold,
            },
            {
              srcSet: [imageUpstoxExplore, imageUpstoxExplore],
              placeholder: imageUpstoxExplore,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        alternate
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Viba-Jar Integration"
        description="Integration of Viba website with the Jar platform, which led to a significant increase in orders."
        buttonText="Read More"
        buttonLink="https://portfolio-rits.framer.website/jar"
        model={{
          type: 'phone',
          alt: 'App login screen',
          textures: [
            {
              srcSet: [imageVibaGoldDelivery, imageVibaGoldDeliveryLarge],
              placeholder: imageVibaGoldDeliveryPlaceholder,
            },
            {
              srcSet: [vibaPdp, vibaPdpLarge],
              placeholder: vibaPdpPlaceholder,
            },
          ],
        }}
        className={styles.projectMargin} // Apply the class here
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
