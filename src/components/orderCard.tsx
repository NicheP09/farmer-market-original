import React from "react";
import { type Order } from "../type/order";

interface Props {
  order: Order;
}

const OrderCard: React.FC<Props> = ({ order }) => {
  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(n);

  // Presentational only — buttons are static (no handlers)
  return (
    <article className="bg-white rounded-2xl shadow-sm p-6 w-full max-w-[540px]">
      <div className="flex items-start gap-4">
        <img
          src={order.avatar}
          alt={order.name}
          className="w-12 h-12 rounded-full object-cover"
        />

        <div className="flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="font-semibold text-gray-800">{order.name}</div>
              <div className="text-xs text-gray-400">
                {order.location} · {order.distance}
              </div>
            </div>

            <div className="text-sm text-right">
              <div
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  order.status === "Accepted"
                    ? "bg-green-100 text-green-700"
                    : order.status === "Rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-indigo-100 text-indigo-700"
                }`}
              >
                {order.status}
              </div>
              <div className="text-xs text-gray-400 mt-2">{order.time}</div>
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-500">Requested Item:</div>

          <div className="mt-2 text-sm text-gray-700">
            {order.items.map((it, idx) => (
              <div key={idx} className="flex justify-between py-1">
                <div>{it.name}</div>
                <div className="font-medium">{formatCurrency(it.price)}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="px-3 py-2 rounded-lg border border-green-200 bg-green-50 text-green-700 text-sm"
              >
                Accept
              </button>
              <button
                type="button"
                className="px-3 py-2 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm"
              >
                Reject
              </button>
            </div>

            <div className="text-sm text-gray-500">View details</div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default OrderCard;
