#!/bin/bash

# Documentation Migration Script
# This script moves all documentation files to the docs/ subdirectory

set -e  # Exit on error

echo "========================================="
echo "Documentation Migration Script"
echo "========================================="
echo ""

# Create directory structure
echo "Creating docs directory structure..."
mkdir -p docs/getting-started
mkdir -p docs/deployment
mkdir -p docs/development
mkdir -p docs/release
mkdir -p docs/reference

echo "✓ Directory structure created"
echo ""

# Function to move file if it exists
move_if_exists() {
    local source=$1
    local dest=$2
    if [ -f "$source" ]; then
        mv "$source" "$dest"
        echo "✓ Moved: $source → $dest"
    else
        echo "⚠ Skipped (not found): $source"
    fi
}

# Move getting started docs
echo "Moving getting started documentation..."
move_if_exists "CLI_USAGE_GUIDE.md" "docs/getting-started/CLI_USAGE_GUIDE.md"
move_if_exists "USER_GUIDE.md" "docs/getting-started/USER_GUIDE.md"
move_if_exists "QUICKSTART_LOCAL_AND_NPM.md" "docs/getting-started/QUICKSTART_LOCAL_AND_NPM.md"
echo ""

# Move deployment docs
echo "Moving deployment documentation..."
move_if_exists "GITHUB_PAGES_DEPLOYMENT.md" "docs/deployment/GITHUB_PAGES_DEPLOYMENT.md"
move_if_exists "GITHUB_PAGES_QUICKSTART.md" "docs/deployment/GITHUB_PAGES_QUICKSTART.md"
move_if_exists "GITLAB_PAGES_DEPLOYMENT.md" "docs/deployment/GITLAB_PAGES_DEPLOYMENT.md"
move_if_exists "DEPLOYMENT_CHECKLIST.md" "docs/deployment/DEPLOYMENT_CHECKLIST.md"
move_if_exists "DEPLOYMENT_COMPARISON.md" "docs/deployment/DEPLOYMENT_COMPARISON.md"
echo ""

# Move development docs
echo "Moving development documentation..."
move_if_exists "ARCHITECTURE.md" "docs/development/ARCHITECTURE.md"
move_if_exists "PRD.md" "docs/development/PRD.md"
move_if_exists "VSCODE_EXTENSION_GUIDE.md" "docs/development/VSCODE_EXTENSION_GUIDE.md"
echo ""

# Move release docs
echo "Moving release documentation..."
move_if_exists "RELEASE_WORKFLOW.md" "docs/release/RELEASE_WORKFLOW.md"
move_if_exists "RELEASE_IMPLEMENTATION.md" "docs/release/RELEASE_IMPLEMENTATION.md"
move_if_exists "WORKFLOW_ARCHITECTURE.md" "docs/release/WORKFLOW_ARCHITECTURE.md"
move_if_exists "QUICKSTART_RELEASE.md" "docs/release/QUICKSTART_RELEASE.md"
move_if_exists "QUICKSTART_AUTOMATED_RELEASE.md" "docs/release/QUICKSTART_AUTOMATED_RELEASE.md"
move_if_exists "VERSION_BUMP_QUICKREF.md" "docs/release/VERSION_BUMP_QUICKREF.md"
move_if_exists "PRERELEASE_GUIDE.md" "docs/release/PRERELEASE_GUIDE.md"
move_if_exists "PRERELEASE_QUICKREF.md" "docs/release/PRERELEASE_QUICKREF.md"
move_if_exists "PRERELEASE_SUMMARY.md" "docs/release/PRERELEASE_SUMMARY.md"
move_if_exists "AUTOMATED_NPM_PUBLISHING.md" "docs/release/AUTOMATED_NPM_PUBLISHING.md"
move_if_exists "NPM_PUBLISHING_GUIDE.md" "docs/release/NPM_PUBLISHING_GUIDE.md"
move_if_exists "NPM_PUBLISHING_FLOW.md" "docs/release/NPM_PUBLISHING_FLOW.md"
move_if_exists ".github/RELEASE_GUIDE.md" "docs/release/RELEASE_GUIDE.md"
move_if_exists ".github/RELEASE_TEMPLATE.md" "docs/release/RELEASE_TEMPLATE.md"
echo ""

# Move reference docs
echo "Moving reference documentation..."
move_if_exists "POST_SETUP.md" "docs/reference/POST_SETUP.md"
move_if_exists "DOCUMENTATION_INDEX.md" "docs/reference/DOCUMENTATION_INDEX.md"
move_if_exists "IMPLEMENTATION_COMPLETE.md" "docs/reference/IMPLEMENTATION_COMPLETE.md"
move_if_exists "YOUR_ACTION_ITEMS.md" "docs/reference/YOUR_ACTION_ITEMS.md"
if [ -f "scripts/README.md" ]; then
    cp "scripts/README.md" "docs/reference/SCRIPTS_README.md"
    echo "✓ Copied: scripts/README.md → docs/reference/SCRIPTS_README.md (keeping original)"
fi
echo ""

# Clean up temporary files
echo "Cleaning up..."
rm -f move-docs.sh 2>/dev/null || true
echo "✓ Cleanup complete"
echo ""

echo "========================================="
echo "Migration Complete! ✅"
echo "========================================="
echo ""
echo "Documentation structure:"
echo "  docs/"
echo "  ├── README.md (index)"
echo "  ├── getting-started/"
echo "  ├── deployment/"
echo "  ├── development/"
echo "  ├── release/"
echo "  └── reference/"
echo ""
echo "Next steps:"
echo "  1. Review the docs/ directory"
echo "  2. Check that all links in README.md work"
echo "  3. Commit the changes"
echo ""
echo "See DOCUMENTATION_MIGRATION.md for the complete migration mapping."
echo ""
