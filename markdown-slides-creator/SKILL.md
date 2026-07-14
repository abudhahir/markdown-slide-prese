---
name: markdown-slides-creator
description: Creates markdown slide presentations (.md files) for the markdown-slides-presenter app. Use when asked to create, write, build, or generate a presentation, slide deck, slides, or talk for this project. Produces a .md file the user can open with `npx markdown-slides-presenter`.
compatibility: Designed for the abudhahir/markdown-slide-prese project
metadata:
  author: abudhahir
  version: "1.0"
---

## Slide file format

A presentation is a single `.md` file. Slides are separated by `---` with **blank lines on both sides**:

```markdown
# Presentation Title

Subtitle or tagline

---

## Slide Two

Content here.

---

## Slide Three

More content.
```

Save the file anywhere (e.g. `examples/my-talk.md` or `~/presentations/my-talk.md`).

To preview: `npx markdown-slides-presenter examples/my-talk.md`

## Supported markdown

All standard markdown works:

| Element | Syntax |
|---|---|
| Heading | `# H1` `## H2` `### H3` |
| Bold / Italic | `**bold**` `*italic*` `***both***` |
| Inline code | `` `code` `` |
| Code block | ` ```lang ` ... ` ``` ` (syntax highlighted) |
| Blockquote | `> text` |
| Unordered list | `- item` or `* item` |
| Ordered list | `1. item` |
| Task list | `- [ ] todo` / `- [x] done` |
| Table | `\| col \| col \|` with `\|---\|---\|` separator |
| Image | `![alt](url)` — auto-scales to fit |
| Link | `[text](url)` |

## Mermaid diagrams

Use fenced ` ```mermaid ` blocks for rendered diagrams:

```
\```mermaid
flowchart TD
    A([Start]) --> B{Decision?}
    B -- Yes --> C([Do this])
    B -- No  --> D([Do that])
\```
```

Supported: `flowchart`, `sequenceDiagram`, `classDiagram`, `erDiagram`, `gantt`, `pie`.

## Good slide structure

- **One idea per slide.** If a slide needs scrolling, split it.
- **Lead with `## Heading`.** Every slide should have a title (`#` for the cover, `##` for the rest).
- **Short bullets, not paragraphs.** Aim for 3–6 bullet points per slide, not prose.
- **Use code blocks for any code.** Even short snippets look better fenced.
- **Prefer concrete examples** over abstract descriptions — show, don't just tell.
- **End with a summary or call-to-action slide.**

### Typical deck structure

```
# Title
Subtitle, date, speaker

---
## Agenda
- Topic 1
- Topic 2
- Topic 3

---
## [Topic 1]
...one or two slides per topic...

---
## Summary
Key takeaways

---
## Questions?
```

## Template

See `assets/template.md` for a ready-to-fill presentation skeleton.

## Gotchas

- **Blank lines around `---` are required.** `---` without surrounding blank lines is treated as a heading underline or a thematic break *inside* a slide, not a slide separator.
- **Do not start or end the file with `---`.** The first slide starts directly; the last slide ends with content, not a separator.
- **Mermaid node labels must not contain emojis.** Emojis inside node text (e.g. `A([📝 Write])`) cause the foreignObject to render too small and clip the label. Use plain text labels.
- **Horizontal rules inside a slide (`---`, `***`, `___`) will split the slide.** Use `<hr>` HTML tag instead if you need a visual divider within a slide.
- **Images are scaled automatically** — no need to set width/height attributes.
