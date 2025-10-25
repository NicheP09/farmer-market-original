import { Bell, Settings } from "lucide-react";
import Logo from "../../assets/marketplace-images/Asset 9.svg";

import { useFarmerContext } from "../../context/FarmerContext";

const WalletHeader = () => {
  const { userName } = useFarmerContext();

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
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl font-bold text-pri border border-gray-200">
        {initial}
      </div>
    );
  };

  return (
    <header className="bg-pri font-dm-sans sticky top-0 left-0 text-white z-50">
      <div className="max-w-[1100px] mx-auto px-4 py-4 sm:py-6 md:py-6 flex items-center justify-between">
        {/* LOGO */}
        <div className="w-[150px] md:w-[180px]">
          <img src={Logo} alt="Logo" />
        </div>

        {/* AVATAR / USER INFO */}
        <div className="flex items-center gap-3">
          <button className="p-2 rounded hover:bg-green-600/40 focus:outline-none focus:ring-2 focus:ring-white/30">
            <Bell className="w-6 h-6" />
          </button>

          <button className="p-2 rounded hover:bg-green-600/40 focus:outline-none focus:ring-2 focus:ring-white/30">
            <Settings className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2">
            <div>{renderAvatar()}</div>

            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-[15px] font-semibold">
                {userName || "Farmer"}
              </span>
              <span className="text-[13px] font-medium text-[#d9d9d9]">
                Farmer
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default WalletHeader;
