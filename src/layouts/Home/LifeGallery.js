import { Heading } from 'components/Heading';
import { Section } from 'components/Section';
import { Transition } from 'components/Transition';
import { useState } from 'react';
import styles from './LifeGallery.module.css';

export const LifeGallery = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);

  const galleryItems = [
    {
      id: 'gallery-1',
      title: 'Sometimes I bake',
      type: 'image',
    },
    {
      id: 'gallery-2',
      title: 'Other few times',
      subtitle: 'I crochet',
      type: 'image',
    },
    {
      id: 'gallery-3',
      type: 'image',
    },
    {
      id: 'gallery-4',
      type: 'image',
    },
    {
      id: 'gallery-5',
      type: 'image',
    },
  ];

  return (
    <Section
      className={styles.gallery}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {visible => (
          <div className={styles.content}>
            <Heading className={styles.title} data-visible={visible} level={2}>
              What my life looks like, outside design
            </Heading>
            <div className={styles.galleryGrid}>
              {galleryItems.map(item => (
                <div key={item.id} className={styles.galleryItem} data-visible={visible}>
                  <div className={styles.itemImage}></div>
                  {item.title && (
                    <div className={styles.itemLabel}>
                      {item.title}
                      {item.subtitle && (
                        <>
                          <br />
                          {item.subtitle}
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
