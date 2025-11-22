'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Star, Play, Code2, Terminal } from 'lucide-react';
import { getTUIProjects, type Project } from '@/lib/projects-data';

export default function PlaygroundPage() {
  const tuiProjects = getTUIProjects();
  const [selectedProject, setSelectedProject] = useState(tuiProjects[0]?.id || '');

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full glass border-glow">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Interactive TUI Playground</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 terminal-glow">
              <span className="bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
                Terminal User Interfaces
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore a collection of beautiful, interactive terminal applications built with{' '}
              <span className="text-primary font-semibold">Bubbletea</span> and{' '}
              <span className="text-primary font-semibold">Lipgloss</span>.
              Experience the power and elegance of modern TUI development.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-primary" />
                <span>{tuiProjects.length} TUI Applications</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-primary" />
                <span>Production Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-primary" />
                <span>Cross Platform</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Playground Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <Tabs
          value={selectedProject}
          onValueChange={setSelectedProject}
          className="w-full"
        >
          {/* Tabs List - Horizontal Scroll on Mobile */}
          <div className="mb-8 overflow-x-auto pb-2">
            <TabsList className="glass inline-flex w-auto min-w-full md:min-w-0 h-auto p-1 gap-1">
              {tuiProjects.map((project) => (
                <TabsTrigger
                  key={project.id}
                  value={project.id}
                  className="data-[state=active]:glass-dark data-[state=active]:border-glow px-4 py-2.5 rounded-lg transition-all"
                >
                  <span className="font-mono text-sm">{project.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {tuiProjects.map((project) => (
              <TabsContent key={project.id} value={project.id} className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectDemo project={project} />
                </motion.div>
              </TabsContent>
            ))}
          </AnimatePresence>
        </Tabs>
      </section>
    </div>
  );
}

function ProjectDemo({ project }: { project: Project }) {
  const githubLink = project.links.find((link) => link.type === 'github');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Project Info */}
      <div className="lg:col-span-1 space-y-6">
        {/* Project Overview */}
        <Card className="glass border-glow">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary">
              {project.name}
            </CardTitle>
            <CardDescription className="text-base">
              {project.tagline}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="outline" className="font-mono text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* GitHub Link */}
            {githubLink && (
              <div className="pt-2">
                <Button asChild className="w-full gap-2" variant="default">
                  <a
                    href={githubLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4" />
                    View on GitHub
                    {project.stats?.stars && (
                      <span className="ml-auto flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        {project.stats.stars}
                      </span>
                    )}
                  </a>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Key Features */}
        <Card className="glass border-glow">
          <CardHeader>
            <CardTitle className="text-lg">Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {project.keyFeatures.slice(0, 6).map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-primary mt-1">▸</span>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Demo & Code */}
      <div className="lg:col-span-2 space-y-6">
        {/* Demo Area */}
        <Card className="glass-dark border-glow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Play className="w-5 h-5 text-primary" />
                Live Demo
              </CardTitle>
              <Badge variant="secondary" className="font-mono">
                Coming Soon
              </Badge>
            </div>
            <CardDescription>
              Interactive terminal emulator will be integrated here
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for TUI Player */}
            <div className="relative aspect-video rounded-lg bg-black/50 border border-border/50 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <Terminal className="w-16 h-16 text-primary/30 mx-auto" />
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground font-mono">
                      Terminal emulator integration in progress
                    </p>
                    <p className="text-xs text-muted-foreground/60">
                      Will support xterm.js with asciinema recordings
                    </p>
                  </div>
                </div>
              </div>

              {/* Terminal-like decoration */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-card/80 backdrop-blur-sm border-b border-border/50 flex items-center gap-2 px-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/50" />
                  <div className="w-3 h-3 rounded-full bg-primary/30" />
                  <div className="w-3 h-3 rounded-full bg-primary/50" />
                </div>
                <span className="text-xs text-muted-foreground font-mono ml-4">
                  {project.name}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Was Built */}
        <Card className="glass border-glow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" />
              How It Was Built
            </CardTitle>
            <CardDescription>
              Architecture and implementation details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="space-y-3">
                {project.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-primary/5 border border-primary/20"
                  >
                    <p className="text-sm text-foreground">{highlight}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Code Snippet Placeholder */}
            <div className="mt-4">
              <div className="rounded-lg bg-black/80 border border-border/50 p-4 font-mono text-sm">
                <div className="text-muted-foreground/60 mb-2">// Main implementation</div>
                <div className="space-y-1">
                  <div className="text-primary">package main</div>
                  <div className="pl-4 text-foreground/80">
                    import (
                  </div>
                  <div className="pl-8 text-secondary">"github.com/charmbracelet/bubbletea"</div>
                  <div className="pl-8 text-secondary">"github.com/charmbracelet/lipgloss"</div>
                  <div className="pl-4 text-foreground/80">)</div>
                  <div className="text-muted-foreground/60 mt-2">// ...</div>
                </div>
              </div>
              <div className="flex justify-end mt-2">
                {githubLink && (
                  <Button variant="ghost" size="sm" asChild className="gap-2">
                    <a
                      href={githubLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Full Source
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
