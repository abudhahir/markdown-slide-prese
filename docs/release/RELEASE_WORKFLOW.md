# Markdown Slides - Automated Release Workflow

This document describes the automated release workflow for Markdown Slides using GitHub Actions.

## Overview

The project includes a comprehensive CI/CD pipeline with the following workflows:

1. **CI** - Continuous Integration for all branches
2. **Release** - Automated release creation and deployment
3. **Version Bump** - Manual version management
4. **Dependency Update** - Automated dependency updates
5. **Deploy** - GitHub Pages deployment

## Workflows

### 1. CI Workflow (`ci.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

**Jobs:**
- **Lint**: Run ESLint checks
- **Build**: Build the application
- **Test Build**: Verify build artifacts
- **Preview**: Comment on PRs with build status

**Usage:**
Runs automatically on every push and PR. No manual intervention needed.

### 2. Release Workflow (`release.yml`)

**Triggers:**
- Push of tags matching `v*` pattern (e.g., `v1.0.0`)
- Manual workflow dispatch with version input

**Jobs:**
1. **Validate**: Validate version format
2. **Build**: Build production artifacts
3. **Create Release**: Generate changelog and create GitHub release
4. **Deploy Pages**: Deploy to GitHub Pages
5. **NPM Publish**: Publish to npm registry (optional)
6. **Docker Build**: Build and push Docker image to GHCR
7. **Announce**: Send success notifications

**Features:**
- Automatic changelog generation from commit messages
- GitHub Release creation with artifacts
- GitHub Pages deployment
- npm publishing (if configured)
- Docker image publishing to GitHub Container Registry
- Pre-release support

**Usage:**

**Option A: Create a tag and push**
```bash
git tag v1.0.0
git push origin v1.0.0
```

**Option B: Use GitHub UI**
1. Go to Actions → Release
2. Click "Run workflow"
3. Enter version (e.g., `1.0.0`)
4. Select if pre-release
5. Click "Run workflow"

### 3. Version Bump Workflow (`version-bump.yml`)

**Triggers:**
- Manual workflow dispatch

**Jobs:**
- Bump version in package.json
- Create and push version commit
- Create and push version tag
- Optionally trigger release workflow

**Usage:**

1. Go to Actions → Version Bump
2. Click "Run workflow"
3. Select bump type:
   - **patch**: 1.0.0 → 1.0.1 (bug fixes)
   - **minor**: 1.0.1 → 1.1.0 (new features)
   - **major**: 1.1.0 → 2.0.0 (breaking changes)
4. Choose whether to create release
5. Click "Run workflow"

The workflow will:
- Update package.json version
- Commit the change
- Create and push a git tag
- Trigger the release workflow (if selected)

### 4. Dependency Update Workflow (`dependency-update.yml`)

**Triggers:**
- Weekly schedule (Monday at midnight)
- Manual workflow dispatch

**Jobs:**
- Update all dependencies
- Run tests and build
- Create PR with changes

**Usage:**

Runs automatically every Monday. To run manually:
1. Go to Actions → Dependency Update
2. Click "Run workflow"
3. Click "Run workflow"

### 5. Deploy Workflow (`deploy.yml`)

**Triggers:**
- Push to `main` branch
- Manual workflow dispatch

**Jobs:**
- Build application
- Deploy to GitHub Pages

**Usage:**
Runs automatically on push to main. Can also be triggered manually.

## Setup Instructions

### 1. Configure GitHub Repository

**Enable GitHub Pages:**
1. Go to Settings → Pages
2. Source: GitHub Actions
3. Save

**Add Required Secrets:**

For npm publishing (optional):
1. Go to Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `NPM_TOKEN`
4. Value: Your npm access token (get from npmjs.com)

**Enable Workflows:**
1. Go to Settings → Actions → General
2. Allow all actions and reusable workflows
3. Enable "Read and write permissions"
4. Enable "Allow GitHub Actions to create and approve pull requests"

