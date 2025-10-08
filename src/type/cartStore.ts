// src/lib/cartStore.ts
import type { Product } from "./products";

export type CartItem = { product: Product; quantity: number };
type Subscriber = () => void;

let cart: CartItem[] = [];
let favorites: Product[] = [];
const subs = new Set<Subscriber>();

function notify() {
  subs.forEach((s) => s());
}

export const cartStore = {
  // read
  getCart: () => cart.slice(),
  getFavorites: () => favorites.slice(),
  getCount: () => cart.reduce((s, c) => s + c.quantity, 0),

  // subscribe/unsubscribe
  subscribe: (fn: Subscriber) => {
    subs.add(fn);
    return () => {
      subs.delete(fn);
    };
  },

  // mutate
  addToCart: (product: Product) => {
    const idx = cart.findIndex((c) => c.product.id === product.id);
    if (idx >= 0) {
      cart[idx].quantity += 1;
    } else {
      cart.push({ product, quantity: 1 });
    }
    notify();
  },

  updateQty: (productId: number, qty: number) => {
    if (qty <= 0) {
      cart = cart.filter((c) => c.product.id !== productId);
    } else {
      cart = cart.map((c) =>
        c.product.id === productId ? { ...c, quantity: qty } : c
      );
    }
    notify();
  },

  removeItem: (productId: number) => {
    cart = cart.filter((c) => c.product.id !== productId);
    notify();
  },

  toggleFavorite: (product: Product) => {
    if (favorites.find((p) => p.id === product.id)) {
      favorites = favorites.filter((p) => p.id !== product.id);
    } else {
      favorites = [...favorites, product];
    }
    notify();
  },

  // reset (useful for testing)
  clearAll: () => {
    cart = [];
    favorites = [];
    notify();
  },
};
