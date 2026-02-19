import Section from 'components/Section';
import Heading from 'components/Heading';
import Text from 'components/Text';
import styles from './CaseSection.module.css';

export default function CaseSection({ timeline, title, subtitle, children }) {
  return (
    <Section>
      <div className={styles.container}>
        {timeline && (
          <div className={styles.timeline}>
            <span className={styles.dot} />
            <Text size="s">{timeline}</Text>
          </div>
        )}

        {title && <Heading level={3}>{title}</Heading>}

        {subtitle && (
          <Text size="l" variant="serif">
            {subtitle}
          </Text>
        )}

        {children && <div className={styles.media}>{children}</div>}
      </div>
    </Section>
  );
}
