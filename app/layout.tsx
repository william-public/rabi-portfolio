import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Poppins, Cormorant_Garamond, Bebas_Neue } from "next/font/google"
import { ThemeProvider } from "@/providers/theme-provider"
import { Navbar } from "@/components/navbar"
import { GlobalScrollIndicator } from "@/components/ui/global-scroll-indicator"
import { FaviconHelper } from "@/components/favicon-helper"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
})

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: "Tyler.B | Portfolio",
  description: "Frontend Developer & Flutter Developer specializing in creating engaging digital experiences",
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: { url: '/favicon.png', sizes: '192x192', type: 'image/png' }
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <FaviconHelper />
      </head>
      <body className={`${inter.variable} ${poppins.variable} ${cormorant.variable} ${bebas.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalScrollIndicator />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}