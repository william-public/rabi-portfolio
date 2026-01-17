"use client"

import { useEffect, useRef, useState, useCallback } from 'react'
import { 
  PERFORMANCE_CONFIG, 
  throttle, 
  debounce, 
  rafThrottle,
  smoothRaf,
  performanceMonitor,
  memoryManager,
  devicePerformance,
  animationHelpers,
  domOptimizations
} from '@/lib/performance-utils'

interface PerformanceSettings {
  enableParticles: boolean
  enableSmoothScrolling: boolean
  enableParallax: boolean
  animationQuality: 'low' | 'medium' | 'high'
  particleCount: number
}

export function usePerformanceOptimization() {
  const [settings, setSettings] = useState<PerformanceSettings>(() => {
    // Default settings for SSR
    const defaultSettings = {
      enableParticles: true,
      enableSmoothScrolling: true,
      enableParallax: true,
      animationQuality: 'medium' as const,
      particleCount: Math.floor(PERFORMANCE_CONFIG.PARTICLES.MAX_COUNT * 0.7)
    }
    
    // Only run performance detection on client side
    if (typeof window === 'undefined') {
      return defaultSettings
    }
    
    const tier = devicePerformance.getPerformanceTier()
    
    return {
      enableParticles: tier !== 'low',
      enableSmoothScrolling: true,
      enableParallax: tier !== 'low',
      animationQuality: tier === 'high' ? 'high' : tier === 'medium' ? 'medium' : 'low',
      particleCount: tier === 'high' ? PERFORMANCE_CONFIG.PARTICLES.MAX_COUNT : 
                    tier === 'medium' ? Math.floor(PERFORMANCE_CONFIG.PARTICLES.MAX_COUNT * 0.7) : 
                    Math.floor(PERFORMANCE_CONFIG.PARTICLES.MAX_COUNT * 0.4)
    }
  })

  const [fps, setFps] = useState(60)
  const [isLowPerformance, setIsLowPerformance] = useState(false)
  const performanceId = useRef<string>('')
  const [isClient, setIsClient] = useState(false)

  // Hydration effect
  useEffect(() => {
    setIsClient(true)
    // Generate ID only on client side to avoid hydration mismatch
    performanceId.current = `performance-${Math.random().toString(36).substr(2, 9)}`
  }, [])

  // Monitor performance and adjust settings
  useEffect(() => {
    if (!isClient) return // Only run on client side
    
    performanceMonitor.startFrameRateMonitoring()
    
    const updateFPS = () => {
      const currentFPS = performanceMonitor.getCurrentFPS()
      setFps(currentFPS)
      
      // More aggressive performance adjustments
      if (currentFPS < 45 && !isLowPerformance) {
        setIsLowPerformance(true)
        setSettings(prev => ({
          ...prev,
          enableParticles: false,
          animationQuality: 'low',
          particleCount: 0
        }))
      } else if (currentFPS < 55 && !isLowPerformance) {
        setIsLowPerformance(true)
        setSettings(prev => ({
          ...prev,
          enableParticles: false,
          animationQuality: 'low',
          particleCount: Math.floor(PERFORMANCE_CONFIG.PARTICLES.MAX_COUNT * 0.3)
        }))
      } else if (currentFPS > 55 && isLowPerformance) {
        setIsLowPerformance(false)
        setSettings(prev => ({
          ...prev,
          enableParticles: true,
          animationQuality: 'medium',
          particleCount: Math.floor(PERFORMANCE_CONFIG.PARTICLES.MAX_COUNT * 0.7)
        }))
      }
    }

    const interval = setInterval(updateFPS, 2000) // Check every 2 seconds
    
    return () => {
      clearInterval(interval)
    }
  }, [isLowPerformance, isClient])

  // Register cleanup
  useEffect(() => {
    memoryManager.registerCleanup(performanceId.current, () => {
      // Cleanup performance monitoring
    })

    return () => {
      memoryManager.cleanup(performanceId.current)
    }
  }, [])

  // Ultra-smooth scroll handler with priority
  const optimizedScrollHandler = useCallback(
    smoothRaf((callback: (scrollY: number) => void) => {
      const scrollY = window.scrollY
      callback(scrollY)
    }, 'high'),
    []
  )

  // Optimized resize handler
  const optimizedResizeHandler = useCallback(
    debounce((callback: () => void) => {
      callback()
    }, PERFORMANCE_CONFIG.SCROLL.DEBOUNCE_DELAY),
    []
  )

  // Get optimized animation settings
  const getAnimationSettings = useCallback(() => {
    const baseSettings = animationHelpers.getTransition()
    
    switch (settings.animationQuality) {
      case 'low':
        return {
          ...baseSettings,
          duration: baseSettings.duration * 0.8,
          stiffness: PERFORMANCE_CONFIG.ANIMATION.SPRING.stiffness * 0.8,
          damping: PERFORMANCE_CONFIG.ANIMATION.SPRING.damping * 1.2
        }
      case 'high':
        return {
          ...baseSettings,
          duration: baseSettings.duration * 1.2,
          stiffness: PERFORMANCE_CONFIG.ANIMATION.SPRING.stiffness * 1.2,
          damping: PERFORMANCE_CONFIG.ANIMATION.SPRING.damping * 0.8
        }
      default:
        return baseSettings
    }
  }, [settings.animationQuality])

  // Optimize element performance with enhanced settings
  const optimizeElement = useCallback((element: HTMLElement | null) => {
    if (!element) return
    domOptimizations.optimizeForAnimation(element)
  }, [])

  // Deoptimize element performance
  const deoptimizeElement = useCallback((element: HTMLElement | null) => {
    if (!element) return
    domOptimizations.deoptimizeElement(element)
  }, [])

  // Batch DOM updates with priority
  const batchUpdates = useCallback((updates: (() => void)[], priority: 'high' | 'normal' | 'low' = 'normal') => {
    domOptimizations.batchUpdates(updates, priority)
  }, [])

  // Performance measurement
  const measurePerformance = useCallback((name: string, fn: () => void) => {
    performanceMonitor.startMeasure(name)
    fn()
    performanceMonitor.endMeasure(name)
  }, [])

  // Get performance metrics
  const getPerformanceMetrics = useCallback(() => ({
    fps,
    averageRenderTime: performanceMonitor.getAverageTime('render'),
    isLowPerformance,
    settings
  }), [fps, isLowPerformance, settings])

  return {
    settings,
    setSettings,
    fps,
    isLowPerformance,
    optimizedScrollHandler,
    optimizedResizeHandler,
    getAnimationSettings,
    optimizeElement,
    deoptimizeElement,
    batchUpdates,
    measurePerformance,
    getPerformanceMetrics,
    // Performance config for components
    performanceConfig: {
      particleCount: settings.particleCount,
      connectionDistance: PERFORMANCE_CONFIG.PARTICLES.CONNECTION_DISTANCE,
      updateInterval: PERFORMANCE_CONFIG.PARTICLES.UPDATE_INTERVAL,
      enableParticles: settings.enableParticles,
      enableSmoothScrolling: settings.enableSmoothScrolling,
      enableParallax: settings.enableParallax
    }
  }
}

// Hook for optimizing scroll performance
export function useOptimizedScroll(callback: (scrollY: number) => void) {
  const { optimizedScrollHandler } = usePerformanceOptimization()
  
  useEffect(() => {
    const handleScroll = () => {
      optimizedScrollHandler(callback)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [callback, optimizedScrollHandler])
}

// Hook for optimizing resize performance
export function useOptimizedResize(callback: () => void) {
  const { optimizedResizeHandler } = usePerformanceOptimization()
  
  useEffect(() => {
    const handleResize = () => {
      optimizedResizeHandler(callback)
    }

    window.addEventListener('resize', handleResize, { passive: true })
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [callback, optimizedResizeHandler])
}

// Hook for intersection observer optimization
export function useOptimizedIntersectionObserver(
  callback: (isIntersecting: boolean) => void,
  options?: IntersectionObserverInit
) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const intersecting = entry.isIntersecting
        setIsIntersecting(intersecting)
        callback(intersecting)
      },
      {
        threshold: PERFORMANCE_CONFIG.INTERSECTION.THRESHOLD,
        rootMargin: PERFORMANCE_CONFIG.INTERSECTION.ROOT_MARGIN,
        ...options
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [callback, options])

  return { elementRef, isIntersecting }
}
