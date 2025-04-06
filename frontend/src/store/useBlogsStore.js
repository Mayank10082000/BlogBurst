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
  isViewingBlog: false,
  myBlogs: [],
  allBlogs: [],
  getBlog: null,

  createBlog: async (data) => {
    set({ isCreatingBlog: true });
    try {
      const res = await axiosInstance.post("/blogs/create", data);
      set({ isCreatingBlog: true });
      toast.success("Blog Created Successfully!");
      return res.data;
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

  updateBlog: async (blogId, updateData) => {
    set({ isUpdatingBlog: true });
    try {
      const res = await axiosInstance.put(
        `/blogs/update/${blogId}`,
        updateData
      );
      set({ isUpdatingBlog: res.data });
      toast.success("Blog Updated Successfully!");
      return res.data;
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

  viewCurrentBlog: async (blogId) => {
    set({ isViewingBlog: true });
    try {
      const res = await axiosInstance.get(`/blogs/view/${blogId}`);
      const blog = res.data?.data || {};
      set({ viewBlog: blog });
      toast.success("Blog Fetched Successfully!");
      return blog; // Return the fetched blog data
    } catch (error) {
      console.log("Error in viewBlog: ", error);
      toast.error(error.response.data.message);
      return null; // Return null in case of an error
    } finally {
      set({ isViewingBlog: false });
    }
  },
}));
