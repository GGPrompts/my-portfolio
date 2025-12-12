'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Kbd } from '@/components/ui/kbd'
import { Search, Terminal, FolderOpen, GitBranch, Globe, Server, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const omniboxCommands = [
  {
    command: 'term new',
    description: 'Open new terminal with default profile',
    icon: Terminal,
  },
  {
    command: 'term profile:Projects',
    description: 'Spawn terminal with specific profile',
    icon: FolderOpen,
  },
  {
    command: 'term git status',
    description: 'Run command in new terminal',
    icon: GitBranch,
  },
  {
    command: 'term github.com/user/repo',
    description: 'Open allowed URL in browser',
    icon: Globe,
  },
  {
    command: 'term localhost:3000',
    description: 'Open dev server',
    icon: Server,
  },
  {
    command: 'term help',
    description: 'Show available commands',
    icon: HelpCircle,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
}

export default function OmniboxCommands() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-16"
    >
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          <Search className="inline-block w-8 h-8 mr-3 mb-1" />
          Omnibox Commands
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Type{' '}
          <Kbd className="bg-background/80 border-border/50 text-primary px-2 py-0.5 mx-1">
            term
          </Kbd>{' '}
          in Chrome&apos;s address bar, then{' '}
          <Kbd className="bg-background/80 border-border/50 text-muted-foreground px-2 py-0.5 mx-1">
            Space
          </Kbd>{' '}
          or{' '}
          <Kbd className="bg-background/80 border-border/50 text-muted-foreground px-2 py-0.5 mx-1">
            Tab
          </Kbd>
        </p>
      </div>

      {/* Commands Card */}
      <Card className="glass border-primary/20 max-w-3xl mx-auto">
        <CardHeader className="border-b border-primary/10">
          {/* Fake Chrome Omnibox */}
          <div className="flex items-center gap-3 bg-black/30 rounded-full px-4 py-2.5 border border-border/30">
            <Search className="w-4 h-4 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary text-xs px-2 py-0.5">
                term
              </Badge>
              <span className="text-muted-foreground text-sm">Search TabzChrome or type a command</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="divide-y divide-border/20"
          >
            {omniboxCommands.map((cmd) => (
              <motion.div
                key={cmd.command}
                variants={itemVariants}
                className="flex items-center gap-4 px-6 py-4 hover:bg-primary/5 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <cmd.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <code className="text-primary font-mono text-sm">{cmd.command}</code>
                  <p className="text-xs text-muted-foreground mt-0.5">{cmd.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.section>
  )
}
