import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface FarmerContextType {
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  logout: () => void; // ✅ new: logout function
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
  // ✅ Load from localStorage on app start
  const [phone, setPhone] = useState<string>(() => localStorage.getItem("phone") || "");
  const [userName, setUserName] = useState<string>(() => localStorage.getItem("userName") || "");
  const [role, setRole] = useState<string>(() => localStorage.getItem("role") || "farmer");

  // ✅ Persist to localStorage only if not empty
  useEffect(() => {
    if (phone.trim() !== "") localStorage.setItem("phone", phone);
  }, [phone]);

  useEffect(() => {
    if (userName.trim() !== "") localStorage.setItem("userName", userName);
  }, [userName]);

  useEffect(() => {
    if (role.trim() !== "") localStorage.setItem("role", role);
  }, [role]);

  // ✅ Add a logout handler
  const logout = () => {
    localStorage.removeItem("phone");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
    localStorage.removeItem("token"); // remove token too
    setPhone("");
    setUserName("");
    setRole("farmer");
  };

  const value: FarmerContextType = {
    phone,
    setPhone,
    userName,
    setUserName,
    role,
    setRole,
    logout,
  };

  return (
    <FarmerContext.Provider value={value}>
      {children}
    </FarmerContext.Provider>
  );
};
