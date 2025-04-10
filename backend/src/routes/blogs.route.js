import express from "express";

import {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  getAllBlogsByUserId,
  createBlogWithAi,
  viewBlog,
} from "../controllers/blogs.controller.js";

import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Routes for public access
router.get("/home", getAllBlogs); // Available for public view
router.get("/view/:blogId", viewBlog);

// Routes for authenticated users
router.post("/create", protectRoute, createBlog);
router.get("/my-blogs/:userId", protectRoute, getAllBlogsByUserId);
router.put("/update/:blogId", protectRoute, updateBlog);
router.delete("/delete/:blogId", protectRoute, deleteBlog);
router.post("/create-with-ai", protectRoute, createBlogWithAi);

export default router;
