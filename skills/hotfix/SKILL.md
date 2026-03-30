---
name: hotfix
description: Emergency fix for a broken Z.ai integration — minimal change, verify with real API call, ship fast
argument-hint: "[error message or description of what broke]"
disable-model-invocation: true
allowed-tools:
  - Bash(git *)
  - Bash(gh *)
  - Bash(node *)
  - Bash(npm *)
  - Read
  - Glob
  - Grep
  - Edit
  - Write
---

Emergency Z.ai integration fix. Speed matters — make the smallest correct change, verify it with a live Z.ai call, and ship.

## Step 1: Create Hotfix Branch

- Check the production branch (`main` or `master`)
- Stash any uncommitted work if needed
- Create and switch to `hotfix/<short-description>` from the production branch
- **ASK the user to confirm** the branch name before creating

## Step 2: Understand the Problem

- If `$ARGUMENTS` is an error message: cross-reference with `rules/error-handling.md`
- Check the Z.ai error code first:
  - `429` → balance issue or rate limit → switch to `GLM-4.7-Flash`
  - `400` → bad model name → run `node list-models.js`
  - `401` → bad API key → check `.env`
  - Connection error → check `Z_AI_BASE_URL` in `.env`
- **Briefly state** what you found and your proposed fix to the user

## Step 3: Fix — Minimal Change Only

- Make the smallest change that correctly fixes the issue
- **Do NOT**:
  - Refactor surrounding code
  - Add new features
  - Change unrelated scripts
  - Modify `.env` — instruct the user to do it
- If the fix requires touching more than 2 files, warn the user — this may not be a hotfix

## Step 4: Verify With Live Z.ai Call

- Run `npm start` — must return a real Z.ai response with no error
- Run `npm run stream` — must stream tokens to stdout without error
- Run `node list-models.js` — must list available models
- **ASK the user** if they want any additional verification

## Step 5: Ship

- Stage only the fix files — **never** stage `.env`, `package-lock.json`
- Draft a commit message: `hotfix: <short description>`
- **ASK the user to confirm** the commit message
- Push to `hotfix/<description>`
- Create a PR targeting the production branch:
  - Title: `[HOTFIX] <description>`
  - Body: what broke, root cause, what this fixes
- Show the PR URL

## Rules

- NEVER skip confirmation steps
- NEVER force-push
- NEVER commit `.env` or API keys
- NEVER refactor — this is a hotfix, not a cleanup
- If the user says "skip" at any step, skip it and move to the next
- If the fix is complex, tell the user and suggest a regular branch instead
