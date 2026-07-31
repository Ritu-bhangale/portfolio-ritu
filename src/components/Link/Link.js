import RouterLink from 'next/link';
import { forwardRef } from 'react';
import { classes } from 'utils/style';
import { playTap } from 'utils/sound';
import styles from './Link.module.css';

// File extensions that can be linked to
const VALID_EXT = ['txt', 'png', 'jpg'];

function isAnchor(href) {
  const isValidExtension = VALID_EXT.includes(href?.split('.').pop());
  return href?.includes('://') || href?.[0] === '#' || isValidExtension;
}

export const Link = forwardRef(({ href, ...rest }, ref) => {
  if (isAnchor(href)) {
    return <LinkContent href={href} ref={ref} {...rest} />;
  }

  return (
    <RouterLink passHref href={href} scroll={false}>
      <LinkContent ref={ref} {...rest} />
    </RouterLink>
  );
});

export const LinkContent = forwardRef(
  ({ rel, target, children, secondary, className, href, onClick, ...rest }, ref) => {
    const isExternal = href?.includes('://');
    const relValue = rel || (isExternal ? 'noreferrer noopener' : undefined);
    const targetValue = target || (isExternal ? '_blank' : undefined);

    const handleClick = event => {
      playTap();
      onClick?.(event);
    };

    return (
      <a
        className={classes(styles.link, className)}
        data-secondary={secondary}
        rel={relValue}
        href={href}
        target={targetValue}
        onClick={handleClick}
        ref={ref}
        {...rest}
      >
        {children}
      </a>
    );
  }
);
