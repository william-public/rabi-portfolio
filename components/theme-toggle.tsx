"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useModeAnimation, ThemeAnimationType } from "react-theme-switch-animation"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Configure the theme animation
  const { ref: animationRef, toggleSwitchTheme, isDarkMode } = useModeAnimation({
    duration: 700,
    easing: "ease-in-out",
    animationType: ThemeAnimationType.BLUR_CIRCLE,
    blurAmount: 2,
    isDarkMode: theme === "dark",
    onDarkModeChange: (isDark) => {
      setTheme(isDark ? "dark" : "light")
    }
  })

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeSwitch = async () => {
    await toggleSwitchTheme()
  }

  if (!mounted) {
    return null
  }

  return (
    <Button
      ref={animationRef}
      variant="ghost"
      size="icon"
      onClick={handleThemeSwitch}
      className="rounded-full w-10 h-10 transition-all duration-200 hover:scale-110"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? 
        <Sun className="h-5 w-5 text-yellow-300 transition-all duration-200" /> : 
        <Moon className="h-5 w-5 text-slate-700 transition-all duration-200" />
      }
    </Button>
  )
}

