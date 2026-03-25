/**
 * Animation constants — ported from Marcos-One promise-time-ui
 * Centralized easing curves, spring configs, and transition presets
 */

// Easing curves (CSS cubic-bezier format for Framer Motion)
export const EASINGS = {
  standard: [0.4, 0, 0.2, 1] as const,
  decelerate: [0.0, 0, 0.2, 1] as const,
  accelerate: [0.4, 0, 1, 1] as const,
  bounce: [0.34, 1.56, 0.64, 1] as const,
  smooth: [0.25, 0.1, 0.25, 1] as const,
};

// Spring physics configurations
export const SPRINGS = {
  bouncy: { type: 'spring' as const, stiffness: 400, damping: 17 },
  gentle: { type: 'spring' as const, stiffness: 120, damping: 14 },
  snappy: { type: 'spring' as const, stiffness: 300, damping: 20 },
  smooth: { type: 'spring' as const, stiffness: 200, damping: 25 },
  stiff: { type: 'spring' as const, stiffness: 500, damping: 30 },
};

// Duration presets (seconds for Framer Motion)
export const DURATIONS = {
  micro: 0.15,
  small: 0.25,
  medium: 0.35,
  large: 0.45,
  flip: 0.3,
};

// Composite transition presets
export const TRANSITIONS = {
  micro: { duration: DURATIONS.micro, ease: EASINGS.standard },
  small: { duration: DURATIONS.small, ease: EASINGS.decelerate },
  medium: { duration: DURATIONS.medium, ease: EASINGS.smooth },
  large: { duration: DURATIONS.large, ease: EASINGS.decelerate },
  flip: { duration: DURATIONS.flip, ease: EASINGS.bounce },
  fadeIn: { duration: DURATIONS.small, ease: EASINGS.decelerate },
  slideIn: { duration: DURATIONS.medium, ease: EASINGS.smooth },
};

// Common animation variants
export const VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: TRANSITIONS.fadeIn },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: TRANSITIONS.medium },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: TRANSITIONS.small },
  },
  slideUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: TRANSITIONS.large },
  },
  cardEntrance: {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { ...SPRINGS.gentle, duration: DURATIONS.medium },
    },
  },
};

// Stagger container
export const staggerContainer = (staggerDelay = 0.05) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.1,
    },
  },
});
