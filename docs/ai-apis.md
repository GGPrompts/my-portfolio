# AI Assistant Tools & APIs Reference

> **Developer's Note**: This documentation covers the AI tools that powered the development of 45+ projects in 6 months. Claude Code is the primary tool used for all development work.

---

## Table of Contents

1. [Claude Code](#claude-code) - Primary Development Tool
2. [OpenAI Codex](#openai-codex)
3. [OpenCode](#opencode)
4. [Google Gemini](#google-gemini)
5. [AIChat](#aichat)
6. [Comparison Matrix](#comparison-matrix)

---

## Claude Code

**PRIMARY DEVELOPMENT TOOL** - Used to build this portfolio and 45+ other projects.

### Overview

Claude Code is Anthropic's official CLI tool that brings Claude AI directly into your development workflow. Unlike traditional AI assistants, Claude Code:

- **Reads and writes files** directly in your codebase
- **Executes commands** (git, npm, docker, etc.)
- **Searches across files** with Grep and Glob tools
- **Manages tasks** with structured todo lists
- **Integrates with external tools** via MCP (Model Context Protocol)
- **Uses custom skills** for specialized workflows
- **Supports hooks** for project-specific setup

**What makes it special**: Claude Code isn't just a chatbot—it's a development partner that can autonomously implement features, fix bugs, refactor code, and manage entire workflows.

### Key Stats

- **45+ projects built** in 6 months using Claude Code
- **Full-stack development**: Frontend, backend, CLI tools, TUI apps
- **Languages**: TypeScript, JavaScript, Go, Python, Rust, Bash
- **Frameworks**: Next.js, React, Node.js, Bubbletea/Lipgloss (Go TUIs)

### Installation and Setup

#### Prerequisites
- Node.js 18+ or standalone binary
- Git (for repository management)
- Terminal with good Unicode support (for TUI projects)

#### Installation

```bash
# Via npm (recommended)
npm install -g @anthropic-ai/claude-code

# Or download standalone binary
# macOS/Linux: https://anthropic.com/claude-code

# Verify installation
claude --version
```

#### Authentication

```bash
# Start Claude Code
claude

# On first run, you'll be prompted to authenticate
# Follow the link to get your API key from console.anthropic.com

# Or set environment variable
export ANTHROPIC_API_KEY=your_key_here
```

#### Configuration

Create `~/.claude/config.json` for global settings:

```json
{
  "model": "claude-sonnet-4-5-20250929",
  "editor": "code",
  "mcp_servers": {
    "filesystem": {
      "enabled": true
    }
  }
}
```

### Key Features

#### 1. MCP Servers (Model Context Protocol)

MCP servers extend Claude Code's capabilities by connecting to external tools and data sources.

**Built-in MCP Servers:**
- **Filesystem**: Read/write files, search directories
- **Git**: Repository operations, diffs, commits
- **SQLite**: Database queries and management
- **Puppeteer**: Browser automation
- **GitHub**: Issues, PRs, releases

**Setup Example (shadcn/ui MCP):**

```json
// .claude/mcp.json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-shadcn"]
    }
  }
}
```

**Using MCP in prompts:**

```
"Add a card component from shadcn/ui"
```

Claude Code will automatically use the MCP server to fetch component code and install it.

#### 2. Skills

Skills are specialized knowledge modules stored in `.claude/skills/` that guide Claude on specific tasks.

**Available Skills:**

```bash
# Next.js development
.claude/skills/nextjs/SKILL.md

# Canvas design (visual art)
.claude/skills/canvas-design/SKILL.md

# Gemini image generation
.claude/skills/gemini-image-gen/SKILL.md

# shadcn/ui components
.claude/skills/shadcn-ui/SKILL.md
```

**Creating a Custom Skill:**

```markdown
<!-- .claude/skills/api-testing/SKILL.md -->
# API Testing Skill

## Purpose
Guide Claude on writing comprehensive API tests using Jest and Supertest.

## When to Use
- Writing integration tests for REST APIs
- Testing authentication flows
- Validating error handling

## Patterns

### Test Structure
\`\`\`typescript
describe('POST /api/users', () => {
  it('creates a user with valid data', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'John', email: 'john@example.com' })
      .expect(201);

    expect(response.body).toHaveProperty('id');
  });
});
\`\`\`

### Authentication Tests
\`\`\`typescript
it('requires authentication', async () => {
  await request(app)
    .get('/api/protected')
    .expect(401);
});
\`\`\`

## Best Practices
1. Test happy path first
2. Cover error cases (400, 401, 404, 500)
3. Use beforeEach/afterEach for setup/teardown
4. Mock external services
5. Use factories for test data
```

**Invoking Skills:**

```
"Use the api-testing skill to write tests for the user endpoint"
```

#### 3. Slash Commands

Custom shortcuts for repetitive tasks, defined in `.claude/commands/`.

**Setup:**

```bash
# Create a command
mkdir -p .claude/commands
cat > .claude/commands/review-pr.md << 'EOF'
Review the pull request #{{1}}:

1. Check out the PR branch
2. Run the test suite
3. Review code changes for:
   - Code quality and patterns
   - Potential bugs
   - Security issues
   - Performance concerns
4. Provide detailed feedback
EOF
```

**Usage:**

```
/review-pr 123
```

**Common Commands:**

```bash
/test              # Run test suite
/build             # Build the project
/deploy            # Deploy to production
/docs              # Generate documentation
/refactor [file]   # Refactor specific file
```

#### 4. Hooks

Hooks run automatically at specific times (session start, pre-commit, etc.).

**SessionStart Hook:**

```bash
# .claude/hooks/SessionStart.sh
#!/bin/bash

echo "Starting development session..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  npm install
fi

# Start dev server in background
npm run dev &

# Run type checking
npm run type-check

echo "Ready to code!"
```

**Make it executable:**

```bash
chmod +x .claude/hooks/SessionStart.sh
```

**Pre-commit Hook:**

```bash
# .claude/hooks/pre-commit.sh
#!/bin/bash

# Run linter
npm run lint

# Run tests
npm run test

# Format code
npm run format
```

### Quick Start

#### First Session

```bash
# Start Claude Code
claude

# Or start in a specific directory
claude /path/to/project
```

**Initial prompt:**

```
I'm building a Next.js 15 portfolio website.
Set up the project with TypeScript, Tailwind CSS, and Framer Motion.
Use the App Router and configure a glassmorphism design system.
```

Claude Code will:
1. Initialize Next.js project
2. Install dependencies
3. Configure Tailwind and Framer Motion
4. Create basic file structure
5. Set up design tokens

#### Typical Workflow

**1. Feature Development:**

```
Create a glassmorphic project card component with:
- Image thumbnail using next/image
- Title and description
- Technology badges
- 3D hover effect with Framer Motion
- Link to live demo and GitHub

Save it to components/ProjectCard.tsx
```

**2. Bug Fixing:**

```
There's a hydration error in the Hero component.
Debug and fix it.
```

**3. Refactoring:**

```
Refactor the About component to use Server Components.
Move client-side interactivity to a separate Client Component.
```

**4. Testing:**

```
Write comprehensive tests for the ProjectCard component.
Cover rendering, hover effects, and link clicks.
```

**5. Git Operations:**

```
Review my changes and create a commit with a descriptive message.
```

### Common Patterns

#### Building a Feature (Full Stack)

```
Build a contact form with:
1. Form component with name, email, message fields
2. Client-side validation with Zod
3. API route to send email via SendGrid
4. Success/error toast notifications
5. Loading states

Use shadcn/ui for form components.
```

**What Claude Code does:**
1. Creates form component with validation
2. Sets up API route with error handling
3. Installs necessary dependencies (zod, react-hook-form, @sendgrid/mail)
4. Adds toast notifications
5. Implements loading states
6. Tests the implementation

#### Debugging Across Files

```
The app crashes when I click the project card.
Find and fix the issue.
```

**What Claude Code does:**
1. Searches for error in logs
2. Reads relevant component files
3. Identifies the bug (e.g., undefined property access)
4. Fixes the issue
5. Explains what was wrong

#### Multi-File Refactoring

```
Extract all glassmorphism styles into a centralized theme system.
Update all components to use the new system.
```

**What Claude Code does:**
1. Searches for all `.glass` usage across files
2. Creates a theme configuration file
3. Updates all components systematically
4. Ensures consistency across the codebase

#### Complete Workflow: Feature to Deployment

```
1. Create a blog section with MDX support
2. Add syntax highlighting for code blocks
3. Create 3 sample blog posts
4. Add pagination
5. Commit the changes
6. Deploy to Vercel
```

**What Claude Code does:**
1. Installs MDX dependencies
2. Configures Next.js for MDX
3. Creates blog layout and post pages
4. Adds syntax highlighting (Shiki)
5. Writes sample MDX posts
6. Implements pagination component
7. Commits with descriptive message
8. Deploys via Vercel CLI

### Best Practices

#### Prompting Strategies

**1. Be Specific, Not Prescriptive**

❌ Bad:
```
"Add a button with onClick that does a console.log in the Hero component on line 42"
```

✅ Good:
```
"Add a CTA button to the Hero component that logs user interaction.
Use the glassmorphic style from our design system."
```

**2. Provide Context, Not Steps**

❌ Bad:
```
"1. Open Hero.tsx
2. Find line 42
3. Add import statement
4. Add button JSX
5. Add onClick handler"
```

✅ Good:
```
"The Hero component needs a CTA button that tracks when users click it.
Use our analytics utility and maintain the glassmorphic aesthetic."
```

**3. Trust the Tools**

Claude Code has access to:
- All files in your project (Read, Write, Edit)
- Git history and diffs
- File search (Grep, Glob)
- Command execution (Bash)
- Package managers (npm, yarn, pnpm)

You don't need to tell it HOW to do things, just WHAT you want.

❌ Bad:
```
"Use the Read tool to read Hero.tsx, then use the Edit tool to modify it"
```

✅ Good:
```
"Update the Hero component to include a subtitle"
```

#### Task Management

**Use Todo Lists for Complex Work:**

```
Create a complete authentication system:
- Sign up/login forms with validation
- JWT token management
- Protected API routes
- User session handling
- Password reset flow
```

Claude Code will:
1. Create a todo list automatically
2. Work through each task systematically
3. Mark tasks complete as it goes
4. Handle errors and blockers

**Don't Micromanage:**

Let Claude Code manage its own workflow. It will:
- Read files as needed
- Search for patterns
- Test changes
- Handle dependencies

#### Iteration and Refinement

**Start Broad, Then Refine:**

```
# First iteration
"Create a project card component"

# After seeing the result
"Make the card more interactive. Add a flip animation that shows
project details on the back when hovered."

# Further refinement
"The animation is too fast. Slow it to 0.6s and add an easing curve."
```

**Provide Feedback:**

```
"The glassmorphic effect is too subtle. Increase the backdrop blur
and make the border glow more visible."
```

#### Working with Design

**Using canvas-design skill:**

```
Create a hero image for my portfolio with:
- Abstract geometric shapes
- Terminal green/cyan color scheme
- Glassmorphic aesthetic
- 1920x1080 resolution

Save as public/hero-bg.png
```

**Using gemini-image-gen skill:**

```
Generate project thumbnails for:
1. A weather app with glassmorphic cards
2. A TUI file manager with neon terminal aesthetic
3. A markdown editor with live preview

Save to public/screenshots/
```

### Integration

#### With Git

```bash
# Claude Code integrates seamlessly with Git

# Review changes
"Show me what changed since the last commit"

# Create commits
"Commit these changes with a descriptive message"

# Create pull requests
"Create a PR for this feature branch. Include:
- Summary of changes
- Screenshots of new UI
- Test plan"

# Review PRs
"Review PR #42 and provide feedback on code quality"
```

#### With Package Managers

```bash
# Claude Code handles dependencies automatically

# It will install packages as needed
"Add date formatting to the blog post dates"
# → Installs date-fns or similar

# It updates package.json
"Upgrade to Next.js 15"
# → Updates package.json, handles breaking changes

# It manages scripts
"Add a script to generate sitemaps"
# → Adds to package.json, creates implementation
```

#### With Testing Frameworks

```bash
# Claude Code writes and runs tests

"Write tests for the ProjectCard component"
# → Creates test file with comprehensive coverage

"Run the tests and fix any failures"
# → Executes test suite, debugs failures, fixes issues

"Add integration tests for the contact form API"
# → Sets up test environment, writes tests, mocks external services
```

#### With Deployment Platforms

```bash
# Vercel
"Deploy this to Vercel"
# → Runs build, deploys via CLI, provides URL

# Docker
"Create a Docker setup for this Next.js app"
# → Creates Dockerfile, docker-compose.yml, .dockerignore

# GitHub Actions
"Set up CI/CD with GitHub Actions"
# → Creates .github/workflows/ci.yml with tests and deployment
```

### Status Line Usage

Claude Code shows real-time status in the terminal:

```
Claude Code v1.2.0 | Model: Claude Sonnet 4.5 | Token: 45k/200k
[●] Reading components/Hero.tsx...
[●] Analyzing imports...
[✓] Found issue: missing key prop
[●] Applying fix...
[✓] Fixed Hero.tsx
```

**Status Indicators:**
- `[●]` Working
- `[✓]` Complete
- `[✗]` Error
- `[⚠]` Warning

### Session Management

#### Starting a Session

```bash
# Default session (current directory)
claude

# Specific directory
claude ~/projects/my-app

# With custom instructions
claude --instructions "Use TypeScript strict mode"

# Resume previous session
claude --resume
```

#### During a Session

```bash
# View current context
/context

# Check tasks
/tasks

# View git status
/git

# Clear conversation (keeps files)
/clear

# Exit session
/exit
```

#### Session Files

Claude Code creates `.claude/` directory:

```
.claude/
├── mcp.json              # MCP server config
├── skills/               # Custom skills
│   ├── nextjs/
│   ├── canvas-design/
│   └── api-testing/
├── commands/             # Slash commands
│   ├── test.md
│   └── deploy.md
└── hooks/                # Automation hooks
    ├── SessionStart.sh
    └── pre-commit.sh
```

### Advanced Workflows

#### Monorepo Development

```
This is a monorepo with:
- apps/web (Next.js)
- apps/api (Node.js)
- packages/ui (shared components)
- packages/utils (shared utilities)

Create a new shared Button component in packages/ui
and use it in apps/web.
```

Claude Code will:
1. Understand monorepo structure
2. Create component in correct package
3. Update package dependencies
4. Import and use in web app

#### Multi-Language Projects

```
This Go CLI app needs a TUI interface.
Use Bubbletea and Lipgloss to create:
- File browser with vim-style navigation
- Syntax highlighting for code files
- Preview pane with glassmorphic borders

Follow Go best practices and TUI design patterns.
```

Claude Code handles:
- Go modules and dependencies
- Bubbletea patterns (Update/View/Init)
- Lipgloss styling
- Terminal color handling

#### Database Migrations

```
Create a migration system for this SQLite database:
1. Schema versioning
2. Up/down migrations
3. Seed data for development
4. Migration CLI tool

Current schema is in schema.sql
```

Claude Code will:
1. Create migration framework
2. Generate initial migration
3. Build CLI tool
4. Add seed data
5. Document usage

### Common Issues and Solutions

#### Issue: Claude Code Can't Find Files

**Problem:**
```
"I can't find the Hero component"
```

**Solution:**
Be explicit with file paths or let it search:
```
"The Hero component is in components/Hero.tsx"
or
"Search for the Hero component and update it"
```

#### Issue: Too Much Context

**Problem:**
Token limit reached with large codebases

**Solution:**
```
"Focus only on the components/ directory for this task"
or
"Work on the ProjectCard component. Ignore other files."
```

#### Issue: Breaking Changes

**Problem:**
Claude Code makes changes that break the app

**Solution:**
1. Always run tests after changes
2. Use git to review diffs before committing
3. Provide feedback: "This broke the app. Revert and try a different approach."

### Resources

**Official Documentation:**
- [Claude Code Docs](https://docs.anthropic.com/claude-code)
- [MCP Protocol Specification](https://modelcontextprotocol.io)
- [Claude API Reference](https://docs.anthropic.com/api)

**Community:**
- [GitHub Repository](https://github.com/anthropics/claude-code)
- [Discord Community](https://discord.gg/anthropic)
- [Example Projects](https://github.com/topics/claude-code)

**Pricing:**
- Based on Claude API usage
- Sonnet 4.5: $3/million input tokens, $15/million output tokens
- Typical session: $0.10 - $1.00
- Heavy development day: $5 - $20

**Tips for Cost Optimization:**
1. Clear context with `/clear` for unrelated tasks
2. Be specific to reduce iteration
3. Use smaller models for simple tasks
4. Review diffs before committing (avoid wasted work)

---

## OpenAI Codex

### Overview

OpenAI Codex is the AI model powering GitHub Copilot. It's trained specifically on code and excels at:
- Code completion
- Translating natural language to code
- Explaining existing code
- Writing tests
- Debugging

**Note**: Codex API access is limited. Most developers use it through GitHub Copilot.

### API Overview

**Base URL:** `https://api.openai.com/v1`

**Models:**
- `code-davinci-002` (most capable, deprecated)
- `code-cushman-001` (faster, smaller)
- Current: Use `gpt-4` or `gpt-3.5-turbo` with code-focused prompts

### Authentication

```bash
# Set API key
export OPENAI_API_KEY=sk-your_key_here

# Or in .env file
OPENAI_API_KEY=sk-your_key_here
```

**Get API Key:** https://platform.openai.com/api-keys

### Quick Start

```javascript
// Node.js example
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function completeCode(prompt) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a expert programmer. Complete the code."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.2, // Low temperature for consistent code
    max_tokens: 1000,
  });

  return response.choices[0].message.content;
}

// Usage
const code = await completeCode(`
// Function to calculate fibonacci sequence
function fibonacci(n) {
`);

console.log(code);
```

### Common Patterns

#### Code Completion

```javascript
const prompt = `
// TypeScript function to validate email addresses
// Uses regex pattern and returns boolean

export function validateEmail`;

const completion = await completeCode(prompt);
```

#### Natural Language to Code

```javascript
const prompt = `
Convert this description to TypeScript code:

Create a React hook called useLocalStorage that:
1. Takes a key and initial value
2. Syncs state with localStorage
3. Updates localStorage when state changes
4. Returns [value, setValue] tuple
`;

const code = await completeCode(prompt);
```

#### Code Explanation

```javascript
const prompt = `
Explain this code in simple terms:

\`\`\`javascript
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};
\`\`\`
`;

const explanation = await completeCode(prompt);
```

#### Test Generation

```javascript
const prompt = `
Write Jest tests for this function:

\`\`\`typescript
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
\`\`\`

Include:
- Basic functionality test
- Multiple rapid calls test
- Delay timing test
`;

const tests = await completeCode(prompt);
```

### Best Practices

#### 1. Use Low Temperature for Code

```javascript
// For deterministic code generation
temperature: 0.2

// For creative solutions
temperature: 0.7
```

#### 2. Provide Context

```javascript
const prompt = `
This is a Next.js 15 project using TypeScript and Tailwind CSS.
We use Server Components by default and the App Router.

Create a user profile page component...
`;
```

#### 3. Specify Format

```javascript
const prompt = `
Write a function to parse markdown to HTML.
Return ONLY the code, no explanations.
Use TypeScript with proper types.
`;
```

#### 4. Use System Prompts

```javascript
messages: [
  {
    role: "system",
    content: "You are an expert in React and TypeScript. Write modern, type-safe code using React 18+ features."
  },
  {
    role: "user",
    content: "Create a custom hook for fetching data"
  }
]
```

### Integration

#### VS Code Extension

```json
// settings.json
{
  "openai.apiKey": "sk-your_key_here",
  "openai.model": "gpt-4",
  "openai.temperature": 0.2
}
```

#### GitHub Copilot

GitHub Copilot uses Codex under the hood:

```bash
# Install
# Via VS Code: Search for "GitHub Copilot" extension

# Activate
# Sign in with GitHub account
# Requires GitHub Copilot subscription
```

**Tips for Copilot:**
- Write descriptive comments before code
- Use clear function/variable names
- Accept suggestions with Tab
- Cycle through suggestions with Alt+]

### Resources

**Official:**
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Cookbook Examples](https://cookbook.openai.com/)
- [API Reference](https://platform.openai.com/docs/api-reference)

**Pricing:**
- GPT-4: $0.03/1K input tokens, $0.06/1K output tokens
- GPT-3.5-turbo: $0.0015/1K input tokens, $0.002/1K output tokens
- GitHub Copilot: $10/month (alternative to API)

---

## OpenCode

### Overview

OpenCode is an open-source alternative to GitHub Copilot, designed to work with self-hosted or open-source AI models.

**Key Features:**
- Works with local AI models (Ollama, LM Studio)
- Free and open-source
- Privacy-focused (no data sent to cloud)
- VS Code integration
- Multiple model support

### Setup

#### 1. Install Ollama (Local AI Runtime)

```bash
# macOS
brew install ollama

# Linux
curl -fsSL https://ollama.ai/install.sh | sh

# Windows
# Download from https://ollama.ai/download
```

#### 2. Pull a Code Model

```bash
# Code-focused models
ollama pull codellama:13b
ollama pull deepseek-coder:6.7b
ollama pull starcoder:15b

# General models that work well for code
ollama pull mistral:7b
ollama pull llama2:13b
```

#### 3. Install OpenCode Extension

```bash
# In VS Code
# Search for "OpenCode" or "Continue" (popular OpenCode extension)

# Or install Continue (recommended)
code --install-extension continue.continue
```

#### 4. Configure Continue

```json
// ~/.continue/config.json
{
  "models": [
    {
      "title": "CodeLlama",
      "provider": "ollama",
      "model": "codellama:13b",
      "apiBase": "http://localhost:11434"
    }
  ],
  "tabAutocompleteModel": {
    "title": "DeepSeek Coder",
    "provider": "ollama",
    "model": "deepseek-coder:6.7b"
  }
}
```

### Usage

#### Code Completion

Just start typing—OpenCode will suggest completions:

```javascript
// Start typing a function
function calculateFibonacci(n) {
  // OpenCode suggests the implementation
  if (n <= 1) return n;
  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
}
```

#### Chat Interface

Open Continue sidebar:
- `Cmd+L` (Mac) or `Ctrl+L` (Windows/Linux)

```
You: Create a React component for a todo list

OpenCode: [Generates complete component with TypeScript]
```

#### Inline Editing

Select code, press `Cmd+I`:

```typescript
// Before
function add(a, b) {
  return a + b;
}

// Prompt: "Add TypeScript types and JSDoc comments"

// After
/**
 * Adds two numbers together
 * @param a - First number
 * @param b - Second number
 * @returns Sum of a and b
 */
function add(a: number, b: number): number {
  return a + b;
}
```

### Common Patterns

#### Refactoring

```typescript
// Select code and ask:
"Refactor this to use async/await instead of promises"
"Convert this class to a functional component with hooks"
"Extract this logic into a reusable utility function"
```

#### Documentation

```typescript
// Select function and ask:
"Add comprehensive JSDoc comments"
"Write usage examples for this function"
"Generate README documentation for this API"
```

#### Testing

```typescript
// Select function and ask:
"Write Jest tests for this function"
"Add edge case tests"
"Generate test fixtures for this component"
```

### Best Practices

#### 1. Choose the Right Model

```bash
# For speed (tab completion)
deepseek-coder:1.3b

# For quality (chat/generation)
codellama:13b or deepseek-coder:33b

# For general tasks
mistral:7b
```

#### 2. Provide Context

Continue automatically includes:
- Current file
- Recent files
- Terminal output
- Error messages

You can add more:
```
@filename.ts Refactor the authentication logic
```

#### 3. Use Codebase Indexing

```json
// ~/.continue/config.json
{
  "embeddingsProvider": {
    "provider": "ollama",
    "model": "nomic-embed-text"
  }
}
```

Then ask:
```
"Where is the user authentication implemented?"
"Find all API routes that use the database"
```

### Integration

#### With Existing Projects

```bash
# OpenCode works with:
- TypeScript/JavaScript projects
- Python projects
- Go projects
- Rust projects
- Any language with syntax highlighting
```

#### With Git

```bash
# In Continue chat:
"Generate a commit message for these changes"
"Review this diff and suggest improvements"
"Explain what changed in the last commit"
```

### Resources

**Official:**
- [Continue Extension](https://continue.dev)
- [Ollama Documentation](https://ollama.ai/docs)
- [CodeLlama Model Card](https://huggingface.co/codellama)

**Alternative Tools:**
- [Tabby](https://tabby.sh/) - Self-hosted Copilot
- [FauxPilot](https://github.com/fauxpilot/fauxpilot) - Open-source Copilot server
- [LocalAI](https://localai.io/) - Local API server for various models

**Cost:**
- Free (runs locally)
- Hardware requirements:
  - 8GB RAM minimum
  - 16GB RAM recommended for larger models
  - GPU optional but improves speed significantly

---

## Google Gemini

### Overview

Google Gemini is a multimodal AI model that excels at:
- Text generation and analysis
- Code generation and understanding
- **Image generation** (new feature)
- Document understanding
- Multi-turn conversations

**Models:**
- `gemini-1.5-pro` - Most capable, largest context (2M tokens)
- `gemini-1.5-flash` - Fast, cost-effective
- `gemini-2.5-flash-image` - Image generation (NEW)

### Setup

#### 1. Get API Key

Visit: https://aistudio.google.com/apikey

1. Sign in with Google account
2. Click "Get API Key"
3. Create new key or use existing project
4. Copy the key

#### 2. Install SDK

```bash
# Node.js
npm install @google/generative-ai

# Python
pip install google-generativeai

# Go
go get github.com/google/generative-ai-go
```

#### 3. Configure Environment

```bash
# .env
GEMINI_API_KEY=your_key_here

# Load in your code
# Node.js: use dotenv
# Python: use python-dotenv
```

### Quick Start

#### Text Generation (Node.js)

```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateText(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

// Usage
const response = await generateText("Explain React hooks in simple terms");
console.log(response);
```

#### Image Generation (Node.js)

```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs/promises";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateImage(prompt) {
  // Use the image generation model
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-image"
  });

  const result = await model.generateContent(prompt);
  const image = result.response.candidates[0].content.parts[0];

  // Image is returned as base64
  const base64Data = image.inlineData.data;
  const buffer = Buffer.from(base64Data, 'base64');

  // Save to file
  await fs.writeFile('output.png', buffer);

  return 'output.png';
}

// Usage
const imagePath = await generateImage(
  "A futuristic portfolio hero image with glassmorphic elements, " +
  "terminal green and cyan colors, geometric shapes, high quality, 4K"
);
console.log(`Image saved to ${imagePath}`);
```

#### Python Example

```python
import google.generativeai as genai
import os

# Configure API key
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# Text generation
model = genai.GenerativeModel('gemini-1.5-flash')
response = model.generate_content("Write a Python function to reverse a string")
print(response.text)

# Image generation
image_model = genai.GenerativeModel('gemini-2.5-flash-image')
response = image_model.generate_content(
    "A modern web developer's workspace with multiple monitors, " +
    "code on screen, coffee mug, plants, natural lighting"
)

# Save image
with open('workspace.png', 'wb') as f:
    f.write(response.images[0].data)
```

### Common Patterns

#### Code Generation

```javascript
const prompt = `
Create a TypeScript function that:
1. Fetches user data from an API
2. Validates the response
3. Caches the result
4. Handles errors gracefully

Use modern async/await syntax and include types.
`;

const code = await generateText(prompt);
```

#### Code Review

```javascript
const prompt = `
Review this code and suggest improvements:

\`\`\`typescript
${codeToReview}
\`\`\`

Focus on:
- Performance issues
- Security vulnerabilities
- Best practices
- Type safety
`;

const review = await generateText(prompt);
```

#### Multi-turn Conversation

```javascript
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: "I'm building a Next.js portfolio" }],
    },
    {
      role: "model",
      parts: [{ text: "Great! What features do you want to include?" }],
    },
  ],
});

const result = await chat.sendMessage(
  "I want to showcase TUI projects with terminal aesthetics"
);
console.log(result.response.text());
```

#### Image Generation with Specific Styles

```javascript
async function generateProjectThumbnail(projectName, description) {
  const prompt = `
    Create a modern, professional thumbnail for a project called "${projectName}".

    Description: ${description}

    Style requirements:
    - 16:9 aspect ratio
    - Glassmorphic design elements
    - Terminal green (#10b981) and cyan (#06b6d4) color scheme
    - Abstract geometric shapes
    - High quality, 4K resolution
    - Professional, not cartoony
    - No text or words in the image
  `;

  return await generateImage(prompt);
}

// Usage
const thumbnail = await generateProjectThumbnail(
  "TaskFlow TUI",
  "A terminal-based task management application built with Go and Bubbletea"
);
```

#### Multimodal: Analyze Image and Generate Code

```javascript
import fs from "fs/promises";

async function analyzeUIAndGenerateCode(imagePath) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  // Read image
  const imageBuffer = await fs.readFile(imagePath);
  const base64Image = imageBuffer.toString('base64');

  const result = await model.generateContent([
    {
      inlineData: {
        mimeType: "image/png",
        data: base64Image,
      },
    },
    {
      text: "Analyze this UI design and generate React + Tailwind CSS code to implement it. Include responsive design."
    }
  ]);

  return result.response.text();
}

// Usage
const code = await analyzeUIAndGenerateCode('design-mockup.png');
```

### Best Practices

#### 1. Choose the Right Model

```javascript
// For speed and cost-effectiveness
model: "gemini-1.5-flash"

// For complex reasoning
model: "gemini-1.5-pro"

// For image generation
model: "gemini-2.5-flash-image"
```

#### 2. Handle Rate Limits

```javascript
import pRetry from 'p-retry';

async function generateWithRetry(prompt) {
  return pRetry(
    async () => {
      const result = await model.generateContent(prompt);
      return result.response.text();
    },
    {
      retries: 3,
      onFailedAttempt: error => {
        console.log(
          `Attempt ${error.attemptNumber} failed. ${error.retriesLeft} retries left.`
        );
      },
    }
  );
}
```

#### 3. Stream Responses for Long Content

```javascript
async function generateWithStreaming(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContentStream(prompt);

  let text = '';
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    process.stdout.write(chunkText);
    text += chunkText;
  }

  return text;
}
```

#### 4. Use System Instructions

```javascript
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `
    You are an expert TypeScript developer specializing in Next.js and React.
    Always write type-safe code with proper error handling.
    Follow modern best practices and use Server Components when possible.
  `
});
```

#### 5. Optimize Image Prompts

```javascript
// ✅ Good: Specific, detailed
const prompt = `
  A minimalist hero image for a developer portfolio website.

  Style: Modern, glassmorphic design
  Colors: Deep black background (#0a0a0a) with emerald green (#10b981)
         and cyan (#06b6d4) accents
  Elements: Abstract geometric shapes (circles, squares, triangles)
           with frosted glass effects and subtle glows
  Composition: Asymmetric balance, negative space, depth
  Quality: 4K resolution, professional, clean

  NO TEXT. NO PEOPLE. NO LOGOS.
`;

// ❌ Bad: Vague
const prompt = "a cool background image";
```

### Integration

#### With Next.js

```typescript
// app/api/generate-image/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-image"
  });

  const result = await model.generateContent(prompt);
  const image = result.response.candidates[0].content.parts[0];

  // Return base64 image
  return NextResponse.json({
    image: `data:image/png;base64,${image.inlineData.data}`
  });
}
```

#### With Build Scripts

```javascript
// scripts/generate-assets.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs/promises";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateAssets() {
  const assets = [
    {
      name: "hero-bg",
      prompt: "Abstract geometric background for hero section..."
    },
    {
      name: "project-placeholder",
      prompt: "Generic placeholder for project thumbnails..."
    },
  ];

  for (const asset of assets) {
    console.log(`Generating ${asset.name}...`);
    const imagePath = await generateImage(asset.prompt);
    await fs.rename(imagePath, `public/images/${asset.name}.png`);
  }
}

