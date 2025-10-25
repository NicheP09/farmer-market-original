import { usePaymentContext } from "../context/PaymentContext";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { BadgeCheck } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const BuyerPaymentAcceptancePage = () => {
  const { paymentData } = usePaymentContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!paymentData) {
      navigate("/"); // redirect if no data (refresh or direct visit)
    }
  }, [paymentData, navigate]);

  if (!paymentData) return null;

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mt-[94px] py-20 px-7 mx-auto">
        <div className="flex flex-col justify-center items-center">
          <BadgeCheck className="w-16 h-16 md:w-20 md:h-20 text-green-600" />
          <h2 className="text-2xl md:text-3xl font-semibold my-6">
            Order has been accepted!
          </h2>

          <p className="text-sm mb-2">
            <span className="font-semibold">Confirmation ID:</span>{" "}
            {paymentData.confirmationId}
          </p>
          <p className="font-semibold text-lg mb-6">
            Thank you, {paymentData.customerName.toUpperCase()}!
          </p>

          {/* ORDER INFO */}
          <div className="w-full max-w-2xl space-y-6">
            <div className="border rounded-lg p-4 text-left">
              <h2 className="font-semibold text-lg mb-1">
                Your order is confirmed
              </h2>
              <p className="text-gray-600 text-sm">
                You’ll receive a confirmation email with your order.
              </p>
            </div>

            {/* Customer Info */}
            <div className="border rounded-lg p-4 text-left">
              <h3 className="font-semibold mb-3">Customer</h3>
              <table className="w-full md:w-[70%] text-sm">
                <tbody className="text-black">
                  <tr>
                    <td className="font-semibold py-1">Name:</td>
                    <td>{paymentData.customerName}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1">Phone:</td>
                    <td>{paymentData.phone}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1">Payment Amount:</td>
                    <td>₦{paymentData.amount.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1">Payment Date:</td>
                    <td>{paymentData.paymentDate}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1">Payment Method:</td>
                    <td>{paymentData.method}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Delivery Info */}
            <div className="border rounded-lg p-4 text-left">
              <h3 className="font-semibold mb-3">Delivery Address</h3>
              <table className="w-full md:w-[60%] text-sm">
                <tbody className="text-black">
                  <tr>
                    <td className="font-semibold py-1">Home address:</td>
                    <td>{paymentData.address}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1">Location:</td>
                    <td>{paymentData.location}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <NavLink to="/">
            <button className="mt-8 bg-pri hover:bg-green-700 text-white px-6 py-3 rounded-md text-sm font-medium transition">
              Continue to Home Page
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default BuyerPaymentAcceptancePage;
