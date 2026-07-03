#!/bin/bash

# Create docs directory structure
mkdir -p docs/getting-started
mkdir -p docs/deployment
mkdir -p docs/development
mkdir -p docs/release
mkdir -p docs/reference

# Move getting started docs
mv TESTING_AND_LOCAL_DEPLOYMENT.md docs/getting-started/ 2>/dev/null || true
mv QUICKSTART_CLI.md docs/getting-started/ 2>/dev/null || true
mv CLI_USAGE_GUIDE.md docs/getting-started/ 2>/dev/null || true
mv USER_GUIDE.md docs/getting-started/ 2>/dev/null || true
mv QUICKSTART_LOCAL_AND_NPM.md docs/getting-started/ 2>/dev/null || true

# Move deployment docs
mv GITHUB_PAGES_DEPLOYMENT.md docs/deployment/ 2>/dev/null || true
mv GITHUB_PAGES_QUICKSTART.md docs/deployment/ 2>/dev/null || true
mv GITLAB_PAGES_DEPLOYMENT.md docs/deployment/ 2>/dev/null || true
mv DEPLOYMENT_CHECKLIST.md docs/deployment/ 2>/dev/null || true
mv DEPLOYMENT_COMPARISON.md docs/deployment/ 2>/dev/null || true

# Move development docs
mv ARCHITECTURE.md docs/development/ 2>/dev/null || true
mv PRD.md docs/development/ 2>/dev/null || true
mv VSCODE_EXTENSION_GUIDE.md docs/development/ 2>/dev/null || true

# Move release docs
mv RELEASE_WORKFLOW.md docs/release/ 2>/dev/null || true
mv RELEASE_IMPLEMENTATION.md docs/release/ 2>/dev/null || true
mv WORKFLOW_ARCHITECTURE.md docs/release/ 2>/dev/null || true
mv QUICKSTART_RELEASE.md docs/release/ 2>/dev/null || true
mv QUICKSTART_AUTOMATED_RELEASE.md docs/release/ 2>/dev/null || true
mv VERSION_BUMP_QUICKREF.md docs/release/ 2>/dev/null || true
mv PRERELEASE_GUIDE.md docs/release/ 2>/dev/null || true
mv PRERELEASE_QUICKREF.md docs/release/ 2>/dev/null || true
mv PRERELEASE_SUMMARY.md docs/release/ 2>/dev/null || true
mv AUTOMATED_NPM_PUBLISHING.md docs/release/ 2>/dev/null || true
mv NPM_PUBLISHING_GUIDE.md docs/release/ 2>/dev/null || true
mv NPM_PUBLISHING_FLOW.md docs/release/ 2>/dev/null || true

# Move reference docs
mv POST_SETUP.md docs/reference/ 2>/dev/null || true
mv DOCUMENTATION_INDEX.md docs/reference/ 2>/dev/null || true
mv IMPLEMENTATION_COMPLETE.md docs/reference/ 2>/dev/null || true
mv YOUR_ACTION_ITEMS.md docs/reference/ 2>/dev/null || true

# Move .github docs
mv .github/RELEASE_GUIDE.md docs/release/ 2>/dev/null || true
mv .github/RELEASE_TEMPLATE.md docs/release/ 2>/dev/null || true

# Move scripts README
mv scripts/README.md docs/reference/SCRIPTS_README.md 2>/dev/null || true

echo "Documentation moved successfully!"
echo "Creating docs index..."
