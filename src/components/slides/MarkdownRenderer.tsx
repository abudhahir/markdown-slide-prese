import { marked } from 'marked'
import { useEffect, useState } from 'react'

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [html, setHtml] = useState('')

  useEffect(() => {
    const renderMarkdown = async () => {
      const rendered = await marked.parse(content)
      setHtml(rendered)
    }
    renderMarkdown()
  }, [content])

  return (
    <div 
      className="markdown-content prose prose-invert prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
