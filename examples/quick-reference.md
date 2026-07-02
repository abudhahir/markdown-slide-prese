# Markdown Slides Quick Reference ⚡

Your handy cheat sheet for creating presentations

---

## Slide Separator

Use three dashes to separate slides:

```markdown
# Slide 1

Content here

---

# Slide 2

More content
```

**Important:** Add blank lines before and after `---`

---

## Headers

```markdown
# H1 - Main Slide Title
## H2 - Section Header
### H3 - Subsection
#### H4 - Minor Heading
```

# H1 Example
## H2 Example
### H3 Example
#### H4 Example

---

## Text Formatting

```markdown
**Bold text**
*Italic text*
***Bold and italic***
~~Strikethrough~~
`Inline code`
```

**Bold text**
*Italic text*
***Bold and italic***
~~Strikethrough~~
`Inline code`

---

## Lists: Unordered

```markdown
- Item 1
- Item 2
  - Nested item
  - Another nested item
- Item 3
```

Result:
- Item 1
- Item 2
  - Nested item
  - Another nested item
- Item 3

---

## Lists: Ordered

```markdown
1. First item
2. Second item
3. Third item
   1. Nested item
   2. Another nested
```

Result:
1. First item
2. Second item
3. Third item
   1. Nested item
   2. Another nested

---

## Task Lists

```markdown
- [x] Completed task
- [ ] Incomplete task
- [ ] Another task
```

Result:
- [x] Completed task
- [ ] Incomplete task
- [ ] Another task

---

## Links

```markdown
[Link text](https://example.com)
[Link with title](https://example.com "Hover text")
```

