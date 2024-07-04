import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { ProductsListRelationFilter } from "../products/ProductsListRelationFilter";

export type CategoriesWhereInput = {
  description?: StringNullableFilter;
  id?: StringFilter;
  name?: StringNullableFilter;
  parentCategory?: StringNullableFilter;
  productsItems?: ProductsListRelationFilter;
};
