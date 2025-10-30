import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

(async () => {
  try {
    const res = await genAI.listModels();
    console.log('Available models:');
    console.dir(res, { depth: 4 });
  } catch (e) {
    console.error('Error listing models:', e);
    process.exit(1);
  }
})();
