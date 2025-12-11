'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { SpaceBackground } from '@/components/SpaceBackground'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Kbd } from '@/components/ui/kbd'
import {
  Play, Pause, Terminal, Monitor, Globe, MousePointer,
  Camera, Code, Eye, ArrowRight, Github, ExternalLink,
  Chrome, Command, Settings, Keyboard, PanelRight, Search,
  Activity, Download, Network, FileDown, Volume2, Mic,
  Zap, Copy, CheckCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Project data for Tabz Chrome
const projectData = {
  title: "Tabz Chrome",
  tagline: "Give Claude Eyes, Hands, and Terminals — Right in Your Browser",
  description: "A Chrome extension with Windows Terminal simplicity — bash terminals with customizable profiles, always visible in your browser sidebar. Plus 20 MCP tools that give Claude eyes and hands: screenshots, clicks, form fills, network capture, and JavaScript execution.",
  demoVideo: "/demos/tabz-chrome-sora.mp4",
  githubUrl: "https://github.com/GGPrompts/TabzChrome",

  highlights: [
    "Terminals persist across all browser tabs via tmux",
    "Claude can screenshot, click, and fill forms in your browser",
    "Profiles with startup commands (lazygit, htop, npm run dev)",
    "Global working directory — profiles inherit automatically",
    "20 MCP tools for full browser automation",
    "Audio notifications with 20+ neural voices",
  ],

  stats: [
    { label: "Browser MCP Tools", value: 20, suffix: "" },
    { label: "Neural Voices", value: 20, suffix: "+" },
    { label: "Less Code vs Traditional", value: 40, suffix: "%" },
    { label: "Sync Bugs", value: 0, suffix: "" },
  ],
}

// Quick Start commands (clickable)
const quickStartCommands = [
  { command: 'git clone https://github.com/GGPrompts/TabzChrome.git', desc: 'Clone the repo' },
  { command: 'cd TabzChrome && npm install', desc: 'Install dependencies' },
  { command: 'npm run build:extension', desc: 'Build extension' },
  { command: 'cd backend && npm start', desc: 'Start backend (port 8129)' },
]

// Keyboard shortcuts - 4 pre-populated by Chrome, rest user-customizable
const keyboardShortcuts = [
  { action: 'New Terminal Tab (default profile)', keys: ['Alt', 'T'], preset: true },
  { action: 'Close Current Terminal Tab', keys: ['Alt', 'W'], preset: true },
  { action: 'Paste Selected Text to Terminal', keys: ['Alt', 'Shift', 'C'], preset: true },
  { action: 'Send Selected Text to Chat', keys: ['Alt', 'Shift', 'V'], preset: true },
]

// Additional shortcuts users can configure in chrome://extensions/shortcuts
const customizableShortcuts = [
  { action: 'Activate the Extension', keys: ['Not set'] },
  { action: 'Switch to Next Terminal Tab', keys: ['Not set'] },
  { action: 'Switch to Previous Terminal Tab', keys: ['Not set'] },
  { action: 'Switch to Terminal Tab 1-4', keys: ['Alt', '1-4'] },
  { action: 'Switch to Terminal Tab 5-9', keys: ['Not set'] },
]

// Terminal-specific shortcuts (work inside terminal)
const terminalShortcuts = [
  { action: 'Copy in Terminal', keys: ['Ctrl', 'Shift', 'C'] },
  { action: 'Paste in Terminal', keys: ['Ctrl', 'Shift', 'V'] },
]

// Status indicators
const statusIndicators = [
  { emoji: '🤖✅', label: 'Ready', description: 'System is prepared and waiting', example: '🤖✅ Ready' },
  { emoji: '🤖⏳', label: 'Thinking', description: 'Processing user request', example: '🤖⏳ Thinking...' },
  { emoji: '🤖🔧', label: 'Tool Use', description: 'Currently executing a tool', example: '🤖🔧 Edit: src/index.ts' },
]

// TUI Tools (clickable launchers)
const tuiTools = [
  { name: 'lazygit', command: 'lazygit', desc: 'Git TUI - stage, commit, push with keyboard', icon: '🦥' },
  { name: 'htop', command: 'htop', desc: 'Process monitor - CPU, memory, kill processes', icon: '📊' },
  { name: 'yazi', command: 'yazi', desc: 'File manager - vim motions, preview, bulk ops', icon: '📁' },
  { name: 'btop', command: 'btop', desc: 'Beautiful resource monitor', icon: '📈' },
  { name: 'ncdu', command: 'ncdu', desc: 'Disk usage analyzer', icon: '💾' },
  { name: 'tig', command: 'tig', desc: 'Git log viewer', icon: '🌳' },
]

// Common CLI commands
const commonCommands = [
  { category: 'Git', commands: [
    { name: 'git status', command: 'git status' },
    { name: 'git diff', command: 'git diff' },
    { name: 'git log --oneline -10', command: 'git log --oneline -10' },
  ]},
  { category: 'Development', commands: [
    { name: 'npm run dev', command: 'npm run dev' },
    { name: 'npm test', command: 'npm test' },
    { name: 'npm run build', command: 'npm run build' },
  ]},
  { category: 'System', commands: [
    { name: 'pwd', command: 'pwd' },
    { name: 'ls -la', command: 'ls -la' },
    { name: 'df -h', command: 'df -h' },
  ]},
]

// MCP Tools - all 20
const mcpTools = [
  { name: 'tabz_list_tabs', desc: 'List all open browser tabs', category: 'tabs' },
  { name: 'tabz_switch_tab', desc: 'Switch to specific tab by ID', category: 'tabs' },
  { name: 'tabz_rename_tab', desc: 'Label tabs for Claude to track', category: 'tabs' },
  { name: 'tabz_get_page_info', desc: 'Get current page URL and title', category: 'page' },
  { name: 'tabz_open_url', desc: 'Open URLs (GitHub, Vercel, localhost)', category: 'page' },
  { name: 'tabz_click', desc: 'Click elements by CSS selector', category: 'interaction' },
  { name: 'tabz_fill', desc: 'Fill form inputs with text', category: 'interaction' },
  { name: 'tabz_screenshot', desc: 'Capture viewport screenshots', category: 'capture' },
  { name: 'tabz_screenshot_full', desc: 'Capture entire scrollable page', category: 'capture' },
  { name: 'tabz_download_image', desc: 'Download images from pages', category: 'capture' },
  { name: 'tabz_get_element', desc: 'Inspect element HTML/CSS/bounds', category: 'inspect' },
  { name: 'tabz_execute_script', desc: 'Run JavaScript in page context', category: 'script' },
  { name: 'tabz_get_console_logs', desc: 'View browser console output', category: 'debug' },
  { name: 'tabz_enable_network_capture', desc: 'Start capturing network requests', category: 'network' },
  { name: 'tabz_get_network_requests', desc: 'List captured XHR/fetch requests', category: 'network' },
  { name: 'tabz_get_api_response', desc: 'Get full response body for request', category: 'network' },
  { name: 'tabz_clear_network_requests', desc: 'Clear captured requests', category: 'network' },
  { name: 'tabz_download_file', desc: 'Download any URL to disk', category: 'download' },
  { name: 'tabz_get_downloads', desc: 'List recent downloads with status', category: 'download' },
  { name: 'tabz_cancel_download', desc: 'Cancel in-progress download', category: 'download' },
]

// Audio features
const audioFeatures = [
  { feature: 'Ready Announcement', example: 'Claude Worker ready' },
  { feature: 'Tool Use Announcements', example: 'Edit: src/index.ts' },
  { feature: 'Session Start', example: 'Projects started' },
  { feature: 'Subagent Count', example: '3 agents running' },
]

// Omnibox commands
const omniboxCommands = [
  { command: 'term new', desc: 'Open new terminal' },
  { command: 'term profile:Projects', desc: 'Spawn with specific profile' },
  { command: 'term git status', desc: 'Run command in new terminal' },
  { command: 'term github.com/user/repo', desc: 'Open allowed URL' },
  { command: 'term localhost:3000', desc: 'Open dev server' },
  { command: 'term help', desc: 'Show available commands' },
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

// Terminal Z icon component
function TerminalZ({ className }: { className?: string }) {
  return (
    <span
      className={cn("inline-block w-[0.85em] h-[0.85em] align-baseline relative top-[0.25em]", className)}
      style={{
        background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.7) 50%, hsl(var(--primary) / 0.5) 100%)',
        WebkitMaskImage: 'url(/images/terminalz.png)',
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskImage: 'url(/images/terminalz.png)',
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
      }}
      aria-label="z"
    />
  )
}

