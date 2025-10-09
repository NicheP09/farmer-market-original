import { useState, useRef } from "react";
import logo from "../assets/Asset 2.png";
import { useNavigate } from "react-router-dom";
import { useFarmerContext } from "../context/FarmerContext";

const VerificationCode = () => {
  const { phone } = useFarmerContext();
  const navigateCancel = useNavigate();
  const navigateVerify = useNavigate();

  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [active, setActive] = useState("verify");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Handle input change
  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < code.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Submit verification code
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalCode = code.join("");

    if (finalCode.length !== 6) {
      setError("Please enter all 6 digits.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      // Simulate successful verification
      setSuccess("Code verified successfully!");
      navigateVerify("/successpage");
    } catch (err: any) {
      setError(err.message || "Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Cancel button handler
  const cancelHandle = () => {
    setActive("cancel");
    navigateCancel("/buyerreg");
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <img src={logo} className="h-10 md:h-14 object-contain" alt="Logo" />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-green-btn mb-2">
          Enter Verification Code
        </h1>
        <p className="text-gray-600 mb-6">
          A 6-digit code has been sent via SMS to{" "}
          <span className="font-medium">+234 {phone}</span>
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-6"
        >
          {/* Code Inputs */}
          <div className="flex gap-3 justify-center">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 md:w-14 md:h-14 text-center text-xl font-semibold border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
              />
            ))}
          </div>

          {/* Resend code */}
          <p className="text-gray-600 text-sm">
            Didn't get a code?{" "}
            <button
              type="button"
              onClick={() => console.log("Code resent")}
              className="text-green-600 font-medium hover:underline"
            >
              Click to resend
            </button>
          </p>

          {/* Error / Success messages */}
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          {/* Action buttons */}
          <div className="flex gap-4 mt-4 w-full justify-center">
            <button
              type="button"
              onClick={cancelHandle}
              className={`px-10 py-1 rounded-md border-2 border-green-btn font-medium shadow transition ${
                active === "cancel"
                  ? "bg-green-btn text-white"
                  : "text-black hover:bg-green-btn hover:text-white"
              }`}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              onClick={() => setActive("verify")}
              className={`px-10 py-1 rounded-md border-2 border-green-btn font-medium shadow transition ${
                active === "verify"
                  ? "bg-green-btn text-white"
                  : "text-black hover:bg-green-btn hover:text-white"
              } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerificationCode;
