---
name: test-writer
description: Write comprehensive tests for new or changed Z.ai Node.js code. Triggered automatically when new scripts are added or existing ones are modified.
---

Write comprehensive tests for the code that was just added or changed.

## Step 1: Discover What Changed

- Check `git diff` and `git diff --cached` to identify new/modified scripts
- Read each changed file to understand the behavior
- Find existing test files to match the project's test conventions
- Place new test files in the project root or alongside source files

## Step 2: Analyze Every Code Path

For each new or modified function/script, map out:

- **Happy path** — valid input, Z.ai returns a response
- **Edge cases** — empty messages array, very long input, special characters
- **Null/undefined** — `response.choices` missing, `delta.content` is null
- **Error paths** — Z.ai returns 429, 400, 401; network timeout; dotenv not loaded
- **Async operations** — promise resolves, rejects, streaming completes or interrupts

## Step 3: Write the Tests

For EACH scenario, write a test. No skipping.

### Z.ai-Specific Test Structure (ESM)

```js
import { jest } from '@jest/globals';

// Mock the Z.ai client at the boundary
const mockCreate = jest.fn();
jest.mock('./client.js', () => ({
  default: { chat: { completions: { create: mockCreate } } },
  MODEL: 'GLM-4.7-Flash'
}));

describe('index.js', () => {
  it('should print response content when Z.ai responds', async () => {
    // Arrange
    mockCreate.mockResolvedValue({
      choices: [{ message: { content: 'Hello from Z.ai!' } }],
      usage: { prompt_tokens: 10, completion_tokens: 5 }
    });

    // Act + Assert
    // run the script behavior and check output
  });

  it('should exit with code 1 when Z.ai returns 429', async () => {
    // Arrange
    mockCreate.mockRejectedValue({ status: 429, error: { message: 'Insufficient balance' } });
    // Assert process.exit(1) is called
  });
});
```

### What to Test for Each Z.ai Script

**`index.js` / any single-request script:**
- Returns string content on success
- Logs token usage (prompt_tokens + completion_tokens)
- Handles 429, 400, 401 with correct error messages
- Calls `process.exit(1)` on error

**`stream.js`:**
- Writes delta content to stdout incrementally
- Handles null/undefined delta.content gracefully
- Handles stream interruption error

**`chat.js`:**
- Appends user message to history before sending
- Appends assistant response to history after receiving
- Exits cleanly when user types 'exit'
- Conversation history grows correctly across turns

**`list-models.js`:**
- Prints each model ID
- Handles empty model list
- Handles API error

### Mocking Rules

- Mock `client.chat.completions.create` — never make real Z.ai calls in tests
- Mock `process.stdout.write` when testing streaming output
- Mock `readline` interface for testing `chat.js`
- Reset all mocks between tests — no shared state leaking

## Step 4: Verify

- Run the new tests — all must pass
- Temporarily break the code (change a return value) — at least one test must fail
- If no test fails when code is broken, the tests are useless — rewrite them

## Output

- Complete, runnable test file(s) — not snippets
- Tests grouped by the script they cover
- Summary: how many tests, what scenarios covered, any gaps and why
