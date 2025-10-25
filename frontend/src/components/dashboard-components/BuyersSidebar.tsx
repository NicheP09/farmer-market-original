import { NavLink, Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo-black.svg";
import { X } from "lucide-react";

import {
  LayoutGrid,
  TrendingUp,
  Box,
  CreditCard,
  MapPin,
  CircleHelp,
  Headphones,
  Settings,
  LogOut,
} from "lucide-react";
import { useFarmerContext } from "../../context/FarmerContext";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const sectionTitle =
  "font-bold text-[19px] md:text-sm text-gray-500 uppercase px-3 mt-3 mb-4 md:mb-2";

const Sidebar = ({ open, onClose }: Props) => {
  const { userName, setUserName, logout } = useFarmerContext();

  // ✅ Load username from localStorage if not already set
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName && !userName) {
      setUserName(storedName);
    }
  }, [userName, setUserName]);

  const displayName = userName || "buyer";
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const linkclass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center font-bold text-lg md:text-sm gap-3 px-3 mb-2 rounded-md transition-colors duration-200 ${
      isActive ? "text-pri" : "text-black hover:text-pri"
    }`;

  // 🧩 Avatar fallback function
  const renderAvatar = () => {
    const imageSrc = localStorage.getItem("userImage"); // optional: if you plan to store user image
    if (imageSrc) {
      return (
        <img
          src={imageSrc}
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover border border-gray-200"
        />
      );
    }

    const initial = userName ? userName.charAt(0).toUpperCase() : "?";
    return (
      <div className="w-10 h-10 rounded-full bg-pri flex items-center justify-center text-xl font-bold text-white border border-gray-200">
        {initial}
      </div>
    );
  };

  return (
    <>
      {/* BIG SCREEN SIDEBAR */}
      <aside className="font-dm-sans hidden sticky top-0 left-0 h-screen md:flex md:flex-col md:w-64">
        <div className="ml-6 mt-5 mb-3">
          <NavLink to="/" className="text-2xl cursor-pointer">
            <img src={Logo} alt="logo" className="w-[100px] md:w-[150px]" />
          </NavLink>
        </div>

        {/* MAIN TAB */}
        <div className="flex-1">
          <div className="pl-4 h-full w-full text-sm pt-1 pb-5 bg-[#f5f5f5]">
            <div className={sectionTitle}>Main</div>
            <nav className="flex flex-col gap-2 ml-3">
              <NavLink to="/buyerdashboard/overview" end className={linkclass}>
                <LayoutGrid className="w-5 h-5" /> Dashboard
              </NavLink>

              <NavLink to="/marketplace" className={linkclass}>
                <TrendingUp className="w-5 h-5" /> Marketplace
              </NavLink>
            </nav>

            {/* TRANSACTION TAB */}
            <div className={sectionTitle}>Transaction</div>
            <nav className="flex flex-col gap-2 ml-3">
              <NavLink
                to="/buyerdashboard/ordermanagement"
                className={linkclass}
              >
                <Box className="w-5 h-5" /> Order Management
              </NavLink>

              <NavLink to="/buyerpaymentacceptance" className={linkclass}>
                <CreditCard className="w-5 h-5" /> Payments
              </NavLink>

              <NavLink to="/ordertracking" className={linkclass}>
                <MapPin className="w-5 h-5" /> Track Order
              </NavLink>
            </nav>

            {/* ACCOUNTS */}
            <div className={sectionTitle}>Accounts</div>
            <nav className="flex flex-col gap-2 ml-3">
              <NavLink to="/systempage" className={linkclass}>
                <CircleHelp className="w-5 h-5" /> System
              </NavLink>

              <NavLink to="/supportpage" className={linkclass}>
                <Headphones className="w-5 h-5" /> Support
              </NavLink>

              <NavLink to="/settingspage" className={linkclass}>
                <Settings className="w-5 h-5" /> Settings
              </NavLink>
            </nav>

            {/* USER */}
            <div className="mt-10 pl-3">
              <div className="flex items-center gap-3">
                <div>{renderAvatar()}</div>
                <div className="flex flex-col gap-0.5">
                  <div className="font-semibold text-sm">{`${displayName}`}</div>
                  <div className="text-sm font-medium text-[#999999]">
                    Buyer
                  </div>
                </div>
              </div>

              <button
                className="mt-4 flex items-center ml-4 font-semibold gap-2 cursor-pointer  hover:text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 font-bold" /> Logout
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* MOBILE RESPONSIVENESS */}
      {open && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-30"
            onClick={onClose}
          ></div>
          <div className="absolute left-0 top-0 h-full w-72 min-h-screen overflow-x-auto bg-white py-4 shadow">
            <div className="flex items-center px-4 w-full justify-between mb-6">
              <NavLink to="/" className="text-2xl cursor-pointer">
                <img src={Logo} alt="logo" className="w-[120px]" />
              </NavLink>

              <button
                onClick={onClose}
                className="text-gray-600"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-black font-bold cursor-pointer" />
              </button>
            </div>

            {/* MAIN TAB */}
            <div className="pl-4 py-3 w-full bg-[#f5f5f5]">
              <div className={sectionTitle}>Main</div>
              <nav className="flex flex-col gap-2 ml-3">
                <NavLink
                  to="/buyerdashboard/overview"
                  end
                  className={linkclass}
                >
                  <LayoutGrid className="w-5 h-5" /> Dashboard
                </NavLink>

                <NavLink to="/marketplace" className={linkclass}>
                  <TrendingUp className="w-5 h-5" /> Marketplace
                </NavLink>
              </nav>

              {/* TRANSACTION TAB */}
              <div className={sectionTitle}>Transaction</div>
              <nav className="flex flex-col gap-2 ml-3">
                <NavLink
                  to="/buyerdashboard/ordermanagement"
                  className={linkclass}
                >
                  <Box className="w-5 h-5" /> Order Management
                </NavLink>

                <NavLink to="/buyerpaymentacceptance" className={linkclass}>
                  <CreditCard className="w-5 h-5" /> Payments
                </NavLink>

                <NavLink to="/ordertracking" className={linkclass}>
                  <MapPin className="w-5 h-5" /> Track Order
                </NavLink>
              </nav>

              {/* ACCOUNTS */}
              <div className={sectionTitle}>Accounts</div>
              <nav className="flex flex-col gap-2 ml-3">

                <NavLink to="/systempage" className={linkclass}>
                  <CircleHelp className="w-5 h-5" /> System
                </NavLink>

                <NavLink to="/supportpage" className={linkclass}>
                  <Headphones className="w-5 h-5" /> Support
                </NavLink>

                <NavLink to="/settingpage" className={linkclass}>
                  <Settings className="w-5 h-5" /> Settings
                </NavLink>
              </nav>

              {/* USER */}
              <div className="mt-auto pl-3 py-15">
                <div className="flex items-center gap-3">
                  <div>{renderAvatar()}</div>
                  <div className="flex flex-col gap-0.5">
                    <div className="font-bold text-lg">{displayName}</div>
                    <div className="text-base font-medium text-[#999999]">
                      Buyer
                    </div>
                  </div>
                </div>

                <Link to="/">
                  <button
                    className="mt-4 flex items-center ml-4 font-semibold text-lg gap-2 cursor-pointer  hover:text-red-600"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 font-bold" /> Logout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
