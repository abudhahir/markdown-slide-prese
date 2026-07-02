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
  if (errorMessage.includes('ResizeObserver loop completed with undelivered notifications')) {
    return
  }
  originalConsoleError.apply(console, args)
}

window.addEventListener('error', (event) => {
  if (event.message.includes('ResizeObserver loop completed with undelivered notifications')) {
    event.preventDefault()
    event.stopPropagation()
  }
})

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <App />
   </ErrorBoundary>
)
