# Coding Standards & Bloat Analysis Report

**Project:** markdown-slides-presenter
**Date:** 2026-07-04
**Scope:** Full codebase review for coding standards, unnecessary files, and bloat

---

## Executive Summary

The project is fundamentally a ~500-line presentation app buried under a GitHub Spark boilerplate scaffold. A focused cleanup would reduce it from ~100 files to ~30 meaningful ones and from ~50 dependencies to ~15.

---

## 1. CRITICAL — Massive Unused Dependency Load

**File:** `package.json`

The `dependencies` block contains 50+ packages shipped to npm consumers. The following are **never imported anywhere in the codebase**:

| Package | Approx Size (minified) | Verdict |
|---|---|---|
| `d3` | ~500 KB | Zero imports |
| `three` | ~600 KB | Zero imports |
| `recharts` | ~300 KB | Zero imports |
| `@tanstack/react-query` | ~90 KB | Zero imports |
| `octokit` | ~120 KB | Zero imports |
| `@octokit/core` | ~50 KB | Zero imports |
| `react-day-picker` | ~60 KB | Zero imports |
| `react-hook-form` | ~25 KB | Zero imports |
| `@hookform/resolvers` | ~30 KB | Zero imports |
| `zod` | ~55 KB | Zero imports |
| `date-fns` | ~75 KB | Zero imports |
| `embla-carousel-react` | ~30 KB | Zero imports |
| `input-otp` | ~10 KB | Zero imports |
| `vaul` | ~20 KB | Zero imports |
| `react-resizable-panels` | ~25 KB | Zero imports |
| `next-themes` | ~15 KB | Zero imports |
| `uuid` | ~15 KB | Zero imports |
| `@radix-ui/colors` | Large CSS token set | Only used in `src/styles/theme.css` which targets non-existent `#spark-app` |
| `@heroicons/react` | ~5 KB | Zero imports |
| `@tailwindcss/container-queries` | Plugin | No `@container` queries in any CSS |
| `cmdk` | ~30 KB | Zero imports |

Additionally, `lucide-react` is used only in `src/ErrorFallback.tsx` for 2 icons while the rest of the app uses `@phosphor-icons/react`.

**Impact:** Every `npx markdown-slides-presenter` user downloads hundreds of MBs of unused packages.

**Recommendation:** Remove all unused packages from `dependencies`. This alone will reduce install size by 80%+.

---

## 2. HIGH — 37+ Unused shadcn/ui Component Files

**Directory:** `src/components/ui/` (47 component files total)

### Components Actually Used (~10):
`button`, `badge`, `card`, `dialog`, `dropdown-menu`, `input`, `label`, `progress`, `scroll-area`, `tabs`

### Components Never Imported (delete these):
`accordion`, `alert`, `alert-dialog`, `aspect-ratio`, `avatar`, `breadcrumb`, `calendar`, `carousel`, `chart`, `checkbox`, `collapsible`, `command`, `context-menu`, `drawer`, `form`, `hover-card`, `input-otp`, `menubar`, `navigation-menu`, `pagination`, `popover`, `radio-group`, `resizable`, `select`, `sheet`, `sidebar`, `skeleton`, `slider`, `sonner`, `switch`, `table`, `textarea`, `toggle`, `toggle-group`, `tooltip`

Each unused component pulls in its own Radix UI primitive package listed in `dependencies`.

**Recommendation:** Delete unused UI component files and remove corresponding Radix UI packages from `dependencies`.

---

## 3. HIGH — Duplicate Icon Library

**File:** `src/ErrorFallback.tsx`

```typescript
import { AlertTriangleIcon, RefreshCwIcon } from "lucide-react";
```

This is the **only** usage of `lucide-react` in the entire project. Every other component uses `@phosphor-icons/react`.

**Recommendation:** Replace with Phosphor equivalents (`Warning`, `ArrowClockwise`), then remove `lucide-react` from dependencies.

---

## 4. HIGH — CSS Triple-Import Conflict

**Files:** `src/main.tsx`, `src/main.css`, `src/index.css`, `src/styles/theme.css`

