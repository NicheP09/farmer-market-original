import { Menu } from "lucide-react";

interface TopbarProps {
  onOpen: () => void;
}

/**
 * Topbar (mobile only)
 * Logo left, hamburger right using flex justify-between
 */
export default function Topbar({ onOpen }: TopbarProps) {
  return (
    <header className="md:hidden sticky top-0 z-40 bg-white border-b">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo (left) */}
        <div className="flex items-center gap-2">
          <div className="bg-green-600 w-8 h-8 rounded flex items-center justify-center text-white font-bold">
            F
          </div>
          <span className="text-lg font-semibold text-gray-800">
            FarmMarket
          </span>
        </div>

        {/* Hamburger (right) */}
        <button
          aria-label="Open menu"
          onClick={onOpen}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}