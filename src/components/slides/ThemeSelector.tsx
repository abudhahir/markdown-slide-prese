import { useEffect, useState } from 'react'
import { Palette, Sun, Moon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { themes, applyTheme, getThemeByName, type Theme } from '@/lib/themes'
import { useKV } from '@github/spark/hooks'
import { cn } from '@/lib/utils'
import { ThemePreview } from './ThemePreview'

interface ThemeSelectorProps {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function ThemeSelector({ isOpen, onOpenChange }: ThemeSelectorProps) {
  const [selectedTheme, setSelectedTheme] = useKV('slide-theme', 'solarized-light')
  const [variant, setVariant] = useState<'light' | 'dark'>('light')
  const [baseTheme, setBaseTheme] = useState<'solarized' | 'dracula' | 'code'>('solarized')

  useEffect(() => {
    if (selectedTheme) {
      const theme = getThemeByName(selectedTheme)
      if (theme) {
        applyTheme(theme)
        setVariant(theme.variant)
        setBaseTheme(theme.baseTheme)
      }
    }
  }, [selectedTheme])

  const handleVariantToggle = () => {
    const newVariant = variant === 'light' ? 'dark' : 'light'
    const newThemeName = `${baseTheme}-${newVariant}`
    setSelectedTheme(newThemeName)
  }

  const handleBaseThemeChange = (newBaseTheme: 'solarized' | 'dracula' | 'code') => {
    const newThemeName = `${newBaseTheme}-${variant}`
    setSelectedTheme(newThemeName)
  }

  const uniqueThemes = themes.reduce((acc, theme) => {
    const existing = acc.find(t => t.baseTheme === theme.baseTheme)
    if (!existing) {
      acc.push(theme)
    }
    return acc
  }, [] as Theme[])

  const currentTheme = themes.find(t => t.baseTheme === baseTheme && t.variant === variant)

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
        className="w-80 bg-popover/95 backdrop-blur-md border-border/50 p-4"
      >
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="text-sm font-medium text-foreground">Theme Mode</span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleVariantToggle}
            className="h-8 px-3 flex items-center gap-2"
          >
            {variant === 'light' ? (
              <>
                <Sun weight="fill" className="h-4 w-4" />
                <span className="text-xs">Light</span>
              </>
            ) : (
              <>
                <Moon weight="fill" className="h-4 w-4" />
                <span className="text-xs">Dark</span>
              </>
            )}
          </Button>
        </div>
        
        <DropdownMenuSeparator className="mb-4" />
        
        <div className="space-y-3">
          {uniqueThemes.map((theme) => {
            const themeWithVariant = themes.find(t => t.baseTheme === theme.baseTheme && t.variant === variant)
            if (!themeWithVariant) return null
            
            return (
              <DropdownMenuItem
                key={theme.baseTheme}
                onClick={() => handleBaseThemeChange(theme.baseTheme)}
                className={cn(
                  'cursor-pointer flex flex-col gap-2 p-3 rounded-lg transition-all',
                  theme.baseTheme === baseTheme && 'bg-accent/10 ring-2 ring-accent/50'
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={cn(
                    'text-sm font-medium',
                    theme.baseTheme === baseTheme && 'text-accent'
                  )}>
                    {theme.label}
                  </span>
                  {theme.baseTheme === baseTheme && (
                    <div className="h-2 w-2 rounded-full bg-accent" />
                  )}
                </div>
                <ThemePreview theme={themeWithVariant} />
              </DropdownMenuItem>
            )
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
