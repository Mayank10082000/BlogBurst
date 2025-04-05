import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2, Mail, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const { forgotPassword, isForgotPassword } = useAuthStore();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = () => {
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return false;
    }

    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail()) return;

    // Call the forgotPassword function from the auth store
    const success = await forgotPassword({ email });

    if (success) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px)] px-4 py-8">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-8">
          {!isSubmitted ? (
            <>
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
                Forgot Password ?
              </h2>
              <p className="text-center text-gray-600 mb-8">
                Enter your email address to receive a password reset link
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      value={email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full pl-10 p-2.5"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isForgotPassword}
                  className="w-full bg-black hover:bg-gray-800 text-white font-medium rounded-lg py-3 px-4 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  {isForgotPassword ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="animate-spin mr-2 h-5 w-5" />
                      Sending...
                    </div>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>

                {/* Back to Login Link */}
                <div className="mt-4">
                  <Link
                    to="/login"
                    className="flex items-center justify-center text-sm font-medium text-black hover:underline"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Login
                  </Link>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Check Your Email
              </h2>
              <p className="text-gray-600 mb-6">
                We've sent a password reset link to:
              </p>
              <p className="text-lg font-medium text-blue-900 mb-8">{email}</p>
              <p className="text-gray-600 mb-6">
                Please check your inbox and follow the instructions in the email
                to reset your password.
              </p>
              <div className="mt-6 flex flex-col space-y-3">
                <button
                  onClick={() => navigate("/login")}
                  className="w-full bg-black hover:bg-gray-800 text-white font-medium rounded-lg py-3 px-4 transition-colors"
                >
                  Return to Login
                </button>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setEmail("");
                  }}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg py-3 px-4 transition-colors"
                >
                  Try Another Email
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
