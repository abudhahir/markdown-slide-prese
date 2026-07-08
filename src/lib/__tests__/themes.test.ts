import { describe, it, expect, beforeEach } from 'vitest'
import { themes, applyTheme, getThemeByName, getAllFonts, type Theme } from '../themes'

describe('themes data', () => {
  it('contains 6 themes', () => {
    expect(themes).toHaveLength(6)
  })

  it('has 3 base themes each with light and dark variants', () => {
    const baseThemes = ['solarized', 'dracula', 'code'] as const
    for (const base of baseThemes) {
      const light = themes.find(t => t.baseTheme === base && t.variant === 'light')
      const dark = themes.find(t => t.baseTheme === base && t.variant === 'dark')
      expect(light, `${base}-light should exist`).toBeDefined()
      expect(dark, `${base}-dark should exist`).toBeDefined()
    }
  })

  it('all themes have unique names', () => {
    const names = themes.map(t => t.name)
    expect(new Set(names).size).toBe(names.length)
  })

  it('all themes have complete color definitions', () => {
    const requiredColors = [
      'background', 'foreground', 'card', 'cardForeground',
      'popover', 'popoverForeground', 'primary', 'primaryForeground',
      'secondary', 'secondaryForeground', 'muted', 'mutedForeground',
      'accent', 'accentForeground', 'destructive', 'destructiveForeground',
      'border', 'input', 'ring',
    ] as const

    for (const theme of themes) {
      for (const color of requiredColors) {
        expect(theme.colors[color], `${theme.name} missing color: ${color}`).toBeTruthy()
      }
    }
  })

  it('all themes have font definitions', () => {
    for (const theme of themes) {
      expect(theme.fonts.heading).toBeTruthy()
      expect(theme.fonts.body).toBeTruthy()
      expect(theme.fonts.code).toBeTruthy()
    }
  })

  it('all color values are valid rgb/rgba strings', () => {
    const rgbPattern = /^rgba?\(\d+,\s*\d+,\s*\d+(?:,\s*[\d.]+)?\)$/
    for (const theme of themes) {
      for (const [key, value] of Object.entries(theme.colors)) {
        expect(value, `${theme.name}.${key} = "${value}" is not valid rgb`).toMatch(rgbPattern)
      }
    }
  })
})

describe('getThemeByName', () => {
  it('returns theme for valid name', () => {
    const theme = getThemeByName('solarized-light')
    expect(theme).toBeDefined()
    expect(theme!.name).toBe('solarized-light')
    expect(theme!.baseTheme).toBe('solarized')
    expect(theme!.variant).toBe('light')
  })

  it('returns theme for each known name', () => {
    const names = ['solarized-light', 'solarized-dark', 'dracula-light', 'dracula-dark', 'code-light', 'code-dark']
    for (const name of names) {
      expect(getThemeByName(name), `theme "${name}" not found`).toBeDefined()
    }
  })

  it('returns undefined for unknown name', () => {
    expect(getThemeByName('nonexistent')).toBeUndefined()
  })

  it('returns undefined for empty string', () => {
    expect(getThemeByName('')).toBeUndefined()
  })
})

describe('applyTheme', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('style')
  })

  it('sets CSS custom properties for all colors', () => {
    const theme = getThemeByName('solarized-light')!
    applyTheme(theme)

    const root = document.documentElement
    expect(root.style.getPropertyValue('--background')).toBe(theme.colors.background)
    expect(root.style.getPropertyValue('--foreground')).toBe(theme.colors.foreground)
    expect(root.style.getPropertyValue('--primary')).toBe(theme.colors.primary)
  })

  it('converts camelCase color keys to kebab-case CSS variables', () => {
    const theme = getThemeByName('dracula-dark')!
    applyTheme(theme)

    const root = document.documentElement
    expect(root.style.getPropertyValue('--card-foreground')).toBe(theme.colors.cardForeground)
    expect(root.style.getPropertyValue('--popover-foreground')).toBe(theme.colors.popoverForeground)
    expect(root.style.getPropertyValue('--primary-foreground')).toBe(theme.colors.primaryForeground)
    expect(root.style.getPropertyValue('--muted-foreground')).toBe(theme.colors.mutedForeground)
  })

  it('sets font CSS variables', () => {
    const theme = getThemeByName('code-dark')!
    applyTheme(theme)

    const root = document.documentElement
    expect(root.style.getPropertyValue('--font-heading')).toBe(theme.fonts.heading)
    expect(root.style.getPropertyValue('--font-body')).toBe(theme.fonts.body)
    expect(root.style.getPropertyValue('--font-code')).toBe(theme.fonts.code)
  })

  it('overwrites previous theme when switching', () => {
    const light = getThemeByName('solarized-light')!
    const dark = getThemeByName('solarized-dark')!

    applyTheme(light)
    expect(document.documentElement.style.getPropertyValue('--background')).toBe(light.colors.background)

    applyTheme(dark)
    expect(document.documentElement.style.getPropertyValue('--background')).toBe(dark.colors.background)
  })
})

describe('getAllFonts', () => {
  it('returns an array of font names', () => {
    const fonts = getAllFonts()
    expect(Array.isArray(fonts)).toBe(true)
    expect(fonts.length).toBeGreaterThan(0)
  })

  it('extracts font names without quotes', () => {
    const fonts = getAllFonts()
    for (const font of fonts) {
      expect(font).not.toContain("'")
      expect(font).not.toContain('"')
    }
  })

  it('returns unique font names', () => {
    const fonts = getAllFonts()
    expect(new Set(fonts).size).toBe(fonts.length)
  })

  it('includes known fonts from themes', () => {
    const fonts = getAllFonts()
    expect(fonts).toContain('Merriweather')
    expect(fonts).toContain('Source Code Pro')
    expect(fonts).toContain('Poppins')
    expect(fonts).toContain('Fira Code')
  })
})
