# Browser Extension Development Guide

**Comprehensive documentation for Chrome Extensions, WebExtensions API, and TabzChrome**

---

## Table of Contents

1. [TabzChrome Extension](#tabzchrome-extension) ⭐
2. [Chrome Extension Quick Start](#chrome-extension-quick-start)
3. [Manifest V3 Overview](#manifest-v3-overview)
4. [Core Chrome APIs](#core-chrome-apis)
5. [Extension Architecture](#extension-architecture)
6. [WebExtensions API](#webextensions-api)
7. [Best Practices](#best-practices)
8. [Debugging & Development](#debugging--development)

---

## TabzChrome Extension ⭐

### Overview

**TabzChrome** is a Chrome extension that embeds fully functional xterm.js pseudo-terminal (PTY) sessions directly in your browser. Its standout feature is the ability to **right-click any highlighted text on any webpage and instantly send it to a terminal**.

**Why it's revolutionary:**
- Run commands from documentation without copy-pasting
- Test code snippets immediately from Stack Overflow, GitHub, or blogs
- Quick terminal access from any webpage
- Multiple terminal types supported
- Full xterm.js feature set (colors, cursor positioning, escape sequences)

**Repository:** [https://github.com/GGPrompts/TabzChrome](https://github.com/GGPrompts/TabzChrome)

---

### Key Features

#### 1. Right-Click Context Menu Integration
Highlight any text on a webpage → Right-click → "Send to Terminal" → Command executes instantly.

```javascript
// Example: How TabzChrome registers the context menu
chrome.contextMenus.create({
  id: "sendToTerminal",
  title: "Send to Terminal",
  contexts: ["selection"]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "sendToTerminal") {
    const selectedText = info.selectionText;
    // Send to active terminal via message passing
    chrome.runtime.sendMessage({
      action: "executeCommand",
      command: selectedText
    });
  }
});
```

#### 2. xterm.js Integration
TabzChrome uses [xterm.js](https://xtermjs.org/), the same terminal emulator powering VS Code, embedded directly in the Chrome extension popup/panel.

**Features:**
- Full ANSI color support
- Cursor positioning and control sequences
- Scrollback buffer
- Copy/paste support
- Customizable themes

#### 3. PTY (Pseudo-Terminal) Implementation
Unlike simple command runners, TabzChrome uses actual PTY sessions for authentic terminal behavior.

**How it works:**
- Background service worker spawns PTY processes
- Bidirectional communication between xterm.js frontend and PTY backend
- Handles stdin/stdout/stderr streams
- Supports interactive programs (vim, nano, htop)

---

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Extension Popup                      │
│  ┌───────────────────────────────────────────────────┐  │
│  │              xterm.js Terminal UI                  │  │
│  │  - Renders terminal output                         │  │
│  │  - Captures keyboard input                         │  │
│  │  - Handles ANSI escape sequences                   │  │
│  └────────────────┬──────────────────────────────────┘  │
└────────────────────┼────────────────────────────────────┘
                     │
                     │ chrome.runtime.sendMessage()
                     │
┌────────────────────▼────────────────────────────────────┐
│            Background Service Worker                     │
│  ┌───────────────────────────────────────────────────┐  │
│  │             Message Handler                        │  │
│  │  - Receives commands from popup                    │  │
│  │  - Receives commands from context menu             │  │
│  │  - Routes to appropriate PTY session               │  │
│  └────────────────┬──────────────────────────────────┘  │
│  ┌────────────────▼──────────────────────────────────┐  │
│  │             PTY Manager                            │  │
│  │  - Spawns pseudo-terminal processes                │  │
│  │  - Manages multiple terminal sessions              │  │
│  │  - Handles process lifecycle                       │  │
│  └────────────────┬──────────────────────────────────┘  │
└────────────────────┼────────────────────────────────────┘
                     │
                     │ OS System Call
                     │
┌────────────────────▼────────────────────────────────────┐
│                  Host System Shell                       │
│  - bash / zsh / fish / powershell                        │
│  - Executes actual commands                              │
│  - Returns output streams                                │
└──────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  Context Menu Flow                       │
│  ┌───────────────────────────────────────────────────┐  │
│  │  User highlights text on any webpage              │  │
│  │              ↓                                     │  │
│  │  Right-clicks selection                           │  │
│  │              ↓                                     │  │
│  │  Clicks "Send to Terminal"                        │  │
│  │              ↓                                     │  │
│  │  chrome.contextMenus.onClicked fires              │  │
│  │              ↓                                     │  │
│  │  Message sent to background worker                │  │
│  │              ↓                                     │  │
│  │  Background sends to active PTY session           │  │
│  │              ↓                                     │  │
│  │  Command executes, output sent to xterm.js        │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

### Message Passing Architecture

TabzChrome uses Chrome's message passing system for communication between components:

```javascript
// popup.js (xterm.js frontend)
function sendCommandToTerminal(command) {
  chrome.runtime.sendMessage({
    type: "EXECUTE_COMMAND",
    command: command,
    terminalId: activeTerminalId
  });
}

// Listen for output from background
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "TERMINAL_OUTPUT") {
    // Write to xterm.js terminal
    terminal.write(message.data);
  }
});
```

```javascript
// background.js (service worker)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "EXECUTE_COMMAND") {
    const ptySession = ptyManager.getSession(message.terminalId);
    ptySession.write(message.command + '\n');
  }
});

// When PTY outputs data
ptySession.on('data', (data) => {
  chrome.runtime.sendMessage({
    type: "TERMINAL_OUTPUT",
    terminalId: session.id,
    data: data
  });
});
```

---

### Use Cases

#### 1. Running Documentation Examples
**Before TabzChrome:**
```
1. Read command in docs
2. Copy to clipboard
3. Open terminal app
4. Paste command
5. Run command
```

**With TabzChrome:**
```
1. Highlight command
2. Right-click → "Send to Terminal"
3. ✓ Done
```

#### 2. Testing Stack Overflow Answers
Instantly test code snippets without leaving your browser:

```bash
# Highlight this on Stack Overflow
npm install express
node server.js

# Right-click → Send to Terminal → Runs immediately
```

#### 3. Quick System Commands
From any webpage:
```bash
git status
docker ps
kubectl get pods
npm test
```

#### 4. Interactive TUI Applications
TabzChrome's PTY support means you can run interactive applications:
```bash
vim config.yaml
htop
python3  # Interactive REPL
node     # Node REPL
```

---

### Installation

#### From Chrome Web Store
1. Visit Chrome Web Store (link TBD)
2. Click "Add to Chrome"
3. Grant necessary permissions
4. Click extension icon to open terminal

#### From Source (GitHub)
```bash
# Clone repository
git clone https://github.com/GGPrompts/TabzChrome.git
cd TabzChrome

# Install dependencies
npm install

# Build extension
npm run build

# Load in Chrome
# 1. Navigate to chrome://extensions/
# 2. Enable "Developer mode"
# 3. Click "Load unpacked"
# 4. Select the `dist` directory
```

---

### Technical Implementation Details

#### PTY Session Management
```javascript
class PTYManager {
  constructor() {
    this.sessions = new Map();
  }

  createSession(options = {}) {
    const pty = require('node-pty').spawn(
      options.shell || 'bash',
      [],
      {
        name: 'xterm-color',
        cols: options.cols || 80,
        rows: options.rows || 24,
        cwd: options.cwd || process.env.HOME,
        env: process.env
      }
    );

    const sessionId = this.generateId();
    this.sessions.set(sessionId, {
      id: sessionId,
      pty: pty,
      created: Date.now()
    });

    return sessionId;
  }

  write(sessionId, data) {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.pty.write(data);
    }
  }

  destroy(sessionId) {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.pty.kill();
      this.sessions.delete(sessionId);
    }
  }
}
```

#### xterm.js Initialization
```javascript
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';

function initializeTerminal() {
  const terminal = new Terminal({
    cursorBlink: true,
    fontSize: 14,
    fontFamily: 'JetBrains Mono, Consolas, monospace',
    theme: {
      background: '#1a1a1a',
      foreground: '#e0e0e0',
      cursor: '#00ff00',
      selection: 'rgba(255, 255, 255, 0.3)'
    }
  });

  const fitAddon = new FitAddon();
  terminal.loadAddon(fitAddon);
  terminal.loadAddon(new WebLinksAddon());

  terminal.open(document.getElementById('terminal-container'));
  fitAddon.fit();

  // Handle user input
  terminal.onData((data) => {
    sendCommandToTerminal(data);
  });

  return terminal;
}
```

#### Context Menu with Selection
```javascript
// manifest.json
{
  "permissions": [
    "contextMenus",
    "activeTab"
  ]
}

// background.js
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "tabzchrome-send-to-terminal",
    title: "Send '%s' to Terminal",
    contexts: ["selection"],
    documentUrlPatterns: ["<all_urls>"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "tabzchrome-send-to-terminal") {
    const command = info.selectionText;

    // Get or create terminal session
    const terminalId = getActiveTerminalId();

    // Send command
    ptyManager.write(terminalId, command + '\n');

    // Optional: Open popup to show output
    chrome.action.openPopup();
  }
});
```

---

### Configuration Options

TabzChrome supports multiple terminal types:

```javascript
const terminalProfiles = {
  bash: {
    shell: '/bin/bash',
    args: ['--login'],
    icon: '🐚'
  },
  zsh: {
    shell: '/bin/zsh',
    args: ['--login'],
    icon: '⚡'
  },
  fish: {
    shell: '/usr/bin/fish',
    args: [],
    icon: '🐟'
  },
  node: {
    shell: '/usr/bin/node',
    args: [],
    icon: '📗'
  },
  python: {
    shell: '/usr/bin/python3',
    args: [],
    icon: '🐍'
  }
};
```

---

### Security Considerations

**Important:** TabzChrome executes commands with full system access. Security measures include:

1. **User Confirmation**: Optionally prompt before executing commands from context menu
2. **Command Sanitization**: Strip dangerous characters from highlighted text
3. **Whitelist Mode**: Only allow commands matching predefined patterns
4. **Audit Logging**: Log all executed commands for review

```javascript
// Example: Command confirmation dialog
async function executeCommandSafely(command) {
  const confirmation = await chrome.windows.create({
    url: `confirm.html?command=${encodeURIComponent(command)}`,
    type: 'popup',
    width: 400,
    height: 200
  });

  // Wait for user confirmation...
}
```

---

## Chrome Extension Quick Start

### Creating Your First Extension

#### 1. Create Manifest File
Every Chrome extension starts with `manifest.json`:

```json
{
  "manifest_version": 3,
  "name": "My First Extension",
  "version": "1.0.0",
  "description": "A simple Chrome extension",
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  },
  "action": {
    "default_popup": "popup.html",
    "default_icon": "icons/icon48.png"
  },
  "permissions": [
    "storage",
    "activeTab"
  ]
}
```

#### 2. Create Popup HTML
`popup.html`:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      width: 300px;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    button {
      padding: 10px 20px;
      background: #4285f4;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1>Hello Extensions!</h1>
  <button id="clickMe">Click Me</button>
  <script src="popup.js"></script>
</body>
</html>
```

#### 3. Add Popup Logic
`popup.js`:
```javascript
document.getElementById('clickMe').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "sayHello"
    });
  });
});
```

#### 4. Load Extension
1. Navigate to `chrome://extensions/`
2. Enable "Developer mode" (top right)
3. Click "Load unpacked"
4. Select your extension directory
5. Click the extension icon in toolbar

---

## Manifest V3 Overview

Chrome is migrating from Manifest V2 to V3. Key changes:

### Major Differences

| Feature | Manifest V2 | Manifest V3 |
|---------|-------------|-------------|
| Background Scripts | Persistent background pages | Service workers (event-driven) |
| Content Security Policy | String format | Object format |
| Host Permissions | `permissions` | `host_permissions` |
| Web Accessible Resources | Array | Object with resources + matches |
| Remote Code | Allowed | **Blocked** |
| `executeScript` API | `chrome.tabs.executeScript()` | `chrome.scripting.executeScript()` |

### Service Workers vs Background Pages

**Manifest V2 (Background Page):**
```json
{
  "background": {
    "scripts": ["background.js"],
    "persistent": true
  }
}
```

**Manifest V3 (Service Worker):**
```json
{
  "background": {
    "service_worker": "background.js"
  }
}
```

**Key Differences:**
- Service workers are **event-driven** (wake up when needed, sleep otherwise)
- No access to DOM, `window`, or `document`
- No persistent state (use `chrome.storage` instead of global variables)
- Limited lifetime (5 minutes of inactivity → terminated)

### Migration Example

**Manifest V2:**
```javascript
// background.js (persistent)
let counter = 0;

chrome.browserAction.onClicked.addListener(() => {
  counter++;
  console.log(`Clicked ${counter} times`);
});
```

**Manifest V3:**
```javascript
// background.js (service worker)
// Global variables are reset each time worker restarts!

chrome.action.onClicked.addListener(async () => {
  // Use storage for persistence
  const { counter = 0 } = await chrome.storage.local.get('counter');
  const newCounter = counter + 1;
  await chrome.storage.local.set({ counter: newCounter });
  console.log(`Clicked ${newCounter} times`);
});
```

---

## Core Chrome APIs

### chrome.tabs

Interact with browser tabs.

#### Get Active Tab
```javascript
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const activeTab = tabs[0];
  console.log('Current tab:', activeTab.url);
});

// Or with promises (Manifest V3)
const [activeTab] = await chrome.tabs.query({
  active: true,
  currentWindow: true
});
```

#### Create New Tab
```javascript
chrome.tabs.create({
  url: 'https://example.com',
  active: true  // Focus on new tab
});
```

#### Update Tab
```javascript
// Navigate current tab
chrome.tabs.update(tabId, {
  url: 'https://newsite.com'
});

// Mute/unmute
chrome.tabs.update(tabId, { muted: true });
```

#### Listen for Tab Updates
```javascript
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    console.log('Tab finished loading:', tab.url);
  }
});
```

#### Execute Scripts in Tab (Manifest V3)
```javascript
// Manifest V3 uses chrome.scripting
chrome.scripting.executeScript({
  target: { tabId: tabId },
  function: () => {
    document.body.style.backgroundColor = 'red';
  }
});

// Or inject a file
chrome.scripting.executeScript({
  target: { tabId: tabId },
  files: ['content.js']
});
```

---

### chrome.runtime

Communication and extension lifecycle.

#### Message Passing (One-time)
```javascript
// popup.js → background.js
chrome.runtime.sendMessage({
  action: "getData",
  params: { id: 123 }
}, (response) => {
  console.log('Response:', response);
});

// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getData") {
    // Fetch data...
    sendResponse({ data: "Here's your data" });
  }
  return true; // Required for async sendResponse
});
```

#### Long-lived Connections
```javascript
// content.js
const port = chrome.runtime.connect({ name: "my-channel" });

port.postMessage({ type: "INIT" });

port.onMessage.addListener((message) => {
  console.log('Received:', message);
});

// background.js
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "my-channel") {
    port.onMessage.addListener((message) => {
      port.postMessage({ type: "RESPONSE", data: "Got it!" });
    });
  }
});
```

#### External Messaging (Website ↔ Extension)
```javascript
// On your website
const extensionId = "abcdefghijklmnopqrstuvwxyz";

chrome.runtime.sendMessage(extensionId, {
  type: "REQUEST_DATA"
}, (response) => {
  console.log(response);
});

// In extension (manifest.json)
{
  "externally_connectable": {
    "matches": ["https://example.com/*"]
  }
}

// background.js
chrome.runtime.onMessageExternal.addListener(
  (message, sender, sendResponse) => {
    if (sender.url.startsWith('https://example.com')) {
      sendResponse({ data: "Hello from extension!" });
    }
  }
);
```

---

### chrome.contextMenus

Add items to right-click menu.

#### Create Context Menu
```javascript
// background.js
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "myMenuItem",
    title: "Search for '%s'",
    contexts: ["selection"]  // Only show when text is selected
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "myMenuItem") {
    const searchUrl = `https://google.com/search?q=${encodeURIComponent(info.selectionText)}`;
    chrome.tabs.create({ url: searchUrl });
  }
});
```

#### Context Menu Options
```javascript
chrome.contextMenus.create({
  id: "parent-menu",
  title: "My Extension",
  contexts: ["page", "selection", "link", "image", "video", "audio"]
});

// Submenu
chrome.contextMenus.create({
  id: "child-1",
  parentId: "parent-menu",
  title: "Option 1",
  contexts: ["page"]
});

chrome.contextMenus.create({
  id: "child-2",
  parentId: "parent-menu",
  title: "Option 2",
  contexts: ["page"]
});
```

#### Available Contexts
- `page` - Right-click on page (not on specific element)
- `selection` - Text is selected
- `link` - Right-click on link
- `image` - Right-click on image
- `video` - Right-click on video
- `audio` - Right-click on audio
- `frame` - Right-click in iframe
- `editable` - Right-click in input/textarea

---

### chrome.storage

Persistent storage (synced across devices with `storage.sync`).

#### Store Data
```javascript
// Local storage (not synced)
await chrome.storage.local.set({ key: 'value' });

// Sync storage (synced across user's Chrome browsers)
await chrome.storage.sync.set({
  theme: 'dark',
  fontSize: 14,
  settings: { notifications: true }
});
```

#### Retrieve Data
```javascript
// Get specific keys
const { theme, fontSize } = await chrome.storage.sync.get(['theme', 'fontSize']);

// Get all data
const allData = await chrome.storage.sync.get(null);

// Get with defaults
const { theme = 'light' } = await chrome.storage.sync.get({
  theme: 'light'  // Default value if not set
});
```

#### Remove Data
```javascript
await chrome.storage.sync.remove('theme');
await chrome.storage.sync.remove(['theme', 'fontSize']);

// Clear all
await chrome.storage.sync.clear();
```

#### Listen for Changes
```javascript
chrome.storage.onChanged.addListener((changes, areaName) => {
  // areaName: 'sync' or 'local'

  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(`Storage key "${key}" changed from ${oldValue} to ${newValue}`);
  }
});
```

#### Storage Limits
- `storage.local`: 10 MB (can request "unlimitedStorage" permission for more)
- `storage.sync`: 100 KB total, 8 KB per item, 512 items max
- `storage.session`: 10 MB (Manifest V3, cleared when session ends)

---

### chrome.scripting

Inject scripts and CSS into tabs (Manifest V3).

#### Execute JavaScript
```javascript
// Execute function
const results = await chrome.scripting.executeScript({
  target: { tabId: tabId },
  function: () => {
    return document.title;
  }
});
console.log('Page title:', results[0].result);

// Execute with arguments
await chrome.scripting.executeScript({
  target: { tabId: tabId },
  function: (color) => {
    document.body.style.backgroundColor = color;
  },
  args: ['blue']
});

// Execute file
await chrome.scripting.executeScript({
  target: { tabId: tabId },
  files: ['content-script.js']
});

// Execute in all frames
await chrome.scripting.executeScript({
  target: {
    tabId: tabId,
    allFrames: true
  },
  function: () => console.log('Running in frame:', window.location.href)
});
```

#### Inject CSS
```javascript
// Inject CSS file
await chrome.scripting.insertCSS({
  target: { tabId: tabId },
  files: ['styles.css']
});

// Inject CSS string
await chrome.scripting.insertCSS({
  target: { tabId: tabId },
  css: 'body { background: red; }'
});

// Remove CSS
await chrome.scripting.removeCSS({
  target: { tabId: tabId },
  files: ['styles.css']
});
```

#### Register Content Scripts
```javascript
// Dynamically register content scripts (Manifest V3)
await chrome.scripting.registerContentScripts([{
  id: "my-script",
  matches: ["https://example.com/*"],
  js: ["content.js"],
  css: ["content.css"],
  runAt: "document_idle"
}]);

// Unregister
await chrome.scripting.unregisterContentScripts({
  ids: ["my-script"]
});

// Get registered scripts
const scripts = await chrome.scripting.getRegisteredContentScripts();
```

---

## Extension Architecture

### Component Types

#### 1. Manifest File
- **Purpose:** Extension metadata and configuration
- **File:** `manifest.json`
- **Required:** Yes
- **Access:** N/A

#### 2. Background Service Worker (Manifest V3)
- **Purpose:** Event handling, coordination, business logic
- **File:** `background.js`
- **Lifecycle:** Event-driven (wakes/sleeps)
- **Access:** Full Chrome APIs, no DOM
- **Use cases:** Listen for events, coordinate components, maintain state

```javascript
// background.js
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => alert('Hello from extension!')
  });
});
```

#### 3. Content Scripts
- **Purpose:** Interact with web pages
- **Files:** Declared in manifest or injected dynamically
- **Lifecycle:** Runs in page context
- **Access:** DOM, limited Chrome APIs, message passing
- **Isolation:** Separate JavaScript context from page

```javascript
// content.js
console.log('Content script running on:', window.location.href);

