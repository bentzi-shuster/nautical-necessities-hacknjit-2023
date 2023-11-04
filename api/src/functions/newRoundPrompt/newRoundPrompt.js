import { getNewRoundQuestion } from 'src/lib/getNewRoundQuestion';
import { logger } from 'src/lib/logger'

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

export const handler = async (event, _context) => {

  let previousPromptId = event.queryStringParameters.previousPromptId; //https://localhost:8911/example?previousPromptId=1
  logger.info(previousPromptId);
  if (!previousPromptId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'No previousPromptId or itemGiven provided' }),
    }
  }

  let response = getNewRoundQuestion(parseInt(previousPromptId))
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
