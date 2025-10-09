import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  UserCheck,
  AlertCircle,
  Truck,
  CreditCard,
  Settings,
  Headphones,
  Cog,
  LogOut,
  User,
} from "lucide-react";

/**
 * Sidebar component.
 * - When mobile === false -> renders the fixed desktop sidebar (hidden on small screens)
 * - When mobile === true  -> renders a slide-in drawer overlay controlled by isOpen
 *
 * Uses NavLink so active route receives the green background:
 *   active style: bg-green-600 text-white (matches image's active selection)
 */

interface Props {
  mobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  {
    name: "User Verification",
    path: "userverification",
    icon: <UserCheck size={18} />,
  },
  { name: "Dispute", path: "dispute", icon: <AlertCircle size={18} /> },
  { name: "Track Order", path: "/track-order", icon: <Truck size={18} /> },
  { name: "Payment", path: "/payment", icon: <CreditCard size={18} /> },
  { name: "System", path: "/system", icon: <Settings size={18} /> },
  { name: "Support", path: "/support", icon: <Headphones size={18} /> },
  { name: "Settings", path: "/settings", icon: <Cog size={18} /> },
];

const AdminSidebar: React.FC<Props> = ({
  mobile = false,
  isOpen = false,
  onClose,
}) => {
  // shared sidebar inner content
  const content = (
    <div className="flex flex-col sticky top-0 left-0  justify-between h-full">
      <div>
        <ul className="space-y-2">
          <div className="px-3 flex gap-3 mb-5 items-center">
            <LayoutDashboard size={18} />
            <span className=" text-xl font-bold">Dashboard</span>
          </div>
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                end={item.path === "/"} // exact match for root
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 px-3  py-3 rounded-md bg-green-600 text-white font-semibold"
                    : "flex items-center gap-3 px-3 py-3 rounded-md text-gray-600 hover:text-green-600"
                }
                onClick={() => mobile && onClose?.()}
              >
                {item.icon}
                <span className="font-semibold">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/*admin info + logout */}
      <div className="pt-4">
        <div className="flex items-center gap-3 pt-4">
          <div className="rounded-full w-13 bg-gray-300 h-13 flex items-center justify-center">
            <User className="w-7 h-7" />
          </div>

          <div>
            <div className="font-bold text-gray-800">Sarah Smith</div>
            <div className="text-sm text-gray-500">Admin</div>
          </div>
        </div>

        <button
          className="mt-4 ml-2 flex items-center gap-2 text-black font-semibold hover:text-red-600"
          onClick={() => {
            alert(`Are you sure you want to logout?`);
          }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );

  if (!mobile) {
    // Desktop left column (hidden on small screens)
    return (
      <aside className="hidden md:flex flex-col bg-[#f5f5f5] sticky h-screen top-0 left-0 w-64 px-5 py-4">
        {content}
      </aside>
    );
  }

  // Mobile drawer: overlay + sliding panel
  return (
    <div
      className={`md:hidden fixed inset-0 z-40 transition-opacity ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      {/* dark overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity ${
          isOpen ? "opacity-30" : "opacity-0"
        }`}
        onClick={onClose}
      ></div>

      {/* panel */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white p-5 transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default AdminSidebar;
