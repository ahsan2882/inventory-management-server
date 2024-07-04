import { Products } from "../products/Products";

export type Categories = {
  createdAt: Date;
  description: string | null;
  id: string;
  name: string | null;
  parentCategory: string | null;
  productsItems?: Array<Products>;
  updatedAt: Date;
};
