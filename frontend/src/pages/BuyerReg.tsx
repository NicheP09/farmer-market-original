import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../assets/woman-farm.png";
import logo from "../assets/Logo 2.png";
import backIcon from "../assets/arrow-icon.svg";
import { Eye, EyeOff } from "lucide-react";
import { useFarmerContext } from "../context/FarmerContext";


const BuyerReg: React.FC = () => {
  const { setPhone, setUserName } = useFarmerContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    state: "",
    lga: "",
    businessName: "",
    businessType: "",
    agreeToTerms: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // auto-dismiss toast
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as any;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    if (message) setMessage("");
  };

  // password strength
  const getPasswordStrength = (password: string) => {
    if (password.length < 6) return "Weak";
    if (/[A-Z]/.test(password) && /\d/.test(password)) return "Strong";
    return "Medium";
  };

  // validation
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!form.fullName.trim()) errors.fullName = "Full name is required";
    if (!/^\d{10,15}$/.test(form.phoneNumber))
      errors.phoneNumber = "Enter a valid phone number (10-15 digits)";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errors.email = "Enter a valid email address";
    if (form.password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    if (!form.state) errors.state = "Please select your state";
    if (!form.lga) errors.lga = "Please select your LGA";
    if (!form.agreeToTerms)
      errors.agreeToTerms = "You must agree to the Terms of Use";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      throw new Error("Please fix the highlighted errors");
    }
  };

  // form validity
  const isFormValid =
    form.fullName &&
    /^\d{10,15}$/.test(form.phoneNumber) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.password.length >= 6 &&
    form.password === form.confirmPassword &&
    form.state &&
    form.lga &&
    form.agreeToTerms;

  // submit
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");
  setIsError(false);

  try {
    validateForm();
    const payload = {
      fullName: form.fullName,
      phoneNumber: form.phoneNumber,
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
      agreeToTerms: form.agreeToTerms,
    };

      const response = await api.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/users/register/buyer`,
      payload,
      { headers: { "Content-Type": "application/json" } }
    );

    setMessage(response.data.message || "Account created successfully 🎉");
    setPhone(form.phoneNumber);
    
    setUserName(form.fullName)
    setTimeout(() => navigate("/verificationcode"), 1500);
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        setMessage(error.response.data?.message || "Server error occurred");
      } else if (error.request) {
        setMessage("No response from server. Check your connection.");
      } else {
        setMessage("Error setting up request. Try again.");
      }
    } else if (error instanceof Error) {
      setMessage(error.message);
    } else {
      setMessage("Unexpected error. Please try again.");
    }
    setIsError(true);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="bg-light font-dm-sans min-h-screen w-full flex flex-col md:grid md:grid-cols-[1fr_1.4fr] max-w-6xl mx-auto max-h-[100vh] md:overflow-hidden">
      {/* Left Section */}
      <div
        className="relative h-40 md:h-auto bg-cover bg-center p-4 text-white"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <img src={logo} alt="FarmMarket Logo" className="w-40 md:w-36 mt-2" />
        <div className="mt-6">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">Hello, Welcome!</h1>
          <p className="text-sm md:text-base font-light">
            Please create your verified buyer account to continue.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex justify-center items-center px-6 sm:px-10 py-10 md:py-0 bg-white md:rounded-r-2xl">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="relative flex items-center mb-6">
            <Link to="/signuphome">
              <img
                src={backIcon}
                alt="Back"
                className="w-6 absolute -left-4 md:-left-8top-0 sm:top-1 hover:opacity-50"
              />
            </Link>
            <h2 className="text-green-btn text-xl sm:text-2xl font-bold ml-6">
              Create Buyer Account
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[12px]">
            {/* Full Name, Phone, Email */}
            {[
              { label: "Full Name", name: "fullName", type: "text", span: 2 },
              { label: "Phone Number", name: "phoneNumber", type: "tel" },
              { label: "Email", name: "email", type: "email" },
            ].map(({ label, name, type, span }) => (
              <div key={name} className={span === 2 ? "sm:col-span-2" : ""}>
                <label className="block text-sm font-medium">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={(form as any)[name]}
                  onChange={handleChange}
                  placeholder={`Enter your ${label.toLowerCase()}`}
                  className={`w-full mt-1 p-2 border rounded-md focus:ring-2 ${
                    fieldErrors[name] ? "border-red-500 focus:ring-red-400" : "focus:ring-green-btn"
                  }`}
                />
                {fieldErrors[name] && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors[name]}</p>
                )}
              </div>
            ))}

            {/* Password */}
            <div className="sm:col-span-2 relative">
              <label className="block text-sm font-medium">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                className={`w-full mt-1 p-2 border rounded-md pr-10 focus:ring-2 ${
                  fieldErrors.password ? "border-red-500 focus:ring-red-400" : "focus:ring-green-btn"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {form.password && (
                <p
                  className={`text-xs mt-1 ${
                    getPasswordStrength(form.password) === "Strong"
                      ? "text-green-600"
                      : getPasswordStrength(form.password) === "Medium"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  Password strength: {getPasswordStrength(form.password)}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="sm:col-span-2 relative">
              <label className="block text-sm font-medium">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className={`w-full mt-1 p-2 border rounded-md pr-10 focus:ring-2 ${
                  fieldErrors.confirmPassword ? "border-red-500 focus:ring-red-400" : "focus:ring-green-btn"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* State & LGA */}
            <div>
              <label className="block text-sm font-medium">State</label>
              <select
                name="state"
                value={form.state}
                onChange={handleChange}
                className={`w-full mt-1 p-2 border rounded-md focus:ring-2 ${
                  fieldErrors.state ? "border-red-500 focus:ring-red-400" : "focus:ring-green-btn"
                }`}
              >
                <option value="">Select State</option>
                <option value="lagos">Lagos</option>
                <option value="abuja">Abuja</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">LGA</label>
              <select
                name="lga"
                value={form.lga}
                onChange={handleChange}
                className={`w-full mt-1 p-2 border rounded-md focus:ring-2 ${
                  fieldErrors.lga ? "border-red-500 focus:ring-red-400" : "focus:ring-green-btn"
                }`}
              >
                <option value="">Select LGA</option>
                <option value="ikeja">Ikeja</option>
                <option value="garki">Garki</option>
              </select>
            </div>

            {/* Business Fields */}
            <div>
              <label className="block text-sm font-medium">
                Business Name <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="text"
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                placeholder="Enter your business name"
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-green-btn"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Business Type <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="text"
                name="businessType"
                value={form.businessType}
                onChange={handleChange}
                placeholder="Enter your business type"
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-green-btn"
              />
            </div>

            {/* Terms */}
            <div className="sm:col-span-2 flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={form.agreeToTerms}
                onChange={handleChange}
                className="w-4 h-4 border-gray-300 rounded focus:ring-green-btn"
              />
              <label className="text-sm text-gray-700">
                I agree to{" "}
                <a href="/terms" target="_blank" className="text-green-btn underline">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="/privacy" target="_blank" className="text-green-btn underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit */}
{/* Submit Button — Visible on All Screens */}
<div className="sm:col-span-2 mt-6">
  <button
    type="submit"
    disabled={loading || !isFormValid}
    className={`w-full py-3 rounded-md font-medium text-white text-base transition-all duration-200 
      ${loading || !isFormValid
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-green-btn hover:bg-green-dark active:scale-[0.98]"
      }`}
  >
    {loading ? (
      <div className="flex items-center justify-center space-x-2">
        <svg
          className="animate-spin h-5 w-5 text-white"
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
        <span>Registering...</span>
      </div>
    ) : (
      "Register"
    )}
  </button>
</div>

            {/* Feedback Toast */}
            {message && (
              <div
                className={`sm:col-span-2 mt-3 px-4 py-2 rounded-md text-center text-sm transition ${
                  isError
                    ? "bg-red-100 text-red-600 border border-red-300"
                    : "bg-green-100 text-green-700 border border-green-300"
                }`}
              >
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default BuyerReg;
