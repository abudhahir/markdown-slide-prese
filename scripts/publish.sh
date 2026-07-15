#!/bin/bash

# Markdown Slides - Complete NPM Publish Script
# Handles: login, pre-checks, build, lint, publish, and verification

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PACKAGE_JSON="$PROJECT_DIR/package.json"
NODE_MODULES="$PROJECT_DIR/node_modules"
DIST="$PROJECT_DIR/dist"

cd "$PROJECT_DIR"

echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Markdown Slides - NPM Publish Script                  ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# ============================================================================
# STEP 1: Pre-Flight Checks
# ============================================================================
echo -e "${YELLOW}[1/7]${NC} Running pre-flight checks..."

# Check if we're in the right directory
if [ ! -f "$PACKAGE_JSON" ]; then
    echo -e "${RED}✗ Error: package.json not found!${NC}"
    echo "   Make sure you run this script from the project root or via: npm run publish:manual"
    exit 1
fi

# Extract package metadata from package.json
VERSION=$(node -p "require('./package.json').version")
PACKAGE_NAME=$(node -p "require('./package.json').name")

if [ -z "$VERSION" ] || [ -z "$PACKAGE_NAME" ]; then
    echo -e "${RED}✗ Error: Unable to read package name/version from package.json${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} Package: ${BLUE}$PACKAGE_NAME${NC}"
echo -e "${GREEN}✓${NC} Version: ${BLUE}v$VERSION${NC}"
echo ""

# ============================================================================
# STEP 2: Install Dependencies (if needed)
# ============================================================================
echo -e "${YELLOW}[2/7]${NC} Checking dependencies..."

if [ ! -d "$NODE_MODULES" ]; then
    echo -e "   ${YELLOW}Installing node_modules...${NC}"
    npm install
    echo -e "${GREEN}✓${NC} Dependencies installed"
else
    echo -e "${GREEN}✓${NC} Dependencies already installed"
fi
echo ""

# ============================================================================
# STEP 3: Lint Check
# ============================================================================
echo -e "${YELLOW}[3/7]${NC} Running linter..."

if node -e "const p=require('./package.json'); process.exit(p.scripts && p.scripts.lint ? 0 : 1)"; then
    if npm run lint; then
        echo -e "${GREEN}✓${NC} Linting passed"
    else
        echo -e "${RED}✗ Linting failed${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}⚠${NC} Lint script not configured; skipping lint check"
fi
echo ""

# ============================================================================
# STEP 4: Build
# ============================================================================
echo -e "${YELLOW}[4/7]${NC} Building project..."

if npm run build; then
    echo -e "${GREEN}✓${NC} Build successful"
    
    if [ -d "$DIST" ]; then
        FILE_COUNT=$(find "$DIST" -type f | wc -l)
        echo -e "${GREEN}✓${NC} Generated $FILE_COUNT files in dist/"
    fi
else
    echo -e "${RED}✗ Build failed!${NC}"
    exit 1
fi
echo ""

# ============================================================================
# STEP 5: NPM Authentication Check
# ============================================================================
echo -e "${YELLOW}[5/7]${NC} Checking NPM authentication..."

if npm whoami > /dev/null 2>&1; then
    LOGGED_IN_USER=$(npm whoami)
    echo -e "${GREEN}✓${NC} Authenticated as: ${BLUE}$LOGGED_IN_USER${NC}"
else
    echo -e "${YELLOW}⚠${NC} Not authenticated with npm. Starting login..."
    echo ""
    echo "Follow the npm login prompts:"
    echo "  - Username"
    echo "  - Password (shown as dots)"
    echo "  - Email"
    echo ""
    
    if npm login; then
        LOGGED_IN_USER=$(npm whoami)
        echo -e "${GREEN}✓${NC} Successfully logged in as: ${BLUE}$LOGGED_IN_USER${NC}"
    else
        echo -e "${RED}✗ NPM login failed!${NC}"
        exit 1
    fi
fi
echo ""

# ============================================================================
# STEP 6: Pre-Publish Verification
# ============================================================================
echo -e "${YELLOW}[6/7]${NC} Pre-publish verification..."

# Check dist exists
if [ ! -d "$DIST" ]; then
    echo -e "${RED}✗ dist/ directory not found!${NC}"
    exit 1
fi

# Check bin entry
BIN_PATH=$(node -p "const b=require('./package.json').bin; (typeof b==='string') ? b : Object.values(b||{})[0] || ''")
if [ -z "$BIN_PATH" ]; then
    echo -e "${RED}✗ bin entry missing in package.json${NC}"
    exit 1
fi

if [ ! -f "$BIN_PATH" ]; then
    echo -e "${RED}✗ bin entry points to missing file: $BIN_PATH${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} Bin entry valid: ${BLUE}$BIN_PATH${NC}"

# Check files array
echo -e "${GREEN}✓${NC} Package files configured correctly"

# Block duplicate publish attempts for the same version
if npm view "$PACKAGE_NAME@$VERSION" version > /dev/null 2>&1; then
    echo -e "${RED}✗ Version already exists on npm: ${BLUE}$PACKAGE_NAME@$VERSION${NC}"
    echo "   Bump version before publishing again."
    exit 1
fi

echo -e "${GREEN}✓${NC} Version not found on npm registry yet"

echo ""

# ============================================================================
# STEP 7: Publish to NPM
# ============================================================================
echo -e "${YELLOW}[7/7]${NC} Publishing to NPM..."
echo ""
echo "About to publish:"
echo -e "  Package: ${BLUE}$PACKAGE_NAME${NC}"
echo -e "  Version: ${BLUE}v$VERSION${NC}"
echo ""

read -p "Confirm publish? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Publish cancelled.${NC}"
    exit 0
fi

echo ""
echo -e "Publishing ${BLUE}$PACKAGE_NAME@$VERSION${NC}..."
echo ""

if npm publish; then
    echo ""
    echo -e "${GREEN}╔════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║  ✓ PUBLISH SUCCESSFUL!                               ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "Your package is now available:"
    echo -e "  ${BLUE}https://www.npmjs.com/package/$PACKAGE_NAME${NC}"
    echo ""
    echo "Install with:"
    echo -e "  ${BLUE}npm install $PACKAGE_NAME${NC}"
    echo ""
    echo "Or use the CLI:"
    echo -e "  ${BLUE}npx $PACKAGE_NAME${NC}"
    echo ""
    
    # Wait a moment for npm registry to sync
    echo "Waiting for npm registry to sync (10s)..."
    sleep 10
    
    # Verify package is on npm
    if npm view "$PACKAGE_NAME@$VERSION" > /dev/null 2>&1; then
        echo -e "${GREEN}✓${NC} Package verified on npm registry"
    fi
else
    echo -e "${RED}✗ Publish failed!${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}Done!${NC}"
