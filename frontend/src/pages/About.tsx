import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Image1 from "../assets/About-images/About-1.jpg";
import Team1 from "../assets/About-images/Team1.jpg";
import Team2 from "../assets/About-images/Team2.jpg";
import Team3 from "../assets/About-images/Team3.jpg";
import { Globe, Users, Leaf, TrendingUp } from "lucide-react";


import { Link } from "react-router-dom";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  quote?: string;
  image: string;
};

const TEAM: TeamMember[] = [
  {
    id: "Member1",
    name: "Bianca Onovo",
    role: "Product Manager",
    quote:
      "Bridging the gap between farmers and buyers, one vision, one product at a time.",
    image: Team1,
  },
  {
    id: "Member2",
    name: "Chijoke Maduforo",
    role: "Product Designer",
    quote:
      "Designing with empathy, because every click should feel as natural as a farmer's handshake.",
    image: Team3,
  },
  {
    id: "Member3",
    name: "Oluwadamilola Adesina",
    role: "Backend Engineer",
    quote:
      "Powering the unseen and building the roots that keep our platform growing strong.",
    image: Team2,
  },
  {
    id: "Member4",
    name: "Peter Yeboah",
    role: "Frontend Engineer",
    quote:
      "Bringing ideas to life through clean code and seamless interactions.",
    image: Team3,
  },
];

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const StatCard = ({ icon, title, description }: Props) => {
  return (
    <div className="p-5 border-1 border-pri w-full md:w-[80%] mx-auto rounded-md">
      <div className="flex items-center mb-4 gap-4">
        <div className="w-7 h-7 text-pri">{icon}</div>
        <h4 className="font-bold text-lg">{title}</h4>
      </div>
      <p className="text-base">{description}</p>
    </div>
  );
};

/* Team Cards */
function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className=" rounded-lg shadow-md bg-white overflow-hidden">
      <div className="flex items-center gap-4 p-4">
        <img
          src={member.image}
          alt={`${member.name} Image`}
          className="w-14 h-14 rounded-full object-fit flex-shrink-0"
          loading="lazy"
        />
        <div>
          <h4 className="mb-1 font-semibold">{member.name} </h4>
          <p className="text-sm text-gray-500 font-semibold">{member.role} </p>
        </div>
      </div>
      {member.quote && (
        <div className="px-4 pb-4 pt-0">
          <p className="text-sm text-gray-600">{member.quote} </p>
        </div>
      )}
    </div>
  );
}

const About = () => {
  return (
    <>
      {/* NAVBAR */}
      <div className="">
        <Navbar />
      </div>

      {/* HERO SECTION */}
      <section
        className="relative w-full h-65 md:h-80 lg:h-110 bg-cover bg-center bg-no-repeat sm:overflow-x-hidden "
        style={{ backgroundImage: `url(${Image1})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-20"></div>

        <div className="max-w-[1100px] mx-auto px-5 h-full flex justify-center items-center">
          <div className="text-[#fff] max-w-2xl z-10">
            <h1 className="text-2xl md:text-4xl font-extrabold text-center leading-tight">
              Connecting Farmers directly to buyers
            </h1>
            <p className="mt-3 text-sm md:text-base md:w-[80%] lg:text-lg text-center mx-auto text-green-100">
              FarmMarket empowers smallholder farmers through fair pricing,
              traceability, and direct access to local and regional buyers.
            </p>
            <div className="flex mt-7 gap-3 justify-center w-full">
              <Link to="/marketplace">
                <button className="outline-none border border-white inline-block w-38 bg-[#fff] text-black font-bold px-4 py-2.5 rounded-lg cursor-pointer shadow-sm hover:shadow-md transition">
                  Browse Market
                </button>
              </Link>
              <Link to="/contact">
                <button className="outline-none border border-sec inline-block w-38 bg-sec text-black font-bold px-4 py-2.5 rounded-lg cursor-pointer shadow-sm hover:bg-sec2 transition">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto px-5 py-10 space-y-20 max-w-[1100px] ">
        <section className=" grid gap-8 items-center md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-black">Our Story</h2>
            <p className="mt-4  leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
              nobis ut libero et fuga veniam culpa! Quod sequi illo ullam nisi?
              Minus repudiandae tempore quos ullam corporis libero eos
              repellendus nostrum necessitatibus facilis vitae doloremque a
              harum provident cum culpa placeat quidem non aliquid.
            </p>
            <p className="mt-4 leading-relaxed">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam
              facere, eligendi dolor, a quia libero odio ipsum rem velit et enim
              quod quae recusandae veritatis!
            </p>
          </div>

          {/* MISSION AND VISSION */}
          <div className="grid  gap-4">
            <StatCard
              icon={<Globe />}
              title="Mission"
              description="Empower farmers with fair market access and provide buyers with quality, traceable produce."
            />

            <StatCard
              icon={<TrendingUp />}
              title="Vision"
              description="A thriving local food economy where farmers propser and community eat fresh foods."
            />
          </div>
        </section>

        {/* VALUES */}
        <section>
          <h2 className="text-xl font-bold mb-6">Our Values</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 ">
            {/* VALUE 1 */}
            <div className="flex items-start gap-4 p-5 rounded-xl shadow-sm border border-pri">
              <div className="p-3 bg-green-50 rounded-lg">
                <Leaf className="w-5 h-5 text-pri" />
              </div>
              <div>
                <h3 className="font-semibold">Sustainability</h3>
                <p className="text sm text-gray-600 mt-1">
                  Support eco-friendly farming and reduce waste
                </p>
              </div>
            </div>

            {/* VALUE 2 */}
            <div className="flex items-start gap-4 p-5 rounded-xl shadow-sm border border-pri">
              <div className="p-3 bg-green-50 rounded-lg">
                <Users className="w-5 h-5 text-pri" />
              </div>
              <div>
                <h3 className="font-semibold">Community</h3>
                <p className="text sm text-gray-600 mt-1">
                  Build strong local networks that share value fairly.
                </p>
              </div>
            </div>

            {/* VALUE 3 */}
            <div className="flex items-start gap-4 p-5 rounded-xl shadow-sm border border-pri">
              <div className="p-3 bg-green-50 rounded-lg">
                <Globe className="w-5 h-5 text-pri" />
              </div>
              <div>
                <h3 className="font-semibold">Transparency</h3>
                <p className="text sm text-gray-600 mt-1">
                  Traceable produce and clear pricing for every trade.
                </p>
              </div>
            </div>

            {/* VALUE 4 */}
            <div className="flex items-start gap-4 p-5 rounded-xl shadow-sm border border-pri">
              <div className="p-3 bg-green-50 rounded-lg">
                <Globe className="w-5 h-5 text-pri" />
              </div>
              <div>
                <h3 className="font-semibold">Growth</h3>
                <p className="text sm text-gray-600 mt-1">
                  Help farmers scale and diversify icome streams.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section>
          <h2 className="text-xl font-bold mb-6">Meet the team</h2>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {TEAM.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </section>

        {/* IMPACT */}
        <section className="rounded-2xl p-6 shadow-sm border border-pri">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold">Join Our Mission</h3>
              <p className="mt-2 text-gray-700 max-w-xl">
                Whether you're a farmer, buyer, or partner, help us build a
                fairer food system. Sign up and be part of the change.
              </p>
            </div>

            {/* CTAS */}
            <div className="flex gap-3">
              <Link to="/signupHome">
                <button className="outline-none border border-pri inline-block w-38 bg-pri text-white font-bold px-4 py-2.5 rounded-lg cursor-pointer shadow-sm hover:bg-green-600 transition">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default About;
