# Deploy to GitHub Pages

**Triggers:** Push to `main`, or manual dispatch

## Jobs

| Job | Description |
| --- | --- |
| `build-app` | Builds the React webapp to `dist/` |
| `build-docs` | Builds MkDocs site to `site/docs/` |
| `deploy` | Merges both artifacts and deploys to GitHub Pages |

## GitHub Pages Layout After Deploy

```text
/              ← React webapp (Vite base: /planner/)
/docs/         ← MkDocs documentation
```

## Prerequisites

In the repository **Settings → Pages**, set source to **GitHub Actions**.
