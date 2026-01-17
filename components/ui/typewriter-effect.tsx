"use client"

import { cn } from "@/lib/utils"
import { motion, useAnimate, useInView } from "framer-motion"
import { useEffect, useState, useCallback } from "react"
import { usePerformanceOptimization } from "@/hooks/use-performance-optimization"

type TypewriterProps = {
  words: {
    text: string
    className?: string
  }[]
  className?: string
  cursorClassName?: string
}

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: TypewriterProps) => {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [phase, setPhase] = useState<'typing' | 'deleting'>('typing')
  const { getAnimationSettings } = usePerformanceOptimization()
  const animationSettings = getAnimationSettings()
  
  // Optimized timing based on performance
  const getTiming = useCallback(() => {
    const baseDelay = animationSettings.duration * 1000 // Convert to ms
    return {
      typing: Math.max(100, baseDelay * 0.25), // Minimum 100ms
      deleting: Math.max(80, baseDelay * 0.2),  // Minimum 80ms
      pause: 2000 // Fixed pause time
    }
  }, [animationSettings.duration])

  useEffect(() => {
    if (!isInView) return;
    
    const timing = getTiming()
    let timeout: NodeJS.Timeout;
    
    if (phase === 'typing') {
      if (displayText === words[currentIndex].text) {
        // Wait before starting to delete
        timeout = setTimeout(() => {
          setPhase('deleting');
        }, timing.pause);
      } else {
        // Add next character
        timeout = setTimeout(() => {
          setDisplayText(words[currentIndex].text.substring(0, displayText.length + 1));
        }, timing.typing);
      }
    } else {
      if (displayText === "") {
        // Move to next word
        setPhase('typing');
        setCurrentIndex((currentIndex + 1) % words.length);
      } else {
        // Remove last character
        timeout = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        }, timing.deleting);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [isInView, displayText, currentIndex, phase, words, getTiming]);
  
  return (
    <div className={cn("flex items-center", className)}>
      <div ref={scope} className="inline-block">
        <motion.span 
          className={words[currentIndex].className}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 0.3,
            ease: animationSettings.ease
          }}
          style={{ 
            willChange: 'opacity',
            backfaceVisibility: 'hidden'
          }}
        >
          {displayText}
        </motion.span>
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: animationSettings.ease
        }}
        className={cn(
          "inline-block h-6 w-[2px] bg-primary rounded-full ml-1",
          cursorClassName
        )}
        style={{ 
          willChange: 'opacity',
          backfaceVisibility: 'hidden'
        }}
      ></motion.span>
    </div>
  )
}
