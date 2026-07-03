# Screenshots & Demo Assets

This directory contains visual assets (screenshots, demo GIFs, and diagrams) for the project README and documentation.

## 📁 Current Files

### SVG Placeholders (Currently Active)
- ✅ `hero-demo.svg` - Main presentation view placeholder
- ✅ `theme-selector.svg` - Theme selector dialog placeholder
- ✅ `file-selector.svg` - File browser dialog placeholder
- ✅ `keyboard-shortcuts.svg` - Shortcuts help dialog placeholder
- ✅ `mobile-view.svg` - Mobile responsive view placeholder
- ✅ `features-overview.svg` - Feature cards overview
- ✅ `comparison.svg` - Comparison chart with traditional tools
- ✅ `getting-started-steps.svg` - Quick start visual guide

### Real Screenshots (To Be Added)
- ⏳ `hero-demo.gif` - Animated demo showing navigation and features
- ⏳ `theme-selector.png` - Actual theme selector with previews
- ⏳ `file-selector.png` - Actual file browser with folders
- ⏳ `slides-list.png` - Slides list overlay with search
- ⏳ `keyboard-shortcuts.png` - Real shortcuts help dialog
- ⏳ `pdf-export.png` - PDF export functionality
- ⏳ `presentation-timer.png` - Timer controls
- ⏳ `mobile-view.png` - Real mobile responsive view

## 🎨 Visual Assets Purpose

### hero-demo
Shows the main presentation interface with a slide visible, navigation controls, timer, and progress indicator. **Animated GIF** showing navigation between slides.

### theme-selector
Displays the theme selection dialog with all 6 themes, light/dark toggle, and preview thumbnails showing actual slide content.

### file-selector
Shows the file browser with both "Local Files" and "Git URL" tabs, demonstrating folder navigation and markdown file selection.

### keyboard-shortcuts
Displays the help dialog listing all keyboard shortcuts organized by category.

### mobile-view
Shows the presentation optimized for mobile devices with touch gesture indicators and responsive layout.

### features-overview
Visual card layout highlighting the 4 main features: Markdown-First, Fast Navigation, Beautiful Themes, and Cross-Platform support.

### comparison
Side-by-side comparison chart showing advantages of Markdown Slides over traditional presentation tools.

### getting-started-steps
3-step visual guide showing: Install → Create Slides → Present!

## 📖 Usage in Documentation

These assets are referenced in:
- **Main README.md** - Hero image, features, comparison, getting started
- **Visual Guide** (docs/getting-started/VISUAL_GUIDE.md) - Detailed feature screenshots
- **User Guide** - Usage examples
- **CLI Guide** - Command examples

## 🚀 Generating Real Screenshots

### Quick Start

```bash
# Make sure the app is running
npm run dev

# Run the helper script
chmod +x .github/screenshots/generate-screenshots.sh
.github/screenshots/generate-screenshots.sh
```

The script will guide you through capturing all needed screenshots.

### Manual Process

1. **Start the app**: `npm run dev`
2. **Navigate to http://localhost:5173**
3. **Capture each screenshot** following the checklist below
4. **Optimize images** (see tools below)
5. **Replace SVG placeholders** with PNG/GIF files

## ✅ Screenshot Checklist

- [ ] **hero-demo.gif** (Animated, 5MB max)
  - Record navigating 3-4 slides
  - Show theme switching (T)
  - Show file selector (O)
  - Resolution: 1920x1080 @ 15fps

- [ ] **theme-selector.png** 
  - Press 'T' to open
  - Show all theme previews
  - Resolution: 1600x1200, crop to dialog

- [ ] **file-selector.png**
  - Press 'O' to open
  - Expand a folder
  - Resolution: 1600x1200, crop to dialog

- [ ] **keyboard-shortcuts.png**
  - Press '?' to open
  - Resolution: 1200x1000, crop to dialog

- [ ] **slides-list.png**
  - Press 'S' to open
  - Type in search box
  - Resolution: 1400x1000