// Access DOM
const title = document.title;

// Communicate with background
chrome.runtime.sendMessage({
  action: 'pageTitle',
  title: title
});

// Listen for messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'highlightLinks') {
    document.querySelectorAll('a').forEach(link => {
      link.style.background = 'yellow';
    });
  }
});
```

**Manifest declaration:**
```json
{
  "content_scripts": [{
    "matches": ["https://example.com/*"],
    "js": ["content.js"],
    "css": ["content.css"],
    "run_at": "document_idle"
  }]
}
```

#### 4. Popup Page
- **Purpose:** UI when clicking extension icon
- **Files:** `popup.html`, `popup.js`, `popup.css`
- **Lifecycle:** Opens when icon clicked, closes when focus lost
- **Access:** Full Chrome APIs, no DOM of current page

```html
<!-- popup.html -->
<!DOCTYPE html>
<html>
<head>
  <style>
    body { width: 300px; padding: 10px; }
    button { width: 100%; padding: 10px; }
  </style>
</head>
<body>
  <h2>My Extension</h2>
  <button id="action-btn">Do Something</button>
  <script src="popup.js"></script>
</body>
</html>
```

```javascript
// popup.js
document.getElementById('action-btn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      alert('Button clicked!');
    }
  });
});
```

#### 5. Options Page
- **Purpose:** Extension settings/configuration
- **Files:** `options.html`, `options.js`
- **Access:** Full Chrome APIs

```json
{
  "options_page": "options.html",
  // Or for embedded options
  "options_ui": {
    "page": "options.html",
    "open_in_tab": false
  }
}
```

```html
<!-- options.html -->
<!DOCTYPE html>
<html>
<body>
  <label>
    Theme:
    <select id="theme">
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </label>
  <button id="save">Save</button>
  <script src="options.js"></script>
