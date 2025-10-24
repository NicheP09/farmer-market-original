import { useEffect, useMemo, useState } from "react";
import {
  RotateCw as RefreshIcon,
  Filter as FilterIcon,
  Loader2,
  Check,
  X as XIcon,
  X,
  TriangleAlert,
  Bell,
} from "lucide-react";

type OrderStatus =
  | "Pending"
  | "Accepted"
  | "Rejected"
  | "In Progress"
  | "Completed";

type RejectReason =
  | "Out of stock"
  | "Cannot meet delivery time"
  | "Product quality does not meet standard"
  | "Delivery location outside my service area"
  | "Pricing conflict"
  | "Others (Please specify)";

type Order = {
  id: string;
  name: string;
  location: string;
  distanceKm: number;
  items: { name: string; price: number }[];
  image: string;
  status: OrderStatus;
  rejectReason?: string;
  createdAt: string; // ISO
};

const STORAGE_KEY = "directOrders_v1_seed";

const seedOrders = (): Order[] => [
  {
    id: "ORD-001",
    name: "Treasure Adaeze",
    location: "Agege, Lagos",
    distanceKm: 10,
    items: [
      { name: "Red meat", price: 10000 },
      { name: "Ponmo", price: 8000 },
    ],
    image:
      "https://res.cloudinary.com/dqgb7ckk9/image/upload/v1760654487/fruit-farmer_sikrdr.jpg",
    status: "Pending",
    createdAt: "2025-10-20T08:00:00.000Z",
  },
  {
    id: "ORD-002",
    name: "Sophia Osimen",
    location: "Alausa, Lagos",
    distanceKm: 5,
    items: [
      { name: "Chicken wings", price: 9500 },
      { name: "Turkey", price: 12000 },
    ],
    image:
      "https://res.cloudinary.com/dqgb7ckk9/image/upload/v1761037941/photo_2025-10-21_02-11-03_cxjjaz.jpg",
    status: "Pending",
    createdAt: "2025-10-21T09:00:00.000Z",
  },
  {
    id: "ORD-003",
    name: "Wuraola Kemisola",
    location: "Iyana paja, Lagos",
    distanceKm: 3,
    items: [
      { name: "Sweet Oranges", price: 2000 },
      { name: "Plantain", price: 7000 },
    ],
    image:
      "https://res.cloudinary.com/dqgb7ckk9/image/upload/v1761037955/photo_2025-10-21_02-11-09_cahkgi.jpg",
    status: "Pending",
    createdAt: "2025-10-21T10:30:00.000Z",
  },
  {
    id: "ORD-004",
    name: "Segun Martins",
    location: "Ikeja, Lagos",
    distanceKm: 10,
    items: [
      { name: "Catfish", price: 9000 },
      { name: "Shrimps", price: 4500 },
    ],
    image:
      "https://res.cloudinary.com/dqgb7ckk9/image/upload/v1760654482/corn-farmer_eyt2ho.jpg",
    status: "Pending",
    createdAt: "2025-10-21T11:00:00.000Z",
  },
  {
    id: "ORD-005",
    name: "Blessing Okafor",
    location: "Ojota, Lagos",
    distanceKm: 5,
    items: [
      { name: "Fresh Tomatoes", price: 5000 },
      { name: "Lettuce", price: 8000 },
      { name: "Bell Pepper", price: 4200 },
    ],
    image:
      "https://res.cloudinary.com/dqgb7ckk9/image/upload/v1761037941/photo_2025-10-21_02-11-03_cxjjaz.jpg",
    status: "Pending",
    createdAt: "2025-10-21T11:40:00.000Z",
  },
  {
    id: "ORD-006",
    name: "Tunde Adebayo",
    location: "Iyana paja, Lagos",
    distanceKm: 3,
    items: [
      { name: "Plantain", price: 3000 },
      { name: "Palm Oil", price: 5500 },
    ],
    image:
      "https://res.cloudinary.com/dqgb7ckk9/image/upload/v1760654495/root-crop-farmer_u1ly6j.jpg",
    status: "Pending",
    createdAt: "2025-10-21T12:15:00.000Z",
  },
];

const DirectOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | OrderStatus>("All");
  const [showFilter, setShowFilter] = useState(false);

  // UI state for flows
  const [processing, setProcessing] = useState(false);
  const [processingText, setProcessingText] = useState("Processing...");
  const [confirmAcceptOrder, setConfirmAcceptOrder] = useState<Order | null>(
    null
  );
  const [confirmRejectOrder, setConfirmRejectOrder] = useState<Order | null>(
    null
  );
  const [rejectChoice, setRejectChoice] = useState<RejectReason | "">("");
  const [rejectOtherText, setRejectOtherText] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  // seed/load
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const s = seedOrders();
      setOrders(s);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
      return;
    }
    try {
      const parsed = JSON.parse(raw) as Order[];
      if (!Array.isArray(parsed) || parsed.length === 0) {
        const s = seedOrders();
        setOrders(s);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
      } else setOrders(parsed);
    } catch {
      const s = seedOrders();
      setOrders(s);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    }
  }, []);

  // helpers
  const saveOrders = (next: Order[]) => {
    setOrders(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const resetToSeed = async () => {
    setProcessingText("Refreshing...");
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 900));
    const s = seedOrders();
    saveOrders(s);
    setProcessing(false);
    setToast("Data refreshed");
    setTimeout(() => setToast(null), 2000);
  };

  const handleAcceptClick = async (order: Order) => {
    // pre-processing modal
    setProcessingText("Preparing...");
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 700));
    setProcessing(false);
    setConfirmAcceptOrder(order);
  };

  const confirmAccept = async (order: Order) => {
    setConfirmAcceptOrder(null);
    setProcessingText("Accepting order...");
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 900));
    // update status
    const updated: Order[] = orders.map((o) =>
      o.id === order.id ? { ...o, status: "Accepted" } : o
    );
    saveOrders(updated);
    setProcessing(false);
    setToast("Order accepted successfully");
    setTimeout(() => setToast(null), 2500);
  };

  const handleRejectClick = async (order: Order) => {
    setProcessingText("Preparing...");
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 700));
    setProcessing(false);
    setConfirmRejectOrder(order);
    setRejectChoice("");
    setRejectOtherText("");
  };

  const confirmReject = async (order: Order) => {
    // require a reason
    if (!rejectChoice) {
      alert("Please select a reason for rejection (or 'Other' and specify).");
      return;
    }
    if (rejectChoice === `Others (Please specify)` && !rejectOtherText.trim()) {
      alert("Please specify other reason.");
      return;
    }

    setConfirmRejectOrder(null);
    setProcessingText("Rejecting order...");
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 900));
    const reason =
      rejectChoice === `Others (Please specify)`
        ? rejectOtherText.trim()
        : (rejectChoice as string);
    const updated: Order[] = orders.map((o) =>
      o.id === order.id ? { ...o, status: "Rejected", rejectReason: reason } : o
    );
    saveOrders(updated);
    setProcessing(false);
    setToast("Order rejected");
    setTimeout(() => setToast(null), 2500);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return orders.filter((o) => {
      if (statusFilter !== "All" && o.status !== statusFilter) return false;
      if (!q) return true;
      const inName = o.name.toLowerCase().includes(q);
      const inLoc = o.location.toLowerCase().includes(q);
      const inItems = o.items.some((it) => it.name.toLowerCase().includes(q));
      return inName || inLoc || inItems || o.id.toLowerCase().includes(q);
    });
  }, [orders, search, statusFilter]);

  // UX tiny helpers
  const formatPrice = (n: number) =>
    n.toLocaleString(undefined, { maximumFractionDigits: 0 });

  const total = confirmAcceptOrder?.items.reduce(
    (acc, item) => acc + item.price,
    0
  );

  return (
    <div className="min-h-screen bg-white p-6 pt-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold">Direct Order</h1>
          <div className="flex items-center gap-3">
            <Bell size={20} />
            {/* Avatar placeholder */}
            <div className="w-10 h-10 hidden md:block rounded-full overflow-hidden border">
              <img
                src="https://res.cloudinary.com/dqgb7ckk9/image/upload/v1761037931/photo_2025-10-21_02-11-00_ouj0lb.jpg"
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Search + actions */}
        <div className="flex gap-2 md:gap-4 mb-10 items-center">
          <div className="flex-1 flex items-center gap-3 ">
            <input
              className="w-full outline-none rounded-lg p-3 px-5 focus:outline-none focus:ring-2 focus:ring-pri border text-slate-600"
              placeholder="Search orders or products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex justify-end items-center gap-2 md:gap-3">
            <button
              onClick={() => resetToSeed()}
              className="flex items-center gap-2 px-4 py-3 border rounded-md hover:bg-gray-50 cursor-pointer"
            >
              <RefreshIcon className="w-5 h-5 md:w-4 md:h-4" />
              <span className="hidden md:block">Refresh</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowFilter((s) => !s)}
                className="flex items-center gap-2 px-4 py-3 border rounded-md hover:bg-gray-50 cursor-pointer"
              >
                <FilterIcon className="w-5 h-5 md:w-4 md:h-4" />
                <span className="hidden md:block">Filter</span>
              </button>

              {showFilter && (
                <div className="absolute right-0 mt-2 w-56 bg-[#fff] shadow-lg rounded-md p-3 z-30">
                  <div className="mb-3 flex justify-end">
                    <button
                      onClick={() => setShowFilter(false)}
                      className="rounded cursor-pointer"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <label className="block text-base font-semibold  mb-3">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) =>
                      setStatusFilter(e.target.value as "All" | OrderStatus)
                    }
                    className="w-full border rounded mb-4 px-2 py-2"
                  >
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((o) => (
            <div
              key={o.id}
              className="bg-[#fff] rounded-lg  py-5 px-3 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-full overflow-hidden border">
                    <img
                      src={o.image}
                      alt={o.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-lg truncate">
                      {o.name}
                    </div>
                    <div className=" flex items-center gap-4 text-sm text-slate-900">
                      <span>{o.location}</span>
                      <span>{o.distanceKm}km away</span>
                    </div>
                  </div>
                </div>

                <div className="text-base mb-3">
                  <div className="font-medium mb-2">Requested Item:</div>
                  <div className="flex justify-between text-slate-900">
                    <div>
                      {o.items.map((it, i) => (
                        <div key={i} className="py-1">
                          {it.name}
                        </div>
                      ))}
                    </div>
                    <div className="text-right">
                      {o.items.map((it, i) => (
                        <div key={i} className="py-1">
                          {formatPrice(it.price)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* optional: show reject reason when rejected */}
                {o.status === "Rejected" && o.rejectReason && (
                  <div className="mb-3 text-sm text-red-600">
                    <strong>Rejected:</strong> {o.rejectReason}
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  disabled={o.status !== "Pending"}
                  onClick={() => handleAcceptClick(o)}
                  className={`flex-1 px-3 py-3 rounded text-white font-semibold text-[15px] cursor-pointer ${
                    o.status === "Pending"
                      ? "bg-pri hover:bg-green-700"
                      : "bg-green-300 opacity-60 cursor-not-allowed"
                  }`}
                >
                  Accept Order
                </button>

                <button
                  disabled={o.status !== "Pending"}
                  onClick={() => handleRejectClick(o)}
                  className={`flex-1 px-3 py-3 rounded text-white text-[15px] font-semibold cursor-pointer ${
                    o.status === "Pending"
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-red-200 opacity-60 cursor-not-allowed"
                  }`}
                >
                  Reject Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Processing modal */}
      {processing && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4 py-10">
          <div className="bg-white rounded-xl p-6 flex flex-col items-center gap-4 w-full max-w-sm shadow-lg">
            <Loader2 className="animate-spin w-12 h-12 text-green-600" />
            <div className="text-center text-slate-700">{processingText}</div>
          </div>
        </div>
      )}

      {/* Accept confirmation modal */}
      {confirmAcceptOrder && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold">Confirm Order Acceptance</h3>
              <button
                onClick={() => setConfirmAcceptOrder(null)}
                className="text-black cursor-pointer"
              >
                <XIcon />
              </button>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-full border-2 border-pri overflow-hidden">
                <img
                  src={confirmAcceptOrder.image}
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="font-semibold text-[17px]">
                  {confirmAcceptOrder.name}
                </h3>
                <p className="text-slate-600 flex items-center gap-4">
                  <span>{confirmAcceptOrder.location}</span>
                  <span>{confirmAcceptOrder.distanceKm}km away</span>
                </p>
              </div>
            </div>
            <div className="text-base mt-6 mb-3">
              <div className="font-semibold mb-2">Order Summary</div>
              <div className="flex justify-between text-slate-900">
                <div>
                  {confirmAcceptOrder.items.map((it, i) => (
                    <div key={i} className="py-1">
                      {it.name}
                    </div>
                  ))}
                </div>
                <div className="text-right">
                  {confirmAcceptOrder.items.map((it, i) => (
                    <div key={i} className="py-1">
                      ₦{formatPrice(it.price)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between py-3 border-t border-gray-300">
              <p className="font-semibold ">Total</p>
              <p className="font-semibold ">₦{total?.toLocaleString()}</p>
            </div>
            <p className="py-2">
              By accepting this order, you agree to process and deliver it
              promptly according to the buyer's request.
            </p>

            <div className="flex mt-3 gap-3">
              <button
                onClick={() => setConfirmAcceptOrder(null)}
                className="flex-1 px-4 py-2 border rounded-md font-semibold transition  cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmAccept(confirmAcceptOrder)}
                className="flex-1 px-4 py-2 bg-pri text-white rounded-md font-semibold transition hover:bg-green-700 cursor-pointer"
              >
                Confirm Accept
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject modal */}
      {confirmRejectOrder && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
            <div className="flex items-center justify-center ">
              <TriangleAlert size={40} className="text-red-600" />
            </div>
            <div className="flex items-center justify-between mt-6 mb-4">
              <h3 className="text-lg font-semibold">Reject Order</h3>
            </div>

            <p className="mb-5">
              You are about to reject an order from{" "}
              <strong>{confirmRejectOrder.name}</strong>. Please select a reason
              for rejection to help improve our service.
            </p>

            <div className="grid grid-cols-1 gap-2 mb-3">
              {[
                "Out of stock",
                "Cannot meet delivery time",
                "Product quality does not meet standard",
                "Delivery location outside my service area",
                "Pricing conflict",
                "Others (Please specify)",
              ].map((r) => (
                <label
                  key={r}
                  className={`flex items-center gap-2 p-2 cursor-pointer ${
                    rejectChoice === r ? "border-green-500 bg-green-50" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="rejectReason"
                    value={r}
                    checked={rejectChoice === (r as RejectReason)}
                    onChange={() =>
                      setRejectChoice(r as unknown as RejectReason)
                    }
                    className="cursor-pointer accent-green-600"
                  />
                  <span className="text-sm ">{r}</span>
                </label>
              ))}
            </div>

            {rejectChoice === `Others (Please specify)` && (
              <div className="mb-3">
                <input
                  placeholder="Please specify"
                  value={rejectOtherText}
                  onChange={(e) => setRejectOtherText(e.target.value)}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-300"
                />
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmRejectOrder(null)}
                className="px-4 py-2 w-35 border-2 border-red-300 font-semibold rounded-md cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmReject(confirmRejectOrder)}
                className="px-4 w-35 py-2 bg-red-600 text-white rounded-md font-semibold transition hover:bg-red-700 cursor-pointer"
              >
                Reject Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-3 rounded shadow cursor-default">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4" /> <span>{toast}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DirectOrder;
