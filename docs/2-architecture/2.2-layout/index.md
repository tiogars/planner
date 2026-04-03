# Directory Layout

```text
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
