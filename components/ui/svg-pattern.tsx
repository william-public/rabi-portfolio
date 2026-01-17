"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function SVGPattern() {
  const [pathData, setPathData] = useState<{ d: string, duration: number, delay: number }[]>([])
  
  useEffect(() => {
    // Generate random paths for the background pattern
    const generateRandomPaths = () => {
      const paths = []
      for (let i = 0; i < 8; i++) {
        const startX = Math.random() * 100
        const startY = Math.random() * 100
        const endX = Math.random() * 100
        const endY = Math.random() * 100
        const controlX1 = Math.random() * 100
        const controlY1 = Math.random() * 100
        const controlX2 = Math.random() * 100
        const controlY2 = Math.random() * 100
        
        paths.push({
          d: `M${startX},${startY} C${controlX1},${controlY1} ${controlX2},${controlY2} ${endX},${endY}`,
          duration: 15 + Math.random() * 20,
          delay: Math.random() * 5
        })
      }
      setPathData(paths)
    }
    
    generateRandomPaths()
  }, [])
  
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--secondary-color)" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      
      {pathData.map((path, index) => (
        <motion.path
          key={index}
          d={path.d}
          stroke="url(#gradient)"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 0],
            opacity: [0, 0.4, 0]
          }}
          transition={{ 
            duration: path.duration,
            delay: path.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </svg>
  )
}
