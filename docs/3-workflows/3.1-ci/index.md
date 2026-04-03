# Continuous Integration

**Triggers:** Push or pull request to `main`

**Steps:**

1. Checkout code
2. Set up Node.js 20 with npm cache
3. `npm ci` – install dependencies
4. `npm run lint` – ESLint check
5. `npm test` – Vitest unit tests
6. `npm run build` – Vite production build
7. Upload `dist/` as a build artifact (7-day retention)
