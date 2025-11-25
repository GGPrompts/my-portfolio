'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  Terminal,
  Globe,
  Code2,
  Puzzle,
  Gamepad2,
  Star,
  GitFork,
  ExternalLink,
  Github,
  ArrowRight
} from 'lucide-react';
import { allProjects, type Project } from '@/lib/projects-data';

const categoryIcons = {
  'TUI Application': Terminal,
  'Web Application': Globe,
  'Developer Tools': Code2,
  'Browser Extension': Puzzle,
  'Template': Code2,
  'Game': Gamepad2,
};

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(allProjects.map((p) => p.category)));
    return ['all', ...cats];
  }, []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesSearch =
        searchQuery === '' ||
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === 'all' || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

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
            <h1 className="text-4xl md:text-6xl font-bold mb-6 terminal-glow">
              <span className="gradient-text-theme">
                All Projects
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              A comprehensive collection of {allProjects.length}+ production-ready projects spanning
              terminal applications, web apps, developer tools, and more.
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search projects, technologies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 glass border-primary/30"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          {/* Category Filters */}
          <div className="mb-8 overflow-x-auto pb-2">
            <TabsList className="glass inline-flex w-auto min-w-full md:min-w-0 h-auto p-1 gap-1">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="data-[state=active]:glass-dark data-[state=active]:border-glow px-4 py-2.5 rounded-lg transition-all capitalize"
                >
                  {category === 'all' ? 'All Projects' : category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Results Count */}
          <div className="mb-6 text-center">
            <p className="text-sm text-muted-foreground">
              Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
            </p>
          </div>

          {/* Projects Grid */}
          <TabsContent value={selectedCategory} className="mt-0">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} itemVariants={item} />
              ))}
            </motion.div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-16">
                <Search className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-xl text-muted-foreground mb-2">No projects found</p>
                <p className="text-sm text-muted-foreground/60">
                  Try adjusting your search or filter
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}

function ProjectCard({ project, itemVariants }: { project: Project; itemVariants: any }) {
  const CategoryIcon = categoryIcons[project.category] || Code2;
  const githubLink = project.links.find((link) => link.type === 'github');
  const demoLink = project.links.find((link) => link.type === 'demo');

  return (
    <motion.div variants={itemVariants}>
      <Link href={`/projects/${project.id}`} className="block h-full">
        <Card className="glass border-white/10 h-full flex flex-col group hover:border-primary/30 transition-all duration-300 cursor-pointer">
          <CardHeader>
            <div className="flex items-start justify-between mb-2">
              <CardTitle className="text-xl font-mono font-bold text-primary group-hover:terminal-glow transition-all">
                {project.name}
              </CardTitle>
              <CategoryIcon className="w-5 h-5 text-primary/60 flex-shrink-0" />
            </div>
            <CardDescription className="text-sm font-mono text-primary">
              {project.tagline}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col flex-grow">
            {/* Description */}
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {project.techStack.slice(0, 4).map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs border-primary/30">
                    {tech}
                  </Badge>
                ))}
                {project.techStack.length > 4 && (
                  <Badge variant="outline" className="text-xs border-primary/20">
                    +{project.techStack.length - 4}
                  </Badge>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                {/* Stats */}
                {project.stats && (
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {project.stats.stars !== undefined && (
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {project.stats.stars}
                      </div>
                    )}
                    {project.stats.forks !== undefined && (
                      <div className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" />
                        {project.stats.forks}
                      </div>
                    )}
                  </div>
                )}

                {/* Quick Links */}
                <div className="flex items-center gap-2">
                  {githubLink && (
                    <button
                      type="button"
                      className="p-1.5 glass-dark rounded hover:scale-110 transition-transform"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open(githubLink.url, '_blank', 'noopener,noreferrer');
                      }}
                    >
                      <Github className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {demoLink && (
                    <button
                      type="button"
                      className="p-1.5 glass-dark rounded hover:scale-110 transition-transform"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (demoLink.url.startsWith('http')) {
                          window.open(demoLink.url, '_blank', 'noopener,noreferrer');
                        } else {
                          window.location.href = demoLink.url;
                        }
                      }}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <div className="p-1.5 text-primary">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
