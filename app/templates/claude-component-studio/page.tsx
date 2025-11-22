'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpaceBackground } from '@/components/SpaceBackground';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from '@/components/ui/use-toast';
import {
  Palette,
  Copy,
  Send,
  Code2,
  Sparkles,
  Settings,
  Eye,
  Download,
  Share2,
  Wand2,
  Layers,
  Type,
  Box,
  Zap,
  ChevronRight,
  Check,
  X
} from 'lucide-react';

// Component library
const componentLibrary = {
  cards: [
    {
      id: 'glass-card',
      name: 'Glassmorphic Card',
      category: 'Cards',
      preview: 'glass',
      customizable: ['background', 'blur', 'border', 'shadow']
    },
    {
      id: 'floating-card',
      name: '3D Floating Card',
      category: 'Cards',
      preview: 'floating',
      customizable: ['float-intensity', 'rotation', 'shadow']
    },
    {
      id: 'neon-card',
      name: 'Neon Glow Card',
      category: 'Cards',
      preview: 'neon',
      customizable: ['glow-color', 'intensity', 'pulse']
    }
  ],
  buttons: [
    {
      id: 'gradient-btn',
      name: 'Gradient Button',
      category: 'Buttons',
      preview: 'gradient',
      customizable: ['colors', 'angle', 'hover-effect']
    },
    {
      id: 'neo-btn',
      name: 'Neomorphic Button',
      category: 'Buttons',
      preview: 'neo',
      customizable: ['depth', 'soft-shadow', 'pressed-state']
    },
    {
      id: 'particle-btn',
      name: 'Particle Effect Button',
      category: 'Buttons',
      preview: 'particle',
      customizable: ['particle-count', 'explosion-radius', 'colors']
    }
  ],
  forms: [
    {
      id: 'animated-form',
      name: 'Animated Form',
      category: 'Forms',
      preview: 'animated',
      customizable: ['field-animation', 'validation-style', 'submit-effect']
    },
    {
      id: 'step-form',
      name: 'Multi-Step Form',
      category: 'Forms',
      preview: 'steps',
      customizable: ['progress-style', 'transition', 'validation']
    }
  ],
  navigation: [
    {
      id: 'floating-nav',
      name: 'Floating Navigation',
      category: 'Navigation',
      preview: 'floating',
      customizable: ['position', 'animation', 'backdrop']
    },
    {
      id: 'sidebar-nav',
      name: 'Collapsible Sidebar',
      category: 'Navigation',
      preview: 'sidebar',
      customizable: ['width', 'collapse-style', 'icons']
    }
  ],
  effects: [
    {
      id: 'cursor-follow',
      name: 'Cursor Follow Effect',
      category: 'Effects',
      preview: 'cursor',
      customizable: ['trail-length', 'color', 'blend-mode']
    },
    {
      id: 'parallax-scroll',
      name: 'Parallax Scroll',
      category: 'Effects',
      preview: 'parallax',
      customizable: ['speed', 'layers', 'direction']
    }
  ]
};

// Framework templates
const frameworks = {
  react: 'React + TypeScript',
  nextjs: 'Next.js 14+ App Router',
  vue: 'Vue 3 Composition API',
  svelte: 'SvelteKit',
  vanilla: 'Vanilla JS',
  astro: 'Astro'
};

