"use client"

import { useRef, useState, useEffect, useCallback, useMemo } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, useInView, useAnimation, AnimatePresence, useMotionValue } from "framer-motion"
import { Download, Code, Globe, Database, Puzzle, Sparkles, ArrowRight } from "lucide-react"
import { MouseScrollIndicator } from "@/components/ui/mouse-scroll-indicator"
import { ClientOnly } from "./client-only"

// First add the proper TypeScript interface for particles
interface Particle {
  id: string;
  x: number;
  y: number;
  delay: number;
  size?: number;
  duration?: number;
}

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()
  const [activeTab, setActiveTab] = useState(0)
  const y = useMotionValue(0)
  const parallaxY = useMotionValue(0)

  // Client-side only state
  const [isMounted, setIsMounted] = useState(false)

  // Generate particles on client-side only
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    // Only generate particles on the client side to avoid hydration mismatch
    if (typeof window !== 'undefined') {
      setParticles(
        Array.from({ length: 5 }).map((_, i) => ({
          id: `particle-${i}`,
          x: Math.floor(Math.random() * 80) + 10,
          y: Math.floor(Math.random() * 80) + 10,
          delay: i * 0.5,
          size: Math.random() * 4 + 2,
          duration: 1.5 + i * 0.5
        }))
      )
    }
  }, [isMounted])

  useEffect(() => {
    if (isInView && isMounted) {
      controls.start("visible")

      // Force animation of quadrants
      const timeout = setTimeout(() => {
        const quadrants = document.querySelectorAll('.grid > div');
        quadrants.forEach(q => {
          q.classList.add('animate-quadrant');
        });
      }, 100)

      return () => clearTimeout(timeout)
    }
  }, [isInView, controls, isMounted])

  // Enhanced scroll-based reveal animation
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    if (!isMounted) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!ref.current) return;

          const scrollY = window.scrollY;
          const sectionTop = ref.current.offsetTop;
          const sectionHeight = ref.current.offsetHeight;
          const windowHeight = window.innerHeight;
          
          // Calculate scroll progress through the section
          const scrollPosition = scrollY - sectionTop + windowHeight;
          const progress = Math.max(0, Math.min(1, scrollPosition / (sectionHeight + windowHeight)));
          
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      const mouseXRatio = (clientX / windowWidth) - 0.5;
      const mouseYRatio = (clientY / windowHeight) - 0.5;
      
      // Use RAF for smoother animation
      requestAnimationFrame(() => {
        parallaxY.set(mouseYRatio * 20);
        
        try {
        document.querySelectorAll('.quadrant').forEach((element, i) => {
          const htmlElement = element as HTMLElement;
            if (htmlElement) {
          const factor = i % 2 === 0 ? 1 : -1;
          htmlElement.style.transform = `translate3d(${mouseXRatio * 10 * factor}px, ${mouseYRatio * 10 * factor}px, 0)`;
          htmlElement.style.transition = "transform 0.2s var(--ease-out-smooth)";
            }
        });
        } catch (error) {
          console.warn('Error updating quadrant transforms:', error);
        }
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMounted, parallaxY]);

  useEffect(() => {
    if (isMounted) {
      try {
      // Check if bottom bars are present
      const quadrants = document.querySelectorAll('.quadrant');
      quadrants.forEach((q, i) => {
        const bottomBar = q.querySelector('[class*="absolute bottom-0"]');
        if (!bottomBar) {
          console.log(`Missing bottom bar in quadrant ${i}`);
        }
      });
      } catch (error) {
        console.warn('Error checking quadrant bottom bars:', error);
      }
    }
  }, [isMounted]);

  useEffect(() => {
    if (isMounted) {
      try {
      // Fix the frontend quadrant bottom bar specifically
      const frontendQuadrant = document.querySelector('.quadrant:first-child');
      if (frontendQuadrant) {
        // Check if it's missing the bottom bar
        const existingBar = frontendQuadrant.querySelector('[class*="absolute bottom-0"]');
        if (!existingBar) {
          // Create and add the missing bottom bar
          const bottomBar = document.createElement('div');
          bottomBar.className = 'absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-primary to-blue-500 group-hover:animate-pulse-width z-20';
          frontendQuadrant.appendChild(bottomBar);
        }
        }
      } catch (error) {
        console.warn('Error fixing frontend quadrant bottom bar:', error);
      }
    }
  }, [isMounted]);

  const tabs = [
    { 
      icon: <Code className="h-5 w-5" />,
      name: "Development",
      content: "I design and build scalable, secure systems and APIs using Node.js, Python, PHP, and AWS. My focus is on performance, reliability, and long-term maintainability—delivering production-grade solutions that support fast-growing startups and enterprise-scale applications."
    },
    { 
      icon: <Globe className="h-5 w-5" />,
      name: "Experience",
      content: "With 7+ years of professional experience, I’ve delivered high-performance full-stack systems for startups and global enterprises. I specialize in designing scalable architectures, optimizing critical paths, and shipping reliable systems in production environments."
    },
    { 
      icon: <Database className="h-5 w-5" />,
      name: "Skills",
      content: "My expertise spans Node.js, Python, PHP, AWS, and API design, along with database optimization, distributed systems, and cloud-native architectures. I build systems that are scalable, observable, and ready for real-world production demands."
    },
    { 
      icon: <Puzzle className="h-5 w-5" />,
      name: "Process",
      content: "I approach projects with an architecture-first mindset, balancing performance, reliability, and business needs. I value clear communication, iterative delivery, and continuous improvement—building systems that evolve smoothly as products and teams scale."
    }
  ]

  const quadrantContent = [
    {
      title: "Frontend",
      icon: <Code className="h-6 w-6" />,
      iconBg: "bg-primary/20",
      iconColor: "text-primary",
      skills: [
        "React (Hooks, Concurrent, Suspense)",
        "Next.js (App Router, SSR/ISR, Edge)",
        "Angular",
        "Nuxt.js",
        "TypeScript (Advanced Typing)",
        "Tailwind CSS",
        "CSS-in-JS",
        "State Management (Redux, Zustand, TanStack)",
        "Performance Optimization",
        "Accessibility (WCAG, ARIA)",
        "Frontend Architecture",
        "Testing (Jest, React Testing Library, Playwright)"
      ],
      barColor: "from-primary to-blue-600"
    },
    {
      title: "Backend",
      icon: <Database className="h-6 w-6" />,
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-500",
      skills: [
        "Node.js (NestJS, Express)",
        "Python (FastAPI, Django)",
        "PHP (Laravel)",
        "REST & GraphQL APIs",
        "Microservices Architecture",
        "AWS (EC2, Lambda, RDS, S3)",
        "Databases (PostgreSQL, MySQL, MongoDB)",
        "Caching (Redis)",
        "Authentication & Authorization (OAuth, JWT)",
        "System Design & Scalability",
        "CI/CD Pipelines",
        "Monitoring & Logging"
      ],
      barColor: "from-blue-500 to-cyan-600"
    },
    {
      title: "Experience",
      icon: <Globe className="h-6 w-6" />,
      iconBg: "bg-amber-500/20",
      iconColor: "text-amber-500",
      years: "8+",
      description: "Years of professional development",
      barColor: "from-amber-500 to-orange-600"
    },
    {
      title: "Projects",
      icon: <Puzzle className="h-6 w-6" />,
      iconBg: "bg-green-500/20",
      iconColor: "text-green-500",
      projects: "103+",
      description: "Projects delivered successfully",
      barColor: "from-green-500 to-emerald-600"
    }
  ]

  const svgIllustrations = [
    <svg key="frontend" width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary/80">
      <path d="M16 18L22 12L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 6L2 12L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 3L9 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    <svg key="backend" width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-500/80">
      <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 14C20.5 13.5 20.8 13.02 21 12C20.8 10.98 20.5 10.5 20 10M4 14C3.5 13.5 3.2 13.02 3 12C3.2 10.98 3.5 10.5 4 10M16 20C16.5 19.5 16.8 19.02 17 18C16.8 16.98 16.5 16.5 16 16M8 20C7.5 19.5 7.2 19.02 7 18C7.2 16.98 7.5 16.5 8 16M16 8C16.5 7.5 16.8 7.02 17 6C16.8 4.98 16.5 4.5 16 4M8 8C7.5 7.5 7.2 7.02 7 6C7.2 4.98 7.5 4.5 8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    <svg key="experience" width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-amber-500/80">
      <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    <svg key="projects" width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-500/80">
      <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 8V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23 11H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ]

  const memoizedItems = useMemo(() => [
    { title: "Optimization Expert", desc: "Building high-performance applications" },
    { title: "Continuous Learner", desc: "Always exploring new technologies" }
  ], []);

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        
        {/* Light mode dark accent backgrounds */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-800/5 dark:bg-transparent rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gray-900/8 dark:bg-transparent rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-slate-700/6 dark:bg-transparent rounded-full blur-[80px]"></div>
        
        <svg
          className="absolute inset-0 w-full h-full opacity-30"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <path
                d="M 8,0 L 0,0 0,8"
                fill="none"
                stroke="rgba(147, 51, 234, 0.05)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
        
        {isMounted && particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-primary/30 dark:bg-primary/20"
            style={{
              width: particle.size,
              height: particle.size,
              top: `${particle.y}%`,
              left: `${particle.x}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <motion.div 
        className="container mx-auto px-4 md:px-6 relative z-10"
        style={{
          transform: `translateY(${scrollProgress * 20}px)`,
          opacity: 0.8 + (scrollProgress * 0.2)
        }}
      >
        <motion.div
          className="flex flex-col items-center text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.8, 
              ease: [0.25, 0.46, 0.45, 0.94],
              staggerChildren: 0.2
            }
          } : { opacity: 0, y: 50 }}
        >
          <motion.div 
            className="inline-flex items-center justify-center gap-2 px-3 py-1 mb-3 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={isInView ? { 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: { 
                duration: 0.6, 
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94]
              }
            } : { opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: "rgba(14, 165, 233, 0.15)",
              transition: { duration: 0.3 }
            }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            </motion.div>
            <span className="text-xs text-primary">About Me</span>
          </motion.div>
          
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.8, 
                delay: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94]
              }
            } : { opacity: 0, y: 30 }}
          >
            Senior <motion.span 
              className="relative inline-block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { 
                opacity: 1, 
                scale: 1,
                transition: { 
                  duration: 0.6, 
                  delay: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }
              } : { opacity: 0, scale: 0.9 }}
            >
              <motion.span 
                className="relative z-10 text-primary"
                animate={{ 
                  color: ['hsl(199, 89%, 48%)', 'hsl(199, 89%, 42%)', 'hsl(199, 89%, 48%)'],
                  textShadow: [
                    '0 0 0px rgba(14, 165, 233, 0)',
                    '0 0 10px rgba(14, 165, 233, 0.3)',
                    '0 0 0px rgba(14, 165, 233, 0)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >Software Engineer</motion.span>
              <motion.span 
                className="absolute -bottom-1.5 left-0 right-0 h-3 bg-primary/20 rounded-full -z-10"
                initial={{ width: 0 }}
                animate={isInView ? { 
                  width: "100%",
                  transition: { 
                    duration: 0.8, 
                    delay: 0.7,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                } : { width: 0 }}
              ></motion.span>
            </motion.span> specializing
            <br /> in scalable distributed systems
          </motion.h2>
          
          <motion.p 
            className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.7, 
                delay: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }
            } : { opacity: 0, y: 20 }}
          >
            Leveraging deep expertise in Node.js, Python, PHP, and AWS, you will design and lead the development of impactful backend platforms and APIs, delivering secure, resilient, and high-performance systems at scale.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center" ref={ref}>
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { 
              opacity: 1, 
              x: 0,
              transition: { 
                duration: 0.8, 
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94]
              }
            } : { opacity: 0, x: -50 }}
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-3">
                {quadrantContent.map((quadrant, index) => (
                  <div key={index} className="quadrant-wrapper">
                    <motion.div 
                      className="quadrant relative rounded-xl overflow-hidden border border-white/10 dark:border-white/20 bg-white/5 dark:bg-slate-900/40 backdrop-blur-sm transition-all duration-300 h-full light:shadow-[0_0_0_1px_rgba(14,165,233,0.25),0_6px_18px_-4px_rgba(14,165,233,0.25),0_0_28px_-4px_rgba(6,182,212,0.35)] light:[background:linear-gradient(135deg,rgba(255,255,255,0.65)_0%,rgba(240,249,255,0.9)_100%)] light:hover:[background:linear-gradient(135deg,rgba(240,253,255,0.95)_0%,rgba(224,242,254,0.9)_60%,rgba(219,234,254,0.95)_100%)]"
                      initial={{ 
                        opacity: 0, 
                        scale: 0.8, 
                        y: 30,
                        rotateX: 15,
                        rotateY: 5
                      }}
                      animate={isInView ? { 
                        opacity: 1, 
                        scale: 1, 
                        y: 0,
                        rotateX: 0,
                        rotateY: 0
                      } : { 
                        opacity: 0, 
                        scale: 0.8, 
                        y: 30,
                        rotateX: 15,
                        rotateY: 5
                      }}
                      transition={{ 
                        duration: 0.8, 
                        delay: 0.4 + (0.1 * index),
                        ease: [0.25, 0.46, 0.45, 0.94],
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }}
                      whileHover={{ 
                        y: -8, 
                        scale: 1.05,
                        rotateX: -5,
                        rotateY: 2,
                        backgroundColor: "rgba(14, 165, 233, 0.08)",
                        boxShadow: "0 20px 40px rgba(14, 165, 233, 0.15)",
                        borderColor: "rgba(14, 165, 233, 0.4)",
                        transition: { 
                          duration: 0.4, 
                          ease: [0.25, 0.46, 0.45, 0.94],
                          type: "spring",
                          stiffness: 300,
                          damping: 20
                        }
                      }}
                    >
                      {/* Subtle gradient overlay */}
                      <motion.div 
                        className="absolute inset-0 opacity-40"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 0.4 } : { opacity: 0 }}
                        transition={{ duration: 1, delay: 0.2 * (index + 1) }}
                        style={{
                          background: `linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, transparent 50%, rgba(6, 182, 212, 0.1) 100%)`
                        }}
                      />
                      {/* Light mode dark accent overlay */}
                      <div className="absolute inset-0 bg-slate-800/8 dark:bg-transparent rounded-xl"></div>
                      
                      {/* Subtle dot pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="h-full w-full"
                          style={{
                            backgroundImage: "radial-gradient(circle at center, var(--foreground) 1px, transparent 1px)",
                            backgroundSize: "20px 20px",
                            backgroundPosition: "0 0"
                          }}
                        ></div>
                      </div>
                      
                      {/* Floating icon with subtle animation */}
                      <motion.div
                        className="absolute right-3 bottom-3 opacity-20"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { 
                          opacity: 0.2, 
                          scale: 1,
                          y: [0, -2, 0]
                        } : { 
                          opacity: 0, 
                          scale: 0.8 
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity, 
                          ease: "easeInOut",
                          delay: 0.5 * (index + 1)
                        }}
                      >
                        {svgIllustrations[index]}
                      </motion.div>
                      
                      <div className="relative z-10 p-6 h-full flex flex-col justify-between backdrop-blur-[2px] rounded-xl transition-all duration-300 hover:backdrop-blur-none">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`p-2 rounded-lg ${quadrant.iconBg} ${quadrant.iconColor} shadow-sm dark:shadow-lg`}>
                            {quadrant.icon}
                          </div>
                          <h3 className="text-base font-semibold text-foreground dark:text-slate-100">{quadrant.title}</h3>
                        </div>
                        
                        {quadrant.skills ? (
                          <div className="flex flex-wrap gap-1.5 mt-auto skills-wrap">
                            {quadrant.skills.map((skill) => (
                              <motion.span 
                                key={skill} 
                                className="px-2 py-1 text-xs font-medium rounded-full bg-white/10 dark:bg-slate-700/40 backdrop-blur-sm border border-white/5 dark:border-slate-600/30 transition-all duration-200 light:bg-gradient-to-r light:from-cyan-50/70 light:to-sky-50/70 light:text-slate-700 light:border-cyan-200/60 light:hover:from-cyan-100/80 light:hover:to-sky-100/80 light:shadow-[0_0_0_1px_rgba(14,165,233,0.25),0_2px_6px_-1px_rgba(14,165,233,0.25)]"
                                whileHover={{ 
                                  scale: 1.05, 
                                  backgroundColor: "rgba(14, 165, 233, 0.15)",
                                  color: "hsl(199, 89%, 48%)",
                                  borderColor: "rgba(14, 165, 233, 0.3)",
                                  transition: { duration: 0.3, ease: "easeOut" }
                                }}
                              >
                                {skill}
                              </motion.span>
                            ))}
                          </div>
                        ) : (
                          <div className="mt-auto">
                            <div className="text-2xl font-bold text-foreground dark:text-slate-100">{quadrant.years || quadrant.projects}</div>
                            <div className="text-xs text-muted-foreground dark:text-slate-400">{quadrant.description}</div>
                          </div>
                        )}
                      </div>
                      
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 h-1.5 z-20"
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ 
                          duration: 0.8, 
                          delay: 0.3 * (index + 1),
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        style={{ 
                          backgroundImage: index === 0 
                            ? 'linear-gradient(to right, hsl(199, 89%, 48%), rgb(14, 165, 233))' 
                            : index === 1 
                              ? 'linear-gradient(to right, rgb(59, 130, 246), rgb(6, 182, 212))' 
                              : index === 2 
                                ? 'linear-gradient(to right, rgb(245, 158, 11), rgb(249, 115, 22))' 
                                : 'linear-gradient(to right, rgb(34, 197, 94), rgb(16, 185, 129))'
                        }}
                      />
                    </motion.div>
                  </div>
                ))}
              </div>

              <div className="absolute inset-0 z-0 flex items-center justify-center">
                <motion.div 
                  className="absolute w-[1px] h-full bg-primary/20"
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                ></motion.div>
                <motion.div 
                  className="absolute w-full h-[1px] bg-primary/20"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                ></motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="lg:col-span-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { 
              opacity: 1, 
              x: 0,
              transition: { 
                duration: 0.8, 
                delay: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
              }
            } : { opacity: 0, x: 50 }}
          >
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.8, 
                  delay: 0.7,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }
              } : { opacity: 0, y: 30 }}
            >
              <motion.div 
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.6, 
                    delay: 0.8,
                    staggerChildren: 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                } : { opacity: 0, y: 20 }}
              >
                {tabs.map((tab, index) => (
                  <motion.button 
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 text-xs sm:text-sm font-medium rounded-full transition-all ${
                      activeTab === index 
                        ? 'bg-primary text-primary-foreground shadow-md dark:shadow-primary/20' 
                        : 'bg-primary/10 hover:bg-primary/15 dark:bg-slate-700/50 dark:hover:bg-slate-600/50 text-foreground'
                    }`}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={isInView ? { 
                      opacity: 1, 
                      scale: 1, 
                      y: 0,
                      transition: { 
                        duration: 0.5, 
                        delay: 0.9 + (0.1 * index),
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }
                    } : { opacity: 0, scale: 0.8, y: 10 }}
                    whileHover={{ 
                      scale: 1.08,
                      y: -2,
                      boxShadow: "0 8px 20px rgba(var(--primary), 0.25)",
                      transition: { 
                        duration: 0.3,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }
                    }}
                    whileTap={{ 
                      scale: 0.95,
                      transition: { duration: 0.1 }
                    }}
                  >
                    <motion.div
                      animate={activeTab === index ? { 
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                      } : {}}
                      transition={{ 
                        duration: 0.6,
                        ease: "easeInOut"
                      }}
                  >
                    {tab.icon}
                    </motion.div>
                    {tab.name}
                  </motion.button>
                ))}
              </motion.div>

              <motion.div 
                className="min-h-[100px] bg-primary/5 dark:bg-slate-800/30 rounded-xl p-6 border border-primary/10 dark:border-slate-700/50 relative overflow-hidden mt-4 custom-cursor-default"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={isInView ? { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { 
                    duration: 0.6, 
                    delay: 1.0,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                } : { opacity: 0, y: 20, scale: 0.95 }}
                whileHover={{ 
                  y: -3,
                  scale: 1.02,
                  boxShadow: "0 15px 35px rgba(var(--primary), 0.2)",
                  borderColor: "#0ea5e94d",
                  backgroundColor: "#0ea5e914",
                  transition: { 
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                }}
              >
                {/* Light mode dark accent overlay */}
                <div className="absolute inset-0 bg-slate-800/6 dark:bg-transparent rounded-xl"></div>
                <motion.div className="absolute top-0 left-0 h-1 bg-primary" 
                  style={{
                    width: `${100 / tabs.length}%`,
                    x: `${activeTab * 100}%`
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm sm:text-base md:text-lg"
                  >
                    {tabs[activeTab].content}
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.6, 
                    delay: 1.2,
                    staggerChildren: 0.15,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                } : { opacity: 0, y: 30 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 custom-cursor-default"
              >
                {memoizedItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={isInView ? { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: { 
                        duration: 0.5, 
                        delay: 1.3 + (0.1 * index),
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }
                    } : { opacity: 0, y: 20, scale: 0.9 }}
                    whileHover={{
                      y: -5,
                      scale: 1.02,
                      backgroundColor: "#0ea5e90a",
                      boxShadow: "0 8px 20px rgba(var(--primary), 0.12)",
                      borderColor: "#0ea5e926",
                      transition: { 
                        duration: 0.3, 
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }
                    }}
                    layout={false}
                    className="flex items-start gap-2 p-4 rounded-lg border border-white/1 dark:border-slate-700/30 bg-white/5 dark:bg-slate-800/25 backdrop-blur-sm transition-all duration-150 skills-item relative"
                  >
                    {/* Light mode dark accent overlay */}
                    <div className="absolute inset-0 bg-slate-800/4 dark:bg-transparent rounded-lg"></div>
                    <div className="min-w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 relative z-10">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="relative z-10">
                      <h4 className="text-sm sm:text-base font-medium">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isInView ? { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { 
                    duration: 0.6, 
                    delay: 1.5,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }
                } : { opacity: 0, y: 30, scale: 0.9 }}
                className="pt-6 button-wrapper"
              >
                <motion.button
                  className="ultimate-button relative overflow-hidden rounded-full px-6 py-3 text-white text-sm sm:text-base font-medium group"
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* Multi-layered background for the button */}
                  <div className="absolute inset-0 bg-primary rounded-full" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-primary rounded-full opacity-80 ultimate-gradient" />
                  
                  {/* Particle effects */}
                  <div className="absolute inset-0 overflow-hidden rounded-full">
                    {particles.map((particle: Particle) => (
                      <motion.div
                        key={particle.id}
                        className="absolute w-2 h-2 bg-white/40 rounded-full"
                        initial={{ x: `${particle.x}%`, y: `${particle.y}%` }}
                        animate={{
                          y: [0, -30],
                          x: (parseInt(particle.id.split('-')[1]) % 2 === 0) ? [0, 10] : [0, -10],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: particle.duration || 2,
                          repeat: Infinity,
                          repeatDelay: particle.delay,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-full glow-effect" />
                  
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent rounded-full"
                    style={{ left: '-100%', top: 0, width: '100%', height: '100%', transform: 'skewX(-20deg)' }}
                    animate={{
                      left: ['200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 5,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Content with hover text change */}
                  <div className="relative z-10 flex items-center gap-2">
                    <motion.span 
                      className="ultimate-icon-wrapper"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    >
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className="sparkle-icon w-3.5 h-3.5 sm:w-4 sm:h-4"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                          <path d="M2 12h20"></path>
                        </svg>
                      </motion.span>
                    </motion.span>
                    <span 
                      className="relative overflow-hidden inline-block h-5 sm:h-6"
                      onClick={() => {
                      document.getElementById('skills')?.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                      }}
                    >
                      <span className="block transition-transform duration-300 ease-in-out group-hover:-translate-y-full text-xs sm:text-sm">
                      Explore My Skills
                      </span>
                      <span className="absolute inset-0 translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0 text-xs sm:text-sm">
                      View Expertise →
                      </span>
                    </span>
                  </div>
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

      </motion.div>
    </section>
  )
}

