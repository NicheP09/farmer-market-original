import Tomato from "../assets/marketplace-images/image 4.svg";
import Rice from "../assets/marketplace-images/image 6.svg";
import Carrots from "../assets/marketplace-images/image 5.svg";
import Avocado from "../assets/marketplace-images/image 8.svg";
import Meat from "../assets/marketplace-images/image 7.svg";
import Milk from "../assets/marketplace-images/image 9.svg";
import SweetCorn from "../assets/marketplace-images/image 11.svg";
import Plantain from "../assets/marketplace-images/image 12.svg";
import Beans from "../assets/marketplace-images/image 13.svg";

export type Product = {
  id: number;
  name: string;
  farm: string;
  price: number;
  unit: string;
  image: string | any;
  currency?: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Organic Tomatoes",
    farm: "Olusoji Taiwo Farms",
    price: 1200,
    unit: "Kg",
    image: Tomato,
    currency: "NGN",
  },
  {
    id: 2,
    name: "Brown Rice",
    farm: "Alabi Ayo Farms",
    price: 4200,
    unit: "Kg",
    image: Rice,
    currency: "NGN",
  },
  {
    id: 3,
    name: "Organic Carrots",
    farm: "HillTop Farms",
    price: 2500,
    unit: "Kg",
    image: Carrots,
    currency: "NGN",
  },
  {
    id: 4,
    name: "Fresh Avocado",
    farm: "Green Acres",
    price: 2500,
    unit: "Kg",
    image: Avocado,
    currency: "NGN",
  },

  {
    id: 5,
    name: "Red Meat",
    farm: "Fiyinfoluwa Farms",
    price: 7000,
    unit: "Kg",
    image: Meat,
    currency: "NGN",
  },
  {
    id: 6,
    name: "Fresh Cow Milk",
    farm: "Adamu Hassan Farms",
    price: 3000,
    unit: "Kg",
    image: Milk,
    currency: "NGN",
  },
  {
    id: 7,
    name: "Fresh Sweet Corn",
    farm: "Olusoji Taiwo Farms",
    price: 1200,
    unit: "Kg",
    image: SweetCorn,
    currency: "NGN",
  },
  {
    id: 8,
    name: "Ripe Plantain",
    farm: "Olusoji Taiwo Farms",
    price: 1200,
    unit: "Kg",
    image: Plantain,
    currency: "NGN",
  },
  {
    id: 9,
    name: "White Beans",
    farm: "Olusoji Taiwo Farms",
    price: 7000,
    unit: "Kg",
    image: Beans,
    currency: "NGN",
  },
];
