# 🚀 Quick Start: Automated Releases

Get your first release out in 5 minutes!

## Prerequisites

- ✅ GitHub repository
- ✅ Code pushed to `main` branch
- ✅ All files committed

## Step 1: Enable GitHub Pages (1 minute)

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **GitHub Actions**
4. Click **Save**

✅ Done! GitHub Pages is configured.

## Step 2: Create Your First Release (2 minutes)

### Option A: Using GitHub UI (Easiest)

1. Go to **Actions** tab in your repository
2. Click **Version Bump** in the left sidebar
3. Click **Run workflow** button (top right)
4. Select:
   - **Bump type**: `minor` (for first release)
   - **Create release**: ✓ Check this box
5. Click **Run workflow**

✅ That's it! The workflow will:
- Update version to 1.0.0
- Create a git tag
- Build your app
- Create GitHub Release
- Deploy to GitHub Pages

### Option B: Using Command Line

```bash
# Create and push a tag
git tag v1.0.0
git push origin v1.0.0
```

✅ The release workflow starts automatically!

## Step 3: Verify (2 minutes)

### Watch the Progress

1. Stay on the **Actions** tab
2. Click the running **Release** workflow
3. Watch the jobs complete (takes 2-3 minutes)

### Check Your Release

Once complete, verify:

1. **GitHub Release**
   ```
   https://github.com/YOUR_USERNAME/YOUR_REPO/releases
   ```
   You should see v1.0.0 with changelog!

2. **Live Demo**
   ```
   https://YOUR_USERNAME.github.io/YOUR_REPO
   ```
   Your app is live! 🎉

3. **Docker Image** (optional)
   ```bash
   docker pull ghcr.io/YOUR_USERNAME/YOUR_REPO:latest
   ```

## What Just Happened?

The automated workflow:
- ✅ Built your application
- ✅ Generated a changelog from commits
- ✅ Created a GitHub Release with notes
- ✅ Deployed to GitHub Pages
- ✅ Built a Docker container
- ✅ Tagged everything properly

## Next Releases

For subsequent releases, it's even easier:

### Bug Fix (1.0.0 → 1.0.1)
```bash
# Actions → Version Bump → "patch"
```

### New Feature (1.0.1 → 1.1.0)
```bash
# Actions → Version Bump → "minor"
```

### Breaking Change (1.1.0 → 2.0.0)
```bash
# Actions → Version Bump → "major"
```

## Optional: npm Publishing

Want to publish to npm? Add this:

### 1. Create npm Token

1. Go to [npmjs.com](https://www.npmjs.com/)
2. Sign up/login
3. Click your avatar → **Access Tokens**
4. Click **Generate New Token** → **Classic Token**
5. Select **Automation** type
6. Copy the token

### 2. Add to GitHub

1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `NPM_TOKEN`
4. Value: *paste your token*
5. Click **Add secret**

### 3. Update package.json

```json
{
  "name": "@yourusername/markdown-slides",
  "version": "1.0.0",
  "private": false,
  "author": "Your Name <you@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/markdown-slides.git"
  }
}
```

✅ Next release will automatically publish to npm!

## Using the Release Script

For command-line convenience:

```bash
# Make executable (one time)
chmod +x scripts/release.sh

# Create releases
./scripts/release.sh patch   # Bug fix
./scripts/release.sh minor   # New feature
./scripts/release.sh major   # Breaking change

# Check status
./scripts/release.sh status
```

## Commit Message Format

For better changelogs, use conventional commits:

```bash
# Features
git commit -m "feat: add new theme selector"

# Bug fixes
git commit -m "fix: resolve PDF export issue"

# Docs
git commit -m "docs: update README"
```

The changelog will automatically group these!

## Troubleshooting

### Release workflow not starting?

**Check**:
- Tag format must be `vX.Y.Z` (e.g., `v1.0.0`)
- Tag pushed to GitHub: `git push origin v1.0.0`
- Workflows enabled in Settings → Actions

### GitHub Pages showing 404?

**Wait**: Pages deployment takes 1-2 minutes after workflow completes

**Check**:
- Settings → Pages → Source = "GitHub Actions"
- Workflow completed successfully
- Clear browser cache

### Docker image not available?

Docker builds only run for tagged releases (not workflow_dispatch).
Create a tag: `git tag v1.0.0 && git push origin v1.0.0`

## Get Help

- 📖 [Full Documentation](./RELEASE_WORKFLOW.md)
- 🚀 [Quick Reference](../.github/RELEASE_GUIDE.md)
- 📝 [Implementation Details](./RELEASE_IMPLEMENTATION.md)

## Success! 🎉

You now have:
- ✅ Automated releases
- ✅ Live demo on GitHub Pages
- ✅ Versioned releases with changelogs
- ✅ Docker containers
- ✅ Easy version management

**Every future release is just one click away!**

---

### Quick Commands Cheat Sheet

```bash
# Create release
git tag v1.0.0 && git push origin v1.0.0

# Or use GitHub UI
# Actions → Version Bump → Run workflow

# Or use helper script
./scripts/release.sh minor

# Check release
gh release list

# View live demo
open https://$(git config --get remote.origin.url | sed 's/.*://;s/.git$//' | sed 's/.*github.com\///' | sed 's/\.git$//' | awk -F'/' '{print $1".github.io/"$2}')
```

Happy releasing! 🚀
