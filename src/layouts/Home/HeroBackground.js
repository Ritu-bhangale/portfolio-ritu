import { Transition } from 'components/Transition';
import { useReducedMotion } from 'framer-motion';
import { useInViewport } from 'hooks';
import { useEffect, useRef } from 'react';
import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from 'three';
import { cleanRenderer, cleanScene } from 'utils/three';
import styles from './HeroBackground.module.css';

// A gentle, elegant light wash. White base with soft pink + purple tones that
// drift organically, plus a warm glow that follows the cursor and fades.
// Inspired by oevra.com and backgrounds.supply — barely there, but beautiful.

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;        // smoothed, 0..1 (origin bottom-left)
  uniform float uMouseStrength;
  uniform vec2 uResolution;

  // soft radial falloff
  float blob(vec2 p, vec2 c, float r) {
    float d = length(p - c) / r;
    return exp(-d * d);
  }

  // cheap hash for subtle film grain
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    float aspect = uResolution.x / uResolution.y;
    vec2 p = vUv;
    p.x *= aspect;

    float t = uTime * 0.06;

    // a few large, soft pastel blobs that drift slowly — smooth, no splotches
    vec2 c1 = vec2(aspect * (0.30 + 0.06 * sin(t * 0.7)),       0.72 + 0.05 * cos(t * 0.6));
    vec2 c2 = vec2(aspect * (0.74 + 0.05 * cos(t * 0.5 + 1.5)), 0.66 + 0.06 * sin(t * 0.45 + 2.0));
    vec2 c3 = vec2(aspect * (0.52 + 0.07 * sin(t * 0.4 + 3.0)), 0.30 + 0.05 * cos(t * 0.55 + 1.0));
    vec2 c4 = vec2(aspect * (0.18 + 0.05 * cos(t * 0.6 + 4.0)), 0.34 + 0.06 * sin(t * 0.5 + 0.5));

    vec3 pink   = vec3(1.000, 0.831, 0.902); // soft pink
    vec3 purple = vec3(0.882, 0.851, 0.992); // soft purple
    vec3 peach  = vec3(1.000, 0.886, 0.835); // warm peach

    vec3 col = vec3(1.0);
    col = mix(col, pink,   blob(p, c1, 0.55 * aspect) * 0.55);
    col = mix(col, purple, blob(p, c2, 0.50 * aspect) * 0.50);
    col = mix(col, peach,  blob(p, c3, 0.45 * aspect) * 0.40);
    col = mix(col, purple, blob(p, c4, 0.40 * aspect) * 0.35);

    // warm light that follows the cursor and fades
    vec2 m = uMouse;
    m.x *= aspect;
    float glow = blob(p, m, 0.34 * aspect) * uMouseStrength;
    vec3 warm = vec3(1.000, 0.792, 0.835);
    col = mix(col, warm, clamp(glow, 0.0, 1.0) * 0.6);

    // keep it airy on white — never overpowering
    col = mix(vec3(1.0), col, 0.85);

    // very subtle grain to avoid banding and feel premium
    float grain = (hash(vUv * uResolution.xy) - 0.5) * 0.018;
    col += grain;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export const HeroBackground = ({ className, ...rest }) => {
  const canvasRef = useRef();
  const renderer = useRef();
  const camera = useRef();
  const scene = useRef();
  const material = useRef();
  const mesh = useRef();
  const uniforms = useRef();
  const start = useRef(Date.now());

  // mouse state (smoothed)
  const mouse = useRef(new Vector2(0.5, 0.5));
  const mouseTarget = useRef(new Vector2(0.5, 0.5));
  const strength = useRef(0);
  const strengthTarget = useRef(0);

  const reduceMotion = useReducedMotion();
  const isInViewport = useInViewport(canvasRef);

  // setup
  useEffect(() => {
    const canvas = canvasRef.current;
    renderer.current = new WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
    });

    // Lower resolution on mobile for performance; cap pixel ratio overall.
    const isMobile = window.innerWidth <= 696;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5);
    renderer.current.setPixelRatio(pixelRatio);

    camera.current = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    scene.current = new Scene();

    uniforms.current = {
      uTime: { value: 0 },
      uMouse: { value: new Vector2(0.5, 0.5) },
      uMouseStrength: { value: 0 },
      uResolution: { value: new Vector2(1, 1) },
    };

    material.current = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: uniforms.current,
      depthTest: false,
      depthWrite: false,
    });

    mesh.current = new Mesh(new PlaneGeometry(2, 2), material.current);
    scene.current.add(mesh.current);

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      renderer.current.setSize(clientWidth, clientHeight, false);
      uniforms.current.uResolution.value.set(clientWidth, clientHeight);
      // single static frame so reduced-motion users still see the wash
      renderer.current.render(scene.current, camera.current);
    };

    resize();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cleanScene(scene.current);
      cleanRenderer(renderer.current);
    };
  }, []);

  // pointer tracking — relative to the hero canvas, y flipped for GL uv
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onMove = event => {
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1 - (event.clientY - rect.top) / rect.height;
      mouseTarget.current.set(x, y);
      strengthTarget.current = 1;
    };
    const onLeave = () => {
      strengthTarget.current = 0;
    };

    if (!reduceMotion) {
      canvas.addEventListener('mousemove', onMove);
      canvas.addEventListener('mouseleave', onLeave);
    }
    return () => {
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, [reduceMotion]);

  // animation loop
  useEffect(() => {
    let animation;

    const animate = () => {
      animation = requestAnimationFrame(animate);

      // smooth the pointer + glow strength
      mouse.current.lerp(mouseTarget.current, 0.06);
      strength.current += (strengthTarget.current - strength.current) * 0.05;
      // glow gently fades when the pointer stops moving
      strengthTarget.current *= 0.96;

      uniforms.current.uTime.value = 0.001 * (Date.now() - start.current);
      uniforms.current.uMouse.value.copy(mouse.current);
      uniforms.current.uMouseStrength.value = strength.current;

      renderer.current.render(scene.current, camera.current);
    };

    if (!reduceMotion && isInViewport) {
      animate();
    } else if (renderer.current) {
      renderer.current.render(scene.current, camera.current);
    }

    return () => cancelAnimationFrame(animation);
  }, [isInViewport, reduceMotion]);

  return (
    <Transition in timeout={2000}>
      {visible => (
        <canvas
          aria-hidden
          ref={canvasRef}
          className={`${styles.canvas} ${className || ''}`}
          data-visible={visible}
          {...rest}
        />
      )}
    </Transition>
  );
};
