import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import backIcon from "../assets/arrow-icon.svg";
import dp from "../assets/dp.png";

type AuthCredentials = {
  email: string;
  password: string;
};

const SignInput = () => {
  const [formData, setFormData] = useState<AuthCredentials>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://farmer-backend.vercel.app/api/auth/signin",
        formData
      );
      console.log(res.data);
      navigate("/dashboard");
    } catch (error: any) {
      console.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.email && formData.password;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Left Section */}
      <div className="flex flex-col justify-center items-center bg-green-btn text-white md:w-1/2 px-6 py-10 md:rounded-l-2xl">
        <img src={dp} alt="Logo" className="w-32 mb-6" />
        <h1 className="text-3xl font-semibold mb-4">Welcome Back!</h1>
        <p className="text-center text-white/90 mb-6">
          Sign in to continue managing your farm operations and sales.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex justify-center items-center px-6 sm:px-10 py-10 md:py-0 bg-white md:w-1/2 md:rounded-r-2xl relative overflow-y-auto">
        <div className="w-full max-w-md">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-5 left-5 flex items-center space-x-2 text-gray-600 hover:text-green-600 transition"
          >
            <img src={backIcon} alt="Back" className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </button>

          <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-gray-700 text-sm mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full border border-gray-300 rounded-md p-2.5 focus:outline-none focus:ring-2 focus:ring-green-btn"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-gray-700 text-sm mb-2">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full border border-gray-300 rounded-md p-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-green-btn"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Sticky Submit Button */}
            <div className="sticky bottom-0 bg-white pt-3 pb-3 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading || !isFormValid}
                className={`w-full py-2.5 rounded-md font-medium text-white transition ${
                  loading || !isFormValid
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-green-btn hover:bg-green-dark"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>

            {/* Footer Links */}
            <p className="text-center text-sm text-gray-600 mt-6">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-green-btn font-medium hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInput;
