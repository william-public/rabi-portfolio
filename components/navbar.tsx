"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Moon, Sun, ChevronRight, ExternalLink, Star, Sparkles } from "lucide-react"
import { motion, AnimatePresence, useScroll } from "framer-motion"
import { useTheme } from "next-themes"
import { useModeAnimation, ThemeAnimationType } from "react-theme-switch-animation"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState("#home")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll()
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isHeroSection, setIsHeroSection] = useState(true)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimer = useRef<NodeJS.Timeout | null>(null)
  const prevScrollY = useRef(0)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')

  // Theme animation hook for desktop
  const { ref: themeRef, toggleSwitchTheme } = useModeAnimation({
    duration: 700,
    easing: "ease-in-out",
    animationType: ThemeAnimationType.BLUR_CIRCLE,
    blurAmount: 2,
    isDarkMode: theme === "dark",
    onDarkModeChange: (isDark) => {
      setTheme(isDark ? "dark" : "light")
    }
  })

  // Theme animation hook for mobile
  const { ref: mobileThemeRef, toggleSwitchTheme: toggleMobileTheme } = useModeAnimation({
    duration: 700,
    easing: "ease-in-out", 
    animationType: ThemeAnimationType.BLUR_CIRCLE,
    blurAmount: 2,
    isDarkMode: theme === "dark",
    onDarkModeChange: (isDark) => {
      setTheme(isDark ? "dark" : "light")
    }
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent body scroll when mobile menu is open (more robust)
  useEffect(() => {
    try {
      if (isMobileMenuOpen) {
        document.body.style.overflow = "hidden"
        document.body.style.position = "fixed"
        document.body.style.width = "100%"
      } else {
        document.body.style.overflow = ""
        document.body.style.position = ""
        document.body.style.width = ""
      }
    } catch (error) {
      console.warn('Error managing body scroll:', error);
    }
    
    return () => {
      try {
        document.body.style.overflow = ""
        document.body.style.position = ""
        document.body.style.width = ""
      } catch (error) {
        console.warn('Error resetting body scroll:', error);
      }
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      
      // Determine scroll direction
      const newScrollDirection = position > prevScrollY.current ? 'down' : 'up'
      if (Math.abs(position - prevScrollY.current) > 10) {
        setScrollDirection(newScrollDirection)
      }
      prevScrollY.current = position
      
      setScrollPosition(position)

      // Check if we're in the hero section
      try {
        const heroSection = document.getElementById('home')
        if (heroSection) {
          const heroBottom = heroSection.getBoundingClientRect().bottom
          setIsHeroSection(heroBottom > 0)
        }
      } catch (error) {
        console.warn('Error checking hero section:', error);
      }

      // Set scrolling state to true and reset timer
      setIsScrolling(true)

      // Clear existing timer
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current)
      }

      // Set new timer to hide navbar after scrolling stops
      scrollTimer.current = setTimeout(() => {
        setIsScrolling(false)
      }, 2500) // Increased from 1000ms to 2500ms (2.5 seconds)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current)
      }
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      try {
        const sections = document.querySelectorAll('section[id]')
        sections.forEach(section => {
          const sectionTop = (section as HTMLElement).offsetTop - 100
          const sectionHeight = (section as HTMLElement).offsetHeight
          if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            setActiveLink(`#${section.getAttribute('id')}`)
          }
        })
      } catch (error) {
        console.warn('Error updating active link:', error);
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = async () => {
    await toggleSwitchTheme()
  }

  const toggleMobileThemeHandler = async () => {
    await toggleMobileTheme()
  }

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },

    { href: "#contact", label: "Contact" },
  ]

  const stars = [
    { x: "5%", y: "20%", size: 10, delay: 0 },
    { x: "80%", y: "15%", size: 8, delay: 1.5 },
    { x: "30%", y: "80%", size: 6, delay: 0.8 }
  ]

  // Determine navbar visibility class based on scroll, section, and scroll state
  const navbarVisibilityClass = 
    isHeroSection || (isScrolling && !isHeroSection) || scrollDirection === 'up'
      ? 'nav-visible' 
      : 'nav-hidden'

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-4 left-0 right-0 z-50 w-full transition-transform duration-300 ease-in-out ${navbarVisibilityClass}`}
        suppressHydrationWarning
      >
        <div className="modern-navbar mx-auto max-w-full md:max-w-5xl xl:max-w-6xl" suppressHydrationWarning>
          <div className="nav-container flex items-center justify-between w-full px-4 py-2">
            <Link 
              href="/" 
              className="nav-logo-wrapper flex-shrink-0"
              onClick={() => setActiveLink("#home")}
              aria-label="Home"
              suppressHydrationWarning
            >
              <div className="nav-logo">
                <div className="nav-logo-shine"></div>
                <motion.div
                  className="nav-logo-inner optimize-animation"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.div
                    className="relative z-10 flex items-center justify-center optimize-animation"
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    <span className="nav-logo-text">TB</span>
                    <motion.span 
                      className="absolute nav-logo-sparkle optimize-animation"
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        delay: 1,
                        repeatDelay: 3
                      }}
                    >
                      <Sparkles className="w-3 h-3 text-white" />
                    </motion.span>
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/30 optimize-animation"
                    animate={{ 
                      scale: [0.8, 1.2, 0.8], 
                      opacity: [0.3, 0.5, 0.3] 
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    style={{ filter: "blur(8px)" }}
                  />
                </motion.div>
              </div>
              <div className="nav-logo-text-container">
                <motion.span 
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="nav-brand-text optimize-animation"
                >
                    Tyler Berkson<span className="nav-brand-dot"></span>
                </motion.span>
              </div>
            </Link>
            <nav className="nav-links hidden md:flex flex-1 justify-center" aria-label="Main navigation">
              <div className="nav-links-track flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setActiveLink(link.href)}
                    className={`nav-link ${activeLink === link.href ? 'nav-active' : ''}`}
                    aria-current={activeLink === link.href ? "page" : undefined}
                    suppressHydrationWarning
                  >
                    <div className="nav-link-highlight"></div>
                    <motion.span
                      className="nav-text optimize-animation"
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {link.label}
                    </motion.span>
                    {activeLink === link.href && (
                      <motion.div
                        className="nav-indicator optimize-animation"
                        layoutId="navIndicator"
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                      >
                        <motion.div 
                          className="nav-indicator-glow optimize-animation"
                          animate={{ 
                            opacity: [0.5, 1, 0.5],
                            scale: [0.8, 1.2, 0.8]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <div className="nav-indicator-trail"></div>
                      </motion.div>
                    )}
                  </Link>
                ))}
              </div>
            </nav>
            <div className="nav-actions flex items-center gap-2 flex-shrink-0">
              <motion.button
                ref={themeRef}
                whileHover={{ 
                  scale: 1.1, 
                  backgroundColor: "rgba(147, 51, 234, 0.15)" 
                }}
                whileTap={{ scale: 0.9 }}
                className="nav-theme-toggle optimize-animation"
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                suppressHydrationWarning
              >
                <div className="nav-theme-toggle-rays"></div>
                {mounted && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center optimize-animation"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={theme === "dark" ? "dark" : "light"}
                        initial={{ opacity: 0, y: -10, scale: 0.5 }}
                        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, y: 10, scale: 0.5 }}
                        transition={{ duration: 0.3 }}
                        className="relative optimize-animation"
                      >
                        {theme === "dark" ? (
                          <>
                            <Sun className="h-4 w-4 text-yellow-400" />
                            <motion.div 
                              className="absolute inset-0 bg-yellow-400/20 rounded-full optimize-animation"
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 0.1, 0.3]
                              }}
                              transition={{
                                repeat: Infinity,
                                duration: 2,
                                ease: "easeInOut"
                              }}
                            />
                          </>
                        ) : (
                          <>
                            <Moon className="h-4 w-4 text-primary" />
                            <motion.div 
                              className="absolute top-0 right-0 w-1 h-1 bg-primary/80 rounded-full optimize-animation"
                              animate={{
                                scale: [0.5, 1.5, 0.5],
                                opacity: [0.3, 0.8, 0.3]
                              }}
                              transition={{
                                repeat: Infinity,
                                duration: 2,
                                ease: "easeInOut"
                              }}
                            />
                          </>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                )}
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="nav-resume-wrapper optimize-animation hidden lg:block"
              >
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="nav-resume-btn"
                  asChild
                >
                  <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer" suppressHydrationWarning>
                    <span className="relative z-10">Resume</span>
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        repeatType: "loop", 
                        ease: "easeInOut",
                        repeatDelay: 1 
                      }}
                      className="ml-1.5 relative z-10 optimize-animation"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </motion.div>
                    <span className="nav-resume-shine"></span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/80 to-blue-600/80 rounded-full opacity-0 -z-10 nav-liquid-gradient optimize-animation"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0, opacity: 0.15 }}
                      transition={{ duration: 0.5 }}
                    />
                  </Link>
                </Button>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="nav-menu-trigger optimize-animation md:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <div className="nav-hamburger">
                  <motion.span className="nav-hamburger-line optimize-animation" />
                  <motion.span className="nav-hamburger-line optimize-animation" />
                  <motion.span className="nav-hamburger-line optimize-animation" />
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 optimize-animation"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              id="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 300 
              }}
              className="fixed top-0 right-0 h-full w-[85%] sm:w-[280px] bg-background/95 backdrop-blur-md z-50 nav-mobile-menu optimize-animation"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="nav-mobile-pattern"></div>
              <div className="p-5 flex flex-col h-full relative z-10">
                <div className="flex justify-between items-center">
                  <div className="nav-logo-mobile">
                    <div className="nav-logo-shine"></div>
                    <motion.div 
                      className="relative z-10 flex items-center justify-center optimize-animation"
                      animate={{ 
                        scale: [1, 1.1, 1], 
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        ease: "easeInOut" 
                      }}
                    >
                      <span className="nav-logo-text">T</span>
                      <motion.div 
                        className="absolute inset-0 bg-primary/30 rounded-full optimize-animation"
                        animate={{ 
                          scale: [0.8, 1.2, 0.8], 
                          opacity: [0.2, 0.4, 0.2] 
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                        style={{ filter: "blur(8px)" }}
                      />
                    </motion.div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="!border-0 hover:bg-transparent relative group nav-close-btn"
                    aria-label="Close menu"
                  >
                    <motion.div
                      whileHover={{ rotate: 90 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="optimize-animation"
                    >
                      <X className="h-5 w-5 group-hover:text-primary transition-colors" />
                    </motion.div>
                  </Button>
                </div>
                <div className="mt-6 sm:mt-10 flex-1">
                  <nav className="space-y-2.5" aria-label="Mobile navigation">
                    {navLinks.map((link, idx) => (
                      <motion.div
                        key={link.href}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ 
                          delay: idx * 0.08, 
                          type: "spring",
                          stiffness: 200,
                          damping: 20
                        }}
                        className="optimize-animation"
                      >
                        <Link 
                          href={link.href}
                          className={`nav-mobile-link ${activeLink === link.href ? 'nav-mobile-active' : ''}`}
                          onClick={() => {
                            setActiveLink(link.href)
                            setIsMobileMenuOpen(false)
                          }}
                          aria-current={activeLink === link.href ? "page" : undefined}
                          suppressHydrationWarning
                        >
                          <div className="nav-mobile-link-content">
                            <div className="nav-mobile-dot"></div>
                            <span>{link.label}</span>
                          </div>
                          <motion.div
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                            className="optimize-animation"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </motion.div>
                          {activeLink === link.href && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-primary/15 to-primary/5 rounded-lg -z-10 optimize-animation"
                              layoutId="mobileNavIndicator"
                              transition={{ type: "spring", damping: 20 }}
                            />
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </div>
                <div className="mt-auto pb-5">
                  <div className="nav-mobile-footer">
                    <Button 
                      size="sm" 
                      className="w-full nav-mobile-resume group"
                      asChild
                    >
                      <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer" suppressHydrationWarning>
                        <span className="relative z-10">View Resume</span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary/80 via-blue-600/80 to-primary/80 rounded-lg opacity-90 -z-0 optimize-animation"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                        <span className="nav-mobile-resume-shine"></span>
                      </Link>
                    </Button>
                    <div className="flex justify-center mt-5">
                      <button
                        ref={mobileThemeRef}
                        onClick={toggleMobileThemeHandler}
                        className="nav-theme-toggle-mobile"
                        suppressHydrationWarning
                      >
                        {mounted && (theme === "dark" ? 
                          <span className="flex items-center">Switch to Light <Sun className="h-4 w-4 ml-2 text-yellow-400" /></span> : 
                          <span className="flex items-center">Switch to Dark <Moon className="h-4 w-4 ml-2 text-primary" /></span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>


    </>
  )
}

