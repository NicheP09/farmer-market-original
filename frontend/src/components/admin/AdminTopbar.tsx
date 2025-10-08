import { Menu, Bell } from "lucide-react";
import Logo from "../../assets/Logo-black.svg";
import { Link } from "react-router-dom";

interface Props {
  onMenuClick: () => void;
}

const AdminTopbar = ({ onMenuClick }: Props) => {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 px-4 py-6 flex justify-between items-center  z-30">
      <div className="">
        <Link to="/">
          <img src={Logo} alt="" className="w-[150px]" />
        </Link>
      </div>

      <div className="flex items-center gap-3">
        {/* placeholder space for bell + avatar on mobile header */}
        <Bell size={24} />
        <button
          onClick={onMenuClick}
          aria-label="Open menu"
          className="text-black"
        >
          <Menu size={30} />
        </button>
      </div>
    </div>
  );
};

export default AdminTopbar;
