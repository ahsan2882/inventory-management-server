import { ProductsWhereUniqueInput } from "../products/ProductsWhereUniqueInput";

export type OrdersUpdateInput = {
  orderDate?: Date | null;
  product?: ProductsWhereUniqueInput | null;
  quantity?: number | null;
  totalPrice?: number | null;
};
