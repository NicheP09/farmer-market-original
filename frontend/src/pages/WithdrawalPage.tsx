import { NavLink } from "react-router-dom";
import { CircleArrowLeft, ChevronDown } from "lucide-react";

import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";

/* -----------------------
   Example data models
   ----------------------- */
type Wallet = {
  id: string;
  label: string;
  balance: number; // in base currency units (e.g. NGN)
};

type Destination = {
  id: string;
  label: string; // e.g. "GT - 102133212421"
};

/* -----------------------
   Example options (replace with real data)
   ----------------------- */
const WALLET_OPTIONS: Wallet[] = [
  { id: "escrow", label: "Escrow Wallet", balance: 25000 },
  { id: "avalible", label: "Available", balance: 12000 },
];

const DESTINATIONS: Destination[] = [
  { id: "gt-1", label: "GT - 102133212421" },
  { id: "nib-1", label: "NIB - 21092109210" },
];

function formatNumber(n: number) {
  return new Intl.NumberFormat("en-NG", { maximumFractionDigits: 0 }).format(n);
}

/* Remove non-digit characters, return number */
function parseDigits(value: string): number {
  const digits = value.replace(/[^\d]/g, "");
  if (digits.length === 0) return 0;
  // parse as integer
  return parseInt(digits, 10);
}

/* Format input value as text with separators (for display) */
function formatInputForDisplay(raw: string) {
  const n = parseDigits(raw);
  return n === 0 ? "" : formatNumber(n);
}

const WithdrawalPage = () => {
  // store amount as string to allow formatted display in input
  const [amountInput, setAmountInput] = useState<string>("4500"); // default pre-filled like screenshot "4,500"
  const [fromWallet, setFromWallet] = useState<string>(WALLET_OPTIONS[0].id);
  const [toAccount, setToAccount] = useState<string>(DESTINATIONS[0].id);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // numeric amount derived from the input
  const amount = useMemo(() => parseDigits(amountInput), [amountInput]);

  // validation
  const selectedWallet = WALLET_OPTIONS.find((w) => w.id === fromWallet);
  const selectedDest = DESTINATIONS.find((d) => d.id === toAccount);
  const hasEnoughBalance = selectedWallet
    ? amount <= selectedWallet.balance
    : false;

  const isValid =
    amount > 0 && !!selectedWallet && !!selectedDest && hasEnoughBalance;

  /* -----------------------
     Handlers
     ----------------------- */
  function onAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    // accept only digits while typing, but keep value as raw digits
    const raw = e.target.value;
    // allow the user to paste formatted numbers — strip non-digits
    const digitsOnly = raw.replace(/[^\d]/g, "");
    setAmountInput(digitsOnly);
    setError(null);
  }

  function onConfirm(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);

    if (!isValid) {
      if (amount <= 0) setError("Please enter an amount greater than zero.");
      else if (!hasEnoughBalance)
        setError("Insufficient balance in selected wallet.");
      else setError("Please fill all fields correctly.");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Replace with real submit logic (API call)
      alert(
        `Withdrawal confirmed\nAmount: ₦${formatNumber(amount)}\nFrom: ${
          selectedWallet?.label
        }\nTo: ${selectedDest?.label}`
      );
      // Reset or navigate as needed
    }, 900);
  }

  return (
    <div>
      {/* HEADER */}
      {/* <WalletHeader /> */}
      <Navbar />

      {/* REST OF THE PAGE */}
      <div className="relative mt-[94px]  w-full">
        <NavLink
          to="/wallet"
          className="text-2xl absolute top-7 left-25 hidden  lg:block  cursor-pointer"
        >
          <CircleArrowLeft className="w-7 h-7  text-pri" />
        </NavLink>
        <section className="py-6 px-5 max-w-[800px]  mx-auto">
          <div className="flex items-center gap-8 mb-8">
            <NavLink
              to="/marketplace"
              className="text-2xl  lg:hidden block   cursor-pointer"
            >
              <CircleArrowLeft className="w-7 h-7  text-pri" />
            </NavLink>
            <h2 className="text-black font-bold text-2xl">Withdrawal</h2>
          </div>

          <form
            onSubmit={onConfirm}
            className="border rounded-lg pt-6 px-10 pb-25"
          >
            {/* Amount */}
            <div className="mb-6">
              <label
                htmlFor="amount"
                className="block text-base font-semibold text-black mb-2"
              >
                Amount
              </label>

              <div className="rounded-md border border-[#757575] px-4 py-4">
                <input
                  id="amount"
                  name="amount"
                  inputMode="numeric"
                  autoComplete="off"
                  aria-label="Withdrawal amount"
                  aria-invalid={!isValid && amount > 0 ? "true" : undefined}
                  value={formatInputForDisplay(amountInput)}
                  onChange={onAmountChange}
                  className="w-full text-base  text-gray-800 placeholder-gray-400 focus:outline-none"
                  placeholder="4500"
                />
              </div>
            </div>

            {/* From */}
            <div className="mb-6">
              <label className="block text-base font-semibold text-black mb-2">
                From:
              </label>

              <div className="relative">
                <select
                  aria-label="From wallet"
                  value={fromWallet}
                  onChange={(e) => setFromWallet(e.target.value)}
                  className="appearance-none w-full rounded-md border border-[#757575] px-4 py-4 text-black placeholder-black text-base focus:outline-none focus:ring-1 focus:ring-[#757575]"
                >
                  {WALLET_OPTIONS.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-black pointer-events-none" />
              </div>
            </div>

            {/* To */}
            <div className="mb-10">
              <label className="block text-base font-semibold text-black mb-2">
                To:
              </label>

              <div className="relative">
                <select
                  aria-label="Destination account"
                  value={toAccount}
                  onChange={(e) => setToAccount(e.target.value)}
                  className="appearance-none w-full rounded-md border border-[#757575] px-4 py-4 text-black focus:outline-none text-base  focus:ring-0 focus:ring-[#757575] "
                >
                  {DESTINATIONS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.label}
                    </option>
                  ))}
                </select>

                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-black pointer-events-none" />
              </div>
            </div>

            {/* Error message (if any) */}
            {error && (
              <p className="text-sm text-red-600 mb-4" role="alert">
                {error}
              </p>
            )}

            {/* BUTTON */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={`w-[60%] items-center justify-center  rounded-md px-10 py-3 text-white font-semibold transition text-sm focus:outline-none
                ${
                  isValid
                    ? " bg-pri hover:bg-green-600"
                    : "bg-green-200 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? "Processing..." : "Confirm Withdrawal"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default WithdrawalPage;
