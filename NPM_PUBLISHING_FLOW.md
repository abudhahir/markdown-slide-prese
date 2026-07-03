# Automated npm Publishing Flow Diagram

This document visualizes how the automated npm publishing works.

## 🎯 Overview

```
┌─────────────────┐
│   Developer     │
│  (You)          │
└────────┬────────┘
         │
         │ git tag v1.0.0 && git push origin v1.0.0
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│                    GitHub Actions                        │
│                   (Automated Workflow)                   │
└─────────────────────────────────────────────────────────┘
         │
         │ Triggers automatically
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│  ✅ Job 1: Validate                                      │
│  - Check version format (X.Y.Z)                          │
│  - Extract version from tag                              │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│  ✅ Job 2: Build                                         │
│  - Install dependencies (npm ci)                         │
│  - Run linter                                            │
│  - Build application (npm run build)                     │
│  - Create tarball archive                                │
│  - Upload artifacts                                      │
└───────────────────────┬─────────────────────────────────┘
                        │
        ┌───────────────┴───────────────┬─────────────────┐
        │                               │                 │
        ▼                               ▼                 ▼
┌─────────────────┐         ┌─────────────────┐   ┌─────────────────┐
│  Job 3: npm     │         │  Job 4: GitHub  │   │  Job 5: GitHub  │
│  Publish 🚀     │         │  Release        │   │  Pages Deploy   │
└─────────────────┘         └─────────────────┘   └─────────────────┘
        │                               │                 │
        │                               │                 │
        ▼                               ▼                 ▼
┌─────────────────┐         ┌─────────────────┐   ┌─────────────────┐
│  npmjs.com      │         │  GitHub Release │   │  github.io      │
│  Package        │         │  Page           │   │  Demo Site      │
└─────────────────┘         └─────────────────┘   └─────────────────┘
        │                               │                 │
        └───────────────┬───────────────┴─────────────────┘
                        │
                        ▼
                ┌─────────────────┐
                │  Job 6: Announce│
                │  All Published! │
                └─────────────────┘
```

## 📦 npm Publish Job (Detailed)

```
┌─────────────────────────────────────────────────────────┐
│          npm Publish Job - Step by Step                 │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
        ┌───────────────────────────────┐
        │  1. Checkout code             │
        │  - Get repository files       │
        └───────────┬───────────────────┘
                    │
                    ▼
        ┌───────────────────────────────┐
        │  2. Setup Node.js             │
        │  - Install Node 20            │
        │  - Configure npm registry     │
        └───────────┬───────────────────┘
                    │
                    ▼
        ┌───────────────────────────────┐
        │  3. Install dependencies      │
        │  - npm ci (clean install)     │
        └───────────┬───────────────────┘
                    │
                    ▼
        ┌───────────────────────────────┐
        │  4. Download build artifacts  │
        │  - Get dist/ from build job   │
        └───────────┬───────────────────┘
                    │
                    ▼
        ┌───────────────────────────────┐
        │  5. Update package.json       │
        │  - Set version to tag version │
        │  - Keep same if already set   │
        └───────────┬───────────────────┘
                    │
                    ▼
        ┌───────────────────────────────┐
        │  6. Verify package contents   │
        │  - npm pack --dry-run         │
        │  - Show what will be published│
        └───────────┬───────────────────┘
                    │
                    ▼
        ┌───────────────────────────────┐
        │  7. Test publish (dry-run)    │
        │  - npm publish --dry-run      │
        │  - Validate but don't publish │
        └───────────┬───────────────────┘
                    │
                    ▼
        ┌───────────────────────────────┐
        │  8. PUBLISH TO NPM! 🚀        │
        │  - npm publish --access public│
        │  - Uses NPM_TOKEN from secrets│
        └───────────┬───────────────────┘
                    │
                    ▼
        ┌───────────────────────────────┐
        │  9. Update GitHub release     │
        │  - Add npm badge              │
        │  - Add installation commands  │
        │  - Add package link           │
        └───────────┬───────────────────┘
                    │
                    ▼
        ┌───────────────────────────────┐
        │  10. Verify publication       │
        │  - Check npm view works       │
        │  - Confirm package is live    │
        └───────────────────────────────┘
                    │
                    ▼
            ✅ Published!
```

## 🔑 Authentication Flow

```
┌─────────────────┐
│   NPM_TOKEN     │  (Created at npmjs.com/settings/tokens)
│  (npm website)  │
└────────┬────────┘
         │
         │ Copy token
         │
         ▼
┌─────────────────┐
│  GitHub Secrets │  (Repo Settings → Secrets → Actions)
│  Name: NPM_TOKEN│
└────────┬────────┘
         │
         │ Workflow reads secret
         │
         ▼
┌─────────────────┐
│ GitHub Actions  │  env: NODE_AUTH_TOKEN=${{ secrets.NPM_TOKEN }}
│   Workflow      │
└────────┬────────┘
         │
         │ Authenticates
         │
         ▼
┌─────────────────┐
│  npm registry   │  npm publish succeeds!
│   npmjs.com     │
└─────────────────┘
```

## 🎬 Complete User Journey

### Before Automation (Old Way) ❌

```
Developer → Build locally → Test → Login to npm → Publish → 
Tag git → Push → Create release → Deploy pages → Update docs
   ⏱️ ~30 minutes, many manual steps, error-prone
```

### With Automation (New Way) ✅

