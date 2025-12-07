'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SpaceBackground } from '@/components/SpaceBackground'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Kbd } from '@/components/ui/kbd'
import {
  Terminal, GitBranch, Package, Container, Cpu, Bot,
  Search, Copy, Check, Play, Command, Zap, Folder,
  FileCode, Server, Globe, Settings, BookOpen, ArrowRight,
  Download, ExternalLink, Music, Film, Pencil, Activity,
  HardDrive, FolderOpen, Edit3, Radio, ScrollText, Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Command categories with their commands
const commandCategories = {
  git: {
    name: "Git Workflows",
    icon: GitBranch,
    color: "from-orange-500 to-red-500",
    description: "Version control essentials",
    commands: [
      { cmd: "git status", desc: "Show working tree status", hint: "See what's changed" },
      { cmd: "git diff", desc: "Show unstaged changes", hint: "Review before staging" },
      { cmd: "git diff --staged", desc: "Show staged changes", hint: "Review before commit" },
      { cmd: "git add -p", desc: "Interactive staging", hint: "Stage hunks selectively" },
      { cmd: "git commit -m ''", desc: "Commit with message", hint: "Quick commit" },
      { cmd: "git log --oneline -20", desc: "Recent commits (compact)", hint: "Quick history" },
      { cmd: "git log --graph --oneline --all", desc: "Visual branch history", hint: "See all branches" },
      { cmd: "git stash", desc: "Stash current changes", hint: "Temporarily save work" },
      { cmd: "git stash pop", desc: "Apply and remove stash", hint: "Restore saved work" },
      { cmd: "git branch -a", desc: "List all branches", hint: "Local and remote" },
      { cmd: "git checkout -b feature/", desc: "Create and switch branch", hint: "Start new feature" },
      { cmd: "git pull --rebase origin main", desc: "Rebase onto main", hint: "Clean history" },
      { cmd: "git rebase -i HEAD~5", desc: "Interactive rebase", hint: "Edit last 5 commits" },
      { cmd: "git cherry-pick", desc: "Apply specific commit", hint: "Copy a commit" },
      { cmd: "git reset --soft HEAD~1", desc: "Undo last commit (keep changes)", hint: "Uncommit" },
      { cmd: "git reflog", desc: "Show reference logs", hint: "Recover lost commits" },
    ]
  },
  dev: {
    name: "Development",
    icon: Package,
    color: "from-green-500 to-emerald-500",
    description: "NPM, Node, and dev servers",
    commands: [
      { cmd: "npm run dev", desc: "Start development server", hint: "Hot reload enabled" },
      { cmd: "npm run build", desc: "Production build", hint: "Optimize for deploy" },
      { cmd: "npm run lint", desc: "Run linter", hint: "Check code style" },
      { cmd: "npm run test", desc: "Run test suite", hint: "Verify functionality" },
      { cmd: "npm install", desc: "Install dependencies", hint: "From package.json" },
      { cmd: "npm install --save-dev", desc: "Install dev dependency", hint: "Add dev package" },
      { cmd: "npm outdated", desc: "Check for updates", hint: "See old packages" },
      { cmd: "npm audit", desc: "Security audit", hint: "Find vulnerabilities" },
      { cmd: "npx tsc --noEmit", desc: "Type check (no output)", hint: "Validate TypeScript" },
      { cmd: "npx prisma studio", desc: "Open Prisma Studio", hint: "Database GUI" },
      { cmd: "npx prisma migrate dev", desc: "Run migrations", hint: "Update database" },
      { cmd: "npx shadcn@latest add", desc: "Add shadcn component", hint: "UI components" },
    ]
  },
  docker: {
    name: "Docker",
    icon: Container,
    color: "from-blue-500 to-cyan-500",
    description: "Container management",
    commands: [
      { cmd: "docker ps", desc: "List running containers", hint: "Active containers" },
      { cmd: "docker ps -a", desc: "List all containers", hint: "Including stopped" },
      { cmd: "docker images", desc: "List images", hint: "Available images" },
      { cmd: "docker compose up -d", desc: "Start services (detached)", hint: "Background mode" },
      { cmd: "docker compose down", desc: "Stop and remove services", hint: "Clean shutdown" },
      { cmd: "docker compose logs -f", desc: "Follow logs", hint: "Live output" },
      { cmd: "docker exec -it bash", desc: "Shell into container", hint: "Interactive access" },
      { cmd: "docker build -t . ", desc: "Build image", hint: "From Dockerfile" },
      { cmd: "docker system prune -a", desc: "Clean everything", hint: "Free disk space" },
      { cmd: "docker stats", desc: "Resource usage", hint: "CPU, memory, network" },
    ]
  },
  system: {
    name: "System",
    icon: Cpu,
    color: "from-purple-500 to-pink-500",
    description: "File ops and processes",
    commands: [
      { cmd: "ls -la", desc: "List files (detailed)", hint: "All files with permissions" },
      { cmd: "find . -name '*.ts' -type f", desc: "Find TypeScript files", hint: "Recursive search" },
      { cmd: "grep -r 'TODO' --include='*.ts'", desc: "Search in TS files", hint: "Find TODOs" },
      { cmd: "du -sh *", desc: "Directory sizes", hint: "Human readable" },
      { cmd: "df -h", desc: "Disk space", hint: "All mounted drives" },
      { cmd: "htop", desc: "Process monitor", hint: "Interactive top" },
      { cmd: "kill -9", desc: "Force kill process", hint: "By PID" },
      { cmd: "lsof -i :3000", desc: "Who's using port 3000", hint: "Port conflicts" },
      { cmd: "tail -f", desc: "Follow file", hint: "Live log viewing" },
      { cmd: "chmod +x", desc: "Make executable", hint: "Add execute permission" },
      { cmd: "chown -R $USER:$USER", desc: "Take ownership", hint: "Recursive" },
      { cmd: "rsync -avz --progress", desc: "Sync files", hint: "With progress" },
    ]
  },
  claude: {
    name: "Claude / MCP",
    icon: Bot,
    color: "from-primary to-emerald-500",
    description: "AI and MCP keywords",
    commands: [
      { cmd: "/ttmcp", desc: "TabzChrome MCP menu", hint: "Interactive tool picker" },
      { cmd: "tabz_screenshot", desc: "Capture browser screenshot", hint: "MCP tool" },
      { cmd: "tabz_click", desc: "Click element by selector", hint: "MCP tool" },
      { cmd: "tabz_fill", desc: "Fill input field", hint: "MCP tool" },
      { cmd: "tabz_list_tabs", desc: "List browser tabs", hint: "MCP tool" },
      { cmd: "tabz_switch_tab", desc: "Switch to tab by ID", hint: "MCP tool" },
      { cmd: "tabz_execute_script", desc: "Run JS in page", hint: "MCP tool" },
      { cmd: "tabz_get_console_logs", desc: "Get browser console", hint: "MCP tool" },
      { cmd: "claude --agent", desc: "Start with agent", hint: "Specialized role" },
      { cmd: "claude --dangerously-skip-permissions", desc: "Skip confirmations", hint: "Auto-approve" },
      { cmd: "/handoff", desc: "Generate session handoff", hint: "Continue in new session" },
      { cmd: "/prompt-engineer", desc: "Prompt refinement", hint: "Improve prompts" },
    ]
  },
  tmux: {
    name: "tmux",
    icon: Terminal,
    color: "from-yellow-500 to-orange-500",
    description: "Terminal multiplexer",
    commands: [
      { cmd: "tmux new -s main", desc: "Create session 'main'", hint: "Named session" },
      { cmd: "tmux attach -t main", desc: "Attach to session", hint: "Reconnect" },
      { cmd: "tmux ls", desc: "List sessions", hint: "See all sessions" },
      { cmd: "tmux kill-session -t", desc: "Kill session", hint: "By name" },
      { cmd: "tmux split-window -h", desc: "Split horizontally", hint: "Side by side" },
      { cmd: "tmux split-window -v", desc: "Split vertically", hint: "Top and bottom" },
      { cmd: "tmux send-keys -t 'text' C-m", desc: "Send to pane", hint: "With Enter" },
      { cmd: "tmux capture-pane -t -p", desc: "Capture output", hint: "Get pane content" },
      { cmd: "tmux select-pane -t", desc: "Select pane", hint: "By index" },
      { cmd: "tmux resize-pane -D 10", desc: "Resize pane down", hint: "By 10 lines" },
    ]
  },
}

// Keyboard shortcuts reference
const shortcuts = [
  { keys: ["Ctrl", "Shift", "9"], action: "Open TabzChrome sidebar" },
  { keys: ["Ctrl", "Shift", "C"], action: "Copy in terminal" },
  { keys: ["Ctrl", "Shift", "V"], action: "Paste in terminal" },
  { keys: ["Ctrl", "B"], action: "tmux prefix key" },
  { keys: ["Ctrl", "C"], action: "Cancel / interrupt" },
  { keys: ["Ctrl", "Z"], action: "Suspend process" },
  { keys: ["Ctrl", "R"], action: "Reverse search history" },
  { keys: ["Ctrl", "L"], action: "Clear terminal" },
]

// TUI Tools data
const tuiTools = {
  monitoring: {
    name: "System Monitoring",
    icon: Activity,
    color: "from-red-500 to-orange-500",
    tools: [
      {
        name: "btop",
        description: "Modern, feature-rich system monitor with mouse support",
        launch: "btop",
        install: {
          apt: "sudo apt install btop",
          brew: "brew install btop",
        },
        github: "https://github.com/aristocratos/btop",
      },
      {
        name: "htop",
        description: "Interactive process viewer and system monitor",
        launch: "htop",
        install: {
          apt: "sudo apt install htop",
          brew: "brew install htop",
        },
        github: "https://github.com/htop-dev/htop",
      },
      {
        name: "bottom",
        description: "Cross-platform graphical process/system monitor written in Rust",
        launch: "btm",
        install: {
          cargo: "cargo install bottom",
          brew: "brew install bottom",
        },
        github: "https://github.com/ClementTsang/bottom",
      },
    ],
  },
  git: {
    name: "Git & Version Control",
    icon: GitBranch,
    color: "from-orange-500 to-yellow-500",
    tools: [
      {
        name: "lazygit",
        description: "Simple terminal UI for git commands with keyboard shortcuts",
        launch: "lazygit",
        install: {
          go: "go install github.com/jesseduffield/lazygit@latest",
          brew: "brew install lazygit",
        },
        github: "https://github.com/jesseduffield/lazygit",
      },
    ],
  },
  docker: {
    name: "Docker",
    icon: Container,
    color: "from-blue-500 to-cyan-500",
    tools: [
      {
        name: "lazydocker",
        description: "Simple terminal UI for docker and docker-compose",
        launch: "lazydocker",
        install: {
          go: "go install github.com/jesseduffield/lazydocker@latest",
          brew: "brew install lazydocker",
        },
        github: "https://github.com/jesseduffield/lazydocker",
      },
    ],
  },
  files: {
    name: "File Management",
    icon: FolderOpen,
    color: "from-emerald-500 to-green-500",
    tools: [
      {
        name: "tfe",
        description: "Terminal File Explorer — Bubbletea-powered file manager",
        launch: "tfe",
        install: {
          go: "go install github.com/GGPrompts/tfe@latest",
        },
        github: "https://github.com/GGPrompts/tfe",
        featured: true,
      },
      {
        name: "yazi",
        description: "Blazing fast terminal file manager written in Rust",
        launch: "yazi",
        install: {
          cargo: "cargo install yazi-fm yazi-cli",
          brew: "brew install yazi",
        },
        github: "https://github.com/sxyazi/yazi",
      },
      {
        name: "ranger",
        description: "VIM-inspired file manager with preview support",
        launch: "ranger",
        install: {
          apt: "sudo apt install ranger",
          brew: "brew install ranger",
          pip: "pip install ranger-fm",
        },
        github: "https://github.com/ranger/ranger",
      },
    ],
  },
  editors: {
    name: "Text Editors",
    icon: Edit3,
    color: "from-violet-500 to-purple-500",
    tools: [
      {
        name: "micro",
        description: "Modern and intuitive terminal-based text editor",
        launch: "micro",
        install: {
          apt: "sudo apt install micro",
          brew: "brew install micro",
        },
        github: "https://github.com/zyedidia/micro",
      },
      {
        name: "nvim",
        description: "Hyperextensible Vim-based text editor",
        launch: "nvim",
        install: {
          apt: "sudo apt install neovim",
          brew: "brew install neovim",
        },
        github: "https://github.com/neovim/neovim",
      },
    ],
  },
  media: {
    name: "Media & Fun",
    icon: Music,
    color: "from-pink-500 to-rose-500",
    tools: [
      {
        name: "pyradio",
        description: "Internet radio player for the command line",
        launch: "pyradio",
        install: {
          pip: "pip install pyradio",
        },
        github: "https://github.com/coderholic/pyradio",
      },
      {
        name: "spotify_player",
        description: "Terminal-based Spotify player with full playback control",
        launch: "spotify_player",
        install: {
          cargo: "cargo install spotify_player",
          brew: "brew install spotify_player",
        },
        github: "https://github.com/aome510/spotify-player",
      },
      {
        name: "textual-paint",
        description: "MS Paint clone for the terminal using Textual",
        launch: "textual-paint",
        install: {
          pip: "pip install textual-paint",
        },
        github: "https://github.com/1j01/textual-paint",
      },
    ],
  },
  logs: {
    name: "Logs & Debugging",
    icon: ScrollText,
    color: "from-amber-500 to-yellow-500",
    tools: [
      {
        name: "lnav",
        description: "Advanced log file navigator with syntax highlighting",
        launch: "lnav",
        install: {
          apt: "sudo apt install lnav",
          brew: "brew install lnav",
        },
        github: "https://github.com/tstack/lnav",
      },
    ],
  },
}

type InstallMethods = {
  apt?: string
  brew?: string
  cargo?: string
  go?: string
  pip?: string
}

type TUITool = {
  name: string
  description: string
  launch: string
  install: InstallMethods
  github: string
  featured?: boolean
}

// Individual command component with TabzChrome integration
// Note: TabzChrome extension modifies elements with data-terminal-command after page load,
// which can cause hydration warnings. We use suppressHydrationWarning to handle this gracefully.
function TerminalCommand({
  command,
  description,
  hint
}: {
  command: string
  description: string
  hint?: string
}) {
  const [copied, setCopied] = useState(false)
  const [queued, setQueued] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Only render interactive elements after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [command])

  const handleRun = useCallback(() => {
    // TabzChrome integration via data-terminal-command attribute
    // The click handler triggers the Chrome extension to open sidebar
    setQueued(true)
    setTimeout(() => setQueued(false), 2000)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group"
    >
      <Card className="glass border-primary/20 p-4 hover:border-primary/40 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Command code block - suppressHydrationWarning due to TabzChrome extension modifications */}
          <div className="flex-1 min-w-0" suppressHydrationWarning>
            <code
              className="text-sm text-primary font-mono block truncate"
              data-terminal-command={mounted ? command : undefined}
              suppressHydrationWarning
            >
              {command}
            </code>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
            {hint && (
              <span className="text-[10px] text-muted-foreground/60 italic">{hint}</span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 flex-shrink-0" suppressHydrationWarning>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-2 text-muted-foreground hover:text-primary"
              onClick={handleCopy}
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 px-3 border-primary/30 text-primary hover:bg-primary/10"
              data-terminal-command={mounted ? command : undefined}
              onClick={handleRun}
              suppressHydrationWarning
            >
              {queued ? (
                <>
                  <Check className="w-3 h-3 mr-1 text-green-500" />
                  Queued!
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 mr-1" />
                  Run
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

// TUI Tool card with install and launch buttons
// Note: TabzChrome extension modifies elements with data-terminal-command after page load
function TUIToolCard({ tool }: { tool: TUITool }) {
  const [activeInstall, setActiveInstall] = useState<string | null>(null)
  const [launchQueued, setLaunchQueued] = useState(false)
  const [installQueued, setInstallQueued] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  // Only render data-terminal-command after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const installMethods = Object.entries(tool.install) as [keyof InstallMethods, string][]

  const handleLaunch = useCallback(() => {
    setLaunchQueued(true)
    setTimeout(() => setLaunchQueued(false), 2000)
  }, [])

  const handleInstall = useCallback((method: string, cmd: string) => {
    setInstallQueued(method)
    setTimeout(() => setInstallQueued(null), 2000)
  }, [])

  const methodLabels: Record<keyof InstallMethods, string> = {
    apt: 'apt',
    brew: 'brew',
    cargo: 'cargo',
    go: 'go',
    pip: 'pip',
  }

  const methodColors: Record<keyof InstallMethods, string> = {
    apt: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    brew: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    cargo: 'bg-red-500/20 text-red-400 border-red-500/30',
    go: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    pip: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group"
    >
      <Card className={cn(
        "glass border-primary/20 p-5 hover:border-primary/40 transition-all h-full",
        tool.featured && "border-primary/40 ring-1 ring-primary/20"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-primary text-lg">{tool.name}</h3>
              {tool.featured && (
                <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px]">
                  <Sparkles className="w-3 h-3 mr-1" />
                  My Project
                </Badge>
              )}
            </div>
            <a
              href={tool.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 flex-grow">
            {tool.description}
          </p>

          {/* Launch button */}
          <div className="mb-3" suppressHydrationWarning>
            <Button
              size="sm"
              className="w-full bg-primary/20 text-primary hover:bg-primary/30 border border-primary/30"
              data-terminal-command={mounted ? tool.launch : undefined}
              onClick={handleLaunch}
              suppressHydrationWarning
            >
              {launchQueued ? (
                <>
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Queued!
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run <code className="ml-1 font-mono text-xs bg-primary/20 px-1 rounded">{tool.launch}</code>
                </>
              )}
            </Button>
          </div>

          {/* Install options */}
          <div className="space-y-2" suppressHydrationWarning>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Install with</span>
            <div className="flex flex-wrap gap-2">
              {installMethods.map(([method, cmd]) => (
                <Button
                  key={method}
                  size="sm"
                  variant="ghost"
                  className={cn(
                    "h-7 px-2 text-xs border",
                    methodColors[method],
                    installQueued === method && "!bg-green-500/20 !text-green-400 !border-green-500/30"
                  )}
                  data-terminal-command={mounted ? cmd : undefined}
                  onClick={() => handleInstall(method, cmd)}
                  suppressHydrationWarning
                >
                  {installQueued === method ? (
                    <>
                      <Check className="w-3 h-3 mr-1" />
                      Queued!
                    </>
                  ) : (
                    <>
                      <Download className="w-3 h-3 mr-1" />
                      {methodLabels[method]}
                    </>
                  )}
                </Button>
              ))}
            </div>

            {/* Show install command on hover/tap */}
            {activeInstall && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-2 p-2 bg-black/30 rounded text-xs font-mono text-muted-foreground overflow-x-auto"
              >
                {tool.install[activeInstall as keyof InstallMethods]}
              </motion.div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default function CommandsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  // Filter commands based on search
  const filteredCategories = Object.entries(commandCategories).reduce<Record<string, typeof commandCategories[keyof typeof commandCategories]>>((acc, [key, category]) => {
    const filteredCommands = category.commands.filter(cmd =>
      searchQuery === '' ||
      cmd.cmd.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.desc.toLowerCase().includes(searchQuery.toLowerCase())
    )
    if (filteredCommands.length > 0) {
      acc[key] = { ...category, commands: filteredCommands }
    }
    return acc
  }, {})

  // Calculate total commands
  const totalCommands = Object.values(commandCategories).reduce(
    (sum, cat) => sum + cat.commands.length, 0
  )

  const filteredCount = Object.values(filteredCategories).reduce(
    (sum, cat) => sum + cat.commands.length, 0
  )

  return (
    <div className="min-h-screen relative">
      {/* Stars background */}
      <SpaceBackground speed={0.2} opacity={0.6} />

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              <Terminal className="w-3 h-3 mr-1" />
              {totalCommands} Commands
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text-theme">
              Terminal Commands
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Quick reference for essential CLI commands. Click <strong className="text-primary">Run</strong> to send commands directly to TabzChrome terminals.
            </p>

            {/* Search bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search commands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 border-primary/20 focus:border-primary/50"
              />
              {searchQuery && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  {filteredCount} results
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* TabzChrome Integration Notice */}
      <section className="relative z-10 px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass border-primary/30 p-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-primary mb-1">TabzChrome Integration</h3>
                  <p className="text-sm text-muted-foreground">
                    Click the <strong>Run</strong> button on any command to open the TabzChrome sidebar.
                    The command will be queued in the chat input, ready to send to your terminal.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Command Categories */}
      <section className="relative z-10 px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Tab navigation */}
            <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto mb-8">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary border border-primary/20"
              >
                <Command className="w-4 h-4 mr-2" />
                All
              </TabsTrigger>
              {Object.entries(commandCategories).map(([key, category]) => {
                const Icon = category.icon
                return (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary border border-primary/20"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {category.name}
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {/* All commands tab */}
            <TabsContent value="all" className="space-y-12">
              <AnimatePresence mode="wait">
                {Object.entries(filteredCategories).map(([key, category]) => {
                  const Icon = category.icon
                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      {/* Category header */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-lg",
                          category.color
                        )}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-primary">{category.name}</h2>
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                        </div>
                        <Badge variant="outline" className="ml-auto border-primary/20 text-primary">
                          {category.commands.length} commands
                        </Badge>
                      </div>

                      {/* Commands grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {category.commands.map((cmd) => (
                          <TerminalCommand
                            key={cmd.cmd}
                            command={cmd.cmd}
                            description={cmd.desc}
                            hint={cmd.hint}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>

              {filteredCount === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No commands found for "{searchQuery}"</p>
                </motion.div>
              )}
            </TabsContent>

            {/* Individual category tabs */}
            {Object.entries(commandCategories).map(([key, category]) => {
              const Icon = category.icon
              const filtered = filteredCategories[key]
              return (
                <TabsContent key={key} value={key}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {/* Category header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-lg",
                        category.color
                      )}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-primary">{category.name}</h2>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                    </div>

                    {/* Commands grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(filtered?.commands || category.commands).map((cmd) => (
                        <TerminalCommand
                          key={cmd.cmd}
                          command={cmd.cmd}
                          description={cmd.desc}
                          hint={cmd.hint}
                        />
                      ))}
                    </div>

                    {filtered && filtered.commands.length === 0 && (
                      <div className="text-center py-12">
                        <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No commands found for "{searchQuery}"</p>
                      </div>
                    )}
                  </motion.div>
                </TabsContent>
              )
            })}
          </Tabs>
        </div>
      </section>

      {/* TUI Tools Section */}
      <section className="relative z-10 px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              <Sparkles className="w-3 h-3 mr-1" />
              {Object.values(tuiTools).reduce((sum, cat) => sum + cat.tools.length, 0)} Tools
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold gradient-text-theme mb-4">
              TUI Tools
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover and install powerful Terminal User Interface applications.
              Click to launch or install directly via TabzChrome.
            </p>
          </motion.div>

          {/* TUI Tools by category */}
          <div className="space-y-12">
            {Object.entries(tuiTools).map(([key, category]) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  {/* Category header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-lg",
                      category.color
                    )}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.tools.length} tool{category.tools.length !== 1 ? 's' : ''}</p>
                    </div>
                  </div>

                  {/* Tools grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.tools.map((tool) => (
                      <TUIToolCard key={tool.name} tool={tool} />
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Keyboard Shortcuts Section */}
      <section className="relative z-10 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
              Keyboard Shortcuts
            </h2>
            <p className="text-muted-foreground">Essential hotkeys for terminal productivity</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shortcuts.map((shortcut, index) => (
              <motion.div
                key={shortcut.action}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="glass border-primary/20 p-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{shortcut.action}</span>
                  <div className="flex gap-1">
                    {shortcut.keys.map((key, i) => (
                      <span key={i} className="flex items-center gap-1">
                        <Kbd className="bg-primary/10 text-primary border-primary/30">{key}</Kbd>
                        {i < shortcut.keys.length - 1 && <span className="text-muted-foreground">+</span>}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-4 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text-theme">
              Ready to Level Up?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get TabzChrome for seamless terminal integration in your browser.
              Send commands with one click.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 group" asChild>
                <a href="/projects/tabz-chrome">
                  <Terminal className="w-5 h-5 mr-2" />
                  Get TabzChrome
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/10" asChild>
                <a href="https://github.com/GGPrompts/TabzChrome" target="_blank" rel="noopener noreferrer">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Documentation
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating cursor glow effect */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-30"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(var(--primary) / 0.03), transparent 40%)`
        }}
      />
    </div>
  )
}
