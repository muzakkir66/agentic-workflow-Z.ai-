---
alwaysApply: true
---

# Error Handling

- Never swallow errors silently. Log or rethrow with added context about what operation failed.
- Handle every rejected promise. No floating (unhandled) async calls.
- Use `process.exit(1)` on fatal errors so the shell knows it failed.
- Never expose full error objects blindly — they may contain auth headers from Z.ai requests.

## Z.ai Error Codes

Always handle these specific Z.ai errors:

| HTTP | Z.ai Code | Meaning | Action |
|------|-----------|---------|--------|
| `429` | `1113` | Insufficient balance | Switch to `GLM-4.7-Flash` or top up |
| `400` | `1211` | Unknown model | Run `node list-models.js` |
| `401` | — | Invalid API key | Check `Z_AI_API_KEY` in `.env` |
| `429` | — | Rate limit hit | Add retry with backoff |

## Required Error Handling Pattern

```js
try {
  const response = await client.chat.completions.create({ ... });
} catch (error) {
  if (error.status === 429) {
    console.error('Rate limit or insufficient balance:', error.error?.message);
  } else if (error.status === 400) {
    console.error('Bad request — check model name:', error.error?.message);
  } else if (error.status === 401) {
    console.error('Auth failed — check Z_AI_API_KEY in .env');
  } else {
    console.error('Unexpected error:', error.message);
  }
  process.exit(1);
}
```

## Streaming Error Handling

Wrap streaming loops in try/catch — errors can occur mid-stream:

```js
try {
  const stream = await client.chat.completions.create({ stream: true, ... });
  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content;
    if (delta) process.stdout.write(delta);
  }
} catch (error) {
  console.error('\nStream interrupted:', error.message);
  process.exit(1);
}
```

## General Rules

- Always log `error.error?.message` for Z.ai-specific error messages — not just `error.message`
- Retry transient errors (429 rate limit) with exponential backoff. Fail fast on 400/401 — don't retry.
- Never retry `401` — it will never succeed without fixing the API key first.
