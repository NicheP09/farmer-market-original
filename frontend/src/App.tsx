// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // you already have this
import Signup from "./pages/BuyerReg";
import Dashboard from "./pages/Farmerdashboard";
import CreateAccountPage from "./pages/CreateAccountPage";
import Upload from "./pages/Upload";

import "./App.css";

import BuyerDashboard from "./pages/BuyerDashboard";
import Overview from "./components/dashboard-components/Overview";
import OrderManagement from "./components/dashboard-components/Ordermanagement";
import BuyerRequest from "./pages/Request";

import FarmerOverview from "./components/famerdashboard-components/FarmerOverview";
import FarmerUpload from "./components/famerdashboard-components/FarmerUpload";

import FarmerBuyerRequest from "./components/famerdashboard-components/FarmerBuyerRequest";

import FarmBusinessDetails from "./pages/FarmBusinessDetails";
import VerificationDetails from "./pages/VerificationDetails";
import BankingPayment from "./pages/BankingPayment";
import SignPage from "./pages/SigninPage";
import BuyerReg from "./pages/BuyerReg";
import SuccessPage from "./pages/SuccessPage";
import SignupHome from "./pages/SignupHome";
import Admindashboard from "./pages/Admindashboard";
import UserVerification from "./components/admin/UserVerification";
import VerificationCode from "./pages/VerificationCode";
import DisputePage from "./components/admin/Dispute";
import Marketplace from "./pages/MarketplacePage";
import CartPage from "./pages/CartPage";
import WalletPage from "./pages/WalletPage";
import PaymentDetailsPage from "./pages/PaymentdetailsPage";
import Withdrawal from "./pages/WithdrawalPage";
import OrderTracking from "./pages/OrderTracking";
import PaymentMethod from "./pages/PaymentMethodPage";
import BuyerPaymentAcceptance from "./pages/BuyerPaymentAcceptancePage";
import ForgotPassword from "./pages/Forgotpassword";
import About from "./pages/About";
import Contact from "./pages/ContactPage";

import OtpPage from "./pages/OtpPage";
import FarmerDashboardNew from "./components/famerdashboard-components/FarmerDashboard2";

// Example extra pages (create About.jsx, NotFound.jsx later)
//function About() {
//  return <h2>About Page</h2>;
//}

function NotFound() {
  return <h2>404 — Page Not Found</h2>;
}

function App() {
  return (
    <Router>
      {/* Navigation */}
      {/*<nav className="p-4 bg-gray-100 flex gap-4">
        <Link to="/">Home</Link>
      </nav>*/}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signupHome" element={<SignupHome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/createaccount" element={<CreateAccountPage />} />

        <Route path="/buyerdashboard" element={<BuyerDashboard />}>
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />
          <Route path="ordermanagement" element={<OrderManagement />} />
        </Route>

        {/* FARMER2 */}
        <Route path="/farmerdashboardnew" element={<FarmerDashboardNew />}>
          <Route index element={<FarmerOverview />} />
          <Route path="farmeroverview" element={<FarmerOverview />} />
          <Route path="farmerupload" element={<FarmerUpload />} />
          <Route path="farmerbuyerrequest" element={<FarmerBuyerRequest />} />
        </Route>

        <Route path="/admindashboard" element={<Admindashboard />}>
          <Route index element={<UserVerification />} />
          <Route path="userverification" element={<UserVerification />} />
          <Route path="dispute" element={<DisputePage />} />
        </Route>

        <Route path="/buyerrequest" element={<BuyerRequest />} />
        <Route path="/cartpage" element={<CartPage />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/paymentdetails" element={<PaymentDetailsPage />} />
        <Route path="/withdrawal" element={<Withdrawal />} />
        <Route path="/paymentmethod" element={<PaymentMethod />} />
        <Route
          path="/buyerpaymentacceptance"
          element={<BuyerPaymentAcceptance />}
        />

        <Route path="/businessdetails" element={<FarmBusinessDetails />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="verifyd" element={<VerificationDetails />} />
        <Route path="bankingpayment" element={<BankingPayment />} />
        <Route path="/farmer" element={<Dashboard />} />
        <Route path="signin" element={<SignPage />} />
        <Route path="forgot" element={<ForgotPassword />} />
        <Route path="buyerreg" element={<BuyerReg />} />
        <Route path="verificationcode" element={<VerificationCode />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* VIEWING THE SIDEBAR */}
        <Route path="/farmerdashboardnew" element={<FarmerDashboardNew />} />

        <Route
          path="successpagefarmer"
          element={<SuccessPage link="/farmerdashboardnew" />}
        />
        <Route
          path="successpage"
          element={<SuccessPage link="/buyerdashboard" />}
        />
        <Route path="ordertracking" element={<OrderTracking />} />
        <Route path="/otppage" element={<OtpPage />} />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;