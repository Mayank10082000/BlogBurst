// If possible try to automatically paste the heading and content created by AI in the text box areas and the person can edit it if he wants to and there should be publish button to publish the blog and save it in the database and there should be a delete button also to delete the blog post

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBlogsStore } from "../store/useBlogsStore";
import { axiosInstance } from "../lib/axios";
import {
  Loader2,
  Save,
  ArrowLeft,
  Bot,
  Sparkles,
  RefreshCw,
  Edit,
} from "lucide-react";
import toast from "react-hot-toast";

const CreateBlogWithAi = () => {
  const navigate = useNavigate();
  const { createBlog, isCreatingBlog } = useBlogsStore();

  // States
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState({
    blogHeading: "",
    blogContent: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  // Handle prompt change
  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  // Handle content change (for editing generated content)
  const handleContentChange = (e) => {
    const { name, value } = e.target;
    setGeneratedContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Generate content with AI
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a topic or prompt");
      return;
    }

    try {
      setIsGenerating(true);
      const response = await axiosInstance.post("/blogs/create-with-ai", {
        prompt,
      });

      if (response.data && response.data.data) {
        const { blogHeading, blogContent } = response.data.data;

        setGeneratedContent({
          blogHeading,
          blogContent,
        });

        setHasGenerated(true);
        toast.success("AI has generated your blog content!");
      }
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error(
        error.response?.data?.message || "Failed to generate content"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // Regenerate content
  const handleRegenerate = () => {
    setHasGenerated(false);
    setGeneratedContent({
      blogHeading: "",
      blogContent: "",
    });
  };

  // Validate form
  const validateForm = () => {
    if (!generatedContent.blogHeading.trim()) {
      toast.error("Blog title is required");
      return false;
    }

    if (!generatedContent.blogContent.trim()) {
      toast.error("Blog content is required");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handlePublish = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await createBlog({
        blogHeading: generatedContent.blogHeading,
        blogContent: generatedContent.blogContent,
      });

      toast.success("Blog published successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error publishing blog:", error);
      toast.error("Failed to publish blog");
    }
  };

  // Handle navigation back
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back button */}
      <button
        onClick={handleGoBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Back
      </button>

      {/* Page Header */}
      <div className="flex items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Create Blog with AI
        </h1>
        <Bot className="ml-3 text-blue-600 h-8 w-8" />
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        {!hasGenerated ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="prompt"
                className="block text-sm font-medium text-gray-700"
              >
                What would you like to write about?
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={handlePromptChange}
                placeholder="Enter a topic or idea for your blog post (e.g., 'The benefits of meditation', 'How to start investing', etc.)"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                rows={4}
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg py-2.5 px-5 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 flex items-center justify-center"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Generating Content...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Blog Content
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Sparkles className="text-purple-600 mr-2 h-5 w-5" />
                <h2 className="text-xl font-semibold">AI Generated Content</h2>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleRegenerate}
                  className="flex items-center text-purple-600 hover:text-purple-800 text-sm font-medium"
                >
                  <RefreshCw className="mr-1 h-4 w-4" />
                  Regenerate
                </button>
                <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                  <Edit className="mr-1 h-4 w-4" />
                  Edit
                </button>
              </div>
            </div>
            <form onSubmit={handlePublish} className="space-y-6">
              {/* Blog Title */}
              <div className="space-y-2">
                <label
                  htmlFor="blogHeading"
                  className="block text-sm font-medium text-gray-700"
                >
                  Blog Title
                </label>
                <input
                  id="blogHeading"
                  name="blogHeading"
                  type="text"
                  value={generatedContent.blogHeading}
                  onChange={handleContentChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>

              {/* Blog Content */}
              <div className="space-y-2">
                <label
                  htmlFor="blogContent"
                  className="block text-sm font-medium text-gray-700"
                >
                  Blog Content
                </label>
                <textarea
                  id="blogContent"
                  name="blogContent"
                  value={generatedContent.blogContent}
                  onChange={handleContentChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  rows={15}
                />
              </div>

              {/* Publish Button */}
              <button
                type="submit"
                disabled={isCreatingBlog}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-2.5 px-5 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center"
              >
                {isCreatingBlog ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-5 w-5" />
                    Publish Blog
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateBlogWithAi;
