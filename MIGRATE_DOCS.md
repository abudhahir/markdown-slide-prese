# Documentation Migration Instructions

## Quick Migration

To move all documentation to the `docs/` directory, run:

```bash
chmod +x migrate-docs.sh
./migrate-docs.sh
```

This script will:
1. Create the `docs/` directory structure
2. Move all documentation files to appropriate subdirectories
3. Preserve the original `scripts/README.md` while copying it to `docs/reference/`
4. Clean up temporary files

## Manual Migration (if preferred)

If you prefer to move files manually, here's the structure:

### Getting Started Docs → `docs/getting-started/`
```bash
mv CLI_USAGE_GUIDE.md docs/getting-started/
mv USER_GUIDE.md docs/getting-started/
mv QUICKSTART_LOCAL_AND_NPM.md docs/getting-started/
```

### Deployment Docs → `docs/deployment/`
```bash
mv GITHUB_PAGES_DEPLOYMENT.md docs/deployment/
mv GITHUB_PAGES_QUICKSTART.md docs/deployment/
mv GITLAB_PAGES_DEPLOYMENT.md docs/deployment/
mv DEPLOYMENT_CHECKLIST.md docs/deployment/
mv DEPLOYMENT_COMPARISON.md docs/deployment/
```

### Development Docs → `docs/development/`
```bash
mv ARCHITECTURE.md docs/development/
mv PRD.md docs/development/
mv VSCODE_EXTENSION_GUIDE.md docs/development/
```

### Release Docs → `docs/release/`
```bash
mv RELEASE_WORKFLOW.md docs/release/
mv RELEASE_IMPLEMENTATION.md docs/release/
mv WORKFLOW_ARCHITECTURE.md docs/release/
mv QUICKSTART_RELEASE.md docs/release/
mv QUICKSTART_AUTOMATED_RELEASE.md docs/release/
mv VERSION_BUMP_QUICKREF.md docs/release/
mv PRERELEASE_GUIDE.md docs/release/
mv PRERELEASE_QUICKREF.md docs/release/
mv PRERELEASE_SUMMARY.md docs/release/
mv AUTOMATED_NPM_PUBLISHING.md docs/release/
mv NPM_PUBLISHING_GUIDE.md docs/release/
mv NPM_PUBLISHING_FLOW.md docs/release/
mv .github/RELEASE_GUIDE.md docs/release/
mv .github/RELEASE_TEMPLATE.md docs/release/
```

### Reference Docs → `docs/reference/`
```bash
mv POST_SETUP.md docs/reference/
mv DOCUMENTATION_INDEX.md docs/reference/
mv IMPLEMENTATION_COMPLETE.md docs/reference/
mv YOUR_ACTION_ITEMS.md docs/reference/
cp scripts/README.md docs/reference/SCRIPTS_README.md  # Copy, don't move
```

## What's Already Done

The following have already been created:
- ✅ `docs/README.md` - Documentation index with navigation
- ✅ `docs/getting-started/TESTING_AND_LOCAL_DEPLOYMENT.md`
- ✅ `docs/getting-started/QUICKSTART_CLI.md`
- ✅ `DOCUMENTATION_MIGRATION.md` - Migration mapping reference
- ✅ `README.md` - All links updated to new paths

## After Migration

1. **Verify all files moved**:
   ```bash
   ls -la docs/getting-started/
   ls -la docs/deployment/
   ls -la docs/development/
   ls -la docs/release/
   ls -la docs/reference/
   ```

2. **Test documentation links**:
   - Open `README.md` and click through links
   - Open `docs/README.md` and verify the index

3. **Commit changes**:
   ```bash
   git add docs/
   git add README.md
   git add DOCUMENTATION_MIGRATION.md
   git rm ARCHITECTURE.md CLI_USAGE_GUIDE.md USER_GUIDE.md  # etc.
   git commit -m "docs: organize documentation into docs/ subdirectory"
   ```

4. **Update any custom bookmarks** you have to documentation files

## Files That Stay in Root

These important files remain in the project root:
- `README.md` - Main project documentation
- `CHANGELOG.md` - Version history  
- `LICENSE` - Project license
- `SECURITY.md` - Security policy
- `package.json`, `tsconfig.json`, etc. - Config files

## Need Help?

- See [DOCUMENTATION_MIGRATION.md](./DOCUMENTATION_MIGRATION.md) for complete file mapping
- See [docs/README.md](./docs/README.md) for documentation index
- Open an issue if you encounter problems

---

**Note**: The migration script is safe to run multiple times. It will skip files that don't exist and won't overwrite existing files in `docs/`.
