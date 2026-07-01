export interface Theme {
  name: string
  label: string
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
    name: 'light',
    label: 'Light',
    fonts: {
      heading: "'Poppins', sans-serif",
      body: "'Open Sans', sans-serif",
      code: "'Fira Code', monospace"
    },
    colors: {
      background: 'oklch(0.98 0 0)',
      foreground: 'oklch(0.20 0 0)',
      card: 'oklch(0.98 0 0)',
      cardForeground: 'oklch(0.20 0 0)',
      popover: 'oklch(1 0 0)',
      popoverForeground: 'oklch(0.20 0 0)',
      primary: 'oklch(0.45 0.15 260)',
      primaryForeground: 'oklch(1 0 0)',
      secondary: 'oklch(0.90 0.01 260)',
      secondaryForeground: 'oklch(0.20 0 0)',
      muted: 'oklch(0.94 0.01 260)',
      mutedForeground: 'oklch(0.50 0.01 260)',
      accent: 'oklch(0.55 0.20 260)',
      accentForeground: 'oklch(1 0 0)',
      destructive: 'oklch(0.55 0.22 25)',
      destructiveForeground: 'oklch(1 0 0)',
      border: 'oklch(0.85 0.01 260)',
      input: 'oklch(0.85 0.01 260)',
      ring: 'oklch(0.55 0.20 260)',
    },
  },
  {
    name: 'dark',
    label: 'Dark',
    fonts: {
      heading: "'Montserrat', sans-serif",
      body: "'Open Sans', sans-serif",
      code: "'Fira Code', monospace"
    },
    colors: {
      background: 'oklch(0.15 0.01 260)',
      foreground: 'oklch(0.98 0 0)',
      card: 'oklch(0.15 0.01 260)',
      cardForeground: 'oklch(0.98 0 0)',
      popover: 'oklch(0.20 0.01 260)',
      popoverForeground: 'oklch(0.98 0 0)',
      primary: 'oklch(0.55 0.20 260)',
      primaryForeground: 'oklch(1 0 0)',
      secondary: 'oklch(0.25 0.02 260)',
      secondaryForeground: 'oklch(0.98 0 0)',
      muted: 'oklch(0.22 0.02 260)',
      mutedForeground: 'oklch(0.65 0.02 260)',
      accent: 'oklch(0.65 0.22 260)',
      accentForeground: 'oklch(1 0 0)',
      destructive: 'oklch(0.55 0.22 25)',
      destructiveForeground: 'oklch(1 0 0)',
      border: 'oklch(0.30 0.02 260)',
      input: 'oklch(0.30 0.02 260)',
      ring: 'oklch(0.65 0.22 260)',
    },
  },
  {
    name: 'beige',
    label: 'Beige',
    fonts: {
      heading: "'Merriweather', serif",
      body: "'Lora', serif",
      code: "'Courier Prime', monospace"
    },
    colors: {
      background: 'oklch(0.95 0.02 80)',
      foreground: 'oklch(0.25 0.03 80)',
      card: 'oklch(0.95 0.02 80)',
      cardForeground: 'oklch(0.25 0.03 80)',
      popover: 'oklch(0.98 0.01 80)',
      popoverForeground: 'oklch(0.25 0.03 80)',
      primary: 'oklch(0.50 0.12 50)',
      primaryForeground: 'oklch(0.98 0.01 80)',
      secondary: 'oklch(0.88 0.03 80)',
      secondaryForeground: 'oklch(0.25 0.03 80)',
      muted: 'oklch(0.90 0.02 80)',
      mutedForeground: 'oklch(0.50 0.03 80)',
      accent: 'oklch(0.60 0.15 40)',
      accentForeground: 'oklch(0.98 0.01 80)',
      destructive: 'oklch(0.55 0.22 25)',
      destructiveForeground: 'oklch(1 0 0)',
      border: 'oklch(0.82 0.03 80)',
      input: 'oklch(0.82 0.03 80)',
      ring: 'oklch(0.60 0.15 40)',
    },
  },
  {
    name: 'sky',
    label: 'Sky',
    fonts: {
      heading: "'Space Grotesk', sans-serif",
      body: "'Inter', sans-serif",
      code: "'JetBrains Mono', monospace"
    },
    colors: {
      background: 'oklch(0.96 0.02 220)',
      foreground: 'oklch(0.22 0.04 240)',
      card: 'oklch(0.96 0.02 220)',
      cardForeground: 'oklch(0.22 0.04 240)',
      popover: 'oklch(0.99 0.01 220)',
      popoverForeground: 'oklch(0.22 0.04 240)',
      primary: 'oklch(0.50 0.18 240)',
      primaryForeground: 'oklch(0.99 0.01 220)',
      secondary: 'oklch(0.88 0.03 220)',
      secondaryForeground: 'oklch(0.22 0.04 240)',
      muted: 'oklch(0.92 0.02 220)',
      mutedForeground: 'oklch(0.52 0.04 240)',
      accent: 'oklch(0.58 0.20 240)',
      accentForeground: 'oklch(0.99 0.01 220)',
      destructive: 'oklch(0.55 0.22 25)',
      destructiveForeground: 'oklch(1 0 0)',
      border: 'oklch(0.84 0.03 220)',
      input: 'oklch(0.84 0.03 220)',
      ring: 'oklch(0.58 0.20 240)',
    },
  },
  {
    name: 'night',
    label: 'Night',
    fonts: {
      heading: "'Raleway', sans-serif",
      body: "'Lora', serif",
      code: "'Source Code Pro', monospace"
    },
    colors: {
      background: 'oklch(0.12 0.02 260)',
      foreground: 'oklch(0.95 0.01 220)',
      card: 'oklch(0.12 0.02 260)',
      cardForeground: 'oklch(0.95 0.01 220)',
      popover: 'oklch(0.18 0.02 260)',
      popoverForeground: 'oklch(0.95 0.01 220)',
      primary: 'oklch(0.58 0.20 240)',
      primaryForeground: 'oklch(0.98 0 0)',
      secondary: 'oklch(0.22 0.03 260)',
      secondaryForeground: 'oklch(0.95 0.01 220)',
      muted: 'oklch(0.20 0.02 260)',
      mutedForeground: 'oklch(0.62 0.02 240)',
      accent: 'oklch(0.68 0.22 200)',
      accentForeground: 'oklch(0.98 0 0)',
      destructive: 'oklch(0.55 0.22 25)',
      destructiveForeground: 'oklch(1 0 0)',
      border: 'oklch(0.28 0.03 260)',
      input: 'oklch(0.28 0.03 260)',
      ring: 'oklch(0.68 0.22 200)',
    },
  },
  {
    name: 'moon',
    label: 'Moon',
    fonts: {
      heading: "'Space Grotesk', sans-serif",
      body: "'Work Sans', sans-serif",
      code: "'Fira Code', monospace"
    },
    colors: {
      background: 'oklch(0.18 0.01 260)',
      foreground: 'oklch(0.92 0.01 260)',
      card: 'oklch(0.18 0.01 260)',
      cardForeground: 'oklch(0.92 0.01 260)',
      popover: 'oklch(0.22 0.01 260)',
      popoverForeground: 'oklch(0.92 0.01 260)',
      primary: 'oklch(0.52 0.10 280)',
      primaryForeground: 'oklch(0.98 0 0)',
      secondary: 'oklch(0.28 0.02 260)',
      secondaryForeground: 'oklch(0.92 0.01 260)',
      muted: 'oklch(0.25 0.01 260)',
      mutedForeground: 'oklch(0.62 0.02 260)',
      accent: 'oklch(0.70 0.15 280)',
      accentForeground: 'oklch(0.15 0.01 260)',
      destructive: 'oklch(0.55 0.22 25)',
      destructiveForeground: 'oklch(1 0 0)',
      border: 'oklch(0.32 0.02 260)',
      input: 'oklch(0.32 0.02 260)',
      ring: 'oklch(0.70 0.15 280)',
    },
  },
  {
    name: 'serif',
    label: 'Serif',
    fonts: {
      heading: "'Playfair Display', serif",
      body: "'Crimson Pro', serif",
      code: "'IBM Plex Mono', monospace"
    },
    colors: {
      background: 'oklch(0.97 0.01 60)',
      foreground: 'oklch(0.18 0.02 40)',
      card: 'oklch(0.97 0.01 60)',
      cardForeground: 'oklch(0.18 0.02 40)',
      popover: 'oklch(0.99 0 0)',
      popoverForeground: 'oklch(0.18 0.02 40)',
      primary: 'oklch(0.42 0.08 40)',
      primaryForeground: 'oklch(0.99 0 0)',
      secondary: 'oklch(0.90 0.02 60)',
      secondaryForeground: 'oklch(0.18 0.02 40)',
      muted: 'oklch(0.93 0.01 60)',
      mutedForeground: 'oklch(0.48 0.02 40)',
      accent: 'oklch(0.52 0.12 30)',
      accentForeground: 'oklch(0.99 0 0)',
      destructive: 'oklch(0.55 0.22 25)',
      destructiveForeground: 'oklch(1 0 0)',
      border: 'oklch(0.85 0.02 60)',
      input: 'oklch(0.85 0.02 60)',
      ring: 'oklch(0.52 0.12 30)',
    },
  },
  {
    name: 'solarized',
    label: 'Solarized',
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
    name: 'code-light',
    label: 'Code Light',
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
    label: 'Code Dark',
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
