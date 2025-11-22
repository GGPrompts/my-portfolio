'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Play, Pause, Eye, Sparkles, Palette, Layers, Zap, Users, Star, ArrowRight, ChevronLeft, ChevronRight, Monitor, Smartphone, Tablet, Download, ExternalLink, Github, Maximize2 } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock data for visual showcase
const mockProject = {
  title: "Aurora Design System",
  tagline: "A Beautiful Component Library with Fluid Animations",
  description: "An elegant design system featuring glassmorphic components, fluid animations, and accessibility-first patterns.",
  demoVideo: "/demos/aurora-demo.mp4",
  liveUrl: "https://aurora-demo.vercel.app",
  githubUrl: "https://github.com/username/aurora",

  stats: [
    { label: "Components", value: 45, suffix: "+" },
    { label: "Weekly Downloads", value: 12500, suffix: "" },
    { label: "GitHub Stars", value: 3200, suffix: "" },
    { label: "Contributors", value: 28, suffix: "" },
  ],

  features: [
    {
      icon: Sparkles,
      title: "Fluid Animations",
      description: "Smooth, performant animations powered by Framer Motion",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Palette,
      title: "Themeable",
      description: "Full theme customization with CSS variables",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Layers,
      title: "Composable",
      description: "Build complex UIs from simple, reusable parts",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for performance with zero dependencies",
      color: "from-yellow-500 to-orange-500"
    }
  ],

  screenshots: [
    { url: "/screenshots/aurora-1.jpg", caption: "Dashboard Overview", aspect: "tall" },
    { url: "/screenshots/aurora-2.jpg", caption: "Component Library", aspect: "wide" },
    { url: "/screenshots/aurora-3.jpg", caption: "Color System", aspect: "square" },
    { url: "/screenshots/aurora-4.jpg", caption: "Typography Scale", aspect: "tall" },
    { url: "/screenshots/aurora-5.jpg", caption: "Animation Curves", aspect: "wide" },
    { url: "/screenshots/aurora-6.jpg", caption: "Dark Mode", aspect: "square" },
    { url: "/screenshots/aurora-7.jpg", caption: "Mobile View", aspect: "tall" },
    { url: "/screenshots/aurora-8.jpg", caption: "Forms & Inputs", aspect: "wide" },
  ],

  beforeAfter: [
    { before: "/screenshots/before-1.jpg", after: "/screenshots/after-1.jpg", label: "Dashboard Redesign" },
    { before: "/screenshots/before-2.jpg", after: "/screenshots/after-2.jpg", label: "Navigation Update" },
    { before: "/screenshots/before-3.jpg", after: "/screenshots/after-3.jpg", label: "Form Improvements" },
  ],

  testimonials: [
    {
      author: "Sarah Chen",
      role: "Lead Designer at TechCorp",
      avatar: "/avatars/sarah.jpg",
      content: "Aurora transformed our design workflow. The component quality and documentation are exceptional.",
      rating: 5
    },
    {
      author: "Mike Johnson",
      role: "Frontend Developer",
      avatar: "/avatars/mike.jpg",
      content: "Finally, a design system that developers actually enjoy using. The animations are buttery smooth!",
      rating: 5
    },
    {
      author: "Emma Wilson",
      role: "Product Manager",
      avatar: "/avatars/emma.jpg",
      content: "Our team ships 3x faster with Aurora. It's become an essential part of our stack.",
      rating: 5
    }
  ],

  timeline: [
    { date: "Jan 2024", event: "Initial Concept", description: "Started with 5 core components" },
    { date: "Mar 2024", event: "Beta Release", description: "20 components, 100+ early adopters" },
    { date: "Jun 2024", event: "v1.0 Launch", description: "45 components, full documentation" },
    { date: "Sep 2024", event: "Major Update", description: "Added animation presets, theme builder" },
    { date: "Nov 2024", event: "Community Growth", description: "3000+ stars, 28 contributors" },
  ],

  colorPalette: {
    primary: ["#10B981", "#059669", "#047857", "#065F46", "#064E3B"],
    secondary: ["#06B6D4", "#0891B2", "#0E7490", "#155E75", "#164E63"],
    accent: ["#8B5CF6", "#7C3AED", "#6D28D9", "#5B21B6", "#4C1D95"],
    neutral: ["#F9FAFB", "#F3F4F6", "#E5E7EB", "#D1D5DB", "#9CA3AF"],
  },

  designTokens: [
    { name: "Border Radius", values: ["0px", "4px", "8px", "12px", "16px", "24px"] },
    { name: "Spacing", values: ["4px", "8px", "16px", "24px", "32px", "48px"] },
    { name: "Shadow", values: ["sm", "md", "lg", "xl", "2xl", "inner"] },
  ]
}

