# Z.ai Node.js Integration

A Node.js project that connects to [Z.ai](https://z.ai) — a Chinese AI platform powered by **GLM models** (Zhipu AI). The project uses Z.ai's OpenAI-compatible API to send messages, hold conversations, and stream responses.

---

## What is Z.ai?

Z.ai provides access to GLM (General Language Model) series models made by Zhipu AI. It exposes an **OpenAI-compatible API**, meaning you can use the standard `openai` npm package to interact with it — no custom SDK needed.

**Available models:**
- `glm-4.5` / `glm-4.5-air`
- `GLM-4.7-Flash` ← default used in this project (free tier)
- `glm-4.7`
- `glm-5` / `glm-5-turbo`
- `glm-5.1`

---

## Project Structure

```
z-io-with-claude-code/
├── .env              ← API credentials (not committed to git)
├── .env.example      ← Template for credentials
├── .gitignore        ← Excludes .env and node_modules
├── package.json      ← Dependencies and scripts
├── client.js         ← Shared Z.ai client (imported by all scripts)
├── index.js          ← Single request test
├── chat.js           ← Interactive multi-turn chat
├── stream.js         ← Streaming response demo
└── list-models.js    ← Lists all available Z.ai models
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- A Z.ai account with API key and sufficient credits

---

## Setup

### 1. Clone / download the project

```bash
cd D:/AI/z-io-with-claude-code
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure credentials

Create a `.env` file in the project root (or copy from `.env.example`):

```env
Z_AI_API_KEY=your_api_key_here
Z_AI_BASE_URL=https://api.z.ai/api/paas/v4
Z_AI_MODEL=GLM-4.7-Flash
```

> **Never commit `.env` to version control.** It is already listed in `.gitignore`.

---

## Usage

### Test a single message

```bash
npm start
```

Sends one message to Z.ai and prints the response with token usage stats.

---

### Interactive chat

```bash
npm run chat
```

Starts a back-and-forth conversation in your terminal. The conversation history is kept in memory so the model remembers what was said earlier. Type `exit` to quit.

**Example session:**
```
Z.ai Chat — type "exit" to quit

You: What is your name?
Assistant: I am ChatGLM, an AI assistant...

You: What can you help me with?
Assistant: I can help you with writing, coding, analysis...

You: exit
```

---

### Streaming response

```bash
npm run stream
```

Streams the AI's response token-by-token as it's generated — similar to how ChatGPT shows text appearing word by word.

---

### List available models

```bash
node list-models.js
```

Queries Z.ai's API and prints all models your account has access to. Useful when you want to switch to a faster or more capable model.

**Example output:**
```
Available Z.ai models:

 - glm-4.5
 - glm-4.5-air
 - glm-4.6
 - glm-4.7
 - glm-5
 - glm-5-turbo
 - glm-5.1
```

---

## Changing the Model

Edit the `Z_AI_MODEL` value in your `.env` file:

```env
Z_AI_MODEL=glm-5
```

No code changes needed — all scripts read the model from the environment.

---

## How It Works

### Architecture

```
Your Script (index.js / chat.js / stream.js)
        │
        ▼
   client.js  ←── reads .env credentials
        │
        ▼
  openai npm package
        │
        ▼
  Z.ai API  (https://api.z.ai/api/paas/v4)
        │
        ▼
   GLM Model  (glm-4.6, glm-5, etc.)
```

### Why `openai` package instead of a custom SDK?

Z.ai's API follows the **OpenAI format** (`/chat/completions` endpoint). The `openai` npm package works with any OpenAI-compatible API by pointing it at a custom `baseURL` — no custom Z.ai SDK needed.

### Why `override: true` in dotenv?

The system environment may have empty variables (e.g., `Z_AI_API_KEY=""`) that would block `.env` from loading. Using `override: true` forces the `.env` values to always take effect regardless of what's already in the environment.

---

## Common Errors

| Error | Cause | Fix |
|---|---|---|
| `Insufficient balance` (429) | Z.ai account has no credits | Top up your Z.ai account |
| `Unknown Model` (400) | Model name not recognized | Run `node list-models.js` and update `Z_AI_MODEL` in `.env` |
| `Could not resolve authentication` | API key is missing or empty | Check your `.env` file has a valid `Z_AI_API_KEY` |
| `404 Not Found` | Wrong base URL | Ensure `Z_AI_BASE_URL=https://api.z.ai/api/paas/v4` |

---

## Dependencies

| Package | Version | Purpose |
|---|---|---|
| `openai` | ^4.96.0 | OpenAI-compatible API client |
| `dotenv` | ^16.4.5 | Loads `.env` file into environment variables |

---

## Security Notes

- The `.env` file contains your API key — **never share it or commit it to git**
- `.gitignore` already excludes `.env` and `node_modules/`
- Rotate your API key immediately if it is ever exposed publicly
