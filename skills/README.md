# Skills

Skills are slash commands you invoke with `/name`. They run in the main conversation context and see all loaded rules and CLAUDE.md.

- `disable-model-invocation: true` — manual only, you type `/name` to trigger
- Without that flag — Claude can also trigger the skill automatically when relevant

## Available Skills

### /debug-fix [error or description]
**Trigger**: Manual only

Find and fix a Z.ai API or Node.js issue. Covers all Z.ai error codes (429, 400, 401), dotenv issues, wrong API call format, response parsing errors. Follows: understand → reproduce → investigate → fix → verify.

### /explain [file, function, or concept]
**Trigger**: Manual only

Explains Z.ai scripts with a one-sentence summary, mental model, ASCII data-flow diagram, key details, and modification guide. Includes Z.ai-specific flow diagrams.

### /hotfix [error or description]
**Trigger**: Manual only

Emergency Z.ai integration fix. Minimal change, verified with a live `npm start` call, shipped fast. Blocks refactoring, secrets commits, and force-push.

### /pr-review [PR number | staged | file path]
**Trigger**: Manual only

Reviews code changes by delegating to `@code-reviewer`, `@security-reviewer`, `@performance-reviewer`, `@doc-reviewer`. When given a PR number, also checks title, description, CI status, and size. Ends with a clear merge/needs-changes verdict.

### /refactor [file or function]
**Trigger**: Manual only

Safe refactoring using `npm start` output as a safety net. Runs `npm start` before and after each step. Stops immediately if Z.ai response changes.

### /setupdotclaude
**Trigger**: Manual only

Scans the Z.ai project and customizes all config files to match — CLAUDE.md, settings.json, rules, hooks, agents. Verifies API connection, model name, and hook paths. Confirms every change with the user.

### /ship [optional message]
**Trigger**: Manual only

Full shipping workflow: scan → verify `npm start` → stage & commit → push → create PR. Confirms at every step. Blocks `.env`, force-push, and push to `main`.

### /tdd [feature description]
**Trigger**: Manual only

Strict TDD loop for Z.ai Node.js scripts. Mocks Z.ai API in unit tests. Red → Green → Refactor. Commits after each cycle. Real Z.ai calls only at final integration step.

### /test-writer
**Trigger**: Automatic (when new scripts or features are added)

Writes comprehensive tests for Z.ai scripts: mocks `client.chat.completions.create`, tests all error codes (429/400/401), streaming delta parsing, chat history management. Verifies tests actually catch bugs.

## Adding Your Own

Create a directory with a `SKILL.md` file:

```
your-skill/
└── SKILL.md
```

```yaml
---
name: your-skill
description: What it does and when to use it
argument-hint: "[what to pass as argument]"
disable-model-invocation: true
---

Your instructions here. Use $ARGUMENTS for user input.
```
