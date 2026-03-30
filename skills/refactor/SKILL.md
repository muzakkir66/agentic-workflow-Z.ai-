---
name: refactor
description: Safely refactor a Z.ai script or utility — with verification via live API call as a safety net
argument-hint: "[target to refactor — file or function name]"
disable-model-invocation: true
---

Refactor `$ARGUMENTS` safely.

## Process

### 1. Understand the current state
- Read the file and understand what it does
- Identify its callers, imports, and dependencies
- Run `npm start` before changing anything — record the current output as the baseline

### 2. Plan the refactoring
- State what you're changing and why (clearer naming, reduced duplication, better structure)
- List the specific transformations (extract function, inline variable, rename, etc.)
- Check: does this change any external behavior or Z.ai API call structure? If yes, this isn't a refactor — reconsider.

### 3. Make changes in small, testable steps
- One transformation at a time
- After EACH step run `npm start` to confirm Z.ai still responds correctly — not at the end
- If output changes or an error appears, undo the last step immediately

### 4. Verify
- `npm start` produces equivalent output to the baseline
- `node list-models.js` still works
- ESM imports still correct — no `require()` introduced (project uses `"type": "module"` in `package.json`)
- `client` still imported from `./client.js` — not re-instantiated
- `MODEL` still used from `client.js` — not hardcoded
- `max_tokens` still present in every `client.chat.completions.create()` call

## Rules
- If `npm start` breaks at any point, stop and undo — don't continue
- Never mix refactoring with behavior changes in the same commit
- Never change the Z.ai API call structure during a refactor — that's a behavior change
- If the refactoring touches more than 2 files, break it into multiple commits
