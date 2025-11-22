'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, PlayCircle, AlertCircle } from 'lucide-react';

interface TUIPlayerProps {
  castFile?: string;
  autoPlay?: boolean;
  loop?: boolean;
  className?: string;
}

export default function TUIPlayer({
  castFile,
  autoPlay = false,
  loop = false,
  className = ''
}: TUIPlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!castFile) {
      setIsLoading(false);
      return;
    }

    let AsciinemaPlayer: any;

    // Dynamically import asciinema-player
    const loadPlayer = async () => {
      try {
        AsciinemaPlayer = await import('asciinema-player');

        if (playerRef.current) {
          // Clear previous player
          playerRef.current.innerHTML = '';

          // Create player
          AsciinemaPlayer.create(
            castFile,
            playerRef.current,
            {
              autoPlay,
              loop,
              fit: 'width',
              terminalFontSize: '14px',
              theme: {
                background: 'transparent',
                foreground: 'hsl(160 84% 95%)',
                cursor: 'hsl(160 84% 39%)',
                palette: [
                  '#0c0c0c', // black
                  '#c50f1f', // red
                  '#13a10e', // green
                  '#c19c00', // yellow
                  '#0037da', // blue
                  '#881798', // magenta
                  '#3a96dd', // cyan
                  '#cccccc', // white
                  '#767676', // bright black
                  '#e74856', // bright red
                  '#16c60c', // bright green (terminal green)
                  '#f9f1a5', // bright yellow
                  '#3b78ff', // bright blue
                  '#b4009e', // bright magenta
                  '#61d6d6', // bright cyan
                  '#f2f2f2'  // bright white
                ]
              }
            }
          );

          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to load asciinema player:', error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    loadPlayer();

    // Cleanup
    return () => {
      if (playerRef.current) {
        playerRef.current.innerHTML = '';
      }
    };
  }, [castFile, autoPlay, loop]);

  // Fallback: No cast file provided
  if (!castFile) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`glass relative overflow-hidden rounded-lg border border-border/30 p-12 ${className}`}
      >
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <Terminal className="h-12 w-12 text-primary/50" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">Demo Coming Soon</h3>
            <p className="text-sm text-muted-foreground">
              Terminal recording will be available shortly
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Error state
  if (hasError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`glass relative overflow-hidden rounded-lg border border-destructive/30 p-12 ${className}`}
      >
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <AlertCircle className="h-12 w-12 text-destructive/50" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">Failed to Load Recording</h3>
            <p className="text-sm text-muted-foreground">
              Unable to load the terminal recording. Please try again later.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`glass relative overflow-hidden rounded-lg border border-border/30 p-12 ${className}`}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <PlayCircle className="h-12 w-12 animate-pulse text-primary/50" />
          <p className="text-sm text-muted-foreground">Loading terminal recording...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`glass relative overflow-hidden rounded-lg border border-primary/20 ${className}`}
    >
      {/* Terminal header bar */}
      <div className="flex items-center gap-2 border-b border-border/30 bg-background/50 px-4 py-2">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-destructive/60" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
          <div className="h-3 w-3 rounded-full bg-primary/60" />
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Terminal className="h-3.5 w-3.5" />
          <span>Terminal Recording</span>
        </div>
      </div>

      {/* Player container */}
      <div
        ref={playerRef}
        className="asciinema-player-container bg-background/80"
        style={{
          minHeight: '400px',
          maxHeight: '600px'
        }}
      />

      {/* Glow effect */}
      <div className="pointer-events-none absolute inset-0 rounded-lg border-glow opacity-50" />
    </motion.div>
  );
}
