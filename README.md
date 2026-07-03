# Markdown Slides 🎯

A powerful full-screen presentation system that transforms markdown files into beautiful slide presentations. Built with React, TypeScript, and Tailwind CSS.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-19.0.0-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.7.2-blue.svg)

## ✨ Features

- 📝 **Markdown-First** - Write slides in familiar markdown syntax
- ⌨️ **Keyboard Shortcuts** - Lightning-fast navigation
- 📱 **Touch Support** - Swipe gestures on mobile devices
- 🎨 **Multiple Themes** - Switch between 6 beautiful color schemes with light/dark modes
- 📂 **Flexible Loading** - Load from local files or Git URLs (GitHub/GitLab)
- ⏱️ **Presentation Timer** - Track your presentation time
- 🔍 **Slide Search** - Quick navigation with searchable slide list
- 📤 **PDF Export** - Export your presentation to PDF
- ✨ **Smooth Transitions** - Polished animations and effects
- 🌐 **Cross-Platform** - Works on desktop, tablet, and mobile

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm 8.x or higher

### Installation

```bash
# Clone the repository
git clone <your-repository-url>
cd markdown-slides

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## 🛠️ Development Setup

### Project Structure

```
markdown-slides/
├── src/
│   ├── components/
│   │   ├── slides/          # Slide-related components
│   │   │   ├── SlidePresentation.tsx
│   │   │   ├── FileSelector.tsx
│   │   │   ├── ThemeSelector.tsx
│   │   │   ├── SlidesList.tsx
│   │   │   └── ...
│   │   └── ui/              # Shadcn UI components
│   ├── hooks/               # Custom React hooks
│   │   └── use-mobile.ts
│   ├── lib/                 # Utility functions
│   │   └── utils.ts
│   ├── styles/              # Global styles and themes
│   │   └── theme.css
│   ├── App.tsx              # Main application component
│   ├── index.css            # Theme definitions
│   └── main.tsx             # Entry point
├── examples/                # Example presentations
│   ├── tutorial.md
│   ├── technical-presentation.md
│   └── product-demo.md
├── public/                  # Static assets
├── index.html              # Entry HTML file
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
└── tsconfig.json           # TypeScript configuration
```

### Available Scripts

```bash
# Start development server (port 5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Optimize dependencies
npm run optimize

# Kill process on port 5000 (if needed)
npm run kill
```

### Development Tips

1. **Hot Module Replacement (HMR)**: Changes are reflected instantly during development
2. **TypeScript**: Full type safety with strict mode enabled
3. **ESLint**: Automatic code quality checks
4. **Tailwind CSS**: Utility-first styling with v4 features
5. **React 19**: Using the latest React features

### Adding New Themes

Edit `src/index.css` and add your theme configuration:

```css
:root {
  --background: oklch(0.98 0 0);
  --foreground: oklch(0.20 0 0);
  --primary: oklch(0.45 0.15 260);
  /* ... other color variables */
}
```

### Customizing Components

All UI components are in `src/components/ui/` (shadcn components) and custom components in `src/components/slides/`.

## 📦 Publishing to npm

### Preparation Steps

1. **Update package.json for publishing**

Change the following fields in `package.json`:

```json
{
  "name": "markdown-slides-presenter",
  "version": "1.0.0",
  "description": "A powerful markdown-based presentation tool",
  "private": false,
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "keywords": [
    "markdown",
    "slides",
    "presentation",
    "react",
    "typescript",
    "presenter"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/markdown-slides.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/markdown-slides/issues"
  },
  "homepage": "https://yourusername.github.io/markdown-slides",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ]
}
```

2. **Create .npmignore file**

```bash
# Create .npmignore in project root
cat > .npmignore << 'EOF'
src/
.github/
.gitlab-ci.yml
.devcontainer/
examples/
node_modules/
.git/
.gitignore
*.log
.DS_Store
vite.config.ts
tsconfig.json
tailwind.config.js
components.json
*.md
!README.md
!LICENSE
EOF
```

3. **Test the package locally**

```bash
# Create a tarball to test
npm pack

# This creates markdown-slides-presenter-1.0.0.tgz
# Test installation in another project
npm install /path/to/markdown-slides-presenter-1.0.0.tgz
```

### Publishing to npm Registry

1. **Create an npm account** at [npmjs.com/signup](https://www.npmjs.com/signup)

2. **Login to npm**

```bash
npm login
# Enter your username, password, and email
```

3. **Verify your login**

```bash
npm whoami
```

4. **Publish the package**

```bash
# First-time publication
npm publish

# If package name is scoped (e.g., @username/markdown-slides)
npm publish --access public
```

5. **Verify publication**

```bash
npm view markdown-slides-presenter
```

### Version Management

Follow [Semantic Versioning](https://semver.org/):

```bash
# Bug fixes: 1.0.0 -> 1.0.1
npm version patch

# New features: 1.0.1 -> 1.1.0
npm version minor

# Breaking changes: 1.1.0 -> 2.0.0
npm version major

