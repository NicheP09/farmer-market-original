import { NavLink } from "react-router-dom";

const WalletDashboard = () => {
  return (
    <section className="py-6 px-5 max-w-[1100px]  mx-auto">
      <h2 className="text-black font-bold text-2xl mb-12">Wallet Dashboard</h2>

      {/* BALANCE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <div className="border-1 bg-[#ffffb5] border-[#f5ba53] rounded-lg px-6 pt-2 pb-10">
          <p className="text-[#bf7d0b] font-semibold mb-4 ">Pending Balance</p>
          <p className="text-2xl font-bold">₦ 12,000</p>
        </div>
        <div className="border-1 bg-[#f0fff5] border-[#22c358] rounded-lg px-6 pt-5 pb-10">
          <p className="text-[#0b983b] font-semibold mb-4 ">
            Available Balance
          </p>
          <p className="text-2xl font-bold">₦ 7,000</p>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-5 mb-6 pt-6">
        <NavLink to="/withdrawal">
          <button className=" inline-block border-1 border-pri bg-pri hover:bg-green-600 text-sm  text-white font-semibold text-center py-3 px-6 rounded-lg focus:outline-none transition">
            Withdraw Funds
          </button>
        </NavLink>
        <NavLink to="/paymentdetails">
          <button className=" inline-block border-1 border-pri text-sm  text-black font-semibold text-center py-3 px-6 rounded-lg focus:outline-none transition">
            Payment details
          </button>
        </NavLink>
      </div>
    </section>
  );
};

export default WalletDashboard;
