import { Transition } from "framer-motion";

// Smoother variants of common easing functions
export const smoothEasings = {
  easeOut: [0.33, 1, 0.68, 1],
  easeIn: [0.67, 0, 0.33, 1],
  easeInOut: [0.65, 0, 0.35, 1],
  bounce: [0.68, -0.55, 0.27, 1.55],
  gentle: [0.4, 0.0, 0.2, 1],
  spring: [0.34, 1.56, 0.64, 1]
};

// Optimized transition presets
export const optimizedTransitions = {
  // Smooth fade transitions
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.4, ease: smoothEasings.easeOut }
  },
  
  // Smooth scale transitions
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.4, ease: smoothEasings.easeOut }
  },
  
  // Smoother slide transitions
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.4, ease: smoothEasings.easeOut }
  },
  
  // Optimized animations for infinite loops
  infiniteLoop: (duration: number = 8): Transition => ({
    repeat: Infinity,
    repeatType: "mirror",
    duration,
    ease: smoothEasings.easeInOut,
    repeatDelay: 0
  })
};

// Helper to create RAF-based animations for smoother performance
export const createSmoothRAF = (
  callback: (progress: number) => void, 
  duration: number = 500
) => {
  let start: number | null = null;
  let rafId: number;

  const step = (timestamp: number) => {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    
    callback(progress);
    
    if (progress < 1) {
      rafId = requestAnimationFrame(step);
    }
  };
  
  rafId = requestAnimationFrame(step);
  
  return () => cancelAnimationFrame(rafId);
};

// Optimized scroll handler for smoother parallax effects
export const createSmoothScrollHandler = (
  callback: (scrollY: number) => void,
  throttleMs: number = 10
) => {
  let lastScrollY = window.scrollY;
  let ticking = false;
  let timeoutId: NodeJS.Timeout;
  
  const update = () => {
    callback(lastScrollY);
    ticking = false;
  };
  
  const requestTick = () => {
    if (!ticking) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(update, throttleMs);
      ticking = true;
    }
  };
  
  const onScroll = () => {
    lastScrollY = window.scrollY;
    requestTick();
  };
  
  window.addEventListener('scroll', onScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', onScroll);
    clearTimeout(timeoutId);
  };
};
