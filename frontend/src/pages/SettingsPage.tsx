// SettingsPage.tsx
import { useState } from "react";
import { useFarmerContext } from "../context/FarmerContext";
import { api } from "../utils/api";
import { useNavigate } from "react-router-dom";
import backIcon from "../assets/arrow-icon.svg";

const SettingsPage: React.FC = () => {
  const { userName, phone, setToken, setUserName, setPhone, setRole, role } = useFarmerContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: userName || "",
    phoneNumber: phone || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    notifications: true,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage("");

    try {
      const payload: any = {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
      };
      if (formData.newPassword && formData.newPassword === formData.confirmPassword) {
        payload.newPassword = formData.newPassword;
        payload.currentPassword = formData.currentPassword;
      }

      await api.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/settings`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      setUserName(formData.fullName);
      setPhone(formData.phoneNumber);
      setMessage("Settings updated successfully ✅");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken("");
    setRole("");
    localStorage.clear();
    navigate("/signin");
  };

  const handleBack = () => {
    if (role === "farmer") navigate("/farmerdashboardnew");
    else if (role === "buyer") navigate("/buyerdashboard");
    else if (role === "logistics") navigate("/logisticsdashboard");
    else navigate("/");
  };

  return (
    <div className="min-h-screen bg-green-600 p-6 md:p-12 font-dm-sans">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 md:p-10">

        {/* Back + Title */}
        <div className="flex items-center mb-6">
          <button onClick={handleBack} className="mr-4">
            <img src={backIcon} alt="Back" className="w-6 h-6 hover:opacity-70 transition" />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-green-700">Settings</h1>
        </div>

        {/* Profile Info */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-green-600 mb-3">Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="p-2 border rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="p-2 border rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>
        </section>

        {/* Password Change */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-green-600 mb-3">Change Password</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Current Password"
              className="p-2 border rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="New Password"
              className="p-2 border rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="p-2 border rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>
        </section>

        {/* Notifications */}
        <section className="mb-6 flex items-center space-x-2">
          <input
            type="checkbox"
            name="notifications"
            checked={formData.notifications}
            onChange={handleChange}
            className="w-5 h-5 accent-green-600"
          />
          <label className="text-green-700 font-medium">Receive notifications</label>
        </section>

        {/* Feedback */}
        {message && (
          <p className={`mb-4 text-sm ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={handleSave}
            disabled={loading}
            className={`flex-1 py-2 px-4 rounded-md font-medium text-white transition ${
              loading ? "bg-green-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 py-2 px-4 rounded-md font-medium text-green-700 border border-green-600 hover:bg-green-50 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
