import logo from "../assets/Asset 9.png";
import dp from "../assets/dp.png";
import back from "../assets/arrow-icon.svg";
import processingImg from "../assets/Rectangle 31.png";
import sentOutImg from "../assets/truck.png";
import deliveredImg from "../assets/person-delivery.png";
import { Bell, Settings } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFarmerContext } from "../context/FarmerContext";

const OrderTracking: React.FC = () => {
  const{userName} =  useFarmerContext();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications] = useState(3);
  const [trackingId, setTrackingId] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleTracking = () => {
    if (!trackingId) return alert("Please enter a tracking ID");

    switch (trackingId) {
      case "12345":
        setStatus("Processing");
        break;
      case "67890":
        setStatus("Sent Out");
        break;
      case "11111":
        setStatus("Delivered");
        break;
      default:
        setStatus("Invalid ID");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-light font-dm-sans  max-h-[100vh] text-gray-800">
      {/* === Header === */}
      <header
        className=" bg-pri text-white px-6 py-4 shadow-md cursor-pointer
   
      "
      >
        <div className="flex items-center justify-between max-w-[1100px] flex-shrink-0   m-auto">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="w-40 md:w-48 object-contain"
            />
          </Link>

          <div className="flex items-center gap-5 relative">
            {/* Notification */}
            <button className="relative hover:text-yellow-300 transition">
              <Bell className="w-6 h-6" />
              {notifications > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {notifications}
                </span>
              )}
            </button>

            {/* Settings */}
            <button className="hover:text-yellow-300 transition">
              <Settings className="w-6 h-6" />
            </button>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 hover:text-yellow-300 transition"
              >
                <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={dp}
                    alt="User"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium leading-tight">
                   {userName}
                  </p>
                  <p className="text-xs text-gray-200">Customer</p>
                </div>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-44 bg-white text-gray-700 rounded-lg shadow-lg py-2 z-50 animate-fadeIn">
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                    Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                    Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* === Main Content === */}
      <main
        className="flex-1 flex flex-col justify-center items-center relative px-4 sm:px-10 overflow-hidden  min-w-md
      "
      >
        {/* Back Button */}
        <Link
          to="/buyerdashboard"
          className="absolute top-5 left-5 hover:opacity-70 transition"
        >
          <img src={back} alt="Back" className="w-7" />
        </Link>

        <div
          className="bg-[#F6F9F6] shadow-md w-full max-w-[1000px]
         p-8
         rounded-2xl
        "
        >
          <div
            className="
        flex flex-col items-center gap-6"
          >
            {/* Input Section */}
            <div className="w-full bg-green-f rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-semibold text-green-800 text-center mb-1">
                Track Your Product
              </h2>
              <p className="text-sm text-gray-600 text-center mb-4">
                Please enter your tracking ID
              </p>

              <div className="relative flex items-center bg-white rounded-lg shadow-sm overflow-hidden">
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="Tracking ID"
                  className="flex-1 px-4 py-3 text-gray-700 focus:outline-none"
                />
                <button
                  onClick={handleTracking}
                  className="absolute right-3 bg-green-f hover:bg-green-dark text-white px-3 py-1.5 rounded transition"
                >
                  ▶
                </button>
              </div>
            </div>

            {/* Status Steps */}
            <div
              className="w-full
            py-6 px-4 md:px-8 "
            >
              <h3 className="text-center text-lg md:text-2xl font-semibold text-[#09392D] mb-6">
                At Your Doorstep in Three Easy Steps
              </h3>

              <div
                className="flex justify-between items-center gap-3 md:gap-6 flex-wrap md:flex-nowrap
            "
              >
                {/* Step 1 */}
                <div
                  className={`flex flex-col items-center flex-1 min-w-[100px] sm:min-w-[150px] p-3 rounded-lg transition ${
                    status === "Processing" ? "border-2 border-yellow-400" : ""
                  }`}
                >
                  <img
                    src={processingImg}
                    alt="Processing"
                    className="w-24 h-24 object-contain mb-3"
                  />
                  <p className="font-medium text-sm sm:text-base">Processing</p>
                </div>

                {/* Step 2 */}
                <div
                  className={`flex flex-col items-center flex-1 min-w-[100px] sm:min-w-[150px] p-3 rounded-lg transition ${
                    status === "Sent Out" ? "border-2 border-blue-400" : ""
                  }`}
                >
                  <img
                    src={sentOutImg}
                    alt="Sent Out"
                    className="w-24 h-24 object-contain mb-3"
                  />
                  <p className="font-medium text-sm sm:text-base">Sent Out</p>
                </div>

                {/* Step 3 */}
                <div
                  className={`flex flex-col items-center flex-1 min-w-[100px] sm:min-w-[150px] p-3 rounded-lg transition ${
                    status === "Delivered" ? "border-2 border-green-400" : ""
                  }`}
                >
                  <img
                    src={deliveredImg}
                    alt="Delivered"
                    className="w-24 h-24 object-contain mb-3"
                  />
                  <p className="font-medium text-sm sm:text-base">Delivered</p>
                </div>
              </div>

              {status === "Invalid ID" && (
                <p className="mt-4 text-center text-red-600 font-medium animate-pulse">
                  Invalid tracking ID
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderTracking;