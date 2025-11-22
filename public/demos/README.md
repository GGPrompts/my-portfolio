# Portfolio Media Library

This directory contains all media assets for portfolio projects: screenshots, videos, and asciinema recordings.

## Directory Structure

```
/public/demos/
├── screenshots/          # Project screenshots
│   ├── {projectId}/     # Organized by project ID
│   │   ├── hero.png     # Primary screenshot
│   │   └── feature.png  # Additional screenshots
│   └── .gitkeep
├── asciicasts/          # Asciinema recordings (.cast files)
│   ├── tfe-demo.cast
│   └── .gitkeep
├── videos/              # Video files (MP4, WebM, etc.)
│   ├── demo.mp4
│   └── .gitkeep
└── README.md            # This file
```

## Adding New Media

### 1. Screenshots

Screenshots are organized by project ID in subdirectories.

**Steps:**
1. Create a directory for your project: `/public/demos/screenshots/{projectId}/`
2. Add your images (PNG, JPG, or WebP recommended)
3. Update `/lib/media-data.ts`:

```typescript
{
  projectId: 'your-project-id',
  screenshots: [
    {
      filename: 'hero.png',
      alt: 'Descriptive alt text for accessibility',
      caption: 'Optional caption to display',
      isPrimary: true, // Mark the main screenshot
    },
    {
      filename: 'feature-1.png',
      alt: 'Another feature screenshot',
      caption: 'Additional feature demo',
    },
  ],
  // ... other media
}
```

**Best Practices:**
- Use descriptive filenames (e.g., `dual-pane.png`, `terminal-view.png`)
- Always provide alt text for accessibility
- Mark one screenshot as `isPrimary: true` for project cards
- Optimize images before committing (use tools like TinyPNG, ImageOptim)
- Recommended size: 1920x1080 or 1280x720 for full screenshots
- For thumbnails: 640x360 or 800x600

### 2. Asciinema Recordings

Asciinema recordings capture terminal sessions and can be replayed.

**Steps:**
1. Record your terminal session:
   ```bash
   asciinema rec tfe-demo.cast
   # ... perform demo actions ...
   # Press Ctrl+D when done
   ```

2. Copy the `.cast` file to `/public/demos/asciicasts/`

3. Update `/lib/media-data.ts`:

```typescript
{
  projectId: 'your-project-id',
  asciinema: [
    {
      filename: 'tfe-demo.cast',
      description: 'Complete TFE walkthrough showing navigation and features',
      duration: 120, // Duration in seconds (optional)
    },
  ],
  // ... other media
}
```

**Best Practices:**
- Keep recordings under 2 minutes when possible
- Plan your actions before recording
- Use `asciinema rec --idle-time-limit 2` to trim long pauses
- Test the recording before committing: `asciinema play tfe-demo.cast`