export default function ClaudeComponentStudio() {
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [customization, setCustomization] = useState({
    // Colors
    primaryColor: '#10b981',
    secondaryColor: '#06b6d4',
    backgroundColor: '#000000',
    textColor: '#ffffff',

    // Typography
    fontFamily: 'Inter',
    fontSize: '16',
    fontWeight: '400',

    // Spacing
    padding: '20',
    margin: '10',
    borderRadius: '8',

    // Effects
    animation: 'smooth',
    duration: '300',
    shadowIntensity: '50',
    blurAmount: '12',

    // Framework
    framework: 'react',
    typescript: true,
    styling: 'tailwind',

    // Features
    responsive: true,
    darkMode: true,
    accessibility: true,
    animations: true
  });

  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  const generateClaudePrompt = () => {
    if (!selectedComponent) {
      toast({
        title: "No component selected",
        description: "Please select a component to generate a prompt",
      });
      return;
    }

    const prompt = `Create a ${selectedComponent.name} component with the following specifications:

## Component Type
${selectedComponent.category}: ${selectedComponent.name}

## Framework & Setup
- Framework: ${frameworks[customization.framework as keyof typeof frameworks]}
- TypeScript: ${customization.typescript ? 'Yes' : 'No'}
- Styling: ${customization.styling === 'tailwind' ? 'Tailwind CSS' : customization.styling === 'css-modules' ? 'CSS Modules' : 'Styled Components'}

## Design Specifications
### Colors
- Primary: ${customization.primaryColor}
- Secondary: ${customization.secondaryColor}
- Background: ${customization.backgroundColor}
- Text: ${customization.textColor}

### Typography
- Font Family: ${customization.fontFamily}
- Base Font Size: ${customization.fontSize}px
- Font Weight: ${customization.fontWeight}

### Spacing & Layout
- Padding: ${customization.padding}px
- Margin: ${customization.margin}px
- Border Radius: ${customization.borderRadius}px

### Effects & Animations
- Animation Type: ${customization.animation}
- Duration: ${customization.duration}ms
- Shadow Intensity: ${customization.shadowIntensity}%
- Blur Amount: ${customization.blurAmount}px

## Features Required
${customization.responsive ? '✅ Fully responsive (mobile-first)' : ''}
${customization.darkMode ? '✅ Dark mode support' : ''}
${customization.accessibility ? '✅ WCAG AA accessibility' : ''}
${customization.animations ? '✅ Smooth animations on interaction' : ''}

## Additional Requirements
- Component should be reusable and accept props
- Include proper TypeScript types/interfaces
- Add helpful comments explaining complex logic
- Follow best practices for the chosen framework
- Include usage example

Please create this component with attention to detail and modern best practices.`;

    setGeneratedPrompt(prompt);
    setShowPrompt(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopiedToClipboard(true);
    setTimeout(() => setCopiedToClipboard(false), 2000);
    toast({
      title: "Copied to clipboard!",
      description: "Prompt is ready to paste into Claude",
    });
  };

  const sendToClaude = () => {
    // This would integrate with Claude API or open Claude with the prompt
    toast({
      title: "Opening Claude...",
      description: "Your prompt has been prepared",
    });
    // In real implementation, this would open Claude or use API
  };

  return (
    <main className="min-h-screen relative">
      <SpaceBackground speed={0.3} opacity={0.5} />

      {/* Header */}
      <div className="relative z-10 border-b border-border/40 glass-dark backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-secondary">
                <Wand2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-mono font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                  Claude Component Studio
                </h1>
                <p className="text-sm text-muted-foreground">Visual builder → Perfect Claude prompts</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="font-mono">
                <Sparkles className="h-3 w-3 mr-1" />
                Beta
              </Badge>
              <Badge className="font-mono bg-gradient-to-r from-primary to-secondary text-white border-0">
                50+ Components
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Component Library Sidebar */}
          <div className="lg:col-span-3">
            <Card className="glass-dark border-glow sticky top-8">
              <CardHeader>
                <CardTitle className="font-mono text-lg">Component Library</CardTitle>
                <CardDescription>Select a component to customize</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-6">
                    {Object.entries(componentLibrary).map(([category, components]) => (
                      <div key={category}>
                        <h3 className="text-sm font-mono uppercase text-muted-foreground mb-3">
                          {category}
                        </h3>
                        <div className="space-y-2">
                          {components.map((component) => (
                            <motion.div
                              key={component.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <button
                                onClick={() => setSelectedComponent(component)}
                                className={`w-full text-left p-3 rounded-lg border transition-all ${
                                  selectedComponent?.id === component.id
                                    ? 'border-primary bg-primary/10'
                                    : 'border-border hover:border-primary/50 hover:bg-primary/5'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-mono text-sm">{component.name}</span>
                                  <ChevronRight className="h-4 w-4" />
                                </div>
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Customization Panel */}
          <div className="lg:col-span-6">
            <Card className="glass-dark border-glow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-mono text-xl">Customization</CardTitle>
                    <CardDescription>
                      {selectedComponent ? `Customizing: ${selectedComponent.name}` : 'Select a component to start'}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="colors" className="space-y-6">
                  <TabsList className="grid grid-cols-5 w-full">
                    <TabsTrigger value="colors" className="text-xs">Colors</TabsTrigger>
                    <TabsTrigger value="typography" className="text-xs">Type</TabsTrigger>
                    <TabsTrigger value="spacing" className="text-xs">Space</TabsTrigger>
                    <TabsTrigger value="effects" className="text-xs">Effects</TabsTrigger>
                    <TabsTrigger value="framework" className="text-xs">Code</TabsTrigger>
                  </TabsList>

                  <TabsContent value="colors" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs font-mono">Primary Color</Label>
                        <div className="flex gap-2 mt-1">
                          <Input
                            type="color"
                            value={customization.primaryColor}
                            onChange={(e) => setCustomization({...customization, primaryColor: e.target.value})}
                            className="w-16 h-10"
                          />
                          <Input
                            value={customization.primaryColor}
                            onChange={(e) => setCustomization({...customization, primaryColor: e.target.value})}
                            className="font-mono text-xs"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs font-mono">Secondary Color</Label>
                        <div className="flex gap-2 mt-1">
                          <Input
                            type="color"
                            value={customization.secondaryColor}
                            onChange={(e) => setCustomization({...customization, secondaryColor: e.target.value})}
                            className="w-16 h-10"
                          />
                          <Input
                            value={customization.secondaryColor}
                            onChange={(e) => setCustomization({...customization, secondaryColor: e.target.value})}
                            className="font-mono text-xs"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs font-mono">Background</Label>
                        <div className="flex gap-2 mt-1">
                          <Input
                            type="color"
                            value={customization.backgroundColor}
                            onChange={(e) => setCustomization({...customization, backgroundColor: e.target.value})}
                            className="w-16 h-10"
                          />
                          <Input
                            value={customization.backgroundColor}
                            onChange={(e) => setCustomization({...customization, backgroundColor: e.target.value})}
                            className="font-mono text-xs"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs font-mono">Text Color</Label>
                        <div className="flex gap-2 mt-1">
                          <Input
                            type="color"
                            value={customization.textColor}
                            onChange={(e) => setCustomization({...customization, textColor: e.target.value})}
                            className="w-16 h-10"
                          />
                          <Input
                            value={customization.textColor}
                            onChange={(e) => setCustomization({...customization, textColor: e.target.value})}
                            className="font-mono text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Color Presets */}
                    <div>
                      <Label className="text-xs font-mono mb-2">Quick Presets</Label>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline" className="text-xs">Terminal</Button>
                        <Button size="sm" variant="outline" className="text-xs">Sunset</Button>
                        <Button size="sm" variant="outline" className="text-xs">Ocean</Button>
                        <Button size="sm" variant="outline" className="text-xs">Forest</Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="typography" className="space-y-4">
                    <div>
                      <Label className="text-xs font-mono">Font Family</Label>
                      <Select value={customization.fontFamily} onValueChange={(v) => setCustomization({...customization, fontFamily: v})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Inter">Inter</SelectItem>
                          <SelectItem value="JetBrains Mono">JetBrains Mono</SelectItem>
                          <SelectItem value="Roboto">Roboto</SelectItem>
                          <SelectItem value="Poppins">Poppins</SelectItem>
                          <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-xs font-mono">Font Size: {customization.fontSize}px</Label>
                      <Slider
                        value={[parseInt(customization.fontSize)]}
                        onValueChange={(v) => setCustomization({...customization, fontSize: v[0].toString()})}
                        min={12}
                        max={24}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label className="text-xs font-mono">Font Weight</Label>
                      <RadioGroup value={customization.fontWeight} onValueChange={(v) => setCustomization({...customization, fontWeight: v})}>
                        <div className="grid grid-cols-4 gap-2 mt-2">
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="300" id="light" />
                            <Label htmlFor="light" className="text-xs">Light</Label>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="400" id="regular" />
                            <Label htmlFor="regular" className="text-xs">Regular</Label>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="600" id="semibold" />
                            <Label htmlFor="semibold" className="text-xs">Semibold</Label>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RadioGroupItem value="700" id="bold" />
                            <Label htmlFor="bold" className="text-xs">Bold</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                  </TabsContent>

                  <TabsContent value="spacing" className="space-y-4">
                    <div>
                      <Label className="text-xs font-mono">Padding: {customization.padding}px</Label>
                      <Slider
                        value={[parseInt(customization.padding)]}
                        onValueChange={(v) => setCustomization({...customization, padding: v[0].toString()})}
                        min={0}
                        max={60}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label className="text-xs font-mono">Margin: {customization.margin}px</Label>
                      <Slider
                        value={[parseInt(customization.margin)]}
                        onValueChange={(v) => setCustomization({...customization, margin: v[0].toString()})}
                        min={0}
                        max={40}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label className="text-xs font-mono">Border Radius: {customization.borderRadius}px</Label>
                      <Slider
                        value={[parseInt(customization.borderRadius)]}
                        onValueChange={(v) => setCustomization({...customization, borderRadius: v[0].toString()})}
                        min={0}
                        max={32}
                        className="mt-2"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="effects" className="space-y-4">
                    <div>
                      <Label className="text-xs font-mono">Animation Style</Label>
                      <Select value={customization.animation} onValueChange={(v) => setCustomization({...customization, animation: v})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="smooth">Smooth</SelectItem>
                          <SelectItem value="bounce">Bounce</SelectItem>
                          <SelectItem value="spring">Spring</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-xs font-mono">Duration: {customization.duration}ms</Label>
                      <Slider
                        value={[parseInt(customization.duration)]}
                        onValueChange={(v) => setCustomization({...customization, duration: v[0].toString()})}
                        min={100}
                        max={1000}
                        step={50}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label className="text-xs font-mono">Shadow Intensity: {customization.shadowIntensity}%</Label>
                      <Slider
                        value={[parseInt(customization.shadowIntensity)]}
                        onValueChange={(v) => setCustomization({...customization, shadowIntensity: v[0].toString()})}
                        min={0}
                        max={100}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label className="text-xs font-mono">Blur Amount: {customization.blurAmount}px</Label>
                      <Slider
                        value={[parseInt(customization.blurAmount)]}
                        onValueChange={(v) => setCustomization({...customization, blurAmount: v[0].toString()})}
                        min={0}
                        max={24}
                        className="mt-2"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="framework" className="space-y-4">
                    <div>
                      <Label className="text-xs font-mono">Framework</Label>
                      <Select value={customization.framework} onValueChange={(v) => setCustomization({...customization, framework: v})}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(frameworks).map(([key, value]) => (
                            <SelectItem key={key} value={key}>{value}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-xs font-mono">Styling Method</Label>
                      <RadioGroup value={customization.styling} onValueChange={(v) => setCustomization({...customization, styling: v})}>
                        <div className="space-y-2 mt-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="tailwind" id="tailwind" />
                            <Label htmlFor="tailwind" className="text-xs">Tailwind CSS</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="css-modules" id="css-modules" />
                            <Label htmlFor="css-modules" className="text-xs">CSS Modules</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="styled-components" id="styled" />
                            <Label htmlFor="styled" className="text-xs">Styled Components</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="typescript" className="text-xs font-mono">TypeScript</Label>
                        <Switch
                          id="typescript"
                          checked={customization.typescript}
                          onCheckedChange={(v) => setCustomization({...customization, typescript: v})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="responsive" className="text-xs font-mono">Responsive</Label>
                        <Switch
                          id="responsive"
                          checked={customization.responsive}
                          onCheckedChange={(v) => setCustomization({...customization, responsive: v})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="darkmode" className="text-xs font-mono">Dark Mode</Label>
                        <Switch
                          id="darkmode"
                          checked={customization.darkMode}
                          onCheckedChange={(v) => setCustomization({...customization, darkMode: v})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="a11y" className="text-xs font-mono">Accessibility</Label>
                        <Switch
                          id="a11y"
                          checked={customization.accessibility}
                          onCheckedChange={(v) => setCustomization({...customization, accessibility: v})}
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Preview Section */}
            <Card className="glass-dark border-glow mt-6">
              <CardHeader>
                <CardTitle className="font-mono">Live Preview</CardTitle>
                <CardDescription>See your component with current settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="min-h-[300px] rounded-lg border border-border/50 flex items-center justify-center"
                  style={{
                    backgroundColor: customization.backgroundColor,
                    padding: `${customization.padding}px`,
                  }}
                >
                  {selectedComponent ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full max-w-md"
                    >
                      <div
                        className="p-6 rounded-lg backdrop-blur-md border"
                        style={{
                          backgroundColor: `${customization.primaryColor}20`,
                          borderColor: customization.primaryColor,
                          borderRadius: `${customization.borderRadius}px`,
                          color: customization.textColor,
                          fontFamily: customization.fontFamily,
                          fontSize: `${customization.fontSize}px`,
                          fontWeight: customization.fontWeight,
                          boxShadow: `0 0 ${customization.shadowIntensity}px ${customization.primaryColor}40`,
                        }}
                      >
                        <h3 className="text-xl font-bold mb-2">{selectedComponent.name}</h3>
                        <p className="opacity-80">This is how your component will look with the current customization settings.</p>
                        <button
                          className="mt-4 px-4 py-2 rounded transition-all"
                          style={{
                            background: `linear-gradient(135deg, ${customization.primaryColor}, ${customization.secondaryColor})`,
                            color: customization.backgroundColor,
                            borderRadius: `${customization.borderRadius / 2}px`,
                          }}
                        >
                          Interactive Element
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <p className="text-muted-foreground">Select a component to preview</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions Panel */}
          <div className="lg:col-span-3">
            <Card className="glass-dark border-glow sticky top-8">
              <CardHeader>
                <CardTitle className="font-mono text-lg">Generate & Send</CardTitle>
                <CardDescription>Create your Claude prompt</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={generateClaudePrompt}
                  className="w-full gap-2"
                  size="lg"
                  disabled={!selectedComponent}
                >
                  <Wand2 className="h-5 w-5" />
                  Generate Claude Prompt
                </Button>

                {showPrompt && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <div className="relative">
                      <Textarea
                        value={generatedPrompt}
                        readOnly
                        className="font-mono text-xs h-48"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 gap-1"
                        onClick={copyToClipboard}
                      >
                        {copiedToClipboard ? (
                          <>
                            <Check className="h-3 w-3" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={() => setShowPrompt(false)}
                      >
                        <X className="h-3 w-3" />
                        Close
                      </Button>
                      <Button
                        size="sm"
                        className="gap-1"
                        onClick={sendToClaude}
                      >
                        <Send className="h-3 w-3" />
                        Send to Claude
                      </Button>
                    </div>
                  </motion.div>
                )}

                <Separator />

                {/* Quick Actions */}
                <div className="space-y-2">
                  <Label className="text-xs font-mono">Quick Actions</Label>
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                    <Download className="h-4 w-4" />
                    Export Configuration
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                    <Share2 className="h-4 w-4" />
                    Share Component
                  </Button>
                </div>

                {/* Stats */}
                <div className="pt-4 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Components</span>
                    <span className="font-mono">50+</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Frameworks</span>
                    <span className="font-mono">6</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Customizations</span>
                    <span className="font-mono">∞</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <Card className="glass-dark border-glow max-w-3xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-secondary">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-mono font-bold">How It Works</h2>
              </div>
              <div className="grid md:grid-cols-4 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                    <Layers className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm font-mono">1. Browse</p>
                  <p className="text-xs text-muted-foreground mt-1">Select component</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                    <Palette className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm font-mono">2. Customize</p>
                  <p className="text-xs text-muted-foreground mt-1">Colors & settings</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                    <Wand2 className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm font-mono">3. Generate</p>
                  <p className="text-xs text-muted-foreground mt-1">Perfect prompt</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                    <Send className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm font-mono">4. Send</p>
                  <p className="text-xs text-muted-foreground mt-1">To Claude</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}