</body>
</html>
```

```javascript
// options.js
document.getElementById('save').addEventListener('click', async () => {
  const theme = document.getElementById('theme').value;
  await chrome.storage.sync.set({ theme });
  alert('Settings saved!');
});

// Load saved settings
chrome.storage.sync.get('theme', ({ theme = 'light' }) => {
  document.getElementById('theme').value = theme;
});
```

#### 6. Sidebar / Side Panel (Manifest V3)
- **Purpose:** Persistent side panel UI
- **Availability:** Chrome 114+

```json
{
  "side_panel": {
    "default_path": "sidepanel.html"
  },
  "permissions": ["sidePanel"]
}
```

```javascript
// Open side panel programmatically
chrome.sidePanel.open({ tabId: tabId });
```

---

### Communication Patterns

#### Pattern 1: Popup ↔ Background
```javascript
// popup.js
const response = await chrome.runtime.sendMessage({
  action: 'fetchData',
  url: 'https://api.example.com/data'
});

// background.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'fetchData') {
    fetch(message.url)
      .then(r => r.json())
      .then(data => sendResponse({ data }));
    return true; // Async response
  }
});
```

#### Pattern 2: Background ↔ Content Script
```javascript
// background.js
const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
chrome.tabs.sendMessage(tab.id, {
  action: 'changeColor',
  color: 'blue'
});

