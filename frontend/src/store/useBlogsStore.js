import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useBlogsStore = create((set) => ({
  isCreatingBlog: false,
  isGettingMyBlogs: false,
  isUpdatingBlog: false,
  isDeletingBlog: false,
  isGettingAllBlogs: false,
  isGettingBlog: false,
  myBlogs: [],
  allBlogs: [],
  getBlog: null,

  createBlog: async (data) => {
    set({ isCreatingBlog: true });
    try {
      const res = await axiosInstance.post("/blogs/create", data);
      set({ isCreatingBlog: res.data });
      toast.success("Blog Created Successfully!");
    } catch (error) {
      console.log("Error in createBlog: ", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isCreatingBlog: false });
    }
  },

  getMyBlogs: async (userId) => {
    set({ isGettingMyBlogs: true });
    try {
      const res = await axiosInstance.get(`/blogs/my-blogs/${userId}`);
      const myBlogsArray = res.data?.data || [];
      set({ myBlogs: myBlogsArray });
    } catch (error) {
      console.log("Error in myBlogs: ", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isGettingMyBlogs: false });
    }
  },

  updateBlog: async (blogId) => {
    set({ isUpdatingBlog: true });
    try {
      const res = await axiosInstance.put(`/blogs/update/${blogId}`);
      set({ isUpdatingBlog: res.data });
      toast.success("Blog Updated Successfully!");
    } catch (error) {
      console.log("Error in updateBlog: ", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingBlog: false });
    }
  },

  deleteBlog: async (blogId) => {
    set({ isDeletingBlog: true });
    try {
      const res = await axiosInstance.delete(`/blogs/delete/${blogId}`);
      set({ isDeletingBlog: res.data });
      toast.success("Blog Deleted Successfully!");
    } catch (error) {
      console.log("Error in deleteBlog: ", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isDeletingBlog: false });
    }
  },

  getAllBlogs: async () => {
    try {
      set({ isGettingAllBlogs: true });
      const res = await axiosInstance.get("/blogs/all");
      const allBlogsArray = res.data?.data || [];
      set({ allBlogs: allBlogsArray });
    } catch (error) {
      console.log("Error in allBlogs: ", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isGettingAllBlogs: false });
    }
  },

  getMyBlog: async (blogId) => {
    set({ isGettingBlog: true });
    try {
      const res = await axiosInstance.get(`/blogs/${blogId}`);
      const blog = res.data?.data || {};
      set({ getBlog: blog });
      toast.success("Blog Fetched Successfully!");
    } catch (error) {
      console.log("Error in getBlog: ", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isGettingBlog: false });
    }
  },
}));
