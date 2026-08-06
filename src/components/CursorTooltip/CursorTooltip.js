import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './CursorTooltip.module.css';

/* A Figma-style live-cursor label: a dark pill that rides just below and to the
   right of the actual pointer while a hoverable element is under it.

   Usage — render this in place of the container that wraps the hover targets,
   then let each target opt in with a `data-cursor-tooltip` label:

     <CursorTooltip as="div" className={styles.list}>
       <a data-cursor-tooltip="Read more" href="…">…</a>
     </CursorTooltip>

   Scoping the listeners to the container (rather than the document) keeps two
   sections from fighting over one global tooltip, and keeps mousemove work off
   the page when the pointer is nowhere near a target. */

const TARGET_ATTR = 'data-cursor-tooltip';
// Color variant for the pill — 'green' | 'blue' | 'grey' (see CursorTooltip.module.css).
const TONE_ATTR = 'data-cursor-tooltip-tone';

// The pill's offset from the arrow now lives entirely in CSS (`.tooltip`'s
// own top/left); only the edge-clamp margin is still needed here.
const EDGE_PADDING = 12;

/* Touch gate. A cursor follower has nothing to follow without a mouse, and
   touch has no real hover state, so the whole behaviour is off there. The CSS
   carries the same gate via `@media (--mediaNoTouch)` in case a device flips
   pointer type after mount. */
const supportsHover = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export const CursorTooltip = ({ as: Component = 'div', children, ...rest }) => {
  const scopeRef = useRef(null);
  const tooltipRef = useRef(null);
  const idRef = useRef(0);

  /* One state write per hover, not per pixel — position updates below are
     imperative so a mousemove never re-renders the tree. */
  const [active, setActive] = useState(null);

  // The group's own origin tracks the raw cursor position exactly (the arrow
  // tip sits under the pointer); the pill's offset from that origin is a pure
  // CSS position, not baked in here. Clamping still uses the group's full
  // measured box, so the pill can't run off-screen even though its offset
  // isn't part of this math.
  const place = useCallback((clientX, clientY) => {
    const node = tooltipRef.current;
    if (!node) return;

    const width = node.offsetWidth;
    const height = node.offsetHeight;
    const maxX = window.innerWidth - width - EDGE_PADDING;
    const maxY = window.innerHeight - height - EDGE_PADDING;
    const x = Math.max(EDGE_PADDING, Math.min(clientX, maxX));
    const y = Math.max(EDGE_PADDING, Math.min(clientY, maxY));

    node.style.setProperty('--cursorX', `${x}px`);
    node.style.setProperty('--cursorY', `${y}px`);
  }, []);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope || !supportsHover()) return undefined;

    let currentTarget = null;

    const clear = () => {
      if (!currentTarget) return;
      currentTarget = null;
      setActive(null);
    };

    const handleOver = event => {
      const target = event.target?.closest?.(`[${TARGET_ATTR}]`);
      if (!target || !scope.contains(target) || target === currentTarget) return;

      currentTarget = target;
      idRef.current += 1;

      setActive({
        id: idRef.current,
        label: target.getAttribute(TARGET_ATTR),
        tone: target.getAttribute(TONE_ATTR) || 'grey',
        x: event.clientX,
        y: event.clientY,
      });
    };

    const handleOut = event => {
      // Moving between a target's own children still fires mouseout; only a
      // relatedTarget outside the current card counts as a real leave.
      const next = event.relatedTarget;
      if (currentTarget && next && currentTarget.contains(next)) return;
      clear();
    };

    const handleMove = event => {
      if (!currentTarget) return;
      place(event.clientX, event.clientY);
    };

    scope.addEventListener('mouseover', handleOver);
    scope.addEventListener('mouseout', handleOut);
    scope.addEventListener('mousemove', handleMove);
    // Safety nets: scrolling or tabbing away can strand the pill on screen.
    window.addEventListener('blur', clear);
    window.addEventListener('scroll', clear, { passive: true });

    return () => {
      scope.removeEventListener('mouseover', handleOver);
      scope.removeEventListener('mouseout', handleOut);
      scope.removeEventListener('mousemove', handleMove);
      window.removeEventListener('blur', clear);
      window.removeEventListener('scroll', clear);
    };
  }, [place]);

  // Re-clamp once the pill has a measured width, for hovers near a viewport edge.
  useEffect(() => {
    if (active) place(active.x, active.y);
  }, [active, place]);

  return (
    <Component ref={scopeRef} {...rest}>
      {children}
      {active && typeof document !== 'undefined'
        ? createPortal(
            <span
              // A fresh key per hover remounts the group so it fades in at the
              // new card instead of gliding across the page from the old one.
              key={active.id}
              ref={tooltipRef}
              className={styles.group}
              aria-hidden="true"
              style={{
                '--cursorX': `${active.x}px`,
                '--cursorY': `${active.y}px`,
              }}
            >
              <svg
                className={styles.arrow}
                width="17"
                height="19"
                viewBox="0 0 17 19"
                fill="none"
                style={{ overflow: 'visible' }}
              >
                {/* Exact path from Figma node 621:3143, shifted so the tip
                    (the true click point) lands on the group's own origin. */}
                <g transform="translate(-4.62 -3.04)">
                  <path
                    d="M8.75418 20L5.62291 4.0409L20 11.9182L12.9181 13.9727L8.75418 20Z"
                    fill="black"
                    stroke="white"
                  />
                </g>
              </svg>
              <span className={styles.tooltip} data-tone={active.tone}>
                {active.label}
                <span className={styles.caret} aria-hidden="true" />
              </span>
            </span>,
            document.body
          )
        : null}
    </Component>
  );
};
