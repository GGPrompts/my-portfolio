# Terminal User Interface (TUI) Tools Reference Guide

> A comprehensive guide to modern TUI tools that enhance your terminal workflow with beautiful, interactive interfaces.

## Table of Contents

1. [File Management](#file-management)
   - [TFE - Terminal File Explorer](#tfe---terminal-file-explorer) ⭐
2. [Git & Version Control](#git--version-control)
   - [LazyGit](#lazygit---terminal-ui-for-git)
   - [GitUI](#gitui---blazing-fast-terminal-ui-for-git)
   - [Gitlogue](#gitlogue---git-repository-viewer)
3. [Code Analysis](#code-analysis)
   - [cloc](#cloc---count-lines-of-code)
4. [GitHub Tools](#github-tools)
   - [trotd](#trotd---trending-repos-of-the-day)
5. [System Monitoring](#system-monitoring)
   - [htop](#htop---interactive-process-viewer)
   - [bottom](#bottom---crossplatform-system-monitor)
6. [Text Editors](#text-editors)
   - [Micro](#micro---modern-terminal-text-editor)
   - [Vim](#vim---the-ubiquitous-text-editor)
7. [Logs & Debugging](#logs--debugging)
   - [lnav](#lnav---log-file-navigator)
8. [Entertainment](#entertainment)
   - [Spotify Player](#spotify-player---spotify-in-terminal)
   - [PyRadio](#pyradio---internet-radio-in-terminal)
   - [Textual Paint](#textual-paint---ms-paint-in-terminal)
9. [Screensavers](#screensavers)
   - [sysc-walls](#sysc-walls---terminal-screensavers)

---

## File Management

### TFE - Terminal File Explorer

⭐ **Featured Tool** - Created by Matt

**TFE** is a powerful, feature-rich terminal file explorer built with Python's Textual framework. It combines traditional dual-pane navigation with modern features like AI prompt integration, image previews, and mobile support.

#### Quick Start

```bash
# Install from GitHub
git clone https://github.com/GGPrompts/TFE.git
cd TFE
pip install -r requirements.txt

# Run TFE
python tfe.py

# Or install system-wide
pip install .
tfe
```

#### Key Features

- **Dual-Pane Navigation**: Traditional two-panel interface for efficient file management
- **AI Prompts Library**: Integrated prompt management system for AI workflows
- **Image Previews**: Built-in image preview support directly in the terminal
- **Mobile Support**: Optimized for Termux and mobile terminal environments
- **Syntax Highlighting**: Code preview with syntax highlighting
- **Quick Actions**: Fast file operations with keyboard shortcuts
- **Fuzzy Search**: Quick file finder with fuzzy matching
- **Git Integration**: View git status and changes inline
- **Customizable**: Theme support and configurable keybindings

#### Common Commands/Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Switch between panes |
| `Enter` | Open file/directory |
| `Space` | Select/deselect file |
| `c` | Copy selected files |
| `m` | Move selected files |
| `d` | Delete selected files |
| `n` | Create new file |
| `N` | Create new directory |
| `r` | Rename file/directory |
| `/` | Search/fuzzy finder |
| `p` | Preview file |
| `i` | Show file info |
| `h` | Toggle hidden files |
| `a` | Access AI prompts library |
| `q` | Quit |

#### Use Cases

- **AI Development Workflows**: Manage and organize AI prompts alongside code
- **Mobile Development**: Full-featured file manager for Termux users
- **Code Navigation**: Browse projects with syntax-highlighted previews
- **Media Management**: Browse images with inline previews
- **Dual-Pane Workflow**: Traditional file manager operations (copy, move, compare)
- **Quick File Operations**: Rapid file management without leaving terminal

#### Integration Tips

```bash
# Set as default file manager in .bashrc/.zshrc
alias fm='tfe'
alias explorer='tfe'

# Open in specific directory
tfe ~/projects

# Integration with other tools
# Use with fzf for quick project switching
cd $(tfe --print-path)

# Combine with AI tools
# Access AI prompts while coding
```

#### AI Prompts Feature

TFE includes a unique AI prompts library management system:

- **Organize Prompts**: Categorize and manage your AI prompts
- **Quick Access**: Instantly access prompts during development
- **Template System**: Save and reuse prompt templates
- **Search**: Full-text search across your prompt library
- **Export/Import**: Share prompt collections with team

#### Mobile/Termux Support

Perfect for on-the-go development:

- **Touch Optimized**: Works with Termux touch interface
- **Responsive Layout**: Adapts to small screens
- **Efficient**: Lightweight resource usage for mobile devices
- **Full Feature Set**: All desktop features available on mobile

#### Resources

- **GitHub**: [https://github.com/GGPrompts/TFE](https://github.com/GGPrompts/TFE)
- **Documentation**: Available in repository README
- **Issues/Support**: GitHub Issues page
- **License**: Open Source (check repository)

---

## Git & Version Control

### LazyGit - Terminal UI for Git

**LazyGit** is a simple terminal UI for git commands, written in Go. It provides a beautiful interface for complex git operations without memorizing countless commands.

#### Quick Start

```bash
# macOS
brew install lazygit

# Ubuntu/Debian
LAZYGIT_VERSION=$(curl -s "https://api.github.com/repos/jesseduffield/lazygit/releases/latest" | grep -Po '"tag_name": "v\K[^"]*')
curl -Lo lazygit.tar.gz "https://github.com/jesseduffield/lazygit/releases/latest/download/lazygit_${LAZYGIT_VERSION}_Linux_x86_64.tar.gz"
tar xf lazygit.tar.gz lazygit
sudo install lazygit /usr/local/bin

# Arch Linux
sudo pacman -S lazygit

# Run
lazygit
```

#### Key Features

- **Visual Git Interface**: See status, branches, and commits at a glance
- **Interactive Staging**: Stage files, hunks, or individual lines
- **Branch Management**: Create, checkout, merge, and rebase with ease
- **Commit History**: Beautiful log view with graph
- **Stash Management**: Visual stash browser
- **Diff Viewer**: Side-by-side diff viewing
- **Cherry-picking**: Interactive cherry-pick interface
- **Submodule Support**: Manage git submodules
- **Custom Commands**: Define your own git command shortcuts
- **Mouse Support**: Optional mouse navigation

#### Common Commands/Shortcuts

| Key | Action |
|-----|--------|
| `?` | Open help menu |
| `1-5` | Switch between panels (Status/Files/Branches/Commits/Stash) |
| `Space` | Stage/unstage file or hunk |
| `a` | Stage all files |
| `c` | Commit staged changes |
| `A` | Amend last commit |
| `P` | Push to remote |
| `p` | Pull from remote |
| `n` | New branch |
| `b` | Checkout branch |
| `M` | Merge branch |
| `r` | Rebase branch |
| `d` | Delete branch |
| `enter` | View file/commit details |
| `e` | Edit file |
| `o` | Open file in external editor |
| `C` | Cherry-pick commit |
| `s` | Stash changes |
| `/` | Search |
| `q` | Quit panel/application |

#### Use Cases

- **Daily Git Workflow**: Staging, committing, pushing/pulling
- **Complex Rebasing**: Interactive rebase with visual feedback
- **Merge Conflict Resolution**: View and resolve conflicts easily
- **Branch Management**: Navigate between branches and features
- **Code Review**: Browse commit history and diffs
- **Learning Git**: Visual feedback helps understand git operations

#### Integration Tips

```bash
# Alias for quick access
echo "alias lg='lazygit'" >> ~/.bashrc

# Git alias
git config --global alias.lg '!lazygit'

# Open in current repository
lg

# Custom commands in ~/.config/lazygit/config.yml
customCommands:
  - key: 'C'
    command: 'git cz'
    context: 'files'
    description: 'Commit with commitizen'
```

#### Workflows

**Feature Development:**
```
1. Create branch (n)
2. Make changes
3. Stage hunks (Space in Files panel)
4. Commit (c)
5. Push (P)
6. Create PR (custom command)
```

**Cleaning Up History:**
```
1. Interactive rebase (r on branch)
2. Squash/fixup commits
3. Edit commit messages
4. Force push (P)
```

#### Resources

- **GitHub**: [jesseduffield/lazygit](https://github.com/jesseduffield/lazygit)
- **Documentation**: [https://github.com/jesseduffield/lazygit/wiki](https://github.com/jesseduffield/lazygit/wiki)
- **Configuration**: [https://github.com/jesseduffield/lazygit/blob/master/docs/Config.md](https://github.com/jesseduffield/lazygit/blob/master/docs/Config.md)
- **Keybindings**: Press `?` in the app

---

### GitUI - Blazing Fast Terminal UI for Git

**GitUI** is written in Rust and focuses on speed and performance. It's an alternative to LazyGit with a snappy, responsive interface.

#### Quick Start

```bash
# macOS
brew install gitui

# Arch Linux
sudo pacman -S gitui

# Cargo (Rust)
cargo install gitui

# Ubuntu/Debian (download from releases)
wget https://github.com/extrawurst/gitui/releases/download/v0.24.3/gitui-linux-musl.tar.gz
tar xzf gitui-linux-musl.tar.gz
sudo mv gitui /usr/local/bin/

# Run
gitui
```

#### Key Features

- **Blazing Fast**: Instant UI updates, even in large repositories
- **Async Operations**: Non-blocking git operations
- **Syntax Highlighting**: Beautiful diff views with syntax highlighting
- **Low Resource Usage**: Minimal CPU and memory footprint
- **Vim-like Keybindings**: Familiar navigation for vim users
- **Stashing**: Full stash support with apply/pop
- **Amend/Reword**: Quick commit amendments
- **Branch Switching**: Fast branch operations
- **Commit Signing**: GPG commit signing support

#### Common Commands/Shortcuts

| Key | Action |
|-----|--------|
| `h/j/k/l` | Vim-style navigation |
| `1-4` | Switch tabs (Status/Log/Stashing/Stashlist) |
| `Enter` | Select/open |
| `Space` | Stage/unstage |
| `c` | Commit |
| `a` | Amend commit |
| `e` | Edit file |
| `D` | Discard changes |
| `s` | Stash |
| `f` | Fetch |
| `p` | Push |
| `P` | Pull |
| `r` | Rename branch |
| `d` | Delete branch |
| `/` | Search |
| `?` | Help |
| `q` | Quit |

#### Use Cases

- **Large Repositories**: Handles monorepos with ease
- **Performance-Critical Workflows**: When speed matters
- **Vim Users**: Familiar keybindings
- **Resource-Constrained Environments**: Low memory usage
- **Quick Git Operations**: Fast staging, committing, pushing

#### Integration Tips

```bash
# Alias
echo "alias gg='gitui'" >> ~/.bashrc

# Use as git alias
git config --global alias.ui '!gitui'

# Custom keybindings in ~/.config/gitui/key_bindings.ron
(
    open_help: Some(( code: F(1), modifiers: ( bits: 0,),)),
    move_up: Some(( code: Char('k'), modifiers: ( bits: 0,),)),
    move_down: Some(( code: Char('j'), modifiers: ( bits: 0,),)),
)
```

#### Performance Tips

- Uses async git operations for non-blocking UI
- Efficient diff rendering for large files
- Lazy loading of commit history
- Optimized for repositories with thousands of commits

#### Resources

- **GitHub**: [extrawurst/gitui](https://github.com/extrawurst/gitui)
- **Documentation**: [https://github.com/extrawurst/gitui/blob/master/README.md](https://github.com/extrawurst/gitui/blob/master/README.md)
- **Keybindings**: [https://github.com/extrawurst/gitui/blob/master/KEY_CONFIG.md](https://github.com/extrawurst/gitui/blob/master/KEY_CONFIG.md)
- **Themes**: [https://github.com/extrawurst/gitui/blob/master/THEMES.md](https://github.com/extrawurst/gitui/blob/master/THEMES.md)

---

### Gitlogue - Git Repository Viewer

**Gitlogue** is a minimal, focused git repository viewer for browsing commit history and repository structure.

#### Quick Start

```bash
# Install with cargo
cargo install gitlogue

# Or download binary from releases
# Run in a git repository
gitlogue
```

#### Key Features

- **Clean Interface**: Minimalist commit history viewer
- **Fast Navigation**: Quick browsing of commit history
- **Commit Details**: View full commit information
- **Branch Visualization**: Simple branch graph
- **Search**: Find commits by message or author
- **Lightweight**: Minimal resource usage

#### Common Commands/Shortcuts

| Key | Action |
|-----|--------|
| `↑/↓` | Navigate commits |
| `Enter` | View commit details |
| `/` | Search commits |
| `b` | View branches |
| `q` | Quit |

#### Use Cases

- **Quick History Review**: Rapidly browse commit history
- **Code Archaeology**: Find when changes were made
- **Branch Overview**: See branch structure
- **Lightweight Alternative**: When you just need to view, not edit

#### Integration Tips

```bash
# Alias for viewing git log
echo "alias glog='gitlogue'" >> ~/.bashrc

# Quick repository browser
gitlogue --branch main
```

#### Resources

- **GitHub**: Search for "gitlogue" on GitHub
- **Documentation**: Check repository README

---

## Code Analysis

### cloc - Count Lines of Code

**cloc** (Count Lines of Code) is a powerful tool for analyzing codebases. It counts blank lines, comment lines, and physical lines of source code in many programming languages.

#### Quick Start

```bash
# macOS
brew install cloc

# Ubuntu/Debian
sudo apt install cloc

# Fedora/RHEL
sudo dnf install cloc

# From source
wget https://github.com/AlDanial/cloc/releases/download/v1.96/cloc-1.96.pl
chmod +x cloc-1.96.pl
sudo mv cloc-1.96.pl /usr/local/bin/cloc

# Count current directory
cloc .

# Count specific directory
cloc /path/to/project
```

#### Key Features

- **200+ Languages**: Supports almost every programming language
- **Smart Comments**: Distinguishes between code and comments
- **Multiple Formats**: Output in text, JSON, XML, YAML, CSV
- **Git Integration**: Analyze git commits and diffs
- **Diff Mode**: Compare two versions of code
- **Exclude Patterns**: Filter files/directories
- **Fast**: Efficient processing even on large codebases
- **Accurate**: Sophisticated language detection

#### Common Commands/Shortcuts

```bash
# Basic usage
cloc .                          # Current directory
cloc src/                       # Specific directory
cloc file.py                    # Single file

# Output formats
cloc --json .                   # JSON output
cloc --csv .                    # CSV output
cloc --yaml .                   # YAML output
cloc --md .                     # Markdown table

# Filtering
cloc --exclude-dir=node_modules,.git .
cloc --exclude-ext=json,xml .
cloc --include-lang=Python,JavaScript .

# Git integration
cloc --git main                 # Count files in branch
cloc --git --diff main develop  # Diff between branches

# Advanced
cloc --by-file .                # Show per-file breakdown
cloc --by-file-by-lang .        # Detailed breakdown
cloc --diff dir1 dir2           # Compare directories
cloc --sum-reports report*.txt  # Combine multiple reports

# Ignore comments
cloc --no-comments .

# Custom definitions
cloc --force-lang=JavaScript,jsx .
```

#### Use Cases

- **Project Metrics**: Quantify codebase size
- **Code Review**: Track code growth over time
- **Language Distribution**: Understand tech stack composition
- **Refactoring Impact**: Measure code reduction after refactoring
- **Team Productivity**: Track lines written (use cautiously)
- **Technical Debt**: Identify comment ratio issues
- **Documentation**: Auto-generate project statistics

#### Integration Tips

**CI/CD Integration:**

```yaml
# GitHub Actions
- name: Code Statistics
  run: |
    cloc . --json --out=cloc.json
    cloc . --md --out=STATS.md
```

**Git Hooks:**

```bash
# pre-commit hook
#!/bin/bash
cloc --git HEAD > /tmp/cloc-before.txt
# After commit
cloc --git HEAD > /tmp/cloc-after.txt
echo "Code statistics updated"
```

**Shell Aliases:**

```bash
# ~/.bashrc or ~/.zshrc
alias count='cloc --exclude-dir=node_modules,.git,vendor .'
alias countjson='cloc --json --exclude-dir=node_modules,.git .'
alias countmd='cloc --md --exclude-dir=node_modules,.git . > STATS.md'
```

**Project Reports:**

```bash
# Generate monthly report
cloc --git $(git rev-parse --abbrev-ref HEAD) \
     --md \
     --report-file="cloc-$(date +%Y-%m).md"
```

#### Output Example

```
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
JavaScript                      45           1234           2345           5678
TypeScript                      32            987           1234           4321
CSS                            12            234            123            890
JSON                           15              0              0            456
Markdown                        8            123              0            345
-------------------------------------------------------------------------------
SUM:                          112           2578           3702          11690
-------------------------------------------------------------------------------
```

#### Resources

- **GitHub**: [AlDanial/cloc](https://github.com/AlDanial/cloc)
- **Documentation**: [https://github.com/AlDanial/cloc#overview-](https://github.com/AlDanial/cloc#overview-)
- **Language Definitions**: [https://github.com/AlDanial/cloc#recognized-languages-](https://github.com/AlDanial/cloc#recognized-languages-)

---

## GitHub Tools

### trotd - Trending Repos of the Day

**trotd** (Trending Repos of the Day) is a CLI tool that displays trending GitHub repositories directly in your terminal.

#### Quick Start

```bash
# Install with cargo
cargo install trotd

# Or with npm
npm install -g trotd

# Run
trotd

# With language filter
trotd --language rust

# Starred repos
trotd --starred
```

#### Key Features

- **Daily Trending**: View today's trending repositories
- **Language Filtering**: Filter by programming language
- **Star Tracking**: View your starred repositories
- **Interactive**: Browse repos interactively
- **Direct Links**: Quick access to repo URLs
- **Minimal Interface**: Clean, distraction-free display

#### Common Commands/Shortcuts

```bash
# View trending
trotd                           # All languages
trotd -l python                 # Python repos
trotd -l javascript             # JavaScript repos
trotd --language rust           # Rust repos

# Time ranges
trotd --daily                   # Today (default)
trotd --weekly                  # This week
trotd --monthly                 # This month

# Starred repositories
trotd --starred                 # Your starred repos
trotd --starred -l go           # Starred Go repos

# Output formats
trotd --json                    # JSON output
trotd --format=table            # Table format
```

#### Use Cases

- **Discover New Projects**: Find trending open source projects
- **Stay Updated**: Keep track of popular repositories
- **Language Exploration**: Discover projects in specific languages
- **Learning Resources**: Find popular learning materials
- **Morning Routine**: Check trending repos with coffee
- **Research**: Find popular tools in your tech stack

#### Integration Tips

```bash
# Daily trending in your shell startup
echo "trotd -l $(your-language)" >> ~/.bashrc

# Save to file for later
trotd --json > trending-$(date +%Y-%m-%d).json

# Combine with other tools
trotd --json | jq '.[0].url' | xargs open

# Fish shell function
function trending
    trotd -l $argv[1]
end
```

#### Workflow Example

```bash
# Morning discovery routine
trotd -l rust                   # Check Rust trending
trotd -l python                 # Check Python trending
trotd --starred                 # Review your stars

# Find specific topics
trotd | grep -i "machine learning"
trotd -l python | grep -i "web framework"
```

#### Resources

- **GitHub**: Search for "trotd" on GitHub
- **npm**: [https://www.npmjs.com/package/trotd](https://www.npmjs.com/package/trotd)
- **Documentation**: Check package README

---

## System Monitoring

### htop - Interactive Process Viewer

**htop** is an improved version of the classic `top` command. It provides a colorful, interactive interface for monitoring system processes and resource usage.

#### Quick Start

```bash
# Install
## macOS
brew install htop

## Ubuntu/Debian
sudo apt install htop

## Fedora/RHEL
sudo dnf install htop

## Arch Linux
sudo pacman -S htop

# Run
htop

# Run as root for all process info
sudo htop
```

#### Key Features

- **Visual Meters**: CPU, memory, and swap usage bars
- **Color Coding**: Easy identification of process states
- **Mouse Support**: Click to select, scroll, and interact
- **Tree View**: See process hierarchy
- **Sorting**: Sort by CPU, memory, time, etc.
- **Filtering**: Search and filter processes
- **Process Control**: Kill, renice, send signals
- **Multiple Columns**: Extensive process information
- **Customizable**: Configure meters and columns
- **No Flicker**: Smooth updates

#### Common Commands/Shortcuts

| Key | Action |
|-----|--------|
| `F1` / `h` | Help menu |
| `F2` / `S` | Setup menu (customize) |
| `F3` / `/` | Search process |
| `F4` / `\` | Filter processes |
| `F5` / `t` | Tree view |
| `F6` / `<` `>` | Sort by column |
| `F9` / `k` | Kill process |
| `F10` / `q` | Quit |
| `Space` | Tag/untag process |
| `U` | Show processes for user |
| `K` | Show kernel threads |
| `H` | Hide/show user threads |
| `I` | Invert sort order |
| `P` | Sort by CPU% |
| `M` | Sort by MEM% |
| `T` | Sort by TIME+ |
| `u` | Filter by user |
| `c` | Tag all children |
| `+` / `-` | Collapse/expand tree |
| `a` | Set CPU affinity |
| `l` | Show open files (lsof) |
| `s` | Trace syscalls (strace) |

#### Use Cases

- **Performance Monitoring**: Track CPU and memory usage
- **Process Management**: Find and kill hung processes
- **Resource Investigation**: Identify resource-hungry apps
- **System Debugging**: Troubleshoot performance issues
- **Server Monitoring**: Keep an eye on production systems
- **Learning**: Understand what's running on your system
- **Benchmarking**: Monitor during performance tests

#### Integration Tips

```bash
# Alias for quick access
echo "alias top='htop'" >> ~/.bashrc

# Color schemes (~/.config/htop/htoprc)
# Customize colors and meters in F2 setup menu

# Show specific user
htop -u username

# Delay update (in tenths of seconds)
htop -d 10

# No color mode (for scripts/logging)
htop --no-color

# Tree view by default
htop --tree
```

#### Common Troubleshooting Tasks

**High CPU Usage:**
```
1. Press P to sort by CPU%
2. Identify top processes
3. Investigate with F9 (kill) or l (lsof)
```

**High Memory Usage:**
```
1. Press M to sort by MEM%
2. Check swap usage (top meter)
3. Identify memory leaks
4. Kill offending process (F9)
```

**Find Process by Name:**
```
1. Press F3 or /
2. Type process name
3. Navigate with F3 (next match)
```

**Process Tree Investigation:**
```
1. Press F5 for tree view
2. Use +/- to expand/collapse
3. Find parent-child relationships
```

#### Advanced Features

**CPU Affinity:**
- Press `a` to set which CPU cores a process can use
- Useful for optimization and testing

**Custom Meters:**
- F2 → Meters
- Add/remove/rearrange meters
- Choose from 15+ meter types

**Process Signals:**
- F9 → Kill menu
- Send various signals (TERM, KILL, HUP, etc.)

#### Resources

- **Website**: [https://htop.dev/](https://htop.dev/)
- **GitHub**: [htop-dev/htop](https://github.com/htop-dev/htop)
- **Man Page**: `man htop`
- **Configuration**: `~/.config/htop/htoprc`

---

### bottom - Cross-Platform System Monitor

**bottom** (btm) is a modern, cross-platform graphical process/system monitor written in Rust. It's inspired by gtop, gotop, and htop with additional features and a sleek interface.

#### Quick Start

```bash
# macOS
brew install bottom

# Ubuntu/Debian (via cargo)
cargo install bottom

# Arch Linux
sudo pacman -S bottom

# Or download binary from releases
wget https://github.com/ClementTsang/bottom/releases/download/0.9.6/bottom_x86_64-unknown-linux-gnu.tar.gz
tar xzf bottom_x86_64-unknown-linux-gnu.tar.gz
sudo mv btm /usr/local/bin/

# Run
btm

# Or
bottom
```

#### Key Features

- **Multiple Widgets**: CPU, memory, disk, network, processes, temperature
- **Graphs**: Beautiful time-series graphs
- **Customizable Layout**: Arrange widgets as you like
- **Battery Support**: Laptop battery monitoring
- **Disk I/O**: Read/write statistics
- **Network**: Per-interface statistics
- **GPU Support**: NVIDIA GPU monitoring (experimental)
- **Process Grouping**: Group by name or command
- **Search**: Regex process filtering
- **Cross-Platform**: Windows, macOS, Linux, FreeBSD
- **Theming**: Multiple color schemes
- **Config File**: TOML-based configuration

#### Common Commands/Shortcuts

| Key | Action |
|-----|--------|
| `?` | Help |
| `q` / `Ctrl+c` | Quit |
| `dd` | Kill selected process |
| `e` | Expand process entry |
| `Tab` | Next widget |
| `Shift+Tab` | Previous widget |
| `/` | Process search/filter |
| `Esc` | Close dialog/clear search |
| `+` / `-` | Zoom time scale |
| `=` | Reset zoom |
| `←` / `→` | Change graph displayed time |
| `c` | Sort by CPU% |
| `m` | Sort by memory% |
| `p` | Sort by PID |
| `n` | Sort by name |
| `Space` | Show process details |
| `t` | Toggle tree mode |
| `Ctrl+r` | Reset |
| `Ctrl+f` | Freeze display |

#### Use Cases

- **System Overview**: Dashboard view of all system resources
- **Performance Profiling**: Monitor resource usage over time
- **Disk Monitoring**: Track I/O bottlenecks
- **Network Debugging**: See per-interface traffic
- **Temperature Tracking**: Monitor system temperatures
- **Battery Life**: Check power consumption on laptops
- **Multi-Machine Monitoring**: Consistent tool across platforms

#### Integration Tips

**Configuration File** (`~/.config/bottom/bottom.toml`):

```toml
[flags]
# Show temperatures in Fahrenheit
temperature_type = "f"

# Default time value for graphs
default_time_value = "60s"

# Update rate in milliseconds
rate = 1000

# Enable GPU monitoring
enable_gpu_memory = true

# Color scheme
color = "gruvbox"

[disk_filter]
# Show specific disks
is_list_ignored = false
list = ["/dev/sda", "/dev/nvme0n1"]

[processes]
# Group processes by default
tree = true
```

**Shell Aliases:**

```bash
# Quick launch with custom settings
alias btm='btm --battery --color gruvbox'
alias monitor='btm --default_time_value 30s'
alias sys='btm'

# Specific views
alias cpu='btm --default_widget_type cpu'
alias mem='btm --default_widget_type mem'
alias net='btm --default_widget_type network'
```

**Command Line Options:**

```bash
# Basic mode (less widgets)
btm --basic

# Battery widget
btm --battery

# Custom color scheme
btm --color gruvbox

# Specific update rate (in ms)
btm --rate 2000

# Default widget
btm --default_widget_type proc

# Time range for graphs
btm --default_time_value "5m"

# Disable GPU
btm --disable_gpu

# Export config
btm --export_config
```

#### Customization Examples

**Dashboard Layout:**

Custom layouts can be defined in `bottom.toml`:

```toml
[[row]]
  [[row.child]]
  type = "cpu"
  [[row.child]]
  type = "mem"

[[row]]
  [[row.child]]
  type = "proc"

[[row]]
  [[row.child]]
  type = "network"
  [[row.child]]
  type = "disk"
```

**Color Schemes:**

Available themes:
- `default`
- `gruvbox`
- `nord`
- `high-contrast`
- Custom (define in config)

#### Widgets Overview

1. **CPU Widget**: Per-core usage, average, graph
2. **Memory Widget**: RAM and swap usage, graph
3. **Network Widget**: Upload/download per interface
4. **Disk Widget**: Usage per mount point, I/O rates
5. **Temperature Widget**: Sensor readings
6. **Battery Widget**: Charge level, time remaining
7. **Process Widget**: List with sorting, filtering, tree view

#### Resources

- **GitHub**: [ClementTsang/bottom](https://github.com/ClementTsang/bottom)
- **Documentation**: [https://clementtsang.github.io/bottom/](https://clementtsang.github.io/bottom/)
- **Configuration**: [https://clementtsang.github.io/bottom/stable/configuration/config-file/](https://clementtsang.github.io/bottom/stable/configuration/config-file/)
- **Changelog**: [https://github.com/ClementTsang/bottom/blob/master/CHANGELOG.md](https://github.com/ClementTsang/bottom/blob/master/CHANGELOG.md)

---

## Text Editors

### Micro - Modern Terminal Text Editor

**Micro** is a modern, intuitive terminal text editor that aims to be easy to use and intuitive. It's a great alternative to nano with more features.

#### Quick Start

```bash
# macOS
brew install micro

# Ubuntu/Debian
sudo apt install micro

# Arch Linux
sudo pacman -S micro

# With curl
curl https://getmic.ro | bash
sudo mv micro /usr/local/bin/

# Run
micro filename.txt
micro .  # Open directory browser
```

#### Key Features

- **Easy to Use**: Works like a normal desktop editor
- **Common Keybindings**: Ctrl+C, Ctrl+V, Ctrl+Z work as expected
- **Mouse Support**: Click, select, scroll with mouse
- **Syntax Highlighting**: 75+ languages
- **Plugin System**: Extensive plugin ecosystem
- **Multiple Cursors**: Edit multiple locations simultaneously
- **Split Panes**: Edit multiple files side-by-side
- **Auto-Complete**: Built-in autocompletion
- **Shell Integration**: Execute shell commands from editor
- **Search & Replace**: Regex support
- **Customizable**: Extensive configuration options
- **No Dependencies**: Single binary, no runtime required

#### Common Commands/Shortcuts

| Key | Action |
|-----|--------|
| `Ctrl+q` | Quit |
| `Ctrl+s` | Save |
| `Ctrl+o` | Open file |
| `Ctrl+z` | Undo |
| `Ctrl+y` | Redo |
| `Ctrl+c` | Copy |
| `Ctrl+x` | Cut |
| `Ctrl+v` | Paste |
| `Ctrl+a` | Select all |
| `Ctrl+f` | Find |
| `Ctrl+n` | Find next |
| `Ctrl+p` | Find previous |
| `Ctrl+e` | Command bar |
| `Ctrl+g` | Go to line |
| `Ctrl+w` | Next split |
| `Alt+,` | Previous split |
| `Alt+-` | Horizontal split |
| `Alt+_` | Vertical split |
| `Ctrl+k` | Delete line |
| `Ctrl+d` | Duplicate line |
| `Alt+↑/↓` | Move line up/down |
| `Shift+←/→` | Select text |
| `Ctrl+u` | Half page up |
| `Ctrl+b` | Half page down |

#### Plugin System

```bash
# List available plugins
micro -plugin available

# Install plugin
micro -plugin install linter
micro -plugin install comment
micro -plugin install filemanager
micro -plugin install manipulator

# Update plugins
micro -plugin update <plugin-name>

# Remove plugin
micro -plugin remove <plugin-name>

# List installed plugins
micro -plugin list
```

**Popular Plugins:**
- `linter` - Code linting
- `comment` - Easy comment toggling
- `filemanager` - File tree browser
- `manipulator` - Text manipulation tools
- `jump` - Quick navigation
- `quickfix` - Compiler error navigation
- `autofmt` - Auto-formatting on save

#### Use Cases

- **Quick Edits**: Fast file editing without leaving terminal
- **Configuration Files**: Edit config files with syntax highlighting
- **Code Review**: Browse code with syntax highlighting
- **Git Commits**: Better than default editors for commit messages
- **Remote Editing**: SSH sessions with familiar keybindings
- **Learning**: Easy transition from GUI editors

#### Configuration

Configuration file: `~/.config/micro/settings.json`

```json
{
    "autoclose": true,
    "autoindent": true,
    "autosave": 8,
    "colorscheme": "monokai",
    "cursorline": true,
    "diffgutter": true,
    "ignorecase": true,
    "keepautoindent": true,
    "matchbrace": true,
    "mkparents": true,
    "ruler": true,
    "savecursor": true,
    "saveundo": true,
    "scrollbar": true,
    "smartpaste": true,
    "softwrap": false,
    "splitright": true,
    "splitbottom": true,
    "statusformatl": "$(filename) $(modified)($(line),$(col)) $(status.paste)| ft:$(opt:filetype) | $(opt:fileformat) | $(opt:encoding)",
    "statusformatr": "$(bind:ToggleKeyMenu): bindings, $(bind:ToggleHelp): help",
    "sucmd": "sudo",
    "tabsize": 4,
    "tabstospaces": true
}
```

#### Integration Tips

```bash
# Set as git editor
git config --global core.editor "micro"

# Set as default editor
export EDITOR="micro"
export VISUAL="micro"

# Add to .bashrc/.zshrc
echo 'export EDITOR="micro"' >> ~/.bashrc

# Alias for quick access
alias m='micro'
alias edit='micro'
```

#### Color Schemes

```bash
# List available color schemes
micro -options | grep colorscheme

# Change color scheme (in editor)
Ctrl+e
> set colorscheme monokai

# Popular schemes
# monokai, solarized, gruvbox, nord, dracula
```

#### Advanced Features

**Multiple Cursors:**
```
Ctrl+MouseClick - Add cursor
Alt+Shift+↑/↓   - Add cursor above/below
```

**Shell Commands:**
```
Ctrl+e
> run echo "Hello"
> term  # Open terminal pane
```

**Macros:**
```
Ctrl+e
> macro record  # Start recording
# Perform actions
> macro stop    # Stop recording
> macro run     # Run macro
```

#### Resources

- **Website**: [https://micro-editor.github.io/](https://micro-editor.github.io/)
- **GitHub**: [zyedidia/micro](https://github.com/zyedidia/micro)
- **Documentation**: [https://github.com/zyedidia/micro/tree/master/runtime/help](https://github.com/zyedidia/micro/tree/master/runtime/help)
- **Plugins**: [https://github.com/micro-editor/plugin-channel](https://github.com/micro-editor/plugin-channel)

---

### Vim - The Ubiquitous Text Editor

**Vim** is a highly configurable text editor built to make creating and changing text very efficient. It's ubiquitous on Unix systems and extremely powerful once mastered.

#### Quick Start

```bash
# Usually pre-installed on Unix systems
vim

# Install if needed
## macOS
brew install vim

## Ubuntu/Debian
sudo apt install vim

## Full-featured version
sudo apt install vim-gtk3

# Basic usage
vim filename.txt        # Edit file
vim +10 file.txt       # Open at line 10
vim -R file.txt        # Read-only mode
```

#### Key Features

- **Modal Editing**: Different modes for different tasks
- **Extremely Fast**: Keyboard-driven, no mouse needed
- **Powerful Text Objects**: Advanced text manipulation
- **Macros**: Record and replay complex edits
- **Extensible**: Thousands of plugins available
- **Universal**: Available on virtually every system
- **Lightweight**: Minimal resource usage
- **Scriptable**: Vimscript for automation
- **Split Windows**: Edit multiple files simultaneously
- **Syntax Highlighting**: Hundreds of languages
- **Search & Replace**: Powerful regex support

#### Essential Commands

**Modes:**
- `i` - Insert mode (before cursor)
- `a` - Insert mode (after cursor)
- `v` - Visual mode (selection)
- `V` - Visual line mode
- `Ctrl+v` - Visual block mode
- `Esc` - Return to normal mode

**Navigation (Normal Mode):**
| Key | Action |
|-----|--------|
| `h/j/k/l` | Left/Down/Up/Right |
| `w` | Next word |
| `b` | Previous word |
| `e` | End of word |
| `0` | Start of line |
| `$` | End of line |
| `gg` | Start of file |
| `G` | End of file |
| `10G` | Go to line 10 |
| `Ctrl+f` | Page down |
| `Ctrl+b` | Page up |
| `%` | Jump to matching bracket |

**Editing (Normal Mode):**
| Key | Action |
|-----|--------|
| `x` | Delete character |
| `dd` | Delete line |
| `yy` | Yank (copy) line |
| `p` | Paste after |
| `P` | Paste before |
| `u` | Undo |
| `Ctrl+r` | Redo |
| `dw` | Delete word |
| `ciw` | Change inner word |
| `di"` | Delete inside quotes |
| `>>` | Indent line |
| `<<` | Unindent line |
| `.` | Repeat last command |

**Search & Replace:**
| Command | Action |
|---------|--------|
| `/pattern` | Search forward |
| `?pattern` | Search backward |
| `n` | Next match |
| `N` | Previous match |
| `:s/old/new/` | Replace in line |
| `:%s/old/new/g` | Replace all in file |
| `:%s/old/new/gc` | Replace with confirmation |

**File Operations:**
| Command | Action |
|---------|--------|
| `:w` | Save |
| `:q` | Quit |
| `:wq` | Save and quit |
| `:q!` | Quit without saving |
| `:e filename` | Edit file |
| `:bn` | Next buffer |
| `:bp` | Previous buffer |
| `:ls` | List buffers |

#### Use Cases

- **System Administration**: Edit config files on servers
- **Programming**: Fast code editing and navigation
- **Remote Work**: SSH sessions with limited bandwidth
- **Text Processing**: Complex find/replace operations
- **Quick Edits**: Faster than opening a GUI editor
- **Scripting**: Automate text editing with Vimscript
- **Learning**: Improve typing and navigation skills

#### Common Configurations (.vimrc basics)

Create `~/.vimrc`:

```vim
" Basic settings
set number              " Show line numbers
set relativenumber      " Relative line numbers
set tabstop=4           " Tab width
set shiftwidth=4        " Indent width
set expandtab           " Spaces instead of tabs
set autoindent          " Auto-indent new lines
set smartindent         " Smart indentation
set hlsearch            " Highlight search results
set incsearch           " Incremental search
set ignorecase          " Case-insensitive search
set smartcase           " Smart case search
set wildmenu            " Command completion menu
set showmatch           " Show matching brackets
set cursorline          " Highlight current line
set mouse=a             " Enable mouse support
syntax on               " Syntax highlighting
filetype plugin indent on

" Key mappings
let mapleader = " "     " Space as leader key
nnoremap <leader>w :w<CR>        " Save with Space+w
nnoremap <leader>q :q<CR>        " Quit with Space+q
nnoremap <leader>h :nohlsearch<CR> " Clear search highlight

" Split navigation
nnoremap <C-h> <C-w>h
nnoremap <C-j> <C-w>j
nnoremap <C-k> <C-w>k
nnoremap <C-l> <C-w>l

" Plugin manager (vim-plug)
call plug#begin('~/.vim/plugged')
Plug 'preservim/nerdtree'           " File explorer
Plug 'junegunn/fzf.vim'             " Fuzzy finder
Plug 'tpope/vim-commentary'         " Easy comments
Plug 'tpope/vim-surround'           " Surround text objects
Plug 'vim-airline/vim-airline'      " Status line
call plug#end()
```

#### Essential Plugins

**Plugin Manager (vim-plug):**
```bash
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

**Popular Plugins:**
- `nerdtree` - File system explorer
- `fzf.vim` - Fuzzy file finder
- `vim-commentary` - Easy commenting
- `vim-surround` - Surround text with quotes/brackets
- `vim-airline` - Enhanced status line
- `coc.nvim` - LSP support (autocomplete, linting)
- `vim-fugitive` - Git integration
- `vim-gitgutter` - Git diff in gutter
- `ale` - Asynchronous linting

#### Integration Tips

```bash
# Set as default editor
export EDITOR="vim"
export VISUAL="vim"

# Git editor
git config --global core.editor "vim"

# Aliases
alias vi='vim'
alias v='vim'

# Open file at specific line (from grep output)
vim +42 file.txt
```

#### Learning Resources

**Built-in Tutorial:**
```bash
vimtutor
```

**Interactive Learning:**
- `vimtutor` - Built-in tutorial (30 minutes)
- `:help` - Extensive built-in documentation
- `:help quickref` - Quick reference guide

**Practice:**
```bash
# Play vim adventures
# https://vim-adventures.com/

# Vim golf
# https://www.vimgolf.com/
```

#### Common Workflows

**Quick Edit Config File:**
```vim
vim ~/.bashrc
/alias          " Search for 'alias'
n               " Next match
i               " Insert mode
# Make changes
Esc
:wq
```

**Refactoring:**
```vim
/oldName        " Find variable
cgn newName     " Change and move to next
.               " Repeat change
.               " Repeat again
```

**Multiple File Editing:**
```vim
vim file1.txt file2.txt file3.txt
:bn             " Next buffer
:bp             " Previous buffer
:ls             " List all buffers
```

#### Resources

- **Website**: [https://www.vim.org/](https://www.vim.org/)
- **Documentation**: `:help` (built-in)
- **Interactive Tutorial**: `vimtutor` (command)
- **Quick Reference**: [https://vimsheet.com/](https://vimsheet.com/)
- **Awesome Vim**: [https://github.com/akrawchyk/awesome-vim](https://github.com/akrawchyk/awesome-vim)

---

## Logs & Debugging

### lnav - Log File Navigator

**lnav** (Log File Navigator) is an advanced log file viewer for the terminal. It automatically detects log formats and provides powerful features for searching, filtering, and analyzing logs.

#### Quick Start

```bash
# macOS
brew install lnav

# Ubuntu/Debian
sudo apt install lnav

# Arch Linux
sudo pacman -S lnav

# From source
wget https://github.com/tstack/lnav/releases/download/v0.11.2/lnav-0.11.2-x86_64-linux-musl.zip
unzip lnav-0.11.2-x86_64-linux-musl.zip
sudo mv lnav /usr/local/bin/

# Basic usage
lnav /var/log/syslog
lnav /var/log/*.log
lnav access.log error.log
```

#### Key Features

- **Auto Format Detection**: Recognizes 50+ log formats automatically
- **Syntax Highlighting**: Color-coded log levels and timestamps
- **Time-Based Navigation**: Jump to specific timestamps
- **Filtering**: Include/exclude patterns
- **SQL Queries**: Query logs with SQL
- **Histogram**: Visualize log patterns
- **Pretty Print**: Automatic JSON/XML formatting
- **Tail Mode**: Follow logs in real-time
- **Search**: Regex search across all files
- **Bookmarks**: Mark important log entries
- **Session Saving**: Save and restore analysis sessions

#### Common Commands/Shortcuts

| Key | Action |
|-----|--------|
| `?` | Help |
| `q` | Quit |
| `e/E` | Next/previous error |
| `w/W` | Next/previous warning |
| `/` | Search forward |
| `?` | Search backward |
| `n/N` | Next/previous match |
| `f/F` | Next/previous file |
| `>/<` | Next/previous day |
| `0-6` | Jump to log level |
| `g/G` | Top/bottom |
| `Space` | Page down |
| `b` | Page up |
| `m` | Mark/bookmark line |
| `o/O` | Show only/hide filter |
| `p` | Toggle format view |
| `t` | Display timestamp |
| `T` | Timestamp precision |
| `i` | Histogram view |
| `u` | Unset filter |
| `:` | SQL prompt |
| `Shift+T` | Show parser details |

#### Log Format Support

Automatically recognizes:
- **Syslog** (BSD, RFC3164, RFC5424)
- **Apache** (access_log, error_log)
- **Nginx** (access_log, error_log)
- **Common Log Format** (CLF)
- **JSON** (auto-detected)
- **Docker** logs
- **Kubernetes** logs
- **MySQL** (slow query, error)
- **PostgreSQL**
- **Ruby on Rails**
- **Python** (logging module)
- **Java** (log4j, logback)
- **And 40+ more...**

#### Use Cases

- **Production Debugging**: Analyze application logs
- **Web Server Logs**: Parse Apache/Nginx logs
- **Container Logs**: View Docker/Kubernetes logs
- **System Administration**: Monitor syslog
- **Security Analysis**: Investigate security logs
- **Performance Analysis**: Identify slow queries
- **Error Investigation**: Filter and find errors
- **Log Correlation**: View multiple logs simultaneously

#### SQL Query Examples

```sql
-- Press : to enter SQL mode

-- Count errors by hour
;SELECT timeslice(log_time, '1h') as hour, count(*) as errors
 FROM access_log
 WHERE log_level = 'error'
 GROUP BY hour

-- Top 10 IP addresses
;SELECT c_ip, count(*) as requests
 FROM access_log
 GROUP BY c_ip
 ORDER BY requests DESC
 LIMIT 10

-- Average response time
;SELECT avg(sc_bytes) as avg_bytes, avg(cs_uri_query) as avg_query_time
 FROM access_log

-- Errors in last hour
;SELECT * FROM access_log
 WHERE log_time > datetime('now', '-1 hour')
 AND log_level = 'error'

-- Status code distribution
;SELECT sc_status, count(*) as count
 FROM access_log
 GROUP BY sc_status
```

#### Filtering

```bash
# Inside lnav

# Only show errors (o for "only")
o error

# Hide debug messages (O for capital "hide")
O debug

# Filter by regex
o .*timeout.*

# Clear filters
u
```

#### Integration Tips

```bash
# Real-time monitoring
lnav -t /var/log/syslog

# Load multiple log directories
lnav /var/log/nginx/*.log /var/log/app/*.log

# Pipe from other commands
tail -f /var/log/app.log | lnav

# Docker logs
docker logs container_name 2>&1 | lnav

# Kubernetes logs
kubectl logs pod-name -f | lnav

# SSH log viewing
ssh user@server 'tail -f /var/log/app.log' | lnav

# Aliases
alias nginx-logs='lnav /var/log/nginx/*.log'
alias app-logs='lnav /var/log/myapp/*.log'
alias sys-logs='sudo lnav /var/log/syslog'
```

#### Advanced Features

**Histogram View:**
```
Press 'i' to see log message distribution over time
Useful for identifying traffic patterns or error spikes
```

**Pretty Print:**
```
Automatically formats JSON and XML logs
Press 'p' to toggle pretty print mode
```

**Session Management:**
```bash
# Save current view/filters/bookmarks
:save-session my-analysis

# Load session
lnav -f my-analysis.lnav
```

**Custom Formats:**

Create `~/.lnav/formats/myapp/format.json`:

```json
{
  "myapp_log": {
    "title": "My Application Log Format",
    "regex": {
      "std": {
        "pattern": "^(?<timestamp>\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}) \\[(?<level>\\w+)\\] (?<body>.*)$"
      }
    },
    "level-field": "level",
    "timestamp-field": "timestamp",
    "timestamp-format": ["%Y-%m-%d %H:%M:%S"]
  }
}
```

#### Troubleshooting Workflows

**Find Application Errors:**
```
1. Open logs: lnav /var/log/app/*.log
2. Press 'e' to jump to first error
3. Press 'E' to cycle through errors
4. Press 'm' to bookmark important entries
5. Use SQL to analyze: ;SELECT * FROM log WHERE log_level = 'error'
```

**Investigate Traffic Spike:**
```
1. Open logs: lnav /var/log/nginx/access.log
2. Press 'i' for histogram
3. Identify spike time
4. Navigate to that time period
5. SQL analysis: ;SELECT c_ip, count(*) FROM access_log GROUP BY c_ip
```

**Correlate Multiple Services:**
```
1. Open all logs: lnav /var/log/app/*.log /var/log/nginx/*.log
2. Press 'f/F' to switch between files
3. Logs are time-ordered across all files
4. Use filters to focus on specific issues
```

#### Resources

- **Website**: [https://lnav.org/](https://lnav.org/)
- **GitHub**: [tstack/lnav](https://github.com/tstack/lnav)
- **Documentation**: [https://docs.lnav.org/](https://docs.lnav.org/)
- **SQL Reference**: [https://docs.lnav.org/en/latest/sqlext.html](https://docs.lnav.org/en/latest/sqlext.html)

---

## Entertainment

### Spotify Player - Spotify in Terminal

A feature-rich Spotify client for the terminal, allowing you to control playback, browse playlists, and manage your music without leaving the command line.

#### Quick Start

```bash
# Install with cargo
cargo install spotify_player

# Or download from releases
wget https://github.com/aome510/spotify_player/releases/download/v0.17.0/spotify_player-linux.tar.gz
tar xzf spotify_player-linux.tar.gz
sudo mv spotify_player /usr/local/bin/

# First run (requires Spotify Premium)
spotify_player

# Follow authentication prompts
```

#### Key Features

- **Full Playback Control**: Play, pause, skip, seek, volume
- **Library Browsing**: Browse playlists, albums, artists
- **Search**: Find songs, albums, artists, playlists
- **Queue Management**: View and modify playback queue
- **Lyrics**: Display synchronized lyrics
- **Device Selection**: Switch playback devices
- **Podcast Support**: Listen to podcasts
- **Streaming**: Direct audio streaming (no Spotify client needed)
- **Themes**: Customizable UI themes
- **Mouse Support**: Click to play, navigate
- **Vim Keybindings**: Familiar navigation

#### Common Commands/Shortcuts

| Key | Action |
|-----|--------|
| `?` | Help |
| `Space` | Play/pause |
| `.` | Next track |
| `,` | Previous track |
| `+/-` | Volume up/down |
| `[/]` | Seek backward/forward |
| `s` | Search |
| `q` | Add to queue |
| `r` | Toggle repeat |
| `z` | Toggle shuffle |
| `d` | Switch device |
| `l` | Toggle lyrics |
| `/` | Filter |
| `Tab` | Next view |
| `Shift+Tab` | Previous view |
| `Enter` | Play selected |
| `f` | Follow currently playing |

#### Use Cases

- **Focus Sessions**: Control music while coding
- **Server Environments**: Play music on headless systems
- **Minimal Setups**: Lightweight alternative to GUI apps
- **SSH Sessions**: Control Spotify remotely
- **Productivity**: Stay in terminal workflow
- **Music Discovery**: Browse and explore new music

#### Integration Tips

```bash
# Configuration: ~/.config/spotify_player/app.toml

# Set default device
default_device = "My Laptop"

# Enable streaming mode
streaming = true

# Custom theme
theme = "dracula"

# Vim keybindings
enable_vim_like_navigation = true

# Alias for quick access
alias sp='spotify_player'
alias music='spotify_player'
```

#### Configuration Example

`~/.config/spotify_player/app.toml`:

```toml
[player]
streaming = true
default_device = "spotify_player"
volume = 70

[theme]
theme = "dracula"

[keybindings]
# Custom keybindings
play_pause = "Space"
next = ">"
previous = "<"
volume_up = "+"
volume_down = "-"
```

#### Resources

- **GitHub**: [aome510/spotify_player](https://github.com/aome510/spotify_player)
- **Documentation**: Available in repository
- **Requirements**: Spotify Premium account

---

### PyRadio - Internet Radio in Terminal

**PyRadio** is a simple curses-based internet radio player. It lets you listen to radio stations from around the world directly in your terminal.

#### Quick Start

```bash
# Install with pip
pip install pyradio

# Ubuntu/Debian
sudo apt install pyradio

# macOS
brew install pyradio

# Run
pyradio
```

#### Key Features

- **Station Browser**: Browse curated radio stations
- **Custom Stations**: Add your own stations
- **Multiple Players**: Support for mpv, mplayer, vlc
- **Themes**: Multiple color schemes
- **Recording**: Record streams to file
- **Favorites**: Mark favorite stations
- **Search**: Find stations by name
- **Volume Control**: Built-in volume adjustment
- **Playlist Management**: Organize stations

#### Common Commands/Shortcuts

| Key | Action |
|-----|--------|
| `Enter` | Play selected station |
| `Space` | Stop playback |
| `+/-` | Volume up/down |
| `m` | Mute/unmute |
| `v` | Save volume |
| `f` | Add to favorites |
| `/` | Search |
| `n/N` | Next/previous search result |
| `j/k` | Up/down (vim-style) |
| `a` | Add station |
| `e` | Edit station |
| `r` | Toggle recording |
| `t` | Change theme |
| `?` | Help |
| `q` | Quit |

#### Use Cases

- **Background Music**: Listen to radio while coding
- **News**: Keep up with news stations
- **Music Discovery**: Explore international stations
- **Podcasts**: Listen to radio shows
- **Ambient Sound**: Background ambience

#### Integration Tips

```bash
# Add custom stations
# Edit ~/.config/pyradio/stations.csv
"Station Name","Stream URL"
"BBC Radio 1","http://stream.live.vc.bbcmedia.co.uk/bbc_radio_one"
"Jazz FM","http://jazz-wr11.ice.infomaniak.ch/jazz-wr11-128.mp3"

# Theme configuration
# ~/.config/pyradio/config

# Set default player
player = mpv

# Set default playlist
default_playlist = stations

# Alias
alias radio='pyradio'
```

#### Resources

- **GitHub**: [coderholic/pyradio](https://github.com/coderholic/pyradio)
- **Documentation**: [https://github.com/coderholic/pyradio/blob/master/README.md](https://github.com/coderholic/pyradio/blob/master/README.md)
- **Station Lists**: Community-curated station databases

---

### Textual Paint - MS Paint in Terminal

**Textual Paint** is a TUI (Text User Interface) implementation of MS Paint, built with the Textual framework. It brings nostalgic paint functionality to your terminal.

#### Quick Start

```bash
# Install with pip
pip install textual-paint

# Or with pipx
pipx install textual-paint

# Run
textual-paint

# Open existing file
textual-paint image.ans
```

#### Key Features

- **Drawing Tools**: Pencil, brush, line, rectangle, ellipse
- **Fill Tool**: Flood fill with color
- **Text Tool**: Add text to images
- **Color Palette**: Full color selection
- **Selection Tools**: Rectangular and free-form selection
- **Undo/Redo**: Full history support
- **ANSI Art**: Save as ANSI art files
- **Magnifier**: Zoom in for detail work
- **ASCII Characters**: Use ASCII for drawing

#### Common Commands/Shortcuts

| Key | Action |
|-----|--------|
| `Ctrl+N` | New file |
| `Ctrl+O` | Open file |
| `Ctrl+S` | Save |
| `Ctrl+Z` | Undo |
| `Ctrl+Y` | Redo |
| `Ctrl+Q` | Quit |
| `F` | Fill tool |
| `P` | Pencil tool |
| `B` | Brush tool |
| `L` | Line tool |
| `R` | Rectangle tool |
| `E` | Ellipse tool |
| `T` | Text tool |
| `S` | Select tool |

#### Use Cases

- **ANSI Art**: Create terminal-based artwork
- **Diagrams**: Simple diagrams in text
- **Fun**: Nostalgic MS Paint experience
- **ASCII Art**: Create ASCII art easily
- **Signatures**: Create terminal signatures

#### Integration Tips

```bash
# Alias
alias paint='textual-paint'

# Create ANSI art for terminal display
textual-paint art.ans
cat art.ans  # Display in terminal

# Use in presentations
# Create visual elements for terminal presentations
```

#### Resources

- **GitHub**: [1j01/textual-paint](https://github.com/1j01/textual-paint)
- **Textual Framework**: [https://textual.textualize.io/](https://textual.textualize.io/)

---

## Screensavers

### sysc-walls - Terminal Screensavers

**sysc-walls** provides various terminal screensavers and visual effects for your command line.

#### Quick Start

```bash
# Install from source
git clone https://github.com/syscalls-screensaver/sysc-walls.git
cd sysc-walls
make
sudo make install

# Run
sysc-walls
```

#### Key Features

- **Multiple Effects**: Various visual screensavers
- **Customizable**: Configure colors and effects
- **Low Resource**: Minimal CPU usage
- **Terminal Compatible**: Works in most terminal emulators
- **Keyboard Control**: Interactive controls

#### Common Effects

- Matrix rain
- Starfield
- Plasma
- Fire effect
- Bouncing text
- ASCII animations

#### Use Cases

- **Terminal Screensaver**: Protect screen during idle
- **Demo Mode**: Display on monitors/kiosks
- **Fun**: Visual entertainment in terminal
- **Presentations**: Eye-catching terminal displays

#### Integration Tips

```bash
# Add to idle timer
# Using tmux
set -g lock-after-time 300
set -g lock-command "sysc-walls"

# Shell timeout
export TMOUT=300
trap 'sysc-walls' TIMEOUT
```

#### Resources

- **GitHub**: Search for "sysc-walls" or terminal screensavers
- **Alternatives**: cmatrix, asciiquarium, pipes.sh

---

## Additional Resources

### Learning TUI Development

If you're inspired to build your own TUI tools:

**Frameworks:**
- **Python**: [Textual](https://textual.textualize.io/) - Modern TUI framework
- **Go**: [Bubbletea](https://github.com/charmbracelet/bubbletea) - Elm-inspired framework
- **Rust**: [Ratatui](https://github.com/ratatui-org/ratatui) - Rust TUI library
- **JavaScript**: [Ink](https://github.com/vadimdemedes/ink) - React for CLI

**Example Projects:**
- TFE (featured above) - Python/Textual
- LazyGit - Go/Bubbletea
- GitUI - Rust/Ratatui
- bottom - Rust/tui-rs

### TUI Collections

- **Awesome TUIs**: [https://github.com/rothgar/awesome-tuis](https://github.com/rothgar/awesome-tuis)
- **Terminal Trove**: Curated list of terminal tools
- **r/commandline**: Reddit community for CLI tools

---

## Quick Reference

### Installation Commands Summary

```bash
# Package managers by platform
brew install <tool>              # macOS
sudo apt install <tool>          # Ubuntu/Debian
sudo pacman -S <tool>            # Arch Linux
sudo dnf install <tool>          # Fedora/RHEL
cargo install <tool>             # Rust/Cargo
pip install <tool>               # Python/pip
npm install -g <tool>            # Node/npm

# Featured: TFE
git clone https://github.com/GGPrompts/TFE.git
cd TFE && pip install -r requirements.txt && python tfe.py
```

### Common Aliases

Add to `~/.bashrc` or `~/.zshrc`:

```bash
# File management
alias fm='tfe'

# Git
alias lg='lazygit'
alias gg='gitui'

# Monitoring
alias top='htop'
alias monitor='btm'

# Editing
alias m='micro'
export EDITOR='micro'

# Code analysis
alias count='cloc --exclude-dir=node_modules,.git .'

# Logs
alias logs='lnav'

# Entertainment
alias music='spotify_player'
alias radio='pyradio'
```

---

**Document Version**: 1.0
**Last Updated**: 2025-11-22
**Maintained by**: Matt's Portfolio Documentation

For updates and contributions, visit the individual tool repositories linked throughout this guide.
