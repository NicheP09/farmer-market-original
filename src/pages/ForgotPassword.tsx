import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import backIcon from "../assets/arrow-icon.svg";
import bgImage from "../assets/Rectangle 28.png";
import logo from "../assets/Asset 10.png";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Please enter your email address.");
      setTimeout(() => setError(null), 4000);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setMessage(null);

      const res = await axios.post(
        "http://localhost:3500/api/users/forgot-password",
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      // ✅ Make sure navigation always triggers when OTP is sent
      if (
        res.data.success === true ||
        res.data.message?.toLowerCase().includes("otp sent")
      ) {
        setMessage("OTP sent successfully. Redirecting...");
        setTimeout(() => navigate("/otppage"), 1000);
      } else {
        setError(res.data.message || "Email not found. Please try again.");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Verification failed.");
      } else {
        setError("Something went wrong. Try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light font-dm-sans min-h-screen w-full flex flex-col md:grid md:grid-cols-[1fr_1.2fr] md:gap-2 max-w-5xl mx-auto">
      {/* Left Section */}
      <div
        className="relative h-56 md:h-auto bg-cover bg-no-repeat bg-[position:20%_40%]"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <a href="/">
          <img
            src={logo}
            className="absolute top-4 sm:top-10 left-4 w-24 sm:w-28 md:w-36 object-contain"
            alt="FarmMarket Logo"
          />
        </a>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center py-10 md:pr-5 px-8 md:px-12">
        <div className="w-full max-w-lg mx-auto">
          <div className="relative mb-8 flex items-center">
            <Link
              to="/signin"
              className="absolute -left-4 md:-left-8hover:opacity-70 transition"
            >
              <img src={backIcon} className="w-6" alt="Back" />
            </Link>
            <h1 className="text-green-btn font-bold text-lg sm:text-xl text-center w-full">
              Forgot Password
            </h1>
          </div>

          <p className="text-gray-600 text-sm mb-6 text-center">
            Enter your email to verify your account and receive an OTP.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-2 rounded-md border border-red-200">
                {error}
              </div>
            )}
            {message && (
              <div className="text-green-700 text-sm bg-green-50 p-2 rounded-md border border-green-200">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-green-btn text-white font-medium text-sm px-6 py-2.5 rounded-md hover:bg-green-dark transition duration-300 disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Remember your password?{" "}
            <Link
              to="/signin"
              className="text-green-btn font-medium hover:text-green-700 transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
