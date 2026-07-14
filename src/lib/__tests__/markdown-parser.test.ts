import { describe, it, expect } from 'vitest'
import { parseMarkdownToSlides } from '../markdown-parser'

describe('parseMarkdownToSlides', () => {
  describe('empty/invalid input', () => {
    it('returns empty array for empty string', () => {
      expect(parseMarkdownToSlides('')).toEqual([])
    })

    it('returns empty array for whitespace-only string', () => {
      expect(parseMarkdownToSlides('   \n\t  ')).toEqual([])
    })

    it('returns empty array for null-ish input', () => {
      expect(parseMarkdownToSlides(undefined as unknown as string)).toEqual([])
    })
  })

  describe('single slide', () => {
    it('parses single slide without delimiter', () => {
      const slides = parseMarkdownToSlides('# Hello World')
      expect(slides).toHaveLength(1)
      expect(slides[0].content).toBe('# Hello World')
    })

    it('trims whitespace from slide content', () => {
      const slides = parseMarkdownToSlides('  \n# Hello\n  ')
      expect(slides).toHaveLength(1)
      expect(slides[0].content).toBe('# Hello')
    })
  })

  describe('multiple slides', () => {
    it('splits on --- delimiter', () => {
      const markdown = '# Slide 1\n---\n# Slide 2\n---\n# Slide 3'
      const slides = parseMarkdownToSlides(markdown)
      expect(slides).toHaveLength(3)
      expect(slides[0].content).toBe('# Slide 1')
      expect(slides[1].content).toBe('# Slide 2')
      expect(slides[2].content).toBe('# Slide 3')
    })

    it('filters out empty slides from consecutive delimiters', () => {
      const markdown = '# Slide 1\n---\n---\n# Slide 2'
      const slides = parseMarkdownToSlides(markdown)
      expect(slides).toHaveLength(2)
      expect(slides[0].content).toBe('# Slide 1')
      expect(slides[1].content).toBe('# Slide 2')
    })

    it('handles delimiter at start of content', () => {
      const markdown = '---\n# Slide 1\n---\n# Slide 2'
      const slides = parseMarkdownToSlides(markdown)
      expect(slides).toHaveLength(2)
    })

    it('handles delimiter at end of content', () => {
      const markdown = '# Slide 1\n---\n# Slide 2\n---'
      const slides = parseMarkdownToSlides(markdown)
      expect(slides).toHaveLength(2)
    })
  })

  describe('delimiter edge cases', () => {
    it('does not split on --- with leading spaces', () => {
      const markdown = '# Slide 1\n  ---\n# Still Slide 1'
      const slides = parseMarkdownToSlides(markdown)
      expect(slides).toHaveLength(1)
    })

    it('does not split on ---- (four dashes)', () => {
      const markdown = '# Slide 1\n----\n# Still Slide 1'
      const slides = parseMarkdownToSlides(markdown)
      expect(slides).toHaveLength(1)
    })

    it('does not split on -- (two dashes)', () => {
      const markdown = '# Slide 1\n--\n# Still Slide 1'
      const slides = parseMarkdownToSlides(markdown)
      expect(slides).toHaveLength(1)
    })
  })

  describe('line ending handling', () => {
    it('handles Unix line endings (LF)', () => {
      const markdown = '# Slide 1\n---\n# Slide 2'
      const slides = parseMarkdownToSlides(markdown)
      expect(slides).toHaveLength(2)
    })

    it('handles Windows line endings (CRLF)', () => {
      const markdown = '# Slide 1\r\n---\r\n# Slide 2'
      const slides = parseMarkdownToSlides(markdown)
      expect(slides).toHaveLength(2)
    })
  })

  describe('slide IDs', () => {
    it('generates unique IDs for different content', () => {
      const slides = parseMarkdownToSlides('# A\n---\n# B\n---\n# C')
      const ids = slides.map(s => s.id)
      expect(new Set(ids).size).toBe(3)
    })

    it('generates consistent IDs for same content', () => {
      const slides1 = parseMarkdownToSlides('# Hello')
      const slides2 = parseMarkdownToSlides('# Hello')
      expect(slides1[0].id).toBe(slides2[0].id)
    })

    it('IDs include index prefix', () => {
      const slides = parseMarkdownToSlides('# A\n---\n# B')
      expect(slides[0].id).toMatch(/^slide-0-/)
      expect(slides[1].id).toMatch(/^slide-1-/)
    })

    it('generates different IDs when content changes between files', () => {
      const slidesA = parseMarkdownToSlides('# File A content')
      const slidesB = parseMarkdownToSlides('# File B content')
      expect(slidesA[0].id).not.toBe(slidesB[0].id)
    })
  })

  describe('content with markdown features', () => {
    it('preserves code blocks', () => {
      const markdown = '```js\nconst x = 1\n```\n---\n# Slide 2'
      const slides = parseMarkdownToSlides(markdown)
      expect(slides).toHaveLength(2)
      expect(slides[0].content).toContain('const x = 1')
    })

    it('preserves lists', () => {
      const markdown = '- Item 1\n- Item 2\n---\n# Next'
      const slides = parseMarkdownToSlides(markdown)
      expect(slides[0].content).toContain('- Item 1')
      expect(slides[0].content).toContain('- Item 2')
    })

    it('preserves blockquotes', () => {
      const markdown = '> Quote here\n---\n# Next'
      const slides = parseMarkdownToSlides(markdown)
      expect(slides[0].content).toContain('> Quote here')
    })

    it('handles unicode content', () => {
      const markdown = '# 日本語テスト\n---\n# 中文测试'
      const slides = parseMarkdownToSlides(markdown)
      expect(slides).toHaveLength(2)
      expect(slides[0].content).toBe('# 日本語テスト')
      expect(slides[1].content).toBe('# 中文测试')
    })
  })
})
