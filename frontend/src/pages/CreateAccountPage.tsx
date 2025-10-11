import africanFarmerImage from "../assets/man-farm.png";
import logo from "../assets/Logo 2.png";
import CreateAccountInputField from "../components/CreateAccountInputField";

function CreateAccountPage() {
  return (
    <div className="bg-light font-dm-sans min-h-screen w-full flex flex-col md:grid md:grid-cols-[1fr_1.2fr] max-w-6xl mx-auto overflow-hidden">
      
      {/* ✅ Left Section - Hero Image */}
      <div
        className="relative flex flex-col justify-end bg-cover bg-center h-[35vh] md:h-auto"
        style={{ backgroundImage: `url(${africanFarmerImage})` }}
        role="img"
        aria-label="African farmer harvesting fresh vegetables"
      >
        {/* Logo */}
        <a href="/" aria-label="FarmMarket Home">
          <img
            src={logo}
            className="absolute top-4 left-4 sm:top-8 sm:left-8 w-24 sm:w-32 md:w-40 object-contain"
            alt="FarmMarket Logo"
          />
        </a>

        {/* Overlay Text */}
        <div className="bg-black/40 text-white p-6 sm:p-10 md:p-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            Empowering Farmers, Connecting Markets
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed max-w-sm">
            Join our growing network of trusted farmers and buyers. Manage your
            sales and grow your agribusiness effortlessly.
          </p>
        </div>
      </div>

      {/* ✅ Right Section - Form */}
      <div className="flex items-center justify-center bg-white px-6 sm:px-10 py-10 md:py-0 overflow-hidden">
        <div className="w-full max-w-md">
          <CreateAccountInputField />
        </div>
      </div>
    </div>
  );
}

export default CreateAccountPage;
