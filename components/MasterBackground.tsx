'use client'

import React from 'react'
import { useBackground } from './BackgroundProvider'

export function MasterBackground() {
  const { background } = useBackground()

  // Map background type to CSS class
  const bgClass = {
    gradient: 'bg-style-gradient',
    mesh: 'bg-style-mesh',
    textured: 'bg-style-textured',
    minimal: 'bg-style-minimal',
    none: null
  }[background]

  if (!bgClass) return null

  return <div className={bgClass} aria-hidden="true" />
}
