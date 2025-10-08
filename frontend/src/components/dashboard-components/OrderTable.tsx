import {
  UserRound,
  Hash,
  ScrollText,
  MonitorSmartphone,
  GlobeLock,
  LocateFixed,
  RefreshCcw,
} from "lucide-react";

import type { Order } from "./Order";
import { orders } from "./Order";

function statusClassess(status: Order["status"]) {
  if (status === "Accepted") return `text-pri bg-[#e5fff2]`;
  if (status === "Rejected") return `text-[#d50000] bg-[#f1dfdf]`;
  return `text-[#ff8d28] bg-[#fff1db]`;
}

const OrderTable = () => {
  return (
    <div className=" w-full ">
      {/* BIG SCREEN TABLE */}
      <table className="min-w-full text-sm hidden md:table">
        <thead className="text-[#737373] font-medium border-[#cccccc] border-b-2">
          <tr>
            <th className="px-4  whitespace-nowrap py-5 text-left">
              <Hash className="w-4 h-4 inline-block" />
              Order ID
            </th>
            <th className="px-4  whitespace-nowrap py-5 text-left">
              <UserRound className="w-4 h-4 inline-block mr-2" />
              Farmer name
            </th>
            <th className="px-4  whitespace-nowrap py-5 text-left">
              <ScrollText className="w-4 h-4 inline-block mr-2" />
              Items
            </th>
            <th className="px-4  whitespace-nowrap py-5 text-left">
              <MonitorSmartphone className="w-4 h-4 inline-block mr-2" />
              Order date
            </th>
            <th className="px-4  whitespace-nowrap py-5 text-left">
              <GlobeLock className="w-4 h-4 inline-block mr-2" />
              Location
            </th>
            <th className="px-4  whitespace-nowrap py-5 text-left">
              <RefreshCcw className="w-4 h-4 inline-block mr-2" />
              Status
            </th>
            <th className="px-4  whitespace-nowrap py-5 text-left">
              <LocateFixed className="w-4 h-4 inline-block mr-2" />
              Tracking number
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-[#cccccc] border-b last-of-type:border-0 hover:bg-gray-50"
            >
              <td className="px-4 py-5 whitespace-nowrap text-center  text-[13px] font-medium text-black">
                {order.id}
              </td>
              <td className="px-4 py-5 whitespace-nowrap text-center font-medium text-[13px] text-black">
                {order.farmer}
              </td>
              <td className="px-4 py-5 whitespace-nowrap text-center font-medium text-[13px] text-black">
                {order.items}
              </td>
              <td className="px-4 py-5 whitespace-nowrap text-center font-medium text-[13px] text-black">
                {order.date}
              </td>
              <td className="px-4 py-5 whitespace-nowrap text-center font-medium text-[13px] text-black">
                {order.location}
              </td>
              <td className="px-4 py-5 whitespace-nowrap text-center font-medium text-[13px]">
                <span
                  className={`px-3 py-2 rounded-md text-xs font-medium ${statusClassess(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </td>
              <td className="px-4 py-5 whitespace-nowrap text-center font-medium text-[13px] text-black">
                {order.trackingId}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MOBILE TABLE */}
      <table className="min-w-full text-sm md:hidden table">
        <thead className="text-[#737373] font-medium border-[#cccccc] border-b-2">
          <tr>
            <th className="px-2  whitespace-nowrap py-2 text-left">
              <Hash className="w-4 h-4 inline-block" />
              Order ID
            </th>
            <th className="px-2  whitespace-nowrap py-2 text-left">
              <UserRound className="w-4 h-4 inline-block mr-2" />
              Farmer name
            </th>

            <th className="px-2  whitespace-nowrap py-2 text-left">
              <ScrollText className="w-4 h-4 inline-block mr-2" />
              Items
            </th>

            <th className="px-2  whitespace-nowrap py-2 text-left">
              <RefreshCcw className="w-4 h-4 inline-block mr-2" />
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-[#cccccc] border-b last-of-type:border-0 hover:bg-gray-50"
            >
              <td className="px-4 py-5 whitespace-nowrap text-center  text-[13px] font-medium text-black">
                {order.id}
              </td>
              <td className="px-4 py-5 whitespace-nowrap text-center font-medium text-[13px] text-black">
                {order.farmer}
              </td>

              <td className="px-4 py-5 whitespace-nowrap text-center font-medium text-[13px] text-black">
                {order.items}
              </td>

              <td className="px-4 py-5 whitespace-nowrap text-center font-medium text-[13px]">
                <span
                  className={`px-3 py-2 rounded-md text-xs font-medium ${statusClassess(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
