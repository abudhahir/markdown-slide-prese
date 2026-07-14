# Pre-Release Quick Reference

Quick commands for creating and using pre-release versions.

## 🚀 Creating Pre-Releases

### Alpha Release (Early Development)
```bash
git tag v1.2.0-alpha.1
git push origin v1.2.0-alpha.1
```

### Beta Release (Testing)
```bash
git tag v1.2.0-beta.1
git push origin v1.2.0-beta.1
```

### Release Candidate (Final Testing)
```bash
git tag v1.2.0-rc.1
git push origin v1.2.0-rc.1
```

### Stable Release
```bash
git tag v1.2.0
git push origin v1.2.0
```

## 📦 Installing Pre-Releases

### For Testing

```bash
# Latest alpha
npm install c-deck-lite@alpha
npx c-deck-lite@alpha

# Latest beta
npm install c-deck-lite@beta
npx c-deck-lite@beta

# Latest RC
npm install c-deck-lite@rc
npx c-deck-lite@rc

# Specific version
npm install c-deck-lite@1.2.0-beta.1
```

### For Production (Stable Only)

```bash
# Always installs latest stable
npm install c-deck-lite
npx c-deck-lite
```

## 🔍 Checking Versions

```bash
# View all available versions
npm view c-deck-lite versions

# Check current dist-tags
npm view c-deck-lite dist-tags

# Show package info
npm info c-deck-lite
```

## 📋 Version Progression

Typical release flow:

```
1.2.0-alpha.1 → 1.2.0-alpha.2 → 1.2.0-alpha.3
                                      ↓
                            1.2.0-beta.1 → 1.2.0-beta.2
                                      ↓
                              1.2.0-rc.1 → 1.2.0-rc.2
                                      ↓
                                  1.2.0 (stable)
```

## 🏷️ npm Tags

Each release type gets its own npm tag:

| npm Tag | Version Pattern | Auto-Updated |
|---------|----------------|--------------|
| `latest` | `1.2.0` | ✅ Stable releases |
| `beta` | `1.2.0-beta.x` | ✅ Beta releases |
| `alpha` | `1.2.0-alpha.x` | ✅ Alpha releases |
| `rc` | `1.2.0-rc.x` | ✅ RC releases |

## ⚠️ Important Notes

1. **Pre-releases don't affect stable users**
   - Users running `npm install c-deck-lite` always get stable
   - Pre-release testing requires explicit tag or version

2. **GitHub Pages**
   - Only stable releases deploy to GitHub Pages
   - Pre-releases skip deployment (keeps demo stable)

3. **Version Format**
   - Must follow: `X.Y.Z-TYPE.N`
   - Examples: `1.2.0-alpha.1`, `1.2.0-beta.2`, `1.2.0-rc.1`

4. **Auto-Detection**
   - Release workflow automatically detects pre-release type
   - Sets appropriate npm tag based on version string

## 🎯 Quick Decision Guide

**Choose Alpha when:**
- ⚠️⚠️⚠️ Very experimental
- Breaking changes in progress
- Features incomplete
- Expect significant bugs

**Choose Beta when:**
- ⚠️⚠️ Feature complete
- API mostly stable
- Seeking feedback
- Minor bugs expected

**Choose RC when:**
- ⚠️ Final testing phase
- No new features
- Only critical fixes
- Almost production-ready

**Choose Stable when:**
- ✅ Fully tested
- Production ready
- All features complete
- No known critical bugs

## 📚 More Information

- Full guide: [PRERELEASE_GUIDE.md](PRERELEASE_GUIDE.md)
- Release workflow: [.github/RELEASE_GUIDE.md](.github/RELEASE_GUIDE.md)
- npm dist-tags: https://docs.npmjs.com/cli/v8/commands/npm-dist-tag
