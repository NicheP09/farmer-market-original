import {
  Bell,
  TrendingUp,
  PiggyBank,
  Clock,
  ShoppingCart,
  BadgeCheck,
  Ban,
  RotateCw,
  Filter,
} from "lucide-react";
import StatsCard from "./StatsCard";
import OrderTable from "./OrderTable";
import Image from "../../assets/marketplace-images/Ellipse 1.svg";
import { useFarmerContext } from "../../context/FarmerContext";
import { useEffect } from "react";

const Overview = () => {
  const { userName, setUserName } = useFarmerContext();

  // ✅ Persist username using localStorage
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName && !userName) {
      setUserName(storedName);
    }
  }, [userName, setUserName]);

  // ✅ Display name (fallback if not set)
  const displayName = userName || "Buyer";

  // 🧩 Avatar fallback function
  const renderAvatar = () => {
    const imageSrc = localStorage.getItem("userImage"); // optional: if you plan to store user image
    if (imageSrc) {
      return (
        <img
          src={imageSrc}
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover border border-gray-200"
        />
      );
    }

    const initial = userName ? userName.charAt(0).toUpperCase() : "?";
    return (
      <div className="w-10 h-10 rounded-full bg-pri flex items-center justify-center text-xl font-bold text-white border border-gray-200">
        {initial}
      </div>
    );
  };

  return (
    <>
      {/* HEADER (Desktop) */}
      <div className="hidden md:flex items-center justify-between px-6 w-full md:w-[95%] pb-3 border-b-2 border-[#e6e6e6]">
        <div>
          <h2 className="text-black font-bold text-3xl">Dashboard</h2>
          <div className="text-[#999] text-[16px] font-medium mt-2">
            <span className="mr-2">Welcome</span>
            <span className="font-semibold">{displayName}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center p-2">
            <div className="absolute top-[4px] right-[4px] w-[14px] h-[14px] rounded-full flex justify-center items-center bg-red-600 p-1 text-[10px] text-white font-semibold">
              4
            </div>
            <button>
              <Bell className="w-6 h-6 font-bold" />
            </button>
          </div>
          <button>{renderAvatar()}</button>
        </div>
      </div>

      {/* HEADER (Mobile) */}
      <div className="md:hidden px-6 border-b pb-2">
        <h2 className="text-black font-bold text-2xl md:text-3xl">Dashboard</h2>
        <div className="text-[#999] text-[16px] font-medium mt-2">
          <span className="mr-2">Welcome</span>
          <span className="font-semibold">{displayName}</span>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 mt-6 w-full md:w-[95%]">
        <StatsCard
          title="Total Amount"
          value="₦20,000"
          hint={
            <div className="flex items-center gap-1.5 font-medium text-pri text-sm">
              <TrendingUp className="w-4 h-4 font-bold mr-1" />
              +12% this week
            </div>
          }
          className="bg-[#ebf4e6]"
          icon={<PiggyBank className="w-6 h-6 text-pri" />}
        />

        <StatsCard
          title="Total Orders"
          value={20}
          hint={
            <div className="flex items-center gap-1.5 font-medium text-[#e57300] text-sm">
              <TrendingUp className="w-4 h-4 font-bold" />
              +12% this week
            </div>
          }
          className="bg-[#faeee2]"
          icon={<ShoppingCart className="w-6 h-6 text-[#e57300]" />}
        />

        <StatsCard
          title="Completed Orders"
          value={95}
          hint={
            <div className="flex items-center gap-1.5 font-medium text-[#a9961e] text-sm">
              <TrendingUp className="w-4 h-4 font-bold" />
              +6% this week
            </div>
          }
          className="bg-[#fffde1]"
          icon={<BadgeCheck className="w-6 h-6 text-[#a9961e]" />}
        />

        <StatsCard
          title="Pending Orders"
          value={3}
          className="bg-[#dde0f7]"
          icon={<Clock className="w-6 h-6 text-blue-600" />}
        />

        <StatsCard
          title="Rejected Orders"
          value={4}
          className="bg-[#f1dfdf]"
          icon={<Ban className="w-6 h-6 text-[#d50000]" />}
        />
      </div>

      {/* ORDERS HEADER */}
      <div className="px-6 mt-20 w-full md:w-[95%]">
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-black font-bold text-3xl">Orders</h2>
            <p className="text-[#737373] text-[16px] font-medium mt-4">
              View and track all your orders
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-2 md:px-4 py-2 font-medium cursor-pointer flex items-center text-[13px] gap-2 border rounded border-[#bfbfbf]">
              <RotateCw className="w-4 h-4 inline-block" />
              Refresh
            </button>
            <button className="px-2 md:px-4 py-2 font-medium cursor-pointer flex items-center text-[13px] gap-2 border rounded border-[#bfbfbf]">
              <Filter className="w-4 h-4 inline-block" />
              Filter
            </button>
          </div>
        </div>

        {/* FILTER BUTTONS */}
        <div className="flex items-center gap-3 mt-6">
          <button className="px-2 md:px-4 py-2 font-medium text-[13px] bg-pri text-white flex items-center gap-2 border rounded border-pri">
            All
          </button>
          <button className="px-2 md:px-4 py-2 font-medium text-[13px] flex items-center gap-2 border rounded border-[#bfbfbf]">
            <Clock className="w-4 h-4 inline-block" />
            Pending
          </button>
          <button className="px-2 md:px-4 py-2 font-medium text-[13px] flex items-center gap-2 border rounded border-[#bfbfbf]">
            <BadgeCheck className="w-4 h-4 inline-block" />
            Accepted
          </button>
          <button className="px-2 md:px-4 py-2 font-medium text-[13px] flex items-center gap-2 border rounded border-[#bfbfbf]">
            <Ban className="w-4 h-4 inline-block" />
            Rejected
          </button>
        </div>
      </div>

      {/* ORDER TABLE */}
      <div className="px-6 mt-8 mb-20 w-full md:w-[95%]">
        <OrderTable />
      </div>
    </>
  );
};

export default Overview;
