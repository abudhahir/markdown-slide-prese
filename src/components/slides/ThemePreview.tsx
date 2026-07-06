import { Theme } from '@/lib/themes'
import { cn } from '@/lib/utils'

interface ThemePreviewProps {
  theme: Theme
  className?: string
}

const oklchToRgb = (l: number, c: number, h: number): [number, number, number] => {
  const hRad = h * Math.PI / 180
  const a = c * Math.cos(hRad)
  const b = c * Math.sin(hRad)
  
  const L = l * 100
  const A = a * 125
  const B = b * 125
  
  let x = L + 0.3963377774 * A + 0.2158037573 * B
  let y = L - 0.1055613458 * A - 0.0638541728 * B
  let z = L - 0.0894841775 * A - 1.2914855480 * B
  
  x = x / 100
  y = y / 100
  z = z / 100
  
  const toLinear = (c: number) => {
    const abs = Math.abs(c)
    if (abs <= 0.04045) return c / 12.92
    return Math.sign(c) * Math.pow((abs + 0.055) / 1.055, 2.4)
  }
  
  let r = toLinear(x * 3.2406 + y * -1.5372 + z * -0.4986)
  let g = toLinear(x * -0.9689 + y * 1.8758 + z * 0.0415)
  let bl = toLinear(x * 0.0557 + y * -0.2040 + z * 1.0570)
  
  const toGamma = (c: number) => {
    const abs = Math.abs(c)
    if (abs > 0.0031308) {
      return Math.sign(c) * (1.055 * Math.pow(abs, 1 / 2.4) - 0.055)
    }
    return 12.92 * c
  }
  
  r = toGamma(r)
  g = toGamma(g)
  bl = toGamma(bl)
  
  r = Math.max(0, Math.min(255, Math.round(r * 255)))
  g = Math.max(0, Math.min(255, Math.round(g * 255)))
  bl = Math.max(0, Math.min(255, Math.round(bl * 255)))
  
  return [r, g, bl]
}

const convertOklchToRgb = (oklchString: string): string => {
  const match = oklchString.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*([\d.]+%?))?\)/)
  if (match) {
    const l = parseFloat(match[1])
    const c = parseFloat(match[2])
    const h = parseFloat(match[3])
    const alpha = match[4] ? (match[4].includes('%') ? parseFloat(match[4]) / 100 : parseFloat(match[4])) : 1
    
    const [r, g, bl] = oklchToRgb(l, c, h)
    return alpha < 1 ? `rgba(${r}, ${g}, ${bl}, ${alpha})` : `rgb(${r}, ${g}, ${bl})`
  }
  return oklchString
}

export function ThemePreview({ theme, className }: ThemePreviewProps) {
  const bgColor = convertOklchToRgb(theme.colors.background)
  const fgColor = convertOklchToRgb(theme.colors.foreground)
  const primaryColor = convertOklchToRgb(theme.colors.primary)
  const mutedFgColor = convertOklchToRgb(theme.colors.mutedForeground)
  const accentColor = convertOklchToRgb(theme.colors.accent)
  const accentFgColor = convertOklchToRgb(theme.colors.accentForeground)
  const borderColor = convertOklchToRgb(theme.colors.border)

  return (
    <div 
      className={cn("relative w-full aspect-[16/10] rounded-md overflow-hidden border-2", className)}
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
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
            color: fgColor,
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
            style={{ backgroundColor: primaryColor, width: '80%' }}
          />
          <div 
            className="h-1 rounded-full"
            style={{ backgroundColor: mutedFgColor, width: '90%' }}
          />
          <div 
            className="h-1 rounded-full"
            style={{ backgroundColor: mutedFgColor, width: '70%' }}
          />
        </div>

        <div 
          className="mt-1 px-2 py-1 rounded text-[0.5rem]"
          style={{
            backgroundColor: accentColor,
            color: accentFgColor,
            fontFamily: theme.fonts.code,
          }}
        >
          code
        </div>
      </div>
    </div>
  )
}
