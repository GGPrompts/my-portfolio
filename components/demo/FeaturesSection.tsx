'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import {
  Terminal, PanelRight, Settings, MousePointer, Keyboard, Command,
  Camera, Code, Eye, Globe, Monitor, Download, Network, FileSearch
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Terminal features data
const terminalFeatures = [
  {
    icon: PanelRight,
    title: "Sidebar Persistence",
    description: "Terminal sessions stay visible across all browser tabs — no window juggling",
    color: "from-primary to-emerald-500"
  },
  {
    icon: Terminal,
    title: "Hybrid Persistence",
    description: "Chrome storage for UI state + tmux for processes. Sessions survive everything.",
    color: "from-cyan-500 to-blue-500"
  },
  {
    icon: Settings,
    title: "Smart Directory Inheritance",
    description: "Set a global working directory in the header. Profiles without explicit directories inherit it.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: MousePointer,
    title: "Send Text to Terminal",
    description: "Right-click any selected text on a webpage and paste it directly to your terminal",
    color: "from-red-500 to-pink-500"
  },
  {
    icon: Keyboard,
    title: "Keyboard Shortcuts",
    description: "Ctrl+Shift+9 opens sidebar. Ctrl+Shift+C/V for copy/paste in terminals.",
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: Command,
    title: "Profiles Management",
    description: "Add, edit, and delete profiles with working directory, startup command, font, and theme.",
    color: "from-yellow-500 to-orange-500"
  },
]

// MCP tools features data - 20 tools total
const mcpFeatures = [
  {
    icon: Camera,
    title: "Screenshot Capture",
    description: "Viewport or full-page screenshots. Claude can see exactly what you see.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Code,
    title: "Script Execution",
    description: "Execute JavaScript in any tab — read DOM, get localStorage, extract data",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: MousePointer,
    title: "Click & Fill Forms",
    description: "Click buttons, fill forms, interact with pages through natural language",
    color: "from-primary to-emerald-500"
  },
  {
    icon: Eye,
    title: "Element Inspector",
    description: "Get computed CSS styles, bounds, and HTML for any element",
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: Globe,
    title: "Tab Management",
    description: "List, switch, rename, and open URLs across multiple browser tabs",
    color: "from-red-500 to-pink-500"
  },
  {
    icon: Network,
    title: "Network Capture",
    description: "Monitor API calls, capture requests, and inspect response bodies",
    color: "from-cyan-500 to-blue-500"
  },
  {
    icon: Monitor,
    title: "Console Access",
    description: "Read browser console logs for debugging — errors, warnings, all levels",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Download,
    title: "Downloads API",
    description: "Download files from URLs, track progress, and manage download queue",
    color: "from-emerald-500 to-teal-500"
  },
  {
    icon: FileSearch,
    title: "Page Info",
    description: "Get current page URL, title, favicon — know exactly where Claude is looking",
    color: "from-violet-500 to-purple-500"
  },
]

// Staggered animation container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

// Card animation
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const
    }
  }
}

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  color: string
}

function FeatureCard({ icon: Icon, title, description, color }: FeatureCardProps) {
  return (
    <motion.div variants={cardVariants}>
      <Card className="glass border-primary/20 p-6 h-full group hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)]">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br shadow-lg",
          "group-hover:scale-110 transition-transform duration-300",
          color
        )}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-bold mb-2 text-primary">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </Card>
    </motion.div>
  )
}

export default function FeaturesSection() {
  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Terminal Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              <Terminal className="inline-block w-8 h-8 mr-3 mb-1" />
              Terminal Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A full Linux terminal experience right in your browser sidebar
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {terminalFeatures.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </motion.div>
        </motion.div>

        {/* AI Automation Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="my-16 flex justify-center"
        >
          <div className="relative max-w-xl rounded-xl overflow-hidden border border-primary/20 shadow-[0_0_40px_hsl(var(--primary)/0.2)]">
            <Image
              src="/images/demo/features-robots.png"
              alt="AI robot hands typing on keyboards - browser automation"
              width={576}
              height={384}
              className="w-full h-auto"
            />
          </div>
        </motion.div>

        {/* MCP Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              <Eye className="inline-block w-8 h-8 mr-3 mb-1" />
              MCP Tools
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              20 browser automation tools that give Claude eyes and hands
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {mcpFeatures.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