# Then publish
npm publish
```

### Publishing Workflow

```bash
# 1. Test thoroughly
npm run lint
npm run build
npm run preview

# 2. Update version
npm version patch

# 3. Push to git
git push origin main --tags

# 4. Publish to npm
npm publish

# 5. Verify
npm view markdown-slides-presenter
```

### Automated Publishing with GitHub Actions

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      
      - run: npm ci
      - run: npm run build
      
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Add your npm token to repository secrets as `NPM_TOKEN`.

## 🌐 Deployment

This project can be deployed to various platforms:

### GitHub Pages

Automated deployment using GitHub Actions. See [GITHUB_PAGES_DEPLOYMENT.md](./GITHUB_PAGES_DEPLOYMENT.md) for detailed instructions.

### GitLab Pages

Deploy to GitLab Pages using GitLab CI. See [GITLAB_PAGES_DEPLOYMENT.md](./GITLAB_PAGES_DEPLOYMENT.md) for instructions.

### Other Platforms

Deploy the `dist/` folder to any static hosting:
- **Netlify**: Connect your repo or drag-and-drop `dist/`
- **Vercel**: Import your git repository
- **AWS S3 + CloudFront**: Upload `dist/` to S3 bucket
- **Azure Static Web Apps**: GitHub integration available
- **Firebase Hosting**: `firebase deploy`

## 📖 Usage Guide

### Keyboard Shortcuts

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

### Exporting to PDF

1. Navigate to your presentation
2. Click the download icon in the top-right corner
3. Wait for PDF generation
4. PDF will download automatically to your browser's download folder

## 📚 Documentation & Resources

### Guides
- [User Guide](./USER_GUIDE.md) - Complete usage instructions
- [GitHub Pages Deployment](./GITHUB_PAGES_DEPLOYMENT.md) - Deploy to GitHub Pages
- [GitLab Pages Deployment](./GITLAB_PAGES_DEPLOYMENT.md) - Deploy to GitLab Pages
- [VS Code Extension](./VSCODE_EXTENSION_GUIDE.md) - Create a VS Code extension
- [Architecture](./ARCHITECTURE.md) - Technical architecture details

### Example Presentations

Example markdown files are in the `examples/` directory:
- `tutorial.md` - Feature showcase and tutorial
- `technical-presentation.md` - Technical presentation template
- `product-demo.md` - Product demo template

Load examples by pressing `O` and navigating to the `examples/` folder.

## 🔧 Technical Details

### Built With
- React 19
- TypeScript 5.7
- Tailwind CSS 4
- Framer Motion
- Marked (Markdown parsing)
- shadcn/ui components
- Vite (Build tool)

### Browser Support
Modern browsers with ES2020+ support:
- Chrome/Edge 88+
- Firefox 78+
- Safari 14+

### Key Dependencies
- `marked` - Markdown parsing
- `framer-motion` - Smooth animations
- `html2canvas` & `jspdf` - PDF export
- `octokit` - GitHub/GitLab API integration
- `sonner` - Toast notifications

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/yourusername/markdown-slides.git
   ```
3. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Make your changes**
   - Write clean, documented code
   - Follow existing code style
   - Add tests if applicable
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use functional components and hooks
- Maintain existing code style
- Write meaningful commit messages
- Update documentation as needed

## 🐛 Troubleshooting

### Common Issues

**Slides not loading from Git URL**
- Ensure the URL points to a raw markdown file
- Check that the repository is public
- Verify the file extension is `.md` or `.markdown`

**PDF export fails**
- Ensure all fonts are loaded
- Try reducing the number of slides
- Check browser console for specific errors

**Theme not persisting**
- Check that browser localStorage is enabled
- Try clearing browser cache
- Re-select the theme

**Keyboard shortcuts not working**
- Click on the presentation area to focus
- Check that no dialog is open
- Ensure you're not in an input field

## 🗺️ Roadmap

Future enhancements planned:

- [ ] CLI tool for standalone presentations
- [ ] Speaker notes support
- [ ] Presentation recording
- [ ] Real-time collaboration
- [ ] Custom theme creator UI
- [ ] Plugin/extension system
- [ ] Export to PPTX format
- [ ] Slide transitions customization
- [ ] Drawing/annotation tools
- [ ] Multi-language support

## 📄 License

MIT License - see the [LICENSE](./LICENSE) file for details.

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.

## 🙏 Acknowledgments

- Inspired by [easy-slides](https://github.com/abudhahir/easy-slides)
- Built with [React](https://react.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Markdown parsing with [marked](https://marked.js.org/)
- Animations with [Framer Motion](https://www.framer.com/motion/)

## 📧 Support & Community

- 📖 **Documentation**: Check the guides in this repository
- 🐛 **Bug Reports**: Open an issue on GitHub
- 💡 **Feature Requests**: Open an issue with the enhancement label
- 💬 **Questions**: Start a discussion on GitHub Discussions
- 🌟 **Show Support**: Star this repository if you find it useful!

---

**Made with ❤️ for presenters everywhere**

Happy presenting! 🎉
