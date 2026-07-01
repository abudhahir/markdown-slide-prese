export interface Slide {
  id: string
  content: string
  rawContent: string
}

export function parseMarkdownToSlides(markdown: string): Slide[] {
  if (!markdown || markdown.trim().length === 0) {
    return []
  }

  const slides = markdown
    .split(/^---$/gm)
    .map((slideContent, index) => slideContent.trim())
    .filter(content => content.length > 0)
    .map((content, index) => ({
      id: `slide-${index}`,
      content: content,
      rawContent: content
    }))

  return slides.length > 0 ? slides : []
}
