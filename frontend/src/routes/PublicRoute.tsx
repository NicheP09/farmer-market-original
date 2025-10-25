
import { Navigate } from "react-router-dom";
import { useFarmerContext } from "../context/FarmerContext";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { token, role } = useFarmerContext();

  // ✅ If user already logged in, redirect based on role
  if (token) {
    if (role === "farmer") return <Navigate to="/farmerdashboardnew" replace />;
    if (role === "buyer") return <Navigate to="/buyerdashboard" replace />;
    if (role === "admin") return <Navigate to="/admindashboard" replace />;
  }

  // ✅ Otherwise, show the page (e.g., Signin or Signup)
  return <>{children}</>;
};

export default PublicRoute;
