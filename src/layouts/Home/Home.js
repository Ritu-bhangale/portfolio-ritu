import vibaPdp from '../../assets/viba-pdp.jpg';
import vibaPdpLarge from '../../assets/viba-pdp-large.jpg';
import vibaPdpPlaceholder from '../../assets/viba-pdp.jpg';
import imageVibaGoldDelivery from 'assets/Viba-Gold-Delivery.jpg';
import imageVibaGoldDeliveryLarge from 'assets/Viba-Gold-Delivery-Large.jpg';
import imageVibaGoldDeliveryPlaceholder from 'assets/Viba-Gold-Delivery.jpg';
import previewVibaPostOrderFlow from 'assets/PreviewVibaPostOrderFlow.png';
import previewUpstoxFD from 'assets/PreviewUpstoxFD.png';
import { Footer } from 'components/Footer';
import { Card } from 'layouts/Home/Card';
import { Meta } from 'components/Meta';
import { Intro } from 'layouts/Home/Intro';
import { Profile } from 'layouts/Home/Profile';
import { ProjectSummary } from 'layouts/Home/ProjectSummary';
import { ProjectSummaryAlternate } from './ProjectSummaryalternate';
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
      <ProjectSummaryAlternate
        id="project-1"
        alternate
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Fixed Deposits order form"
        description="This project is part of my 6-months product design intern at Upstox"
        buttonText="Read More"
        buttonLink="https://portfolio-rits.framer.website/fd-upstox"
        image={previewUpstoxFD} // Passing the image directly
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Viba-Jar Integration"
        description="Integration of Viba website with the Jar platform, which led to a significant increase inorders."
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
      />
      <ProjectSummaryAlternate
        id="project-3"
        alternate
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Post order Flow"
        description="Created Viba's post-order flow from scratch, emphasizing user emotions to boost satisfaction and engagement."
        buttonText="Read More"
        buttonLink="https://www.figma.com/proto/YRyvTQGBNUntU1mdR8sFsd/Portfolio?page-id=499%3A8583&node-id=499-8584&viewport=38%2C299%2C0.25&t=7bgPUZED2tAs9egT-1&scaling=contain"
        image={previewVibaPostOrderFlow} // Passing the image directly
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
