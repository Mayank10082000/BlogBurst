import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { getSocket } from "../lib/socket-client";

export const useBlogsStore = create((set, get) => ({
  isCreatingBlog: false,
  isGettingMyBlogs: false,
  isUpdatingBlog: false,
  isDeletingBlog: false,
  isGettingAllBlogs: false,
  isGettingBlog: false,
  isViewingBlog: false,
  isGeneratingAiContent: false,

  // Unsaved changes management
  hasUnsavedChanges: false,
  showConfirmDialog: false,
  pendingNavigation: null,

  // Set hasUnsavedChanges flag
  setHasUnsavedChanges: (value) => {
    set({ hasUnsavedChanges: value });
  },

  // Handle confirmation dialog
  setShowConfirmDialog: (value) => {
    set({ showConfirmDialog: value });
  },

  // Set pending navigation function
  setPendingNavigation: (navigationFn) => {
    set({ pendingNavigation: navigationFn });
  },

  // Confirm discard changes and navigate
  confirmDiscard: () => {
    const { pendingNavigation } = get();
    set({
      showConfirmDialog: false,
      hasUnsavedChanges: false,
    });

    if (pendingNavigation) {
      pendingNavigation();
      set({ pendingNavigation: null });
    }
  },

  // Cancel discard action
  cancelDiscard: () => {
    set({
      showConfirmDialog: false,
      pendingNavigation: null,
    });
  },

  myBlogs: [],
  allBlogs: [],
  getBlog: null,
  viewBlog: null,

  setupSocketListeners: () => {
    const socket = getSocket();

    socket.on("blogDeleted", (deletedBlogId) => {
      console.log("Blog deleted event received:", deletedBlogId);

      // Update myBlogs state by filtering out the deleted blog
      set((state) => ({
        myBlogs: state.myBlogs.filter((blog) => blog._id !== deletedBlogId),
        allBlogs: state.allBlogs.filter((blog) => blog._id !== deletedBlogId),
      }));
    });

    socket.on("blogCreated", (newBlog) => {
      set((state) => ({
        myBlogs: [newBlog, ...state.myBlogs],
        allBlogs: [newBlog, ...state.allBlogs],
      }));
    });

    socket.on("blogUpdated", (updatedBlog) => {
      set((state) => ({
        myBlogs: state.myBlogs.map((blog) =>
          blog._id === updatedBlog._id ? updatedBlog : blog
        ),
        allBlogs: state.allBlogs.map((blog) =>
          blog._id === updatedBlog._id ? updatedBlog : blog
        ),
      }));
    });
  },

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

  // New function to generate AI content without saving
  generateAiContent: async (prompt) => {
    set({ isGeneratingAiContent: true });
    try {
      const response = await axiosInstance.post(
        "/blogs/create-with-ai?saveToDatabase=false",
        {
          prompt,
        }
      );
      toast.success("AI has generated your blog content!");
      return response.data.data;
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error(
        error.response?.data?.message || "Failed to generate content"
      );
      return null;
    } finally {
      set({ isGeneratingAiContent: false });
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
      // Note: We're not manually updating the state here anymore
      // The state will be updated through the socket event listener
      toast.success("Blog Deleted Successfully!");
      return res.data;
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
