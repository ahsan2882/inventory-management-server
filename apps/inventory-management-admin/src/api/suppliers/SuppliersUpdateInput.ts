import { ProductsUpdateManyWithoutSuppliersItemsInput } from "./ProductsUpdateManyWithoutSuppliersItemsInput";

export type SuppliersUpdateInput = {
  contactEmail?: string | null;
  contactPhone?: string | null;
  name?: string | null;
  productsItems?: ProductsUpdateManyWithoutSuppliersItemsInput;
};
