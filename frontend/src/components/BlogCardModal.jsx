// Handles preview display of the blog posts on the public blogs page and user dashboard page
// 3 small icons like delete, edit and view blog in the right side of the card, just like we have in trigger tide

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Edit, Trash2, MoreVertical } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useBlogsStore } from "../store/useBlogsStore";
import toast from "react-hot-toast";

const BlogCardModal = ({ blog, isPublicView = false }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  const { deleteBlog } = useBlogsStore();

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

  // Handle delete blog
  const handleDeleteBlog = async () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlog(blog._id);
      } catch (error) {
        console.error("Error deleting blog:", error);
        toast.error("Failed to delete blog");
      }
    }
  };

  // Determine if current user can edit/delete
  const isAuthor = authUser?._id === blog.userId;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 relative">
      {/* Blog Content */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {blog.blogHeading}
        </h2>
        <p className="text-gray-600">{truncateContent(blog.blogContent)}</p>
      </div>

      {/* Blog Metadata */}
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>

        {/* Action Icons */}
        <div className="relative">
          <button
            onClick={() => setIsOptionsOpen(!isOptionsOpen)}
            className="hover:bg-gray-100 rounded-full p-1"
          >
            <MoreVertical className="w-5 h-5" />
          </button>

          {isOptionsOpen && isAuthor && !isPublicView && (
            <div className="absolute right-0 top-full z-10 bg-white shadow-lg rounded-md border mt-2">
              <button
                onClick={handleViewBlog}
                className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-sm"
              >
                <Eye className="w-4 h-4 mr-2" /> View
              </button>
              <button
                onClick={handleEditBlog}
                className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-sm"
              >
                <Edit className="w-4 h-4 mr-2" /> Edit
              </button>
              <button
                onClick={handleDeleteBlog}
                className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </button>
            </div>
          )}

          {/* Public View Icons */}
          {isPublicView && (
            <button
              onClick={handleViewBlog}
              className="hover:bg-gray-100 rounded-full p-1"
            >
              <Eye className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCardModal;