### Problems:
1. `main.css` already imports `theme.css` and `index.css`, but `main.tsx` imports all three again separately (double-loading)
2. Both `main.css` and `index.css` define competing `:root` CSS custom properties for `--background`, `--foreground`, `--primary`, etc.
3. `src/styles/theme.css` imports 60+ `@radix-ui/colors` CSS files and targets `#spark-app` — but the app root is `#root`, so these styles never apply

**Recommendation:**
1. Remove duplicate imports from `main.tsx`
2. Delete `src/styles/theme.css` entirely (targets non-existent DOM element)
3. Consolidate `:root` definitions into a single CSS file

---

## 5. HIGH — `@github/spark` `useKV` Coupling

**Files:** `src/components/slides/ThemeSelector.tsx`, `src/components/slides/KeyboardHintsOverlay.tsx`, `src/main.tsx`

The project uses `@github/spark`'s `useKV` hook for persisting two values:
- Selected theme name
- Whether keyboard hints have been dismissed

When the package runs outside GitHub Spark (i.e., every real npm use case), the KV service URL is undefined and calls will fail silently.

**Recommendation:** Replace `useKV` with a simple localStorage wrapper (~10 lines of code). Remove `@github/spark` dependency and its import in `main.tsx`.

---

## 6. HIGH — Console Methods Monkey-Patched in Production

**File:** `src/main.tsx` (lines 17-39)

The entry point globally overrides `console.error` and `console.warn` to suppress ResizeObserver messages, and wraps `window.ResizeObserver`. This hides legitimate errors in production.

**Recommendation:** After removing unused Radix components, test if ResizeObserver errors still occur. If not, delete this entire block. If they persist, scope suppression to development only.

---

## 7. MEDIUM — Hand-Rolled OKLCH-to-RGB Converter with Suspected Bug

**File:** `src/components/slides/PDFExportDialog.tsx` (lines 48-85)

A manual OKLCH-to-RGB color conversion is implemented inline. The cube operation is applied at the wrong pipeline stage (after matrix multiplication instead of before), producing incorrect colors for saturated hues.

Additionally:
- `marked.parse` is called again inside the PDF export loop, duplicating work from `MarkdownRenderer`
- `DOMPurify` import is duplicated between `MarkdownRenderer.tsx` and `PDFExportDialog.tsx`

**Recommendation:**
1. Extract to `src/lib/color-utils.ts` with unit tests
2. Fix the matrix coefficient order per OKLab spec
3. Extract shared markdown-to-HTML utility used by both components

---

## 8. MEDIUM — Redundant Fields in markdown-parser.ts

**File:** `src/lib/markdown-parser.ts`

```typescript
// content and rawContent are always identical
.map((content, index) => ({
  id: `slide-${index}-${hashContent(content)}`,
  content: content,
  rawContent: content   // always identical
}))

// Unreachable guard — .filter() already removes empty strings
return slides.length > 0 ? slides : []
```

**Recommendation:** Remove `rawContent` from the `Slide` interface (or document divergent intent). Remove unreachable ternary.

---

## 9. MEDIUM — 10 Root-Level Migration Artifact Files

| File | Issue |
|---|---|
| `COMPLETED_MIGRATION_SETUP.md` | Migration done — artifact |
| `DOCS_QUICK_REFERENCE.md` | Superseded by `docs/` |
| `DOCUMENTATION_MIGRATION.md` | Migration artifact |
| `MIGRATE_DOCS.md` | Migration artifact |
| `MIGRATION_READY.md` | Migration artifact |
| `MIGRATION_SUMMARY.md` | Migration artifact |
| `QUICKSTART_CLI.md` | Duplicated in `docs/getting-started/` |
| `REPOSITORY_RENAME_GUIDE.md` | One-time operational note |
| `RUN_MIGRATION.md` | Migration artifact |
| `TESTING_AND_LOCAL_DEPLOYMENT.md` | Duplicated in `docs/getting-started/` |

**Recommendation:** Delete all 10 files. Content already exists in `docs/` where applicable.

---

## 10. MEDIUM — Empty `workspaces` Field

**File:** `package.json`

