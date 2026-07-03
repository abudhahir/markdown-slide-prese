#!/bin/bash

# Screenshot Generation Helper Script
# This script helps you generate all the screenshots needed for the README

set -e

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║       Markdown Slides - Screenshot Generation Helper          ║"
echo "╔════════════════════════════════════════════════════════════════╗"
echo ""

# Check if the app is running
echo "📋 Step 1: Checking if app is running..."
if ! curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo "❌ App is not running on localhost:5173"
    echo "   Please run 'npm run dev' in another terminal first."
    exit 1
fi
echo "✅ App is running!"
echo ""

# Create screenshots directory if it doesn't exist
SCREENSHOTS_DIR=".github/screenshots"
mkdir -p "$SCREENSHOTS_DIR"

echo "📁 Screenshots will be saved to: $SCREENSHOTS_DIR"
echo ""

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                    SCREENSHOT CHECKLIST                        ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

echo "Please capture the following screenshots manually:"
echo ""

echo "1️⃣  HERO DEMO (Animated GIF)"
echo "   📍 What: Main presentation view with navigation"
echo "   🎬 Action: Record navigating through 3-4 slides"
echo "   ⌨️  Use: Arrow keys to navigate, press T, O, S"
echo "   💾 Save as: hero-demo.gif"
echo "   📏 Size: 1920x1080, optimize to < 5MB"
echo "   🔗 URL: http://localhost:5173"
echo ""

echo "2️⃣  THEME SELECTOR"
echo "   📍 What: Theme selection dialog with previews"
echo "   ⌨️  Action: Press 'T' to open theme selector"
echo "   💾 Save as: theme-selector.png"
echo "   📏 Size: 1600x1200 (crop to dialog)"
echo "   🔗 URL: http://localhost:5173 (then press T)"
echo ""

echo "3️⃣  FILE SELECTOR"
echo "   📍 What: File browser with local files tab"
echo "   ⌨️  Action: Press 'O' to open file selector"
echo "   💾 Save as: file-selector.png"
echo "   📏 Size: 1600x1200 (crop to dialog)"
echo "   🔗 URL: http://localhost:5173 (then press O)"
echo ""

echo "4️⃣  KEYBOARD SHORTCUTS"
echo "   📍 What: Keyboard shortcuts help dialog"
echo "   ⌨️  Action: Press '?' to show shortcuts"
echo "   💾 Save as: keyboard-shortcuts.png"
echo "   📏 Size: 1200x1000 (crop to dialog)"
echo "   🔗 URL: http://localhost:5173 (then press ?)"
echo ""

echo "5️⃣  SLIDES LIST"
echo "   📍 What: Slides list overlay with search"
echo "   ⌨️  Action: Press 'S' to show slides list"
echo "   💾 Save as: slides-list.png"
echo "   📏 Size: 1400x1000"
echo "   🔗 URL: http://localhost:5173 (then press S)"
echo ""

echo "6️⃣  MOBILE VIEW"
echo "   📍 What: Mobile responsive view"
echo "   🔧 Action: Use Chrome DevTools device mode"
echo "   📱 Device: iPhone 12 Pro or similar"
echo "   💾 Save as: mobile-view.png"
echo "   📏 Size: Device dimensions"
echo "   🔗 URL: http://localhost:5173 (in mobile mode)"
echo ""

echo "7️⃣  PDF EXPORT DIALOG (Optional)"
echo "   📍 What: PDF export dialog"
echo "   🖱️  Action: Click download icon"
echo "   💾 Save as: pdf-export.png"
echo "   📏 Size: 1200x800"
echo ""

echo "8️⃣  PRESENTATION TIMER (Optional)"
echo "   📍 What: Timer in top-left corner"
echo "   🎬 Action: Screenshot during presentation"
echo "   💾 Save as: presentation-timer.png"
echo "   📏 Size: Crop to timer area"
echo ""

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                     RECOMMENDED TOOLS                          ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

echo "For Animated GIFs:"
echo "  • LICEcap - https://www.cockos.com/licecap/ (Free, cross-platform)"
echo "  • Kap - https://getkap.co/ (Mac, free)"
echo "  • ScreenToGif - https://www.screentogif.com/ (Windows, free)"
echo ""

echo "For Screenshots:"
echo "  • Built-in tools (Cmd+Shift+4 on Mac, Win+Shift+S on Windows)"
echo "  • Chrome DevTools (Cmd+Shift+P → 'Capture screenshot')"
echo "  • Firefox Screenshot Tool (right-click → 'Take Screenshot')"
echo ""

echo "For Optimization:"
echo "  • TinyPNG - https://tinypng.com/ (PNG compression)"
echo "  • Gifski - https://gif.ski/ (GIF optimization)"
echo "  • ImageOptim - https://imageoptim.com/ (Mac)"
echo ""

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                    QUICK START GUIDE                           ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

echo "1. Open http://localhost:5173 in your browser"
echo "2. Use the actions listed above to capture each screenshot"
echo "3. Save screenshots to: $SCREENSHOTS_DIR"
echo "4. Optimize images using the tools mentioned"
echo "5. Replace the SVG placeholders with your PNG/GIF files"
echo "6. Commit and push to GitHub"
echo ""

echo "💡 TIP: The current SVG placeholders will work, but real"
echo "   screenshots make the README much more appealing!"
echo ""

echo "📖 For detailed instructions, see:"
echo "   .github/screenshots/INSTRUCTIONS.md"
echo ""

echo "✅ Once you have captured all screenshots, they will"
echo "   automatically appear in the README!"
echo ""

read -p "Press Enter to open the app in your browser..."
if command -v open > /dev/null; then
    open http://localhost:5173
elif command -v xdg-open > /dev/null; then
    xdg-open http://localhost:5173
elif command -v start > /dev/null; then
    start http://localhost:5173
else
    echo "🌐 Please open http://localhost:5173 in your browser"
fi

echo ""
echo "Happy screenshotting! 📸"
