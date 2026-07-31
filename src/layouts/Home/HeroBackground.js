import { Transition } from 'components/Transition';
import { useReducedMotion } from 'framer-motion';
import { useInViewport } from 'hooks';
import { useEffect, useRef } from 'react';
import {
  AddEquation,
  CustomBlending,
  Mesh,
  OneFactor,
  OneMinusSrcAlphaFactor,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector4,
  WebGLRenderer,
} from 'three';
import { cleanRenderer, cleanScene } from 'utils/three';
import styles from './HeroBackground.module.css';

// Faithful GLSL port of the Figma "Shader Fills" (Beta) Water caustic
// preset applied to the hero frame in the Figma design
// (fileKey cEgyhLlNbaIltuy4cZzWEt, node 430:3756). Ported from Figma's WGSL
// shader-fill source (id 9cd7048d-3c21-4074-b883-e14725fdf05b) — the trig
// and vector math are identical between WGSL and GLSL ES, so this is a
// direct translation, not a re-interpretation.

// Exact parameter values as set in the Figma file:
const WATER_COLOR = new Vector4(0.863, 0.914, 0.957, 1.0); // #DCE9F4
const HIGHLIGHT_COLOR = new Vector4(1.0, 1.0, 1.0, 1.0); // #FFFFFF
const INTENSITY = 0.34;
const CENTER = new Vector2(50.0, 50.0); // percent
const DEFAULT_PLAYHEAD = 31.02; // Figma's default "Phase" value, used as the
// frozen frame for prefers-reduced-motion.

// Playhead units advanced per second of real time. The Figma "Phase" slider
// runs 0-100 and maps to the shader's internal angle via
// t_val = playhead * TAU/100 + 23, so this rate sets how fast the caustic
// pattern drifts. 1.5/s means a full 0-100 cycle takes ~67s — a slow,
// gentle shimmer rather than a strobe.
const PLAYHEAD_RATE = 1.5;

