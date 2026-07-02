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
      background: 'rgb(253, 246, 227)',
      foreground: 'rgb(101, 123, 131)',
      card: 'rgb(253, 246, 227)',
      cardForeground: 'rgb(101, 123, 131)',
      popover: 'rgb(238, 232, 213)',
      popoverForeground: 'rgb(101, 123, 131)',
      primary: 'rgb(38, 139, 210)',
      primaryForeground: 'rgb(253, 246, 227)',
      secondary: 'rgb(238, 232, 213)',
      secondaryForeground: 'rgb(101, 123, 131)',
      muted: 'rgb(238, 232, 213)',
      mutedForeground: 'rgb(147, 161, 161)',
      accent: 'rgb(42, 161, 152)',
      accentForeground: 'rgb(253, 246, 227)',
      destructive: 'rgb(220, 50, 47)',
      destructiveForeground: 'rgb(253, 246, 227)',
      border: 'rgb(238, 232, 213)',
      input: 'rgb(238, 232, 213)',
      ring: 'rgb(42, 161, 152)',
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
      background: 'rgb(0, 43, 54)',
      foreground: 'rgb(238, 232, 213)',
      card: 'rgb(0, 43, 54)',
      cardForeground: 'rgb(238, 232, 213)',
      popover: 'rgb(7, 54, 66)',
      popoverForeground: 'rgb(238, 232, 213)',
      primary: 'rgb(38, 139, 210)',
      primaryForeground: 'rgb(0, 43, 54)',
      secondary: 'rgb(7, 54, 66)',
      secondaryForeground: 'rgb(238, 232, 213)',
      muted: 'rgb(7, 54, 66)',
      mutedForeground: 'rgb(147, 161, 161)',
      accent: 'rgb(42, 161, 152)',
      accentForeground: 'rgb(0, 43, 54)',
      destructive: 'rgb(220, 50, 47)',
      destructiveForeground: 'rgb(238, 232, 213)',
      border: 'rgb(88, 110, 117)',
      input: 'rgb(88, 110, 117)',
      ring: 'rgb(42, 161, 152)',
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
      background: 'rgb(248, 248, 255)',
      foreground: 'rgb(77, 66, 89)',
      card: 'rgb(248, 248, 255)',
      cardForeground: 'rgb(77, 66, 89)',
      popover: 'rgb(255, 255, 255)',
      popoverForeground: 'rgb(77, 66, 89)',
      primary: 'rgb(189, 147, 249)',
      primaryForeground: 'rgb(255, 255, 255)',
      secondary: 'rgb(230, 230, 240)',
      secondaryForeground: 'rgb(77, 66, 89)',
      muted: 'rgb(240, 240, 245)',
      mutedForeground: 'rgb(120, 110, 130)',
      accent: 'rgb(255, 121, 198)',
      accentForeground: 'rgb(255, 255, 255)',
      destructive: 'rgb(255, 85, 85)',
      destructiveForeground: 'rgb(255, 255, 255)',
      border: 'rgb(220, 220, 230)',
      input: 'rgb(220, 220, 230)',
      ring: 'rgb(255, 121, 198)',
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
      background: 'rgb(40, 42, 54)',
      foreground: 'rgb(248, 248, 242)',
      card: 'rgb(40, 42, 54)',
      cardForeground: 'rgb(248, 248, 242)',
      popover: 'rgb(68, 71, 90)',
      popoverForeground: 'rgb(248, 248, 242)',
      primary: 'rgb(189, 147, 249)',
      primaryForeground: 'rgb(40, 42, 54)',
      secondary: 'rgb(68, 71, 90)',
      secondaryForeground: 'rgb(248, 248, 242)',
      muted: 'rgb(68, 71, 90)',
      mutedForeground: 'rgb(162, 162, 162)',
      accent: 'rgb(255, 121, 198)',
      accentForeground: 'rgb(40, 42, 54)',
      destructive: 'rgb(255, 85, 85)',
      destructiveForeground: 'rgb(248, 248, 242)',
      border: 'rgb(98, 114, 164)',
      input: 'rgb(98, 114, 164)',
      ring: 'rgb(255, 121, 198)',
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
      background: 'rgb(250, 250, 252)',
      foreground: 'rgb(70, 70, 80)',
      card: 'rgb(250, 250, 252)',
      cardForeground: 'rgb(70, 70, 80)',
      popover: 'rgb(255, 255, 255)',
      popoverForeground: 'rgb(70, 70, 80)',
      primary: 'rgb(88, 86, 214)',
      primaryForeground: 'rgb(250, 250, 252)',
      secondary: 'rgb(235, 235, 240)',
      secondaryForeground: 'rgb(70, 70, 80)',
      muted: 'rgb(240, 240, 245)',
      mutedForeground: 'rgb(120, 120, 135)',
      accent: 'rgb(18, 183, 106)',
      accentForeground: 'rgb(250, 250, 252)',
      destructive: 'rgb(239, 68, 68)',
      destructiveForeground: 'rgb(250, 250, 252)',
      border: 'rgb(220, 220, 230)',
      input: 'rgb(220, 220, 230)',
      ring: 'rgb(18, 183, 106)',
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
      background: 'rgb(30, 30, 40)',
      foreground: 'rgb(230, 230, 235)',
      card: 'rgb(30, 30, 40)',
      cardForeground: 'rgb(230, 230, 235)',
      popover: 'rgb(45, 45, 60)',
      popoverForeground: 'rgb(230, 230, 235)',
      primary: 'rgb(118, 116, 229)',
      primaryForeground: 'rgb(30, 30, 40)',
      secondary: 'rgb(55, 55, 70)',
      secondaryForeground: 'rgb(230, 230, 235)',
      muted: 'rgb(50, 50, 65)',
      mutedForeground: 'rgb(160, 160, 175)',
      accent: 'rgb(79, 215, 142)',
      accentForeground: 'rgb(30, 30, 40)',
      destructive: 'rgb(248, 113, 113)',
      destructiveForeground: 'rgb(245, 245, 250)',
      border: 'rgb(70, 70, 90)',
      input: 'rgb(70, 70, 90)',
      ring: 'rgb(79, 215, 142)',
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
