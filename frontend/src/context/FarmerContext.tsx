import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface FarmerContextType {
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
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
  // Initialize state from localStorage (or default values)
  const [phone, setPhone] = useState<string>(() => localStorage.getItem("phone") || "");
  const [userName, setUserName] = useState<string>(() => localStorage.getItem("userName") || "");
  const [role, setRole] = useState<string>(() => localStorage.getItem("role") || "farmer"); // Default to farmer

  // Persist phone number
  useEffect(() => {
    if (phone) {
      localStorage.setItem("phone", phone);
    }
  }, [phone]);

  // Persist username
  useEffect(() => {
    if (userName) {
      localStorage.setItem("userName", userName);
    }
  }, [userName]);

  // Persist role (always fallback to farmer)
  useEffect(() => {
    localStorage.setItem("role", role || "farmer");
  }, [role]);

  const value: FarmerContextType = {
    phone,
    setPhone,
    userName,
    setUserName,
    role,
    setRole,
  };

  return (
    <FarmerContext.Provider value={value}>
      {children}
    </FarmerContext.Provider>
  );
};
