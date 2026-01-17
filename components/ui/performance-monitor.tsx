"use client"

import { useEffect, useState, useRef } from 'react'
import { usePerformanceOptimization } from '@/hooks/use-performance-optimization'

interface PerformanceMetrics {
  fps: number
  averageRenderTime: number
  isLowPerformance: boolean
  memoryUsage?: number
  cpuUsage?: number
}

export function PerformanceMonitor({ 
  enabled = false, 
  showMetrics = false 
}: { 
  enabled?: boolean
  showMetrics?: boolean 
}) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    averageRenderTime: 0,
    isLowPerformance: false
  })
  
  const { getPerformanceMetrics } = usePerformanceOptimization()
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (!enabled || !showMetrics) return

    const updateMetrics = () => {
      const currentMetrics = getPerformanceMetrics()
      setMetrics(currentMetrics)
    }

    // Update metrics every 2 seconds to reduce overhead
    intervalRef.current = setInterval(updateMetrics, 2000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [enabled, showMetrics, getPerformanceMetrics])

  if (!enabled || !showMetrics) return null

  const getPerformanceColor = (fps: number) => {
    if (fps >= 55) return 'text-green-400'
    if (fps >= 45) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getPerformanceStatus = (fps: number) => {
    if (fps >= 55) return 'Excellent'
    if (fps >= 45) return 'Good'
    if (fps >= 30) return 'Fair'
    return 'Poor'
  }

  return (
    <div className="performance-monitor fixed top-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-50 pointer-events-none">
      <div className="space-y-1">
        <div className={`flex items-center gap-2 ${getPerformanceColor(metrics.fps)}`}>
          <div className="w-2 h-2 rounded-full bg-current"></div>
          <span>FPS: {metrics.fps}</span>
          <span className="text-gray-400">({getPerformanceStatus(metrics.fps)})</span>
        </div>
        <div className="text-gray-300">
          Render: {metrics.averageRenderTime.toFixed(1)}ms
        </div>
        {metrics.isLowPerformance && (
          <div className="text-yellow-400 text-xs">
            Performance mode: Low
          </div>
        )}
      </div>
    </div>
  )
}
