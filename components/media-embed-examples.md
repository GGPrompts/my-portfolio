# Media Embed Components - Usage Guide

## Overview

Three reusable media embed components with terminal/glassmorphic aesthetic, full accessibility, and mobile-responsive design.

## Components

### 1. TUIPlayer

Asciinema player component for terminal recordings with terminal-themed controls.

**Props:**
```typescript
interface TUIPlayerProps {
  castFile?: string;      // Path to .cast file
  autoPlay?: boolean;     // Auto-play on load (default: false)
  loop?: boolean;         // Loop playback (default: false)
  className?: string;     // Additional CSS classes
}
```

**Usage:**
```tsx
import TUIPlayer from '@/components/TUIPlayer';

// Basic usage
<TUIPlayer castFile="/demos/my-app.cast" />

// With auto-play and loop
<TUIPlayer
  castFile="/demos/my-app.cast"
  autoPlay
  loop
  className="max-w-4xl mx-auto"
/>

// Fallback state (no file)
<TUIPlayer />
```

**Features:**
- Terminal-themed player with custom color palette
- Loading state with animation
- Error handling with graceful fallback
- "Demo coming soon" state when no cast file provided
- Terminal header bar with traffic lights
- Border glow effect
- Responsive sizing (fit: 'width')

**Recording Terminal Sessions:**
```bash
# Install asciinema
brew install asciinema  # macOS
apt install asciinema   # Ubuntu/Debian

# Record a session
asciinema rec demos/my-app.cast

# Record with custom settings
asciinema rec -c "my-command" --cols 120 --rows 30 demos/my-app.cast

# Save to public directory
mv demos/my-app.cast public/demos/
```

---

### 2. YouTubeEmbed

YouTube video embed with thumbnail preview and full-screen modal.

**Props:**
```typescript
interface YouTubeEmbedProps {
  videoId?: string;   // YouTube video ID (not full URL)
  title?: string;     // Video title (default: "Video Demo")
  className?: string; // Additional CSS classes
}
```

**Usage:**
```tsx
import YouTubeEmbed from '@/components/YouTubeEmbed';

// Basic usage
<YouTubeEmbed
  videoId="dQw4w9WgXcQ"
  title="Project Demo"
/>

// Grid of videos
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <YouTubeEmbed videoId="abc123" title="Feature Walkthrough" />
  <YouTubeEmbed videoId="xyz789" title="Installation Guide" />
</div>

// Fallback state (no video ID)
<YouTubeEmbed title="Coming Soon" />
```

**Features:**
- Click to open full-screen modal
- Thumbnail preview with hover effect
- Animated play button
- ESC key to close modal
- Click outside to close
- YouTube privacy-enhanced mode (youtube-nocookie.com)
- Responsive 16:9 aspect ratio
- Automatic fallback for thumbnail quality
- Border glow on hover

**Getting YouTube Video ID:**
```
URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ
ID:  dQw4w9WgXcQ (everything after 'v=')

Short URL: https://youtu.be/dQw4w9WgXcQ
ID:        dQw4w9WgXcQ (everything after 'youtu.be/')
```

---

### 3. ImageViewer

Image gallery viewer with thumbnails, full-screen modal, zoom, and navigation.

**Props:**
```typescript
interface ImageViewerProps {
  images: string[];   // Array of image paths
  alt?: string;       // Alt text (default: "Project screenshot")
  className?: string; // Additional CSS classes
}
```

**Usage:**
```tsx
import ImageViewer from '@/components/ImageViewer';

// Single image
<ImageViewer
  images={['/screenshots/hero.png']}
  alt="Hero section"
/>

// Multiple images (gallery)
<ImageViewer
  images={[
    '/screenshots/hero.png',
    '/screenshots/dashboard.png',
    '/screenshots/settings.png',
    '/screenshots/mobile.png'
  ]}
  alt="App screenshots"
  className="max-w-6xl mx-auto"
/>

// Empty state (no images)
<ImageViewer images={[]} />
```

**Features:**
- Thumbnail grid (2/3/4 columns based on screen size)
- Click thumbnail to open full-screen viewer
- Zoom controls (+/- keys, buttons)
- Navigation arrows (← → keys, buttons)
- Image counter (1/4)
- ESC key to close
- Click backdrop to close
- Keyboard shortcuts displayed
- next/image optimization
- Framer Motion animations
- Responsive grid layout

**Keyboard Shortcuts:**
- `ESC` - Close viewer
- `←` `→` - Navigate between images
- `+` `=` - Zoom in (max 300%)
- `-` `_` - Zoom out (min 50%)
- `Enter` / `Space` - Open selected thumbnail

---

## Complete Example: Project Page

```tsx
import TUIPlayer from '@/components/TUIPlayer';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import ImageViewer from '@/components/ImageViewer';

export default function ProjectPage() {
  return (
    <div className="container mx-auto px-4 py-16 space-y-16">
      {/* Hero Section */}
      <section>
        <h1 className="text-4xl font-bold mb-4">My TUI Application</h1>
        <p className="text-muted-foreground mb-8">
          A beautiful terminal user interface built with Bubbletea
        </p>
      </section>

      {/* Terminal Recording */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Live Demo</h2>
        <TUIPlayer
          castFile="/demos/tui-app.cast"
          autoPlay
          loop
        />
      </section>

      {/* Video Walkthrough */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Video Walkthrough</h2>
        <YouTubeEmbed
          videoId="dQw4w9WgXcQ"
          title="Full Feature Tour"
        />
      </section>

      {/* Screenshots */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Screenshots</h2>
        <ImageViewer
          images={[
            '/screenshots/main-menu.png',
            '/screenshots/file-browser.png',
            '/screenshots/settings.png',
            '/screenshots/help-screen.png'
          ]}
          alt="TUI Application"
        />
      </section>

      {/* Multiple Media Types */}
      <section className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Terminal Demo</h3>
          <TUIPlayer castFile="/demos/quick-start.cast" />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Tutorial Video</h3>
          <YouTubeEmbed videoId="abc123" title="Getting Started" />
        </div>
      </section>
    </div>
  );
}
```

