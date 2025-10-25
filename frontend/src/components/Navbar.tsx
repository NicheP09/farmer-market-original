import { useState, useRef, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import NavLogo from "../assets/Home-Images/Logo 2.svg";
import { useFarmerContext } from "../context/FarmerContext";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const { userName, token, logout, role } = useFarmerContext();

  const handleDashboard = () => {
    switch (role?.toLowerCase()) {
      case "farmer":
        navigate("/farmerdashboardnew");
        break;
      case "buyer":
        navigate("/buyerdashboard");
        break;
      case "admin":
        navigate("/admin/dashboard");
        break;
      default:
        navigate("/signin");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🧩 Avatar fallback logic
  const renderAvatar = () => {
    const imageSrc = localStorage.getItem("userImage");
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
      <div className="w-10 h-10 rounded-full bg-white text-pri flex items-center justify-center text-xl font-bold border border-gray-200">
        {initial}
      </div>
    );
  };

  // 🧠 User dropdown menu
  const userDropdown = (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center gap-2 cursor-pointer select-none"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        {renderAvatar()}
        <ChevronDown size={18} className="text-white" />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-3 w-44 bg-white overflow-hidden text-gray-700 rounded-md shadow-md z-50 border border-gray-100 animate-fadeIn">
          <button
            onClick={() => {
              handleDashboard();
              setDropdownOpen(false);
            }}
            className="w-full text-left px-4 py-2 font-semibold hover:text-pri cursor-pointer transition"
          >
            Dashboard
          </button>
          <button
            onClick={() => {
              navigate("/settings");
              setDropdownOpen(false);
            }}
            className="w-full text-left px-4 py-2 font-semibold hover:text-pri cursor-pointer transition"
          >
            Settings
          </button>
          <button
            onClick={() => {
              logout();
              navigate("/");
              setDropdownOpen(false);
            }}
            className="w-full text-left px-4 py-2 font-semibold text-red-600 hover:text-red-700 cursor-pointer transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );

  return (
    <nav className="bg-pri text-white h-[94px] relative z-50">
      <div className="max-w-[1100px] px-5 flex justify-between items-center w-full h-full mx-auto">
        {/* Logo */}
        <NavLink to="/" className="w-[150px] cursor-pointer">
          <img src={NavLogo} alt="logo" />
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-12">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "font-bold text-sec" : "font-bold text-light-2"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "font-bold text-sec" : "font-bold text-light-2"
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "font-bold text-sec" : "font-bold text-light-2"
            }
          >
            Contact Us
          </NavLink>
        </ul>

        {/* ✅ Desktop Right Section */}
        <div className="hidden md:flex items-center gap-3">
          {!token ? (
            <>
              <Link to="/signuphome">
                <button className="bg-sec border-2 border-sec outline-0 w-28 transition text-black text-sm font-bold py-[11px] px-5 rounded-md hover:bg-sec2 hover:border-sec2">
                  Sign Up
                </button>
              </Link>
              <Link to="/signin">
                <button className="border-2 border-sec w-28 transition outline-0 cursor-pointer text-sec text-sm font-bold py-[11px] px-3 rounded-md hover:bg-sec hover:text-black">
                  Log In
                </button>
              </Link>
            </>
          ) : (
            userDropdown
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden cursor-pointer focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-pri text-white px-5 py-4 space-y-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "block font-bold text-sec"
                : "block font-bold text-light-2"
            }
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "block font-bold text-sec"
                : "block font-bold text-light-2"
            }
            onClick={() => setIsOpen(false)}
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "block font-bold text-sec"
                : "block font-bold text-light-2"
            }
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </NavLink>

          {/* ✅ Mobile Auth Section */}
          {!token ? (
            <div className="flex flex-col gap-3 pt-4">
              <Link to="/signuphome" onClick={() => setIsOpen(false)}>
                <button className="bg-sec w-full border-2 border-sec outline-0 transition text-black text-sm font-bold py-[11px] px-5 rounded-md hover:bg-sec2 hover:border-sec2">
                  Sign Up
                </button>
              </Link>
              <Link to="/signin" onClick={() => setIsOpen(false)}>
                <button className="border-2 border-sec w-full transition outline-0 cursor-pointer text-sec text-sm font-bold py-[11px] px-3 rounded-md hover:bg-sec hover:text-black">
                  Log In
                </button>
              </Link>
            </div>
          ) : (
            <div className="">
              {/* <div className="flex items-center gap-3 mb-3">
                {renderAvatar()} <span>{userName}</span>
              </div> */}
              <button
                onClick={() => {
                  handleDashboard();
                  setIsOpen(false);
                }}
                className="block w-full text-left font-bold text-light-2 hover:text-sec transition py-2"
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  navigate("/settings");
                  setIsOpen(false);
                }}
                className="block w-full text-left font-bold text-light-2 hover:text-sec transition py-2"
              >
                Settings
              </button>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                  setIsOpen(false);
                }}
                className="block w-full text-left text-red-400 hover:text-red-500 transition py-2"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