// Easing factor for the ripple's fade in/out (per animation frame, ~60fps) —
// low enough that entering/leaving the hero feels like a soft dissolve
// rather than a snap.
const RIPPLE_EASE = 0.08;

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

  uniform vec2 uResolution;
  uniform vec4 uWaterColor;
  uniform vec4 uHighlightColor;
  uniform float uIntensity;
  uniform float uPlayhead;
  uniform vec2 uCenter;
  uniform vec2 uMouse;
  uniform float uRipple;

  const float TAU = 6.28318530718;
  const int MAX_ITER = 5;

  void main() {
    vec2 dims = uResolution;
    vec2 uvRaw = vUv;

    float cx = uCenter.x / 100.0;
    float cy = uCenter.y / 100.0;
    vec2 uv = uvRaw + vec2(1.0 - 2.0 * cx, 1.0 - 2.0 * cy);

    float t_val = uPlayhead * TAU / 100.0 + 23.0;

    float minDim = min(dims.x, dims.y);
    // Resolution-INDEPENDENT coordinates. p spans exactly one 0..TAU period
    // across the frame, which is the whole point: the pattern's spatial
    // frequency is a property of the shader, never of the canvas size or the
    // display's pixel density.
    //
    // This is the bug that made the wash read as a fine crosshatch. The
    // previous version multiplied uv by the canvas's literal pixel dimensions,
    // so p spanned ~1400 radians across a desktop hero — roughly 220 full
    // interference periods packed edge to edge, which resolves visually as a
    // repeating grid of high-frequency noise rather than water. Figma's own
    // preview of this fill (fileKey cEgyhLlNbaIltuy4cZzWEt, node 430:3756)
    // shows a handful of large, soft, cloud-like swirls; that only happens
    // when the frame covers a single period.
    //
    // Note on Figma's "Scale" parameter (3.7 in the design file): it is not a
    // plain multiplier on this coordinate space. Feeding it in as one — in
    // either direction — visibly diverges from Figma's own render: dividing by
    // it flattens the frame to ~1.7 radians of mush, multiplying by it tiles
    // the pattern ~4x across the width. One period per frame is what actually
    // matches the reference, so that is what's encoded here directly.
    vec2 p = mod(uv * TAU, TAU) - 250.0;
    vec2 i = p;
    float c = 1.0;
    float inten = mix(0.002519, 0.01178, uIntensity);

    for (int n = 0; n < MAX_ITER; n++) {
      float nt = t_val * float(n + 1);
      i = p + vec2(cos(nt - i.x) + sin(nt + i.y), sin(nt - i.y) + cos(nt + i.x));
      c += 1.0 / length(vec2(p.x / (sin(i.x + nt) / inten), p.y / (cos(i.y + nt) / inten)));
    }
    c /= float(MAX_ITER);
    c = 1.17 - pow(c, 1.4);
    float causticMask = clamp(pow(abs(c), 8.0), 0.0, 1.0);

    // Subtle pointer-driven ripple: a ring that radiates outward from the
    // cursor and decays with distance, blended additively into the caustic
    // mask so it reads as the existing water pattern responding to a touch
    // rather than a separate effect fighting it. uRipple eases 0→1 on
    // enter/leave (see RIPPLE_EASE in JS) for a smooth fade, not a snap.
    vec2 aspect = dims / minDim;
    float mouseDist = length((uvRaw - uMouse) * aspect);
    float ripple = sin(mouseDist * 26.0 - t_val * 3.0) * exp(-mouseDist * 4.5);
    causticMask = clamp(causticMask + ripple * uRipple * 0.35, 0.0, 1.0);

    // Cap how far the highlight can push toward pure white. Uncapped, the
    // caustic's brightest peaks hit causticMask == 1.0 (solid white) at some
    // point in every animation cycle, which is bright enough to wash out the
    // text sitting on top of it. Capping the mix keeps the shader's brightest
    // moment a soft, subtle highlight rather than a hard white flare —
    // matching the uniformly gentle look in the Figma reference.
    float highlightMix = causticMask * 0.5;

    float alpha = mix(uWaterColor.a, uHighlightColor.a, causticMask);
    vec3 colour = mix(uWaterColor.rgb, uHighlightColor.rgb, highlightMix);

    // Premultiplied alpha output, matching the Figma shader-fill contract.
    gl_FragColor = vec4(colour * alpha, alpha);
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

  // Pointer-driven ripple state — normalized UV coords (y flipped to match
  // the shader's bottom-up vUv), whether the pointer is currently over the
  // hero, and the eased 0→1 strength used to fade the effect in/out.
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const mouseInside = useRef(false);
  const rippleStrength = useRef(0);

  const reduceMotion = useReducedMotion();
  const isInViewport = useInViewport(canvasRef);

  // setup
  useEffect(() => {
    const canvas = canvasRef.current;
    renderer.current = new WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      premultipliedAlpha: true,
      powerPreference: 'high-performance',
    });
    renderer.current.setClearColor(0x000000, 0);

    // Lower resolution on mobile for performance; cap pixel ratio overall.
    const isMobile = window.innerWidth <= 696;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5);
    renderer.current.setPixelRatio(pixelRatio);

    camera.current = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    scene.current = new Scene();

    uniforms.current = {
      uResolution: { value: new Vector2(1, 1) },
      uWaterColor: { value: WATER_COLOR },
      uHighlightColor: { value: HIGHLIGHT_COLOR },
      uIntensity: { value: INTENSITY },
      uPlayhead: { value: reduceMotion ? DEFAULT_PLAYHEAD : 0 },
      uCenter: { value: CENTER },
      uMouse: { value: new Vector2(0.5, 0.5) },
      uRipple: { value: 0 },
    };

    material.current = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: uniforms.current,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      // Premultiplied-alpha-correct blending so the caustic composites
      // cleanly onto the (transparent) canvas without dark fringing.
      blending: CustomBlending,
      blendEquation: AddEquation,
      blendSrc: OneFactor,
      blendDst: OneMinusSrcAlphaFactor,
      blendSrcAlpha: OneFactor,
      blendDstAlpha: OneMinusSrcAlphaFactor,
    });

    mesh.current = new Mesh(new PlaneGeometry(2, 2), material.current);
    scene.current.add(mesh.current);

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      renderer.current.setSize(clientWidth, clientHeight, false);
      uniforms.current.uResolution.value.set(clientWidth, clientHeight);
      // single static frame so reduced-motion users still see the caustic
      renderer.current.render(scene.current, camera.current);
    };

    resize();
    window.addEventListener('resize', resize);

    // The canvas's rendered CSS size can change for reasons that don't fire
    // a window `resize` event — e.g. the `.hero` section growing due to a
    // min-height media query, or layout reflow from the plant <img> loading
    // asynchronously. Without observing the canvas element itself, the
    // WebGL drawing buffer and uResolution can go stale relative to the
    // canvas's actual displayed size, which desyncs this shader's
    // per-pixel math (dims/minDim/uvPx all depend on uResolution being
    // correct) and shows up as a stretched/distorted pattern.
    // `renderer.setSize(w, h, false)` uses updateStyle=false, so it never
    // touches the canvas's CSS box itself — only its drawing-buffer
    // resolution — so this observer cannot trigger a resize-of-itself loop.
    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => resize());
      resizeObserver.observe(canvas);
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (resizeObserver) resizeObserver.disconnect();
      cleanScene(scene.current);
      cleanRenderer(renderer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // pointer tracking for the ripple effect — hero-local only (enter/leave
  // gated on the canvas itself, which is sized to exactly match the hero),
  // and skipped entirely for reduced-motion users since it's a motion effect.
  useEffect(() => {
    if (reduceMotion) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const setFromEvent = event => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      mouse.current.x = (event.clientX - rect.left) / rect.width;
      // Flip Y: DOM coords are top-down, shader vUv is bottom-up.
      mouse.current.y = 1 - (event.clientY - rect.top) / rect.height;
    };

    const handlePointerEnter = event => {
      mouseInside.current = true;
      setFromEvent(event);
    };
    const handlePointerMove = event => {
      setFromEvent(event);
    };
    const handlePointerLeave = () => {
      mouseInside.current = false;
    };

    canvas.addEventListener('pointerenter', handlePointerEnter);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      canvas.removeEventListener('pointerenter', handlePointerEnter);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      mouseInside.current = false;
    };
  }, [reduceMotion]);

  // animation loop
  useEffect(() => {
    let animation;

    const animate = () => {
      animation = requestAnimationFrame(animate);

      const elapsedSeconds = 0.001 * (Date.now() - start.current);
      uniforms.current.uPlayhead.value = (elapsedSeconds * PLAYHEAD_RATE) % 100.0;

      // Ease the ripple strength toward 0/1 so it fades in/out smoothly
      // instead of snapping on enter/leave.
      const target = mouseInside.current ? 1 : 0;
      rippleStrength.current += (target - rippleStrength.current) * RIPPLE_EASE;
      uniforms.current.uMouse.value.set(mouse.current.x, mouse.current.y);
      uniforms.current.uRipple.value = rippleStrength.current;

      renderer.current.render(scene.current, camera.current);
    };

    if (!reduceMotion && isInViewport) {
      animate();
    } else if (renderer.current) {
      // Frozen frame at the Figma default phase for reduced-motion users.
      uniforms.current.uPlayhead.value = DEFAULT_PLAYHEAD;
      renderer.current.render(scene.current, camera.current);
    }

    return () => cancelAnimationFrame(animation);
  }, [isInViewport, reduceMotion]);

  return (
    <>
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
      {/* Soft gradient fade so the caustic wash dissolves into the page's
          white background at the bottom of the hero instead of cutting off
          in a hard rectangular edge. */}
      <div className={styles.fade} aria-hidden />
    </>
  );
};
