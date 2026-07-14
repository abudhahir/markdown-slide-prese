import { useState } from 'react'
import { SlidePresentation } from '@/components/slides/SlidePresentation'
import { toast, Toaster } from 'sonner'
import defaultMarkdown from '../examples/quick-reference.md?raw'

function App() {
  const [markdown, setMarkdown] = useState(defaultMarkdown)

  const handleMarkdownChange = (newMarkdown: string, fileName: string) => {
    setMarkdown(newMarkdown)
    toast.success(`Loaded ${fileName}`)
  }

  return (
    <>
      <SlidePresentation markdown={markdown} onMarkdownChange={handleMarkdownChange} />
      <Toaster position="top-center" />
    </>
  )
}

export default App
