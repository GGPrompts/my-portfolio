/**
 * Portfolio Media Library
 *
 * This file manages all media assets (screenshots, videos, asciinema recordings)
 * for portfolio projects.
 *
 * @see /public/demos/README.md for instructions on adding new media
 */

// ============================================================================
// TypeScript Interfaces
// ============================================================================

/**
 * Screenshot metadata
 * Files should be placed in /public/demos/screenshots/{projectId}/
 */
export interface Screenshot {
  /** Filename (e.g., "hero.png", "terminal-view.png") */
  filename: string;
  /** Alt text for accessibility */
  alt: string;
  /** Optional caption to display below image */
  caption?: string;
  /** Mark as hero/primary screenshot */
  isPrimary?: boolean;
}

/**
 * Asciinema recording metadata
 * .cast files should be placed in /public/demos/asciicasts/
 */
export interface AsciinemaRecording {
  /** Filename (e.g., "demo.cast") */
  filename: string;
  /** Brief description of what the recording shows */
  description: string;
  /** Duration in seconds (for UI display) */
  duration?: number;
}

/**
 * YouTube video metadata
 * Uses YouTube's embed player
 */
export interface YouTubeVideo {
  /** YouTube video ID (the part after v= in the URL) */
  videoId: string;
  /** Video title */
  title: string;
  /** Brief description */
  description?: string;
}

/**
 * Complete media set for a project
 */
export interface ProjectMedia {
  /** Project ID (must match ID from projects-data.ts) */
  projectId: string;
  /** Screenshots array (organized in /public/demos/screenshots/{projectId}/) */
  screenshots: Screenshot[];
  /** YouTube videos (optional) */
  youtube?: YouTubeVideo[];
  /** Asciinema recordings (optional) */
  asciinema?: AsciinemaRecording[];
  /** Live demo URL (optional) */
  demoUrl?: string;
}

// ============================================================================
// Media Library
// ============================================================================

/**
 * Central media library for all portfolio projects
 *
 * To add media for a project:
 * 1. Add screenshots to /public/demos/screenshots/{projectId}/
 * 2. Add .cast files to /public/demos/asciicasts/
 * 3. Update the corresponding entry below
 *
 * @see /public/demos/README.md for detailed instructions
 */
