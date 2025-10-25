import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { CircleArrowLeft, Minus, Plus, Heart, Trash2 } from "lucide-react";
import { cartStore } from "../type/cartStore";
import type { CartItem } from "../type/cartStore";
import Navbar from "../components/Navbar";

/*
  Cart page reads the full product objects from cartStore.
  It shows quantity controls, favorite and delete buttons (only here).
*/

const CartPage = () => {
  const [cart, setCart] = useState<CartItem[]>(cartStore.getCart());
  const [favorites, setFavorites] = useState(() => cartStore.getFavorites());

  useEffect(() => {
    const unsub = cartStore.subscribe(() => {
      setCart(cartStore.getCart());
      setFavorites(cartStore.getFavorites());
    });
    return unsub;
  }, []);

  useEffect(() => {
    const unsub = cartStore.subscribe(() => {
      setCart(cartStore.getCart());
      setFavorites(cartStore.getFavorites());
    });
    return unsub;
  }, []);

  const subtotal = useMemo(
    () => cart.reduce((s, it) => s + it.product.price * it.quantity, 0),
    [cart]
  );
  const deliveryFee = subtotal > 0 ? 2000 : 0;

  const total = subtotal + deliveryFee;

  function increase(productId: number) {
    const item = cart.find((c) => c.product.id === productId);
    if (!item) return;
    cartStore.updateQty(productId, item.quantity + 1);
  }

  function decrease(productId: number) {
    const item = cart.find((c) => c.product.id === productId);
    if (!item) return;
    cartStore.updateQty(productId, item.quantity - 1);
  }

  function remove(productId: number) {
    cartStore.removeItem(productId);
  }

  function toggleFav(productId: number) {
    const product = cart.find((c) => c.product.id === productId)?.product;
    if (!product) return;
    cartStore.toggleFavorite(product);
  }

  const ProcessingModal = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-[999]">
      <div className="bg-white flex flex-col items-center justify-center p-8 rounded-xl shadow-lg">
        <div className="loader w-14 h-14 border-4 border-pri border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-700 font-semibold text-lg">
          Processing Payment...
        </p>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="mt-[94px] max-w-[1100px]  mx-auto px-6 pt-8 pb-10">
        {/* HEADER */}
        <div className="flex gap-8">
          <NavLink to="/marketplace" className="text-2xl   cursor-pointer">
            <CircleArrowLeft className="w-7 h-7  text-pri" />
          </NavLink>
          <div className="-mt-1">
            <h2 className="text-black font-bold text-2xl">Cart</h2>
            <p className="text-gray-600 mb-4 mt-1 text-lg">
              Review your items before checkout
            </p>
          </div>
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {/* CART LEFT */}
          <div className="md:col-span-2 space-y-6  md:border-[#ccc] ">
            {/* CART ITEMS */}
            {cart.length === 0 ? (
              <div className="p-8  text-center ">
                <p className="text-black font-semibold">
                  Your cart is empty, Go add some tasty produce!
                </p>
                <NavLink
                  to="/marketplace"
                  className="mt-4 inline-block bg-pri hover:bg-green-600 text-sm  text-white font-semibold text-center py-3 px-6 rounded-xl focus:outline-none transition"
                >
                  Go shopping
                </NavLink>
              </div>
            ) : (
              <div className="shadow-sm bg-[#fff] rounded-lg p-6 ">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-medium text-lg">
                    Your Cart ({cart.length}{" "}
                    {cart.length === 1 ? "item" : "items"})
                  </h2>
                </div>

                {cart.map(({ product, quantity }) => {
                  const lineTotal = product.price * quantity;
                  const isFav = favorites.some((f) => f.id === product.id);

                  return (
                    <div
                      key={product.id}
                      className="flex items-center border rounded-lg mb-4  border-black  justify-between p-4"
                    >
                      <div className="flex w-full items-start gap-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-29 h-29 rounded-md object-cover"
                        />
                        <div className="flex flex-1 items-start justify-between ">
                          <div>
                            <div className="mb-3">
                              <h3 className="text-sm md:text-[15px] font-semibold mb-1 text-black">
                                {product.name}
                              </h3>
                              <p className="text-sm font-medium text-black mb-2">
                                ₦{product.price.toLocaleString()}/{product.unit}
                              </p>
                              <p className="text-sm text-gray-500">
                                From {product.farm}
                              </p>
                            </div>

                            {/* BOTTOM */}
                            <div>
                              <button
                                onClick={() => toggleFav(product.id)}
                                className={`p-2 rounded-full ${
                                  isFav ? "text-red-500" : "text-black"
                                } hover:text-red-600`}
                                aria-pressed={isFav}
                              >
                                <Heart
                                  className="w-5 h-5"
                                  fill={isFav ? "currentColor" : "none"}
                                />
                              </button>

                              <button
                                onClick={() => remove(product.id)}
                                className=""
                                aria-label="Remove"
                              >
                                <Trash2 className="w-5 h-5 text-black hover:text-red-500" />
                              </button>
                            </div>
                          </div>
                          {/* QUANTITY BTNS */}
                          <div className="flex items-center flex-col justify-center gap-1">
                            <div className="text-right font-semibold">
                              ₦{lineTotal.toLocaleString()}
                            </div>

                            <div className="flex items-center">
                              <button
                                onClick={() => decrease(product.id)}
                                className="p-0.5 border-1 border-[#000] rounded-full hover:bg-gray-100"
                                aria-label="Decrease"
                              >
                                <Minus className="w-3 h-3 text-[#000]" />
                              </button>
                              <div className="px-4 font-semibold">
                                {quantity}
                              </div>
                              <button
                                onClick={() => increase(product.id)}
                                className="p-0.5 f border-1 border-[#000] rounded-full hover:bg-gray-100"
                                aria-label="Increase"
                              >
                                <Plus className="w-3 h-3 text-[#000]" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {/* RIGHT / ORDER SUMMARY */}

          <aside className=" h-fit shadow-sm bg-[#fff] rounded-lg p-6">
            <div className="space-y-3 ">
              <h3 className="text-lg font-bold mb-5">Order Summary</h3>
              {/*  */}
              <div className=" border-b-1">
                {cart.map(({ product, quantity }) => (
                  <div className="flex justify-between  space-y-4">
                    <span className="text-black text-[15px] font-semibold">
                      {`${quantity} ${product.name}`}
                    </span>
                    <span className="text-black text-[15px] font-semibold">
                      ₦{(product.price * quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              {/*  */}

              <div className="flex justify-between">
                <span className="text-black text-[15px] font-semibold ">
                  Subtotal
                </span>
                <span className="text-black text-[15px] font-semibold ">
                  ₦{subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-black text-[15px] font-semibold ">
                  Delivery Fee
                </span>
                <span className="text-black text-[15px] font-semibold ">{`${
                  deliveryFee === 0 ? "—" : `₦${deliveryFee.toLocaleString()}`
                }`}</span>
              </div>
            </div>
            <div className="pt-3">
              <div className="flex justify-between text-[17px] mb-2 font-bold text-gray-900">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
              <NavLink
                to="/paymentmethod"
                onClick={() => {
                  ProcessingModal();
                }}
              >
                <button className=" mt-4 bg-pri hover:bg-green-600  text-white font-semibold text-center w-full py-3 rounded-xl focus:outline-none transition">
                  Checkout Now
                </button>
              </NavLink>

              <NavLink
                to="/marketplace"
                className="block text-center w-full mt-3 cursor-pointer text-black font-semibold py-3 rounded-xl"
              >
                Continue shopping
              </NavLink>
              <p className="text-[15px] text-gray-400 text-center mt-3 leading-tight">
                All payments are secure. Farmers are paid after delivery
                confirmation.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default CartPage;
