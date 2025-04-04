// create view update delete blogs

// blogs if published should be available for the public view

// public page for list of all blogs

import Blog from "../models/blogs.model.js";
import { generateBlogPostWithAi } from "../lib/aiService.js";

export const createBlog = async (req, res) => {
  try {
    const { blogHeading, blogContent } = req.body;

    const userId = req.user._id; // Get the userId from the request object

    if (!blogHeading || !blogContent || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBlog = new Blog({
      userId,
      blogHeading,
      blogContent,
    });

    await newBlog.save();
    res.status(200).json({
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (error) {
    console.log("Error in createBlog controller:", error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const userId = req.user._id;

    if (!blogId || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const blog = await Blog.findById({ _id: blogId, userId });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({
      message: "Blog fetched successfully",
      data: blog,
    });
  } catch (error) {
    console.log("Error in getBlogsById controller:", error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const userId = req.user._id;
    const updates = req.body;

    if (!blogId || !userId) {
      return res
        .status(400)
        .json({ message: "Blog ID and User ID are required" });
    }

    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: blogId, userId },
      { $set: updates }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    console.log("Error in updateBlog controller:", error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const userId = req.user._id;

    if (!blogId || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const deletedBlog = await Blog.findOneAndDelete({ _id: blogId, userId });

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({
      message: "Blog deleted successfully",
      data: deletedBlog,
    });
  } catch (error) {
    console.log("Error in deleteBlog controller:", error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const getAllBlogsByUserId = async (req, res) => {
  try {
    const userId = req.user._id; // Get the userId from the request object

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const blogs = await Blog.find({ userId }).sort({ createdAt: -1 }); // Sort by createdAt in descending order

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found" });
    }

    res.status(200).json({
      message: "Blogs fetched successfully",
      data: blogs,
    });
  } catch (error) {
    console.log("Error in getAllBlogsByUserId controller:", error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }); // Sort by createdAt in descending order

    if (!blogs) {
      return res.status(404).json({ message: "No blogs found" });
    }

    res.status(200).json({
      message: "Blogs fetched successfully",
      data: blogs,
    });
  } catch (error) {
    console.log("Error in getAllBlogs controller:", error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const createBlogWithAi = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const userId = req.user._id; // Get the userId from the request object

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const generatedContent = await generateBlogPostWithAi(prompt);

    const newBlog = new Blog({
      userId,
      blogHeading: generatedContent.title,
      blogContent: generatedContent.content,
    });

    await newBlog.save();
    res.status(200).json({
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (error) {
    console.log("Error in createBlogwithAI controller:", error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};
