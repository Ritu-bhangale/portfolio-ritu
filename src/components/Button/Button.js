import { Icon } from 'components/Icon';
import RouterLink from 'next/link';
import { forwardRef } from 'react';
import { classes } from 'utils/style';
import styles from './Button.module.css';

function isExternalLink(href) {
  return href?.includes('://');
}

export const Button = forwardRef(({ href, ...rest }, ref) => {
  if (isExternalLink(href) || !href) {
    return <ButtonContent href={href} ref={ref} {...rest} />;
  }

  return (
    <RouterLink passHref href={href} scroll={false}>
      <ButtonContent href={href} ref={ref} {...rest} />
    </RouterLink>
  );
});

const ButtonContent = forwardRef(
  (
    {
      className,
      as,
      secondary,
      jarbtn,
      wip,
      loading,
      loadingText = 'loading',
      icon,
      iconEnd,
      iconHoverShift,
      iconOnly,
      children,
      rel,
      target,
      href,
      disabled,
      ...rest
    },
    ref
  ) => {
    const isExternal = isExternalLink(href);
    const defaultComponent = href ? 'a' : 'button';
    const Component = as || defaultComponent;

    return (
      <Component
        className={classes(styles.button, className)}
        data-loading={loading}
        data-icon-only={iconOnly}
        data-secondary={secondary}
        data-jarbtn={jarbtn}
        data-wip={wip}
        data-icon={icon}
        href={wip ? undefined : href}
        rel={!wip && (rel || isExternal) ? 'noopener noreferrer' : undefined}
        target={!wip && (target || isExternal) ? '_blank' : undefined}
        disabled={disabled || wip}
        ref={ref}
        {...rest}
      >
        {!!icon && (
          <Icon
            className={styles.icon}
            data-start={!iconOnly}
            data-shift={iconHoverShift}
            icon={icon}
          />
        )}
        {!!children && (
          <span className={styles.text}>{loading ? loadingText : children}</span>
        )}
        {loading ? (
          <span className={styles.spinner} aria-hidden="true" />
        ) : (
          !!iconEnd && (
            <Icon
              className={styles.icon}
              data-end={!iconOnly}
              data-shift={iconHoverShift}
              icon={iconEnd}
            />
          )
        )}
      </Component>
    );
  }
);
