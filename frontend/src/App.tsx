
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FarmerProvider } from "./context/FarmerContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

// Pages
import Home from "./pages/Home";
import SignupHome from "./pages/SignupHome";
import SignPage from "./pages/SigninPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import BuyerReg from "./pages/BuyerReg";
import ForgotPassword from "./pages/Forgotpassword";
import SuccessPage from "./pages/SuccessPage";
import About from "./pages/About";
import Contact from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import VerificationCode from "./pages/VerificationCode";
import OtpPage from "./pages/OtpPage";

// Dashboards
import BuyerDashboard from "./pages/BuyerDashboard";
import FarmerDashboardNew from "./components/famerdashboard-components/FarmerDashboard2";
import Admindashboard from "./pages/Admindashboard";

// Buyer Dashboard child components
import Overview from "./components/dashboard-components/Overview";
import OrderManagement from "./components/dashboard-components/Ordermanagement";

// Admin child components
import UserVerification from "./components/admin/UserVerification";
import DisputePage from "./components/admin/Dispute";

// Farmer child components
import FarmerOverview from "./components/famerdashboard-components/FarmerOverview";
import FarmerUpload from "./components/famerdashboard-components/FarmerUpload";
import FarmerBuyerRequest from "./components/famerdashboard-components/FarmerBuyerRequest";
import FarmerTrackOrder from "./components/famerdashboard-components/FarmerTrackOrder";
import Deliveries from "./components/famerdashboard-components/Deliveries";
import DirectOrder from "./components/famerdashboard-components/DirectOrder";

// Other protected pages
import FarmBusinessDetails from "./pages/FarmBusinessDetails";
import VerificationDetails from "./pages/VerificationDetails";
import BankingPayment from "./pages/BankingPayment";
import Marketplace from "./pages/MarketplacePage";
import CartPage from "./pages/CartPage";
import WalletPage from "./pages/WalletPage";
import PaymentDetailsPage from "./pages/PaymentdetailsPage";
import Withdrawal from "./pages/WithdrawalPage";
import PaymentMethod from "./pages/PaymentMethodPage";
import BuyerPaymentAcceptance from "./pages/BuyerPaymentAcceptancePage";
import OrderTracking from "./pages/OrderTracking";
import SettingsPage from "./pages/SettingsPage";
import SupportPage from "./pages/SupportPage";
import SystemPage from "./pages/SystemPage";

function App() {
  return (
    <FarmerProvider>

      <Router>
        <Routes>
          {/* 🌍 Public Routes */}
          <Route path="/" element={<Home />} />

          <Route
            path="signuphome"
            element={
              <PublicRoute>
                <SignupHome />
              </PublicRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <PublicRoute>
                <SignPage />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <BuyerReg />
              </PublicRoute>
            }
          />
          <Route
            path="/createaccount"
            element={
              <PublicRoute>
                <CreateAccountPage />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
           
          <Route path='/systempage' element={ < SystemPage /> } />
           <Route path='/supportpage' element={ < SupportPage /> } />
            <Route path='/settingspage' element={ < SettingsPage />} />


          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/otppage" element={<OtpPage />} />

          {/* 🌾 Farmer Dashboard */}
          <Route
            path="/farmerdashboardnew/*"
            element={
              <ProtectedRoute allowedRoles={["farmer"]}>
                <FarmerDashboardNew />
              </ProtectedRoute>
            }
          >
            

            <Route index element={<FarmerOverview />} />
            <Route path="farmeroverview" element={<FarmerOverview />} />
            <Route path="farmerupload" element={<FarmerUpload />} />
            <Route path="farmerbuyerrequest" element={<FarmerBuyerRequest />} />
            <Route path="farmertrackorder" element={<FarmerTrackOrder />} />
            <Route path="directorder" element={<DirectOrder />} />
            <Route path="delivery" element={<Deliveries />} />
          </Route>

          {/* 🛒 Buyer Dashboard */}
          <Route
            path="/buyerdashboard/*"
            element={
              <ProtectedRoute allowedRoles={["buyer"]}>
                <BuyerDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Overview />} />
            <Route path="overview" element={<Overview />} />
            <Route path="ordermanagement" element={<OrderManagement />} />
          </Route>

          {/* 🧑‍💼 Admin Dashboard */}
          <Route
            path="/admindashboard/*"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Admindashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<UserVerification />} />
            <Route path="userverification" element={<UserVerification />} />
            <Route path="dispute" element={<DisputePage />} />
          </Route>

          {/* 📋 Other Protected Pages */}
          <Route
            path="/ordertracking"
            element={
              <ProtectedRoute>
                <OrderTracking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/businessdetails"
            element={
              <ProtectedRoute  allowedRoles={["farmer"]}>
                <FarmBusinessDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/verifyd"
            element={
              <ProtectedRoute  allowedRoles={["farmer"]}>
                <VerificationDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bankingpayment"
            element={
              <ProtectedRoute allowedRoles={["farmer"]}>
                <BankingPayment />
              </ProtectedRoute>
            }
          />

          {/* 💳 Marketplace & Payment */}
          <Route
            path="/marketplace"
            element={
              <ProtectedRoute>
                <Marketplace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cartpage"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wallet"
            element={
              <ProtectedRoute>
                <WalletPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/paymentdetails"
            element={
              <ProtectedRoute>
                <PaymentDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/withdrawal"
            element={
              <ProtectedRoute>
                <Withdrawal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/paymentmethod"
            element={
              <ProtectedRoute>
                <PaymentMethod />
              </ProtectedRoute>
            }
          />
          <Route
            path="/buyerpaymentacceptance"
            element={
              <ProtectedRoute>
                <BuyerPaymentAcceptance />
              </ProtectedRoute>
            }
          />

          {/* ✅ Success Pages */}
          <Route
            path="/successpagefarmer"
            element={
              <ProtectedRoute allowedRoles={["farmer"]}>
                <SuccessPage link="/farmerdashboardnew" />
              </ProtectedRoute>
            }
          />

           <Route path="/verificationcode" element={
           <ProtectedRoute allowedRoles={["buyer"]}> 
            <VerificationCode />
            </ProtectedRoute>
            } 
            />


          <Route
            path="/successpage"
            element={
              <ProtectedRoute allowedRoles={["buyer"]}>
                <SuccessPage link="/buyerdashboard" />
              </ProtectedRoute>
            }
          />

          {/* ❌ Catch-all Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </FarmerProvider>
  );
}

export default App;