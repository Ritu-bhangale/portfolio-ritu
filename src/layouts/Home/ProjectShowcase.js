import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'components/Button';
import { Heading } from 'components/Heading';
import { Text } from 'components/Text';
import { classes } from 'utils/style';
import styles from './ProjectShowcase.module.css';

export function ProjectShowcase({
  tags = [],
  title,
  description,
  buttonHref,
  buttonLabel = 'Read',
  backgroundColor,
  index = 0,
  wip,
  children,
  className,
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = url => {
      if (url === buttonHref) setLoading(true);
    };
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router, buttonHref]);

  return (
    <div
      className={classes(styles.showcase, className)}
      style={{
        '--showcaseBg': backgroundColor || undefined,
        '--cardIndex': index,
      }}
    >
      <div className={styles.info}>
        {!!tags.length && (
          <div className={styles.tags}>
            {tags.map(tag => (
              <span
                key={tag.label}
                className={styles.tag}
                data-accent={!!tag.accent}
                style={tag.accent ? { '--tagAccentColor': tag.accent } : undefined}
              >
                {tag.label}
              </span>
            ))}
          </div>
        )}

        <div className={styles.titleGroup}>
          <div className={styles.titleText}>
            <Heading level={2} as="h2" className={styles.title}>
              {title}
            </Heading>
            <Text size="m" tone="secondary" as="p" className={styles.description}>
              {description}
            </Text>
          </div>

          <Button
            href={buttonHref}
            iconEnd={wip ? 'lock' : 'arrowRight'}
            iconHoverShift={!wip}
            loading={loading}
            loadingText="Loading"
            wip={wip}
          >
            {wip ? 'WIP' : buttonLabel}
          </Button>
        </div>
      </div>
      <div className={styles.visual}>{children}</div>
    </div>
  );
}
