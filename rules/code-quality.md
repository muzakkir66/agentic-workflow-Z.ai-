---
alwaysApply: true
---

# Code Quality

## Principles

- Functions do one thing. If it needs a section comment, extract that section.
- No magic values — extract numbers, strings, and config to named constants.
- Handle errors at the boundary. Don't catch and re-throw without adding context.
- No premature abstractions. Three similar lines > a helper used once.
- Don't add features or "improve" things beyond what was asked.
- No dead code or commented-out blocks. Git has history.
- Composition over inheritance.

## Z.ai-Specific Principles

- Always import client from `./client.js` — never instantiate `new OpenAI()` elsewhere.
- Always use `MODEL` from `client.js` — never hardcode a model name string.
- Always set `max_tokens` explicitly — never rely on API defaults.
- Use `client.chat.completions.create()` — never `client.messages.create()`.
- ESM only: `import`/`export` — never `require()` or `module.exports`.

## Naming

- **Files**: kebab-case for all scripts (`list-models.js`, `chat.js`, `stream.js`)
- **Booleans**: `is`, `has`, `should`, `can` prefix — `isLoading`, `hasKey`
- **Functions**: verb-first — `getModels`, `sendMessage`, `handleStream`
- **Constants**: `SCREAMING_SNAKE` — `MAX_TOKENS`, `Z_AI_BASE_URL`
- **Abbreviations**: only universally known (`id`, `url`, `api`, `config`). Acronyms as words: `apiKey` not `APIKey`

## Comments

- **WHY**, never WHAT. If the code needs a "what" comment, rename instead.
- Comment: non-obvious decisions, Z.ai-specific quirks, dotenv override reasons
- Don't comment: obvious code, self-explanatory function names, section dividers
- No commented-out code — delete it. No journal comments — git blame does this.

## Code Markers

| Marker | Use |
|---|---|
| `TODO(author): desc (#issue)` | Planned work |
| `FIXME(author): desc (#issue)` | Known bugs |
| `HACK(author): desc (#issue)` | Ugly workarounds (explain the proper fix) |
| `NOTE: desc` | Non-obvious context for future readers |

Must have an owner + issue link. Don't commit TODOs you can do now. Never use `XXX`, `TEMP`, `REMOVEME`.

## File Organization

- **Imports**: builtins → external (`openai`, `dotenv`) → internal (`./client.js`) → relative
- **Exports**: named over default where possible. One responsibility per file.
- **Functions**: public first, then private helpers in call order. Top-to-bottom reads as a story.
