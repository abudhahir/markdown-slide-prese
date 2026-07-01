import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Play, Pause, ArrowClockwise } from '@phosphor-icons/react'

interface PresentationTimerProps {
  isRunning?: boolean
}

export function PresentationTimer({ isRunning: externalControl }: PresentationTimerProps) {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(externalControl ?? true)

  useEffect(() => {
    if (externalControl !== undefined) {
      setIsRunning(externalControl)
    }
  }, [externalControl])

  useEffect(() => {
    let interval: number | undefined

    if (isRunning) {
      interval = window.setInterval(() => {
        setSeconds(prev => prev + 1)
      }, 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isRunning])

  const toggleTimer = () => {
    setIsRunning(prev => !prev)
  }

  const resetTimer = () => {
    setSeconds(0)
    setIsRunning(true)
  }

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const secs = totalSeconds % 60

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    }
    return `${minutes}:${String(secs).padStart(2, '0')}`
  }

  return (
    <div className="flex items-center gap-2 bg-secondary/80 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 shadow-lg">
      <div className="font-mono text-foreground text-lg font-medium tracking-tight min-w-[4.5rem] text-center">
        {formatTime(seconds)}
      </div>
      
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTimer}
          className="h-8 w-8 rounded-full hover:bg-accent/20 transition-all duration-200"
          aria-label={isRunning ? 'Pause timer' : 'Start timer'}
        >
          {isRunning ? (
            <Pause className="text-foreground" size={16} weight="fill" />
          ) : (
            <Play className="text-foreground" size={16} weight="fill" />
          )}
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={resetTimer}
          className="h-8 w-8 rounded-full hover:bg-accent/20 transition-all duration-200"
          aria-label="Reset timer"
        >
          <ArrowClockwise className="text-foreground" size={16} />
        </Button>
      </div>
    </div>
  )
}
