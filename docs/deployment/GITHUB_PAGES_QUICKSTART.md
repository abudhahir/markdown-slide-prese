# Quick Start: Deploy to GitHub Pages

Follow these steps to deploy your Markdown Slides presentation to GitHub Pages in under 5 minutes.

## Step 1: Push to GitHub

If you haven't already, push your code to a GitHub repository:

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

## Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under **Source**, select **GitHub Actions**

That's it! GitHub Actions is now configured as your deployment source.

## Step 3: Trigger Deployment

The workflow will automatically run when you push to the `main` branch. You can also trigger it manually:

1. Go to the **Actions** tab in your repository
2. Click **Deploy to GitHub Pages** workflow
3. Click **Run workflow** button
4. Select `main` branch
5. Click **Run workflow**

## Step 4: Access Your Site

Once the deployment completes (usually 2-3 minutes):

1. Go back to **Settings** > **Pages**
2. You'll see: "Your site is live at https://username.github.io/repo-name/"
3. Click the link to view your presentation

## Repository vs User Pages

### Repository Page (most common)
URL: `https://username.github.io/repo-name/`

If deploying to a repository page, you need to set the base path. Edit `.github/workflows/deploy.yml`:

```yaml
- name: Build
  run: npm run build
  env:
    VITE_BASE_PATH: /repo-name/  # Replace with your repo name
```

### User/Organization Page
URL: `https://username.github.io/`

For user pages (repository named `username.github.io`), no changes needed. The workflow works out of the box.

## Verify Deployment

After deployment completes:

1. **Check Actions tab**: Ensure the workflow shows a green checkmark
2. **Visit your URL**: Open the GitHub Pages URL
3. **Test features**: Try navigating slides, changing themes, loading files

## Troubleshooting

### 404 Error
- **Problem**: Page shows 404 Not Found
- **Solution**: Set the correct `VITE_BASE_PATH` in the workflow (see above)

### Blank Page
- **Problem**: Page loads but appears blank
- **Solution**: Open browser console (F12) to check for errors. Usually a base path issue.

### Workflow Fails
- **Problem**: Red X in Actions tab
- **Solution**: Click on the failed workflow to see logs. Common issues:
  - Missing dependencies: Run `npm install` locally to update `package-lock.json`
  - Build errors: Test `npm run build` locally first

### Permission Denied
- **Problem**: Workflow shows permission errors
- **Solution**: 
  1. Go to **Settings** > **Actions** > **General**
  2. Under "Workflow permissions", select **Read and write permissions**
  3. Save and re-run the workflow

## Next Steps

- **Custom Domain**: [Configure a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- **Automatic Updates**: Every push to `main` automatically deploys
- **Status Badge**: Add deployment badge to README (see full guide)

## Full Documentation

For advanced configuration and troubleshooting, see [GITHUB_PAGES_DEPLOYMENT.md](./GITHUB_PAGES_DEPLOYMENT.md)
