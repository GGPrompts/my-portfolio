/**
 * Documentation Hub Data
 * Categories and articles for the developer reference docs
 */

export const docsCategories = [
  {
    id: 'tui-tools',
    title: 'TUI Power Tools',
    description: 'Terminal User Interface tools for developers',
    icon: 'Terminal',
    color: 'from-emerald-500/20 to-teal-500/20',
    articles: [
      {
        id: 'tfe',
        title: 'TFE - Terminal File Explorer',
        description: 'AI-powered file manager with dual-pane navigation',
        featured: true,
        author: 'Matt M.',
        tags: ['Go', 'Bubbletea', 'File Manager', 'AI'],
      },
      {
        id: 'lazygit',
        title: 'LazyGit',
        description: 'Terminal UI for git commands',
        tags: ['Git', 'Version Control'],
      },
      {
        id: 'gitui',
        title: 'GitUI',
        description: 'Blazing fast terminal UI for git',
        tags: ['Git', 'Rust'],
      },
      {
        id: 'htop',
        title: 'htop',
        description: 'Interactive process viewer',
        tags: ['System', 'Monitoring'],
      },
      {
        id: 'bottom',
        title: 'bottom',
        description: 'Cross-platform system monitor',
        tags: ['System', 'Monitoring', 'Rust'],
      },
      {
        id: 'micro',
        title: 'Micro',
        description: 'Modern terminal text editor',
        tags: ['Editor', 'Go'],
      },
      {
        id: 'vim',
        title: 'Vim',
        description: 'The ubiquitous text editor',
        tags: ['Editor', 'Classic'],
      },
      {
        id: 'lnav',
        title: 'lnav - Log Navigator',
        description: 'Log file viewer with SQL queries',
        tags: ['Logs', 'Debugging'],
      },
      {
        id: 'spotify-player',
        title: 'Spotify Player',
        description: 'Spotify in the terminal',
        tags: ['Entertainment', 'Music'],
      },
    ],
  },
  {
    id: 'ai-apis',
    title: 'AI Assistant APIs',
    description: 'Reference for AI coding assistants and APIs',
    icon: 'Cpu',
    color: 'from-cyan-500/20 to-blue-500/20',
    articles: [
      {
        id: 'claude-code',
        title: 'Claude Code',
        description: 'AI pair programmer - primary development tool',
        featured: true,
        author: 'Anthropic',
        tags: ['AI', 'Claude', 'Primary Tool'],
      },
      {
        id: 'gemini',
        title: 'Google Gemini',
        description: 'Multimodal AI with image generation',
        tags: ['AI', 'Google', 'Image Gen'],
      },
      {
        id: 'codex',
        title: 'OpenAI Codex',
        description: 'Code completion and generation',
        tags: ['AI', 'OpenAI'],
      },
      {
        id: 'opencode',
        title: 'OpenCode',
        description: 'Local AI alternative with Ollama',
        tags: ['AI', 'Local', 'Privacy'],
      },
      {
        id: 'aichat',
        title: 'AIChat',
        description: 'CLI tool for multiple AI providers',
        tags: ['AI', 'CLI', 'Multi-provider'],
      },
    ],
  },
  {
    id: 'browser-apis',
    title: 'Browser & Extension APIs',
    description: 'Chrome Extensions and web APIs',
    icon: 'Globe',
    color: 'from-blue-500/20 to-indigo-500/20',
    articles: [
      {
        id: 'tabzchrome',
        title: 'TabzChrome Extension',
        description: 'Right-click to terminal - xterm.js PTY extension',
        featured: true,
        author: 'Matt M.',
        tags: ['Chrome', 'xterm.js', 'Extension'],
      },
      {
        id: 'chrome-api',
        title: 'Chrome Extension API',
        description: 'Manifest V3 reference and patterns',
        tags: ['Chrome', 'API', 'Manifest V3'],
      },
      {
        id: 'webextensions',
        title: 'WebExtensions API',
        description: 'Cross-browser extension development',
        tags: ['Firefox', 'Cross-browser'],
      },
    ],
  },
  {
    id: 'terminal-apis',
    title: 'Terminal & Mobile APIs',
    description: 'tmux and Termux API references',
    icon: 'Smartphone',
    color: 'from-indigo-500/20 to-purple-500/20',
    articles: [
      {
        id: 'tmux',
        title: 'tmux API',
        description: 'Terminal multiplexer reference',
        tags: ['tmux', 'Terminal', 'Multiplexer'],
      },
      {
        id: 'tmuxplexer',
        title: 'tmuxplexer',
        description: 'Manage all tmux sessions at once',
        featured: true,
        author: 'Matt M.',
        tags: ['tmux', 'TUI', 'Go'],
      },
      {
        id: 'termux',
        title: 'Termux API',
        description: 'Android terminal and API reference',
        tags: ['Android', 'Termux', 'Mobile'],
      },
      {
        id: 'mobile-tui',
        title: 'Mobile TUI Development',
        description: 'Running TUI apps on Android/Termux',
        tags: ['Mobile', 'TUI', 'Termux'],
      },
    ],
  },
];

export const featuredDocs = [
  {
    categoryId: 'tui-tools',
    articleId: 'tfe',
    title: 'TFE - Terminal File Explorer',
    description: 'AI-powered dual-pane file manager with mobile support',
    views: '2.1k',
    time: '12 min',
    trending: true,
  },
  {
    categoryId: 'ai-apis',
    articleId: 'claude-code',
    title: 'Claude Code - Complete Guide',
    description: 'The AI assistant used to build 45+ projects in 6 months',
    views: '5.8k',
    time: '25 min',
    trending: true,
  },
  {
    categoryId: 'browser-apis',
    articleId: 'tabzchrome',
    title: 'TabzChrome Extension',
    description: 'Right-click any text and send to terminal',
    views: '1.4k',
    time: '15 min',
    trending: true,
  },
  {
    categoryId: 'terminal-apis',
    articleId: 'tmuxplexer',
    title: 'tmuxplexer - Session Manager',
    description: 'Manage all tmux sessions with live previews',
    views: '980',
    time: '10 min',
    trending: false,
  },
  {
    categoryId: 'terminal-apis',
    articleId: 'tmux',
    title: 'tmux API Reference',
    description: 'Complete command reference and scripting guide',
    views: '3.2k',
    time: '20 min',
    trending: true,
  },
];

export const docStats = {
  totalArticles: 22,
  totalCategories: 4,
  totalViews: '28.5k',
  lastUpdated: '2025-11-22',
};