[Link text](https://example.com)
[Link with title](https://example.com "Hover text")

**Auto-linking:**
https://example.com

---

## Images

```markdown
![Alt text](image-url.jpg)
![Image with title](image.jpg "Hover text")
```

Images automatically scale to fit slides!

**Tip:** Use high-quality images for best results

---

## Code Blocks

Use triple backticks with language:

````markdown
```javascript
function hello() {
  console.log("Hello World!")
}
```
````

Result:
```javascript
function hello() {
  console.log("Hello World!")
}
```

---

## Supported Languages

```javascript
// JavaScript
const x = 10

// TypeScript
const y: number = 20

// Python
def hello():
    print("Hello")

// HTML/CSS
<div class="example">Hello</div>
```

Syntax highlighting works automatically!

---

## Blockquotes

```markdown
> Single line quote

> Multi-line quote
> spanning multiple
> lines
```

Result:
> Single line quote

> Multi-line quote
> spanning multiple
> lines

---

## Blockquote with Attribution

```markdown
> "Design is not just what it looks like.
> Design is how it works."
> 
> — Steve Jobs
```

Result:
> "Design is not just what it looks like.
> Design is how it works."
> 
> — Steve Jobs

---

## Tables

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Row 1    | Data     | Data     |
| Row 2    | Data     | Data     |
```

Result:
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Row 1    | Data     | Data     |
| Row 2    | Data     | Data     |

---

## Table Alignment

```markdown
| Left | Center | Right |
|:-----|:------:|------:|
| A    | B      | C     |
| D    | E      | F     |
```

Result:
| Left | Center | Right |
|:-----|:------:|------:|
| A    | B      | C     |
| D    | E      | F     |

---

## Horizontal Rules

Create visual separators:

```markdown
---
***
___
```

Use sparingly within slides!

---

## Emoji

Use emoji to add personality:

```markdown
🚀 Rocket
✅ Checkmark
❌ Cross
💡 Light bulb
🎯 Target
⚡ Lightning
🔥 Fire
```

🚀 ✅ ❌ 💡 🎯 ⚡ 🔥

Full emoji support!

---

## HTML (Limited)

Some HTML works in markdown:

```html
<strong>Bold</strong>
<em>Italic</em>
<u>Underline</u>
<mark>Highlighted</mark>
<br> Line break
```

**Use sparingly!** Stick to markdown when possible.

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` `Space` | Next slide |
| `←` | Previous slide |
| `Home` | First slide |
| `End` | Last slide |
| `T` | Theme selector |
| `O` | File browser |
| `S` | Search slides |
| `D` | Show file name |
| `F` | Fullscreen |
| `?` | Help menu |
| `Esc` | Close dialogs |

---

## Navigation Tips

**Mouse/Trackpad:**
- Click left side → Previous
- Click right side → Next
- Scroll wheel works too

**Touch Gestures:**
- Swipe left → Next
- Swipe right → Previous

**Presenter Mode:**
- Use keyboard for control
- Arrow keys are your friend

---

## Theme Selector (T)

Press `T` to access themes:

**Available:**
- 🌅 Solarized (Light/Dark)
- 🧛 Dracula (Light/Dark)
- 💻 Code (Light/Dark)

Each theme has:
- Custom color palette
- Optimized typography
- Light/Dark variants

---

## File Browser (O)

Press `O` to browse files:

**Features:**
- Navigate directories with arrows
- 📁 folders, 📄 files
- Enter to open
- Esc to close

**Supports:**
- Local markdown files
- Directory navigation
- Git URL loading

---

## Slide Search (S)

Press `S` to search slides:

**How it works:**
1. Type search term
2. Results filter in real-time
3. Arrow keys to navigate
4. Enter to jump to slide
5. Esc to close

**Pro tip:** Shortcuts disabled while searching!

---

## Presentation Timer

Appears automatically when presenting:

**Shows:**
- ⏱️ Elapsed time
- 📊 Current slide / Total
- Progress indicator

**Use for:**
- Practice timing
- Stay on schedule
- Track progress

---

## Export to PDF

Click "Export PDF" button:

**Process:**
1. Generates PDF
2. Each slide = one page
3. Maintains formatting
4. Downloads automatically

**Tips:**
- Test before presenting
- Keep slides readable
- Check page breaks

---

## Loading from Git URLs

Click URL button in toolbar:

**GitHub format:**
```
https://raw.githubusercontent.com/
user/repo/branch/file.md
```

**GitLab format:**
```
https://gitlab.com/user/repo/-/raw/
branch/file.md
```

Perfect for shared presentations!

---

## Best Practices 💡

**Content:**
- One main idea per slide
- Use visual hierarchy
- Keep text concise
- Add code examples
- Include emoji for personality

**Structure:**
- Clear introduction
- Logical flow
- Strong conclusion
- Call to action

---

## Slide Design Tips

**Typography:**
- Use headers appropriately
- Break up long text
- Emphasize key points

**Layout:**
- Embrace whitespace
- Avoid crowding
- Balance elements
- Consistent formatting

---

## Common Markdown Mistakes

❌ **Forgetting blank lines around `---`**
```markdown
# Slide 1
---
# Slide 2  ← Won't work!
```

✅ **Correct:**
```markdown
# Slide 1

---

# Slide 2  ← Works!
```

---

## More Common Mistakes

❌ **Inconsistent list formatting**
```markdown
- Item
  - Nested (needs 2 spaces)
```

✅ **Correct:**
```markdown
- Item
  - Nested (properly indented)
```

---

## Debugging Tips

**Slides not separating?**
- Check for blank lines around `---`
- Ensure `---` is on its own line
- No spaces before/after `---`

**Code not highlighting?**
- Specify language after backticks
- Check for proper closing backticks
- Ensure proper indentation

---

## File Organization

**Recommended structure:**

```
presentations/
├── examples/
│   └── [sample files]
├── work/
│   └── [work presentations]
└── personal/
    └── [personal presentations]
```

Use folders to stay organized!

---

## Slide Naming Conventions

**Good names:**
- `getting-started.md`
- `2024-q1-review.md`
- `product-launch-plan.md`

**Avoid:**
- `Untitled.md`
- `presentation123.md`
- Spaces in filenames

---

## Version Control

**Use Git for:**
- Track changes over time
- Collaborate with team
- Revert if needed
- Share presentations

**Commit often:**
```bash
git commit -m "Add sales slide"
git push
```

---

## Presentation Modes

**Practice Mode:**
- Use timer
- Test transitions
- Rehearse timing

**Presentation Mode:**
- Go fullscreen (`F`)
- Hide browser chrome
- Focus on content

**Review Mode:**
- Use search (`S`)
- Jump between slides
- Quick navigation

---

## Accessibility Considerations

**Make slides accessible:**
- Use high contrast
- Readable font sizes
- Alt text for images
- Logical structure
- Keyboard navigation

Everyone should be able to follow along!

---

## Performance Tips

**For smooth presentations:**
- Optimize large images
- Limit animations
- Test before presenting
- Close unnecessary apps
- Use local files when possible

---

## Troubleshooting Checklist

**Slide not showing?**
- [ ] Check markdown syntax
- [ ] Verify `---` separators
- [ ] Look for blank lines
- [ ] Try reloading file

**Theme looks wrong?**
- [ ] Try different theme
- [ ] Toggle light/dark
- [ ] Refresh page

---

## Quick Start Workflow

1. **Create** markdown file
2. **Write** slides with `---` separators
3. **Load** with `O` key
4. **Choose** theme with `T` key
5. **Present** using arrows
6. **Export** to PDF if needed

That's it! 🎉

---

## Advanced: Custom Styles

While not required, you can use inline HTML/CSS:

```html
<div style="text-align: center; color: #ff6b6b;">
  Centered colored text
</div>
```

**Warning:** May not export to PDF correctly!

---

## Learning Resources

**Practice files:**
- Browse `examples/` folder
- Try modifying them
- Create your own

**Documentation:**
- USER_GUIDE.md
- ARCHITECTURE.md
- This quick reference!

---

## Getting Help

**Keyboard shortcuts:**
- Press `?` for help menu

**File information:**
- Press `D` to see current file

**Search:**
- Press `S` to find slides

---

## Community Tips

**From experienced users:**

1. Keep a template file
2. Use snippets for common patterns
3. Practice keyboard shortcuts
4. Create a slide library
5. Share with your team

---

## Presentation Checklist

Before your presentation:

- [ ] Content finalized
- [ ] Slides tested
- [ ] Theme selected
- [ ] PDF exported (backup)
- [ ] Timing rehearsed
- [ ] Equipment tested
- [ ] Backup plan ready

---

## Final Tips 🎯

**Content is king:**
- Focus on message first
- Design supports content
- Practice delivery

**Technical prep:**
- Test everything
- Have backups
- Stay calm

**Engage audience:**
- Eye contact
- Clear speaking
- Energy and enthusiasm

---

## You're Ready! 🚀

You now have everything you need to create amazing presentations!

**Remember:**
- Start simple
- Practice often
- Learn shortcuts
- Have fun!

**Happy presenting!** ✨

---

## Quick Reference Card

**Create slides:** Separate with `---`
**Navigate:** Arrow keys
**Themes:** Press `T`
**Files:** Press `O`
**Search:** Press `S`
**Fullscreen:** Press `F`
**Help:** Press `?`

*Keep this slide bookmarked for quick reference!*