// Clickable terminal command button
function TerminalCommand({
  command,
  children,
  className,
  variant = 'default'
}: {
  command: string
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'outline' | 'ghost'
}) {
  const [copied, setCopied] = useState(false)

  const handleClick = () => {
    // Copy to clipboard as fallback
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const baseStyles = "font-mono text-sm transition-all duration-200"
  const variantStyles = {
    default: "bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary px-3 py-1.5 rounded-md",
    outline: "border border-primary/20 hover:border-primary/40 hover:bg-primary/5 text-muted-foreground hover:text-primary px-2 py-1 rounded",
    ghost: "hover:bg-primary/10 text-muted-foreground hover:text-primary px-2 py-1 rounded",
  }

  return (
    <button
      data-terminal-command={command}
      onClick={handleClick}
      className={cn(baseStyles, variantStyles[variant], className)}
      title={`Click to copy: ${command}`}
      suppressHydrationWarning
    >
      {copied ? (
        <span className="flex items-center gap-1">
          <CheckCircle className="w-3 h-3" />
          Copied!
        </span>
      ) : children}
    </button>
  )
}

// Floating card with 3D hover
function FloatingCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0), y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]))
  const rotateY = useSpring(useTransform(x, [-100, 100], [-8, 8]))

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        x.set(e.clientX - rect.left - rect.width / 2)
        y.set(e.clientY - rect.top - rect.height / 2)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn("relative", className)}
    >
      <div style={{ transform: "translateZ(40px)" }}>{children}</div>
    </motion.div>
  )
}

