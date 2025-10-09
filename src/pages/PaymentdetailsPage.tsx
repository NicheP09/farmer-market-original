import WalletHeader from "../components/wallet-components/WalletHeader";
import { NavLink } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";

const details = {
  id: "TXN-2343",
  buyer: "Sarah (Lagos)",
  product: "10kg Tomatoes",
  total: 5000,
  commission: 500,
  net: 4500,
};

const PaymentdetailsPage = () => {
  return (
    <div>
      {/* HEADER */}
      <WalletHeader />

      {/* REST OF THE PAGE */}
      <div className="relative  w-full">
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
            <h2 className="text-black font-bold text-2xl">Payment details</h2>
          </div>

          <div className="border rounded-lg pt-6 px-10 pb-25">
            <table className=" w-[250px]">
              <tbody>
                {/* INFO ROW */}
                <tr>
                  <td className="font-bold text-black py-2 pr-3">
                    Payment ID:
                  </td>
                  <td className="font-semibold text-[13px] py-2">
                    {details.id}
                  </td>
                </tr>

                {/* INFO ROW */}
                <tr>
                  <td className="font-bold text-black py-2 pr-3">Buyer:</td>
                  <td className="font-semibold text-[13px] py-2">
                    {details.buyer}
                  </td>
                </tr>

                {/* INFO ROW */}
                <tr>
                  <td className="font-bold text-black py-2 pr-3">Product:</td>
                  <td className="font-semibold text-[13px] py-2">
                    {details.product}
                  </td>
                </tr>

                {/* INFO ROW */}
                <tr>
                  <td className="font-bold text-black py-2 pr-3">Total:</td>
                  <td className="font-semibold text-[13px] py-2">
                    {details.total}
                  </td>
                </tr>

                {/* INFO ROW */}
                <tr>
                  <td className="font-bold text-black py-2 pr-3">
                    Commission:
                  </td>
                  <td className="font-semibold text-[13px] py-2">
                    {details.commission}
                  </td>
                </tr>

                {/* INFO ROW */}
                <tr>
                  <td className="font-bold text-black py-2 pr-3">Net:</td>
                  <td className="font-semibold text-[13px] py-2">
                    {details.net}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* BUTTON */}

            <div className="mt-12 text-center">
              <NavLink to="/">
                <button className=" inline-block border-1 border-pri bg-pri hover:bg-green-600 text-sm  text-white font-semibold text-center py-3 px-8 rounded-lg focus:outline-none transition">
                  Continue to Homapage
                </button>
              </NavLink>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PaymentdetailsPage;
