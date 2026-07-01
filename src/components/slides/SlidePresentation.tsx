import { useState, useEffect, useCallback } from 'react'
import { parseMarkdownToSlides } from '@/lib/markdown-parser'
import { SlideContainer } from './SlideContainer'
import { NavigationControls } from './NavigationControls'
import { ProgressIndicator } from './ProgressIndicator'
import { ThemeSelector } from './ThemeSelector'

interface SlidePresentationProps {
  markdown: string
}

export function SlidePresentation({ markdown }: SlidePresentationProps) {
  const [slides, setSlides] = useState(() => parseMarkdownToSlides(markdown))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const parsedSlides = parseMarkdownToSlides(markdown)
    setSlides(parsedSlides)
    setCurrentIndex(0)
  }, [markdown])

  const goToNext = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      setDirection(1)
      setCurrentIndex(prev => prev + 1)
    }
  }, [currentIndex, slides.length])

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex(prev => prev - 1)
    }
  }, [currentIndex])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault()
        goToNext()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        goToPrevious()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [goToNext, goToPrevious])

  useEffect(() => {
    let touchStartX = 0
    let touchEndX = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
    }

    const handleSwipe = () => {
      const swipeThreshold = 50
      if (touchStartX - touchEndX > swipeThreshold) {
        goToNext()
      } else if (touchEndX - touchStartX > swipeThreshold) {
        goToPrevious()
      }
    }

    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [goToNext, goToPrevious])

  if (slides.length === 0) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">No Slides Found</h1>
          <p className="text-muted-foreground">
            Please provide markdown content separated by <code className="bg-muted px-2 py-1 rounded">---</code>
          </p>
        </div>
      </div>
    )
  }

  const currentSlide = slides[currentIndex]

  return (
    <div className="h-screen w-screen bg-background text-foreground overflow-hidden relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <SlideContainer slide={currentSlide} direction={direction} />
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-7xl px-4 md:px-8 flex items-center justify-between pointer-events-auto">
          <NavigationControls
            onPrevious={goToPrevious}
            onNext={goToNext}
            canGoPrevious={currentIndex > 0}
            canGoNext={currentIndex < slides.length - 1}
          />
        </div>
      </div>

      <div className="absolute top-8 right-8 flex items-center gap-3">
        <ThemeSelector />
        <ProgressIndicator current={currentIndex + 1} total={slides.length} />
      </div>
    </div>
  )
}
