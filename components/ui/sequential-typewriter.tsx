"use client"

import { TypewriterEffect } from "./typewriter-effect"

export const SequentialTypewriter = () => {
  const words = [
      { text: "Build SaaS Products.", className: "text-xl font-bold text-blue-500" },
      { text: "Design Scalable Systems.", className: "text-xl font-bold text-green-500" },
      { text: "Develop High-Quality Software.", className: "text-xl font-bold text-blue-500" },
      { text: "Deploy to the Cloud.", className: "text-xl font-bold text-amber-500" }
  ]

  return <TypewriterEffect words={words} />
}
