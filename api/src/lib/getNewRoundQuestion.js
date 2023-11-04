import { logger } from 'src/lib/logger'
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { db } from './db';
require('dotenv').config()

let KEY = process.env.USE_MY_OPENAI_API_KEY?process.env.OPENAI_API_KEY:"";
const prompt = PromptTemplate.fromTemplate(
  `You are the backend of a game. You need to generate a prompt for another player to respond to. The new prompt should add an attribute to the item given in the previous prompt. There should be a sea theme to the prompt.
  Previous prompt:{previousPrompt}
  Item given:{itemGiven}
  `
);



export async function getNewRoundQuestion(previousPromptId) {
let previousPrompt = "";
let itemGiven = "";
  await db.gamePrompts.findUnique({
    where: { id: previousPromptId },
  }).then((prompt) => {
 logger.info(prompt);
    previousPrompt = prompt.prompt;
    itemGiven = prompt.response;
  });

  const newQuestion = await prompt.format({
    previousPrompt: previousPrompt,
    itemGiven: itemGiven,
});
  const model = new OpenAI({
    modelName: "text-davinci-003", // Defaults to "text-davinci-003" if no model provided.
    temperature: 0.9,
    openAIApiKey: KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
  });
  const res = await model.call(newQuestion);
    logger.info(res.toString());
    return res;
  }
