import { createElement, isValidElement } from 'react';
import { motion } from 'framer-motion';
import { Text } from 'components/Text';
import { classes } from 'utils/style';
import styles from './StickyNote.module.css';

export const StickyNote = ({
  text,
  size = 'large',
  variant = 'green',
  icon = '💡',
  draggable = true,
  constraintsRef,
  rotate = 0,
  x = 0,
  y = 0,
  className,
  textClassName,
  style,
}) => {
  const dragProps = draggable
    ? {
        drag: true,
        dragConstraints: constraintsRef,
        dragElastic: 0.12,
        dragMomentum: false,
        whileTap: { cursor: 'grabbing', scale: 1.02 },
      }
    : {};

  const renderIcon = () => {
    if (!icon) return null;
    if (isValidElement(icon)) return icon;
    if (typeof icon === 'function') return createElement(icon);
    return icon;
  };

  return (
    <motion.article
      className={classes(styles.note, className)}
      data-size={size}
      data-variant={variant}
      style={{ rotate: `${rotate}deg`, x, y, ...style }}
      whileHover={{ y: -4, scale: 1.015 }}
      {...dragProps}
    >
      <Text as="p" className={classes(styles.text, textClassName)}>
        {text}
      </Text>
      <span className={styles.icon} aria-hidden="true">
        {renderIcon()}
      </span>
    </motion.article>
  );
};