// Styled kbd component
function StyledKbd({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Kbd
      className={cn(
        'bg-background/80 border border-border/50 text-foreground',
        'px-2 py-1 h-auto min-w-[2rem] text-sm font-mono',
        'shadow-[0_2px_0_0_hsl(var(--border)/0.5)]',
        className
      )}
    >
      {children}
    </Kbd>
  )
}

// Category icon mapping for MCP tools
function getMcpCategoryIcon(category: string) {
  const icons: Record<string, React.ReactNode> = {
    tabs: <PanelRight className="w-4 h-4" />,
    page: <Globe className="w-4 h-4" />,
    interaction: <MousePointer className="w-4 h-4" />,
    capture: <Camera className="w-4 h-4" />,
    inspect: <Eye className="w-4 h-4" />,
    script: <Code className="w-4 h-4" />,
    debug: <Terminal className="w-4 h-4" />,
    network: <Network className="w-4 h-4" />,
    download: <FileDown className="w-4 h-4" />,
  }
  return icons[category] || <Zap className="w-4 h-4" />
}

export default function TabzChromePage() {
  const { scrollYProgress } = useScroll()
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="min-h-screen relative">
      <SpaceBackground speed={0.3} opacity={0.8} />

      {/* Hero Section */}
      <motion.section
        className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20"
        style={{ scale: heroScale, opacity: heroOpacity }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              <Chrome className="w-3 h-3 mr-1" />
              Chrome Extension + MCP Server
            </Badge>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 gradient-text-theme">
              Tab<TerminalZ /> Chrome
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {projectData.tagline}
            </p>

            {/* Highlight pills */}
            <div className="flex flex-wrap justify-center gap-3">
              {projectData.highlights.map((highlight, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 px-3 py-1">
                    {highlight}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Demo Video */}
          <FloatingCard className="relative">
            <Card className="glass border-primary/20 overflow-hidden">
              <div className="relative aspect-video bg-black/50 group">
                <video
                  ref={videoRef}
                  src={projectData.demoVideo}
                  className="w-full h-full object-cover"
                  loop playsInline
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={togglePlay}
                  className={cn(
                    "absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity",
                    isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
                  )}
                >
                  <div className="w-24 h-24 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center border border-primary/30">
                    {isPlaying ? <Pause className="w-10 h-10 text-primary" /> : <Play className="w-10 h-10 text-primary ml-1" />}
                  </div>
                </motion.button>
              </div>

              <div className="p-6 flex flex-wrap gap-4">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Chrome className="w-4 h-4 mr-2" />
                  Get Extension
                </Button>
                <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10" asChild>
                  <a href={projectData.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View Source
                  </a>
                </Button>
                <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10" asChild>
                  <a href="https://ggprompts.github.io/TabzChrome/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Full Documentation
                  </a>
                </Button>
              </div>
            </Card>
          </FloatingCard>
        </div>
      </motion.section>

      {/* Quick Start Section - Interactive */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Quick Start
            </h2>
            <p className="text-muted-foreground">
              Click any command to copy • Commands work with TabzChrome sidebar
            </p>
          </motion.div>

          <Card className="glass border-primary/20">
            <CardContent className="p-6">
              <div className="bg-black/60 rounded-lg p-6 font-mono text-sm border border-primary/10">
                {quickStartCommands.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 mb-4 last:mb-0 group"
                  >
                    <span className="text-primary select-none">$</span>
                    <TerminalCommand command={item.command} variant="ghost" className="flex-1 text-left justify-start">
                      <span className="text-muted-foreground group-hover:text-primary transition-colors">
                        {item.command}
                      </span>
                    </TerminalCommand>
                    <span className="text-xs text-muted-foreground/60 hidden md:block">
                      {item.desc}
                    </span>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                v2.7.0 • Manifest V3 • xterm.js • tmux persistence
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Navigation - 6 Cards */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Features
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* MCP Tools Card */}
            <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Card className="glass border-primary/20 h-full hover:border-primary/40 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Eye className="w-5 h-5" />
                    20 MCP Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Browser automation for Claude Code. Screenshots, clicks, network capture, downloads, and more.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* TUI Tools Card */}
            <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <Card className="glass border-primary/20 h-full hover:border-primary/40 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Terminal className="w-5 h-5" />
                    TUI Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Launch lazygit, htop, yazi, and more directly from profiles. One-click terminal power tools.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Spawn API Card */}
            <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <Card className="glass border-primary/20 h-full hover:border-primary/40 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Zap className="w-5 h-5" />
                    Spawn API
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Spawn terminals programmatically via REST. Interactive Claude launcher included!
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Audio Card */}
            <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <Card className="glass border-primary/20 h-full hover:border-primary/40 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Volume2 className="w-5 h-5" />
                    Audio Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Neural TTS announces Claude status. 20+ voices, per-profile settings, adjustable rate.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Omnibox Card */}
            <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.4 }}>
              <Card className="glass border-primary/20 h-full hover:border-primary/40 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Search className="w-5 h-5" />
                    Omnibox Commands
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Type "term" in Chrome address bar. Quick terminal spawning, URL opening, command execution.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Status Indicators Card */}
            <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.5 }}>
              <Card className="glass border-primary/20 h-full hover:border-primary/40 transition-colors">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Activity className="w-5 h-5" />
                    Live Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Tab names show real-time Claude status with working files. 🤖✅ Ready, 🤖⏳ Thinking, 🤖🔧 Tool Use.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Keyboard Shortcuts & Status Indicators */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Keyboard Shortcuts */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="glass border-primary/20 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Keyboard className="w-5 h-5" />
                    Keyboard Shortcuts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Pre-set shortcuts */}
                  <div>
                    <p className="text-xs text-primary mb-2 font-medium">Pre-configured (4 Chrome limit)</p>
                    <div className="space-y-2">
                      {keyboardShortcuts.map((shortcut) => (
                        <motion.div
                          key={shortcut.action}
                          variants={itemVariants}
                          className="flex items-center justify-between gap-4"
                        >
                          <span className="text-sm text-muted-foreground">
                            {shortcut.action}
                          </span>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            {shortcut.keys.map((key, i) => (
                              <span key={key} className="flex items-center">
                                <StyledKbd>{key}</StyledKbd>
                                {i < shortcut.keys.length - 1 && (
                                  <span className="text-muted-foreground mx-0.5">+</span>
                                )}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Terminal shortcuts */}
                  <div>
                    <p className="text-xs text-primary mb-2 font-medium">Inside Terminal</p>
                    <div className="space-y-2">
                      {terminalShortcuts.map((shortcut) => (
                        <motion.div
                          key={shortcut.action}
                          variants={itemVariants}
                          className="flex items-center justify-between gap-4"
                        >
                          <span className="text-sm text-muted-foreground">
                            {shortcut.action}
                          </span>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            {shortcut.keys.map((key, i) => (
                              <span key={key} className="flex items-center">
                                <StyledKbd>{key}</StyledKbd>
                                {i < shortcut.keys.length - 1 && (
                                  <span className="text-muted-foreground mx-0.5">+</span>
                                )}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground/70 pt-2 border-t border-primary/10">
                    More shortcuts available at chrome://extensions/shortcuts
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Status Indicators */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="glass border-primary/20 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Activity className="w-5 h-5" />
                    Claude Code Status Indicators
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {statusIndicators.map((status) => (
                    <motion.div
                      key={status.label}
                      variants={itemVariants}
                      className="flex items-start gap-4"
                    >
                      <Badge
                        variant="outline"
                        className="border-primary/30 bg-primary/5 text-lg px-3 py-1.5 font-normal whitespace-nowrap"
                      >
                        {status.emoji}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-foreground">
                          {status.label}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {status.description}
                        </div>
                        <code className="text-xs text-primary/70 mt-1 block">
                          Tab: {status.example}
                        </code>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TUI Tools Section - Interactive */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              TUI Tools
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Click to copy launch commands • Set up as TabzChrome profiles for one-click access
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tuiTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="glass border-primary/20 hover:border-primary/40 transition-all group">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{tool.icon}</span>
                      <div className="flex-1 min-w-0">
                        <TerminalCommand command={tool.command} variant="default" className="mb-1">
                          {tool.name}
                        </TerminalCommand>
                        <p className="text-xs text-muted-foreground">{tool.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Commands Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Common Commands
            </h2>
            <p className="text-muted-foreground">
              Click to copy • Works with data-terminal-command for TabzChrome integration
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {commonCommands.map((category, idx) => (
              <motion.div
                key={category.category}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="glass border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-primary text-lg">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {category.commands.map((cmd, index) => (
                      <motion.div key={cmd.name} variants={itemVariants}>
                        <TerminalCommand command={cmd.command} variant="outline" className="w-full text-left justify-start">
                          <span className="text-primary mr-2">$</span>
                          {cmd.command}
                        </TerminalCommand>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MCP Tools Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              20 MCP Tools for Claude
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Full browser automation via Model Context Protocol
            </p>
          </motion.div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-black/50 border border-primary/20 flex-wrap h-auto gap-1 p-2 mb-8">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                All Tools
              </TabsTrigger>
              <TabsTrigger value="capture" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <Camera className="w-3 h-3 mr-1" /> Capture
              </TabsTrigger>
              <TabsTrigger value="interaction" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <MousePointer className="w-3 h-3 mr-1" /> Interaction
              </TabsTrigger>
              <TabsTrigger value="network" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <Network className="w-3 h-3 mr-1" /> Network
              </TabsTrigger>
              <TabsTrigger value="tabs" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <PanelRight className="w-3 h-3 mr-1" /> Tabs
              </TabsTrigger>
            </TabsList>

            {['all', 'capture', 'interaction', 'network', 'tabs'].map(tabValue => (
              <TabsContent key={tabValue} value={tabValue}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {mcpTools
                    .filter(tool => tabValue === 'all' || tool.category === tabValue)
                    .map((tool, index) => (
                      <motion.div
                        key={tool.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <Card className="glass border-primary/20 p-4 hover:border-primary/40 transition-all group h-full">
                          <div className="flex items-start gap-3">
                            <div className="text-primary/60 group-hover:text-primary transition-colors mt-0.5">
                              {getMcpCategoryIcon(tool.category)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <code className="text-sm text-primary font-mono group-hover:text-cyan-400 transition-colors block mb-1">
                                {tool.name}
                              </code>
                              <p className="text-xs text-muted-foreground">{tool.desc}</p>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Audio & Omnibox Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Audio Notifications */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="glass border-primary/20 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Volume2 className="w-5 h-5" />
                    Audio Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Neural TTS announces Claude status events with 20+ voices (edge-tts)
                  </p>
                  {audioFeatures.map((item, index) => (
                    <motion.div
                      key={item.feature}
                      variants={itemVariants}
                      className="flex items-center justify-between gap-4 p-3 bg-black/30 rounded-lg border border-primary/10"
                    >
                      <span className="text-sm text-foreground">{item.feature}</span>
                      <code className="text-xs text-primary/70 font-mono">"{item.example}"</code>
                    </motion.div>
                  ))}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="outline" className="border-primary/20 text-xs">Random voice assignment</Badge>
                    <Badge variant="outline" className="border-primary/20 text-xs">Adjustable speech rate</Badge>
                    <Badge variant="outline" className="border-primary/20 text-xs">Per-profile settings</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Omnibox Commands */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="glass border-primary/20 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Search className="w-5 h-5" />
                    Omnibox Commands
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Type <code className="text-primary">term</code> in Chrome address bar, then:
                  </p>
                  <div className="space-y-2">
                    {omniboxCommands.map((item, index) => (
                      <motion.div
                        key={item.command}
                        variants={itemVariants}
                        className="flex items-center gap-3 p-2 bg-black/30 rounded-lg border border-primary/10"
                      >
                        <code className="text-sm text-primary font-mono flex-shrink-0">{item.command}</code>
                        <span className="text-xs text-muted-foreground">— {item.desc}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {projectData.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass border-primary/20 p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text-theme">
              Give Claude Superpowers
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stop copy-pasting screenshots. Stop switching windows. Let Claude see and interact with your browser while your terminals stay right where you need them.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 group">
                <Chrome className="w-5 h-5 mr-2" />
                Install Extension
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/10" asChild>
                <a href={projectData.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 mr-2" />
                  Star on GitHub
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating cursor glow effect */}
      <motion.div className="pointer-events-none fixed inset-0 z-30" style={{ background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(var(--primary) / 0.05), transparent 40%)` }} />
    </div>
  )
}
