# Documentation Conventions

- Write and maintain documentation in English.
- Keep documentation concise, factual, and easy to scan.
- Treat `docs/` as the canonical documentation tree for MkDocs.

## Documentation Structure

- Organize documentation into numbered folders using a hierarchical numeric prefix followed by a short topic slug: `1-topic`, `1.1-topic`, `1.1.1-topic`, `1.1.1.1-topic`.
- Use clear, stable topic names in folder names so the structure is readable without opening each folder.
- Each documentation folder must contain an `index.md` file that defines the folder topic, summary, and links to its child sections.
- Use subfolders to represent subsections. A child folder number must extend its parent number.
- Keep sibling folders ordered numerically.

## Authoring Rules

- Keep the human-readable section title in `index.md`, and keep the folder slug short and descriptive.
- When creating or reorganizing documentation, preserve the hierarchy in both the file tree and the MkDocs navigation.
- Update `mkdocs.yml` whenever documentation pages or folders are added, removed, or moved.
- Prefer one topic per folder. Use `index.md` as the entry page for that topic.

## Expected Pattern

```text
docs/
  1-specification/
    index.md
    1.1-user-stories/
      index.md
      1.1.1-printing/
        index.md
  2-architecture/
    index.md
```