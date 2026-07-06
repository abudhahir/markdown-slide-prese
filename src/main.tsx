import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from "react-error-boundary";
import "@github/spark/spark"

import App from './App.tsx'
import { ErrorFallback } from './ErrorFallback.tsx'

import "./main.css"
import "./styles/theme.css"
import "./index.css"

const isResizeObserverError = (message: string) => {
  if (!message || typeof message !== 'string') return false
  return message.toLowerCase().includes('resizeobserver')
}

const originalConsoleError = console.error
console.error = (...args: unknown[]) => {
  if (args.length > 0) {
    const firstArg = args[0]
    const errorMessage = typeof firstArg === 'string' ? firstArg : (firstArg?.message || firstArg?.toString() || '')
    if (isResizeObserverError(errorMessage)) {
      return
    }
  }
  originalConsoleError.apply(console, args)
}

const originalConsoleWarn = console.warn
console.warn = (...args: unknown[]) => {
  if (args.length > 0) {
    const firstArg = args[0]
    const warnMessage = typeof firstArg === 'string' ? firstArg : (firstArg?.message || firstArg?.toString() || '')
    if (isResizeObserverError(warnMessage)) {
      return
    }
  }
  originalConsoleWarn.apply(console, args)
}

const resizeObserverErrorHandler = (event: ErrorEvent) => {
  const message = event.message || event.error?.message || event.error?.toString() || ''
  if (isResizeObserverError(message)) {
    event.preventDefault()
    event.stopImmediatePropagation()
    return false
  }
}

window.addEventListener('error', resizeObserverErrorHandler, { capture: true })

const unhandledRejectionHandler = (event: PromiseRejectionEvent) => {
  const reason = event.reason
  const message = typeof reason === 'string' ? reason : (reason?.message || reason?.toString() || '')
  if (isResizeObserverError(message)) {
    event.preventDefault()
    event.stopImmediatePropagation()
  }
}

window.addEventListener('unhandledrejection', unhandledRejectionHandler, { capture: true })

if (typeof window !== 'undefined') {
  const debounce = <T extends unknown[]>(fn: (...args: T) => void, delay: number) => {
    let timeoutId: number | null = null
    return (...args: T): void => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = window.setTimeout(() => fn(...args), delay)
    }
  }

  const OriginalResizeObserver = window.ResizeObserver
  window.ResizeObserver = class extends OriginalResizeObserver {
    constructor(callback: ResizeObserverCallback) {
      const wrappedCallback = debounce((entries: ResizeObserverEntry[], observer: ResizeObserver) => {
        window.requestAnimationFrame(() => {
          try {
            callback(entries, observer)
          } catch (error) {
            const message = error instanceof Error ? error.message : String(error)
            if (!isResizeObserverError(message)) {
              throw error
            }
          }
        })
      }, 16)
      super(wrappedCallback)
    }
  }
}

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <App />
   </ErrorBoundary>
)
