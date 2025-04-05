import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Menu, X, User } from "lucide-react";
import LogoIcon from "../assets/icon.png";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { authUser, logout } = useAuthStore();

  // Helper function to close mobile menu
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

  const handleDashboardNavigation = () => {
    navigate("/dashboard");
    closeMobileMenu();
  };

  const handleCommunityNavigation = () => {
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
          {/* Logo and App Name Container - Fixed width to prevent wrapping */}
          <div
            className="flex shrink-0 items-center cursor-pointer hover:opacity-80 transition-opacity space-x-3"
            onClick={handleLogoClick}
          >
            {/* Logo */}
            <img
              src={LogoIcon}
              alt="Blog Burst Logo"
              className="w-10 h-10 object-contain"
            />

            {/* App Name - Added whitespace-nowrap to prevent line breaks */}
            <span className="text-2xl font-bold text-white whitespace-nowrap">
              Blog Burst
            </span>
          </div>

          {/* Desktop Navigation - Adjusted spacing */}
          <div className="hidden md:flex items-center justify-between w-full ml-6">
            {/* Navigation buttons (left side) */}
            <div className="flex items-center space-x-4 ml-4">
              <button
                onClick={handleCommunityNavigation}
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-800 transition-colors"
              >
                Community
              </button>

              {authUser && (
                <button
                  onClick={handleDashboardNavigation}
                  className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-800 transition-colors"
                >
                  Dashboard
                </button>
              )}
            </div>

            {/* Auth buttons or profile (right side) */}
            <div className="flex items-center space-x-4">
              {!authUser ? (
                // Non-Authenticated User Options
                <>
                  <button
                    onClick={handleLogin}
                    className="px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-800 transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleSignup}
                    className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-700 hover:bg-blue-600 transition-colors"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                // Authenticated User Options
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-700 hover:bg-blue-600 transition-colors"
                  >
                    Logout
                  </button>

                  {/* Profile Section - Moved to rightmost position */}
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
                      <User size={20} className="text-white" />
                    </div>
                    <span className="text-sm font-medium text-white">
                      {authUser.fullName.split(" ")[0]}
                    </span>
                  </div>
                </div>
              )}
            </div>
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

        {/* Mobile Menu - Changed background to white */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md z-40">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* Profile Section for Mobile - Changed bg and text colors */}
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

              {/* Community button - always visible */}
              <button
                onClick={handleCommunityNavigation}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-blue-50"
              >
                Community
              </button>

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
                <>
                  <button
                    onClick={handleDashboardNavigation}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-blue-50"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-blue-700 hover:bg-blue-600"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
