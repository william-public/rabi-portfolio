"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowUpRight, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

const blogPosts = [
  {
    id: 1,
    title: "How to Build a Flutter App with Clean Architecture",
    excerpt:
      "Learn how to structure your Flutter applications using Clean Architecture principles for better maintainability and testability.",
    image: "/placeholder.jpg",
    date: "Mar 15, 2023",
    readTime: "8 min read",
    url: "#",
  },
  {
    id: 2,
    title: "Mastering State Management in React",
    excerpt:
      "A comprehensive guide to different state management approaches in React applications, from Context API to Redux.",
    image: "/placeholder.jpg",
    date: "Feb 22, 2023",
    readTime: "10 min read",
    url: "#",
  },
  {
    id: 3,
    title: "UI/UX Design Principles Every Developer Should Know",
    excerpt:
      "Discover essential design principles that can help developers create more user-friendly and visually appealing interfaces.",
    image: "/placeholder.jpg",
    date: "Jan 10, 2023",
    readTime: "6 min read",
    url: "#",
  },
]

export function BlogSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="blog" className="py-20 relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-primary/5 rounded-full blur-[80px]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-16"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            My Blog
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-center">
            Latest <span className="text-gradient">Articles</span>
          </h2>

          <p className="text-center text-muted-foreground max-w-2xl mt-6">
            I share my knowledge and experiences through articles on development, design, and technology.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link href={post.url} className="block h-full">
                <div className="bg-card rounded-xl overflow-hidden h-full flex flex-col transition-transform duration-300 hover:-translate-y-2 gradient-border">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h3>

                    <p className="text-muted-foreground text-sm mb-6 flex-1">{post.excerpt}</p>

                    <div className="inline-flex items-center text-sm font-medium text-primary mt-auto">
                      Read More
                      <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y--1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button variant="outline" size="lg" className="rounded-full">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  )
}

