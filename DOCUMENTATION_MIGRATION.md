# Documentation Migration Notice

## 📁 Documentation Has Moved!

All documentation files have been reorganized into the `docs/` directory for better organization and discoverability.

## New Structure

```
docs/
├── README.md                    # Documentation index
├── getting-started/            # Quick start and tutorials
│   ├── TESTING_AND_LOCAL_DEPLOYMENT.md
│   ├── QUICKSTART_CLI.md
│   ├── CLI_USAGE_GUIDE.md
│   ├── USER_GUIDE.md
│   └── QUICKSTART_LOCAL_AND_NPM.md
├── deployment/                 # Deployment guides
│   ├── GITHUB_PAGES_DEPLOYMENT.md
│   ├── GITHUB_PAGES_QUICKSTART.md
│   ├── GITLAB_PAGES_DEPLOYMENT.md
│   ├── DEPLOYMENT_CHECKLIST.md
│   └── DEPLOYMENT_COMPARISON.md
├── release/                    # Release and publishing
│   ├── RELEASE_WORKFLOW.md
│   ├── RELEASE_IMPLEMENTATION.md
│   ├── WORKFLOW_ARCHITECTURE.md
│   ├── RELEASE_GUIDE.md
│   ├── RELEASE_TEMPLATE.md
│   ├── QUICKSTART_RELEASE.md
│   ├── QUICKSTART_AUTOMATED_RELEASE.md
│   ├── VERSION_BUMP_QUICKREF.md
│   ├── PRERELEASE_GUIDE.md
│   ├── PRERELEASE_QUICKREF.md
│   ├── PRERELEASE_SUMMARY.md
│   ├── AUTOMATED_NPM_PUBLISHING.md
│   ├── NPM_PUBLISHING_GUIDE.md
│   └── NPM_PUBLISHING_FLOW.md
├── development/                # Technical documentation
│   ├── ARCHITECTURE.md
│   ├── PRD.md
│   └── VSCODE_EXTENSION_GUIDE.md
└── reference/                  # Reference materials
    ├── SCRIPTS_README.md
    ├── DOCUMENTATION_INDEX.md
    ├── POST_SETUP.md
    ├── IMPLEMENTATION_COMPLETE.md
    └── YOUR_ACTION_ITEMS.md
```

## Files Remaining in Root

These important files remain in the project root:
- `README.md` - Main project documentation
- `CHANGELOG.md` - Version history
- `LICENSE` - Project license
- `SECURITY.md` - Security policy

## Migration Mapping

### Getting Started Docs
| Old Location | New Location |
|--------------|--------------|
| `TESTING_AND_LOCAL_DEPLOYMENT.md` | `docs/getting-started/TESTING_AND_LOCAL_DEPLOYMENT.md` |
| `QUICKSTART_CLI.md` | `docs/getting-started/QUICKSTART_CLI.md` |
| `CLI_USAGE_GUIDE.md` | `docs/getting-started/CLI_USAGE_GUIDE.md` |
| `USER_GUIDE.md` | `docs/getting-started/USER_GUIDE.md` |
| `QUICKSTART_LOCAL_AND_NPM.md` | `docs/getting-started/QUICKSTART_LOCAL_AND_NPM.md` |

### Deployment Docs
| Old Location | New Location |
|--------------|--------------|
| `GITHUB_PAGES_DEPLOYMENT.md` | `docs/deployment/GITHUB_PAGES_DEPLOYMENT.md` |
| `GITHUB_PAGES_QUICKSTART.md` | `docs/deployment/GITHUB_PAGES_QUICKSTART.md` |
| `GITLAB_PAGES_DEPLOYMENT.md` | `docs/deployment/GITLAB_PAGES_DEPLOYMENT.md` |
| `DEPLOYMENT_CHECKLIST.md` | `docs/deployment/DEPLOYMENT_CHECKLIST.md` |
| `DEPLOYMENT_COMPARISON.md` | `docs/deployment/DEPLOYMENT_COMPARISON.md` |