generateAssets();
```

### Common Use Cases

#### 1. Project Thumbnail Generator

```javascript
// Generate unique thumbnails for each project
const projects = [
  "Weather Dashboard",
  "TUI File Manager",
  "Markdown Editor",
];

for (const project of projects) {
  await generateProjectThumbnail(project);
}
```

#### 2. Code Documentation

```javascript
// Generate documentation from code
const code = await fs.readFile('components/Hero.tsx', 'utf-8');
const docs = await generateText(`
  Generate comprehensive documentation for this React component:

  ${code}

  Include:
  - Component description
  - Props documentation
  - Usage examples
  - Best practices
`);

await fs.writeFile('docs/Hero.md', docs);
```

#### 3. Test Generation

```javascript
const code = await fs.readFile('lib/utils.ts', 'utf-8');
const tests = await generateText(`
  Generate comprehensive Jest tests for these utility functions:

  ${code}

  Include:
  - Unit tests for each function
  - Edge cases
  - Error handling tests
  - Type tests
`);

await fs.writeFile('lib/utils.test.ts', tests);
```

#### 4. Content Generation

```javascript
// Generate blog posts or project descriptions
const projectDescription = await generateText(`
  Write a compelling project description for a portfolio website.

  Project: Terminal-based file manager built with Go and Bubbletea
  Features: Vim navigation, file preview, syntax highlighting

  Tone: Professional, enthusiastic
  Length: 2-3 paragraphs
`);
```

### Rate Limits and Pricing

**Free Tier:**
- 15 requests per minute
- 1,500 requests per day
- 1 million tokens per minute

**Paid Tier (Pay as you go):**
- gemini-1.5-flash: $0.075 / 1M tokens (input), $0.30 / 1M tokens (output)
- gemini-1.5-pro: $1.25 / 1M tokens (input), $5.00 / 1M tokens (output)
- gemini-2.5-flash-image: Pricing TBD (currently in preview)

**Context Window:**
- gemini-1.5-flash: 1M tokens
- gemini-1.5-pro: 2M tokens

### Resources

**Official:**
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Get API Key](https://aistudio.google.com/apikey)
- [Google AI Studio](https://aistudio.google.com/) - Test prompts in browser
- [Pricing](https://ai.google.dev/pricing)

**SDKs:**
- [Node.js SDK](https://www.npmjs.com/package/@google/generative-ai)
- [Python SDK](https://pypi.org/project/google-generativeai/)
- [Go SDK](https://github.com/google/generative-ai-go)

**Examples:**
- [Cookbook](https://github.com/google-gemini/cookbook)
- [Example Apps](https://github.com/google-gemini/gemini-api-examples)

---

## AIChat

### Overview

AIChat is a command-line AI assistant that supports multiple AI providers through a unified interface.

**Supported Providers:**
- OpenAI (GPT-4, GPT-3.5)
- Anthropic (Claude)
- Google (Gemini)
- Ollama (local models)
- Azure OpenAI
- And 20+ more

**Key Features:**
- Single CLI for multiple AI providers
- Chat sessions with history
- File and code understanding
- Roles and prompt templates
- Shell integration
- Markdown rendering

### Installation

```bash
# macOS/Linux
brew install aichat

