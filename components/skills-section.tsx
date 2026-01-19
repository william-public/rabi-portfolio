"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState, useMemo } from "react"
import { useInView } from "framer-motion"
import { useTheme } from "next-themes"

// Define skill type
interface Skill {
  id: string;
  name: string;
  icon: string;
  level: number;
  color: string;
  lightModeColor?: string; // Add light mode specific color
  category: "frontend" | "backend" | "design" | "other";
}

// Define skills array with enhanced light mode colors
const skills: Skill[] = [
  // Frontend
  { 
    id: "react", 
    name: "React", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", 
    level: 90, 
    color: "#61DAFB", 
    lightModeColor: "#0072A3", // Darker blue for light mode
    category: "frontend" 
  },
  { 
    id: "nextjs", 
    name: "Next.js", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", 
    level: 85, 
    color: "#000000", 
    lightModeColor: "#333333", // Slightly lighter but still dark
    category: "frontend" 
  },
  { 
    id: "vue", 
    name: "Vue", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", 
    level: 95, 
    color: "#0175C2", 
    lightModeColor: "#0050B3", // Darker blue for light mode
    category: "frontend" 
  },
  { 
    id: "typescript", 
    name: "TypeScript", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", 
    level: 88, 
    color: "#3178C6", 
    lightModeColor: "#1E5792", // Darker blue for light mode
    category: "frontend" 
  },
  { 
    id: "tailwind", 
    name: "Tailwind", 
    icon: "https://www.svgrepo.com/show/374118/tailwind.svg", 
    level: 92, 
    color: "#06B6D4", 
    lightModeColor: "#0284A8", // Darker teal for light mode
    category: "frontend" 
  },
  { 
    id: "Nuxt", 
    name: "Nuxt", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg", 
    level: 85, 
    color: "#4353FF", 
    lightModeColor: "#2E3ABC", // Darker blue for light mode
    category: "frontend" 
  },
  
  // Backend
  { 
    id: "nodejs", 
    name: "Node.js", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", 
    level: 82, 
    color: "#339933", 
    lightModeColor: "#1E7E1E", // Darker green for light mode
    category: "backend" 
  },
  { 
    id: "firebase", 
    name: "Firebase", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", 
    level: 88, 
    color: "#FFCA28", 
    lightModeColor: "#DB8F00", // Darker amber for light mode
    category: "backend" 
  },
  { 
    id: "graphql", 
    name: "GraphQL", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg", 
    level: 78, 
    color: "#E10098", 
    lightModeColor: "#A3026E", // Darker pink for light mode
    category: "backend" 
  },
  
  // Design & Other
  { 
    id: "Python", 
    name: "python", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", 
    level: 85, 
    color: "#F24E1E", 
    lightModeColor: "#C4300C", // Darker orange for light mode
    category: "design" 
  },
  { 
    id: "git", 
    name: "Git", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", 
    level: 90, 
    color: "#F05032", 
    lightModeColor: "#C13C24", // Darker orange-red for light mode
    category: "other" 
  },
  
  { 
    id: "javascript", 
    name: "JavaScript", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", 
    level: 94, 
    color: "#F7DF1E", 
    lightModeColor: "#C7A800", // Darker yellow for light mode
    category: "frontend" 
  },

  // devops
  {
    id: "docker",
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    level: 80,
    color: "#2496ED",
    lightModeColor: "#0D6EAB", // Darker blue for light mode
    category: "other"
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    level: 75,
    color: "#326CE5",
    lightModeColor: "#1E4A9C", // Darker blue for light mode
    category: "other"
  },
  {
    id: "Azure",
    name: "Azure",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
    level: 75,
    color: "#326CE5",
    lightModeColor: "#1E4A9C", // Darker blue for light mode
    category: "other"
  },
  {
    id: "AWS",
    name: "AWS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    level: 75,
    color: "#326CE5",
    lightModeColor: "#1E4A9C", // Darker blue for light mode
    category: "other"
  },
  {
    id: "GCP",
    name: "GCP",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    level: 75,
    color: "#326CE5",
    lightModeColor: "#1E4A9C", // Darker blue for light mode
    category: "other"
  },
  {
    id: "CI/CD",
    name: "CI/CD",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/circleci/circleci-plain.svg",
    level: 75,
    color: "#326CE5",
    lightModeColor: "#1E4A9C", // Darker blue for light mode
    category: "other"
  },


]

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [skillElements, setSkillElements] = useState<React.ReactElement[]>([])
  const { theme } = useTheme() // Get the current theme
  const isLightMode = theme === 'light'
  
  // Only run calculations after component is mounted on client
  useEffect(() => {
    setIsMounted(true)
  }, []);
  
  // Add a useEffect to handle window resize for responsive orbit
  useEffect(() => {
    if (!isMounted) return;
    
    // Function to handle responsive sizing
    const handleResize = () => {
      const skillElements = document.querySelectorAll('[style*="translate(-50%, -50%) translate"]');
      
      skillElements.forEach((element) => {
        // Cast element to HTMLElement to access style property
        const htmlElement = element as HTMLElement;
        const style = htmlElement.getAttribute('style') || '';
        
        // Set CSS variables for coordinates that we can modify with media queries
        if (style.includes('translate(-50%, -50%) translate(')) {
          const matches = style.match(/translate\(-50%, -50%\) translate\(([-\d.]+)px, ([-\d.]+)px\)/);
          if (matches && matches.length >= 3) {
            const x = matches[1];
            const y = matches[2];
            htmlElement.style.setProperty('--x-coord', `${x}px`);
            htmlElement.style.setProperty('--y-coord', `${y}px`);
          }
        }
      });
    };
    
    // Call once and add resize listener
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMounted]);
  
  // Memoize stars for performance (reduce to 60)
  const stars = useMemo(() => {
    if (!isMounted) return null
    return Array.from({ length: 60 }).map((_, i) => {
      const size = Math.random() * 2 + 1
      const x = Math.random() * 100
      const y = Math.random() * 100
      const baseOpacity = isLightMode ? (Math.random() * 0.5 + 0.3) : (Math.random() * 0.7 + 0.1)
      const shineDuration = Math.random() * 2 + 2.5
      const shineDelay = Math.random() * 3
      return (
        <motion.div
          key={`star-${i}`}
          className="absolute rounded-full"
          style={{
            width: size,
            height: size,
            top: `${y}%`,
            left: `${x}%`,
            // Use a soft gold/yellow or pastel blue for light mode stars
            background: isLightMode
              ? "radial-gradient(circle, #a78bfa 60%, #ede9fe 100%, transparent 100%)"
              : "radial-gradient(circle, #fff 70%, #fff8 100%, transparent 100%)",
            boxShadow: isLightMode ? '0 0 6px #a78bfa88' : 'none',
            willChange: "opacity,scale",
            pointerEvents: "none",
          }}
          animate={{
            opacity: [
              isLightMode ? Math.min(baseOpacity + 0.4, 0.9) : baseOpacity,
              isLightMode ? Math.min(baseOpacity + 0.7, 1.0) : 1,
              isLightMode ? Math.min(baseOpacity + 0.4, 0.9) : 0.7,
              isLightMode ? Math.min(baseOpacity + 0.7, 1.0) : 1,
              isLightMode ? Math.min(baseOpacity + 0.4, 0.9) : baseOpacity
            ],
            scale: [1, 1.7, 1.1, 1.7, 1],
          }}
          transition={{
            duration: shineDuration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: shineDelay,
          }}
        />
      )
    })
  }, [isMounted, isLightMode])

  // Add a smoothing function for skill orb movements
  const smoothEasing = {
    type: "spring",
    stiffness: 100,
    damping: 15
  };

  // Function to get current color based on theme
  const getSkillColor = (skill: Skill) => {
    return isLightMode && skill.lightModeColor ? skill.lightModeColor : skill.color;
  };

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="relative min-h-[90vh] pt-20 pb-32 overflow-visible bg-gradient-to-b from-background via-background/95 to-background/90"
    >
      {/* Cosmic animated background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {stars}
        {/* Animated nebula blurs */}
        {isMounted && (
          <>
            <motion.div
              className={`absolute -top-[15%] left-[8%] w-[32%] h-[32%] rounded-full ${
                isLightMode ? 'bg-blue-600/10' : 'bg-blue-600/20'
              } blur-[90px]`}
              animate={{ scale: [1, 1.08, 1], opacity: isLightMode ? [0.2, 0.35, 0.2] : [0.15, 0.25, 0.15] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className={`absolute -bottom-[10%] right-[10%] w-[28%] h-[28%] rounded-full ${
                isLightMode ? 'bg-blue-600/10' : 'bg-blue-600/20'
              } blur-[80px]`}
              animate={{ scale: [1.1, 1, 1.1], opacity: isLightMode ? [0.2, 0.3, 0.2] : [0.13, 0.22, 0.13] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Aurora effect */}
            <motion.div
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[22vw] ${
                isLightMode 
                  ? 'bg-gradient-to-r from-blue-700/15 via-cyan-500/10 to-blue-600/15'
                  : 'bg-gradient-to-r from-primary/20 via-blue-400/10 to-cyan-400/10'
              } rounded-full blur-[100px] opacity-50 pointer-events-none`}
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}
        {/* More shooting stars for dynamic effect */}
        {isMounted && Array.from({ length: 7 }).map((_, i) => (
          <motion.div
            key={`shooting-star-${i}`}
            className="shooting-star absolute"
            style={{
              top: `${Math.random() * 85 + 5}%`,
              left: 0,
              width: 0,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${
                isLightMode 
                          ? (Math.random() > 0.5 ? "#555" : "hsl(199, 89%, 48%)")
        : (Math.random() > 0.5 ? "white" : "hsl(199, 89%, 48%)")
              })`
            }}
            animate={{
              left: ["0%", "100%"],
              width: ["0px", "180px", "0px"],
              opacity: [0, isLightMode ? 0.8 : 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 4,
              ease: "easeOut",
              delay: i * 2 + Math.random() * 8, 
              repeat: Infinity,
              repeatDelay: 8 + Math.random() * 10,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Title and description */}
        <div className="flex flex-col items-center justify-center w-full mb-0 sm:mb-6 md:mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`inline-flex items-center justify-center gap-2 px-3 py-1 mb-3 rounded-full ${
              isLightMode 
                ? 'bg-primary/20 backdrop-blur-sm border border-primary/30' 
                : 'bg-primary/10 backdrop-blur-sm border border-primary/20'
            }`}
          >
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
            >
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
              <path d="M12 2V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 20V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M4 12L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M22 12L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M19.7782 4.22192L18.364 5.63614" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M5.63606 18.364L4.22184 19.7782" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M19.7782 19.7782L18.364 18.364" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M5.63606 5.63608L4.22184 4.22186" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="text-[10px] xs:text-xs font-medium text-primary">Technical Skills</span>
          </motion.div>
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            My <span className="text-gradient animate-gradient-move">Main</span> Skillset
          </motion.h2>
          <motion.p
            className="text-xs sm:text-sm md:text-base text-muted-foreground text-center max-w-2xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            I approach backend and full-stack projects with a performance- and reliability-focused mindset, combining scalable architecture with practical solutions. I believe in iterative development, continuous optimization, and building systems that grow with the business.
          </motion.p>
        </div>

        {/* Skills display with smooth orbit animation */}
        <div className="relative w-full flex justify-center items-center py-6 mt-0">
          <div
            className="relative flex items-center justify-center"
            style={{
              minHeight: "400px",
              width: "100%",
              maxWidth: "500px",
            }}
          >
            {/* Orbit ring for visual reference - perfectly behind skills */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                inset: 0,
                margin: "auto",
                width: "340px",
                height: "340px",
                zIndex: 10, // should be below skills (z-20 for skills, z-10 for ring)
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 64, repeat: Infinity, ease: "linear" }}
            >
              <div className={`w-full h-full rounded-full border ${isLightMode ? 'border-primary/30' : 'border-primary/20'}`} />
            </motion.div>

            {/* Central star/planet */}
            <motion.div 
              className="absolute z-20"
              style={{
                left: "50%",
                top: "50%",
                width: "90px",
                height: "90px",
                transform: "translate(-50%, -50%)",
                borderRadius: "9999px",
                background: isLightMode ? "rgba(240,240,240,0.8)" : "rgba(0,0,0,0.7)",
                backdropFilter: "blur(12px)",
                border: isLightMode ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: isLightMode 
                  ? "0 0 40px 10px rgba(139,92,246,0.2)"
                  : "0 0 40px 10px rgba(139,92,246,0.13)",
              }}
              animate={{
                boxShadow: isLightMode
                  ? [
                    "0 0 20px rgba(147, 51, 234, 0.4)",
                    "0 0 40px rgba(147, 51, 234, 0.6)",
                    "0 0 20px rgba(147, 51, 234, 0.4)",
                  ]
                  : [
                    "0 0 20px rgba(139, 92, 246, 0.3)",
                    "0 0 40px rgba(139, 92, 246, 0.5)",
                    "0 0 20px rgba(139, 92, 246, 0.3)",
                  ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {activeSkill ? (
                <motion.div
                  key={activeSkill.id}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                >
                  <img
                    src={activeSkill.icon}
                    alt={activeSkill.name}
                    width={40}
                    height={40}
                    className="w-12 h-12"
                  />
                </motion.div>
              ) : (
                <div className="text-center text-xs font-medium relative">
                  <span className="text-gradient text-lg font-bold">SKILLS</span>

                  {/* Animated shine */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 w-14 h-14 rounded-full pointer-events-none"
                    style={{ translateX: "-50%", translateY: "-50%" }}
                    animate={{ opacity: isLightMode ? [0.3, 0.7, 0.3] : [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className={`w-full h-full rounded-full ${
                      isLightMode 
                        ? 'bg-gradient-to-tr from-slate-500/20 via-primary/30 to-transparent blur-[14px]'
                        : 'bg-gradient-to-tr from-white/30 via-primary/20 to-transparent blur-[14px]'
                    }`} />
                  </motion.div>
                </div>
              )}
              
              {/* Floating particles around the center */}
              {isMounted &&
                Array.from({ length: 4 }).map((_, i) => {
                  const size = 7 + Math.random() * 7;
                  const left = 35 + Math.random() * 30;
                  const top = 35 + Math.random() * 30;

                  return (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: size,
                        height: size,
                        left: `${left}%`,
                        top: `${top}%`,
                        backgroundColor: isLightMode ? "rgba(147, 51, 234, 0.4)" : "rgba(139, 92, 246, 0.3)",
                      }}
                      animate={{
                        y: [0, -10 + Math.random() * 10, 0],
                        opacity: isLightMode ? [0.4, 0.8, 0.4] : [0.3, 0.7, 0.3],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    />
                  );
                })}
            </motion.div>

            {/* Skills orbiting smoothly around the center */}
            {isMounted && (
              <motion.div
                className="absolute inset-0 w-full h-full pointer-events-none optimize-animation"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
              >
                {skills.map((skill, index) => {
                  const totalSkills = skills.length
                  const angle = (index / totalSkills) * (2 * Math.PI)
                  const radius = 170
                  const x = Math.cos(angle) * radius
                  const y = Math.sin(angle) * radius
                  const rotateDeg = Math.atan2(y, x) * (180 / Math.PI)
                  let tooltipClass = "absolute left-1/2 -translate-x-1/2";
                  
                  // Improve tooltip positioning
                  if (skill.id === "nodejs") {
                    tooltipClass = "absolute top-1/2 left-16 -translate-y-1/2";
                  } else if (skill.id === "wordpress") {
                    tooltipClass = "absolute top-1/2 left-16 -translate-y-1/2";
                  } else if (skill.id === "webflow") {
                    tooltipClass = "absolute top-16 left-1/2 -translate-x-1/2";
                  } else if (y > 60) {
                    tooltipClass = "absolute -top-12 left-1/2 -translate-x-1/2";
                  } else if (y < -60) {
                    tooltipClass = "absolute top-16 left-1/2 -translate-x-1/2";
                  } else if (x > 0) {
                    tooltipClass = "absolute top-1/2 right-12 -translate-y-1/2";
                  } else {
                    tooltipClass = "absolute top-1/2 left-12 -translate-y-1/2";
                  }
                  
                  // Get the appropriate color based on the current theme
                  const skillColor = getSkillColor(skill);
                  
                  return (
                    <div
                      key={skill.id}
                      className="absolute z-30 pointer-events-auto group"
                      style={{
                        left: "50%",
                        top: "50%",
                        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                        // Add CSS variables for orbit positioning that we can target in media queries
                        ['--orbit-x' as any]: `${x}px`,
                        ['--orbit-y' as any]: `${y}px`,
                      }}
                    >
                      <motion.button
                        className="space-skill-btn relative flex items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/10 w-16 h-16 shadow-lg group"
                        style={{ 
                          boxShadow: isLightMode 
                            ? `0 0 15px ${skillColor}60`
                            : `0 0 15px ${skillColor}30`,
                          backgroundColor: isLightMode ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.6)",
                          border: isLightMode ? `1px solid ${skillColor}50` : "1px solid rgba(255,255,255,0.1)"
                        }}
                        whileHover={{
                          scale: 1.25,
                          boxShadow: `0 0 35px ${skillColor}90`,
                          borderColor: skillColor,
                          zIndex: 50,
                        }}
                        onClick={() => setActiveSkill(skill)}
                        transition={smoothEasing}
                      >
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="w-8 h-8"
                        />
                        {/* Star rays/glow effect */}
                        <motion.div
                          className="star-rays absolute inset-0 rounded-full opacity-0"
                          style={{ backgroundColor: skillColor }}
                          whileHover={{ opacity: isLightMode ? 0.25 : 0.18 }}
                        />
                        {/* Tooltip: only visible on hover, positioned to avoid overlap */}
                        <div
                          className={`${tooltipClass} px-3 py-1.5 ${
                            isLightMode 
                              ? 'bg-gray-800/90 text-white' 
                              : 'bg-black/80'
                          } backdrop-blur-md border border-white/10 rounded-full text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none`}
                          style={{ 
                            // Add minimum width to ensure tooltip is visible
                            minWidth: "70px",
                            textAlign: "center"
                          }}
                        >
                          {skill.name}
                        </div>
                      </motion.button>
                      {/* Fine connection line to center */}
                      <div
                        className="absolute left-1/2 top-1/2 h-px -z-10"
                        style={{
                          width: radius,
                          backgroundColor: isLightMode ? `${skillColor}40` : `${skillColor}20`,
                          transformOrigin: "0 0",
                          transform: `rotate(${rotateDeg}deg)`,
                          opacity: isLightMode ? 0.5 : 0.3,
                        }}
                      />
                      {/* Animated floating particle */}
                      <motion.div
                        className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: skillColor,
                          translateX: "-50%",
                          translateY: "-50%",
                        }}
                        animate={{
                          y: [0, -10, 0],
                          opacity: isLightMode ? [0.6, 1, 0.6] : [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2 + (index % 3),
                          repeat: Infinity,
                          delay: index * 0.1,
                        }}
                      />
                    </div>
                  )
                })}
              </motion.div>
            )}
          </div>
        </div>

        {/* Active skill detail modal */}
        <AnimatePresence>
          {activeSkill && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Modal backdrop */}
              <motion.div 
                className={`absolute inset-0 ${isLightMode ? 'bg-gray-600/70' : 'bg-black/80'} backdrop-blur-sm`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveSkill(null)}
              />
              
              {/* Modal content */}
              <motion.div 
                className={`relative ${
                  isLightMode 
                    ? 'bg-white/80 shadow-xl' 
                    : 'bg-black/50'
                } backdrop-blur-xl border border-white/10 rounded-xl w-full max-w-md z-10 overflow-hidden`}
                style={{ 
                  boxShadow: `0 0 30px ${getSkillColor(activeSkill)}${isLightMode ? '50' : '30'}` 
                }}
                initial={{ scale: 0.9, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 30, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
              >
                <div className="h-2 w-full" style={{ backgroundColor: getSkillColor(activeSkill) }} />
                
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div 
                      className="p-3 rounded-full"
                      style={{ backgroundColor: `${getSkillColor(activeSkill)}${isLightMode ? '30' : '20'}` }}
                    >
                      <img
                        src={activeSkill.icon}
                        alt={activeSkill.name}
                        width={40}
                        height={40}
                        className="w-8 h-8"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{activeSkill.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">{activeSkill.category}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Proficiency</span>
                      <span className="font-medium">{activeSkill.level}%</span>
                    </div>
                    <div className={`w-full h-2 ${isLightMode ? 'bg-gray-200' : 'bg-white/10'} rounded-full overflow-hidden`}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: getSkillColor(activeSkill) }}
                        initial={{ width: 0 }}
                        animate={{ width: `${activeSkill.level}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <motion.button
                      className={`px-4 py-2 rounded-md ${
                        isLightMode 
                          ? 'bg-gray-200 hover:bg-gray-300 text-gray-800' 
                          : 'bg-white/5 hover:bg-white/10 border border-white/10'
                      } text-sm transition-colors`}
                      onClick={() => setActiveSkill(null)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
                
                {/* Particles */}
                {Array.from({ length: 10 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: 2 + Math.random() * 3,
                      height: 2 + Math.random() * 3,
                      backgroundColor: getSkillColor(activeSkill),
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20 - Math.random() * 30],
                      x: [0, (Math.random() - 0.5) * 20],
                      opacity: [0, isLightMode ? 0.9 : 0.8, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.5 + Math.random() * 1,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shooting stars effect - client-side only */}
        {isMounted && Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`shooting-star-${i}`}
            className="shooting-star absolute"
            style={{
              top: `${Math.random() * 70 + 10}%`,
              left: 0,
              width: 0,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${
                isLightMode
                          ? (Math.random() > 0.5 ? "#555" : `hsl(199, 89%, 48%)`)
        : (Math.random() > 0.5 ? "white" : `hsl(199, 89%, 48%)`)
              })`
            }}
            animate={{
              left: ["0%", "100%"],
              width: ["0px", "150px", "0px"],
              opacity: [0, isLightMode ? 0.8 : 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 4,
              ease: "easeOut",
              delay: i * 5 + Math.random() * 10, 
              repeat: Infinity,
              repeatDelay: 15 + Math.random() * 20,
            }}
          />
        ))}
      </div>
    </section>
  )
}
