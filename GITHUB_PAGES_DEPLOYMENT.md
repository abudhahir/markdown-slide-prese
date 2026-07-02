# GitHub Pages Deployment Guide

This guide explains how to deploy your Markdown Slides presentation to GitHub Pages using GitHub Actions.

## Prerequisites

- A GitHub repository containing this project
- GitHub Pages enabled in your repository settings
- Push access to the repository

## Setup Instructions

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** > **Pages**
3. Under **Source**, select **GitHub Actions**

### 2. Configure Base Path (if needed)

The deployment workflow automatically handles the base path configuration. However, if your repository name is not the root domain, you may need to adjust the base path.

#### For Repository Pages (username.github.io/repo-name)

If deploying to a repository page (e.g., `https://username.github.io/my-slides`), update the workflow file to set the base path:

Edit `.github/workflows/deploy.yml` and add the base path to the build step:

```yaml
- name: Build
  run: npm run build
  env:
    VITE_BASE_PATH: /my-slides/
```

Replace `my-slides` with your actual repository name.

#### For User/Organization Pages (username.github.io)

If deploying to a user or organization page (e.g., `https://username.github.io`), no changes are needed. The default base path `/` will be used.

### 3. Deploy

The workflow is configured to run automatically on:
- **Push to main branch**: Any commit pushed to the `main` branch triggers a deployment
- **Manual trigger**: You can manually trigger a deployment from the Actions tab

#### Automatic Deployment

Simply push your changes to the `main` branch:

```bash
git add .
git commit -m "Update slides"
git push origin main
```

#### Manual Deployment

1. Go to your repository on GitHub
2. Click on the **Actions** tab
3. Select **Deploy to GitHub Pages** workflow
4. Click **Run workflow**
5. Select the branch (usually `main`)
6. Click **Run workflow**

## Workflow Details

The GitHub Actions workflow (`.github/workflows/deploy.yml`) performs the following steps:

### Build Job
1. **Checkout**: Fetches the repository code
2. **Setup Node**: Installs Node.js 20
3. **Install dependencies**: Runs `npm ci` to install packages
4. **Build**: Runs `npm run build` to create production build
5. **Setup Pages**: Configures GitHub Pages settings
6. **Upload artifact**: Uploads the `dist` folder as an artifact

### Deploy Job
1. **Deploy to GitHub Pages**: Deploys the artifact to GitHub Pages

## Viewing Your Deployment

After the workflow completes successfully:

1. Go to **Settings** > **Pages** in your repository
2. You'll see the URL where your site is published
3. It typically takes a few minutes for the site to be available

For repository pages: `https://username.github.io/repo-name/`
For user/organization pages: `https://username.github.io/`

## Troubleshooting

### Build Fails

1. Check the workflow logs in the **Actions** tab
2. Ensure all dependencies are correctly listed in `package.json`
3. Test the build locally with `npm run build`

### 404 Error After Deployment

If you get a 404 error, the base path might be incorrect:

1. Verify the `VITE_BASE_PATH` in the workflow matches your repository structure
2. For repository pages, ensure it includes the leading and trailing slashes: `/repo-name/`
3. Redeploy after making changes

### Pages Not Updating

1. Check if the workflow completed successfully in the **Actions** tab
2. Clear your browser cache
3. Wait a few minutes - GitHub Pages can take time to update
4. Try accessing the site in an incognito/private window

### Permission Errors

If you see permission errors in the workflow:

1. Go to **Settings** > **Actions** > **General**
2. Under **Workflow permissions**, select **Read and write permissions**
3. Check **Allow GitHub Actions to create and approve pull requests**
4. Save and re-run the workflow

## Customization

### Changing the Branch

To deploy from a different branch, edit `.github/workflows/deploy.yml`:

```yaml
on:
  push:
    branches:
      - your-branch-name  # Change this
```

### Adding Environment Variables

Add environment variables to the build step:

```yaml
- name: Build
  run: npm run build
  env:
    VITE_BASE_PATH: /my-slides/
    VITE_CUSTOM_VAR: value
```

### Caching Dependencies

The workflow already uses Node.js caching for faster builds. No additional configuration needed.

## Deployment Status Badge

Add a deployment status badge to your README.md:

```markdown
![Deploy to GitHub Pages](https://github.com/username/repo-name/actions/workflows/deploy.yml/badge.svg)
```

Replace `username` and `repo-name` with your GitHub username and repository name.

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

## Security Notes

- The workflow uses `npm ci` instead of `npm install` for reproducible builds
- Concurrency control prevents multiple simultaneous deployments
- Permissions are scoped to only what's needed (contents: read, pages: write)
