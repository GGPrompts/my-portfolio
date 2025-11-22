'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { SpaceBackground } from '@/components/SpaceBackground';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Search,
  Home,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Menu,
  X,
  Terminal,
  Cpu,
  Globe,
  Smartphone,
  BookOpen,
  Hash,
} from 'lucide-react';

interface DocContentProps {
  category: {
    id: string;
    title: string;
    description: string;
    icon: string;
  };
  content: string;
}

export function DocContent({ category, content }: DocContentProps) {
  const router = useRouter();
  const [tocOpen, setTocOpen] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([]);

  const iconMap: Record<string, any> = {
    Terminal,
    Cpu,
    Globe,
    Smartphone,
  };

  const Icon = iconMap[category.icon];

  // Extract headings for table of contents
  useEffect(() => {
    const lines = content.split('\n');
    const extractedHeadings: Array<{ id: string; text: string; level: number }> = [];

    lines.forEach((line) => {
      const match = line.match(/^(#{1,6})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2];
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-');
        extractedHeadings.push({ id, text, level });
      }
    });

    setHeadings(extractedHeadings);
  }, [content]);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="min-h-screen relative">
      <SpaceBackground speed={0.5} opacity={1} />

      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-white/10 glass-overlay sticky top-0 z-20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/docs">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <ChevronLeft className="w-4 h-4" />
                    Back to Docs
                  </Button>
                </Link>
                <div className="h-6 w-px bg-white/10" />
                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-primary" />
                  <h1 className="text-xl font-mono font-bold">{category.title}</h1>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative w-64 hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/40" />
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 glass border-primary/20 font-mono text-sm"
                  />
                </div>

                {/* TOC Toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTocOpen(!tocOpen)}
                  className="gap-2"
                >
                  {tocOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                  <span className="hidden md:inline">Contents</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8 relative">
            {/* Main Content */}
            <div className={`flex-1 transition-all ${tocOpen ? 'mr-80' : 'mr-0'}`}>
              <Card className="glass border-white/10 p-8 md:p-12">
                <article className="prose prose-invert prose-emerald max-w-none">
                  <ReactMarkdown
                    components={{
                      // Headings with IDs for linking
                      h1: ({ children }) => {
                        const text = String(children);
                        const id = text
                          .toLowerCase()
                          .replace(/[^a-z0-9\s-]/g, '')
                          .replace(/\s+/g, '-');
                        return (
                          <h1 id={id} className="group scroll-mt-20">
                            <a href={`#${id}`} className="flex items-center gap-2 no-underline">
                              {children}
                              <Hash className="w-6 h-6 opacity-0 group-hover:opacity-50 transition-opacity" />
                            </a>
                          </h1>
                        );
                      },
                      h2: ({ children }) => {
                        const text = String(children);
                        const id = text
                          .toLowerCase()
                          .replace(/[^a-z0-9\s-]/g, '')
                          .replace(/\s+/g, '-');
                        return (
                          <h2 id={id} className="group scroll-mt-20">
                            <a href={`#${id}`} className="flex items-center gap-2 no-underline">
                              {children}
                              <Hash className="w-5 h-5 opacity-0 group-hover:opacity-50 transition-opacity" />
                            </a>
                          </h2>
                        );
                      },
                      h3: ({ children }) => {
                        const text = String(children);
                        const id = text
                          .toLowerCase()
                          .replace(/[^a-z0-9\s-]/g, '')
                          .replace(/\s+/g, '-');
                        return (
                          <h3 id={id} className="group scroll-mt-20">
                            <a href={`#${id}`} className="flex items-center gap-2 no-underline">
                              {children}
                              <Hash className="w-4 h-4 opacity-0 group-hover:opacity-50 transition-opacity" />
                            </a>
                          </h3>
                        );
                      },
                      // Code blocks with syntax highlighting
                      code({ inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        const codeString = String(children).replace(/\n$/, '');

                        if (!inline && match) {
                          return (
                            <div className="relative group">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => handleCopy(codeString)}
                              >
                                {copiedCode === codeString ? (
                                  <Check className="w-4 h-4" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </Button>
                              <SyntaxHighlighter
                                style={vscDarkPlus}
                                language={match[1]}
                                PreTag="div"
                                className="rounded-lg !bg-black/50"
                                {...props}
                              >
                                {codeString}
                              </SyntaxHighlighter>
                            </div>
                          );
                        }

                        return (
                          <code className="glass-dark px-2 py-1 rounded text-sm font-mono" {...props}>
                            {children}
                          </code>
                        );
                      },
                      // Links
                      a: ({ href, children }) => (
                        <a
                          href={href}
                          className="text-primary hover:text-primary/80 underline"
                          target={href?.startsWith('http') ? '_blank' : undefined}
                          rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {children}
                        </a>
                      ),
                      // Tables
                      table: ({ children }) => (
                        <div className="overflow-x-auto">
                          <table className="w-full">{children}</table>
                        </div>
                      ),
                    }}
                  >
                    {content}
                  </ReactMarkdown>
                </article>
              </Card>

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <Link href="/docs">
                  <Button variant="outline" className="gap-2 glass border-primary/20">
                    <ChevronLeft className="w-4 h-4" />
                    Back to Docs Hub
                  </Button>
                </Link>
                <Link href="/#projects">
                  <Button variant="outline" className="gap-2 glass border-primary/20">
                    View Projects
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Table of Contents Sidebar */}
            {tocOpen && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="hidden lg:block w-80 fixed right-4 top-32 bottom-4"
              >
                <Card className="glass border-white/10 h-full flex flex-col">
                  <div className="p-4 border-b border-white/10">
                    <h2 className="font-mono font-bold flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-primary" />
                      Contents
                    </h2>
                  </div>
                  <ScrollArea className="flex-1">
                    <div className="p-4 space-y-1">
                      {headings.map((heading, i) => (
                        <button
                          key={i}
                          onClick={() => scrollToHeading(heading.id)}
                          className={`block w-full text-left text-sm hover:text-primary transition-colors ${
                            heading.level === 1
                              ? 'font-bold text-foreground'
                              : heading.level === 2
                              ? 'pl-4 text-foreground/80'
                              : 'pl-8 text-foreground/60'
                          }`}
                        >
                          {heading.text}
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
