'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SpaceBackground } from '@/components/SpaceBackground';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Terminal,
  Code2,
  Github,
  ArrowLeft,
  Award,
  Monitor,
  Zap,
  Layers,
  Activity,
} from 'lucide-react';

export default function GGHubPage() {
  return (
    <main className="min-h-screen relative">
      <SpaceBackground speed={0.3} opacity={0.8} />

      <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 glass rounded-lg border-glow">
              <Monitor className="h-8 w-8 text-primary" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="font-mono">Web Application</Badge>
              <Badge className="font-mono bg-primary/20 text-primary border-primary/50">Featured</Badge>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-mono font-bold mb-4 bg-gradient-to-r from-primary via-primary to-secondary text-transparent bg-clip-text terminal-glow">
            gg-hub
          </h1>

          <p className="text-xl text-foreground/80 mb-8 font-mono">
            Manage 20 Projects with Integrated Terminals
          </p>

          <p className="text-lg text-muted-foreground mb-8 max-w-4xl">
            Terminal-first developer workspace with beautiful UI
          </p>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="font-mono border-glow" asChild>
              <a href="https://github.com/GGPrompts/gg-hub" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 mr-2" />
                View on GitHub
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-mono font-bold mb-8 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            Key Features
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Manages 20 projects (14 web apps + 6 TUI applications)",
              "Real-time status detection for running development servers",
              "Tabz terminal integration in resizable right sidebar",
              "Multi-terminal support with tmux session management",
              "Smart port management with automatic conflict resolution",
              "50+ developer commands in quick commands panel",
              "Green matrix-themed UI with smooth animations",
              "One-click actions for starting, stopping, and opening projects"
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-dark border-glow h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-foreground/80">{feature}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-mono font-bold mb-8 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            Tech Stack
          </h2>

          <div className="flex flex-wrap gap-3">
            {['React 19', 'TypeScript', 'Vite', 'Zustand', 'React Query', 'React Spring', 'xterm.js', 'tmux'].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Badge
                  variant="outline"
                  className="px-4 py-2 text-sm border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors font-mono"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-mono font-bold mb-8 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text flex items-center gap-3">
            <Award className="h-8 w-8 text-primary" />
            Project Highlights
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <Monitor className="h-5 w-5 text-primary" />,
                title: "Browser-based portfolio with integrated multi-terminal support",
                description: "Manage all your projects from one beautiful interface"
              },
              {
                icon: <Activity className="h-5 w-5 text-primary" />,
                title: "Session persistence through tmux",
                description: "Your terminals stay alive even after closing the browser"
              },
              {
                icon: <Layers className="h-5 w-5 text-primary" />,
                title: "Split pane modes: horizontal, vertical, window, and background",
                description: "Flexible layouts for any workflow"
              },
              {
                icon: <Zap className="h-5 w-5 text-primary" />,
                title: "Live preview capability for running projects",
                description: "See your changes in real-time"
              }
            ].map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass border-border/30 h-full">
                  <CardHeader>
                    <CardTitle className="font-mono text-lg flex items-center gap-2">
                      {highlight.icon}
                      {highlight.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{highlight.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-mono font-bold mb-8 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            Screenshots
          </h2>

          <Card className="glass border-border/30 p-12 text-center">
            <Code2 className="h-16 w-16 text-primary/50 mx-auto mb-4" />
            <p className="text-muted-foreground font-mono">Screenshots coming soon...</p>
            <p className="text-sm text-muted-foreground mt-2">
              Developer workspace with integrated terminals and project management
            </p>
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-mono font-bold mb-8 bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            Demo
          </h2>

          <Card className="glass border-border/30 p-12 text-center">
            <Terminal className="h-16 w-16 text-primary/50 mx-auto mb-4" />
            <p className="text-muted-foreground font-mono">Demo video coming soon...</p>
            <p className="text-sm text-muted-foreground mt-2">
              See gg-hub managing multiple projects with tmux integration
            </p>
          </Card>
        </motion.section>

        <Separator className="my-16 bg-border/30" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Button size="lg" className="font-mono border-glow" asChild>
            <a href="https://github.com/GGPrompts/gg-hub" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5 mr-2" />
              View on GitHub
            </a>
          </Button>
          <Button size="lg" variant="outline" className="font-mono" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Portfolio
            </Link>
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
