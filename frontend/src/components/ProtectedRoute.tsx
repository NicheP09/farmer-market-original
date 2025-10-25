
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

  // ✅ Allow temporary access to setup page after signup
  const allowedWithoutToken = [
    "/businessdetails",
    '/verifyd', 
    '/bankingpayment', 
    '/successpagefarmer',
    '/verificationcode',
    "/successpage",
     "/forgot",
     "/otppage", 

 ];
 

  if (!token && !allowedWithoutToken.includes(location.pathname)) {
    return <Navigate to="/signin" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
