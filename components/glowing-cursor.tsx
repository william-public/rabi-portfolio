"use client"
import { useEffect, useRef, useState } from "react"

export function GlowingCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const target = document.querySelector(".glowing-cursor-target")
    if (!target) return

    const handleMouseMove = (e: Event) => {
      if (!cursorRef.current) return
      const mouseEvent = e as MouseEvent
      // Position relative to the page (viewport)
      cursorRef.current.style.left = `${mouseEvent.clientX - 24}px`
      cursorRef.current.style.top = `${mouseEvent.clientY - 24}px`
    }
    const handleEnter = () => setIsActive(true)
    const handleLeave = () => setIsActive(false)

    target.addEventListener("mousemove", handleMouseMove)
    target.addEventListener("mouseenter", handleEnter)
    target.addEventListener("mouseleave", handleLeave)

    return () => {
      target.removeEventListener("mousemove", handleMouseMove)
      target.removeEventListener("mouseenter", handleEnter)
      target.removeEventListener("mouseleave", handleLeave)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed z-50 transition-opacity duration-300 ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
      style={{
        left: 0,
        top: 0,
        width: 48,
        height: 48,
        filter: "blur(8px)",
        willChange: "transform",
        pointerEvents: "none",
      }}
    >
      <div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-primary via-blue-500 to-cyan-500 opacity-60 animate-pulse"
        style={{
          boxShadow: "0 0 32px 8px #0ea5e9, 0 0 64px 16px #0284c7",
        }}
      ></div>
    </div>
  )
}
