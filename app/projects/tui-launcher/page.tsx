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
  FolderTree,
  Layers,
  Zap,
  CheckSquare,
} from 'lucide-react';

export default function TUILauncherPage() {
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
              <Terminal className="h-8 w-8 text-primary" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="font-mono">TUI Application</Badge>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-mono font-bold mb-4 bg-gradient-to-r from-primary via-primary to-secondary text-transparent bg-clip-text terminal-glow">
            tui-launcher
          </h1>

          <p className="text-xl text-foreground/80 mb-8 font-mono">
            Organize and Launch Projects with Hierarchical Navigation
          </p>

          <p className="text-lg text-muted-foreground mb-8 max-w-4xl">
            Visual terminal launcher with tree navigation, multi-select spawning, and tmux integration
          </p>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="font-mono border-glow" asChild>
              <a href="https://github.com/GGPrompts/tui-launcher" target="_blank" rel="noopener noreferrer">
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
              "Hierarchical organization of projects, tools, and commands",
              "Multi-select spawning (spacebar selection, Enter to execute)",
              "Tmux integration with configurable layouts (quad splits, tiled)",
              "Context-aware execution adapting to existing sessions",
              "Project-scoped working directories",
              "Saved configuration profiles for complex setups"
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
            {['Go', 'Bubble Tea', 'Lipgloss', 'Bash'].map((tech, index) => (
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
                icon: <FolderTree className="h-5 w-5 text-primary" />,
                title: "Tree navigation for intuitive browsing",
                description: "Organize your projects hierarchically"
              },
              {
                icon: <Terminal className="h-5 w-5 text-primary" />,
                title: "Automatic tmux environment detection",
                description: "Seamlessly integrates with existing sessions"
              },
              {
                icon: <CheckSquare className="h-5 w-5 text-primary" />,
                title: "Batch launch support for multiple commands",
                description: "Start multiple projects with one action"
              },
              {
                icon: <Layers className="h-5 w-5 text-primary" />,
                title: "Configurable tmux layouts",
                description: "Quad splits, tiled, or custom arrangements"
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
              Hierarchical project launcher with tree navigation
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
              See tui-launcher with multi-select and tmux integration
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
            <a href="https://github.com/GGPrompts/tui-launcher" target="_blank" rel="noopener noreferrer">
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
