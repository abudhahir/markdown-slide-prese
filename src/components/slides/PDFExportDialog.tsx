import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { FilePdf, Check, X } from '@phosphor-icons/react'
import { toast } from 'sonner'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { marked } from 'marked'
import type { Slide } from '@/lib/markdown-parser'

interface PDFExportDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  slides: Slide[]
  fileName: string
}

export function PDFExportDialog({ isOpen, onOpenChange, slides, fileName }: PDFExportDialogProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [exportStatus, setExportStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const exportToPDF = async () => {
    if (slides.length === 0) {
      toast.error('No slides to export')
      return
    }

    setIsExporting(true)
    setProgress(0)
    setExportStatus('idle')

    try {
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [1920, 1080],
        compress: true
      })

      const slideWidth = 1920
      const slideHeight = 1080

      const computedStyles = window.getComputedStyle(document.documentElement)
      
      const oklchToRgb = (oklchStr: string): string => {
        const match = oklchStr.match(/oklch\s*\(\s*([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)(?:\s*\/\s*([0-9.%]+))?\s*\)/)
        if (!match) return oklchStr
        
        const L = parseFloat(match[1])
        const C = parseFloat(match[2])
        const H = parseFloat(match[3])
        const alpha = match[4] ? (match[4].includes('%') ? parseFloat(match[4]) / 100 : parseFloat(match[4])) : 1
        
        const hRad = (H * Math.PI) / 180
        const a = C * Math.cos(hRad)
        const b = C * Math.sin(hRad)
        
        let X = L + 0.3963377774 * a + 0.2158037573 * b
        let Y = L - 0.1055613458 * a - 0.0638541728 * b
        let Z = L - 0.0894841775 * a - 1.2914855480 * b
        
        X = X * X * X
        Y = Y * Y * Y
        Z = Z * Z * Z
        
        let r = 3.2404542 * X - 1.5371385 * Y - 0.4985314 * Z
        let g = -0.9692660 * X + 1.8760108 * Y + 0.0415560 * Z
        let bl = 0.0556434 * X - 0.2040259 * Y + 1.0572252 * Z
        
        r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r
        g = g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : 12.92 * g
        bl = bl > 0.0031308 ? 1.055 * Math.pow(bl, 1 / 2.4) - 0.055 : 12.92 * bl
        
        r = Math.max(0, Math.min(255, Math.round(r * 255)))
        g = Math.max(0, Math.min(255, Math.round(g * 255)))
        bl = Math.max(0, Math.min(255, Math.round(bl * 255)))
        
        if (alpha < 1) {
          return `rgba(${r}, ${g}, ${bl}, ${alpha})`
        }
        return `rgb(${r}, ${g}, ${bl})`
      }
      
      const getColor = (varName: string, fallback: string): string => {
        const value = computedStyles.getPropertyValue(varName).trim()
        if (!value) return fallback
        
        if (value.startsWith('oklch(')) {
          return oklchToRgb(value)
        }
        
        return value
      }

      const bgColor = getColor('--background', 'rgb(255, 255, 255)')
      const fgColor = getColor('--foreground', 'rgb(0, 0, 0)')
      const primaryColor = getColor('--primary', 'rgba(139, 92, 246, 0.8)')
      const primaryFgColor = getColor('--primary-foreground', 'rgb(255, 255, 255)')
      const accentColor = getColor('--accent', 'rgba(139, 92, 246, 0.8)')
      const mutedFgColor = getColor('--muted-foreground', 'rgb(102, 102, 102)')
      
      const fontHeading = computedStyles.getPropertyValue('--font-heading').trim() || 'sans-serif'
      const fontBody = computedStyles.getPropertyValue('--font-body').trim() || 'sans-serif'
      const fontCode = computedStyles.getPropertyValue('--font-code').trim() || 'monospace'

      await document.fonts.ready

      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i]
        
        const html = await marked.parse(slide.content)
        
        const tempDiv = document.createElement('div')
        tempDiv.style.width = `${slideWidth}px`
        tempDiv.style.height = `${slideHeight}px`
        tempDiv.style.position = 'absolute'
        tempDiv.style.left = '-9999px'
        tempDiv.style.top = '0'
        tempDiv.style.overflow = 'hidden'
        tempDiv.style.display = 'flex'
        tempDiv.style.alignItems = 'center'
        tempDiv.style.justifyContent = 'center'
        tempDiv.style.padding = '128px'
        tempDiv.style.backgroundColor = bgColor
        tempDiv.style.color = fgColor

        const contentDiv = document.createElement('div')
        contentDiv.className = 'markdown-content'
        contentDiv.style.width = '100%'
        contentDiv.style.maxWidth = '1280px'
        contentDiv.innerHTML = html

        const styles = document.createElement('style')
        styles.textContent = `
          .markdown-content {
            font-family: ${fontBody};
            color: ${fgColor};
          }
          .markdown-content h1 {
            font-family: ${fontHeading};
            font-size: 60px;
            font-weight: 700;
            margin-bottom: 32px;
            line-height: 1.15;
            color: ${fgColor};
          }
          .markdown-content h2 {
            font-family: ${fontHeading};
            font-size: 48px;
            font-weight: 600;
            margin-bottom: 24px;
            line-height: 1.2;
            color: ${fgColor};
          }
          .markdown-content h3 {
            font-family: ${fontHeading};
            font-size: 36px;
            font-weight: 500;
            margin-bottom: 20px;
            line-height: 1.3;
            color: ${fgColor};
          }
          .markdown-content p {
            font-size: 24px;
            margin-bottom: 24px;
            line-height: 1.6;
            color: ${fgColor};
          }
          .markdown-content ul, .markdown-content ol {
            font-size: 24px;
            margin-bottom: 24px;
            padding-left: 32px;
            color: ${fgColor};
          }
          .markdown-content li {
            margin-bottom: 12px;
            line-height: 1.6;
          }
          .markdown-content code {
            font-family: ${fontCode};
            background-color: ${primaryColor};
            color: ${primaryFgColor};
            padding: 10px 12px;
            border-radius: 4px;
            font-size: 20px;
          }
          .markdown-content pre {
            font-family: ${fontCode};
            background-color: ${primaryColor};
            color: ${primaryFgColor};
            padding: 24px;
            border-radius: 8px;
            margin-bottom: 24px;
            overflow-x: auto;
            font-size: 18px;
            line-height: 1.5;
          }
          .markdown-content pre code {
            background-color: transparent;
            padding: 0;
            font-size: 18px;
            color: inherit;
          }
          .markdown-content blockquote {
            border-left: 4px solid ${accentColor};
            padding-left: 24px;
            font-style: italic;
            margin-bottom: 24px;
            font-size: 24px;
            line-height: 1.6;
            color: ${fgColor};
          }
          .markdown-content a {
            text-decoration: underline;
            color: ${accentColor};
          }
          .markdown-content strong {
            font-weight: 600;
            color: ${accentColor};
          }
          .markdown-content hr {
            margin: 32px 0;
            border-color: ${fgColor};
            opacity: 0.3;
          }
          .markdown-content img {
            border-radius: 8px;
            max-width: 100%;
            height: auto;
            margin: 24px 0;
          }
        `
        tempDiv.appendChild(styles)
        tempDiv.appendChild(contentDiv)
        document.body.appendChild(tempDiv)

        await new Promise(resolve => setTimeout(resolve, 100))

        const canvas = await html2canvas(tempDiv, {
          backgroundColor: bgColor,
          scale: 1.5,
          logging: false,
          useCORS: true,
          allowTaint: true,
          width: slideWidth,
          height: slideHeight,
          windowWidth: slideWidth,
          windowHeight: slideHeight,
          onclone: (clonedDoc) => {
            const clonedDiv = clonedDoc.querySelector('div') as HTMLElement
            if (clonedDiv) {
              clonedDiv.style.transform = 'none'
            }
          }
        })

        document.body.removeChild(tempDiv)

        if (!canvas || canvas.width === 0 || canvas.height === 0) {
          throw new Error(`Failed to render slide ${i + 1}`)
        }

        const imgData = canvas.toDataURL('image/png', 0.95)

        if (i > 0) {
          pdf.addPage()
        }

        pdf.addImage(imgData, 'PNG', 0, 0, slideWidth, slideHeight, undefined, 'FAST')

        setProgress(((i + 1) / slides.length) * 100)
      }

      const pdfFileName = fileName.replace(/\.md$|\.markdown$/i, '') + '.pdf'
      pdf.save(pdfFileName)

      setExportStatus('success')
      toast.success(`PDF exported successfully: ${pdfFileName}`)
      
      setTimeout(() => {
        onOpenChange(false)
        setIsExporting(false)
        setProgress(0)
        setExportStatus('idle')
      }, 2000)

    } catch (error) {
      console.error('PDF export error:', error)
      setExportStatus('error')
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      toast.error(`Failed to export PDF: ${errorMessage}`)
      setIsExporting(false)
    }
  }

  const handleClose = () => {
    if (!isExporting) {
      onOpenChange(false)
      setProgress(0)
      setExportStatus('idle')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FilePdf className="text-destructive" size={24} />
            Export to PDF
          </DialogTitle>
          <DialogDescription>
            Export all {slides.length} slide{slides.length !== 1 ? 's' : ''} to a PDF file
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {isExporting && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Generating PDF...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {exportStatus === 'success' && (
            <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md">
              <Check className="text-green-600 dark:text-green-400" size={20} />
              <span className="text-sm text-green-800 dark:text-green-200">
                PDF exported successfully!
              </span>
            </div>
          )}

          {exportStatus === 'error' && (
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-md">
              <X className="text-red-600 dark:text-red-400" size={20} />
              <span className="text-sm text-red-800 dark:text-red-200">
                Export failed. Please try again.
              </span>
            </div>
          )}

          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isExporting}
            >
              Cancel
            </Button>
            <Button
              onClick={exportToPDF}
              disabled={isExporting || exportStatus === 'success'}
              className="gap-2"
            >
              <FilePdf size={18} />
              {isExporting ? 'Exporting...' : 'Export PDF'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
