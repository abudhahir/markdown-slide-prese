# Pre-Release Implementation Summary

## ✅ What Was Added

This document summarizes the pre-release support implementation for the c-deck-lite npm package.

### 1. Enhanced Release Workflow

**File:** `.github/workflows/release.yml`

**Changes:**
- ✅ Added support for alpha, beta, and RC tag patterns
- ✅ Auto-detection of pre-release type from version string
- ✅ Automatic npm tag assignment (alpha/beta/rc/latest)
- ✅ Pre-release-aware GitHub Release creation
- ✅ Conditional GitHub Pages deployment (stable only)
- ✅ Enhanced release notes with pre-release warnings
- ✅ npm publication with correct dist-tags

**Supported Tag Patterns:**
```yaml
- 'v*'              # v1.0.0 (stable)
- 'v*-alpha.*'      # v1.0.0-alpha.1
- 'v*-beta.*'       # v1.0.0-beta.1
- 'v*-rc.*'         # v1.0.0-rc.1
```

### 2. Automatic Pre-Release Detection

The workflow now automatically:

1. **Detects version type** from tag name:
   - `-alpha` → Alpha pre-release
   - `-beta` → Beta pre-release
   - `-rc` → Release candidate
   - No suffix → Stable release

2. **Sets npm tag** appropriately:
   - Alpha → `@alpha`
   - Beta → `@beta`
   - RC → `@rc`
   - Stable → `@latest`

3. **Marks GitHub Release** as pre-release
4. **Skips GitHub Pages** deployment for pre-releases
5. **Adds warnings** to release notes

### 3. Documentation

Created comprehensive documentation:

#### 📘 PRERELEASE_GUIDE.md
Complete guide covering:
- Pre-release types (alpha/beta/rc)
- Creating pre-releases
- npm tags and installation
- Best practices
- Version progression
- Troubleshooting
- Real-world examples

#### 📋 PRERELEASE_QUICKREF.md
Quick reference with:
- Command cheatsheet
- Installation commands
- Version checking
- Decision guide
- npm tags table

#### 🔄 Updated .github/RELEASE_GUIDE.md
Added pre-release section with:
- Quick commands
- npm tag information
- GitHub Pages note

#### 📖 Updated README.md
Added sections for:
- Pre-release installation options
- Version comparison table
- Pre-release workflow info

## 🎯 How It Works

### Creating a Pre-Release

#### Method 1: Git Tag (Automatic)
```bash
# Alpha
git tag v1.2.0-alpha.1
git push origin v1.2.0-alpha.1

# Beta
git tag v1.2.0-beta.1
git push origin v1.2.0-beta.1

# RC
git tag v1.2.0-rc.1
git push origin v1.2.0-rc.1
```

When you push the tag:
1. ✅ Release workflow triggers
2. ✅ Validates version format
3. ✅ Auto-detects pre-release type
4. ✅ Builds application
5. ✅ Creates GitHub Release (marked as pre-release)
6. ✅ Publishes to npm with correct tag
7. ❌ Skips GitHub Pages (pre-releases only)

#### Method 2: Manual Workflow Dispatch
1. Go to Actions → Release → Run workflow
2. Enter version (e.g., `1.2.0-beta.1`)
3. Check "Mark as pre-release" if needed
4. Click "Run workflow"

### Installing Pre-Releases

#### For Testers
```bash
# Latest alpha
npm install c-deck-lite@alpha

# Latest beta
npm install c-deck-lite@beta

# Specific version
npm install c-deck-lite@1.2.0-beta.1
```

#### For End Users (Stable)
```bash
# Always gets stable version
npm install c-deck-lite
```

### npm Dist-Tags

Each pre-release type uses its own npm tag:

| npm Tag | Points To | Who Should Use |
|---------|-----------|----------------|
| `latest` | Latest stable (e.g., 1.1.0) | Everyone (default) |
| `beta` | Latest beta (e.g., 1.2.0-beta.2) | Beta testers |
| `alpha` | Latest alpha (e.g., 1.3.0-alpha.1) | Early adopters |
| `rc` | Latest RC (e.g., 1.2.0-rc.1) | Final testers |

**Why This Matters:**
- Users running `npm install c-deck-lite` always get stable
- Pre-releases require explicit tag or version
- Multiple versions can coexist safely
- Easy to test without affecting production users

## 🚀 Usage Examples

### Example 1: Major Feature Development (v2.0.0)

```bash
# Week 1-2: Alpha testing
git tag v2.0.0-alpha.1
git push origin v2.0.0-alpha.1
# Testers: npm install c-deck-lite@alpha

git tag v2.0.0-alpha.2
git push origin v2.0.0-alpha.2

# Week 3-4: Beta testing
git tag v2.0.0-beta.1
git push origin v2.0.0-beta.1
# Testers: npm install c-deck-lite@beta

git tag v2.0.0-beta.2
git push origin v2.0.0-beta.2

# Week 5: Release candidate
git tag v2.0.0-rc.1
git push origin v2.0.0-rc.1
# Testers: npm install c-deck-lite@rc

# Week 6: Stable release
git tag v2.0.0
git push origin v2.0.0
# Everyone: npm install c-deck-lite
```

