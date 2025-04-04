import OpenAI from "openai";
import dotenv from "dotenv";
import { parseAiContent } from "./aiContentParser.js";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateBlogPostWithAi = async (prompt, options = {}) => {
  try {
    // Create a structured prompt to get proper blogHeading and blogContent
    const structuredPrompt = `Generate a blog post with the following topic: ${prompt}. 
      Format your response as JSON with a 'blogHeading' field and a 'blogContent' field.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: structuredPrompt }],
      temperature: 0.7,
      max_tokens: 500,
    });

    // Extract content from the response
    const content = response.choices[0].message.content;

    // Use the parser to get structured content
    const parsedContent = parseAiContent(content);

    return parsedContent;
  } catch (error) {
    console.error("Error generating blog post using AI:", error);
    throw new Error("Failed to generate blog post");
  }
};
