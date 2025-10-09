import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import MarketplaceSidebar from "../components/marketplace-components/MarketplaceSidebar";
import Logo from "../assets/Logo-black.svg";
import { cartStore } from "../type/cartStore";

import { Menu, ShoppingCartIcon } from "lucide-react";
import ProductGrid from "../components/marketplace-components/ProductGrid";

const Marketplace = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  /* MESSAGE APPEARS FOR TWO SECONDS */

  useEffect(() => {
    const unsub = cartStore.subscribe(() => {
      setCartCount(cartStore.getCount());
    });
    return unsub;
  }, []);

  function handleBuy(product: Parameters<typeof cartStore.addToCart>[0]) {
    cartStore.addToCart(product);
  }

  return (
    <div className="min-h-screen flex">
      {/* SIDEBAR */}
      <MarketplaceSidebar open={open} onClose={() => setOpen(false)} />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex-col  ">
        {/* MOBILE TOP BAR WITH HAMBURGER */}
        <div className="md:hidden flex items-center z-20 p-5 justify-between ">
          <NavLink to="/" className="text-2xl  cursor-pointer">
            <img src={Logo} alt="logo" className="w-[150px]" />
          </NavLink>
          <div className="flex items-center gap-3">
            <div className="relative ">
              <button
                aria-label="Open cart"
                onClick={() => navigate("/cartpage")}
              >
                <ShoppingCartIcon className="w-6 h-6 font-bold" />
              </button>

              {/* CART BUNBER */}
              {cartCount > 0 && (
                <span className="absolute -top-0 sm:top-1 -right-1 bg-red-500 text-white text-medium rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>

            <div className="">
              <button onClick={() => setOpen(true)}>
                <Menu className="w-7 h-7 font-bold" />
              </button>
            </div>
          </div>
        </div>

        {/* OUTLET FOR NESTED ROUTES */}
        <div className=" md:py-4 max-w-7xl mx-auto w-full ">
          {/* HEADER */}
          <header className="hidden md:flex items-center justify-between px-6  w-full md:w-[95%] pb-3 border-b-2 border-[#e6e6e6]">
            <div className="">
              <h2 className="text-black font-bold text-2xl">Marketplace</h2>
            </div>

            <div className="">
              <NavLink to="/cartpage">
                <div className="relative ">
                  <button aria-label="Open cart">
                    <ShoppingCartIcon className="w-6 h-6 font-bold" />
                  </button>

                  {/* CART BUNBER */}
                  {cartCount > 0 && (
                    <span className="absolute -top-0 sm:top-1 -right-1 bg-red-500 text-white text-medium rounded-full text-xs w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
              </NavLink>
            </div>
          </header>

          {/* MAIN CONTENT */}
          <ProductGrid onBuy={handleBuy} />
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
