"use client"

import { useEffect, useState } from 'react'

export function PerformanceTest() {
  const [fps, setFps] = useState(60)
  const [frameTime, setFrameTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let frameCount = 0
    let lastTime = performance.now()
    let isActive = true

    const measurePerformance = () => {
      if (!isActive) return

      frameCount++
      const currentTime = performance.now()
      
      if (currentTime - lastTime >= 1000) {
        const currentFps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        const currentFrameTime = (currentTime - lastTime) / frameCount
        
        setFps(currentFps)
        setFrameTime(currentFrameTime)
        
        frameCount = 0
        lastTime = currentTime
      }
      
      requestAnimationFrame(measurePerformance)
    }

    setIsRunning(true)
    requestAnimationFrame(measurePerformance)

    return () => {
      isActive = false
      setIsRunning(false)
    }
  }, [])

  const getPerformanceStatus = (fps: number) => {
    if (fps >= 55) return { status: 'Excellent', color: 'text-green-400' }
    if (fps >= 45) return { status: 'Good', color: 'text-yellow-400' }
    if (fps >= 30) return { status: 'Fair', color: 'text-orange-400' }
    return { status: 'Poor', color: 'text-red-400' }
  }

  const { status, color } = getPerformanceStatus(fps)

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-50">
      <div className="space-y-1">
        <div className={`flex items-center gap-2 ${color}`}>
          <div className="w-2 h-2 rounded-full bg-current"></div>
          <span>FPS: {fps}</span>
          <span className="text-gray-400">({status})</span>
        </div>
        <div className="text-gray-300">
          Frame: {frameTime.toFixed(1)}ms
        </div>
        <div className="text-gray-400 text-xs">
          Status: {isRunning ? 'Monitoring' : 'Stopped'}
        </div>
      </div>
    </div>
  )
}