// content.js
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'changeColor') {
    document.body.style.backgroundColor = message.color;
  }
});
```

#### Pattern 3: Content Script ↔ Background
```javascript
// content.js
const links = Array.from(document.querySelectorAll('a'))
  .map(a => a.href);

chrome.runtime.sendMessage({
  action: 'foundLinks',
  links: links
});

// background.js
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'foundLinks') {
    console.log('Links found:', message.links);
  }
});
```

#### Pattern 4: Content Script ↔ Web Page
Content scripts run in isolated world, but can communicate with page:

```javascript
// content.js → page
window.postMessage({
  type: 'FROM_EXTENSION',
  data: 'Hello from extension'
}, '*');

// page → content.js
window.addEventListener('message', (event) => {
  if (event.source !== window) return;
  if (event.data.type === 'FROM_PAGE') {
    console.log('Message from page:', event.data.text);
  }
});
```

---

## WebExtensions API

### Cross-Browser Compatibility

WebExtensions is a standardized API supported by:
- Chrome/Edge (Chromium)
- Firefox
- Safari (partial)
- Opera

#### Key Differences

| Feature | Chrome | Firefox | Safari |
|---------|--------|---------|--------|
| Namespace | `chrome.*` | `browser.*` (also supports `chrome.*`) | `browser.*` |
| Promises | Some APIs | All APIs return promises | Some APIs |
| Manifest | V3 (V2 deprecated) | V2 & V3 | V2 & V3 (limited) |
| Service Workers | Required (MV3) | Optional (can use background pages) | Limited |

#### Using Both Namespaces
```javascript
// Works in all browsers
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

