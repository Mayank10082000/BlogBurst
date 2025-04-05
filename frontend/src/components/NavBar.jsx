import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Menu, X, User } from "lucide-react";
import LogoIcon from "../assets/icon.png";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { authUser, logout } = useAuthStore();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDashboardNavigation = () => {
    navigate("/dashboard");
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
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity space-x-3"
            onClick={handleLogoClick}
          >
            {/* Logo */}
            <img
              src={LogoIcon}
              alt="Blog Burst Logo"
              className="w-10 h-10 object-contain"
            />

            {/* App Name */}
            <span className="text-2xl font-bold text-white">Blog Burst</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {!authUser ? (
              // Non-Authenticated User Options
              <>
                <button
                  onClick={handleLogin}
                  className="px-4 py-2.5 rounded-md text-base font-medium text-white hover:bg-blue-800 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={handleSignup}
                  className="px-4 py-2.5 rounded-md text-base font-medium text-white bg-blue-700 hover:bg-blue-600 transition-colors"
                >
                  Sign Up
                </button>
              </>
            ) : (
              // Authenticated User Options
              <div className="flex items-center space-x-4">
                {/* Profile Section */}
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center">
                    <User size={20} />
                  </div>
                  <span className="text-sm font-medium text-white">
                    {authUser.fullName.split(" ")[0]}
                  </span>
                </div>

                <button
                  onClick={handleDashboardNavigation}
                  className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-800 transition-colors"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-700 hover:bg-blue-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
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
          <div className="md:hidden absolute top-16 left-0 w-full bg-blue-900 shadow-md z-40">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* Profile Section for Mobile */}
              {authUser && (
                <div className="flex items-center space-x-3 px-3 py-2 bg-blue-800 rounded-md mb-2">
                  <div className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center">
                    <User size={20} />
                  </div>
                  <div>
                    <span className="text-base font-medium text-white">
                      {authUser.fullName.split(" ")[0]}
                    </span>
                  </div>
                </div>
              )}

              {!authUser ? (
                <>
                  <button
                    onClick={handleLogin}
                    className="block w-full text-left px-4 py-2.5 rounded-md text-lg font-medium text-white hover:bg-blue-800"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleSignup}
                    className="block w-full text-left px-4 py-2.5 rounded-md text-lg font-medium text-white bg-blue-700 hover:bg-blue-600"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleDashboardNavigation}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-800"
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
