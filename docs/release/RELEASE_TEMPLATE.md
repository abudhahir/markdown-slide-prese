---
name: Release Template
about: Template for creating releases
title: 'Release v[VERSION]'
labels: 'release'
---

## 🎉 Release v[VERSION]

### 📝 What's New

#### ✨ Features
- Feature 1 description
- Feature 2 description
- Feature 3 description

#### 🐛 Bug Fixes
- Bug fix 1 description
- Bug fix 2 description

#### 📚 Documentation
- Documentation update 1
- Documentation update 2

#### 🔧 Other Changes
- Other change 1
- Other change 2

### 🚀 Highlights

[Brief description of the most important changes in this release]

### 💥 Breaking Changes

[List any breaking changes, or remove this section if none]

### 📦 Installation

#### Quick Start
```bash
# Clone the repository
git clone https://github.com/yourusername/markdown-slides.git
cd markdown-slides

# Checkout this version
git checkout v[VERSION]

# Install and run
npm install
npm run dev
```

#### Via npm
```bash
npm install markdown-slides@[VERSION]
```

#### Via Docker
```bash
docker pull ghcr.io/yourusername/markdown-slides:[VERSION]
docker run -p 8080:80 ghcr.io/yourusername/markdown-slides:[VERSION]
```

### 🌐 Live Demo

Try it online: [GitHub Pages Demo](https://yourusername.github.io/markdown-slides)

### 📖 Documentation

- [User Guide](https://github.com/yourusername/markdown-slides/blob/v[VERSION]/USER_GUIDE.md)
- [README](https://github.com/yourusername/markdown-slides/blob/v[VERSION]/README.md)
- [Architecture](https://github.com/yourusername/markdown-slides/blob/v[VERSION]/ARCHITECTURE.md)
- [Release Workflow](https://github.com/yourusername/markdown-slides/blob/v[VERSION]/RELEASE_WORKFLOW.md)

### 🔄 Upgrading

#### From v[PREVIOUS_VERSION]

```bash
# Update package
npm install markdown-slides@[VERSION]

# Or pull latest from git
git pull origin main
git checkout v[VERSION]
npm install
```

[Add any migration notes or steps required]

### 🐛 Known Issues

[List any known issues, or remove this section if none]

### 📊 Stats

- **Commits since last release:** [NUMBER]
- **Contributors:** [NUMBER]
- **Files changed:** [NUMBER]
- **Lines added:** [NUMBER]
- **Lines removed:** [NUMBER]

### 🙏 Contributors

Thanks to all contributors who made this release possible!

[List contributors or use @all-contributors]

### 📋 Full Changelog

See [CHANGELOG.md](https://github.com/yourusername/markdown-slides/blob/v[VERSION]/CHANGELOG.md) for complete details.

**Compare:** [v[PREVIOUS_VERSION]...v[VERSION]](https://github.com/yourusername/markdown-slides/compare/v[PREVIOUS_VERSION]...v[VERSION])

---

### 📥 Assets

Download the following assets:

- **Source Code** (zip | tar.gz) - Automatically attached
- **Build Artifacts** (tar.gz) - `markdown-slides-v[VERSION]-dist.tar.gz`
- **Docker Image** - `ghcr.io/yourusername/markdown-slides:[VERSION]`

---

### 🔗 Links

- [Homepage](https://yourusername.github.io/markdown-slides)
- [Documentation](https://github.com/yourusername/markdown-slides/tree/v[VERSION])
- [npm Package](https://www.npmjs.com/package/markdown-slides/v/[VERSION])
- [Docker Hub](https://github.com/yourusername/markdown-slides/pkgs/container/markdown-slides)
- [Issue Tracker](https://github.com/yourusername/markdown-slides/issues)

---

**Made with ❤️ for presenters everywhere**

Happy presenting! 🎉
