import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from "react-error-boundary";
import "@github/spark/spark"

import App from './App.tsx'
import { ErrorFallback } from './ErrorFallback.tsx'

import "./main.css"
import "./styles/theme.css"
import "./index.css"

const originalConsoleError = console.error
console.error = (...args) => {
  const errorMessage = args[0]?.toString() || ''
  if (errorMessage.includes('ResizeObserver loop completed with undelivered notifications') ||
      errorMessage.includes('ResizeObserver loop limit exceeded')) {
    return
  }
  originalConsoleError.apply(console, args)
}

window.addEventListener('error', (event) => {
  if (event.message && (
    event.message.includes('ResizeObserver loop completed with undelivered notifications') ||
    event.message.includes('ResizeObserver loop limit exceeded')
  )) {
    event.preventDefault()
    event.stopPropagation()
    return false
  }
})

const resizeObserverErrorHandler = (e: ErrorEvent) => {
  if (e.message && (
    e.message.includes('ResizeObserver') ||
    e.error?.message?.includes('ResizeObserver')
  )) {
    e.preventDefault()
    e.stopImmediatePropagation()
    return false
  }
}

window.addEventListener('error', resizeObserverErrorHandler, true)

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <App />
   </ErrorBoundary>
)
