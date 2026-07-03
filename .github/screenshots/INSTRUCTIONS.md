# Instructions for Creating Real Screenshots

This directory contains SVG placeholders. Replace them with actual screenshots for better visual appeal.

## How to Create Real Screenshots

### 1. Hero Demo (Animated GIF)
**Recommended tool**: [LICEcap](https://www.cockos.com/licecap/) or [Kap](https://getkap.co/)

**Steps**:
1. Run `npm run dev`
2. Open http://localhost:5173
3. Start recording
4. Navigate through 3-4 slides showing:
   - Arrow key navigation
   - Theme switching (press T)
   - File selector (press O)
   - Slides list (press S)
5. Stop recording and save as `hero-demo.gif`
6. Optimize with [Gifski](https://gif.ski/) or similar
7. Keep file size under 5MB

### 2. Theme Selector Screenshot
1. Run the app and press `T`
2. Make sure all theme previews are visible
3. Take screenshot at 1600x1200
4. Crop to just the dialog
5. Save as `theme-selector.png`
6. Optimize with [TinyPNG](https://tinypng.com/)

### 3. File Selector Screenshot
1. Press `O` to open file selector
2. Expand a folder showing markdown files
3. Take screenshot at 1600x1200
4. Crop to dialog area
5. Save as `file-selector.png`

### 4. Keyboard Shortcuts Screenshot
1. Press `?` to show shortcuts
2. Take screenshot at 1200x1000
3. Crop to dialog
4. Save as `keyboard-shortcuts.png`

### 5. Mobile View Screenshot
**Use browser dev tools**:
1. Open Chrome DevTools (F12)
2. Toggle device toolbar (Cmd+Shift+M)
3. Select iPhone 12 Pro or similar
4. Navigate to a slide
5. Take screenshot (Cmd+Shift+P → "Capture screenshot")
6. Save as `mobile-view.png`

### 6. Additional Screenshots

**Slides List**:
- Press `S` to show slides list
- Type in search box to demonstrate search
- Screenshot at 1400x1000
- Save as `slides-list.png`

**PDF Export**:
- Click PDF export icon
- Show the export dialog
- Screenshot at 1200x800
- Save as `pdf-export.png`

**Presentation Timer**:
- Show timer in top-left corner
- Capture during presentation
- Screenshot at 1920x1080, crop to timer area
- Save as `presentation-timer.png`

## Optimization Tips

1. **PNG files**: Use TinyPNG or ImageOptim to reduce size
2. **GIF files**: Keep under 5MB, use 10-15 fps, reduce dimensions if needed
3. **Resolution**: 2x retina displays are fine, but compress afterward
4. **Format**: PNG for static images, GIF for animations
5. **Naming**: Use descriptive kebab-case names

## Alternative: Use Figma/Sketch

If you prefer design tools:
1. Create mockups in Figma/Sketch
2. Export at 2x resolution
3. Optimize and place in this directory

## File Checklist

- [ ] `hero-demo.gif` - Main animated demo (5MB max)
- [ ] `theme-selector.png` - Theme picker with previews
- [ ] `file-selector.png` - File browser dialog
- [ ] `keyboard-shortcuts.png` - Shortcuts help dialog
- [ ] `slides-list.png` - Slides list with search
- [ ] `mobile-view.png` - Mobile responsive view
- [ ] `pdf-export.png` - PDF export feature
- [ ] `presentation-timer.png` - Timer controls

## After Creating Screenshots

Update README.md image paths if needed:
```markdown
![Hero Demo](./.github/screenshots/hero-demo.gif)
```

The current SVG placeholders will work but real screenshots are much better!
