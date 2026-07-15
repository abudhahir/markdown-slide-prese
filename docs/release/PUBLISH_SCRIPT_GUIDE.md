# NPM Publishing Guide

Complete guide to publishing `c-deck-lite` to npm with automated checks and verification.

## Quick Start

```bash
# Using npm script (recommended)
npm run publish:manual

# Or directly
bash scripts/publish.sh
```

## What the Script Does

The publish script automates the entire release process:

### Step 1: Pre-Flight Checks ✓
- Validates `package.json` exists
- Extracts package name and version
- Displays what will be published

### Step 2: Install Dependencies
- Checks if `node_modules/` exists
- Installs dependencies if needed
- Skips if already installed

### Step 3: Lint Check
- Runs ESLint to verify code quality
- Non-blocking (continues if eslint not configured)
- Reports any linting issues

### Step 4: Build
- Runs `npm run build`
- Generates dist/ artifacts
- Reports file count
- **Fails if build is unsuccessful**

### Step 5: NPM Authentication
- Checks if you're logged in
- If not, launches `npm login` prompt
- Handles interactive login flow
- **Blocks publish if login fails**

### Step 6: Pre-Publish Verification
- Confirms dist/ directory exists
- Validates bin entry point
- Checks package files configuration

### Step 7: Publish
- Shows summary of what will be published
- Prompts for confirmation
- Publishes to npm registry
- Waits 10s for registry sync
- Verifies package is live
- Displays npm and CLI installation links

## Usage

### First-Time Publishing

If you're not authenticated with npm:

```bash
npm run publish:manual
```

The script will prompt you to log in:
```
⚠ Not authenticated with npm. Starting login...

Follow the npm login prompts:
  - Username
  - Password (shown as dots)
  - Email
```

Enter your npm credentials when prompted.

### Standard Publishing

```bash
npm run publish:manual
```

You'll see a summary before publication:

```
About to publish:
  Package: c-deck-lite
  Version: v1.0.0

Confirm publish? (y/n) y
```

Press `y` and Enter to proceed.

### Publishing Specific Versions

Before running the script, update the version in `package.json`:

```bash
# In package.json
"version": "1.0.1"

# Then publish
npm run publish:manual
```

Or use npm's built-in version command:

```bash
npm version patch   # 1.0.0 → 1.0.1
npm run publish:manual
```

## What Gets Published

The script publishes exactly what's in the `files` array in package.json:

```json
"files": [
    "bin",
    "dist",
    "README.md",
    "LICENSE"
]
```

Everything else is excluded via `.npmignore`:
- Source files (`src/`)
- Development dependencies
- Documentation files
- GitHub workflows
- Tests and coverage

## Verification

After successful publish, the script:

1. ✅ Confirms publish succeeded
2. 🔄 Waits 10s for registry sync
3. 🔍 Verifies package is live on npm
4. 📦 Shows npm package link
5. 💻 Shows installation commands

Example output:
```
╔════════════════════════════════════════════════════════╗
║  ✓ PUBLISH SUCCESSFUL!                               ║
╚════════════════════════════════════════════════════════╝

Your package is now available:
  https://www.npmjs.com/package/c-deck-lite

Install with:
  npm install c-deck-lite

Or use the CLI:
  npx c-deck-lite
```

## Troubleshooting

### "Build failed!"
```bash
npm run build  # Debug build issues first
npm run lint   # Check for code issues
```

### "NPM login failed!"
```bash
npm logout     # Clear old credentials
npm login      # Manually log in
npm run publish:manual
```

### "package.json not found!"
Make sure you're in the project root directory:
```bash
cd /path/to/c-deck-lite
npm run publish:manual
```

### Package doesn't appear immediately
The npm registry takes 5-10 minutes to fully sync. The script waits 10s, but it may take longer to appear in search results.

Check progress:
```bash
npm view c-deck-lite@VERSION
```

### "Publish cancelled"
The script prompts for confirmation. You can safely cancel with `n`:
```
Confirm publish? (y/n) n
```

Try again when ready.

## Pre-Publish Checklist

Before publishing, ensure:

- [ ] Version bumped in `package.json`
- [ ] `CHANGELOG.md` updated
- [ ] All tests passing (`npm test`)
- [ ] Code linting clean (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] New features documented
- [ ] Git committed and pushed

## Post-Publish

After successful publish:

1. **Create a GitHub Release**
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   # Or use GitHub UI: https://github.com/abudhahir/markdown-slides/releases
   ```

2. **Announce the release**
   - Twitter/X
   - LinkedIn
   - Project discussions

3. **Monitor feedback**
   - Check npm package page comments
   - Monitor GitHub issues
   - Watch for support requests

## NPM Account Setup

If you don't have an npm account:

1. Go to https://www.npmjs.com/signup
2. Create account with:
   - Username
   - Email
   - Strong password
3. Verify email
4. Enable 2FA (recommended)
5. Create access token if needed

## Using Access Tokens

For CI/CD or secure environments, use npm access tokens:

```bash
# Generate token at https://www.npmjs.com/settings/~/tokens
npm config set //registry.npmjs.org/:_authToken "YOUR_TOKEN_HERE"

# Then run publish
npm run publish:manual
```

## GitHub Actions Integration

The project has automated release workflows. See:
- `.github/workflows/release.yml` - Automated releases
- `.github/workflows/deploy.yml` - Deployment pipeline
- `docs/release/RELEASE_WORKFLOW.md` - Detailed documentation

## References

- [NPM Publishing Guide](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages)
- [Package.json Files](https://docs.npmjs.com/cli/configuring-npm/package-json#files)
- [NPM Security Best Practices](https://docs.npmjs.com/secure-your-npm-account-and-code)
