# Architecture

## Technology Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Language | TypeScript | Static typing, better IDE support |
| Framework | React 19 | Component model, large ecosystem |
| Build tool | Vite | Fast HMR, optimised production builds |
| UI library | Material UI (MUI) v7 | Accessible, themeable component library |
| Form management | react-hook-form v7 | Minimal re-renders, schema-friendly validation |
| Routing | React Router v7 | Client-side navigation |
| Testing | Vitest + Testing Library | Vite-native, Jest-compatible test runner |
| Docs | Material for MkDocs | Static site generator with search |

## Directory Layout

```
planner/
├── src/
│   ├── __tests__/         # Unit / component tests
│   ├── components/        # Shared UI components
│   │   ├── ActivityForm.tsx
│   │   └── Layout.tsx
│   ├── context/
│   │   └── PlannerContext.tsx   # App state (settings + activities)
│   ├── pages/
│   │   ├── SetupPage.tsx
│   │   ├── ActivitiesPage.tsx
│   │   └── PrintPage.tsx
│   ├── types.ts           # Shared TypeScript interfaces
│   ├── App.tsx            # Router root
│   ├── main.tsx           # Entry point + MUI theme
│   └── setupTests.ts      # Vitest global setup
├── docs/                  # MkDocs source
├── public/
├── .github/workflows/     # CI/CD pipelines
├── mkdocs.yml
├── vite.config.ts
└── package.json
```

## State Management

Application state is kept in `PlannerContext` using React's built-in `useState`/`useContext`. The context exposes:

- `settings` / `updateSettings` – planner configuration
- `activities` / `addActivity` / `updateActivity` / `removeActivity` – activity CRUD

State is in-memory only (v1). Persistence via `localStorage` is planned for v2.

## Routing

| Path | Component |
|------|-----------|
| `/planner/` | `SetupPage` |
| `/planner/activities` | `ActivitiesPage` |
| `/planner/print` | `PrintPage` |

## GitHub Pages Deployment

The webapp is built to `/planner/` (Vite `base` option) and deployed alongside the MkDocs site:

```
gh-pages/
├── index.html          ← webapp
├── assets/
└── docs/               ← MkDocs site
```
