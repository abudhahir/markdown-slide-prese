# Deployment Comparison: GitHub Pages vs GitLab Pages

Both GitHub Pages and GitLab Pages are excellent options for deploying your Markdown Slides presentation. Here's a comparison to help you choose.

## Quick Comparison

| Feature | GitHub Pages | GitLab Pages |
|---------|-------------|--------------|
| **Setup Complexity** | ⭐⭐⭐⭐⭐ Very Easy | ⭐⭐⭐⭐ Easy |
| **Build Time** | ~2-3 minutes | ~2-4 minutes |
| **Free Tier** | Unlimited public repos | Unlimited public projects |
| **Custom Domain** | ✅ Supported | ✅ Supported |
| **HTTPS** | ✅ Automatic | ✅ Automatic |
| **Base Path Config** | Required for repo pages | Required for project pages |
| **Workflow File** | `.github/workflows/deploy.yml` | `.gitlab-ci.yml` |

## GitHub Pages

### Pros
- **Simpler Setup**: Just select "GitHub Actions" in settings
- **Better UI**: Clearer workflow interface
- **Status Checks**: Easy to see deployment status
- **Popular**: More community resources and examples

### Cons
- Requires separate workflow file
- Base path configuration needed for repository pages

### Best For
- Public open-source projects
- Projects already on GitHub
- Teams familiar with GitHub Actions

### Setup Steps
1. Enable GitHub Pages in repository settings
2. Push code with `.github/workflows/deploy.yml`
3. Workflow runs automatically on push

### Documentation
- [Quick Start Guide](./GITHUB_PAGES_QUICKSTART.md)
- [Full Deployment Guide](./GITHUB_PAGES_DEPLOYMENT.md)

## GitLab Pages

### Pros
- **Integrated CI/CD**: GitLab CI is built-in
- **Preview Environments**: Easy to set up review apps
- **Flexible**: More configuration options
- **All-in-One**: Git, CI/CD, and Pages in one platform

### Cons
- Slightly more complex configuration
- Less community documentation for Pages

### Best For
- Projects on GitLab
- Teams using GitLab's integrated DevOps features
- Organizations preferring GitLab's all-in-one platform

### Setup Steps
1. Add `.gitlab-ci.yml` to repository root
2. Push to GitLab
3. Pages automatically deploy from CI pipeline

### Documentation
- [GitLab Pages Deployment Guide](./GITLAB_PAGES_DEPLOYMENT.md)

## URL Structure

Both platforms follow similar URL patterns:

### GitHub Pages
- **User/Org Page**: `https://username.github.io/`
- **Repository Page**: `https://username.github.io/repo-name/`

### GitLab Pages
- **User/Group Page**: `https://username.gitlab.io/`
- **Project Page**: `https://username.gitlab.io/project-name/`

## Configuration Differences

### Base Path

Both require base path configuration for project/repository pages:

**GitHub Actions** (`.github/workflows/deploy.yml`):
```yaml
- name: Build
  run: npm run build
  env:
    VITE_BASE_PATH: /repo-name/
```

**GitLab CI** (`.gitlab-ci.yml`):
```yaml
build:
  script:
    - npm run build
  variables:
    VITE_BASE_PATH: /project-name/
```

### Artifacts

**GitHub Pages**: Uses `actions/upload-pages-artifact`
```yaml
- name: Upload artifact
  uses: actions/upload-pages-artifact@v3
  with:
    path: ./dist
```

**GitLab Pages**: Uses `artifacts` with `public` directory
```yaml
artifacts:
  paths:
    - public
```

## Custom Domains

Both platforms support custom domains with HTTPS:

### GitHub Pages
1. Add CNAME file to repository
2. Configure DNS records
3. Enable HTTPS in settings

### GitLab Pages
1. Configure custom domain in Pages settings
2. Add DNS records
3. HTTPS configured automatically

## Deployment Triggers

### GitHub Pages
- Push to specified branch (default: `main`)
- Manual workflow dispatch
- Pull request previews (with additional setup)

### GitLab Pages
- Push to specified branch (default: any branch)
- Merge requests (automatic review apps)
- Manual pipeline triggers

## Which Should You Choose?

Choose **GitHub Pages** if:
- Your project is on GitHub
- You want the simplest setup
- You're familiar with GitHub Actions
- You prefer GitHub's interface

Choose **GitLab Pages** if:
- Your project is on GitLab
- You want integrated CI/CD features
- You need review/preview environments
- You prefer GitLab's all-in-one platform

Choose **Both** if:
- You want maximum availability
- You're mirroring repositories
- You want to compare platforms

## Migration Between Platforms

It's easy to switch or support both:

### From GitHub to GitLab
1. Mirror repository to GitLab
2. Add `.gitlab-ci.yml` configuration
3. Push to trigger deployment

### From GitLab to GitHub
1. Mirror repository to GitHub
2. Add `.github/workflows/deploy.yml`
3. Enable GitHub Pages

### Support Both
Both workflow files can coexist:
- `.github/workflows/deploy.yml` - GitHub Pages
- `.gitlab-ci.yml` - GitLab Pages

Deploy to both platforms automatically!

## Costs

### Free Tier

**GitHub Pages**:
- Unlimited for public repositories
- 1GB storage limit
- 100GB bandwidth per month
- Built with public GitHub Actions minutes

**GitLab Pages**:
- Unlimited for public projects
- No explicit storage/bandwidth limits on GitLab.com
- Built with shared runners on GitLab.com

### Private Repositories/Projects

**GitHub Pages**:
- Free for GitHub Pro, Team, Enterprise
- Uses GitHub Actions minutes (2,000-50,000/month depending on plan)

**GitLab Pages**:
- Available on all tiers
- Uses CI/CD minutes (400-50,000/month depending on plan)

## Additional Resources

### GitHub Pages
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

### GitLab Pages
- [GitLab Pages Documentation](https://docs.gitlab.com/ee/user/project/pages/)
- [GitLab CI/CD Documentation](https://docs.gitlab.com/ee/ci/)

### Vite Deployment
- [Vite Static Deploy Guide](https://vitejs.dev/guide/static-deploy.html)

## Conclusion

Both platforms are excellent choices for deploying your Markdown Slides presentation. The best choice depends on where your code is hosted and which platform you're more comfortable with.

For most users:
- **GitHub project** → Use GitHub Pages
- **GitLab project** → Use GitLab Pages
- **Want both** → Use both! The workflows are independent