browserAPI.storage.local.get('key').then(result => {
  console.log(result);
});
```

#### Polyfill for Chrome
```javascript
// webextension-polyfill (by Mozilla)
// Adds Promises to Chrome APIs

import browser from 'webextension-polyfill';

// Now works with promises in Chrome
const tabs = await browser.tabs.query({ active: true });
```

Install:
```bash
npm install webextension-polyfill
```

---

### Cross-Browser Manifest

```json
{
  "manifest_version": 3,
  "name": "Cross-Browser Extension",
  "version": "1.0.0",

  "background": {
    "service_worker": "background.js",
    "type": "module"
  },

  "browser_specific_settings": {
    "gecko": {
      "id": "addon@example.com",
      "strict_min_version": "109.0"
    }
  },

  "permissions": [
    "storage",
    "tabs"
  ],

  "host_permissions": [
    "https://example.com/*"
  ]
}
```

---

### Firefox-Specific Features

#### Background Scripts (Still Supported)
```json
{
  "background": {
    "scripts": ["background.js"]
  }
}
```

#### Browser Actions (MV2)
```json
{
  "browser_action": {
    "default_popup": "popup.html",
    "default_icon": "icon.png"
  }
}
```

#### Native Messaging
Firefox has better support for native messaging (communicating with native apps).

```json
{
  "permissions": ["nativeMessaging"]
}
```

```javascript
// Connect to native app
const port = browser.runtime.connectNative("my_native_app");

