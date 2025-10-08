import React from "react";
import logo from "../assets/verified.png";
import { useNavigate } from "react-router-dom";

interface Props {
  link:string
}

const SuccessPage: React.FC<Props> = ({link}) => {
  const navDashboard = useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-xl shadow-md p-8 sm:p-10 max-w-md w-full text-center">
        
        <img
          src={logo}
          alt="Account created successfully"
          className="w-16 h-16 mx-auto mb-4"
        />

        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Successful!
        </h1>

    
        <p className="text-gray-600 mb-6">
          Welcome to <strong>FarmMarket</strong>! Your Buyer account has been
          created successfully.
        </p>

        <button
          className="bg-green-btn hover:bg-green-dark focus:outline-none focus:ring-2 focus:ring-green-dark focus:ring-opacity-50 text-white font-medium py-2 px-6 rounded-md transition duration-200 cursor-pointer"
          onClick={() => {
          
            navDashboard(`${link}`)
          }}
        >
          Continue to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
