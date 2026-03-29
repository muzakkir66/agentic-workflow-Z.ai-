---
name: pr-review
description: Review code changes or a pull request — delegates to specialist agents for code quality, security, performance, and documentation.
argument-hint: "[PR number | staged | file path — or omit to auto-detect]"
disable-model-invocation: true
---

Review Z.ai project code changes by delegating to specialist agents and synthesizing a unified report.

## Step 1: Determine Scope

Parse `$ARGUMENTS` to determine what to review:

- **PR number** (e.g., `123` or `#123`): fetch with `gh pr view $ARGUMENTS`
- **No argument**: try `gh pr view` for current branch. If none, fall back to `git diff --cached` (staged), then `git diff` (unstaged)
- **`staged`**: review `git diff --cached`
- **File path**: review that specific file's current state

If there are no changes to review, say so and stop.

## Step 2: PR Quality Check (PR path only)

Skip this step if reviewing staged changes or a file.

When reviewing a PR, fetch and check:
- PR title, description, author, base branch
- `gh pr diff $NUMBER` for the full diff
- `gh pr checks $NUMBER` for CI status

Review the PR itself:
- **Title**: descriptive and under 72 chars?
- **Description**: explains the *why*? Includes test steps?
- **Size**: flag if >300 lines changed (suggest splitting)
- **Base branch**: targeting the right branch?
- **CI status**: passing, failing, or pending?

## Step 3: Code Review (delegate to agents)

1. **Always**: delegate to `@code-reviewer` — checks Z.ai API usage, ESM, error handling, response access
2. **If `.env`, `client.js`, or user input handling changed**: delegate to `@security-reviewer` — checks for key exposure, prompt injection
3. **If Z.ai API calls or chat history changed**: delegate to `@performance-reviewer` — checks token waste, sequential calls, unbounded history
4. **If `README.md` or `CLAUDE.md` changed**: delegate to `@doc-reviewer` — checks accuracy against actual code

## Step 4: Synthesize Report

For PR reviews:
```
## PR Review: #[number] — [title]

**Changed**: [N files, +X/-Y lines]

### PR Quality
- Title: [ok / needs improvement]
- Description: [ok / missing test plan / empty]
- Size: [ok / large — consider splitting]
- CI: [passing / failing]

### Code Review
#### Critical / High
- [Agent] File:Line — issue

#### Medium
- [Agent] File:Line — issue

#### Low
- [Agent] File:Line — issue

### Verdict
[Ready to merge / Needs changes — summarize blockers]
```

For staged/file reviews:
```
## Review Summary

**Scope**: [staged changes / file path]
**Agents run**: [list]

### Critical / High
- [Agent] File:Line — issue

### Medium / Low
- [Agent] File:Line — issue

### Passed
- [areas with no issues]
```

Deduplicate findings that overlap between agents. Attribute each finding to the agent that found it.
