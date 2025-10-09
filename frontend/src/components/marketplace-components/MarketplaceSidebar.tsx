import { useState } from "react";
import { NavLink } from "react-router-dom";

import { X } from "lucide-react";
import Tomato from "../../assets/marketplace-images/image 4.svg";
import Carrot from "../../assets/marketplace-images/image 5.svg";
import Rice from "../../assets/marketplace-images/image 6.svg";
import { CircleArrowLeft, Search, Star } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

type Category =
  | "All"
  | "Vegetables"
  | "Fruits"
  | "Grains"
  | "Dairy"
  | "Protein"
  | "Herbs & Spices";

const MarketPlaceSidebar = ({ open, onClose }: Props) => {
  const [price, setPrice] = useState(5000);
  const [organic, setOrganic] = useState(false);
  const [nonOrganic, setNonOrganic] = useState(false);

  const categories: Category[] = [
    "All",
    "Vegetables",
    "Fruits",
    "Grains",
    "Dairy",
    "Protein",
    "Herbs & Spices",
  ];

  const bestSellers = [
    { id: 1, name: "Red Apples", price: "₦3000", img: Tomato },
    { id: 2, name: "Carrots", price: "₦2000", img: Carrot },
    { id: 3, name: "Rice", price: "₦5000", img: Rice },
  ];

  return (
    <>
      {/* BIG SCREEN SIDEBAR */}
      <aside className="font-dm-sans hidden overflow-y-auto  sticky top-0 left-0 h-screen justify-between  md:flex md:flex-col  md:w-80   ">
        <div className="mt-3 mb-4 ">
          <NavLink to="/buyerdashboard" className="text-2xl   cursor-pointer">
            <CircleArrowLeft className="w-7 h-7  ml-6 text-pri" />
          </NavLink>
        </div>

        {/* MAIN TAB */}
        <div className=" w-[80%] ml-10 pl-4 pr-8  mx-auto border border-[#eefcf3]">
          {/* SEARCH */}
          <div className="pb-3">
            <h4 className=" mt-4 font-semibold">Search</h4>
            <div className="relative mt-2">
              <Search className="w-4 h-4 absolute top-2.5 left-3 text-[#8c8c8c]" />
              <input
                type="text"
                className="w-full pl-8 pr-3 py-2 border border-[#8c8c8c] rounded-md text-sm bg-[#f7f7f7] text-[#8c8c8c] focus:outline-none "
                placeholder="Search"
              />
            </div>
          </div>

          {/* TRANSACTION TAB */}
          <div className="border-t-1 pb-3 border-[#8c8c8c] ">
            <h3 className=" mt-4 font-semibold">Categories</h3>
            <ul className="space-y-2 mt-4 text-sm text-[#8c8c8c]">
              {categories.map((category) => (
                <li key={category}>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `block  ${
                        isActive ? "text-pri " : "text-[#333] hover:text-pri "
                      }`
                    }
                  >
                    {category}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* FILTER PRICE */}
          <div className="border-t-1 pb-3 border-[#8c8c8c] ">
            <h3 className=" mt-4 font-semibold">Filter by Price</h3>
            <input
              type="range"
              min={0}
              max={10000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full mt-4 h-1 rounded-lg accent-gray-400 cursor-pointer"
            />
            <p className="text-[13px] mt-1 flex justify-between text-[#333]">
              <span>0</span>
              <span>10000</span>
            </p>
            <button className="mt-4 px-4 py-2 text-white bg-pri rounded-md text-xs hover:bg-green-600">
              Filter
            </button>
          </div>

          {/* FILTER PRICE */}
          <div className="border-t-1 pb-3 border-[#8c8c8c] ">
            <h3 className=" mt-4 font-semibold">Product Quality</h3>
            <div className="flex gap-3 mt-2 text-sm text-[#333]">
              <input
                type="checkbox"
                checked={organic}
                onChange={() => setOrganic(!organic)}
                className="accent-pri"
              />

              <label>Organic</label>
            </div>
            <div className="flex gap-3 mt-2 text-sm text-[#333]">
              <input
                type="checkbox"
                checked={nonOrganic}
                onChange={() => setNonOrganic(!nonOrganic)}
                className="accent-pri text-[#fff] "
              />
              <label>Non-Organic</label>
            </div>
          </div>

          {/* DISTANCE */}
          <div className="border-t-1 pb-3 border-[#8c8c8c] ">
            <h3 className=" mt-4 font-semibold">Distance</h3>
            <ul className="space-y-2 mt-3 text-sm text-[#333] ">
              <li>Within 5km</li>
              <li>Within 10km</li>
            </ul>
          </div>

          {/* AVALABILITY */}
          <div className="border-t-1 pb-3 border-[#8c8c8c] ">
            <h3 className=" mt-4 font-semibold">Avalability</h3>
            <ul className="space-y-2 text-sm mt-3 text-[#333] ">
              <li>In Stock</li>
              <li>Pre-order</li>
            </ul>
          </div>

          {/* BEST SELLER*/}
          <div className="border-t-1 pb-3 border-[#8c8c8c] ">
            <div className="bg-[#eefcf3] my-2 py-1 pl-2">
              <h3 className=" mt-4 font-semibold">Best Seller</h3>
              <ul className="space-y-6 mt-4">
                {bestSellers.map((item) => (
                  <li key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-15 h-15 rounded-md object-cover"
                    />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-[13px] text-pri">{item.price}</p>
                      <div className="flex gap-1">
                        <Star className="w-3 h-3 text-sec fill-sec" />
                        <Star className="w-3 h-3 text-sec fill-sec" />
                        <Star className="w-3 h-3 text-sec fill-sec" />
                        <Star className="w-3 h-3 text-sec fill-sec" />
                        <Star className="w-3 h-3 text-sec fill-sec" />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </aside>

      {/* MOBILE RESPONSIVENESS */}
      {open && (
        <div className="fixed  inset-0 z-40 flex md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-30"
            onClick={onClose}
          ></div>
          <div className="absolute left-0 top-0 h-full w-72 min-h-screen overflow-x-auto bg-white py-4  shadow">
            <div className="flex items-center px-4  w-full justify-between mb-2">
              <div className="mt-3 mb-4 ">
                <NavLink
                  to="/buyerdashboard"
                  className="text-2xl   cursor-pointer"
                >
                  <CircleArrowLeft className="w-7 h-7  ml-6 text-pri" />
                </NavLink>
              </div>

              <button
                onClick={onClose}
                className="text-gray-600"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-black font-bold cursor-pointer" />
              </button>
            </div>

            {/* MAIN TAB */}
            <div className=" w-[95%] pl-4 pr-8  mx-auto border border-[#eefcf3]">
              {/* SEARCH */}
              <div className="pb-3">
                <h4 className=" mt-4 font-semibold">Search</h4>
                <div className="relative mt-2">
                  <Search className="w-4 h-4 absolute top-2.5 left-3 text-[#8c8c8c]" />
                  <input
                    type="text"
                    className="w-full pl-8 pr-3 py-2 border border-[#8c8c8c] rounded-md text-sm bg-[#f7f7f7] text-[#8c8c8c] focus:outline-none "
                    placeholder="Search"
                  />
                </div>
              </div>

              {/* TRANSACTION TAB */}
              <div className="border-t-1 pb-3 border-[#8c8c8c] ">
                <h3 className=" mt-4 font-semibold">Categories</h3>
                <ul className="space-y-2 mt-4 text-sm text-[#8c8c8c]">
                  {categories.map((category) => (
                    <li key={category}>
                      <NavLink
                        to="/"
                        className={({ isActive }) =>
                          `block  ${
                            isActive
                              ? "text-pri "
                              : "text-[#333] hover:text-pri "
                          }`
                        }
                      >
                        {category}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* FILTER PRICE */}
              <div className="border-t-1 pb-3 border-[#8c8c8c] ">
                <h3 className=" mt-4 font-semibold">Filter by Price</h3>
                <input
                  type="range"
                  min={0}
                  max={10000}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full mt-4 h-1 rounded-lg accent-gray-400 cursor-pointer"
                />
                <p className="text-[13px] mt-1 flex justify-between text-[#333]">
                  <span>0</span>
                  <span>10000</span>
                </p>
                <button className="mt-4 px-4 py-2 text-white bg-pri rounded-md text-xs hover:bg-green-600">
                  Filter
                </button>
              </div>

              {/* FILTER PRICE */}
              <div className="border-t-1 pb-3 border-[#8c8c8c] ">
                <h3 className=" mt-4 font-semibold">Product Quality</h3>
                <div className="flex gap-3 mt-2 text-sm text-[#333]">
                  <input
                    type="checkbox"
                    checked={organic}
                    onChange={() => setOrganic(!organic)}
                  />

                  <label>Organic</label>
                </div>
                <div className="flex gap-3 mt-2 text-sm text-[#333]">
                  <input
                    type="checkbox"
                    checked={nonOrganic}
                    onChange={() => setNonOrganic(!nonOrganic)}
                  />
                  <label>Non-Organic</label>
                </div>
              </div>

              {/* DISTANCE */}
              <div className="border-t-1 pb-3 border-[#8c8c8c] ">
                <h3 className=" mt-4 font-semibold">Distance</h3>
                <ul className="space-y-2 mt-3 text-sm text-[#333] ">
                  <li>Within 5km</li>
                  <li>Within 10km</li>
                </ul>
              </div>

              {/* AVALABILITY */}
              <div className="border-t-1 pb-3 border-[#8c8c8c] ">
                <h3 className=" mt-4 font-semibold">Avalability</h3>
                <ul className="space-y-2 text-sm mt-3 text-[#333] ">
                  <li>In Stock</li>
                  <li>Pre-order</li>
                </ul>
              </div>

              {/* BEST SELLER*/}
              <div className="border-t-1 pb-3 border-[#8c8c8c] ">
                <div className="bg-[#eefcf3] my-2 py-1 pl-2">
                  <h3 className=" mt-4 font-semibold">Best Seller</h3>
                  <ul className="space-y-6 mt-4">
                    {bestSellers.map((item) => (
                      <li key={item.id} className="flex items-center gap-3">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-15 h-15 rounded-md object-cover"
                        />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-[13px] text-pri">{item.price}</p>
                          <div className="flex gap-1">
                            <Star className="w-3 h-3 text-sec fill-sec" />
                            <Star className="w-3 h-3 text-sec fill-sec" />
                            <Star className="w-3 h-3 text-sec fill-sec" />
                            <Star className="w-3 h-3 text-sec fill-sec" />
                            <Star className="w-3 h-3 text-sec fill-sec" />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MarketPlaceSidebar;