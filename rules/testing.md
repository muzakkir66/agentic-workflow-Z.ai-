---
alwaysApply: true
---

# Testing

- Write tests that verify behavior, not implementation details.
- Run the specific test file after changes, not the full suite — faster feedback.
- If a test is flaky, fix or delete it. Never retry to make it pass.
- Prefer real implementations over mocks. Only mock at system boundaries (network, Z.ai API, filesystem).
- One assertion per test. If the name needs "and", split it.
- Test names describe behavior: `should return content string when Z.ai responds`, not `test1`.
- Arrange-Act-Assert structure. No logic (if/loops) in tests.
- Never `expect(true)` or assert a mock was called without checking its arguments.

## Z.ai Project Manual Tests

Run in this order to verify the full integration:

```bash
node list-models.js    # Step 1 — API key works, models load
npm start              # Step 2 — single request returns content
npm run stream         # Step 3 — streaming works token-by-token
npm run chat           # Step 4 — multi-turn context remembered
```

## What to Verify

| Script | Pass Criteria |
|--------|--------------|
| `list-models.js` | At least one GLM model listed, `GLM-4.7-Flash` visible |
| `npm start` | Response text printed + token usage shown, no error |
| `npm run stream` | Text appears incrementally, no `[object Object]` printed |
| `npm run chat` | Model remembers previous message, `exit` closes cleanly |

## Environment Check Before Testing

```bash
node -e "import { config } from 'dotenv'; config({override:true}); console.log('Key set:', !!process.env.Z_AI_API_KEY, '| Model:', process.env.Z_AI_MODEL)"
```
