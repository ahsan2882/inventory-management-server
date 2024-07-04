import { Products } from "../products/Products";

export type Suppliers = {
  contactEmail: string | null;
  contactPhone: string | null;
  createdAt: Date;
  id: string;
  name: string | null;
  productsItems?: Array<Products>;
  updatedAt: Date;
};
