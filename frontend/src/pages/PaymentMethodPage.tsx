import { useState, useMemo } from "react";

import Mastercard from "../assets/Mastercard.svg";
import Visa from "../assets/Visa.svg";

import { useNavigate } from "react-router-dom";
import { CreditCard, Landmark, ArrowRight, Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";
import { usePaymentContext } from "../context/PaymentContext";
import { useFarmerContext } from "../context/FarmerContext";

// UTILITIES
const onlyDigits = (str: string) => str.replace(/\D/g, "");

type CardType = "visa" | "mastercard" | "verve" | "unknown";

function detectCardType(raw: string): CardType {
  const n = onlyDigits(raw);
  if (/^4/.test(n)) return "visa";
  if (
    /^5[1-5]/.test(n) ||
    /^2(22[1-9]|2[3-9]\d|[3-6]\d{2}|7([01]\d|20))/.test(n)
  )
    return "mastercard";
  if (/^(506|507|650|6280)/.test(n)) return "verve";
  return "unknown";
}

function formatCardNumber(value: string) {
  const digits = onlyDigits(value);
  const parts: string[] = [];
  for (let i = 0; i < digits.length; i += 4) parts.push(digits.slice(i, i + 4));
  return parts.join(" ");
}

function luhnCheck(value: string) {
  const digits = onlyDigits(value);
  if (digits.length === 0) return false;
  let sum = 0;
  let doubleNext = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits[i], 10);
    if (doubleNext) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    doubleNext = !doubleNext;
  }
  return sum % 10 === 0;
}

