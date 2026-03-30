---
name: debug-fix
description: Find and fix a Z.ai API or Node.js issue — from any source (error message, status code, observed behavior, or description)
argument-hint: "[error message, Z.ai status code, or description of the problem]"
disable-model-invocation: true
---

Find and fix the following issue:

**Problem**: $ARGUMENTS

## Step 1: Understand the Problem

Determine what kind of input this is:
- **Z.ai error code** (429, 400, 401, 404) → cross-reference with `rules/error-handling.md` error table
- **Error message / stack trace** → parse for file, line, error type, and call chain
- **Description of behavior** → identify what's expected vs what's happening

If the problem is unclear, ask clarifying questions before proceeding.

## Step 2: Reproduce

Run the failing script directly:
```bash
node list-models.js    # confirm API key and connection work
npm start              # test single request
npm run stream         # test streaming
npm run chat           # test multi-turn
```

If you can't reproduce:
- **Environment-specific?** Check `.env` has `Z_AI_API_KEY`, `Z_AI_BASE_URL`, `Z_AI_MODEL` set correctly
- **dotenv not loading?** Confirm `config({ override: true })` is in `client.js`
- **Wrong model?** Run `node list-models.js` and verify `Z_AI_MODEL` matches an available model

## Step 3: Investigate

Follow this sequence — don't skip ahead to guessing:

1. **Locate the symptom**: which file and line produces the wrong output/error?
2. **Check `client.js`**: is the client configured correctly? Is `MODEL` exported?
3. **Check `.env`**: are all three variables set — `Z_AI_API_KEY`, `Z_AI_BASE_URL`, `Z_AI_MODEL`?
4. **Check the API call**: is `client.chat.completions.create()` used (not `client.messages.create()`)?
5. **Check API call parameters**: does the call include `model`, `max_tokens`, and `messages`? Missing `max_tokens` can cause truncated or empty responses.
6. **Check response access**: is `response.choices[0].message.content` used (not `response.content`)?
7. **Form a hypothesis**: "I think [X] is wrong because [evidence]."
8. **Verify the hypothesis**: add a targeted `console.log` that confirms or denies it.
9. **If wrong**: go back to step 2 and trace a different path.

## Step 4: Fix

- Make the minimal change that fixes the root cause
- Don't patch symptoms — fix where the problem originates
- Don't refactor surrounding code while fixing the bug
- Don't add defensive checks that mask the problem

## Step 5: Verify

- Run `npm start` — confirm the fix works end-to-end with a real Z.ai response
- Run `node list-models.js` — confirm API connection is healthy
- Confirm the original error no longer appears

## Step 6: Wrap Up

- Stage only the relevant files (fix only, nothing else)
- Commit with a clear message: `fix: <what was wrong and why>`