# Or download binary
# From: https://github.com/sigoden/aichat/releases

# Verify
aichat --version
```

### Setup

```bash
# Configure on first run
aichat

# Or manually edit config
vim ~/.config/aichat/config.yaml
```

**Configuration:**

```yaml
# ~/.config/aichat/config.yaml

# Choose your default provider
model: openai:gpt-4
# model: anthropic:claude-3-opus
# model: gemini:gemini-pro
# model: ollama:codellama

# API keys
clients:
  - type: openai
    api_key: sk-your_key_here

  - type: anthropic
    api_key: sk-ant-your_key_here

  - type: google
    api_key: your_gemini_key_here

  - type: ollama
    api_base: http://localhost:11434

# Preferences
temperature: 0.7
save_session: true
highlight: true
```

### Usage

#### Basic Chat

```bash
# Start interactive session
aichat

# Single query
aichat "Explain async/await in JavaScript"

# With specific model
aichat -m gemini:gemini-pro "Write a sorting algorithm"
```

#### File Context

```bash
# Analyze a file
aichat -f src/App.tsx "Explain what this component does"

# Multiple files
aichat -f src/*.tsx "Find all useState calls"

# Code review
aichat -f components/Hero.tsx "Review this code for improvements"
```

#### Code Generation

```bash
# Generate code
aichat -c "Write a TypeScript function to debounce async functions"

# Output to file
aichat "Create a React component for a todo list" > TodoList.tsx

# Shell integration
aichat "Generate a git commit message for these changes: $(git diff)"
```

#### Roles

Roles are reusable prompt templates:

```bash
# Use built-in roles
aichat --role code "Implement binary search in Python"
aichat --role shell "List all files modified in the last 24 hours"

# Create custom role
cat > ~/.config/aichat/roles/reviewer.md << 'EOF'
You are a senior code reviewer.

Review the provided code for:
1. Code quality and readability
2. Performance issues
3. Security vulnerabilities
4. Best practices
5. Potential bugs

Provide specific, actionable feedback.
EOF

# Use custom role
aichat --role reviewer -f src/auth.ts
```

#### Sessions

```bash
# Start named session
aichat -s portfolio-dev

# In session
> "I'm building a Next.js portfolio"
> "How should I structure the components?"
> "Generate a ProjectCard component"

# List sessions
aichat --list-sessions

# Continue session
aichat -s portfolio-dev

# Export session
aichat -s portfolio-dev --export > session.md
```

### Common Patterns

#### Shell Command Assistant

```bash
# Get command suggestions
aichat "How do I find all TypeScript files larger than 100KB?"

# Generate complex commands
aichat "Create a command to backup all .tsx files to a tar.gz"
```

#### Code Refactoring

```bash
# Before
aichat -f legacy.js "Convert this to modern TypeScript with types"

# Documentation
aichat -f utils.ts "Add JSDoc comments to all functions"

# Testing
aichat -f api.ts "Generate comprehensive tests"
```

#### Project Setup

```bash
# Initialize new project
aichat "Generate package.json for a Next.js 15 TypeScript project with Tailwind"

# Configuration files
aichat "Create a tsconfig.json with strict mode"
aichat "Generate a GitHub Actions workflow for CI/CD"
```

#### Learning and Explanation

```bash
# Understand code
aichat -f complex-algorithm.ts "Explain this algorithm step by step"

# Compare approaches
aichat "What's the difference between useMemo and useCallback?"

# Best practices
aichat "What are the best practices for Next.js App Router?"
```

### Integration

#### With Git

```bash
# Generate commit messages
git diff | aichat "Generate a commit message"

# PR descriptions
git diff main..feature-branch | aichat "Create a PR description"

# Alias in .gitconfig
[alias]
    ai-commit = "!git diff | aichat 'Generate a conventional commit message' | git commit -F -"
```

#### With Shell (`.bashrc` or `.zshrc`)

```bash
# Quick AI assistant
function ai() {
    aichat "$*"
}

# Code explanation
function explain() {
    cat "$1" | aichat "Explain this code"
}

# Command helper
function howto() {
    aichat "How do I $*? Provide only the command."
}

# Usage
ai "What is the difference between var and let?"
explain src/App.tsx
howto compress a directory with tar
```

#### With Editors

**Vim:**

```vim
" ~/.vimrc
" Send selection to AIChat
vnoremap <leader>ai :!aichat<CR>

" Explain current file
nnoremap <leader>ae :!aichat -f % "Explain this code"<CR>
```

**VS Code:**

```json
// tasks.json
{
  "label": "AIChat: Explain",
  "type": "shell",
  "command": "aichat -f ${file} 'Explain this code'"
}
```

### Best Practices

#### 1. Use Appropriate Models

```bash
# Fast, cheap queries (explanations, simple generation)
aichat -m openai:gpt-3.5-turbo "What is a promise?"

# Complex tasks (architecture, refactoring)
aichat -m openai:gpt-4 -f src/ "Suggest architecture improvements"

# Local/private (sensitive code)
aichat -m ollama:codellama -f secrets.ts "Review this code"
```

#### 2. Provide Context

```bash
# ❌ Vague
aichat "Create a component"

# ✅ Specific
aichat "Create a React Server Component for a project card. \
Use TypeScript, Tailwind CSS, and next/image. \
Include hover animations with Framer Motion."
```

#### 3. Use Roles for Consistency

```bash
# Create specialized roles
~/.config/aichat/roles/
├── code-reviewer.md
├── test-writer.md
├── doc-writer.md
└── architect.md

# Use consistently
aichat --role test-writer -f src/utils.ts
```

#### 4. Save Important Sessions

```bash
# Name sessions for projects
aichat -s portfolio-redesign
aichat -s api-refactor
aichat -s bug-investigation

# Export for documentation
aichat -s bug-investigation --export > docs/bug-fix-analysis.md
```

### Resources

**Official:**
- [GitHub Repository](https://github.com/sigoden/aichat)
- [Documentation](https://github.com/sigoden/aichat/wiki)
- [Configuration Guide](https://github.com/sigoden/aichat/blob/main/config.example.yaml)

**Community:**
- [Discussions](https://github.com/sigoden/aichat/discussions)
- [Issues](https://github.com/sigoden/aichat/issues)

**Cost:**
- Free and open-source
- Pricing depends on chosen AI provider
- Supports local models (free with Ollama)

---

## Comparison Matrix

| Feature | Claude Code | Codex/Copilot | OpenCode | Gemini | AIChat |
|---------|-------------|---------------|----------|--------|---------|
| **Type** | AI Agent | Code Completion | Local Copilot | API/SDK | CLI Tool |
| **File Manipulation** | ✅ Direct | ❌ No | ❌ No | ❌ No | ❌ No |
| **Command Execution** | ✅ Yes | ❌ No | ❌ No | ❌ No | ⚠️ Limited |
| **Context Window** | 200K tokens | 8K tokens | Varies | 2M tokens | Varies |
| **Multimodal** | ✅ Yes | ❌ No | ❌ No | ✅ Yes | ✅ Yes |
| **Image Generation** | ❌ No | ❌ No | ❌ No | ✅ Yes | ⚠️ Via provider |
| **Custom Skills** | ✅ Yes | ❌ No | ❌ No | ❌ No | ✅ Roles |
| **MCP Integration** | ✅ Yes | ❌ No | ❌ No | ❌ No | ❌ No |
| **Local/Offline** | ❌ No | ❌ No | ✅ Yes | ❌ No | ⚠️ With Ollama |
| **IDE Integration** | Terminal | VS Code/IDEs | VS Code | N/A | Terminal |
| **Git Integration** | ✅ Native | ⚠️ Manual | ⚠️ Manual | ❌ No | ⚠️ Manual |
| **Best For** | Full projects | Code completion | Privacy | APIs/multimodal | Quick queries |
| **Cost** | $0.10-$20/day | $10/mo | Free | Free tier + paid | Free + provider costs |

### When to Use Each Tool

#### Use **Claude Code** when:
- Building entire features or applications
- Need to modify multiple files
- Want git, npm, docker integration
- Complex debugging across codebase
- Managing full development workflow
- **Building 45+ projects in 6 months** (proven track record)

#### Use **Codex/Copilot** when:
- Writing code in your IDE
- Need instant completions
- Working on small snippets
- Learning new APIs
- Don't want to leave your editor

#### Use **OpenCode** when:
- Privacy is critical
- Working with sensitive code
- Want to avoid cloud costs
- Have good local hardware
- Need offline capability

#### Use **Gemini** when:
- Need image generation
- Building image-to-code tools
- Want massive context (2M tokens)
- Cost-effective API usage
- Multimodal analysis

#### Use **AIChat** when:
- Quick terminal queries
- Want to switch between providers
- Need role-based prompts
- Learning/exploring
- Shell integration

---

## Quick Reference

### Getting Started Checklist

- [ ] Install Claude Code: `npm install -g @anthropic-ai/claude-code`
- [ ] Get Claude API key: https://console.anthropic.com
- [ ] Install GitHub Copilot (optional): VS Code extension
- [ ] Install Ollama for local models (optional): https://ollama.ai
- [ ] Get Gemini API key (optional): https://aistudio.google.com/apikey
- [ ] Install AIChat (optional): `brew install aichat`

### Cost Estimates (Daily Development)

| Tool | Light Use | Medium Use | Heavy Use |
|------|-----------|------------|-----------|
| **Claude Code** | $0.10-$1 | $1-$5 | $5-$20 |
| **Copilot** | $10/mo | $10/mo | $10/mo |
| **OpenCode** | Free | Free | Free |
| **Gemini** | Free tier | $1-$5 | $5-$15 |
| **AIChat** | Free | $0.50-$2 | $2-$10 |

### Command Cheat Sheet

```bash
# Claude Code
claude                          # Start in current directory
claude /path/to/project         # Start in specific directory
claude --resume                 # Resume last session

# AIChat
aichat "your query"            # Single query
aichat -f file.ts "explain"    # Analyze file
aichat -s session-name          # Start named session
aichat --role code "task"       # Use role

# Ollama (for OpenCode/AIChat)
ollama pull codellama           # Download model
ollama list                     # List installed models
ollama run codellama            # Start chat

# Git Integration
git diff | aichat "commit msg"  # Generate commit message
```

---

## Final Recommendations

### Primary Setup (Recommended)

1. **Claude Code** - For all serious development work
   - Full project builds
   - Feature implementation
   - Bug fixing and refactoring
   - Git workflow management

2. **GitHub Copilot** - For in-IDE completions
   - Real-time suggestions
   - Boilerplate code
   - Quick snippets

3. **Gemini API** - For visual assets
   - Project thumbnails
   - Hero images
   - UI mockups

This combination provides:
- **Speed**: Copilot for instant completions
- **Power**: Claude Code for complex work
- **Creativity**: Gemini for visual assets
- **Cost-effective**: ~$15-30/month total

### Budget Setup

1. **Claude Code** - Pay as you go (~$5-10/week)
2. **OpenCode + Ollama** - Free local completion
3. **Gemini Free Tier** - 1,500 requests/day

### Privacy-Focused Setup

1. **OpenCode + Ollama** - 100% local
2. **Claude Code** - Only for non-sensitive code
3. **Self-hosted models** - Full control

---

**Last Updated**: 2025-11-22
**Author**: Matt (Portfolio Developer)
**Tools Used**: Claude Code (for creating this documentation and 45+ projects)
