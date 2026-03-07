import flowerIcon from 'assets/flower.svg';
import { Icon } from 'components/Icon';
import { Loader } from 'components/Loader';
import { Transition } from 'components/Transition';
import { useAppContext } from 'hooks';
import RouterLink from 'next/link';
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { classes } from 'utils/style';
import styles from './Button.module.css';

const SEASONS = ['summer', 'monsoon', 'autumn', 'winter'];

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
      onClick,
      onMouseEnter,
      onMouseLeave,
      ...rest
    },
    ref
  ) => {
    const { seasonIndex } = useAppContext();
    const isExternal = isExternalLink(href);
    const defaultComponent = href ? 'a' : 'button';
    const Component = as || defaultComponent;
    const [flowerSpin, setFlowerSpin] = useState(false);
    const [sunBurstActive, setSunBurstActive] = useState(false);
    const timeoutsRef = useRef([]);
    const season = useMemo(() => SEASONS[seasonIndex ?? 0] || SEASONS[0], [seasonIndex]);
    const summerEnabled = season === 'summer' && !!iconEnd;

    useEffect(() => {
      return () => {
        const timeouts = timeoutsRef.current;
        timeouts.forEach(timeout => window.clearTimeout(timeout));
      };
    }, []);

    return (
      <Component
        className={classes(styles.button, 'season-button', summerEnabled && styles.summerEnabled, className)}
        data-loading={loading}
        data-icon-only={iconOnly}
        data-secondary={secondary}
        data-jarbtn={jarbtn}
        data-icon={icon}
        href={href}
        rel={rel || isExternal ? 'noopener noreferrer' : undefined}
        target={target || isExternal ? '_blank' : undefined}
        disabled={disabled}
        ref={ref}
        onMouseEnter={event => {
          onMouseEnter?.(event);
        }}
        onMouseLeave={event => {
          onMouseLeave?.(event);
        }}
        onClick={event => {
          onClick?.(event);

          if (!summerEnabled) return;

          setFlowerSpin(true);
          setSunBurstActive(true);

          const spinTimeout = window.setTimeout(() => setFlowerSpin(false), 460);
          const burstTimeout = window.setTimeout(() => setSunBurstActive(false), 520);
          timeoutsRef.current.push(spinTimeout, burstTimeout);
        }}
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
        {!!children && <span className={classes(styles.text, 'label')}>{children}</span>}
        {!!iconEnd && (
          <span className={summerEnabled ? styles.endIconStack : undefined}>
            <Icon
              className={classes(styles.icon, summerEnabled && styles.arrowIcon)}
              data-end={!iconOnly}
              data-shift={iconHoverShift}
              icon={iconEnd}
            />
            {summerEnabled && (
              <>
                <img
                  className={classes(
                    styles.icon,
                    styles.flowerIcon,
                    flowerSpin && styles.flowerSpin
                  )}
                  src={flowerIcon.src || flowerIcon}
                  alt=""
                />
                <span
                  className={classes(styles.sunBurst, sunBurstActive && styles.sunBurstActive)}
                  aria-hidden
                />
              </>
            )}
          </span>
        )}
        <Transition unmount in={loading}>
          {visible => (
            <Loader
              className={styles.loader}
              size={32}
              text={loadingText}
              data-visible={visible}
            />
          )}
        </Transition>
      </Component>
    );
  }
);
