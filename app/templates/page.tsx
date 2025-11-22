'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SpaceBackground } from '@/components/SpaceBackground';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { BorderTrail } from '@/components/ui/border-trail';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Separator } from '@/components/ui/separator';
import {
  Code2,
  Eye,
  FileText,
  Layout,
  Monitor,
  Palette,
  Terminal,
  User,
  Zap,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Grid3x3,
  Clock,
  Layers
} from 'lucide-react';

// Template metadata
const templates = {
  projects: [
    {
      id: 'case-study',
      name: 'Case Study',
      path: '/templates/case-study',
      description: 'Deep project analysis with timeline, before/after comparison, and results metrics',
      icon: <FileText className="h-5 w-5" />,
      features: ['Timeline Process', 'Before/After Slider', 'Animated Counters', 'Image Gallery', 'Video Section'],
      bestFor: 'Client projects, portfolios, success stories',
      color: 'from-primary to-primary',
      preview: {
        sections: 11,
        animations: 'Very High',
        interactivity: 'High',
        dataVisualization: 'Medium'
      }
    },
    {
      id: 'api-docs',
      name: 'API Documentation',
      path: '/templates/api-docs',
      description: 'Interactive API documentation with code examples and live playground',
      icon: <Code2 className="h-5 w-5" />,
      features: ['Interactive Playground', 'Multi-language Examples', 'Rate Limiting', 'Status Codes', 'Version Selector'],
      bestFor: 'Developer tools, APIs, technical documentation',
      color: 'from-cyan-500 to-blue-500',
      preview: {
        sections: 9,
        animations: 'Medium',
        interactivity: 'Very High',
        dataVisualization: 'Low'
      }
    },
    {
      id: 'blog-post',
      name: 'Blog/Article',
      path: '/templates/blog-post',
      description: 'Technical blog with MDX support, TOC, and syntax highlighting',
      icon: <FileText className="h-5 w-5" />,
      features: ['Table of Contents', 'Code Highlighting', 'Copy Code', 'Social Share', 'Related Articles'],
      bestFor: 'Technical blogs, documentation, tutorials',
      color: 'from-purple-500 to-pink-500',
      preview: {
        sections: 8,
        animations: 'Medium',
        interactivity: 'High',
        dataVisualization: 'Low'
      }
    }
  ],
  dashboards: [
    {
      id: 'analytics',
      name: 'Analytics Dashboard',
      path: '/templates/dashboard',
      description: 'Comprehensive analytics with charts, metrics, and real-time data',
      icon: <Monitor className="h-5 w-5" />,
      features: ['Multiple Charts', 'KPI Cards', 'Data Tables', 'Date Range Picker', 'Export Data'],
      bestFor: 'SaaS analytics, business intelligence, metrics tracking',
      color: 'from-primary to-secondary',
      preview: {
        sections: 10,
        animations: 'High',
        interactivity: 'High',
        dataVisualization: 'Very High'
      }
    },
    {
      id: 'admin',
      name: 'Admin Dashboard',
      path: '/templates/admin-dashboard',
      description: 'Admin interface with data tables, user management, and system health',
      icon: <Layout className="h-5 w-5" />,
      features: ['Data Tables', 'User Management', 'Activity Feed', 'System Health', 'Quick Actions'],
      bestFor: 'Admin panels, CMS, internal tools',
      color: 'from-indigo-500 to-purple-500',
      preview: {
        sections: 9,
        animations: 'Medium',
        interactivity: 'Very High',
        dataVisualization: 'High'
      }
    },
    {
      id: 'user-profile',
      name: 'User Profile',
      path: '/templates/user-profile',
      description: 'GitHub-style profile with contribution graph and activity feed',
      icon: <User className="h-5 w-5" />,
      features: ['Contribution Graph', 'Activity Timeline', 'Achievements', 'Skills Matrix', 'Privacy Controls'],
      bestFor: 'User profiles, developer portfolios, social platforms',
      color: 'from-amber-500 to-orange-500',
      preview: {
        sections: 11,
        animations: 'Very High',
        interactivity: 'High',
        dataVisualization: 'Very High'
      }
    }
  ],
  landing: [
    {
      id: 'saas-landing',
      name: 'SaaS Landing Page',
      path: '/templates/saas-landing',
      description: 'High-converting SaaS landing page with pricing, testimonials, and CTAs',
      icon: <Zap className="h-5 w-5" />,
      features: ['Animated Hero', 'Pricing Cards', 'Testimonial Carousel', 'FAQ Accordion', 'Newsletter Form'],
      bestFor: 'SaaS products, startups, subscription services',
      color: 'from-primary to-secondary',
      preview: {
        sections: 14,
        animations: 'Very High',
        interactivity: 'High',
        dataVisualization: 'High'
      }
    },
    {
      id: 'pricing',
      name: 'Pricing Page',
      path: '/templates/pricing',
      description: 'Advanced pricing comparison with toggle, matrix table, and testimonials',
      icon: <Sparkles className="h-5 w-5" />,
      features: ['Monthly/Annual Toggle', 'Feature Matrix', '3D Card Hover', 'Currency Selector', 'FAQ Section'],
      bestFor: 'SaaS pricing, subscription plans, service tiers',
      color: 'from-cyan-500 to-blue-500',
      preview: {
        sections: 8,
        animations: 'High',
        interactivity: 'Very High',
        dataVisualization: 'Medium'
      }
    },
    {
      id: 'contact-hub',
      name: 'Contact Hub',
      path: '/templates/contact-hub',
      description: 'Multi-channel contact center with calendar booking and live chat',
      icon: <User className="h-5 w-5" />,
      features: ['Calendar Booking', 'Contact Form', 'Live Chat', 'Response Times', 'Emergency Contact'],
      bestFor: 'Business contact, support centers, booking systems',
      color: 'from-purple-500 to-pink-500',
      preview: {
        sections: 9,
        animations: 'High',
        interactivity: 'Very High',
        dataVisualization: 'Low'
      }
    }
  ],
  resumes: [
    {
      id: 'timeline',
      name: 'Timeline/Resume',
      path: '/templates/timeline',
      description: 'Career progression with interactive timeline, skills matrix, and testimonials',
      icon: <Clock className="h-5 w-5" />,
      features: ['Interactive Timeline', 'Skills Progress', 'Testimonials', 'PDF Export', 'Certifications'],
      bestFor: 'Professional applications, tech roles, career showcase',
      color: 'from-primary to-secondary',
      preview: {
        sections: 12,
        animations: 'Very High',
        interactivity: 'High',
        dataVisualization: 'Very High'
      }
    },
    {
      id: 'team',
      name: 'Team/About Us',
      path: '/templates/team',
      description: 'Company culture page with team grid, values, and timeline',
      icon: <User className="h-5 w-5" />,
      features: ['Team Grid', 'Company Timeline', 'Values Section', 'Office Gallery', 'Open Positions'],
      bestFor: 'Company pages, startup teams, agency portfolios',
      color: 'from-indigo-500 to-purple-500',
      preview: {
        sections: 10,
        animations: 'High',
        interactivity: 'Medium',
        dataVisualization: 'Medium'
      }
    }
  ],
  utility: [
    {
      id: 'changelog',
      name: 'Changelog',
      path: '/templates/changelog',
      description: 'Version history with timeline, release notes, and migration guides',
      icon: <FileText className="h-5 w-5" />,
      features: ['Version Timeline', 'Code Examples', 'Search/Filter', 'Subscription Options', 'Download Links'],
      bestFor: 'Product updates, release notes, version tracking',
      color: 'from-amber-500 to-orange-500',
      preview: {
        sections: 9,
        animations: 'Medium',
        interactivity: 'High',
        dataVisualization: 'Low'
      }
    },
    {
      id: 'settings',
      name: 'Settings Page',
      path: '/templates/settings',
      description: 'Comprehensive settings with appearance, privacy, and integrations',
      icon: <Layout className="h-5 w-5" />,
      features: ['Theme Selector', 'Privacy Controls', 'Integrations', 'Keyboard Shortcuts', 'Advanced Options'],
      bestFor: 'App settings, user preferences, configuration panels',
      color: 'from-cyan-500 to-blue-500',
      preview: {
        sections: 9,
        animations: 'Medium',
        interactivity: 'Very High',
        dataVisualization: 'Low'
      }
    },
    {
      id: 'search-results',
      name: 'Search Results',
      path: '/templates/search-results',
      description: 'Advanced search with filters, pagination, and code highlighting',
      icon: <Zap className="h-5 w-5" />,
      features: ['Advanced Filters', 'Code Search', 'Pagination', 'Search History', 'Grid/List View'],
      bestFor: 'Search interfaces, content discovery, documentation search',
      color: 'from-purple-500 to-pink-500',
      preview: {
        sections: 8,
        animations: 'Medium',
        interactivity: 'Very High',
        dataVisualization: 'Low'
      }
    },
    {
      id: 'docs-hub',
      name: 'Documentation Hub',
      path: '/templates/docs-hub',
      description: 'Central documentation portal with categories, search, and examples',
      icon: <FileText className="h-5 w-5" />,
      features: ['Category Grid', 'Doc Tree', 'Version Selector', 'Interactive Examples', 'Multi-language'],
      bestFor: 'Documentation sites, help centers, knowledge bases',
      color: 'from-primary to-secondary',
      preview: {
        sections: 12,
        animations: 'High',
        interactivity: 'High',
        dataVisualization: 'Medium'
      }
    },
    {
      id: '404',
      name: '404 Error',
      path: '/templates/404',
      description: 'Interactive terminal-themed 404 page with ASCII art and commands',
      icon: <Terminal className="h-5 w-5" />,
      features: ['ASCII Art', 'Glitch Effect', 'Terminal Commands', 'Matrix Background', 'Auto Redirect'],
      bestFor: 'Error pages, not found pages, creative 404s',
      color: 'from-red-500 to-orange-500',
      preview: {
        sections: 4,
        animations: 'Very High',
        interactivity: 'Interactive',
        dataVisualization: 'Low'
      }
    },
    {
      id: '500',
      name: '500 Error',
      path: '/templates/500',
      description: 'Kernel panic themed 500 error with system diagnostics',
      icon: <Terminal className="h-5 w-5" />,
      features: ['Kernel Panic', 'System Logs', 'Memory Dump', 'Recovery Terminal', 'Scanlines Effect'],
      bestFor: 'Server errors, system failures, technical error pages',
      color: 'from-red-600 to-red-500',
      preview: {
        sections: 4,
        animations: 'Very High',
        interactivity: 'Interactive',
        dataVisualization: 'Low'
      }
    }
  ]
};

