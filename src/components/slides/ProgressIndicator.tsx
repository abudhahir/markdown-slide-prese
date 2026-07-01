import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface ProgressIndicatorProps {
  current: number
  total: number
  className?: string
}

export function ProgressIndicator({ current, total, className }: ProgressIndicatorProps) {
  return (
    <Badge 
      variant="secondary"
      className={cn(
        "bg-accent/20 text-accent-foreground backdrop-blur-sm border-accent/30 px-4 py-2 text-base font-medium transition-all duration-200",
        className
      )}
    >
      {current} / {total}
    </Badge>
  )
}
