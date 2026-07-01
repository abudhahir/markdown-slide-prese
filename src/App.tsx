import { useState } from 'react'
import { SlidePresentation } from '@/components/slides/SlidePresentation'
import { toast, Toaster } from 'sonner'

const sampleMarkdown = `# Welcome to Markdown Slides 🎯

A powerful full-screen presentation system built with React

Transform markdown files into beautiful presentations

---

## What Makes This Special?

- ✍️ **Markdown-First** - Write slides in familiar syntax
- ⌨️ **Keyboard Shortcuts** - Lightning-fast navigation
- 📱 **Touch Support** - Swipe gestures on mobile
- 🎨 **Multiple Themes** - Switch color schemes instantly
- 📂 **Flexible Loading** - Local files or Git URLs
- ✨ **Smooth Transitions** - Polished animations

---

## Quick Start: Creating Slides

Separate your slides using three dashes:

\`\`\`markdown
# First Slide

Content here

---

# Second Slide

More content

---
\`\`\`

Each section becomes a new slide!

---

## Markdown Support

### Headers
Use \`#\` for titles, \`##\` for sections, \`###\` for subsections

### Emphasis
**Bold text** for importance
*Italic text* for emphasis
\`Inline code\` for technical terms

### Lists
Both ordered and unordered lists are fully supported

---

## Code Blocks

Include code with syntax highlighting:

\`\`\`javascript
function createPresentation(markdown) {
  const slides = markdown.split('---')
  return slides.map(slide => parse(slide))
}
\`\`\`

Perfect for technical presentations!

---

## Navigation Basics ⌨️

### Keyboard Controls
- **Arrow Keys** (→ ← ↑ ↓) - Navigate between slides
- **Spacebar** - Go to next slide
- **T Key** - Toggle theme selector
- **O Key** - Open file selector
- **D Key** - Display current markdown file name

### Touch Controls
- **Swipe Left** - Next slide
- **Swipe Right** - Previous slide

Try them now!

---

## Theme Selector 🎨

### Switching Themes

1. Press **T** key or click the **palette icon** (top-right)
2. Choose from 6 beautiful themes:
   - **Midnight** - Deep indigo with cyan accents (current)
   - **Forest** - Dark green with lime highlights
   - **Sunset** - Warm brown with golden orange
   - **Ocean** - Deep blue with aqua cyan
   - **Ember** - Charcoal with fiery orange
   - **Lavender** - Purple-grey with magenta

Your choice persists across sessions!

---

## Current File Name 📄

### Identify Your Presentation

**Press D** or use the keyboard shortcut to see which markdown file is currently loaded

#### When to Use
- Working with multiple presentations
- Confirming which file you loaded
- Switching between local and Git-based files
- Verifying you're presenting the right deck

#### What You'll See
- **File name** or **URL** of the current markdown
- **Dialog box** with clear file information
- Press **D again** to close the display

Useful for managing multiple presentation files!

---

## Loading Files 📂

### Two Ways to Load Presentations

**Press O** or click the **folder icon** to open the file selector

#### Option 1: Local Files
- Browse your local filesystem
- Navigate through directories
- Select any \`.md\` or \`.markdown\` file

#### Option 2: Git URLs
- Load directly from GitHub or GitLab
- No download needed
- Always get the latest version

---

## Presentation Timer ⏱️

### Track Your Time

A built-in timer in the **top-left corner** helps you stay on schedule:

#### Timer Features
- **Auto-start** - Begins when presentation loads
- **Pause/Resume** - Click the play/pause button
- **Reset** - Click the reset button to start over
- **Format** - Shows minutes:seconds (or hours:minutes:seconds for long presentations)

#### How to Use
1. Timer starts automatically when you begin
2. Pause if you need to take a break
3. Reset when starting a new presentation session
4. Keep an eye on it to manage your time

Perfect for timed presentations and practice runs!

---

## Loading from Git URLs 🔗

### Supported URL Formats

**GitHub:**
\`\`\`
https://github.com/owner/repo/blob/main/slides.md
\`\`\`

**GitLab:**
\`\`\`
https://gitlab.com/owner/repo/-/blob/main/slides.md
\`\`\`

### How to Use
1. Press **O** to open file selector
2. Switch to **Git URL** tab
3. Paste your URL
4. Click **Load from Git**

---

## File Selector Features 📁

### Local File Browser
- **Hierarchical navigation** - Browse nested folders
- **Smart filtering** - Only shows markdown files
- **Visual indicators** - Icons for folders and files
- **Expand/collapse** - Click folders to explore

### Git URL Loader
- **Multi-platform** - GitHub and GitLab support
- **Branch aware** - Specify any branch name
- **Instant loading** - No manual downloads
- **Error handling** - Clear feedback on issues

---

## All Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **→** or **↓** | Next slide |
| **←** or **↑** | Previous slide |
| **Spacebar** | Next slide |
| **T** | Toggle theme selector |
| **O** | Open file selector |
| **D** | Display file name |

*Master these for seamless presenting!*

---

## Rich Content Examples

### Quotes
> "The best presentations are simple, clear, and focused on what matters."

### Links
Create [clickable links](https://github.com) easily

### Emphasis
Mix **bold**, *italic*, and \`code\` for variety

---

## Lists and Structure

### Unordered Lists
- Easy to read
- Visually clear
- Support nesting
  - Like this
  - And this

### Ordered Lists
1. First point
2. Second point
3. Third point

---

## Best Practices 💡

### Content Tips
- **One idea per slide** - Keep it focused
- **Use visuals** - Headers and bullets
- **Short sentences** - Easy to read
- **Code sparingly** - Only when needed

### Navigation Tips
- **Practice shortcuts** - Faster presenting
- **Test themes** - Find what works
- **Organize files** - Use folders for projects

---

## Mobile Experience 📱

### Responsive Design
- Optimized layout for small screens
- Touch-friendly controls
- Readable font sizes
- Swipe gestures work perfectly

### Try It
Open this on your phone and swipe to navigate!

---

## Creating Your Own

### File Structure
\`\`\`
presentations/
  ├── work/
  │   ├── quarterly-review.md
  │   └── product-demo.md
  └── personal/
      └── photo-slideshow.md
\`\`\`

### Loading
Use **O** key → Browse to your folder → Select file

---

## Sharing Presentations

### Share via Git
1. Put your markdown in a GitHub/GitLab repo
2. Share the raw file URL
3. Anyone can load it instantly with **O** key
4. Updates automatically when you push changes

### Collaborate
- Version control your slides
- Review changes with diffs
- Multiple presenters can use the same source

---

## Advanced Tips 🚀

### Theme Matching
Choose themes that match your content:
- **Technical talks** → Midnight or Ember
- **Nature topics** → Forest or Ocean
- **Creative projects** → Sunset or Lavender

### URL Shortcuts
Bookmark Git URLs in your file selector for quick access

### Presentation Flow
Structure slides: Title → Problem → Solution → Examples → Conclusion

---

## Technical Details

### Built With
- **React** - Modern UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Marked** - Markdown parsing

### Features
- Full keyboard navigation
- Touch gesture support
- Theme persistence
- Git URL fetching
- Responsive design

---

## Troubleshooting

### File Won't Load
- Check file extension (.md or .markdown)
- Verify Git URL is to a raw markdown file
- Ensure repository is public (for Git URLs)

### Theme Not Persisting
- Check browser localStorage is enabled
- Try selecting theme again

### Navigation Not Working
- Ensure focus is on the presentation
- Click anywhere on the slide first

---

## What's Next?

### Practice
- Try all keyboard shortcuts (→ ← T O D)
- Switch between themes
- Load a file from your system
- Test a Git URL
- Use the timer to practice timing
- Check which file you're presenting

### Create
- Write your first presentation
- Use the markdown examples here
- Experiment with layouts
- Track your delivery time with the timer
- Share with others!

---

## Additional Features

### Progress Indicator
See slide number in top-right corner

### Smooth Transitions
Directional animations show flow

### Error Handling
Clear messages for loading issues

### Cross-Platform
Works on desktop, tablet, and mobile

---

# Ready to Present? 🎉

You now know:
- ✅ How to create slides with markdown
- ✅ All keyboard shortcuts (arrows, T, O, D)
- ✅ Theme switching
- ✅ File loading (local and Git)
- ✅ Mobile gestures
- ✅ Presentation timer
- ✅ File name display
- ✅ Best practices

---

# Start Creating!

### Next Steps
1. Press **O** to load your own markdown
2. Press **T** to pick your favorite theme
3. Practice navigation with shortcuts
4. Build something amazing

---

# Thank You! 🙏

**Markdown Slides** - Present with confidence

*Press → to return to the beginning, or press O to load your own presentation*
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