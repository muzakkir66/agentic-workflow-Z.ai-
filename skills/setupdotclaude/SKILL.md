---
name: setupdotclaude
description: Scan the Z.ai project and customize all configuration files to match the actual setup. Run this after cloning or when configuration drifts from the codebase.
argument-hint: "[optional: focus area like 'hooks' or 'agents']"
disable-model-invocation: true
---

Scan this Z.ai Node.js project and customize every configuration file to match the actual tech stack, credentials, and patterns in use. Confirm with the user before each change.

If the project has no source files yet, tell the user defaults will be kept and stop.

## Phase 1: Detect Project State

Scan and report:
- Node.js version: `node --version`
- Installed packages: read `package.json` dependencies
- Available npm scripts: read `package.json` scripts
- `.env` status: does it exist? Are all three keys set (`Z_AI_API_KEY`, `Z_AI_BASE_URL`, `Z_AI_MODEL`)?
- Active model: read `Z_AI_MODEL` from `.env`
- API connection: run `node list-models.js` to confirm key works

Present findings to the user and ask: "Should I customize the config files based on this? (yes/no/corrections)"

## Phase 2: Customize Each File

For each file below, propose the specific changes and ask the user to confirm before applying.

### 2.1 — CLAUDE.md
- Verify project structure matches actual files in root
- Update model name if `.env` uses a different model than what's documented
- Update common errors table if new error patterns have been discovered

### 2.2 — settings.json
- Verify `Z_AI_MODEL` matches the active model in `.env`
- Confirm hook paths reference existing `.claude/hooks/*.sh` files
- Verify permissions allow `node` and `npm` commands the project actually uses
- Remove any permissions for tools no longer needed

### 2.3 — rules/
- `code-quality.md`: verify naming conventions match the actual code style in `.js` files
- `error-handling.md`: confirm Z.ai error codes table is current
- `security.md`: confirm `paths:` frontmatter covers all `.js` files
- `testing.md`: confirm manual test commands match `package.json` scripts

### 2.4 — hooks/
- Verify every hook referenced in `settings.json` exists in `.claude/hooks/`
- Test `session-start.sh` outputs correct project context
- Confirm `protect-files.sh` lists files that should actually be protected
- Confirm `block-dangerous-commands.sh` patterns are relevant to this project

### 2.5 — agents/
- Confirm agents in `agents/` folder match the team's needs
- Remove agents not relevant to the current project scope
- Keep: `code-reviewer`, `security-reviewer`, `performance-reviewer`, `doc-reviewer`

### 2.6 — skills/
- All skills are methodology-based — leave content unchanged
- Only update if Z.ai-specific commands in skills no longer match `package.json`

## Phase 3: Review & Simplify

After all changes, do a final review:
- Do rules match how the code is actually written?
- Do hook protections cover files that actually need protecting?
- Are there Z.ai-specific patterns not yet captured in the config?
- Remove any redundancy — ensure no file contradicts another
- Verify all hook scripts referenced in `settings.json` exist

Present findings to user. If changes are needed, confirm before applying.

## Phase 4: Summary

```
Setup complete. Here's what was customized:

- CLAUDE.md: [what changed]
- settings.json: [what changed]
- rules/: [what changed]
- hooks/: [what changed]
- agents/: [what changed]

Files left as defaults (no project-specific changes needed):
- [list]

Review pass: [any issues found and fixed, or "all clean"]
```

## Rules

- NEVER write changes without user confirmation first
- NEVER delete a file without confirming — explain why
- NEVER modify `.env` — instruct the user to do it
- If detection is uncertain, ASK the user rather than guessing
- Keep it minimal — if the default works, leave it alone
