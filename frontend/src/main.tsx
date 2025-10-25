import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { FarmerProvider } from "./context/FarmerContext";
import PaymentProvider from "./context/PaymentContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FarmerProvider>
      <PaymentProvider>
        <App />
      </PaymentProvider>
    </FarmerProvider>
  </StrictMode>
);
