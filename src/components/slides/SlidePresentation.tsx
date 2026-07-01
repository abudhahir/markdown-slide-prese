import { useState, useEffect, useCallback } from 'react'
import { parseMarkdownToSlides } from '@/lib/markdown-parser'
import { SlideContainer } from './SlideContainer'
import { NavigationControls } from './NavigationControls'
import { ProgressIndicator } from './ProgressIndicator'
import { ThemeSelector } from './ThemeSelector'
import { FileSelector } from './FileSelector'
import { PresentationTimer } from './PresentationTimer'
import { MarkdownNameDisplay } from './MarkdownNameDisplay'
import { Button } from '@/components/ui/button'
import { FolderOpen } from '@phosphor-icons/react'

interface SlidePresentationProps {
  markdown: string
  onMarkdownChange?: (markdown: string, fileName: string) => void
}

export function SlidePresentation({ markdown, onMarkdownChange }: SlidePresentationProps) {
  const [slides, setSlides] = useState(() => parseMarkdownToSlides(markdown))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false)
  const [isFileSelectorOpen, setIsFileSelectorOpen] = useState(false)
  const [isMarkdownNameOpen, setIsMarkdownNameOpen] = useState(false)
  const [currentFileName, setCurrentFileName] = useState('tutorial-slides.md')

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
      } else if (e.key === 't' || e.key === 'T') {
        e.preventDefault()
        setIsThemeSelectorOpen(prev => !prev)
      } else if (e.key === 'o' || e.key === 'O') {
        e.preventDefault()
        setIsFileSelectorOpen(prev => !prev)
      } else if (e.key === 'd' || e.key === 'D') {
        e.preventDefault()
        setIsMarkdownNameOpen(prev => !prev)
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

  const handleFileSelect = (content: string, fileName: string) => {
    setCurrentFileName(fileName)
    if (onMarkdownChange) {
      onMarkdownChange(content, fileName)
    }
  }

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

      <div className="absolute top-8 left-8">
        <PresentationTimer />
      </div>

      <div className="absolute top-8 right-8 flex items-center gap-3">
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setIsFileSelectorOpen(true)}
          className="h-10 w-10 rounded-full bg-secondary/80 hover:bg-secondary backdrop-blur-sm border border-border/50 transition-all duration-200 hover:scale-105"
          aria-label="Open file selector"
        >
          <FolderOpen className="text-foreground" />
        </Button>
        <ThemeSelector isOpen={isThemeSelectorOpen} onOpenChange={setIsThemeSelectorOpen} />
        <ProgressIndicator current={currentIndex + 1} total={slides.length} />
      </div>

      <FileSelector
        isOpen={isFileSelectorOpen}
        onOpenChange={setIsFileSelectorOpen}
        onFileSelect={handleFileSelect}
      />

      <MarkdownNameDisplay
        isOpen={isMarkdownNameOpen}
        onOpenChange={setIsMarkdownNameOpen}
        fileName={currentFileName}
      />
    </div>
  )
}
