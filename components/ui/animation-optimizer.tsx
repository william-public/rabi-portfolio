"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimationOptimizerProps {
  children: React.ReactNode
  className?: string
  optimizeLevel?: "low" | "medium" | "high"
  as?: React.ElementType
}

// This component wraps children with optimization attributes
export function AnimationOptimizer({
  children,
  className,
  optimizeLevel = "medium",
  as = motion.div
}: AnimationOptimizerProps) {
  const Component = as
  
  // Base styles for all optimization levels
  const baseStyles = "optimize-animation"
  
  // Additional styles based on optimization level
  const levelStyles = {
    low: "",
    medium: "will-change-transform",
    high: "will-change-transform will-change-opacity"
  }
  
  return (
    <Component
      className={cn(baseStyles, levelStyles[optimizeLevel], className)}
      style={{ 
        backfaceVisibility: "hidden", 
        perspective: 1000, 
        transform: "translateZ(0)"
      }}
    >
      {children}
    </Component>
  )
}

// This hook returns optimized transition properties
export function useAnimationOptimizer(smoothness: "default" | "smooth" | "bounce" = "default") {
  const easings = {
    default: [0.6, 0.01, -0.05, 0.95],
    smooth: [0.65, 0, 0.35, 1],
    bounce: [0.68, -0.55, 0.27, 1.55]
  }
  
  return {
    transition: {
      ease: easings[smoothness],
      duration: 0.6
    },
    layoutTransition: {
      type: "spring",
      stiffness: 200,
      damping: 25
    }
  }
}

// Higher order component to optimize animations
export function withAnimationOptimizer<P extends React.JSX.IntrinsicAttributes>(Component: React.ComponentType<P>) {
  return (props: P & { optimizeAnimation?: boolean }) => {
    const { optimizeAnimation = true, ...rest } = props
    
    if (!optimizeAnimation) {
      return <Component {...rest as P} />
    }
    
    return (
      <AnimationOptimizer>
        <Component {...rest as P} />
      </AnimationOptimizer>
    )
  }
}
