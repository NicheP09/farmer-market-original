import WalletHeader from "../components/wallet-components/WalletHeader";
import WalletDashboard from "../components/wallet-components/WalletDashboard";
import WalletTable from "../components/wallet-components/WalletTable";

const WalletPage = () => {
  return (
    <div>
      <WalletHeader />
      <WalletDashboard />
      <WalletTable />
    </div>
  );
};

export default WalletPage;
