import iiitnagpur from '../../assets/iiit nagpur.png';
import pinterestCover from '../../assets/pinterest-cover.png';
import tealfeedCover from '../../assets/tealfeed-cover.jpg';
import flentCover from '../../assets/flent-cover.jpg';
import vibaPdp from '../../assets/viba-pdp.jpg';
import vibaPdpLarge from '../../assets/viba-pdp-large.jpg';
import vibaPdpPlaceholder from '../../assets/viba-pdp.jpg';
import imageVibaGoldDelivery from 'assets/Viba-Gold-Delivery.jpg';
import imageVibaGoldDeliveryLarge from 'assets/Viba-Gold-Delivery-Large.jpg';
import imageVibaGoldDeliveryPlaceholder from 'assets/Viba-Gold-Delivery.jpg';
import { Footer } from 'components/Footer';
import { Card } from 'layouts/Home/Card';
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
  const details = useRef();

  useEffect(() => {
    const sections = [intro, details, projectOne];

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
        title="Designing Ecommerce site - Viba by Jar"
        description="6 Months of Product Design Internship at Jar"
        buttonText="Read More"
        buttonLink="/projects/viba"
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
      />

      {/* <ProjectSummary
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
      /> */}
      {/* <div className={styles.content}>
        <Card
          imageUrl={pinterestCover}
          heading="Revamping the User Experience"
          description="An UI UX case study of Pinterest. This is a conceptual project focused on redesigning the user interface and user experience of Pinterest."
          externalUrl="https://medium.com/@rits_8/revamping-the-user-experience-pinterest-92420843dc4a"
        />
        <Card
          imageUrl={flentCover}
          heading="Flent - UI Design"
          description="Focused on UX(UI) rather than UX(product)."
          externalUrl="https://www.behance.net/gallery/170470277/Flent-UI"
        />
        <Card
          imageUrl={tealfeedCover}
          heading="Tealfeed Dashboard"
          description="Assignment based on Tealfeed Dashboard"
          externalUrl="https://www.figma.com/proto/HKvBI16T4R08ru9Zsd4u9X/tealfeed?page-id=23%3A4183&node-id=23-4184&scaling=scale-down&mode=design&t=zGkeetFjetKDIxzo-1"
        />
      </div> */}
      <Footer />
    </div>
  );
};
