export interface Slide {
  id: string
  content: string
}

function hashContent(content: string): string {
  let hash = 0
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return Math.abs(hash).toString(36)
}

export function parseMarkdownToSlides(markdown: string): Slide[] {
  if (!markdown || markdown.trim().length === 0) {
    return []
  }

  const slides = markdown
    .split(/^---$/gm)
    .map((slideContent) => slideContent.trim())
    .filter(content => content.length > 0)
    .map((content, index) => ({
      id: `slide-${index}-${hashContent(content)}`,
      content: content,
    }))

  return slides
}
