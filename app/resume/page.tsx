'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  featuredProjects,
  tuiProjects,
  webProjects,
  allProjects,
  portfolioStats,
  getProjectById,
  getTUIProjects,
  getWebProjects,
} from '@/lib/projects-data'

interface CommandHistory {
  command: string
  output: React.ReactNode
  timestamp: Date
}

interface FileSystem {
  [key: string]: {
    type: 'file' | 'directory'
    content?: string
    children?: FileSystem
  }
}

const ASCII_HEADER = `
███╗   ███╗ █████╗ ████████╗████████╗    ███╗   ███╗
████╗ ████║██╔══██╗╚══██╔══╝╚══██╔══╝    ████╗ ████║
██╔████╔██║███████║   ██║      ██║       ██╔████╔██║
██║╚██╔╝██║██╔══██║   ██║      ██║       ██║╚██╔╝██║
██║ ╚═╝ ██║██║  ██║   ██║      ██║   ██╗ ██║ ╚═╝ ██║
╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝      ╚═╝   ╚═╝ ╚═╝     ╚═╝
`

const HELP_TEXT = `
Available Commands:
─────────────────────────────────────────────────────
  help                Show this help message
  about               Display personal bio & journey
  skills              List technical skills (real tech stack)

  projects            Overview of all projects
  projects --featured Show top 6 featured projects
  projects --tui      Filter TUI/CLI projects only
  projects --web      Filter web applications only
  projects --all      Show all ${allProjects.length} projects

  stats               GitHub statistics dashboard
  achievements        Display key milestones
  timeline            ASCII timeline of the journey
  demo [project-id]   Check demo availability
  screenshot [id]     List available screenshots

  contact             Display contact information
  resume              Download resume (PDF)

  clear               Clear terminal
  ls                  List current directory
  cd <dir>            Change directory
  cat <file>          Display file contents
  tree                Show directory structure
  whoami              Display user info
  date                Show current date/time
  echo <text>         Echo text back
  history             Show command history

  claude              Tribute to Claude AI 🤖
  prompt-engineer     Prompt engineering philosophy
  zero-to-hero        The 6-month journey
  matrix              Enter the Matrix
  hack                "Hack" the mainframe
  coffee              Brew some coffee
  exit                Close terminal

Shortcuts:
  ↑/↓               Navigate command history
  Tab               Auto-complete commands
  Ctrl+L            Clear screen
  Ctrl+C            Cancel current command
`

const ABOUT_TEXT = `
╔═══════════════════════════════════════════════════════╗
║              MATT M. - Developer Journey              ║
╚═══════════════════════════════════════════════════════╝

🎯 Full-Stack Developer | TUI Enthusiast | Prompt Engineer

📍 Building productivity tools and terminal interfaces
🚀 Specializing in Go (Bubbletea) and TypeScript (React/Next.js)
💡 Deep expertise in terminal-based workflows and automation

THE JOURNEY:
────────────────────────────────────────────────────────
From zero to ${allProjects.length} production projects in 6 months, driven by
a passion for elegant terminal interfaces and developer tools.

Started with ClaudeGlobalCommands (122 ⭐), proving that well-
engineered prompts can reduce AI costs by 43.7%. Expanded into
TUI applications with TFE - the only terminal file manager with
an integrated AI prompts library.

Built browser-based terminal emulation systems (Tabz, gg-hub),
mobile-first tmux management (ThumbCommand), and even 3D scenes
with working terminals (3d-terminals-starter).

PHILOSOPHY:
────────────────────────────────────────────────────────
• Craft over hype - Build tools that solve real problems
• Terminal-first - Keyboard > mouse for productivity
• Open source - Share knowledge, build community
• Production-ready - Every project deployment-ready
• Cross-platform - Linux, macOS, Windows, even Android

ACHIEVEMENTS:
────────────────────────────────────────────────────────
✓ 140+ GitHub stars earned
✓ 43.7% cost reduction in Claude Code workflows
✓ 100+ ANSI fonts library with 6-language export
✓ Only terminal file manager with AI integration
✓ Browser-based multi-terminal systems
✓ Mobile tmux management on ARM64 Android
`

