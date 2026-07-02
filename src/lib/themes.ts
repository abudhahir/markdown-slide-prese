export interface Theme {
  name: string
  label: string
  baseTheme: 'solarized' | 'dracula' | 'code'
  variant: 'light' | 'dark'
  fonts: {
    heading: string
    body: string
    code: string
  }
  colors: {
    background: string
    foreground: string
    card: string
    cardForeground: string
    popover: string
    popoverForeground: string
    primary: string
    primaryForeground: string
    secondary: string
    secondaryForeground: string
    muted: string
    mutedForeground: string
    accent: string
    accentForeground: string
    destructive: string
    destructiveForeground: string
    border: string
    input: string
    ring: string
  }
}

export const themes: Theme[] = [
  {
    name: 'solarized-light',
    label: 'Solarized',
    baseTheme: 'solarized',
    variant: 'light',
    fonts: {
      heading: "'Outfit', sans-serif",
      body: "'Source Sans 3', sans-serif",
      code: "'Inconsolata', monospace"
    },
    colors: {
      background: 'oklch(0.97 0.01 85)',
      foreground: 'oklch(0.35 0.04 192)',
      card: 'oklch(0.97 0.01 85)',
      cardForeground: 'oklch(0.35 0.04 192)',
      popover: 'oklch(0.99 0 0)',
      popoverForeground: 'oklch(0.35 0.04 192)',
      primary: 'oklch(0.52 0.14 220)',
      primaryForeground: 'oklch(0.99 0 0)',
      secondary: 'oklch(0.92 0.02 85)',
      secondaryForeground: 'oklch(0.35 0.04 192)',
      muted: 'oklch(0.94 0.01 85)',
      mutedForeground: 'oklch(0.50 0.05 192)',
      accent: 'oklch(0.60 0.16 192)',
      accentForeground: 'oklch(0.99 0 0)',
      destructive: 'oklch(0.55 0.22 25)',
      destructiveForeground: 'oklch(1 0 0)',
      border: 'oklch(0.88 0.02 85)',
      input: 'oklch(0.88 0.02 85)',
      ring: 'oklch(0.60 0.16 192)',
    },
  },
  {
    name: 'solarized-dark',
    label: 'Solarized',
    baseTheme: 'solarized',
    variant: 'dark',
    fonts: {
      heading: "'Outfit', sans-serif",
      body: "'Source Sans 3', sans-serif",
      code: "'Inconsolata', monospace"
    },
    colors: {
      background: 'oklch(0.15 0.02 192)',
      foreground: 'oklch(0.88 0.02 85)',
      card: 'oklch(0.15 0.02 192)',
      cardForeground: 'oklch(0.88 0.02 85)',
      popover: 'oklch(0.18 0.02 192)',
      popoverForeground: 'oklch(0.88 0.02 85)',
      primary: 'oklch(0.62 0.18 220)',
      primaryForeground: 'oklch(0.12 0.02 192)',
      secondary: 'oklch(0.22 0.03 192)',
      secondaryForeground: 'oklch(0.88 0.02 85)',
      muted: 'oklch(0.20 0.02 192)',
      mutedForeground: 'oklch(0.60 0.05 192)',
      accent: 'oklch(0.70 0.18 192)',
      accentForeground: 'oklch(0.12 0.02 192)',
      destructive: 'oklch(0.60 0.22 25)',
      destructiveForeground: 'oklch(0.98 0 0)',
      border: 'oklch(0.28 0.03 192)',
      input: 'oklch(0.28 0.03 192)',
      ring: 'oklch(0.70 0.18 192)',
    },
  },
  {
    name: 'dracula-light',
    label: 'Dracula',
    baseTheme: 'dracula',
    variant: 'light',
    fonts: {
      heading: "'Space Grotesk', sans-serif",
      body: "'Inter', sans-serif",
      code: "'JetBrains Mono', monospace"
    },
    colors: {
      background: 'oklch(0.97 0.01 300)',
      foreground: 'oklch(0.25 0.03 300)',
      card: 'oklch(0.97 0.01 300)',
      cardForeground: 'oklch(0.25 0.03 300)',
      popover: 'oklch(0.99 0 0)',
      popoverForeground: 'oklch(0.25 0.03 300)',
      primary: 'oklch(0.50 0.18 330)',
      primaryForeground: 'oklch(0.99 0 0)',
      secondary: 'oklch(0.92 0.02 300)',
      secondaryForeground: 'oklch(0.25 0.03 300)',
      muted: 'oklch(0.94 0.01 300)',
      mutedForeground: 'oklch(0.50 0.03 300)',
      accent: 'oklch(0.60 0.20 340)',
      accentForeground: 'oklch(0.99 0 0)',
      destructive: 'oklch(0.55 0.22 25)',
      destructiveForeground: 'oklch(1 0 0)',
      border: 'oklch(0.88 0.02 300)',
      input: 'oklch(0.88 0.02 300)',
      ring: 'oklch(0.60 0.20 340)',
    },
  },
  {
    name: 'dracula-dark',
    label: 'Dracula',
    baseTheme: 'dracula',
    variant: 'dark',
    fonts: {
      heading: "'Space Grotesk', sans-serif",
      body: "'Inter', sans-serif",
      code: "'JetBrains Mono', monospace"
    },
    colors: {
      background: 'oklch(0.18 0.03 300)',
      foreground: 'oklch(0.92 0.01 300)',
      card: 'oklch(0.18 0.03 300)',
      cardForeground: 'oklch(0.92 0.01 300)',
      popover: 'oklch(0.22 0.03 300)',
      popoverForeground: 'oklch(0.92 0.01 300)',
      primary: 'oklch(0.65 0.22 330)',
      primaryForeground: 'oklch(0.15 0.03 300)',
      secondary: 'oklch(0.28 0.04 300)',
      secondaryForeground: 'oklch(0.92 0.01 300)',
      muted: 'oklch(0.25 0.03 300)',
      mutedForeground: 'oklch(0.65 0.03 300)',
      accent: 'oklch(0.72 0.24 340)',
      accentForeground: 'oklch(0.15 0.03 300)',
      destructive: 'oklch(0.60 0.22 25)',
      destructiveForeground: 'oklch(0.98 0 0)',
      border: 'oklch(0.32 0.04 300)',
      input: 'oklch(0.32 0.04 300)',
      ring: 'oklch(0.72 0.24 340)',
    },
  },
  {
    name: 'code-light',
    label: 'Code',
    baseTheme: 'code',
    variant: 'light',
    fonts: {
      heading: "'JetBrains Mono', monospace",
      body: "'IBM Plex Mono', monospace",
      code: "'Fira Code', monospace"
    },
    colors: {
      background: 'oklch(0.98 0 0)',
      foreground: 'oklch(0.25 0.01 240)',
      card: 'oklch(0.98 0 0)',
      cardForeground: 'oklch(0.25 0.01 240)',
      popover: 'oklch(1 0 0)',
      popoverForeground: 'oklch(0.25 0.01 240)',
      primary: 'oklch(0.45 0.12 270)',
      primaryForeground: 'oklch(1 0 0)',
      secondary: 'oklch(0.92 0.01 240)',
      secondaryForeground: 'oklch(0.25 0.01 240)',
      muted: 'oklch(0.95 0.01 240)',
      mutedForeground: 'oklch(0.52 0.02 240)',
      accent: 'oklch(0.55 0.18 180)',
      accentForeground: 'oklch(1 0 0)',
      destructive: 'oklch(0.55 0.22 25)',
      destructiveForeground: 'oklch(1 0 0)',
      border: 'oklch(0.88 0.01 240)',
      input: 'oklch(0.88 0.01 240)',
      ring: 'oklch(0.55 0.18 180)',
    },
  },
  {
    name: 'code-dark',
    label: 'Code',
    baseTheme: 'code',
    variant: 'dark',
    fonts: {
      heading: "'JetBrains Mono', monospace",
      body: "'IBM Plex Mono', monospace",
      code: "'Fira Code', monospace"
    },
    colors: {
      background: 'oklch(0.14 0.01 240)',
      foreground: 'oklch(0.92 0.01 240)',
      card: 'oklch(0.14 0.01 240)',
      cardForeground: 'oklch(0.92 0.01 240)',
      popover: 'oklch(0.18 0.01 240)',
      popoverForeground: 'oklch(0.92 0.01 240)',
      primary: 'oklch(0.62 0.18 270)',
      primaryForeground: 'oklch(0.12 0.01 240)',
      secondary: 'oklch(0.22 0.02 240)',
      secondaryForeground: 'oklch(0.92 0.01 240)',
      muted: 'oklch(0.20 0.01 240)',
      mutedForeground: 'oklch(0.65 0.02 240)',
      accent: 'oklch(0.68 0.20 180)',
      accentForeground: 'oklch(0.12 0.01 240)',
      destructive: 'oklch(0.60 0.22 25)',
      destructiveForeground: 'oklch(0.98 0 0)',
      border: 'oklch(0.28 0.02 240)',
      input: 'oklch(0.28 0.02 240)',
      ring: 'oklch(0.68 0.20 180)',
    },
  },
]

export function applyTheme(theme: Theme) {
  const root = document.documentElement
  Object.entries(theme.colors).forEach(([key, value]) => {
    const cssVarName = key.replace(/([A-Z])/g, '-$1').toLowerCase()
    root.style.setProperty(`--${cssVarName}`, value)
  })
  
  root.style.setProperty('--font-heading', theme.fonts.heading)
  root.style.setProperty('--font-body', theme.fonts.body)
  root.style.setProperty('--font-code', theme.fonts.code)
}

export function getThemeByName(name: string): Theme | undefined {
  return themes.find(theme => theme.name === name)
}

export function getAllFonts(): string[] {
  const allFonts = new Set<string>()
  
  themes.forEach(theme => {
    const extractFontName = (fontString: string) => {
      const match = fontString.match(/'([^']+)'/)
      return match ? match[1] : null
    }
    
    const heading = extractFontName(theme.fonts.heading)
    const body = extractFontName(theme.fonts.body)
    const code = extractFontName(theme.fonts.code)
    
    if (heading) allFonts.add(heading)
    if (body) allFonts.add(body)
    if (code) allFonts.add(code)
  })
  
  return Array.from(allFonts)
}
