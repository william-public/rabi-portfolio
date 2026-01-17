"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

// Define the tech icons data
const techIcons = [
  {
    name: "Flutter",
    icon: "/tech/flutter.svg",
    color: "#0D47A1",
    position: { top: 0, left: "20%" },
    delay: 0,
  },
  {
    name: "React",
    icon: "/tech/react.svg",
    color: "#61DAFB",
    position: { top: 0, left: "35%" },
    delay: 0.1,
  },
  {
    name: "CSS",
    icon: "/tech/css.svg",
    color: "#264DE4",
    position: { top: 0, left: "50%" },
    delay: 0.2,
  },
  {
    name: "Node.js",
    icon: "/tech/nodejs.svg",
    color: "#339933",
    position: { top: 0, left: "65%" },
    delay: 0.3,
  },
  {
    name: "JavaScript",
    icon: "/tech/javascript.svg",
    color: "#F7DF1E",
    position: { top: 0, left: "80%" },
    delay: 0.4,
  },
  {
    name: "XD",
    icon: "/tech/xd.svg",
    color: "#FF61F6",
    position: { top: "20%", left: "25%" },
    delay: 0.5,
  },
  {
    name: "Next.js",
    icon: "/tech/nextjs.svg",
    color: "#000000",
    position: { top: "20%", left: "45%" },
    delay: 0.6,
  },
  {
    name: "GraphQL",
    icon: "/tech/graphql.svg",
    color: "#E535AB",
    position: { top: "20%", left: "65%" },
    delay: 0.7,
  },
  {
    name: "Illustrator",
    icon: "/tech/illustrator.svg",
    color: "#FF9A00",
    position: { top: "30%", left: "35%" },
    delay: 0.8,
  },
  {
    name: "Figma",
    icon: "/tech/figma.svg",
    color: "#F24E1E",
    position: { top: "30%", left: "55%" },
    delay: 0.9,
  },
  {
    name: "Framer",
    icon: "/tech/framer.svg",
    color: "#0055FF",
    position: { top: "30%", left: "75%" },
    delay: 1.0,
  },
]

export function TechIcons() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <div className="relative w-full max-w-4xl h-full">
      {/* Central logo with glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-primary rounded-full blur-xl opacity-50"></div>
          <div className="relative bg-primary w-24 h-24 rounded-full flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 5L35 30H5L20 5Z" stroke="white" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Orbital rings with animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative w-[500px] h-[300px]">
          <div className="absolute inset-0 border border-primary/20 rounded-[100%] transform rotate-12 animate-pulse"></div>
          <div
            className="absolute inset-0 border border-primary/10 rounded-[100%] scale-110 transform -rotate-6 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute inset-0 border border-primary/5 rounded-[100%] scale-125 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
      </motion.div>

      {/* Small tech icons around the orbital */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative w-[500px] h-[300px]">
          {Array(12)
            .fill(0)
            .map((_, i) => {
              const angle = i * 30 * (Math.PI / 180)
              const x = 250 + 220 * Math.cos(angle)
              const y = 150 + 120 * Math.sin(angle)
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="absolute w-2 h-2 bg-primary/30 rounded-full"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                  }}
                ></motion.div>
              )
            })}
        </div>
      </div>

      {/* Technology icons */}
      {techIcons.map((tech, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: tech.delay + 0.5 }}
          className="absolute"
          style={{
            top: tech.position.top,
            left: tech.position.left,
          }}
        >
          <div className="flex flex-col items-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-2 p-2"
              style={{ backgroundColor: tech.color }}
            >
              <Image
                src={tech.icon || "/placeholder.svg"}
                alt={tech.name}
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
            <div
              className="h-20 w-px"
              style={{ background: `linear-gradient(to bottom, ${tech.color}, transparent)` }}
            ></div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

