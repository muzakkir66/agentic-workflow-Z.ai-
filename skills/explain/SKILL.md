---
name: explain
description: Explain a Z.ai script, function, or concept with visual diagrams and clear mental models
argument-hint: "[file, function, or concept — e.g. 'client.js', 'streaming', 'dotenv override']"
disable-model-invocation: true
---

Explain `$ARGUMENTS` clearly.

## Format

### 1. One-sentence summary
What does it do and why does it exist? One sentence.

### 2. Mental model
Give an analogy or metaphor that captures the core idea. Relate it to something the developer already knows.

### 3. Visual diagram
Draw an ASCII diagram showing the data/control flow. Keep it readable:
```
Input → [Step A] → [Step B] → Output
              ↓
         [Side Effect]
```

For Z.ai API calls, use this as a guide:
```
.env (Z_AI_API_KEY, Z_AI_MODEL)
      ↓
  client.js  (OpenAI client, baseURL → Z.ai)
      ↓
  your script (messages array)
      ↓
  Z.ai API  (POST /chat/completions)
      ↓
  GLM Model response
      ↓
  response.choices[0].message.content
```

### 4. Key details
Walk through the important parts. Skip the obvious — focus on:
- Non-obvious decisions (why `override: true` in dotenv? why `openai` package not `@anthropic-ai/sdk`?)
- Edge cases and gotchas (streaming chunks may have `null` delta, always use optional chaining)
- Z.ai-specific behavior differences from other LLM APIs

### 5. How to modify it
What would someone need to know to safely change this code? Where are the landmines?
