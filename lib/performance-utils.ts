// Performance optimization utilities
export const PERFORMANCE_CONFIG = {
  // Animation settings
  ANIMATION: {
    DURATION: 0.3, // Much faster for better performance
    EASING: [0.4, 0, 0.2, 1], // Simpler easing for better performance
    SPRING: {
      stiffness: 400, // Higher stiffness for snappier feel
      damping: 40, // Higher damping for stability
      mass: 0.5 // Lighter mass for faster response
    }
  },
  
  // Particle system settings
  PARTICLES: {
    MAX_COUNT: 20, // Drastically reduced for maximum performance
    CONNECTION_DISTANCE: 60, // Further reduced
    UPDATE_INTERVAL: 32, // 30fps for particles to save CPU
    FADE_DISTANCE: 40 // Further reduced
  },
  
  // Scroll optimization
  SCROLL: {
    THROTTLE_DELAY: 16, // Back to 60fps for better performance
    DEBOUNCE_DELAY: 100, // Increased for better performance
    SMOOTH_SCROLL_DURATION: 400 // Much faster smooth scrolling
  },
  
  // Intersection observer settings
  INTERSECTION: {
    THRESHOLD: [0, 0.5, 1], // Simplified for better performance
    ROOT_MARGIN: '0px 0px -10% 0px' // Larger margins for less frequent updates
  },
  
  // Rendering optimization
  RENDERING: {
    FRAME_RATE_TARGET: 60,
    FRAME_RATE_MIN: 30,
    GPU_ACCELERATION: true,
    COMPOSITE_LAYERS: true
  }
}

// Throttle function for performance
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0
  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      func(...args)
    }
  }
}

// Debounce function for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

// RAF (RequestAnimationFrame) wrapper for smooth animations
export function rafThrottle<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => void {
  let ticking = false
  let lastArgs: Parameters<T> | null = null
  
  return (...args: Parameters<T>) => {
    lastArgs = args
    if (!ticking) {
      requestAnimationFrame(() => {
        if (lastArgs) {
          func(...lastArgs)
        }
        ticking = false
        lastArgs = null
      })
      ticking = true
    }
  }
}

// Ultra-smooth RAF with priority handling
export function smoothRaf<T extends (...args: any[]) => any>(
  func: T,
  priority: 'high' | 'normal' | 'low' = 'normal'
): (...args: Parameters<T>) => void {
  let scheduled = false
  let lastArgs: Parameters<T> | null = null
  
  const execute = () => {
    if (lastArgs) {
      func(...lastArgs)
      lastArgs = null
    }
    scheduled = false
  }
  
  return (...args: Parameters<T>) => {
    lastArgs = args
    if (!scheduled) {
      if (priority === 'high') {
        // Execute immediately for high priority
        requestAnimationFrame(execute)
      } else {
        // Use setTimeout for lower priority to avoid blocking
        setTimeout(() => requestAnimationFrame(execute), priority === 'low' ? 1 : 0)
      }
      scheduled = true
    }
  }
}

// Performance monitoring
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number[]> = new Map()
  private observers: Map<string, PerformanceObserver> = new Map()
  private cleanupFrameMonitoring?: () => void

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  startMeasure(name: string): void {
    if (typeof performance !== 'undefined') {
      performance.mark(`${name}-start`)
    }
  }

  endMeasure(name: string): void {
    if (typeof performance !== 'undefined') {
      performance.mark(`${name}-end`)
      performance.measure(name, `${name}-start`, `${name}-end`)
      
      const measure = performance.getEntriesByName(name)[0]
      if (measure) {
        if (!this.metrics.has(name)) {
          this.metrics.set(name, [])
        }
        this.metrics.get(name)!.push(measure.duration)
      }
    }
  }

  getAverageTime(name: string): number {
    const times = this.metrics.get(name)
    if (!times || times.length === 0) return 0
    return times.reduce((a, b) => a + b, 0) / times.length
  }

  // Monitor frame rate with reduced overhead
  startFrameRateMonitoring(): void {
    if (typeof window === 'undefined') return

    let frameCount = 0
    let lastTime = performance.now()
    let isMonitoring = true

    const countFrames = () => {
      if (!isMonitoring) return
      
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime - lastTime >= 2000) { // Check every 2 seconds instead of 1
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        this.metrics.set('fps', [fps])
        frameCount = 0
        lastTime = currentTime
      }
      
      if (isMonitoring) {
        requestAnimationFrame(countFrames)
      }
    }

    requestAnimationFrame(countFrames)
    
    // Store cleanup function
    this.cleanupFrameMonitoring = () => {
      isMonitoring = false
    }
  }

  // Get current FPS
  getCurrentFPS(): number {
    const fps = this.metrics.get('fps')
    return fps && fps.length > 0 ? fps[fps.length - 1] : 60
  }
}