```
Developer → git tag v1.0.0 → git push origin v1.0.0 → 
Wait ~5 minutes → Everything published automatically!
   ⏱️ 1 minute of work, fully automated, reliable
```

## 🚀 What Gets Published Where

```
                    git tag v1.0.0 + push
                            │
                            ▼
        ┌───────────────────────────────────┐
        │      GitHub Actions Trigger       │
        └───────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┬───────────────┐
        │                   │                   │               │
        ▼                   ▼                   ▼               ▼
┌─────────────┐   ┌──────────────┐   ┌─────────────┐   ┌──────────────┐
│   npmjs     │   │   GitHub     │   │  GitHub     │   │    GHCR      │
│   Package   │   │   Release    │   │   Pages     │   │   Docker     │
└─────────────┘   └──────────────┘   └─────────────┘   └──────────────┘
      │                  │                  │                  │
      │                  │                  │                  │
      ▼                  ▼                  ▼                  ▼
┌─────────────┐   ┌──────────────┐   ┌─────────────┐   ┌──────────────┐
│ Users can:  │   │ Users can:   │   │ Users can:  │   │ Users can:   │
│             │   │              │   │             │   │              │
│ npm install │   │ Download     │   │ Try live    │   │ docker pull  │
│ npx run     │   │ View notes   │   │ demo        │   │ docker run   │
└─────────────┘   └──────────────┘   └─────────────┘   └──────────────┘
```

## 📊 Timeline

```
t=0s    Developer pushes tag
        │
        ▼
t=10s   GitHub Actions starts
        │
        ▼
t=30s   Validation complete
        │
        ▼
t=2m    Build complete
        │
        ├─→ npm publish starts
        │   │
        │   ├─→ Package uploaded
        │   │   │
        │   │   ▼
        │   │   t=3m npm published ✅
        │   │
        ├─→ GitHub release created
        │   │
        │   ▼
        │   t=2.5m Release published ✅
        │
        ├─→ GitHub Pages deploy
        │   │
        │   ▼
        │   t=4m Demo live ✅
        │
        └─→ Docker build
            │
            ▼
            t=5m Container published ✅

t=5m    All done! Announcement posted 🎉
```

## 🔄 Version Workflow

```
Current version: v1.0.0
        │
        │ Developer makes changes
        │ git commit -m "feat: new feature"
        │
        ▼
Decide version bump:
        │
        ├─→ Bug fix?    → v1.0.1 (PATCH)
        ├─→ New feature? → v1.1.0 (MINOR)
        └─→ Breaking?   → v2.0.0 (MAJOR)
        │
        ▼
Create tag:
        │
        │ git tag v1.1.0
        │ git push origin v1.1.0
        │
        ▼
Workflow publishes:
        │
        ├─→ npm: markdown-slides-presenter@1.1.0
        ├─→ GitHub: Release v1.1.0
        ├─→ Pages: Updated demo
        └─→ Docker: :1.1.0, :1.1, :1, :latest
        │
        ▼
Users can install:
        │
        ├─→ npm install markdown-slides-presenter
        ├─→ npm install markdown-slides-presenter@1.1.0
        └─→ npm install markdown-slides-presenter@latest
```

## 🛡️ Error Handling

```
┌─────────────────┐
│ Workflow starts │
└────────┬────────┘
         │
         ▼
    ┌─────────┐         
    │ Validate│ ────NO──→ Stop, invalid version format
    └────┬────┘
         │ YES
         ▼
    ┌─────────┐
    │  Build  │ ────FAIL──→ Stop, build errors
    └────┬────┘
         │ SUCCESS
         ▼
    ┌─────────┐
    │npm check│ ────NO──→ No NPM_TOKEN, skip npm publish
    └────┬────┘
         │ YES
         ▼
    ┌─────────┐
    │Dry-run  │ ────FAIL──→ Stop, package errors
    └────┬────┘
         │ SUCCESS
         ▼
    ┌─────────┐
    │ PUBLISH │ ────FAIL──→ Stop, publish failed
    └────┬────┘           (auth error, name taken, etc.)
         │ SUCCESS
         ▼
    ✅ Published!
```

## 📝 Quick Reference

| Action | Command | Result |
|--------|---------|--------|
| Create release | `git tag v1.0.0 && git push origin v1.0.0` | Full automated release |
| Check status | Go to Actions tab on GitHub | See workflow progress |
| Verify npm | `npm view markdown-slides-presenter` | Check if published |
| Test install | `npx markdown-slides-presenter` | Run published package |
| View release | GitHub → Releases tab | See release notes |
| Try demo | Visit github.io URL | See live demo |

## 🎯 Key Benefits

```
                    Automation Benefits
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌─────────────┐   ┌──────────────┐   ┌─────────────┐
│   Speed     │   │  Reliability │   │  Simplicity │
│             │   │              │   │             │
│ 1 min work  │   │ No human     │   │ Just push   │
│ vs 30 mins  │   │ errors       │   │ a tag       │
│             │   │              │   │             │
│ 30x faster  │   │ Consistent   │   │ No manual   │
│             │   │ quality      │   │ steps       │
└─────────────┘   └──────────────┘   └─────────────┘
```

---

## 🚀 Get Started

Ready to set up automated publishing? 

**→ See [QUICKSTART_AUTOMATED_RELEASE.md](./QUICKSTART_AUTOMATED_RELEASE.md) for step-by-step setup!**

**→ See [AUTOMATED_NPM_PUBLISHING.md](./AUTOMATED_NPM_PUBLISHING.md) for complete documentation!**
