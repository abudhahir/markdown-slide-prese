# Pre-Release Guide

This guide explains how to create and publish alpha, beta, and release candidate versions of the markdown-slides-presenter package.

## 📋 Table of Contents

- [Overview](#overview)
- [Pre-Release Types](#pre-release-types)
- [Creating Pre-Releases](#creating-pre-releases)
- [npm Tags](#npm-tags)
- [Installation](#installation)
- [Best Practices](#best-practices)
- [Version Progression](#version-progression)

## Overview

Pre-releases allow you to publish experimental versions of your package for testing before making them generally available. They use special version numbers and npm distribution tags to prevent users from accidentally installing unstable versions.

## Pre-Release Types

### 🔷 Alpha (`-alpha`)

**Purpose:** Early development versions with incomplete features or known issues.

**Use When:**
- Testing experimental features
- Breaking API changes are being developed
- Features are incomplete or unstable
- Significant bugs are expected

**Example:** `1.2.0-alpha.1`, `1.2.0-alpha.2`

**npm Tag:** `alpha`

**Warning Level:** ⚠️⚠️⚠️ Not for production use

---

### 🔶 Beta (`-beta`)

**Purpose:** Feature-complete versions undergoing testing and bug fixes.

**Use When:**
- All planned features are implemented
- API is mostly stable
- Seeking broader testing and feedback
- Minor bugs may still exist

**Example:** `1.2.0-beta.1`, `1.2.0-beta.2`

**npm Tag:** `beta`

**Warning Level:** ⚠️⚠️ Use with caution in production

---

### 🔸 Release Candidate (`-rc`)

**Purpose:** Final testing before stable release.

**Use When:**
- No new features planned
- Only critical bug fixes allowed
- API is frozen
- Ready for final validation

**Example:** `1.2.0-rc.1`, `1.2.0-rc.2`

**npm Tag:** `rc`

**Warning Level:** ⚠️ Near production-ready

---

## Creating Pre-Releases

### Method 1: Using Git Tags (Recommended)

#### Alpha Release

```bash
# Create and push alpha tag
git tag v1.2.0-alpha.1
git push origin v1.2.0-alpha.1
```

#### Beta Release

```bash
# Create and push beta tag
git tag v1.2.0-beta.1
git push origin v1.2.0-beta.1
```

#### Release Candidate

```bash
# Create and push RC tag
git tag v1.2.0-rc.1
git push origin v1.2.0-rc.1
```

#### Incrementing Pre-Releases

```bash
# Next alpha version
git tag v1.2.0-alpha.2
git push origin v1.2.0-alpha.2

# Next beta version
git tag v1.2.0-beta.2
git push origin v1.2.0-beta.2

# Next RC version
git tag v1.2.0-rc.2
git push origin v1.2.0-rc.2
```

---

### Method 2: Manual Workflow Dispatch

You can also trigger releases manually from GitHub Actions:

1. Go to **Actions** → **Release** workflow
2. Click **Run workflow**
3. Enter version (e.g., `1.2.0-beta.1`)
4. Check **Mark as pre-release** if needed
5. Click **Run workflow**

---

## npm Tags

Pre-releases are published to npm with specific distribution tags:

| Version Pattern | npm Tag | Install Command |
|----------------|---------|-----------------|
| `1.2.0-alpha.x` | `alpha` | `npm install markdown-slides-presenter@alpha` |
| `1.2.0-beta.x` | `beta` | `npm install markdown-slides-presenter@beta` |
| `1.2.0-rc.x` | `rc` | `npm install markdown-slides-presenter@rc` |
| `1.2.0` (stable) | `latest` | `npm install markdown-slides-presenter` |

### Why Tags Matter

- **Prevents accidental installs:** Users running `npm install` get the stable version
- **Easy testing:** Testers can install pre-releases using the tag
- **Parallel versions:** Multiple versions can coexist on npm

---

## Installation

### For End Users (Stable Only)

```bash
# Always installs the latest stable version
npm install markdown-slides-presenter

# Or run with npx
npx markdown-slides-presenter
```

### For Testers (Pre-Release Versions)

#### Install Latest Alpha

```bash
npm install markdown-slides-presenter@alpha

# Or specific alpha version
npm install markdown-slides-presenter@1.2.0-alpha.1

# Run with npx
npx markdown-slides-presenter@alpha
```

#### Install Latest Beta

```bash
npm install markdown-slides-presenter@beta

# Or specific beta version
npm install markdown-slides-presenter@1.2.0-beta.1

# Run with npx
npx markdown-slides-presenter@beta
```

#### Install Latest RC

```bash
npm install markdown-slides-presenter@rc

# Or specific RC version
npm install markdown-slides-presenter@1.2.0-rc.1

# Run with npx
npx markdown-slides-presenter@rc
```

#### Check Available Versions

```bash
# List all versions
npm view markdown-slides-presenter versions

# Show specific tag
npm view markdown-slides-presenter dist-tags

# Show specific pre-release versions
npm view markdown-slides-presenter versions --json | grep -E "alpha|beta|rc"
```

---

## Best Practices

### 1. Version Naming Convention

Follow semantic versioning with pre-release identifiers:

```
MAJOR.MINOR.PATCH-PRERELEASE.NUMBER

Examples:
  1.2.0-alpha.1    ✅ Correct
  1.2.0-beta.3     ✅ Correct
  1.2.0-rc.1       ✅ Correct
  1.2.0-test.1     ⚠️ Use 'alpha' instead
  1.2.0-unstable   ❌ Missing number
```

### 2. Pre-Release Progression

Always follow this order:

```
1.2.0-alpha.1 → 1.2.0-alpha.2 → ... → 
1.2.0-beta.1 → 1.2.0-beta.2 → ... → 
1.2.0-rc.1 → 1.2.0-rc.2 → ... → 
1.2.0 (stable)
```

### 3. When to Skip Stages

You don't need all stages for every release:

- **Minor bug fixes:** Go straight to stable (`1.2.1`)
- **Small features:** Start with beta (`1.3.0-beta.1`)
- **Major changes:** Use full progression (alpha → beta → rc → stable)

### 4. Communication

- **Announce pre-releases:** Let your community know about test versions
- **Document changes:** Include clear changelog for each pre-release
- **Set expectations:** Clearly state what kind of feedback you're seeking
- **Warn users:** Pre-release notes should include appropriate warnings

### 5. GitHub Pages Deployment

- **Stable releases:** Automatically deployed to GitHub Pages
- **Pre-releases:** NOT deployed to GitHub Pages (to keep demo stable)
- **Manual testing:** Use local builds or dev environment for pre-release testing

---

## Version Progression

### Example: Version 1.2.0 Development

```bash
# Start development with first alpha
git tag v1.2.0-alpha.1
git push origin v1.2.0-alpha.1

# After testing, release alpha.2 with fixes
git tag v1.2.0-alpha.2
git push origin v1.2.0-alpha.2

# Feature complete, move to beta
git tag v1.2.0-beta.1
git push origin v1.2.0-beta.1

# Beta testing reveals bugs, release beta.2
git tag v1.2.0-beta.2
git push origin v1.2.0-beta.2

# Ready for final testing
git tag v1.2.0-rc.1
git push origin v1.2.0-rc.1

# Critical fix needed in RC
git tag v1.2.0-rc.2
git push origin v1.2.0-rc.2

# Everything looks good, ship stable!
git tag v1.2.0
git push origin v1.2.0
```

### Typical Timeline

```
Week 1-2:  Alpha releases (1.2.0-alpha.1, .2, .3, ...)
Week 3-4:  Beta releases (1.2.0-beta.1, .2, ...)
Week 5:    Release candidates (1.2.0-rc.1, .2, ...)
Week 6:    Stable release (1.2.0)
```

---

## Automation Details

When you push a pre-release tag, the GitHub Actions workflow automatically:

1. ✅ Validates version format
2. ✅ Detects pre-release type (alpha/beta/rc)
3. ✅ Runs tests and builds
4. ✅ Creates GitHub Release (marked as pre-release)
5. ✅ Publishes to npm with appropriate tag
6. ✅ Adds installation instructions to release notes
7. ❌ Skips GitHub Pages deployment (only for stable releases)

---

## Troubleshooting

### Pre-release not publishing to npm

**Check:**
- NPM_TOKEN secret is configured in repository settings
- Version follows correct format (`X.Y.Z-TYPE.N`)
- Tag starts with `v` (e.g., `v1.2.0-beta.1`)

### Wrong npm tag assigned

The system auto-detects tags based on version:
- `-alpha` → `alpha` tag
- `-beta` → `beta` tag
- `-rc` → `rc` tag
- No suffix → `latest` tag

### Can't install pre-release

```bash
# Try clearing npm cache
npm cache clean --force

# Try with explicit version
npm install markdown-slides-presenter@1.2.0-beta.1

# Check if version exists
npm view markdown-slides-presenter versions
```

### Users accidentally getting pre-release

This shouldn't happen if you're using tags correctly. Verify:

```bash
# Check what 'latest' points to
npm view markdown-slides-presenter dist-tags

# Should show: { latest: '1.x.x', beta: '1.x.x-beta.x', ... }
```

---

## Examples

### Releasing a Major Feature (v2.0.0)

```bash
# Start with alpha for breaking changes
git tag v2.0.0-alpha.1
git push origin v2.0.0-alpha.1

# Continue alphas as needed
git tag v2.0.0-alpha.2
git push origin v2.0.0-alpha.2

# Move to beta when stable
git tag v2.0.0-beta.1
git push origin v2.0.0-beta.1

# RC for final validation
git tag v2.0.0-rc.1
git push origin v2.0.0-rc.1

# Release!
git tag v2.0.0
git push origin v2.0.0
```

### Hotfix on Current Version (v1.2.1)

```bash
# Hotfixes usually skip pre-releases
git tag v1.2.1
git push origin v1.2.1
```

### New Minor Feature (v1.3.0)

```bash
# Start with beta (skip alpha for smaller changes)
git tag v1.3.0-beta.1
git push origin v1.3.0-beta.1

# RC after testing
git tag v1.3.0-rc.1
git push origin v1.3.0-rc.1

# Release!
git tag v1.3.0
git push origin v1.3.0
```

---

## Related Documentation

- [RELEASE_GUIDE.md](RELEASE_GUIDE.md) - Complete release workflow
- [README.md](README.md) - Installation and usage
- [Contributing Guide](CONTRIBUTING.md) - How to contribute

---

## Questions?

If you have questions about pre-releases:

1. Check [GitHub Discussions](https://github.com/abudhahir/markdown-slides-presenter/discussions)
2. Open an [Issue](https://github.com/abudhahir/markdown-slides-presenter/issues)
3. Review [npm documentation on dist-tags](https://docs.npmjs.com/cli/v8/commands/npm-dist-tag)
