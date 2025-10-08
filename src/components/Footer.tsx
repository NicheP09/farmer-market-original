import { Phone, Instagram, Facebook, MapPin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-pri w-full">
      <div className="max-w-[1100px] mx-auto py-15 px-5 flex justify-between gap-10 md:flex-row flex-col">
        <div className="w-full md:w-1/3">
          <h4 className="text-white mb-4 font-semibold text-xl">Contact Us</h4>
          <p className="text-light text-sm flex gap-3  items-center">
            {/* Phone Icon */}
            <Phone className="w-6 h-6 text-[#fff]" />
            <span>08123377800</span>
          </p>
        </div>
        <ul className="list-none w-full md:w-1/3 space-y-4">
          <li>
            <a href="" className="text-light text-sm flex gap-4 items-center">
              {/* Instargram Icon */}
              <Instagram className="w-6 h-6 text-[#fff]" />
              <span className="leading-none">@FarmMarket</span>
            </a>
          </li>
          <li>
            <a href="" className="text-light text-sm flex gap-4 items-center">
              {/* X Icon */}
              <Twitter className="w-6 h-6 text-[#fff]" />
              <span className="leading-none">@FarmMarketNg</span>
            </a>
          </li>
          <li>
            <a href="" className="text-light text-sm flex gap-4 items-center">
              {/* Facebook Icon */}
              <Facebook className="w-6 h-6 text-[#fff]" />
              <span className="leading-none">Farm Market Nigeria</span>
            </a>
          </li>
        </ul>
        <div className="w-full md:w-1/3">
          <h4 className="text-white mb-4 text-xl font-semibold">Address</h4>
          <p className="text-light text-sm flex gap-4 items-center">
            {/* Marker Icon */}
            <MapPin className="w-6 h-6 text-[#fff]" />
            <span>
              Lorem ipsum dolor sit amet consectetur. Faucibus aliquet laoreet
              rutrum id.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
