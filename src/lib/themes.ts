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
      heading: "'Merriweather', serif",
      body: "'Source Sans 3', sans-serif",
      code: "'Source Code Pro', monospace"
    },
    colors: {
      background: 'oklch(0.98 0.008 85)',
      foreground: 'oklch(0.35 0.04 192)',
      card: 'oklch(0.98 0.008 85)',
      cardForeground: 'oklch(0.35 0.04 192)',
      popover: 'oklch(0.96 0.01 85)',
      popoverForeground: 'oklch(0.35 0.04 192)',
      primary: 'oklch(0.50 0.13 205)',
      primaryForeground: 'oklch(0.98 0.008 85)',
      secondary: 'oklch(0.92 0.015 85)',
      secondaryForeground: 'oklch(0.35 0.04 192)',
      muted: 'oklch(0.93 0.012 85)',
      mutedForeground: 'oklch(0.52 0.05 192)',
      accent: 'oklch(0.58 0.15 175)',
      accentForeground: 'oklch(0.98 0.008 85)',
      destructive: 'oklch(0.52 0.20 27)',
      destructiveForeground: 'oklch(0.98 0.008 85)',
      border: 'oklch(0.86 0.015 85)',
      input: 'oklch(0.86 0.015 85)',
      ring: 'oklch(0.58 0.15 175)',
    },
  },
  {
    name: 'solarized-dark',
    label: 'Solarized',
    baseTheme: 'solarized',
    variant: 'dark',
    fonts: {
      heading: "'Merriweather', serif",
      body: "'Source Sans 3', sans-serif",
      code: "'Source Code Pro', monospace"
    },
    colors: {
      background: 'oklch(0.16 0.025 192)',
      foreground: 'oklch(0.86 0.015 85)',
      card: 'oklch(0.16 0.025 192)',
      cardForeground: 'oklch(0.86 0.015 85)',
      popover: 'oklch(0.19 0.025 192)',
      popoverForeground: 'oklch(0.86 0.015 85)',
      primary: 'oklch(0.60 0.16 205)',
      primaryForeground: 'oklch(0.16 0.025 192)',
      secondary: 'oklch(0.24 0.03 192)',
      secondaryForeground: 'oklch(0.86 0.015 85)',
      muted: 'oklch(0.22 0.025 192)',
      mutedForeground: 'oklch(0.58 0.06 192)',
      accent: 'oklch(0.68 0.17 175)',
      accentForeground: 'oklch(0.16 0.025 192)',
      destructive: 'oklch(0.58 0.20 27)',
      destructiveForeground: 'oklch(0.96 0.01 85)',
      border: 'oklch(0.30 0.03 192)',
      input: 'oklch(0.30 0.03 192)',
      ring: 'oklch(0.68 0.17 175)',
    },
  },
  {
    name: 'dracula-light',
    label: 'Dracula',
    baseTheme: 'dracula',
    variant: 'light',
    fonts: {
      heading: "'Poppins', sans-serif",
      body: "'Open Sans', sans-serif",
      code: "'Roboto Mono', monospace"
    },
    colors: {
      background: 'oklch(0.97 0.008 285)',
      foreground: 'oklch(0.28 0.025 285)',
      card: 'oklch(0.97 0.008 285)',
      cardForeground: 'oklch(0.28 0.025 285)',
      popover: 'oklch(0.99 0 0)',
      popoverForeground: 'oklch(0.28 0.025 285)',
      primary: 'oklch(0.52 0.16 325)',
      primaryForeground: 'oklch(0.99 0 0)',
      secondary: 'oklch(0.90 0.015 285)',
      secondaryForeground: 'oklch(0.28 0.025 285)',
      muted: 'oklch(0.93 0.01 285)',
      mutedForeground: 'oklch(0.48 0.03 285)',
      accent: 'oklch(0.58 0.19 330)',
      accentForeground: 'oklch(0.99 0 0)',
      destructive: 'oklch(0.55 0.21 22)',
      destructiveForeground: 'oklch(0.99 0 0)',
      border: 'oklch(0.85 0.015 285)',
      input: 'oklch(0.85 0.015 285)',
      ring: 'oklch(0.58 0.19 330)',
    },
  },
  {
    name: 'dracula-dark',
    label: 'Dracula',
    baseTheme: 'dracula',
    variant: 'dark',
    fonts: {
      heading: "'Poppins', sans-serif",
      body: "'Open Sans', sans-serif",
      code: "'Roboto Mono', monospace"
    },
    colors: {
      background: 'oklch(0.19 0.025 285)',
      foreground: 'oklch(0.90 0.01 285)',
      card: 'oklch(0.19 0.025 285)',
      cardForeground: 'oklch(0.90 0.01 285)',
      popover: 'oklch(0.23 0.03 285)',
      popoverForeground: 'oklch(0.90 0.01 285)',
      primary: 'oklch(0.68 0.20 325)',
      primaryForeground: 'oklch(0.17 0.025 285)',
      secondary: 'oklch(0.28 0.035 285)',
      secondaryForeground: 'oklch(0.90 0.01 285)',
      muted: 'oklch(0.26 0.03 285)',
      mutedForeground: 'oklch(0.62 0.025 285)',
      accent: 'oklch(0.72 0.22 330)',
      accentForeground: 'oklch(0.17 0.025 285)',
      destructive: 'oklch(0.62 0.21 22)',
      destructiveForeground: 'oklch(0.97 0.008 285)',
      border: 'oklch(0.33 0.04 285)',
      input: 'oklch(0.33 0.04 285)',
      ring: 'oklch(0.72 0.22 330)',
    },
  },
  {
    name: 'code-light',
    label: 'Code',
    baseTheme: 'code',
    variant: 'light',
    fonts: {
      heading: "'Space Mono', monospace",
      body: "'IBM Plex Sans', sans-serif",
      code: "'Fira Code', monospace"
    },
    colors: {
      background: 'oklch(0.98 0.005 240)',
      foreground: 'oklch(0.27 0.015 240)',
      card: 'oklch(0.98 0.005 240)',
      cardForeground: 'oklch(0.27 0.015 240)',
      popover: 'oklch(1 0 0)',
      popoverForeground: 'oklch(0.27 0.015 240)',
      primary: 'oklch(0.46 0.14 260)',
      primaryForeground: 'oklch(0.98 0.005 240)',
      secondary: 'oklch(0.92 0.008 240)',
      secondaryForeground: 'oklch(0.27 0.015 240)',
      muted: 'oklch(0.94 0.006 240)',
      mutedForeground: 'oklch(0.50 0.02 240)',
      accent: 'oklch(0.54 0.18 190)',
      accentForeground: 'oklch(0.98 0.005 240)',
      destructive: 'oklch(0.54 0.20 25)',
      destructiveForeground: 'oklch(0.98 0.005 240)',
      border: 'oklch(0.86 0.008 240)',
      input: 'oklch(0.86 0.008 240)',
      ring: 'oklch(0.54 0.18 190)',
    },
  },
  {
    name: 'code-dark',
    label: 'Code',
    baseTheme: 'code',
    variant: 'dark',
    fonts: {
      heading: "'Space Mono', monospace",
      body: "'IBM Plex Sans', sans-serif",
      code: "'Fira Code', monospace"
    },
    colors: {
      background: 'oklch(0.15 0.012 240)',
      foreground: 'oklch(0.90 0.008 240)',
      card: 'oklch(0.15 0.012 240)',
      cardForeground: 'oklch(0.90 0.008 240)',
      popover: 'oklch(0.19 0.015 240)',
      popoverForeground: 'oklch(0.90 0.008 240)',
      primary: 'oklch(0.62 0.17 260)',
      primaryForeground: 'oklch(0.14 0.012 240)',
      secondary: 'oklch(0.23 0.018 240)',
      secondaryForeground: 'oklch(0.90 0.008 240)',
      muted: 'oklch(0.21 0.015 240)',
      mutedForeground: 'oklch(0.63 0.02 240)',
      accent: 'oklch(0.66 0.19 190)',
      accentForeground: 'oklch(0.14 0.012 240)',
      destructive: 'oklch(0.60 0.20 25)',
      destructiveForeground: 'oklch(0.96 0.006 240)',
      border: 'oklch(0.29 0.02 240)',
      input: 'oklch(0.29 0.02 240)',
      ring: 'oklch(0.66 0.19 190)',
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
