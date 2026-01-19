"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ArrowUpRight, Github, ExternalLink, Filter, Star, BadgeCheck, Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Enhanced project data
const projects = [
  {
    id: 1,
    title: "LuxeStore - Full Stack",
    description: "Built a full-stack e-commerce system with real-time inventory, secure Stripe payments, and an admin dashboard—supporting 5K+ daily views and $500K+ in seasonal sales. Optimized SQL queries and frontend performance to cut load times from 90s to under 8s.",
    image: "/projects/ecom.jpg",
    category: "FULLSTACK",
    technologies: ["React", ".NET Core", "Node.js", "PostgreSQL", "SQL Server", "Stripe", "JWT", "Azure"],
    demoUrl: "https://ecommerce-web-five-sepia.vercel.app/",
    codeUrl: "https://github.com/RMK800/Ecommerce-web",
    featured: true,
  },
  {
    id: 2,
    title: "PYMPAY - DevOps CI/CD Automation",
    description: "Implemented secure CI/CD pipelines using Azure DevOps and GitHub Actions, reducing deployment time by 40% and post-release defects by 25%. Enabled self-service deployments for engineering teams across 12+ microservices.",
    image: "/projects/devops.jpg",
    category: "DEVOPS",
    technologies: ["Azure DevOps", "GitHub Actions", "Becep", "Docker", "AKS", "Jest", "Cypress", "RBAC", "PowerShell"],
    demoUrl: "https://pympay-adi.netlify.app/  ",
    codeUrl: "https://github.com/RMK800/PymPay",
    featured: false,
  },
  {
    id: 3,
    title: "Multi-Region AWS Infrastructure - Cloud",
    description: "Developed a cloud operations dashboard that models AWS-like infrastructure—including regions, load balancers, and auto-scaling—through a responsive UI. Designed to demonstrate scalable cloud architecture principles.",
    image: "/projects/cloud.jpg",
    category: "cloud",
    technologies: ["AWS", "Terraform", "CloudFormation", "Docker", "Kubernetes", "CI/CD Integration"],
    demoUrl: "https://cloud-scale-aws.vercel.app/  ",
    codeUrl: "https://github.com/RMK800/cloud-scale-aws",
    featured: false,
  },
  {
    id: 4,
    title: "CI/CD pipeline automation",
    description: "Created a full-stack utility that lets developers provision and manage cloud environments via a web interface. Automates setup using modern tooling to reduce manual errors and accelerate onboarding.",
    image: "/projects/automation.jpg",
    category: "automation",
    technologies: ["React", "TypeScript", "Node.js", "Express", "Kubernetes", "AWS CLI", "REST APIs", "Prettier", "Netlify"],
    demoUrl: "https://deploy-cloud-tools.vercel.app/",
    codeUrl: "https://github.com/RMK800/deploy-cloud-tools",
    featured: false,
  }
]

