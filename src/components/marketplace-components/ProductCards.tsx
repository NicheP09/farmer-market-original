import type { Product } from "../../type/products";

type Props = {
  product: Product;
  onBuy: (product: Product) => void;
};

const ProductCard = ({ product, onBuy }: Props) => {
  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: product.currency ?? "NGN",
    maximumFractionDigits: 0,
  }).format(product.price);

  // fallback image if backend image URL fails or is missing
  const fallbackImage =
    "https://via.placeholder.com/300x200.png?text=No+Image+Available";

  return (
    <div className="bg-[#eefcf3] rounded-lg px-4 py-4 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
      {/* PRODUCT IMAGE */}
      <div className="h-40 w-full mx-auto overflow-hidden rounded-md mb-3 flex items-center justify-center bg-white">
        <img
          src={product.image || fallbackImage}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = fallbackImage;
          }}
        />
      </div>

      {/* PRODUCT INFO */}
      <div className="mb-3">
        <h3
          id={`product-title-${product.id}`}
          className="text-sm md:text-base font-semibold mb-1 text-black line-clamp-1"
        >
          {product.name}
        </h3>
        <p className="text-xs text-gray-700">From {product.farm}</p>
      </div>

      {/* PRICE */}
      <div className="my-2">
        <p className="font-bold text-sm text-black">
          {formattedPrice}/{product.unit}
        </p>
      </div>

      {/* BUY BUTTON */}
      <button
        className="mt-auto bg-green-600 hover:bg-green-700 text-sm text-white font-semibold text-center w-full py-2 rounded-md focus:outline-none transition"
        onClick={() => onBuy(product)}
      >
        ADD TO CART
      </button>
    </div>
  );
};

export default ProductCard;
