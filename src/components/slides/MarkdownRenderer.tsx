import { marked } from 'marked'
import { useEffect, useRef, useMemo } from 'react'
import DOMPurify from 'dompurify'
import mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: false,
  theme: 'neutral',
  securityLevel: 'loose',
  flowchart: { useMaxWidth: true, htmlLabels: false },
  sequence: { useMaxWidth: true, htmlLabels: false },
})

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const html = useMemo(() => {
    const raw = marked.parse(content, { async: false }) as string
    return DOMPurify.sanitize(raw, { ADD_TAGS: ['foreignObject'] })
  }, [content])

  useEffect(() => {
    if (!containerRef.current) return
    const codeBlocks = containerRef.current.querySelectorAll<HTMLElement>('pre code.language-mermaid')
    if (codeBlocks.length === 0) return

    codeBlocks.forEach(async (code, i) => {
      const diagram = code.textContent || ''
      const id = `mermaid-${Date.now()}-${i}`
      try {
        const { svg } = await mermaid.render(id, diagram)
        const wrapper = document.createElement('div')
        wrapper.className = 'mermaid-diagram'
        wrapper.innerHTML = svg
        // make SVG responsive: remove fixed width/height, keep viewBox
        const svgEl = wrapper.querySelector('svg')
        if (svgEl) {
          // remove width="100%" set by mermaid useMaxWidth; let CSS handle sizing
          svgEl.removeAttribute('width')
          svgEl.removeAttribute('height')
        }
        code.parentElement?.replaceWith(wrapper)
      } catch {
        // leave original code block on render error
      }
    })
  }, [html])

  return (
    <div
      ref={containerRef}
      className="markdown-content prose prose-invert prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
