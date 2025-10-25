// SystemPage.tsx
import { useEffect, useState } from "react";
import { useFarmerContext } from "../context/FarmerContext";
import { useNavigate } from "react-router-dom";
import backIcon from "../assets/arrow-icon.svg";
import { api } from "../utils/api";
import Navbar from "../components/Navbar";

interface SystemMetrics {
  totalUsers: number;
  activeFarmers: number;
  activeBuyers: number;
  ordersToday: number;
}

const SystemPage: React.FC = () => {
  const { role } = useFarmerContext();
  const navigate = useNavigate();

  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Navigate back to dashboard
  const handleBack = () => {
    if (role === "farmer") navigate("/farmerdashboardnew");
    else if (role === "buyer") navigate("/buyerdashboard");
    else if (role === "logistics") navigate("/logisticsdashboard");
    else navigate("/");
  };

  // Fetch system metrics from backend
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await api.get<SystemMetrics>(
          `${import.meta.env.VITE_API_BASE_URL}/api/system/metrics`
        );
        setMetrics(response.data);
      } catch (err: any) {
        setError("Failed to load system metrics");
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-[94px] bg-pri p-6 md:p-12 font-dm-sans">
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6 md:p-10">
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
              System Overview
            </h1>
          </div>

          {/* Metrics */}
          {loading ? (
            <p className="text-green-600">Loading metrics...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : metrics ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-4 bg-green-400 rounded-lg border border-green-200 text-center">
                <p className="text-gray-700 font-medium">Total Users</p>
                <p className="text-2xl font-bold text-green-700">
                  {metrics.totalUsers}
                </p>
              </div>
              <div className="p-4 bg-green-400 rounded-lg border border-green-200 text-center">
                <p className="text-gray-700 font-medium">Active Farmers</p>
                <p className="text-2xl font-bold text-green-700">
                  {metrics.activeFarmers}
                </p>
              </div>
              <div className="p-4 bg-green-400 rounded-lg border border-green-200 text-center">
                <p className="text-gray-700 font-medium">Active Buyers</p>
                <p className="text-2xl font-bold text-green-700">
                  {metrics.activeBuyers}
                </p>
              </div>
              <div className="p-4 bg-green-400 rounded-lg border border-green-200 text-center">
                <p className="text-gray-700 font-medium">Orders Today</p>
                <p className="text-2xl font-bold text-green-700">
                  {metrics.ordersToday}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-700">No metrics available.</p>
          )}

          {/* System Logs (example) */}
          <section className="mt-8">
            <h2 className="text-green-600 font-semibold text-lg mb-4">
              Recent System Logs
            </h2>
            <div className="max-h-64 overflow-y-auto border border-green-200 rounded-lg bg-green-400 p-4">
              <ul className="space-y-2 text-sm text-gray-700">
                <li>10:30 AM - Farmer John registered a new crop listing.</li>
                <li>
                  10:45 AM - Buyer Jane placed an order for 20kg tomatoes.
                </li>
                <li>11:00 AM - System backup completed successfully.</li>
                <li>11:15 AM - New buyer account created: Mike.</li>
                <li>11:30 AM - Order #1234 marked as delivered.</li>
                {/* You can map real logs here */}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default SystemPage;
