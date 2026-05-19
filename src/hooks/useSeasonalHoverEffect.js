import autumnLeaf from 'assets/shared/Autumn leaf.svg';
import { useAppContext } from 'hooks/useAppContext';
import { useCallback, useEffect, useMemo, useRef } from 'react';

const SEASONS = ['summer', 'monsoon', 'autumn', 'winter'];
const MAX_EFFECTS = 5;

function createParticle(element) {
  const particle = document.createElement('span');
  particle.style.position = 'absolute';
  particle.style.pointerEvents = 'none';
  particle.style.zIndex = '3';
  particle.style.opacity = '0';
  particle.style.transform = 'translate3d(0, 0, 0)';
  element.appendChild(particle);
  return particle;
}

export function useSeasonalHoverEffect() {
  const { seasonIndex } = useAppContext();
  const cleanupRef = useRef([]);

  const season = useMemo(() => SEASONS[seasonIndex ?? 0] || SEASONS[0], [seasonIndex]);

  useEffect(() => {
    return () => {
      cleanupRef.current.forEach(cleanup => cleanup());
      cleanupRef.current = [];
    };
  }, []);

  const scheduleRemoval = useCallback((particle, totalDuration) => {
    const timeout = window.setTimeout(() => {
      particle.remove();
    }, totalDuration + 120);

    const cleanup = () => {
      window.clearTimeout(timeout);
      particle.remove();
    };

    cleanupRef.current.push(cleanup);
  }, []);

  const spawnSummer = useCallback(
    (element, x, y) => {
      const spark = createParticle(element);
      const duration = 500;
      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      spark.style.width = '8px';
      spark.style.height = '8px';
      spark.style.borderRadius = '50%';
      spark.style.background = 'radial-gradient(circle, rgb(255 246 194 / 0.7) 0%, rgb(255 246 194 / 0) 70%)';

      spark.animate(
        [
          { opacity: 0.7, transform: 'translate3d(0, 0, 0) scale(0.8)' },
          { opacity: 0, transform: 'translate3d(0, 0, 0) scale(2.5)' },
        ],
        { duration, easing: 'ease-out', fill: 'forwards' }
      );

      scheduleRemoval(spark, duration);
    },
    [scheduleRemoval]
  );

  const spawnMonsoon = useCallback(
    (element, rect) => {
      const count = 3 + Math.floor(Math.random() * 2);
      for (let index = 0; index < Math.min(count, MAX_EFFECTS); index += 1) {
        const rain = createParticle(element);
        const startX = Math.random() * rect.width;
        const startY = -4 - Math.random() * 8;
        const driftX = 6 + Math.random() * 6;
        const driftY = 30 + Math.random() * 10;
        const duration = 600 + Math.floor(Math.random() * 151);
        const delay = Math.floor(Math.random() * 60);
        const size = 2 + Math.random();

        rain.style.left = `${startX}px`;
        rain.style.top = `${startY}px`;
        rain.style.width = `${size}px`;
        rain.style.height = `${size}px`;
        rain.style.borderRadius = '50%';
        rain.style.background = 'rgb(180 210 255 / 0.85)';

        rain.animate(
          [
            { opacity: 0.7, transform: 'translate3d(0, 0, 0)' },
            { opacity: 0, transform: `translate3d(${driftX}px, ${driftY}px, 0)` },
          ],
          { duration, delay, easing: 'ease-out', fill: 'forwards' }
        );

        scheduleRemoval(rain, duration + delay);
      }
    },
    [scheduleRemoval]
  );

  const spawnAutumn = useCallback(
    (element, rect) => {
      const count = 1 + Math.floor(Math.random() * 2);
      for (let index = 0; index < Math.min(count, MAX_EFFECTS); index += 1) {
        const leaf = createParticle(element);
        const startX = Math.random() * rect.width;
        const startY = -6 - Math.random() * 6;
        const duration = 800 + Math.floor(Math.random() * 101);
        const delay = Math.floor(Math.random() * 81);
        const size = 6 + Math.random() * 2;

        leaf.style.left = `${startX}px`;
        leaf.style.top = `${startY}px`;
        leaf.style.width = `${size}px`;
        leaf.style.height = `${size}px`;
        leaf.style.backgroundImage = `url(${autumnLeaf.src || autumnLeaf})`;
        leaf.style.backgroundRepeat = 'no-repeat';
        leaf.style.backgroundSize = 'contain';
        leaf.style.backgroundPosition = 'center';
        leaf.style.filter = 'sepia(0.5) saturate(1.15) opacity(0.75)';

        leaf.animate(
          [
            { opacity: 0.75, transform: 'translate3d(0, 0, 0) rotate(0deg)' },
            { opacity: 0, transform: 'translate3d(18px, 40px, 0) rotate(110deg)' },
          ],
          { duration, delay, easing: 'ease-out', fill: 'forwards' }
        );

        scheduleRemoval(leaf, duration + delay);
      }
    },
    [scheduleRemoval]
  );

  const spawnWinter = useCallback(
    (element, rect, pointerX, pointerY) => {
      element.classList.add('frosted');
      const frostTimeout = window.setTimeout(() => {
        element.classList.remove('frosted');
      }, 500);
      cleanupRef.current.push(() => {
        window.clearTimeout(frostTimeout);
        element.classList.remove('frosted');
      });

      const crack = createParticle(element);
      const crackDuration = 350 + Math.floor(Math.random() * 101);
      const crackX = pointerX < rect.width / 2 ? 4 : rect.width - 44;
      const crackY = pointerY < rect.height / 2 ? 4 : rect.height - 8;
      const crackLength = 30 + Math.floor(Math.random() * 11);

      crack.style.left = `${crackX}px`;
      crack.style.top = `${crackY}px`;
      crack.style.width = `${crackLength}px`;
      crack.style.height = '1px';
      crack.style.background = 'rgb(255 255 255 / 0.7)';
      crack.style.transformOrigin = 'left center';

      crack.animate(
        [
          { opacity: 0.8, transform: 'scaleX(0)' },
          { opacity: 0, transform: 'scaleX(1)' },
        ],
        { duration: crackDuration, easing: 'ease-out', fill: 'forwards' }
      );
      scheduleRemoval(crack, crackDuration);

      const snowCount = 3 + Math.floor(Math.random() * 2);
      for (let index = 0; index < Math.min(snowCount, MAX_EFFECTS - 1); index += 1) {
        const snow = createParticle(element);
        const size = 1 + Math.random();
        const startX = pointerX + (Math.random() * 12 - 6);
        const startY = Math.max(2, pointerY - 8);
        const driftX = Math.random() * 6 - 3;
        const duration = 700 + Math.floor(Math.random() * 201);
        const delay = Math.floor(Math.random() * 70);

        snow.style.left = `${startX}px`;
        snow.style.top = `${startY}px`;
        snow.style.width = `${size}px`;
        snow.style.height = `${size}px`;
        snow.style.borderRadius = '50%';
        snow.style.background = 'rgb(255 255 255 / 0.8)';

        snow.animate(
          [
            { opacity: 0.7, transform: 'translate3d(0, 0, 0)' },
            { opacity: 0, transform: `translate3d(${driftX}px, 12px, 0)` },
          ],
          { duration, delay, easing: 'ease-out', fill: 'forwards' }
        );

        scheduleRemoval(snow, duration + delay);
      }
    },
    [scheduleRemoval]
  );

  const handleMouseEnter = useCallback(
    event => {
      const element = event.currentTarget;
      const rect = element.getBoundingClientRect();
      const pointerX = event.clientX - rect.left;
      const pointerY = event.clientY - rect.top;

      if (season === 'summer') {
        spawnSummer(element, pointerX, pointerY);
        return;
      }

      if (season === 'monsoon') {
        spawnMonsoon(element, rect);
        return;
      }

      if (season === 'autumn') {
        spawnAutumn(element, rect);
        return;
      }

      spawnWinter(element, rect, pointerX, pointerY);
    },
    [season, spawnAutumn, spawnMonsoon, spawnSummer, spawnWinter]
  );

  const handleMouseLeave = useCallback(event => {
    event?.currentTarget?.classList.remove('frosted');
  }, []);

  return {
    handleMouseEnter,
    handleMouseLeave,
  };
}
