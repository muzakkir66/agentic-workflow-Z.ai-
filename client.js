import { config } from 'dotenv';
config({ override: true });
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.Z_AI_API_KEY,
  baseURL: process.env.Z_AI_BASE_URL,
});

export const MODEL = process.env.Z_AI_MODEL || 'GLM-4.7-Flash';
export default client;
