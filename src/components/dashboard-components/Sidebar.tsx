
import { useState } from "react";
import { Send, Settings, LogOut, CircleQuestionMark } from "lucide-react";

import Logo from "../../assets/group1.png";
import Monitor from "../../assets/monitor-mobbile.png";
import Support from "../../assets/material-symbols-light_support-agent-outline.png";
import Group from "../../assets/Group.png";
import Track from "../../assets/solar_gps-outline.png";
import Wallet from "../../assets/solar_wallet-outline.png";

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  {
    /* Overlay (click to close) */
  }
  {
    sidebarOpen && (
      <div
        className="fixed inset-0 bg-black/30 z-40 md:hidden"
        onClick={() => setSidebarOpen(false)}
      />
    );
  }

  {
    /* Sidebar */
  }

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white border-r border-gray-100 p-6 flex-col justify-between z-50 transform transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0 flex"
            : "-translate-x-full md:translate-x-0 md:flex"
        }`}
      >
        {/* Close button (only on mobile) */}
        <button
          className="md:hidden mb-6 p-2 border rounded-lg self-end"
          onClick={() => setSidebarOpen(false)}
        >
          ✕
        </button>
        <div>
          <div className="mb-6 flex items-center gap-2">
            <div className="w-9 h-9 rounded-md flex items-center justify-center shadow-sm">
              <img src={Logo} alt="" />
            </div>
            <div className="text-sm font-semibold">FarmMarket</div>
          </div>

          <nav className="text-sm text-gray-500">
            <div className="mb-6">
              <div className="text-xs font-semibold text-gray-400 mb-2">
                Main
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-3 text-gray-700 font-medium">
                  <span>🏠</span>
                  <span>Dashboard</span>
                </li>
                <li className="flex items-center gap-3 text-gray-600">
                  <img src={Group} alt="" />
                  <span>Upload produce</span>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <div className="text-xs font-semibold text-gray-400 mb-2">
                Transaction
              </div>
              <ul className="space-y-1">
                <li className="flex items-center gap-3 text-gray-600 py-1">
                  <img src={Monitor} alt="" /> Order Management
                </li>
                <li className="flex items-center gap-3 text-gray-600 py-1">
                  📨 Buyers Request
                </li>
                <li className="flex items-center gap-3 text-gray-600 py-1">
                  <Send className="text-black size-4" /> Deliveries
                </li>
                <li className="flex items-center gap-3 text-gray-600 py-1">
                  <img src={Track} alt="" className="w-5 h-5" /> Track Order
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mb-4">
          <img src={Wallet} alt="" className="w-4 h-4" />
          payment
        </div>

        <nav>
          <div className="mb-6">
            <div className="text-xs font-semibold text-gray-400 mb-2">Main</div>
            <ul className="space-y-2">
              <li className="flex items-center gap-3 text-gray-700 font-medium">
                <CircleQuestionMark color="#000000" className="w-4 h-4" />
                <span>system</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <img src={Support} alt="" className="w-4 h-4" />
                <span>support</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Settings color="#000000" className="w-4 h-4" />
                <span>setting</span>
              </li>
            </ul>
          </div>
        </nav>

        <div className="mt-24">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/40?img=3"
              alt="me"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="text-sm font-semibold">John Caleb Ekong</div>
              <div className="text-xs text-gray-400">Farmer</div>
            </div>
          </div>

          <div className="flex gap-2 mt-6 text-sm text-red-500">
            <span>
              <LogOut color="#000000" className=" " />
            </span>
            <span>Logout</span>
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <main className=" p-4 sm:p-6 md:p-8 overflow-y-auto">
        {/* Mobile Navbar Toggle */}
        <button
          className="md:hidden mb-4 p-2 border rounded-lg"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
      </main>
    </>
  );
}
