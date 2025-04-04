import express from "express";

import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getAllBlogsByUserId,
  createBlogWithAi,
} from "../controllers/blogs.controller.js";

import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/all", getAllBlogs); // Available for public view
router.post("/create", protectRoute, createBlog);
router.get("/my-blogs/:userId", protectRoute, getAllBlogsByUserId);
router.get("/:blogId", protectRoute, getBlogById);
router.put("/update/:blogId", protectRoute, updateBlog);
router.delete("/delete/:blogId", protectRoute, deleteBlog);
router.post("/create-with-ai", protectRoute, createBlogWithAi);

export default router;
