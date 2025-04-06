/* Will contain the list of blogs created by the user and if that is empty or user signed up for the first time, it should show a message saying "No blogs created yet" with 2 create buttons:
1. create blog
2. create blog with AI
3. add the sidebar here

if a person has already created some blogs, then the list of blogs should be shown in a card format with the following details:
1. blog title
2. blog content
3. created date
4. add the blogcardmodel jsx file.
*/

// All the blogs made by the user should be visible to the user.

//There should be a popup for viewing the blog and this popup should make the background dark
// Add pagination also in this file around 10 blogs per page
// Blog details modal file should come for popup card component
// Blog card modal file should come preview of all the blogs the user have created

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useBlogsStore } from "../store/useBlogsStore";
import Sidebar from "../components/SideBar";
import BlogCardModal from "../components/BlogCardModal";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { Plus, Bot, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  const { myBlogs, getMyBlogs, deleteBlog, isGettingMyBlogs } = useBlogsStore();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  // New state for delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Fetch user's blogs on component mount
  useEffect(() => {
    if (authUser) {
      getMyBlogs(authUser._id);
    }
  }, [authUser, getMyBlogs]);

  // Pagination calculations
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = myBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Navigate to create blog pages
  const handleCreateBlog = () => {
    navigate("/create-blog");
  };

  const handleCreateAiBlog = () => {
    navigate("/create-blog-with-ai");
  };

  // New method to handle delete confirmation
  const handleDeleteBlog = (blog) => {
    setShowDeleteConfirm(blog);
  };

  // Method to handle confirmed deletion
  const handleConfirmDelete = async () => {
    if (showDeleteConfirm) {
      try {
        await deleteBlog(showDeleteConfirm._id);
        toast.success("Blog deleted successfully");
        setShowDeleteConfirm(null);
      } catch (error) {
        console.error("Error deleting blog:", error);
        toast.error("Failed to delete blog");
      }
    }
  };

  // Method to cancel deletion
  const handleCancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  // Render pagination controls
  const renderPagination = () => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(myBlogs.length / blogsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-center space-x-2 mt-8">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`px-4 py-2 rounded-md transition-colors ${
              currentPage === number
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {number}
          </button>
        ))}
      </div>
    );
  };

  // Render empty state
  const renderEmptyState = () => (
    <div className="text-center py-12">
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        No blogs found
      </h2>
      <p className="text-gray-500 mb-6">
        Start your blogging journey by creating your first blog!
      </p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={handleCreateBlog}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-2.5 px-5 flex items-center"
        >
          <Plus className="mr-2 h-5 w-5" /> Create Blog
        </button>
        <button
          onClick={handleCreateAiBlog}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg py-2.5 px-5 flex items-center"
        >
          <Bot className="mr-2 h-5 w-5" /> AI Blog Assistant
        </button>
      </div>
    </div>
  );

  // Loading state
  if (isGettingMyBlogs) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-grow p-4 md:p-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">My Blogs</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your personal collection of thoughts, ideas, and insights
            </p>
          </div>

          {/* No Blogs Found */}
          {myBlogs.length === 0 && renderEmptyState()}

          {/* Blogs Grid */}
          {myBlogs.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentBlogs.map((blog) => (
                  <BlogCardModal
                    key={blog._id}
                    blog={blog}
                    showActionButtons={true}
                    onDelete={() => handleDeleteBlog(blog)}
                  />
                ))}
              </div>

              {/* Pagination */}
              {myBlogs.length > blogsPerPage && renderPagination()}
            </>
          )}
        </div>
      </div>

      {/* Confirmation Dialog for Delete */}
      <ConfirmationDialog
        isOpen={!!showDeleteConfirm}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title="Delete Blog"
        message="Are you sure you want to delete this blog? This action cannot be undone."
      />
    </div>
  );
};

export default UserDashboard;
