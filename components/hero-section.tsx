"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail, ChevronDown, Mouse, Laptop, FileCode, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { HeroParticles } from "@/components/hero-particles"
import { SequentialTypewriter } from "@/components/ui/sequential-typewriter"
import { MouseScrollIndicator } from "@/components/ui/mouse-scroll-indicator"
import { usePerformanceOptimization } from "@/hooks/use-performance-optimization"
import { useOptimizedScroll } from "@/hooks/use-performance-optimization"
import { smoothScrollToId } from "@/lib/smooth-scroll"

// Custom Upwork icon
const UpworkIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    width="20" 
    height="20" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.281-2.389 5.281-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.688 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
  </svg>
);

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  const { getAnimationSettings, performanceConfig } = usePerformanceOptimization()
  const animationSettings = getAnimationSettings()
  
  // Optimized scroll handling
  useOptimizedScroll((scrollY) => {
    setScrollY(scrollY)
  })

  const scrollToProjects = useCallback(() => {
    smoothScrollToId("projects", 800, -80)
  }, [])
  
  const scrollToContact = useCallback(() => {
    smoothScrollToId("contact", 800, -80)
  }, [])

  // Optimized animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: animationSettings.ease,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: animationSettings.ease
      }
    }
  }

  const floatingVariants = {
    animate: {
      y: [1, -1, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const rotatingVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 25,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }

  const glowVariants = {
    animate: {
      opacity: [0.6, 0.8, 0.6],
      scale: [1, 1.02, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh+10rem)] flex items-center justify-center overflow-hidden"
      style={{ paddingTop: "25vh", paddingBottom: "5vh" }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background to-background/50" style={{ zIndex: 1 }}></div>
        
        {/* Optimized background gradients with reduced complexity */}
        <motion.div 
          className="absolute top-1/4 left-[20%] w-96 h-96 bg-blue-600/35 dark:bg-blue-600/20 rounded-full blur-[120px] optimize-animation" 
          variants={glowVariants}
          animate="animate"
          style={{ 
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden'
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-[20%] w-96 h-96 bg-blue-700/30 dark:bg-blue-600/20 rounded-full blur-[120px]" 
          variants={glowVariants}
          animate="animate"
          style={{ 
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden'
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-[30%] w-80 h-80 bg-blue-800/25 dark:bg-primary/20 rounded-full blur-[100px]" 
          variants={glowVariants}
          animate="animate"
          style={{ 
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden'
          }}
        />
      </div>
      
      <div className="absolute inset-0 z-0 opacity-70">
        <HeroParticles />
      </div>

      <motion.div 
        className="container mx-auto px-4 md:px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          <motion.div
            variants={itemVariants}
            className="lg:col-span-6 order-1 lg:order-1 flex justify-center mb-8 sm:mb-12 lg:mb-0 mt-32 sm:mt-36 md:mt-24 lg:mt-20"
          >
            <div className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] lg:w-[360px] lg:h-[360px] mx-auto">
              {/* Optimized glow effects */}
              <motion.div 
                className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600/20 dark:bg-primary/10 rounded-full blur-[60px]"
                variants={glowVariants}
                animate="animate"
                style={{ 
                  willChange: 'transform, opacity',
                  backfaceVisibility: 'hidden'
                }}
              />
              <motion.div 
                className="absolute -top-10 -right-10 w-40 h-40 bg-blue-700/18 dark:bg-blue-500/10 rounded-full blur-[60px]"
                variants={glowVariants}
                animate="animate"
                style={{ 
                  willChange: 'transform, opacity',
                  backfaceVisibility: 'hidden'
                }}
              />
              {/* Light mode solid accent colors */}
              <div className="absolute -top-5 -left-5 w-8 h-8 bg-primary/30 dark:bg-transparent rounded-full"></div>
              <div className="absolute -bottom-5 -right-5 w-6 h-6 bg-blue-500/40 dark:bg-transparent rounded-full"></div>
              <div className="absolute top-1/4 -right-8 w-4 h-4 bg-cyan-500/35 dark:bg-transparent rounded-full"></div>
              
              <div className="relative w-full h-full z-10 group">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Optimized rotating rings */}
                  <motion.div 
                    className="absolute w-full h-full rounded-full border border-primary/20"
                    variants={rotatingVariants}
                    animate="animate"
                    style={{ 
                      boxShadow: "0 0 15px rgba(var(--primary), 0.15)",
                      willChange: 'transform',
                      backfaceVisibility: 'hidden'
                    }}
                  />
                  <motion.div 
                    className="absolute w-[110%] h-[110%] rounded-full border border-blue-500/10"
                    variants={rotatingVariants}
                    animate="animate"
                    style={{ 
                      boxShadow: "0 0 15px rgba(139, 92, 246, 0.1)",
                      willChange: 'transform',
                      backfaceVisibility: 'hidden'
                    }}
                  />
                  <motion.div 
                    className="absolute w-[120%] h-[120%] rounded-full border border-blue-500/10"
                    variants={rotatingVariants}
                    animate="animate"
                    style={{ 
                      boxShadow: "0 0 15px rgba(59, 130, 246, 0.1)",
                      willChange: 'transform',
                      backfaceVisibility: 'hidden'
                    }}
                  />
                </div>
                
                <motion.div 
                  className="absolute -inset-6 bg-gradient-to-tr from-primary/10 via-blue-500/5 to-transparent rounded-full opacity-80"
                  variants={glowVariants}
                  animate="animate"
                  style={{ 
                    willChange: 'transform, opacity',
                    backfaceVisibility: 'hidden'
                  }}
                />
                
                <div className="absolute inset-0 rounded-full shadow-[0_0_40px_rgba(var(--primary),0.3)] overflow-hidden z-20">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/80 to-background/50 backdrop-blur-md z-10"></div>
                  
                  <div className="absolute inset-2 rounded-full border-2 border-primary/40 overflow-hidden z-20 backdrop-blur-sm shadow-[inset_0_0_25px_rgba(var(--primary),0.4)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(var(--primary),0.15)_1px,transparent_1px)] bg-[size:8px_8px] opacity-50 z-10"></div>
                    
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-tl from-primary/10 to-blue-500/10 opacity-70 z-20 transition-opacity duration-700"
                      variants={glowVariants}
                      animate="animate"
                      style={{ 
                        willChange: 'transform, opacity',
                        backfaceVisibility: 'hidden'
                      }}
                    />
                    
                    <div className="relative w-full h-full rounded-full overflow-hidden z-30">
                      <div className="absolute inset-0 bg-gradient-to-b from-primary/15 via-transparent to-blue-500/15"></div>
                      {/* Light mode solid background */}
                      <div className="absolute inset-0 bg-primary/1 dark:bg-transparent rounded-full"></div>
                      
                      <motion.img
                        src="/profilepic.png"
                        alt="Rabi's Profile"
                        className="absolute inset-0 w-full h-full object-contain scale-[0.9] object-center z-40 transition-all duration-700 ease-out filter drop-shadow-[0_10px_20px_rgba(var(--primary),0.2)]"
                        style={{ 
                          mixBlendMode: 'normal',
                          willChange: 'transform',
                          backfaceVisibility: 'hidden',
                          transform: 'translateY(18px)'
                        }}
                        variants={floatingVariants}
                        animate="animate"
                      />
                      
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/8 to-transparent z-50 opacity-0 transition-opacity duration-500"
                        variants={glowVariants}
                        animate="animate"
                        style={{ 
                          willChange: 'opacity',
                          backfaceVisibility: 'hidden'
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Optimized floating particles */}
                <div className="absolute inset-0 overflow-visible pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        top: `${15 + i * 12}%`,
                        left: `${8 + i * 16}%`,
                        width: `${i % 3 === 0 ? 6 : 4}px`,
                        height: `${i % 3 === 0 ? 6 : 4}px`,
                        backgroundColor: i % 3 === 0 ? 'rgb(14, 165, 233)' : i % 3 === 1 ? 'rgb(6, 182, 212)' : 'rgb(59, 130, 246)',
                        opacity: 0.4,
                        willChange: 'transform, opacity',
                        backfaceVisibility: 'hidden'
                      }}
                      variants={floatingVariants}
                      animate="animate"
                      transition={{
                        duration: 2 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    />
                  ))}
                </div>
                
                {/* Optimized floating icons */}
                <motion.div 
                  className="absolute -left-4 top-1/4 w-12 h-12 rounded-xl bg-white/90 dark:bg-black/80 backdrop-blur-md shadow-lg flex items-center justify-center p-2 z-40 border border-white/30 dark:border-white/10 shadow-[0_8px_16px_rgba(var(--primary),0.08)]"
                  variants={floatingVariants}
                  animate="animate"
                  style={{ 
                    willChange: 'transform',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <Code className="h-7 w-7 text-blue-500" />
                  {/* Light mode solid accent */}
                  <div className="absolute inset-0 bg-primary/20 dark:bg-transparent rounded-xl"></div>
                </motion.div>

                <motion.div 
                  className="absolute -right-4 top-1/3 w-12 h-12 rounded-xl bg-white/90 dark:bg-black/80 backdrop-blur-md shadow-lg flex items-center justify-center p-2 z-40 border border-white/30 dark:border-white/10 shadow-[0_8px_16px_rgba(var(--primary),0.08)]"
                  variants={floatingVariants}
                  animate="animate"
                  style={{ 
                    willChange: 'transform',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <Laptop className="h-7 w-7 text-gray-700 dark:text-gray-300" />
                  {/* Light mode solid accent */}
                  <div className="absolute inset-0 bg-blue-500/25 dark:bg-transparent rounded-xl"></div>
                </motion.div>

                <motion.div 
                  className="absolute left-1/4 -bottom-4 w-12 h-12 rounded-xl bg-white/90 dark:bg-black/80 backdrop-blur-md shadow-lg flex items-center justify-center p-2 z-40 border border-white/30 dark:border-white/10 shadow-[0_8px_16px_rgba(var(--primary),0.08)]"
                  variants={floatingVariants}
                  animate="animate"
                  style={{ 
                    willChange: 'transform',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <FileCode className="h-7 w-7 text-blue-600" />
                  {/* Light mode solid accent */}
                  <div className="absolute inset-0 bg-cyan-500/20 dark:bg-transparent rounded-xl"></div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="lg:col-span-6 order-2 lg:order-2 text-center lg:text-left"
          >
            <div className="space-y-6 max-w-xl mx-auto lg:ml-0">
              <motion.h1 
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
                variants={itemVariants}
                style={{ 
                  willChange: 'opacity',
                  backfaceVisibility: 'hidden'
                }}
              >
                Hi, I'm <motion.span 
                          className="text-primary"
                          style={{ 
                            willChange: 'color',
                            backfaceVisibility: 'hidden'
                          }}
                        >Rabi Khan</motion.span>.
                <motion.span 
                  className="block mt-2 text-gradient"
                  style={{
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text', 
                    WebkitTextFillColor: 'transparent',
                    backgroundImage: 'linear-gradient(90deg, hsl(199, 89%, 48%), hsl(199, 89%, 68%), hsl(199, 89%, 48%))',
                    backgroundSize: '200%',
                    display: 'inline-block',
                    willChange: 'background-size',
                    backfaceVisibility: 'hidden'
                  }}
                >FullStack DevOps Engineer</motion.span>
                <span className="block mt-2">Cloud (Azure/AWS/GCP)</span>
              </motion.h1>
              
              <div className="h-14 flex items-center justify-center lg:justify-start">
                <div className="sequential-typewriter-wrapper">
                  <SequentialTypewriter />
                </div>
              </div>
              
              <motion.p 
                className="text-muted-foreground text-base"
                variants={itemVariants}
                style={{ 
                  willChange: 'opacity, transform',
                  backfaceVisibility: 'hidden'
                }}
              >
                Full-Stack Developer & DevOps Engineer with 6+ years of experience building and automating secure, high-performance web applications for Canadian retail, logistics, and electronics sectors. Expertise in JavaScript, TypeScript, React, Vue, C#, and .NET Core, combined with deep cloud infrastructure automation using Azure (AZ-104 Certified), AWS, and GCP. CI/CD (GitHub Actions, Azure DevOps), IaC (Bicep, Terraform), and containerization (Docker, AKS).
              </motion.p> 
              
              <motion.div 
                className="flex flex-wrap justify-center lg:justify-start gap-4 pt-1"
                variants={itemVariants}
                style={{ 
                  willChange: 'opacity, transform',
                  backfaceVisibility: 'hidden'
                }}
              >
                <Button 
                  size="default" 
                  className="rounded-full group relative overflow-hidden px-3 sm:px-4 md:px-6 max-w-[140px] sm:max-w-[160px] md:max-w-none"
                  onClick={scrollToProjects}
                >
                  <span className="relative z-10">Explore My Work</span>
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-primary/80 to-blue-600/80 z-0"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ 
                      willChange: 'transform',
                      backfaceVisibility: 'hidden'
                    }}
                  />
                  <ArrowRight className="ml-2 h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="default" 
                  variant="outline" 
                  className="rounded-full border-primary/50 hover:border-primary transition-colors px-3 sm:px-4 md:px-6 max-w-[140px] sm:max-w-[160px] md:max-w-none"
                  onClick={scrollToContact}
                >
                  Get in Touch
                </Button>
              </motion.div>
              
              
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Place the style outside of the nested components */}
      <style jsx>{`
        @media (max-width: 1023px) {
          .sequential-typewriter-wrapper :global(.flex) {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  )
}

