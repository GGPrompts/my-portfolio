'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { SpaceBackground } from '@/components/SpaceBackground'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Github, Terminal } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Stars background */}
      <SpaceBackground speed={0.3} opacity={0.8} />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Logo and title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          {/* TabzChrome Logo */}
          <div className="mb-6 relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <Image
                src="/images/demo/tabz-logo-light.png"
                alt="TabzChrome Logo"
                width={120}
                height={120}
                className="drop-shadow-[0_0_30px_hsl(var(--primary)/0.5)]"
                priority
              />
              {/* Glow effect behind logo */}
              <div className="absolute inset-0 bg-primary/20 blur-2xl -z-10 rounded-full scale-150" />
            </motion.div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent">
              TabzChrome
            </span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8"
        >
          Full Linux terminals in your Chrome sidebar
        </motion.p>

        {/* Version badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          <Badge variant="outline" className="border-primary/30 text-primary px-3 py-1">
            v2.7.0
          </Badge>
          <Badge variant="outline" className="border-primary/30 text-primary px-3 py-1">
            Manifest V3
          </Badge>
          <Badge variant="outline" className="border-primary/30 text-primary px-3 py-1">
            <Terminal className="w-3 h-3 mr-1" />
            xterm.js
          </Badge>
        </motion.div>

        {/* GitHub button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <Button
            size="lg"
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary/10"
            asChild
          >
            <a
              href="https://github.com/GGPrompts/TabzChrome"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-5 h-5 mr-2" />
              View on GitHub
            </a>
          </Button>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative max-w-2xl mx-auto"
        >
          <div className="relative rounded-xl overflow-hidden border border-primary/20 shadow-[0_0_60px_hsl(var(--primary)/0.3)]">
            <Image
              src="/images/demo/hero-terminal.png"
              alt="TabzChrome - Glowing terminal in a cyberpunk cityscape"
              width={1024}
              height={1024}
              className="w-full h-auto"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* Floating cursor glow effect */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-20"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(var(--primary) / 0.05), transparent 40%)`,
        }}
      />
    </section>
  )
}
