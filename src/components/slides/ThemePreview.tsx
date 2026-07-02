import { Theme } from '@/lib/themes'
import { cn } from '@/lib/utils'

interface ThemePreviewProps {
  theme: Theme
  className?: string
}

export function ThemePreview({ theme, className }: ThemePreviewProps) {
  return (
    <div 
      className={cn("relative w-full aspect-[16/10] rounded-md overflow-hidden border-2", className)}
      style={{
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.border,
      }}
    >
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center p-3 gap-2"
        style={{
          fontFamily: theme.fonts.body,
        }}
      >
        <div 
          className="text-center"
          style={{
            fontFamily: theme.fonts.heading,
            color: theme.colors.foreground,
            fontSize: '0.75rem',
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          Sample Heading
        </div>
        
        <div className="flex flex-col gap-1 w-full px-2">
          <div 
            className="h-1.5 rounded-full"
            style={{ backgroundColor: theme.colors.primary, width: '80%' }}
          />
          <div 
            className="h-1 rounded-full"
            style={{ backgroundColor: theme.colors.mutedForeground, width: '90%' }}
          />
          <div 
            className="h-1 rounded-full"
            style={{ backgroundColor: theme.colors.mutedForeground, width: '70%' }}
          />
        </div>

        <div 
          className="mt-1 px-2 py-1 rounded text-[0.5rem]"
          style={{
            backgroundColor: theme.colors.accent,
            color: theme.colors.accentForeground,
            fontFamily: theme.fonts.code,
          }}
        >
          code
        </div>
      </div>
    </div>
  )
}
