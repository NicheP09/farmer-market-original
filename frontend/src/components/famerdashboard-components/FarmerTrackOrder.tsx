import { useEffect, useState } from "react";
import {
  Eye,
  Trash2,
  X,
  AlertTriangle,
  Loader2,
  CheckCircle,
} from "lucide-react";

type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "In Transit"
  | "Delivered"
  | "Cancelled";

interface Order {
  id: string;
  produce: string;
  buyer: string;
  quantity: number;
  price: number;
  unit: string;
  status: OrderStatus;
  date: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  country: string;
  image: string;
}

const MOCK_ORDERS: Order[] = [
  {
    id: "1",
    produce: "Fresh Tomatoes",
    buyer: "John Market",
    quantity: 20,
    price: 400,
    unit: "kg",
    status: "Pending",
    date: "2025-10-20",
    email: "john@gmail.com",
    phone: "08011223344",
    street: "23 ogendengbe street",
    city: "Ikorodu Lagos",
    country: "Nigeria",
    image:
      "https://res.cloudinary.com/dqgb7ckk9/image/upload/v1761035722/photo_2025-10-21_01-17-49_p4smxk.jpg",
  },
  {
    id: "2",
    produce: "Maize",
    buyer: "AgriMart Store",
    quantity: 50,
    price: 200,
    unit: "kg",
    status: "Confirmed",
    date: "2025-10-18",
    email: "agrimart@yahoo.com",
    phone: "08012345678",
    street: "2 Seyi Tinubu street",
    city: "Ijebu-Ode Ogun",
    country: "Nigeria",
    image:
      "https://res.cloudinary.com/dqgb7ckk9/image/upload/v1761035769/photo_2025-10-21_01-18-55_nd5bck.jpg",
  },
  {
    id: "3",
    produce: "Plantain",
    buyer: "Local Grocery",
    quantity: 35,
    price: 300,
    unit: "bunches",
    status: "Delivered",
    date: "2025-10-15",
    email: "localgrocery123@gmail.com",
    phone: "08014678824",
    street: "41 Fiwakesin street",
    city: "Oye-Ekiti Ekiti",
    country: "Nigeria",
    image:
      "https://res.cloudinary.com/dqgb7ckk9/image/upload/v1761035747/photo_2025-10-21_01-18-44_glnsuw.jpg",
  },
  {
    id: "4",
    produce: "Yam Tubers",
    buyer: "Fresh Foods Co",
    quantity: 12,
    price: 1200,
    unit: "kg",
    status: "In Transit",
    date: "2025-10-17",
    email: "cofreshfoods@gmail.com",
    phone: "08099887766",
    street: "13 Lamine Yamal street",
    city: "Be-Happy B/stop Ogun",
    country: "Nigeria",
    image:
      "https://res.cloudinary.com/dqgb7ckk9/image/upload/v1761035765/photo_2025-10-21_01-18-53_tnjmhr.jpg",
  },
];

const FarmerTrackOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [viewOrder, setViewOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<Order | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("farmerOrders");
    let saved: Order[] | null = null;

    try {
      saved = raw ? JSON.parse(raw) : null;
    } catch {
      saved = null;
    }

    if (!saved || !Array.isArray(saved) || saved.length === 0) {
      setOrders(MOCK_ORDERS);
      localStorage.setItem("farmerOrders", JSON.stringify(MOCK_ORDERS));
    } else {
      setOrders(saved);
    }
  }, []);

  const saveOrders = (data: Order[]) => {
    setOrders(data);
    localStorage.setItem("farmerOrders", JSON.stringify(data));
  };

  const simulateAction = async (
    action: () => void,
    message: string | null,
    loadingLabel = "Processing...",
    delay = 1500
  ) => {
    setLoadingText(loadingLabel);
    setLoading(true);
    await new Promise((res) => setTimeout(res, delay));
    setLoading(false);
    action();
    if (message) {
      setSuccessMessage(message);
      setTimeout(() => setSuccessMessage(""), 2000);
    }
  };

  // View
  const handleViewOrder = async (order: Order) => {
    setLoadingText("Loading order details...");
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1200));
    setLoading(false);
    setViewOrder(order);
  };

  // 🧩 NEW: Pre-confirmation for Delete
  const handleDeleteClick = async (order: Order) => {
    setLoadingText("Preparing delete confirmation...");
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));
    setLoading(false);
    setConfirmDelete(order);
  };

  // 🧩 NEW: Pre-confirmation for Clear All
  const handleClearClick = async () => {
    setLoadingText("Preparing to clear all orders...");
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));
    setLoading(false);
    setConfirmClear(true);
  };

  const handleDeleteConfirmed = async (id: string) => {
    await simulateAction(
      () => {
        const updated = orders.filter((o) => o.id !== id);
        saveOrders(updated);
        setConfirmDelete(null);
      },
      "Order deleted successfully!",
      "Deleting order..."
    );
  };

  const handleClearAllConfirmed = async () => {
    await simulateAction(
      () => {
        saveOrders([]);
        setConfirmClear(false);
      },
      "All orders cleared successfully!",
      "Clearing all orders..."
    );
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.produce.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.buyer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "All" || o.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const badgeColor = (status: OrderStatus) => {
    const colors: Record<OrderStatus, string> = {
      Pending:
        "bg-yellow-100 text-yellow-700 py-1 px-3 text-sm font-semibold align-middle rounded-xl",
      Confirmed:
        "bg-blue-100 text-blue-700 py-1 px-3 text-sm font-semibold align-middle rounded-xl",
      "In Transit":
        "bg-indigo-100 text-indigo-700 py-1 px-3 text-sm font-semibold align-middle rounded-xl",
      Delivered:
        "bg-green-100 text-green-700 py-1 px-3 text-sm font-semibold align-middle rounded-xl",
      Cancelled:
        "bg-red-100 text-red-700 py-1 px-3 text-sm font-semibold align-middle rounded-xl",
    };
    return colors[status];
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
          Track Orders
        </h1>
        <p className="text-gray-700 mb-6">
          Manage and track your produce orders.
        </p>
      </div>
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-2xl py-8 px-4">
        <h1 className="text-xl font-bold text-black mb-4">Recent Orders</h1>

        {/* Search + Filter */}
        <div className="flex md:flex-row md:items-center md:justify-between gap-3 mb-6">
          <input
            type="text"
            placeholder="Search by produce or buyer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1  px-3 py-2 border border-pri rounded-lg focus:ring-2 focus:ring-green-500"
          />

          <div className="flex gap-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-1 py-2 border border-pri rounded-lg focus:ring-2 focus:ring-pri"
            >
              {[
                "All",
                "Pending",
                "Confirmed",
                "In Transit",
                "Delivered",
                "Cancelled",
              ].map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>

            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedStatus("All");
              }}
              className="hidden md:block px-2 py-2 whitespace-nowrap border border-pri rounded-lg hover:bg-gray-100"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="px-2 py-3 truncate text-left">Produce</th>
                <th className="px-2 py-3 truncate text-left">Buyer</th>
                <th className="px-2 py-3 truncate text-center">Quantity</th>
                <th className="px-2 py-3 truncate text-center">Price/Unit</th>
                <th className="px-2 py-3 truncate text-center">Total</th>
                <th className="px-2 py-3 truncate text-center">Status</th>
                <th className="px-2 py-3 truncate text-center">Date</th>
                <th className="px-2 py-3 truncate text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50">
                  <td className="px-2 py-3 flex items-center gap-2">
                    <img
                      src={o.image}
                      alt={o.produce}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <span className="font-medium whitespace-nowrap">
                      {o.produce}
                    </span>
                  </td>
                  <td className="px-2 truncate py-3 text-[15px] font-medium">
                    {o.buyer}
                  </td>
                  <td className="px-2 py-3 text-[15px] text-center font-medium">
                    {o.quantity} {o.unit}
                  </td>
                  <td className="px-2 py-3 text-[15px] text-center truncate font-medium">
                    ₦{o.price}
                  </td>
                  <td className="px-2 py-3 text-[15px] text-center truncate font-medium">
                    ₦{o.price * o.quantity}
                  </td>
                  <td className="px-2 py-3 text-[15px] text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${badgeColor(
                        o.status
                      )}`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="px-2 py-3 text-[15px] text-sm font-medium text-center truncate">
                    {new Date(o.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-2 py-3 text-[15px] text-center">
                    <div className="flex justify-center truncate gap-3">
                      <button onClick={() => handleViewOrder(o)}>
                        <Eye className="w-5 h-5 cursor-pointer text-green-600 hover:text-green-700" />
                      </button>
                      <button onClick={() => handleDeleteClick(o)}>
                        <Trash2 className="w-5 h-5 cursor-pointer text-red-600 hover:text-red-700" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards (Mobile) */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {filteredOrders.map((o) => (
            <div
              key={o.id}
              className="bg-white shadow-sm rounded-xl p-4 border border-gray-100 flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={o.image}
                  alt={o.produce}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{o.produce}</h3>
                  <p className="text-sm text-gray-600">{o.buyer}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${badgeColor(
                    o.status
                  )}`}
                >
                  {o.status}
                </span>
              </div>

              <div className="flex justify-between">
                <div className="text-sm text-gray-700">
                  <p>
                    <strong>Quantity:</strong> {o.quantity} {o.unit}
                  </p>
                  <p>
                    <strong>Price:</strong> ₦{o.price}
                  </p>
                  <p>
                    <strong>Total:</strong> ₦{o.price * o.quantity}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(o.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex justify-end gap-3 mt-2">
                  <button onClick={() => handleViewOrder(o)}>
                    <Eye className="w-5 h-5 cursor-pointer text-green-600 hover:text-green-700" />
                  </button>
                  <button onClick={() => handleDeleteClick(o)}>
                    <Trash2 className="w-5 h-5 cursor-pointer text-red-600 hover:text-red-700" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Clear All */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleClearClick}
            className="text-red-500 cursor-pointer hover:text-red-700"
          >
            Clear All Orders
          </button>
        </div>
      </div>

      {/* 🧩 Modals */}

      {/* Loader */}
      {loading && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-60">
          <div className="bg-white rounded-xl p-12 flex flex-col items-center gap-3 shadow-md">
            <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
            <p className="text-gray-700 font-medium">{loadingText}</p>
          </div>
        </div>
      )}

      {/* Success */}
      {successMessage && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-12 shadow-md text-center">
            <div className="flex justify-center items-center mb-4">
              <CheckCircle size={35} className="text-pri " />
            </div>
            <h3 className="text-green-600 text-xl font-semibold mb-2">
              Success!
            </h3>
            <p>{successMessage}</p>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-12 shadow-md relative">
            <button
              className="absolute top-3 right-3 text-gray-700 hover:text-gray-900 cursor-pointer"
              onClick={() => setConfirmDelete(null)}
            >
              <X className="w-5 h-5" />
            </button>
            <AlertTriangle size={35} className="text-red-500 mx-auto mb-4" />
            <p className="text-center mb-4">
              Are you sure you want to delete this order?
            </p>
            <div className="flex justify-center mt-8 gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 font-semibold cursor-pointer border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteConfirmed(confirmDelete.id)}
                className="px-4 py-2 bg-red-600 cursor-pointer font-semibold text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear All Confirmation */}
      {confirmClear && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-12 shadow-md relative">
            <button
              className="absolute top-3 cursor-pointer right-3 text-gray-700 hover:text-gray-900"
              onClick={() => setConfirmClear(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <AlertTriangle size={35} className="text-red-500 mx-auto mb-3" />
            <p className="text-center mb-4">
              Are you sure you want to clear all orders?
            </p>
            <div className="flex justify-center mt-8 gap-3">
              <button
                onClick={() => setConfirmClear(false)}
                className="px-4 py-2 cursor-pointer font-semibold border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleClearAllConfirmed}
                className="px-4 py-2 bg-red-600 cursor-pointer font-semibold text-white rounded-lg hover:bg-red-700"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewOrder && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl  w-[95%] max-w-[600px] shadow-lg relative">
            <div className="flex justify-between border-b p-6 items-center ">
              <h2 className="text-xl font-bold">Order Details</h2>
              <button
                className=" text-gray-700 cursor-pointer hover:text-gray-900"
                onClick={() => setViewOrder(null)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="py-8 px-6">
              <div className="flex items-start space-x-6 mb-6">
                <div className="h-20 w-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={viewOrder.image}
                    alt={viewOrder.produce}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-0.5">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">
                    {viewOrder.produce}
                  </h2>
                  <span className={badgeColor(viewOrder.status)}>
                    {viewOrder.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 space-y-4">
                  <div>
                    <h5 className="text-gray-800 font-medium">
                      Buyer Information
                    </h5>
                    <p className=" font-semibold text-lg">{viewOrder.buyer}</p>
                    <p className="text-[15px] ">{viewOrder.email}</p>
                    <p className="text-[15px] ">{viewOrder.phone}</p>
                  </div>
                  <div>
                    <h5 className="text-gray-800 font-medium">
                      Delivery Address
                    </h5>
                    <p className="text-[15px] ">{viewOrder.street}</p>
                    <p className="text-[15px] ">
                      {viewOrder.city}, {viewOrder.country}
                    </p>
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <h5 className="text-gray-800 font-medium">Order Details</h5>
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] font-medium ">Quantity:</span>
                    <strong>
                      {viewOrder.quantity} {viewOrder.unit}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] font-medium ">
                      Price per unit:
                    </span>
                    <strong>₦{viewOrder.price}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] font-medium ">
                      Total Amount:
                    </span>
                    <strong>₦{viewOrder.price * viewOrder.quantity}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] font-medium ">
                      Order Date:
                    </span>
                    <strong className="text-[15px]">
                      {new Date(viewOrder.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerTrackOrder;
