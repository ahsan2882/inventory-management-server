import { ProductsWhereUniqueInput } from "./ProductsWhereUniqueInput";
import { ProductsUpdateInput } from "./ProductsUpdateInput";

export type UpdateProductsArgs = {
  where: ProductsWhereUniqueInput;
  data: ProductsUpdateInput;
};
