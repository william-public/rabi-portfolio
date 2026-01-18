"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, MapPin, Phone, Github, Linkedin, Instagram } from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { GlowingCursor } from "@/components/glowing-cursor"

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      value: "muhammedrabikhan@gmail.com",
      link: "mailto:muhammedrabikhan@gmail.com",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      value: "+1 (647) 917-7225",
      link: "tel:+16479177225",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      value: "BC, Canada",
      link: "https://maps.google.com/?q=BC,Canada",
    },
  ]

  const socials = [
    {
      name: "LinkedIn",
      url: "www.linkedin.com/in/tyler-berkson-6586b2294",
      icon: <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />,
    },

    {
      name: "Email",
      url: "muhammedrabikhan@gmail.com",
      icon: <Mail className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />,
    },
  ]

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24 relative overflow-hidden">
      {/* Animated blurred background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-8 sm:mb-12 md:mb-16"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 via-blue-500/20 to-cyan-500/20 text-primary text-xs sm:text-sm font-semibold mb-3 sm:mb-4 shadow backdrop-blur-sm tracking-wide animate-gradient-move">
            <span className="inline-flex items-center gap-1 sm:gap-2">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse"></span>
              Let's Connect
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-poppins text-center mb-2">
            Get In <span className="text-gradient animate-gradient-move">Touch</span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-center text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl mt-3 sm:mt-6 px-3 sm:px-0"
          >
            Feel free to reach out for any questions, collaborations, or just to say hi. I’m always open to new ideas and opportunities!
          </motion.p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-card/70 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl h-full border border-primary/10">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6">Contact Information</h3>
              <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                {contactInfo.map((item, index) => (
                  <a key={index} href={item.link} className="flex items-start gap-3 sm:gap-4 group">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shadow-lg">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-xs text-muted-foreground">{item.title}</h4>
                      <p className="text-xs sm:text-sm md:text-base font-medium group-hover:text-primary transition-colors">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
              <div>
                <h3 className="text-lg sm:text-lg md:text-xl font-bold mb-3 sm:mb-4">Social Profiles</h3>
                <div className="flex gap-2 sm:gap-4 flex-wrap">
                  {socials.map((s, idx) => (
                    <motion.a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors shadow-lg relative group"
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      whileTap={{ scale: 0.95 }}
                      title={s.name}
                    >
                      {s.icon}
                      <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 text-[10px] sm:text-xs bg-black/80 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        {s.name}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative"
          >
            <GlowingCursor />
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

