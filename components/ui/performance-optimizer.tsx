"use client"

import { useEffect, useState } from 'react'
import { usePerformanceOptimization } from '@/hooks/use-performance-optimization'

interface PerformanceOptimizerProps {
  enabled?: boolean
  showMetrics?: boolean
}

export function PerformanceOptimizer({ 
  enabled = false, 
  showMetrics = false 
}: PerformanceOptimizerProps) {
  const { getPerformanceMetrics, performanceConfig } = usePerformanceOptimization()
  const [metrics, setMetrics] = useState(getPerformanceMetrics())
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!enabled) return

    const updateMetrics = () => {
      setMetrics(getPerformanceMetrics())
    }

    const interval = setInterval(updateMetrics, 1000)
    
    return () => clearInterval(interval)
  }, [enabled, getPerformanceMetrics])

  // Toggle visibility with Ctrl+Shift+P
  useEffect(() => {
    if (!enabled) return

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault()
        setIsVisible(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [enabled])

  if (!enabled || !isVisible) return null

  return (
    <div className="performance-monitor">
      <div style={{ fontFamily: 'monospace', fontSize: '11px' }}>
        <div>FPS: {metrics.fps}</div>
        <div>Particles: {performanceConfig.particleCount}</div>
        <div>Quality: {performanceConfig.enableParticles ? 'High' : 'Low'}</div>
        {metrics.averageRenderTime > 0 && (
          <div>Render: {metrics.averageRenderTime.toFixed(1)}ms</div>
        )}
        <div style={{ fontSize: '10px', opacity: 0.7 }}>
          Ctrl+Shift+P to toggle
        </div>
      </div>
    </div>
  )
}

// Performance optimization wrapper component
export function PerformanceWrapper({ 
  children, 
  optimize = true 
}: { 
  children: React.ReactNode
  optimize?: boolean 
}) {
  if (!optimize) return <>{children}</>

  return (
    <div className="performance-optimized">
      {children}
    </div>
  )
}

// Lazy loading wrapper for heavy components
export function LazyLoadWrapper({ 
  children, 
  threshold = 0.1 
}: { 
  children: React.ReactNode
  threshold?: number 
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [ref, setRef] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(ref)
    return () => observer.disconnect()
  }, [ref, threshold])

  return (
    <div ref={setRef} className="lazy-load-wrapper">
      {isVisible ? children : (
        <div className="lazy-load-placeholder">
          <div className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg h-32"></div>
        </div>
      )}
    </div>
  )
}

// Performance optimization hook for components
export function usePerformanceOptimizer() {
  const { optimizeElement, deoptimizeElement, batchUpdates } = usePerformanceOptimization()

  const optimizeComponent = (element: HTMLElement | null) => {
    if (element) {
      optimizeElement(element)
    }
  }

  const deoptimizeComponent = (element: HTMLElement | null) => {
    if (element) {
      deoptimizeElement(element)
    }
  }

  return {
    optimizeComponent,
    deoptimizeComponent,
    batchUpdates
  }
}
