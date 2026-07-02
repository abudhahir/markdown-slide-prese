# Deployment Checklist

Use this checklist to ensure successful deployment of your Markdown Slides app to GitHub Pages or GitLab Pages.

## Choose Your Platform

- [ ] GitHub Pages (recommended for GitHub projects)
- [ ] GitLab Pages (recommended for GitLab projects)
- [ ] Both (deploy to multiple platforms)

## Pre-Deployment

- [ ] Test the app locally with `npm run dev`
- [ ] Run production build locally with `npm run build`
- [ ] Test the production build with `npm run preview`
- [ ] Verify all features work (theme switching, file loading, PDF export)
- [ ] Check that markdown parsing displays correctly
- [ ] Test keyboard shortcuts and navigation
- [ ] Ensure responsive design works on mobile

## GitHub Pages Deployment

### Setup

- [ ] Create a GitHub account at https://github.com
- [ ] Create a new repository for your project
- [ ] Go to **Settings > Pages**
- [ ] Under **Source**, select **GitHub Actions**
- [ ] Decide on base path:
  - [ ] Repository page: `username.github.io/repo-name/` (configure VITE_BASE_PATH)
  - [ ] User page: `username.github.io/` (no configuration needed)

### Configuration

- [ ] Ensure `.github/workflows/deploy.yml` exists in your repository
- [ ] If using repository page, edit workflow to set base path:
  ```yaml
  - name: Build
    run: npm run build
    env:
      VITE_BASE_PATH: /repo-name/
  ```

### Deployment

- [ ] Initialize git (if not already done):
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  ```

- [ ] Add GitHub as remote:
  ```bash
  git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
  ```

- [ ] Push to GitHub:
  ```bash
  git push -u origin main
  ```

### Verification

- [ ] Go to your GitHub repository
- [ ] Navigate to **Actions** tab
- [ ] Verify the "Deploy to GitHub Pages" workflow is running
- [ ] Wait for both `build` and `deploy` jobs to complete (green checkmark)
- [ ] Check workflow logs for any errors
- [ ] Go to **Settings > Pages** to see your live URL
- [ ] Visit the URL to test your deployment

## GitLab Pages Deployment

### Setup

- [ ] Create a GitLab account at https://gitlab.com
- [ ] Create a new repository for your project
- [ ] Decide on deployment URL structure:
  - [ ] Subdirectory: `username.gitlab.io/project-name/` (use `.gitlab-ci.yml`)
  - [ ] Root domain: `username.gitlab.io/` (use `.gitlab-ci.root-domain.yml`)

### Configuration

- [ ] Ensure the correct `.gitlab-ci.yml` file exists
- [ ] Verify base path is set correctly in the pipeline

### Deployment

- [ ] Initialize git (if not already done):
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  ```

- [ ] Add GitLab as remote:
  ```bash
  git remote add gitlab https://gitlab.com/YOUR_USERNAME/YOUR_REPO.git
  ```

- [ ] Push to GitLab:
  ```bash
  git push -u gitlab main
  ```

### Verification

- [ ] Go to your GitLab repository
- [ ] Navigate to **CI/CD > Pipelines**
- [ ] Verify the pipeline is running
- [ ] Wait for both `build` and `pages` jobs to complete (green checkmark)
- [ ] Check build logs for any errors
- [ ] Go to **Settings > Pages** to see your live URL
- [ ] Visit the URL to test your deployment

## Post-Deployment Testing

Test all features on the live site:

- [ ] Visit your deployment URL
- [ ] Test navigation (arrow keys, spacebar)
- [ ] Test theme switching (T key)
- [ ] Test file selector (O key)
- [ ] Load a markdown file from Git URL
- [ ] Test slide list view (S key)
- [ ] Test file name display (D key)
- [ ] Test PDF export functionality
- [ ] Test presentation timer
- [ ] Test fullscreen mode (F key)
- [ ] Test keyboard shortcuts help (? key)
- [ ] Verify all themes render correctly
- [ ] Test on mobile device (swipe gestures)

## Browser Testing

Test on multiple browsers:

- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Checks

- [ ] Check page load speed (should be < 3 seconds)
- [ ] Verify no console errors (F12 Developer Tools)
- [ ] Test with large markdown files (50+ slides)
- [ ] Ensure smooth slide transitions
- [ ] Check that assets load correctly (fonts, etc.)

## Troubleshooting

### GitHub Actions Pipeline Fails

- [ ] Check workflow logs in Actions tab
- [ ] Verify Node.js version in workflow (currently set to 20)
- [ ] Verify all dependencies are in `package.json`
- [ ] Try running `npm ci && npm run build` locally
- [ ] Check for permission errors (Settings > Actions > General)

### GitLab CI Pipeline Fails

- [ ] Check pipeline logs in CI/CD section
- [ ] Verify Node.js version in `.gitlab-ci.yml` (currently set to node:20)
- [ ] Verify all dependencies are in `package.json`
- [ ] Try running `npm ci && npm run build` locally

### 404 Errors

- [ ] Verify the base path is correct in workflow/pipeline
- [ ] Check that `VITE_BASE_PATH` matches your repository name
- [ ] Clear browser cache and try again
- [ ] Verify artifacts were created correctly
- [ ] Test with incognito/private browsing mode

### Assets Not Loading

- [ ] Check browser console for 404 errors (F12)
- [ ] Verify asset paths in built `dist/` or `public/` directory
- [ ] Ensure base path is set correctly
- [ ] Check that all imports use `@/` alias or relative paths

### Features Not Working

- [ ] Check browser console for JavaScript errors
- [ ] Verify environment variables are set correctly
- [ ] Clear localStorage and try again
- [ ] Test in different browser

## Optional Enhancements

- [ ] Add custom domain (both platforms support this)
- [ ] Configure SSL certificate (automatic on both platforms)
- [ ] Add deployment status badge to README
- [ ] Set up branch preview deployments
- [ ] Configure deploy notifications
- [ ] Set up monitoring (uptime checks)

## Maintenance

- [ ] Bookmark your deployment URL
- [ ] Document deployment process for team members
- [ ] Plan for regular content updates
- [ ] Keep dependencies updated
- [ ] Monitor deployment status regularly

## Success Criteria

Your deployment is successful when:

- ✅ Pipeline/workflow completes without errors
- ✅ Site is accessible at deployment URL
- ✅ All navigation controls work
- ✅ Themes switch correctly
- ✅ Markdown files can be loaded
- ✅ PDF export works
- ✅ Mobile experience is smooth
- ✅ No console errors

## Next Steps After Deployment

1. **Share Your Presentation**:
   - Share the deployment URL
   - Demonstrate loading presentations from Git URLs
   - Show how to use keyboard shortcuts

2. **Create Content**:
   - Prepare markdown presentations
   - Store them in a Git repository
   - Use the file loader to present them

3. **Customize**:
   - Adjust themes if needed
   - Modify default tutorial slides
   - Add your branding

4. **Monitor**:
   - Check pipeline/workflow runs regularly
   - Update dependencies periodically
   - Fix any issues that arise

---

**Platform**: ____________ (GitHub Pages / GitLab Pages / Both)

**Deployment Date**: _________________

**Deployed URL**: _________________

**Notes**: 
_________________________________________
_________________________________________
_________________________________________
