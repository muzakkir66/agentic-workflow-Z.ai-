---
name: tdd
description: Test-Driven Development loop for Z.ai Node.js scripts — write a failing test first, then minimum code to pass it, then refactor. Repeat.
argument-hint: "[feature description — e.g. 'summarize script that calls Z.ai']"
disable-model-invocation: true
---

Build the following using strict Test-Driven Development:

**Feature**: $ARGUMENTS

## The TDD Cycle

Repeat this cycle for each behavior. Never skip steps.

### Red: Write a Failing Test

1. Write ONE test for the smallest next behavior (not the whole feature)
2. The test must:
   - Describe the behavior in its name: `should return string content when Z.ai responds`
   - Use Arrange-Act-Assert structure
   - Assert specific values, not vague truths
3. **Run the test. It MUST fail.** If it passes, either:
   - The behavior already exists (skip to the next behavior)
   - The test is wrong — fix it
4. Verify the failure message makes sense

### Green: Write the Minimum Code to Pass

1. Write the **simplest, most obvious code** that makes the failing test pass
2. Don't generalize. Don't make it elegant. Don't handle cases the test doesn't cover.
3. For Z.ai calls: mock the API in tests — only call the real Z.ai API in `npm start` / integration runs
4. **Run the test. It MUST pass.**
5. Run ALL tests. Nothing previously passing should break.

### Refactor: Clean Up Without Changing Behavior

1. Look for: duplication, unclear names, functions doing too much, magic values
2. Make ONE improvement at a time
3. **Run ALL tests after each change.** If anything breaks, undo immediately.
4. Stop refactoring when the code is clean enough

## Z.ai-Specific Testing Notes

- **Mock `client.chat.completions.create()`** at the system boundary — don't make real API calls in unit tests
- **Test response parsing** separately from API call: `response.choices[0].message.content`
- **Test error handling** by mocking `status: 429`, `status: 400`, `status: 401`
- **Test streaming** by mocking async iterators that yield `chunk.choices[0].delta.content`
- Only use real Z.ai calls for final integration verification: `npm start`

## Choosing What to Test Next

1. **Degenerate cases** — empty input, null response
2. **Happy path** — valid input, Z.ai returns content
3. **Variations** — different message formats
4. **Error cases** — 429, 400, 401 from Z.ai
5. **Integration** — full script run via `npm start`

## Rules

- **Never write production code without a failing test that demands it.**
- **Never make real Z.ai API calls in unit tests** — use mocks for the client
- **The test drives the design.** If code is hard to test, the design is wrong.
- **Commit after each green+refactor cycle.**

## Output

After each cycle:
- **Test**: what behavior was added
- **Code**: what changed to make it pass
- **Refactor**: what was cleaned up (or "none needed")

When the feature is complete, provide a summary of all behaviors covered and any gaps requiring integration testing with real Z.ai calls.
