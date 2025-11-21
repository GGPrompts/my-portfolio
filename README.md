# My Portfolio

A modern, professional portfolio showcasing web applications and TUI projects with a unique glassmorphism/3D design aesthetic.

## Features

- Modern glassmorphism design with 3D effects
- Showcases both web apps (Vercel deployments) and TUI applications
- Built with Next.js 15 (App Router) and TypeScript
- Smooth animations with Framer Motion
- Responsive and performant

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Deployment**: Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Project Structure

```
my-portfolio/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles + glassmorphism utilities
├── components/            # React components
├── lib/                   # Utility functions
├── public/                # Static assets
├── .claude/
│   └── skills/           # AI assistant skills
│       ├── nextjs/
│       ├── canvas-design/
│       └── gemini-image-gen/
└── PORTFOLIO_PLAN.md     # Detailed development plan
```

## Development Plan

See [PORTFOLIO_PLAN.md](./PORTFOLIO_PLAN.md) for detailed:
- Design specifications
- Component architecture
- Development phases
- TUI recording guidelines (OBS workflow)
- Available skills and resources

## TUI App Showcase

This portfolio includes a special section for Terminal User Interface (TUI) applications built with Bubbletea/Lipgloss. These demos are recorded using OBS Studio to preserve the sophisticated box-drawing characters and styling that break in traditional terminal recorders.

## Skills Integration

This project uses Claude Code skills for enhanced development:
- **nextjs**: Next.js best practices and patterns
- **canvas-design**: Creating unique visual art and hero images
- **gemini-image-gen**: Generating custom visual assets

## License

MIT
