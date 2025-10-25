import WalletDashboard from "../components/wallet-components/WalletDashboard";
import WalletTable from "../components/wallet-components/WalletTable";
import Navbar from "../components/Navbar";

const WalletPage = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-[94px] ">
        <WalletDashboard />
        <WalletTable />
      </div>
    </div>
  );
};

export default WalletPage;
