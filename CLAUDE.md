# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Markdown Slides Presenter is a full-screen presentation tool that transforms markdown files into slide presentations. Published to npm as `markdown-slides-presenter` (`npx markdown-slides-presenter`). Built with React 19, TypeScript, Vite 7, and Tailwind CSS v4.

## Commands

```bash
# Development
npm run dev          # Start Vite dev server (port 5173)
npm run build        # TypeScript check (--noCheck) + Vite production build
npm run preview      # Preview production build via Vite
npm run lint         # ESLint
npm run start        # Serve built dist/ via CLI (port 3000)

# Testing
npx vitest run                    # Run all unit tests
npx vitest run src/lib/__tests__/markdown-parser.test.ts  # Run a single test file
npx vitest --coverage             # Run tests with coverage report
npx playwright test               # Run e2e tests (builds + starts preview server on port 4173)
npx playwright test --headed      # Run e2e tests with visible browser

# Release
npm run publish      # Run scripts/publish.sh
npm run kill         # Kill process on port 5000
```

## Architecture

### Entry Points
- **Web app**: `src/main.tsx` -> `src/App.tsx` -> `SlidePresentation` component
- **CLI**: `bin/markdown-slides.js` - Standalone Node.js HTTP server (raw `http.createServer`, no Express) that serves the built `dist/` folder. Supports `--port` and `--version` flags.

### Core Flow
Markdown content is split into slides by `---` delimiter in `src/lib/markdown-parser.ts`. The `SlidePresentation` component (`src/components/slides/SlidePresentation.tsx`) manages all presentation state: current slide index, keyboard/touch navigation, and overlay dialogs (theme selector, file selector, slides list, PDF export, commands list).

### Key Directories
- `src/components/slides/` - All presentation-specific components
- `src/components/ui/` - shadcn/ui component library (do not manually edit these)
- `src/lib/themes.ts` - Theme definitions (6 themes x light/dark variants). Themes applied via CSS custom properties on `document.documentElement`
- `src/lib/markdown-parser.ts` - Splits markdown by `---` into Slide objects
- `src/lib/__tests__/` - Unit tests (vitest, jsdom environment)
- `e2e/` - Playwright e2e tests (run against preview server on port 4173)
- `examples/` - Sample markdown presentations
- `docs/` - Documentation organized by category: `getting-started/`, `release/`, `deployment/`, `development/`, `reference/`

### Technology Stack
- **Build**: Vite 7 with `@vitejs/plugin-react-swc`, `@tailwindcss/vite`
- **Styling**: Tailwind CSS v4 with CSS custom properties for theming
- **UI**: shadcn/ui (Radix primitives), Framer Motion for transitions
- **Markdown**: `marked` library for rendering
- **PDF Export**: html2canvas + jspdf
- **Icons**: Phosphor Icons (`@phosphor-icons/react`)
- **Testing**: Vitest (unit, jsdom, v8 coverage with 80% line threshold) + Playwright (e2e, chromium)
- **GitHub Spark**: Uses `@github/spark` Vite plugins (sparkPlugin, createIconImportProxy) - do not remove these

### Path Alias
`@/*` maps to `src/*` (configured in both `tsconfig.json` and `vite.config.ts`).

### Vite Config Notes
- `base` is configurable via `VITE_BASE_PATH` env var (used for GitHub Pages deployment)
- `PROJECT_ROOT` env var overrides the project root for path resolution
- `tsc -b --noCheck` is used in the build script — type errors won't block builds

### npm Package
- `files` field limits published content to `bin/`, `dist/`, `README.md`, `LICENSE`
- `prepublishOnly` runs the build automatically before publish
- Binary entry: `markdown-slides` -> `./bin/markdown-slides.js`

## Release Process
Releases are automated via GitHub Actions. Push a semver tag (e.g., `v1.0.0`) to trigger:
- GitHub Release with changelog
- npm publish (requires `NPM_TOKEN` secret)
- GitHub Pages deployment (stable releases only)
- Docker image to GHCR

Pre-release tags (`v1.0.0-beta.1`, `-alpha.1`, `-rc.1`) publish to corresponding npm dist-tags.
