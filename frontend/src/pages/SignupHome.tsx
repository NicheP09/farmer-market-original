import bgImage from "../assets/tractor.jpg";
import logo from "../assets/Logo white 1.svg";
import { Link } from "react-router-dom";
import arrow from '../assets/arrow-icon.svg'
const SignupHome: React.FC = () => {
  return (
    <div
      className="instrument-sans relative h-screen w-full bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Top Navbar */}
      <header className="relative flex items-center justify-between px-6 md:px-12 py-4">
        <div className="flex items-center gap-2">
          <Link to='/'>
          <img
            src={logo}
            className="w-[162.08px] h-[42.83px] md:w-[170px] object-contain"
            alt="Logo"
          />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative flex flex-col justify-center  sm:items-start h-[calc(100vh-72px)] px-8 md:px-16 gap-12 max-w-3xl">
        <Link to="/">
          <img src={arrow}
          className=" w-[20px] md:w-10"
           alt="" />
        </Link>
        <h1 className="text-4xl text-center sm:text-left w-full md:text-6xl font-instrument  font-semibold text-white leading-snug tracking-tight">
          Fresh Food From <br /> Farmers
        </h1>

        <div className="flex w-full flex-col sm:flex-row gap-6">
          <Link to="/createaccount">
            {" "}
            <button className="bg-sec text-base w-full md:text-lg sm:w-50 hover:bg-sec2 text-black font-semibold px-3 py-3 sm:py-5 rounded-lg shadow-lg transition">
              Sign Up As Farmer
            </button>
          </Link>
          <Link to="/signup">
            {" "}
            <button className="bg-sec w-full sm:w-50 text-base md:text-lg hover:bg-sec2 text-black font-semibold px-3 py-3 sm:py-5 rounded-lg shadow-lg transition">
              Sign Up As Customer
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupHome;