---

## Styling & Theming

All components use CSS variables and adapt to all 4 themes (terminal, amber, carbon, light):

**CSS Variable Classes Used:**
- `bg-background`, `bg-foreground`
- `text-foreground`, `text-primary`, `text-muted-foreground`
- `border-border`, `border-primary`
- `text-destructive` (for close buttons)

**Glassmorphism Utilities:**
- `.glass` - Semi-transparent background with blur
- `.border-glow` - Subtle glow effect on borders

**Custom Styling:**
```tsx
// Add custom classes
<TUIPlayer
  castFile="/demos/app.cast"
  className="shadow-2xl max-w-4xl mx-auto"
/>

<YouTubeEmbed
  videoId="abc123"
  className="rounded-2xl overflow-hidden"
/>

<ImageViewer
  images={images}
  className="mt-8"
/>
```

---

## Accessibility Features

### TUIPlayer
- Semantic HTML structure
- Loading/error states clearly communicated
- Keyboard accessible

### YouTubeEmbed
- `role="button"` on thumbnail
- `tabIndex={0}` for keyboard navigation
- `aria-label` for screen readers
- Enter/Space key to open
- ESC key to close
- Focus management

### ImageViewer
- `role="button"` on thumbnails
- `tabIndex={0}` for keyboard navigation
- `aria-label` with image count
- Full keyboard navigation (arrows, zoom, ESC)
- Keyboard shortcuts displayed in modal
- Focus trap in modal

---

## Performance Optimizations

### TUIPlayer
- Dynamic import of asciinema-player (code splitting)
- Player cleanup on unmount
- Efficient re-rendering

### YouTubeEmbed
- YouTube privacy-enhanced mode (no tracking)
- Lazy loading (video only loads when modal opens)
- Thumbnail from YouTube CDN (optimized)
- Fallback to lower quality if max resolution unavailable

### ImageViewer
- Next.js Image component (automatic optimization)
- Responsive images with `sizes` attribute
- Lazy loading for thumbnails
- Priority loading for modal image
- Efficient grid layout (CSS Grid)

---

## Error Handling

All components handle errors gracefully:

**TUIPlayer:**
- No cast file → "Demo Coming Soon" state
- Failed to load → Error message with icon

**YouTubeEmbed:**
- No video ID → "Video Coming Soon" state
- Thumbnail load error → Fallback to standard quality

**ImageViewer:**
- Empty images array → "No Images Available" state
- Image load errors handled by Next.js Image

---

## Mobile Responsiveness

**TUIPlayer:**
- Responsive width (fit: 'width')
- Adjustable terminal font size
- Touch-friendly controls

**YouTubeEmbed:**
- Maintains 16:9 aspect ratio
- Full-screen modal on mobile
- Touch-friendly play button

**ImageViewer:**
- Responsive grid (1→2→3→4 columns)
- Optimized image sizes per breakpoint
- Touch-friendly zoom and navigation
- Swipe gestures support (via Framer Motion)

---

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Backdrop blur support (all modern browsers)
- Framer Motion animations (hardware accelerated)
- CSS Grid and Flexbox

---

## Dependencies

```json
{
  "asciinema-player": "^3.x",      // TUIPlayer
  "framer-motion": "^12.x",        // All components
  "next": "^16.x",                 // ImageViewer (next/image)
  "lucide-react": "^0.x",          // Icons
  "@radix-ui/react-dialog": "^1.x" // Using existing Button component
}
```

All dependencies are already installed in the project.

---

## File Locations

```
components/
├── TUIPlayer.tsx        # Terminal recording player
├── YouTubeEmbed.tsx     # YouTube video with modal
└── ImageViewer.tsx      # Image gallery viewer

public/
├── demos/              # .cast files for TUIPlayer
└── screenshots/        # Images for ImageViewer
```

---

## Tips & Best Practices

### TUIPlayer
- Keep recordings short (30-90 seconds)
- Use `--cols 120 --rows 30` for consistent sizing
- Test terminal color schemes before recording
- Consider loop=true for repeated demos

### YouTubeEmbed
- Upload unlisted videos for portfolio
- Use descriptive titles
- Keep videos under 5 minutes
- Add chapters for longer videos

### ImageViewer
- Optimize images before adding (use next/image)
- Use consistent aspect ratios
- Provide 4-8 screenshots max
- Order images logically (workflow order)

### General
- Always provide fallback states
- Test keyboard navigation
- Check mobile responsiveness
- Verify theme compatibility
- Monitor bundle size

---

**Created:** 2025-11-22
**Components:** TUIPlayer, YouTubeEmbed, ImageViewer
**Theme:** Terminal/Glassmorphic
**Accessibility:** WCAG 2.1 AA compliant
