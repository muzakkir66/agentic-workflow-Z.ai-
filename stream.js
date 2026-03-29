import client, { MODEL } from './client.js';

console.log('Streaming response from Z.ai:\n');

const stream = await client.chat.completions.create({
  model: MODEL,
  max_tokens: 2048,
  stream: true,
  messages: [
    { role: 'user', content: 'Write a short poem about AI and the future.' }
  ]
});

for await (const chunk of stream) {
  const delta = chunk.choices[0]?.delta?.content;
  if (delta) process.stdout.write(delta);
}

console.log('\n');
