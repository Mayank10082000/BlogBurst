// Anybody who visits the website will be redirected to this page
// might need to call socket io for real time updates of the blogs
//There should be a popup for viewing the blog and this popup should make the background dark
// Add pagination also in the public blogs page around 10 blogs per page
// Blog details modal file should come for popup card component
// Blog card modal file should come for preview of all the blogs

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { Loader2, AlertCircle, Search } from "lucide-react";
import toast from "react-hot-toast";
import BlogCardModal from "../components/BlogCardModal";

const PublicBlogsPage = () => {
  const navigate = useNavigate();

  // States
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(9);

  // Fetch all blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/blogs/home");

        if (response.data && response.data.data) {
          setBlogs(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to load blogs");
        toast.error("Unable to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filter blogs based on search
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.blogHeading.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.blogContent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current blogs for pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle view blog
  const handleViewBlog = (blogId) => {
    navigate(`/view/${blogId}`);
  };

  // Render pagination
  const renderPagination = () => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(filteredBlogs.length / blogsPerPage); i++) {
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

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-6">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <p className="text-xl text-gray-700 mb-4">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Community Blogs
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the latest thoughts, ideas, and insights from our community
            of writers.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search blogs..."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            />
          </div>
        </div>

        {/* No Blogs Found */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No blogs found
            </h2>
            <p className="text-gray-500">
              {searchTerm
                ? `No blogs match your search for "${searchTerm}"`
                : "There are no blogs published yet. Be the first to create one!"}
            </p>
          </div>
        )}

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentBlogs.map((blog) => (
            <div
              key={blog._id}
              className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
              onClick={() => handleViewBlog(blog._id)}
            >
              <BlogCardModal blog={blog} isPublicView={true} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        {filteredBlogs.length > blogsPerPage && renderPagination()}
      </div>
    </div>
  );
};

export default PublicBlogsPage;
