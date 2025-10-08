export type OrderStatus = "Pending" | "Accepted" | "Rejected";

export interface OrderItem {
  name: string;
  price: number;
}

export interface Order {
  id: number;
  name: string;
  avatar: string;
  location: string;
  distance: string;
  time: string;
  status: OrderStatus;
  items: OrderItem[];
}
