---
name: ship
description: Scan changes, run Z.ai verification, commit, push, and create a PR — with confirmation at each step
argument-hint: "[optional commit message or PR title]"
disable-model-invocation: true
allowed-tools:
  - Bash(git status)
  - Bash(git diff *)
  - Bash(git log *)
  - Bash(git add *)
  - Bash(git commit *)
  - Bash(git push *)
  - Bash(git checkout *)
  - Bash(git branch *)
  - Bash(gh pr create *)
  - Bash(gh pr view *)
  - Bash(node *)
  - Bash(npm *)
---

Ship the current changes through commit, push, and PR creation. Confirm with the user before each step.

## Step 1: Scan

- Run `git status` to see all changed, staged, and untracked files
- Run `git diff` to see what changed
- Run `git log --oneline -5` to see recent commit style
- Present a clear summary: files modified, added, deleted, untracked
- If there are no changes, tell the user and stop

## Step 2: Verify Z.ai Still Works

Before committing, confirm the integration is healthy:
- Run `npm start` — must return a Z.ai response with no error
- If it fails, stop and fix the issue before proceeding

## Step 3: Stage & Commit

- Propose which files to stage. **Never stage** these:
  - Secrets: `.env`, `*.pem`, `*.key`
  - Lock files: `package-lock.json` (unless intentionally updated)
  - Dependencies: `node_modules/`
  - OS/editor: `.DS_Store`, `Thumbs.db`, `.vscode/settings.json`
- Draft a commit message based on the changes, matching the repo's existing commit style
- **ASK the user to confirm or edit**: show exact files to stage and proposed commit message
- Only after confirmation: stage the files and create the commit
- If the commit fails (e.g., pre-commit hook), fix the issue and create a NEW commit

## Step 4: Push

- Check if current branch has an upstream remote
- If not, propose `git push -u origin <branch>`
- **ASK the user to confirm** before pushing
- Only after confirmation: push to remote

## Step 5: Pull Request

- Check if a PR already exists for this branch (`gh pr view`)
- Analyze ALL commits on this branch vs the base branch
- Draft a PR title (under 72 chars) and body:
  - Summary: 2-4 bullet points of what changed
  - Test plan: `npm start` passes, `node list-models.js` works
- **ASK the user to confirm or edit** the title and body
- Only after confirmation: create the PR with `gh pr create`
- Show the PR URL when done

## Rules

- NEVER skip a confirmation step
- NEVER force-push
- NEVER commit `.env` or any API key
- NEVER push directly to `main` — always use a branch
- If the user says "skip" at any step, skip it and move to the next
- If `$ARGUMENTS` is provided, use it as the commit message / PR title
