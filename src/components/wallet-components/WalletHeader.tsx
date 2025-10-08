import { Bell, Settings } from "lucide-react";
import Logo from "../../assets/marketplace-images/Asset 9.svg";
import Image from "../../assets/marketplace-images/Ellipse 1.svg";

const WalletHeader = () => {
  return (
    <header className="bg-pri font-dm-sans sticy top-0 left-0 text-white">
      <div className="max-w-[1100px]  mx-auto px-4 py-4 sm:py-6 md:py-6 flex items-center justify-between">
        {/* LOGO */}
        <div className="w-[150px] md:w-[180px] ">
          <img src={Logo} alt="Logo" />
        </div>

        {/* AVATAR */}
        <div className="flex items-center gap-3">
          <button className="p-2 rounded cursor-pointer hover:bg-green-600/4 focus:outline-none focus:ring-2 focus:ring-white/30">
            <Bell className="w-6 h-6" />
          </button>
          <button className="p-2 rounded cursor-pointer hover:bg-green-600/4 focus:outline-none focus:ring-2 focus:ring-white/30">
            <Settings className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2">
            <img
              src={Image}
              alt="Profile Image"
              className="w-15 h-15 rounded-full object-cover"
            />

            <div className="hidden sm:flex gap-1.5 flex-col leading-tight">
              <span className="text-[15px] font-semibold">
                John Caleb Ekong
              </span>
              <span className="text-[13px] font-medium text-[#d9d9d9] ">
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
