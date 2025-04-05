// A popup modal for viewing details of the blog post on the public blogs page as well as the user ddashboard page

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBlogsStore } from "../store/useBlogsStore";
import { useAuthStore } from "../store/useAuthStore";
import { X, Edit, Trash2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

const BlogDetailsModal = ({ onClose, isModal = true }) => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const { getBlog, isGettingBlog } = useBlogsStore();
  const { authUser } = useAuthStore();
  const { deleteBlog } = useBlogsStore();

  const [blogDetails, setBlogDetails] = useState(null);
  const [error, setError] = useState(null);

  // Fetch blog details on component mount
  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await getBlog(blogId);
        setBlogDetails(response?.data);
      } catch (error) {
        setError("Failed to fetch blog details", error);
        toast.error("Unable to load blog");
      }
    };

    fetchBlogDetails();
  }, [blogId, getBlog]);

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
        console.log("Error deleting blog:", error);
        toast.error("Failed to delete blog");
      }
    }
  };

  // Check if current user is the author
  const isAuthor = authUser?._id === blogDetails?.userId;

  // Render loading state
  if (isGettingBlog) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <p className="text-xl text-gray-700 mb-4">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline btn-primary"
        >
          Go Back
        </button>
      </div>
    );
  }

  // If no blog details found
  if (!blogDetails) {
    return null;
  }

  // Main render
  return (
    <div
      className={`${
        isModal
          ? "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          : "container mx-auto px-4 py-8"
      }`}
    >
      <div
        className={`
          bg-white rounded-lg shadow-xl 
          ${
            isModal
              ? "w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto p-6"
              : "w-full"
          }
        `}
      >
        {/* Modal Close Button - Only for modal view */}
        {isModal && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        {/* Blog Content */}
        <div className="space-y-4">
          {/* Blog Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {blogDetails.blogHeading}
          </h1>

          {/* Blog Metadata */}
          <div className="flex justify-between items-center text-gray-500 text-sm mb-4">
            <span>
              Created: {new Date(blogDetails.createdAt).toLocaleDateString()}
            </span>
            {blogDetails.createdAt !== blogDetails.updatedAt && (
              <span>
                Updated: {new Date(blogDetails.updatedAt).toLocaleDateString()}
              </span>
            )}
          </div>

          {/* Blog Content */}
          <div className="prose max-w-none">{blogDetails.blogContent}</div>

          {/* Author Actions */}
          {isAuthor && (
            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleEdit}
                className="btn btn-outline btn-primary flex items-center"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Blog
              </button>
              <button
                onClick={handleDelete}
                className="btn btn-outline btn-error flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Blog
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsModal;
