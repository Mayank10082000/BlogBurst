export const parseAiContent = (content) => {
  let parsedContent;

  try {
    // Try to parse as JSON first
    parsedContent = JSON.parse(content);
  } catch (error) {
    // If JSON parsing fails, extract using string manipulation
    const lines = content.split("\n");
    const blogHeading = lines[0].replace(/^#\s*|Title:\s*/i, "").trim();
    const blogContent = lines.slice(1).join("\n").trim();

    parsedContent = {
      blogHeading: blogHeading,
      blogContent: blogContent,
    };
  }

  return parsedContent;
};
