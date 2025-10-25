// SupportPage.tsx
import { useState } from "react";
import { useFarmerContext } from "../context/FarmerContext";
import { useNavigate } from "react-router-dom";
import backIcon from "../assets/arrow-icon.svg";
import { api } from "../utils/api";
import Navbar from "../components/Navbar";

const SupportPage: React.FC = () => {
  const { role } = useFarmerContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleBack = () => {
    if (role === "farmer") navigate("/farmerdashboardnew");
    else if (role === "buyer") navigate("/buyerdashboard");
    else if (role === "logistics") navigate("/logisticsdashboard");
    else navigate("/");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setFeedback("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      await api.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/support`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setFeedback("Your support request has been submitted ✅");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      setFeedback(
        err.response?.data?.message || "Failed to submit request. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-[94px] bg-pri p-6 md:p-12 font-dm-sans">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 md:p-10">
          {/* Back + Title */}
          <div className="flex items-center mb-6">
            <button onClick={handleBack} className="mr-4">
              <img
                src={backIcon}
                alt="Back"
                className="w-6 h-6 hover:opacity-70 transition"
              />
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-green-700">
              Support
            </h1>
          </div>

          {/* FAQs */}
          <section className="mb-8">
            <h2 className="text-green-600 font-semibold text-lg mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              <div className="border border-green-200 rounded-md p-3 bg-green-400">
                <p className="font-medium">How do I reset my password?</p>
                <p className="text-sm text-gray-700">
                  Go to the login page and click "Forgot Password" to reset it
                  via your email.
                </p>
              </div>
              <div className="border border-green-200 rounded-md p-3 bg-green-400">
                <p className="font-medium">
                  How do I update my account information?
                </p>
                <p className="text-sm text-gray-700">
                  Visit the Settings page from your dashboard to update your
                  profile and password.
                </p>
              </div>
              <div className="border border-green-200 rounded-md p-3 bg-green-400">
                <p className="font-medium">
                  How do I contact a farmer or buyer?
                </p>
                <p className="text-sm text-gray-700">
                  You can message them directly via the platform once your
                  account is verified.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section>
            <h2 className="text-green-600 font-semibold text-lg mb-4">
              Submit a Support Request
            </h2>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="p-2 border rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none md:col-span-1"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="p-2 border rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none md:col-span-1"
              />

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="p-2 border rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none md:col-span-2"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your issue..."
                rows={4}
                className="p-2 border rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none md:col-span-2"
              />

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`md:col-span-2 py-2 rounded-md text-white font-medium transition ${
                  loading
                    ? "bg-green-300 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>

              {/* Feedback */}
              {feedback && (
                <p
                  className={`md:col-span-2 mt-2 text-sm ${
                    feedback.includes("✅") ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {feedback}
                </p>
              )}
            </form>
          </section>
        </div>
      </div>
    </>
  );
};

export default SupportPage;
