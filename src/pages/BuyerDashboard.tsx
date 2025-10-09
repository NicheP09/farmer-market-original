import { useState } from "react";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import BuyerSidebar from "../components/dashboard-components/BuyersSidebar";
import Logo from "../assets/Logo-black.svg";

import { Menu, Bell } from "lucide-react";

const BuyerDashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* SIDEBAR */}
      <BuyerSidebar open={open} onClose={() => setOpen(false)} />
      {/* <Sidebar open={open} onClose={() => setOpen(false)} /> */}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex-col  ">
        {/* MOBILE TOP BAR WITH HAMBURGER */}
        <div className="md:hidden flex items-center z-20 p-5 justify-between ">
          <NavLink to="/" className="text-2xl  cursor-pointer">
            <img src={Logo} alt="logo" className="w-[150px]" />
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
              <button onClick={() => setOpen(true)}>
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

export default BuyerDashboard;
