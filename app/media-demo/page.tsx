import TUIPlayer from '@/components/TUIPlayer';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import ImageViewer from '@/components/ImageViewer';

export const metadata = {
  title: 'Media Embed Components Demo',
  description: 'Showcase of TUIPlayer, YouTubeEmbed, and ImageViewer components'
};

export default function MediaDemoPage() {
  // Example images for ImageViewer
  const sampleImages = [
    'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800',
    'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=800',
    'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background">
      <div className="container mx-auto px-4 py-16 space-y-20">
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Media Embed Components
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three reusable components for embedding terminal recordings, YouTube videos,
            and image galleries with terminal/glassmorphic aesthetic.
          </p>
        </header>

        {/* TUIPlayer Section */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-foreground">
              TUIPlayer
            </h2>
            <p className="text-muted-foreground">
              Asciinema player component with terminal-themed controls
            </p>
          </div>

          <div className="grid gap-8">
            {/* With cast file (will show "Demo coming soon" since we don't have a file yet) */}
            <div className="space-y-3">
              <h3 className="text-xl font-medium text-foreground/90">
                Standard Player
              </h3>
              <p className="text-sm text-muted-foreground">
                <code className="rounded bg-muted px-2 py-1">
                  castFile="/demos/example.cast"
                </code>
              </p>
              <TUIPlayer castFile="/demos/example.cast" />
            </div>

            {/* Without cast file (fallback state) */}
            <div className="space-y-3">
              <h3 className="text-xl font-medium text-foreground/90">
                Fallback State
              </h3>
              <p className="text-sm text-muted-foreground">
                No cast file provided - shows "Demo Coming Soon" message
              </p>
              <TUIPlayer />
            </div>
          </div>
        </section>

        {/* YouTubeEmbed Section */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-foreground">
              YouTubeEmbed
            </h2>
            <p className="text-muted-foreground">
              YouTube video embed with thumbnail preview and full-screen modal
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* With video ID */}
            <div className="space-y-3">
              <h3 className="text-xl font-medium text-foreground/90">
                Example Video
              </h3>
              <p className="text-sm text-muted-foreground">
                Click to open full-screen modal. Press ESC or click outside to close.
              </p>
              <YouTubeEmbed
                videoId="dQw4w9WgXcQ"
                title="Sample Video Demo"
              />
            </div>

            {/* Without video ID (fallback state) */}
            <div className="space-y-3">
              <h3 className="text-xl font-medium text-foreground/90">
                Fallback State
              </h3>
              <p className="text-sm text-muted-foreground">
                No video ID provided - shows "Video Coming Soon" message
              </p>
              <YouTubeEmbed title="Coming Soon" />
            </div>
          </div>
        </section>

        {/* ImageViewer Section */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-foreground">
              ImageViewer
            </h2>
            <p className="text-muted-foreground">
              Image gallery with thumbnails, zoom, and keyboard navigation
            </p>
          </div>

          <div className="space-y-8">
            {/* Multiple images (gallery) */}
            <div className="space-y-3">
              <h3 className="text-xl font-medium text-foreground/90">
                Image Gallery
              </h3>
              <p className="text-sm text-muted-foreground">
                Click any image to open viewer. Use arrow keys to navigate, +/- to zoom, ESC to close.
              </p>
              <ImageViewer
                images={sampleImages}
                alt="Tech screenshots"
              />
            </div>

            {/* Single image */}
            <div className="space-y-3">
              <h3 className="text-xl font-medium text-foreground/90">
                Single Image
              </h3>
              <p className="text-sm text-muted-foreground">
                Works with just one image - no navigation arrows shown
              </p>
              <ImageViewer
                images={[sampleImages[0]]}
                alt="Single screenshot"
                className="max-w-md mx-auto"
              />
            </div>

            {/* Empty state */}
            <div className="space-y-3">
              <h3 className="text-xl font-medium text-foreground/90">
                Empty State
              </h3>
              <p className="text-sm text-muted-foreground">
                No images provided - shows "No Images Available" message
              </p>
              <ImageViewer images={[]} />
            </div>
          </div>
        </section>

        {/* Usage Example */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-foreground">
              Usage Example
            </h2>
            <p className="text-muted-foreground">
              How to use these components in a project page
            </p>
          </div>

          <div className="glass rounded-lg border border-border/30 p-6 space-y-4">
            <pre className="overflow-x-auto text-sm">
              <code className="text-primary">{`import TUIPlayer from '@/components/TUIPlayer';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import ImageViewer from '@/components/ImageViewer';

export default function ProjectPage() {
  return (
    <div className="space-y-16">
      {/* Terminal Recording */}
      <TUIPlayer
        castFile="/demos/my-app.cast"
        autoPlay
        loop
      />

      {/* Video Demo */}
      <YouTubeEmbed
        videoId="abc123"
        title="Project Walkthrough"
      />

      {/* Screenshots */}
      <ImageViewer
        images={[
          '/screenshots/1.png',
          '/screenshots/2.png',
          '/screenshots/3.png'
        ]}
        alt="Project screenshots"
      />
    </div>
  );
}`}</code>
            </pre>
          </div>
        </section>

        {/* Features */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-foreground">
            Features
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass rounded-lg border border-border/30 p-6 space-y-3">
              <h3 className="text-lg font-semibold text-primary">
                Theme Compatible
              </h3>
              <p className="text-sm text-muted-foreground">
                Uses CSS variables to adapt to all 4 themes (terminal, amber, carbon, light)
              </p>
            </div>

            <div className="glass rounded-lg border border-border/30 p-6 space-y-3">
              <h3 className="text-lg font-semibold text-primary">
                Fully Accessible
              </h3>
              <p className="text-sm text-muted-foreground">
                Keyboard navigation, ARIA labels, focus management, and screen reader support
              </p>
            </div>

            <div className="glass rounded-lg border border-border/30 p-6 space-y-3">
              <h3 className="text-lg font-semibold text-primary">
                Mobile Responsive
              </h3>
              <p className="text-sm text-muted-foreground">
                Optimized for all screen sizes with touch-friendly controls
              </p>
            </div>

            <div className="glass rounded-lg border border-border/30 p-6 space-y-3">
              <h3 className="text-lg font-semibold text-primary">
                Graceful Fallbacks
              </h3>
              <p className="text-sm text-muted-foreground">
                Error states and "coming soon" messages for missing media
              </p>
            </div>

            <div className="glass rounded-lg border border-border/30 p-6 space-y-3">
              <h3 className="text-lg font-semibold text-primary">
                Performance Optimized
              </h3>
              <p className="text-sm text-muted-foreground">
                Code splitting, lazy loading, next/image optimization, and efficient rendering
              </p>
            </div>

            <div className="glass rounded-lg border border-border/30 p-6 space-y-3">
              <h3 className="text-lg font-semibold text-primary">
                Smooth Animations
              </h3>
              <p className="text-sm text-muted-foreground">
                Framer Motion animations for modals, transitions, and interactions
              </p>
            </div>
          </div>
        </section>

        {/* Documentation Link */}
        <section className="text-center space-y-4">
          <p className="text-muted-foreground">
            For detailed usage instructions, see{' '}
            <code className="rounded bg-muted px-2 py-1 text-sm">
              /components/media-embed-examples.md
            </code>
          </p>
        </section>
      </div>
    </div>
  );
}
