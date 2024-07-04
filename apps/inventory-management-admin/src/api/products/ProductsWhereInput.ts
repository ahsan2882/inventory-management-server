import { CategoriesWhereUniqueInput } from "../categories/CategoriesWhereUniqueInput";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { OrdersListRelationFilter } from "../orders/OrdersListRelationFilter";
import { FloatNullableFilter } from "../../util/FloatNullableFilter";
import { IntNullableFilter } from "../../util/IntNullableFilter";
import { SuppliersWhereUniqueInput } from "../suppliers/SuppliersWhereUniqueInput";

export type ProductsWhereInput = {
  category?: CategoriesWhereUniqueInput;
  description?: StringNullableFilter;
  id?: StringFilter;
  image?: StringNullableFilter;
  name?: StringNullableFilter;
  ordersItems?: OrdersListRelationFilter;
  price?: FloatNullableFilter;
  quantity?: IntNullableFilter;
  supplier?: SuppliersWhereUniqueInput;
};
