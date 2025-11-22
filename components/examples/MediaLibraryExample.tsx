/**
 * Media Library Usage Examples
 *
 * This file demonstrates how to use the media library in your components.
 * These are reference examples - adapt them to your needs!
 */

import Image from 'next/image';
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

// ============================================================================
// Example 1: Simple Project Card with Primary Screenshot
// ============================================================================

export function SimpleProjectCard({ projectId }: { projectId: string }) {
  const screenshot = getPrimaryScreenshot(projectId);

  if (!screenshot) {
    return (
      <div className="glass rounded-lg p-8 text-center text-muted-foreground">
        No screenshots available
      </div>
    );
  }

  return (
    <div className="glass rounded-lg overflow-hidden hover:border-primary/50 transition-colors">
      <div className="relative aspect-video">
        <Image
          src={getScreenshotPath(projectId, screenshot.filename)}
          alt={screenshot.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      {screenshot.caption && (
        <div className="p-4 bg-background/50">
          <p className="text-sm text-muted-foreground">{screenshot.caption}</p>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Example 2: Full Screenshot Gallery
// ============================================================================

export function ScreenshotGallery({ projectId }: { projectId: string }) {
  const screenshots = getScreenshots(projectId);

  if (screenshots.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No screenshots available for this project.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {screenshots.map((screenshot, index) => (
        <div
          key={screenshot.filename}
          className="glass rounded-lg overflow-hidden group"
        >
          <div className="relative aspect-video">
            <Image
              src={getScreenshotPath(projectId, screenshot.filename)}
              alt={screenshot.alt}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index === 0} // Prioritize first image
            />
          </div>
          {screenshot.caption && (
            <div className="p-4">
              <p className="text-sm text-muted-foreground">{screenshot.caption}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// Example 3: YouTube Video Showcase
// ============================================================================

export function YouTubeShowcase({ projectId }: { projectId: string }) {
  const videos = getYouTubeVideos(projectId);

  if (videos.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-foreground">Video Demos</h3>
      {videos.map((video) => (
        <div key={video.videoId} className="glass rounded-lg overflow-hidden">
          {/* YouTube Embed */}
          <div className="relative aspect-video">
            <iframe
              src={getYouTubeEmbedUrl(video.videoId)}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* Video Info */}
          <div className="p-6 bg-background/50">
            <h4 className="text-xl font-semibold text-foreground mb-2">
              {video.title}
            </h4>
            {video.description && (
              <p className="text-sm text-muted-foreground">{video.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// Example 4: Asciinema Player
// ============================================================================

/**
 * Note: This example assumes you've installed asciinema-player:
 * npm install asciinema-player
 *
 * And imported the CSS in your layout:
 * import 'asciinema-player/dist/bundle/asciinema-player.css';
 */

'use client';

import { useEffect, useRef } from 'react';
import { getAsciinemaRecordings, getAsciinemaPath } from '@/lib/media-data';

export function AsciinemaShowcase({ projectId }: { projectId: string }) {
  const recordings = getAsciinemaRecordings(projectId);

  if (recordings.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-foreground">Terminal Demos</h3>
      {recordings.map((recording) => (
        <div key={recording.filename} className="glass rounded-lg overflow-hidden p-6">
          <h4 className="text-lg font-semibold text-foreground mb-2">
            {recording.description}
          </h4>
          {recording.duration && (
            <p className="text-sm text-muted-foreground mb-4">
              Duration: {Math.floor(recording.duration / 60)}:
              {(recording.duration % 60).toString().padStart(2, '0')}
            </p>
          )}

          <AsciinemaPlayer
            src={getAsciinemaPath(recording.filename)}
            autoPlay={false}
            loop={false}
          />
        </div>
      ))}
    </div>
  );
}

// Simple asciinema player component
function AsciinemaPlayer({
  src,
  autoPlay = false,
  loop = false,
}: {
  src: string;
  autoPlay?: boolean;
  loop?: boolean;
}) {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    import('asciinema-player').then((AsciinemaPlayerLib) => {
      if (playerRef.current) {
        AsciinemaPlayerLib.create(src, playerRef.current, {
          autoPlay,
          loop,
          theme: 'asciinema', // or create custom theme
          fit: 'width',
        });
      }
    });
  }, [src, autoPlay, loop]);

  return <div ref={playerRef} className="rounded-lg overflow-hidden bg-card" />;
}

// ============================================================================
// Example 5: Complete Media Section (All Types)
// ============================================================================

export function CompleteMediaSection({ projectId }: { projectId: string }) {
  const media = getProjectMedia(projectId);

  if (!media) {
    return (
      <div className="text-center text-muted-foreground py-12">
        No media available for this project.
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Screenshots */}
      {media.screenshots.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-6">Screenshots</h2>
          <ScreenshotGallery projectId={projectId} />
        </section>
      )}

      {/* YouTube Videos */}
      {media.youtube && media.youtube.length > 0 && (
        <section>
          <YouTubeShowcase projectId={projectId} />
        </section>
      )}

      {/* Asciinema Recordings */}
      {media.asciinema && media.asciinema.length > 0 && (
        <section>
          <AsciinemaShowcase projectId={projectId} />
        </section>
      )}

      {/* Live Demo Link */}
      {media.demoUrl && (
        <section className="text-center">
          <a
            href={media.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <span>Try Live Demo</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </section>
      )}
    </div>
  );
}

// ============================================================================
// Example 6: YouTube Thumbnail Preview (for cards)
// ============================================================================

export function YouTubeThumbnailCard({ projectId }: { projectId: string }) {
  const videos = getYouTubeVideos(projectId);

  if (videos.length === 0) {
    return null;
  }

  const video = videos[0]; // Use first video

  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="glass rounded-lg overflow-hidden block group"
    >
      <div className="relative aspect-video">
        <Image
          src={getYouTubeThumbnail(video.videoId, 'maxres')}
          alt={video.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-primary-foreground ml-1" viewBox="0 0 24 24">
              <path fill="currentColor" d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h4 className="text-lg font-semibold text-foreground">{video.title}</h4>
        {video.description && (
          <p className="text-sm text-muted-foreground mt-1">{video.description}</p>
        )}
      </div>
    </a>
  );
}
