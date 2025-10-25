import { createContext, useContext, useState, ReactNode } from "react";

interface PaymentData {
  confirmationId: string;
  amount: number;
  method: string;
  customerName: string;
  phone: string;
  address: string;
  location: string;
  paymentDate: string;
}

interface PaymentContextType {
  paymentData: PaymentData | null;
  setPaymentData: React.Dispatch<React.SetStateAction<PaymentData | null>>;
  clearPaymentData: () => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const usePaymentContext = () => {
  const context = useContext(PaymentContext);
  if (!context)
    throw new Error("usePaymentContext must be used within PaymentProvider");
  return context;
};

const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

  const clearPaymentData = () => setPaymentData(null);

  return (
    <PaymentContext.Provider
      value={{ paymentData, setPaymentData, clearPaymentData }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentProvider;
