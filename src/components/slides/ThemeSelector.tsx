import { useEffect } from 'react'
import { Palette } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { themes, applyTheme, getThemeByName } from '@/lib/themes'
import { useKV } from '@github/spark/hooks'
import { cn } from '@/lib/utils'

interface ThemeSelectorProps {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function ThemeSelector({ isOpen, onOpenChange }: ThemeSelectorProps) {
  const [selectedTheme, setSelectedTheme] = useKV('slide-theme', 'midnight')

  useEffect(() => {
    if (selectedTheme) {
      const theme = getThemeByName(selectedTheme)
      if (theme) {
        applyTheme(theme)
      }
    }
  }, [selectedTheme])

  const handleThemeChange = (themeName: string) => {
    setSelectedTheme(themeName)
    onOpenChange?.(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="h-10 w-10 rounded-full bg-secondary/80 hover:bg-secondary backdrop-blur-sm border border-border/50 transition-all duration-200 hover:scale-105"
        >
          <Palette className="text-foreground" />
          <span className="sr-only">Select theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 bg-popover/95 backdrop-blur-md border-border/50"
      >
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.name}
            onClick={() => handleThemeChange(theme.name)}
            className={cn(
              'cursor-pointer flex items-center gap-3 px-3 py-2.5',
              theme.name === selectedTheme && 'bg-accent/20'
            )}
          >
            <div
              className="w-5 h-5 rounded-full border-2 border-foreground/20 flex-shrink-0"
              style={{ backgroundColor: theme.colors.accent }}
            />
            <span className={cn(
              'flex-1',
              theme.name === selectedTheme && 'font-semibold text-accent'
            )}>
              {theme.label}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
