import ProductCard from "./ProductCards";
import type { Product } from "../../type/products";
import { products as sampleProducts } from "../../type/products";

type Props = {
  onBuy: (product: Product) => void;
  products?: Product[];
};

const ProductGrid = ({ onBuy, products = sampleProducts }: Props) => {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 px-6 mt-3 pb-20 md:mt-6 w-full md:w-[95%]">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onBuy={onBuy} />
      ))}
    </section>
  );
};

export default ProductGrid;