### 2. Configure npm Publishing (Optional)

If you want to publish to npm:

1. **Update package.json:**
```json
{
  "name": "@yourusername/markdown-slides",
  "version": "1.0.0",
  "private": false,
  "description": "A powerful markdown-based presentation tool",
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/markdown-slides.git"
  },
  "keywords": [
    "markdown",
    "slides",
    "presentation",
    "react",
    "typescript"
  ],
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ]
}
```

2. **Create .npmignore:**
```
src/
.github/
examples/
node_modules/
*.log
.DS_Store
vite.config.ts
tsconfig.json
tailwind.config.js
```

3. **Add npm token to secrets** (see above)

### 3. Configure Docker Publishing (Optional)

Docker images are automatically published to GitHub Container Registry (GHCR) on release.

**Access your images:**
```bash
docker pull ghcr.io/yourusername/markdown-slides:latest
docker pull ghcr.io/yourusername/markdown-slides:v1.0.0
```

**Run locally:**
```bash
docker run -p 8080:80 ghcr.io/yourusername/markdown-slides:latest
```

Then open http://localhost:8080

## Release Process

### Standard Release

1. **Make changes** and commit to main
2. **Test** your changes
3. **Run Version Bump workflow:**
   - Choose bump type (patch/minor/major)
   - Enable "Create release after bump"
   - The workflow will:
     - Update version in package.json
     - Create version commit
     - Create and push tag
     - Trigger release workflow

4. **Release workflow runs automatically:**
   - Validates version
   - Builds application
   - Creates GitHub release with changelog
   - Deploys to GitHub Pages
   - Publishes to npm (if configured)
   - Builds Docker image
   - Announces success

### Pre-release

For beta/alpha releases:

1. **Tag with pre-release identifier:**
```bash
git tag v1.0.0-beta.1
git push origin v1.0.0-beta.1
```

OR use workflow dispatch:
- Version: `1.0.0-beta.1`
- Pre-release: ✓ checked

2. Release workflow creates a pre-release on GitHub

### Hotfix Release

For urgent bug fixes:

1. **Create hotfix branch:**
```bash
git checkout -b hotfix/critical-bug
```

2. **Fix the bug** and commit
3. **Merge to main:**
```bash
git checkout main
git merge hotfix/critical-bug
```

4. **Run Version Bump:**
   - Bump type: patch
   - Create release: enabled

## Changelog Format

The release workflow generates changelogs from commit messages. Use conventional commits:

```bash
# Features
git commit -m "feat: add new theme selector"

# Bug fixes
git commit -m "fix: resolve PDF export issue"

# Documentation
git commit -m "docs: update README with examples"

# Other
git commit -m "chore: update dependencies"
git commit -m "refactor: improve performance"
git commit -m "style: fix formatting"
```

**Commit format:**
```
type: description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks
- `perf`: Performance improvement

## Versioning Strategy

Follow [Semantic Versioning](https://semver.org/):

```
MAJOR.MINOR.PATCH

Example: 1.2.3
```

- **MAJOR** (1.x.x): Breaking changes
  - API changes
  - Removed features
  - Incompatible updates

- **MINOR** (x.2.x): New features (backwards compatible)
  - New functionality
  - New components
  - Enhanced features

- **PATCH** (x.x.3): Bug fixes (backwards compatible)
  - Bug fixes
  - Security patches
  - Minor tweaks

**Pre-release versions:**
- `1.0.0-alpha.1`: Early testing
- `1.0.0-beta.1`: Feature complete, testing
- `1.0.0-rc.1`: Release candidate

## Artifacts

Each release includes:

1. **GitHub Release:**
   - Release notes with changelog
   - Source code (zip/tar.gz)
   - Build artifacts (tar.gz)

2. **GitHub Pages:**
   - Live demo at `https://yourusername.github.io/markdown-slides`

3. **npm Package** (optional):
   - Published to npmjs.com
   - Installable via `npm install`

