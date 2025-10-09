import {
  ShoppingCart,
  Ban,
  Clock,
  BadgeCheck,
  RotateCw,
  Bell,
  PiggyBank,
  TrendingUp,
  Filter,
} from "lucide-react";
import ProfileImage from "../../assets/marketplace-images/Ellipse 1.svg";
import StatsCard from "../dashboard-components/StatsCard";

const FarmerOverview = () => {
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
    <>
      {/* Header */}
      <header className="hidden mx-auto md:flex items-center justify-between px-6  w-full md:w-[95%] pb-3 border-b-2 border-[#e6e6e6]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Dashboard
          </h1>
          <div className="text-sm text-gray-400 mt-1">Welcome Caleb</div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-2 rounded-full hover:bg-gray-100">
            <Bell size={22} />
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={ProfileImage}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* MOBILE DASHBOARD NAME */}
      <div className="md:hidden px-6 border-b pb-2">
        <h2 className="text-black font-bold text-xl sm:text-2xl  md:text-3xl">
          Dashboard
        </h2>
        <div className="text-[#999] text-[16px] font-medium mt-2">
          <span className=" mr-2">Welcome</span>
          <span className="font-semibold">Caleb</span>
        </div>
      </div>

      {/* Stats */}
      <section className="grid mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 mt-6 w-full md:w-[95%]">
        <StatsCard
          title="Total Orders"
          value="₦50,000"
          hint={
            <div className="flex items-center gap-1.5 font-medium text-[#cb6906] text-sm">
              <TrendingUp className="w-4 h-4 font-bold mr-1" />
              +12% this week
            </div>
          }
          className="bg-[#faeee2]"
          icon={<ShoppingCart className="w-7 h-7 text-[#cb6906]" />}
        />

        {/* SECOND */}
        <StatsCard
          title="Pending Orders"
          value={8}
          hint={
            <div className="flex items-center gap-1.5 font-medium text-blue-600 text-sm">
              <div className="opacity-0">Lorem ipsum dolor sit.</div>
            </div>
          }
          className="bg-[#dde0f7]"
          icon={<Clock className="w-6 h-6 text-blue-600" />}
        />

        {/* THIRD */}
        <StatsCard
          title="Accepted Orders"
          value={95}
          hint={
            <div className="flex items-center gap-1.5 font-medium text-[#a9961e] text-sm">
              <TrendingUp className="w-4 h-4 font-bold mr-1" />
              6% this week
            </div>
          }
          className="bg-[#fffde1]"
          icon={<BadgeCheck className="w-6 h-6 text-[#a9961e]" />}
        />

        {/* FOURTH */}
        <StatsCard
          title="Rejected Orders"
          value={12}
          hint={
            <div className="flex items-center gap-1.5 font-medium text-[#a9961e] text-sm">
              <div className="opacity-0">Lorem ipsum dolor sit.</div>
            </div>
          }
          className="bg-[#ffe5e6]"
          icon={<Ban className="w-6 h-6 text-red-500" />}
        />

        {/* FIFTH */}
        <StatsCard
          title="Total Earnings"
          value="₦200,000"
          hint={
            <div className="flex items-center gap-1.5 font-medium text-pri text-sm">
              <TrendingUp className="w-4 h-4 font-bold mr-1" />
              +12% this week
            </div>
          }
          className="bg-[#EBF4E6]"
          icon={<PiggyBank className="w-6 h-6 text-pri" />}
        />

        {/* SIXTH */}
        <StatsCard
          title="Customers"
          value="1,024"
          hint={
            <div className="flex items-center gap-1.5 font-medium text-[#0088ff] text-sm">
              <TrendingUp className="w-4 h-4 font-bold mr-1" />
              Active this month
            </div>
          }
          className="bg-[#dde0f7]"
          icon={<PiggyBank className="w-6 h-6 text-[#0088ff]" />}
        />
      </section>

      {/* Orders */}
      <section className="mt-24 mx-auto w-full pb-10 px-6 md:w-[95%]">
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-black font-bold text-3xl">Track Orders</h2>
            <p className="text-[#737373] text-[16px] font-medium mt-4">
              View and track your orders from customers
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-2 md:px-4 py-2 font-medium cursor-pointer  flex items-center text-[13px] gap-2 border rounded md border-[#bfbfbf]">
              <RotateCw className="w-4 h-4  inline-block" />
              Refresh
            </button>
            <button className="px-2 md:px-4 py-2 font-medium cursor-pointer flex items-center text-[13px] gap-2 border rounded md border-[#bfbfbf]">
              <Filter className="w-4 h-4 mrnline-block" />
              Filter
            </button>
          </div>
        </div>

        {/* SELECTION TABS */}
        <div className="flex items-center gap-3 mt-5 mb-6">
          <button className="px-2 md:px-4 py-2 font-medium text-[13px] bg-pri text-white flex items-center gap-2 border rounded md border-pri">
            All
          </button>
          <button className="px-2 md:px-4 py-2 font-medium text-[13px]  flex items-center gap-2 border rounded md  border-[#bfbfbf]">
            <Clock className="w-4 h-4  inline-block" />
            Pending
          </button>
          <button className="px-2 md:px-4 py-2 font-medium text-[13px]  flex items-center gap-2 border rounded md border-[#bfbfbf]">
            <BadgeCheck className="w-4 h-4  inline-block" />
            Accepted
          </button>
          <button className="px-2 md:px-4 py-2 font-medium text-[13px] flex items-center gap-2 border rounded md border-[#bfbfbf]">
            <Ban className="w-4 h-4 mrnline-block" />
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
                    Requested Item:
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
                    <div className="text-sm text-gray-500">View details</div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

export default FarmerOverview;