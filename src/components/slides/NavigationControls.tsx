import { Button } from '@/components/ui/button'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface NavigationControlsProps {
  onPrevious: () => void
  onNext: () => void
  canGoPrevious: boolean
  canGoNext: boolean
  className?: string
}

export function NavigationControls({
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
  className
}: NavigationControlsProps) {
  return (
    <div className={cn("flex items-center justify-between w-full px-4 md:px-8", className)}>
      <Button
        variant="ghost"
        size="icon"
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={cn(
          "h-12 w-12 rounded-full bg-secondary/40 backdrop-blur-sm hover:bg-secondary/60 hover:scale-110 transition-all duration-150",
          !canGoPrevious && "opacity-0 pointer-events-none"
        )}
        aria-label="Previous slide"
      >
        <CaretLeft className="text-foreground" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onNext}
        disabled={!canGoNext}
        className={cn(
          "h-12 w-12 rounded-full bg-secondary/40 backdrop-blur-sm hover:bg-secondary/60 hover:scale-110 transition-all duration-150",
          !canGoNext && "opacity-0 pointer-events-none"
        )}
        aria-label="Next slide"
      >
        <CaretRight className="text-foreground" />
      </Button>
    </div>
  )
}
