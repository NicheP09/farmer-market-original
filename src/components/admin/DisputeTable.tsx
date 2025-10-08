import React from "react";

/** user type used by the table */
export interface Dispute {
  disputeId: string;
  name: string;
  orderId: string;
  date: string;
  status: "Resolved" | "In review";
  description: string;
  image?: string;
}

interface Props {
  disputes: Dispute[];
  selectedIndex: number | null;
  onRowClick?: (index: number) => void;
}

const DisputeTable: React.FC<Props> = ({
  disputes,
  selectedIndex,
  onRowClick,
}) => {
  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="w-full hidden md:table text-left border-collapse">
        <thead className=" text-[#737373]  table-header">
          <tr className="text-center">
            <th className="py-5">Dispute ID</th>
            <th className="py-5">Name</th>
            <th className="py-5">Order ID</th>
            <th className="py-5">Date</th>
            <th className="py-5">Status</th>
          </tr>
        </thead>

        <tbody className="text-black text-[15px]">
          {disputes.map((d, i) => {
            const isSelected = selectedIndex === i;
            return (
              <tr
                key={i}
                onClick={() => onRowClick?.(i)}
                className={`border-t cursor-pointer text-center transition-colors ${
                  isSelected ? "bg-gray-100" : "hover:bg-gray-50"
                }`}
              >
                <td className="py-5">{d.disputeId}</td>
                <td className="py-5">{d.name}</td>
                <td className="py-5">{d.orderId}</td>
                <td className="py-5">{d.date}</td>
                <td className="py-5">
                  {d.status === "Resolved" ? (
                    <span className="bg-[#86e825] text-black px-3 py-2 rounded-md text-sm">
                      {d.status}
                    </span>
                  ) : (
                    <span className="bg-[#fff1db] text-[#ff8d28] px-3 py-2 rounded-md text-sm">
                      {d.status}
                    </span>
                  )}
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
          {disputes.map((d, i) => {
            const isSelected = selectedIndex === i;
            return (
              <tr
                key={i}
                onClick={() => onRowClick?.(i)}
                className={`border-t cursor-pointer transition-colors ${
                  isSelected ? "bg-gray-100" : "hover:bg-gray-50"
                }`}
              >
                <td className="p-4">{d.name}</td>
                <td className="p-4">{d.orderId}</td>

                <td className="p-4">
                  {d.status === "Resolved" ? (
                    <span className="bg-[#86e825] text-black px-3 py-2 rounded-md text-sm">
                      {d.status}
                    </span>
                  ) : (
                    <span className="bg-[#fff1db] text-[#ff8d28] px-3 py-2 rounded-md text-sm">
                      {d.status}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {disputes.length === 0 && (
        <div className="p-6 text-center text-black">No disputes found.</div>
      )}
    </div>
  );
};

export default DisputeTable;
