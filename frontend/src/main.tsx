import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { FarmerProvider } from "./context/FarmerContext"; 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <FarmerProvider>
      <App />
    </FarmerProvider>
  </StrictMode>,
)