port.onMessage.addListener((message) => {
  console.log("Received from native app:", message);
});

port.postMessage({ command: "ping" });
```

---

## Best Practices

### Security

#### 1. Content Security Policy
Manifest V3 enforces strict CSP by default.

```json
{
  "content_security_policy": {
    "extension_pages": "script-src 'self'; object-src 'self'"
  }
}
```

**Rules:**
- No inline scripts (`<script>alert('xss')</script>`)
- No `eval()` or `new Function()`
- No remote code execution
- All scripts must be bundled with extension

#### 2. Minimize Permissions
Only request permissions you actually need.

```json
{
  "permissions": [
    "storage"  // Only this, not "tabs", "history", etc.
  ],
  "host_permissions": [
    "https://api.example.com/*"  // Specific domain, not "<all_urls>"
  ]
}
```

#### 3. Validate Input
Always sanitize user input and messages from content scripts.

```javascript
chrome.runtime.onMessage.addListener((message) => {
  // Bad: Direct use of untrusted data
  document.body.innerHTML = message.html; // XSS vulnerability!

  // Good: Sanitize or use safe methods
  const div = document.createElement('div');
  div.textContent = message.text;
  document.body.appendChild(div);
});
```

#### 4. HTTPS Only
Request host permissions for HTTPS domains only (when possible).

```json
{
  "host_permissions": [
    "https://example.com/*"  // Not "http://"
  ]
}
```

---

### Performance

#### 1. Lazy Load Content Scripts
```json
{
  "content_scripts": [{
    "matches": ["https://example.com/*"],
    "js": ["content.js"],
    "run_at": "document_idle"  // Wait until page is loaded
  }]
}
```

#### 2. Use Event Pages (Service Workers)
Manifest V3 service workers sleep when inactive, saving memory.

```javascript
// Bad: Keeping service worker alive artificially
setInterval(() => {
  console.log('Still alive');
}, 1000);

// Good: Wake up only when needed
chrome.alarms.create('myAlarm', { periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener((alarm) => {
  console.log('Alarm triggered:', alarm.name);
});
```

#### 3. Debounce Expensive Operations
```javascript
let debounceTimer;
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    // Expensive operation
    analyzeTab(tabId);
  }, 300);
});
```

#### 4. Cache Data
```javascript
// Cache frequently accessed data
let cache = null;
let cacheTime = 0;

async function getData() {
  const now = Date.now();
  if (cache && now - cacheTime < 60000) {
    return cache; // Return cached data if < 1 minute old
  }

  cache = await fetchDataFromAPI();
  cacheTime = now;
  return cache;
}
```

---

### Code Organization

#### Project Structure
```
my-extension/
├── manifest.json
├── background/
│   └── service-worker.js
├── content/
│   ├── content-script.js
│   └── content-styles.css
├── popup/
│   ├── popup.html
│   ├── popup.js
│   └── popup.css
├── options/
│   ├── options.html
│   └── options.js
├── lib/
│   ├── utils.js
│   └── api-client.js
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── _locales/
    ├── en/
    │   └── messages.json
    └── es/
        └── messages.json