function formatExpiry(value: string) {
  const digits = onlyDigits(value).slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function validExpiry(value: string) {
  const d = onlyDigits(value);
  if (d.length !== 4) return false;
  const mm = Number(d.slice(0, 2));
  const yy = Number(d.slice(2, 4));
  if (isNaN(mm) || isNaN(yy)) return false;
  if (mm < 1 || mm > 12) return false;
  const now = new Date();
  const curY = now.getFullYear() % 100;
  const curM = now.getMonth() + 1;
  if (yy < curY) return false;
  if (yy === curY && mm < curM) return false;
  return true;
}

// MAIN COMPONENT
const PaymentMethodPage = () => {
  const [useCard, setUseCard] = useState(true);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [selectedBankMethod, setSelectedBankMethod] = useState<
    "instant" | "direct" | null
  >(null);

  const { setPaymentData } = usePaymentContext();
  const { userName, phone } = useFarmerContext();

  const navigate = useNavigate();

  const cardType = useMemo(() => detectCardType(cardNumber), [cardNumber]);
  const isCardNumberValid = useMemo(
    () => luhnCheck(cardNumber) && cardType !== "unknown",
    [cardNumber, cardType]
  );
  const isExpiryValid = useMemo(() => validExpiry(expiry), [expiry]);
  const isCvvValid = useMemo(() => onlyDigits(cvv).length === 3, [cvv]);

  // ✅ Form validity logic
  const isFormValid = useMemo(() => {
    if (useCard) return isCardNumberValid && isExpiryValid && isCvvValid;
    if (selectedBankMethod) return true;
    return false;
  }, [
    useCard,
    isCardNumberValid,
    isExpiryValid,
    isCvvValid,
    selectedBankMethod,
  ]);

  /* const simulateProcessing = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
  }; */

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!isFormValid) {
      setMessage("⚠ Please fill in valid payment details.");
      return;
    }

    setSubmitting(true);
    setMessage(null);

    await new Promise((r) => setTimeout(r, 1200));

    const paymentInfo = {
      confirmationId: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      amount: 25000,
      method: useCard
        ? `${cardType.toUpperCase()} Card`
        : message?.includes("Direct")
        ? "Direct Bank Transfer"
        : "Instant Transfer",
      customerName: userName || "Unknown",
      phone: phone || "N/A",
      address: "18, Old Abubakar Rd",
      location: "Bodija, Ibadan",
      paymentDate: new Date().toLocaleDateString(),
    };

    setPaymentData(paymentInfo);

    setSubmitting(false);
    setMessage("✅ Payment Successful, redirecting...");

    setTimeout(() => {
      navigate("/buyerpaymentacceptance");
    }, 2000);
  };

  const handleBankMethod = async (method: "instant" | "direct") => {
    setUseCard(false);
    setSelectedBankMethod(method);
    await handleSubmit();
  };

  const ProcessingModal = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-[999]">
      <div className="bg-white flex flex-col items-center justify-center p-8 rounded-xl shadow-lg">
        <div className="loader w-14 h-14 border-4 border-pri border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-700 font-semibold text-lg">
          Processing Payment...
        </p>
      </div>
    </div>
  );

  return (
    <>
      {submitting && <ProcessingModal />}
      <Navbar />
      <div className="max-w-[600px] mt-[94px] px-1 py-1 sm:px-3 mx-auto sm:py-3 md:py-6">
        {/* BODY */}
        <main className="mt-5 rounded-xl pb-13 bg-[#fff] shadow-md">
          <div className="bg-pri text-center font-bold text-xl text-white rounded-sm py-4 w-full">
            Choose Payment Method
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-[95%] px-3 py-6 mx-auto flex flex-col space-y-2"
          >
            {/* CARD METHOD */}
            <div>
              <div
                onClick={() => {
                  setUseCard(true);
                  setSelectedBankMethod(null);
                }}
                className={`flex items-center gap-3 text-gray-800 cursor-pointer transition-all font-bold ${
                  useCard
                    ? "text-black border-pri border p-3 rounded-md"
                    : "text-gray-700"
                }`}
              >
                <CreditCard size={24} className="text-black" />
                <span>Credit / Debit / Verve Card</span>
              </div>

              {useCard && (
                <div className="mt-3 space-y-3">
                  <div className="flex gap-2 mb-3">
                    <img
                      src={Mastercard}
                      alt="MasterCard-logo"
                      className="w-10"
                    />
                    <img src={Visa} alt="Visa-logo" className="w-10" />
                    {/* <img src={Verve} alt="Verve-logo" className="w-10" /> */}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Card Number"
                      inputMode="numeric"
                      value={cardNumber}
                      onChange={(e) =>
                        setCardNumber(formatCardNumber(e.target.value))
                      }
                      className={`w-full mt-1 border rounded-md p-3 text-base outline-none ${
                        cardNumber
                          ? isCardNumberValid
                            ? `border-pri border-2`
                            : `border-red-500`
                          : `border-pri`
                      }`}
                    />
                    <p className="text-sm mt-1 text-gray-500">
                      {cardNumber
                        ? isCardNumberValid
                          ? `${cardType.toUpperCase()} Card Detected`
                          : `Invalid Card Number`
                        : `Enter your 16-digit card number`}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      inputMode="numeric"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      maxLength={5}
                      className="w-1/2 mt-1 border rounded-md p-3 text-base outline-none border-pri"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      value={cvv}
                      onChange={(e) => setCvv(onlyDigits(e.target.value))}
                      maxLength={3}
                      className="w-1/2 mt-1 border rounded-md p-3 text-base outline-none border-pri"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* BANK TRANSFER */}
            <div className="pt-3">
              <div className="flex items-center gap-2 mb-3">
                <Landmark size={24} className="text-black" />
                <p className="font-bold text-lg text-gray-700">Bank Transfer</p>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => handleBankMethod("direct")}
                  className="w-full border border-pri rounded-md p-3 flex font-semibold justify-between items-center hover:bg-green-100 transition"
                >
                  Direct Bank Transfer <ArrowRight size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => handleBankMethod("instant")}
                  className="w-full border border-pri rounded-md p-3 flex font-semibold justify-between items-center hover:bg-green-100 transition"
                >
                  Instant Transfer <ArrowRight size={20} />
                </button>
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={!isFormValid || submitting}
              className={`w-full mt-4 py-3 rounded-md font-semibold text-white ${
                isFormValid
                  ? "bg-pri hover:bg-green-700 cursor-pointer"
                  : "bg-green-200 cursor-not-allowed"
              }`}
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" size={20} /> Processing...
                </span>
              ) : (
                "Make Payment"
              )}
            </button>

            {/* MESSAGE */}
            {message && (
              <div className="text-sm text-center text-gray-700 font-medium mt-2">
                {message}
              </div>
            )}
          </form>
        </main>
      </div>
    </>
  );
};

export default PaymentMethodPage;
