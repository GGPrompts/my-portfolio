'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

// Static background options - no JavaScript animation, pure CSS
export type Background = 'gradient' | 'mesh' | 'textured' | 'minimal' | 'none'

interface BackgroundContextType {
  background: Background
  setBackground: (bg: Background) => void
  backgrounds: Background[]
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined)

export function BackgroundProvider({ children }: { children: React.ReactNode }) {
  const [background, setBackgroundState] = useState<Background>('gradient')

  const backgrounds: Background[] = [
    'gradient',
    'mesh',
    'textured',
    'minimal',
    'none'
  ]

  // Load saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem('portfolio-background')
    if (saved && backgrounds.includes(saved as Background)) {
      setBackgroundState(saved as Background)
    }
  }, [])

  // Save preference when it changes
  const setBackground = (bg: Background) => {
    setBackgroundState(bg)
    localStorage.setItem('portfolio-background', bg)
  }

  return (
    <BackgroundContext.Provider value={{ background, setBackground, backgrounds }}>
      {children}
    </BackgroundContext.Provider>
  )
}

export function useBackground() {
  const context = useContext(BackgroundContext)
  if (context === undefined) {
    throw new Error('useBackground must be used within a BackgroundProvider')
  }
  return context
}
