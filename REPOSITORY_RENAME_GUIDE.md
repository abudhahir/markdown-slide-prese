# Repository Rename Guide

This guide will help you change your GitHub repository name to get the desired published URL.

## Current Situation

- **Current Repository Name**: `markdown-slides-presenter`
- **Current URL**: `https://markdown-slide-prese--abudhahir.github.app` (truncated)
- **Desired URL**: `https://markdown-slides-abudhahir.github.app`

## Solution

The URL is determined by your **GitHub repository name**. To get the desired URL, you need to rename your repository from `markdown-slides-presenter` to `markdown-slides`.

## Step-by-Step Instructions

### 1. Rename Your GitHub Repository

1. Go to your repository: https://github.com/abudhahir/markdown-slides-presenter
2. Click on **"Settings"** tab (near the top right)
3. In the **General** section, find **"Repository name"**
4. Change the name from `markdown-slides-presenter` to `markdown-slides`
5. Click **"Rename"** button
6. GitHub will warn you about the impact - click **"I understand, rename repository"**

### 2. Update Your Local Repository (Important!)

After renaming on GitHub, update your local repository:

```bash
# Navigate to your local repository
cd /path/to/your/markdown-slides-presenter

# Update the remote URL
git remote set-url origin https://github.com/abudhahir/markdown-slides.git

# Verify the change
git remote -v

# Pull any changes
git pull origin main
```

### 3. Files Already Updated

The following files have been updated in this commit to reflect the new repository name:

- ✅ `package.json` - Repository URL, homepage, and bug tracker
- ✅ `README.md` - All GitHub URLs, badges, clone commands, and author info
- ✅ This guide document

### 4. GitHub Pages Deployment

After renaming:

1. GitHub will automatically redirect the old repository URL to the new one
2. The GitHub Actions workflow will trigger on your next push
3. The new URL `https://markdown-slides-abudhahir.github.app` will be active after deployment
4. The old URL may still work temporarily due to GitHub's redirect system

### 5. Verify the Changes

After renaming and the next deployment:

```bash
# Check the new repository
https://github.com/abudhahir/markdown-slides

# Check the new live URL (after deployment completes)
https://markdown-slides-abudhahir.github.app
```

## What Happens Next

1. **Commit and push this change** to your repository:
   ```bash
   git add .
   git commit -m "Update repository references to new name"
   git push origin main
   ```

2. **Rename the repository** on GitHub (following step 1 above)

3. **Update your local remote** (following step 2 above)

4. **Push again** to trigger deployment:
   ```bash
   git push origin main
   ```

5. **Wait for deployment** - Check the Actions tab to see the deployment progress

6. **Access your site** at the new URL: https://markdown-slides-abudhahir.github.app

## Additional Notes

### npm Package Name

The npm package name in `package.json` is still `markdown-slides-presenter`. This is intentional and separate from the repository name. You can:

- **Keep it as is** - The package name doesn't need to match the repo name
- **Change it later** - If you want, you can publish under a different package name like `markdown-slides` (but check availability on npm first)

### GitHub Redirects

GitHub will automatically redirect:
- Old repo URL → New repo URL
- Old clone URLs → New clone URLs
- This helps prevent broken links

### Breaking Changes

The only manual update needed is for:
- ✅ **Local git remotes** (covered in step 2 above)
- Bookmarks or external links (will auto-redirect, but update for clarity)
- CI/CD systems pointing to the old URL (if any)

## Troubleshooting

### Old URL still showing?

- Wait a few minutes for DNS propagation
- Clear your browser cache
- Check GitHub Actions to ensure deployment completed

### Deployment failed?

- Check the Actions tab on GitHub
- Ensure GitHub Pages is enabled in repository settings
- Verify the `deploy.yml` workflow ran successfully

### Can't find the rename option?

- You must be the repository owner
- Repository cannot be a fork (must be your own repo)
- Check that you're logged in to the correct GitHub account

## Need Help?

If you encounter issues:

1. Check GitHub's documentation: https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository
2. Verify GitHub Pages settings in your repository settings
3. Check the Actions tab for deployment logs
4. Open an issue in the repository if problems persist

---

**After completing these steps, your published URL will be:** `https://markdown-slides-abudhahir.github.app` ✨
