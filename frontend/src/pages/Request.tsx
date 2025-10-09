import  BuyerRequestCard  from "../components/BuyerRequestCard"
import Sidebar from "../components/dashboard-components/Sidebar";
import type { BuyerRequest } from "../components/BuyerRequestCard";

// Dummy data
const dummyRequests: BuyerRequest[] = [
  {
    id: "1",
    name: "Chukwunonso Ikenna",
    location: "Aba North, Abia",
    distance: "2.5km away",
    time: "10:16 AM",
    items: [
      { name: "Fresh Tomatoes", quantity: 10000 },
      { name: "Potatoes", quantity: 15000 },
      { name: "Beans", quantity: 5000 },
    ],
    avatarUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cfce54f6?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "2",
    name: "Nonso Ebuka",
    location: "Demsa, Adamawa",
    distance: "100km away",
    time: "10:16 AM",
    items: [
      { name: "Fresh Tomatoes", quantity: 10000 },
      { name: "Potatoes", quantity: 15000 },
      { name: "Beans", quantity: 5000 },
    ],
    avatarUrl:
      "https://images.unsplash.com/photo-1520813792240-56ff42637edf?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "3",
    name: "Daniel Chimsy",
    location: "Bodija, Ibadan",
    distance: "300km away",
    time: "10:16 AM",
    items: [
      { name: "Fresh Tomatoes", quantity: 10000 },
      { name: "Potatoes", quantity: 15000 },
      { name: "Beans", quantity: 5000 },
    ],
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-e69fe1c5a32b?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

const Request = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="flex items-center justify-between p-6 bg-white border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-800">
            Buyers Request
          </h1>
          <div className="flex items-center space-x-4">
            <img
              className="h-9 w-9 rounded-full object-cover"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User Avatar"
            />
          </div>
        </header>

        {/* Search & Filter Section */}
        <section className="p-6">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="text"
              placeholder="Search orders or products..."
              className="flex-grow pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Refresh
            </button>
            <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Filter
            </button>
          </div>
        </section>

        {/* Requests Grid */}
        <main className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyRequests.map((req) => (
            <BuyerRequestCard key={req.id} request={req} />
          ))}
        </main>
      </div>
    </div>
  );
};

export default Request;