// Animated counter component
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, value])

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

// Floating card component with cursor follow
function FloatingCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]))
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]))

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(event.clientX - centerX)
    y.set(event.clientY - centerY)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn("relative", className)}
    >
      <div style={{ transform: "translateZ(50px)" }}>
        {children}
      </div>
    </motion.div>
  )
}

// Before/After comparison slider
function BeforeAfterSlider({ before, after, label }: { before: string; after: string; label: string }) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percent)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return
    handleMove(e.touches[0].clientX)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('touchmove', handleTouchMove)
      document.addEventListener('mouseup', () => setIsDragging(false))
      document.addEventListener('touchend', () => setIsDragging(false))

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('mouseup', () => setIsDragging(false))
        document.removeEventListener('touchend', () => setIsDragging(false))
      }
    }
  }, [isDragging])

  return (
    <div className="relative group">
      <div
        ref={containerRef}
        className="relative w-full aspect-video rounded-xl overflow-hidden cursor-col-resize"
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* After image (full) */}
        <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
          <span className="text-4xl text-slate-600">After</span>
        </div>

        {/* Before image (clipped) */}
        <div
          className="absolute inset-0 bg-slate-900 flex items-center justify-center"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <span className="text-4xl text-slate-700">Before</span>
        </div>

        {/* Slider line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-emerald-400/80 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-emerald-400 rounded-full shadow-lg flex items-center justify-center">
            <ChevronLeft className="w-4 h-4 text-black absolute -left-0.5" />
            <ChevronRight className="w-4 h-4 text-black absolute -right-0.5" />
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full">
          <span className="text-xs text-white/80">Before</span>
        </div>
        <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full">
          <span className="text-xs text-white/80">After</span>
        </div>
      </div>
      <p className="text-center mt-3 text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

export default function ProjectVisualTemplate() {
  const { scrollYProgress } = useScroll()
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-zinc-950">
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/20 rounded-full"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      {/* Hero Section with Large Demo */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center px-4 py-20"
        style={{ scale: heroScale, opacity: heroOpacity }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4 border-emerald-400/30 text-emerald-400">
              <Sparkles className="w-3 h-3 mr-1" />
              Visual Showcase
            </Badge>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              {mockProject.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              {mockProject.tagline}
            </p>
          </motion.div>

          {/* Large Demo Video/Preview */}
          <FloatingCard className="relative">
            <Card className="glass border-emerald-400/20 overflow-hidden">
              <div className="relative aspect-video bg-black/50 group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl text-slate-700">Demo Video</div>
                </div>

                {/* Play button overlay */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <div className="w-24 h-24 rounded-full bg-emerald-400/20 backdrop-blur-sm flex items-center justify-center border border-emerald-400/30">
                    {isPlaying ? (
                      <Pause className="w-10 h-10 text-emerald-400" />
                    ) : (
                      <Play className="w-10 h-10 text-emerald-400 ml-1" />
                    )}
                  </div>
                </motion.button>

                {/* Device selector */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {[
                    { id: 'desktop' as const, icon: Monitor },
                    { id: 'tablet' as const, icon: Tablet },
                    { id: 'mobile' as const, icon: Smartphone },
                  ].map(({ id, icon: Icon }) => (
                    <motion.button
                      key={id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedDevice(id)}
                      className={cn(
                        "p-2 rounded-lg backdrop-blur-sm transition-colors",
                        selectedDevice === id
                          ? "bg-emerald-400/20 text-emerald-400 border border-emerald-400/30"
                          : "bg-black/20 text-white/60 border border-white/10 hover:text-white/80"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="p-6 flex flex-wrap gap-4">
                <Button className="bg-emerald-400 text-black hover:bg-emerald-300">
                  <Eye className="w-4 h-4 mr-2" />
                  Live Demo
                </Button>
                <Button variant="outline" className="border-emerald-400/30 text-emerald-400 hover:bg-emerald-400/10">
                  <Github className="w-4 h-4 mr-2" />
                  View Code
                </Button>
                <Button variant="outline" className="border-emerald-400/30 text-emerald-400 hover:bg-emerald-400/10">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </Card>
          </FloatingCard>
        </div>
      </motion.section>

      {/* Stats Dashboard */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-emerald-400"
          >
            Impact & Metrics
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProject.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <FloatingCard>
                  <Card className="glass border-emerald-400/20 p-6 text-center">
                    <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </Card>
                </FloatingCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights with Animations */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-emerald-400"
          >
            Key Features
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mockProject.features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <FloatingCard>
                    <Card className="glass border-emerald-400/20 p-8 group hover:border-emerald-400/40 transition-all">
                      <div className="flex items-start gap-6">
                        <div className={cn(
                          "w-16 h-16 rounded-xl flex items-center justify-center",
                          "bg-gradient-to-br shadow-lg",
                          feature.color
                        )}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2 text-emerald-400">{feature.title}</h3>
                          <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    </Card>
                  </FloatingCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Masonry Grid Gallery */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-emerald-400"
          >
            Visual Gallery
          </motion.h2>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {mockProject.screenshots.map((screenshot, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="break-inside-avoid"
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="relative group cursor-pointer"
                >
                  <Card className={cn(
                    "glass border-emerald-400/20 overflow-hidden",
                    screenshot.aspect === 'tall' && 'aspect-[3/4]',
                    screenshot.aspect === 'wide' && 'aspect-[16/9]',
                    screenshot.aspect === 'square' && 'aspect-square'
                  )}>
                    <div className="relative w-full h-full bg-gradient-to-br from-slate-800 to-slate-900">
                      <div className="absolute inset-0 flex items-center justify-center text-slate-700">
                        {screenshot.caption}
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          className="p-3 rounded-full bg-emerald-400/20 backdrop-blur-sm border border-emerald-400/30"
                        >
                          <Maximize2 className="w-6 h-6 text-emerald-400" />
                        </motion.div>
                      </div>
                    </div>
                  </Card>

                  {/* Caption */}
                  <p className="mt-3 text-sm text-center text-muted-foreground">
                    {screenshot.caption}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Comparisons */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-emerald-400"
          >
            Before & After
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {mockProject.beforeAfter.map((comparison, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <BeforeAfterSlider {...comparison} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Timeline */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-emerald-400"
          >
            Project Timeline
          </motion.h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-emerald-400/0 via-emerald-400/50 to-emerald-400/0" />

            <div className="space-y-12">
              {mockProject.timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={cn(
                    "flex items-center gap-8",
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  )}
                >
                  <div className="flex-1">
                    {index % 2 === 0 && (
                      <Card className="glass border-emerald-400/20 p-6">
                        <div className="text-sm text-emerald-400 mb-2">{item.date}</div>
                        <h3 className="text-lg font-bold mb-2">{item.event}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </Card>
                    )}
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.5)] relative z-10"
                  />

                  <div className="flex-1">
                    {index % 2 === 1 && (
                      <Card className="glass border-emerald-400/20 p-6">
                        <div className="text-sm text-emerald-400 mb-2">{item.date}</div>
                        <h3 className="text-lg font-bold mb-2">{item.event}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </Card>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* User Testimonials Carousel */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-emerald-400"
          >
            What Users Say
          </motion.h2>

          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {mockProject.testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Card className="glass border-emerald-400/20 p-8">
                      <div className="flex items-start gap-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex gap-1 mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 fill-emerald-400 text-emerald-400" />
                            ))}
                          </div>
                          <p className="text-lg mb-4 italic">"{testimonial.content}"</p>
                          <div>
                            <div className="font-bold">{testimonial.author}</div>
                            <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-emerald-400/30 text-emerald-400 hover:bg-emerald-400/10" />
            <CarouselNext className="border-emerald-400/30 text-emerald-400 hover:bg-emerald-400/10" />
          </Carousel>
        </div>
      </section>

      {/* Color Palette & Design System */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-emerald-400"
          >
            Design System
          </motion.h2>

          <Tabs defaultValue="colors" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8 bg-black/50 border border-emerald-400/20">
              <TabsTrigger value="colors" className="data-[state=active]:bg-emerald-400/20 data-[state=active]:text-emerald-400">
                Colors
              </TabsTrigger>
              <TabsTrigger value="typography" className="data-[state=active]:bg-emerald-400/20 data-[state=active]:text-emerald-400">
                Typography
              </TabsTrigger>
              <TabsTrigger value="tokens" className="data-[state=active]:bg-emerald-400/20 data-[state=active]:text-emerald-400">
                Tokens
              </TabsTrigger>
            </TabsList>

            <TabsContent value="colors">
              <div className="space-y-8">
                {Object.entries(mockProject.colorPalette).map(([name, colors]) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h3 className="text-lg font-bold mb-4 capitalize">{name} Palette</h3>
                    <div className="flex gap-4 flex-wrap">
                      {colors.map((color, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="group cursor-pointer"
                        >
                          <div
                            className="w-20 h-20 rounded-lg shadow-lg border border-white/10"
                            style={{ backgroundColor: color }}
                          />
                          <p className="text-xs text-center mt-2 text-muted-foreground group-hover:text-emerald-400 transition-colors">
                            {color}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="typography">
              <Card className="glass border-emerald-400/20 p-8">
                <div className="space-y-6">
                  <div>
                    <h1 className="text-6xl font-bold mb-2 text-emerald-400">Display Heading</h1>
                    <p className="text-sm text-muted-foreground">6xl / Bold / Line Height 1</p>
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold mb-2">Section Heading</h2>
                    <p className="text-sm text-muted-foreground">4xl / Bold / Line Height 1.2</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Subsection Heading</h3>
                    <p className="text-sm text-muted-foreground">2xl / Semibold / Line Height 1.3</p>
                  </div>
                  <div>
                    <p className="text-base mb-2">Body text lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <p className="text-sm text-muted-foreground">Base / Regular / Line Height 1.5</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Caption or secondary text</p>
                    <p className="text-sm text-muted-foreground">Small / Regular / Line Height 1.4</p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="tokens">
              <div className="space-y-8">
                {mockProject.designTokens.map((token) => (
                  <motion.div
                    key={token.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h3 className="text-lg font-bold mb-4">{token.name}</h3>
                    <div className="flex gap-4 flex-wrap">
                      {token.values.map((value, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          className="flex flex-col items-center gap-2"
                        >
                          {token.name === 'Border Radius' && (
                            <div
                              className="w-16 h-16 bg-emerald-400/20 border border-emerald-400/30"
                              style={{ borderRadius: value }}
                            />
                          )}
                          {token.name === 'Spacing' && (
                            <div className="flex items-end gap-1">
                              <div
                                className="bg-emerald-400/30 border-l-2 border-emerald-400"
                                style={{ width: value, height: '40px' }}
                              />
                            </div>
                          )}
                          {token.name === 'Shadow' && (
                            <Card className={cn(
                              "w-16 h-16 bg-black/50 border-emerald-400/20",
                              value === 'sm' && 'shadow-sm',
                              value === 'md' && 'shadow-md',
                              value === 'lg' && 'shadow-lg',
                              value === 'xl' && 'shadow-xl',
                              value === '2xl' && 'shadow-2xl',
                              value === 'inner' && 'shadow-inner'
                            )} />
                          )}
                          <p className="text-xs text-muted-foreground">{value}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Live Demo Embed Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-emerald-400"
          >
            Try It Live
          </motion.h2>

          <FloatingCard>
            <Card className="glass border-emerald-400/20 overflow-hidden">
              <div className="bg-black/30 border-b border-emerald-400/20 p-4">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex-1 flex items-center gap-2 px-4 py-1 bg-black/30 rounded-lg">
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{mockProject.liveUrl}</span>
                  </div>
                </div>
              </div>

              <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl text-slate-700 mb-4">Live Demo Embed</div>
                    <Button className="bg-emerald-400 text-black hover:bg-emerald-300">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open in New Tab
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </FloatingCard>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Ready to Build Something Beautiful?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of developers using {mockProject.title} to create stunning user interfaces.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button size="lg" className="bg-emerald-400 text-black hover:bg-emerald-300 group">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-emerald-400/30 text-emerald-400 hover:bg-emerald-400/10">
                <Github className="w-5 h-5 mr-2" />
                View on GitHub
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating cursor effect */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-50"
        animate={{
          background: `radial-gradient(600px circle at ${mouseX.get()}px ${mouseY.get()}px, rgba(16, 185, 129, 0.05), transparent 40%)`,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />
    </div>
  )
}