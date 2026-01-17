// Smooth scroll utilities for better performance

export class SmoothScroll {
  private static instance: SmoothScroll
  private isScrolling = false
  private targetY = 0
  private currentY = 0
  private animationId: number | null = null

  static getInstance(): SmoothScroll {
    if (!SmoothScroll.instance) {
      SmoothScroll.instance = new SmoothScroll()
    }
    return SmoothScroll.instance
  }

  scrollTo(target: number, duration: number = 600): void { // Reduced duration for snappier feel
    if (this.isScrolling) {
      cancelAnimationFrame(this.animationId!)
    }

    this.targetY = target
    this.currentY = window.scrollY
    this.isScrolling = true

    const startTime = performance.now()
    const startY = this.currentY
    const distance = this.targetY - startY

    // Enhanced easing function for ultra-smooth animation
    const easeOutQuart = (t: number): number => {
      return 1 - Math.pow(1 - t, 4)
    }

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutQuart(progress)

      const newY = startY + distance * easedProgress
      
      // Use scrollTo with behavior: 'instant' for better performance
      window.scrollTo({
        top: newY,
        behavior: 'instant' as ScrollBehavior
      })

      if (progress < 1) {
        this.animationId = requestAnimationFrame(animate)
      } else {
        this.isScrolling = false
        this.animationId = null
      }
    }

    this.animationId = requestAnimationFrame(animate)
  }

  scrollToElement(element: HTMLElement, duration: number = 600, offset: number = 0): void {
    const rect = element.getBoundingClientRect()
    const targetY = window.scrollY + rect.top + offset
    this.scrollTo(targetY, duration)
  }

  scrollToId(id: string, duration: number = 600, offset: number = 0): void {
    const element = document.getElementById(id)
    if (element) {
      this.scrollToElement(element, duration, offset)
    }
  }

  stop(): void {
    if (this.isScrolling && this.animationId) {
      cancelAnimationFrame(this.animationId)
      this.isScrolling = false
      this.animationId = null
    }
  }

  isCurrentlyScrolling(): boolean {
    return this.isScrolling
  }
}

// Utility functions
export const smoothScrollTo = (target: number, duration?: number): void => {
  SmoothScroll.getInstance().scrollTo(target, duration)
}

export const smoothScrollToElement = (element: HTMLElement, duration?: number, offset?: number): void => {
  SmoothScroll.getInstance().scrollToElement(element, duration, offset)
}

export const smoothScrollToId = (id: string, duration?: number, offset?: number): void => {
  SmoothScroll.getInstance().scrollToId(id, duration, offset)
}

export const stopSmoothScroll = (): void => {
  SmoothScroll.getInstance().stop()
}

// Enhanced scroll performance utilities
export class ScrollPerformanceOptimizer {
  private static instance: ScrollPerformanceOptimizer
  private scrollListeners: Map<string, () => void> = new Map()
  private isThrottled = false
  private lastScrollTime = 0
  private readonly throttleDelay = 8 // 120fps equivalent for ultra-smooth scrolling

  static getInstance(): ScrollPerformanceOptimizer {
    if (!ScrollPerformanceOptimizer.instance) {
      ScrollPerformanceOptimizer.instance = new ScrollPerformanceOptimizer()
    }
    return ScrollPerformanceOptimizer.instance
  }

  addScrollListener(id: string, callback: () => void): void {
    this.scrollListeners.set(id, callback)
  }

  removeScrollListener(id: string): void {
    this.scrollListeners.delete(id)
  }

  private throttledScrollHandler = (): void => {
    if (this.isThrottled) return

    this.isThrottled = true
    this.lastScrollTime = performance.now()

    requestAnimationFrame(() => {
      this.scrollListeners.forEach(callback => callback())
      this.isThrottled = false
    })
  }

  startListening(): void {
    window.addEventListener('scroll', this.throttledScrollHandler, { passive: true })
  }

  stopListening(): void {
    window.removeEventListener('scroll', this.throttledScrollHandler)
  }

  // Optimize scroll performance for specific elements
  optimizeElementScroll(element: HTMLElement): void {
    element.style.willChange = 'transform'
    element.style.backfaceVisibility = 'hidden'
    element.style.perspective = '1000px'
  }

  deoptimizeElementScroll(element: HTMLElement): void {
    element.style.willChange = 'auto'
    element.style.backfaceVisibility = 'visible'
    element.style.perspective = 'none'
  }
}

// Export singleton instances
export const smoothScroll = SmoothScroll.getInstance()
export const scrollOptimizer = ScrollPerformanceOptimizer.getInstance()

// Initialize scroll optimizer
if (typeof window !== 'undefined') {
  scrollOptimizer.startListening()
}
