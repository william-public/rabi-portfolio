"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mouse } from "lucide-react"

export function GlobalScrollIndicator() {
  const [scroll, setScroll] = useState(0)
  const [visible, setVisible] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const onScroll = () => {
      const h = document.documentElement
      const body = document.body
      const scrollTop = h.scrollTop || body.scrollTop
      const scrollHeight = (h.scrollHeight || body.scrollHeight) - h.clientHeight
      const scrolled = scrollHeight > 0 ? scrollTop / scrollHeight : 0
      setScroll(scrolled)
      setVisible(true)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setVisible(false), 900)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [mounted])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="scroll-indicator"
          className="fixed bottom-8 right-8 z-[999] flex flex-col items-center group select-none pointer-events-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="relative w-14 h-14 pointer-events-auto"
            initial={false}
            animate={{ rotate: 360 * scroll }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
          >
            <svg width={56} height={56} className="absolute inset-0" style={{ filter: "drop-shadow(0 0 8px #a78bfa66)" }}>
              <circle
                cx={28}
                cy={28}
                r={24}
                fill="none"
                stroke="#a78bfa"
                strokeWidth={4}
                strokeDasharray={2 * Math.PI * 24}
                strokeDashoffset={(1 - scroll) * 2 * Math.PI * 24}
                style={{ transition: "stroke-dashoffset 0.3s" }}
                opacity={0.25}
              />
              <motion.circle
                cx={28}
                cy={28}
                r={24}
                fill="none"
                stroke="url(#scroll-gradient)"
                strokeWidth={4}
                strokeDasharray={2 * Math.PI * 24}
                strokeDashoffset={(1 - scroll) * 2 * Math.PI * 24}
                strokeLinecap="round"
                initial={false}
                animate={{ strokeDashoffset: (1 - scroll) * 2 * Math.PI * 24 }}
                transition={{ type: "spring", stiffness: 60, damping: 20 }}
              />
              <defs>
                <linearGradient id="scroll-gradient" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#a78bfa" />
                  <stop offset="1" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Mouse className="h-7 w-7 text-primary animate-bounce" />
            </div>
          </motion.div>
          <span className="mt-2 text-xs font-semibold text-primary/80 bg-background/80 px-2 py-0.5 rounded-full shadow group-hover:scale-110 transition-transform pointer-events-auto">
            {Math.round(scroll * 100)}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
