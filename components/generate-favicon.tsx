"use client"

import { useEffect, useRef } from 'react'

export default function GenerateFavicon() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas size (32x32 is common for favicons)
    canvas.width = 32
    canvas.height = 32
    
    // Draw background - matching the gradient of the navbar logo
    const gradient = ctx.createLinearGradient(0, 0, 32, 32)
    gradient.addColorStop(0, 'rgb(139, 92, 246)') // Primary color
    gradient.addColorStop(1, 'rgba(139, 92, 246, 0.7)') // Lighter version
    
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(16, 16, 16, 0, Math.PI * 2)
    ctx.fill()
    
    // Draw the "T" in white
    ctx.fillStyle = 'white'
    ctx.font = 'bold 22px Poppins, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('T', 16, 15)
    
    // Convert to blob and download (only during development)
    if (process.env.NODE_ENV === 'development') {
      canvas.toBlob((blob) => {
        if (blob) {
          const link = document.createElement('a')
          link.download = 'favicon.png'
          link.href = URL.createObjectURL(blob)
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
      })
    }
  }, [])
  
  return <canvas ref={canvasRef} style={{ display: 'none' }} />
}
