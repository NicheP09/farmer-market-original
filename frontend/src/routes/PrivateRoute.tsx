// PrivateRoute.tsx
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useFarmerContext } from "../context/FarmerContext";

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const { token, role } = useFarmerContext();

  if (!token) return <Navigate to="/signin" replace />;

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Redirect to correct dashboard if role mismatch
    switch (role) {
      case "farmer":
        return <Navigate to="/farmerdashboardnew" replace />;
      case "buyer":
        return <Navigate to="/buyerdashboard" replace />;
      case "admin":
        return <Navigate to="/admindashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default PrivateRoute;
