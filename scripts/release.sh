#!/bin/bash

# Release Helper Script
# This script helps create releases quickly and safely

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_header() {
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}  $1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

# Check if we're in a git repository
check_git_repo() {
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        print_error "Not a git repository"
        exit 1
    fi
}

# Check if working directory is clean
check_clean_working_dir() {
    if [[ -n $(git status -s) ]]; then
        print_error "Working directory is not clean. Commit or stash changes first."
        git status -s
        exit 1
    fi
}

# Get current version
get_current_version() {
    node -p "require('./package.json').version"
}

# Get current branch
get_current_branch() {
    git rev-parse --abbrev-ref HEAD
}

# Run tests
run_tests() {
    print_info "Running tests..."
    npm run lint || {
        print_error "Lint failed"
        exit 1
    }
    print_success "Lint passed"
    
    npm run build || {
        print_error "Build failed"
        exit 1
    }
    print_success "Build passed"
}

# Show current status
show_status() {
    print_header "Current Status"
    echo "Branch: $(get_current_branch)"
    echo "Version: $(get_current_version)"
    echo "Last commit: $(git log -1 --pretty=format:'%h - %s (%cr)')"
    echo ""
}

# Create release
create_release() {
    local bump_type=$1
    
    print_header "Creating $bump_type Release"
    
    # Pre-flight checks
    check_git_repo
    check_clean_working_dir
    
    # Ensure we're on main
    local current_branch=$(get_current_branch)
    if [[ "$current_branch" != "main" ]]; then
        print_warning "Not on main branch (currently on $current_branch)"
        read -p "Continue anyway? (y/N) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
    
    # Run tests
    run_tests
    
    # Get versions
    local old_version=$(get_current_version)
    
    # Bump version
    print_info "Bumping version ($bump_type)..."
    npm version $bump_type --no-git-tag-version
    local new_version=$(get_current_version)
    
    print_success "Version bumped: $old_version → $new_version"
    
    # Confirm
    echo ""
    print_warning "About to create release v$new_version"
    read -p "Continue? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        # Revert version bump
        git checkout package.json package-lock.json
        print_info "Release cancelled"
        exit 0
    fi
    
    # Commit and tag
    git add package.json package-lock.json
    git commit -m "chore: bump version to $new_version"
    git tag -a "v$new_version" -m "Release v$new_version"
    
    print_success "Created commit and tag v$new_version"
    
    # Push
    print_info "Pushing to remote..."
    git push origin main
    git push origin "v$new_version"
    
    print_success "Release v$new_version created!"
    print_info "GitHub Actions will now build and publish the release"
    print_info "Check progress at: https://github.com/$(git remote get-url origin | sed 's/.*://;s/.git$//')/actions"
}

# Create pre-release
create_prerelease() {
    local prerelease_type=$1
    
    print_header "Creating Pre-release"
    
    # Pre-flight checks
    check_git_repo
    check_clean_working_dir
    run_tests
    
    # Get current version and create pre-release version
    local current_version=$(get_current_version)
    read -p "Pre-release version (e.g., 1.0.0-beta.1): " version
    
    if [[ ! $version =~ ^[0-9]+\.[0-9]+\.[0-9]+-(alpha|beta|rc)\.[0-9]+$ ]]; then
        print_error "Invalid pre-release version format"
        print_info "Expected format: X.Y.Z-(alpha|beta|rc).N"
        exit 1
    fi
    
    # Update package.json
    npm version $version --no-git-tag-version --allow-same-version
    
    # Commit and tag
    git add package.json package-lock.json
    git commit -m "chore: bump version to $version"
    git tag -a "v$version" -m "Pre-release v$version"
    
    # Push
    git push origin main
    git push origin "v$version"
    
    print_success "Pre-release v$version created!"
}

# Show help
show_help() {
    cat << EOF
Release Helper Script

Usage: $0 [command]

Commands:
    patch       Create a patch release (bug fixes)
    minor       Create a minor release (new features)
    major       Create a major release (breaking changes)
    pre         Create a pre-release (alpha/beta/rc)
    status      Show current status
    help        Show this help message

Examples:
    $0 patch    # 1.0.0 → 1.0.1
    $0 minor    # 1.0.1 → 1.1.0
    $0 major    # 1.1.0 → 2.0.0
    $0 pre      # 1.1.0 → 1.1.1-beta.1

Notes:
    - Working directory must be clean
    - All tests must pass
    - Main branch is recommended
    - Tag push triggers automated release workflow

EOF
}

# Main script
main() {
    case "${1:-help}" in
        patch)
            create_release "patch"
            ;;
        minor)
            create_release "minor"
            ;;
        major)
            create_release "major"
            ;;
        pre|prerelease)
            create_prerelease
            ;;
        status)
            show_status
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            print_error "Unknown command: $1"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

# Run main
main "$@"
