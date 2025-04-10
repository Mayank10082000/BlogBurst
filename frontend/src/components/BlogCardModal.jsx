import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useBlogsStore } from "../store/useBlogsStore";
import toast from "react-hot-toast";
import ConfirmationDialog from "../components/ConfirmationDialog";

const BlogCardModal = ({
  blog,
  showActionButtons = false,
  showAuthorName = false,
}) => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  const { deleteBlog } = useBlogsStore();

  // New state for delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Truncate blog content for preview
  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  // Handle view blog details
  const handleViewBlog = () => {
    navigate(`/view/${blog._id}`);
  };

  // Handle edit blog
  const handleEditBlog = () => {
    navigate(`/edit-blog/${blog._id}`);
  };

  // Modify delete handler to show confirmation dialog
  const handleDeleteBlog = () => {
    setShowDeleteConfirm(true);
  };

  // New method to handle confirmed deletion
  const handleConfirmDelete = async () => {
    try {
      await deleteBlog(blog._id);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog");
      setShowDeleteConfirm(false);
    }
  };

  // Method to cancel deletion
  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  // Determine if current user can edit/delete
  const isAuthor = authUser?._id === blog.userId;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 relative flex flex-col h-full">
      {/* Blog Metadata */}
      <div className="flex flex-col justify-between h-full">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {blog.blogHeading}
          </h2>
          <p className="text-gray-600">{truncateContent(blog.blogContent)}</p>
        </div>

        <div className="mt-auto">
          {/* Combined flex container for date, action buttons, and author name */}
          <div className="flex justify-between items-center text-sm text-gray-500">
            {/* Left: Date */}
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            {/* Right: Action buttons and/or Author Name */}
            {(showActionButtons && isAuthor) || showAuthorName ? (
              <div className="flex items-center space-x-2">
                {showActionButtons && isAuthor && (
                  <>
                    <button
                      onClick={handleViewBlog}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleEditBlog}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleDeleteBlog}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </>
                )}
                {showAuthorName && (
                  <span>{blog.userId?.fullName || "Unknown Author"}</span>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Confirmation Dialog for Delete */}
      <ConfirmationDialog
        isOpen={showDeleteConfirm}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title="Delete Blog"
        message="Are you sure you want to delete this blog? This action cannot be undone."
      />
    </div>
  );
};

export default BlogCardModal;