```json
"workspaces": {
  "packages": [
    "packages/*"
  ]
}
```

No `packages/` directory exists. This is unused scaffolding.

**Recommendation:** Remove the `workspaces` field.

---

## 11. LOW — ESLint Config Has Empty Rules

**File:** `eslint.config.js`

`eslint-plugin-react-hooks` is installed as a devDependency but not configured in the ESLint config. The `rules` object is empty. This means `useEffect` dependency array violations are not caught.

**Recommendation:** Add react-hooks plugin to ESLint config:
```js
import reactHooks from 'eslint-plugin-react-hooks'
plugins: { 'react-hooks': reactHooks },
rules: { ...reactHooks.configs.recommended.rules },
```

---

## 12. LOW — Dead Code: KeyboardHintsOverlay

**File:** `src/components/slides/KeyboardHintsOverlay.tsx`

This component exists, uses `useKV` for persistence, but is never imported or rendered anywhere in the application tree.

**Recommendation:** Either integrate into `SlidePresentation.tsx` or delete.

---

## Files Recommended for Deletion

### Migration Artifacts (root level)
- `COMPLETED_MIGRATION_SETUP.md`
- `DOCS_QUICK_REFERENCE.md`
- `DOCUMENTATION_MIGRATION.md`
- `MIGRATE_DOCS.md`
- `MIGRATION_READY.md`
- `MIGRATION_SUMMARY.md`
- `QUICKSTART_CLI.md`
- `REPOSITORY_RENAME_GUIDE.md`
- `RUN_MIGRATION.md`
- `TESTING_AND_LOCAL_DEPLOYMENT.md`

### Unused UI Components (`src/components/ui/`)
- `accordion.tsx`
- `alert.tsx`
- `alert-dialog.tsx`
- `aspect-ratio.tsx`
- `avatar.tsx`
- `breadcrumb.tsx`
- `calendar.tsx`
- `carousel.tsx`
- `chart.tsx`
- `checkbox.tsx`
- `collapsible.tsx`
- `command.tsx`
- `context-menu.tsx`
- `drawer.tsx`
- `form.tsx`
- `hover-card.tsx`
- `input-otp.tsx`
- `menubar.tsx`
- `navigation-menu.tsx`
- `pagination.tsx`
- `popover.tsx`
- `radio-group.tsx`
- `resizable.tsx`
- `select.tsx`
- `sheet.tsx`
- `sidebar.tsx`
- `skeleton.tsx`
- `slider.tsx`
- `sonner.tsx`
- `switch.tsx`
- `table.tsx`
- `textarea.tsx`
- `toggle.tsx`
- `toggle-group.tsx`
- `tooltip.tsx`

### Dead Code
- `src/components/slides/KeyboardHintsOverlay.tsx`
- `src/styles/theme.css`

### Build Artifact (should be gitignored)
- `markdown-slides-presenter-1.0.0.tgz`

---

## Recommended Action Plan

| Priority | Action | Impact |
|---|---|---|
| P0 | Remove ~40 unused packages from `dependencies` | Reduces install size by 80%+ |
| P0 | Delete 37 unused shadcn/ui component files + their Radix deps | Removes maintenance burden, reduces deps |
| P1 | Replace `@github/spark` `useKV` with localStorage wrapper | Makes npm package work standalone |
| P1 | Consolidate CSS to single entry, delete `theme.css` | Fixes styling conflicts |
| P1 | Replace lucide icons with Phosphor in ErrorFallback | Removes duplicate icon library |
| P2 | Remove console monkey-patch after Radix cleanup | Stops hiding real errors |
| P2 | Delete 10 root migration markdown files | Declutters repository |
| P2 | Configure ESLint rules properly | Catches hook dependency bugs |
| P3 | Extract and fix OKLCH converter | Corrects PDF export colors |
| P3 | Clean up `markdown-parser.ts` redundancies | Improves code clarity |

---

## Severity Summary

| Severity | Count |
|----------|-------|
| CRITICAL | 1 |
| HIGH | 5 |
| MEDIUM | 4 |
| LOW | 2 |
| **Total** | **12** |

---

*Report generated as part of coding standards review.*
