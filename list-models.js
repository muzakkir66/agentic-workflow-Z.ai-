import client from './client.js';

const models = await client.models.list();
console.log('Available Z.ai models:\n');
for (const model of models.data) {
  console.log(` - ${model.id}`);
}
