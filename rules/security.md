---
paths:
  - "*.js"
  - "*.mjs"
  - ".env*"
  - "*.json"
---

# Security

- Never log `process.env.Z_AI_API_KEY` or any portion of it.
- Never hardcode the API key anywhere in source — always use `process.env.Z_AI_API_KEY`.
- Never commit `.env` — it is already in `.gitignore`.
- Never print the full error object blindly — it may contain auth headers from Z.ai.
- Use constant-time comparison for any token validation.
- Validate and length-check all user input before sending to Z.ai API.
- Never pass raw user input directly into a system prompt with elevated permissions — keep system prompts static.
- If a Z.ai response contains what looks like an API key or secret — discard it, do not forward it to other APIs or log it.

## What Must Stay Out of Code

```js
// FORBIDDEN — never do this
const client = new OpenAI({ apiKey: 'ac79dd8687...' });

// CORRECT — always do this
const client = new OpenAI({ apiKey: process.env.Z_AI_API_KEY });
```

## .env Rules

- Always use `.env` for credentials.
- Provide `.env.example` with placeholder values only — never real keys.
- Use `config({ override: true })` in `client.js` to ensure `.env` always wins over system env.
- `settings.json` must never contain a real `Z_AI_API_KEY` value — it is committed to git.

## Rate Limiting & Abuse Prevention

- Validate user input length before sending: `if (input.length > 2000) reject`.
- Never forward untrusted content from one Z.ai response into another Z.ai request without sanitization.
