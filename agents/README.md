# Agents

Agents are specialized AI instances that run with focused context. They don't see your full conversation history — they only have their own system prompt and the tools listed in their frontmatter.

Invoke them by name: `@code-reviewer`, `@security-reviewer`, etc. — or Claude will delegate automatically based on the task.

## Available Agents

### code-reviewer
Reviews Z.ai Node.js code for correctness, Z.ai API usage, ESM compliance, error handling, and code quality. Catches real bugs — not style nitpicks. Includes Z.ai-specific patterns like correct response access and streaming chunk parsing.

### doc-reviewer
Reviews README and CLAUDE.md for accuracy against the actual source code. Verifies npm scripts exist, model names are valid, file references resolve, and a new developer can follow the setup steps without getting stuck.

### security-reviewer
Reviews code for Z.ai API key exposure, prompt injection via user input, credential leaks in logs, and unsafe environment configuration. Highest priority: hardcoded keys and unbounded user input in chat.js.

### performance-reviewer
Reviews Z.ai scripts for wasted API calls, token over-allocation, sequential awaits that could be parallel, unbounded conversation history, and Node.js performance anti-patterns.

### frontend-designer
Creates distinctive, production-grade UI — components, pages, dashboards. Finds or creates design tokens first, picks a design principle, builds complete responsive code. Anti-AI-slop aesthetics built in.

## Adding Your Own

Create a new `.md` file in this directory:

```yaml
---
name: your-agent-name
description: When Claude should delegate to this agent
tools:
  - Read
  - Grep
  - Glob
  - Bash
---

Your agent's system prompt here.
```

## Usage Examples

```
@code-reviewer review index.js
@security-reviewer scan all JS files for hardcoded keys
@doc-reviewer check if README matches the current package.json scripts
@performance-reviewer review chat.js for token waste
@frontend-designer build a dashboard to display Z.ai response stats
```
