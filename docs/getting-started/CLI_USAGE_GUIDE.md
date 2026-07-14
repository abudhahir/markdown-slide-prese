# CLI Usage Guide

This guide covers how to use Markdown Slides as a command-line tool with npm or npx.

## Table of Contents

- [Quick Start](#quick-start)
- [Installation Methods](#installation-methods)
- [CLI Commands](#cli-commands)
- [Configuration](#configuration)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)

## Quick Start

The fastest way to get started is using npx (no installation required):

```bash
npx c-deck-lite
```

This will:
1. Download the package (if not cached)
2. Start a local web server on port 3000
3. Open your browser to the presentation interface

## Installation Methods

### Method 1: npx (Recommended for One-Time Use)

Perfect for quick presentations without cluttering your system:

```bash
# Run directly without installing
npx c-deck-lite

# Run on custom port
npx c-deck-lite --port 8080
```

**Pros:**
- No installation required
- Always uses the latest version
- No global dependencies

**Cons:**
- Slower first run (needs to download)
- Requires internet connection on first run

### Method 2: Global Installation

Best for frequent users who present regularly:

```bash
# Install globally
npm install -g c-deck-lite

# Run from anywhere
markdown-slides

# Or with full command name
c-deck-lite
```

**Pros:**
- Fast startup
- Available offline
- Simple command

**Cons:**
- Takes up disk space
- Need to manually update

### Method 3: Local Development

For developers or customization:

```bash
# Clone repository
git clone https://github.com/yourusername/markdown-slides.git
cd markdown-slides

# Install dependencies
npm install

# Start development server (with hot reload)
npm run dev

# Or build and run production version
npm run build
npm run start
```

## CLI Commands

### Basic Usage

```bash
markdown-slides [options]
```

### Available Options

| Option | Alias | Description | Default |
|--------|-------|-------------|---------|
| `--port <number>` | `-p` | Port to run server on | 3000 |
| `--help` | `-h` | Display help message | - |
| `--version` | `-v` | Show version number | - |

### Examples

```bash
# Run on default port (3000)
markdown-slides

# Run on port 8080
markdown-slides --port 8080

# Run on port 5000 (short form)
markdown-slides -p 5000

# Show help
markdown-slides --help

# Check version
markdown-slides --version
```

## Server Behavior

When you start the server:

1. **Checks for build files**: Ensures `dist/` folder exists
2. **Starts HTTP server**: Serves the application
3. **Prints URLs**: Shows local URL to access
4. **Watches for signals**: Responds to Ctrl+C for graceful shutdown

### Starting the Server

```bash
$ markdown-slides

🎯 Markdown Slides is running!

   Local:   http://localhost:3000

Press Ctrl+C to stop the server
```

### Stopping the Server

Press `Ctrl+C` (or `Cmd+C` on Mac) to stop:

```bash
^C
Shutting down server...
Server stopped
```

## Port Selection

### Default Port (3000)

```bash
markdown-slides
# Accessible at http://localhost:3000
```

### Custom Port

```bash
# Long form
markdown-slides --port 8080

# Short form
markdown-slides -p 8080
```

### Port Conflicts

If the port is already in use, you'll see an error:

```bash
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution**: Use a different port:

```bash
markdown-slides --port 3001
```

### Finding Available Ports

Common ports to try:
- 3000-3010 (development)
- 8000-8080 (web servers)
- 5000-5100 (alternative)

## Configuration

### Environment Variables

You can set environment variables for additional configuration:

```bash
# Set custom port via environment
PORT=8080 markdown-slides

# Set node environment
NODE_ENV=production markdown-slides
```

### Using with Package.json Scripts

Add to your project's `package.json`:

```json
{
  "scripts": {
    "slides": "markdown-slides",
    "slides:custom": "markdown-slides --port 8080"
  }
}
```

Then run:

```bash
npm run slides
npm run slides:custom
```

## Working with Presentations

### Loading Local Files

Once the server is running:

1. Open http://localhost:3000 in your browser
2. Press `O` key to open file selector
3. Navigate to your markdown files
4. Click to load presentation

### Loading from Git

1. Press `O` key
2. Click "Git URL" tab
3. Paste your GitHub/GitLab URL
4. Click "Load from Git"

Supported URLs:
```
https://github.com/owner/repo/blob/main/slides.md
https://gitlab.com/owner/repo/-/blob/main/slides.md
```

## Integration Examples

### Shell Alias

Add to your `~/.bashrc` or `~/.zshrc`:

```bash
alias slides="markdown-slides"
alias slides-alt="markdown-slides --port 8080"
```

Then use:

```bash
slides
slides-alt
```

### npm Scripts

In your project's `package.json`:

```json
{
  "scripts": {
    "present": "markdown-slides",
    "present:prod": "markdown-slides --port 80"
  }
}
```

### Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

RUN npm install -g c-deck-lite

EXPOSE 3000

CMD ["markdown-slides"]
```

Build and run:

```bash
docker build -t markdown-slides .
docker run -p 3000:3000 markdown-slides
```

### CI/CD Preview

Use in GitHub Actions:

```yaml
- name: Start Presentation
  run: |
    npm install -g c-deck-lite
    markdown-slides --port 8080 &
    sleep 5
    curl http://localhost:8080
```

## Advanced Usage

### Running Multiple Instances

Run multiple presentations on different ports:

```bash
# Terminal 1
markdown-slides --port 3000

# Terminal 2
markdown-slides --port 3001

# Terminal 3
markdown-slides --port 3002
```

### Background Process

Run as background process (Unix/Linux):

```bash
# Start in background
markdown-slides --port 3000 &

# Save process ID
echo $! > slides.pid

# Stop later
kill $(cat slides.pid)
```

### Using with tmux

Run in a tmux session:

```bash
# Create new session
tmux new -s slides

# Start server
markdown-slides

# Detach: Ctrl+B then D
# Reattach: tmux attach -t slides
```

### Using with screen

Run in a screen session:

```bash
# Create new screen
screen -S slides

# Start server
markdown-slides

# Detach: Ctrl+A then D
# Reattach: screen -r slides
```

## Troubleshooting

### Command Not Found

**Problem**: `bash: markdown-slides: command not found`

**Solutions**:

1. **If using npx**: Use full command:
   ```bash
   npx c-deck-lite
   ```

2. **If globally installed**: Check npm global path:
   ```bash
   npm config get prefix
   # Add to PATH if needed
   export PATH="$(npm config get prefix)/bin:$PATH"
   ```

3. **Reinstall globally**:
   ```bash
   npm uninstall -g c-deck-lite
   npm install -g c-deck-lite
   ```

### Dist Folder Not Found

**Problem**: `Error: dist folder not found`

**Solution**: Build the project first:

```bash
npm run build
npm run start
```

### Port Already in Use

**Problem**: `Error: listen EADDRINUSE`

**Solutions**:

1. **Use different port**:
   ```bash
   markdown-slides --port 3001
   ```

2. **Find and kill process** (Unix/Linux):
   ```bash
   lsof -i :3000
   kill -9 <PID>
   ```

3. **Find and kill process** (Windows):
   ```bash
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```

### Permission Denied

**Problem**: `Error: EACCES: permission denied`

**Solutions**:

1. **Use port above 1024** (non-privileged):
   ```bash
   markdown-slides --port 3000
   ```

2. **Use sudo** (not recommended):
   ```bash
   sudo markdown-slides --port 80
   ```

3. **Fix npm permissions**:
   ```bash
   mkdir ~/.npm-global
   npm config set prefix '~/.npm-global'
   export PATH=~/.npm-global/bin:$PATH
   ```

### Cannot Find Module

**Problem**: Module errors when running

**Solution**: Reinstall dependencies:

```bash
# Global install
npm uninstall -g c-deck-lite
npm cache clean --force
npm install -g c-deck-lite

# Local install
rm -rf node_modules
npm install
npm run build
```

### Browser Doesn't Open Automatically

**Note**: The CLI doesn't auto-open browsers. Manually navigate to the URL shown:

```bash
markdown-slides

# Copy the URL and paste in browser
# Usually: http://localhost:3000
```

## Best Practices

### 1. Use npx for Quick Presentations

```bash
npx c-deck-lite
```

### 2. Install Globally for Regular Use

```bash
npm install -g c-deck-lite
markdown-slides
```

### 3. Check Version Regularly

```bash
markdown-slides --version
npm update -g c-deck-lite
```

### 4. Use Custom Ports for Multiple Instances

```bash
markdown-slides --port 3000  # Project A
markdown-slides --port 3001  # Project B
```

### 5. Create Aliases for Convenience

```bash
alias slides="markdown-slides"
alias slides-work="markdown-slides --port 8080"
```

## Performance Tips

### 1. Use Local Installation for Speed

Global or local installation is faster than npx:

```bash
npm install -g c-deck-lite
```

### 2. Clear npx Cache if Slow

```bash
npx clear-npx-cache
# Or manually:
rm -rf ~/.npm/_npx
```

### 3. Optimize Browser

- Use Chrome/Firefox for best performance
- Close unnecessary tabs
- Disable heavy browser extensions

### 4. Build Optimization

If building locally:

```bash
NODE_ENV=production npm run build
```

## Getting Help

### Check Version

```bash
markdown-slides --version
```

### Show Help

```bash
markdown-slides --help
```

### Report Issues

If you encounter issues:

1. Check this troubleshooting guide
2. Search existing issues: https://github.com/yourusername/markdown-slides/issues
3. Create new issue with:
   - Command used
   - Error message
   - System info (`node --version`, `npm --version`)
   - Browser used

## Additional Resources

- [Main README](./README.md) - Project overview
- [User Guide](./USER_GUIDE.md) - Presentation features
- [NPM Publishing Guide](./NPM_PUBLISHING_GUIDE.md) - Publishing instructions
- [GitHub Repository](https://github.com/yourusername/markdown-slides)
- [npm Package](https://www.npmjs.com/package/c-deck-lite)

---

Happy presenting! 🎉
