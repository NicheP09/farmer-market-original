import React, { useMemo, useState } from "react";
import UserTable from "./UserTable";
import type { User } from "./UserTable";
import { Bell, User2 } from "lucide-react";
import UserDetailsModal from "./UserDetailsModal";
import Id from "../../assets/Admin Images/National-eID-card.webp";
import Cac from "../../assets/Admin Images/cac-sample.jpeg";

const initialUsers: User[] = [
  {
    name: "Alice Jonson",
    role: "Farmer",
    contact: "081253912013",
    document: "ID, CAC",
    status: "Pending",
    idImage: Id,
    cacImage: Cac,
  },
  {
    name: "James Smith",
    role: "Buyer",
    contact: "081253912013",
    document: "ID",
    status: "Pending",
    idImage: Id,
    cacImage: Cac,
  },
  {
    name: "Jane Jude",
    role: "Logistics",
    contact: "081253912013",
    document: "ID, CAC",
    status: "Pending",
    idImage: Id,
    cacImage: Cac,
  },
  {
    name: "John Doe",
    role: "Farmer",
    contact: "081253912013",
    document: "ID, CAC",
    status: "Pending",
    idImage: Id,
    cacImage: Cac,
  },
  {
    name: "Sam Smith",
    role: "Buyer",
    contact: "081253912013",
    document: "ID",
    status: "Pending",
    idImage: Id,
    cacImage: Cac,
  },
];

const UserVerification: React.FC = () => {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All Roles");

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // filtered users by search & role
  const filtered = useMemo(() => {
    return initialUsers.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.contact.includes(search);
      const matchesRole = role === "All Roles" ? true : u.role === role;
      return matchesSearch && matchesRole;
    });
  }, [search, role]);

  const handleClick = (i: number) => {
    setSelectedIndex(i);
    setSelectedUser(filtered[i]);
  };

  return (
    <div className="">
      {/* Title + right-side icons (desktop) */}
      <div className="flex pt-4 md:pt-1 border-b-1  py-3 border[#8c8c8c] items-center justify-between mb-10 md:mb-15">
        <h1 className="text-2xl font-bold">
          Admin{" "}
          <span className="font-semibold text-xl"> &gt; User Verification</span>
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
          placeholder="Search Users"
          className=" p-2 w-[70%] md:w-1/2 font-semibold text-[#8c8c8c] placeholder-[#8c8c8c]  outline-none"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className=" p-2 w-30 md:w-1/4 text-lg font-semibold text-[#8c8c8c]  outline-none"
        >
          <option>All Roles</option>
          <option>Farmer</option>
          <option>Buyer</option>
          <option>Logistics</option>
        </select>
      </div>

      {/* Table */}
      <UserTable
        users={filtered}
        selectedIndex={selectedIndex}
        onRowClick={handleClick}
      />
      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default UserVerification;
