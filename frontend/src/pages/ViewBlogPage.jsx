import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBlogsStore } from "../store/useBlogsStore";
import { useAuthStore } from "../store/useAuthStore";
import {
  AlertCircle,
  Edit,
  Trash2,
  ArrowLeft,
  Calendar,
  Clock,
  User,
} from "lucide-react";
import toast from "react-hot-toast";

const ViewBlogPage = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const { viewCurrentBlog, deleteBlog } = useBlogsStore();
  const { authUser } = useAuthStore();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blog details on component mount
  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        setLoading(true);
        const blogData = await viewCurrentBlog(blogId);
        setBlog(blogData);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to load blog post");
        toast.error("Unable to load blog post");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [blogId, viewCurrentBlog]);

  // Handle navigation back to previous page
  const handleGoBack = () => {
    navigate(-1);
  };

  // Handle edit blog navigation
  const handleEdit = () => {
    navigate(`/edit-blog/${blogId}`);
  };

  // Handle blog deletion
  const handleDelete = async () => {
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

  // Check if current user is the author
  const isAuthor = authUser && blog && authUser._id === blog.userId._id;

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Render error state
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

  // If no blog found
  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-6">
        <AlertCircle className="w-16 h-16 text-yellow-500 mb-4" />
        <p className="text-xl text-gray-700 mb-4">Blog post not found</p>
        <button
          onClick={handleGoBack}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Go Back
        </button>
      </div>
    );
  }

  // Format dates
  const createdDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const updatedDate = new Date(blog.updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back button */}
      <button
        onClick={handleGoBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Back
      </button>

      {/* Blog Content */}
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {blog.blogHeading}
        </h1>

        {/* Blog Metadata */}
        <div className="flex flex-wrap gap-4 text-gray-600 mb-8 text-sm">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            <span>By {blog.userId?.fullName || "Unknown Author"}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Published on {createdDate}</span>
          </div>
          {blog.createdAt !== blog.updatedAt && (
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>Updated on {updatedDate}</span>
            </div>
          )}
        </div>

        {/* Blog Content */}
        <div className="prose max-w-none text-gray-800 leading-relaxed whitespace-pre-line">
          {blog.blogContent}
        </div>

        {/* Author Actions */}
        {isAuthor && (
          <div className="flex space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleEdit}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Blog
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Blog
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBlogPage;
