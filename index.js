import client, { MODEL } from './client.js';

const response = await client.chat.completions.create({
  model: MODEL,
  max_tokens: 1024,
  messages: [
    { role: 'user', content: 'Say hello and confirm you are working via Z.ai!' }
  ]
});

console.log(response.choices[0].message.content);

console.log('\n--- Usage ---');
console.log(`Input tokens:  ${response.usage.prompt_tokens}`);
console.log(`Output tokens: ${response.usage.completion_tokens}`);
