"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Briefcase, Calendar, GraduationCap, MapPin } from "lucide-react"

const experiences = [
  {
    type: "work",
    title: "Senior Full-Stack Developer & Cloud Engineer",
    company: "Magic Computers",
    location: "Mississauga, ON",
    period: "Jul 2023 – Aug 2025",
    description:
      "Developed and managed 7+ Azure DevOps YAML pipelines for .NET and Node.js applications, reducing infrastructure provisioning time by 35% and eliminating 12+ high-risk misconfigurations through RBAC and NSG hardening.Automated SQL Server maintenance with PowerShell, cutting manual DBA effort by 8 hours/week and improving query response times by 60%. Monitored system health using Azure Monitor and Log Analytics, reducing incident detection from 45 to under 10 minutes and preventing 3 potential outages during peak operations."
  },
  {
    type: "work",
    title: "Full-Stack DevOps Engineer (Azure & Multi-Cloud)",
    company: "BT Mobility",
    location: "Milton, ON",
    period: "May 2022 – Jul 2024",
    description:
      "Engineered a customer portal and shipping dashboard using React, .NET Core, and Azure SQL, processing 3K+ monthly orders and cutting manual shipping errors by 40%. Designed real-time WebSocket APIs in C# and Node.js for live dispatch tracking, reducing customer support inquiries by 25%. Optimized Azure SQL and MongoDB performance through indexing and Redis caching, accelerating API responses from 1.8s to 0.3s. Modernized frontend UX with responsive components and lazy loading, increasing mobile engagement by 30%."
  },
  {
    type: "work",
    title: "Full-Stack Application Developer – E-Commerce & Internal Tools",
    company: "Tik Tech Electronics",
    location: "Milton, ON",
    period: "Nov 2022 – Jan 2024",
    description:
      "Deployed 12+ microservices on AKS and Azure App Services using Bicep, cutting environment setup from 3 days to 2 hours and enabling self-service deployments for 8 engineering teams. Delivered an e-commerce platform using Vue/Nuxt and .NET, supporting 5K+ daily product views with sub-500ms page loads and seamless checkout. Automated CI/CD across Azure DevOps and GitHub Actions, accelerating release cycles by 40% and reducing post-deployment defects by 25% through integrated API contract testing. Built .NET/Node.js backend APIs handling 5K+ daily transactions, achieving <200ms p95 latency with Redis caching and blocking 100% of unauthorized access via OAuth2/JWT."
  },
  {
    type: "work",
    title: "Frontend & Backend Systems Developer – Retail Operations",
    company: "Northfield Retail Solutions / Calvin Klein",
    location: "Halton Hills, ON",
    period: "Jan 2020 – May 2022",
    description:
      "Engineered a C#/SQL order and inventory system processing 500+ daily orders, syncing sales and warehouse data in under 2 minutes — a 95% improvement over the legacy 4-hour batch process. Integrated 5 third-party dropshipping APIs, cutting average fulfillment time by 35% (5 → 3.2 days) and raising on-time delivery to 92%. Upgraded on-prem SQL Server and Windows infrastructure, reducing unplanned downtime by 50% without new hardware investment."
  },
  {
    type: "education",
    title: "Master of Computer Information Systems",
    company: "Cloud and Distributed Computing Lab of UTM",
    location: "Mississauga, ON",
    period: "May 2017 – Feb 2020",
    description:
      ""
  },
  {
    type: "education",
    title: "Bachelor of Architecture - BArch, Computer Engineering",
    company: "University of Toronto Mississauga",
    location: "Mississauga, ON",
    period: "Aug 2015 – Apr 2017",
    description:
      ""
  }
];

export function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="experience" className="py-12 sm:py-16 md:py-20 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/3 w-48 sm:w-64 h-48 sm:h-64 bg-primary/10 rounded-full blur-[80px] sm:blur-[100px]"></div>
        <div className="absolute bottom-0 left-1/4 w-56 sm:w-72 h-56 sm:h-72 bg-blue-500/10 rounded-full blur-[90px] sm:blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-8 sm:mb-12 md:mb-16"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3 sm:mb-4">
            My Journey
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-poppins text-center">
            Education & <span className="text-gradient">Experience</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative flex flex-col md:flex-row md:justify-center" ref={ref}>
          {/* Vertical timeline line - adjusted for mobile */}
          <div className="absolute left-[20px] md:left-1/2 top-0 h-full md:-translate-x-1/2 w-1 bg-gradient-to-b from-primary/30 via-primary/60 to-blue-400/30 rounded-full z-0" />

          <div className="flex flex-col gap-8 sm:gap-12 md:gap-16 w-full max-w-6xl mx-auto z-10">
            {experiences.map((exp, idx) => {
              const isWork = exp.type === "work"
              const Icon = isWork ? Briefcase : GraduationCap
              // Adjust alignment for mobile and desktop
              const align = idx % 2 === 0 ? "md:items-end" : "md:items-start"
              const cardBg = isWork
                ? "bg-gradient-to-br from-primary/10 via-background to-blue-100/10"
                : "bg-gradient-to-br from-blue-100/10 via-background to-primary/10"
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative flex flex-col pl-12 sm:pl-0 md:flex-row ${align} group`}
                >
                  {/* Timeline dot with animation - repositioned for mobile */}
                  <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 md:top-1/2 md:-translate-y-1/2 z-20">
                    <motion.div
                      className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center 
                        border-3 sm:border-4 border-background shadow-lg ${isWork ? "bg-primary/80" : "bg-blue-500/80"}`}
                      animate={{ scale: [1, 1.15, 1], boxShadow: ["0 0 0px #0000", "0 0 16px #a78bfa55", "0 0 0px #0000"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    </motion.div>
                  </div>
                  
                  {/* Card - adjusted for mobile */}
                  <div
                    className={`
                      relative mt-0 md:mt-0 md:w-[48%] w-full px-4 sm:px-6 py-4 sm:py-6 rounded-lg sm:rounded-xl 
                      shadow-lg sm:shadow-xl border border-primary/10
                      ${cardBg}
                      transition-all duration-300 group-hover:scale-[1.02] sm:group-hover:scale-105 
                      group-hover:shadow-xl sm:group-hover:shadow-2xl
                      ${idx % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}
                    `}
                  >
                    <div className="flex items-center gap-2 mb-1 sm:mb-2 text-primary font-medium">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="text-sm sm:text-base">{isWork ? "Work" : "Education"}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-1">{exp.title}</h3>
                    <p className="text-base sm:text-lg font-medium mb-1">{exp.company}</p>
                    <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground">{exp.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