### Release Docs
| Old Location | New Location |
|--------------|--------------|
| `RELEASE_WORKFLOW.md` | `docs/release/RELEASE_WORKFLOW.md` |
| `RELEASE_IMPLEMENTATION.md` | `docs/release/RELEASE_IMPLEMENTATION.md` |
| `WORKFLOW_ARCHITECTURE.md` | `docs/release/WORKFLOW_ARCHITECTURE.md` |
| `.github/RELEASE_GUIDE.md` | `docs/release/RELEASE_GUIDE.md` |
| `.github/RELEASE_TEMPLATE.md` | `docs/release/RELEASE_TEMPLATE.md` |
| `QUICKSTART_RELEASE.md` | `docs/release/QUICKSTART_RELEASE.md` |
| `QUICKSTART_AUTOMATED_RELEASE.md` | `docs/release/QUICKSTART_AUTOMATED_RELEASE.md` |
| `VERSION_BUMP_QUICKREF.md` | `docs/release/VERSION_BUMP_QUICKREF.md` |
| `PRERELEASE_GUIDE.md` | `docs/release/PRERELEASE_GUIDE.md` |
| `PRERELEASE_QUICKREF.md` | `docs/release/PRERELEASE_QUICKREF.md` |
| `PRERELEASE_SUMMARY.md` | `docs/release/PRERELEASE_SUMMARY.md` |
| `AUTOMATED_NPM_PUBLISHING.md` | `docs/release/AUTOMATED_NPM_PUBLISHING.md` |
| `NPM_PUBLISHING_GUIDE.md` | `docs/release/NPM_PUBLISHING_GUIDE.md` |
| `NPM_PUBLISHING_FLOW.md` | `docs/release/NPM_PUBLISHING_FLOW.md` |

### Development Docs
| Old Location | New Location |
|--------------|--------------|
| `ARCHITECTURE.md` | `docs/development/ARCHITECTURE.md` |
| `PRD.md` | `docs/development/PRD.md` |
| `VSCODE_EXTENSION_GUIDE.md` | `docs/development/VSCODE_EXTENSION_GUIDE.md` |

### Reference Docs
| Old Location | New Location |
|--------------|--------------|
| `scripts/README.md` | `docs/reference/SCRIPTS_README.md` |
| `DOCUMENTATION_INDEX.md` | `docs/reference/DOCUMENTATION_INDEX.md` |
| `POST_SETUP.md` | `docs/reference/POST_SETUP.md` |
| `IMPLEMENTATION_COMPLETE.md` | `docs/reference/IMPLEMENTATION_COMPLETE.md` |
| `YOUR_ACTION_ITEMS.md` | `docs/reference/YOUR_ACTION_ITEMS.md` |

## Benefits of New Structure

### ✅ Better Organization
- Documentation is logically grouped by purpose
- Easier to find relevant docs
- Clear separation between user and developer docs

### ✅ Improved Discoverability
- Single entry point at `docs/README.md`
- Clear navigation paths
- Reduced clutter in root directory

### ✅ Scalability
- Easy to add new documentation
- Maintainable structure as project grows
- Clear conventions for future contributors

## How to Update Your Bookmarks

If you had bookmarked any documentation:

1. **Check the mapping table** above for the new location
2. **Update your bookmarks** to the new path
3. **Use the docs index** at `docs/README.md` for quick navigation

## For Contributors

When adding new documentation:

1. **Place in appropriate subdirectory**:
   - User guides → `docs/getting-started/`
   - Deployment → `docs/deployment/`
   - Release process → `docs/release/`
   - Technical → `docs/development/`
   - Reference → `docs/reference/`

2. **Update the index** at `docs/README.md`

3. **Update README.md** if it's a key document

4. **Link to related docs** using relative paths

## Questions?

- See [docs/README.md](./docs/README.md) for the complete documentation index
- Open an issue if you can't find a document
- Check the main [README.md](./README.md) for common documentation links

---

**Migration Date**: [Current Date]  
**All links in README.md have been updated** to point to the new locations.
