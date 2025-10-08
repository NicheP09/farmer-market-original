import React from "react";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({
  title = "Dashboard",
  subtitle = "Welcome Caleb",
}) => {
  return (
    <header className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <div className="text-sm text-gray-400 mt-1">{subtitle}</div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification (visual only) */}
        <div className="p-2 rounded-full hover:bg-gray-100">🔔</div>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src="https://i.pravatar.cc/40?img=7"
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
