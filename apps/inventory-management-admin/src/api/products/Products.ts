import { Categories } from "../categories/Categories";
import { Orders } from "../orders/Orders";
import { Suppliers } from "../suppliers/Suppliers";

export type Products = {
  category?: Categories | null;
  createdAt: Date;
  description: string | null;
  id: string;
  image: string | null;
  name: string | null;
  ordersItems?: Array<Orders>;
  price: number | null;
  quantity: number | null;
  supplier?: Suppliers | null;
  updatedAt: Date;
};
