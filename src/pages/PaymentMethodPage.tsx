import { useState } from "react";
import Logo from "../assets/Logo-black.svg";
import Mastercard from "../assets/Mastercard.svg";
import Visa from "../assets/Visa.svg";
import { NavLink, Link } from "react-router-dom";
import { CreditCard, Landmark, ArrowRight } from "lucide-react";

const PaymentMethodPage = () => {
  const [method, setMethod] = useState<"card" | "bank" | null>("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Payment processed successfully!");
  };

  return (
    <div className="max-w-[1000px]  mx-auto px-6 py-5 sm:py-6 md:py-6">
      {/* HEADER */}
      <header className="font-dm-sans sticy top-0 left-0 text-white">
        <div className="w-[150px] md:w-[180px] ">
          <NavLink to="/">
            <img src={Logo} alt="Logo" className="cursor-pointer" />
          </NavLink>
        </div>
      </header>

      {/* BODY */}
      <main className="mt-5 rounded-xl bg-[#d9d9d9]">
        <div className="bg-pri text-center font-bold text-xl text-white rounded-sm py-4 w-full">
          Choose Payment Method
        </div>
        <form
          action=""
          onSubmit={handlePayment}
          className="w-[80%] md:w-[60%] px-3 py-6 mx-auto flex flex-col space-y-2"
        >
          {/* CARD PAYMENT STARTS */}
          <div
            onClick={() => setMethod("card")}
            className={` p-4 cursor-pointer transition `}
          >
            <div className="flex items-center gap-2 mb-1">
              <CreditCard size={24} className="text-black" />
              <p className="font-bold text-lg text-gray-700">
                Credit/Debit Card
              </p>
            </div>
            <div className="flex gap-2">
              <img src={Mastercard} alt="MasterCard-logo" className="w-10" />
              <img src={Visa} alt="Visa-logo" className="w-10" />
            </div>

            {/* CARD DETAILS FIELDS */}
            {method === "card" && (
              <div className="space-y-3 mt-6">
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full text-base border-1 border-pri rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pri"
                />
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-1/2 text-base border-1 border-pri rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pri"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-1/2 text-base border border-pri rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pri"
                  />
                </div>
              </div>
            )}
          </div>
          {/* CARD PAYMENTS END */}

          {/* BANK TRANSFER OPTION */}
          <div
            onClick={() => setMethod("bank")}
            className={`p-4 cursor-pointer transition `}
          >
            <div className="flex items-center gap-2 mb-3">
              <Landmark size={24} className="text-black" />
              <p className="font-bold text-lg text-gray-700">Bank Transfer</p>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                className="w-full border border-pri rounded-md p-3 flex font-semibold  justify-between items-center hover:border-2"
              >
                Direct Bank Transfer <ArrowRight size={20} />
              </button>

              <button
                type="button"
                className="w-full border border-pri rounded-md p-3 flex font-semibold justify-between items-center hover:border-2"
              >
                Instant Transfer <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* PAYMENT BTN */}
          <div className="p-4">
            <Link to="/buyerpaymentacceptance">
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition"
              >
                Make Payment
              </button>
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default PaymentMethodPage;
