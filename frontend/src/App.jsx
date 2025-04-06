import React, { useEffect } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useBlogsStore } from "./store/useBlogsStore";
import { initializeSocket } from "./lib/socket-client";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

// Components
import NavBar from "./components/NavBar";
import Background from "./components/Background";

// Pages
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import CreateBlogPage from "./pages/CreateBlogPage";
import UserDashboard from "./pages/UserDashboard";
import PublicBlogsPage from "./pages/PublicBlogsPage";
import CreateBlogWithAi from "./pages/CreateBlogWithAi";
import ViewBlogPage from "./pages/ViewBlogPage";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { setupSocketListeners } = useBlogsStore();

  useEffect(() => {
    checkAuth();

    // Initialize socket and set up listeners
    const socket = initializeSocket();
    setupSocketListeners();

    // Clean up socket connection when component unmounts
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [checkAuth, setupSocketListeners]);

  if (isCheckingAuth)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <Background isGradient={true}>
      <div className="flex flex-col min-h-screen">
        <NavBar />

        <div className="flex-grow">
          <Routes>
            {/* Public routes accessible to everyone */}
            <Route path="/" element={<PublicBlogsPage />} />
            <Route path="/view/:blogId" element={<ViewBlogPage />} />

            {/* Authentication routes - redirect to dashboard if already logged in */}
            <Route
              path="/login"
              element={!authUser ? <LoginPage /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="/signup"
              element={
                !authUser ? <SignupPage /> : <Navigate to="/dashboard" />
              }
            />
            <Route
              path="/forgot-password"
              element={
                !authUser ? (
                  <ForgotPasswordPage />
                ) : (
                  <Navigate to="/dashboard" />
                )
              }
            />
            <Route
              path="/reset-password/:resetToken"
              element={
                !authUser ? <ResetPasswordPage /> : <Navigate to="/dashboard" />
              }
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
              path="/create-blog-with-ai"
              element={
                authUser ? <CreateBlogWithAi /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/edit-blog/:blogId"
              element={authUser ? <CreateBlogPage /> : <Navigate to="/login" />}
            />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>

        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </Background>
  );
};

export default App;
