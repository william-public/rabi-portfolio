"use client"

import { useEffect, useRef, useCallback } from 'react'
import { useTheme } from 'next-themes'
import { usePerformanceOptimization } from '@/hooks/use-performance-optimization'
import { PERFORMANCE_CONFIG } from '@/lib/performance-utils'

interface Particle {
  x: number
  y: number
  radius: number
  color: string
  speedX: number
  speedY: number
  opacity: number
  life: number
  maxLife: number
}

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const { theme } = useTheme()
  const { performanceConfig } = usePerformanceOptimization()
  
  const particlesRef = useRef<Particle[]>([])
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const canvasSizeRef = useRef({ width: 0, height: 0 })

  // Initialize particles with performance-based settings
  const initializeParticles = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const { width, height } = canvasSizeRef.current
    const isDark = theme === 'dark'
    const particleCount = performanceConfig.particleCount
    
    particlesRef.current = []
    
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5, // Smaller particles
        color: isDark ? 
          `rgba(255, 255, 255, ${Math.random() * 0.15 + 0.05})` : 
          `rgba(0, 0, 0, ${Math.random() * 0.08 + 0.03})`,
        speedX: (Math.random() - 0.5) * 0.3, // Reduced speed
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.3,
        life: Math.random() * 100,
        maxLife: 100 + Math.random() * 50
      })
    }
  }, [theme, performanceConfig.particleCount])

  // Optimized resize handler
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current
      if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    
    canvasSizeRef.current = {
      width: rect.width * dpr,
      height: rect.height * dpr
    }
    
    canvas.width = canvasSizeRef.current.width
    canvas.height = canvasSizeRef.current.height
    
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.scale(dpr, dpr)
      ctxRef.current = ctx
    }
    
    // Reinitialize particles after resize
    initializeParticles()
  }, [initializeParticles])

  // Optimized particle update
  const updateParticles = useCallback(() => {
    const particles = particlesRef.current
    const { width, height } = canvasSizeRef.current
    
    for (const particle of particles) {
      // Update position
      particle.x += particle.speedX
      particle.y += particle.speedY
      
      // Update life
      particle.life += 0.5
      if (particle.life > particle.maxLife) {
        particle.life = 0
        particle.x = Math.random() * width
        particle.y = Math.random() * height
      }
      
      // Bounce off edges
      if (particle.x < 0 || particle.x > width) {
        particle.speedX *= -0.8
        particle.x = Math.max(0, Math.min(width, particle.x))
      }
      if (particle.y < 0 || particle.y > height) {
        particle.speedY *= -0.8
        particle.y = Math.max(0, Math.min(height, particle.y))
      }
      
      // Update opacity based on life
      const lifeRatio = particle.life / particle.maxLife
      particle.opacity = 0.3 + (0.4 * Math.sin(lifeRatio * Math.PI))
    }
  }, [])

  // Ultra-optimized drawing for maximum performance
  const drawParticles = useCallback(() => {
    const ctx = ctxRef.current
    if (!ctx) return

    const particles = particlesRef.current
    const { width, height } = canvasSizeRef.current
    
    // Clear canvas efficiently
    ctx.clearRect(0, 0, width, height)
    
    // Draw particles with minimal overhead
    for (const particle of particles) {
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${particle.opacity})`)
      ctx.fill()
    }
    
    // Draw connections only if performance is good
    if (performanceConfig.enableParticles && performanceConfig.particleCount > 10) {
      const connectionDistance = performanceConfig.connectionDistance
      const maxConnections = Math.min(particles.length, 20) // Severely limited connections
      let connectionCount = 0
      
      // Ultra-optimized distance calculation
      for (let i = 0; i < particles.length && connectionCount < maxConnections; i++) {
        for (let j = i + 1; j < particles.length && connectionCount < maxConnections; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distanceSquared = dx * dx + dy * dy
          
          // Use squared distance only
          if (distanceSquared < connectionDistance * connectionDistance) {
            const opacity = (1 - Math.sqrt(distanceSquared) / connectionDistance) * 0.05 // Very low opacity
            ctx.beginPath()
            ctx.strokeStyle = theme === 'dark' ? 
              `rgba(255, 255, 255, ${opacity})` : 
              `rgba(0, 0, 0, ${opacity * 0.3})`
            ctx.lineWidth = 0.2 // Very thin lines
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            connectionCount++
          }
        }
      }
    }
  }, [performanceConfig, theme])

  // Ultra-optimized animation loop
  const animate = useCallback(() => {
    if (!performanceConfig.enableParticles) return
    
    updateParticles()
    drawParticles()
    
    // Use requestAnimationFrame with reduced frequency
    animationRef.current = requestAnimationFrame(animate)
  }, [updateParticles, drawParticles, performanceConfig.enableParticles])

  // Initialize canvas and particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctxRef.current = ctx
    
    // Set initial size
    const rect = canvas.getBoundingClientRect()
    canvasSizeRef.current = {
      width: rect.width,
      height: rect.height
    }
    
    canvas.width = rect.width
    canvas.height = rect.height
    
    // Initialize particles
    initializeParticles()
    
    // Start animation
    if (performanceConfig.enableParticles) {
      animate()
    }
    
    // Add resize listener
    window.addEventListener('resize', handleResize, { passive: true })
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [initializeParticles, animate, handleResize, performanceConfig.enableParticles])

  // Update particles when theme changes
  useEffect(() => {
    initializeParticles()
  }, [theme, initializeParticles])

  // Update animation when performance config changes
  useEffect(() => {
    if (performanceConfig.enableParticles) {
      if (!animationRef.current) {
        animate()
      }
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = undefined
      }
    }
  }, [performanceConfig.enableParticles, animate])

  // Don't render if particles are disabled
  if (!performanceConfig.enableParticles) {
    return null
  }

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 hero-particles" 
      style={{ 
        opacity: 0.3, // Very low opacity for maximum performance
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        perspective: '1000px',
        contain: 'layout paint',
        isolation: 'isolate'
      }} 
    />
  )
}
