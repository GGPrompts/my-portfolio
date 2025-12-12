'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Kbd } from '@/components/ui/kbd'
import { Keyboard, Activity, Terminal } from 'lucide-react'
import { cn } from '@/lib/utils'

// Keyboard shortcuts data from TabzChrome documentation
const keyboardShortcuts = [
  { action: 'Open new terminal tab', keys: ['Alt', 'T'] },
  { action: 'Close terminal tab', keys: ['Alt', 'W'] },
  { action: 'Paste to terminal', keys: ['Alt', 'V'] },
  { action: 'Send to chat', keys: ['Alt', 'C'] },
  { action: 'Copy in terminal', keys: ['Ctrl', 'Shift', 'C'] },
  { action: 'Paste in terminal', keys: ['Ctrl', 'Shift', 'V'] },
]

// Claude Code status indicators
const statusIndicators = [
  { emoji: '🤖✅', label: 'Ready', description: 'System is prepared and waiting' },
  { emoji: '🤖⏳', label: 'Thinking', description: 'Processing user request' },
  { emoji: '🤖🔧', label: 'Tool Use', description: 'Currently executing a tool or function' },
]

// Example tab names showing real-time status
const exampleTabNames = [
  '🤖🔧 Edit: src/index.ts',
  '🤖🔧 Read: package.json',
  '🤖⏳ Bash: npm test',
  '🤖✅ Claude Worker',
]

// Quick start installation steps
const quickStartSteps = [
  'git clone https://github.com/GGPrompts/TabzChrome.git',
  'cd TabzChrome && npm install',
  'npm run build:extension',
  'cd backend && npm start  # Server runs on port 8129',
]

// Animation variants for staggered fade-in
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

// Styled kbd component with theme-aware styling
function StyledKbd({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Kbd
      className={cn(
        'bg-background/80 border border-border/50 text-foreground',
        'px-2 py-1 h-auto min-w-[2rem] text-sm font-mono',
        'shadow-[0_2px_0_0_hsl(var(--border)/0.5)] hover:shadow-[0_1px_0_0_hsl(var(--border)/0.5)]',
        'hover:translate-y-[1px] transition-all duration-75',
        className
      )}
    >
      {children}
    </Kbd>
  )
}

export default function ReferenceSection() {
  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Quick Reference
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to get started with TabzChrome
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
              <CardContent className="space-y-3">
                {keyboardShortcuts.map((shortcut, index) => (
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
                  Claude Code Status
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1">
                  Tab names show real-time Claude status with the file being worked on
                </p>
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
                    </div>
                  </motion.div>
                ))}

                {/* Example Tab Names */}
                <motion.div variants={itemVariants} className="pt-4 border-t border-border/20">
                  <div className="text-xs font-medium text-muted-foreground mb-2">Example Tab Names</div>
                  <div className="flex flex-wrap gap-2">
                    {exampleTabNames.map((name, index) => (
                      <code
                        key={index}
                        className="text-xs bg-black/30 border border-primary/20 rounded px-2 py-1 text-primary font-mono"
                      >
                        {name}
                      </code>
                    ))}
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Start */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Card className="glass border-primary/20 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Terminal className="w-5 h-5" />
                  Quick Start
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-black/50 rounded-lg p-4 font-mono text-sm overflow-x-auto border border-primary/10">
                  {quickStartSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-start gap-2 mb-2 last:mb-0"
                    >
                      <span className="text-primary select-none">$</span>
                      <code className="text-muted-foreground break-all">
                        {step}
                      </code>
                    </motion.div>
                  ))}
                </div>
                <motion.p
                  variants={itemVariants}
                  className="text-xs text-muted-foreground mt-4"
                >
                  v2.7.0 • Manifest V3 • xterm.js
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
