import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Menu, X, User, Bot, Edit, Newspaper, Globe } from "lucide-react";
import LogoIcon from "../assets/icon.png";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { authUser, logout } = useAuthStore();

  // Mobile Navigation Items
  const mobileNavItems = [
    {
      icon: <Globe className="w-5 h-5 mr-2" />,
      label: "Community Blogs",
      onClick: () => {
        navigate("/");
        setIsMobileMenuOpen(false);
      },
      visibleAlways: true,
    },
    ...(authUser
      ? [
          {
            icon: <Bot className="w-5 h-5 mr-2" />,
            label: "Create Blog with AI",
            onClick: () => {
              navigate("/create-blog-with-ai");
              setIsMobileMenuOpen(false);
            },
          },
          {
            icon: <Edit className="w-5 h-5 mr-2" />,
            label: "Create Blog",
            onClick: () => {
              navigate("/create-blog");
              setIsMobileMenuOpen(false);
            },
          },
          {
            icon: <Newspaper className="w-5 h-5 mr-2" />,
            label: "My Blogs",
            onClick: () => {
              navigate("/dashboard");
              setIsMobileMenuOpen(false);
            },
          },
        ]
      : []),
  ];

  // Helper functions
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate("/");
    closeMobileMenu();
  };

  const handleLogin = () => {
    navigate("/login");
    closeMobileMenu();
  };

  const handleSignup = () => {
    navigate("/signup");
    closeMobileMenu();
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    closeMobileMenu();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-blue-900 shadow-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and App Name Container */}
          <div
            className="flex shrink-0 items-center cursor-pointer hover:opacity-80 transition-opacity space-x-3"
            onClick={handleLogoClick}
          >
            <img
              src={LogoIcon}
              alt="Blog Burst Logo"
              className="w-10 h-10 object-contain"
            />
            <span className="text-2xl font-bold text-white whitespace-nowrap">
              Blog Burst
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between w-full ml-6">
            {/* Desktop Navigation Content (existing code) */}
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-200 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md z-40">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* User Profile Section for Mobile */}
              {authUser && (
                <div className="flex items-center space-x-3 px-3 py-2 bg-blue-50 rounded-md mb-2">
                  <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
                    <User size={20} className="text-white" />
                  </div>
                  <div>
                    <span className="text-base font-medium text-blue-900">
                      {authUser.fullName.split(" ")[0]}
                    </span>
                  </div>
                </div>
              )}

              {/* Mobile Navigation Items */}
              {mobileNavItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-blue-50"
                >
                  <div className="flex items-center">
                    {item.icon}
                    {item.label}
                  </div>
                </button>
              ))}

              {/* Authentication Buttons */}
              {!authUser ? (
                <>
                  <button
                    onClick={handleLogin}
                    className="block w-full text-left px-4 py-2.5 rounded-md text-base font-medium text-blue-900 hover:bg-blue-50"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleSignup}
                    className="block w-full text-left px-4 py-2.5 rounded-md text-base font-medium text-white bg-blue-700 hover:bg-blue-600"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-blue-700 hover:bg-blue-600"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
