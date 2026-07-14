# Automated npm Publishing with GitHub Actions

This guide explains how the automated npm publishing workflow works when you create GitHub releases.

## Overview

The project is configured to automatically publish to npm whenever you create a GitHub release. The workflow:

1. ✅ Validates the release version format
2. 🏗️ Builds the application
3. 📦 Creates a GitHub Release with artifacts
4. 🌐 Deploys to GitHub Pages
5. 📤 **Publishes to npm registry**
6. 🐳 Builds and publishes Docker image
7. 📣 Announces the release

## Prerequisites

### 1. npm Account Setup

1. **Create an npm account** at [npmjs.com/signup](https://www.npmjs.com/signup)
2. **Verify your email** address
3. **Enable 2FA** (Two-Factor Authentication) for security
   - Go to [npmjs.com/settings/profile](https://www.npmjs.com/settings/profile)
   - Enable 2FA with authenticator app

### 2. Create npm Access Token

The workflow needs an npm access token to publish on your behalf:

1. **Log in to npm** at [npmjs.com](https://www.npmjs.com)
2. **Go to Access Tokens**: [npmjs.com/settings/tokens](https://www.npmjs.com/settings/tokens)
3. **Click "Generate New Token"**
4. **Select token type**:
   - Choose **"Automation"** (recommended for CI/CD)
   - Or **"Publish"** if you want granular control
5. **Name your token**: e.g., "GitHub Actions - markdown-slides"
6. **Copy the token** immediately (you won't see it again!)

> ⚠️ **Important**: Keep this token secure. Never commit it to your repository!

### 3. Add Token to GitHub Secrets

1. **Go to your GitHub repository**
2. **Navigate to Settings → Secrets and variables → Actions**
3. **Click "New repository secret"**
4. **Create the secret**:
   - Name: `NPM_TOKEN`
   - Value: Paste your npm access token
5. **Click "Add secret"**

## Package Configuration

Ensure your `package.json` is properly configured:

```json
{
  "name": "c-deck-lite",
  "version": "1.0.0",
  "private": false,
  "description": "A powerful markdown-based presentation tool",
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/c-deck-lite.git"
  },
  "keywords": [
    "markdown",
    "slides",
    "presentation",
    "react"
  ],
  "bin": {
    "markdown-slides": "./bin/markdown-slides.js"
  },
  "files": [
    "bin",
    "dist",
    "README.md",
    "LICENSE"
  ]
}
```

### Critical Fields

- ✅ `"private": false` - Must be false to publish publicly
- ✅ `name` - Must be unique on npm (check with `npm view <name>`)
- ✅ `version` - Will be updated automatically by the workflow
- ✅ `repository` - Link to your GitHub repository
- ✅ `files` - Only includes necessary files (keeps package size small)
- ✅ `bin` - CLI entry point for `npx` commands

## How to Create a Release

### Method 1: Using Git Tags (Recommended)

```bash
# Make sure all changes are committed
git add .
git commit -m "Prepare release v1.0.0"

# Create and push a tag
git tag v1.0.0
git push origin main
git push origin v1.0.0
```

This will automatically:
1. Trigger the release workflow
2. Build the application
3. Create a GitHub release
4. Publish to npm
5. Deploy to GitHub Pages

### Method 2: Using GitHub UI

1. **Go to your repository** on GitHub
2. **Click "Releases"** in the right sidebar
3. **Click "Draft a new release"**
4. **Choose or create a tag**: e.g., `v1.0.0`
5. **Fill in release details**:
   - Release title: `Release v1.0.0`
   - Description: Describe what's new
6. **Click "Publish release"**

The workflow will automatically start and publish to npm!

### Method 3: Manual Workflow Dispatch

1. **Go to Actions** tab in your GitHub repository
2. **Select "Release" workflow**
3. **Click "Run workflow"**
4. **Enter version**: e.g., `1.0.0` (without 'v' prefix)
5. **Choose if pre-release**: Check if this is a beta/alpha version
6. **Click "Run workflow"**

## Version Numbering

Follow [Semantic Versioning](https://semver.org/) (semver):

- **MAJOR** version (v1.0.0 → v2.0.0): Breaking changes
- **MINOR** version (v1.0.0 → v1.1.0): New features, backward compatible
- **PATCH** version (v1.0.0 → v1.0.1): Bug fixes, backward compatible

### Pre-release Versions

For beta or alpha releases:

```bash
# Beta release
git tag v1.1.0-beta.0
git push origin v1.1.0-beta.0

# Alpha release
git tag v2.0.0-alpha.1
git push origin v2.0.0-alpha.1
```

## Workflow Steps Explained

### 1. Validate Release (Job 1)

```yaml
- Validates version format (X.Y.Z or X.Y.Z-prerelease)
- Extracts version from tag or manual input
- Outputs version for other jobs
```

### 2. Build (Job 2)

```yaml
- Installs dependencies
- Runs linter
- Builds the application
- Creates build archive
- Uploads artifacts
```

### 3. npm Publish (Job 3) 🚀

```yaml
- Downloads build artifacts
- Updates package.json version
- Verifies package contents
- Runs publish dry-run (test)
- Publishes to npm registry
- Updates GitHub release with npm info
- Verifies publication
```

### 4. Create GitHub Release (Job 4)

```yaml
- Generates changelog from commits
- Creates GitHub release with notes
- Attaches build artifacts
```

### 5. Deploy to GitHub Pages (Job 5)

```yaml
- Deploys application to GitHub Pages
- Makes demo available online
```

### 6. Announce (Job 6)

```yaml
- Creates summary of release
- Shows all published URLs
- Reports npm publication status
```

## Monitoring the Release

### 1. Watch the Workflow

1. **Go to Actions** tab
2. **Click on the running workflow**
3. **Watch each job progress**:
   - ✅ Validate Release
   - ✅ Build Release
   - ✅ **Publish to npm** ← Watch this one!
   - ✅ Create GitHub Release
   - ✅ Deploy to GitHub Pages
   - ✅ Announce Release

### 2. Check npm Publication

Once the workflow completes:

```bash
# Check if package is published
npm view c-deck-lite

# Check specific version
npm view c-deck-lite@1.0.0

# Test installation
npm install c-deck-lite

# Test running
npx c-deck-lite --help
```

### 3. Verify on npm Website

Visit your package page:
- `https://www.npmjs.com/package/c-deck-lite`

You should see:
- ✅ Your package name and version
- ✅ Description and keywords
- ✅ Install instructions
- ✅ README content
- ✅ Repository link

## Troubleshooting

### ❌ "secrets.NPM_TOKEN is not set"

**Problem**: The workflow can't find your npm token.

**Solution**:
1. Create an npm access token (see Prerequisites)
2. Add it to GitHub Secrets as `NPM_TOKEN`
3. Make sure the secret name is exactly `NPM_TOKEN` (case-sensitive)

### ❌ "You do not have permission to publish"

**Problem**: Package name is taken or you don't have access.

**Solutions**:
1. Check if name is available: `npm view your-package-name`
2. Choose a different unique name
3. Use a scoped package: `@yourusername/markdown-slides`
4. Verify you're the package owner (if it already exists)

### ❌ "Package name too similar to existing package"

**Problem**: npm thinks your name is too similar to another package.

**Solutions**:
1. Choose a more distinctive name
2. Use a scoped package: `@yourusername/markdown-slides`
3. Add descriptive suffix: `c-deck-lite`

### ❌ "Cannot publish over previously published version"

**Problem**: You're trying to republish the same version.

**Solutions**:
1. **Never reuse version numbers**
2. Increment version: `v1.0.1` → `v1.0.2`
3. Delete the old tag and create a new one with higher version

### ❌ "401 Unauthorized"

**Problem**: npm token is invalid or expired.

**Solutions**:
1. Generate a new npm access token
2. Update the `NPM_TOKEN` secret in GitHub
3. Make sure 2FA code is not required (use Automation token type)

### ❌ Build fails or package is missing files

**Problem**: Build artifacts not included correctly.

**Solutions**:
1. Check `.npmignore` doesn't exclude needed files
2. Verify `files` array in `package.json`
3. Run locally: `npm pack --dry-run`
4. Test the tarball before releasing

### ⚠️ npm publish succeeds but package not found

**Problem**: npm indexing delay (normal for new packages).

**Solution**:
- Wait 5-10 minutes for npm to index the package
- Try again: `npm view your-package-name`
- Check your npm account packages: [npmjs.com/~yourusername](https://npmjs.com/~yourusername)

## Testing Before Release

Always test your package locally before creating a release:

```bash
# 1. Build the package
npm run build

# 2. Create a test tarball
npm pack

# 3. Install in a test directory
mkdir test-install
cd test-install
npm install ../c-deck-lite-1.0.0.tgz

# 4. Test the CLI
npx markdown-slides --help
npx markdown-slides

# 5. Clean up
cd ..
rm -rf test-install
rm c-deck-lite-1.0.0.tgz
```

## Complete Release Checklist

Before creating a release:

- [ ] All changes committed and pushed
- [ ] Version number decided (following semver)
- [ ] CHANGELOG.md updated with new version
- [ ] README.md updated if needed
- [ ] Tests passing locally
- [ ] Build succeeds: `npm run build`
- [ ] Lint passes: `npm run lint`
- [ ] Package tested locally: `npm pack`
- [ ] npm token is set in GitHub Secrets
- [ ] `package.json` has correct metadata
- [ ] `.npmignore` configured properly

## Updating After Release

If you need to make changes after a release:

```bash
# Fix the issue
git add .
git commit -m "Fix: description of fix"

# Create a new patch version
git tag v1.0.1
git push origin main
git push origin v1.0.1
```

The workflow will automatically publish the new version!

## Publishing Manually (Fallback)

If the automated workflow fails, you can publish manually:

```bash
# 1. Ensure you're on the release tag
git checkout v1.0.0

# 2. Install and build
npm ci
npm run build

# 3. Login to npm
npm login

# 4. Publish
npm publish --access public

# 5. Verify
npm view c-deck-lite
```

## Security Best Practices

1. **Enable 2FA** on your npm account
2. **Use Automation tokens** for CI/CD (not Publish tokens)
3. **Rotate tokens** periodically (every 6-12 months)
4. **Never commit** npm tokens to the repository
5. **Use GitHub Secrets** for sensitive data
6. **Review** `.npmignore` to avoid leaking sensitive files
7. **Audit dependencies**: `npm audit` before releasing
8. **Keep dependencies updated**: Regular `npm update`

## Advanced: Publishing to Multiple Registries

You can also publish to GitHub Packages alongside npm:

### Add to workflow

```yaml
- name: Publish to GitHub Packages
  run: |
    echo "@yourusername:registry=https://npm.pkg.github.com" >> .npmrc
    npm publish --registry=https://npm.pkg.github.com
  env:
    NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Users can install from GitHub

```bash
npm install @yourusername/c-deck-lite
```

## Resources

- 📚 [npm Documentation](https://docs.npmjs.com/)
- 📚 [Semantic Versioning](https://semver.org/)
- 📚 [GitHub Actions Documentation](https://docs.github.com/en/actions)
- 📚 [Publishing npm Packages](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages)
- 📚 [npm Access Tokens](https://docs.npmjs.com/about-access-tokens)
- 📚 [GitHub Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

## Quick Reference

### Create a release:
```bash
git tag v1.0.0 && git push origin v1.0.0
```

### Check if published:
```bash
npm view c-deck-lite
```

### Test install:
```bash
npm install c-deck-lite
npx c-deck-lite --help
```

### Update version:
```bash
git tag v1.0.1 && git push origin v1.0.1
```

---

🎉 **That's it!** Your package will be automatically published to npm whenever you create a GitHub release!

For manual publishing instructions, see [NPM_PUBLISHING_GUIDE.md](./NPM_PUBLISHING_GUIDE.md).
