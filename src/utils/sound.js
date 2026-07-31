// Lightweight Web Audio playback utility for UI sound effects.
//
// The AudioContext is created lazily (on the first `playTap()`/`playHush()`
// call) rather than at module load — browsers require a user gesture before
// an AudioContext is allowed to run, and creating one too early just leaves
// it stuck in a "suspended" state. Both sounds share that one AudioContext.
// Each sound is fetched + decoded once and the resulting AudioBuffer is
// reused for every play; each play spins up a fresh AudioBufferSourceNode so
// rapid/overlapping plays (including of different sounds) don't cut each
// other off.

import { useLocalStorage } from 'hooks/useLocalStorage';

export const SOUND_ENABLED_KEY = 'soundEnabled';

const TAP_SOUND_URL = '/sounds/tap.mp3';
const TAP_GAIN = 0.5;

const HUSH_SOUND_URL = '/sounds/hush.mp3';
const HUSH_GAIN = 0.5;

let audioContext;
let unlockListenerAttached = false;

// Per-sound "fetch once, decode once" caches, keyed by an object identity
// (`{ promise: null }`) so `getBuffer()` can memoize any number of sounds
// without a dedicated module-level variable for each one.
const tapBufferCache = { promise: null };
const hushBufferCache = { promise: null };

function isSoundEnabled() {
  if (typeof window === 'undefined') return true;

  try {
    const stored = window.localStorage.getItem(SOUND_ENABLED_KEY);
    return stored === null ? true : JSON.parse(stored);
  } catch (error) {
    return true;
  }
}

function getAudioContext() {
  if (typeof window === 'undefined') return null;

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;

  if (!audioContext) {
    audioContext = new AudioContextClass();
  }

  return audioContext;
}

// AudioContexts start (or resume) in a "suspended" state until a user
// gesture unlocks them. Attach a one-time listener as a safety net in case
// `playTap()`'s own resume() attempt loses the "was this called from a user
// gesture" race in a particular browser.
function attachUnlockListener(ctx) {
  if (unlockListenerAttached || typeof document === 'undefined') return;
  unlockListenerAttached = true;

  document.addEventListener(
    'pointerdown',
    () => {
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
    },
    { once: true }
  );
}

// Generic "fetch once, decode once, reuse the AudioBuffer forever" loader.
// `cacheRef` is a one-element holder object (`{ promise }`) rather than a
// plain module variable, so this helper can be called for any sound and
// still get true per-sound memoization.
function getBuffer(ctx, url, cacheRef) {
  if (!cacheRef.promise) {
    cacheRef.promise = fetch(url)
      .then(response => response.arrayBuffer())
      .then(data => ctx.decodeAudioData(data))
      .catch(error => {
        console.error(`sound: failed to load ${url}`, error);
        cacheRef.promise = null;
        return null;
      });
  }

  return cacheRef.promise;
}

// Shared play path: resumes/unlocks the (single, reused) AudioContext, then
// plays `buffer` through a fresh BufferSourceNode + GainNode pair so
// overlapping plays of the same or different sounds never cut each other
// off.
function playBuffer(url, cacheRef, gain) {
  if (typeof window === 'undefined' || !isSoundEnabled()) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  attachUnlockListener(ctx);
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  getBuffer(ctx, url, cacheRef).then(buffer => {
    if (!buffer) return;

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const gainNode = ctx.createGain();
    gainNode.gain.value = gain;

    source.connect(gainNode);
    gainNode.connect(ctx.destination);
    source.start(0);
  });
}

// Plays the "tap" UI sound. No-ops on the server, when Web Audio isn't
// supported, or when the user has muted sound via the localStorage flag.
export function playTap() {
  playBuffer(TAP_SOUND_URL, tapBufferCache, TAP_GAIN);
}

// Plays the "hush" sound for fan-out hover interactions (the Fun section's
// folder cards, the resume button's logo tile stack). Same rules as
// `playTap()`: no-ops on the server, without Web Audio, or while muted.
export function playHush() {
  playBuffer(HUSH_SOUND_URL, hushBufferCache, HUSH_GAIN);
}

// React hook for UI that needs to read/toggle the mute flag reactively
// (e.g. a mute button). Backed by the same localStorage key `playTap()`
// checks, so toggling here takes effect on the very next tap.
export function useSoundEnabled() {
  return useLocalStorage(SOUND_ENABLED_KEY, true);
}
