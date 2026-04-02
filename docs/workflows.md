# GitHub Actions Workflows

## ci.yml – Continuous Integration

**Triggers:** Push or pull request to `main`

**Steps:**

1. Checkout code
2. Set up Node.js 20 with npm cache
3. `npm ci` – install dependencies
4. `npm run lint` – ESLint check
5. `npm test` – Vitest unit tests
6. `npm run build` – Vite production build
7. Upload `dist/` as a build artifact (7-day retention)

## deploy.yml – Deploy to GitHub Pages

**Triggers:** Push to `main`, or manual dispatch

**Jobs:**

| Job | Description |
|-----|-------------|
| `build-app` | Builds the React webapp to `dist/` |
| `build-docs` | Builds MkDocs site to `site/docs/` |
| `deploy` | Merges both artifacts and deploys to GitHub Pages |

**GitHub Pages layout after deploy:**

```
/              ← React webapp (Vite base: /planner/)
/docs/         ← MkDocs documentation
```

### Prerequisites

In the repository **Settings → Pages**, set source to **GitHub Actions**.

## release.yml – Create a Release

**Triggers:** Push of a version tag matching `v*.*.*`

**Steps:**

1. Checkout and build
2. Zip `dist/` as `planner-<tag>.zip`
3. Create a GitHub Release with auto-generated release notes and the zip attached

**Usage:**

```bash
git tag v1.0.0
git push origin v1.0.0
```

## Docs Generation

MkDocs is invoked as part of `deploy.yml` using the `mkdocs-material` theme.
The command `mkdocs build --strict` treats warnings as errors.

To preview docs locally:

```bash
pip install mkdocs-material
mkdocs serve
```
