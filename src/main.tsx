import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from "react-error-boundary";
import "@github/spark/spark"

import App from './App.tsx'
import { ErrorFallback } from './ErrorFallback.tsx'

import "./main.css"
import "./styles/theme.css"
import "./index.css"

const isResizeObserverError = (message: string) => {
  return message.includes('ResizeObserver loop') ||
         message.includes('ResizeObserver loop completed with undelivered notifications') ||
         message.includes('ResizeObserver loop limit exceeded')
}

const originalConsoleError = console.error
console.error = (...args) => {
  const errorMessage = args[0]?.toString() || ''
  if (isResizeObserverError(errorMessage)) {
    return
  }
  originalConsoleError.apply(console, args)
}

const originalConsoleWarn = console.warn
console.warn = (...args) => {
  const warnMessage = args[0]?.toString() || ''
  if (isResizeObserverError(warnMessage)) {
    return
  }
  originalConsoleWarn.apply(console, args)
}

const resizeObserverErrorHandler = (event: ErrorEvent) => {
  const message = event.message || event.error?.message || ''
  if (isResizeObserverError(message)) {
    event.preventDefault()
    event.stopImmediatePropagation()
    return false
  }
}

window.addEventListener('error', resizeObserverErrorHandler, true)

const unhandledRejectionHandler = (event: PromiseRejectionEvent) => {
  const message = event.reason?.message || event.reason?.toString() || ''
  if (isResizeObserverError(message)) {
    event.preventDefault()
    event.stopImmediatePropagation()
  }
}

window.addEventListener('unhandledrejection', unhandledRejectionHandler, true)

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <App />
   </ErrorBoundary>
)
