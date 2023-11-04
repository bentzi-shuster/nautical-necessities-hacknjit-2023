import { logger } from 'src/lib/logger'
import { OpenAI } from "langchain/llms/openai";
require('dotenv').config()

let KEY = process.env.USE_MY_OPENAI_API_KEY?process.env.OPENAI_API_KEY:"";

export async function getPrompt(prompt) {
  const model = new OpenAI({
    modelName: "text-davinci-003", // Defaults to "text-davinci-003" if no model provided.
    temperature: 0.9,
    openAIApiKey: KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
  });
  const res = await model.call(prompt);
    logger.info(res.toString());
    return res;
  }
