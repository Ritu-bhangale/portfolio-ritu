import { Fragment } from 'react';
import { classes } from 'utils/style';
import styles from './Heading.module.css';

export const Heading = ({
  children,
  level = 1,
  as,
  align = 'auto',
  variant = 'default',
  className,
  ...rest
}) => {
  const clampedLevel = Math.min(Math.max(level, 0), 5);
  const Component = as || `h${Math.max(clampedLevel, 1)}`;

  return (
    <Component
      className={classes(styles.heading, className)}
      data-align={align}
      data-level={clampedLevel}
      data-variant={variant}
      {...rest}
    >
      {children}
    </Component>
  );
};
