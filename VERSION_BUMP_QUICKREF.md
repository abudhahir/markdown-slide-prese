# Version Bump Quick Reference

A quick reference guide for using the automated version bump workflow to create releases and pre-releases.

## 🚀 Quick Access

**GitHub Actions → Version Bump → Run workflow**

## 📦 Stable Releases

Use when creating production-ready versions:

| Goal | Current | Bump Type | Result | When to Use |
|------|---------|-----------|--------|-------------|
| Bug fix | 1.0.0 | **patch** | 1.0.1 | Bug fixes only, no new features |
| New feature | 1.0.0 | **minor** | 1.1.0 | New features, backwards compatible |
| Breaking change | 1.0.0 | **major** | 2.0.0 | Breaking changes, incompatible API |

**Steps:**
1. Select bump type: `patch`, `minor`, or `major`
2. Leave identifier EMPTY
3. Check "Create release after bump"
4. Run workflow

## 🔷 Pre-Release Creation

Use when starting a new pre-release cycle:

### Alpha (Early Development)

| Current | Bump Type | Identifier | Result | Use Case |
|---------|-----------|------------|--------|----------|
| 1.0.0 | **prepatch** | **alpha** | 1.0.1-alpha.0 | Bug fix pre-release |
| 1.0.0 | **preminor** | **alpha** | 1.1.0-alpha.0 | Feature pre-release |
| 1.0.0 | **premajor** | **alpha** | 2.0.0-alpha.0 | Breaking change pre-release |

### Beta (Feature Complete)

| Current | Bump Type | Identifier | Result | Use Case |
|---------|-----------|------------|--------|----------|
| 1.0.0 | **prepatch** | **beta** | 1.0.1-beta.0 | Bug fix testing |
| 1.0.0 | **preminor** | **beta** | 1.1.0-beta.0 | Feature testing |
| 1.0.0 | **premajor** | **beta** | 2.0.0-beta.0 | Breaking change testing |

### Release Candidate (Final Testing)

| Current | Bump Type | Identifier | Result | Use Case |
|---------|-----------|------------|--------|----------|
| 1.0.0 | **prepatch** | **rc** | 1.0.1-rc.0 | Final bug fix validation |
| 1.0.0 | **preminor** | **rc** | 1.1.0-rc.0 | Final feature validation |
| 1.0.0 | **premajor** | **rc** | 2.0.0-rc.0 | Final breaking change validation |

**Steps:**
1. Select bump type: `prepatch`, `preminor`, or `premajor`
2. Select identifier: `alpha`, `beta`, or `rc`
3. Check "Create release after bump"
4. Run workflow

## 🔄 Incrementing Pre-Releases

Use when updating an existing pre-release:

| Current Version | Bump Type | Identifier | Result |
|----------------|-----------|------------|--------|
| 1.0.1-alpha.0 | **prerelease** | **alpha** | 1.0.1-alpha.1 |
| 1.0.1-alpha.1 | **prerelease** | **alpha** | 1.0.1-alpha.2 |
| 1.1.0-beta.0 | **prerelease** | **beta** | 1.1.0-beta.1 |
| 1.1.0-beta.5 | **prerelease** | **beta** | 1.1.0-beta.6 |
| 2.0.0-rc.0 | **prerelease** | **rc** | 2.0.0-rc.1 |

**Steps:**
1. Select bump type: `prerelease`
2. Select SAME identifier as current version
3. Check "Create release after bump"
4. Run workflow

## ✅ Graduating to Stable

Use when promoting a pre-release to stable:

| Current Pre-Release | Bump Type | Result | Notes |
|---------------------|-----------|--------|-------|
| 1.0.1-alpha.2 | **patch** | 1.0.1 | No changes needed, just promote |
| 1.1.0-beta.3 | **minor** | 1.1.0 | Graduates beta to stable minor |
| 2.0.0-rc.1 | **major** | 2.0.0 | Graduates RC to stable major |

**Important:** Usually you use the same version level (patch→patch, minor→minor, major→major)

**Steps:**
1. Select bump type: `patch`, `minor`, or `major` (match your pre-release level)
2. Leave identifier EMPTY
3. Check "Create release after bump"
4. Run workflow

## 📊 Common Workflows

### Workflow 1: Full Pre-Release Cycle

```
1.0.0 (stable)
  ↓ prepatch + alpha
1.0.1-alpha.0
  ↓ prerelease + alpha
1.0.1-alpha.1
  ↓ prerelease + alpha
1.0.1-alpha.2
  ↓ patch (to beta: use prepatch + beta from stable, or manually tag)
Switch to beta: tag v1.0.1-beta.0
  ↓ prerelease + beta
1.0.1-beta.1
  ↓ prerelease + beta  
1.0.1-beta.2
  ↓ Switch to RC: tag v1.0.1-rc.0
1.0.1-rc.0
  ↓ prerelease + rc
1.0.1-rc.1
  ↓ patch (graduate to stable)
1.0.1 (stable)
```

### Workflow 2: Quick Beta to Stable