**Playback:**
- Embed in website using [asciinema-player](https://github.com/asciinema/asciinema-player)
- Or link directly to asciinema.org by uploading the file

### 3. YouTube Videos

For longer demos or tutorials, use YouTube videos.

**Steps:**
1. Upload your video to YouTube
2. Copy the video ID from the URL (the part after `v=`)
   - Example: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
   - Video ID: `dQw4w9WgXcQ`

3. Update `/lib/media-data.ts`:

```typescript
{
  projectId: 'your-project-id',
  youtube: [
    {
      videoId: 'dQw4w9WgXcQ',
      title: 'Project Demo and Tutorial',
      description: 'Complete walkthrough of features and usage',
    },
  ],
  // ... other media
}
```

**Best Practices:**
- Use for demos longer than 2 minutes
- Add chapters/timestamps in YouTube description
- Include captions for accessibility
- Create an eye-catching thumbnail

### 4. Video Files (MP4, WebM)

For short clips that don't need YouTube hosting.

**Steps:**
1. Add your video to `/public/demos/videos/`
2. Optimize the file size:
   ```bash
   # Compress MP4 with ffmpeg
   ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output.mp4

   # Convert to WebM for better web compatibility
   ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 output.webm
   ```

3. Reference in your components using Next.js `<video>` tag:
   ```tsx
   <video controls width="100%">
     <source src="/demos/videos/demo.mp4" type="video/mp4" />
     <source src="/demos/videos/demo.webm" type="video/webm" />
   </video>
   ```

**Best Practices:**
- Keep under 10MB when possible
- Provide both MP4 and WebM formats for compatibility
- Add poster image: `<video poster="/demos/screenshots/project/poster.png">`
- Use for short clips (under 30 seconds)

### 5. Live Demo URLs

For deployed web applications.

**Steps:**
Update `/lib/media-data.ts`:

```typescript
{
  projectId: 'your-project-id',
  demoUrl: 'https://your-project.vercel.app',
  // ... other media
}
```

## Helper Functions

The media library provides helper functions in `/lib/media-data.ts`:

```typescript
import {
  getProjectMedia,
  getPrimaryScreenshot,
  getScreenshots,
  getYouTubeVideos,
  getAsciinemaRecordings,
  getScreenshotPath,
  getYouTubeEmbedUrl,
  getYouTubeThumbnail,
} from '@/lib/media-data';

// Get all media for a project
const media = getProjectMedia('tfe');

// Get primary screenshot for project card
const hero = getPrimaryScreenshot('tfe');

// Get full path for Next.js Image component
const imagePath = getScreenshotPath('tfe', 'dual-pane.png');
// Returns: "/demos/screenshots/tfe/dual-pane.png"

// Get YouTube embed URL
const embedUrl = getYouTubeEmbedUrl('dQw4w9WgXcQ');
// Returns: "https://www.youtube.com/embed/dQw4w9WgXcQ"

// Get YouTube thumbnail
const thumbnail = getYouTubeThumbnail('dQw4w9WgXcQ', 'hq');
// Returns: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
```

## Usage in Components

### Project Card with Primary Screenshot

```tsx
import Image from 'next/image';
import { getPrimaryScreenshot, getScreenshotPath } from '@/lib/media-data';

export function ProjectCard({ projectId }: { projectId: string }) {
  const screenshot = getPrimaryScreenshot(projectId);

  if (!screenshot) return null;

  return (
    <div className="glass rounded-lg overflow-hidden">
      <Image
        src={getScreenshotPath(projectId, screenshot.filename)}
        alt={screenshot.alt}
        width={800}
        height={600}
        className="w-full h-auto"
      />
      {screenshot.caption && (
        <p className="text-sm text-muted-foreground p-4">{screenshot.caption}</p>
      )}
    </div>
  );
}
```

### Screenshot Gallery

```tsx
import Image from 'next/image';
import { getScreenshots, getScreenshotPath } from '@/lib/media-data';

export function ScreenshotGallery({ projectId }: { projectId: string }) {
  const screenshots = getScreenshots(projectId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {screenshots.map((screenshot) => (
        <div key={screenshot.filename} className="glass rounded-lg overflow-hidden">
          <Image
            src={getScreenshotPath(projectId, screenshot.filename)}
            alt={screenshot.alt}
            width={800}
            height={600}
            className="w-full h-auto"
          />
          {screenshot.caption && (
            <p className="text-sm text-muted-foreground p-4">{screenshot.caption}</p>
          )}
        </div>
      ))}
    </div>
  );
}
```

### YouTube Video Embed

```tsx
import { getYouTubeVideos, getYouTubeEmbedUrl } from '@/lib/media-data';

export function VideoShowcase({ projectId }: { projectId: string }) {
  const videos = getYouTubeVideos(projectId);

  return (
    <div className="space-y-6">
      {videos.map((video) => (
        <div key={video.videoId} className="glass rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="400"
            src={getYouTubeEmbedUrl(video.videoId)}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full aspect-video"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-foreground">{video.title}</h3>
            {video.description && (
              <p className="text-sm text-muted-foreground mt-2">{video.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
```

## File Size Guidelines

- **Screenshots**: Under 500KB each (use WebP format for best compression)
- **Videos**: Under 10MB (use compression tools)
- **Asciinema**: Usually very small (< 100KB)

## Git LFS (Optional)

For large media files, consider using Git LFS:

```bash
# Install Git LFS
git lfs install

# Track large files
git lfs track "public/demos/videos/*.mp4"
git lfs track "public/demos/screenshots/**/*.png"

# Add .gitattributes
git add .gitattributes
```

## Optimization Tools

- **Images**: [TinyPNG](https://tinypng.com/), [Squoosh](https://squoosh.app/), ImageOptim
- **Videos**: [ffmpeg](https://ffmpeg.org/), HandBrake
- **Next.js**: Automatically optimizes images via `next/image` component

---

**Last Updated**: 2025-11-22
**Managed By**: `/lib/media-data.ts`