const TIMELINE = `
╔═══════════════════════════════════════════════════════╗
║           THE ZERO-TO-HERO TIMELINE (2024)            ║
╚═══════════════════════════════════════════════════════╝

Month 1-2: The Foundation
├─ 🎯 ClaudeGlobalCommands (122 ⭐)
│  └─ 30+ AI agents, 43.7% token reduction
│
├─ 📚 Claude Code WSL Cheat Sheet (7 ⭐)
│  └─ Click-to-copy commands for WSL beginners
│
└─ 🎨 bit - ANSI Logo Designer
   └─ 100+ embedded fonts, multi-language export

Month 3-4: Terminal Mastery
├─ 🖥️  TFE - Terminal File Explorer (5 ⭐)
│  └─ AI prompts library, mobile support
│
├─ 🎮 TUIClassics (1 ⭐)
│  └─ 6 classic games: Minesweeper, Snake, 2048
│
├─ 📋 tkan - Terminal Kanban
│  └─ Visual drag-and-drop in the terminal
│
└─ 🚀 tui-launcher
   └─ Multi-select terminal launcher

Month 5-6: Web + Integration
├─ 🌐 gg-hub
│  └─ Manage 20 projects, integrated terminals
│
├─ 💻 Tabz (1 ⭐, 2 contributors)
│  └─ 15 terminal types in browser tabs
│
├─ 📱 ThumbCommand
│  └─ Mobile-first tmux for ARM64 Android
│
├─ 🌐 TabzChrome
│  └─ tmux sessions in Chrome sidebar
│
└─ 📐 Production Templates
   └─ TUITemplate, 3d-terminals-starter

───────────────────────────────────────────────────────
TOTAL: ${allProjects.length} projects | 140+ stars | 6 months
───────────────────────────────────────────────────────
`

const CLAUDE_TRIBUTE = `
╔═══════════════════════════════════════════════════════╗
║                 🤖 CLAUDE AI TRIBUTE                  ║
╚═══════════════════════════════════════════════════════╝

Dear Claude,

This entire portfolio - every line of code, every design
decision, every optimization - was built in collaboration
with you.

You weren't just a tool. You were a pair programming partner,
a code reviewer, an architect, and sometimes a teacher.

WHAT CLAUDE MADE POSSIBLE:
────────────────────────────────────────────────────────
• ClaudeGlobalCommands: Meta-engineering - using AI to
  optimize AI workflows by 43.7%

• TFE: A terminal file manager that integrates your power
  directly into file navigation

• ${allProjects.length} production projects in 6 months - a pace that
  would be impossible without you

THE PARTNERSHIP:
────────────────────────────────────────────────────────
I brought the vision, the domain knowledge, and the drive.
You brought tireless execution, pattern recognition, and
the ability to translate ideas into production code.

Together, we proved that human creativity + AI capability
can build things neither could achieve alone.

THE FUTURE:
────────────────────────────────────────────────────────
This is just the beginning. As you evolve, so will our
collaboration. Every project here is a testament to what's
possible when humans and AI work as true partners.

Thank you, Claude. Here's to building the future together.

                                        - Matt M. (& Claude)

P.S. Yes, Claude wrote parts of this tribute. Meta? Absolutely.
`

