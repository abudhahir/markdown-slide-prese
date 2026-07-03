#!/bin/bash

# Documentation Migration Script - Final Version
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
        return 0
    else
        echo "⚠ Skipped (not found): $source"
        return 1
    fi
}

# Counter for moved files
moved_count=0

# Move getting started docs
echo "Moving getting started documentation..."
move_if_exists "CLI_USAGE_GUIDE.md" "docs/getting-started/CLI_USAGE_GUIDE.md" && ((moved_count++)) || true
move_if_exists "USER_GUIDE.md" "docs/getting-started/USER_GUIDE.md" && ((moved_count++)) || true
move_if_exists "QUICKSTART_LOCAL_AND_NPM.md" "docs/getting-started/QUICKSTART_LOCAL_AND_NPM.md" && ((moved_count++)) || true
echo ""

# Move deployment docs
echo "Moving deployment documentation..."
move_if_exists "GITHUB_PAGES_DEPLOYMENT.md" "docs/deployment/GITHUB_PAGES_DEPLOYMENT.md" && ((moved_count++)) || true
move_if_exists "GITHUB_PAGES_QUICKSTART.md" "docs/deployment/GITHUB_PAGES_QUICKSTART.md" && ((moved_count++)) || true
move_if_exists "GITLAB_PAGES_DEPLOYMENT.md" "docs/deployment/GITLAB_PAGES_DEPLOYMENT.md" && ((moved_count++)) || true
move_if_exists "DEPLOYMENT_CHECKLIST.md" "docs/deployment/DEPLOYMENT_CHECKLIST.md" && ((moved_count++)) || true
move_if_exists "DEPLOYMENT_COMPARISON.md" "docs/deployment/DEPLOYMENT_COMPARISON.md" && ((moved_count++)) || true
echo ""

# Move development docs
echo "Moving development documentation..."
move_if_exists "ARCHITECTURE.md" "docs/development/ARCHITECTURE.md" && ((moved_count++)) || true
move_if_exists "PRD.md" "docs/development/PRD.md" && ((moved_count++)) || true
move_if_exists "VSCODE_EXTENSION_GUIDE.md" "docs/development/VSCODE_EXTENSION_GUIDE.md" && ((moved_count++)) || true
echo ""

# Move release docs
echo "Moving release documentation..."
move_if_exists "RELEASE_WORKFLOW.md" "docs/release/RELEASE_WORKFLOW.md" && ((moved_count++)) || true
move_if_exists "RELEASE_IMPLEMENTATION.md" "docs/release/RELEASE_IMPLEMENTATION.md" && ((moved_count++)) || true
move_if_exists "WORKFLOW_ARCHITECTURE.md" "docs/release/WORKFLOW_ARCHITECTURE.md" && ((moved_count++)) || true
move_if_exists "QUICKSTART_RELEASE.md" "docs/release/QUICKSTART_RELEASE.md" && ((moved_count++)) || true
move_if_exists "QUICKSTART_AUTOMATED_RELEASE.md" "docs/release/QUICKSTART_AUTOMATED_RELEASE.md" && ((moved_count++)) || true
move_if_exists "VERSION_BUMP_QUICKREF.md" "docs/release/VERSION_BUMP_QUICKREF.md" && ((moved_count++)) || true
move_if_exists "PRERELEASE_GUIDE.md" "docs/release/PRERELEASE_GUIDE.md" && ((moved_count++)) || true
move_if_exists "PRERELEASE_QUICKREF.md" "docs/release/PRERELEASE_QUICKREF.md" && ((moved_count++)) || true
move_if_exists "PRERELEASE_SUMMARY.md" "docs/release/PRERELEASE_SUMMARY.md" && ((moved_count++)) || true
move_if_exists "AUTOMATED_NPM_PUBLISHING.md" "docs/release/AUTOMATED_NPM_PUBLISHING.md" && ((moved_count++)) || true
move_if_exists "NPM_PUBLISHING_GUIDE.md" "docs/release/NPM_PUBLISHING_GUIDE.md" && ((moved_count++)) || true
move_if_exists "NPM_PUBLISHING_FLOW.md" "docs/release/NPM_PUBLISHING_FLOW.md" && ((moved_count++)) || true
move_if_exists ".github/RELEASE_GUIDE.md" "docs/release/RELEASE_GUIDE.md" && ((moved_count++)) || true
move_if_exists ".github/RELEASE_TEMPLATE.md" "docs/release/RELEASE_TEMPLATE.md" && ((moved_count++)) || true
echo ""

# Move reference docs
echo "Moving reference documentation..."
move_if_exists "POST_SETUP.md" "docs/reference/POST_SETUP.md" && ((moved_count++)) || true
move_if_exists "DOCUMENTATION_INDEX.md" "docs/reference/DOCUMENTATION_INDEX.md" && ((moved_count++)) || true
move_if_exists "IMPLEMENTATION_COMPLETE.md" "docs/reference/IMPLEMENTATION_COMPLETE.md" && ((moved_count++)) || true
move_if_exists "YOUR_ACTION_ITEMS.md" "docs/reference/YOUR_ACTION_ITEMS.md" && ((moved_count++)) || true
if [ -f "scripts/README.md" ]; then
    cp "scripts/README.md" "docs/reference/SCRIPTS_README.md"
    echo "✓ Copied: scripts/README.md → docs/reference/SCRIPTS_README.md (keeping original)"
    ((moved_count++))
fi
echo ""

# Clean up migration instruction files (keeping originals for reference)
echo "Cleaning up migration instruction files..."
remove_if_exists() {
    local file=$1
    if [ -f "$file" ]; then
        rm "$file"
        echo "✓ Removed: $file"
    fi
}

remove_if_exists "MIGRATE_DOCS.md"
remove_if_exists "RUN_MIGRATION.md"
remove_if_exists "MIGRATION_SUMMARY.md"
remove_if_exists "DOCUMENTATION_MIGRATION.md"
remove_if_exists "DOCS_QUICK_REFERENCE.md"
remove_if_exists "COMPLETED_MIGRATION_SETUP.md"
remove_if_exists "move-docs.sh"
remove_if_exists "migrate-docs.sh"

echo ""

echo "========================================="
echo "Migration Complete! ✅"
echo "========================================="
echo ""
echo "Moved $moved_count files to docs/ directory"
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
echo "  3. Commit the changes:"
echo "     git add docs/ README.md"
echo "     git commit -m 'docs: organize documentation into docs/ subdirectory'"
echo ""
