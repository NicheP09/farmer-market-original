import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Image1 from "../assets/About-images/About-2.jpg";

import { Mail, Phone, MapPin } from "lucide-react";

import { Link } from "react-router-dom";

type ContactStat = {
  icon: React.ReactNode;
  title: string;
  text: string;
};

const ContactInfo: ContactStat[] = [
  {
    icon: <Mail className="text-pri w-6 h-6" />,
    title: "Email Support",
    text: "support@farmmarket.com",
  },
  {
    icon: <Phone className="text-pri w-6 h-6" />,
    title: "Call Us",
    text: "08123377800",
  },
  {
    icon: <MapPin className="text-pri w-6 h-6" />,
    title: "Visit Our Office",
    text: "Lorem ipsum dolor sit amet consectetur. ",
  },
];

const Contact = () => {
  return (
    <>
      {/* NAVBAR */}
      <div className="">
        <Navbar />
      </div>

      {/* HERO SECTION */}
      <section
        className="relative w-full h-80 bg-cover bg-center bg-no-repeat sm:overflow-x-hidden "
        style={{ backgroundImage: `url(${Image1})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="max-w-[1100px] mx-auto px-5 h-full flex justify-center items-center">
          <div className="text-[#fff] max-w-2xl z-10">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center leading-tight">
              Get In Touch
            </h1>
            <p className="mt-3 text-sm md:text-base md:w-[80%] lg:text-lg text-center mx-auto text-green-100">
              We're here to help you connect, trade and grow.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto px-5 py-10 space-y-20 max-w-[1100px] ">
        {/* CONTACT INFO */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-6">
            {ContactInfo.map((item, i) => (
              <div
                key={i}
                className="shadow-sm rounded-xl p-6 text-center hover:shadow-md transition"
              >
                <div className="flex justify-center mb-2">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-1">{item.title} </h3>
                <p className="text-gray-600">{item.text} </p>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-16">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-center mb-6">
              Send Us a Message
            </h2>
            <form
              action=""
              className="space-y-4 bg-[#fff] shadow-sm border border-pri rounded-xl p-8"
            >
              <input
                type="text"
                className="w-full text-base border-gray-500 placeholder-gray-700 border rounded-lg px-4 py-2 focus:ring-1 focus:ring-pri outline-none"
                placeholder="Full Name"
              />

              <input
                type="text"
                className="w-full text-base border-gray-500 placeholder-gray-700 border rounded-lg px-4 py-2 focus:ring-1 focus:ring-pri outline-none"
                placeholder="Email Address"
              />

              <input
                type="text"
                className="w-full text-base border-gray-500 placeholder-gray-700 border rounded-lg px-4 py-2 focus:ring-1 focus:ring-pri outline-none"
                placeholder="Subject"
              />

              <textarea
                className="w-full text-base border-gray-500 placeholder-gray-700 border rounded-lg px-4 py-2 focus:ring-1 focus:ring-pri resize-none outline-none"
                placeholder="Your Message"
                rows={5}
              ></textarea>

              <button
                type="submit"
                className="bg-pri text-white outline-none rounded-lg px-6 py-3 font-semibold hover:bg-green-700 transition w-full "
              >
                Send Message
              </button>
            </form>
          </div>
        </section>

        {/* IMPACT */}
      </main>
      <section className="  py-12 shadow-sm bg-pri">
        <div className="flex flex-col max-w-[1100px] mx-auto px-6 md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-xl text-[#fff] font-bold">
              Ready to be part of the community?
            </h3>
            <p className="mt-2 text-[#fff] max-w-xl">
              Join thousands of farmers and buyers across Nigeria.
            </p>
          </div>

          {/* CTAS */}
          <div className="flex gap-3">
            <Link to="/signupHome">
              <button className="outline-none border border-sec inline-block w-38 bg-sec text-black font-bold px-4 py-2.5 rounded-lg cursor-pointer shadow-sm hover:bg-sec2 transition">
                Join Now
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default Contact;
