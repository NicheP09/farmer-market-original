import React, { useState } from "react";
import {
  ShoppingCart,
  Ban,
  Clock,
  BadgeCheck,
  Send,
  Settings,
  LogOut,
  CircleQuestionMark,
  RotateCw,
} from "lucide-react";
import money from "../assets/money.png";
import Logo from "../assets/group1.png";
import Monitor from "../assets/monitor-mobbile.png";
import Support from "../assets/material-symbols-light_support-agent-outline.png";
import Group from "../assets/Group.png";
import Track from "../assets/solar_gps-outline.png";
import Wallet from "../assets/solar_wallet-outline.png";

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const orders = [
    {
      id: 1,
      name: "Adekunle Joshua",
      avatar: "https://i.pravatar.cc/40?img=2",
      location: "Lagos, Nigeria",
      distance: "2km away",
      time: "2 mins ago",
      status: "Pending",
      items: [
        { name: "Tomatoes", price: 2000 },
        { name: "Yam Tuber", price: 5000 },
      ],
    },
    {
      id: 2,
      name: "Blessing Uche",
      avatar: "https://i.pravatar.cc/40?img=4",
      location: "Abuja, Nigeria",
      distance: "4km away",
      time: "5 mins ago",
      status: "Accepted",
      items: [
        { name: "Cassava", price: 1500 },
        { name: "Maize", price: 3500 },
      ],
    },
    {
      id: 3,
      name: "Oluwaseun Ade",
      avatar: "https://i.pravatar.cc/40?img=5",
      location: "Ibadan, Nigeria",
      distance: "3km away",
      time: "8 mins ago",
      status: "Rejected",
      items: [
        { name: "Rice", price: 10000 },
        { name: "Beans", price: 2500 },
      ],
    },
  ];

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <div className="flex w-full min-h-screen bg-gray-50 font-dm-sans">
      {/* Overlay (click to close) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

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
              <img src={Logo} alt="FarmMarket logo" />
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
            <LogOut color="#000000" />
            <span>Logout</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
        {/* Mobile Navbar Toggle */}
        <button
          className="md:hidden mb-4 p-2 border rounded-lg"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>

        {/* Header */}
        <header className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              Dashboard
            </h1>
            <div className="text-sm text-gray-400 mt-1">Welcome Caleb</div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-2 rounded-full hover:bg-gray-100">🔔</div>
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src="https://i.pravatar.cc/40?img=7"
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Stats Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="relative rounded-2xl p-6 shadow-sm bg-[#FAEEE2]">
            <div className="absolute top-4 right-4 bg-white rounded-full p-2 ">
              <ShoppingCart color="#CB6906" />
            </div>
            <div className="text-xs text-gray-500">Total orders</div>
            <div className="mt-3 text-2xl font-semibold text-gray-800">
              ₦50,000
            </div>
            <div className="mt-2 text-xs text-gray-400">This week</div>
          </div>

          <div className="relative rounded-2xl p-6 shadow-sm bg-[#DDE0F7]">
            <div className="absolute top-4 right-4 bg-white rounded-full p-2 ">
              <Clock className="text-blue-500" />
            </div>
            <div className="text-xs text-gray-500">Pending orders</div>
            <div className="mt-3 text-2xl font-semibold text-gray-800">120</div>
            <div className="mt-2 text-xs text-gray-400">
              Pending confirmation
            </div>
          </div>

          <div className="relative rounded-2xl p-6 shadow-sm bg-[#FFFDE1]">
            <div className="absolute top-4 right-4 bg-white rounded-full p-2 ">
              <BadgeCheck className="text-yellow-500/50" />
            </div>
            <div className="text-xs text-gray-500">Accepted orders</div>
            <div className="mt-3 text-2xl font-semibold text-gray-800">95</div>
            <div className="mt-2 text-xs text-gray-400">Active this month</div>
          </div>
        </section>

        {/* Orders Section */}
        <section className="mt-24">
          <div className="flex justify-between items-center flex-wrap gap-3 mb-4">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Track Orders
            </h1>
            <div className="flex gap-4 text-xs text-gray-800">
              <div className="flex items-center gap-2 cursor-pointer">
                <RotateCw color="#000000" className="w-4 h-4" />
                Refresh
              </div>
              <div className="cursor-pointer">Filter</div>
            </div>
          </div>

          <h4 className="text-xs text-gray-500 mb-4">
            View and track your orders from customers
          </h4>

          <div className="flex flex-wrap gap-3 mb-6 text-xs text-gray-500">
            <button className="border border-gray-300 rounded px-3 py-1 hover:bg-green-100">
              All
            </button>
            <button className="border border-gray-300 rounded px-3 py-1 hover:bg-green-100">
              Pending
            </button>
            <button className="border border-gray-300 rounded px-3 py-1 hover:bg-green-100">
              Accepted
            </button>
            <button className="border border-gray-300 rounded px-3 py-1 hover:bg-green-100">
              Rejected
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <article
                key={order.id}
                className="bg-white relative rounded-2xl shadow-sm p-6"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={order.avatar}
                    alt={order.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold text-gray-800">
                          {order.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {order.location} · {order.distance}
                        </div>
                      </div>
                      <div className="text-sm text-right">
                        <div
                          className={`text-xs px-3 py-1 rounded-full font-medium ${
                            order.status === "Accepted"
                              ? "bg-green-100 text-green-700"
                              : order.status === "Rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-indigo-100 text-indigo-700"
                          }`}
                        >
                          {order.status}
                        </div>
                        <div className="text-xs text-gray-400 mt-2">
                          {order.time}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 text-xs text-gray-500">
                      Requested Items:
                    </div>
                    <div className="mt-2 text-sm text-gray-700">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between py-1">
                          <div>{it.name}</div>
                          <div className="font-medium">
                            {formatCurrency(it.price)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-[4px] rounded-lg border border-green-200 bg-green-50 text-green-700 text-sm">
                          Accept
                        </button>
                        <button className="px-3 py-[4px] rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm">
                          Reject
                        </button>
                      </div>
                      <div className="text-sm text-gray-500 cursor-pointer">
                        View details
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
