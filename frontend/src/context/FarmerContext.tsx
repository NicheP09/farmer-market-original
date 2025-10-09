import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";


interface FarmerContextType {
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
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
  const [phone, setPhone] = useState<string>("");
  const [userName, setUserName] = useState<string>('')

  const value: FarmerContextType = {
    phone,
    setPhone,
    userName,
    setUserName
  };

  return (
    <FarmerContext.Provider value={value}>{children}</FarmerContext.Provider>
  );
};
