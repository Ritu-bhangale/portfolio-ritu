import { classes } from 'utils/style';
import styles from './Text.module.css';

export const Text = ({
  children,
  size = 'm',
  variant = 'sans',
  tone = 'primary',
  as = 'p',
  className,
  ...rest
}) => {
  const Component = as;

  return (
    <Component
      className={classes(styles.text, className)}
      data-size={size}
      data-variant={variant}
      data-tone={tone}
      {...rest}
    >
      {children}
    </Component>
  );
};
