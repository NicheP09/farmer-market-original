import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useFarmerContext } from "../context/FarmerContext";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { token: contextToken, role: contextRole } = useFarmerContext();

  // ✅ Pull from localStorage as backup
  const storedToken = localStorage.getItem("token");
  const storedRole = localStorage.getItem("role");

  const token = contextToken || storedToken;
  const role = contextRole || storedRole;

  if (!token) {
    // ❌ Not logged in at all
    return <Navigate to="/signin" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role || "")) {
    // ❌ Logged in but role not allowed
    return <Navigate to="/" replace />;
  }

  // ✅ Authorized
  return <>{children}</>;
};

export default ProtectedRoute;
