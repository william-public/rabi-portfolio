"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Github, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

interface ProjectCardProps {
  label: string
  title: string
  description: string
  imageUrl: string
  projectUrl: string
  githubUrl?: string
  technologies: string[]
  featured?: boolean
}

export function ProjectCard({ 
  label, 
  title, 
  description, 
  imageUrl, 
  projectUrl, 
  githubUrl, 
  technologies, 
  featured = false 
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`group relative rounded-xl overflow-hidden ${
        featured ? "md:col-span-2" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative aspect-video lg:aspect-[7/4] overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
        <div className="translate-y-4 transform opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="mb-2">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
              {label}
            </span>
            {featured && <span className="ml-2 inline-block px-3 py-1 text-xs font-medium bg-amber-500/10 text-amber-500 rounded-full">Featured</span>}
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground">{title}</h3>
          
          <p className="text-sm md:text-base text-muted-foreground mb-4 max-w-md">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, i) => (
              <span key={i} className="px-2 py-1 bg-secondary text-xs rounded-full text-secondary-foreground">
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            {projectUrl && (
              <a
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center text-primary-foreground hover:bg-primary transition-colors"
                aria-label="View live project"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
            
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary/90 flex items-center justify-center text-secondary-foreground hover:bg-secondary transition-colors"
                aria-label="View code on GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

