export interface Theme {
  name: string
  label: string
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
    name: 'midnight',
    label: 'Midnight',
    colors: {
      background: 'oklch(0.25 0.08 265)',
      foreground: 'oklch(1 0 0)',
      card: 'oklch(0.25 0.08 265)',
      cardForeground: 'oklch(1 0 0)',
      popover: 'oklch(0.35 0.02 265)',
      popoverForeground: 'oklch(1 0 0)',
      primary: 'oklch(0.45 0.12 285)',
      primaryForeground: 'oklch(1 0 0)',
      secondary: 'oklch(0.35 0.02 265)',
      secondaryForeground: 'oklch(1 0 0)',
      muted: 'oklch(0.30 0.05 265)',
      mutedForeground: 'oklch(0.70 0.05 265)',
      accent: 'oklch(0.75 0.15 195)',
      accentForeground: 'oklch(0.25 0.08 265)',
      destructive: 'oklch(0.577 0.245 27.325)',
      destructiveForeground: 'oklch(1 0 0)',
      border: 'oklch(0.40 0.06 265)',
      input: 'oklch(0.40 0.06 265)',
      ring: 'oklch(0.75 0.15 195)',
    },
  },
  {
    name: 'forest',
    label: 'Forest',
    colors: {
      background: 'oklch(0.22 0.06 160)',
      foreground: 'oklch(0.98 0.01 160)',
      card: 'oklch(0.22 0.06 160)',
      cardForeground: 'oklch(0.98 0.01 160)',
      popover: 'oklch(0.28 0.05 160)',
      popoverForeground: 'oklch(0.98 0.01 160)',
      primary: 'oklch(0.42 0.12 165)',
      primaryForeground: 'oklch(0.98 0.01 160)',
      secondary: 'oklch(0.28 0.05 160)',
      secondaryForeground: 'oklch(0.98 0.01 160)',
      muted: 'oklch(0.32 0.04 160)',
      mutedForeground: 'oklch(0.72 0.04 160)',
      accent: 'oklch(0.78 0.16 145)',
      accentForeground: 'oklch(0.22 0.06 160)',
      destructive: 'oklch(0.577 0.245 27.325)',
      destructiveForeground: 'oklch(1 0 0)',
      border: 'oklch(0.38 0.05 160)',
      input: 'oklch(0.38 0.05 160)',
      ring: 'oklch(0.78 0.16 145)',
    },
  },
  {
    name: 'sunset',
    label: 'Sunset',
    colors: {
      background: 'oklch(0.28 0.08 35)',
      foreground: 'oklch(0.98 0.01 35)',
      card: 'oklch(0.28 0.08 35)',
      cardForeground: 'oklch(0.98 0.01 35)',
      popover: 'oklch(0.35 0.06 35)',
      popoverForeground: 'oklch(0.98 0.01 35)',
      primary: 'oklch(0.55 0.18 40)',
      primaryForeground: 'oklch(0.98 0.01 35)',
      secondary: 'oklch(0.35 0.06 35)',
      secondaryForeground: 'oklch(0.98 0.01 35)',
      muted: 'oklch(0.32 0.06 35)',
      mutedForeground: 'oklch(0.72 0.05 35)',
      accent: 'oklch(0.75 0.20 55)',
      accentForeground: 'oklch(0.15 0.04 35)',
      destructive: 'oklch(0.577 0.245 27.325)',
      destructiveForeground: 'oklch(1 0 0)',
      border: 'oklch(0.42 0.07 35)',
      input: 'oklch(0.42 0.07 35)',
      ring: 'oklch(0.75 0.20 55)',
    },
  },
  {
    name: 'ocean',
    label: 'Ocean',
    colors: {
      background: 'oklch(0.20 0.06 235)',
      foreground: 'oklch(0.98 0.01 235)',
      card: 'oklch(0.20 0.06 235)',
      cardForeground: 'oklch(0.98 0.01 235)',
      popover: 'oklch(0.28 0.05 235)',
      popoverForeground: 'oklch(0.98 0.01 235)',
      primary: 'oklch(0.48 0.14 220)',
      primaryForeground: 'oklch(0.98 0.01 235)',
      secondary: 'oklch(0.28 0.05 235)',
      secondaryForeground: 'oklch(0.98 0.01 235)',
      muted: 'oklch(0.30 0.04 235)',
      mutedForeground: 'oklch(0.70 0.04 235)',
      accent: 'oklch(0.72 0.18 195)',
      accentForeground: 'oklch(0.20 0.06 235)',
      destructive: 'oklch(0.577 0.245 27.325)',
      destructiveForeground: 'oklch(1 0 0)',
      border: 'oklch(0.38 0.05 235)',
      input: 'oklch(0.38 0.05 235)',
      ring: 'oklch(0.72 0.18 195)',
    },
  },
  {
    name: 'ember',
    label: 'Ember',
    colors: {
      background: 'oklch(0.18 0.04 20)',
      foreground: 'oklch(0.98 0.01 20)',
      card: 'oklch(0.18 0.04 20)',
      cardForeground: 'oklch(0.98 0.01 20)',
      popover: 'oklch(0.25 0.04 20)',
      popoverForeground: 'oklch(0.98 0.01 20)',
      primary: 'oklch(0.52 0.22 25)',
      primaryForeground: 'oklch(0.98 0.01 20)',
      secondary: 'oklch(0.25 0.04 20)',
      secondaryForeground: 'oklch(0.98 0.01 20)',
      muted: 'oklch(0.28 0.03 20)',
      mutedForeground: 'oklch(0.68 0.03 20)',
      accent: 'oklch(0.68 0.24 35)',
      accentForeground: 'oklch(0.98 0.01 20)',
      destructive: 'oklch(0.577 0.245 27.325)',
      destructiveForeground: 'oklch(1 0 0)',
      border: 'oklch(0.35 0.04 20)',
      input: 'oklch(0.35 0.04 20)',
      ring: 'oklch(0.68 0.24 35)',
    },
  },
  {
    name: 'lavender',
    label: 'Lavender',
    colors: {
      background: 'oklch(0.26 0.07 300)',
      foreground: 'oklch(0.98 0.01 300)',
      card: 'oklch(0.26 0.07 300)',
      cardForeground: 'oklch(0.98 0.01 300)',
      popover: 'oklch(0.32 0.06 300)',
      popoverForeground: 'oklch(0.98 0.01 300)',
      primary: 'oklch(0.52 0.16 310)',
      primaryForeground: 'oklch(0.98 0.01 300)',
      secondary: 'oklch(0.32 0.06 300)',
      secondaryForeground: 'oklch(0.98 0.01 300)',
      muted: 'oklch(0.35 0.05 300)',
      mutedForeground: 'oklch(0.75 0.05 300)',
      accent: 'oklch(0.78 0.18 320)',
      accentForeground: 'oklch(0.15 0.04 300)',
      destructive: 'oklch(0.577 0.245 27.325)',
      destructiveForeground: 'oklch(1 0 0)',
      border: 'oklch(0.40 0.06 300)',
      input: 'oklch(0.40 0.06 300)',
      ring: 'oklch(0.78 0.18 320)',
    },
  },
]

export function applyTheme(theme: Theme) {
  const root = document.documentElement
  Object.entries(theme.colors).forEach(([key, value]) => {
    const cssVarName = key.replace(/([A-Z])/g, '-$1').toLowerCase()
    root.style.setProperty(`--${cssVarName}`, value)
  })
}

export function getThemeByName(name: string): Theme | undefined {
  return themes.find(theme => theme.name === name)
}
