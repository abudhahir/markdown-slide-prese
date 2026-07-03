# ⚠️ Post-Implementation Setup

## Required: Update Repository URLs

After implementing the automated release workflow, you **must** update the repository URLs in several files to match your actual GitHub repository.

### Files to Update

#### 1. README.md

**Find and replace** `yourusername/markdown-slides` with your actual repository path:

```markdown
[![CI](https://github.com/YOURUSERNAME/YOUR-REPO/workflows/CI/badge.svg)]
[![Release](https://github.com/YOURUSERNAME/YOUR-REPO/workflows/Release/badge.svg)]
[![Deploy](https://github.com/YOURUSERNAME/YOUR-REPO/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)]
[![GitHub release](https://img.shields.io/github/v/release/YOURUSERNAME/YOUR-REPO)]
```

**Replace with:**
```markdown
[![CI](https://github.com/your-actual-username/your-actual-repo/workflows/CI/badge.svg)]
[![Release](https://github.com/your-actual-username/your-actual-repo/workflows/Release/badge.svg)]
...
```

#### 2. All Documentation Files

Search for `yourusername` and `markdown-slides` in these files and replace:

- RELEASE_WORKFLOW.md
- RELEASE_IMPLEMENTATION.md
- QUICKSTART_RELEASE.md
- .github/RELEASE_GUIDE.md
- .github/RELEASE_TEMPLATE.md
- WORKFLOW_ARCHITECTURE.md
- CHANGELOG.md

**Quick find and replace:**
```bash
# From project root
find . -type f -name "*.md" -exec sed -i 's/yourusername/YOUR_GITHUB_USERNAME/g' {} +
find . -type f -name "*.md" -exec sed -i 's/markdown-slides/YOUR_REPO_NAME/g' {} +
```

**Or manually update each occurrence of:**
- `yourusername` → Your GitHub username
- `markdown-slides` → Your repository name

### Optional: npm Package Name

If you plan to publish to npm, update package.json:

```json
{
  "name": "@your-npm-username/your-package-name",
  "version": "1.0.0",
  "private": false,
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR_USERNAME/YOUR_REPO.git"
  },
  "homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO"
}
```

### Optional: Docker Image

If using Docker, your images will be automatically published to:
```
ghcr.io/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME:latest
ghcr.io/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME:v1.0.0
```

No changes needed in Dockerfile, but update documentation references.

## Verification Checklist

After updating URLs:

- [ ] README.md badges point to your repository
- [ ] Documentation links are correct
- [ ] package.json repository URL is correct
- [ ] CHANGELOG.md version links work
- [ ] Release template links are correct

## Quick Test

1. **Check badges:**
   - Visit your README.md on GitHub
   - Badges should load (may show "no status" until first run)

2. **Check links:**
   - Click through documentation links
   - Verify they point to your repository

3. **Verify workflows:**
   - Go to Actions tab
   - You should see all 5 workflows listed

## Need Help?

If you see broken links or badges:
1. Double-check the find/replace worked
2. Verify your GitHub repository name is correct
3. Check that workflows are enabled (Settings → Actions)

---

**Once updated, delete this file or keep for reference.**
