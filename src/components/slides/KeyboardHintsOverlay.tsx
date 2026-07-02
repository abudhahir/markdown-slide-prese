import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { 
  ArrowRight, 
  ArrowLeft, 
  Palette, 
  FolderOpen, 
  ListBullets,
  Question,
  ArrowsOut,
  FileText,
  FilePdf,
  X
} from '@phosphor-icons/react'

interface KeyboardHint {
  keys: string[]
  description: string
  icon?: React.ReactNode
}

const keyboardHints: KeyboardHint[] = [
  {
    keys: ['→', '↓', 'Space'],
    description: 'Next slide',
    icon: <ArrowRight weight="bold" />
  },
  {
    keys: ['←', '↑'],
    description: 'Previous slide',
    icon: <ArrowLeft weight="bold" />
  },
  {
    keys: ['S'],
    description: 'Show slides list',
    icon: <ListBullets weight="bold" />
  },
  {
    keys: ['T'],
    description: 'Toggle theme',
    icon: <Palette weight="bold" />
  },
  {
    keys: ['O'],
    description: 'Open file',
    icon: <FolderOpen weight="bold" />
  },
  {
    keys: ['D'],
    description: 'Display file name',
    icon: <FileText weight="bold" />
  },
  {
    keys: ['F'],
    description: 'Fullscreen',
    icon: <ArrowsOut weight="bold" />
  },
  {
    keys: ['P'],
    description: 'Export to PDF',
    icon: <FilePdf weight="bold" />
  },
  {
    keys: ['?'],
    description: 'Show all commands',
    icon: <Question weight="bold" />
  }
]

export function KeyboardHintsOverlay() {
  const [hasSeenHints, setHasSeenHints] = useKV('keyboard-hints-seen', 'false')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (hasSeenHints !== 'true') {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [hasSeenHints])

  const handleDismiss = () => {
    setIsVisible(false)
    setHasSeenHints('true')
  }

  useEffect(() => {
    if (isVisible) {
      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Escape' || e.key === '?') {
          e.preventDefault()
          handleDismiss()
        }
      }
      window.addEventListener('keydown', handleKeyPress)
      return () => window.removeEventListener('keydown', handleKeyPress)
    }
  }, [isVisible])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md"
          onClick={handleDismiss}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-4xl w-full mx-4 p-8 md:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDismiss}
              className="absolute top-4 right-4 h-8 w-8 rounded-full hover:bg-muted"
              aria-label="Close keyboard hints"
            >
              <X size={20} />
            </Button>

            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground mb-4"
              >
                <Question size={32} weight="bold" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Keyboard Shortcuts</h2>
              <p className="text-muted-foreground text-lg">Master these shortcuts for seamless presenting</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {keyboardHints.map((hint, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                  className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    {hint.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      {hint.keys.map((key, keyIndex) => (
                        <span key={keyIndex} className="inline-flex items-center">
                          <kbd className="px-2.5 py-1.5 text-sm font-semibold bg-muted text-foreground rounded border border-border shadow-sm">
                            {key}
                          </kbd>
                          {keyIndex < hint.keys.length - 1 && (
                            <span className="text-muted-foreground mx-1">/</span>
                          )}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{hint.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center space-y-3"
            >
              <Button
                onClick={handleDismiss}
                size="lg"
                className="px-8"
              >
                Got it, let's start!
              </Button>
              <p className="text-sm text-muted-foreground">
                Press <kbd className="px-2 py-1 text-xs font-semibold bg-muted text-foreground rounded border border-border">?</kbd> anytime to view all commands
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