```

#### Shared Code
```javascript
// lib/utils.js
export function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

// background/service-worker.js
import { formatDate } from '../lib/utils.js';

// popup/popup.js
import { formatDate } from '../lib/utils.js';
```

**Manifest (enable modules):**
```json
{
  "background": {
    "service_worker": "background/service-worker.js",
    "type": "module"
  }
}
```

---

### Error Handling

#### 1. Try-Catch Async Operations
```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return null;
  }
}
```

#### 2. Check for API Errors
```javascript
chrome.tabs.query({ active: true }, (tabs) => {
  if (chrome.runtime.lastError) {
    console.error('Error:', chrome.runtime.lastError.message);
    return;
  }
  console.log('Active tab:', tabs[0]);
});

// Or with promises
try {
  const tabs = await chrome.tabs.query({ active: true });
} catch (error) {
  console.error('Error:', error);
}
```

#### 3. Global Error Handler
```javascript
// background.js
self.addEventListener('error', (event) => {
  console.error('Uncaught error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});
```

---

## Debugging & Development

### Chrome DevTools

#### 1. Inspect Popup
- Right-click extension icon
- Select "Inspect popup"
- DevTools opens for popup.html

#### 2. Inspect Background Service Worker
- Navigate to `chrome://extensions/`
- Find your extension
- Click "Inspect views: service worker"

#### 3. Inspect Content Scripts
- Open DevTools on the web page
- Content script logs appear in page console
- Content scripts visible in "Sources" tab under "Content scripts"

#### 4. View All Extension Pages
Navigate to `chrome://extensions/` → Click "Inspect views" for each active view.

---

### Logging & Debugging

#### Console Logging
```javascript
// Different log levels
console.log('Info message');
console.warn('Warning message');
console.error('Error message');
console.debug('Debug message');

// Grouped logs
console.group('My Group');
console.log('Message 1');
console.log('Message 2');
console.groupEnd();

// Tables
console.table([
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 }
]);
```

#### Debugging Async Code
```javascript
// Use debugger statement
chrome.runtime.onMessage.addListener(async (message) => {
  debugger; // Pauses execution if DevTools open
  const result = await processMessage(message);
  return result;
});
```

---

### Testing

#### Manual Testing Checklist
- [ ] Test in incognito mode
- [ ] Test with different permissions
- [ ] Test on different websites
- [ ] Test with slow network (DevTools → Network → Throttling)
- [ ] Test service worker lifecycle (stop/start in `chrome://extensions/`)
- [ ] Test with multiple tabs open
- [ ] Test uninstall/reinstall

#### Automated Testing
```javascript
// Example with Jest
import { chrome } from 'jest-chrome';

describe('Background Service Worker', () => {
  beforeEach(() => {
    chrome.runtime.onMessage.clearListeners();
  });

  test('responds to messages', (done) => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      expect(message.action).toBe('test');
      sendResponse({ success: true });
      done();
    });

    chrome.runtime.sendMessage({ action: 'test' });
  });
});
```

---

### Common Issues

#### 1. Service Worker Not Waking Up
**Problem:** Service worker doesn't respond to events.

**Solution:** Check for errors in service worker console.
```javascript
// Ensure listeners are registered synchronously
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Handle message
  return true; // Required for async responses
});
```

#### 2. Content Script Not Injecting
**Problem:** Content script doesn't run on page.

**Troubleshooting:**
- Check `matches` pattern in manifest
- Verify host permissions granted
- Check if site blocks extension
- Try different `run_at` timing

```json
{
  "content_scripts": [{
    "matches": ["https://example.com/*"],  // Check this pattern
    "js": ["content.js"],
    "run_at": "document_end"  // Try "document_start" or "document_idle"
  }]
}
```

#### 3. CORS Errors
**Problem:** Fetch fails with CORS error.

**Solution:** Use host permissions + background script.
```json
{
  "host_permissions": ["https://api.example.com/*"]
}
```

```javascript
// background.js (no CORS restrictions)
fetch('https://api.example.com/data')
  .then(r => r.json())
  .then(data => console.log(data));
```

#### 4. Storage Not Syncing
**Problem:** `chrome.storage.sync` data doesn't sync.

**Troubleshooting:**
- Check user is signed into Chrome
- Verify sync is enabled in Chrome settings
- Check storage quota (100 KB limit)
- Use `chrome.storage.local` for larger data

```javascript
// Check quota
chrome.storage.sync.getBytesInUse(null, (bytes) => {
  console.log('Storage used:', bytes, 'bytes');
});
```

---

## Advanced Patterns

### Dynamic Content Script Injection

```javascript
// Inject script only when needed (not declared in manifest)
async function injectScriptWhenNeeded(tabId) {
  // Check if already injected
  const results = await chrome.scripting.executeScript({
    target: { tabId },
    function: () => window.myExtensionInjected
  });

  if (!results[0].result) {
    // Not injected yet, inject now
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ['content.js']
    });

    // Mark as injected
    await chrome.scripting.executeScript({
      target: { tabId },
      function: () => { window.myExtensionInjected = true; }
    });
  }
}
```

---

### Context Menu with Icons

```javascript
chrome.contextMenus.create({
  id: "action-1",
  title: "⚡ Quick Action",
  contexts: ["page"],
  icons: {
    "16": "icons/action16.png",
    "32": "icons/action32.png"
  }
});
```

---

### Offscreen Documents (Manifest V3)

Use for audio playback, DOM parsing, etc. in service worker context.

```json
{
  "permissions": ["offscreen"]
}
```

```javascript
// background.js
async function createOffscreenDocument() {
  await chrome.offscreen.createDocument({
    url: 'offscreen.html',
    reasons: ['AUDIO_PLAYBACK'],
    justification: 'Play notification sounds'
  });
}

// Send message to offscreen document
chrome.runtime.sendMessage({
  target: 'offscreen',
  action: 'playSound'
});
```

```javascript
// offscreen.js
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'playSound') {
    const audio = new Audio('notification.mp3');
    audio.play();
  }
});
```

---

### Declarative Net Request (MV3)

Block/modify network requests without content scripts.

```json
{
  "permissions": ["declarativeNetRequest"],
  "declarative_net_request": {
    "rule_resources": [{
      "id": "ruleset_1",
      "enabled": true,
      "path": "rules.json"
    }]
  }
}
```

```json
// rules.json
[
  {
    "id": 1,
    "priority": 1,
    "action": { "type": "block" },
    "condition": {
      "urlFilter": "ads.example.com",
      "resourceTypes": ["script", "image"]
    }
  }
]
```

---

## Resources

### Official Documentation
- [Chrome Extensions Documentation](https://developer.chrome.com/docs/extensions/)
- [Chrome Extension API Reference](https://developer.chrome.com/docs/extensions/reference/)
- [Firefox WebExtensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- [Safari Web Extensions](https://developer.apple.com/documentation/safariservices/safari_web_extensions)

### Tools & Libraries
- [webextension-polyfill](https://github.com/mozilla/webextension-polyfill) - Cross-browser compatibility
- [xterm.js](https://xtermjs.org/) - Terminal emulator (used by TabzChrome)
- [node-pty](https://github.com/microsoft/node-pty) - PTY bindings for Node.js
- [Plasmo](https://www.plasmo.com/) - Extension framework with HMR
- [WXT](https://wxt.dev/) - Next-gen extension framework

### Example Extensions
- [TabzChrome](https://github.com/GGPrompts/TabzChrome) - Terminal in browser
- [React DevTools](https://github.com/facebook/react/tree/main/packages/react-devtools-extensions) - Inspect React components
- [Refined GitHub](https://github.com/refined-github/refined-github) - GitHub enhancements
- [uBlock Origin](https://github.com/gorhill/uBlock) - Ad blocker

### Learning Resources
- [Chrome Extension Samples](https://github.com/GoogleChrome/chrome-extensions-samples)
- [MDN Web Extensions Guide](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- [Extension Workshop](https://extensionworkshop.com/) - Firefox extensions

---

## Appendix: TabzChrome Implementation Reference

### Complete Manifest Example
```json
{
  "manifest_version": 3,
  "name": "TabzChrome",
  "version": "1.0.0",
  "description": "Run xterm.js terminals with PTY support in Chrome",

  "permissions": [
    "contextMenus",
    "storage",
    "activeTab"
  ],

  "background": {
    "service_worker": "background.js",
    "type": "module"
  },

  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },

  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  }
}
```

### PTY Manager (Simplified)
```javascript
// pty-manager.js
import * as pty from 'node-pty';

class PTYManager {
  constructor() {
    this.sessions = new Map();
  }

  create(options = {}) {
    const id = this.generateId();

    const ptyProcess = pty.spawn(
      options.shell || '/bin/bash',
      [],
      {
        name: 'xterm-256color',
        cols: options.cols || 80,
        rows: options.rows || 24,
        cwd: options.cwd || process.env.HOME,
        env: process.env
      }
    );

    const session = {
      id,
      pty: ptyProcess,
      created: Date.now()
    };

    this.sessions.set(id, session);

    // Forward output to extension
    ptyProcess.onData((data) => {
      this.emit('data', { sessionId: id, data });
    });

    ptyProcess.onExit(({ exitCode, signal }) => {
      this.emit('exit', { sessionId: id, exitCode, signal });
      this.sessions.delete(id);
    });

    return id;
  }

  write(sessionId, data) {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.pty.write(data);
    }
  }

  resize(sessionId, cols, rows) {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.pty.resize(cols, rows);
    }
  }

  kill(sessionId) {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.pty.kill();
      this.sessions.delete(sessionId);
    }
  }

  generateId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  emit(event, data) {
    // Send to extension popup
    chrome.runtime.sendMessage({
      type: `PTY_${event.toUpperCase()}`,
      ...data
    });
  }
}

export default new PTYManager();
```

---

**End of Browser Extension Development Guide**

This documentation covers Chrome Extensions, WebExtensions API, and the TabzChrome extension architecture. For more information, visit the official Chrome Extensions documentation or explore the TabzChrome GitHub repository.
