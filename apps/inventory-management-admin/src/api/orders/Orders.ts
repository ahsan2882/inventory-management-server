import { Products } from "../products/Products";

export type Orders = {
  createdAt: Date;
  id: string;
  orderDate: Date | null;
  product?: Products | null;
  quantity: number | null;
  totalPrice: number | null;
  updatedAt: Date;
};
