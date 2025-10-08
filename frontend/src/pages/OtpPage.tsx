
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const OtpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // email passed from ForgotPassword (if available)
  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Base API URL
  const baseURL =
    import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ||
    "https://farmer-market-1.vercel.app";

  // ✅ Verify OTP and reset password
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !otp.trim() || !newPassword.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must be exactly 6 digits.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setMessage(null);

      const res = await axios.post(
        `${baseURL}/api/users/reset-password`,
        { email, otp, newPassword },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success === true) {
        setMessage("✅ Password reset successful! Redirecting to Sign In...");
        setTimeout(() => navigate("/signin"), 2000);
      } else {
        setError(res.data.message || "Invalid OTP or email.");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.message || "Reset failed.");
      } else {
        setError("Something went wrong. Try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (!email.trim()) {
      setError("Please enter your email address first.");
      return;
    }

    try {
      setResending(true);
      setError(null);
      setMessage(null);
   

      const res = await axios.post(
       `${import.meta.env.VITE_API_BASE_URL}/api/users/forgot-password`,
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      if (
        res.data.success === true ||
        res.data.message?.toLowerCase().includes("otp sent")
      ) {
        setMessage("✅ OTP resent successfully!");
      } else {
        setError(res.data.message || "Failed to resend OTP.");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data?.message || "Could not resend OTP.");
      } else {
        setError("Something went wrong while resending OTP.");
      }
    } finally {
      setResending(false);
    }
  };

  // ✅ Helper for numeric-only OTP input
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // only numbers
    if (value.length <= 6) setOtp(value);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-light px-6">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-center text-xl font-bold text-green-btn mb-4">
          Reset Password
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Enter your email, OTP, and new password to reset your account.
        </p>

        <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* OTP */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              OTP
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={handleOtpChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full text-center tracking-widest focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Error or Success Message */}
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
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {/* Resend OTP */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Didn’t get the OTP?{" "}
          <button
            type="button"
            disabled={resending}
            onClick={handleResendOtp}
            className="text-green-btn font-medium hover:text-green-700 disabled:opacity-60"
          >
            {resending ? "Resending..." : "Resend OTP"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default OtpPage;
