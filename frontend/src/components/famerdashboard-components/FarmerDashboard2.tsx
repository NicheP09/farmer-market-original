import { useEffect, useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Bell, Menu } from "lucide-react";
import Logo from "../../../assets/Group(1).png";
import FarmerSidebar from "./FarmerSidebar";

/**
 * FarmerDashboard layout
 * - holds the sidebar and the outlet for nested pages
 * - controls the mobile drawer open state
 */
const FarmerDashboardNew = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer whenever the route changes (nice UX)
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Optional: ensure drawer is closed if user resizes to md+
  /* useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []); */

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar receives open state & close callback */}
      <FarmerSidebar isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Main content area
          - md:ml-64 pushes content right to account for fixed sidebar width
          - Topbar only appears on mobile (md:hidden inside Topbar)
      */}
      <div className="flex-1 flex-col  ">
        {/* MOBILE TOP BAR WITH HAMBURGER */}
        <div className="md:hidden flex items-center z-20 p-5 justify-between ">
          <NavLink to="/" className="text-2xl  cursor-pointer">
            <div className="flex items-center gap-2">
              <div className=" w-8 h-8 rounded flex items-center justify-center font-bold">
                <img src={Logo} />
              </div>
              <span className="text-lg font-semibold text-gray-800">
                FarmMarket
              </span>
            </div>
          </NavLink>
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center p-2 ">
              <div className="absolute top-[4px] right-[4px] w-[14px] h-[14px] rounded-full flex justify-center items-center bg-red-600 p-1 text-[10px] text-white font-semibold">
                4
              </div>
              <button>
                <Bell className="w-5 h-5 font-bold" />
              </button>
            </div>
            <div className="">
              <button onClick={() => setMobileOpen(true)}>
                <Menu className="w-6 h-6 font-bold" />
              </button>
            </div>
          </div>
        </div>

        {/* OUTLET FOR NESTED ROUTES */}
        <div className=" md:py-4 max-w-5xl mx-auto w-full ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboardNew;