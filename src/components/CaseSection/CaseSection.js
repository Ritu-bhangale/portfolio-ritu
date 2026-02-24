import { Section } from 'components/Section';
import { Heading } from 'components/Heading';
import { Text } from 'components/Text';
import styles from './CaseSection.module.css';

export const CaseSection = ({
  timeline,
  headerMeta,
  title,
  subtitle,
  subtitleTop,
  subtitlePosition = 'below',
  size = 'large',
  showGuides = false,
  children,
}) => {
  const showSubtitleAbove = subtitlePosition === 'above' || Boolean(subtitleTop);
  const subtitleText = subtitleTop || subtitle;

  return (
    <Section className={styles.section}>
      <div className={styles.container} data-size={size}>
        <div className={styles.header} data-guides={showGuides}>
          {headerMeta && <div className={styles.meta}>{headerMeta}</div>}

          {!headerMeta && timeline && (
            <div className={styles.timeline}>
              <span className={styles.dot} />
              <Text size="xl" className={styles.timelineText}>
                {timeline}
              </Text>
            </div>
          )}

          {showSubtitleAbove && subtitleText && (
            <Text size="l" variant="serif">
              {subtitleText}
            </Text>
          )}

          {title && <Heading level={2}>{title}</Heading>}

          {!showSubtitleAbove && subtitle && (
            <Text size="l" variant="serif">
              {subtitle}
            </Text>
          )}
        </div>

        {children && <div className={styles.media}>{children}</div>}
      </div>
    </Section>
  );
};
