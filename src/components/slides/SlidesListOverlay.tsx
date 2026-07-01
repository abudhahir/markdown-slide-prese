import { useState, useEffect, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface Slide {
  content: string
  rawContent: string
}

interface SlidesListOverlayProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  slides: Slide[]
  currentIndex: number
  onSlideSelect: (index: number) => void
}

export function SlidesListOverlay({
  isOpen,
  onOpenChange,
  slides,
  currentIndex,
  onSlideSelect,
}: SlidesListOverlayProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(currentIndex)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      setSelectedIndex(currentIndex)
      setSearchQuery('')
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen, currentIndex])

  const getSlidePreview = (slide: Slide): string => {
    const text = slide.rawContent.trim()
    const firstLine = text.split('\n')[0]
    const cleanedLine = firstLine.replace(/^#+\s*/, '').trim()
    return cleanedLine || text.substring(0, 60).trim() + '...'
  }

  const filteredSlides = slides
    .map((slide, index) => ({ slide, index }))
    .filter(({ slide }) => {
      if (!searchQuery) return true
      const preview = getSlidePreview(slide).toLowerCase()
      const content = slide.rawContent.toLowerCase()
      return preview.includes(searchQuery.toLowerCase()) || content.includes(searchQuery.toLowerCase())
    })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        const currentFilteredIndex = filteredSlides.findIndex(({ index }) => index === selectedIndex)
        if (currentFilteredIndex < filteredSlides.length - 1) {
          setSelectedIndex(filteredSlides[currentFilteredIndex + 1].index)
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        const currentFilteredIndex = filteredSlides.findIndex(({ index }) => index === selectedIndex)
        if (currentFilteredIndex > 0) {
          setSelectedIndex(filteredSlides[currentFilteredIndex - 1].index)
        }
      } else if (e.key === 'Enter') {
        e.preventDefault()
        onSlideSelect(selectedIndex)
        onOpenChange(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, filteredSlides, onSlideSelect, onOpenChange])

  const handleSlideClick = (index: number) => {
    onSlideSelect(index)
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <DialogTitle className="text-2xl font-bold">All Slides</DialogTitle>
        </DialogHeader>

        <div className="px-6 pt-4">
          <div className="relative">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search slides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 text-base"
            />
          </div>
        </div>

        <ScrollArea className="flex-1 px-6 pb-6" ref={listRef}>
          <div className="space-y-2 mt-4">
            {filteredSlides.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>No slides found matching "{searchQuery}"</p>
              </div>
            ) : (
              filteredSlides.map(({ slide, index }) => {
                const preview = getSlidePreview(slide)
                const isSelected = index === selectedIndex
                const isCurrent = index === currentIndex

                return (
                  <Button
                    key={index}
                    variant="ghost"
                    onClick={() => handleSlideClick(index)}
                    className={cn(
                      "w-full justify-start text-left p-4 h-auto transition-all duration-200",
                      isSelected && "bg-accent text-accent-foreground",
                      !isSelected && "hover:bg-muted"
                    )}
                  >
                    <div className="flex items-start gap-4 w-full">
                      <div className={cn(
                        "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm",
                        isCurrent ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      )}>
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{preview}</div>
                        {isCurrent && (
                          <div className="text-xs text-muted-foreground mt-1">Current slide</div>
                        )}
                      </div>
                    </div>
                  </Button>
                )
              })
            )}
          </div>
        </ScrollArea>

        <div className="px-6 py-4 border-t border-border bg-muted/30">
          <p className="text-sm text-muted-foreground">
            Use <kbd className="px-2 py-1 bg-background rounded border border-border font-mono text-xs">↑</kbd>{' '}
            <kbd className="px-2 py-1 bg-background rounded border border-border font-mono text-xs">↓</kbd>{' '}
            to navigate, <kbd className="px-2 py-1 bg-background rounded border border-border font-mono text-xs">Enter</kbd>{' '}
            to select
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