```
1.0.0 (stable)
  ↓ preminor + beta
1.1.0-beta.0
  ↓ prerelease + beta
1.1.0-beta.1
  ↓ minor (graduate to stable)
1.1.0 (stable)
```

### Workflow 3: Hotfix (No Pre-Release)

```
1.0.0 (stable)
  ↓ patch
1.0.1 (stable)
```

## 🏷️ npm Tags

After publishing, versions are available with these tags:

| Version Pattern | npm Tag | Install Command |
|----------------|---------|-----------------|
| 1.0.1-alpha.* | `alpha` | `npm install package@alpha` |
| 1.0.1-beta.* | `beta` | `npm install package@beta` |
| 1.0.1-rc.* | `rc` | `npm install package@rc` |
| 1.0.1 (stable) | `latest` | `npm install package` |

## ⚠️ Important Notes

### Pre-Release Identifiers REQUIRED

When using pre* bump types, you MUST select an identifier:
- ❌ `prepatch` + no identifier = ERROR
- ✅ `prepatch` + `alpha` = 1.0.1-alpha.0

### Identifier Ignored for Stable

When using stable bump types, identifier is ignored:
- ⚠️ `patch` + `alpha` = 1.0.1 (alpha ignored)
- ✅ `patch` + empty = 1.0.1

### Matching Identifiers

When incrementing, use the SAME identifier:
- ❌ 1.0.1-alpha.0 + `prerelease` + `beta` = 1.0.1-beta.0 (changes type!)
- ✅ 1.0.1-alpha.0 + `prerelease` + `alpha` = 1.0.1-alpha.1

### GitHub Pages Deployment

- ✅ Stable releases → Deployed to GitHub Pages
- ❌ Pre-releases → NOT deployed (keeps demo stable)

## 🔧 Troubleshooting

### "Pre-release identifier required"

**Problem:** Selected a pre* bump type without identifier
**Solution:** Select alpha, beta, or rc as identifier

### "Wrong version created"

**Problem:** Got 1.0.1 instead of 1.0.1-beta.0
**Solution:** Use `prepatch` (not `patch`) + `beta` identifier

### "Can't increment pre-release"

**Problem:** Have 1.0.1-beta.1, want 1.0.1-beta.2
**Solution:** Use `prerelease` bump type + `beta` identifier

### "How to go from alpha to beta?"

**Problem:** Have 1.0.1-alpha.5, want 1.0.1-beta.0
**Solution:** Manually create tag `v1.0.1-beta.0` or use npm version command locally

## 📚 Related Documentation

- [PRERELEASE_GUIDE.md](PRERELEASE_GUIDE.md) - Complete pre-release documentation
- [RELEASE_GUIDE.md](.github/RELEASE_GUIDE.md) - Full release workflow
- [README.md](README.md) - Installation and usage

## 💡 Tips

1. **Test locally first:** Build and test before creating any release
2. **Use alpha for experiments:** Don't be afraid to publish multiple alphas
3. **Beta means feature-complete:** Don't add new features during beta
4. **RC should be brief:** Only critical fixes in RC phase
5. **Document changes:** Update changelog for each version
6. **Communicate:** Announce pre-releases to your testers/community

## 🎯 Decision Tree

```
Do you need a pre-release?
│
├─ No → Use patch/minor/major
│   └─ Creates stable release
│
└─ Yes → Is this the first pre-release?
    │
    ├─ Yes → Use prepatch/preminor/premajor + identifier
    │   └─ Creates X.Y.Z-[identifier].0
    │
    └─ No → Are you incrementing the same type?
        │
        ├─ Yes → Use prerelease + same identifier
        │   └─ Increments: .0 → .1 → .2
        │
        └─ No → Ready for stable?
            │
            ├─ Yes → Use patch/minor/major
            │   └─ Graduates to stable
            │
            └─ No → Manually tag next type
                └─ Or use npm version locally
```

## 🚦 Quick Decision Matrix

| I want to... | Bump Type | Identifier | Example Result |
|-------------|-----------|------------|----------------|
| Fix a bug (stable) | patch | (empty) | 1.0.0 → 1.0.1 |
| Add a feature (stable) | minor | (empty) | 1.0.0 → 1.1.0 |
| Breaking change (stable) | major | (empty) | 1.0.0 → 2.0.0 |
| Start alpha testing | prepatch/preminor/premajor | alpha | 1.0.0 → 1.0.1-alpha.0 |
| Start beta testing | prepatch/preminor/premajor | beta | 1.0.0 → 1.1.0-beta.0 |
| Start RC testing | prepatch/preminor/premajor | rc | 1.0.0 → 2.0.0-rc.0 |
| Next alpha version | prerelease | alpha | 1.0.1-alpha.0 → 1.0.1-alpha.1 |
| Next beta version | prerelease | beta | 1.1.0-beta.1 → 1.1.0-beta.2 |
| Next RC version | prerelease | rc | 2.0.0-rc.2 → 2.0.0-rc.3 |
| Promote pre-release to stable | patch/minor/major | (empty) | 1.0.1-beta.2 → 1.0.1 |

---

**Remember:** When in doubt, start with beta. Alpha is for very unstable code, and RC is only needed for final validation.
