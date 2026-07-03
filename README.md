# Markdown Slides 🎯

A powerful full-screen presentation system that transforms markdown files into beautiful slide presentations. Built with React, TypeScript, and Tailwind CSS.

[![CI](https://github.com/yourusername/markdown-slides/workflows/CI/badge.svg)](https://github.com/yourusername/markdown-slides/actions/workflows/ci.yml)
[![Release](https://github.com/yourusername/markdown-slides/workflows/Release/badge.svg)](https://github.com/yourusername/markdown-slides/actions/workflows/release.yml)
[![Deploy](https://github.com/yourusername/markdown-slides/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/yourusername/markdown-slides/actions/workflows/deploy.yml)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![React](https://img.shields.io/badge/react-19.0.0-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-5.7.2-blue.svg)](https://www.typescriptlang.org/)
[![GitHub release](https://img.shields.io/github/v/release/yourusername/markdown-slides)](https://github.com/yourusername/markdown-slides/releases)
[![npm version](https://img.shields.io/npm/v/markdown-slides)](https://www.npmjs.com/package/markdown-slides)

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
- 🚀 **CLI Ready** - Run with npm or npx without installation

## 📋 Prerequisites

- Node.js 18.x or higher
- npm 8.x or higher

## 🚀 Quick Start

### Option 1: Run Locally (Development)

For contributors or local testing:

```bash
# Clone the repository
git clone https://github.com/abudhahir/markdown-slides-presenter.git
cd markdown-slides-presenter

# Install dependencies
npm install

# Start development server with hot reload
npm run dev
```

The application will be available at `http://localhost:5173`

### Option 2: Test the Production Build Locally

Build and run the production version:

```bash
# Build for production
npm run build

# Run the built version
npm run start
```

Open your browser to `http://localhost:3000` and start presenting!

See the **[Testing and Local Deployment Guide](./TESTING_AND_LOCAL_DEPLOYMENT.md)** for comprehensive testing instructions.

### Option 3: Using npx (No Installation - After Publishing)

Once published to npm, users can run instantly without installing:

```bash
npx markdown-slides-presenter
```

### Option 4: Global Installation (After Publishing)

After publishing to npm, install globally to use anywhere:

```bash
# Install globally
npm install -g markdown-slides-presenter

# Run from anywhere
markdown-slides
```

### CLI Options

```bash
# Run on default port 3000
markdown-slides

# Run on custom port
markdown-slides --port 8080
markdown-slides -p 5000

# Show help
markdown-slides --help

# Show version
markdown-slides --version
```

For complete CLI documentation, see the [CLI Usage Guide](./CLI_USAGE_GUIDE.md).

## 🚢 Releases & Publishing

This project uses **fully automated** releases with GitHub Actions. Each release automatically includes:

- 📦 **GitHub Release** with changelog and build artifacts
- 🌐 **GitHub Pages Deploy** - Live demo updated instantly
- 📤 **npm Publication** - Package published to npm registry automatically
- 🐳 **Docker Image** - Container published to GHCR
- ✅ **Version Management** - Semantic versioning enforced

### 🚀 Quick Release (Automated npm Publishing)

**Just push a tag** - Everything else is automatic!

```bash
# Update version and create tag
git tag v1.0.0
git push origin main
git push origin v1.0.0

# That's it! The workflow automatically:
# ✅ Builds the application
# ✅ Creates GitHub release
# ✅ Publishes to npm
# ✅ Deploys to GitHub Pages
# ✅ Builds Docker image
```

### 📦 npm Publishing Setup

Before your first release, add your npm token to GitHub:

1. **Create npm token** at [npmjs.com/settings/tokens](https://www.npmjs.com/settings/tokens)
2. **Add to GitHub Secrets**: Settings → Secrets → New secret
   - Name: `NPM_TOKEN`
   - Value: Your npm access token

**That's all!** Future releases will automatically publish to npm.

See **[Automated npm Publishing Guide](./AUTOMATED_NPM_PUBLISHING.md)** for complete setup instructions.

### Release Workflow Features

- ✅ **Automated Changelog** - Generated from commit messages
- ✅ **GitHub Release** - Created with assets and release notes
- ✅ **npm Auto-Publish** - Published to npm registry (with NPM_TOKEN)
- ✅ **GitHub Pages** - Live demo updated automatically
- ✅ **Docker Build** - Container published to GHCR
- ✅ **Version Validation** - Semantic versioning enforced
- ✅ **Build Verification** - Tested before publishing
- ✅ **Release Notes** - Updated with npm package info

### Using Releases

**Download build:**
```bash
# From GitHub releases
wget https://github.com/yourusername/markdown-slides/releases/download/v1.0.0/markdown-slides-v1.0.0-dist.tar.gz
tar -xzf markdown-slides-v1.0.0-dist.tar.gz
```

**Docker:**
```bash
# Pull and run
docker pull ghcr.io/yourusername/markdown-slides:latest
docker run -p 8080:80 ghcr.io/yourusername/markdown-slides:latest
```

**npm:**
```bash
# Install specific version
npm install markdown-slides@1.0.0
```

See [RELEASE_WORKFLOW.md](./RELEASE_WORKFLOW.md) for complete documentation.

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

This package is ready to be published to npm. See the [NPM Publishing Guide](./NPM_PUBLISHING_GUIDE.md) for detailed instructions.

### Quick Publish Steps

1. **Update package.json with your details:**
   - Change `name` to your desired package name
   - Update `author`, `repository`, and `homepage` URLs
   - Ensure `version` is set correctly

2. **Build and test:**
   ```bash
   npm run build
   npm run start  # Test the CLI locally
   npm pack       # Create tarball for testing
   ```

3. **Login and publish:**
   ```bash
   npm login
   npm publish
   ```

4. **Verify publication:**
   ```bash
   npm view markdown-slides-presenter
   npx markdown-slides-presenter
   ```

### After Publishing

Users can install and run your package:

```bash
# Run without installing
npx markdown-slides-presenter

# Or install globally
npm install -g markdown-slides-presenter
markdown-slides
```

See [NPM_PUBLISHING_GUIDE.md](./NPM_PUBLISHING_GUIDE.md) for complete publishing documentation.

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

### Running as CLI

```bash
# Quick start with npx (no install)
npx markdown-slides-presenter

# Or install globally
npm install -g markdown-slides-presenter
markdown-slides

# Custom port
markdown-slides --port 8080

# Show help
markdown-slides --help
```

See the [CLI Usage Guide](./CLI_USAGE_GUIDE.md) for complete CLI documentation.

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

### Getting Started
- [README](./README.md) - Project overview and setup
- [Testing and Local Deployment Guide](./TESTING_AND_LOCAL_DEPLOYMENT.md) - **⭐ Comprehensive testing guide for local deployment and npm publishing**
- [Quick Start - CLI Edition](./QUICKSTART_CLI.md) - Get started in 60 seconds with CLI
- [CLI Usage Guide](./CLI_USAGE_GUIDE.md) - Complete CLI reference and troubleshooting
- [Quick Start Release Guide](./QUICKSTART_RELEASE.md) - Create your first release in 5 minutes

### Release & Deployment
- [Release Workflow Guide](./RELEASE_WORKFLOW.md) - Comprehensive release automation documentation
- [Release Implementation](./RELEASE_IMPLEMENTATION.md) - Implementation details and architecture
- [Workflow Architecture](./WORKFLOW_ARCHITECTURE.md) - Visual workflow diagrams and flow
- [Quick Release Guide](./.github/RELEASE_GUIDE.md) - Quick reference for releases
- [Release Template](./.github/RELEASE_TEMPLATE.md) - Template for release notes
- [Changelog](./CHANGELOG.md) - Version history and changes

### Deployment Guides
- [GitHub Pages Deployment](./GITHUB_PAGES_DEPLOYMENT.md) - Deploy to GitHub Pages
- [GitLab Pages Deployment](./GITLAB_PAGES_DEPLOYMENT.md) - Deploy to GitLab Pages

### User Documentation
- [User Guide](./USER_GUIDE.md) - Complete usage instructions
- [VS Code Extension](./VSCODE_EXTENSION_GUIDE.md) - Create a VS Code extension
- [Architecture](./ARCHITECTURE.md) - Technical architecture details

### Development
- [Scripts Documentation](./scripts/README.md) - Helper scripts for releases
- [NPM Publishing Guide](./NPM_PUBLISHING_GUIDE.md) - Publishing to npm registry

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

## 📧 Contact Information

### Project Maintainer

**Author**: Your Name  
**Email**: your.email@example.com  
**GitHub**: [@yourusername](https://github.com/yourusername)  
**Project Repository**: [github.com/yourusername/markdown-slides](https://github.com/yourusername/markdown-slides)

### Get in Touch

We'd love to hear from you! Here are the best ways to reach out:

#### For Project-Related Questions
- 📖 **Documentation**: Check the comprehensive guides in this repository
- 💬 **GitHub Discussions**: [Start a discussion](https://github.com/yourusername/markdown-slides/discussions) for questions, ideas, or showcasing your presentations
- 💡 **Feature Requests**: [Open an issue](https://github.com/yourusername/markdown-slides/issues/new?template=feature_request.md) with the enhancement label

#### For Bug Reports & Issues
- 🐛 **Bug Reports**: [Open an issue](https://github.com/yourusername/markdown-slides/issues/new?template=bug_report.md) with detailed reproduction steps
- 🔍 **Search Existing Issues**: Check if your issue has already been reported or resolved

#### For Collaboration & Contributions
- 🤝 **Pull Requests**: Submit PRs for bug fixes, features, or documentation improvements
- 📝 **Contributing Guide**: See [Contributing](#-contributing) section above
- 👥 **Code Review**: We review all PRs promptly and provide constructive feedback

#### For Direct Communication
- 📧 **Email**: For private inquiries, security issues, or partnership opportunities: your.email@example.com
- 🔒 **Security Issues**: Please email security-related issues privately before public disclosure

#### Stay Updated
- ⭐ **Star this repo** to get notifications about updates and releases
- 👁️ **Watch this repo** to follow all discussions and issues
- 📰 **Release Notes**: Check [CHANGELOG.md](./CHANGELOG.md) for version updates
- 🐦 **Social Media**: Follow [@yourusername](https://twitter.com/yourusername) for project updates (optional)

### Community Guidelines

When reaching out, please:
- ✅ Be respectful and constructive
- ✅ Provide clear, detailed information
- ✅ Search existing issues/discussions first
- ✅ Follow our [Code of Conduct](./CODE_OF_CONDUCT.md)
- ✅ Use appropriate issue templates

### Response Time

We aim to respond to:
- 🐛 Critical bugs: Within 24 hours
- 💡 Feature requests: Within 1 week
- 💬 Discussions/Questions: Within 3-5 days
- 🤝 Pull requests: Within 1 week

*Please note that this is an open-source project maintained by volunteers. Response times may vary.*

## 📧 Support & Community

- 📖 **Documentation**: Check the guides in this repository
- 🐛 **Bug Reports**: Open an issue on GitHub
- 💡 **Feature Requests**: Open an issue with the enhancement label
- 💬 **Questions**: Start a discussion on GitHub Discussions
- 🌟 **Show Support**: Star this repository if you find it useful!

---

**Made with ❤️ for presenters everywhere**

Happy presenting! 🎉
