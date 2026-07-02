# GitLab Pages Deployment Checklist

Use this checklist to ensure successful deployment of your Markdown Slides app to GitLab Pages.

## Pre-Deployment

- [ ] Test the app locally with `npm run dev`
- [ ] Run production build locally with `npm run build`
- [ ] Test the production build with `npm run preview`
- [ ] Verify all features work (theme switching, file loading, PDF export)
- [ ] Check that markdown parsing displays correctly
- [ ] Test keyboard shortcuts and navigation
- [ ] Ensure responsive design works on mobile

## GitLab Setup

- [ ] Create a GitLab account at https://gitlab.com
- [ ] Create a new repository for your project
- [ ] Decide on deployment URL structure:
  - [ ] Subdirectory: `username.gitlab.io/project-name/` (use `.gitlab-ci.yml`)
  - [ ] Root domain: `username.gitlab.io/` (use `.gitlab-ci.root-domain.yml`)

## Git Configuration

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

## Pipeline Verification

- [ ] Go to your GitLab repository
- [ ] Navigate to **CI/CD > Pipelines**
- [ ] Verify the pipeline is running
- [ ] Wait for both `build` and `pages` jobs to complete (green checkmark)
- [ ] Check build logs for any errors

## Pages Configuration

- [ ] Go to **Settings > Pages** in your GitLab repository
- [ ] Verify Pages is enabled
- [ ] Note your Pages URL: `https://YOUR_USERNAME.gitlab.io/YOUR_REPO/`
- [ ] (Optional) Configure custom domain if needed

## Post-Deployment Testing

- [ ] Visit your GitLab Pages URL
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
- [ ] Verify no console errors
- [ ] Test with large markdown files (50+ slides)
- [ ] Ensure smooth slide transitions
- [ ] Check that assets load correctly (fonts, etc.)

## Troubleshooting (If Issues Occur)

### Pipeline Fails
- [ ] Check Node.js version in `.gitlab-ci.yml` (currently set to node:20)
- [ ] Verify all dependencies are in `package.json`
- [ ] Check build logs for specific errors
- [ ] Try running `npm ci && npm run build` locally

### 404 Errors
- [ ] Verify the base path is correct in `.gitlab-ci.yml`
- [ ] Check that `VITE_BASE_PATH` matches your repository name
- [ ] Clear browser cache and try again
- [ ] Verify artifacts were created in the Pages job

### Assets Not Loading
- [ ] Check browser console for 404 errors
- [ ] Verify asset paths in built `public/` directory
- [ ] Ensure base path is set correctly
- [ ] Check that all imports use `@/` alias or relative paths

### Features Not Working
- [ ] Check browser console for JavaScript errors
- [ ] Verify environment variables are set correctly
- [ ] Test in incognito/private browsing mode
- [ ] Clear localStorage and try again

## Optional Enhancements

- [ ] Add custom domain
- [ ] Configure SSL certificate
- [ ] Set up deploy notifications
- [ ] Add README badge showing deployment status
- [ ] Configure scheduled pipelines for dependency updates
- [ ] Set up preview deployments for branches

## Maintenance

- [ ] Bookmark your GitLab Pages URL
- [ ] Document deployment process for team members
- [ ] Set up monitoring (uptime checks)
- [ ] Plan for regular content updates
- [ ] Keep dependencies updated

## Success Criteria

Your deployment is successful when:
- ✅ Pipeline completes without errors
- ✅ Site is accessible at GitLab Pages URL
- ✅ All navigation controls work
- ✅ Themes switch correctly
- ✅ Markdown files can be loaded
- ✅ PDF export works
- ✅ Mobile experience is smooth
- ✅ No console errors

## Next Steps After Deployment

1. **Share Your Presentation**:
   - Share the GitLab Pages URL
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
   - Check pipeline runs regularly
   - Update dependencies periodically
   - Fix any issues that arise

---

**Deployment Date**: _________________

**Deployed URL**: _________________

**Notes**: 
_________________________________________
_________________________________________
_________________________________________
