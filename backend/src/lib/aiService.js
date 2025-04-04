import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateBlogPostWithAi = async (prompt, options = {}) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0].message.content; // Extract the generated content from the response, not whole data from openai
  } catch (error) {
    console.error("Error generating blog post using AI:", error);
    throw new Error("Failed to generate blog post");
  }
};
