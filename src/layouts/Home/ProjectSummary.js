import { Button } from 'components/Button';
import { Divider } from 'components/Divider';
import { Heading } from 'components/Heading';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { useTheme } from 'components/ThemeProvider';
import { Transition } from 'components/Transition';
import { useWindowSize } from 'hooks';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { media } from 'utils/style';
import { Image } from 'components/Image';
import { deviceModels } from 'components/Model/deviceModels';
import styles from './ProjectSummary.module.css';

const Model = dynamic(() => import('components/Model').then(mod => mod.Model));

export const ProjectSummary = ({
  id,
  visible: sectionVisible,
  sectionRef,
  index,
  title,
  description,
  model, // model for 3D preview
  image, // image for image preview
  buttonText,
  buttonLink,
  alternate,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const theme = useTheme();
  const { width } = useWindowSize();
  const titleId = `${id}-title`;
  const isMobile = width <= media.tablet;
  const svgOpacity = theme.themeId === 'light' ? 0.7 : 1;
  const indexText = index < 10 ? `0${index}` : index;
  const phoneSizes = `(max-width: ${media.tablet}px) 30vw, 20vw`;
  const laptopSizes = `(max-width: ${media.tablet}px) 80vw, 40vw`;

  const renderDetails = visible => (
    <div className={styles.details}>
      <div aria-hidden className={styles.index}>
        <Divider
          notchWidth="64px"
          notchHeight="8px"
          collapsed={!visible}
          collapseDelay={1000}
        />
        <span className={styles.indexNumber} data-visible={visible}>
          {indexText}
        </span>
      </div>
      <Heading
        level={3}
        as="h2"
        className={styles.title}
        data-visible={visible}
        id={titleId}
      >
        {title}
      </Heading>
      <Text className={styles.description} data-visible={visible} as="p">
        {description}
      </Text>
      <div className={styles.button} data-visible={visible}>
        <Button iconHoverShift href={buttonLink} iconEnd="arrowRight">
          {buttonText}
        </Button>
      </div>
    </div>
  );

  const renderPreview = visible => {
    if (model) {
      // Render 3D model if model prop exists
      return (
        <div className={styles.preview}>
          {model.type === 'laptop' && (
            <div className={styles.model} data-device="laptop">
              <Model
                alt={model.alt}
                cameraPosition={{ x: 0, y: 0, z: 8 }}
                showDelay={700}
                show={visible}
                models={[
                  {
                    ...deviceModels.laptop,
                    texture: {
                      ...model.textures[0],
                      sizes: laptopSizes,
                    },
                  },
                ]}
              />
            </div>
          )}
          {model.type === 'phone' && (
            <div className={styles.model} data-device="phone">
              <Model
                alt={model.alt}
                cameraPosition={{ x: 0, y: 0, z: 11.5 }}
                showDelay={300}
                show={visible}
                models={[
                  {
                    ...deviceModels.phone,
                    position: { x: -0.6, y: 1.1, z: 0 },
                    texture: {
                      ...model.textures[0],
                      sizes: phoneSizes,
                    },
                  },
                  {
                    ...deviceModels.phone,
                    position: { x: 0.6, y: -0.5, z: 0.3 },
                    texture: {
                      ...model.textures[1],
                      sizes: phoneSizes,
                    },
                  },
                ]}
              />
            </div>
          )}
        </div>
      );
    } else if (image) {
      // Render image if image prop exists
      return (
        <div className={styles.preview}>
          <Image
            reveal
            delay={100}
            className={styles.image}
            src={image}
            placeholder={image}
            alt={title}
            sizes={`(max-width: ${media.mobile}px) 40vw, 25vw`}
            style={{ marginBottom: '2vh' }}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <Section
      className={styles.summary}
      data-alternate={alternate}
      data-first={index === 1}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      aria-labelledby={titleId}
      ref={sectionRef}
      id={id}
      tabIndex={-1}
      {...rest}
    >
      <div className={styles.content}>
        <Transition in={sectionVisible || focused}>
          {visible => (
            <>
              {!alternate && !isMobile && (
                <>
                  {renderDetails(visible)}
                  {renderPreview(visible)}
                </>
              )}
              {(alternate || isMobile) && (
                <>
                  {renderPreview(visible)}
                  {renderDetails(visible)}
                </>
              )}
            </>
          )}
        </Transition>
      </div>
    </Section>
  );
};
