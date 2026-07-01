import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

interface CommandsListDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandsListDialog({ isOpen, onOpenChange }: CommandsListDialogProps) {
  const commands = [
    { key: '→ or ↓', description: 'Next slide' },
    { key: '← or ↑', description: 'Previous slide' },
    { key: 'Space', description: 'Next slide' },
    { key: 'S', description: 'Show slides list with search' },
    { key: 'T', description: 'Toggle theme selector' },
    { key: 'O', description: 'Open file selector' },
    { key: 'D', description: 'Display current file name' },
    { key: 'F', description: 'Toggle fullscreen mode' },
    { key: 'Escape', description: 'Exit fullscreen' },
    { key: '?', description: 'Show this commands list' },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Keyboard Shortcuts</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-1 pr-4">
            {commands.map((command, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="text-sm text-muted-foreground">{command.description}</span>
                <kbd className="px-3 py-1.5 bg-background rounded border border-border font-mono text-sm font-semibold">
                  {command.key}
                </kbd>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            Press <kbd className="px-2 py-1 bg-background rounded border border-border font-mono text-xs">?</kbd> or{' '}
            <kbd className="px-2 py-1 bg-background rounded border border-border font-mono text-xs">Esc</kbd> to close
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
