"use client"

import Link from "next/link"
import { ArrowUp } from "lucide-react"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="py-6 sm:py-8 border-t border-border relative">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-primary rounded-lg rotate-45 opacity-80"></div>
              <span className="relative text-white font-bold text-base sm:text-lg">TB</span>
            </div>
            <span className="font-poppins font-bold text-base sm:text-lg">
              Tyler<span className="text-primary">.</span> 
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-4 md:mb-0">
            <Link href="#home" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="#about" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#skills" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
              Skills
            </Link>
            <Link href="#projects" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
              Projects
            </Link>
            <Link href="#contact" className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          <button
            onClick={scrollToTop}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tyler Berkson. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

