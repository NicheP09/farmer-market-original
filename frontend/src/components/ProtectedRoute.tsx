// ProtectedRoute.tsx
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useFarmerContext } from "../context/FarmerContext";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { token, role } = useFarmerContext();
  const location = useLocation();

  // Pages allowed without a token (setup pages after signup)
  const allowedWithoutToken = [
    "/businessdetails",
    "/verifyd",
    "/bankingpayment",
    "/successpagefarmer",
    "/verificationcode",
    "/successpage",
    "/marketplace"

  ];

  // Not logged in and trying to access a protected page
  if (!token && !allowedWithoutToken.includes(location.pathname)) {
    return <Navigate to="/signin" replace />;
  }

  // Role restriction: only applies if allowedRoles is provided
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