export const mediaLibrary: ProjectMedia[] = [
  // ========================================
  // ClaudeGlobalCommands - Developer Tools
  // ========================================
  {
    projectId: 'claude-global-commands',
    screenshots: [
      {
        filename: 'hero.png',
        alt: 'ClaudeGlobalCommands workspace showing AI agents and workflows',
        caption: '30+ specialized AI agents across software development',
        isPrimary: true,
      },
      {
        filename: 'agent-hierarchy.png',
        alt: 'Hierarchical architecture diagram showing agent organization',
        caption: 'Hierarchical design reduces tokens by 43.7%',
      },
      {
        filename: 'execute-command.png',
        alt: '/execute command interface showing intelligent task routing',
        caption: 'Intelligent task routing through /execute command',
      },
    ],
    // Add when available:
    // youtube: [
    //   {
    //     videoId: 'YOUR_VIDEO_ID',
    //     title: 'ClaudeGlobalCommands Demo',
    //     description: 'Complete walkthrough of AI agents and workflows',
    //   },
    // ],
    demoUrl: 'https://github.com/GGPrompts/ClaudeGlobalCommands',
  },

  // ========================================
  // TFE - Terminal File Explorer
  // ========================================
  {
    projectId: 'tfe',
    screenshots: [
      {
        filename: 'dual-pane.png',
        alt: 'TFE dual-pane interface with syntax highlighting',
        caption: 'Dual-pane split-screen with live preview',
        isPrimary: true,
      },
      {
        filename: 'ai-prompts.png',
        alt: 'Integrated AI prompts library with variable substitution',
        caption: 'Only terminal file manager with integrated AI prompts',
      },
      {
        filename: 'image-preview.png',
        alt: 'HD image preview using Kitty graphics protocol',
        caption: 'Native graphics protocol support for HD images',
      },
      {
        filename: 'mobile-termux.png',
        alt: 'TFE running on Android Termux with touch gestures',
        caption: 'Full mobile support on Android/Termux',
      },
    ],
    asciinema: [
      {
        filename: 'tfe-demo.cast',
        description: 'Complete TFE walkthrough: navigation, preview, AI prompts',
        duration: 120,
      },
      {
        filename: 'tfe-mobile.cast',
        description: 'Touch gestures and mobile usage on Termux',
        duration: 60,
      },
    ],
  },

  // ========================================
  // Tabz - Browser Terminal Interface
  // ========================================
  {
    projectId: 'tabz',
    screenshots: [
      {
        filename: 'terminal-tabs.png',
        alt: 'Multiple terminal tabs in browser interface',
        caption: '15 terminal types in your browser',
        isPrimary: true,
      },
      {
        filename: 'tmux-integration.png',
        alt: 'Tmux session management with context menus',
        caption: 'Dual context menus for sessions and panes',
      },
      {
        filename: 'spawn-menu.png',
        alt: 'Terminal spawn menu with 15 terminal types',
        caption: 'Claude Code, Bash, TFE, LazyGit, and more',
      },
    ],
    // Live demo when deployed:
    // demoUrl: 'https://tabz.vercel.app',
  },

  // ========================================
  // TabzChrome - Browser Extension
  // ========================================
  {
    projectId: 'tabz-chrome',
    screenshots: [
      {
        filename: 'sidebar-panel.png',
        alt: 'Chrome sidebar showing active tmux sessions',
        caption: 'Always-visible terminal access in Chrome',
        isPrimary: true,
      },
      {
        filename: 'quick-commands.png',
        alt: 'Quick commands panel with custom shortcuts',
        caption: 'Built-in and custom command shortcuts',
      },
      {
        filename: 'theme-options.png',
        alt: 'Dark and light theme options',
        caption: 'Adjustable themes and font sizes',
      },
    ],
  },

  // ========================================
  // 3d-terminals-starter - Template
  // ========================================
  {
    projectId: '3d-terminals-starter',
    screenshots: [
      {
        filename: '3d-scene.png',
        alt: '3D environment with interactive terminal panels',
        caption: 'Interactive 3D objects with functional terminals',
        isPrimary: true,
      },
      {
        filename: 'terminal-flip.png',
        alt: 'Object flipping to reveal working terminal',
        caption: 'Click-to-flip mechanism with persistent sessions',
      },
    ],
    youtube: [
      {
        videoId: 'EXAMPLE_ID',
        title: '3D Terminals Demo',
        description: 'Interactive 3D scene with working bash terminals',
      },
    ],
  },

  // ========================================
  // bit - CLI/TUI Logo Designer
  // ========================================
  {
    projectId: 'bit',
    screenshots: [
      {
        filename: 'font-preview.png',
        alt: 'bit showing 100+ embedded bitmap fonts',
        caption: '100+ terminal fonts with gradients and shadows',
        isPrimary: true,
      },
      {
        filename: 'gradient-effects.png',
        alt: 'Color gradients and shadow effects',
        caption: 'Horizontal/vertical gradients with adjustable shadows',
      },
      {
        filename: 'export-options.png',
        alt: 'Multi-language export options',
        caption: 'Export to Go, JavaScript, Python, Rust, Bash',
      },
    ],
    asciinema: [
      {
        filename: 'bit-demo.cast',
        description: 'Creating ASCII art logos with gradients and shadows',
        duration: 90,
      },
    ],
  },

  // ========================================
  // tkan - Terminal Kanban Board
  // ========================================
  {
    projectId: 'tkan',
    screenshots: [
      {
        filename: 'kanban-board.png',
        alt: 'Visual kanban board with 5 columns',
        caption: 'Solitaire-style stacked cards with drag-and-drop',
        isPrimary: true,
      },
      {
        filename: 'detail-panel.png',
        alt: 'Toggleable detail panel showing card metadata',
        caption: 'Full card lifecycle management',
      },
      {
        filename: 'multi-project.png',
        alt: 'Multi-project support with YAML files',
        caption: 'YAML-based persistence for version control',
      },
    ],
    asciinema: [
      {
        filename: 'tkan-demo.cast',
        description: 'Drag-and-drop workflow and card management',
        duration: 75,
      },
    ],
  },

  // ========================================
  // gg-hub - Developer Workspace
  // ========================================
  {
    projectId: 'gg-hub',
    screenshots: [
      {
        filename: 'dashboard.png',
        alt: 'gg-hub dashboard managing 20 projects',
        caption: 'Manage 20 projects with integrated terminals',
        isPrimary: true,
      },
      {
        filename: 'terminal-sidebar.png',
        alt: 'Resizable terminal sidebar with tabz integration',
        caption: 'Multi-terminal support with tmux sessions',
      },
      {
        filename: 'quick-commands.png',
        alt: 'Quick commands panel with 50+ developer commands',
        caption: 'One-click actions for starting and stopping projects',
      },
      {
        filename: 'live-preview.png',
        alt: 'Live preview of running development server',
        caption: 'Real-time status detection and live preview',
      },
    ],
    // Live demo when deployed:
    // demoUrl: 'https://gg-hub.vercel.app',
  },

  // ========================================
  // tmuxplexer - Tmux Session Manager
  // ========================================
  {
    projectId: 'tmuxplexer',
    screenshots: [
      {
        filename: 'session-list.png',
        alt: 'List of all tmux sessions with live previews',
        caption: 'Manage tmux sessions with visual previews',
        isPrimary: true,
      },
      {
        filename: 'live-preview.png',
        alt: 'Live preview of session contents',
        caption: 'Real-time session content preview',
      },
    ],
    asciinema: [
      {
        filename: 'tmuxplexer-demo.cast',
        description: 'Tmux session management and live previews',
        duration: 45,
      },
    ],
  },

  // ========================================
  // TUIClassics - Terminal Games
  // ========================================
  {
    projectId: 'tui-classics',
    screenshots: [
      {
        filename: 'launcher.png',
        alt: 'TUIClassics launcher menu with 6 games',
        caption: 'Windows 95 nostalgia meets modern terminals',
        isPrimary: true,
      },
      {
        filename: 'minesweeper.png',
        alt: 'Minesweeper game with beautiful TUI rendering',
        caption: 'Classic Minesweeper with mouse support',
      },
      {
        filename: 'solitaire.png',
        alt: 'Solitaire game with cascade animations',
        caption: 'Satisfying waterfall animations',
      },
      {
        filename: '2048.png',
        alt: '2048 puzzle game in the terminal',
        caption: 'Smooth tile sliding animations',
      },
      {
        filename: 'snake.png',
        alt: 'Snake game with score tracking',
        caption: 'Persistent high scores and statistics',
      },
    ],
    asciinema: [
      {
        filename: 'tuiclassics-demo.cast',
        description: 'Gameplay footage of all 6 classic games',
        duration: 180,
      },
    ],
  },
];

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get all media for a specific project
 */
