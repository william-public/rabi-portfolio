"use client"

import { useEffect, useRef } from 'react'

export default function FaviconGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Work with a larger canvas for better quality and scale down later
    canvas.width = 256
    canvas.height = 256
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Save context state
    ctx.save()
    
    // Translate to center and rotate 45 degrees
    ctx.translate(16, 16)
    ctx.rotate(Math.PI / 4) // 45 degrees in radians
    
    // Draw the rotated square (primary color with 80% opacity)
    ctx.fillStyle = 'rgba(14, 165, 233, 0.8)' // Using blue theme
    ctx.roundRect(-11, -11, 22, 22, 3) // Rounded square
    ctx.fill()
    
    // Restore to add the text without rotation
    ctx.restore()
    
    // Add the T
    ctx.fillStyle = 'white'
    ctx.font = 'bold 18px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('T', 16, 16)
    
    // Convert to data URL
    const dataUrl = canvas.toDataURL('image/png')
    
    // Create a download link
    const link = document.createElement('a')
    link.download = 'favicon.png'
    link.href = dataUrl
    link.textContent = 'Download Favicon'
    link.style.display = 'block'
    link.style.marginTop = '10px'
    
    // Add link to document
    canvas.parentElement?.appendChild(link)
    
  }, [])
  
  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Favicon Generator</h2>
      <p>Click the link below to download your favicon</p>
      <canvas ref={canvasRef} style={{ border: '1px solid #ccc', width: '64px', height: '64px' }} />
    </div>
  )
}
