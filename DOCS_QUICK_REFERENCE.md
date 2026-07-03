# Documentation Quick Reference

## 📁 New Documentation Structure

All documentation is now organized in the `docs/` directory:

```
docs/
├── README.md                           # 📖 Start here - Complete documentation index
├── getting-started/                    # 🚀 Tutorials & Quick Starts
│   ├── TESTING_AND_LOCAL_DEPLOYMENT.md # ⭐ Testing & npm publishing guide
│   ├── QUICKSTART_CLI.md              # 60-second CLI quick start
│   ├── CLI_USAGE_GUIDE.md             # Complete CLI reference
│   ├── USER_GUIDE.md                  # User documentation
│   └── QUICKSTART_LOCAL_AND_NPM.md    # Local dev quick start
├── deployment/                         # 🌐 Deployment Guides
│   ├── GITHUB_PAGES_DEPLOYMENT.md     # GitHub Pages setup
│   ├── GITHUB_PAGES_QUICKSTART.md     # Quick GitHub Pages guide
│   ├── GITLAB_PAGES_DEPLOYMENT.md     # GitLab Pages setup
│   ├── DEPLOYMENT_CHECKLIST.md        # Pre-deployment checklist
│   └── DEPLOYMENT_COMPARISON.md       # Compare platforms
├── development/                        # 💻 Technical Documentation
│   ├── ARCHITECTURE.md                # System architecture
│   ├── PRD.md                         # Product requirements
│   └── VSCODE_EXTENSION_GUIDE.md      # VS Code extension guide
├── release/                            # 📦 Release & Publishing
│   ├── RELEASE_WORKFLOW.md            # Release automation guide
│   ├── QUICKSTART_RELEASE.md          # 5-minute release guide
│   ├── VERSION_BUMP_QUICKREF.md       # ⭐ Version bump reference
│   ├── PRERELEASE_GUIDE.md            # Alpha/beta/RC guide
│   ├── AUTOMATED_NPM_PUBLISHING.md    # npm automation
│   ├── NPM_PUBLISHING_GUIDE.md        # npm publishing guide
│   ├── RELEASE_IMPLEMENTATION.md      # Implementation details
│   ├── WORKFLOW_ARCHITECTURE.md       # Workflow diagrams
│   └── ...more release docs
└── reference/                          # 📚 Reference Materials
    ├── SCRIPTS_README.md              # Helper scripts
    ├── DOCUMENTATION_INDEX.md         # Legacy index
    └── ...more reference docs
```

## 🚀 Quick Links

### I want to...

**Get started quickly**
→ [Quick Start - CLI](./docs/getting-started/QUICKSTART_CLI.md)

**Test before publishing**
→ [Testing & Local Deployment](./docs/getting-started/TESTING_AND_LOCAL_DEPLOYMENT.md)

**Deploy my app**
→ [GitHub Pages](./docs/deployment/GITHUB_PAGES_DEPLOYMENT.md) | [GitLab Pages](./docs/deployment/GITLAB_PAGES_DEPLOYMENT.md)

**Create a release**
→ [Quick Start Release](./docs/release/QUICKSTART_RELEASE.md) | [Version Bump Guide](./docs/release/VERSION_BUMP_QUICKREF.md)

**Publish to npm**
→ [Automated npm Publishing](./docs/release/AUTOMATED_NPM_PUBLISHING.md)

**Understand the code**
→ [Architecture](./docs/development/ARCHITECTURE.md)

**Use the CLI**
→ [CLI Usage Guide](./docs/getting-started/CLI_USAGE_GUIDE.md)

**Browse all docs**
→ [Documentation Index](./docs/README.md)

## 🔧 Migration Status

### ✅ Complete
- [x] docs/ directory structure created
- [x] Documentation index created
- [x] Initial files migrated (2 files)
- [x] README.md links updated
- [x] Migration script created
- [x] Migration guides created

### ⏳ To Do
- [ ] Run migration script: `chmod +x migrate-docs.sh && ./migrate-docs.sh`
- [ ] Verify all files moved correctly
- [ ] Test documentation links
- [ ] Commit changes

## 📝 Migration Commands

```bash
# Run automated migration
chmod +x migrate-docs.sh && ./migrate-docs.sh

# Verify migration
ls -R docs/

# Commit changes
git add docs/ README.md *.md
git commit -m "docs: organize documentation into docs/ subdirectory"
```

## 📚 Files That Stay in Root

These remain in the project root:
- ✅ `README.md` - Main documentation (links updated)
- ✅ `CHANGELOG.md` - Version history
- ✅ `LICENSE` - MIT License
- ✅ `SECURITY.md` - Security policy
- ✅ `package.json`, `tsconfig.json`, etc. - Configuration files

## 🔗 Updated Links

All documentation links in `README.md` have been updated:

| Old Path | New Path |
|----------|----------|
| `./TESTING_AND_LOCAL_DEPLOYMENT.md` | `./docs/getting-started/TESTING_AND_LOCAL_DEPLOYMENT.md` |
| `./QUICKSTART_CLI.md` | `./docs/getting-started/QUICKSTART_CLI.md` |
| `./CLI_USAGE_GUIDE.md` | `./docs/getting-started/CLI_USAGE_GUIDE.md` |
| `./RELEASE_WORKFLOW.md` | `./docs/release/RELEASE_WORKFLOW.md` |
| `./GITHUB_PAGES_DEPLOYMENT.md` | `./docs/deployment/GITHUB_PAGES_DEPLOYMENT.md` |
| `./ARCHITECTURE.md` | `./docs/development/ARCHITECTURE.md` |
| ...and more |

## ℹ️ More Information

- **Complete migration guide**: [MIGRATE_DOCS.md](./MIGRATE_DOCS.md)
- **File mapping**: [DOCUMENTATION_MIGRATION.md](./DOCUMENTATION_MIGRATION.md)
- **Migration summary**: [MIGRATION_SUMMARY.md](./MIGRATION_SUMMARY.md)
- **Run migration**: [RUN_MIGRATION.md](./RUN_MIGRATION.md)
- **Documentation index**: [docs/README.md](./docs/README.md)

---

**Next Step**: Run `chmod +x migrate-docs.sh && ./migrate-docs.sh` to complete the migration! ✨
