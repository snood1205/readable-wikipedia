import "dotenv/config";
import {OpenAI} from "openai";

const openAIClient = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
  organization: process.env["OPENAI_ORG"],
});

export const infoboxObjectToProse = async (infobox: Record<string, string>): Promise<string> => {
  const result = await openAIClient.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: "Create a paragraph of prose from the following infobox:\n" + JSON.stringify(infobox),
  }).asResponse();
  const data = await result.json();
  return data.choices[0].text;
};
