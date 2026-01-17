"use client"

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export const MouseScrollIndicator = ({ text = "SCROLL", className = "" }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <a href="#about" className={`block ${className}`} aria-label="Scroll down">
      <div className="flex flex-col items-center">
        <motion.div 
          className="relative w-[24px] h-[40px] rounded-full border-[1.5px] border-primary/80 overflow-hidden shadow-[0_0_15px_rgba(var(--primary),0.3)]"
          initial={{ opacity: 0 }}
          animate={{
            y: [0, 8, 0],
            opacity: 1,
            boxShadow: [
              '0 0 15px rgba(147, 51, 234, 0.2)',
              '0 0 20px rgba(147, 51, 234, 0.4)',
              '0 0 15px rgba(147, 51, 234, 0.2)'
            ]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.05 }}
        >
          {/* Mouse body */}
          <div className="absolute inset-[2px] bg-background rounded-full" />
          
          {/* Mouse wheel/ball */}
          <motion.div
            className="absolute w-[6px] h-[6px] bg-primary rounded-full left-1/2 -translate-x-1/2"
            animate={{
              y: [20, 35, 20, 20, 35, 20, 20, 35, 20],
              opacity: [1, 0, 0, 1, 0, 0, 1, 0, 1],
              scale: [1, 0.4, 0.4, 1, 0.4, 0.4, 1, 0.4, 1]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.14, 0.19, 0.3, 0.44, 0.49, 0.6, 0.74, 1]
            }}
          />
        </motion.div>
        
        <motion.p 
          className="mt-2 font-medium tracking-[3px] text-primary/90 text-[10px] uppercase"
          animate={{
            y: [0, 2, 0, 0, 2, 0, 0, 2, 0],
            opacity: [0.9, 0.4, 0.9, 0.9, 0.4, 0.9, 0.9, 0.4, 0.9]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.2, 0.3, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
          }}
        >
          {text}
        </motion.p>
      </div>
    </a>
  )
}
