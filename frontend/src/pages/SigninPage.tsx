import bgImage from "../assets/Rectangle 28.png";
import logo from "../assets/Asset 10.png";
import SignInput from "../components/SingInput";

const SigninPage = () => {
  return (
    <div className="bg-light font-dm-sans min-h-screen w-full flex flex-col md:grid md:grid-cols-[1fr_1.3fr] max-w-6xl mx-auto overflow-hidden">
      
      {/* ✅ Left Section - Hero Image + Logo */}
      <div
        className="relative flex flex-col justify-end bg-cover bg-center h-[35vh] md:h-auto"
        style={{ backgroundImage: `url(${bgImage})` }}
        role="img"
        aria-label="African farmer harvesting fresh vegetables in a field"
      >
        {/* Logo */}
        <a href="/" aria-label="FarmMarket Home">
          <img
            src={logo}
            className="absolute top-4 left-4 sm:top-8 sm:left-8 w-24 sm:w-32 md:w-40 object-contain"
            alt="FarmMarket Logo"
          />
        </a>

        {/* ✅ Optional dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/10 md:bg-transparent"></div>
      </div>

      {/* ✅ Right Section - Signin Form */}
      <div className="flex   sm:items-center justify-center flex-grow bg-white px-6 sm:px-10 md:px-12">
        <div className="w-full max-w-md">
          <SignInput />
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
