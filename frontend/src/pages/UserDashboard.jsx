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
import { Plus, Bot } from "lucide-react";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  const { myBlogs, getMyBlogs, isGettingMyBlogs } = useBlogsStore();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

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

  // Pagination handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Navigate to create blog pages
  const handleCreateBlog = () => {
    navigate("/create-blog");
  };

  const handleCreateAiBlog = () => {
    navigate("/create-blog-with-ai");
  };

  // Render pagination controls
  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(myBlogs.length / blogsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-center space-x-2 mt-6">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`px-4 py-2 rounded-md ${
              currentPage === number
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
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
    <div className="flex flex-col items-center justify-center space-y-6 p-8 bg-white rounded-lg shadow-md">
      <p className="text-xl text-gray-600 text-center">
        No blogs created yet. Start your blogging journey!
      </p>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          onClick={handleCreateBlog}
          className="btn btn-primary flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="mr-2" /> Create Blog
        </button>
        <button
          onClick={handleCreateAiBlog}
          className="btn btn-secondary flex items-center bg-pink-500 text-white px-4 py-2 rounded-lg"
        >
          <Bot className="mr-2" /> AI Blog Assistant
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-grow p-4 md:p-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 ml-4 md:ml-0">
            My Blogs
          </h1>

          {/* Loading State */}
          {isGettingMyBlogs ? (
            <div className="flex justify-center items-center h-64">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : myBlogs.length === 0 ? (
            <div className="px-4 md:px-0">{renderEmptyState()}</div>
          ) : (
            <>
              {/* Blog Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4 md:px-0">
                {currentBlogs.map((blog) => (
                  <BlogCardModal
                    key={blog._id}
                    blog={blog}
                    showActionButtons={true}
                  />
                ))}
              </div>

              {/* Pagination */}
              {myBlogs.length > blogsPerPage && renderPagination()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
