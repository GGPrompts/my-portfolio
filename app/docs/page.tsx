'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SpaceBackground } from '@/components/SpaceBackground';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Search,
  Terminal,
  Cpu,
  Globe,
  Smartphone,
  Star,
  TrendingUp,
  Clock,
  BookOpen,
  ArrowRight,
  Github,
  ExternalLink,
  FileText,
} from 'lucide-react';
import { docsCategories, featuredDocs, docStats } from '@/lib/docs-data';

export default function DocsHub() {
  const [searchQuery, setSearchQuery] = useState('');

  const iconMap: Record<string, any> = {
    Terminal,
    Cpu,
    Globe,
    Smartphone,
  };

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
    <main className="min-h-screen relative">
      <SpaceBackground speed={0.5} opacity={1} />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6 border-glow">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-mono text-foreground/80">
                DEVELOPER REFERENCE DOCS
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-mono font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 text-transparent bg-clip-text terminal-glow">
                Documentation Hub
              </span>
            </h1>

            <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-8">
              Comprehensive reference guides for TUI tools, AI APIs, browser extensions, and terminal development.
              Built from real-world usage and production experience.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {[
                { label: 'Articles', value: docStats.totalArticles },
                { label: 'Categories', value: docStats.totalCategories },
                { label: 'Total Views', value: docStats.totalViews },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-mono font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-foreground/60 font-mono">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Search */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <Input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-6 glass border-primary/20 text-lg font-mono"
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Featured Docs */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-mono font-bold text-foreground">
                Featured Documentation
              </h2>
            </div>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          >
            {featuredDocs.map((doc) => (
              <motion.div key={doc.articleId} variants={item}>
                <Link href={`/docs/${doc.categoryId}#${doc.articleId}`}>
                  <Card className="glass border-white/10 h-full group hover:border-primary/30 transition-all duration-300 hover:scale-105">
                    <div className="p-6">
                      {doc.trending && (
                        <div className="flex items-center gap-1 mb-3">
                          <TrendingUp className="w-4 h-4 text-primary" />
                          <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                            Trending
                          </Badge>
                        </div>
                      )}
                      <h3 className="text-xl font-mono font-bold text-primary mb-2 group-hover:terminal-glow transition-all">
                        {doc.title}
                      </h3>
                      <p className="text-foreground/70 mb-4 text-sm">
                        {doc.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-foreground/50 font-mono">
                        <div className="flex items-center gap-3">
                          <span>{doc.views} views</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {doc.time}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Documentation Categories */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-mono font-bold text-foreground mb-6">
              Browse by Category
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {docsCategories.map((category) => {
              const Icon = iconMap[category.icon];
              return (
                <motion.div key={category.id} variants={item}>
                  <Card className="glass border-white/10 h-full group hover:border-primary/30 transition-all duration-300">
                    <div className="p-8">
                      {/* Category Header */}
                      <div className="flex items-start gap-4 mb-6">
                        <div className={`p-3 glass-dark rounded-lg bg-gradient-to-br ${category.color}`}>
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-mono font-bold text-foreground mb-2">
                            {category.title}
                          </h3>
                          <p className="text-foreground/60 text-sm">
                            {category.description}
                          </p>
                        </div>
                      </div>

                      {/* Articles */}
                      <div className="space-y-3 mb-6">
                        {category.articles.slice(0, 5).map((article) => (
                          <Link
                            key={article.id}
                            href={`/docs/${category.id}#${article.id}`}
                            className="block"
                          >
                            <div className="flex items-start gap-3 p-3 glass-dark rounded hover:border-primary/20 border border-transparent transition-all group/article">
                              <FileText className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-mono text-sm text-foreground group-hover/article:text-primary transition-colors">
                                    {article.title}
                                  </span>
                                  {article.featured && (
                                    <Star className="w-3 h-3 text-primary flex-shrink-0" />
                                  )}
                                </div>
                                <p className="text-xs text-foreground/50 line-clamp-1">
                                  {article.description}
                                </p>
                                {article.tags && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {article.tags.slice(0, 3).map((tag) => (
                                      <Badge
                                        key={tag}
                                        variant="outline"
                                        className="text-xs border-primary/20"
                                      >
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* View All */}
                      <Link href={`/docs/${category.id}`}>
                        <Button
                          variant="outline"
                          className="w-full glass-dark border-primary/20 hover:border-primary/40 font-mono"
                        >
                          View All {category.articles.length} Articles
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Quick Links */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Link href="https://github.com/GGPrompts" target="_blank" rel="noopener noreferrer">
              <Card className="glass border-white/10 p-6 text-center hover:border-primary/30 transition-all hover:scale-105">
                <Github className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-mono font-bold mb-2">GitHub</h3>
                <p className="text-sm text-foreground/60">
                  Browse 45+ open source projects
                </p>
              </Card>
            </Link>

            <Link href="/#projects">
              <Card className="glass border-white/10 p-6 text-center hover:border-primary/30 transition-all hover:scale-105">
                <Terminal className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-mono font-bold mb-2">Projects</h3>
                <p className="text-sm text-foreground/60">
                  See these tools in action
                </p>
              </Card>
            </Link>

            <Link href="/templates">
              <Card className="glass border-white/10 p-6 text-center hover:border-primary/30 transition-all hover:scale-105">
                <ExternalLink className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-mono font-bold mb-2">Templates</h3>
                <p className="text-sm text-foreground/60">
                  Explore UI template library
                </p>
              </Card>
            </Link>
          </div>
        </section>

        {/* Footer Note */}
        <section className="container mx-auto px-4 py-16 text-center">
          <Card className="glass border-primary/20 max-w-3xl mx-auto p-8">
            <Terminal className="w-12 h-12 text-primary mx-auto mb-4 terminal-glow" />
            <h3 className="text-2xl font-mono font-bold mb-3">
              Documentation From Experience
            </h3>
            <p className="text-foreground/70 mb-4">
              These guides are built from real-world usage across 45+ projects.
              All tools documented here are actively used in production development.
            </p>
            <p className="text-sm text-foreground/50 font-mono">
              Last updated: {docStats.lastUpdated}
            </p>
          </Card>
        </section>
      </div>
    </main>
  );
}
