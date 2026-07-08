# Release Scripts

Helper scripts for managing releases and publishing.

## publish.sh

Complete NPM publishing script with authentication, pre-checks, build, and verification.

### Quick Start

```bash
npm run publish
```

### What It Does

1. **Pre-Flight Checks** - Validates package.json
2. **Dependencies** - Installs node_modules if needed
3. **Linting** - Runs ESLint
4. **Build** - Creates dist/ artifacts
5. **Authentication** - Handles NPM login
6. **Verification** - Checks package configuration
7. **Publish** - Publishes to npm with confirmation
8. **Verification** - Confirms package is live

### Features

✅ Automatic dependency installation  
✅ Interactive npm login prompt  
✅ Pre-publish confirmation  
✅ Build verification  
✅ Linting checks  
✅ Registry sync verification  
✅ Installation instructions  
✅ Colored output for readability  

### Usage

```bash
# Publish with all checks
npm run publish

# Or directly
bash scripts/publish.sh
```

See [PUBLISH_SCRIPT_GUIDE.md](../docs/release/PUBLISH_SCRIPT_GUIDE.md) for detailed documentation.

---

## release.sh

Bash script to simplify the release process.

### Prerequisites

- Node.js and npm installed
- Git installed
- Clean working directory
- On main branch (recommended)

### Usage

Make the script executable:
```bash
chmod +x scripts/release.sh
```

Run commands:
```bash
# Create patch release (1.0.0 → 1.0.1)
./scripts/release.sh patch

# Create minor release (1.0.0 → 1.1.0)
./scripts/release.sh minor

# Create major release (1.0.0 → 2.0.0)
./scripts/release.sh major

# Create pre-release
./scripts/release.sh pre

# Show current status
./scripts/release.sh status

# Show help
./scripts/release.sh help
```

### What It Does

1. **Checks**:
   - Verifies git repository
   - Ensures clean working directory
   - Confirms on main branch

2. **Tests**:
   - Runs ESLint
   - Builds the application

3. **Version Bump**:
   - Updates package.json
   - Creates version commit
   - Creates and pushes git tag

4. **Triggers Automation**:
   - Tag push triggers GitHub Actions
   - Automated release workflow runs
   - Creates GitHub Release
   - Deploys to GitHub Pages
   - Publishes to npm (if configured)
   - Builds Docker image

### Example Output

```bash
$ ./scripts/release.sh patch

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Creating patch Release
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ℹ Running tests...
✓ Lint passed
✓ Build passed
ℹ Bumping version (patch)...
✓ Version bumped: 1.0.0 → 1.0.1

⚠ About to create release v1.0.1
Continue? (y/N) y

✓ Created commit and tag v1.0.1
ℹ Pushing to remote...
✓ Release v1.0.1 created!
ℹ GitHub Actions will now build and publish the release
ℹ Check progress at: https://github.com/yourusername/markdown-slides/actions
```

## Alternative: npm Scripts

Add to package.json for quick access:

```json
{
  "scripts": {
    "release:patch": "./scripts/release.sh patch",
    "release:minor": "./scripts/release.sh minor",
    "release:major": "./scripts/release.sh major",
    "release:pre": "./scripts/release.sh pre",
    "release:status": "./scripts/release.sh status"
  }
}
```

Then use:
```bash
npm run release:patch
npm run release:minor
npm run release:major
```

## Troubleshooting

**Permission denied:**
```bash
chmod +x scripts/release.sh
```

**Not on main branch:**
Script will warn but allow you to proceed if confirmed.

**Working directory not clean:**
Commit or stash changes first:
```bash
git status
git add .
git commit -m "your message"
```

**Tests failing:**
Fix issues before releasing:
```bash
npm run lint
npm run build
```
