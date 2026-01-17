"use client"

import { useEffect, useRef } from 'react'

export default function BetterFaviconGenerator() {
  const svgRef = useRef<SVGSVGElement>(null)
  
  useEffect(() => {
    // Function to download the SVG as PNG
    const downloadSVGAsPNG = () => {
      if (!svgRef.current) return
      
      const svg = svgRef.current
      const serializer = new XMLSerializer()
      let source = serializer.serializeToString(svg)
      
      // Add namespaces
      if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"')
      }
      
      source = '<?xml version="1.0" standalone="no"?>\r\n' + source
      
      // Convert SVG to a data URL
      const svgBlob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' })
      const url = URL.createObjectURL(svgBlob)
      
      // Create a canvas to convert SVG to PNG with larger dimensions
      const canvas = document.createElement('canvas')
      canvas.width = 192 // Much larger size for better quality and visibility
      canvas.height = 192
      
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      
      const img = new Image()
      
      img.onload = () => {
        ctx.drawImage(img, 0, 0, 192, 192)
        URL.revokeObjectURL(url)
        
        // Create higher quality PNG
        canvas.toBlob((blob) => {
          if (!blob) return
          
          const pngUrl = URL.createObjectURL(blob)
          
          const downloadLink = document.createElement('a')
          downloadLink.href = pngUrl
          downloadLink.download = 'favicon-192x192.png'
          downloadLink.innerHTML = 'Download High Resolution Favicon'
          downloadLink.style.margin = '15px'
          downloadLink.style.padding = '10px'
          downloadLink.style.background = '#4f46e5'
          downloadLink.style.color = 'white'
          downloadLink.style.borderRadius = '5px'
          downloadLink.style.textDecoration = 'none'
          
          const container = document.getElementById('download-container')
          if (container) {
            container.innerHTML = ''
            container.appendChild(downloadLink)
          }
        }, 'image/png', 1.0) // Use maximum quality
      }
      
      img.src = url
    }
    
    // Add download button
    const downloadBtn = document.createElement('button')
    downloadBtn.innerHTML = 'Generate Favicon'
    downloadBtn.style.margin = '15px'
    downloadBtn.style.padding = '10px'
    downloadBtn.style.background = '#8b5cf6'
    downloadBtn.style.color = 'white'
    downloadBtn.style.border = 'none'
    downloadBtn.style.borderRadius = '5px'
    downloadBtn.style.cursor = 'pointer'
    
    downloadBtn.addEventListener('click', downloadSVGAsPNG)
    
    const buttonContainer = document.getElementById('button-container')
    if (buttonContainer) {
      buttonContainer.appendChild(downloadBtn)
    }
    
    return () => {
      downloadBtn.removeEventListener('click', downloadSVGAsPNG)
    }
  }, [])
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Favicon Generator</h1>
      
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px', background: '#f9f9f9' }}>
        <svg 
          ref={svgRef}
          width="200" 
          height="200" 
          viewBox="0 0 100 100" 
          style={{ display: 'block' }}
        >
          {/* Background for visibility during editing */}
          <rect width="100" height="100" fill="transparent" />
          
          {/* Center the elements */}
          <g transform="translate(50 50)">
            {/* Rotated rounded square - made larger for better visibility */}
            <rect 
              x="-35" 
              y="-35" 
              width="70" 
              height="70" 
              rx="10" 
              fill="rgb(139, 92, 246)" 
              fillOpacity="0.9"
              transform="rotate(45)" 
            />
            
            {/* The T letter - enlarged for better visibility */}
            <text 
              x="0" 
              y="18" 
              fontFamily="Arial, sans-serif" 
              fontSize="60" 
              fontWeight="bold" 
              fill="white" 
              textAnchor="middle" 
              dominantBaseline="middle"
            >
              T
            </text>
          </g>
        </svg>
      </div>
      
      <div id="button-container" style={{ marginTop: '20px' }}></div>
      <div id="download-container" style={{ marginTop: '10px' }}></div>
      
      <div style={{ marginTop: '30px', maxWidth: '500px', textAlign: 'center' }}>
        <h2>Instructions:</h2>
        <ol style={{ textAlign: 'left' }}>
          <li>Click "Generate Favicon" to create a high-resolution PNG (192×192px)</li>
          <li>Download the generated PNG</li>
          <li>Place it in your project's public folder as favicon.png</li>
          <li>Update your layout.tsx to include multiple sizes:</li>
        </ol>
        
        <div style={{ background: '#f0f0f0', padding: '15px', borderRadius: '5px', marginTop: '15px', textAlign: 'left' }}>
          <pre style={{ margin: 0, overflow: 'auto' }}>
{`export const metadata = {
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  }
}`}</pre>
        </div>
      </div>
    </div>
  )
}
