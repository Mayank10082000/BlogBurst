import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import CreateBlogPage from "./pages/CreateBlogPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SignupPage from "./pages/SignupPage";
import UserDashboard from "./pages/UserDashboard";
import PublicBlogsPage from "./pages/PublicBlogsPage";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div>
      <NavBar />

      <Routes>
        {/* Public blogs page as the main landing page */}
        <Route path="/" element={<PublicBlogsPage />} />

        {/* Auth routes - redirect to dashboard if already logged in */}
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/forgot-password"
          element={
            !authUser ? <ForgotPasswordPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/reset-password/:resetToken"
          element={!authUser ? <ResetPasswordPage /> : <Navigate to="/login" />}
        />

        {/* Protected routes - require authentication */}
        <Route
          path="/dashboard"
          element={authUser ? <UserDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-blog"
          element={authUser ? <CreateBlogPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit-blog/:blogId"
          element={authUser ? <CreateBlogPage /> : <Navigate to="/login" />}
        />

        {/* Fallback to public blogs for unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