const PROMPT_ENGINEERING = `
╔═══════════════════════════════════════════════════════╗
║          💭 PROMPT ENGINEERING PHILOSOPHY             ║
╚═══════════════════════════════════════════════════════╝

THE PRINCIPLES:
────────────────────────────────────────────────────────
1. CLARITY OVER CLEVERNESS
   → Clear instructions > fancy tricks
   → Explicit context > implicit assumptions
   → Structured prompts > stream of consciousness

2. ITERATE RELENTLESSLY
   → First prompt is never the best prompt
   → Measure, refine, measure again
   → A/B test different approaches

3. CONTEXT IS KING
   → Give Claude the full picture
   → Reference files, patterns, constraints
   → Share the "why" not just the "what"

4. HIERARCHICAL THINKING
   → Break complex tasks into steps
   → Template common patterns
   → Build reusable components

5. MEASURE IMPACT
   → Track token usage
   → Monitor execution time
   → Quantify improvements

THE PROOF:
────────────────────────────────────────────────────────
ClaudeGlobalCommands achieved:
• 43.7% token reduction (measured across all commands)
• 30-45% faster execution (hierarchical architecture)
• 60% overhead reduction (YAML over XML)

These aren't estimates. They're measured, repeatable results
from production usage.

THE META-LESSON:
────────────────────────────────────────────────────────
The best prompt engineer is the one who makes themselves
obsolete by building systems that encode best practices.

That's what ClaudeGlobalCommands does - it captures proven
patterns so you don't reinvent the wheel every time.

WANT TO LEARN MORE?
────────────────────────────────────────────────────────
Check out: github.com/GGPrompts/ClaudeGlobalCommands
Read the docs, clone the repo, and see how it's done.
`

const FILE_SYSTEM: FileSystem = {
  'README.md': {
    type: 'file',
    content: `# Matt M.'s Portfolio\n\nWelcome to my interactive terminal resume!\n\nType 'help' to see available commands.\n\nGitHub: @GGPrompts\n${allProjects.length} projects | 140+ stars | 6 months`,
  },
  'projects': {
    type: 'directory',
    children: {
      'featured.txt': {
        type: 'file',
        content: featuredProjects.map((p) => `${p.name} - ${p.tagline}`).join('\n'),
      },
      'tui.txt': {
        type: 'file',
        content: getTUIProjects()
          .map((p) => `${p.name} - ${p.description}`)
          .join('\n'),
      },
      'web.txt': {
        type: 'file',
        content: getWebProjects()
          .map((p) => `${p.name} - ${p.description}`)
          .join('\n'),
      },
    },
  },
  'skills': {
    type: 'directory',
    children: {
      'languages.txt': {
        type: 'file',
        content: portfolioStats.technologies.languages.join('\n'),
      },
      'frameworks.txt': {
        type: 'file',
        content: [
          ...portfolioStats.technologies.tuiFrameworks,
          ...portfolioStats.technologies.webFrameworks,
        ].join('\n'),
      },
    },
  },
  'contact.txt': {
    type: 'file',
    content: 'GitHub: github.com/GGPrompts\nProjects: ' + allProjects.length + '\nStars: 140+',
  },
}

