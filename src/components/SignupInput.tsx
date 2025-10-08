import { useState } from "react";
import bgImage from "../assets/Rectangle 28.png";
import logo from "../assets/Asset 10.png";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

const SigninPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://your-api-endpoint.com/api/login", form);
      console.log("Login successful:", response.data);
      // Redirect or store token
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light font-dm-sans min-h-screen w-full flex flex-col md:grid md:grid-cols-[1fr_1.2fr] md:gap-2 max-w-5xl mx-auto">
      {/* Left Section - Image + Logo */}
      <div
        className="relative h-56 md:h-auto bg-cover bg-no-repeat bg-[position:20%_40%]"
        style={{ backgroundImage: `url(${bgImage})` }}
        role="img"
        aria-label="African farmer harvesting fresh vegetables in a field"
      >
        <a href="/" aria-label="FarmMarket Home">
          <img
            src={logo}
            className="absolute top-4 sm:top-10 left-4 w-24 sm:w-28 md:w-36 object-contain"
            alt="FarmMarket Logo"
          />
        </a>
      </div>

      {/* Right Section - Sign In Form */}
      <div className="flex flex-col justify-center py-10 md:pr-5 px-8 md:px-12">
        <div className="w-full max-w-lg mx-auto">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
            Welcome Back 👋
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Forgot Password */}
              <div className="text-right mt-2">
                <Link
                  to="/forgot-password"
                  className="text-sm text-green-700 hover:text-green-800 font-medium transition-colors duration-200"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl shadow-sm transition disabled:opacity-70"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/create-account"
              className="text-green-700 font-medium hover:text-green-800 transition-colors"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
