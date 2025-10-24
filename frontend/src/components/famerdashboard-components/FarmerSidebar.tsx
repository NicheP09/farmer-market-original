import { useEffect, useState } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/group1.png";
import Image from "../../assets/marketplace-images/Ellipse 1.svg";
import { useFarmerContext } from "../../context/FarmerContext";
import {
  LayoutDashboard,
  Upload,
  Users,
  Truck,
  ShoppingCart,
  MapPin,
  CreditCard,
  Settings,
  HelpCircle,
  Cog,
  ChevronDown,
  ChevronRight,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FarmerSidebar({ isOpen, onClose }: SidebarProps) {
  const { userName, setUserName, logout } = useFarmerContext();
  const location = useLocation();
  const navigate = useNavigate();

  // List of paths for order section
  const orderPaths = [
    "/orders/buyers-request",
    "/orders/deliveries",
    "/orders/direct-order",
    "/orders/track-order",
  ];

  const isOrderSectionActive = orderPaths.some((p) =>
    location.pathname.startsWith(p)
  );

  const [openOrder, setOpenOrder] = useState<boolean>(isOrderSectionActive);

  // 🧠 Persist username on page reload
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, [setUserName]);

  useEffect(() => {
    if (isOrderSectionActive) setOpenOrder(true);
  }, [isOrderSectionActive]);

  const maybeCloseOnMobile = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      onClose();
    }
  };

  // ✅ Updated Logout function
 const handleLogout = () => {
    setUserName("");
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/signin");
  };

  const baseLink =
    "flex items-center gap-3 pl-4 pr-2 py-1 rounded-md text-black font-semibold hover:text-pri transition cursor-pointer";
  const activeLink = "bg-pri text-white hover:text-white font-bold ";

  return (
    <>
      {/* BIGSCREEN */}
      <aside
        aria-label="Main navigation"
        className={`
          sticky top-0 left-0 h-screen hidden overflow-y-auto w-67 bg-[#f5f5f5] z-50
          transition-transform duration-300 ease-in-out
          md:translate-x-0  md:flex md:flex-col
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2 ">
          <Link to="/">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded flex items-center justify-center font-bold">
                <img src={Logo} alt="FarmMarket Logo" />
              </div>
              <span className="text-lg font-semibold text-gray-800">
                FarmMarket
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 pt-3 pb-4 space-y-4">
          {/* ===== MAIN ===== */}
          <div>
            <p className="uppercase text-sm text-gray-400 font-bold mb-2 tracking-wider">
              Main
            </p>
            <ul className="space-y-1">
              <li>
                <NavLink
                  to="/farmerdashboardnew/farmeroverview"
                  onClick={maybeCloseOnMobile}
                  className={({ isActive }) =>
                    `${baseLink} ${isActive ? activeLink : ""}`
                  }
                >
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/farmerdashboardnew/farmerupload"
                  onClick={maybeCloseOnMobile}
                  className={({ isActive }) =>
                    `${baseLink} ${isActive ? activeLink : ""}`
                  }
                >
                  <Upload size={18} />
                  <span>Upload Produce</span>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* ===== TRANSACTION ===== */}
          <div>
            <p className="uppercase text-sm text-gray-400 font-bold mb-2 tracking-wider">
              Transaction
            </p>

            <ul className="space-y-1">
              {/* Collapsible Order Management */}
              <li>
                <button
                  onClick={() => setOpenOrder((s) => !s)}
                  aria-expanded={openOrder}
                  className={`w-full flex items-center justify-between font-semibold pl-4 pr-1 py-2 rounded-md text-black hover:text-pri hover:bg-gray-50 transition cursor-pointer ${
                    isOrderSectionActive ? activeLink : ""
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <ShoppingCart size={18} />
                    <span className="whitespace-nowrap">Order Management</span>
                  </span>

                  <span className="flex items-center mt-1.5">
                    {openOrder ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </span>
                </button>

                {openOrder && (
                  <ul className="mt-1 ml-6 space-y-1">
                    {[
                      {
                        to: "/farmerdashboardnew/farmerbuyerrequest",
                        label: "Buyers Request",
                        Icon: Users,
                      },
                      {
                        to: "/farmerdashboardnew/delivery",
                        label: "Deliveries",
                        Icon: Truck,
                      },
                      {
                        to: "/orders/direct-order",
                        label: "Direct Order",
                        Icon: ShoppingCart,
                      },
                      {
                        to: "/farmerdashboardnew/farmertrackorder",
                        label: "Track Order",
                        Icon: MapPin,
                      },
                    ].map(({ to, label, Icon }) => (
                      <li key={to}>
                        <NavLink
                          to={to}
                          onClick={maybeCloseOnMobile}
                          className={({ isActive }) =>
                            `${baseLink} text-sm pl-6 ${
                              isActive ? activeLink : ""
                            }`
                          }
                        >
                          <Icon size={16} />
                          <span>{label}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {/* Payment */}
              <li>
                <NavLink
                  to="/wallet"
                  onClick={maybeCloseOnMobile}
                  className={({ isActive }) =>
                    `${baseLink} ${isActive ? activeLink : ""}`
                  }
                >
                  <CreditCard size={18} />
                  <span>Wallet</span>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* ===== ACCOUNT ===== */}
          <div>
            <p className="uppercase text-sm text-gray-400 font-bold mb-2 tracking-wider">
              Account
            </p>

            <ul className="space-y-1">
              <li>
                <NavLink
                  to="/system"
                  onClick={maybeCloseOnMobile}
                  className={({ isActive }) =>
                    `${baseLink} ${isActive ? activeLink : ""}`
                  }
                >
                  <Settings size={18} />
                  <span>System</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/support"
                  onClick={maybeCloseOnMobile}
                  className={({ isActive }) =>
                    `${baseLink} ${isActive ? activeLink : ""}`
                  }
                >
                  <HelpCircle size={18} />
                  <span>Support</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/settings"
                  onClick={maybeCloseOnMobile}
                  className={({ isActive }) =>
                    `${baseLink} ${isActive ? activeLink : ""}`
                  }
                >
                  <Cog size={18} />
                  <span>Settings</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>

        {/* ===== FOOTER / PROFILE ===== */}
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={Image}
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-black">{`${userName}`}</p>
              <p className="text-sm font-semibold text-gray-500">Farmer</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center font-semibold ml-4 gap-2 hover:text-red-600 text-base cursor-pointer"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* MOBILE RESPONSIVENESS */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          {/* OVERLAY */}
          <div
            onClick={onClose}
            className="absolute inset-0 bg-black opacity-30"
          ></div>
          <div className="absolute left-0 top-0 h-full w-68 min-h-screen bg-white overflow-x-auto shadow py-4">
            <Link to="/">
              <div className="flex px-4 items-center gap-2">
                <div className=" w-8 h-8 rounded flex items-center justify-center font-bold">
                  <img src={Logo} />
                </div>
                <span className="text-lg font-semibold text-gray-800">
                  FarmMarket
                </span>
              </div>
            </Link>

            <div>
              {/* Navigation - scrollable if content overflows */}
              <nav className="flex-1  px-4 pt-3 pb-4 space-y-4">
                {/* ===== MAIN ===== */}
                <div>
                  <p className="uppercase text-sm  text-gray-400 font-bold mb-2 tracking-wider">
                    Main
                  </p>

                  <ul className="space-y-1">
                    {/* Dashboard */}
                    <li>
                      <NavLink
                        to="/farmerdashboardnew/farmeroverview"
                        onClick={maybeCloseOnMobile}
                        className={({ isActive }) =>
                          `${baseLink} ${isActive ? activeLink : ""}`
                        }
                      >
                        <LayoutDashboard size={18} />
                        <span>Dashboard</span>
                      </NavLink>
                    </li>

                    {/* Marketplace */}
                    <li>
                      <NavLink
                        to="/farmerdashboardnew/farmerupload"
                        onClick={maybeCloseOnMobile}
                        className={({ isActive }) =>
                          `${baseLink} ${isActive ? activeLink : ""}`
                        }
                      >
                        <Upload size={18} />
                        <span>Upload Produce</span>
                      </NavLink>
                    </li>
                  </ul>
                </div>

                {/* ===== TRANSACTION ===== */}
                <div>
                  <p className="uppercase text-sm  text-gray-400 font-bold mb-2 tracking-wider">
                    Transaction
                  </p>

                  <ul className="space-y-1">
                    {/* Collapsible Order Management */}
                    <li>
                      <button
                        onClick={() => setOpenOrder((s) => !s)}
                        aria-expanded={openOrder}
                        className={`w-full flex items-center justify-between font-semibold pl-4 pr-1 py-2 rounded-md text-black hover:text-pri hover:bg-gray-50 transition cursor-pointer ${
                          isOrderSectionActive ? activeLink : ""
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <ShoppingCart size={18} />
                          <Link to="/ordermanagement">
                            {" "}
                            <span className="whitespace-nowrap">
                              Order Management
                            </span>
                          </Link>
                        </span>

                        {/* chevron rotates depending on open state */}
                        <span className="flex items-center mt-1.5">
                          {openOrder ? (
                            <ChevronDown size={16} />
                          ) : (
                            <ChevronRight size={16} />
                          )}
                        </span>
                      </button>

                      {/* Sublinks (smaller text, indented) */}
                      {openOrder && (
                        <ul className="mt-1 ml-6 space-y-1">
                          {[
                            {
                              to: "/farmerdashboardnew/farmerbuyerrequest",
                              label: "Buyers Request",
                              Icon: Users,
                            },
                            {
                              to: "/farmerdashboardnew/delivery",
                              label: "Deliveries",
                              Icon: Truck,
                            },
                            {
                              to: "/orders/direct-order",
                              label: "Direct Order",
                              Icon: ShoppingCart,
                            },
                            {
                              to: "/farmerdashboardnew/farmertrackorder",
                              label: "Track Order",
                              Icon: MapPin,
                            },
                          ].map(({ to, label, Icon }) => (
                            <li key={to}>
                              <NavLink
                                to={to}
                                onClick={maybeCloseOnMobile}
                                className={({ isActive }) =>
                                  `${baseLink} text-sm pl-6 ${
                                    isActive ? activeLink : ""
                                  }`
                                }
                              >
                                {/* icon component */}
                                <Icon size={16} />
                                <span>{label}</span>
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>

                    {/* Payment (single link) */}
                    <li>
                      <NavLink
                        to="/payment"
                        onClick={maybeCloseOnMobile}
                        className={({ isActive }) =>
                          `${baseLink} ${isActive ? activeLink : ""}`
                        }
                      >
                        <CreditCard size={18} />
                        <span>Payment</span>
                      </NavLink>
                    </li>
                  </ul>
                </div>

                {/* ===== ACCOUNT ===== */}
                <div>
                  <p className="uppercase text-sm  text-gray-400 font-bold mb-2 tracking-wider">
                    Account
                  </p>

                  <ul className="space-y-1">
                    <li>
                      <NavLink
                        to="/system"
                        onClick={maybeCloseOnMobile}
                        className={({ isActive }) =>
                          `${baseLink} ${isActive ? activeLink : ""}`
                        }
                      >
                        <Settings size={18} />
                        <span>System</span>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/support"
                        onClick={maybeCloseOnMobile}
                        className={({ isActive }) =>
                          `${baseLink} ${isActive ? activeLink : ""}`
                        }
                      >
                        <HelpCircle size={18} />
                        <span>Support</span>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/settings"
                        onClick={maybeCloseOnMobile}
                        className={({ isActive }) =>
                          `${baseLink} ${isActive ? activeLink : ""}`
                        }
                      >
                        <Cog size={18} />
                        <span>Settings</span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </nav>

              {/* Footer / Profile */}
              <div className=" px-4 py-4">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={Image}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-black">{userName}</p>
                    <p className="text-sm font-semibold text-gray-500">
                      Farmer
                    </p>
                  </div>
                </div>

                <Link to="/">
                  <button
                    onClick={handleLogout}
                    className="flex items-center font-semibold ml-4 gap-2 hover:text-red-600 text-base cursor-pointer"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
