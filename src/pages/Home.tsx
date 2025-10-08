
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Image1 from "../assets/Home-Images/Home-Img 1.svg";
import Image2 from "../assets/Home-Images/Home-Img 2.svg";
import Image3 from "../assets/Home-Images/Home-Img 3.svg";
import Image4 from "../assets/Home-Images/Home-Img 4.svg";
import Image5 from "../assets/Home-Images/Home-Img 5.svg";
import Image6 from "../assets/Home-Images/Home-Img 6.svg";
import Image7 from "../assets/Home-Images/Home-Img 7.svg";
import Image8 from "../assets/Home-Images/Home-Img 8.svg";
import Image9 from "../assets/Home-Images/Home-Img 9.svg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      {/* NAVBAR */}
      <div className="">
        <Navbar />
      </div>

      {/* HERO SECTION */}
      <section
        className="relative w-full h-[500px] md:h-[676px] bg-cover bg-center bg-no-repeat sm:overflow-x-hidden"
        style={{ backgroundImage: `url(${Image1})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="relative max-w-2xl z-10 px-5 mx-auto flex flex-col justify-center items-center h-full text-center">
          <h1 className="text-white font-semibold text-2xl md:text-4xl lg:text-5xl leading-snug">
            Fresh Food From Farmers
          </h1>
          <p className="text-white text-base md:text-lg mt-5 mb-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            inventore sit nobis quibusdam.
          </p>
           <Link to="/marketplace">
          <button className="bg-sec text-black text-sm font-bold py-3 px-6 rounded-md hover:bg-sec2">
            Discover More
          </button>
          </Link>
        </div>
      </section>

      {/* HEALTHY FOOD */}
      <section className="pt-20 pb-20 md:pb-[200px]">
        <div className="max-w-[1100px] px-5 mx-auto grid gap-10 md:grid-cols-[40%_60%] items-center">
          {/* IMAGE SECTION */}
          <div className="relative w-full">
            <img
              src={Image2}
              alt="Healthy Food"
              className="w-full rounded-lg h-auto"
            />
            <img
              src={Image3}
              alt="Small Food"
              className="absolute bottom-0 right-0 w-40 md:w-48 shadow-lg transform md:translate-x-30 md:translate-y-15"
            />
          </div>
          {/* TEXT SECTION */}
          <div className="w-full flex flex-col justify-center">
            <h2 className="text-2xl md:text-[32px] text-pri font-bold leading-snug mb-5">
              Be Healthy & Eat <br />
              Only Fresh Food From Us
            </h2>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center text-gray-500">
                <span className="w-2 h-2 bg-pri rounded-full mr-3"></span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </li>
              <li className="flex items-center text-gray-500">
                <span className="w-2 h-2 bg-pri rounded-full mr-3"></span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </li>
            </ul>
            <div className="mt-6 md:mb-10">
              <Link to="/marketplace">
              <button className=" bg-black inline-block text-white text-sm font-bold py-3 px-6 rounded-md">
                Discover More
              </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERY SEC */}
      <section className="pb-20">
        <div className="max-w-[1100px] px-5 mx-auto">
          <div className="w-full md:w-1/2 mb-8">
            <h2 className="text-2xl md:text-[32px] text-pri font-bold leading-snug mb-5">
              Delivered To Your Doorstep <br />
              Fresh From The Farm
            </h2>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Cupiditate cumque pariatur culpa.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[30%_40%_30%] gap-6">
            <img
              src={Image4}
              alt="Delivery"
              className="rounded-md w-full shadow"
            />
            <img
              src={Image5}
              alt="Delivery"
              className="rounded-md w-full shadow"
            />
            <img
              src={Image6}
              alt="Delivery"
              className="rounded-md w-full shadow"
            />
          </div>
        </div>
      </section>

      {/* LOVERS SEC */}
      <section className="pb-20">
        <div className="max-w-[1100px] px-5 mx-auto">
          <div className="w-full md:w-1/2 mb-8">
            <h2 className="text-2xl md:text-[32px] text-pri font-bold leading-snug">
              What Our Green <br />
              Lovers Are Saying
            </h2>
          </div>
          <div className="flex flex-col gap-12">
            {[
              { img: Image7, name: "George Udom" },
              { img: Image8, name: "Ishola Solomon" },
              { img: Image9, name: "Tunde Badmus" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex  md:flex-row gap-6 items-start md:items-center"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-[30%] md:w-[118px] rounded-md shadow"
                />
                <div className="space-y-2 sm:space-y-4">
                  <h4 className="text-pri text-lg md:text-xl font-semibold">
                    {item.name}
                  </h4>
                  <p className="text-gray-500 text-sm sm:text-base">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Voluptatum reprehenderit ratione nam labore. Illum nihil
                    ducimus pariatur velit molestiae aliquid?
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default Home;
