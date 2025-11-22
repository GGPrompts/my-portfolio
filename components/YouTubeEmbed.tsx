'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Youtube, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface YouTubeEmbedProps {
  videoId?: string;
  title?: string;
  className?: string;
}

export default function YouTubeEmbed({
  videoId,
  title = 'Video Demo',
  className = ''
}: YouTubeEmbedProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Fallback: No video ID provided
  if (!videoId) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`glass relative overflow-hidden rounded-lg border border-border/30 ${className}`}
      >
        <div className="aspect-video flex flex-col items-center justify-center gap-4 p-8 text-center">
          <Youtube className="h-16 w-16 text-primary/50" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">Video Coming Soon</h3>
            <p className="text-sm text-muted-foreground">
              Demo video will be available shortly
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`;

  return (
    <>
      {/* Thumbnail Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className={`group relative cursor-pointer overflow-hidden rounded-lg border border-primary/20 ${className}`}
        onClick={() => setIsModalOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={`Play video: ${title}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsModalOpen(true);
          }
        }}
      >
        {/* Thumbnail */}
        <div className="aspect-video relative overflow-hidden bg-background">
          <img
            src={thumbnailUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              // Fallback to standard resolution thumbnail
              const target = e.target as HTMLImageElement;
              target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }}
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="glass flex h-20 w-20 items-center justify-center rounded-full border border-primary/30 transition-all group-hover:border-primary/60"
            >
              <Play className="h-8 w-8 fill-primary text-primary" />
            </motion.div>
          </div>

          {/* Title */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-2">
              <Youtube className="h-5 w-5 text-destructive" />
              <p className="text-sm font-medium text-foreground">{title}</p>
            </div>
          </div>
        </div>

        {/* Border glow */}
        <div className="pointer-events-none absolute inset-0 rounded-lg border-glow opacity-0 transition-opacity group-hover:opacity-50" />
      </motion.div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          >
            {/* Modal content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, type: 'spring' }}
              className="relative mx-4 w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <Button
                variant="outline"
                size="icon"
                className="absolute -right-4 -top-4 z-10 h-10 w-10 rounded-full border-primary/30 bg-background/80 backdrop-blur-sm hover:bg-primary/20"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close video"
              >
                <X className="h-5 w-5" />
              </Button>

              {/* Video container */}
              <div className="glass overflow-hidden rounded-lg border border-primary/30">
                <div className="aspect-video">
                  <iframe
                    src={embedUrl}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
              </div>

              {/* ESC hint */}
              <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground">
                  Press <kbd className="rounded bg-muted px-2 py-1 text-xs">ESC</kbd> to close
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
