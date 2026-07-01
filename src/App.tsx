import { useState } from 'react'
import { SlidePresentation } from '@/components/slides/SlidePresentation'
import { toast, Toaster } from 'sonner'

const sampleMarkdown = `# Welcome to Markdown Slides

A modern, full-screen presentation system built with React

---

## Features

- **Markdown-based** - Write slides in familiar syntax
- **Keyboard Navigation** - Arrow keys, spacebar
- **Touch Support** - Swipe gestures on mobile
- **Smooth Transitions** - Polished animations

---

## How It Works

Separate your slides using three dashes:

\`\`\`
---
\`\`\`

Each section becomes a new slide

---

### Code Examples

Here's some code in a slide:

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`
}
\`\`\`

Syntax highlighting included!

---

## Rich Content

You can include:

1. **Lists** - Ordered and unordered
2. *Emphasis* - Italic and bold text
3. \`Code\` - Inline code blocks
4. Links and more...

---

## Navigation Controls

- **Arrow Keys** → Navigate between slides
- **Spacebar** → Go to next slide
- **Touch** → Swipe left/right on mobile
- **T Key** → Toggle theme selector
- **O Key** → Open file selector

---

# Thank You!

Start creating your own presentations with markdown

*Press → to see the first slide again*
`

function App() {
  const [markdown, setMarkdown] = useState(sampleMarkdown)

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