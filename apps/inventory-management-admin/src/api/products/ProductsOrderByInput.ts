import { SortOrder } from "../../util/SortOrder";

export type ProductsOrderByInput = {
  categoryId?: SortOrder;
  createdAt?: SortOrder;
  description?: SortOrder;
  id?: SortOrder;
  image?: SortOrder;
  name?: SortOrder;
  price?: SortOrder;
  quantity?: SortOrder;
  supplierId?: SortOrder;
  updatedAt?: SortOrder;
};
