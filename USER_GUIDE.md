# Markdown Slides - User Guide

## Quick Start

This application transforms markdown files into beautiful, full-screen slide presentations.

## Creating Slides

### Basic Syntax

Separate slides using three dashes on their own line:

```markdown
# First Slide

This is my first slide content

---

# Second Slide

This is my second slide content
```

### Supported Markdown Features

#### Headings
```markdown
# H1 - Main Title (56px)
## H2 - Section Header (42px)
### H3 - Subsection (32px)
```

#### Text Formatting
```markdown
**Bold text**
*Italic text*
`Inline code`
```

#### Lists
```markdown
- Bullet point 1
- Bullet point 2
  - Nested item

1. Numbered item 1
2. Numbered item 2
```

#### Code Blocks
````markdown
```javascript
function hello() {
  console.log("Hello World!")
}
```
````

#### Links
```markdown
[Link text](https://example.com)
```

#### Blockquotes
```markdown
> This is a quote
```

## Navigation

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` or `↓` | Next slide |
| `←` or `↑` | Previous slide |
| `Space` | Next slide |
| `T` | Toggle theme selector |
| `O` | Open file selector |
| `D` | Display current markdown file name |

### Mouse/Touch

- Click arrow buttons at bottom of screen
- Swipe left/right on touch devices

## Tips for Great Presentations

### 1. Keep It Simple
- One main idea per slide
- Use bullet points sparingly (3-5 max)
- Avoid walls of text

### 2. Use Visual Hierarchy
```markdown
# Main Message (largest)

## Supporting Point (medium)

Body text with details (smallest)
```

### 3. Emphasize Key Points
```markdown
This is a **critical** concept.

`technical terms` stand out in code style.
```

### 4. Code Slides
````markdown
### Function Example

```typescript
interface User {
  name: string
  email: string
}
```
````

### 5. Structure Your Deck

**Opening Slide**:
```markdown
# Presentation Title

Your Name • Date
```

**Agenda Slide**:
```markdown
## Today's Topics

1. Introduction
2. Main Content
3. Conclusion
```

**Content Slides**: Focus on one topic each

**Closing Slide**:
```markdown
# Thank You!

Questions?

contact@example.com
```

## Example Presentations

### Technical Talk
```markdown
# Building React Apps

Modern web development with React

---

## Why React?

- Component-based architecture
- Virtual DOM for performance
- Rich ecosystem
- Strong community

---

## Example Component

```jsx
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>
}
```

---

# Questions?
```

### Product Demo
```markdown
# Introducing Our Product

The solution you've been waiting for

---

## The Problem

Current tools are:
- Too complex
- Too expensive
- Hard to use

---

## Our Solution

**Simple** • **Affordable** • **Powerful**

---

## Live Demo

Let me show you...

---

# Get Started Today

visit: ourproduct.com
```

### Workshop/Tutorial
```markdown
# Web Development Workshop

Learn to build modern websites

---

## What We'll Cover

1. HTML & CSS Basics
2. JavaScript Fundamentals
3. Building a Project

---

## HTML Structure

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
```

---

## Your Turn!

Try building your first page

---

# Great Work!

Keep practicing
```

## Customization

### Changing Content

Edit the markdown string in `App.tsx`:

```tsx
const myMarkdown = `
# Your Title

Your content here

---

# Next Slide

More content
`

function App() {
  return <SlidePresentation markdown={myMarkdown} />
}
```

### Loading from Files

You can load markdown from external sources:

```tsx
function App() {
  const [markdown, setMarkdown] = useState('')
  
  useEffect(() => {
    fetch('/path/to/slides.md')
      .then(res => res.text())
      .then(setMarkdown)
  }, [])
  
  return <SlidePresentation markdown={markdown} />
}
```

## Design Philosophy

This presentation tool embraces:

- **Simplicity**: Just markdown, nothing more
- **Focus**: Full-screen, distraction-free
- **Performance**: Smooth transitions, no lag
- **Accessibility**: Keyboard navigation, semantic HTML
- **Responsiveness**: Works on desktop, tablet, and mobile

## Troubleshooting

### Slides Not Appearing
- Ensure you're using `---` (three dashes) as separators
- Check that dashes are on their own line
- Verify there's content between separators

### Navigation Not Working
- Click on the slide area to focus the window
- Check that keyboard is not captured by another element
- Try using on-screen arrow buttons

### Content Cut Off
- Reduce font sizes for long content
- Split into multiple slides
- Check responsive styles on mobile

### Animations Stuttering
- Close other browser tabs
- Disable browser extensions
- Check hardware acceleration is enabled

## Advanced Features

### Presentation Mode Tips

1. **Test Before Presenting**: Navigate through entire deck
2. **Check Responsive**: View on target screen size
3. **Practice Navigation**: Get comfortable with controls
4. **Prepare Backup**: Have notes ready offline

### Integration Ideas

- Load presentations from URL parameters
- Store multiple decks in KV storage
- Add presentation selector interface
- Implement slide notes/speaker view
- Add timer for timed presentations

## Getting Help

For issues, questions, or feature requests:
1. Check this documentation first
2. Review ARCHITECTURE.md for technical details
3. Inspect browser console for errors
4. Verify markdown syntax is correct

## Deployment

### GitLab Pages

Deploy your presentation app to GitLab Pages for free hosting:

1. **Push to GitLab**:
   ```bash
   git remote add gitlab https://gitlab.com/YOUR_USERNAME/YOUR_REPO.git
   git push gitlab main
   ```

2. **Automatic Deployment**:
   - The `.gitlab-ci.yml` file handles everything automatically
   - Your site will be live at: `https://YOUR_USERNAME.gitlab.io/YOUR_REPO/`

3. **Check Status**:
   - Go to **CI/CD > Pipelines** in your GitLab repository
   - Wait for the green checkmark
   - Visit your Pages URL

For detailed deployment instructions, see [GITLAB_PAGES_DEPLOYMENT.md](./GITLAB_PAGES_DEPLOYMENT.md)

### Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` to view your presentation.

### Production Build

```bash
npm run build
npm run preview
```

## Contributing

To extend this presentation system:
1. Review PRD.md for design direction
2. Check ARCHITECTURE.md for component structure
3. Follow existing patterns and conventions
4. Test on multiple devices and browsers
5. Maintain accessibility standards
