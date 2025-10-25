// src/pages/SignInInputField.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import backIcon from "../assets/arrow-icon.svg";
import { useFarmerContext } from "../context/FarmerContext";
import { api } from "../utils/api";
import axios from "axios";

type SignInForm = {
  phoneNumber: string;
  password: string;
};

const InputField = ({
  name,
  label,
  type,
  value,
  onChange,
  showPasswordToggle,
}: {
  name: keyof SignInForm;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPasswordToggle?: boolean;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-1 relative">
      <label htmlFor={name} className="font-medium text-gray-700 py-2">
        {label}
      </label>
      <input
        type={showPasswordToggle && showPassword ? "text" : type}
        name={name}
        placeholder={`Enter ${label}`}
        value={value}
        onChange={onChange}
        required
        className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
      />
      {showPasswordToggle && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
};

const SignInInputField: React.FC = () => {
  const navigate = useNavigate();
  const { setUserName, setPhone, setRole, setToken } = useFarmerContext();

  const [formData, setFormData] = useState<SignInForm>({
    phoneNumber: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.phoneNumber || !formData.password) {
      setError("All fields are required!");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/login`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      // Assuming API returns: { token, user: { firstName, phone, role } }
      const { token, user } = response.data;

      // ✅ Update context
      setUserName(user.firstName);
      setPhone(user.phone);
      setRole(user.role);
      setToken(token);

      // ✅ Persist in localStorage
      localStorage.setItem("userName", user.firstName);
      localStorage.setItem("phone", user.phone);
      localStorage.setItem("role", user.role);
      localStorage.setItem("token", token);

      // Redirect to dashboard
      if (user.role === "farmer") navigate("/farmerdashboardnew");
      else if (user.role === "buyer") navigate("/buyerdashboard");
      else navigate("/");

    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Login failed");
      } else {
        setError("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 bg-white rounded-lg py-6">
      {/* Header */}
      <div className="relative flex items-center mb-4">
        <Link to="/signinhome">
          <img
            src={backIcon}
            alt="Back"
            className="w-6 absolute -left-4 top-2 hover:opacity-50 transition"
          />
        </Link>
        <h1 className="text-green-btn font-bold text-xl ml-6">Sign In</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputField
          name="phoneNumber"
          label="Phone Number"
          type="tel"
          value={formData.phoneNumber}
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

        {error && (
          <div className="text-red-500 bg-red-100 border border-red-300 px-3 py-1 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white font-medium py-3 rounded-md transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-btn hover:bg-green-700"
          }`}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="text-center text-sm mt-2">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-green-600 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignInInputField;
