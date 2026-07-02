# GitLab Pages Deployment Guide

This guide explains how to deploy your Markdown Slides presentation app to GitLab Pages.

## Quick Start

1. **Push your code to GitLab**
   ```bash
   git remote add gitlab https://gitlab.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push gitlab main
   ```

2. **Enable GitLab Pages**
   - Go to your GitLab repository
   - Navigate to **Settings > Pages**
   - Pages will be automatically enabled after the first successful pipeline run

3. **Wait for the pipeline to complete**
   - Go to **CI/CD > Pipelines**
   - Wait for the pipeline to finish (green checkmark)
   - Your site will be available at: `https://YOUR_USERNAME.gitlab.io/YOUR_REPO_NAME/`

## How It Works

The `.gitlab-ci.yml` file in this repository automatically:

1. **Build Stage**:
   - Installs dependencies using `npm ci`
   - Builds the application with the correct base path for GitLab Pages
   - Creates optimized production assets in the `dist/` folder

2. **Deploy Stage**:
   - Copies build artifacts to the `public/` directory
   - GitLab Pages automatically serves content from the `public/` directory
   - Your site goes live at `https://<username>.gitlab.io/<project-name>/`

## Configuration

### Deployment Path Options

**Option 1: Project Subdirectory (Default)**
- Repository: `https://gitlab.com/username/my-slides`
- URL: `https://username.gitlab.io/my-slides/`
- Uses: `.gitlab-ci.yml` (already configured)

**Option 2: Root Domain**
- Repository: `https://gitlab.com/username/username.gitlab.io`
- URL: `https://username.gitlab.io/`
- To use this:
  1. Rename your repository to `username.gitlab.io`
  2. Replace `.gitlab-ci.yml` with `.gitlab-ci.root-domain.yml`:
     ```bash
     mv .gitlab-ci.root-domain.yml .gitlab-ci.yml
     ```
  3. Commit and push

### Base Path

The `.gitlab-ci.yml` automatically sets the correct base path using:
```yaml
VITE_BASE_PATH=/${CI_PROJECT_NAME}/ npm run build
```

This ensures all assets load correctly on GitLab Pages.

### Custom Domain

To use a custom domain:

1. Go to **Settings > Pages** in your GitLab repository
2. Click **New Domain**
3. Enter your custom domain name
4. Follow the DNS configuration instructions
5. Add SSL certificate (optional but recommended)

### Branch Configuration

By default, the pipeline runs on `main` and `master` branches. To deploy from a different branch:

Edit `.gitlab-ci.yml` and change:
```yaml
only:
  - main
  - master
  - YOUR_BRANCH_NAME
```

## Troubleshooting

### Pipeline Fails

1. **Check the pipeline logs**:
   - Go to **CI/CD > Pipelines**
   - Click on the failed pipeline
   - Check the build logs for errors

2. **Common issues**:
   - Node version mismatch: Update `image: node:20` in `.gitlab-ci.yml`
   - Build errors: Run `npm run build` locally to identify issues
   - Missing dependencies: Ensure `package.json` is up to date

### Pages Not Updating

1. **Clear browser cache**: Hard refresh with `Ctrl+F5` (Windows/Linux) or `Cmd+Shift+R` (Mac)
2. **Check pipeline status**: Ensure the latest pipeline completed successfully
3. **Verify artifacts**: Check that the `pages` job created a `public/` artifact

### 404 Errors on Page Reload

Single Page Applications need special configuration. GitLab Pages automatically handles this, but if you encounter issues:

1. Go to **Settings > Pages**
2. Ensure "Use unique domain" is enabled
3. Add a `_redirects` file (handled automatically by Vite)

## Local Testing

To test the production build locally before deploying:

```bash
# Build with GitLab Pages base path
VITE_BASE_PATH=/your-repo-name/ npm run build

# Preview the build
npm run preview
```

Then visit `http://localhost:4173/your-repo-name/`

## Advanced Configuration

### Environment Variables

Add environment variables in GitLab:
1. Go to **Settings > CI/CD > Variables**
2. Click **Add variable**
3. Use them in `.gitlab-ci.yml`:
   ```yaml
   script:
     - VITE_API_KEY=$API_KEY npm run build
   ```

### Build Optimization

For faster builds, the configuration uses:
- `npm ci --prefer-offline`: Faster, reproducible installs
- Cached `node_modules/` directory
- Artifact expiration to save storage

### Multiple Environments

Deploy to different environments:

```yaml
pages:staging:
  stage: deploy
  script:
    - mkdir -p public-staging
    - cp -r dist/* public-staging/
  artifacts:
    paths:
      - public-staging
  only:
    - develop
  environment:
    name: staging
    url: https://staging-$CI_PROJECT_NAME.gitlab.io
```

## Useful Commands

```bash
# View pipeline status
git push && echo "Check: https://gitlab.com/USERNAME/REPO/-/pipelines"

# Force rebuild without code changes
git commit --allow-empty -m "Trigger rebuild" && git push

# Check Pages status
curl -I https://USERNAME.gitlab.io/REPO/
```

## Support

- [GitLab Pages Documentation](https://docs.gitlab.com/ee/user/project/pages/)
- [Vite Deployment Guide](https://vite.dev/guide/static-deploy.html)
- [GitLab CI/CD Documentation](https://docs.gitlab.com/ee/ci/)

## Additional Resources

### Vite Static Deployment
Your Vite configuration has been updated to support base path configuration via the `VITE_BASE_PATH` environment variable.

### Markdown Slides Features
All features of your Markdown Slides application work on GitLab Pages:
- ✅ Load markdown files via Git URLs
- ✅ Theme selection and persistence
- ✅ Keyboard shortcuts
- ✅ PDF export
- ✅ Presentation timer
- ✅ File browser
- ✅ Search functionality

Enjoy your deployed presentation app! 🎉