// Memory management utilities
export class MemoryManager {
  private static instance: MemoryManager
  private cleanupCallbacks: Map<string, () => void> = new Map()

  static getInstance(): MemoryManager {
    if (!MemoryManager.instance) {
      MemoryManager.instance = new MemoryManager()
    }
    return MemoryManager.instance
  }

  registerCleanup(id: string, callback: () => void): void {
    this.cleanupCallbacks.set(id, callback)
  }

  cleanup(id: string): void {
    const callback = this.cleanupCallbacks.get(id)
    if (callback) {
      callback()
      this.cleanupCallbacks.delete(id)
    }
  }

  cleanupAll(): void {
    this.cleanupCallbacks.forEach(callback => callback())
    this.cleanupCallbacks.clear()
  }
}

// Animation optimization helpers
export const animationHelpers = {
  // Optimized easing functions
  easings: {
    smooth: [0.65, 0, 0.35, 1],
    bounce: [0.68, -0.55, 0.27, 1.55],
    elastic: [0.175, 0.885, 0.32, 1.275],
    back: [0.6, -0.28, 0.735, 0.045]
  },

  // Get optimized transition config
  getTransition(duration: number = 0.6, easing: 'smooth' | 'bounce' | 'elastic' | 'back' = 'smooth') {
    return {
      duration,
      ease: animationHelpers.easings[easing],
      type: "spring",
      stiffness: PERFORMANCE_CONFIG.ANIMATION.SPRING.stiffness,
      damping: PERFORMANCE_CONFIG.ANIMATION.SPRING.damping
    }
  },

  // Get optimized layout transition
  getLayoutTransition() {
    return {
      type: "spring",
      stiffness: 200,
      damping: 25,
      mass: 1
    }
  }
}

// DOM optimization utilities
export const domOptimizations = {
  // Add performance attributes to element
  optimizeElement(element: HTMLElement): void {
    element.style.willChange = 'transform, opacity'
    element.style.backfaceVisibility = 'hidden'
    element.style.perspective = '1000px'
    element.style.transform = 'translateZ(0)'
    element.style.contain = 'layout paint'
    element.style.isolation = 'isolate'
  },

  // Remove performance attributes
  deoptimizeElement(element: HTMLElement): void {
    element.style.willChange = 'auto'
    element.style.backfaceVisibility = 'visible'
    element.style.perspective = 'none'
    element.style.transform = 'none'
    element.style.contain = 'none'
    element.style.isolation = 'auto'
  },

  // Batch DOM updates with priority
  batchUpdates(updates: (() => void)[], priority: 'high' | 'normal' | 'low' = 'normal'): void {
    if (priority === 'high') {
      // Execute immediately for high priority updates
      updates.forEach(update => update())
    } else {
      // Batch for normal/low priority
      requestAnimationFrame(() => {
        updates.forEach(update => update())
      })
    }
  },

  // Optimize for smooth scrolling
  optimizeForScroll(element: HTMLElement): void {
    element.style.willChange = 'transform'
    element.style.transform = 'translateZ(0)'
    element.style.contain = 'layout paint'
    element.style.position = 'relative'
  },

  // Optimize for animations
  optimizeForAnimation(element: HTMLElement): void {
    element.style.willChange = 'transform, opacity'
    element.style.backfaceVisibility = 'hidden'
    element.style.perspective = '1000px'
    element.style.transform = 'translateZ(0)'
    element.style.contain = 'layout paint'
  },

  // Create composite layer
  createCompositeLayer(element: HTMLElement): void {
    element.style.willChange = 'transform'
    element.style.transform = 'translateZ(0)'
    element.style.contain = 'layout paint'
    element.style.isolation = 'isolate'
  }
}

// Device performance detection
export const devicePerformance = {
  // Check if device is low-end
  isLowEndDevice(): boolean {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return false
    
    const memory = (navigator as any).deviceMemory
    const cores = (navigator as any).hardwareConcurrency
    
    return (memory && memory < 4) || (cores && cores < 4)
  },

  // Check if device prefers reduced motion
  prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  },

  // Get device performance tier
  getPerformanceTier(): 'low' | 'medium' | 'high' {
    if (typeof window === 'undefined') return 'medium' // Default for SSR
    
    if (this.isLowEndDevice()) return 'low'
    if (this.prefersReducedMotion()) return 'low'
    
    // Check for high-end indicators
    const memory = (navigator as any).deviceMemory
    const cores = (navigator as any).hardwareConcurrency
    
    if (memory >= 8 && cores >= 8) return 'high'
    return 'medium'
  }
}

// Export performance monitor instance
export const performanceMonitor = PerformanceMonitor.getInstance()
export const memoryManager = MemoryManager.getInstance()
