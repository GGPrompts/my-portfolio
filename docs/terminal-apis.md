# Terminal APIs Reference

Comprehensive API documentation for terminal multiplexing and mobile terminal development.

**Last Updated**: 2025-11-22
**Author**: Matt
**Purpose**: Quick reference for tmux and Termux API development

---

## Table of Contents

1. [tmux API](#tmux-api)
   - [Quick Reference](#tmux-quick-reference)
   - [Core Concepts](#tmux-core-concepts)
   - [Session Management](#session-management)
   - [Window Management](#window-management)
   - [Pane Management](#pane-management)
   - [Key Bindings](#key-bindings)
   - [Status Line](#status-line-configuration)
   - [Scripting tmux](#scripting-tmux)
   - [Configuration](#tmux-configuration)
   - [Integration](#tmux-integration)
   - [Best Practices](#tmux-best-practices)
   - [Troubleshooting](#tmux-troubleshooting)
2. [Termux API](#termux-api)
   - [Quick Reference](#termux-quick-reference)
   - [Overview](#termux-overview)
   - [API Commands](#termux-api-commands)
   - [Android Integration](#android-integration)
   - [Running TUI Apps](#running-tui-apps-on-mobile)
   - [Package Management](#package-management)
   - [Configuration](#termux-configuration)
   - [Scripting](#termux-scripting)
   - [Best Practices](#termux-best-practices)
   - [Troubleshooting](#termux-troubleshooting)

---

## tmux API

### tmux Quick Reference

**Most Common Commands**

```bash
# Session Management
tmux new -s session-name          # Create new session
tmux attach -t session-name       # Attach to session
tmux detach                        # Detach from session (Ctrl+b d)
tmux ls                           # List all sessions
tmux kill-session -t session-name # Kill specific session
tmux kill-server                  # Kill all sessions

# Window Management
Ctrl+b c                          # Create new window
Ctrl+b ,                          # Rename current window
Ctrl+b n                          # Next window
Ctrl+b p                          # Previous window
Ctrl+b 0-9                        # Switch to window by number
Ctrl+b &                          # Kill current window

# Pane Management
Ctrl+b %                          # Split vertically
Ctrl+b "                          # Split horizontally
Ctrl+b o                          # Switch to next pane
Ctrl+b ;                          # Toggle last active pane
Ctrl+b x                          # Kill current pane
Ctrl+b {                          # Move pane left
Ctrl+b }                          # Move pane right
Ctrl+b z                          # Toggle pane zoom
Ctrl+b arrow-keys                 # Resize pane

# Copy Mode
Ctrl+b [                          # Enter copy mode
Space                             # Start selection (in copy mode)
Enter                             # Copy selection
Ctrl+b ]                          # Paste buffer

# Command Mode
Ctrl+b :                          # Enter command mode
```

---

### tmux Core Concepts

tmux operates on a hierarchical structure:

```
Server
  └── Session (named container)
       └── Window (like a tab)
            └── Pane (split view)
```

**Key Terminology:**

- **Server**: The tmux background process managing all sessions
- **Session**: A collection of windows, can be attached/detached
- **Window**: A full screen view, like browser tabs
- **Pane**: A split section within a window
- **Prefix Key**: Default `Ctrl+b`, used before all commands

---

### Session Management

#### Creating Sessions

```bash
# Basic session
tmux new -s dev

# Named session with specific window
tmux new -s dev -n editor

# Start in specific directory
tmux new -s project -c ~/projects/myapp

# Create detached session
tmux new -s background -d

# Create with specific shell
tmux new -s zsh-session -s /bin/zsh
```

#### Attaching to Sessions

```bash
# Attach to named session
tmux attach -t dev

# Attach to last session
tmux attach

# Attach to session by index
tmux attach -t 0

# Attach and detach other clients
tmux attach -t dev -d
```

#### Listing and Switching Sessions

```bash
# List all sessions
tmux ls
tmux list-sessions

# Switch to another session (from inside tmux)
Ctrl+b s    # Interactive session selector
Ctrl+b (    # Previous session
Ctrl+b )    # Next session

# Switch via command
tmux switch-client -t session-name
```

#### Renaming Sessions

```bash
# From outside tmux
tmux rename-session -t old-name new-name

# From inside tmux
Ctrl+b $    # Rename current session

# Command mode
:rename-session new-name
```

#### Killing Sessions

```bash
# Kill specific session
tmux kill-session -t session-name

# Kill all sessions except current
tmux kill-session -a

# Kill all sessions except specific one
tmux kill-session -a -t keep-this-one

# Kill server (all sessions)
tmux kill-server
```

---

### Window Management

#### Creating and Naming Windows

```bash
# Create new window (from inside tmux)
Ctrl+b c

# Create with specific name
tmux new-window -n editor

# Create in specific directory
tmux new-window -c ~/projects

# Create and run command
tmux new-window -n build "npm run dev"
```

#### Navigating Windows

```bash
# Next/Previous window
Ctrl+b n    # Next
Ctrl+b p    # Previous

# Switch by number
Ctrl+b 0-9

# Interactive window selector
Ctrl+b w

# Last active window
Ctrl+b l

# Find window by name
Ctrl+b f
```

#### Renaming and Managing Windows

```bash
# Rename current window
Ctrl+b ,

# From command mode
:rename-window new-name

# Move window to different position
tmux move-window -s source-index -t target-index

# Swap windows
tmux swap-window -s 1 -t 2

# Kill window
Ctrl+b &
tmux kill-window -t window-name
```

---

### Pane Management

#### Creating Panes (Splits)

```bash
# Vertical split (side by side)
Ctrl+b %
tmux split-window -h

# Horizontal split (top and bottom)
Ctrl+b "
tmux split-window -v

# Split with specific size
tmux split-window -h -l 30%    # 30% width
tmux split-window -v -l 10     # 10 lines height

# Split and run command
tmux split-window -h "htop"
```

#### Navigating Panes

```bash
# Cycle through panes
Ctrl+b o    # Next pane
Ctrl+b ;    # Last active pane

# Move by direction
Ctrl+b arrow-keys

# Display pane numbers (then type number to switch)
Ctrl+b q

# Break pane into new window
Ctrl+b !

# Toggle pane layouts
Ctrl+b Space
```

#### Resizing Panes

```bash
# Resize in direction
Ctrl+b Ctrl+arrow-keys

# Command mode resize
:resize-pane -D 5    # Down 5 lines
:resize-pane -U 5    # Up 5 lines
:resize-pane -L 10   # Left 10 cells
:resize-pane -R 10   # Right 10 cells

# Resize to specific size
:resize-pane -x 80   # 80 cells wide
:resize-pane -y 24   # 24 lines tall

# Equal size all panes
Ctrl+b Alt+1    # Horizontal layout
Ctrl+b Alt+2    # Vertical layout
```

#### Managing Panes

```bash
# Zoom pane (toggle fullscreen)
Ctrl+b z

# Kill pane
Ctrl+b x

# Swap panes
Ctrl+b Ctrl+o    # Rotate panes
Ctrl+b {         # Swap with previous
Ctrl+b }         # Swap with next

# Move pane to new window
Ctrl+b !

# Join pane from another window
:join-pane -s window-name
```

---

### Key Bindings

#### Default Prefix

```bash
# Default prefix is Ctrl+b
# Change prefix in .tmux.conf:
unbind C-b
set-prefix C-a
bind C-a send-prefix
```

#### Custom Key Bindings

```bash
# In .tmux.conf

# Reload config
bind r source-file ~/.tmux.conf \; display "Config reloaded!"

# Better split keys
bind | split-window -h
bind - split-window -v

# Vim-like pane navigation
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R

# Vim-like pane resizing
bind -r H resize-pane -L 5
bind -r J resize-pane -D 5
bind -r K resize-pane -U 5
bind -r L resize-pane -R 5

# Quick pane selection
bind -r ( switch-client -p
bind -r ) switch-client -n

# Synchronize panes
bind y setw synchronize-panes

# Copy mode bindings
bind -T copy-mode-vi v send-keys -X begin-selection
bind -T copy-mode-vi y send-keys -X copy-selection-and-cancel
```

#### Mouse Support

```bash
# Enable mouse in .tmux.conf
set -g mouse on

# Click to select pane
# Drag to resize pane
# Click to select window
# Scroll to enter copy mode
```

---

### Status Line Configuration

#### Basic Status Line

```bash
# In .tmux.conf

# Status line position
set -g status-position bottom
set -g status-position top

# Update interval (seconds)
set -g status-interval 1

# Status line colors
set -g status-style "bg=black,fg=cyan"

# Window status format
set -g window-status-format " #I:#W "
set -g window-status-current-format " #I:#W "
set -g window-status-current-style "bg=cyan,fg=black"

# Left status
set -g status-left-length 40
set -g status-left "#[fg=green]Session: #S #[fg=yellow]#I #[fg=cyan]#P"

# Right status
set -g status-right-length 60
set -g status-right "#[fg=cyan]%H:%M %d-%b-%y"
```

#### Advanced Status Line

```bash
# Format Variables:
# #S - session name
# #I - window index
# #W - window name
# #P - pane index
# #T - pane title
# #H - hostname
# #h - hostname (short)
# #F - window flags
# #(shell-command) - shell command output

# Example: Show CPU and memory
set -g status-right "#(cpu_usage) | #(memory_usage) | %H:%M"

# Window flags:
# * - current window
# - - last window
# # - activity
# ! - bell
# ~ - silence
# M - marked pane
# Z - zoomed pane

# Custom status line (terminal theme)
set -g status-style "bg=#0a0e14,fg=#00d9ff"
set -g status-left "#[fg=#00ff87,bold]❯ #S #[fg=#5c6370]│ "
set -g status-right "#[fg=#5c6370]│ #[fg=#00d9ff]%H:%M #[fg=#5c6370]│ #[fg=#00ff87]#H"
set -g window-status-current-style "fg=#00ff87,bold"
set -g window-status-style "fg=#5c6370"
```

#### Dynamic Status Line (Matt's Claude Code Integration)

```bash
# Show Claude Code status in tmux
# In .tmux.conf:

set -g status-right "#{?client_prefix,#[bg=yellow]#[fg=black] PREFIX ,}#[bg=black]#[fg=cyan] #(claude-status) | %H:%M "

# claude-status script:
#!/bin/bash
# Check if Claude Code is running
if pgrep -f "claude-code" > /dev/null; then
  echo "🤖 Claude"
else
  echo ""
fi
```

---

### Scripting tmux

#### Send Commands to Sessions

```bash
# Send keys to a session
tmux send-keys -t session-name "ls -la" Enter

# Send to specific window
tmux send-keys -t session-name:window-index "npm run dev" Enter

# Send to specific pane
tmux send-keys -t session-name:window-index.pane-index "htop" Enter

# Example: Start dev environment
tmux send-keys -t dev:0 "cd ~/project && npm run dev" Enter
tmux send-keys -t dev:1 "cd ~/project && git status" Enter
```

#### Capture Pane Output

```bash
# Capture visible pane content
tmux capture-pane -t session-name:window.pane -p

# Capture with history
tmux capture-pane -t session-name -S -1000 -p

# Save to file
tmux capture-pane -t session-name -p > output.txt

# Example: Monitor logs
tmux capture-pane -t logs:0 -p | tail -n 20
```

#### List and Parse Sessions

```bash
# List sessions in script-friendly format
tmux list-sessions -F "#{session_name}"

# Get detailed info
tmux list-sessions -F "#{session_name}:#{session_windows}:#{session_attached}"

# Parse in script
tmux list-sessions -F "#{session_name}" | while read session; do
  echo "Processing $session"
  # Do something with each session
done

# Count panes in session
tmux list-panes -t session-name | wc -l
```

#### Automated Session Creation

```bash
#!/bin/bash
# create-dev-session.sh

SESSION_NAME="dev"

# Check if session exists
tmux has-session -t $SESSION_NAME 2>/dev/null

if [ $? != 0 ]; then
  # Create new session
  tmux new-session -d -s $SESSION_NAME -n editor

  # Create windows
  tmux new-window -t $SESSION_NAME:1 -n server
  tmux new-window -t $SESSION_NAME:2 -n git
  tmux new-window -t $SESSION_NAME:3 -n logs

  # Split panes in server window
  tmux split-window -t $SESSION_NAME:1 -h

  # Send commands
  tmux send-keys -t $SESSION_NAME:0 "nvim ." Enter
  tmux send-keys -t $SESSION_NAME:1.0 "npm run dev" Enter
  tmux send-keys -t $SESSION_NAME:1.1 "npm run test:watch" Enter
  tmux send-keys -t $SESSION_NAME:2 "git status" Enter
  tmux send-keys -t $SESSION_NAME:3 "tail -f /var/log/app.log" Enter

  # Select first window
  tmux select-window -t $SESSION_NAME:0
fi

# Attach to session
tmux attach-t $SESSION_NAME
```

#### tmuxplexer Integration

**Matt's tmuxplexer Project**: https://github.com/GGPrompts/tmuxplexer

A TUI dashboard for managing all tmux sessions:

```bash
# Features:
# - View all tmux sessions at once
# - Kill/attach/detach from UI
# - View all Claude Code statuslines
# - Send keys to any terminal
# - Live preview with tmux capture-pane

# Key commands used by tmuxplexer:

# List all sessions with details
tmux list-sessions -F "#{session_name}|#{session_windows}|#{session_attached}|#{session_created}"

# List windows for each session
tmux list-windows -t session-name -F "#{window_index}|#{window_name}|#{window_active}"

# List panes for each window
tmux list-panes -t session:window -F "#{pane_index}|#{pane_current_command}|#{pane_pid}"

# Capture pane for live preview
tmux capture-pane -t session:window.pane -p -e

# Send commands from UI
tmux send-keys -t session:window.pane "command" Enter

# Kill session from UI
tmux kill-session -t session-name

# Attach to session
tmux attach-t session-name

# Detach clients
tmux detach-client -s session-name
```

---

### tmux Configuration

#### Basic .tmux.conf

```bash
# ~/.tmux.conf

# ============================================
# General Settings
# ============================================

# Set prefix to Ctrl+a
unbind C-b
set-prefix C-a
bind C-a send-prefix

# Start windows and panes at 1, not 0
set -g base-index 1
setw -g pane-base-index 1

# Renumber windows when one is closed
set -g renumber-windows on

# Increase scrollback buffer
set -g history-limit 50000

# Enable mouse mode
set -g mouse on

# Set terminal colors
set -g default-terminal "screen-256color"
set -ga terminal-overrides ",xterm-256color:Tc"

# ============================================
# Key Bindings
# ============================================

# Reload config
bind r source-file ~/.tmux.conf \; display "Config reloaded!"

# Better split keys
bind | split-window -h -c "#{pane_current_path}"
bind - split-window -v -c "#{pane_current_path}"

# Vim-like pane navigation
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R

# Vim-like pane resizing
bind -r H resize-pane -L 5
bind -r J resize-pane -D 5
bind -r K resize-pane -U 5
bind -r L resize-pane -R 5

# ============================================
# Status Line
# ============================================

set -g status-position bottom
set -g status-interval 1
set -g status-style "bg=#0a0e14,fg=#00d9ff"
set -g status-left-length 40
set -g status-right-length 80

set -g status-left "#[fg=#00ff87,bold]❯ #S #[fg=#5c6370]│ "
set -g status-right "#[fg=#5c6370]│ #[fg=#00d9ff]%H:%M:%S #[fg=#5c6370]│ #[fg=#00ff87]#H "

# Window status
set -g window-status-format " #I:#W "
set -g window-status-current-format " #I:#W "
set -g window-status-current-style "fg=#00ff87,bold"
set -g window-status-style "fg=#5c6370"

# ============================================
# Copy Mode
# ============================================

# Vi mode in copy mode
setw -g mode-keys vi

# Copy mode bindings
bind -T copy-mode-vi v send-keys -X begin-selection
bind -T copy-mode-vi y send-keys -X copy-selection-and-cancel
bind -T copy-mode-vi C-v send-keys -X rectangle-toggle

# ============================================
# Pane Settings
# ============================================

# Pane borders
set -g pane-border-style "fg=#5c6370"
set -g pane-active-border-style "fg=#00ff87"

# Pane number display
set -g display-panes-time 2000
set -g display-panes-colour "#5c6370"
set -g display-panes-active-colour "#00ff87"

# ============================================
# Plugin Manager (optional)
# ============================================

# List of plugins
set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-sensible'
set -g @plugin 'tmux-plugins/tmux-resurrect'
set -g @plugin 'tmux-plugins/tmux-continuum'

# Initialize TMUX plugin manager
# run '~/.tmux/plugins/tpm/tpm'
```

---

### tmux Integration

#### With Neovim/Vim

```bash
# vim-tmux-navigator plugin
# Navigate seamlessly between vim and tmux panes

# In .tmux.conf:
is_vim="ps -o state= -o comm= -t '#{pane_tty}' \
    | grep -iqE '^[^TXZ ]+ +(\\S+\\/)?g?(view|n?vim?x?)(diff)?$'"
bind-key -n C-h if-shell "$is_vim" "send-keys C-h"  "select-pane -L"
bind-key -n C-j if-shell "$is_vim" "send-keys C-j"  "select-pane -D"
bind-key -n C-k if-shell "$is_vim" "send-keys C-k"  "select-pane -U"
bind-key -n C-l if-shell "$is_vim" "send-keys C-l"  "select-pane -R"
```

#### With SSH

```bash
# Persistent sessions over SSH
ssh user@host -t "tmux attach || tmux new"

# Named sessions per project
ssh user@host -t "tmux attach -t project || tmux new -s project"

# Keep sessions alive on disconnect
# tmux automatically keeps sessions running
```

#### With Claude Code

```bash
# Run Claude Code in tmux session
tmux new -s claude -n "ai-dev" "claude-code"

# Split for monitoring
tmux split-window -h -t claude:0
tmux send-keys -t claude:0.1 "watch -n1 'ps aux | grep claude'" Enter

# Capture Claude output for logging
tmux pipe-pane -t claude:0.0 -o "cat >> ~/claude-logs/$(date +%Y%m%d-%H%M%S).log"
```

#### With Scripts

```bash
# Session launcher script
tmux-dev() {
  local session="$1"
  local path="$2"

  tmux new-session -d -s "$session" -c "$path"
  tmux split-window -t "$session:0" -h -c "$path"
  tmux split-window -t "$session:0.1" -v -c "$path"
  tmux send-keys -t "$session:0.0" "nvim ." Enter
  tmux send-keys -t "$session:0.1" "git status" Enter
  tmux send-keys -t "$session:0.2" "npm run dev" Enter
  tmux attach -t "$session"
}

# Usage:
# tmux-dev myproject ~/code/myproject
```

---

### tmux Best Practices

#### Session Organization

```bash
# One session per project
tmux new -s project-name

# Descriptive window names
tmux rename-window editor
tmux rename-window server
tmux rename-window logs

# Consistent pane layouts
# Editor | Terminal
# Server | Logs
```

#### Performance Tips

```bash
# Limit status line updates
set -g status-interval 5  # Instead of 1

# Limit history
set -g history-limit 10000  # Instead of 50000 for normal use

# Disable mouse if not needed
set -g mouse off

# Use aggressive-resize for multi-client
setw -g aggressive-resize on
```

#### Security Considerations

```bash
# Secure socket permissions
# Default: /tmp/tmux-<uid>/default

# Set custom socket path
tmux -S /path/to/secure/socket new -s secure-session

# Restrict socket permissions
chmod 700 /path/to/secure/socket

# Don't log sensitive commands
set -g history-limit 0  # For specific session
```

#### Backup and Restore

```bash
# Using tmux-resurrect plugin
# Save: Ctrl+b Ctrl+s
# Restore: Ctrl+b Ctrl+r

# Manual session export
tmux list-windows -a -F "#{session_name}:#{window_index} #{window_name} #{pane_current_path}" > tmux-layout.txt

# Script to recreate from export
while IFS= read -r line; do
  # Parse and recreate session structure
done < tmux-layout.txt
```

---

### tmux Troubleshooting

#### Common Issues

**Issue: Lost connection to server**
```bash
# Check if server is running
pgrep tmux

# Start server
tmux start-server

# Kill stale server
pkill tmux
tmux start-server
```

**Issue: Panes not responding**
```bash
# Check if pane process is frozen
tmux list-panes -F "#{pane_pid} #{pane_current_command}"
ps -p <pid>

# Kill frozen pane
kill -9 <pid>
```

**Issue: Colors not working**
```bash
# Check TERM variable
echo $TERM  # Should be screen-256color or tmux-256color

# Set in .tmux.conf
set -g default-terminal "screen-256color"
set -ga terminal-overrides ",xterm-256color:Tc"

# Test colors
curl -s https://gist.githubusercontent.com/lilydjwg/fdeaf79e921c2f413f44b6f613f6ad53/raw/94d8b2be62657e96488038b0e547e3009ed87d40/colors.py | python
```

**Issue: Copy/paste not working**
```bash
# macOS: Install reattach-to-user-namespace
brew install reattach-to-user-namespace

# In .tmux.conf:
set -g default-command "reattach-to-user-namespace -l $SHELL"

# Linux: Use xclip or xsel
bind -T copy-mode-vi y send-keys -X copy-pipe-and-cancel "xclip -selection clipboard"
```

**Issue: Session names corrupted**
```bash
# List sessions with details
tmux list-sessions -F "#{session_name}"

# Rename corrupted session
tmux rename-session -t old-name new-name
```

**Issue: High CPU usage**
```bash
# Check status interval
tmux show-options -g status-interval

# Reduce update frequency
set -g status-interval 5

# Check for expensive status line commands
# Remove or optimize shell commands in status-right/status-left
```

---

## Termux API

### Termux Quick Reference

**Most Common Commands**

```bash
# System Info
termux-battery-status          # Battery level, status, temperature
termux-wifi-connectioninfo     # WiFi SSID, IP, speed

# Clipboard
termux-clipboard-get           # Get clipboard content
termux-clipboard-set "text"    # Set clipboard content

# Notifications
termux-notification -t "Title" -c "Content"
termux-toast "Quick message"

# Location
termux-location               # GPS coordinates
termux-location -p network    # Network-based location

# Camera
termux-camera-photo -c 0 output.jpg    # Rear camera
termux-camera-photo -c 1 output.jpg    # Front camera

# Files & Sharing
termux-share file.txt         # Share via Android share menu
termux-open file.pdf          # Open with default app

# Sensors
termux-sensor -s accelerometer
termux-sensor -s gyroscope
termux-sensor -s light

# Communication
termux-sms-send -n "+1234567890" "Message"
termux-telephony-call "+1234567890"

# Media
termux-media-scan file.mp3    # Add to media library
termux-torch on/off           # Flashlight

# Storage
termux-setup-storage          # Access Android storage
```

---

### Termux Overview

**What is Termux?**

Termux is a Linux environment for Android that doesn't require root access.

**Key Features:**
- Full Linux terminal emulator
- Package manager (pkg/apt)
- Python, Node.js, Ruby, Go support
- SSH server and client
- Text editors (vim, nano, emacs)
- Git, curl, wget, rsync
- Terminal multiplexer support (tmux, screen)

**Architecture:**
- Uses Android's native Linux kernel
- Provides minimal Debian-like environment
- Apps run in Termux's prefix: `/data/data/com.termux/files`
- Access to Android APIs via `termux-api` package

**Installation:**
1. Install Termux from F-Droid (recommended) or GitHub
2. Install Termux:API app from same source
3. In Termux: `pkg install termux-api`

---

### Termux API Commands

#### Battery and Power

```bash
# Get battery information
termux-battery-status

# Output (JSON):
{
  "health": "GOOD",
  "percentage": 85,
  "plugged": "UNPLUGGED",
  "status": "DISCHARGING",
  "temperature": 28.5,
  "current": -450000
}

# Use in scripts
battery=$(termux-battery-status | jq -r '.percentage')
if [ $battery -lt 20 ]; then
  termux-notification -t "Low Battery" -c "$battery% remaining"
fi

# Monitor charging status
watch -n 10 'termux-battery-status | jq ".percentage, .status"'
```

#### Clipboard Operations

```bash
# Copy to clipboard
echo "Hello Android" | termux-clipboard-set
termux-clipboard-set "Direct text"

# Get from clipboard
termux-clipboard-get

# Pipe to file
termux-clipboard-get > clipboard.txt

# Copy command output
date | termux-clipboard-set

# Example: Quick note-taking
note() {
  termux-clipboard-get >> ~/notes.txt
  termux-toast "Note saved"
}
```

#### Notifications

```bash
# Basic notification
termux-notification -t "Title" -c "Content"

# With priority
termux-notification -t "Urgent" -c "High priority" --priority high

# With actions
termux-notification \
  -t "Build Complete" \
  -c "Project built successfully" \
  --action "termux-open ~/project/build.log" \
  --button1 "View Log" \
  --button1-action "termux-open ~/project/build.log"

# Ongoing notification (persistent)
termux-notification -t "Server Running" --ongoing

# Remove notification by ID
termux-notification-remove --id 42

# Toast (quick popup)
termux-toast "Quick message"
termux-toast -g top "Top position"
termux-toast -s "Short duration"
```

#### Location Services

```bash
# Get GPS location
termux-location

# Output:
{
  "latitude": 37.7749,
  "longitude": -122.4194,
  "altitude": 16.0,
  "accuracy": 5.0,
  "vertical_accuracy": 3.0,
  "bearing": 45.0,
  "speed": 0.0,
  "provider": "gps"
}

# Network-based (faster, less accurate)
termux-location -p network

# Specific provider
termux-location -p gps
termux-location -p passive

# Request updates
termux-location -r updates

# Use in scripts
location=$(termux-location)
lat=$(echo $location | jq -r '.latitude')
lon=$(echo $location | jq -r '.longitude')
echo "Current location: $lat, $lon"

# Log location history
while true; do
  termux-location >> location-log.json
  sleep 60
done
```

#### Camera Access

```bash
# Take photo with rear camera
termux-camera-photo -c 0 rear.jpg

# Take photo with front camera
termux-camera-photo -c 1 front.jpg

# List available cameras
termux-camera-info

# Automated time-lapse
for i in {1..100}; do
  termux-camera-photo -c 0 "timelapse-$i.jpg"
  sleep 10
done

# Motion detection (basic)
while true; do
  termux-camera-photo -c 0 current.jpg
  # Compare with previous frame
  # Trigger action if difference detected
  sleep 1
done
```

#### File Sharing

```bash
# Share file via Android share menu
termux-share file.txt
termux-share image.jpg

# Share with specific app
termux-share -a send file.pdf

# Share from stdin
echo "Hello" | termux-share -a send

# Open file with default app
termux-open document.pdf
termux-open https://example.com

# Open with specific app
termux-open --chooser file.txt

# Download and open
curl -O https://example.com/file.pdf
termux-open file.pdf
```

#### WiFi Information

```bash
# Get WiFi connection info
termux-wifi-connectioninfo

# Output:
{
  "ssid": "MyNetwork",
  "bssid": "00:11:22:33:44:55",
  "ip": "192.168.1.100",
  "mac_address": "aa:bb:cc:dd:ee:ff",
  "network_id": 0,
  "link_speed_mbps": 866,
  "frequency_mhz": 5180,
  "rssi": -45,
  "supplicant_state": "COMPLETED"
}

# Scan for networks
termux-wifi-scaninfo

# Check connectivity
check_wifi() {
  wifi=$(termux-wifi-connectioninfo)
  ssid=$(echo $wifi | jq -r '.ssid')
  if [ "$ssid" != "null" ]; then
    echo "Connected to $ssid"
  else
    echo "Not connected"
  fi
}
```

#### Sensors

```bash
# List available sensors
termux-sensor -l

# Read accelerometer
termux-sensor -s accelerometer

# Continuous updates
termux-sensor -s accelerometer -n 100 -d 100

# Multiple sensors
termux-sensor -s "light,accelerometer"

# Output to file
termux-sensor -s accelerometer -n 1000 > sensor-data.json

# Common sensors:
# - accelerometer
# - gyroscope
# - magnetometer (compass)
# - light
# - proximity
# - pressure
# - temperature
# - humidity
# - step_counter

# Example: Shake detection
termux-sensor -s accelerometer | while read line; do
  x=$(echo $line | jq '.values[0]')
  # Detect shake based on acceleration
done
```

#### SMS and Telephony

```bash
# Send SMS (requires permission)
termux-sms-send -n "+1234567890" "Hello from Termux"

# Send to multiple numbers
termux-sms-send -n "+1111111111,+2222222222" "Broadcast message"

# List SMS inbox
termux-sms-list

# Filter by type
termux-sms-list -t inbox
termux-sms-list -t sent

# Limit results
termux-sms-list -l 10

# Make phone call
termux-telephony-call "+1234567890"

# Get phone info
termux-telephony-deviceinfo

# Get call log
termux-call-log -l 10
```

#### Text-to-Speech

```bash
# Basic TTS
termux-tts-speak "Hello from Termux"

# Specify engine
termux-tts-speak -e com.google.android.tts "Using Google TTS"

# Set language
termux-tts-speak -l en-US "English"
termux-tts-speak -l es-ES "Español"

# Set pitch and rate
termux-tts-speak -p 1.5 -r 0.8 "Faster and higher pitch"

# Stream text
cat story.txt | termux-tts-speak

# Available engines
termux-tts-engines
```

#### Media

```bash
# Scan media file
termux-media-scan file.mp3
termux-media-scan ~/Music/

# Recursive scan
termux-media-scan -r ~/Music/

# Toggle flashlight
termux-torch on
termux-torch off

# Play media
termux-media-player play music.mp3
termux-media-player pause
termux-media-player stop

# Volume control
termux-volume music 10  # Set music volume to 10
```

#### Vibration

```bash
# Vibrate once
termux-vibrate

# Vibrate for duration (ms)
termux-vibrate -d 1000

# Pattern: vibrate,pause,vibrate...
termux-vibrate -f 500,200,500,200,500
```

---

### Android Integration

#### Storage Access

```bash
# Setup storage access (one-time)
termux-setup-storage

# Creates symlinks in ~/:
# ~/storage/shared       - Internal shared storage
# ~/storage/downloads    - Downloads folder
# ~/storage/dcim         - Camera
# ~/storage/pictures     - Pictures
# ~/storage/music        - Music
# ~/storage/movies       - Movies
# ~/storage/external-1   - SD card (if available)

# Copy files to/from Android
cp file.txt ~/storage/downloads/
cp ~/storage/dcim/photo.jpg ~/

# Access from scripts
DOWNLOAD_DIR="$HOME/storage/downloads"
cp output.txt "$DOWNLOAD_DIR/"
```

#### Intents

```bash
# Open URL in browser
am start -a android.intent.action.VIEW -d https://example.com

# Open camera app
am start -a android.media.action.IMAGE_CAPTURE

# Share text
am start -a android.intent.action.SEND \
  --es android.intent.extra.TEXT "Shared from Termux"

# Open app by package name
am start com.android.chrome

# Broadcast intent
am broadcast -a com.example.CUSTOM_ACTION
```

#### Background Execution

```bash
# Termux:Boot - Run on device boot
# 1. Install Termux:Boot app
# 2. Create ~/.termux/boot/ directory
# 3. Add scripts to run on boot

mkdir -p ~/.termux/boot/
cat > ~/.termux/boot/start-sshd.sh << 'EOF'
#!/data/data/com.termux/files/usr/bin/sh
sshd
EOF
chmod +x ~/.termux/boot/start-sshd.sh

# Termux:Widget - Home screen shortcuts
# 1. Install Termux:Widget app
# 2. Create ~/.shortcuts/ directory
# 3. Add scripts

mkdir -p ~/.shortcuts/
cat > ~/.shortcuts/backup.sh << 'EOF'
#!/bin/bash
rsync -av ~/important/ ~/storage/downloads/backup/
termux-toast "Backup complete"
EOF
chmod +x ~/.shortcuts/backup.sh
```

#### Wake Locks

```bash
# Prevent CPU sleep (for long-running tasks)
termux-wake-lock

# Release wake lock
termux-wake-unlock

# Example: Long download
termux-wake-lock
wget http://example.com/large-file.zip
termux-wake-unlock
```

---

### Running TUI Apps on Mobile

#### Bubbletea Apps on Termux

```bash
# Install Go
pkg install golang

# Build Bubbletea app
go build -o myapp main.go

# Run with proper terminal support
TERM=xterm-256color ./myapp

# Font considerations
# Use Termux:Styling for better fonts
# Install Nerd Fonts: JetBrains Mono, Fira Code

# Handle touch input
# Bubbletea supports mouse events
# Enable with:
import "github.com/charmbracelet/bubbletea"

p := tea.NewProgram(
  initialModel(),
  tea.WithMouseAllMotion(),
)
```

#### Matt's TUI Projects on Termux

**TFE (Terminal File Explorer)**

```bash
# Features:
# - Touch-friendly navigation
# - File preview
# - Multi-select
# - Optimized for mobile screens

# Install
go install github.com/GGPrompts/tfe@latest

# Run with mobile optimizations
TERM=xterm-256color TFE_MOBILE=1 tfe

# Key features for mobile:
# - Larger touch targets
# - Swipe gestures (via tmux mouse mode)
# - Simplified keyboard shortcuts
# - Vertical layout for portrait
```

**ThumbCommand (Mobile tmux Dashboard)**

```bash
# Features:
# - View all tmux sessions
# - Touch navigation
# - Session management
# - Optimized for thumbs

# Mobile-specific features:
# - Large buttons
# - Minimal keyboard input
# - Gesture support
# - Landscape mode optimized

# Run in Termux
tmux new -s dashboard thumbcommand

# Key considerations:
# - 6-inch screen optimization
# - One-handed operation
# - Quick session switching
# - Battery efficiency
```

#### Terminal Setup for TUI Apps

```bash
# Install essential tools
pkg install tmux neovim git

# Configure colors
echo "export TERM=xterm-256color" >> ~/.bashrc
echo "export COLORTERM=truecolor" >> ~/.bashrc

# Install Termux:Styling
# Choose Monokai theme
# Choose JetBrains Mono font

# Set up tmux for mobile
cat > ~/.tmux.conf << 'EOF'
# Mobile-friendly tmux config

# Larger prefix timeout
set -g repeat-time 1000

# Enable mouse
set -g mouse on

# Larger status line
set -g status-position bottom
set -g status-style "fg=cyan,bg=black"
set -g status-left-length 50
set -g status-right-length 100

# Touch-friendly key bindings
bind -n M-Left previous-window
bind -n M-Right next-window

# Larger pane borders
set -g pane-border-style "fg=white"
set -g pane-active-border-style "fg=cyan,bg=default"
EOF

# Test TUI rendering
pkg install neofetch
neofetch
```

---

### Package Management

#### Basic pkg Commands

```bash
# Update package lists
pkg update

# Upgrade packages
pkg upgrade

# Install package
pkg install package-name

# Remove package
pkg uninstall package-name

# Search packages
pkg search keyword

# Show package info
pkg show package-name

# List installed packages
pkg list-installed

# Clean cache
pkg clean
```

#### Essential Packages for Development

```bash
# Core tools
pkg install coreutils findutils sed grep

# Programming languages
pkg install python nodejs-lts golang rust

# Version control
pkg install git

# Text editors
pkg install vim neovim nano emacs

# Terminal multiplexer
pkg install tmux screen

# Network tools
pkg install openssh curl wget rsync

# Build tools
pkg install make clang

# TUI development
pkg install golang  # For Bubbletea apps

# Termux API
pkg install termux-api
```

#### Package Sources

```bash
# Main repository (default)
# - Stable packages
# - Updated regularly

# Root repository
pkg install root-repo
# - Packages requiring root
# - Install if device is rooted

# X11 repository
pkg install x11-repo
# - GUI applications
# - Desktop environments

# Unstable repository
pkg install unstable-repo
# - Bleeding edge packages
# - May be unstable
```

---

### Termux Configuration

#### Shell Configuration

```bash
# ~/.bashrc or ~/.zshrc

# ============================================
# Environment Variables
# ============================================

export EDITOR=vim
export VISUAL=vim
export PAGER=less

# Colors
export TERM=xterm-256color
export COLORTERM=truecolor

# Android storage paths
export DOWNLOADS="$HOME/storage/downloads"
export DCIM="$HOME/storage/dcim"

# ============================================
# Aliases
# ============================================

# Navigation
alias ..='cd ..'
alias ...='cd ../..'
alias ll='ls -lah'

# Clipboard
alias pbcopy='termux-clipboard-set'
alias pbpaste='termux-clipboard-get'

# Quick commands
alias battery='termux-battery-status | jq ".percentage, .status"'
alias wifi='termux-wifi-connectioninfo | jq ".ssid, .ip"'

# Git shortcuts
alias gs='git status'
alias gp='git push'
alias gl='git log --oneline -10'

# ============================================
# Functions
# ============================================

# Quick note
note() {
  echo "$(date): $*" >> ~/notes.txt
  termux-toast "Note saved"
}

# Battery alert
battery_check() {
  local level=$(termux-battery-status | jq -r '.percentage')
  if [ $level -lt 20 ]; then
    termux-notification -t "Low Battery" -c "$level% remaining"
  fi
}

# Quick share
share() {
  if [ -f "$1" ]; then
    termux-share "$1"
  else
    echo "$1" | termux-share
  fi
}

# Location logger
log_location() {
  termux-location >> ~/location-history.json
  termux-toast "Location logged"
}

# ============================================
# Startup
# ============================================

# Check battery on start
battery_check

# Show WiFi status
echo "WiFi: $(termux-wifi-connectioninfo | jq -r '.ssid // "Not connected"')"
```

#### Termux Properties

```bash
# ~/.termux/termux.properties

# Extra keys row
extra-keys = [['ESC','/','-','HOME','UP','END','PGUP'], \
              ['TAB','CTRL','ALT','LEFT','DOWN','RIGHT','PGDN']]

# Bell settings
bell-character = ignore

# Back button behavior
back-key = escape

# Enable vibration
vibrate = false

# Terminal scrollback
terminal-cursor-blink-rate = 0
terminal-cursor-style = bar
terminal-margin-horizontal = 0
terminal-margin-vertical = 0
terminal-transcript-rows = 10000

# Apply changes
termux-reload-settings
```

#### SSH Server Setup

```bash
# Install OpenSSH
pkg install openssh

# Set password
passwd

# Start SSH server
sshd

# Get device IP
ifconfig wlan0 | grep inet

# Connect from computer
ssh -p 8022 <device-ip>

# Stop SSH server
pkill sshd

# Auto-start on boot (requires Termux:Boot)
mkdir -p ~/.termux/boot/
cat > ~/.termux/boot/start-sshd.sh << 'EOF'
#!/data/data/com.termux/files/usr/bin/sh
sshd
EOF
chmod +x ~/.termux/boot/start-sshd.sh

# SSH key authentication
ssh-keygen -t ed25519
cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys
```

---

### Termux Scripting

#### Automation Examples

```bash
# Daily backup script
#!/bin/bash
# ~/scripts/daily-backup.sh

termux-wake-lock

# Backup important files
BACKUP_DIR="$HOME/storage/downloads/backup-$(date +%Y%m%d)"
mkdir -p "$BACKUP_DIR"

rsync -av ~/projects/ "$BACKUP_DIR/projects/"
rsync -av ~/notes.txt "$BACKUP_DIR/"
rsync -av ~/.config/ "$BACKUP_DIR/config/"

# Create archive
cd ~/storage/downloads
tar -czf "backup-$(date +%Y%m%d).tar.gz" "backup-$(date +%Y%m%d)"
rm -rf "backup-$(date +%Y%m%d)"

# Notify completion
termux-notification \
  -t "Backup Complete" \
  -c "Daily backup finished successfully"

termux-wake-unlock
```

```bash
# Battery monitor
#!/bin/bash
# ~/scripts/battery-monitor.sh

while true; do
  battery=$(termux-battery-status)
  percentage=$(echo $battery | jq -r '.percentage')
  status=$(echo $battery | jq -r '.status')

  if [ $percentage -lt 20 ] && [ "$status" = "DISCHARGING" ]; then
    termux-notification \
      -t "Low Battery" \
      -c "$percentage% - Please charge" \
      --priority high
    termux-vibrate -d 500
  fi

  sleep 300  # Check every 5 minutes
done
```

```bash
# Location tracker
#!/bin/bash
# ~/scripts/location-tracker.sh

LOGFILE="$HOME/location-history.json"

while true; do
  location=$(termux-location)
  timestamp=$(date -Iseconds)

  echo "{\"timestamp\": \"$timestamp\", \"location\": $location}" >> "$LOGFILE"

  # Check if entered/left specific area
  lat=$(echo $location | jq -r '.latitude')
  lon=$(echo $location | jq -r '.longitude')

  # Geofence logic here

  sleep 600  # Log every 10 minutes
done
```

```bash
# SMS Auto-responder
#!/bin/bash
# ~/scripts/sms-responder.sh

LAST_CHECK=$(date +%s)

while true; do
  # Get recent SMS
  sms=$(termux-sms-list -t inbox -l 1)
  sms_time=$(echo $sms | jq -r '.[0].received')

  if [ $sms_time -gt $LAST_CHECK ]; then
    sender=$(echo $sms | jq -r '.[0].number')
    message=$(echo $sms | jq -r '.[0].body')

    # Check for keywords
    if echo "$message" | grep -qi "status"; then
      battery=$(termux-battery-status | jq -r '.percentage')
      response="Battery: $battery%. Auto-response from Termux."
      termux-sms-send -n "$sender" "$response"
    fi

    LAST_CHECK=$sms_time
  fi

  sleep 60
done
```

#### Cron Jobs (with Termux:Boot)

```bash
# Install cronie
pkg install cronie

# Start cron daemon (add to boot script)
crond

# Edit crontab
crontab -e

# Example crontab:
# Backup every day at 2 AM
0 2 * * * ~/scripts/daily-backup.sh

# Battery check every hour
0 * * * * ~/scripts/battery-monitor.sh

# Location log every 30 minutes
*/30 * * * * termux-location >> ~/location-history.json

# Sync files at 8 AM and 8 PM
0 8,20 * * * rsync -av ~/projects/ ~/storage/downloads/projects-sync/
```

---

### Termux Best Practices

#### Battery Optimization

```bash
# Use wake locks only when necessary
termux-wake-lock
# ... long-running task ...
termux-wake-unlock

# Optimize polling intervals
# Bad:
while true; do check_something; sleep 1; done

# Good:
while true; do check_something; sleep 300; done

# Use notifications instead of continuous display
# Minimize screen wake-ups
```

#### Storage Management

```bash
# Clean package cache regularly
pkg clean

# Remove orphaned packages
pkg autoremove

# Monitor storage usage
du -sh ~/.local/
du -sh ~/storage/

# Archive old logs
tar -czf logs-archive-$(date +%Y%m).tar.gz *.log
mv logs-archive-*.tar.gz ~/storage/downloads/
rm *.log
```

#### Security

```bash
# Set strong password
passwd

# Use SSH keys instead of passwords
ssh-keygen -t ed25519

# Restrict SSH access
# Edit ~/.ssh/authorized_keys with specific keys only

# Don't run untrusted scripts
# Always review before: curl url | sh

# Keep packages updated
pkg update && pkg upgrade

# Use HTTPS for sensitive operations
# Avoid public WiFi for SSH/git
```

#### Performance Tips

```bash
# Use compiled languages for intensive tasks
# Go, Rust > Python for performance

# Limit concurrent processes
# Mobile CPUs overheat easily

# Use efficient data structures
# Avoid processing large files in bash loops

# Profile scripts
time ./script.sh
# Optimize bottlenecks

# Cache API results
# Don't call termux-location every second
```

---

### Termux Troubleshooting

#### Common Issues

**Issue: Package installation fails**
```bash
# Update package lists
pkg update

# Clear cache
pkg clean

# Reinstall termux-keyring
pkg install termux-keyring

# Check storage space
df -h

# Check internet connectivity
ping -c 3 google.com
```

**Issue: Termux API not working**
```bash
# Install Termux:API app from same source as Termux
# F-Droid or GitHub, not Google Play

# Install API package
pkg install termux-api

# Check permissions
# Android Settings > Apps > Termux:API > Permissions

# Test API
termux-battery-status

# Reinstall if needed
pkg uninstall termux-api
pkg install termux-api
```

**Issue: Storage permission denied**
```bash
# Grant storage permission
# Android Settings > Apps > Termux > Permissions > Storage

# Run setup again
termux-setup-storage

# Check symlinks
ls -la ~/storage/

# If broken, remove and recreate
rm -rf ~/storage
termux-setup-storage
```

**Issue: SSH connection refused**
```bash
# Check if sshd is running
pgrep sshd

# Start SSH server
sshd

# Check port (default 8022)
netstat -tuln | grep 8022

# Get device IP
ip addr show wlan0 | grep inet

# Connect with correct port
ssh -p 8022 <device-ip>

# Check firewall (if using VPN)
# Disable VPN temporarily to test
```

**Issue: App crashes or freezes**
```bash
# Clear Termux data (WARNING: deletes everything)
# Android Settings > Apps > Termux > Storage > Clear data

# Backup first
cp -r ~/.bashrc ~/storage/downloads/
cp -r ~/projects ~/storage/downloads/

# Reinstall Termux
# Restore backups

# Check logs
logcat | grep termux
```

**Issue: Colors not displaying correctly**
```bash
# Set TERM variable
export TERM=xterm-256color
export COLORTERM=truecolor

# Add to ~/.bashrc
echo 'export TERM=xterm-256color' >> ~/.bashrc
echo 'export COLORTERM=truecolor' >> ~/.bashrc

# Test colors
curl -s https://gist.githubusercontent.com/lilydjwg/fdeaf79e921c2f413f44b6f613f6ad53/raw/94d8b2be62657e96488038b0e547e3009ed87d40/colors.py | python

# Try different Termux:Styling theme
```

**Issue: Slow performance**
```bash
# Check CPU usage
top

# Kill resource-heavy processes
pkill process-name

# Disable unnecessary startup scripts
# Review ~/.bashrc, remove heavy commands

# Clear tmp files
rm -rf /data/data/com.termux/files/usr/tmp/*

# Restart Termux
exit
# Swipe away from recents
# Reopen Termux
```

---

## Integration: tmux + Termux

### Running tmux in Termux

```bash
# Install tmux
pkg install tmux

# Start tmux
tmux new -s mobile-dev

# Mobile-optimized .tmux.conf
cat > ~/.tmux.conf << 'EOF'
# Mobile tmux configuration

# Enable mouse for touch
set -g mouse on

# Larger prefix timeout for thumb typing
set -g repeat-time 1500

# Larger status line for visibility
set -g status-position bottom
set -g status-style "bg=#0a0e14,fg=#00d9ff"
set -g status-left-length 50
set -g status-right-length 100

# Touch-friendly bindings
bind -n M-Left previous-window
bind -n M-Right next-window

# Easier split keys
bind | split-window -h -c "#{pane_current_path}"
bind - split-window -v -c "#{pane_current_path}"

# Vim-like pane navigation (works with extra keys)
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R
EOF

# Reload config
tmux source ~/.tmux.conf
```

### Mobile Development Workflow

```bash
# Create dev session
tmux new -s dev -n editor

# Split for server
tmux split-window -h -t dev:0

# Split for logs
tmux split-window -v -t dev:0.1

# Send commands
tmux send-keys -t dev:0.0 "vim project.go" Enter
tmux send-keys -t dev:0.1 "go run ." Enter
tmux send-keys -t dev:0.2 "tail -f app.log" Enter

# Detach when done
Ctrl+b d

# Reattach later
tmux attach -t dev
```

---

## Additional Resources

### Documentation

- tmux Manual: `man tmux`
- Termux Wiki: https://wiki.termux.com/
- tmux GitHub: https://github.com/tmux/tmux
- Termux GitHub: https://github.com/termux/termux-app

### Matt's Projects

- **tmuxplexer**: https://github.com/GGPrompts/tmuxplexer
  - Manage all tmux sessions from a TUI
  - Live preview with capture-pane
  - Send keys to any session

- **TFE (Terminal File Explorer)**
  - Touch-optimized file browser
  - Works great on Termux

- **ThumbCommand**
  - Mobile tmux dashboard
  - One-handed operation
  - Landscape mode optimized

### Community

- r/termux: Reddit community
- r/tmux: tmux subreddit
- #termux on Freenode IRC
- Termux Discord server

---

**Document Version**: 1.0
**Last Updated**: 2025-11-22
**Maintained By**: Matt

---

## Quick Command Cheatsheet

```bash
# === tmux ===
tmux new -s name              # New session
tmux attach -t name           # Attach
tmux ls                       # List sessions
Ctrl+b d                      # Detach
Ctrl+b %                      # Vertical split
Ctrl+b "                      # Horizontal split
Ctrl+b arrow                  # Navigate panes
Ctrl+b z                      # Zoom pane

# === Termux ===
termux-battery-status         # Battery info
termux-clipboard-set "text"   # Copy to clipboard
termux-clipboard-get          # Paste from clipboard
termux-notification -t "T" -c "C"  # Notify
termux-location               # GPS location
termux-camera-photo -c 0 out.jpg   # Take photo
termux-share file.txt         # Share file
termux-wifi-connectioninfo    # WiFi info
termux-toast "message"        # Quick popup
termux-setup-storage          # Access Android storage

# === Package Management ===
pkg update && pkg upgrade     # Update all
pkg install package           # Install
pkg uninstall package         # Remove
pkg search keyword            # Search
pkg list-installed            # List installed
```

---

Save this document and use `/docs/terminal-apis.md` as your comprehensive reference for tmux and Termux API development.
