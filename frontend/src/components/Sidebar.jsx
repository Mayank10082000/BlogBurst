// Sidebar component should only be visible to the user who is logged in and not to the public
// // This should be visible on the left side of the user dashboard page.
// Should contain below options:
// 1. create blog with AI
// 2. create blog
// 3. my blogs
// 4. community blogs

import React from "react";
import { useNavigate } from "react-router-dom";
import { Bot, Edit, Newspaper, Globe } from "lucide-react";

const SideBar = () => {
  const navigate = useNavigate();

  const sidebarButtons = [
    {
      icon: <Bot className="w-5 h-5 mr-2" />,
      label: "Create Blog with AI",
      onClick: () => navigate("/create-blog-with-ai"),
    },
    {
      icon: <Edit className="w-5 h-5 mr-2" />,
      label: "Create Blog",
      onClick: () => navigate("/create-blog"),
    },
    {
      icon: <Newspaper className="w-5 h-5 mr-2" />,
      label: "My Blogs",
      onClick: () => navigate("/dashboard"),
    },
    {
      icon: <Globe className="w-5 h-5 mr-2" />,
      label: "Community Blogs",
      onClick: () => navigate("/"),
    },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-64 space-y-2">
      {sidebarButtons.map((button, index) => (
        <button
          key={index}
          onClick={button.onClick}
          className="w-full flex items-center justify-start p-3 text-left 
          text-gray-700 hover:bg-blue-50 hover:text-blue-700 
          rounded-lg transition-colors duration-200 
          focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {button.icon}
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default SideBar;
