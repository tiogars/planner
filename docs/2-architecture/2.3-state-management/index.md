# State Management

Application state is kept in `PlannerContext` using React's built-in `useState`/`useContext`. The context exposes:

- `settings` / `updateSettings` – planner configuration
- `activities` / `addActivity` / `updateActivity` / `removeActivity` – activity CRUD

State is in-memory only (v1). Persistence via `localStorage` is planned for v2.
