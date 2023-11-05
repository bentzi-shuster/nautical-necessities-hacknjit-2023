import { ChatOpenAI } from "langchain/chat_models/openai";
import {PromptTemplate} from "langchain/prompts";

const TEMPLATE = `You need to come up with a question to direct the user to decide new attributes about their item. The new question should be a funny, but reality-based follow-up question. Questions whose answers could be yes or no, or either or questions are NOT allowed! An answer to your question should have endless possibilities. So don't ask for a color or a number of something, or anything like that, that's boring. You are also allowed to ask follow-up questions about previously offered details. Your answer should only include the new prompt, no other text.
  Current conversation:
  {chatHistory}
  User: {itemGiven}
  
  AI:`;

export async function newPrompt(chatHistoryArr, answer) {

    if(!chatHistoryArr||chatHistoryArr.length==0){
    return JSON.stringify({
        chatHistory: [],
        itemGiven: "",
        result: "If you were stranded on a deserted island, what would you bring?"
    })
    }

    const model = new ChatOpenAI({
        temperature: 0.7,
        openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = PromptTemplate.fromTemplate(TEMPLATE);

    const chain = prompt.pipe(model);

    const result = await chain.invoke({
        chatHistory: chatHistoryArr,
        itemGiven: answer,
    });

    // return (chatHistoryArr + "\nUser: " + answer + "\nMe: " + result.content)
    return JSON.stringify({
        chatHistory: chatHistoryArr,
        itemGiven: answer,
        result: result.content
    })
    
}