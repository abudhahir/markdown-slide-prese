import { Card } from '@/components/ui/card'
import { MarkdownRenderer } from './MarkdownRenderer'
import { motion, AnimatePresence } from 'framer-motion'
import type { Slide } from '@/lib/markdown-parser'

interface SlideContainerProps {
  slide: Slide
  direction: number
}

export function SlideContainer({ slide, direction }: SlideContainerProps) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={slide.id}
        custom={direction}
        initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="w-full h-full flex items-center justify-center"
      >
        <Card className="w-full h-full border-0 bg-transparent shadow-none flex items-center justify-center p-8 md:p-16">
          <div className="w-full max-w-5xl overflow-y-auto max-h-full">
            <MarkdownRenderer content={slide.content} />
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