// Preview card component
function TemplateCard({ template, type }: { template: any; type: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="glass-dark border-glow h-full relative overflow-hidden group">
        {isHovered && <BorderTrail />}

        {/* Gradient accent */}
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${template.color}`} />

        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${template.color} bg-opacity-20`}>
                {template.icon}
              </div>
              <div>
                <CardTitle className="font-mono text-xl">{template.name}</CardTitle>
                <CardDescription className="mt-1">{template.description}</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Features */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-mono uppercase">Features</p>
            <div className="flex flex-wrap gap-1">
              {template.features.map((feature: string) => (
                <Badge key={feature} variant="outline" className="text-xs font-mono">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          {/* Best For */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-mono uppercase">Best For</p>
            <p className="text-sm text-foreground/80">{template.bestFor}</p>
          </div>

          {/* Preview Stats */}
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(template.preview).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="font-mono text-primary">{String(value)}</span>
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="gap-2">
          <Link href={template.path} className="flex-1">
            <Button className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Eye className="h-4 w-4" />
              Preview
            </Button>
          </Link>
          <HoverCard openDelay={200}>
            <HoverCardTrigger asChild>
              <Button variant="outline" size="icon">
                <Zap className="h-4 w-4" />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent
              className="glass-overlay border-glow w-56"
              side="top"
              align="end"
              sideOffset={8}
            >
              <div className="space-y-2">
                <p className="font-mono font-semibold text-sm">Quick Actions</p>
                <div className="space-y-1 text-xs">
                  <p>• View in new tab</p>
                  <p>• Copy template code</p>
                  <p>• Download as component</p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default function TemplateShowcase() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <main className="min-h-screen relative">
      <SpaceBackground speed={0.3} opacity={0.5} />
      <ScrollProgress className="top-0 z-50" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge className="font-mono" variant="outline">
                <Sparkles className="h-3 w-3 mr-1" />
                16 Templates
              </Badge>
              <Badge className="font-mono bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0">
                50 Claude Projects
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-mono font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text terminal-glow">
              Template Gallery
            </h1>

            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Choose from professionally designed templates to showcase your projects and resume.
              Each template is optimized for different use cases and fully customizable.
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-6 md:gap-8 pt-8 flex-wrap">
              <div className="text-center">
                <p className="text-3xl font-mono font-bold text-primary">3</p>
                <p className="text-sm text-muted-foreground">Projects</p>
              </div>
              <Separator orientation="vertical" className="h-12 hidden md:block" />
              <div className="text-center">
                <p className="text-3xl font-mono font-bold text-primary">3</p>
                <p className="text-sm text-muted-foreground">Dashboards</p>
              </div>
              <Separator orientation="vertical" className="h-12 hidden md:block" />
              <div className="text-center">
                <p className="text-3xl font-mono font-bold text-primary">3</p>
                <p className="text-sm text-muted-foreground">Landing</p>
              </div>
              <Separator orientation="vertical" className="h-12 hidden md:block" />
              <div className="text-center">
                <p className="text-3xl font-mono font-bold text-primary">2</p>
                <p className="text-sm text-muted-foreground">Resumes</p>
              </div>
              <Separator orientation="vertical" className="h-12 hidden md:block" />
              <div className="text-center">
                <p className="text-3xl font-mono font-bold text-primary">5</p>
                <p className="text-sm text-muted-foreground">Utility</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 glass-dark">
              <TabsTrigger value="all" className="font-mono">
                <Layers className="h-4 w-4 mr-2" />
                All
              </TabsTrigger>
              <TabsTrigger value="projects" className="font-mono">
                <Monitor className="h-4 w-4 mr-2" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="resumes" className="font-mono">
                <User className="h-4 w-4 mr-2" />
                Resumes
              </TabsTrigger>
              <TabsTrigger value="landing" className="font-mono">
                <Zap className="h-4 w-4 mr-2" />
                Landing
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-12">
              <div>
                <h2 className="text-2xl font-mono font-bold mb-6 text-primary">Project Templates</h2>
                <div className="grid lg:grid-cols-3 gap-6">
                  {templates.projects.map((template) => (
                    <TemplateCard key={template.id} template={template} type="project" />
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-mono font-bold mb-6 text-primary">Dashboard Templates</h2>
                <div className="grid lg:grid-cols-3 gap-6">
                  {templates.dashboards.map((template) => (
                    <TemplateCard key={template.id} template={template} type="dashboard" />
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-mono font-bold mb-6 text-primary">Landing Pages</h2>
                <div className="grid lg:grid-cols-3 gap-6">
                  {templates.landing.map((template) => (
                    <TemplateCard key={template.id} template={template} type="landing" />
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-mono font-bold mb-6 text-primary">Resume Templates</h2>
                <div className="grid lg:grid-cols-3 gap-6">
                  {templates.resumes.map((template) => (
                    <TemplateCard key={template.id} template={template} type="resume" />
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-mono font-bold mb-6 text-primary">Utility Templates</h2>
                <div className="grid lg:grid-cols-3 gap-6">
                  {templates.utility.map((template) => (
                    <TemplateCard key={template.id} template={template} type="utility" />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="projects">
              <div className="grid lg:grid-cols-3 gap-6">
                {templates.projects.map((template) => (
                  <TemplateCard key={template.id} template={template} type="project" />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="resumes">
              <div className="grid lg:grid-cols-3 gap-6">
                {templates.resumes.map((template) => (
                  <TemplateCard key={template.id} template={template} type="resume" />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="landing">
              <div className="space-y-12">
                <div className="grid lg:grid-cols-3 gap-6">
                  {templates.landing.map((template) => (
                    <TemplateCard key={template.id} template={template} type="landing" />
                  ))}
                </div>
                <div>
                  <h2 className="text-xl font-mono font-bold mb-4 text-muted-foreground">Dashboards</h2>
                  <div className="grid lg:grid-cols-3 gap-6">
                    {templates.dashboards.map((template) => (
                      <TemplateCard key={template.id} template={template} type="dashboard" />
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-mono font-bold mb-4 text-muted-foreground">Utility Pages</h2>
                  <div className="grid lg:grid-cols-3 gap-6">
                    {templates.utility.map((template) => (
                      <TemplateCard key={template.id} template={template} type="utility" />
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Features Section */}
          <section className="mt-20 space-y-8">
            <h2 className="text-3xl font-mono font-bold text-center bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              Why These Templates?
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="glass-dark border-glow">
                <CardHeader>
                  <CheckCircle2 className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="font-mono">50 Projects Ready</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/80">
                    Designed specifically for showcasing your 50 Claude-built projects with categories for TUI, React, and xterm apps.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-dark border-glow">
                <CardHeader>
                  <Palette className="h-8 w-8 text-secondary mb-2" />
                  <CardTitle className="font-mono">Terminal Aesthetic</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/80">
                    Consistent terminal theme with glassmorphism, phosphor glow effects, and emerald/cyan color scheme throughout.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-dark border-glow">
                <CardHeader>
                  <Zap className="h-8 w-8 text-purple-500 mb-2" />
                  <CardTitle className="font-mono">Fully Interactive</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/80">
                    From terminal commands to floating cards, every template includes rich interactions and smooth animations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Call to Action */}
          <section className="mt-20 text-center">
            <Card className="glass-dark border-glow max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-mono font-bold mb-4 text-primary">Ready to Showcase Your Work?</h3>
                <p className="text-foreground/80 mb-6">
                  Choose a template and customize it with your projects. All templates are built with shadcn/ui components
                  and are fully customizable to match your style.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button size="lg" className="gap-2">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    View Documentation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </section>
    </main>
  );
}