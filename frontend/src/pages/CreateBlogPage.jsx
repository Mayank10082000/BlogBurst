// Person will be able to create a blog post or edit a blog post and delete a blog post
// This should be visible only to the logged in user
// The person should have 2 text box areas one for heading and another for content.
// and there should be a publish button to publish the blog and save it in the database.
// There should be a delete button also to delete the blog post

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlogsStore } from "../store/useBlogsStore";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2, Save, Trash2, ArrowLeft, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

const CreateBlogPage = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(blogId);

  const { authUser } = useAuthStore();
  const {
    createBlog,
    updateBlog,
    deleteBlog,
    viewCurrentBlog,
    isCreatingBlog,
    isUpdatingBlog,
    isDeletingBlog,
  } = useBlogsStore();

  // Form state
  const [formData, setFormData] = useState({
    blogHeading: "",
    blogContent: "",
  });

  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);

  // Fetch blog data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchBlogData = async () => {
        try {
          setLoading(true);
          const blogData = await viewCurrentBlog(blogId);

          if (blogData) {
            // Check if current user is the author
            if (blogData.userId._id !== authUser._id) {
              setError("You don't have permission to edit this blog");
              return;
            }

            setFormData({
              blogHeading: blogData.blogHeading,
              blogContent: blogData.blogContent,
            });
          } else {
            setError("Blog not found");
          }
        } catch (err) {
          console.error("Error fetching blog:", err);
          setError("Failed to load blog data");
        } finally {
          setLoading(false);
        }
      };

      fetchBlogData();
    }
  }, [blogId, isEditMode, viewCurrentBlog, authUser]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form validation
  const validateForm = () => {
    if (!formData.blogHeading.trim()) {
      toast.error("Blog title is required");
      return false;
    }

    if (formData.blogHeading.length > 100) {
      toast.error("Blog title must be less than 100 characters");
      return false;
    }

    if (!formData.blogContent.trim()) {
      toast.error("Blog content is required");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (isEditMode) {
        await updateBlog(blogId, formData);
        toast.success("Blog updated successfully");
      } else {
        await createBlog(formData);
        toast.success("Blog published successfully");
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving blog:", error);
      toast.error("Failed to save blog");
    }
  };

  // Handle blog deletion
  const handleDelete = async () => {
    if (!isEditMode) return;

    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlog(blogId);
        toast.success("Blog deleted successfully");
        navigate("/dashboard");
      } catch (error) {
        console.error("Error deleting blog:", error);
        toast.error("Failed to delete blog");
      }
    }
  };

  // Handle navigation back
  const handleGoBack = () => {
    navigate(-1);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-6">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <p className="text-xl text-gray-700 mb-4">{error}</p>
        <button
          onClick={handleGoBack}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Go Back
        </button>
      </div>
    );
  }

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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {isEditMode ? "Edit Blog" : "Create Blog"}
      </h1>

      {/* Blog Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-6 md:p-8"
      >
        <div className="space-y-6">
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
              value={formData.blogHeading}
              onChange={handleChange}
              placeholder="Enter a catchy title..."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              maxLength={100}
            />
            <div className="text-xs text-gray-500 text-right">
              {formData.blogHeading.length}/100
            </div>
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
              value={formData.blogContent}
              onChange={handleChange}
              placeholder="Start writing your blog here..."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              rows={15}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
            <button
              type="submit"
              disabled={isCreatingBlog || isUpdatingBlog}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-2.5 px-5 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center"
            >
              {isCreatingBlog || isUpdatingBlog ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  {isEditMode ? "Updating..." : "Publishing..."}
                </>
              ) : (
                <>
                  <Save className="mr-2 h-5 w-5" />
                  {isEditMode ? "Update Blog" : "Publish Blog"}
                </>
              )}
            </button>

            {isEditMode && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeletingBlog}
                className="bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg py-2.5 px-5 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center justify-center"
              >
                {isDeletingBlog ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-5 w-5" />
                    Delete Blog
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateBlogPage;
