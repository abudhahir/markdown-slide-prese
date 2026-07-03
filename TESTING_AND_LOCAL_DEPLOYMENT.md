# Testing and Local Deployment Guide

Complete guide for testing your package locally before publishing to npm and running it with npx.

## Table of Contents

1. [Quick Start - Test Locally](#quick-start---test-locally)
2. [Step-by-Step Testing](#step-by-step-testing)
3. [Running with npx](#running-with-npx)
4. [Publishing to npm](#publishing-to-npm)
5. [Post-Publishing Verification](#post-publishing-verification)
6. [Troubleshooting](#troubleshooting)

---

## Quick Start - Test Locally

```bash
# 1. Build the project
npm run build

# 2. Test the CLI locally
npm run start

# 3. Open browser to http://localhost:3000
```

That's it! Your app should be running locally.

---

## Step-by-Step Testing

### Prerequisites

- Node.js 18.x or higher
- npm 8.x or higher
- All dependencies installed: `npm install`

### 1. Build the Production Bundle

```bash
npm run build
```

This creates a `dist/` folder with:
- `index.html` - Entry HTML file
- `assets/` - JavaScript, CSS, and other assets
- All necessary files for production

**Verify the build:**
```bash
ls -la dist/
```

You should see:
```
dist/
├── index.html
└── assets/
    ├── index-[hash].js
    ├── index-[hash].css
    └── ...
```

### 2. Test the CLI Locally

The CLI entry point is in `bin/markdown-slides.js`. Test it directly:

```bash
# Run with default port (3000)
npm run start

# Or run the CLI script directly
node bin/markdown-slides.js

# Test with custom port
node bin/markdown-slides.js --port 8080

# Test help command
node bin/markdown-slides.js --help

# Test version command
node bin/markdown-slides.js --version
```

### 3. Test the Built Application

Once the server is running:

1. **Open browser**: Navigate to `http://localhost:3000`
2. **Test basic navigation**:
   - Arrow keys (← → ↑ ↓) to navigate slides
   - Press `S` to open slides list
   - Press `T` to open theme selector
3. **Test file loading**:
   - Press `O` to open file selector
   - Try loading a local markdown file
4. **Test Git URL loading**:
   - Press `O` → Git URL tab
   - Try: `https://raw.githubusercontent.com/yourusername/repo/main/slides.md`
5. **Test PDF export**:
   - Click the download icon
   - Verify PDF downloads

### 4. Create a Test Package

Test the package as if it were installed from npm:

```bash
# Create a tarball (simulates npm package)
npm pack
```

This creates: `markdown-slides-presenter-1.0.0.tgz`

**Install the tarball locally:**

```bash
# Create a test directory
mkdir test-install
cd test-install

# Install from the tarball
npm install ../markdown-slides-presenter-1.0.0.tgz

# Test the CLI
npx markdown-slides
# or
./node_modules/.bin/markdown-slides
```

### 5. Test Global Installation (Local)

Test as if installed globally:

```bash
# Install globally from the tarball
npm install -g ./markdown-slides-presenter-1.0.0.tgz

# Run from anywhere
markdown-slides

# Test different options
markdown-slides --port 8080
markdown-slides --help
markdown-slides --version

# Uninstall after testing
npm uninstall -g markdown-slides-presenter
```

### 6. Verify Package Contents

Check what will be included in the npm package:

```bash
# List files that will be published
npm pack --dry-run
```

Expected files:
- `bin/markdown-slides.js` (CLI entry point)
- `dist/` (built application)
- `README.md` (documentation)
- `LICENSE` (license file)
- `package.json` (metadata)

Files that should NOT be included (via `.npmignore`):
- `src/` (source files)
- `node_modules/`
- `.github/`, `.gitlab-ci.yml`
- `examples/`
- Documentation files (except README.md)

---

## Running with npx

### Before Publishing (Local Testing)

You can test npx behavior locally using a tarball:

```bash
# Create tarball
npm pack

# Run with npx from tarball
npx ./markdown-slides-presenter-1.0.0.tgz
```

### After Publishing to npm

Once published, users can run:

```bash
# Run without installing
npx markdown-slides-presenter

# With custom port
npx markdown-slides-presenter --port 8080

# View help
npx markdown-slides-presenter --help
```

---

## Publishing to npm

### Pre-Publishing Checklist

- ✅ **Build succeeds**: `npm run build` completes without errors
- ✅ **CLI works locally**: `npm run start` starts the server
- ✅ **Tests pass**: All features work in browser
- ✅ **Package metadata correct**: Check `package.json`:
  - `name` is available on npm (search at npmjs.com)
  - `version` is correct
  - `author` has your details
  - `repository`, `bugs`, `homepage` URLs are correct
  - `keywords` are relevant
- ✅ **README is complete**: Update any placeholder URLs
- ✅ **LICENSE exists**: MIT license file is present
- ✅ **Git is clean**: All changes committed
- ✅ **`.npmignore` configured**: Only necessary files included

### Publishing Steps

#### 1. Login to npm

```bash
npm login
```

Enter your npm credentials:
- Username
- Password
- Email
- 2FA code (if enabled)

Verify login:
```bash
npm whoami
```

#### 2. Check Package Name Availability

```bash
# Search for your desired package name
npm search markdown-slides-presenter

# View package info (should fail if available)
npm view markdown-slides-presenter
```

If the name is taken, update `package.json` with a different name:
- `markdown-slides-presenter`
- `@yourusername/markdown-slides`
- `md-slides-presenter`
- etc.

#### 3. Final Pre-Publish Test

```bash
# Clean previous builds
rm -rf dist/
rm -f *.tgz

# Fresh install and build
npm install
npm run build

# Test the build
npm run start
# Verify in browser: http://localhost:3000

# Create and test tarball
npm pack
npm install -g ./markdown-slides-presenter-1.0.0.tgz
markdown-slides --help
npm uninstall -g markdown-slides-presenter
```

#### 4. Publish to npm

```bash
# Publish to npm registry
npm publish

# For scoped packages (if using @yourusername/package)
npm publish --access public
```

**Expected output:**
```
npm notice 
npm notice 📦  markdown-slides-presenter@1.0.0
npm notice === Tarball Contents === 
npm notice 4.2kB  bin/markdown-slides.js
npm notice 2.5MB  dist/...
npm notice 8.1kB  README.md
npm notice 1.1kB  LICENSE
npm notice 2.3kB  package.json
npm notice === Tarball Details === 
npm notice name:          markdown-slides-presenter
npm notice version:       1.0.0
npm notice package size:  850.3 kB
npm notice unpacked size: 2.5 MB
npm notice total files:   15
npm notice 
+ markdown-slides-presenter@1.0.0
```

#### 5. Verify Publication

```bash
# View published package
npm view markdown-slides-presenter

# Check package page
open https://www.npmjs.com/package/markdown-slides-presenter
```

---

## Post-Publishing Verification

### Test Installation from npm

```bash
# Create a clean test directory
mkdir npm-test
cd npm-test

# Install from npm
npm install -g markdown-slides-presenter

# Test the command
markdown-slides --version
markdown-slides --help
markdown-slides --port 3000

# Open browser and test functionality
# http://localhost:3000
```

### Test with npx

```bash
# Run without installing
npx markdown-slides-presenter

# With options
npx markdown-slides-presenter --port 8080
```

### Test in Different Environments

**Test on different platforms:**

1. **Linux/Mac**:
   ```bash
   npx markdown-slides-presenter
   ```

2. **Windows**:
   ```powershell
   npx markdown-slides-presenter
   ```

3. **Different Node versions**:
   ```bash
   # Use nvm to test different versions
   nvm use 18
   npx markdown-slides-presenter
   
   nvm use 20
   npx markdown-slides-presenter
   ```

---

## Troubleshooting

### Build Issues

**Problem**: Build fails with TypeScript errors

```bash
# Fix: Skip type checking during build
npm run build -- --noCheck
```

**Problem**: Build succeeds but dist/ is empty

```bash
# Check vite config
cat vite.config.ts

# Ensure build output is configured correctly
# Re-run build with verbose output
npm run build -- --debug
```

### CLI Issues

**Problem**: `markdown-slides: command not found`

```bash
# Verify global installation
npm list -g markdown-slides-presenter

# Check npm global bin path
npm bin -g

# Ensure npm global bin is in PATH
echo $PATH | grep $(npm bin -g)

# If not in PATH, add to ~/.bashrc or ~/.zshrc:
export PATH="$(npm bin -g):$PATH"
```

**Problem**: CLI runs but shows "dist folder not found"

```bash
# Verify dist exists after build
ls -la dist/

# Check package.json files field includes dist/
cat package.json | grep -A 5 '"files"'

# Reinstall with fresh build
npm run build
npm install -g .
```

**Problem**: Server starts but browser shows blank page

```bash
# Check if index.html exists
ls -la dist/index.html

# Check browser console for errors
# Common issues:
# - Missing assets (check dist/assets/)
# - CORS issues (shouldn't happen with local server)
# - JavaScript errors (check browser console)
```

### npm Publishing Issues

**Problem**: "You do not have permission to publish"

```bash
# Verify you're logged in
npm whoami

# Check package name isn't taken
npm view markdown-slides-presenter

# Try a different package name or scope it
# Update package.json name to: @yourusername/markdown-slides
```

**Problem**: "Version already exists"

```bash
# Bump version
npm version patch  # 1.0.0 -> 1.0.1
# or
npm version minor  # 1.0.0 -> 1.1.0
# or
npm version major  # 1.0.0 -> 2.0.0

# Then publish again
npm publish
```

**Problem**: Package publishes but doesn't include dist/

```bash
# Check .npmignore doesn't exclude dist/
cat .npmignore | grep dist

# Verify files field in package.json
cat package.json | grep -A 5 '"files"'

# Should include:
"files": [
  "bin",
  "dist",
  "README.md",
  "LICENSE"
]

# Unpublish if needed (within 72 hours)
npm unpublish markdown-slides-presenter@1.0.0

# Fix and republish with new version
npm version patch
npm publish
```

### Runtime Issues

**Problem**: Port already in use

```bash
# Kill process on port 3000
npm run kill
# or
lsof -ti:3000 | xargs kill -9

# Or use a different port
markdown-slides --port 8080
```

**Problem**: Cannot load local files

```bash
# This is expected in browser for security reasons
# Local file system access is limited
# Use the file selector UI (press 'O')
# Or load from Git URL
```

**Problem**: PDF export fails

```bash
# Check browser console for specific error
# Common issues:
# - Fonts not loaded (wait for all fonts to load)
# - Too many slides (try smaller presentation)
# - Browser memory limits (close other tabs)

# Try in different browser:
# - Chrome (recommended)
# - Firefox
# - Edge
```

### Testing in CI/CD

Example GitHub Actions workflow to test the package:

```yaml
name: Test Package

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x, 20.x, 22.x]
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Test CLI
        run: |
          npm pack
          npm install -g ./markdown-slides-presenter-*.tgz
          markdown-slides --help
          markdown-slides --version
```

---

## Additional Resources

- [NPM Publishing Guide](./NPM_PUBLISHING_GUIDE.md) - Detailed npm publishing instructions
- [CLI Usage Guide](./CLI_USAGE_GUIDE.md) - Complete CLI documentation
- [README](./README.md) - User documentation
- [npm documentation](https://docs.npmjs.com/)
- [npm pack documentation](https://docs.npmjs.com/cli/v9/commands/npm-pack)
- [npm publish documentation](https://docs.npmjs.com/cli/v9/commands/npm-publish)

---

## Quick Reference Commands

```bash
# Development
npm install              # Install dependencies
npm run dev             # Start dev server (port 5173)
npm run build           # Build for production
npm run preview         # Preview production build

# Local Testing
npm run start           # Run CLI locally
npm pack                # Create tarball
npm install -g ./file.tgz  # Install from tarball

# Publishing
npm login               # Login to npm
npm whoami              # Check login
npm publish             # Publish package
npm view package-name   # View published package

# CLI Usage
markdown-slides         # Run on port 3000
markdown-slides -p 8080 # Run on port 8080
markdown-slides --help  # Show help
markdown-slides --version # Show version

# npx Usage (after publishing)
npx markdown-slides-presenter
npx markdown-slides-presenter -p 8080
```

---

**Good luck with your deployment!** 🚀

If you encounter issues not covered here, please open an issue on GitHub.
