import { logger } from 'src/lib/logger'
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
require('dotenv').config()
/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
let KEY = process.env.USE_MY_OPENAI_API_KEY?process.env.OPENAI_API_KEY:"";


async function getPrompt(prompt) {
const model = new OpenAI({
  modelName: "text-davinci-003", // Defaults to "text-davinci-003" if no model provided.
  temperature: 0.9,
  openAIApiKey: KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
});
const res = await model.call(prompt);
  logger.info(res.toString());
  return res;
}


export const handler = async (event, _context) => {
  let prompt = (JSON.parse(event.body)).prompt;//{ prompt: "Tell me a joke about bears" };
  logger.info(prompt);
  if (!prompt) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'No prompt provided' }),
    }
  }
  let response = getPrompt(prompt);
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: (await response).toString(),
    }),
  }
}
