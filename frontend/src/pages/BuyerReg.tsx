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
  const { setPhone, setUserName, setRole } = useFarmerContext();
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

  // Auto-dismiss toast
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Handle input change
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

  // Password strength
  const getPasswordStrength = (password: string) => {
    if (password.length < 6) return "Weak";
    if (/[A-Z]/.test(password) && /\d/.test(password)) return "Strong";
    return "Medium";
  };

  // Validation
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

  // Form validity
  const isFormValid =
    form.fullName &&
    /^\d{10,15}$/.test(form.phoneNumber) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.password.length >= 6 &&
    form.password === form.confirmPassword &&
    form.state &&
    form.lga &&
    form.agreeToTerms;

  // ✅ Submit (fixed with role persistence)
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
        state: form.state,
        lga: form.lga,
        businessName: form.businessName || null,
        businessType: form.businessType || null,
        agreeToTerms: form.agreeToTerms,
        role: "buyer", // ✅ explicitly tell backend this is a buyer
      };

      const response = await api.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/register/buyer`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage(response.data.message || "Account created successfully 🎉");

      // ✅ Persist buyer info in context + localStorage
      setPhone(form.phoneNumber);
      setUserName(form.fullName);
      setRole("buyer");
      localStorage.setItem("role", "buyer");
      localStorage.setItem("userName", form.fullName);
      localStorage.setItem("phone", form.phoneNumber);

      setTimeout(() => navigate("/verificationcode"), 1500);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Backend error:", error.response.data);
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
     <div className="bg-light font-dm-sans min-h-screen w-full flex flex-col md:grid md:grid-cols-[1fr_1.2fr] max-w-7xl mx-auto ">
      {/* ✅ Left Section - Hero Image */}
      <div
        className="relative flex flex-col justify-between bg-cover bg-center min-h-[30vh] md:min-h-screen"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <a href="/" aria-label="FarmMarket Home">
          <img
            src={logo}
            alt="FarmMarket Logo"
            className="absolute top-4 left-4 sm:top-8 sm:left-8 w-24 sm:w-32 md:w-40 object-contain"
          />
        </a>

        <div className="bg-black/40 text-white p-6 sm:p-10 md:p-12 mt-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            Welcome, Future Buyer!
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed max-w-sm">
            Connect directly with trusted farmers and access the best produce
            prices nationwide.
          </p>
        </div>
      </div>

      {/* ✅ Right Section - Form */}
      <div className="flex items-center justify-center bg-white px-6 sm:px-10 md:px-12 py-10 md:py-0 overflow-hidden">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="relative flex items-center mb-4">
            <Link to="/signuphome">
              <img
                src={backIcon}
                alt="Back"
                className="w-6 absolute -left-4 md:-left-8 top-0 sm:top-1 hover:opacity-50 transition"
              />
            </Link>
            <h2 className="text-green-btn text-xl sm:text-2xl font-bold ml-6">
              Create Buyer Account
            </h2>
          </div>

          
          {/* Form (unchanged) */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[12px]s">
            {/* Full Name, Phone, Email */}
            {[
              { label: "Full Name", name: "fullName", type: "text", span: 2 },
              { label: "Phone Number", name: "phoneNumber", type: "tel" },
              { label: "Email", name: "email", type: "email" },
            ].map(({ label, name, type, span }) => (
              <div key={name} className={span === 2 ? "sm:col-span-2" : ""}>
                <label className="block text-base font-medium">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={(form as any)[name]}
                  onChange={handleChange}
                  placeholder={`Enter your ${label.toLowerCase()}`}
                  className={`w-full mt-1 p-2 border text-[14px] rounded-md focus:ring-2 ${
                    fieldErrors[name]
                      ? "border-red-500 focus:ring-red-400"
                      : "focus:ring-green-btn"
                  }`}
                />
                {fieldErrors[name] && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors[name]}</p>
                )}
              </div>
            ))}

            {/* Password */}
            <div className="sm:col-span-2 relative">
              <label className="block text-base font-medium">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                className={`w-full mt-1 p-2 border rounded-md pr-10 focus:ring-2 ${
                  fieldErrors.password
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-green-btn"
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
              <label className="block text-base font-medium">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className={`w-full mt-1 p-2 border text-[14px] rounded-md pr-10 focus:ring-2 ${
                  fieldErrors.confirmPassword
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-green-btn"
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
              <label className="block text-base font-medium">State</label>
              <select
                name="state"
                value={form.state}
                onChange={handleChange}
                className={`w-full mt-1 text-[14px]  p-2 border rounded-md focus:ring-2 ${
                  fieldErrors.state
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-green-btn"
                }`}
              >
                <option value="">Select State</option>
                <option value="lagos">Lagos</option>
                <option value="abuja">Abuja</option>
              </select>
            </div>
            <div>
              <label className="block text-base font-medium">LGA</label>
              <select
                name="lga"
                value={form.lga}
                onChange={handleChange}
                className={`w-full mt-1 text-[14px]  p-2 border rounded-md focus:ring-2 ${
                  fieldErrors.lga
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-green-btn"
                }`}
              >
                <option value="">Select LGA</option>
                <option value="ikeja">Ikeja</option>
                <option value="garki">Garki</option>
              </select>
            </div>

            {/* Business Fields */}
            <div>
              <label className="block text-base font-medium">
                Business Name <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="text"
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                placeholder="Enter your business name"
                className="w-full text-[14px] mt-1 p-2 border rounded-md focus:ring-2 focus:ring-green-btn"
              />
            </div>
            <div>
              <label className="block text-base font-medium">
                Business Type <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="text"
                name="businessType"
                value={form.businessType}
                onChange={handleChange}
                placeholder="Enter your business type"
                className="w-full text-[14px] mt-1 p-2 border rounded-md focus:ring-2 focus:ring-green-btn"
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
              <label className="text-[14px] text-gray-700">
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

            {/* Submit Button */}
            <div className="sm:col-span-2 mt-4">
              <button
                type="submit"
                disabled={loading || !isFormValid}
                className={`w-full py-2 rounded-md font-medium text-white text-[14px] transition-all duration-200 
                  ${
                    loading || !isFormValid
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
                    <span className="text-[14px]">Registering...</span>
                  </div>
                ) : (
                  "Register"
                )}
              </button>
            </div>

            {/* Feedback Toast */}
            {message && (
              <div
                className={`sm:col-span-2 mt-3 px-4 py-2 rounded-md text-center text-[14px] transition ${
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
