# Quick Start: Automated Release & npm Publishing

**TL;DR**: Push a git tag → Everything publishes automatically! 🚀

## 5-Minute Setup

### Step 1: Get npm Token (2 minutes)

1. Go to [npmjs.com/settings/tokens](https://www.npmjs.com/settings/tokens)
2. Click "Generate New Token" → Choose "Automation"
3. Copy the token (save it somewhere temporarily)

### Step 2: Add Token to GitHub (1 minute)

1. Go to your GitHub repo → Settings → Secrets → Actions
2. Click "New repository secret"
3. Name: `NPM_TOKEN`
4. Value: Paste your npm token
5. Click "Add secret"

### Step 3: Verify Package Settings (1 minute)

Check your `package.json`:

```json
{
  "name": "c-deck-lite",
  "version": "1.0.0",
  "private": false,  // ← Must be false!
  "author": "Your Name <email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/c-deck-lite.git"
  }
}
```

### Step 4: Create Your First Release (1 minute)

```bash
# Make sure everything is committed
git add .
git commit -m "Ready for first release"
git push origin main

# Create and push a tag
git tag v1.0.0
git push origin v1.0.0
```

**Done!** 🎉

Go to GitHub → Actions tab and watch your package being published!

## What Happens Automatically?

When you push a tag:

1. ✅ **Builds** your application
2. ✅ **Creates** GitHub release with changelog
3. ✅ **Publishes** to npm registry
4. ✅ **Deploys** to GitHub Pages
5. ✅ **Builds** Docker image
6. ✅ **Announces** with all links

After ~2-5 minutes:

- Your package is live on npm: `npm install c-deck-lite`
- Demo is updated: `https://yourusername.github.io/c-deck-lite`
- Release is on GitHub: `https://github.com/yourusername/repo/releases/tag/v1.0.0`

## Subsequent Releases

For future releases, just update and tag:

```bash
# Make your changes
git add .
git commit -m "feat: add awesome new feature"

# Create next version
git tag v1.1.0
git push origin main
git push origin v1.1.0
```

**That's it!** No need to run npm publish manually ever again.

## Version Numbers

Follow [Semantic Versioning](https://semver.org/):

- **v1.0.0 → v1.0.1** - Bug fixes (PATCH)
- **v1.0.0 → v1.1.0** - New features (MINOR)
- **v1.0.0 → v2.0.0** - Breaking changes (MAJOR)

## Testing Before Release

Recommended workflow:

```bash
# 1. Test locally
npm run build
npm run start

# 2. Test package creation
npm pack
# Creates: c-deck-lite-1.0.0.tgz

# 3. Test installation in temp directory
mkdir test && cd test
npm install ../c-deck-lite-1.0.0.tgz
npx c-deck-lite --help
cd .. && rm -rf test

# 4. If everything works, create release
git tag v1.0.0
git push origin v1.0.0
```

## Verification

After workflow completes:

```bash
# Check npm
npm view c-deck-lite

# Test install
npm install c-deck-lite

# Test run
npx c-deck-lite --help
```

## Troubleshooting

### "npm publish failed"

**Check these:**
- [ ] NPM_TOKEN is set in GitHub Secrets
- [ ] Package name is unique: `npm view your-package-name` (should show 404 for new packages)
- [ ] `"private": false` in package.json
- [ ] npm token hasn't expired

### "You do not have permission to publish"

**Solutions:**
- Package name is taken → choose a different name
- Use scoped package: `@yourusername/markdown-slides`

### "Cannot publish over existing version"

**Solution:**
- Never reuse version numbers
- Increment: v1.0.0 → v1.0.1

### Need help?

See full documentation:
- [AUTOMATED_NPM_PUBLISHING.md](./AUTOMATED_NPM_PUBLISHING.md) - Complete guide
- [NPM_PUBLISHING_GUIDE.md](./NPM_PUBLISHING_GUIDE.md) - Manual publishing
- [RELEASE_WORKFLOW.md](./RELEASE_WORKFLOW.md) - Workflow details

## Bonus: Using GitHub UI

Don't like command line? Use GitHub:

1. Go to your repo → Releases → "Draft a new release"
2. Click "Choose a tag" → Type `v1.0.0` → "Create new tag"
3. Generate release notes (or write your own)
4. Click "Publish release"

Workflow triggers automatically!

## Pre-release Versions

For beta/alpha releases:

```bash
git tag v1.1.0-beta.0
git push origin v1.1.0-beta.0
```

Users install with:
```bash
npm install c-deck-lite@beta
```

---

**That's it!** You now have automated npm publishing. Just push tags and everything happens automatically! 🚀✨
