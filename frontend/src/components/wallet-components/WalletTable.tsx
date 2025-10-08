import { NavLink } from "react-router-dom";

const statusColors: Record<string, string> = {
  Pending: "text-[#89470c] ",
  "In Escrow": "text-[#0a62b4]",
  "Awaiting Release": "text-[#ff8d28]",
  Refunded: "text-[#ff0d09]",
  Released: "text-pri",
};

const orders = [
  { id: "#2343", product: "Tomatoes", amount: "5,000", status: "Pending" },
  { id: "#2344", product: "Yam", amount: "14,000", status: "In Escrow" },
  {
    id: "#2345",
    product: "Cassava",
    amount: "3,000",
    status: "Awaiting Release",
  },
  { id: "#2346", product: "Rice", amount: "25,000", status: "Refunded" },
  { id: "#2347", product: "Banana", amount: "1,200", status: "Released" },
];

const StatusBadge = ({ status }: { status: string }) => {
  const color = statusColors[status] || "text-gray-500";
  return (
    <div className={`flex items-center gap-2 ${color}`}>
      <span className="w-2.5 h-2.5 rounded-full bg-current"></span>
      <span className="text-sm font-medium">{status}</span>
    </div>
  );
};

const WalletTable = () => {
  return (
    <section className="py-6 px-5 max-w-[1100px]  mx-auto">
      <h2 className="text-black font-bold text-xl mb-10">Orders List</h2>

      <div className="">
        <table className="w-full md:w-[90%] border-collapse border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Order</th>
              <th className="border px-4 py-2 text-left">Product</th>
              <th className="border px-4 py-2 text-left">Amount</th>
              <th className="border px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="border px-4 py-2">{order.id}</td>
                <td className="border px-4 py-2">{order.product}</td>
                <td className="border px-4 py-2">
                  ₦{order.amount.toLocaleString()}
                </td>
                <td className="border px-4 py-2">
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* BUTTON */}

      <div className="mt-12 text-center">
        <NavLink to="farmer">
          <button className=" inline-block border-1 border-pri bg-pri hover:bg-green-600 text-sm  text-white font-semibold text-center py-3 px-8 rounded-lg focus:outline-none transition">
            Go to Dashboard
          </button>
        </NavLink>
      </div>
    </section>
  );
};

export default WalletTable;
