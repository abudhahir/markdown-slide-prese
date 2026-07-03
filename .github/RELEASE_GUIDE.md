# Quick Release Guide

This is a quick reference for creating releases. For detailed information, see [RELEASE_WORKFLOW.md](../RELEASE_WORKFLOW.md).

## Prerequisites

- [ ] All changes merged to `main` branch
- [ ] Code tested locally
- [ ] Documentation updated
- [ ] CHANGELOG.md updated (optional - auto-generated)

## Quick Release (Recommended)

Use the automated version bump workflow:

1. **Go to GitHub Actions**
   - Navigate to: Actions → Version Bump

2. **Run Workflow**
   - Click "Run workflow"
   - Select bump type:
     - **patch** (1.0.0 → 1.0.1) - Bug fixes
     - **minor** (1.0.0 → 1.1.0) - New features
     - **major** (1.0.0 → 2.0.0) - Breaking changes
   - Check "Create release after bump"
   - Click "Run workflow"

3. **Done!**
   - Workflow automatically:
     - Updates version
     - Creates commit
     - Creates tag
     - Triggers release
     - Deploys to GitHub Pages
     - Publishes to npm (if configured)
     - Builds Docker image

## Manual Release

If you prefer manual control:

### Step 1: Update Version

```bash
# Patch release (bug fixes)
npm version patch

# Minor release (new features)
npm version minor

# Major release (breaking changes)
npm version major

# Pre-release
npm version prerelease --preid=beta
```

### Step 2: Push Tag

```bash
# Push commit and tag
git push origin main --tags
```

### Step 3: Release Workflow Runs Automatically

The push of the tag triggers the release workflow, which:
- Builds the application
- Creates GitHub Release
- Deploys to GitHub Pages
- Publishes to npm (if configured)
- Builds Docker image

## Pre-release

For beta/alpha versions:

```bash
# Create pre-release tag
git tag v1.0.0-beta.1
git push origin v1.0.0-beta.1
```

Or use GitHub UI:
- Actions → Release → Run workflow
- Version: `1.0.0-beta.1`
- Pre-release: ✓

## Hotfix Release

For urgent fixes:

```bash
# Create hotfix branch
git checkout -b hotfix/critical-bug

# Fix and commit
git add .
git commit -m "fix: critical bug description"

# Merge to main
git checkout main
git merge hotfix/critical-bug
git push origin main

# Bump version
npm version patch
git push origin main --tags
```

## Verify Release

After release workflow completes:

1. **GitHub Release**
   - Check: https://github.com/yourusername/markdown-slides/releases
   - Verify changelog and assets

2. **GitHub Pages**
   - Visit: https://yourusername.github.io/markdown-slides
   - Test the live demo

3. **npm Package** (if configured)
   - Check: https://www.npmjs.com/package/markdown-slides
   - Test: `npm install markdown-slides@latest`

4. **Docker Image**
   - Check: https://github.com/yourusername/markdown-slides/pkgs/container/markdown-slides
   - Test: `docker pull ghcr.io/yourusername/markdown-slides:latest`

## Rollback

If something goes wrong:

```bash
# Delete the tag locally
git tag -d v1.0.0

# Delete the tag remotely
git push origin :refs/tags/v1.0.0

# Delete GitHub release (use GitHub UI or gh CLI)
gh release delete v1.0.0

# Revert commit if needed
git revert HEAD
git push origin main
```

## Commit Message Format

Use conventional commits for better changelogs:

```bash
# Features
git commit -m "feat: add new theme selector"

# Bug fixes
git commit -m "fix: resolve PDF export issue"

# Documentation
git commit -m "docs: update README"

# Breaking changes
git commit -m "feat!: redesign API"
# or
git commit -m "feat: redesign API

BREAKING CHANGE: API endpoints have changed"
```

## Version Strategy

Follow Semantic Versioning:

- **Major (X.0.0)**: Breaking changes
- **Minor (0.X.0)**: New features (backwards compatible)
- **Patch (0.0.X)**: Bug fixes

## Checklist

Before releasing:

- [ ] All tests pass: `npm run build`
- [ ] Lint checks pass: `npm run lint`
- [ ] Documentation is up to date
- [ ] Examples work correctly
- [ ] Breaking changes documented
- [ ] CHANGELOG updated (if manual)

## Common Issues

**Release workflow fails:**
- Check Actions logs for errors
- Verify secrets are configured (NPM_TOKEN)
- Ensure version format is correct

**GitHub Pages not updating:**
- Wait 1-2 minutes
- Check Pages settings
- Clear browser cache

**npm publish fails:**
- Verify NPM_TOKEN is valid
- Check package name availability
- Ensure version is unique

## Get Help

- [Full Release Workflow Guide](../RELEASE_WORKFLOW.md)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## Quick Commands Reference

```bash
# Check current version
npm version

# List all tags
git tag -l

# View recent releases
gh release list

# Watch workflow run
gh run watch

# Create release manually
gh release create v1.0.0 --generate-notes

# Deploy to GitHub Pages manually
npm run build
gh pages deploy --dir dist
```
