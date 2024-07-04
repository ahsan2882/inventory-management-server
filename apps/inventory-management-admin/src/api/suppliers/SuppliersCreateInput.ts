import { ProductsCreateNestedManyWithoutSuppliersItemsInput } from "./ProductsCreateNestedManyWithoutSuppliersItemsInput";

export type SuppliersCreateInput = {
  contactEmail?: string | null;
  contactPhone?: string | null;
  name?: string | null;
  productsItems?: ProductsCreateNestedManyWithoutSuppliersItemsInput;
};