const categories = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "desktop", label: "Desktop" },
]

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // State to manage popups for unavailable resources
  const [popup, setPopup] = useState<{
    visible: boolean;
    message: string;
    position: { x: number; y: number };
  }>({
    visible: false,
    message: "",
    position: { x: 0, y: 0 }
  });

  // Function to handle unavailable resources
  const handleUnavailableResource = (e: React.MouseEvent, message: string) => {
    e.preventDefault();
    setPopup({
      visible: true,
      message,
      position: { x: e.clientX, y: e.clientY }
    });

    // Hide popup after 3 seconds
    setTimeout(() => {
      setPopup(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  // Close popup manually
  const closePopup = () => {
    setPopup(prev => ({ ...prev, visible: false }));
  };

  // Filter and sort projects
  const filteredProjects = projects
    .filter((project) => {
      const matchesCategory = activeCategory === "all" || project.category === activeCategory
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      if (sortBy === "newest") return b.id - a.id
      if (sortBy === "oldest") return a.id - b.id
      if (sortBy === "featured") return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      return 0
    })

  const featuredProjects = filteredProjects.filter(project => project.featured)
  const regularProjects = filteredProjects.filter(project => !project.featured)

  // Floating particles for background (hydration-safe)
  const [particles, setParticles] = useState<{top: number, left: number, size: number, color: string, delay: number}[]>([])
  useEffect(() => {
    setParticles(
      Array.from({ length: 12 }).map((_, i) => ({
        top: 10 + (i * 7) % 80,
        left: 5 + (i * 13) % 90,
        size: i % 3 === 0 ? 14 : 8,
        color: i % 2 === 0 ? "rgba(139,92,246,0.18)" : "rgba(59,130,246,0.13)",
        delay: i * 0.4,
      }))
    )
  }, [])

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, when: "beforeChildren", staggerChildren: 0.12 } }
  }
  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 80, damping: 18 } },
    exit: { opacity: 0, y: 60, scale: 0.96, transition: { duration: 0.3 } }
  }

  // Enhanced ProjectRow: alternate image/content direction for cross-directional layout
  function ProjectRow({ project, index, featured }: { project: any; index: number; featured?: boolean }) {
    // Alternate direction: even rows image left, odd rows image right
    const isReverse = index % 2 === 1

    // Check if demo or code is available
    const isDemoAvailable = project.demoUrl !== "#";
    const isCodeAvailable = project.codeUrl !== "#";

    return (
      <motion.div
        key={project.id}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.35, type: "tween" } }}
        viewport={{ once: true, amount: 0.2 }}
        layout={false}
        className={`
          group relative flex flex-col md:flex-row ${isReverse ? "md:flex-row-reverse" : ""}
          items-center md:items-stretch gap-0 md:gap-0
          rounded-3xl bg-gradient-to-br from-white/90 via-primary/10 to-blue-100/10 dark:from-background/90 dark:via-primary/10 dark:to-blue-900/10
          shadow-xl border border-primary/10 overflow-visible
          hover:shadow-[0_8px_40px_0_rgba(139,92,246,0.18)] transition-all duration-400
          backdrop-blur-2xl
          px-4 sm:px-6 py-6 sm:py-8 mx-auto
        `}
        style={{
          backgroundBlendMode: "overlay",
        }}
      >
        {/* Floating image, visually separated, always contained */}
        <div className="relative flex-shrink-0 w-full md:w-[340px] min-h-[180px] sm:min-h-[220px] md:min-h-[260px] flex items-center justify-center z-30">
          {/* Glow and shadow layers */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-8 w-72 h-72 rounded-2xl shadow-2xl bg-gradient-to-br from-primary/10 via-blue-400/10 to-cyan-400/10 blur-2xl opacity-60 pointer-events-none"
            animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.04, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Image container with overflow-hidden and max-w */}
          <motion.div
            className="relative w-48 h-32 sm:w-60 sm:h-40 md:w-72 md:h-48 rounded-2xl shadow-xl border-4 border-white/40 dark:border-background/40 overflow-hidden z-20 bg-background"
            style={{ willChange: "transform" }}
            whileHover={{
              y: -14,
              scale: 1.07,
              rotate: isReverse ? 4 : -4,
              boxShadow: "0 32px 64px 0 rgba(139,92,246,0.20)",
            }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-contain"  // Changed from object-cover to object-contain
              sizes="(max-width: 768px) 100vw, 340px"
              priority={index === 0}
              style={{
                objectFit: "fill",
                zIndex: 20,
                transition: "transform 0.5s cubic-bezier(.4,2,.3,1)",
              }}
            />
            {/* Overlay shine effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0.12 }}
              whileHover={{ opacity: 0.22 }}
              transition={{ duration: 0.5 }}
              style={{
                background:
                  "linear-gradient(120deg,rgba(139,92,246,0.10) 0%,rgba(59,130,246,0.08) 100%)",
                zIndex: 25,
              }}
            />
          </motion.div>
          {/* Floating accent elements */}
          <motion.div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-36 h-8 bg-gradient-to-r from-primary/30 via-blue-400/20 to-cyan-400/20 blur-2xl rounded-full z-10"
            animate={{ scaleX: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/20 blur-lg z-10"
            animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          {featured && (
            <motion.div
              className="absolute top-4 left-4 z-30"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
            >
              <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full bg-gradient-to-r from-primary to-blue-500 text-white text-xs font-semibold shadow-lg">
                <Star className="w-3 h-3 sm:w-4 sm:h-4" /> Featured
              </span>
            </motion.div>
          )}
        </div>
        {/* Card content */}
        <div className="flex-1 flex flex-col justify-between px-4 sm:px-8 py-6 sm:py-8 md:py-8 relative z-20 text-center md:text-left">
          {/* Animated vertical accent bar on left/right for desktop */}
          <motion.div
            className={`hidden md:block absolute ${isReverse ? "right-0" : "left-0"} top-8 bottom-8 w-1 bg-gradient-to-b from-primary via-blue-500 to-cyan-500 rounded-full opacity-70`}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 + index * 0.1 }}
            style={{ originY: 0 }}
          />
          <div>
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 justify-center md:justify-start">
              {project.technologies.map((tech: string, i: number) => (
                <span
                  key={i}
                  className="px-1.5 sm:px-2 py-1 bg-gradient-to-r from-primary/10 via-blue-500/10 to-cyan-500/10 text-xs rounded-full text-primary font-medium shadow-sm border border-primary/10"
                >
                  {tech}
                </span>
              ))}
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-2 text-gradient drop-shadow-lg tracking-tight">
              {project.title}
            </h3>
            <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">{project.description}</p>
          </div>
          <div className="flex flex-wrap gap-3 mt-auto justify-center md:justify-start">
            {project.demoUrl && (
              isDemoAvailable ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-primary to-blue-500 text-white text-sm font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition"
                >
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                  Demo
                </a>
              ) : (
                <button
                  onClick={(e) => handleUnavailableResource(e, "Demo is not available yet")}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-gray-400 to-gray-500 text-white text-sm font-semibold shadow-lg cursor-not-allowed opacity-80"
                >
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                  Demo
                </button>
              )
            )}
            {project.codeUrl && (
              isCodeAvailable ? (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-white/90 text-primary text-sm font-semibold shadow-lg border border-primary/20 hover:bg-primary hover:text-white transition"
                >
                  <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                  Code
                </a>
              ) : (
                <button
                  onClick={(e) => handleUnavailableResource(e, "Source code is private")}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-white/90 text-gray-400 text-sm font-semibold shadow-lg border border-gray-300 cursor-not-allowed opacity-80"
                >
                  <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                  Private
                </button>
              )
            )}
          </div>
        </div>
        {/* Subtle floating star accent */}
        <motion.div
          className={`absolute bottom-6 ${isReverse ? "left-6" : "right-6"} z-10 hidden sm:block`}
          animate={{
            y: [0, -8, 0],
            opacity: [0.5, 1, 0.5],
            rotate: [0, 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 7 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.3,
          }}
        >
          <Star className="w-6 h-6 text-primary/40 drop-shadow" />
        </motion.div>
      </motion.div>
    )
  }

  return (
    <section id="projects" className="py-24 relative overflow-visible">
      {/* Glowing animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute top-1/4 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.13, 0.22, 0.13] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute left-0 right-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent blur-[4px] opacity-70"></div>
        <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-primary/80 to-transparent blur-[8px] opacity-70"></div>
        {/* Animated floating particles */}
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.color,
              opacity: 0.7,
              filter: "blur(1px)",
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6 + (i % 3),
              repeat: Infinity,
              repeatType: "mirror",
              delay: p.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-20">
        {/* Tag like "My Journey" - centered */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-4 text-center shadow backdrop-blur-sm"
          >
            My Work
          </motion.div>
        </div>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.h2
            className="text-xl sm:text-2xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            My Recent<span className="text-gradient animate-gradient-move"> Projects</span>
          </motion.h2>
          <motion.div
            className="mx-auto mt-2 mb-8 h-1 w-32 rounded-full bg-gradient-to-r from-primary via-blue-500 to-cyan-500 shadow-lg"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ originX: 0.5 }}
          />
          <motion.p
            className="text-muted-foreground text-sm sm:text-base md:text-lg mb-8 px-4 sm:px-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Explore my latest work across Full Stack, DevOps Automation and Cloud Infrastructure.<br className="hidden sm:block" />
            Each project represents a unique challenge and solution.
          </motion.p>
          {/* Search and filter controls */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 items-center justify-center sm:justify-between mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <div className="w-full sm:w-auto flex-1 max-w-full sm:max-w-md">

            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4 w-full sm:w-auto justify-center">

            </div>
          </motion.div>
        </motion.div>

        {/* No projects found */}
        <AnimatePresence>
          {filteredProjects.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-muted-foreground text-lg">No projects found matching your search criteria.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Featured projects - one per row, modern card */}
        <AnimatePresence>
          {featuredProjects.length > 0 && (
            <motion.div
              className="mb-16 flex flex-col items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionVariants}
            >
              <motion.h3
                className="text-2xl font-bold mb-8 text-gradient tracking-tight flex items-center justify-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <BadgeCheck className="w-6 h-6 text-primary animate-bounce" />
                Featured Projects
              </motion.h3>
              <div className="space-y-14 w-full max-w-4xl mx-auto">
                <AnimatePresence>
                  {featuredProjects.map((project, index) => (
                    <ProjectRow key={project.id} project={project} index={index} featured />
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Regular projects, one per row, modern card */}
        <AnimatePresence>
          {regularProjects.length > 0 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionVariants}
              className="flex flex-col items-center"
            >
              <motion.h3
                className="text-2xl font-bold mb-8 text-gradient tracking-tight flex items-center justify-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <Star className="w-5 h-5 text-primary animate-spin-slow" />
                All Projects
              </motion.h3>
              <div className="space-y-12 w-full max-w-4xl mx-auto">
                <AnimatePresence>
                  {regularProjects.map((project, index) => (
                    <ProjectRow key={project.id} project={project} index={index} />
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to action */}

      </div>

      {/* Popup for unavailable resources */}
      <AnimatePresence>
        {popup.visible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{
              position: 'fixed',
              top: popup.position.y - 70,
              left: popup.position.x - 100,
              zIndex: 100,
              maxWidth: '90vw', // Prevent overflow outside viewport
            }}
            className="bg-background border border-primary/20 shadow-lg rounded-lg p-3 w-64"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-primary" />
                <span className="font-semibold text-sm">Notice</span>
              </div>
              <button onClick={closePopup} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground">{popup.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      
    </section>
  )
}

