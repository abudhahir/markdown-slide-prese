# NPM Publishing Guide

This guide provides detailed instructions for publishing the Markdown Slides package to npm.

## Prerequisites

1. **npm account**: Create one at [npmjs.com/signup](https://www.npmjs.com/signup)
2. **Git repository**: Your code should be in a git repository
3. **Clean working directory**: Commit all changes before publishing

## Quick Publishing Checklist

- [ ] Update `package.json` with correct metadata
- [ ] Set `"private": false` in `package.json`
- [ ] Verify `.npmignore` is configured
- [ ] Test build: `npm run build`
- [ ] Test locally: `npm pack` and install the tarball
- [ ] Login to npm: `npm login`
- [ ] Publish: `npm publish`
- [ ] Verify: `npm view your-package-name`

## Step-by-Step Guide

### 1. Prepare package.json

Update your `package.json` with the following changes:

```json
{
  "name": "markdown-slides-presenter",
  "version": "1.0.0",
  "description": "A powerful markdown-based presentation tool built with React",
  "private": false,
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "keywords": [
    "markdown",
    "slides",
    "presentation",
    "presenter",
    "react",
    "typescript",
    "slideshow",
    "reveal",
    "deck"
  ],
  "repository": {
    "type": "git",
    "url": "git+https://github.com/yourusername/markdown-slides.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/markdown-slides/issues"
  },
  "homepage": "https://yourusername.github.io/markdown-slides",
  "bin": {
    "markdown-slides": "./bin/markdown-slides.js",
    "markdown-slides-presenter": "./bin/markdown-slides.js"
  },
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./package.json": "./package.json"
  },
  "files": [
    "bin",
    "dist",
    "README.md",
    "LICENSE"
  ],
  "scripts": {
    "dev": "vite",
    "build": "tsc -b --noCheck && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "start": "node bin/markdown-slides.js",
    "prepublishOnly": "npm run build"
  }
}
```

**Important fields:**
- `name`: Must be unique on npm (check with `npm view <name>`)
- `version`: Follow semantic versioning (MAJOR.MINOR.PATCH)
- `private`: Must be `false` to publish
- `bin`: CLI entry point for npx/npm run commands
- `files`: Array of files/folders to include in package
- `repository`: Link to your git repository
- `prepublishOnly`: Script that runs automatically before publishing

### 2. Verify .npmignore

The `.npmignore` file controls what gets excluded from your package. It's already configured in the repository, but verify it includes:

```
src/
.github/
.devcontainer/
examples/
node_modules/
*.log
vite.config.ts
tsconfig.json
```

**Tip**: You can preview what will be included by running:
```bash
npm pack --dry-run
```

### 3. Test Your Package Locally

Before publishing, test your package:

```bash
# Build the project
npm run build

# Test the CLI locally
npm run start

# Or test directly
node bin/markdown-slides.js --help

# Create a tarball
npm pack

# This creates a file like: markdown-slides-presenter-1.0.0.tgz
```

Test the tarball in another directory:

```bash
# In a different directory
mkdir test-project
cd test-project

# Install the tarball
npm install /path/to/markdown-slides-presenter-1.0.0.tgz

# Test the CLI
npx markdown-slides --help

# Test running it
npx markdown-slides --port 8080
```

Test global installation:

```bash
# Install globally from tarball
npm install -g /path/to/markdown-slides-presenter-1.0.0.tgz

# Test command
markdown-slides --version
markdown-slides --help

# Test running
markdown-slides

# Cleanup
npm uninstall -g markdown-slides-presenter
```

### 4. Login to npm

```bash
npm login
```

You'll be prompted for:
- Username
- Password
- Email (this is public)
- One-time password (if 2FA is enabled)

Verify your login:
```bash
npm whoami
```

### 5. Publish to npm

**First-time publication:**
```bash
npm publish
```

**If using a scoped package** (e.g., `@username/markdown-slides`):
```bash
npm publish --access public
```

**Dry run** (preview without actually publishing):
```bash
npm publish --dry-run
```

### 6. Verify Publication

Check your package on npm:
```bash
npm view markdown-slides-presenter

# Or visit
# https://www.npmjs.com/package/markdown-slides-presenter
```

Test installation:
```bash
npm install markdown-slides-presenter
```

## Version Management

### Semantic Versioning

Follow [semver.org](https://semver.org/) conventions:

- **PATCH** (1.0.0 → 1.0.1): Bug fixes, backward compatible
- **MINOR** (1.0.1 → 1.1.0): New features, backward compatible
- **MAJOR** (1.1.0 → 2.0.0): Breaking changes

### Updating Versions

Use npm's built-in version command:

```bash
# Patch release (bug fixes)
npm version patch

# Minor release (new features)
npm version minor

# Major release (breaking changes)
npm version major

# Pre-release versions
npm version prerelease --preid=beta  # 1.0.0 -> 1.0.1-beta.0
npm version prerelease --preid=alpha # 1.0.0 -> 1.0.1-alpha.0
```

These commands:
1. Update `package.json` version
2. Create a git commit
3. Create a git tag

Then publish:
```bash
git push origin main --tags
npm publish
```

### Publishing Pre-releases

For beta/alpha versions:

```bash
# Tag as beta
npm version 1.1.0-beta.0

# Publish with beta tag
npm publish --tag beta

# Users can install with:
# npm install markdown-slides-presenter@beta
```

## Complete Publishing Workflow

Here's a complete workflow for updating and publishing:

```bash
# 1. Ensure you're on main branch with latest changes
git checkout main
git pull origin main

# 2. Run tests and build
npm run lint
npm run build

# 3. Update version (creates commit and tag)
npm version patch  # or minor/major

# 4. Push changes and tags
git push origin main --tags

# 5. Publish to npm
npm publish

# 6. Verify publication
npm view markdown-slides-presenter version
```

## Automated Publishing with CI/CD

### GitHub Actions

Create `.github/workflows/npm-publish.yml`:

```yaml
name: Publish Package to npm

on:
  release:
    types: [created]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Build package
        run: npm run build
      
      - name: Publish to npm
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

**Setup steps:**
1. Create npm access token at [npmjs.com/settings/tokens](https://www.npmjs.com/settings/tokens)
2. Add token to GitHub repository secrets as `NPM_TOKEN`
3. Create a release on GitHub to trigger publishing

### GitLab CI

Add to `.gitlab-ci.yml`:

```yaml
publish:npm:
  stage: deploy
  image: node:18
  only:
    - tags
  script:
    - echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc
    - npm ci
    - npm run build
    - npm publish
```

**Setup steps:**
1. Create npm access token
2. Add `NPM_TOKEN` to GitLab CI/CD variables (Settings → CI/CD → Variables)
3. Push a git tag to trigger publishing

## Publishing to GitHub Packages

Alternative to npm registry:

### 1. Update package.json

```json
{
  "name": "@yourusername/markdown-slides",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

### 2. Authenticate

```bash
# Create a Personal Access Token with 'write:packages' permission
# at https://github.com/settings/tokens

# Login
npm login --registry=https://npm.pkg.github.com
```

### 3. Publish

```bash
npm publish
```

### 4. Install from GitHub Packages

Users need to configure their `.npmrc`:

```
@yourusername:registry=https://npm.pkg.github.com
```

Then install:
```bash
npm install @yourusername/markdown-slides
```

## Troubleshooting

### "You do not have permission to publish"

**Solutions:**
- Verify you're logged in: `npm whoami`
- Check package name isn't taken: `npm view <package-name>`
- Try a different package name
- Add your username as scope: `@username/package-name`

### "Package name too similar to existing package"

**Solutions:**
- Choose a more unique name
- Use a scoped package: `@username/package-name`

### "Cannot publish over existing version"

**Solutions:**
- Update version number: `npm version patch`
- Never reuse version numbers

### "403 Forbidden"

**Solutions:**
- Check if package name is already taken
- Verify npm account has publishing permissions
- Try `npm publish --access public` for scoped packages

### Package is missing files after installation

**Solutions:**
- Check `.npmignore` doesn't exclude needed files
- Verify `files` array in `package.json` includes necessary paths
- Test with `npm pack` before publishing

## Best Practices

1. **Test thoroughly before publishing**
   - Run `npm pack` to preview contents
   - Install and test the tarball locally
   - Check all files are included

2. **Use semantic versioning**
   - Follow semver.org guidelines
   - Document breaking changes clearly
   - Never reuse version numbers

3. **Keep package size small**
   - Exclude source files, tests, examples
   - Only include `dist/`, `README.md`, and `LICENSE`
   - Check package size with `npm pack`

4. **Write comprehensive documentation**
   - Clear installation instructions
   - Usage examples
   - API documentation
   - Changelog for version updates

5. **Security**
   - Run `npm audit` before publishing
   - Keep dependencies updated
   - Never commit tokens or secrets
   - Enable 2FA on npm account

6. **Version tags**
   - `latest`: Default tag for stable releases
   - `beta`: Pre-release versions
   - `next`: Upcoming features
   - `legacy`: Older major versions

7. **Deprecation**
   ```bash
   # Deprecate a version
   npm deprecate markdown-slides-presenter@1.0.0 "Security vulnerability, please upgrade"
   
   # Deprecate entire package
   npm deprecate markdown-slides-presenter "Package is no longer maintained"
   ```

## Unpublishing

⚠️ **Warning**: Unpublishing can break other projects that depend on your package.

```bash
# Unpublish a specific version (within 72 hours of publishing)
npm unpublish markdown-slides-presenter@1.0.0

# Unpublish entire package
npm unpublish markdown-slides-presenter --force
```

**Better alternatives:**
- Use `npm deprecate` instead
- Publish a new version with fixes
- Update documentation to warn users

## Additional Resources

- [npm Documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [npm Package Naming Guidelines](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#name)
- [Creating and Publishing Scoped Packages](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages)
- [npm Access Tokens](https://docs.npmjs.com/about-access-tokens)

## Getting Help

- npm support: [npm.community](https://npm.community)
- Package issues: Open an issue on your GitHub repository
- General questions: Stack Overflow with `npm` tag

---

Happy publishing! 🚀
