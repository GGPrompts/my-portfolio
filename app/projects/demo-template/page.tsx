'use client'

import HeroSection from '@/components/demo/HeroSection'
import FeaturesSection from '@/components/demo/FeaturesSection'
import ReferenceSection from '@/components/demo/ReferenceSection'
import ClaudeLauncher from '@/components/demo/ClaudeLauncher'
import AudioNotifications from '@/components/demo/AudioNotifications'
import OmniboxCommands from '@/components/demo/OmniboxCommands'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'

export default function DemoProjectPage() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Hero Section - includes SpaceBackground */}
      <HeroSection />

      {/* Features Grid - Terminal + MCP Tools */}
      <FeaturesSection />

      {/* Interactive Claude Code Launcher */}
      <section className="px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <ClaudeLauncher />
        </div>
      </section>

      {/* Audio Notifications */}
      <section className="px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <AudioNotifications />
        </div>
      </section>

      {/* Omnibox Commands */}
      <section className="px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <OmniboxCommands />
        </div>
      </section>

      {/* Quick Reference - Shortcuts, Status, Quick Start */}
      <ReferenceSection />

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 border-t border-primary/20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground mb-4">
            Built with React, TypeScript, xterm.js, and Chrome Manifest V3
          </p>
          <Button
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary/10"
            asChild
          >
            <a
              href="https://github.com/GGPrompts/TabzChrome"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4 mr-2" />
              Star on GitHub
            </a>
          </Button>
        </div>
      </footer>
    </main>
  )
}
