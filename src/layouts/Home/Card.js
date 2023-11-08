import { Heading } from 'components/Heading';
import { Text } from 'components/Text';
import { media } from 'utils/style';
import { Image } from 'components/Image';
import styles from './Card.module.css';

export const Card = ({ imageUrl, placeholderUrl, heading, description, externalUrl }) => {
  return (
    <a href={externalUrl} target="_blank" rel="noopener noreferrer">
      <div className={styles.card}>
        <Image
          reveal
          delay={100}
          className={styles.image}
          src={imageUrl}
          placeholder={imageUrl}
          alt={heading}
          sizes={`(max-width: ${media.mobile}px) 50vw, 25vw`}
        />
        <div className={styles.content}>
          <Heading level={4} as="h2" className={styles.title}>
            {heading}
          </Heading>
          <Text className={styles.description} as="p" size="m">
            {description}
          </Text>
        </div>
      </div>
    </a>
  );
};