4. **Docker Image:**
   - Tagged with version
   - Available at GHCR
   - Includes latest tag

## Monitoring Releases

### Check Release Status

**GitHub UI:**
1. Go to Actions tab
2. View workflow runs
3. Check job status and logs

**GitHub CLI:**
```bash
# List recent runs
gh run list --workflow=release.yml

# View specific run
gh run view <run-id>

# Watch live
gh run watch
```

### Release Notifications

Get notified of releases:
1. Watch the repository (Watch → All Activity)
2. Enable notifications for releases
3. Use GitHub mobile app

### Failed Releases

If a release fails:

1. **Check logs:**
   - Go to Actions → Failed workflow
   - Click on failed job
   - Review error messages

2. **Common issues:**
   - Missing secrets (NPM_TOKEN)
   - Invalid version format
   - Build failures
   - Permission issues

3. **Retry:**
   - Fix the issue
   - Re-run the workflow from GitHub UI
   - Or create a new tag

## Manual Override

If automation fails, you can release manually:

```bash
# Build locally
npm run build

# Create GitHub release
gh release create v1.0.0 \
  --title "Release v1.0.0" \
  --notes "Release notes here" \
  ./dist.tar.gz

# Publish to npm
npm publish

# Deploy to GitHub Pages
npm run build
gh pages deploy --dir dist
```

## Best Practices

1. **Always test before release**
   - Run `npm run build` locally
   - Test in preview mode
   - Check all features

2. **Write good commit messages**
   - Use conventional commit format
   - Be descriptive
   - Reference issues

3. **Use version bumps correctly**
   - Patch for bug fixes
   - Minor for features
   - Major for breaking changes

4. **Document changes**
   - Update README if needed
   - Update guides
   - Add migration notes for major versions

5. **Monitor releases**
   - Watch workflow runs
   - Check deployment
   - Verify npm/Docker

6. **Keep dependencies updated**
   - Review weekly dependency PRs
   - Test thoroughly
   - Merge when stable

## Troubleshooting

### Build Fails

```bash
# Run locally to debug
npm ci
npm run lint
npm run build
```

### GitHub Pages Not Updating

1. Check workflow completed successfully
2. Verify Pages is enabled in settings
3. Check Pages deployment job
4. Wait 1-2 minutes for propagation
5. Clear browser cache

### npm Publish Fails

1. Check NPM_TOKEN secret exists
2. Verify token has publish permissions
3. Check package name is available
4. Ensure version doesn't already exist
5. Check .npmignore is correct

### Docker Build Fails

1. Check Dockerfile syntax
2. Test build locally:
   ```bash
   docker build -t markdown-slides .
   docker run -p 8080:80 markdown-slides
   ```
3. Check GHCR permissions

### Version Conflicts

If version already exists:
```bash
# Check current version
npm view markdown-slides version

# Bump to next version
npm version patch
git push origin main --tags
```

## Advanced Configuration

### Custom Changelog Format

Edit `.github/workflows/release.yml` in the changelog step to customize format.

### Add More Deployment Targets

Add new jobs to `release.yml`:

```yaml
deploy-aws:
  name: Deploy to AWS
  runs-on: ubuntu-latest
  needs: build
  steps:
    # Your AWS deployment steps
```

### Conditional Publishing

Modify npm-publish job:
```yaml
if: github.event_name == 'push' && !contains(github.ref, 'beta')
```

### Slack Notifications

Add to announce job:
```yaml
- name: Notify Slack
  uses: slackapi/slack-github-action@v1
  with:
    payload: |
      {
        "text": "Release ${{ needs.validate.outputs.version }} published!"
      }
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

## Support

For issues with the release workflow:
1. Check this documentation
2. Review workflow logs
3. Check GitHub Actions status
4. Open an issue on GitHub

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [npm Publishing Guide](https://docs.npmjs.com/cli/v8/commands/npm-publish)
- [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
