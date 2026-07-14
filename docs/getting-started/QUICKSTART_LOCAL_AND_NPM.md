# 🚀 Quick Guide: Run Locally & Deploy to npm

## Run Locally Right Now (2 minutes)

### Option 1: Development Mode

```bash
npm run dev
```

- Opens on `http://localhost:5173`
- Hot reload enabled (changes reflect instantly)
- Best for development

### Option 2: Production Mode

```bash
npm run build
npm run start
```

- Opens on `http://localhost:3000`
- Production-optimized build
- Test how users will experience it

---

## Testing Before Publishing to npm (5 minutes)

### Step 1: Build the project

```bash
npm run build
```

✅ Creates `dist/` folder with production files

### Step 2: Test the CLI locally

```bash
npm run start
```

✅ Server starts on `http://localhost:3000`
✅ Test all features in your browser

### Step 3: Create a test package

```bash
npm pack
```

✅ Creates `c-deck-lite-1.0.0.tgz`

### Step 4: Test as if installed globally

```bash
# Install the tarball globally
npm install -g ./c-deck-lite-1.0.0.tgz

# Test the command
markdown-slides --help
markdown-slides --port 3000

# Open browser to test
# http://localhost:3000

# Uninstall after testing
npm uninstall -g c-deck-lite
```

✅ Your package works as expected!

---

## Publishing to npm (5 minutes)

### Step 1: Verify package.json

Check that these fields are correct:

```json
{
  "name": "c-deck-lite",
  "version": "1.0.0",
  "author": "abudhahir <abudhahir@gmail.com>",
  "repository": {
    "url": "https://github.com/abudhahir/c-deck-lite.git"
  },
  "private": false
}
```

### Step 2: Login to npm

```bash
npm login
```

Enter your credentials:
- Username: `your-npm-username`
- Password: `your-password`
- Email: `your@email.com`
- 2FA code (if enabled)

Verify:
```bash
npm whoami
```

### Step 3: Check if name is available

```bash
npm view c-deck-lite
```

- If it shows "npm ERR! 404" → Name is available ✅
- If it shows package info → Name is taken, choose another name ❌

### Step 4: Publish

```bash
npm publish
```

**Expected output:**
```
+ c-deck-lite@1.0.0
```

✅ Package published successfully!

### Step 5: Verify publication

```bash
# View on npm
npm view c-deck-lite

# Visit package page
https://www.npmjs.com/package/c-deck-lite
```

---

## Testing After Publishing (2 minutes)

### Test with npx

```bash
# In a different directory
cd ~
npx c-deck-lite
```

✅ Opens on `http://localhost:3000`

### Test global installation

```bash
npm install -g c-deck-lite
markdown-slides --help
markdown-slides
```

✅ Works globally!

---

## Summary: Complete Workflow

```bash
# 1. Build
npm run build

# 2. Test locally
npm run start
# Test in browser: http://localhost:3000

# 3. Test package
npm pack
npm install -g ./c-deck-lite-1.0.0.tgz
markdown-slides --help
npm uninstall -g c-deck-lite

# 4. Login to npm
npm login

# 5. Publish
npm publish

# 6. Test from npm
npx c-deck-lite
```

---

## Common Commands

### Development
```bash
npm install          # Install dependencies
npm run dev         # Dev server (port 5173, hot reload)
npm run build       # Build for production
npm run start       # Run built version (port 3000)
npm run preview     # Preview built version
```

### Testing
```bash
npm pack                           # Create test package
npm install -g ./file.tgz         # Install tarball globally
markdown-slides --help            # Test CLI
npm uninstall -g package-name     # Remove test install
```

### Publishing
```bash
npm login                         # Login to npm
npm whoami                        # Check login
npm view package-name             # Check if name exists
npm publish                       # Publish to npm
npm version patch                 # Bump version (1.0.0 → 1.0.1)
```

### Using After Publishing
```bash
npx c-deck-lite                # Run without installing
npm install -g c-deck-lite    # Install globally
markdown-slides                              # Run installed version
markdown-slides --port 8080                 # Custom port
```

---

## Troubleshooting

### "command not found: markdown-slides"

```bash
# Check global installs
npm list -g c-deck-lite

# Check PATH
echo $PATH | grep $(npm bin -g)

# Add to PATH if needed (add to ~/.bashrc or ~/.zshrc)
export PATH="$(npm bin -g):$PATH"
```

### "dist folder not found"

```bash
# Rebuild
npm run build

# Verify dist exists
ls -la dist/
```

### "You do not have permission to publish"

```bash
# Verify login
npm whoami

# Package name might be taken, try:
npm view c-deck-lite

# If taken, change name in package.json or use scoped:
# "@yourusername/markdown-slides"
```

### Port already in use

```bash
# Kill process on port
npm run kill

# Or use different port
markdown-slides --port 8080
```

---

## Need More Help?

- **Detailed Testing Guide**: [TESTING_AND_LOCAL_DEPLOYMENT.md](./TESTING_AND_LOCAL_DEPLOYMENT.md)
- **npm Publishing**: [NPM_PUBLISHING_GUIDE.md](./NPM_PUBLISHING_GUIDE.md)
- **CLI Documentation**: [CLI_USAGE_GUIDE.md](./CLI_USAGE_GUIDE.md)
- **Full README**: [README.md](./README.md)

---

**You're ready to go! 🎉**

Start with `npm run dev` for local development, or `npm run build && npm run start` to test the production build.
