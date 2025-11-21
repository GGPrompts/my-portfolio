'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { BorderTrail } from '@/components/ui/border-trail';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { TextMorph } from '@/components/ui/text-morph';
import { GlowEffect } from '@/components/ui/glow-effect';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function StyleGuide() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-zinc-950 py-20 px-4">
      <ScrollProgress className="top-0" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-6xl font-mono font-bold mb-4 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text terminal-glow">
            Style Guide
          </h1>
          <p className="text-xl text-foreground/80">
            Terminal-themed components for Matt's Portfolio
          </p>
        </div>

        {/* Typography & Colors */}
        <Section title="Typography & Colors" id="typography">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="glass border-glow">
              <CardHeader>
                <CardTitle className="font-mono">Font Families</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">JetBrains Mono (Headings)</p>
                  <h2 className="text-4xl font-mono font-bold">The Quick Brown Fox</h2>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Inter (Body)</p>
                  <p className="text-lg">The quick brown fox jumps over the lazy dog</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-glow">
              <CardHeader>
                <CardTitle className="font-mono">Color Palette</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-primary border-glow" />
                  <div>
                    <p className="font-mono text-sm">Primary</p>
                    <p className="text-xs text-muted-foreground">Terminal Green/Cyan</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-secondary border-glow" />
                  <div>
                    <p className="font-mono text-sm">Secondary</p>
                    <p className="text-xs text-muted-foreground">Teal Accent</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded bg-background border border-border" />
                  <div>
                    <p className="font-mono text-sm">Background</p>
                    <p className="text-xs text-muted-foreground">Very Dark Slate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Buttons & Badges */}
        <Section title="Buttons & Badges" id="buttons">
          <Card className="glass border-glow">
            <CardHeader>
              <CardTitle className="font-mono">Button Variants</CardTitle>
              <CardDescription>All button styles with terminal theme</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-3 font-mono">Default</p>
                <div className="flex flex-wrap gap-2">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground mb-3 font-mono">Glassmorphic Buttons</p>
                <div className="flex flex-wrap gap-2">
                  <button className="px-6 py-3 glass rounded-lg hover:scale-105 transition-transform border-glow">
                    Glass Light
                  </button>
                  <button className="px-6 py-3 glass-dark rounded-lg hover:scale-105 transition-transform border-glow">
                    Glass Dark
                  </button>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground mb-3 font-mono">Badge Variants</p>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge className="font-mono text-xs">Next.js</Badge>
                  <Badge className="font-mono text-xs" variant="secondary">TypeScript</Badge>
                  <Badge className="font-mono text-xs" variant="outline">React</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* Cards & Containers */}
        <Section title="Cards & Containers" id="cards">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-glow">
              <CardHeader>
                <CardTitle className="font-mono">Standard Card</CardTitle>
                <CardDescription>Default shadcn card styling</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This uses the standard card component with terminal theme colors.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Action</Button>
              </CardFooter>
            </Card>

            <Card className="glass border-glow">
              <CardHeader>
                <CardTitle className="font-mono">Glass Card</CardTitle>
                <CardDescription>Glassmorphic styling</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Uses .glass utility for frosted effect with glow.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Action</Button>
              </CardFooter>
            </Card>

            <Card className="glass-dark border-glow relative overflow-hidden">
              <BorderTrail />
              <CardHeader>
                <CardTitle className="font-mono">Border Trail</CardTitle>
                <CardDescription>Animated border effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Motion primitive with animated border trail.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="w-full">Action</Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="glass border-glow mt-6">
            <CardHeader>
              <CardTitle className="font-mono">Skeleton Loading States</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        </Section>

        {/* Forms */}
        <Section title="Form Components" id="forms">
          <Card className="glass border-glow">
            <CardHeader>
              <CardTitle className="font-mono">Form Elements</CardTitle>
              <CardDescription>Inputs, textareas, checkboxes, and more</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-mono">Email</Label>
                <Input id="email" type="email" placeholder="matt@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="font-mono">Message</Label>
                <Textarea id="message" placeholder="Type your message here..." />
              </div>

              <Separator />

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Accept terms and conditions</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="notifications" />
                <Label htmlFor="notifications" className="font-mono">Enable notifications</Label>
              </div>

              <Separator />

              <RadioGroup defaultValue="option1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option1" id="option1" />
                  <Label htmlFor="option1" className="font-mono">Option 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option2" id="option2" />
                  <Label htmlFor="option2" className="font-mono">Option 2</Label>
                </div>
              </RadioGroup>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Submit</Button>
            </CardFooter>
          </Card>
        </Section>

        {/* Navigation */}
        <Section title="Navigation Components" id="navigation">
          <Card className="glass border-glow">
            <CardHeader>
              <CardTitle className="font-mono">Tabs</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all" className="font-mono">All</TabsTrigger>
                  <TabsTrigger value="web" className="font-mono">Web Apps</TabsTrigger>
                  <TabsTrigger value="tui" className="font-mono">TUI</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-4">
                  <p className="text-sm text-muted-foreground">All 45 projects displayed here</p>
                </TabsContent>
                <TabsContent value="web" className="space-y-4">
                  <p className="text-sm text-muted-foreground">6-7 Vercel-deployed web apps</p>
                </TabsContent>
                <TabsContent value="tui" className="space-y-4">
                  <p className="text-sm text-muted-foreground">Terminal User Interface projects</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="glass border-glow mt-6">
            <CardHeader>
              <CardTitle className="font-mono">Accordion</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="font-mono">What is this portfolio built with?</AccordionTrigger>
                  <AccordionContent>
                    Next.js 15, TypeScript, Tailwind CSS, Framer Motion, and shadcn/ui components.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="font-mono">What are TUI projects?</AccordionTrigger>
                  <AccordionContent>
                    Terminal User Interface applications built with Bubbletea and Lipgloss in Go.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="font-mono">How many projects?</AccordionTrigger>
                  <AccordionContent>
                    45 projects built over 6 months with Claude's assistance.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card className="glass border-glow mt-6">
            <CardHeader>
              <CardTitle className="font-mono">Carousel</CardTitle>
            </CardHeader>
            <CardContent>
              <Carousel className="w-full max-w-xs mx-auto">
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card className="border-glow">
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <span className="text-4xl font-mono font-semibold">
                              {index + 1}
                            </span>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
          </Card>

          <Card className="glass border-glow mt-6">
            <CardHeader>
              <CardTitle className="font-mono">Scroll Area</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-48 w-full rounded-md border border-border p-4">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="py-2 font-mono text-sm">
                    Project {i + 1}: Terminal Chat Application
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </Section>

        {/* Interactive Components */}
        <Section title="Interactive Components" id="interactive">
          <Card className="glass border-glow">
            <CardHeader>
              <CardTitle className="font-mono">Dialogs & Overlays</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent className="glass border-glow">
                    <DialogHeader>
                      <DialogTitle className="font-mono">Project Details</DialogTitle>
                      <DialogDescription>
                        View more information about this project.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-sm text-muted-foreground">
                        This is a glassmorphic dialog with terminal theme styling.
                      </p>
                    </div>
                    <DialogFooter>
                      <Button>View Live Demo</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline" className="w-full">Open Drawer</Button>
                  </DrawerTrigger>
                  <DrawerContent className="glass-dark border-glow">
                    <DrawerHeader>
                      <DrawerTitle className="font-mono">Project Gallery</DrawerTitle>
                      <DrawerDescription>Browse through screenshots</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4">
                      <p className="text-sm text-muted-foreground">Drawer content goes here</p>
                    </div>
                    <DrawerFooter>
                      <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" className="w-full">Hover for Tooltip</Button>
                    </TooltipTrigger>
                    <TooltipContent className="glass border-glow">
                      <p className="font-mono">Tech Stack: Next.js</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="outline" className="w-full">Hover Card</Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="glass border-glow w-80">
                    <div className="space-y-2">
                      <h4 className="font-mono font-semibold">Terminal Chat App</h4>
                      <p className="text-sm text-muted-foreground">
                        A real-time chat application built with Bubbletea and WebSockets.
                      </p>
                      <div className="flex gap-2">
                        <Badge className="font-mono text-xs">Go</Badge>
                        <Badge className="font-mono text-xs">Bubbletea</Badge>
                        <Badge className="font-mono text-xs">WebSocket</Badge>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full col-span-2">Open Popover</Button>
                  </PopoverTrigger>
                  <PopoverContent className="glass border-glow">
                    <div className="space-y-2">
                      <h4 className="font-mono font-semibold">Quick Actions</h4>
                      <div className="space-y-2">
                        <Button variant="ghost" className="w-full justify-start">View Code</Button>
                        <Button variant="ghost" className="w-full justify-start">Live Demo</Button>
                        <Button variant="ghost" className="w-full justify-start">Documentation</Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* Motion Primitives */}
        <Section title="Motion Primitives" id="motion">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glass border-glow">
              <CardHeader>
                <CardTitle className="font-mono">
                  <TextMorph className="terminal-glow">Text Morph Effect</TextMorph>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Smooth text morphing animation for dynamic content changes.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-dark border-glow relative">
              <GlowEffect>
                <CardHeader>
                  <CardTitle className="font-mono">Glow Effect</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Interactive glow that follows your cursor - very terminal-esque!
                  </p>
                </CardContent>
              </GlowEffect>
            </Card>
          </div>

          <Card className="glass border-glow mt-6">
            <CardHeader>
              <CardTitle className="font-mono">Animated Background</CardTitle>
            </CardHeader>
            <CardContent className="relative h-48">
              <AnimatedBackground className="rounded-md" />
              <div className="relative z-10 flex items-center justify-center h-full">
                <p className="text-lg font-mono text-foreground terminal-glow">
                  Hover over items for animated backgrounds
                </p>
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* Utility Classes */}
        <Section title="Utility Classes" id="utilities">
          <Card className="glass border-glow">
            <CardHeader>
              <CardTitle className="font-mono">Custom Utilities</CardTitle>
              <CardDescription>Terminal-themed utility classes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2 font-mono">.glass</p>
                <div className="glass p-6 rounded-lg">
                  <p className="font-mono">Light glassmorphic background with blur</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2 font-mono">.glass-dark</p>
                <div className="glass-dark p-6 rounded-lg">
                  <p className="font-mono">Dark glassmorphic background with blur</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2 font-mono">.terminal-glow</p>
                <h3 className="text-3xl font-mono font-bold terminal-glow">
                  Terminal Phosphor Glow Effect
                </h3>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2 font-mono">.border-glow</p>
                <div className="border-glow border border-border p-6 rounded-lg">
                  <p className="font-mono">Glowing cyan border effect</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* Footer */}
        <div className="mt-20 text-center">
          <p className="text-sm text-muted-foreground font-mono">
            Style Guide for Matt's Portfolio • Terminal Theme
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Badge className="font-mono text-xs">Next.js 15</Badge>
            <Badge className="font-mono text-xs">TypeScript</Badge>
            <Badge className="font-mono text-xs">Tailwind CSS</Badge>
            <Badge className="font-mono text-xs">shadcn/ui</Badge>
            <Badge className="font-mono text-xs">Motion Primitives</Badge>
          </div>
        </div>
      </div>
    </main>
  );
}

// Section wrapper component
function Section({
  title,
  id,
  children
}: {
  title: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-20">
      <h2 className="text-4xl font-mono font-bold mb-8 bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
        {title}
      </h2>
      {children}
    </section>
  );
}
