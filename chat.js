import readline from 'readline';
import client, { MODEL } from './client.js';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const messages = [];

function ask(prompt) {
  return new Promise(resolve => rl.question(prompt, resolve));
}

console.log('Z.ai Chat — type "exit" to quit\n');

while (true) {
  const userInput = await ask('You: ');
  if (userInput.toLowerCase() === 'exit') { rl.close(); break; }
  if (!userInput.trim()) continue;

  messages.push({ role: 'user', content: userInput });

  const response = await client.chat.completions.create({
    model: MODEL,
    max_tokens: 4096,
    messages,
  });

  const assistantText = response.choices[0].message.content;
  messages.push({ role: 'assistant', content: assistantText });
  console.log(`\nAssistant: ${assistantText}\n`);
}
