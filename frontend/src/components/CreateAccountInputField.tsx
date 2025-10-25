import { useState } from "react";
import axios from "axios";
import { api } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import backIcon from "../assets/arrow-icon.svg";
import { useFarmerContext } from "../context/FarmerContext";

type AuthenticateForm = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
};

type InputProps = {
  name: keyof AuthenticateForm;
  label: string;
  type: string;
  value: string | boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPasswordToggle?: boolean;
};

const InputField = ({
  name,
  label,
  type,
  value,
  onChange,
  showPasswordToggle,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-1 relative">
      <label htmlFor={name} className="font-medium text-gray-700 text-base py-2">
        {label}
      </label>
      <input
        type={showPasswordToggle && showPassword ? "text" : type}
        name={name}
        placeholder={`Enter ${label}`}
        value={typeof value === "string" ? value : ""}
        onChange={onChange}
        required
        className="w-full border border-gray-300 text-base rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition pr-10"
      />
      {showPasswordToggle && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-13 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
};

function CreateAccountInputField() {
  const navigate = useNavigate();
  const { setUserName, setPhone, setRole } = useFarmerContext();

  const [formData, setFormData] = useState<AuthenticateForm>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [loading, setLoading] = useState(false);
  const [formInputError, setFormInputError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formInputError) setFormInputError(null);
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const showError = (message: string) => setFormInputError(message);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormInputError(null);

    // ✅ Basic validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phoneNumber ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return showError("All fields are required!");
    }

    if (!formData.agreeToTerms) {
      return showError("You must accept the Terms of Use!");
    }

    if (formData.password.length < 6) {
      return showError("Password must be at least 6 characters.");
    }

    if (formData.password !== formData.confirmPassword) {
      return showError("Passwords do not match!");
    }

    if (!/^\d{10,15}$/.test(formData.phoneNumber)) {
      return showError("Phone number must be 10–15 digits.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return showError("Please enter a valid email address.");
    }

    try {
      setLoading(true);

      // ✅ Include farmer role explicitly
      const payload = {
        ...formData,
        role: "farmer",
      };

      const response = await api.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/register/farmer`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ Registration success:", response.data);

      // ✅ Persist details
      setUserName(formData.firstName);
      setPhone(formData.phoneNumber);
      setRole("farmer");

      localStorage.setItem("userName", formData.firstName);
      localStorage.setItem("phone", formData.phoneNumber);
      localStorage.setItem("role", "farmer");

      // ✅ Redirect to next setup page
      navigate("/businessdetails");

      // ✅ Reset form
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
      });
    } catch (error: any) {
      if (axios.isAxiosError<{ message: string }>(error)) {
        showError(error.response?.data?.message || "Server error occurred");
      } else {
        showError("Unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4  bg-white rounded-lg">
      {/* Header */}
      <div className="relative flex items-center mb-3 pt-4">
        <Link to="/signuphome">
          <img
            src={backIcon}
            alt="Back"
            className="w-6 absolute -left-4 top-5 hover:opacity-50 transition"
          />
        </Link>
        <h1 className="text-green-btn font-bold text-xl ml-6">
          Create Farmer Account
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-">
        <InputField
          name="firstName"
          label="First Name"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
        />
        <InputField
          name="lastName"
          label="Last Name"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
        />
        <InputField
          name="phoneNumber"
          label="Phone Number"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <InputField
          name="email"
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          showPasswordToggle
        />
        <InputField
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          showPasswordToggle
        />

        <div className="flex items-center gap-2 mt-2 text-sm py-2">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="accent-green-600 w-4 h-4"
          />
          <span>
            I agree to the{" "}
            <span className="text-green-600 cursor-pointer hover:underline">
              Terms of Use
            </span>
          </span>
        </div>

        {formInputError && (
          <div className="text-red-500 text-[14px] bg-red-100 border border-red-300 px-3 py-1 rounded">
            {formInputError}
          </div>
        )}

        <div className="flex gap-3 py-3">
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#20B658] hover:bg-green-700"
            } text-white font-medium text-sm py-3 rounded-md transition duration-300`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>

        <p className="text-center text-sm ">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-green-600 font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}

export default CreateAccountInputField;
