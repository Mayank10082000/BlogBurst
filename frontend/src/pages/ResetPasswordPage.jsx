import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2, Lock, EyeOff, Eye, ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const { resetToken } = useParams();
  const navigate = useNavigate();
  const { resetPassword, isResetPassword } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    // Check if any field is empty
    if (!formData.newPassword || !formData.confirmNewPassword) {
      return toast.error("Please fill all fields");
    }

    // Check password length
    if (formData.newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters long");
    }

    // Check password match
    if (formData.newPassword !== formData.confirmNewPassword) {
      return toast.error("Passwords do not match");
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = validateForm();
    if (success === true) {
      const resetSuccess = await resetPassword({
        resetToken,
        newPassword: formData.newPassword,
        confirmNewPassword: formData.confirmNewPassword,
      });

      if (resetSuccess) {
        navigate("/login");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px)] px-4 py-8">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Reset Password
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Enter your new password
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full pl-10 p-2.5"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm New Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="confirmNewPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmNewPassword}
                  onChange={handleChange}
                  placeholder="Confirm your new password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full pl-10 p-2.5"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isResetPassword}
              className="w-full bg-black hover:bg-gray-800 text-white font-medium rounded-lg py-3 px-4 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              {isResetPassword ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Resetting Password...
                </div>
              ) : (
                "Reset Password"
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
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
