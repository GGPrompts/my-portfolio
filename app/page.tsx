import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SpaceBackground } from '@/components/SpaceBackground';
import { AboutSection } from '@/components/AboutSection';
import { FeaturedProjects } from '@/components/FeaturedProjects';
import { ContactSection } from '@/components/ContactSection';
import { HeroSection } from '@/components/HeroSection';

export const metadata: Metadata = {
  title: 'Matt M. | Full Stack Prompt Engineer',
  description: 'From zero coding experience to 45+ production projects in 6 months. Full Stack Prompt Engineer specializing in terminal UIs, browser-based dev tools, and AI-assisted development.',
};

export default function PortfolioHome() {
  return (
    <main className="min-h-screen relative">
      <SpaceBackground speed={0.5} opacity={1} />

      <div className="relative z-10">
        {/* Hero Section */}
        <HeroSection />

        {/* Featured Projects */}
        <FeaturedProjects />

        {/* Interactive Experiences Section */}
        <section className="container mx-auto px-4 py-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-mono font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-teal-400 text-transparent bg-clip-text terminal-glow">
                  Interactive Experiences
                </span>
              </h2>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Explore my work through live terminal demos and an interactive resume
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* TUI Playground Card */}
              <Link href="/playground" className="group">
                <div className="glass border-white/10 rounded-xl p-8 h-full hover:border-primary/30 transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 glass-dark rounded-lg border-glow">
                      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-mono font-bold text-primary mb-2 group-hover:terminal-glow transition-all">
                        TUI Playground
                      </h3>
                      <div className="inline-flex items-center gap-2 px-3 py-1 glass-dark rounded-full text-xs font-mono text-emerald-400 mb-4">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                        LIVE DEMOS
                      </div>
                    </div>
                  </div>

                  <p className="text-foreground/70 mb-6">
                    Experience my Terminal User Interface apps in action. Watch asciinema recordings,
                    explore the tech stack, and see how Bubbletea and Go create beautiful terminal experiences.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 glass-dark rounded-md text-xs font-mono text-cyan-400">TFE</span>
                    <span className="px-3 py-1 glass-dark rounded-md text-xs font-mono text-cyan-400">bit</span>
                    <span className="px-3 py-1 glass-dark rounded-md text-xs font-mono text-cyan-400">tkan</span>
                    <span className="px-3 py-1 glass-dark rounded-md text-xs font-mono text-cyan-400">tmuxplexer</span>
                    <span className="px-3 py-1 glass-dark rounded-md text-xs font-mono text-cyan-400">TUIClassics</span>
                  </div>

                  <div className="flex items-center gap-2 text-primary font-mono group-hover:gap-4 transition-all">
                    <span>Launch Playground</span>
                    <span className="text-xl">→</span>
                  </div>
                </div>
              </Link>

              {/* Terminal Resume Card */}
              <Link href="/resume" className="group">
                <div className="glass border-white/10 rounded-xl p-8 h-full hover:border-primary/30 transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 glass-dark rounded-lg border-glow">
                      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-mono font-bold text-primary mb-2 group-hover:terminal-glow transition-all">
                        Terminal Resume
                      </h3>
                      <div className="inline-flex items-center gap-2 px-3 py-1 glass-dark rounded-full text-xs font-mono text-emerald-400 mb-4">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                        INTERACTIVE
                      </div>
                    </div>
                  </div>

                  <p className="text-foreground/70 mb-6">
                    My resume IS a terminal application. Explore my journey with commands like
                    `timeline`, `achievements`, `claude`, and `prompt-engineer`. Built with real data
                    from 17+ GitHub projects.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 glass-dark rounded-md text-xs font-mono text-cyan-400">projects --tui</span>
                    <span className="px-3 py-1 glass-dark rounded-md text-xs font-mono text-cyan-400">stats</span>
                    <span className="px-3 py-1 glass-dark rounded-md text-xs font-mono text-cyan-400">achievements</span>
                    <span className="px-3 py-1 glass-dark rounded-md text-xs font-mono text-cyan-400">zero-to-hero</span>
                  </div>

                  <div className="flex items-center gap-2 text-primary font-mono group-hover:gap-4 transition-all">
                    <span>Open Terminal</span>
                    <span className="text-xl">→</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <AboutSection />

        {/* Contact Section */}
        <ContactSection />

        {/* Link to Template Gallery */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="glass rounded-xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-mono font-bold text-primary mb-4">
              Explore the Template Library
            </h2>
            <p className="text-foreground/80 mb-6">
              Want to see the 16 production-ready templates used to build this portfolio?
            </p>
            <Link href="/templates">
              <button className="px-6 py-3 glass-dark rounded-lg hover:scale-105 transition-transform border-glow">
                View Template Gallery
              </button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
