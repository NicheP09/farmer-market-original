import { createContext, useContext, useState,  } from "react";
import type { ReactNode } from "react";

// 1. Define the type for your context state
interface FarmerContextType {
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
}

// 2. Create context with proper type (or undefined initially)
const FarmerContext = createContext<FarmerContextType | undefined>(undefined);

// 3. Hook to use the context safely
export const useFarmerContext = () => {
  const context = useContext(FarmerContext);
  if (!context) {
    throw new Error("useFarmerContext must be used within a FarmerProvider");
  }
  return context;
};

// 4. Provider component with children typing
interface FarmerProviderProps {
  children: ReactNode;
}

export const FarmerProvider: React.FC<FarmerProviderProps> = ({ children }) => {
  const [phone, setPhone] = useState<string>("");

  const value: FarmerContextType = {
    phone,
    setPhone,
  };

  return <FarmerContext.Provider value={value}>{children}</FarmerContext.Provider>;
};
