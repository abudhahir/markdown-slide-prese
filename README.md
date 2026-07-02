# Markdown Slides

A powerful full-screen presentation system that transforms markdown files into beautiful slide presentations. Built with React, TypeScript, and Tailwind CSS.

## Features

- 📝 **Markdown-First** - Write slides in familiar markdown syntax
- ⌨️ **Keyboard Shortcuts** - Lightning-fast navigation
- 📱 **Touch Support** - Swipe gestures on mobile devices
- 🎨 **Multiple Themes** - Switch between 6 beautiful color schemes with light/dark modes
- 📂 **Flexible Loading** - Load from local files or Git URLs (GitHub/GitLab)
- ⏱️ **Presentation Timer** - Track your presentation time
- 🔍 **Slide Search** - Quick navigation with searchable slide list
- 📤 **PDF Export** - Export your presentation to PDF
- ✨ **Smooth Transitions** - Polished animations and effects

## Quick Start

### Development

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```

## Deployment

This project can be deployed to various platforms:

### GitHub Pages

Automated deployment using GitHub Actions. See [GITHUB_PAGES_DEPLOYMENT.md](./GITHUB_PAGES_DEPLOYMENT.md) for detailed instructions.

### GitLab Pages

Deploy to GitLab Pages using GitLab CI. See [GITLAB_PAGES_DEPLOYMENT.md](./GITLAB_PAGES_DEPLOYMENT.md) for instructions.

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` or `↓` | Next slide |
| `←` or `↑` | Previous slide |
| `Space` | Next slide |
| `S` | Show slides list with search |
| `T` | Toggle theme selector |
| `O` | Open file selector |
| `D` | Display current file name |
| `F` | Enter fullscreen mode |
| `?` | Show keyboard shortcuts help |
| `Esc` | Exit fullscreen or close dialogs |

## Creating Slides

Slides are written in standard markdown, separated by `---`:

```markdown
# First Slide

Welcome to my presentation!

---

## Second Slide

- Point one
- Point two
- Point three

---

# Thank You!
```

## Loading Presentations

### Local Files
1. Press `O` to open the file selector
2. Navigate to your markdown file
3. Click to load the presentation

### Git URLs
1. Press `O` to open the file selector
2. Switch to the "Git URL" tab
3. Paste a GitHub or GitLab URL
4. Click "Load from Git"

Supported formats:
- `https://github.com/owner/repo/blob/main/slides.md`
- `https://gitlab.com/owner/repo/-/blob/main/slides.md`

## Themes

Choose from 6 carefully designed themes, each with light and dark modes:

- **Solarized** - Classic balanced color scheme
- **Dracula** - Popular dark theme with vibrant accents
- **Code Dark/Light** - Technical coding-friendly themes
- **Midnight** - Deep indigo with cyan accents
- **Forest** - Natural green tones
- **Sunset** - Warm browns and oranges

Press `T` to open the theme selector and preview themes in real-time.

## Documentation

- [User Guide](./USER_GUIDE.md) - Complete usage instructions
- [GitHub Pages Deployment](./GITHUB_PAGES_DEPLOYMENT.md) - Deploy to GitHub Pages
- [GitLab Pages Deployment](./GITLAB_PAGES_DEPLOYMENT.md) - Deploy to GitLab Pages
- [VS Code Extension](./VSCODE_EXTENSION_GUIDE.md) - Create a VS Code extension

## Technical Details

### Built With
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Marked (Markdown parsing)
- shadcn/ui components

### Browser Support
Modern browsers with ES2020+ support:
- Chrome/Edge 88+
- Firefox 78+
- Safari 14+

## License

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.
