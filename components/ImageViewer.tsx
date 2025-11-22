'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageViewerProps {
  images: string[];
  alt?: string;
  className?: string;
}

export default function ImageViewer({
  images,
  alt = 'Project screenshot',
  className = ''
}: ImageViewerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (!isModalOpen) return;

      switch (e.key) {
        case 'Escape':
          setIsModalOpen(false);
          setZoomLevel(1);
          break;
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
        case '_':
          handleZoomOut();
          break;
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyboard);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyboard);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, currentIndex, zoomLevel]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setZoomLevel(1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setZoomLevel(1);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  };

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
    setZoomLevel(1);
  };

  // Empty state
  if (!images || images.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`glass relative overflow-hidden rounded-lg border border-border/30 ${className}`}
      >
        <div className="aspect-video flex flex-col items-center justify-center gap-4 p-8 text-center">
          <ImageIcon className="h-16 w-16 text-primary/50" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">No Images Available</h3>
            <p className="text-sm text-muted-foreground">
              Screenshots will be added soon
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  const currentImage = images[currentIndex];
  const hasMultipleImages = images.length > 1;

  return (
    <>
      {/* Thumbnail Grid */}
      <div className={`${className}`}>
        <div className={`grid gap-4 ${hasMultipleImages ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'}`}>
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group relative cursor-pointer overflow-hidden rounded-lg border border-border/30 hover:border-primary/40 transition-colors"
              onClick={() => openModal(index)}
              role="button"
              tabIndex={0}
              aria-label={`View image ${index + 1} of ${images.length}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openModal(index);
                }
              }}
            >
              {/* Thumbnail */}
              <div className="aspect-video relative bg-background/50">
                <Image
                  src={image}
                  alt={`${alt} ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors flex items-center justify-center">
                  <Maximize2 className="h-8 w-8 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* Image counter for multiple images */}
              {hasMultipleImages && (
                <div className="absolute bottom-2 right-2 rounded-full bg-background/80 px-2 py-1 text-xs text-foreground backdrop-blur-sm">
                  {index + 1}/{images.length}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/98 backdrop-blur-md"
          >
            {/* Controls Bar */}
            <div className="glass absolute left-1/2 top-4 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-primary/30 px-4 py-2">
              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  setIsModalOpen(false);
                  setZoomLevel(1);
                }}
                aria-label="Close viewer"
              >
                <X className="h-5 w-5" />
              </Button>

              <div className="h-6 w-px bg-border/30" />

              {/* Zoom controls */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.5}
                aria-label="Zoom out"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>

              <span className="min-w-[4rem] text-center text-sm text-muted-foreground">
                {Math.round(zoomLevel * 100)}%
              </span>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3}
                aria-label="Zoom in"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>

              {/* Image counter */}
              {hasMultipleImages && (
                <>
                  <div className="h-6 w-px bg-border/30" />
                  <span className="text-sm text-muted-foreground">
                    {currentIndex + 1} / {images.length}
                  </span>
                </>
              )}
            </div>

            {/* Image Container */}
            <div
              className="flex h-full items-center justify-center p-20"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setIsModalOpen(false);
                  setZoomLevel(1);
                }
              }}
            >
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: zoomLevel }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative h-full w-full"
                style={{
                  cursor: zoomLevel > 1 ? 'move' : 'default'
                }}
              >
                <Image
                  src={currentImage}
                  alt={`${alt} ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </motion.div>
            </div>

            {/* Navigation Arrows (only for multiple images) */}
            {hasMultipleImages && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full border-primary/30 bg-background/80 backdrop-blur-sm hover:bg-primary/20"
                  onClick={handlePrevious}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full border-primary/30 bg-background/80 backdrop-blur-sm hover:bg-primary/20"
                  onClick={handleNext}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}

            {/* Keyboard Hints */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
              <div className="glass rounded-lg border border-border/30 px-4 py-2">
                <p className="text-xs text-muted-foreground space-x-4">
                  <kbd className="rounded bg-muted px-2 py-1">ESC</kbd>
                  <span>Close</span>
                  {hasMultipleImages && (
                    <>
                      <span className="mx-2">•</span>
                      <kbd className="rounded bg-muted px-2 py-1">←</kbd>
                      <kbd className="rounded bg-muted px-2 py-1">→</kbd>
                      <span>Navigate</span>
                    </>
                  )}
                  <span className="mx-2">•</span>
                  <kbd className="rounded bg-muted px-2 py-1">+</kbd>
                  <kbd className="rounded bg-muted px-2 py-1">-</kbd>
                  <span>Zoom</span>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
