import { ProductsUpdateManyWithoutCategoriesItemsInput } from "./ProductsUpdateManyWithoutCategoriesItemsInput";

export type CategoriesUpdateInput = {
  description?: string | null;
  name?: string | null;
  parentCategory?: string | null;
  productsItems?: ProductsUpdateManyWithoutCategoriesItemsInput;
};
