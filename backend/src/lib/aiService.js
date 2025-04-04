export const generateBlogPostWithAi = async (prompt, options = {}) => {
  try {
    // Create a structured prompt to get proper title and content
    const structuredPrompt = `Generate a blog post with the following topic: ${prompt}. 
      Format your response as JSON with a 'title' field and a 'content' field.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: structuredPrompt }],
      temperature: 0.7,
      max_tokens: 500,
    });

    // Parse the JSON response
    const content = response.choices[0].message.content;
    let parsedContent;

    try {
      parsedContent = JSON.parse(content);
    } catch (error) {
      // If parsing fails, extract title and content manually
      const lines = content.split("\n");
      const title = lines[0].replace(/^#\s*|Title:\s*/i, "").trim();
      const contentText = lines.slice(1).join("\n").trim();

      parsedContent = {
        title: title,
        content: contentText,
      };
    }

    return parsedContent;
  } catch (error) {
    console.error("Error generating blog post using AI:", error);
    throw new Error("Failed to generate blog post");
  }
};
