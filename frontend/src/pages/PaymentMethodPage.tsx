import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CreditCard, Landmark, ArrowRight } from "lucide-react";

import Logo from "../assets/Logo-black.svg";
import Mastercard from "../assets/Mastercard.svg";
import Visa from "../assets/Visa.svg";

const PaymentMethodPage = () => {
  const [method, setMethod] = useState<"card" | "bank" | null>("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const navigate = useNavigate();

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/payment-success");
  };

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-6">
      {/* HEADER */}
      <header className="font-dm-sans sticky top-0 left-0 text-white">
        <div className="w-[150px] md:w-[180px]">
          <NavLink to="/">
            <img src={Logo} alt="Logo" className="cursor-pointer" />
          </NavLink>
        </div>
      </header>

      {/* BODY */}
      <main className="mt-5 rounded-xl bg-[#d9d9d9] shadow-md">
        <div className="bg-pri text-center font-bold text-xl text-white rounded-t-xl py-4">
          Choose Payment Method
        </div>

        <form
          onSubmit={handlePayment}
          className="w-[80%] md:w-[60%] px-3 py-6 mx-auto flex flex-col space-y-4"
        >
          {/* CARD PAYMENT OPTION */}
          <div
            onClick={() => setMethod("card")}
            className={`p-4 cursor-pointer transition rounded-md ${
              method === "card" ? "bg-white shadow" : ""
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <CreditCard size={24} className="text-black" />
              <p className="font-bold text-lg text-gray-700">
                Credit/Debit Card
              </p>
            </div>

            <div className="flex gap-2 mb-3">
              <img src={Mastercard} alt="MasterCard-logo" className="w-10" />
              <img src={Visa} alt="Visa-logo" className="w-10" />
            </div>

            {method === "card" && (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full border border-pri rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pri"
                />
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-1/2 border border-pri rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pri"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-1/2 border border-pri rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pri"
                  />
                </div>
              </div>
            )}
          </div>

          {/* BANK TRANSFER OPTION */}
          <div
            onClick={() => setMethod("bank")}
            className={`p-4 cursor-pointer transition rounded-md ${
              method === "bank" ? "bg-white shadow" : ""
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <Landmark size={24} className="text-black" />
              <p className="font-bold text-lg text-gray-700">Bank Transfer</p>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                className="w-full border border-pri rounded-md p-3 flex font-semibold justify-between items-center hover:border-2 transition"
              >
                Direct Bank Transfer <ArrowRight size={20} />
              </button>

              <button
                type="button"
                className="w-full border border-pri rounded-md p-3 flex font-semibold justify-between items-center hover:border-2 transition"
              >
                Instant Transfer <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* PAYMENT BUTTON */}
          <div className="p-4">
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition"
            >
              Make Payment
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default PaymentMethodPage;