- [ ] **mobile-view.png**
  - Use Chrome DevTools mobile mode
  - Device: iPhone 12 Pro
  - Show swipe gesture indicators

- [ ] **pdf-export.png** (Optional)
  - Click download icon
  - Resolution: 1200x800

- [ ] **presentation-timer.png** (Optional)
  - Crop timer from top-left
  - Show play/pause/reset buttons

## 🛠️ Recommended Tools

### For Animated GIFs
- **[LICEcap](https://www.cockos.com/licecap/)** - Free, cross-platform
- **[Kap](https://getkap.co/)** - Mac, free, excellent quality
- **[ScreenToGif](https://www.screentogif.com/)** - Windows, free

### For Screenshots
- **Built-in tools**:
  - Mac: `Cmd+Shift+4` (area), `Cmd+Shift+3` (full screen)
  - Windows: `Win+Shift+S`
  - Linux: `gnome-screenshot` or `scrot`
- **Browser tools**:
  - Chrome DevTools: `Cmd+Shift+P` → "Capture screenshot"
  - Firefox: Right-click → "Take Screenshot"

### For Optimization
- **[TinyPNG](https://tinypng.com/)** - PNG compression (70% reduction)
- **[Gifski](https://gif.ski/)** - Best GIF quality and optimization
- **[ImageOptim](https://imageoptim.com/)** - Mac batch optimizer
- **[Squoosh](https://squoosh.app/)** - Web-based image optimizer

## 📏 Image Specifications

### Screenshots (PNG)
- **Resolution**: 1920x1080 or 1600x1200
- **Format**: PNG with transparency where applicable
- **Optimization**: Compress to < 500KB per image
- **DPI**: 72 (web standard)

### Animated Demos (GIF)
- **Resolution**: 1280x720 or 1920x1080
- **Frame Rate**: 10-15 fps
- **Duration**: 5-15 seconds
- **File Size**: < 5MB
- **Colors**: 256 colors (standard GIF)

### SVG Diagrams (Current)
- **Format**: SVG (scalable)
- **Optimization**: Already optimized
- **Purpose**: Placeholders until real screenshots added

## 🔄 Replacing Placeholders

To replace SVG placeholders with real screenshots:

1. **Same filename**: Use the same name but with `.png` or `.gif` extension
2. **Update README**: No changes needed! Markdown will automatically use the real image if both exist
3. **Keep SVG**: Keep the SVG as a backup/fallback

Example:
```
Before:
  hero-demo.svg (placeholder)

After:
  hero-demo.svg (backup)
  hero-demo.gif (used in README)
```

## 💡 Tips for Great Screenshots

### Content
- ✅ Use the default tutorial slides (already loaded)
- ✅ Make sure all fonts are loaded
- ✅ Use a clean browser (no bookmarks bar, etc.)
- ✅ Enable high-DPI/Retina display if available

### Timing
- ✅ Wait for animations to complete
- ✅ Ensure dialogs are fully open
- ✅ Give elements time to load

### Consistency
- ✅ Use the same browser for all screenshots
- ✅ Use the same zoom level (100%)
- ✅ Use the same theme (default Midnight)
- ✅ Crop to consistent dimensions

### Quality
- ✅ No blur or compression artifacts
- ✅ Clear, readable text
- ✅ Proper lighting and contrast
- ✅ Accurate colors

## 📚 Additional Resources

- **[INSTRUCTIONS.md](./INSTRUCTIONS.md)** - Detailed step-by-step instructions
- **[generate-screenshots.sh](./generate-screenshots.sh)** - Automated helper script
- **[Visual Guide](../../docs/getting-started/VISUAL_GUIDE.md)** - Documentation with all screenshots

## 🤝 Contributing Screenshots

If you create high-quality screenshots:

1. Follow the specifications above
2. Optimize the images
3. Submit a pull request
4. Include a description of what changed

We appreciate contributions that make the documentation more visual and appealing!

---

**Current Status**: ✅ SVG placeholders active | ⏳ Real screenshots pending

**Last Updated**: 2024 (Initial setup with SVG placeholders)
