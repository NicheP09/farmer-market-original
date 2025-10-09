import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminTopbar from "../components/admin/AdminTopbar";
import AdminSidebar from "../components/admin/AdminSidebar";

const Admindashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobile = () => setMobileOpen((v) => !v);
  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="min-h-screen flex">
      {/* Desktop sidebar */}
      <AdminSidebar mobile={false} />

      {/* Topbar for mobile (hamburger) */}
      <AdminTopbar onMenuClick={toggleMobile} />

      {/* Mobile sliding sidebar */}
      <AdminSidebar mobile={true} isOpen={mobileOpen} onClose={closeMobile} />

      {/* Main content area */}
      <main className="flex-1 p-6 mt-16 md:mt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default Admindashboard;
