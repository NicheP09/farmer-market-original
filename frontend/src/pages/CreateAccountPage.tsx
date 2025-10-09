import africanFarmerImage from "../assets/man-farm.png";
import logo from "../assets/Logo 2.png";
import CreateAccountInputField from "../components/CreateAccountInputField";


function CreateAccountPage() {
  
  return (
    <div className="bg-light font-dm-sans min-h-screen w-full flex flex-col md:grid md:grid-cols-[1fr_1.2fr] max-w-6xl mx-auto  max-h-[100vh] overflow-hidden">
      
      {/* Left Section - Farmer Image + Logo */}
      <div
        className="relative h-40 md:h-auto bg-cover bg-center "
        style={{ backgroundImage: `url(${africanFarmerImage})` }}
        role="img"
        aria-label="African farmer harvesting fresh vegetables"
      >
        <a href="/" aria-label="FarmMarket Home">
          <img
            src={logo}
            className="absolute top-4 left-4 sm:top-8 sm:left-8 w-24 sm:w-32 md:w-36 object-contain"
            alt="FarmMarket Logo"
          />
        </a>
      </div>

      {/* Right Section - Form */}
      <div className="flex justify-center items-center px-6 sm:px-10 py-10 md:py-0">
        <div className="w-full max-w-md">
          <CreateAccountInputField />
        </div>
      </div>
    </div>
  );
}

export default CreateAccountPage;
