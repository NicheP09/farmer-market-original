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
          <h1 className="text-white font-bold text-[28px] md:text-4xl lg:text-5xl leading-snug">
            Fresh Food From Farmers
          </h1>
          <p className="text-white text-base md:text-lg mt-5 mb-10">
            Straight from the field to your table, our platform connects you
            directly with local farmers committed to sustainable practices.
            Taste the difference quality makes with every order.
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
            <p className="text-gray-700 w-full mdw-[70%]">
              We connect you directly to trusted farmers, ensuring every product
              is fresh, natural, and sustainably grown.
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start md:items-center text-gray-600">
                <span className="w-3 h-3 mt-1.5 bg-pri rounded-full mr-3"></span>
                <span>
                  100% farm-fresh produce delivered straight to your door.
                </span>
              </li>
              <li className="flex md:items-center text-gray-600">
                <span className="w-3 h-3 mt-1.5 bg-pri rounded-full mr-3"></span>
                <span>
                  Fair prices that support our farmers and local communities.
                </span>
              </li>
              <li className="flex md:items-center text-gray-600">
                <span className="w-3 h-3 mt-1.5 bg-pri rounded-full mr-3"></span>
                <span>Quality you can tatse, freshness you can trust.</span>
              </li>
            </ul>
            <div className="mt-6 md:mb-20">
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
              Skip the grocery store hassle. Get the freshest fruits,
              vegetables, and farm products delivered directly from producers to
              your door on your schedule.
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
              {
                img: Image7,
                name: "George Udom",
                text: "The produce i received is genuinely the freshest I've ever bought. You can taste the difference when it comes straight from the farm.",
              },
              {
                img: Image8,
                name: "Ishola Solomon",
                text: "I love the convenience of getting locally sourced food delivered to my door. It saves me so much time, and i fell great knowinf I'm supporting the local farmers.",
              },
              {
                img: Image9,
                name: "Tunde Badmus",
                text: "Using this service has completely changed the way I cook. The ingredients are so vibrant and flavorful that even simple meals taste incredible.",
              },
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
                    {item.text}
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