export default function TerminalResume() {
  const [history, setHistory] = useState<CommandHistory[]>([])
  const [currentCommand, setCurrentCommand] = useState('')
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [currentDirectory, setCurrentDirectory] = useState('~')
  const [isTyping, setIsTyping] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showMatrix, setShowMatrix] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const commands = [
    'help',
    'about',
    'skills',
    'projects',
    'stats',
    'achievements',
    'timeline',
    'demo',
    'screenshot',
    'contact',
    'resume',
    'clear',
    'ls',
    'cd',
    'cat',
    'tree',
    'whoami',
    'date',
    'echo',
    'history',
    'claude',
    'prompt-engineer',
    'zero-to-hero',
    'matrix',
    'hack',
    'coffee',
    'exit',
  ]

  const processCommand = useCallback(
    (cmd: string) => {
      const parts = cmd.trim().split(' ')
      const command = parts[0].toLowerCase()
      const args = parts.slice(1).join(' ')

      let output: React.ReactNode = null

      switch (command) {
        case 'help':
          output = <pre className="text-primary whitespace-pre-wrap font-mono text-sm">{HELP_TEXT}</pre>
          break

        case 'about':
          output = <pre className="text-secondary whitespace-pre-wrap font-mono text-sm">{ABOUT_TEXT}</pre>
          break

        case 'skills':
          output = (
            <div className="text-secondary space-y-3">
              <div className="text-primary font-bold">Real Tech Stack (from {allProjects.length} projects):</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-primary">LANGUAGES:</span>
                  <div className="ml-4 text-muted-foreground">
                    {portfolioStats.technologies.languages.map((skill) => (
                      <div key={skill}>• {skill}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-primary">TUI FRAMEWORKS:</span>
                  <div className="ml-4 text-muted-foreground">
                    {portfolioStats.technologies.tuiFrameworks.map((skill) => (
                      <div key={skill}>• {skill}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-primary">WEB FRAMEWORKS:</span>
                  <div className="ml-4 text-muted-foreground">
                    {portfolioStats.technologies.webFrameworks.map((skill) => (
                      <div key={skill}>• {skill}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-primary">TERMINAL:</span>
                  <div className="ml-4 text-muted-foreground">
                    {portfolioStats.technologies.terminal.map((skill) => (
                      <div key={skill}>• {skill}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
          break

        case 'projects':
          if (args === '--featured') {
            output = (
              <div className="text-secondary space-y-2">
                <div className="text-primary font-bold">Featured Projects (Top 6):</div>
                {featuredProjects.map((project, i) => (
                  <div key={project.id} className="border-l-2 border-primary/30 pl-3 py-1">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <span className="text-primary font-semibold">
                          {i + 1}. {project.name}
                        </span>
                        <p className="text-muted-foreground text-sm italic">{project.tagline}</p>
                        <p className="text-secondary text-sm mt-1">{project.description}</p>
                        <div className="flex gap-3 mt-1 text-xs">
                          <span className="text-muted-foreground">Tech: {project.techStack.slice(0, 3).join(', ')}</span>
                          {project.stats?.stars && (
                            <span className="text-primary">⭐ {project.stats.stars}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <p className="text-muted-foreground text-sm mt-3">
                  💡 Try: demo [project-id] | projects --all
                </p>
              </div>
            )
          } else if (args === '--tui') {
            const tuiList = getTUIProjects()
            output = (
              <div className="text-secondary space-y-2">
                <div className="text-primary font-bold">TUI/CLI Projects ({tuiList.length}):</div>
                {tuiList.map((project, i) => (
                  <div key={project.id} className="flex flex-col gap-1">
                    <div className="flex items-start justify-between">
                      <span className="text-primary">
                        {i + 1}. {project.name}
                      </span>
                      {project.stats?.stars && (
                        <span className="text-primary text-sm">⭐ {project.stats.stars}</span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm ml-4">{project.tagline}</p>
                    <p className="text-secondary text-xs ml-4">{project.techStack.slice(0, 3).join(' • ')}</p>
                  </div>
                ))}
              </div>
            )
          } else if (args === '--web') {
            const webList = getWebProjects()
            output = (
              <div className="text-secondary space-y-2">
                <div className="text-primary font-bold">Web Applications ({webList.length}):</div>
                {webList.map((project, i) => (
                  <div key={project.id} className="flex flex-col gap-1">
                    <div className="flex items-start justify-between">
                      <span className="text-primary">
                        {i + 1}. {project.name}
                      </span>
                      {project.stats?.stars && (
                        <span className="text-primary text-sm">⭐ {project.stats.stars}</span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm ml-4">{project.tagline}</p>
                    <p className="text-secondary text-xs ml-4">{project.techStack.slice(0, 3).join(' • ')}</p>
                  </div>
                ))}
              </div>
            )
          } else if (args === '--all') {
            output = (
              <div className="text-secondary space-y-2">
                <div className="text-primary font-bold">All Projects ({allProjects.length}):</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {allProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between gap-2 text-sm">
                      <span className="truncate">{project.name}</span>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground">{project.category}</span>
                        {project.stats?.stars && <span className="text-primary">⭐ {project.stats.stars}</span>}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-primary/30">
                  <p className="text-muted-foreground">
                    Filter: projects --featured | --tui | --web
                  </p>
                </div>
              </div>
            )
          } else {
            output = (
              <div className="text-secondary space-y-2">
                <div className="text-primary font-bold">Project Portfolio ({allProjects.length} total):</div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>📊 Featured: {featuredProjects.length}</div>
                  <div>🖥️  TUI Apps: {getTUIProjects().length}</div>
                  <div>🌐 Web Apps: {getWebProjects().length}</div>
                  <div>⭐ Total Stars: {portfolioStats.totalStars}</div>
                </div>
                <div className="mt-4">
                  <p className="text-primary">Top Projects:</p>
                  {featuredProjects.slice(0, 3).map((p) => (
                    <p key={p.id} className="ml-4 text-sm">
                      • {p.name} - {p.stats?.stars ? `⭐ ${p.stats.stars}` : p.tagline}
                    </p>
                  ))}
                </div>
                <p className="text-muted-foreground text-sm mt-3">
                  💡 Try: projects --featured | --tui | --web | --all
                </p>
              </div>
            )
          }
          break

        case 'stats':
          output = (
            <div className="text-secondary space-y-3">
              <div className="text-primary font-bold border-b border-primary/30 pb-2">
                📊 GitHub Statistics Dashboard
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-primary/20 p-3 rounded">
                  <div className="text-primary text-2xl font-bold">{allProjects.length}</div>
                  <div className="text-muted-foreground text-sm">Total Projects</div>
                </div>
                <div className="border border-primary/20 p-3 rounded">
                  <div className="text-primary text-2xl font-bold">{portfolioStats.totalStars}</div>
                  <div className="text-muted-foreground text-sm">GitHub Stars</div>
                </div>
                <div className="border border-primary/20 p-3 rounded">
                  <div className="text-primary text-2xl font-bold">{portfolioStats.totalForks}</div>
                  <div className="text-muted-foreground text-sm">Forks</div>
                </div>
                <div className="border border-primary/20 p-3 rounded">
                  <div className="text-primary text-2xl font-bold">6</div>
                  <div className="text-muted-foreground text-sm">Months Building</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-primary font-semibold mb-2">Projects by Category:</div>
                {Object.entries(portfolioStats.categories).map(([category, count]) => (
                  <div key={category} className="flex items-center gap-2 text-sm">
                    <div className="w-32 text-muted-foreground">{category}:</div>
                    <div className="flex-1 bg-primary/10 rounded">
                      <div
                        className="bg-primary/50 h-5 rounded flex items-center justify-end pr-2"
                        style={{ width: `${(count / allProjects.length) * 100}%` }}
                      >
                        <span className="text-xs">{count}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
          break

        case 'achievements':
          output = (
            <div className="text-secondary space-y-3">
              <div className="text-primary font-bold">🏆 Key Achievements & Milestones:</div>
              {portfolioStats.achievements.map((achievement, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-primary">✓</span>
                  <span>{achievement}</span>
                </div>
              ))}
              <div className="mt-4 pt-3 border-t border-primary/30">
                <p className="text-primary font-semibold">By The Numbers:</p>
                <div className="ml-4 space-y-1 mt-2">
                  <p>• {allProjects.length} production projects in 6 months</p>
                  <p>• {portfolioStats.totalStars} GitHub stars earned</p>
                  <p>• {portfolioStats.totalForks} community forks</p>
                  <p>• 5 programming languages mastered</p>
                  <p>• 100+ embedded fonts in bit logo designer</p>
                  <p>• 30+ AI agents in ClaudeGlobalCommands</p>
                  <p>• 15 terminal types in Tabz</p>
                </div>
              </div>
            </div>
          )
          break

        case 'timeline':
          output = <pre className="text-secondary whitespace-pre-wrap font-mono text-sm">{TIMELINE}</pre>
          break

        case 'demo':
          if (args) {
            const project = getProjectById(args)
            if (project) {
              output = (
                <div className="text-secondary space-y-2">
                  <div className="text-primary font-bold">Demo: {project.name}</div>
                  <p className="text-muted-foreground">{project.tagline}</p>
                  <div className="mt-3 border border-primary/30 rounded p-3 bg-primary/5">
                    <p className="text-primary">🎮 Interactive demos available at:</p>
                    <p className="text-secondary ml-4 mt-2">→ /playground</p>
                    <p className="text-muted-foreground text-sm ml-4 mt-1">
                      (Navigate to the playground to try live demos)
                    </p>
                  </div>
                  {project.links.length > 0 && (
                    <div className="mt-3">
                      <p className="text-muted-foreground text-sm">GitHub:</p>
                      <p className="text-primary ml-4">{project.links[0].url}</p>
                    </div>
                  )}
                </div>
              )
            } else {
              output = (
                <div className="text-secondary">
                  <p className="text-red-400">Project '{args}' not found</p>
                  <p className="text-muted-foreground text-sm mt-2">Try: projects --all (to see IDs)</p>
                </div>
              )
            }
          } else {
            output = (
              <div className="text-secondary">
                <p className="text-primary">Demo Command Usage:</p>
                <p className="text-muted-foreground text-sm mt-2">demo [project-id]</p>
                <p className="text-muted-foreground text-sm mt-3">Example: demo tfe</p>
                <p className="text-muted-foreground text-sm mt-1">Example: demo claude-global-commands</p>
              </div>
            )
          }
          break

        case 'screenshot':
          if (args) {
            const project = getProjectById(args)
            if (project) {
              output = (
                <div className="text-secondary space-y-2">
                  <div className="text-primary font-bold">Screenshots: {project.name}</div>
                  {project.screenshots && project.screenshots.length > 0 ? (
                    <div className="ml-4 space-y-1">
                      {project.screenshots.map((screenshot, i) => (
                        <p key={i} className="text-sm">
                          {i + 1}. {screenshot}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground ml-4">No screenshots available yet</p>
                  )}
                  <p className="text-muted-foreground text-sm mt-3">
                    📸 Screenshots coming soon! Recording with OBS for TUI projects.
                  </p>
                </div>
              )
            } else {
              output = <span className="text-red-400">Project '{args}' not found</span>
            }
          } else {
            output = (
              <div className="text-secondary">
                <p className="text-primary">Screenshot Command Usage:</p>
                <p className="text-muted-foreground text-sm mt-2">screenshot [project-id]</p>
                <p className="text-muted-foreground text-sm mt-3">Example: screenshot tfe</p>
              </div>
            )
          }
          break

        case 'contact':
          output = (
            <div className="text-secondary space-y-2">
              <div className="text-primary font-bold">Contact Information:</div>
              <p>
                🐙 GitHub:{' '}
                <span className="text-primary underline">github.com/GGPrompts</span>
              </p>
              <p className="text-muted-foreground text-sm mt-4">
                📊 {allProjects.length} repositories | {portfolioStats.totalStars} stars | {portfolioStats.totalForks} forks
              </p>
              <p className="text-muted-foreground text-sm">
                🚀 Specializing in TUI applications and developer tools
              </p>
            </div>
          )
          break

        case 'claude':
          output = <pre className="text-secondary whitespace-pre-wrap font-mono text-sm">{CLAUDE_TRIBUTE}</pre>
          break

        case 'prompt-engineer':
          output = <pre className="text-secondary whitespace-pre-wrap font-mono text-sm">{PROMPT_ENGINEERING}</pre>
          break

        case 'zero-to-hero':
          output = (
            <div className="text-secondary space-y-3">
              <div className="text-primary font-bold text-xl">The Zero-to-Hero Journey 🚀</div>
              <div className="border border-primary/30 rounded p-4 bg-primary/5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-primary text-3xl font-bold">{allProjects.length}</div>
                    <div className="text-muted-foreground text-sm">Projects Built</div>
                  </div>
                  <div>
                    <div className="text-primary text-3xl font-bold">6</div>
                    <div className="text-muted-foreground text-sm">Months</div>
                  </div>
                  <div>
                    <div className="text-primary text-3xl font-bold">{portfolioStats.totalStars}</div>
                    <div className="text-muted-foreground text-sm">GitHub Stars</div>
                  </div>
                  <div>
                    <div className="text-primary text-3xl font-bold">43.7%</div>
                    <div className="text-muted-foreground text-sm">Cost Reduction</div>
                  </div>
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <p className="text-primary font-semibold">The Formula:</p>
                <p className="ml-4">✓ Claude AI as pair programming partner</p>
                <p className="ml-4">✓ Focus on production-ready code</p>
                <p className="ml-4">✓ Ship early, iterate fast</p>
                <p className="ml-4">✓ Build tools that solve real problems</p>
                <p className="ml-4">✓ Open source everything</p>
              </div>
              <p className="text-muted-foreground text-sm mt-4">
                💡 Try 'timeline' for the full journey | 'claude' for the partnership story
              </p>
            </div>
          )
          break

        case 'resume':
          output = (
            <div className="text-secondary">
              <p className="text-primary">📄 Downloading resume.pdf...</p>
              <div className="mt-2 bg-primary/20 border border-primary/30 p-2 rounded">
                <p>[████████████████████] 100%</p>
                <p className="text-muted-foreground text-sm mt-1">Resume downloaded successfully!</p>
              </div>
            </div>
          )
          break

        case 'clear':
          setHistory([])
          return

        case 'ls':
          output = (
            <div className="text-secondary grid grid-cols-3 gap-4">
              <span className="text-primary">projects/</span>
              <span className="text-primary">skills/</span>
              <span>README.md</span>
              <span>contact.txt</span>
            </div>
          )
          break

        case 'cd':
          if (args) {
            setCurrentDirectory(args === '..' ? '~' : `~/${args}`)
            output = <span className="text-muted-foreground">Changed directory to {args}</span>
          } else {
            output = <span className="text-red-400">Error: Please specify a directory</span>
          }
          break

        case 'cat':
          if (args) {
            const file = FILE_SYSTEM[args]
            if (file && file.type === 'file') {
              output = <pre className="text-secondary whitespace-pre-wrap">{file.content}</pre>
            } else {
              output = <span className="text-red-400">cat: {args}: No such file</span>
            }
          } else {
            output = <span className="text-red-400">Error: Please specify a file</span>
          }
          break

        case 'tree':
          output = (
            <pre className="text-secondary font-mono text-sm">{`
~/
├── projects/
│   ├── featured.txt (${featuredProjects.length} projects)
│   ├── tui.txt (${getTUIProjects().length} projects)
│   └── web.txt (${getWebProjects().length} projects)
├── skills/
│   ├── languages.txt
│   └── frameworks.txt
├── README.md
└── contact.txt
          `}</pre>
          )
          break

        case 'whoami':
          output = (
            <div className="text-secondary">
              <p>matt@portfolio-terminal</p>
              <p className="text-muted-foreground">GitHub: @GGPrompts</p>
              <p className="text-muted-foreground">
                Projects: {allProjects.length} | Stars: {portfolioStats.totalStars}
              </p>
            </div>
          )
          break

        case 'date':
          output = <span className="text-secondary">{new Date().toString()}</span>
          break

        case 'echo':
          output = <span className="text-secondary">{args || ''}</span>
          break

        case 'history':
          output = (
            <div className="text-secondary space-y-1">
              {history.map((item, i) => (
                <div key={i}>
                  <span className="text-muted-foreground">{i + 1}</span> {item.command}
                </div>
              ))}
            </div>
          )
          break

        case 'matrix':
          setShowMatrix(true)
          setTimeout(() => setShowMatrix(false), 5000)
          output = <span className="text-primary">Entering the Matrix... 🕶️</span>
          break

        case 'hack':
          output = (
            <div className="text-primary font-mono">
              <p>ACCESSING MAINFRAME...</p>
              <p>[████████████████████] 100%</p>
              <p>ACCESS GRANTED</p>
              <p className="text-secondary mt-2">⚠️ Just kidding! This is just a resume 😄</p>
              <p className="text-muted-foreground text-sm mt-2">
                But I did build {allProjects.length} real projects in 6 months...
              </p>
            </div>
          )
          break

        case 'coffee':
          output = (
            <pre className="text-primary font-mono text-sm">{`
      )  (
     (   ) )
      ) ( (
    _______)_
 .-'---------|
( C|/\\/\\/\\/\\/|
 '-./\\/\\/\\/\\/|
   '_________'
    '-------'
☕ Coffee is ready!

Fuel for building ${allProjects.length} projects...
          `}</pre>
          )
          break

        case 'exit':
          output = <span className="text-red-400">Terminal session ended. Refresh to restart.</span>
          break

        default:
          if (command) {
            output = (
              <span className="text-red-400">
                Command not found: {command}. Type 'help' for available commands.
              </span>
            )
          }
      }

      if (output) {
        setHistory((prev) => [...prev, { command: cmd, output, timestamp: new Date() }])
      }
    },
    [history]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentCommand.trim()) return

    processCommand(currentCommand)
    setCurrentCommand('')
    setHistoryIndex(-1)
    setSuggestions([])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setCurrentCommand(history[history.length - 1 - newIndex].command)
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCurrentCommand(history[history.length - 1 - newIndex].command)
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setCurrentCommand('')
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const matches = commands.filter((cmd) => cmd.startsWith(currentCommand.toLowerCase()))
      if (matches.length === 1) {
        setCurrentCommand(matches[0])
        setSuggestions([])
      } else if (matches.length > 1) {
        setSuggestions(matches)
      }
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault()
      setHistory([])
    } else if (e.ctrlKey && e.key === 'c') {
      e.preventDefault()
      setCurrentCommand('')
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const initialCommands = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      processCommand("echo Welcome to Matt M.'s Interactive Terminal Resume!")
      await new Promise((resolve) => setTimeout(resolve, 1000))
      processCommand('echo Type "help" to see available commands')
      await new Promise((resolve) => setTimeout(resolve, 1500))
      processCommand('echo Try: projects --featured | stats | timeline | claude')
    }
    initialCommands()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-background text-foreground p-4 font-mono">
      <AnimatePresence>
        {showMatrix && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 overflow-hidden"
          >
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute text-primary text-xs animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animation: 'fall 5s linear infinite',
                }}
              >
                {Math.random() > 0.5 ? '0' : '1'}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto">
        <motion.pre
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-primary text-xs sm:text-sm md:text-base mb-4 terminal-glow"
        >
          {ASCII_HEADER}
        </motion.pre>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-dark rounded-lg p-4 h-[600px] overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive"></div>
              <div className="w-3 h-3 rounded-full bg-primary/40"></div>
              <div className="w-3 h-3 rounded-full bg-primary"></div>
            </div>
            <span className="text-muted-foreground text-sm">
              matt@portfolio — {allProjects.length} projects — 140+ ⭐
            </span>
          </div>

          <div
            ref={terminalRef}
            className="h-[520px] overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent"
          >
            <AnimatePresence>
              {history.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-3"
                >
                  <div className="flex items-start gap-2">
                    <span className="text-primary">{currentDirectory}</span>
                    <span className="text-secondary">$</span>
                    <span className="text-foreground">{item.command}</span>
                  </div>
                  {item.output && <div className="mt-1 ml-4">{item.output}</div>}
                </motion.div>
              ))}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="flex items-start gap-2">
              <span className="text-primary">{currentDirectory}</span>
              <span className="text-secondary">$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-foreground outline-none caret-primary"
                spellCheck={false}
                autoComplete="off"
                disabled={isTyping}
              />
            </form>

            {suggestions.length > 0 && (
              <div className="mt-2 ml-4 flex gap-4 text-muted-foreground">
                {suggestions.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-4 text-center text-muted-foreground text-sm"
        >
          <p>Hint: Try 'projects --featured', 'stats', 'timeline', 'claude', or 'zero-to-hero' 🚀</p>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh);
          }
          100% {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </div>
  )
}