### Example 2: Minor Feature (v1.3.0)

```bash
# Skip alpha, go straight to beta
git tag v1.3.0-beta.1
git push origin v1.3.0-beta.1

# After testing
git tag v1.3.0-rc.1
git push origin v1.3.0-rc.1

# Release
git tag v1.3.0
git push origin v1.3.0
```

### Example 3: Hotfix (v1.2.1)

```bash
# Skip pre-releases for urgent fixes
git tag v1.2.1
git push origin v1.2.1
```

## 📊 Release Notes

Pre-releases automatically get enhanced release notes:

### Alpha Example
```markdown
# Release v1.2.0-alpha.1

## ⚠️ ALPHA PRE-RELEASE

This is an **alpha** release intended for early testing and development.
It may contain bugs and incomplete features. Not recommended for production use.

```bash
npm install c-deck-lite@alpha
# or
npm install c-deck-lite@1.2.0-alpha.1
```

## 🎉 What's New
...
```

### Stable Example
```markdown
# Release v1.2.0

## 🎉 What's New
...

## 📦 Installation
...

## 🌐 Live Demo
Try it online: [GitHub Pages](...)
```

## 🔒 Safety Features

1. **Version Validation**
   - Enforces semantic versioning format
   - Rejects invalid version strings
   - Provides helpful error messages

2. **Automatic Tagging**
   - Pre-releases use correct npm tags
   - Stable releases use `latest` tag
   - No manual intervention needed

3. **Deployment Protection**
   - Pre-releases don't deploy to GitHub Pages
   - Demo site stays stable
   - Only stable versions go live

4. **User Protection**
   - Pre-releases require explicit opt-in
   - Default installs get stable versions
   - Clear warnings in release notes

## 🧪 Testing Pre-Releases

### Check Available Versions
```bash
npm view c-deck-lite versions
```

### Check Current Tags
```bash
npm view c-deck-lite dist-tags
```

### Install and Test
```bash
# Create test directory
mkdir test-prerelease
cd test-prerelease

# Install beta version
npm install c-deck-lite@beta

# Run
npx c-deck-lite

# Check version
npm list c-deck-lite
```

## 📁 Files Modified/Created

### Modified Files
1. `.github/workflows/release.yml` - Enhanced with pre-release support
2. `.github/RELEASE_GUIDE.md` - Added pre-release section
3. `README.md` - Added pre-release documentation

### New Files
1. `PRERELEASE_GUIDE.md` - Comprehensive pre-release guide
2. `PRERELEASE_QUICKREF.md` - Quick reference card
3. `PRERELEASE_SUMMARY.md` - This file

## ✨ Key Benefits

1. **Safe Testing**
   - Test new features without affecting stable users
   - Multiple test channels (alpha/beta/rc)
   - Easy rollback if issues found

2. **Better Feedback Loop**
   - Early adopters can test alphas
   - Broader testing in beta
   - Final validation in RC

3. **Reduced Risk**
   - Catch bugs before stable release
   - Validate breaking changes
   - Test in real-world scenarios

4. **Professional Workflow**
   - Industry-standard approach
   - Clear version progression
   - Proper semantic versioning

## 🎓 Best Practices

1. **Use all three stages for major versions**
   - Alpha for breaking changes
   - Beta for feature testing
   - RC for final validation

2. **Skip stages for minor updates**
   - Hotfixes: Go straight to stable
   - Small features: Start with beta

3. **Communicate clearly**
   - Announce pre-releases
   - Document what needs testing
   - Set expectations

4. **Version progression**
   - Increment pre-release number for fixes
   - Move to next stage when ready
   - Don't skip backwards

## 🔗 Related Resources

- [PRERELEASE_GUIDE.md](./PRERELEASE_GUIDE.md) - Full guide
- [PRERELEASE_QUICKREF.md](./PRERELEASE_QUICKREF.md) - Quick reference
- [.github/RELEASE_GUIDE.md](./.github/RELEASE_GUIDE.md) - Release workflow
- [README.md](./README.md) - Main documentation
- [npm dist-tags docs](https://docs.npmjs.com/cli/v8/commands/npm-dist-tag)
- [Semantic Versioning](https://semver.org/)

## 🎉 You're Ready!

Pre-release support is now fully configured. You can:

1. ✅ Create alpha versions for early testing
2. ✅ Release betas for broader feedback
3. ✅ Use RCs for final validation
4. ✅ Publish stable versions with confidence

All automation is in place - just push tags and the workflow handles everything!
