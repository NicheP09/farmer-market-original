import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../utils/api";
import { Eye, EyeOff } from "lucide-react";
import backIcon from "../assets/arrow-icon.svg";

type AuthCredentials = {
  email: string;
  password: string;
};

const SignInput = () => {
  const [formData, setFormData] = useState<AuthCredentials>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const showError = (message: string) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  };

  const showSuccess = (message: string) => {
    setSuccess(message);
    setTimeout(() => setSuccess(null), 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      showError("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const response = await api.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/login`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      const data = response.data;
      localStorage.setItem("token", data.token);
      showSuccess("Signed in successfully!");
      navigate("/buyerdashboard");
      setFormData({ email: "", password: "" });
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        showError(err.response.data.message || "Login failed");
      } else {
        showError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 md:mt-0 flex flex-col h-full">
      {/* Header */}
      <div className="relative mb-8 flex items-center">
        <Link
          to="/"
          className="absolute -left-4 md:-left-8 hover:opacity-70 transition"
        >
          <img src={backIcon} className="w-6" alt="Go back" />
        </Link>
        <h1 className="text-green-btn font-bold text-lg sm:text-xl text-center w-full">
          Sign in to your Account
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-gray-500 hover:text-gray-700 transition"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right mt-2">
            <Link
              to="/forgot"
              className="text-sm text-green-btn font-medium hover:text-green-700 transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        {/* Feedback messages */}
        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-2 rounded-md border border-red-200">
            {error}
          </div>
        )}
        {success && (
          <div className="text-green-700 text-sm bg-green-50 p-2 rounded-md border border-green-200">
            {success}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-btn text-white font-medium text-sm px-6 py-2.5 rounded-md hover:bg-green-dark transition duration-300 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {/* Signup Text */}
        <p className="text-center text-sm text-gray-600 mt-3">
          Don’t have an account?{" "}
          <Link
            to="/signuphome"
            className="text-green-btn font-medium hover:text-green-700 transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignInput;
