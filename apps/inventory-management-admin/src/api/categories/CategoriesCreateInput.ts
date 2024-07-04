import { ProductsCreateNestedManyWithoutCategoriesItemsInput } from "./ProductsCreateNestedManyWithoutCategoriesItemsInput";

export type CategoriesCreateInput = {
  description?: string | null;
  name?: string | null;
  parentCategory?: string | null;
  productsItems?: ProductsCreateNestedManyWithoutCategoriesItemsInput;
};
