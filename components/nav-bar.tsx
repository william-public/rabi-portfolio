import { motion } from "framer-motion"
import { ScrollProgress } from "@/components/scroll-progress"

export function NavBar() {
  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <header className="navbar">
      <ScrollProgress />
      <nav>
        {navLinks.map((link, index) => (
          <motion.a
            key={link.href}
            href={link.href}
            className="nav-link hover-lift"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={(e) => {
              e.preventDefault()
              const target = document.querySelector(link.href)
              if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            }}
          >
            {link.label}
          </motion.a>
        ))}
      </nav>
    </header>
  )
}