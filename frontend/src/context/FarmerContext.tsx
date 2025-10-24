// src/context/FarmerContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface FarmerContextType {
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  logout: () => void;
}

const FarmerContext = createContext<FarmerContextType | undefined>(undefined);

export const useFarmerContext = () => {
  const context = useContext(FarmerContext);
  if (!context) {
    throw new Error("useFarmerContext must be used within a FarmerProvider");
  }
  return context;
};

interface FarmerProviderProps {
  children: ReactNode;
}

export const FarmerProvider: React.FC<FarmerProviderProps> = ({ children }) => {
  const [phone, setPhone] = useState(() => localStorage.getItem("phone") || "");
  const [userName, setUserName] = useState(() => localStorage.getItem("userName") || "");
  const [role, setRole] = useState(() => localStorage.getItem("role") || "");
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  // ✅ Persist changes to localStorage only when they exist
  useEffect(() => {
    if (phone) localStorage.setItem("phone", phone);
  }, [phone]);

  useEffect(() => {
    if (userName) localStorage.setItem("userName", userName);
  }, [userName]);

  useEffect(() => {
    if (role) localStorage.setItem("role", role.toLowerCase());
  }, [role]);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
  }, [token]);

  const logout = () => {
    localStorage.removeItem("phone");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    setPhone("");
    setUserName("");
    setRole("");
    setToken("");
  };

  const value: FarmerContextType = {
    phone,
    setPhone,
    userName,
    setUserName,
    role,
    setRole,
    token,
    setToken,
    logout,
  };

  return <FarmerContext.Provider value={value}>{children}</FarmerContext.Provider>;
};
