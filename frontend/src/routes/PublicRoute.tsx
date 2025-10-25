import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useFarmerContext } from "../context/FarmerContext";

interface PublicRouteProps { children: ReactNode; }

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { token, role } = useFarmerContext();

  if (token) {
    if (role === "farmer") return <Navigate to="/farmerdashboardnew" replace />;
    if (role === "buyer") return <Navigate to="/buyerdashboard" replace />;
    if (role === "admin") return <Navigate to="/admindashboard" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
