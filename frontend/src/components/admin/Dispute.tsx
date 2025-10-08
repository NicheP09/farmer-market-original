import React, { useMemo, useState } from "react";
import type { Dispute } from "./DisputeTable";
import { Bell, User2 } from "lucide-react";
import DisputeModal from "./DisputeModal";

import Receipt from "../../assets/Admin Images/receipt.webp";
import DisputeTable from "./DisputeTable";

const initialUsers: Dispute[] = [
  {
    disputeId: "001",
    name: "Jane Jude",
    orderId: "1023",
    date: "May 20, 2025",
    status: "Resolved",
    image: Receipt,
    description: "Refund request processed successfully.",
  },
  {
    disputeId: "002",
    name: "John Doe",
    orderId: "1005",
    date: "July 10, 2025",
    status: "In review",
    description: "Customer reported delayed delivery of goods.",
  },
  {
    disputeId: "003",
    name: "Alice Johnson",
    orderId: "3061",
    date: "Sep 10, 2025",
    status: "In review",
    image: Receipt,
    description: "Dispute raised for wrong product received.",
  },
  {
    disputeId: "004",
    name: "Mike Smart",
    orderId: "4005",
    date: "Sep 15, 2025",
    status: "In review",
    description: "Dispute raised for wrong product received.",
  },
  {
    disputeId: "005",
    name: "Sam Smith",
    orderId: "4050",
    date: "Sep 20, 2025",
    status: "In review",
    image: Receipt,
    description: "Dispute raised for wrong product received.",
  },
];

const DisputePage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All status");

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [selectedUser, setSelectedUser] = useState<Dispute | null>(null);

  // filtered users by search & role
  const filtered = useMemo(() => {
    return initialUsers.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.orderId.includes(search) ||
        d.disputeId.includes(search);
      const matchesStatus =
        statusFilter === "All status" ? true : d.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const handleClick = (i: number) => {
    setSelectedIndex(i);
    setSelectedUser(filtered[i]);
  };

  return (
    <div className="">
      {/* Title + right-side icons (desktop) */}
      <div className="flex pt-4 md:pt-1 border-b-1  py-3 border[#8c8c8c] items-center justify-between mb-10 md:mb-15">
        <h1 className="text-2xl font-bold">
          Admin <span className="font-semibold text-xl"> &gt; Disputes</span>
        </h1>

        {/* right-side icons */}
        <div className="hidden md:flex items-center gap-4">
          <Bell className="text-gray-500" />
          <div className="rounded-full w-15 bg-gray-300 h-15 flex items-center justify-center">
            <User2 className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* Search input + role select */}
      <div className="flex  w-full border rounded-lg py-1 px-3  justify-between mb-6 gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search disputes"
          className=" p-2 w-[70%] md:w-1/2 font-semibold text-[#8c8c8c] placeholder-[#8c8c8c]  outline-none"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className=" p-2 w-30 md:w-1/4 text-lg font-semibold text-[#8c8c8c]  outline-none"
        >
          <option>All status</option>
          <option>Resolved</option>
          <option>In review</option>
        </select>
      </div>

      {/* Table */}
      <DisputeTable
        disputes={filtered}
        selectedIndex={selectedIndex}
        onRowClick={handleClick}
      />
      {selectedUser && (
        <DisputeModal
          dispute={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default DisputePage;
