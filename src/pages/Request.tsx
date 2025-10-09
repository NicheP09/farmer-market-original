import React from "react";
import BuyerRequestCard from "../components/dashboard-components/StatsCard";
import Sidebar from "../components/dashboard-components/Sidebar";

// Dummy data for demonstration
const dummyRequests = [
  {
    id: "1",
    name: "Chukwunonso Ikenna",
    location: "Aba North, Abia",
    distance: "2.5km away",
    time: "10:16 AM",
    items: [
      { name: "Fresh Tomatoes", quantity: 10_000 },
      { name: "Potatoes", quantity: 15_000 },
      { name: "Beans", quantity: 5_000 },
    ],
    avatarUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cfce54f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "2",
    name: "Nonso Ebuka",
    location: "Demsa, Adamawa",
    distance: "100km away",
    time: "10:16 AM",
    items: [
      { name: "Fresh Tomatoes", quantity: 10_000 },
      { name: "Potatoes", quantity: 15_000 },
      { name: "Beans", quantity: 5_000 },
    ],
    avatarUrl:
      "https://images.unsplash.com/photo-1520813792240-56ff42637edf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "3",
    name: "Daniel Chimsy",
    location: "Bodija, Ibadan",
    distance: "300km away",
    time: "10:16 AM",
    items: [
      { name: "Fresh Tomatoes", quantity: 10_000 },
      { name: "Potatoes", quantity: 15_000 },
      { name: "Beans", quantity: 5_000 },
    ],
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-e69fe1c5a32b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "4",
    name: "Chukwunonso Ikenna",
    location: "Aba North, Abia",
    distance: "2.5km away",
    time: "10:16 AM",
    items: [
      { name: "Fresh Tomatoes", quantity: 10_000 },
      { name: "Potatoes", quantity: 15_000 },
      { name: "Beans", quantity: 5_000 },
    ],
    avatarUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cfce54f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "5",
    name: "Nonso Ebuka",
    location: "Demsa, Adamawa",
    distance: "100km away",
    time: "10:16 AM",
    items: [
      { name: "Fresh Tomatoes", quantity: 10_000 },
      { name: "Potatoes", quantity: 15_000 },
      { name: "Beans", quantity: 5_000 },
    ],
    avatarUrl:
      "https://images.unsplash.com/photo-1520813792240-56ff42637edf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: "6",
    name: "Daniel Chimsy",
    location: "Bodija, Ibadan",
    distance: "300km away",
    time: "10:16 AM",
    items: [
      { name: "Fresh Tomatoes", quantity: 10_000 },
      { name: "Potatoes", quantity: 15_000 },
      { name: "Beans", quantity: 5_000 },
    ],
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-e69fe1c5a32b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

function request() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Sidebar />
      {/* Header */}
      <header className="flex items-center justify-between p-6 bg-white border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-800">Buyers Request</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <span></span>
            {/* Notification dot - if needed */}
            {/* <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span> */}
          </div>
          <img
            className="h-9 w-9 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="User Avatar"
          />
        </div>
      </header>

      {/* Search and Filters Section */}
      <section className="p-6">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative flex-grow w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search orders or products..."
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            {/* Search Icon can be added here if desired */}
          </div>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.992 0 6.32-6.32m6.32 6.32 6.32-6.32M3.476 15.651 12 6.101"
              />
            </svg>
            Refresh
          </button>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591L12.49 21.358a2.25 2.25 0 0 1-3.83-.674L2.75 7.594a2.25 2.25 0 0 1-.659-1.59V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
              />
            </svg>
            Filter
          </button>
        </div>
      </section>

      {/* Buyer Request Cards Grid */}
      <BuyerRequestCard />
    </div>
  );
}

export default request;
