# Quick Start - CLI Edition

Get started with Markdown Slides in under 60 seconds using the command-line interface.

## Instant Start (No Installation)

```bash
npx c-deck-lite
```

That's it! Open your browser to http://localhost:3000 and start presenting.

## What Happens Next?

1. **Server starts** on port 3000
2. **Open browser** to http://localhost:3000
3. **Tutorial loads** automatically with sample slides
4. **Start presenting** - use arrow keys to navigate

## Your First Presentation

### Step 1: Create a Markdown File

Create `my-presentation.md`:

```markdown
# My First Presentation

Welcome to my slides!

---

## Why Markdown?

- Easy to write
- Version control friendly
- Portable

---

## Next Steps

- Add more slides
- Try different themes (press T)
- Export to PDF

---

# Thank You!
```

### Step 2: Load Your File

1. Press `O` key in the presentation
2. Navigate to your markdown file
3. Click to load

### Step 3: Present!

- **→ / ↓ / Space**: Next slide
- **← / ↑**: Previous slide
- **T**: Change theme
- **S**: Search slides
- **F**: Fullscreen

## Installation Options

### Option 1: No Installation (npx)

```bash
# Default port 3000
npx c-deck-lite

# Custom port
npx c-deck-lite --port 8080
```

**Pros:** Nothing to install, always latest version  
**Cons:** Slower first run

### Option 2: Global Installation

```bash
# Install once
npm install -g c-deck-lite

# Run anytime
markdown-slides
markdown-slides --port 8080
```

**Pros:** Faster, works offline  
**Cons:** Manual updates needed

### Option 3: Local Development

```bash
# Clone and customize
git clone https://github.com/yourusername/markdown-slides.git
cd markdown-slides
npm install
npm run dev
```

**Pros:** Full control, customizable  
**Cons:** More setup time

## Command Reference

| Command | Description |
|---------|-------------|
| `markdown-slides` | Start on port 3000 |
| `markdown-slides -p 8080` | Start on custom port |
| `markdown-slides --help` | Show help |
| `markdown-slides --version` | Show version |

## Keyboard Shortcuts

Once the server is running and you're in the browser:

| Key | Action |
|-----|--------|
| `→` `↓` `Space` | Next slide |
| `←` `↑` | Previous slide |
| `S` | Slides list + search |
| `T` | Theme selector |
| `O` | Open file |
| `D` | Show filename |
| `F` | Fullscreen |
| `?` | Show help |

## Loading Presentations

### From Local Files

1. Start the server: `npx c-deck-lite`
2. Open browser to http://localhost:3000
3. Press `O` to open file selector
4. Navigate and select your `.md` file

### From Git URLs

1. Press `O` in the presentation
2. Click "Git URL" tab
3. Paste your URL:
   ```
   https://github.com/user/repo/blob/main/slides.md
   ```
4. Click "Load from Git"

## Themes

Press `T` to open theme selector:

- **Solarized** (Light/Dark)
- **Dracula** (Light/Dark)  
- **Code** (Light/Dark)

Each theme optimized for different content types!

## Tips & Tricks

### 1. Multiple Presentations

Run on different ports:

```bash
# Terminal 1
markdown-slides --port 3000

# Terminal 2
markdown-slides --port 3001
```

### 2. Share Presentations

Host your markdown on GitHub, share the URL:

```
https://github.com/user/repo/blob/main/presentation.md
```

Anyone can load it with `O` → Git URL tab!

### 3. Export to PDF

1. Click download icon (top-right)
2. Wait for generation
3. PDF downloads automatically

### 4. Timer Your Presentation

Timer starts automatically when you begin. Use it to practice timing!

### 5. Search Long Presentations

Press `S` to search all slides. Great for Q&A navigation!

## Common Issues

### Port Already in Use

```bash
# Use different port
markdown-slides --port 3001
```

### Command Not Found

If using npx:
```bash
npx c-deck-lite
```

If globally installed:
```bash
npm install -g c-deck-lite
```

### Slides Not Loading

- Check file is `.md` or `.markdown`
- Ensure file path is correct
- For Git URLs, repo must be public

### Server Won't Start

```bash
# Check if port is free
lsof -i :3000  # Mac/Linux
netstat -ano | findstr :3000  # Windows

# Use different port
markdown-slides --port 3005
```

## Next Steps

1. **Read the full guide**: [CLI Usage Guide](./CLI_USAGE_GUIDE.md)
2. **Explore examples**: Check `examples/` folder
3. **Learn shortcuts**: Press `?` in presentation
4. **Try themes**: Press `T` and experiment
5. **Export PDF**: Click download icon

## Getting Help

- **Full documentation**: [README](../../README.md)
- **CLI details**: [CLI_USAGE_GUIDE.md](./CLI_USAGE_GUIDE.md)
- **User guide**: [USER_GUIDE.md](./USER_GUIDE.md)
- **Issues**: https://github.com/yourusername/markdown-slides/issues

## One-Liners

Copy and paste these complete workflows:

```bash
# Quick demo
npx c-deck-lite

# Install and run
npm i -g c-deck-lite && markdown-slides

# Custom port
npx c-deck-lite -p 8080

# Show help
npx c-deck-lite --help
```

---

**That's it!** You're ready to create amazing presentations with Markdown Slides.

Happy presenting! 🎯
