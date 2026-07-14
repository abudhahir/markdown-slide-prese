# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **CLI Entry Point**: Run with `npx c-deck-lite` or install globally
- Command-line interface with built-in HTTP server
- CLI options: `--port`, `--help`, `--version`
- Comprehensive CLI Usage Guide documentation
- Automated release workflow with GitHub Actions
- Comprehensive CI/CD pipeline
- Docker support for containerized deployment
- Automated dependency updates
- Version bump workflow for easy releases

### Changed
- Updated package.json for npm publishing with bin entry point
- Updated documentation with CLI usage instructions
- Improved build process

### Fixed
- Various bug fixes and improvements

## [1.0.0] - 2024-01-XX

### Added
- Full-screen markdown-based slide presentation system
- Keyboard navigation (arrow keys, Space, S, T, O, D, F, ?)
- Touch gesture support for mobile devices
- Theme selector with 6 themes (Solarized, Dracula, Code Dark/Light)
- Light and dark mode for each theme
- File selector for local markdown files
- Git URL support (GitHub and GitLab)
- Directory navigation in file browser
- Presentation timer with pause/resume
- Slide search and navigation
- PDF export functionality
- Keyboard shortcuts help overlay
- Multiple example presentations
- Responsive design for all screen sizes

### Features Detail

#### Presentation System
- Markdown parsing with support for:
  - Headers (h1-h3)
  - Lists (ordered and unordered)
  - Code blocks with syntax highlighting
  - Blockquotes
  - Links and images
  - Bold, italic, and inline code
- Smooth slide transitions
- Progress indicator
- Current slide highlighting

#### Navigation
- Arrow key navigation
- Spacebar for next slide
- Touch swipe gestures
- Slide list with search (S key)
- Jump to any slide
- First/last slide shortcuts

#### Themes
1. **Solarized Light/Dark** - Classic balanced color scheme
2. **Dracula Light/Dark** - Popular vibrant theme
3. **Code Dark/Light** - Technical coding-friendly themes

Each theme includes:
- Custom color palette
- Optimized typography
- Font pairings (heading, body, code)
- Consistent spacing
- Theme preview thumbnails

#### File Loading
- Local file browser with directory navigation
- GitHub URL support
- GitLab URL support
- File name display (D key)
- Recent files tracking

#### Export
- PDF export with proper formatting
- All slides in single document
- Preserves colors and styling
- Standard RGB color system for compatibility

#### Timer
- Auto-start on presentation load
- Pause/resume controls
- Reset functionality
- HH:MM:SS format for long presentations

#### Developer Experience
- React 19 with TypeScript
- Tailwind CSS 4 for styling
- Vite for fast builds
- Hot Module Replacement (HMR)
- ESLint configuration
- shadcn/ui components

### Technical Implementation
- Built with React functional components and hooks
- TypeScript for type safety
- Framer Motion for animations
- Marked for markdown parsing
- html2canvas and jspdf for PDF export
- Octokit for Git integration
- Local storage for theme persistence
- Touch event handling for mobile

### Documentation
- Comprehensive README with quick start
- User guide with all features
- GitHub Pages deployment guide
- GitLab Pages deployment guide
- VS Code extension guide
- Architecture documentation
- npm publishing guide
- Example presentations

---

## Release Types

### Major Release (X.0.0)
Breaking changes that require user action:
- API changes
- Removed features
- Major architecture changes
- Incompatible updates

### Minor Release (0.X.0)
New features that are backwards compatible:
- New functionality
- New themes
- Enhanced features
- Performance improvements

### Patch Release (0.0.X)
Bug fixes and minor improvements:
- Bug fixes
- Security patches
- Documentation updates
- Minor tweaks

---

## How to Contribute to Changelog

When making changes:

1. **Add to Unreleased section** at the top
2. **Choose correct category:**
   - `Added` - New features
   - `Changed` - Changes to existing features
   - `Deprecated` - Features that will be removed
   - `Removed` - Removed features
   - `Fixed` - Bug fixes
   - `Security` - Security fixes

3. **Format:** `- Brief description of change`

Example:
```markdown
## [Unreleased]

### Added
- New rainbow theme with gradient backgrounds

### Fixed
- PDF export now works with all color formats
```

---

## Version History

[Unreleased]: https://github.com/yourusername/markdown-slides/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/yourusername/markdown-slides/releases/tag/v1.0.0
