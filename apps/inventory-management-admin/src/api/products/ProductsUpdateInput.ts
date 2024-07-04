import { CategoriesWhereUniqueInput } from "../categories/CategoriesWhereUniqueInput";
import { OrdersUpdateManyWithoutProductsItemsInput } from "./OrdersUpdateManyWithoutProductsItemsInput";
import { SuppliersWhereUniqueInput } from "../suppliers/SuppliersWhereUniqueInput";

export type ProductsUpdateInput = {
  category?: CategoriesWhereUniqueInput | null;
  description?: string | null;
  image?: string | null;
  name?: string | null;
  ordersItems?: OrdersUpdateManyWithoutProductsItemsInput;
  price?: number | null;
  quantity?: number | null;
  supplier?: SuppliersWhereUniqueInput | null;
};
