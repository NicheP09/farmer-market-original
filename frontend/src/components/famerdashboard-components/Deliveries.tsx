import React, { useEffect, useMemo, useState } from "react";
import {
  Download,
  Plus,
  Search as SearchIcon,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  X,
} from "lucide-react";

type Status = "Scheduled" | "In Transit" | "Delivered" | "Delayed" | "Pending";

type Delivery = {
  id: string;
  datetime: string;
  recipient: string;
  recipientLocation?: string;
  produceSummary: string[];
  weightLbs: number;
  crates: number;
  status: Status;
};

localStorage.removeItem("farmerDeliveries");

const STORAGE_KEY = "farmerDeliveries_exact_image_v1";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

const statusClass = (s: Status) =>
  s === "In Transit"
    ? "bg-indigo-100 text-indigo-700 py-1 px-3 text-sm font-semibold align-middle rounded-xl"
    : s === "Scheduled"
    ? "bg-sky-50 text-sky-700 py-1 px-3 text-sm font-semibold align-middle rounded-xl"
    : s === "Delivered"
    ? "bg-green-100 text-green-700 py-1 px-3 text-sm font-semibold align-middle rounded-xl"
    : s === "Delayed"
    ? "bg-red-50 text-red-700 py-1 px-3 text-sm font-semibold align-middle rounded-xl"
    : "bg-yellow-100 text-yellow-700 py-1 px-3 text-sm font-semibold align-middle rounded-x";

const seedMockDeliveries = (): Delivery[] => {
  const rows: Delivery[] = [
    {
      id: "DEL-2025-101",
      datetime: "2025-10-25T08:30:00",
      recipient: "Fresh Market Co.",
      recipientLocation: "Main Depot",
      produceSummary: ["Fresh Tomatoes", "lettuce", "Carrots"],
      weightLbs: 450,
      crates: 20,
      status: "In Transit",
    },
    {
      id: "DEL-2025-105",
      datetime: "2025-10-22T12:30:00",
      recipient: "Local Grocer",
      recipientLocation: "Central",
      produceSummary: ["Fresh Tomatoes", "lettuce", "and co"],
      weightLbs: 300,
      crates: 10,
      status: "Delayed",
    },
    {
      id: "DEL-2025-102",
      datetime: "2025-10-24T10:00:00",
      recipient: "Green Valley Store",
      recipientLocation: "North Branch",
      produceSummary: ["Apple", "Pears"],
      weightLbs: 280,
      crates: 12,
      status: "Scheduled",
    },
    {
      id: "DEL-2025-103",
      datetime: "2025-10-23T14:15:00",
      recipient: "Organic Plus",
      recipientLocation: "Main Store",
      produceSummary: ["Spinach", "kale", "Herbs"],
      weightLbs: 125,
      crates: 8,
      status: "Delivered",
    },

    {
      id: "DEL-2025-104",
      datetime: "2025-10-22T11:45:00",
      recipient: "Farm Fresh Market",
      recipientLocation: "East Side",
      produceSummary: ["Potatoes", "Onions", "root veg"],
      weightLbs: 680,
      crates: 24,
      status: "Delayed",
    },
    {
      id: "DEL-2025-105",
      datetime: "2025-10-22T12:30:00",
      recipient: "Local Grocer",
      recipientLocation: "Central",
      produceSummary: ["Fresh Tomatoes", "lettuce", "and co"],
      weightLbs: 300,
      crates: 10,
      status: "Delayed",
    },
    {
      id: "DEL-2025-106",
      datetime: "2025-10-21T09:20:00",
      recipient: "City Produce",
      recipientLocation: "Warehouse 3",
      produceSummary: ["Cabbage", "Carrots"],
      weightLbs: 220,
      crates: 9,
      status: "Delayed",
    },
    // a few extras for pagination/testing
    {
      id: "DEL-2025-107",
      datetime: "2025-10-20T08:00:00",
      recipient: "Neighborhood Market",
      recipientLocation: "South",
      produceSummary: ["Bananas", "Plantain"],
      weightLbs: 190,
      crates: 7,
      status: "In Transit",
    },
    {
      id: "DEL-2025-108",
      datetime: "2025-10-19T13:45:00",
      recipient: "Green Grocers Ltd",
      recipientLocation: "Outlet 2",
      produceSummary: ["Apples", "Pears"],
      weightLbs: 320,
      crates: 11,
      status: "Delivered",
    },
    {
      id: "DEL-2025-109",
      datetime: "2025-10-18T15:00:00",
      recipient: "Fresh Picks",
      recipientLocation: "Corner",
      produceSummary: ["Mixed vegetables"],
      weightLbs: 150,
      crates: 6,
      status: "Scheduled",
    },
    {
      id: "DEL-2025-110",
      datetime: "2025-10-17T07:30:00",
      recipient: "Harvest Hub",
      recipientLocation: "North",
      produceSummary: ["Tomatoes", "Onions"],
      weightLbs: 500,
      crates: 20,
      status: "In Transit",
    },
  ];

  return rows;
};

