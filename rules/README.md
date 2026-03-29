# Rules

Rules are modular instruction files loaded automatically based on scope. They extend `CLAUDE.md` without bloating it.

- `alwaysApply: true` — loaded every session, regardless of what files are open
- `paths: [...]` — loaded only when working with files matching the glob patterns

## Available Rules

### code-quality.md
**Scope**: Always

Principles (single-responsibility, no premature abstraction), Z.ai-specific rules (client import, MODEL constant, ESM only), naming conventions, comment guidelines, code markers (TODO/FIXME/HACK/NOTE), and file organization.

### error-handling.md
**Scope**: Always

Z.ai error codes table (429/400/401), required try/catch pattern, streaming error handling, retry strategy (backoff on 429, fail-fast on 400/401).

### testing.md
**Scope**: Always

Test behavior not implementation, run specific files not full suite, fix flaky tests. Includes Z.ai manual test checklist (`list-models.js` → `npm start` → `npm run stream` → `npm run chat`).

### security.md
**Scope**: Path-scoped (`*.js`, `*.json`, `.env*`)

Loads when touching JS or config files. Covers API key protection, hardcoded credential detection, user input validation, prompt injection prevention.

### frontend.md
**Scope**: Path-scoped (`**/*.tsx`, `**/*.jsx`, `**/*.vue`, `**/*.css`, `**/*.html`, etc.)

Loads when touching frontend files. Design token requirements, design principles pick-list, component framework options, layout rules, accessibility (WCAG 2.1 AA), performance.

### database.md
**Scope**: Path-scoped (`**/migrations/**`, `**/prisma/**`, `**/drizzle/**`, etc.)

Loads when touching database migration files. Migration rules, reversibility, no production seeding in migrations.

## Adding Your Own

```yaml
---
alwaysApply: true
---

# Your Rule Name

- Your instructions here
```

Or path-scoped:

```yaml
---
paths:
  - "src/your-area/**"
---

# Your Rule Name

- Instructions that only apply when touching these files
```
