"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import { ClientOnly } from "./client-only"

// Define an interface for the star objects
interface StarProps {
  id: string;
  top: string;
  left: string;
  size: number;
  delay: number;
  duration: number;
}



export function TestimonialsSection() {
  
}

