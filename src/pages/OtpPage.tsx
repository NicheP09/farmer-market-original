import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const OtpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // email is passed from ForgotPassword via navigate("/otppage", { state: { email } })
  const email = location.state?.email || "your email";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp.trim()) {
      setError("Please enter your OTP.");
      return;
    }

    if (otp.length < 6) {
      setError("OTP must be at least 6 digits.");
      return;
    }

   navigate("/buyerdashboard")

    

    
  };

  //  Helper to ensure only numeric input
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // remove non-digits
    if (value.length <= 6) setOtp(value);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-light px-6">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-center text-xl font-bold text-green-btn mb-4">
          Verify OTP
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          We've sent a verification code to{" "}
          <span className="font-semibold">{email}</span>
        </p>

        <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={handleOtpChange}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm text-center tracking-widest focus:ring-2 focus:ring-green-500 outline-none"
          />

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-2 rounded-md border border-red-200">
              {error}
            </div>
          )}
         
          <button
            type="submit"
           
            className="bg-green-btn text-white font-medium text-sm px-6 py-2.5 rounded-md hover:bg-green-dark transition duration-300 disabled:opacity-60"
          >
           Send
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Didn't get the code?{" "}
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="text-green-btn font-medium hover:text-green-700"
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default OtpPage;