export function getProjectMedia(projectId: string): ProjectMedia | undefined {
  return mediaLibrary.find((media) => media.projectId === projectId);
}

/**
 * Get primary screenshot for a project (for cards/previews)
 */
export function getPrimaryScreenshot(projectId: string): Screenshot | undefined {
  const media = getProjectMedia(projectId);
  if (!media) return undefined;

  return media.screenshots.find((s) => s.isPrimary) || media.screenshots[0];
}

/**
 * Get all screenshots for a project
 */
export function getScreenshots(projectId: string): Screenshot[] {
  const media = getProjectMedia(projectId);
  return media?.screenshots || [];
}

/**
 * Get YouTube videos for a project
 */
export function getYouTubeVideos(projectId: string): YouTubeVideo[] {
  const media = getProjectMedia(projectId);
  return media?.youtube || [];
}

/**
 * Get asciinema recordings for a project
 */
export function getAsciinemaRecordings(projectId: string): AsciinemaRecording[] {
  const media = getProjectMedia(projectId);
  return media?.asciinema || [];
}

/**
 * Check if project has any media
 */
export function hasMedia(projectId: string): boolean {
  const media = getProjectMedia(projectId);
  if (!media) return false;

  return (
    media.screenshots.length > 0 ||
    (media.youtube?.length || 0) > 0 ||
    (media.asciinema?.length || 0) > 0 ||
    !!media.demoUrl
  );
}

/**
 * Get full path to screenshot
 * @param projectId Project ID
 * @param filename Screenshot filename
 * @returns Path relative to /public (e.g., "/demos/screenshots/tfe/dual-pane.png")
 */
export function getScreenshotPath(projectId: string, filename: string): string {
  return `/demos/screenshots/${projectId}/${filename}`;
}

/**
 * Get full path to asciinema recording
 * @param filename Recording filename
 * @returns Path relative to /public (e.g., "/demos/asciicasts/tfe-demo.cast")
 */
export function getAsciinemaPath(filename: string): string {
  return `/demos/asciicasts/${filename}`;
}

/**
 * Get YouTube embed URL
 * @param videoId YouTube video ID
 * @returns Embed URL for iframe
 */
export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}

/**
 * Get YouTube thumbnail URL
 * @param videoId YouTube video ID
 * @param quality 'default' | 'hq' | 'mq' | 'sd' | 'maxres'
 * @returns Thumbnail URL
 */
export function getYouTubeThumbnail(
  videoId: string,
  quality: 'default' | 'hq' | 'mq' | 'sd' | 'maxres' = 'hq'
): string {
  return `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`;
}

// ============================================================================
// Media Statistics
// ============================================================================

export const mediaStats = {
  totalProjects: mediaLibrary.length,
  totalScreenshots: mediaLibrary.reduce((sum, m) => sum + m.screenshots.length, 0),
  totalVideos: mediaLibrary.reduce((sum, m) => sum + (m.youtube?.length || 0), 0),
  totalAsciinema: mediaLibrary.reduce((sum, m) => sum + (m.asciinema?.length || 0), 0),
  projectsWithDemos: mediaLibrary.filter((m) => m.demoUrl).length,
};
