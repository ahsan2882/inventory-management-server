import { SortOrder } from "../../util/SortOrder";

export type CategoriesOrderByInput = {
  createdAt?: SortOrder;
  description?: SortOrder;
  id?: SortOrder;
  name?: SortOrder;
  parentCategory?: SortOrder;
  updatedAt?: SortOrder;
};
