import React from "react";

/** user type used by the table */
export interface User {
  name: string;
  role: string;
  contact: string;
  document: string;
  status: string;
  idImage?: string;
  cacImage: string;
}

interface Props {
  users: User[];
  selectedIndex: number | null;
  onRowClick?: (index: number) => void;
}

const UserTable: React.FC<Props> = ({ users, selectedIndex, onRowClick }) => {
  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="w-full hidden md:table text-left border-collapse">
        <thead className=" text-[#737373]  table-header">
          <tr className="text-center">
            <th className="py-5">Name</th>
            <th className="py-5">Role</th>
            <th className="py-5">Contact</th>
            <th className="py-5">Document</th>
            <th className="py-5">Status</th>
          </tr>
        </thead>

        <tbody className="text-black text-[15px]">
          {users.map((u, i) => {
            const isSelected = selectedIndex === i;
            return (
              <tr
                key={i}
                onClick={() => onRowClick?.(i)}
                className={`border-t cursor-pointer text-center transition-colors ${
                  isSelected ? "bg-gray-100" : "hover:bg-gray-50"
                }`}
              >
                <td className="py-5">{u.name}</td>
                <td className="py-5">{u.role}</td>
                <td className="py-5">{u.contact}</td>
                <td className="py-5">{u.document}</td>
                <td className="py-5">
                  <span className="bg-[#fff1db] text-[#ff8d28] px-3 py-2 rounded-md text-sm">
                    {u.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* MOBILE TABLE */}
      <table className="w-full  md:hidden text-left border-collapse">
        <thead className=" text-black text-sm uppercase table-header">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Role</th>

            <th className="p-4">Status</th>
          </tr>
        </thead>

        <tbody className="text-black">
          {users.map((u, i) => {
            const isSelected = selectedIndex === i;
            return (
              <tr
                key={i}
                onClick={() => onRowClick?.(i)}
                className={`border-t cursor-pointer transition-colors ${
                  isSelected ? "bg-gray-100" : "hover:bg-gray-50"
                }`}
              >
                <td className="p-4">{u.name}</td>
                <td className="p-4">{u.role}</td>

                <td className="p-4">
                  <span className="bg-[#fff1db] text-[#ff8d28] px-3 py-2 rounded-md text-sm">
                    {u.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
