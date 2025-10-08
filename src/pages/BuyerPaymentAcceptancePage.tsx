import { Bell, Settings, BadgeCheck } from "lucide-react";
import Logo from "../assets/marketplace-images/Asset 9.svg";
import Image from "../assets/marketplace-images/Ellipse 1.svg";
import { NavLink } from "react-router-dom";

const BuyerPaymentAcceptancePage = () => {
  return (
    <div>
      {/* HEADER */}
      <header className="bg-pri font-dm-sans sticy top-0 left-0 text-white">
        <div className="max-w-[1100px]  mx-auto px-4 py-4 sm:py-6 md:py-6 flex items-center justify-between">
          {/* LOGO */}
          <div className="w-[150px] md:w-[180px] ">
            <img src={Logo} alt="Logo" />
          </div>

          {/* AVATAR */}
          <div className="flex items-center gap-3">
            <button className="p-2 rounded cursor-pointer hover:bg-green-600/4 focus:outline-none focus:ring-2 focus:ring-white/30">
              <Bell className="w-6 h-6" />
            </button>
            <button className="p-2 rounded cursor-pointer hover:bg-green-600/4 focus:outline-none focus:ring-2 focus:ring-white/30">
              <Settings className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-2">
              <img
                src={Image}
                alt="Profile Image"
                className="w-15 h-15 rounded-full object-cover"
              />

              <div className="hidden sm:flex gap-1.5 flex-col leading-tight">
                <span className="text-[15px] font-semibold">
                  John Caleb Ekong
                </span>
                <span className="text-[13px] font-medium text-[#d9d9d9] ">
                  Buyer
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/*  */}
      <div className="max-w-3xl py-20 px-7 mx-auto">
        {/* TOP SUCCESS ICON */}
        <div className="flex flex-col justify-center items-center">
          <div className="">
            <BadgeCheck className="w-16 h-16 md:w-20 md:h-20 text-green-600" />
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-semibold my-6">
            Order has been accepted!
          </h2>

          {/* Confirmation Info */}
          <p className="text-sm mb-2">
            <span className="font-semibold">Confirmation ID:</span> TXN - 234
          </p>
          <p className="font-semibold text-lg mb-6">Thank you, Tobi!</p>

          <div className="w-full max-w-2xl space-y-6">
            {/* Order Confirmed Box */}
            <div className="border rounded-lg p-4 text-left">
              <h2 className="font-semibold text-lg mb-1">
                Your order is confirmed
              </h2>
              <p className="text-gray-600 text-sm">
                You’ll receive a confirmation email with your order.
              </p>
            </div>
          </div>

          <div className="w-full max-w-2xl mt-6 space-y-6">
            {/* Customer Details */}
            <div className="border rounded-lg p-4 text-left">
              <h3 className="font-semibold mb-3">Customer</h3>
              <table className="w-full md:w-[70%] text-sm">
                <tbody className="text-black">
                  <tr>
                    <td className="font-semibold py-1 ">Name:</td>
                    <td>Joseph Akande</td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1">Phone number:</td>
                    <td>0704 856 4547</td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1">Payment Amount:</td>
                    <td>₦25,000</td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1">Payment Date:</td>
                    <td>21/09/2025</td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1">Payment Method:</td>
                    <td>Bank account ending in 3567</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="w-full max-w-2xl mt-3 space-y-6">
            {/* Delivery Address */}
            <div className="border rounded-lg p-4 text-left">
              <h3 className="font-semibold mb-3">Delivery Address</h3>
              <table className="w-full md:w-[60%] text-sm">
                <tbody className="text-black">
                  <tr>
                    <td className="font-semibold py-1">Home address:</td>
                    <td>18, Old Abubakar Rd</td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1">Location:</td>
                    <td>Bodija, Ibadan.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <NavLink to="/">
          {/* Button */}
          <div className="text-center">
            <button className="mt-8 bg-pri hover:bg-green-700 text-white px-6 py-3 rounded-md text-sm font-medium transition">
              Continue to Home Page
            </button>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default BuyerPaymentAcceptancePage;
