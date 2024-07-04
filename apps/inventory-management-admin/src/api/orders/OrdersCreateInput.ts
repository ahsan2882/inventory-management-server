import { ProductsWhereUniqueInput } from "../products/ProductsWhereUniqueInput";

export type OrdersCreateInput = {
  orderDate?: Date | null;
  product?: ProductsWhereUniqueInput | null;
  quantity?: number | null;
  totalPrice?: number | null;
};
