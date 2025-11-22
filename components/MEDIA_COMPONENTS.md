# Media Components Quick Reference

## Three Reusable Media Embed Components

### 1. TUIPlayer - Terminal Recording Player

```tsx
import TUIPlayer from '@/components/TUIPlayer';

<TUIPlayer
  castFile="/demos/my-app.cast"  // Optional: path to .cast file
  autoPlay={false}               // Optional: default false
  loop={false}                   // Optional: default false
  className=""                   // Optional: additional classes
/>
```

**States:**
- ✅ With cast file: Shows asciinema player
- ⏳ Loading: Animated loading state
- ❌ Error: Error message if load fails
- 📭 No file: "Demo Coming Soon" fallback

**Recording:**
```bash
asciinema rec demos/my-app.cast
mv demos/my-app.cast public/demos/
```

---

### 2. YouTubeEmbed - YouTube Video with Modal

```tsx
import YouTubeEmbed from '@/components/YouTubeEmbed';

<YouTubeEmbed
  videoId="dQw4w9WgXcQ"  // Optional: YouTube video ID (not URL)
  title="Project Demo"   // Optional: default "Video Demo"
  className=""           // Optional: additional classes
/>
```

**Features:**
- Click thumbnail → Full-screen modal
- ESC or click outside to close
- Responsive 16:9 aspect ratio
- Privacy-enhanced embed (no tracking)

**States:**
- ✅ With video: Shows thumbnail + modal
- 📭 No video: "Video Coming Soon" fallback

**Get Video ID:**
```
URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ
ID:  dQw4w9WgXcQ
```

---

### 3. ImageViewer - Gallery with Zoom & Navigation

```tsx
import ImageViewer from '@/components/ImageViewer';

<ImageViewer
  images={[               // Required: array of image paths
    '/screenshots/1.png',
    '/screenshots/2.png',
    '/screenshots/3.png'
  ]}
  alt="App screenshots"   // Optional: default "Project screenshot"
  className=""            // Optional: additional classes
/>
```

**Features:**
- Responsive thumbnail grid (1→2→3→4 cols)
- Click → Full-screen viewer
- Arrow keys: Navigate
- +/- keys: Zoom (50%-300%)
- ESC: Close
- next/image optimization

**States:**
- ✅ With images: Shows grid + viewer
- 📭 No images: "No Images Available" fallback

**Keyboard Shortcuts:**
- `←` `→` Navigate
- `+` `-` Zoom
- `ESC` Close
- `Enter`/`Space` Open thumbnail

---

## Complete Example

```tsx
import TUIPlayer from '@/components/TUIPlayer';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import ImageViewer from '@/components/ImageViewer';

export default function ProjectPage() {
  return (
    <div className="space-y-16">
      {/* Section 1: Terminal Demo */}
      <section>
        <h2 className="text-2xl mb-4">Live Terminal Demo</h2>
        <TUIPlayer
          castFile="/demos/tui-app.cast"
          autoPlay
          loop
        />
      </section>

      {/* Section 2: Video Walkthrough */}
      <section>
        <h2 className="text-2xl mb-4">Video Tutorial</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <YouTubeEmbed
            videoId="abc123"
            title="Getting Started"
          />
          <YouTubeEmbed
            videoId="xyz789"
            title="Advanced Features"
          />
        </div>
      </section>

      {/* Section 3: Screenshots */}
      <section>
        <h2 className="text-2xl mb-4">Gallery</h2>
        <ImageViewer
          images={[
            '/screenshots/home.png',
            '/screenshots/dashboard.png',
            '/screenshots/settings.png'
          ]}
          alt="App interface"
        />
      </section>
    </div>
  );
}
```

---

## Styling

All components use CSS variables and work with all 4 themes:

```tsx
// Custom styling
<TUIPlayer
  castFile="/demos/app.cast"
  className="max-w-4xl mx-auto shadow-2xl"
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

**Available CSS Classes:**
- `glass` - Glassmorphic background
- `border-glow` - Subtle glow effect
- All Tailwind utilities work

---

## Props Summary

| Component | Required Props | Optional Props |
|-----------|---------------|----------------|
| **TUIPlayer** | None | `castFile`, `autoPlay`, `loop`, `className` |
| **YouTubeEmbed** | None | `videoId`, `title`, `className` |
| **ImageViewer** | `images` | `alt`, `className` |

---

## File Locations

```
/components/
├── TUIPlayer.tsx           # Terminal player
├── YouTubeEmbed.tsx        # YouTube embed
├── ImageViewer.tsx         # Image gallery
├── media-embed-examples.md # Full documentation
└── MEDIA_COMPONENTS.md     # This file (quick ref)

/app/
└── media-demo/
    └── page.tsx            # Live demo page

/public/
├── demos/                  # .cast files
└── screenshots/            # Images
```

---

## Dependencies

All dependencies are installed:
- ✅ asciinema-player
- ✅ framer-motion
- ✅ next (next/image)
- ✅ lucide-react (icons)

CSS import added to `app/globals.css`.

---

## Accessibility

All components include:
- ✅ Keyboard navigation
- ✅ ARIA labels
- ✅ Focus management
- ✅ Screen reader support
- ✅ Semantic HTML

---

## Performance

- ✅ Code splitting (dynamic imports)
- ✅ Lazy loading
- ✅ next/image optimization
- ✅ Efficient re-renders
- ✅ YouTube privacy mode

---

## Demo Page

Visit `/media-demo` to see all components in action with:
- Live examples
- Fallback states
- Usage code snippets
- Feature showcase

---

**Created:** 2025-11-22
**Components:** 3 (TUIPlayer, YouTubeEmbed, ImageViewer)
**Theme:** Terminal/Glassmorphic
**Status:** Production Ready