const FarmerDeliveries = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | Status | "">("All");
  const [dateRange, setDateRange] = useState<"All" | "7" | "30">("7");
  const [recipientFilter, setRecipientFilter] = useState<"All" | string>("All");
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [page, setPage] = useState(1);

  // PAGE SIZE
  const PAGE_SIZE = 7;
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Load or seed
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seed = seedMockDeliveries();
      setDeliveries(seed);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      return;
    }
    try {
      const parsed = JSON.parse(raw) as Delivery[];
      if (!Array.isArray(parsed) || parsed.length === 0) {
        const seed = seedMockDeliveries();
        setDeliveries(seed);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      } else {
        setDeliveries(parsed);
      }
    } catch {
      const seed = seedMockDeliveries();
      setDeliveries(seed);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    }
  }, []);

  // reset to page 1 when filters change (pageSize removed from deps)
  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, dateRange, recipientFilter]);

  const recipients = useMemo(() => {
    const setRec = new Set<string>();
    deliveries.forEach((d) => setRec.add(d.recipient));
    return ["All", ...Array.from(setRec)];
  }, [deliveries]);

  const delayedCount = deliveries.filter((d) => d.status === "Delayed").length;

  const filtered = useMemo(() => {
    const now = Date.now();
    return deliveries.filter((d) => {
      const q = search.trim().toLowerCase();
      if (q) {
        if (
          !d.id.toLowerCase().includes(q) &&
          !d.recipient.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      if (statusFilter !== "All" && statusFilter !== "") {
        if (d.status !== statusFilter) return false;
      }
      if (recipientFilter !== "All") {
        if (d.recipient !== recipientFilter) return false;
      }
      if (dateRange === "7") {
        const diff = now - new Date(d.datetime).getTime();
        if (diff > 7 * 24 * 60 * 60 * 1000) return false;
      } else if (dateRange === "30") {
        const diff = now - new Date(d.datetime).getTime();
        if (diff > 30 * 24 * 60 * 60 * 1000) return false;
      }
      return true;
    });
  }, [deliveries, search, statusFilter, dateRange, recipientFilter]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goToPage = (n: number) => {
    if (n < 1 || n > totalPages) return;
    setPage(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const exportCSV = () => {
    const header = [
      "Shipment ID",
      "Date/Time",
      "Recipient",
      "Location",
      "Produce Summary",
      "Weight (lbs)",
      "Crates",
      "Status",
    ];
    const rows = filtered.map((d) => [
      d.id,
      new Date(d.datetime).toLocaleString(),
      d.recipient,
      d.recipientLocation || "",
      d.produceSummary.join("; "),
      d.weightLbs?.toString() ?? "",
      d.crates?.toString() ?? "",
      d.status,
    ]);
    const csvRows = [header, ...rows].map((r) =>
      r
        .map((c) => {
          const value = `${String(c).replace(/"/g, '""')}`;
          return `"${value}"`;
        })
        .join(",")
    );
    const csv = csvRows.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `deliveries_export_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // schedule modal form
  const [form, setForm] = useState({
    recipient: "",
    recipientLocation: "",
    datetime: new Date().toISOString().slice(0, 16),
    produce: "",
    weightLbs: "",
    crates: "",
    status: "Scheduled" as Status,
  });

  const openSchedule = () => {
    setForm({
      recipient: "",
      recipientLocation: "",
      datetime: new Date().toISOString().slice(0, 16),
      produce: "",
      weightLbs: "",
      crates: "",
      status: "Scheduled",
    });
    setShowScheduleModal(true);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextId = `DEL-${new Date().getFullYear()}-${String(
      Math.floor(Math.random() * 900 + 100)
    )}`;
    const newDelivery: Delivery = {
      id: nextId,
      datetime: new Date(form.datetime).toISOString(),
      recipient: form.recipient || "Unknown Recipient",
      recipientLocation: form.recipientLocation,
      produceSummary: form.produce
        ? form.produce
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [],
      weightLbs: Number(form.weightLbs) || 0,
      crates: Number(form.crates) || 0,
      status: form.status,
    };
    const updated = [newDelivery, ...deliveries];
    setDeliveries(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setShowScheduleModal(false);
    setSuccessMessage("New delivery scheduled!");
    setTimeout(() => setSuccessMessage(null), 2500);
  };

  // cycle status quick demo action
  const cycleStatus = (id: string) => {
    setDeliveries((dels) => {
      const updated = dels.map((d) => {
        if (d.id !== id) return d;
        const order: Status[] = [
          "Scheduled",
          "In Transit",
          "Delivered",
          "Delayed",
        ];
        const idx = order.indexOf(d.status);
        const next = order[(idx + 1) % order.length];
        return { ...d, status: next };
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="px-6 pt-2 pb-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm ">
        {/* Alert */}
        {delayedCount > 0 && (
          <div className="border-b hidden px-6 py-3 bg-red-50 rounded-t-lg">
            <div className="max-w-6xl mx-auto flex items-center gap-3 text-sm text-red-700">
              <AlertTriangle className="w-4 h-4" />
              <span>
                <strong>Alert:</strong> {delayedCount} deliveries are currently
                delayed and require immediate attention.
              </span>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="px-6 py-5 pb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Delivery Schedule
            </h2>
            <p className="text-base text-slate-600">
              Manage and monitor your farm produce deliveries
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 px-3 py-2 shadow-sm font-semibold cursor-pointer rounded-md bg-slate-50 hover:bg-slate-100"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <button
              onClick={openSchedule}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 cursor-pointer font-semibold text-white rounded hover:bg-green-700 "
            >
              <Plus className="w-4 h-4" /> New Schedule
            </button>
          </div>
        </div>

        <div className="px-6">
          <div className="flex items-center bg-white border border-pri rounded-md px-3 py-3 w-full">
            <SearchIcon className="w-4 h-4 text-slate-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Shipment ID or Recipient..."
              className="ml-3 outline-none w-full text-base text-slate-500"
            />
          </div>
        </div>
        {/* Filters */}
        <div className="px-6 pt-3 pb-4">
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <div className="flex gap-3 w-full md:w-auto items-center">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-2 py-3 border border-pri focus:ring-2 focus:ring-pri rounded-md text-sm"
              >
                <option value="All">All Status</option>
                <option>Scheduled</option>
                <option>In Transit</option>
                <option>Delivered</option>
                <option>Delayed</option>
                <option>Pending</option>
              </select>

              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as any)}
                className="px-2 py-3 border-pri focus:ring-2 focus:ring-pri border rounded-md text-sm"
              >
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
                <option value="All">All Time</option>
              </select>

              <select
                value={recipientFilter}
                onChange={(e) => setRecipientFilter(e.target.value as any)}
                className="px-2 py-3 border border-pri focus:ring-2 focus:ring-pri rounded-md text-sm"
              >
                {recipients.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>

              <button
                onClick={() => {
                  setSearch("");
                  setStatusFilter("All");
                  setDateRange("7");
                  setRecipientFilter("All");
                }}
                className="px-2 py-3 shadow-sm font-semibold cursor-pointer whitespace-nowrap rounded-md text-sm"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Table & Mobile Cards */}
        <div className="px-4 pb-6">
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead className="bg-slate-50 text-slate-600 text-[15px] uppercase">
                <tr className="bg-gray-200 py-2">
                  <th className="px-4 py-3 text-left">SHIPMENT ID</th>
                  <th className="px-4 py-3 text-left">DATE/TIME</th>
                  <th className="px-4 py-3 text-left">RECIPIENT</th>
                  <th className="px-4 py-3 text-left">PRODUCE SUMMARY</th>
                  <th className="px-4 py-3 text-center">WEIGHT/QTY</th>
                  <th className="px-4 py-3 text-center">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((d) => (
                  <tr key={d.id} className="border-b last:border-b-0">
                    <td className="px-4 py-5 text-sm text-blue-600 font-medium">
                      {d.id}
                    </td>
                    <td className="px-4 py-5 text-sm">
                      <div>{formatDate(d.datetime)}</div>
                      <div className="text-[13px] text-slate-400">
                        {formatTime(d.datetime)}
                      </div>
                    </td>
                    <td className="px-4 py-5 text-sm">
                      <div className="font-medium">{d.recipient}</div>
                      {d.recipientLocation && (
                        <div className="text-[13px] text-slate-400">
                          {d.recipientLocation}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-5 text-sm">
                      <div className="leading-5">
                        {d.produceSummary.slice(0, 3).map((p, i) => (
                          <div key={i}>
                            {p}
                            {i < d.produceSummary.length - 1 ? "," : ""}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-5 text-sm text-center">
                      <div>{d.weightLbs} lbs</div>
                      <div className="text-[15px] text-slate-400">
                        {d.crates} crates
                      </div>
                    </td>
                    <td className="px-4 py-5 text-sm text-center">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${statusClass(
                          d.status
                        )}`}
                        style={{ minWidth: 80, justifyContent: "center" }}
                      >
                        {d.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* mobile */}
          <div className="md:hidden grid grid-cols-1 gap-4">
            {pageItems.map((d) => (
              <div key={d.id}>
                <div className="bg-white p-4 border rounded-lg shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium text-blue-600">
                        {d.id}
                      </div>
                      <div className="text-xs text-slate-500">
                        {formatDate(d.datetime)} • {formatTime(d.datetime)}
                      </div>
                      <div className="mt-2 font-semibold text-slate-800">
                        {d.recipient}
                      </div>
                      {d.recipientLocation && (
                        <div className="text-xs text-slate-500">
                          {d.recipientLocation}
                        </div>
                      )}
                    </div>
                    <div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusClass(
                          d.status
                        )}`}
                      >
                        {d.status}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 text-sm text-slate-700 space-y-1">
                    <div>
                      <strong>Produce:</strong> {d.produceSummary.join(", ")}
                    </div>
                    <div>
                      <strong>Weight:</strong> {d.weightLbs} lbs • {d.crates}{" "}
                      crates
                    </div>
                  </div>

                  <div className="mt-3 flex justify-end gap-2">
                    <button
                      onClick={() => cycleStatus(d.id)}
                      className="px-3 py-1 text-sm rounded border"
                    >
                      Cycle Status
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer / Pagination */}
        <div className="px-6 py-4 border-t flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-sm text-slate-600">
            Showing {(page - 1) * PAGE_SIZE + 1} to{" "}
            {Math.min(page * PAGE_SIZE, total)} of {total} results
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="p-2 rounded border disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const n = i + 1;
              return (
                <button
                  key={n}
                  onClick={() => goToPage(n)}
                  className={`px-3 py-1 rounded ${
                    n === page ? "bg-green-600 text-white" : "border"
                  }`}
                >
                  {n}
                </button>
              );
            })}

            <button
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              className="p-2 rounded border disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">New Schedule</h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="text-slate-500"
              >
                <X />
              </button>
            </div>

            <form onSubmit={handleScheduleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm text-slate-600">
                  Recipient
                </label>
                <input
                  required
                  value={form.recipient}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, recipient: e.target.value }))
                  }
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-slate-600">
                    Date & Time
                  </label>
                  <input
                    required
                    type="datetime-local"
                    value={form.datetime}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, datetime: e.target.value }))
                    }
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-600">
                    Location
                  </label>
                  <input
                    value={form.recipientLocation}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        recipientLocation: e.target.value,
                      }))
                    }
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-600">
                  Produce (comma-separated)
                </label>
                <input
                  value={form.produce}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, produce: e.target.value }))
                  }
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <input
                  value={form.weightLbs}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, weightLbs: e.target.value }))
                  }
                  placeholder="Weight (lbs)"
                  className="border px-3 py-2 rounded"
                />
                <input
                  value={form.crates}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, crates: e.target.value }))
                  }
                  placeholder="Crates"
                  className="border px-3 py-2 rounded"
                />
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, status: e.target.value as Status }))
                  }
                  className="border px-3 py-2 rounded"
                >
                  <option>Scheduled</option>
                  <option>In Transit</option>
                  <option>Delivered</option>
                  <option>Delayed</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success toast */}
      {successMessage && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default FarmerDeliveries;
