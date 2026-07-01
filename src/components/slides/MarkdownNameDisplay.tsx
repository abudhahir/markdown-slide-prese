import { FileText } from '@phosphor-icons/react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface MarkdownNameDisplayProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  fileName: string
}

export function MarkdownNameDisplay({ isOpen, onOpenChange, fileName }: MarkdownNameDisplayProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-card/95 backdrop-blur-md border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <FileText className="text-accent" size={24} />
            Current Presentation
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-start gap-3 p-4 bg-accent/10 rounded-lg border border-accent/20">
            <FileText className="text-accent flex-shrink-0 mt-1" size={20} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-muted-foreground mb-1">Markdown File</p>
              <p className="text-base font-semibold text-foreground break-all">
                {fileName}
              </p>
            </div>
          </div>

          <div className="text-sm text-muted-foreground text-center">
            Press <kbd className="px-2 py-1 bg-muted rounded text-foreground font-mono">D</kbd> to toggle this display
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
