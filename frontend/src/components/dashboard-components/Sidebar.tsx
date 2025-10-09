import { useState } from "react";
import { Send, Settings, LogOut, CircleHelp, Mail } from "lucide-react";
import { Link } from "react-router-dom";

import Logo from "../../assets/Group(1).png";
import Monitor from "../../assets/monitor-mobbile.png";
import Support from "../../assets/material-symbols-light_support-agent-outline.png";
import Group from "../../assets/Group.png";
import Track from "../../assets/solar_gps-outline.png";
import Wallet from "../../assets/solar_wallet-outline.png";
import { useFarmerContext } from "../../context/FarmerContext";


 

export default function Sidebar() {
   const{userName} =  useFarmerContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Overlay (mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white border-r border-gray-100 p-6 flex flex-col justify-between z-50 transform transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0 flex"
            : "-translate-x-full md:translate-x-0 md:flex"
        }`}
      >
        {/* Close button (mobile only) */}
        <button
          className="md:hidden mb-6 p-2 border rounded-lg self-end"
          onClick={() => setSidebarOpen(false)}
        >
          ✕
        </button>

        {/* Logo & Brand */}
        <div>
          <div className="mb-6 flex items-center gap-2">
            <div className="w-9 h-9 rounded-md flex items-center justify-center shadow-sm">
              <img src={Logo} alt="Logo" />
            </div>
            <div className="text-sm font-semibold">FarmMarket</div>
          </div>

          {/* Navigation */}
          <nav className="text-sm text-gray-600">
            <div className="mb-6">
              <div className="text-xs font-semibold text-gray-400 mb-2">Main</div>
              <ul className="space-y-2">
                <li className="flex items-center gap-3 font-medium text-gray-700">
                  <span>🏠</span> Dashboard
                </li>
                <li className="flex items-center gap-3 cursor-pointer">
                  <img src={Group} alt="upload" />
                  <Link to="/upload">Upload Produce</Link>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <div className="text-xs font-semibold text-gray-400 mb-2">Transaction</div>
              <ul className="space-y-2">
                <li className="flex items-center gap-3">
                  <img src={Monitor} alt="" /> Order Management
                </li>
                <li className="flex items-center gap-3 cursor-pointer">
                  <Mail className="w-5 h-5" />
                  <Link to="/buyerrequest">Buyer Request</Link>
                </li>
                <li className="flex items-center gap-3">
                  <Send className="w-4 h-4 text-gray-700" /> Deliveries
                </li>
                <li className="flex items-center gap-3">
                  <img src={Track} alt="" className="w-5 h-5" /> Track Order
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <div className="text-xs font-semibold text-gray-400 mb-2">Finance</div>
              <ul className="space-y-2">
                <li className="flex items-center gap-3">
                  <img src={Wallet} alt="" className="w-4 h-4" />
                  <span>Payment</span>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <div className="text-xs font-semibold text-gray-400 mb-2">System</div>
              <ul className="space-y-2">
                <li className="flex items-center gap-3">
                  <CircleHelp className="w-4 h-4 text-gray-700" /> System Info
                </li>
                <li className="flex items-center gap-3">
                  <img src={Support} alt="" className="w-4 h-4" /> Support
                </li>
                <li className="flex items-center gap-3">
                  <Settings className="w-4 h-4 text-gray-700" /> Settings
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* User Section */}
        <div>
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/40?img=3"
              alt="user"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="text-sm font-semibold">{userName}</div>
              <div className="text-xs text-gray-400">Farmer</div>
            </div>
          </div>

          <button className="flex items-center gap-2 mt-6 text-sm text-red-500 hover:opacity-75">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile menu toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white border p-2 rounded-lg shadow-sm"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>
    </>
  );
}
