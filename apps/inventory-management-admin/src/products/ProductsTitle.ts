import { Products as TProducts } from "../api/products/Products";

export const PRODUCTS_TITLE_FIELD = "name";

export const ProductsTitle = (record: TProducts): string => {
  return record.name?.toString() || String(record.id);
};
