"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Briefcase, Calendar, GraduationCap, MapPin } from "lucide-react"

const experiences = [
  {
    type: "work",
    title: "Expert Full Stack Developer",
    company: "Better Business Bureau",
    location: "United States",
    period: "Mar 2018 – May 2022",
    description:
      "Architected and delivered scalable, high-performance web applications with Node.js, Python, modern databases, and frontend frameworks (React, Vue, Angular). Optimized workflows, integrated secure APIs, implemented testing and CI/CD pipelines, and led cross-functional teams to modernize legacy applications, improving performance, maintainability, and UX."
  },
  {
    type: "work",
    title: "Professional Backend Developer",
    company: "Alliance Truss",
    location: "United States",
    period: "Aug 2016 – Nov 2017",
    description:
      "Built reliable backend systems, optimized workflows and data processes, implemented caching strategies and database optimizations to reduce response times, and maintained clean, well-documented environments to improve system stability and team productivity."
  },
  {
    type: "work",
    title: "Professional Front-End Developer",
    company: "Core IT",
    location: "United States",
    period: "Dec 2015 – Sep 2016",
    description:
      "Developed scalable UI components using React, Vue, and Angular, optimized page layouts and user flows with Tailwind and Bootstrap, monitored front-end performance, and delivered clean, maintainable features including dynamic dashboards and interactive visualizations."
  },
  {
    type: "work",
    title: "Web Developer",
    company: "Tecnet Canada Inc.",
    location: "BC, Canada",
    period: "Feb 2014 – Oct 2015",
    description:
      "Contributed to rebuilding internal logistics platforms by developing React-based UI components, improving performance, supporting API integrations, implementing real-time tracking and notifications, and enhancing overall usability across workflows."
  },
  {
    type: "education",
    title: "Bachelor of Computer Science",
    company: "Douglas College",
    location: "BC, Canada",
    period: "Sep 2013 – Jun 2015",
    description:
      "Completed a 2-year IT program with hands-on experience in web development, programming, databases, and system analysis, building real projects and strengthening technical skills."
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

          <div className="flex flex-col gap-8 sm:gap-12 md:gap-16 w-full max-w-3xl mx-auto z-10">
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

