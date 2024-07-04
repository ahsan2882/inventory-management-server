import { CategoriesWhereUniqueInput } from "../categories/CategoriesWhereUniqueInput";
import { OrdersCreateNestedManyWithoutProductsItemsInput } from "./OrdersCreateNestedManyWithoutProductsItemsInput";
import { SuppliersWhereUniqueInput } from "../suppliers/SuppliersWhereUniqueInput";

export type ProductsCreateInput = {
  category?: CategoriesWhereUniqueInput | null;
  description?: string | null;
  image?: string | null;
  name?: string | null;
  ordersItems?: OrdersCreateNestedManyWithoutProductsItemsInput;
  price?: number | null;
  quantity?: number | null;
  supplier?: SuppliersWhereUniqueInput | null;
};
