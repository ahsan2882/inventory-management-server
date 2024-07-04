import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { ProductsListRelationFilter } from "../products/ProductsListRelationFilter";

export type SuppliersWhereInput = {
  contactEmail?: StringNullableFilter;
  contactPhone?: StringNullableFilter;
  id?: StringFilter;
  name?: StringNullableFilter;
  productsItems?: ProductsListRelationFilter;
};
